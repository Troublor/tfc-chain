package key

import (
	"bytes"
	"crypto/ecdsa"
	"errors"
	"fmt"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/ethereum/go-ethereum/crypto"
)

// GenPrivateKey generates a new private key, and return privates key in bytes, as well as error if exists.
func GenPrivateKey() ([]byte, error) {
	privateKeyECDSA, err := crypto.GenerateKey()
	if err != nil {
		return nil, err
	}
	privateKeyBytes := crypto.FromECDSA(privateKeyECDSA)
	return privateKeyBytes, nil
}

// privateKeyToECDSA convert bytes private key to ecdsa structured private key.
func privateKeyToECDSA(privateKey []byte) (*ecdsa.PrivateKey, error) {
	privateKeyECDSA, err := crypto.HexToECDSA(hexutil.Encode(privateKey)[2:])
	if err != nil {
		return nil, err
	}
	return privateKeyECDSA, nil
}

func PublicKeyToAddress(publicKey []byte) (string, error) {
	if isPublicKey64(publicKey) {
		publicKey = append([]byte{0x04}, publicKey...)
	} else if !isPublicKey65(publicKey) {
		return "", errors.New("invalid public key")
	}
	address := common.BytesToAddress(crypto.Keccak256(publicKey[1:])[12:])
	return address.Hex(), nil
}

// PrivateKeyToAddress converts bytes private key to Ethereum-like address.
func PrivateKeyToAddress(privateKey []byte) (string, error) {
	privateKeyECDSA, err := privateKeyToECDSA(privateKey)
	if err != nil {
		return "", err
	}
	publicKeyECDSA, ok := privateKeyECDSA.Public().(*ecdsa.PublicKey)
	if !ok {
		return "", errors.New("invalid private key")
	}
	address := crypto.PubkeyToAddress(*publicKeyECDSA).Hex()
	return address, nil
}

// PrivateKeyToPublicKey retrieves the public key in bytes corresponding to the given bytes private key.
func PrivateKeyToPublicKey(privateKey []byte) ([]byte, error) {
	privateKeyECDSA, err := privateKeyToECDSA(privateKey)
	if err != nil {
		return nil, err
	}
	publicKeyECDSA, ok := privateKeyECDSA.Public().(*ecdsa.PublicKey)
	if !ok {
		return nil, errors.New("invalid private key")
	}
	publicKeyBytes := crypto.FromECDSAPub(publicKeyECDSA)
	return publicKeyBytes, nil
}

func isPublicKey64(payload []byte) bool {
	return len(payload) == 64
}

func isPublicKey65(payload []byte) bool {
	return len(payload) == 65
}

// signHash is a helper function that calculates a hash for the given message
// that can be safely used to calculate a signature from.
//
// The hash is calulcated as
//   keccak256("\x19Ethereum Signed Message:\n"${message length}${message}).
//
// This gives context to the signed message and prevents signing of transactions.
func signHash(data []byte) []byte {
	msg := fmt.Sprintf("\x19Ethereum Signed Message:\n%d%s", len(data), data)
	return crypto.Keccak256([]byte(msg))
}

// SignData signs arbitrary bytes with private key and returns the signature in bytes.
func SignData(privateKey []byte, data []byte) ([]byte, error) {
	privateKeyECDSA, err := privateKeyToECDSA(privateKey)
	if err != nil {
		return nil, err
	}
	signature, err := crypto.Sign(signHash(data), privateKeyECDSA)
	if err != nil {
		return nil, err
	}
	return signature, nil
}

// VerifySignatureWithPublicKey verifies a bytes signature with given public key in bytes and the data used for this signature.
// Returns true if the signature matches the public key.
func VerifySignatureWithPublicKey(publicKey []byte, signature []byte, data []byte) (bool, error) {
	sigPublicKey, err := crypto.Ecrecover(signHash(data), signature)
	if err != nil {
		return false, err
	}
	if isPublicKey64(publicKey) {
		publicKey = append([]byte{0x04}, publicKey...)
	} else if !isPublicKey65(publicKey) {
		return false, errors.New("invalid public key")
	}
	matches := bytes.Equal(sigPublicKey, publicKey)
	return matches, nil
}

// VerifySignatureWithAddress verifies a bytes signature with given address and the data used for this signature.
// Returns true if the signature matches the public key.
func VerifySignatureWithAddress(address string, signature []byte, data []byte) (bool, error) {
	sigPublicKey, err := crypto.Ecrecover(signHash(data), signature)
	if err != nil {
		return false, err
	}
	addr, err := PublicKeyToAddress(sigPublicKey)
	if err != nil {
		return false, err
	}
	return addr == address, nil
}

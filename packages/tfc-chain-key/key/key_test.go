package key

import (
	"github.com/ethereum/go-ethereum/common/hexutil"
	"testing"
)

var privateKeyHex string
var publicKeyHex string
var addressHex string

func init() {
	privateKeyHex = "0xf438edd5b2e8977cfee3631bb74ee32ac3dee5fc39b163dce7d97621c3b8e619"
	publicKeyHex = "0x0410500aacf20c1448cc2fb95d1c657e37d9b36fc6f9533b03eb49ef764a68f5a6417bfc2053545791843046f7dce8603a69f7dc68bce54c6b1f1bada727ddecce"
	addressHex = "0x6eb48d5c704e87f1675580b7b7218801ADF7E2EA"
}

func TestPrivateKeyToAddress(t *testing.T) {
	privateKey, err := hexutil.Decode(privateKeyHex)
	if err != nil {
		t.Fatal(err)
	}
	address, err := PrivateKeyToAddress(privateKey)
	if err != nil {
		t.Fatal(err)
	}
	if address != addressHex {
		t.Fatal("Address mismatch")
	}
}

func TestPrivateKeyToPublicKey(t *testing.T) {
	privateKey, err := hexutil.Decode(privateKeyHex)
	if err != nil {
		t.Fatal(err)
	}
	pubKey, err := PrivateKeyToPublicKey(privateKey)
	if err != nil {
		t.Fatal(err)
	}
	if hexutil.Encode(pubKey) != publicKeyHex {
		t.Fatal("Public key mismatch")
	}
}

func TestPublicKeyToAddress(t *testing.T) {
	pubKey, err := hexutil.Decode(publicKeyHex)
	if err != nil {
		t.Fatal(err)
	}
	if addr, _ := PublicKeyToAddress(pubKey); addr != addressHex {
		t.Fatal("Address mismatch")
	}
	if addr, _ := PublicKeyToAddress(pubKey[1:]); addr != addressHex {
		t.Fatal("Address mismatch")
	}
}

func TestSignData(t *testing.T) {
	privateKey, err := hexutil.Decode(privateKeyHex)
	if err != nil {
		t.Fatal(err)
	}
	data := []byte("helloworld")
	sig, err := SignData(privateKey, data)
	if err != nil {
		t.Fatal(err)
	}
	if hexutil.Encode(sig) != "0x14658cd561daf211774943d9db230a8b09dae3aae1a58634cad62c4c6c45bc0042af683d7bd6cb20d68780249918f81cb26413e31d0639b9e44e1ddfe4505a2001" {
		t.Fatal("Signature mismatch")
	}
}

func TestVerifySignatureWithPublicKey(t *testing.T) {
	publicKey, err := hexutil.Decode(publicKeyHex)
	if err != nil {
		t.Fatal(err)
	}
	signature, err := hexutil.Decode("0x14658cd561daf211774943d9db230a8b09dae3aae1a58634cad62c4c6c45bc0042af683d7bd6cb20d68780249918f81cb26413e31d0639b9e44e1ddfe4505a2001")
	if err != nil {
		t.Fatal(err)
	}
	data := []byte("helloworld")
	pass, err := VerifySignatureWithPublicKey(publicKey, signature, data)
	if !pass {
		t.Fatal("Signature verify failed")
	}
	pass, err = VerifySignatureWithPublicKey(publicKey[1:], signature, data)
	if !pass {
		t.Fatal("Signature verify failed")
	}
}

func TestVerifySignatureWithAddress(t *testing.T) {
	signature, err := hexutil.Decode("0x14658cd561daf211774943d9db230a8b09dae3aae1a58634cad62c4c6c45bc0042af683d7bd6cb20d68780249918f81cb26413e31d0639b9e44e1ddfe4505a2001")
	if err != nil {
		t.Fatal(err)
	}
	data := []byte("helloworld")
	pass, err := VerifySignatureWithAddress(addressHex, signature, data)
	if !pass {
		t.Fatal("Signature verify failed")
	}
}

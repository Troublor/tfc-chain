package cmd

import (
	"fmt"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/spf13/cobra"
	"os"
	"tfc-chain/key"
)

func init() {
	rootCmd.AddCommand(inspectCmd)
}

func isPrivateKey(payload []byte) bool {
	return len(payload) == 32
}

func isPublicKey64(payload []byte) bool {
	return len(payload) == 64
}

func isPublicKey65(payload []byte) bool {
	return len(payload) == 65
}

var inspectCmd = &cobra.Command{
	Use:   "inspect <private key | public key>",
	Short: "Inspect the public key and address of a given private key or address of a given public key",
	Args:  cobra.ExactArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		privateKeyOrPublicKey, err := hexutil.Decode(args[0])
		if err != nil {
			fmt.Printf("Error: %s\n", err.Error())
			os.Exit(1)
		}
		var publicKey []byte
		if isPrivateKey(privateKeyOrPublicKey) {
			publicKey, err = key.PrivateKeyToPublicKey(privateKeyOrPublicKey)
			if err != nil {
				fmt.Printf("Error: %s\n", err.Error())
				os.Exit(1)
			}
		} else {
			publicKey = privateKeyOrPublicKey
		}

		address, err := key.PublicKeyToAddress(publicKey)
		if err != nil {
			fmt.Printf("Error: %s\n", err.Error())
			os.Exit(1)
		}

		if quietFlag {
			if isPrivateKey(privateKeyOrPublicKey) {
				fmt.Println(hexutil.Encode(publicKey))
			}
			fmt.Println(address)
		} else {
			fmt.Println("Inspecting key:")
			if isPrivateKey(privateKeyOrPublicKey) {
				fmt.Printf("Private Key: %s\n", hexutil.Encode(privateKeyOrPublicKey))
			}
			fmt.Printf("Public Key: %s\n", hexutil.Encode(publicKey))
			fmt.Printf("Address: %s\n", address)
		}
	},
}

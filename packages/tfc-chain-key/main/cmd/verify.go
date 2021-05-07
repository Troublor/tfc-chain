package cmd

import (
	"fmt"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/spf13/cobra"
	"os"
	"tfc-chain/key"
)

func init() {
	rootCmd.AddCommand(verifyCmd)
}

func isAddress(payload []byte) bool {
	return len(payload) == 20
}

var verifyCmd = &cobra.Command{
	Use:   "verify <public key | address> <signature> <data bytes in hex>",
	Short: "Verify the given signature with the original binary data (given in hex) and the provided public key or address",
	Args:  cobra.ExactArgs(3),
	Run: func(cmd *cobra.Command, args []string) {
		pubKeyOrAddress, err := hexutil.Decode(args[0])
		if err != nil {
			fmt.Printf("Error: %s\n", err.Error())
			os.Exit(1)
		}
		signature, err := hexutil.Decode(args[1])
		if err != nil {
			fmt.Printf("Error: %s\n", err.Error())
			os.Exit(1)
		}
		data, err := hexutil.Decode(args[2])
		if err != nil {
			fmt.Printf("Error: %s\n", err.Error())
			os.Exit(1)
		}
		var pass bool
		if isAddress(pubKeyOrAddress) {
			pass, err = key.VerifySignatureWithAddress(args[0], signature, data)
		} else {
			pass, err = key.VerifySignatureWithPublicKey(pubKeyOrAddress, signature, data)
		}

		if quietFlag {
			fmt.Println(pass)
		} else {
			fmt.Println("Verifying signature:")
			if isAddress(pubKeyOrAddress) {
				fmt.Printf("Address: %s\n", args[0])
			} else {
				fmt.Printf("Public Key: %s\n", hexutil.Encode(pubKeyOrAddress))
			}
			fmt.Printf("Data: %s\n", hexutil.Encode(data))
			fmt.Printf("Signature: %s\n", hexutil.Encode(signature))
			if pass {
				fmt.Println("Result: true, signature match")
			} else {
				fmt.Println("Result: false, signature mismatch")
			}
		}

	},
}

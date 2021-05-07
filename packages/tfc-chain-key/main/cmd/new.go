package cmd

import (
	"fmt"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/spf13/cobra"
	"os"
	"tfc-chain/key"
)

func init() {
	rootCmd.AddCommand(newCmd)
}

var newCmd = &cobra.Command{
	Use:   "new",
	Short: "Generate a new private key",
	Run: func(cmd *cobra.Command, args []string) {
		privateKey, err := key.GenPrivateKey()
		if err != nil {
			fmt.Printf("Error: %s\n", err.Error())
			os.Exit(1)
		}
		publicKey, err := key.PrivateKeyToPublicKey(privateKey)
		if err != nil {
			fmt.Printf("Error: %s\n", err.Error())
			os.Exit(1)
		}
		address, err := key.PrivateKeyToAddress(privateKey)
		if err != nil {
			fmt.Printf("Error: %s\n", err.Error())
			os.Exit(1)
		}
		if quietFlag {
			fmt.Println(hexutil.Encode(privateKey))
		} else {
			fmt.Println("Generated new key:")
			fmt.Printf("Private Key: %s\n", hexutil.Encode(privateKey))
			fmt.Printf("Public Key: %s\n", hexutil.Encode(publicKey))
			fmt.Printf("Address: %s\n", address)
		}

	},
}

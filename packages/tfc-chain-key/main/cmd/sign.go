package cmd

import (
	"fmt"
	"github.com/ethereum/go-ethereum/common/hexutil"
	"github.com/spf13/cobra"
	"os"
	"tfc-chain/key"
)

func init() {
	rootCmd.AddCommand(signCmd)
}

var signCmd = &cobra.Command{
	Use:   "sign <private key> <data bytes in hex>",
	Short: "Sign the arbitrary binary data (given in hex) with the provided private key",
	Args:  cobra.ExactArgs(2),
	Run: func(cmd *cobra.Command, args []string) {
		privateKey, err := hexutil.Decode(args[0])
		if err != nil {
			fmt.Printf("Error: %s\n", err.Error())
			os.Exit(1)
		}
		data, err := hexutil.Decode(args[1])
		if err != nil {
			fmt.Printf("Error: %s\n", err.Error())
			os.Exit(1)
		}
		sig, err := key.SignData(privateKey, data)
		if quietFlag {
			fmt.Println(hexutil.Encode(sig))
		} else {
			fmt.Println("Signing data:")
			fmt.Printf("Private Key: %s\n", hexutil.Encode(privateKey))
			fmt.Printf("Data: %s\n", hexutil.Encode(data))
			fmt.Printf("Signature: %s\n", hexutil.Encode(sig))
		}
	},
}

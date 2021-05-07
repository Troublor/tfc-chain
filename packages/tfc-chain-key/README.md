# tfc-chain-key

这是一个golang package，封装了以太坊协议中的公私钥算法，提供以下功能：
- 生成新的私钥
- 根据私钥计算公钥
- 根据私钥/公钥计算账户地址
- 使用私钥对任意数据进行签名
- 使用公钥验证任意数据的签名

## 环境要求

- Node.js `14`
- Yarn `1.*`
- Go: `1.6+`

## 命令行接口

### 编译可执行文件

```bash
yarn workspace @tfc-chain/key build
```

编译出的可执行文件在`./bin`目录下。

### 使用方法

生成新的私钥：
```bash
./bin/tfc-chain-key new
```

查看一个私钥所对应的公钥和账户地址：
```bash
./bin/tfc-chain-key inspect <private key | public key>
```

对任意二进制数据签名：
```bash
./bin/tfc-chain-key sign <private key> <binary data in hex>
```

验证签名：
```bash
./bin/tfc-chain-key verify <public key | address> <signature> <binary data in hex>
```

## Go Package

```go
import "github.com/Troublor/tfc-chain/packages/tfc-chain-key/key"
```

生成新的私钥：
```go
privateKey, err := key.GenPrivateKey()
```

查看一个私钥所对应的公钥和账户地址：
```bash
address, err := key.PublicKeyToAddress(publicKey)
address, err := key.PrivateKeyToAddress(privateKey)
publicKey, err := key.PrivateKeyToPublicKey(privateKey)
```

对任意二进制数据签名：
```bash
signature, err := key.SignData(privatekey, data)
```

验证签名：
```bash
pass, err := key.VerifySignatureWithPublicKey(publicKey, signature, data)
pass, err := key.VerifySignatureWithAddress(address, signature, data)
```
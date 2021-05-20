# @tfc-chain/cluster

基于以太坊PoA协议的TFC-Chain区块链网络。
本package包括了部署TFC-Chain的区块链网络的步骤和配置。

## 软件安装

在以太坊Go-Ethereum官网下载预编译的可执行文件`Geth`：https://geth.ethereum.org/downloads/

解压缩之后的可执行文件为`geth`和`ethkey`，将其放入系统PATH所指向的目录中。

其他安装方式参考：https://geth.ethereum.org/docs/install-and-build/installing-geth

## TFC-Chain节点数据目录

新建一个文件夹以存放TFC-Chain的数据：
```bash
mkdir -p ~/blockchain/tfc-chain && cd ~/blockchain/tfc-chain
```
每一个节点都需要这样的一个文件夹，而不同的节点可以在不同的服务器上，也可以在相同的服务器上。

我们定义节点数据目录为DATADIR:
```bash
export DATADIR=~/blockchain/tfc-chain
```

## TFC-Chain账户

新建账户：
```bash
geth --datadir $DATADIR account new
```
这个命令会需要你输入一个passphrase来加密私钥，加密过后的账户私钥会作为一个文件存储在$DATADIR/keystore文件夹中。

查看节点$DATADIR/keystore文件夹的所有账户：
```bash
geth --datadir $DATADIR account list
```

查看$DATADIR/keystore文件夹中一个账户的私钥：
```bash
ethkey inspect --private $DATADIR/keystore/UTC--2021-03-21T06-10-26.232375897Z--d8444321ba7f99883a20ff2157a4e419f92e6fc5
```
注意：`ethkey`命令需要从源码编译Go-Ethereum：https://github.com/ethereum/go-ethereum

其他命令参考[官方文档](https://geth.ethereum.org/docs/interface/managing-your-accounts) 。

## TFC-Chain创世区块

genesis.json: 
```json
{
    "config": {
      "chainId": 9500,
      "homesteadBlock": 0,
      "eip150Block": 0,
      "eip155Block": 0,
      "eip158Block": 0,
      "byzantiumBlock": 0,
      "constantinopleBlock": 0,
      "petersburgBlock": 0,
      "clique": {
        "period": 5,
        "epoch": 30000
      }
    },
    "difficulty": "1",
    "gasLimit": "100000000",
    "gasPrice": "0",
    "extradata": "0x00000000000000000000000000000000000000000000000000000000000000004ba55198b7dd2dcbd7196002ac9579583ff4e8f50000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "alloc": {
      "d8444321ba7f99883a20ff2157a4e419f92e6fc5": { "balance": "2100000000000000000000000000" }
    }
  }
```

说明：
- chainId：标识TFC-Chain的ID。
- clique.period：平均出块时间间隔，单位为秒
- alloc: TFC初始分配给的账户以及金额。TFC的总量在这里规定，且区块链启动之后TFC总量无法增加也不会减少。将`d8444321ba7f99883a20ff2157a4e419f92e6fc5`替换为你想要的账户地址，`2100000000000000000000000000`替换为你想要的TFC总量（此处的金额为最小单位（10^-18），这里相当于21亿TFC）
- extradata：PoA共识协议中有权限出块的账户地址。将`4ba55198b7dd2dcbd7196002ac9579583ff4e8f5`替换为你想要的出块账户地址（不包括开头的0x）。

其他配置信息的说明详见 [以太坊官方文档](https://geth.ethereum.org/docs/interface/private-network) 。

将创世区块配置文件`genesis.json`放入$DATADIR中，并初始化节点上的创世区块：
```bash
geth --datadir $DATADIR init $DATADIR/genesis.json
```
注意，TFC-Chain的每一个节点都需要像这样用相同的genesis.json初始化创世区块。

## 启动bootstrap节点

bootstrap节点帮助其他节点相互发现对方，并建立P2P网络。

选定一个节点，取得该节点的公网IP（例如：172.16.254.4；如果所有节点都处于一个服务器上，这里可以使用127.0.0.1），执行以下命令：
start.sh: 
```bash
geth --datadir $DATADIR --networkid 9500 --nat extip:172.16.254.4 console
```
`networkid`设置为与创世区块中的`chainId`相同。

启动区块链节点后输入`admin.nodeInfo.enr`获取node record：
```bash
> admin.nodeInfo.enr
"enr:-J24QFg02vYiU5q0feU1VWifLwMhSTAFCpE_dXn0hSAR8FrLYGjPeT31oI8g05VR7H9MgE29VvgCkHftjrxyVV9L7zkBg2V0aMfGhPByyWGAgmlkgnY0gmlwhH8AAAGJc2VjcDI1NmsxoQKVJ7uhRzQA75ZB4PhNCrWpvx8bZEs533x7JvE-Za2GB4RzbmFwwIN0Y3CCdl-DdWRwgnZf"
```

## 启动其他普通节点

普通节点如果想要出块，就必须拥有具有出块权限的账户的私钥。

有出块权限的账户在创世区块中指定，或者在一个正在运行的区块链网络上由既有的出块账户投票授权，假设一个具有出块权限的账户已经存在于`$DATADIR/keystore`文件夹中，那么我们创建一个`$DATADIR/keystore/passwords.txt`文件来放入解锁账户的passphrase：
```bash
echo $PASSPHRASE > $DATADIR/keystore/passwords.txt
```

在其他普通节点上（已经完成创世区块初始化），执行以下脚本：

start.sh：
```bash
geth --datadir $DATADIR \
    --networkid 9500 \
    --port 30303 \
    --bootnodes "enr:-J24QFg02vYiU5q0feU1VWifLwMhSTAFCpE_dXn0hSAR8FrLYGjPeT31oI8g05VR7H9MgE29VvgCkHftjrxyVV9L7zkBg2V0aMfGhPByyWGAgmlkgnY0gmlwhH8AAAGJc2VjcDI1NmsxoQKVJ7uhRzQA75ZB4PhNCrWpvx8bZEs533x7JvE-Za2GB4RzbmFwwIN0Y3CCdl-DdWRwgnZf" \
    --syncmode full \
    --allow-insecure-unlock --unlock "0x4ba55198b7DD2dCbd7196002Ac9579583fF4E8f5" --password ./keystore/passwords.txt \
    --miner.etherbase "0x4ba55198b7DD2dCbd7196002Ac9579583fF4E8f5" \
    --miner.gasprice 0 \
    --miner.gaslimit 1000000000 \
    --miner.gastarget 1000000000 \
    --verbosity 3 \
    --http --http.addr 0.0.0.0 --http.corsdomain '*' --http.api admin,eth,web3,debug,net,miner --http.port 8545 \
    --ws --ws.addr 0.0.0.0 --ws.origins '*' --ws.port 8546 \
    --graphql \
    console
```

将`0x4ba55198b7DD2dCbd7196002Ac9579583fF4E8f5`替换为出块账户的地址。
替换`--bootnodes`参数的值为来之前启动的bootstrap节点的node record。

注意：如果多个节点运行在同一个服务器上，修改`--datadir`, `--port`, `--http.port`, `--ws.port`来避免冲突。
- `--datadir`是区块链节点的数据库文件夹路径，（如果多个节点部署在同一个服务器上，每个节点都必须有不同的数据库文件夹）
- `--port`是区块链节点P2P网络通信所用的端口
- `--http.port`是区块链节点HTTP协议接入点所用的端口
- `--port`是区块链节点WebSocket协议接入点所用的端口

详细参数解释参见[以太坊官方文档](https://geth.ethereum.org/docs/interface/command-line-options) 。

## 启动出块（挖矿）

在一个拥有出块权限账户的节点中，执行`miner.start()`命令：
```bash
> miner.start()
null
```

## 投票新增/删除出块账户：

在一个拥有出块权限账户的节点中，执行`clique.propose()`命令：
```bash
> clique.propose("0x4ccf298fddaf02b54308bbba36a502886c34dab9", true)
null
```
或
```bash
> clique.propose("0x4ccf298fddaf02b54308bbba36a502886c34dab9", false)
null
```
`true`代表当前节点的出块账户投票给予该账户出块权限，`false`则代表投票剥夺权限。
将`0x4ccf298fddaf02b54308bbba36a502886c34dab9`替换为被给予/剥夺权限的账户地址。

当超过一半的当前拥有出块权限的账户投票`true`或`false`时，操作生效。

## 查看当前拥有出块权限的所有账户地址

在节点中，执行`clique.getSigners()`命令：
```bash
> clique.getSigners()
["0x03924f30327d3993dd213d9be7b6ce1710213ab8", "0x4ccf298fddaf02b54308bbba36a502886c34dab9"]
```

## TFC-Chain接入点（Endpoint）

前面的启动普通节点的脚本中`--http --http.addr 0.0.0.0 --http.port 8545`选项会开启`http://0.0.0.0:8545`HTTP接入点。
`--ws --ws.addr 0.0.0.0 --ws.port 8545`选项会开启`ws://0.0.0.0:8546`WebSocket接入点。
将`0.0.0.0`替换为公网IP之后即可使用。

## 当前已部署的TFC-Chain

当前部署在crypto1, crypto2, crypto3服务器上的TFC-Chain区块链网络的`genesis.json`创世区块配置以及启动脚本保存在了当前目录下，仅供参考。
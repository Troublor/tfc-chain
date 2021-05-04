# @tfc-chain/core

[![npm version](https://badge.fury.io/js/%40tfc-chain%2Fcore.svg)](https://badge.fury.io/js/%40tfc-chain%2Fcore)

TFC-Chain的以太坊智能合约实现。

[Change Logs](./CHANGELOG.md)

## 合约部署

我们使用 [hardhat](https://hardhat.org/) 作为智能合约开发框架。部署合约的hardhat脚本可以在 [tasks.tx](./tasks.ts) 中找到，使用方法如下：

1. 修改yaml配置文件：

复制env.example.yml为env.yml，这是本项目的环境变量配置文件，配置TFC-Chain（以太坊）接入点和部署合约所使用的TFC-Chain（以太坊）账户私钥。关于TFC-Chain（以太坊）接入点和账户参考[这里](../tfc-chain-cluster/README.md)。

env.yml: 
```yaml
endpoint: ETHEREUM_ENDPOINT
accountPrivateKey: 
  - PRIVATE_KEY
```

2. 运行部署脚本：

```bash
yarn workspace @tfc-chain/core hardhat deploy --sector-reward 100000000000000000 --seed-reward 100000000000000000 --verify-reward 100000000000000000 --lock-period 90 --submit-proof-timeout 6 --verify-proof-timeout 12 --verify-threshold 3
```

以上脚本包含了智能合约的一些初始配置：
- 0.1 TFC 作为sector验证通过的奖励
- 0.1 TFC 作为seed被用作验证之后的奖励
- 0.1 TFC 作为验证proof的奖励
- sector奖励锁定90个周期（例如，第一次的奖励在第九十次奖励发出时解锁）
- sector拥有者必须在sector被选中进行验证的事件发生后6个区块的时间内上传proof
- sector验证者必须在proof上传之后12个区块内提交验证结果
- 至少3个验证者认为验证通过/失败后，sector被认为仍然有效（发放奖励）或已经失效（扣除押金）

3. 保存部署的合约地址：

部署完成后会在控制台打印TurboFil智能合约的地址。
将这个地址复制后更新到`deployment.json`文件中。
@tfc-chain/core会作为一个独立的node.js包发布，提供调用合约的底层API，deployment.json文件中的合约地址会随着这个包一起发布。

## 测试

智能合约的单元测试使用hardhat+jest编写，源码在[test](./test)文件夹中。

```bash
yarn workspace @tfc-chain/core test
```

## 合约设计

[DESIGN.md](DESIGN.md)


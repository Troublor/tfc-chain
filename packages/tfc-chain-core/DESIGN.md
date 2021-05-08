# TurboFil 智能合约设计

## 五种账户角色

![Roles](./img/roles.jpg)

TurboFil的智能合约设计中包括了五种角色，分别有不同的权限来执行不同的交易。
每个角色都可以有多个TFC-Chain上的账户。
每个账户也可以同时有多种角色。

账户角色的智能合约实现继承了`Openzeppelin`代码库中的[`AccessControl.sol`](https://docs.openzeppelin.com/contracts/4.x/access-control) 合约，可以使用相关接口。

### Admin (DEFAULT_ADMIN_ROLE)

属于Admin角色的账户拥有权限管理的权限。可以：
- 给其他账户授权某一种角色及其权限
- 收回其他账户的角色及其权限

#### 命令行调用

1. 设置交易发起账户和TFC-Chain接入点：[见配置文件设置](./README.md#配置文件) 。交易发起账户必须是Admin角色。
2. 执行hardhat task:

**给一个账户赋予角色及其权限**
```bash
yarn workspace @tfc-chain/core hardhat --network development grant-role --role <role> --account <address>
```

**收回一个账户的角色**
```bash
yarn workspace @tfc-chain/core hardhat --network development revoke-role --role <role> --account <address>
```
其中：
- `<role>`是角色种类，可选值为：`DEFAULT_ADMIN_ROLE`, `MAINTAIN_ROLE`, `SECTOR_ROLE`, `SEED_ROLE`, `VERIFY_ROLE`。
- `<address>`是被授予/收回角色的账户地址

### Maintainer (MAINTAIN_ROLE)

属于Maintainer角色的账户拥有维护TurboFil的权限。包括：
- 设置Sector验证通过时给予SectorOwner的奖励
- 设置Sector验证完成时给予SeedSubmitter的奖励
- 设置Sector验证完成时给予ProofVerifier的奖励
- 设置Sector验证完成需要的最少的提交验证结果的ProofVerifier数量
- 设置SectorOwner获得的奖励的锁定时间
- 设置SectorOwner提交Proof的时间限制
- 设置ProofVerifier验证Proof的时间限制
- 向TurboFil智能合约转账，TurboFil智能合约的TFC余额会用于发放奖励
- 提取TurboFIl智能合约中的所有TFC余额

#### 命令行调用

1. 设置交易发起账户和TFC-Chain接入点：[见配置文件设置](./README.md#配置文件) 。交易发起账户必须是Maintainer角色。
2. 执行hardhat task:

**设置Sector验证通过时给予SectorOwner的奖励**
```bash
yarn workspace @tfc-chain/core hardhat --network development set-sector-reward --reward <reward>
```

**设置Sector验证完成时给予SeedSubmitter的奖励**
```bash
yarn workspace @tfc-chain/core hardhat --network development set-seed-reward --reward <reward>
```

**设置Sector验证完成时给予ProofVerifier的奖励**
```bash
yarn workspace @tfc-chain/core hardhat --network development set-verify-reward --reward <reward>
```
其中`<reward>`为奖励金额，是一个用TFC最小单位表示的整数。

**设置Sector验证完成需要的最少的提交验证结果的ProofVerifier数量**
```bash
yarn workspace @tfc-chain/core hardhat --network development set-verify-threshold --threshold <threshold>
```
其中`<threshold>`代表验证proof时，能对proof是否有效达成共识的最小的proofVerifier的数量。

**设置SectorOwner获得的奖励的锁定时间**
```bash
yarn workspace @tfc-chain/core hardhat --network development set-lock-period --period <period>
```
其中`<period>`代表sector奖励的锁定周期。
例如：period=90 代表每一个给SectorOwner新发放的奖励，会在之后第90次发放奖励时解锁。

**设置SectorOwner提交Proof的时间限制**
```bash
yarn workspace @tfc-chain/core hardhat --network development set-submit-proof-timeout --timeout <timeout>
```
其中`<timeout>`代表当链上发出验证sector要求后，sectorOwner提交proof的时间限制，以区块数量来计算时间。
例如：timeout=6，代表链上发出验证sector要求后，sectorOwner必须在6个区块内提交proof，否则会被惩罚。

**设置ProofVerifier验证Proof的时间限制**
```bash
yarn workspace @tfc-chain/core hardhat --network development set-verify-proof-timeout --timeout <timeout>
```
其中`<timeout>`代表当sectorOwner提交proof后，proofVerifier进行验证并提交验证结果的时间限制，以区块数量来计算时间。
例如：timeout=6，代表当sectorOwner提交proof后，proofVerifier必须在6个区块内提交proof的验证结果，否则不会收到验证奖励。

**向TurboFil智能合约转账，TurboFil智能合约的TFC余额会用于发放奖励**
```bash
yarn workspace @tfc-chain/core hardhat --network development fund-turbofil --amount <amount>
```
其中`<amount>`为向TurboFil智能合约转账的金额，是一个用TFC最小单位表示的整数。

**提取TurboFIl智能合约中的所有TFC余额到调用者账户**
```bash
yarn workspace @tfc-chain/core hardhat --network development withdraw-turbofil
```

### SectorOwner (SECTOR_ROLE)

SectorOwner角色的账户拥有提交Sector的权限，通常来说，每一个RNode是SectorOwner。
SectorOwner在收到链上发出的验证要求后，需要提交proof。

#### 命令行调用

1. 设置交易发起账户和TFC-Chain接入点：[见配置文件设置](./README.md#配置文件) 。交易发起账户必须是SectorOwner角色。
2. 执行hardhat task:

**提交Sector**
```bash
yarn workspace @tfc-chain/core hardhat --network development submit-sector --afid <afid>
```
其中`<afid>`为sector的afid-lite，为28个字节的hex字符串。

**监听Sector验证要求**
```bash
yarn workspace @tfc-chain/core hardhat --network development listen-verification-task --sector <sector>
```
其中`<sector>`为sector的在链上对应的地址（Sector合约地址）。`--sector`选项也如果被省略，则监听所有sector。

**提交Proof**
```bash
yarn workspace @tfc-chain/core hardhat --network development submit-proof --verification <verification> --afid <afid>
```
其中`<verification>`为本次verification的ID（Verification合约地址），`<afid>`为proof的afid-lite，为28个字节的hex字符串。

### SeedSubmitter (SEED_ROLE)

SeedSubmitter角色的账户拥有提交Seed的权限。
在Seed被成功用于验证sector之后，会获得奖励（seed reward）

#### 命令行调用

1. 设置交易发起账户和TFC-Chain接入点：[见配置文件设置](./README.md#配置文件) 。交易发起账户必须是SeedSubmitter角色。
2. 执行hardhat task:

**提交Seed**
```bash
yarn workspace @tfc-chain/core hardhat --network development listen-verification-task --afid <afid>
```
其中`<afid>`为seed的afid（afid-lite），为28个字节的hex字符串。

### ProofVerifier (VERIFY_ROLE)

ProofVerifier角色的账户负责在SectorOwner提交proof后进行验证，并提交验证结果。
验证结果生效后会获得奖励（verify reward）。

#### 命令行调用

1. 设置交易发起账户和TFC-Chain接入点：[见配置文件设置](./README.md#配置文件) 。交易发起账户必须是ProofVerifier角色。
2. 执行hardhat task:

**监听Sector Proof的提交**
```bash
yarn workspace @tfc-chain/core hardhat --network development listen-proof-submission
```

**提交Proof验证结果**
```bash
yarn workspace @tfc-chain/core hardhat --network development verify-proof --verification <verification> --result <result>
```
其中`<verification>`为本次verification的ID（Verification合约地址），`<result>`为proof验证是否通过的bool值。

TO BE CONTINUED...

## 数据结构
TFC-Chain中，每一个RNode，Sector，Seed都对应一个智能合约。
注册RNode就相当于在链上创建为这个RNode创建一个智能合约。
每提交一个Sector/Seed就会在链上创建一个Sector/Seed智能合约。

### TurboFil 合约
TurboFil合约在链上只有一个， 是TFC-Chain大部分功能的调用入口。
因为区块链的去中心化特性，链下程序调用以下函数之后无法立即得到调用结果。
每个函数的成功调用都会发出事件。链下程序需要监听这些事件来获知哪些功能被调用了。

主要提供的函数为：

#### 注册RNode

##### 前提条件
交易发起账户拥有`REGISTER_ROLE`权限。

```solidity
/// @notice Register a RNode. Caller must have REGISTER_ROLE privilege.
/// @dev This function create a RNode contract.
/// @param owner_ address of the owner of the RNode
/// @param afid_ afid of the RNode
/// @return address of the created RNode contract
function registerRNode(address owner_, string calldata afid_) public returns (address) 
```
此函数会创建一个对应的RNode（一个链上合约），并发出一个事件：
```solidity
event RegisterRNode(address owner, address rnode, string afid);
```

#### 提交Sector
##### 前提条件
交易发起账户拥有`SUBMIT_ROLE`权限。

```solidity
/// @notice Submit a sector. Caller must have SUBMIT_ROLE privilege. The transaction must pay 3 TFC as deposit.
/// @dev This function create a Sector contract corresponding to the submitted sector.
///      The current design is that this function is typically called by an administrator on behalf of the sector owner.
/// @param rnode_ address of the RNode contract that this sector belongs to.
/// @param afid_ afid of the sector
/// @param merkleRoot_ merkle root of the sector
/// @return address of the created Sector contract
function submitSector(IRNode rnode_, address submitter_, string calldata afid_, string calldata merkleRoot_) payable public returns (address)
```
提交Sector需要在交易中附上3TFC的转账，用于抵押。
此函数会创建一个Sector（一个链上合约），并发出一个事件：
```solidity
event SubmitSector(address submitter, address sector, string afid);
```

#### 提交Seed
##### 前提条件
交易发起账户拥有`SEED_ROLE`权限。

```solidity
/// @notice A mobile user uses this function to submit a seed (photo).
/// @dev A submitted seed should not get reward until it gets at least 3 likes.
///      The current design is that this function is typically called by an administrator on behalf of the seed submitter.
/// @param submitter_ address of the submitter
/// @param afid_ afid of the seed
/// @return address of the created Seed
function submitSeed(address submitter_, string calldata afid_) public returns (address)
```
此函数会创建一个Seed（一个链上合约），并发出一个事件：
```solidity
event SubmitSeed(address submitter, address seed, string afid);
```

#### 使用Sector验证Seed
##### 前提条件
交易发起账户拥有`VERIFY_ROLE`权限。
Seed必须获得至少三个点赞。

```solidity
/// @notice Verify a sector with a seed. Submit the verification result.
/// @dev The current design is that this function is typically called by an administrator, which is subject to change in the future.
/// @param sector_ address of the sector to verify
/// @param seed_ address of the seed to use
function verifySector(Sector sector_, Seed seed_, bool success_) public 
```
此函数实际上是用于提交Sector的验证结果，链下程序需要先选择一个Seed和Sector，在链下完成Sector验证，然后用验证结果调用此函数。
此函数发出一个事件：
```solidity
event VerifySector(address sector, address seed, bool success);
```

#### 每日分账
##### 前提条件
交易发起账户拥有`REWARD_ROLE`权限。

```solidity
/// @notice This function receive the total amount of TFC that should be released today and distribute to users.
///         Caller must pay a certain amount of TFC to distribute across miners based on their contribution.
/// @dev The current design is that this function is typically called by an administrator, which is subject to change in the future.
function distributeTFC() payable public
```
管理员账户调用此函数并在交易中附上当日分账的总额。
此函数会根据今日的提交/验证Sector的情况给各个账户分账。

### Seed 合约
每一个Seed都在链上对应一个合约。

#### 照片点赞/点踩

```solidity
/// @notice To evaluate a seed by liking or disliking it. 
/// @dev Each address can only evaluate a seed once. 
/// @param evaluator_ address of the user who evaluate this seed.
/// @param like_ whether the user likes this seed (photo)
function evaluate(address evaluator_, bool like_) public
```
调用此函数来记录用户对于照片的点赞或点踩。
此函数会发出一个事件：
```solidity
event EvaluateSeed(address seed, string afid, address evaluator, bool like);
```

#### 查询当前照片的点赞数和点踩数。
```solidity
function likes() view external returns (uint256);
function dislikes() view external returns (uint256);
```
注意这两个函数的调用不需要发起交易，可以立刻得到调用结果。

### 分账合约TFCShare

分账合约分别有四个，分别对应四种类别的分账：
- sectorSubmissionShare：管理每日sector提交相关的分账
- sectorVerificationShare：管理每日sector验证相关的分账
- seedSubmissionShare：管理每日seed提交相关的分账
- seedEvaluationShare: 管理每日seed点赞/点踩的分账

每一个TFCShare合约在分账时都会产生一系列的事件，来记录分账的具体信息：
```solidity
event Reward(address recipient, uint256 amount, uint256 timestamp);
```
链下程序可以监听/检索这个事件来获取账户的收益历史。

### RNode合约

当RNode合约收到TFC转账之后，会发出以下事件：
```solidity
event ReceiveTFC(address from, uint256 value);
```
链下程序可以监听这个事件以获知用户向RNode的转账。

## @tfc-chain/core 

当前测试版合约已经部署在crypto1测试网络上，部署的合约可以通过`@tfc-chain/core` npm package获得。
```typescript
import * as tfc from '@tfc-chain/core';
```

`@tfc-chain/core`中预定义了已经部署在测试链上的合约（ethers.js Contract Instance)
```typescript
// ethers.js Contract Instance
tfc.networks.development.TurboFil.contract;
tfc.networks.development.TFCShare.sectorSubmissionShare;
tfc.networks.development.TFCShare.sectorVerificationShare;
tfc.networks.development.TFCShare.seedSubmissionShare;
tfc.networks.development.TFCShare.seedEvaluationShare;
```

在使用这些合约对象之前记得要链接Signer来做调用函数时的交易签名。
```typescript
import * as ethers from 'ethers';
import * as tfc from '@tfc-chain/core';

// 以太坊接入点url
const provider = ethers.getDefaultProvider('http://localhost:8545');

const privateKey = "...";
const wallet: ethers.Signer = new ethers.Wallet(privateKey, provider);
// 使用wallet账户作为交易发起（签名）账户
const turbofil = tfc.networks.development.TurboFil.contract.connect(wallet);
// 发起注册RNode交易
const tx = await turbofil.registerRNode(...);
// 等待交易被至少一个区块确认
await tx.wait(1);
```

## Playground Functions

[`src/playground/index.ts`](./src/playground/index.ts)中有一些调用智能合约以及监听事件的例子。

其中实现了一个Mock运行环境，可以在本地环境模拟智能合约的调用。
[`src/playground/index.ts`](./src/playground/index.ts)文件中的每一个函数是一个使用Mock环境调用智能合约的例子。
你可以参考其中的用法，在尝试调用智能合约。
这在开发阶段非常有用。

```typescript
import * as mockTfc from '@tfc-chain/core/src/playground';

mockTfc.getSeedEvaluationEventsEmittedInHistory();
```
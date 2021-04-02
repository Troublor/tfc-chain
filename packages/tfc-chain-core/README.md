# TurboFil 智能合约设计

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
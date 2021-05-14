# TFC-Chain 架构设计

## Sector提交

### 流程

新的sector后由挖出这个sector的RNode提交afid至TFC-Chain，同时需要缴纳相当于N次验证收益的TFC作为押金。

链上会新生成一个Sector合约。押金分成N份放入奖励发放队列，锁在合约中。

sector合约保存在一个全局数组中，记录历史上所有提交的sector。

sector合约中记录sector的拥有者，afid，以及当前奖励发放的队列。

奖励发放队列固定长度，每次有新的奖励发放则放入队列尾，相应的会将最早入队列的奖励（90次之前，队列头）的从队列中拿出来，转账给sector拥有者RNode。

### 分析

#### 合约触发：

奖励的发放无需额外交易来触发，在新奖励发放时自动解锁N次前的奖励。

#### 交易负载：

每提交一个sector只需要一个交易。

#### 可信度：

任何在链上账户都可以提交sector，但提交的同时必须交押金。由于sector验证的过程该账户无法控制，所以如果提交的sector是无效的，那么该账户就会损失押金。

### 说明

N是一个可变变量。

## Sector验证

### 流程

由链下程序负责收集有效的seed（例如：拥有足够点赞数）并提交afid（也就是check_afid）到链上。链上验证seed没有被使用过，并用这个afid来随机选择一个sector进行验证。

选择被验证的sector的算法：`index = seed * timestamp % sector_list_length` index即为被选择的sector在包含所有sector列表中的索引。

选中sector后会创建一个Verification合约，负责本次sector验证逻辑。同时发出一个事件，包含验证三元组：`<sector, seed, verification>`。sector的拥有者有义务监听链上的事件，并生成proof然后提交proof`<sector, seed, proof>`到Verification合约中。

proof提交到链上之后等待其他超级账户（具有验证权限的账户）验证，超过M个超级账户认为验证结果通过（或失败）之后发放奖励（或惩罚）（sector的拥有者不能提交验证结果）。如果超过规定时间sector拥有者没有提交proof，则认为验证失败，扣除所有奖励。

如果验证结果通过：

- 生成一个新的奖励放入Sector合约的奖励队列末尾，如果队列长度超过了N，那么则取出队列头部的一个奖励，转账给sector所属的RNode。
- 发放奖励给提交了验证结果的超级账户。
- 发放奖励给seed提交者。

如果验证结果为通过：

- 清空sector奖励队列，将队列中的所有奖励转账给一个奖金池（惩罚）。
- 发放奖励给提交了验证结果的其他超级账户。
- 发放奖励给seed提交者。

如果超出规定时间没有获得足够多的验证投票数，那么此次sector验证无效，既不发放奖励也不惩罚。

### 可变参数

- sector提交proof并验证通过的奖励额
- sector验证proof的奖励额
- seed被用于验证的奖励额
- sector奖励锁定的周期
- sector验证要求的最低投票数（暂定为超级账户总数的半数）
- 提交proof的期限（暂定为sector验证事件发出后6个block（约30s））
- 验证proof的期限（暂定为proof提交后12个block（约60s））

### 分析

#### 合约触发：

sector的验证操作由seed的提交来触发，每提交一个seed就验证一次。无需额外交易触发。

proof投票时每次投票就判断是否超过半数，如果超过半数则投票过程终止，发放奖励。

超过规定时间没有提交proof的sector，无法自动惩罚sector，但可以由任意超级账户发起交易调用Verification合约中的惩罚函数（这种情况应该不会太多，因为sector拥有者有动力总是提交proof，否则会损失押金）。

#### 交易负载：

验证sector需要三个阶段：第三者提交seed，sector拥有者提交proof，其他超级账户提交验证结果。

第一个阶段中选择被验证的sector的过程的计算复杂度为`O(1)`。

第二个阶段中提交proof计算复杂度同样为`O(1)`。

第三个阶段中，如果验证结果为通过，计算复杂度为`O(1)`。如果验证结果为未通过，计算复杂度仍可为`O(1)`。奖励队列的实现算法为：

```solidity
struct RewardQueue {
	mapping(uing256 => uint256) queue;
	uint256 startIndex;
	uint256 length;
	uint256 totalReward;
}

/// @notice 发放一个新的奖励，返回解锁的奖励金额。
function addReward(uint256 lockAmount) public returns (uint256 unlockedAmount) {
	uint256 index = RewardQueue.startIndex + RewardQueue.length;
	RewardQueue.queue[index] = lockAmount;
	RewardQueue.length++;
	RewardQueue.totalReward += lockAmount;
	
	if (RewardQueue.length > 90) {
		unlockAmount = RewardQueue.queue[RewardQueue.startIndex];
		RewardQueue.startIndex ++;
		RewardQueue.totalReward -= unlockAmount;
	}
	return unlockAmount;
}

/// @notice 验证为通过，惩罚。返回扣除的奖励金额。
function punish() public returns (uint256 punishAmount) {
	punishAmount = RewardQueue.totalReward;
	RewardQueue.startIndex = 0;
	RewardQueue.length = 0;
	RewardQueue.totalReward = 0;
	return punishAmount;
}
```

#### 可信度：

为了避免有选择性的提交seed来操纵sector选择的结果（影响`index`计算的算法）。index计算的算法中增加了一个时间戳（交易执行时所在区块的时间戳），来为sector选择增加一定的随机性。

**注意**： 以太坊私有链每一个区块的时间戳原则上是出块时刻的时间戳，但是出块节点对此有一定的自由度（例如，早一秒或晚一秒）。在以太坊主网上，因为矿工都是不可信的，所以用时间戳来增加随机性会有被挟持的危险。但是TFC-Chain使用PoA协议，所有出块节点（以太坊矿工）都需要经过认证。我们可以认为这些出块节点是诚实可信的。

#### 奖励分配：

- sector所属RNode
- 验证proof的其他RNode
- 提交seed的账户

## 性能/交易吞吐量

经过实验，保守估计私有链能够处理每秒50个交易。换算到每天即为432万个交易。

如果将每日验证（seed提交）的次数的上限定于100万次（这是上限，初期很可能不需要这么多），那么每日验证则需要200万个交易。

每日提交sector的数量理论上应小于每日验证的最大次数（100万），不然随着时间增长，每个sector被验证的概率会非常低。

因此，保守估计的交易吞吐量能够满足设计要求。

## TFC-DB（链下程序）职责

- 收集Seed，以及点赞点踩的信息。提交seed到链上进行sector验证。
- seed验证的奖励会发放到用于提交seed的账户（如果是DB负责提交，那就是DB的账户），DB需要记录分账信息，决定如何将这个账户获得的奖励发放给照片上传者点赞点踩者。

## RNode职责

- 提交Sector至链上，并缴付押金。
- 监听自己拥有的sector验证事件，提交proof到链上。
- 若为超级账户（拥有验证proof的权限）则需要监听其他RNode提交proof的事件，验证proof并提交结果到链上。
- sector验证的奖励会发放给RNode的账户，RNode自身需要记录FNode的分账信息，决定如何将奖励分配给FNode。
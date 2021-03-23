# 基于以太坊的TFC-Chain

以太坊支持图灵完全的智能合约，因此TFC-Chain的大部分逻辑都可以在智能合约中实现。

## 共识协议

### Proof-of-Work (PoW)

PoW是以太坊主网用到的共识协议，主要特征有：

- 挖矿耗费资源较多
- 出块时间间隔不确定
- 安全性高
- 任何人都可以加入挖矿

### Proof-of-Authority (PoA)

PoA是以太坊支持的另一个共识协议，一般用于测试链和私有链，主要特征：

- 挖矿不耗费资源
- 出块时间间隔固定
- 新矿工必须通过既有矿工的投票后才可加入挖矿

**TFC-Chain使用PoA较为合适**，其挖矿不耗费资源，出块稳定。

## TFC币

由于私有链有其自身的原生货币（native currency），例如ETH。

因此我们可以在TFC-Chain上使用原生货币作为TFC。

如果使用PoA共识协议，挖矿不产生TFC。则私有链初始化时需要将21亿TFC分配给一个保留账户，每天释放的TFC从这个保留账户中转出并分账。

TFC-Chain上的交易将使用TFC支付交易手续费。

PoA也支持将交易手续费设为零。

## 设计方案（草案）

TFC-Chain，用户注册、提交扇区/种子、分账，ERC20体现等业务都可以在智能合约中实现。

### 数据结构

```solidity
contract TurboFil {
    struct Mobile {
      string phone; // phone number
    }
  
    struct Account {
        address recommender;
        Mobile[] mobiles;
        RNode[] rnodes; 
        FNode[] fnodes; 
    }

    mapping(address => Account) accounts; // a mapping from account address to its info struct
}
```

每个账户（对应一个地址）：

- 有且仅有一个推荐者账户（地址）
- 可以有多个手机号
- 可以有多个RNode
- 可以有多个FNode

```solidity
contract RNode {
  string id;
  FNode[] fnodes; // a list of fnodes

  Sector[] sectors;

  struct Sector {
    address submitter; // the account that mines this sector
    string afid; // the afid of this sector
    string merkleRoot; // the merkle root of this sector
    Seed[] seeds;
  }

  struct Seed {
    address submitter; // the account who takes this photo as seed
    address[] verifiers; // the list of accounts who have verified the seed
    string afid; // afid of this photo
    uint256 timestamp; // timestamp of this photo
    string sectorId; // the id of the sector
    string sectorAfid; // the afid of the sector
    string merkleRoot; // the merkle root of the sector
  }
}

contract FNode {
  string id;
  Sector[] sectors;

  struct Sector {
    address submitter; // the account that mines this sector
    string afid; // the afid of this sector
    string merkleRoot; // the merkle root of this sector
    Seed[] seeds;
  }

  struct Seed {
    address submitter; // the account who takes this photo as seed
    address[] verifiers; // the list of accounts who have verified the seed
    string afid; // afid of this photo
    uint256 timestamp; // timestamp of this photo
    string sectorId; // the id of the sector
    string sectorAfid; // the afid of the sector
    string merkleRoot; // the merkle root of the sector
  }
}
```
RNode和FNode都包含扇区（Sector）列表。
每个扇区都包含一个种子（Seed）列表用于存储验证当前扇区的种子列表。
每个种子都包含一个验证该种子都账户列表。

### 用户注册

TFC-Chain上的账户不需要注册，只需要有一个密钥对即可。

对于用户的注册，一个新的用户使用他的账户调用`register`函数来注册（绑定推荐人）。

**注意**: 调用函数的账户不需要在函数参数列表中给出，它是一个全局变量。

```solidity
function register(address recommender) public 
```

随后可以调用一下三个函数来分别注册属于这个账户的手机号、RNode或FNode：
```solidity
function registerMobile(string phone) public
```
`registerMobile` 将用户的手机号保存在其账户的`mobiles`列表中。

```solidity
function registerFNode(string id) public
```
此函数将会创建一个`FNode`合约，将合约地址注册在用户账户的`fnodes`列表中。

```solidity
function registerRNode(string id) public
```
此函数将会创建一个`RNode`合约，将合约地址注册在用户账户的`rnodes`列表中。

### 提交扇区/种子

提交扇区或种子同样需要在`FNode`或`RNode`中实现以下智能合约函数：

```solidity
function submitSector(string afid, string merkleRoot) public
```
由于此函数在`RNode`或`FNode`合约中，所以我们已经知道扇区属于哪个`RNode`或`FNode`。
提交扇区只是矿工用其账户提交扇区的`afid`和`merkleRoot`，扇区的内容不存储在链上。
此函数创建一个新的`Sector`结构体存储在`FNode`或`RNode`的`sectors`列表中。

```solidity
function submitSeed(string afid, uint256 timestamp, string sector_afid, string sector_merkleRoot) public
```
由于此函数在`RNode`或`FNode`合约中，所以我们已经知道种子属于哪个`RNode`或`FNode`。
提交种子需要手机矿工用其账户提交种子的`afid`和`timestamp`，种子的内容同样不存储在链上。
此外，还需要种子对应的扇区的`afid`和`merkleRoot`。
此函数创建一个新的`Seed`结构体存储在`FNode`或`RNode`中对应的`sector`的`seeds`列表中。

```solidity
function submitSeedVerification(string sector_afid, string sector_merkleRoot, string seed_afid) public
```
由于此函数在`RNode`或`FNode`合约中，所以我们已经知道种子属于哪个`RNode`或`FNode`。
此函数由手机账户发起来验证种子（评价照片）。
此函数将手机账户的地址存储在种子的`verifiers`列表中。

### 分账

由于以太坊上的智能合约不能自动触发执行，因此需要有一个链下节点周期性地（每日）调用智能合约中的分账函数：

```solidity
function distributeReward() public
```
由于挖矿（提交扇区种子等）奖励的发放是每天发放一次，而扇区种子的提交是随时可能发生的，因此我们在这里使用分阶段提交的方式。

#### 第一阶段
提交的扇区和种子等存储在一个临时的列表中，标记其未得到奖励。

#### 第二阶段
调用分账函数时将当天处于第一阶段提交的扇区和种子统计并发放奖励，然后将他们移至永久的存储列表中。

此分账函数需要：
- 首先根据每日的在线sector数量计算当日发放的TFC总额（未发放的TFC由`TurboFil`合约持有）
- 根据处于第一阶段提交的扇区和种子，按照经济模型给每一个账户进行分账，发放TFC。

### ERC20提现

ERC20提现是指将TFC提现至以太坊主网（或测试网）的ERC20代币。

```solidity
function withdrawToErc20() payable public
```
提现时需要用户调用合约中的此函数，并附上需要提现的金额。
此函数会将收到的TFC金额销毁，然后发出一个event，声明一个提现请求。
链下需要有一个服务器监控是否有新的提现请求，如果有则在以太坊上进行ERC20铸币。

### 扇区/种子验证

链上智能合约无法使用种子来验证扇区，因此需要有一个链下的服务器验证扇区，并提交验证完成的种子（以及验证结果）至链上智能合约。

也就是说，智能合约**无法**对提交的扇区/种子的有效性进行检查，因为这种检查需要一些链下的操作，而智能合约无法进行这些操作。
后台程序在提交扇区/种子之前必须保证其有效性。

### 注意事项
以上叙述没有包括用户验证和安全性。
实际是实现时需要增加必要的函数和功能来保证合约调用的安全性，例如，只允许有权限的用户提交扇区/种子等。

## 跨链互操作性

### 智能合约调用链下API

[Provable]([Provable - blockchain oracle service, enabling data-rich smart contracts](https://provable.xyz/))
可以对基于以太坊的区块链提供一个链上链下交互的机制。

基本原理为：Provable维护一个监控进程，监控智能合约中函数调用所产生的事件，然后调用链下相应的API或其他服务，链下调用的结果会通过再次调用智能合约的``__callback``函数将结果传给智能合约。

## 查询

智能合约的函数在执行时可以触发事件（在链上留下log），查询的时候只需要检索这些log即可。

例如，分账函数可以触发一个事件并在链上留下log。检索这些log即是账户的收益流水。

## 开发计划

### 区块链

区块链的架构无需开发，只需要部署一个私有链，需要花费的时间<1天。

### 智能合约

TFC-Chain的开发主要在于智能合约的编写（以下计划不包括智能合约开发的学习时间）。

- 第一周：
    - 确定用户信息在智能合约中存储的数据结构
    - 实现相关用户注册的函数。
    - 确定用户提交的扇区和种子在智能合约中如何和用户信息绑定。
- 第二周：
    - 设计简洁高效的提交事件。这些事件在提交扇区/种子时触发并在链上留下log，以供未来查询。
    - 实现提交扇区/种子的函数。
    - 编写一个自动化压力测试脚本，模拟真实提交扇区/种子的频率，在单节点私有链上测试交易处理性能和空间占用。
- 第三周：
    - 实现分账逻辑。
    - 在分账函数中设计可供查询分账记录的事件。
    - 分账函数需要链下每天主动调用来触发分账，使用Provable服务或编写后台常驻脚本以周期调用合约。
    - 扩充自动化压力测试脚本，增加分账的测试。
- 第四周：
    - 实现提现逻辑。
    - 在链下实现一个中转程序，监听TFC-Chain上提现的请求事件，并在以太坊上铸造TFC-ERC20代币。
    - 集成测试ERC20提现功能。
- 第五周：
    - 封装智能合约合约的调用，将以太坊调用的实现细节隐藏在RESTful API或SDK中，提供一个与TFC-DB一致的易于使用的接口。
    - 如果人手足够，此步骤可以与前四周的实现同步进行。


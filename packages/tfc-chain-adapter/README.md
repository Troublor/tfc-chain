# @tfc-chain/adapter

`@tfc-chain/adapter`包的目的为：为链下程序调用智能合约提供便利。
`@tfc-chain/adapter`包中封装了`ethers.js`API，并提供了调用`@tfc-chain/core`合约的简易API，而无需了解以太坊API。

## 安装

```
# NPM
npm i @tfc-chain/adapter

# Yarn
yarn add @tfc-chain/adapter
```

## 主要功能

- TurboFil合约维护: 账户权限管理, 设置参数（奖励数量等） 等. (需要MAINTAIN_ROLE权限)
- 提交Sector (需要SECTOR_ROLE权限).
- 提交Seed (需要SEED_ROLE权限).
- 监听链上发出的要求提供sector proof的事件.
- 提交 sector proof (RNode账户).
- 验证sector proof (需要VERIFY_ROLE权限).

## 缺陷

`@tfc-chain/adapter`包没有提供故障恢复的功能。也就是说，如果程序退出再重新启动，再程序没有运行的这段时间内发生的事件将无法被监听。

为了解决这个问题，监听事件的API中可以指定从哪一个block开始监听，链下程序可以记录程序退出时的block number，下次启动监听时指定block number。

## 设计结构

`@tfc-chain/adapter`包API设计是给予账户角色的，目前有五种角色：
- Deployer: 部署合约的账户，负责TurboFil的权限管理
- Maintainer：负责日常维护TurboFil合约，例如更改奖励数量等
- RNode：RNode所对应的账户，负责提交sector及其proof
- Verifier：负责验证sector proof
- SeedSubmitter：负责提交seed

### Deployer

Deployer对应拥有智能合约中DEFAULT_ADMIN_ROLE权限的账户，即为TurboFil合约的部署者。

用法如下：

```typescript
import {Deployer} from '@tfc-chain/adapter';

const endpoint = 'http://localhost:8545';
const privateKey = '0x......';
const turboFilAddress = '0x......';

const deployer = new Deployer(endpoint, privateKey, turboFilAddress);

const anotherAddress = '0x......';
await deployer.grantMaintainRole(anotherAddress);
await deployer.grantSectorRole(anotherAddress);
await deployer.grantSeedRole(anotherAddress);
await deployer.grantVerifyRole(anotherAddress);
```

### Maintainer

Maintainer对应拥有智能合约中MAINTAIN_ROLE权限的账户。

用法如下：

```typescript
import {Maintainer} from '@tfc-chain/adapter';

const endpoint = 'http://localhost:8545';
const privateKey = '0x......';
const turboFilAddress = '0x......';

const maintainer = new Maintainer(endpoint, privateKey, turboFilAddress);

await maintainer.setSectorReward(1); // the reward given to sector owner after each verification passes.
await maintainer.setSeedReward(1); // the reward given to seed submitter after each verification passes.
await maintainer.setVerifyReward(1); // the reward given to proof verifier after each verification passes.
await maintainer.setVerifyThreshold(1); // 验证sector proof需要的最少验证数
await maintainer.setSubmitProofTimeout(6); // RNode提交proof的期限，这个数字为block数量，意为再seed提交后x个block之内RNode必须提交proof
await maintainer.verifyProofTimeout(12); // 验证sector proof的期限，同样为proof提交后block的数量
await maintainer.setLockPeriod(90); // 押金锁定的周期
```

### RNode

RNode对应拥有智能合约中SECTOR_ROLE权限的账户。

用法如下：

```typescript
import {RNode} from '@tfc-chain/adapter';

const endpoint = 'http://localhost:8545';
const privateKey = '0x......';
const turboFilAddress = '0x......';

const rnode = new RNode(endpoint, privateKey, turboFilAddress);

// 提交sector
const afid = Buffer.from('0x......') // afid_lite 28 bytes
await rnode.submitSector(afid);

// 监听某一个sector需要提交proof的事件
const lastBlockNumber = 0
rnode.onSectorVerificationTask((sectorAfid: Buffer, seed: Buffer, verification: string)=> {
    ... // verification为本次验证的标识ID，提交Proof时需要用到
}, afid, lastBlockNumber);
```

### Verifier

Verifier对应拥有智能合约中VERIFY_ROLE权限的账户。

用法如下：

```typescript
import {Verifier} from '@tfc-chain/adapter';

const endpoint = 'http://localhost:8545';
const privateKey = '0x......';
const turboFilAddress = '0x......';

const verifier = new Verifier(endpoint, privateKey, turboFilAddress);

// 监听proof被提交的事件
const lastBlockNumber = 0
rnode.onSectorProofSubmitted((sectorAfid: Buffer, seed: Buffer, proof: string)=> {
    ...
}, lastBlockNumber);
```
### SeedSubmitter

SeedSubmitter对应拥有智能合约中SEED_ROLE权限的账户。

用法如下：

```typescript
import {SeedSubmitter} from '@tfc-chain/adapter';

const endpoint = 'http://localhost:8545';
const privateKey = '0x......';
const turboFilAddress = '0x......';

const seedSubmitter = new SeedSubmitter(endpoint, privateKey, turboFilAddress);

// 提交sector
const seed = Buffer.from('0x......') // afid_lite 28 bytes
await seedSubmitter.submitSeed(seed);
```

## 本地测试环境

安装本地测试区块链：
```
# NPM
npm i --save-dev ganache-cli

# Yarn
yarn add --dev ganache-cli
```

启动本地测试区块链：
```
# NPM
npm run ganache-cli --deterministic --gasPrice 0

# Yarn
yarn ganache-cli --deterministic --gasPrice 0
```
测试区块链会在有新的交易时出块（按需出块），可以使用`--blockTime`选项改为固定出块时间（秒）。

测试区块链的endpoint为：http://localhost:8545

可用的账户的地址和私钥会在控制台打印出来。

## 部署TurboFil合约

```typescript
import {Deployer, DeployInitArgs} from '@tfc-chain/adapter';

const endpoint = 'http://localhost:8545';
const privateKey = '0x......';

const initArgs: DeployInitArgs = {
    sectorReward: 1,
    seedReward: 1,
    verifyReward: 1,

    submitProofTimeout: 6,
    verifyProofTimeout: 12,
    verifyThreshold: 1,

    lockPeriod: 3,
}

const turboFilAddress = await Deployer.deploy(endpoint, privateKey, initArgs);
```

## 处理链重构（chain reorganization)

每一个对象（Deployer, Maintainer, RNode, Verifier, SeedSubmitter)都有一个属性`confirmationRequirement`。

假设该属性的值为`x`，该属性规定了:
- 交易被执行`x`个区块之后，Promise resolve
- 交易被执行`x`个区块之后，合约事件被认为发生

`x >= 1`

注意：测试区块链环境下`x`必须设为1。
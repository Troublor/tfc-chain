import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';
import {Depositable} from '../src/typechain';

import('@nomiclabs/hardhat-waffle');
import {ethers} from 'hardhat';
import {containsEvent} from '../src/util/event';

describe('Depositable contract', () => {
    let deployer: SignerWithAddress;
    let beneficiary: SignerWithAddress;
    let depositable: Depositable;

    beforeEach(async () => {
        [deployer, beneficiary] = await ethers.getSigners();
        const factory = await ethers.getContractFactory('Depositable', deployer);
        depositable = await factory.deploy(beneficiary.address, deployer.address) as unknown as Depositable;
        await depositable.deployed();

        // grant deposit/punish role to deployer
        let tx = await depositable.grantRole(await depositable.DEPOSIT_ROLE(), deployer.address);
        await tx.wait(1);
        tx = await depositable.grantRole(await depositable.PUNISH_ROLE(), deployer.address);
        await tx.wait(1);
    });

    test('should only allow deposit from authorized users', async () => {
        const amount = ethers.utils.parseUnits('1', 'ether');
        const releaseTime = Math.floor(Date.now().valueOf() / 1000) + 10;
        const tx = await depositable.connect(deployer)['deposit(uint256,string)'](releaseTime, 'test', {value: amount});
        const receipt = await tx.wait(1);
        expect(containsEvent(receipt, {
            name: 'Deposit',
            args: {
                position: ethers.BigNumber.from(0),
                beneficiary: beneficiary.address,
                releaseTime: ethers.BigNumber.from(releaseTime),
                amount: amount,
            },
        })).toBeTruthy();

        // check deposit details
        expect((await depositable['numDeposits()']()).toNumber()).toEqual(1);
        const deposit = await depositable['deposit(uint256)'](0);
        expect(deposit.amount.toHexString()).toEqual(amount.toHexString());
        expect(deposit.releaseTime.toNumber()).toEqual(releaseTime);
        expect(deposit.punished).toBeFalsy();
        expect(deposit.released).toBeFalsy();
        expect(deposit.comment).toEqual('test');

        // unauthorized user cannot deposit
        await expect(depositable.connect(beneficiary)['deposit(uint256,string)'](releaseTime + 1, 'test')).rejects.toThrow('Depositable: Caller does not have privilege to deposit');
    });

    test('should only allow punish from authorized user', async () => {
        const amount = ethers.utils.parseUnits('1', 'ether');
        const releaseTime = Math.floor(Date.now().valueOf() / 1000) + 100;
        let tx = await depositable.connect(deployer)['deposit(uint256,string)'](releaseTime, 'test', {value: amount});
        await tx.wait(1);
        const payerBalance = await deployer.getBalance();

        // unauthorized user cannot punish
        await expect(depositable.connect(beneficiary).punish(0)).rejects.toThrow('Depositable: Caller does not have privilege to punish');

        tx = await depositable.connect(deployer).punish(0, {gasPrice: 0});
        const receipt = await tx.wait(1);

        // check deposit has been returned to punishPool, i.e., deployer
        expect((await deployer.getBalance()).toHexString()).toEqual(payerBalance.add(amount).toHexString());

        // check deposit details
        expect((await depositable['numDeposits()']()).toNumber()).toEqual(1);
        const deposit = await depositable['deposit(uint256)'](0);
        expect(deposit.punished).toBeTruthy();

        // check event
        expect(containsEvent(receipt, {
            name: 'Punish',
            args: {
                position: ethers.BigNumber.from(0),
                beneficiary: beneficiary.address,
                amount: amount,
            },
        })).toBeTruthy();
    });

    test('should only allow release after releaseTime', async ()=>{
        const amount = ethers.utils.parseUnits('1', 'ether');
        const releaseTime = Math.floor(Date.now().valueOf() / 1000) + 100;
        let tx = await depositable.connect(deployer)['deposit(uint256,string)'](releaseTime, 'test', {value: amount});
        await tx.wait(1);

        // cannot release before releaseTime
        await expect(depositable.connect(beneficiary).release(0)).rejects.toThrow('Depositable: Current time is before release time');

        // Add time for evm so that it should be after releaseTime
        await ethers.provider.send('evm_increaseTime', [100]);

        const beneficiaryBalance = await beneficiary.getBalance();
        tx = await depositable.connect(beneficiary).release(0, {gasPrice: 0});
        const receipt = await tx.wait(1);

        // beneficiary should have got the withdrawn TFC
        expect((await beneficiary.getBalance()).toHexString()).toEqual(beneficiaryBalance.add(amount).toHexString());

        // check deposit details
        expect((await depositable['numDeposits()']()).toNumber()).toEqual(1);
        const deposit = await depositable['deposit(uint256)'](0);
        expect(deposit.released).toBeTruthy();

        // check event
        const block = await ethers.provider.getBlock(receipt.blockHash);
        expect(containsEvent(receipt, {
            name: 'Release',
            args: {
                position: ethers.BigNumber.from(0),
                beneficiary: beneficiary.address,
                enforcedReleaseTime: ethers.BigNumber.from(releaseTime),
                realReleaseTime: ethers.BigNumber.from(block.timestamp),
                amount: amount,
            },
        })).toBeTruthy();
    });
});
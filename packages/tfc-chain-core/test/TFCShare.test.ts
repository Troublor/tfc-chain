import {containsEvent} from '../src/util/event';

import('@nomiclabs/hardhat-waffle');
import {ethers} from 'hardhat';
import {TFCShare} from '../src/typechain';
import {deployTFCShare} from '../src/util/deploy';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';

describe('TFCShare contract', () => {
    let tfcShare: TFCShare;
    let admin: SignerWithAddress, user1: SignerWithAddress, user2: SignerWithAddress;

    beforeEach(async () => {
        [admin, user1, user2] = await ethers.getSigners();
        tfcShare = await deployTFCShare('testTFCShare', admin.address, admin);
    });

    test('should not allow ordinary user to mint', async () => {
        await expect(tfcShare.connect(user1).mint(user1.address, 1)).rejects.toThrow('TFCShare: Caller does not have privilege to mint');
    });

    test('should not allow ordinary user to distributeTFC', async () => {
        await expect(tfcShare.connect(user1).distributeTFC(Math.floor(Date.now().valueOf() / 1000), 'test', {
            value: 1,
        })).rejects.toThrow('TFCShare: Caller does not have privilege to distribute TFC');
    });

    test('should mint correctly', async () => {
        const tx = await tfcShare.connect(admin).mint(user1.address, 1);
        await tx.wait(1);
        expect((await tfcShare.totalSupply()).toNumber()).toEqual(1);
        expect((await tfcShare.shares(user1.address)).toNumber()).toEqual(1);
        expect((await tfcShare.shares(admin.address)).toNumber()).toEqual(0);
    });

    test('should not allow to distribute TFC when there is no supply', async () => {
        await expect(tfcShare.connect(admin).distributeTFC(1, 'test'))
            .rejects.toThrow('TFCShare: No supply');
    });

    test('should distribute TFC evenly', async () => {
        let tx = await tfcShare.connect(admin).mint(user1.address, 1);
        await tx.wait(1);
        tx = await tfcShare.connect(admin).mint(user2.address, 1);
        await tx.wait(1);
        const user1Bal = await ethers.provider.getBalance(user1.address);
        const user2Bal = await ethers.provider.getBalance(user2.address);

        tx = await tfcShare.connect(admin).distributeTFC(
            Math.floor(Date.now().valueOf() / 1000),
            'test',
            {value: 2},
        );
        const receipt = await tx.wait(1);

        // check TFC distribution
        expect((await ethers.provider.getBalance(user1.address)).toHexString()).toEqual(user1Bal.add(1).toHexString());
        expect((await ethers.provider.getBalance(user2.address)).toHexString()).toEqual(user2Bal.add(1).toHexString());

        // check events
        const timestamp = (await ethers.provider.getBlock(receipt.blockHash)).timestamp;
        expect(containsEvent(receipt, {
            name: 'Reward',
            args: {
                recipient: user1.address,
                amount: ethers.BigNumber.from(1),
                timestamp: ethers.BigNumber.from(timestamp),
            },
        })).toBeTruthy();
        expect(containsEvent(receipt, {
            name: 'Reward',
            args: {
                recipient: user2.address,
                amount: ethers.BigNumber.from(1),
                timestamp: ethers.BigNumber.from(timestamp),
            },
        })).toBeTruthy();

        // check share supply is cleared
        expect((await tfcShare.totalSupply()).toNumber()).toEqual(0);
        expect((await tfcShare.shares(user1.address)).toNumber()).toEqual(0);
        expect((await tfcShare.shares(user2.address)).toNumber()).toEqual(0);
    });
});
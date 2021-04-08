import {RNode} from '../src/typechain';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';

import('@nomiclabs/hardhat-waffle');
import {ethers} from 'hardhat';
import {networks} from '../src';
import {containsEvent, isEqualEvents} from '../src/util/event';

describe('RNode contract', () => {
    let rnode: RNode;
    let deployer: SignerWithAddress;
    let user: SignerWithAddress;

    beforeEach(async () => {
        const turboFilAddress = '0x26aad2da94c59524ac0d93f6d6cbf9071d7086f2'; // an arbitrary address
        [deployer, user] = await ethers.getSigners();
        rnode = await networks.mock.RNode.factory.connect(deployer).deploy(deployer.address, 'afid', turboFilAddress);
        await rnode.deployed();
    });

    test('should emit ReceiveTFC event when got transfer', async () => {
        const tx = await user.sendTransaction({
            to: rnode.address,
            value: ethers.utils.parseUnits('1', 'ether'),
        });
        const receipt = await tx.wait(1);
        expect(
            receipt.logs
                .map(log => rnode.interface.parseLog(log))
                .some(ev=>isEqualEvents(ev, {
                    name: 'ReceiveTFC',
                    args: {
                        from: user.address,
                        value: ethers.utils.parseUnits('1', 'ether'),
                    },
                })),
        ).toBeTruthy();
    });
});
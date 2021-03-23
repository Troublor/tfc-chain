import {ethers} from 'hardhat';
import {TurboFil, TurboFil__factory} from '../typechain';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';
import {ContractReceipt} from 'ethers';

describe('TurboFil Contract', () => {
    let vault: SignerWithAddress;
    let mainAccount: SignerWithAddress;
    let otherAccount: SignerWithAddress;
    let accounts: SignerWithAddress[];
    let turboFil: TurboFil;

    beforeEach(async function () {
        accounts = await ethers.getSigners();
        [vault, mainAccount, otherAccount] = accounts;
        const TurboFil: TurboFil__factory = await ethers.getContractFactory('TurboFil') as unknown as TurboFil__factory;
        turboFil = await TurboFil.deploy(vault.address);
        await turboFil.deployed();
    });

    test('should be deployed successfully', async () => {
        expect(turboFil.address).toBeTruthy();
        await expect(turboFil.vault()).resolves.toBe(vault.address);
    });

    test('should not allow to register mobile/rnode/fnode for an unregistered account', async () => {
        let promise = turboFil.registerMobile('+1 123456');
        await expect(promise).rejects.toThrow('TurboFil: Unregistered account');
        promise = turboFil.registerRNode('rnode');
        await expect(promise).rejects.toThrow('TurboFil: Unregistered account');
        promise = turboFil['registerFNode(string,address)']('fnode', accounts[0].address);
        await expect(promise).rejects.toThrow('TurboFil: Unregistered account');
    });

    function expectEvent(receipt: ContractReceipt, parameters: Record<string, unknown>): void {
        expect(receipt.events?.length).toBeGreaterThanOrEqual(1);
        const event = receipt.events?.[0].args;
        for (const key of Object.keys(parameters)) {
            expect(event).toHaveProperty(key, parameters[key]);
        }
    }

    test('should allow to register user with vault as recommender', async () => {
        // use mainAccount
        turboFil = turboFil.connect(mainAccount);
        const tx = await turboFil.register(vault.address);
        const receipt = await tx.wait(0);
        expectEvent(receipt, {
            addr: mainAccount.address,
            recommender: vault.address,
        });
    });

    test('should allow to register user with a normal recommender', async () => {
        // use mainAccount
        turboFil = turboFil.connect(mainAccount);
        let tx = await turboFil.register(vault.address);
        await tx.wait(0);
        turboFil = turboFil.connect(otherAccount);
        tx = await turboFil.register(mainAccount.address);
        const receipt = await tx.wait(0);
        expectEvent(receipt, {
            addr: otherAccount.address,
            recommender: mainAccount.address,
        });
    });

    test('should not allow to register user with unregistered recommender', async () => {
        // use mainAccount
        turboFil = turboFil.connect(mainAccount);
        await expect(turboFil.register(mainAccount.address)).rejects.toThrow('TurboFil: Unregistered recommender');
    });

    test('should not allow to re-register user', async () => {
        // use mainAccount
        turboFil = turboFil.connect(mainAccount);
        const tx = await turboFil.register(vault.address);
        await tx.wait(0);
        await expect(turboFil.register(vault.address)).rejects.toThrow('TurboFil: Already-registered account');
    });
});
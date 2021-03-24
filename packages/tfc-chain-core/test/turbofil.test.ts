import {ethers} from 'hardhat';
import {TurboFil, TurboFil__factory} from '../typechain';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';
import {ContractReceipt} from 'ethers';
import {fail} from 'assert';

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

    function expectEvent(receipt: ContractReceipt, events: Record<string, Record<string, unknown>>): void {
        if (!receipt.events) {
            fail('no events emitted in the receipt');
            return;
        }
        expect(receipt.events?.length).toBeGreaterThanOrEqual(Object.keys(events).length);
        for (const eventName of Object.keys(events)) {
            const matched = receipt.events.some(ev => {
                for (const key of Object.keys(events[eventName])) {
                    if (!ev.args || !ev.args[key] || ev.args[key] !== events[eventName][key]) {
                        return false;
                    }
                }
                return true;
            });
            if (!matched) {
                fail(`event ${eventName}(${Object.keys(events[eventName])
                    .map(key => `${key}:${events[eventName][key]}`)
                    .join(', ')}) is not found in receipt`);
            }
        }
    }

    test('should allow to register user with vault as recommender', async () => {
        // use mainAccount
        turboFil = turboFil.connect(mainAccount);
        const tx = await turboFil.register(vault.address);
        const receipt = await tx.wait();
        expectEvent(receipt, {
            Register: {
                addr: mainAccount.address,
                recommender: vault.address,
            },
        });
    });

    test('should allow to register user with a normal recommender', async () => {
        // use mainAccount
        turboFil = turboFil.connect(mainAccount);
        let tx = await turboFil.register(vault.address);
        await tx.wait();
        turboFil = turboFil.connect(otherAccount);
        tx = await turboFil.register(mainAccount.address);
        const receipt = await tx.wait();
        expectEvent(receipt, {
            Register: {
                addr: otherAccount.address,
                recommender: mainAccount.address,
            },
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
        await tx.wait();
        await expect(turboFil.register(vault.address)).rejects.toThrow('TurboFil: Already-registered account');
    });

    test('should allow a registered user to register Mobile/RNode/FNode', async () => {
        // use mainAccount
        turboFil = turboFil.connect(mainAccount);
        let tx = await turboFil.register(vault.address);
        await tx.wait();

        // register mobile
        tx = await turboFil.registerMobile('+1 23456');
        let receipt = await tx.wait();
        expectEvent(receipt, {
            RegisterMobile: {
                addr: mainAccount.address,
                phone: '+1 23456',
            },
        });

        // register rnode
        tx = await turboFil.registerRNode('rnode');
        receipt = await tx.wait();
        expectEvent(receipt, {
            RegisterRNode: {
                addr: mainAccount.address,
                id: 'rnode',
            },
        });
        const rnodeAddress = receipt.events?.[0].args?.['rnode'];

        // register mobile
        tx = await turboFil['registerFNode(string,string)']('fnode', 'rnode');
        receipt = await tx.wait();
        expectEvent(receipt, {
            RegisterFNode: {
                addr: mainAccount.address,
                id: 'fnode',
                rnode: rnodeAddress,
            },
        });
    });
});
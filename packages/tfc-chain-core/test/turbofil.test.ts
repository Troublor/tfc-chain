import {ethers} from 'hardhat';
import {TurboFil, TurboFil__factory} from '../typechain';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';
import {ContractReceipt} from 'ethers';
import {fail} from 'assert';

describe('TurboFil Contract', () => {
    let vault: string;
    let deployer: SignerWithAddress;
    let user1: SignerWithAddress;
    let user2: SignerWithAddress;
    let accounts: SignerWithAddress[];
    let turboFil_deployer: TurboFil;
    let turboFil_user1: TurboFil;
    let turboFil_user2: TurboFil;

    beforeEach(async function () {
        // define accounts
        accounts = await ethers.getSigners();
        [deployer, user1, user2] = accounts;

        // deploy
        const TurboFil: TurboFil__factory = await ethers.getContractFactory('TurboFil') as unknown as TurboFil__factory;
        turboFil_deployer = await TurboFil.deploy();
        vault = turboFil_deployer.address;
        await turboFil_deployer.deployed();

        // grant deployer REGISTER_ROLE
        turboFil_deployer = turboFil_deployer.connect(deployer);
        const tx = await turboFil_deployer.grantRole(await turboFil_deployer.REGISTER_ROLE(), deployer.address);
        await tx.wait();

        turboFil_user1 = turboFil_deployer.connect(user1);
        turboFil_user2 = turboFil_deployer.connect(user2);
    });

    test('should be deployed successfully', async () => {
        expect(turboFil_deployer.address).toBeTruthy();
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
        // use user1
        const tx = await turboFil_user1.register(vault);
        const receipt = await tx.wait();
        expectEvent(receipt, {
            Register: {
                addr: user1.address,
                recommender: vault,
            },
        });
    });

    test('should allow to register user with a normal recommender', async () => {
        // use mainAccount
        let tx = await turboFil_user1.register(vault);
        await tx.wait();
        tx = await turboFil_user2.register(user1.address);
        const receipt = await tx.wait();
        expectEvent(receipt, {
            Register: {
                addr: user2.address,
                recommender: user1.address,
            },
        });
    });

    test('should not allow to register user with unregistered recommender', async () => {
        // use mainAccount
        await expect(turboFil_user1.register(user1.address)).rejects.toThrow('TurboFil: Unregistered recommender');
    });

    describe('register', () => {
        beforeEach(async () => {
            // use user1 to register an account
            const tx = await turboFil_user1.register(vault);
            await tx.wait();
        });

        test('should not allow to re-register user', async () => {
            await expect(turboFil_user1.register(vault)).rejects.toThrow('TurboFil: Already-registered account');
        });

        test('should not allow to register mobile/rnode/fnode for an unregistered account', async () => {
            let promise = turboFil_user2.registerMobile('+1 123456');
            await expect(promise).rejects.toThrow('TurboFil: Unregistered account');
            promise = turboFil_deployer.registerRNode('rnode', user2.address);
            await expect(promise).rejects.toThrow('TurboFil: Unregistered account');
            promise = turboFil_deployer['registerFNode(string,string,address)']('fnode', 'rnode', user2.address);
            await expect(promise).rejects.toThrow('TurboFil: Unregistered account');
        });

        test('should not allow an authorized address to register RNode/FNode', async () => {
            await expect(turboFil_user1.registerRNode('rnode', user1.address)).rejects.toThrow('TurboFil: Caller does not have privilege to register RNode');
            const tx = await turboFil_deployer.registerRNode('rnode', user1.address);
            await tx.wait();
            await expect(turboFil_user1['registerFNode(string,string,address)']('fnode', 'rnode', user1.address)).rejects.toThrow('TurboFil: Caller does not have privilege to register FNode');
        });

        test('should allow a registered user to register Mobile/RNode/FNode', async () => {
            // register mobile
            let tx = await turboFil_user1.registerMobile('+1 23456');
            let receipt = await tx.wait();
            expectEvent(receipt, {
                RegisterMobile: {
                    addr: user1.address,
                    phone: '+1 23456',
                },
            });

            // register rnode
            tx = await turboFil_deployer.registerRNode('rnode', user1.address);
            receipt = await tx.wait();
            expectEvent(receipt, {
                RegisterRNode: {
                    addr: user1.address,
                    id: 'rnode',
                },
            });
            const rnodeAddress = receipt.events?.[0].args?.['rnode'];

            // register mobile
            tx = await turboFil_deployer['registerFNode(string,string,address)']('fnode', 'rnode', user1.address);
            receipt = await tx.wait();
            expectEvent(receipt, {
                RegisterFNode: {
                    addr: user1.address,
                    id: 'fnode',
                    rnode: rnodeAddress,
                },
            });
        });

        test('should not allow register an already-registered Mobile', async () => {
            // register mobile
            const tx = await turboFil_user1.registerMobile('+1 23456');
            await tx.wait();

            // register the same mobile again
            await expect(turboFil_user1.registerMobile('+1 23456')).rejects.toThrow('TurboFil: Mobile is already registered');
        });

        test('should not allow register an already-registered RNode', async () => {
            // register rnode
            const tx = await turboFil_deployer.registerRNode('rnode', user1.address);
            await tx.wait();

            // register the same rnode again
            await expect(turboFil_deployer.registerRNode('rnode', user1.address)).rejects.toThrow('TurboFil: RNode is already registered');
        });

        test('should not allow register an already-registered FNode', async () => {
            // register fnode
            let tx = await turboFil_deployer.registerRNode('rnode', user1.address);
            await tx.wait();
            tx = await turboFil_deployer['registerFNode(string,string,address)']('fnode', 'rnode', user1.address);
            await tx.wait();

            // register the same fnode again
            await expect(turboFil_deployer['registerFNode(string,string,address)']('fnode', 'rnode', user1.address)).rejects.toThrow('TurboFil: FNode is already registered');
        });

        test('should not allow to register a FNode on an unregistered RNode', async () => {
            await expect(turboFil_deployer['registerFNode(string,string,address)']('fnode', 'rnode', user1.address)).rejects.toThrow('TurboFil: RNode is not registered');
        });
    });
});
import {ethers} from 'hardhat';
import {TurboFil, TurboFil__factory} from '../typechain';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';

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

        turboFil_user1 = turboFil_deployer.connect(user1);
        turboFil_user2 = turboFil_deployer.connect(user2);
    });
});
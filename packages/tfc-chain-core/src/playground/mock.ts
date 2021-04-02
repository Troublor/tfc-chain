import {Provider, ExternalProvider} from '@ethersproject/providers';
import ganache from 'ganache-core';
import * as ethers from 'ethers';
import {Contracts, networks} from '../defines';
import * as net from 'net';

export class MockEnvironment {
    // This is default Ganache mnemonic, and it should not be used in production environment
    readonly mnemonic: string = 'myth like bonus scare over problem client lizard pioneer submit female collect';
    readonly provider: Provider
    _ready: boolean;

    constructor() {
        this.provider = new ethers.providers.Web3Provider(ganache.provider({
            'mnemonic': this.mnemonic,
        }) as unknown as ExternalProvider);
        this._ready = false;
    }

    get signers(): ethers.Wallet[] {
        const signers: ethers.Wallet[] = [];
        for (let i = 0; i < 10; i++) {
            const wallet = ethers.Wallet.fromMnemonic(this.mnemonic, `m/44'/60'/0'/0/${i}`).connect(this.provider);
            signers.push(wallet);
        }
        return signers;
    }

    get ready(): boolean {
        return this._ready;
    }

    get contracts(): Contracts {
        if (!this.ready) {
            throw new Error('The mock environment is not yet set up. Please call setup() and await it');
        }
        return networks.mock;
    }

    async setup(): Promise<MockEnvironment> {
        const deployer = this.signers[0];
        const turboFil = await networks.mock.TurboFil.factory.connect(deployer).deploy();
        await turboFil.deployed();
        // console.log(`Deployed TurboFil at ${turboFil.address}`);

        const sectorSubmissionShare = await networks.mock.TFCShare.factory.connect(deployer).deploy('SectorSubmission', turboFil.address);
        await sectorSubmissionShare.deployed();
        // console.log(`Deployed SectorSubmissionShare at ${sectorSubmissionShare.address}`);

        const sectorVerificationShare = await networks.mock.TFCShare.factory.connect(deployer).deploy('SectorVerification', turboFil.address);
        await sectorVerificationShare.deployed();
        // console.log(`Deployed SectorVerificationShare at ${sectorVerificationShare.address}`);

        const seedSubmissionShare = await networks.mock.TFCShare.factory.connect(deployer).deploy('SeedSubmission', turboFil.address);
        await seedSubmissionShare.deployed();
        // console.log(`Deployed SeedSubmissionShare at ${seedSubmissionShare.address}`);

        const seedEvaluationShare = await networks.mock.TFCShare.factory.connect(deployer).deploy('SeedEvaluation', turboFil.address);
        await seedEvaluationShare.deployed();
        // console.log(`Deployed SeedEvaluationShare at ${seedEvaluationShare.address}`);

        let tx = await turboFil.initialize(sectorSubmissionShare.address, sectorVerificationShare.address, seedSubmissionShare.address, seedEvaluationShare.address);
        await tx.wait(1);
        // console.log('Initialized TurboFil');

        let role = await turboFil['REGISTER_ROLE()']();
        tx = await turboFil.grantRole(role, deployer.address);
        await tx.wait(1);
        // console.log('Granted REGISTER_ROLE to deployer');

        role = await turboFil['REWARD_ROLE()']();
        tx = await turboFil.grantRole(role, deployer.address);
        await tx.wait(1);
        // console.log('Granted REWARD_ROLE to deployer');

        role = await turboFil['SEED_ROLE()']();
        tx = await turboFil.grantRole(role, deployer.address);
        await tx.wait(1);
        // console.log('Granted SEED_ROLE to deployer');

        role = await turboFil['SUBMIT_ROLE()']();
        tx = await turboFil.grantRole(role, deployer.address);
        await tx.wait(1);
        // console.log('Granted SUBMIT_ROLE to deployer');

        role = await turboFil['VERIFY_ROLE()']();
        tx = await turboFil.grantRole(role, deployer.address);
        await tx.wait(1);
        // console.log('Granted VERIFY_ROLE to deployer');

        // console.log('Deploy finished');
        const [admin] = this.signers;
        networks.mock.TurboFil.factory.connect(admin);
        networks.mock.TurboFil.contract.connect(admin);
        networks.mock.TFCShare.factory.connect(admin);
        networks.mock.TFCShare.sectorSubmissionShare.connect(admin);
        networks.mock.TFCShare.sectorVerificationShare.connect(admin);
        networks.mock.TFCShare.seedSubmissionShare.connect(admin);
        networks.mock.TFCShare.seedEvaluationShare.connect(admin);
        networks.mock.RNode.factory.connect(admin);
        networks.mock.Sector.factory.connect(admin);
        networks.mock.Seed.factory.connect(admin);

        this._ready = true;

        return this;
    }
}
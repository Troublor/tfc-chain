import {task, HardhatUserConfig} from 'hardhat/config';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import {
    TFCShare__factory,
    TurboFil__factory,
} from './src/typechain';

task('deploy', 'Deploy TurboFil contracts')
    .setAction(async (args, hre) => {
        const [deployer] = await hre.ethers.getSigners();
        let TurboFil = await hre.ethers.getContractFactory('TurboFil') as unknown as TurboFil__factory;
        TurboFil = TurboFil.connect(deployer);
        const turboFil = await TurboFil.deploy();
        await turboFil.deployed();
        console.log(`Deployed TurboFil at ${turboFil.address}`);

        let TFCShare = await hre.ethers.getContractFactory('TFCShare') as unknown as TFCShare__factory;
        TFCShare = TFCShare.connect(deployer);
        const sectorSubmissionShare = await TFCShare.deploy('SectorSubmission', turboFil.address);
        await sectorSubmissionShare.deployed();
        console.log(`Deployed SectorSubmissionShare at ${sectorSubmissionShare.address}`);

        const sectorVerificationShare = await TFCShare.deploy('SectorVerification', turboFil.address);
        await sectorVerificationShare.deployed();
        console.log(`Deployed SectorVerificationShare at ${sectorVerificationShare.address}`);

        const seedSubmissionShare = await TFCShare.deploy('SeedSubmission', turboFil.address);
        await seedSubmissionShare.deployed();
        console.log(`Deployed SeedSubmissionShare at ${seedSubmissionShare.address}`);

        const seedEvaluationShare = await TFCShare.deploy('SeedEvaluation', turboFil.address);
        await seedEvaluationShare.deployed();
        console.log(`Deployed SeedEvaluationShare at ${seedEvaluationShare.address}`);

        let tx = await turboFil.initialize(sectorSubmissionShare.address, sectorVerificationShare.address, seedSubmissionShare.address, seedEvaluationShare.address);
        await tx.wait(1);
        console.log('Initialized TurboFil');

        let role = await turboFil['REGISTER_ROLE()']();
        tx = await turboFil.grantRole(role, deployer.address);
        await tx.wait(1);
        console.log('Granted REGISTER_ROLE to deployer');

        role = await turboFil['REWARD_ROLE()']();
        tx = await turboFil.grantRole(role, deployer.address);
        await tx.wait(1);
        console.log('Granted REWARD_ROLE to deployer');

        role = await turboFil['SEED_ROLE()']();
        tx = await turboFil.grantRole(role, deployer.address);
        await tx.wait(1);
        console.log('Granted SEED_ROLE to deployer');

        role = await turboFil['SUBMIT_ROLE()']();
        tx = await turboFil.grantRole(role, deployer.address);
        await tx.wait(1);
        console.log('Granted SUBMIT_ROLE to deployer');

        role = await turboFil['VERIFY_ROLE()']();
        tx = await turboFil.grantRole(role, deployer.address);
        await tx.wait(1);
        console.log('Granted VERIFY_ROLE to deployer');

        console.log('Deploy finished');
    });

task('list-rnodes', 'Scan the blockchain history and list all registered RNode')
    .addParam('turbofil', 'address of TurboFil contract')
    .setAction(async (args, hre) => {
        const TurboFil = await hre.ethers.getContractFactory('TurboFil') as unknown as TurboFil__factory;
        const turboFil = TurboFil.attach(args.turbofil);
        await turboFil.deployed();

        const rnodeRegisterFilter = turboFil.filters.RegisterRNode(null, null, null);
        const events = await turboFil.queryFilter(rnodeRegisterFilter, 0, 'latest');

        for (const event of events) {
            console.log(`RNode ${event.args.afid} contract ${event.args.rnode} owned by ${event.args.owner} registered at block ${event.blockNumber}`);
        }
    });

task('list-seeds', 'Scan the blockchain history and list all submitted seeds')
    .addParam('turbofil', 'address of TurboFil contract')
    .setAction(async (args, hre) => {
        const TurboFil = await hre.ethers.getContractFactory('TurboFil') as unknown as TurboFil__factory;
        const turboFil = TurboFil.attach(args.turbofil);
        await turboFil.deployed();

        const seedSubmitFilter = turboFil.filters.SubmitSeed(null, null, null);
        const events = await turboFil.queryFilter(seedSubmitFilter, 0, 'latest');

        for (const event of events) {
            console.log(`Seed ${event.args.afid} contract ${event.args.seed} submitted by ${event.args.submitter} at block ${event.blockNumber}`);
        }
    });

task('list-sectors', 'Scan the blockchain history and list all submitted sectors')
    .addParam('turbofil', 'address of TurboFil contract')
    .setAction(async (args, hre) => {
        const TurboFil = await hre.ethers.getContractFactory('TurboFil') as unknown as TurboFil__factory;
        const turboFil = TurboFil.attach(args.turbofil);
        await turboFil.deployed();

        const sectorSubmitFilter = turboFil.filters.SubmitSector(null, null, null);
        const events = await turboFil.queryFilter(sectorSubmitFilter, 0, 'latest');

        for (const event of events) {
            console.log(`Sector ${event.args.afid} contract ${event.args.sector} submitted by ${event.args.submitter} at block ${event.blockNumber}`);
        }
    });

module.exports = {
    solidity: {
        version: '0.8.3',
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000,
            },
        },
    },
    typechain: {
        outDir: 'src/typechain',
        target: 'ethers-v5',
        runOnCompile: true,
    },
} as HardhatUserConfig;

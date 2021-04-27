import {TurboFil, TurboFil__factory} from './typechain';
import {task} from 'hardhat/config';
import '@nomiclabs/hardhat-ethers';
import {networks} from './lib';
import {ethers} from 'ethers';

task('deploy', 'Deploy TurboFil contracts')
    .addParam('sectorReward')
    .addParam('seedReward')
    .addParam('verifyReward')
    .addParam('lockPeriod')
    .addParam('submitProofTimeout')
    .addParam('verifyProofTimeout')
    .addParam('verifyThreshold')
    .setAction(async (args, hre) => {
        const [deployer] = await hre.ethers.getSigners();
        let TurboFil = await hre.ethers.getContractFactory('TurboFil') as unknown as TurboFil__factory;
        TurboFil = TurboFil.connect(deployer);
        const turboFil = await TurboFil.deploy(args.sectorReward, args.seedReward, args.verifyReward, args.lockPeriod,
            args.submitProofTimeout, args.verifyProofTimeout, args.verifyThreshold);
        await turboFil.deployed();
        console.log(`Deployed TurboFil at ${turboFil.address}`);

        console.log('Setting up roles...');
        let tx = await turboFil.grantRole(await turboFil.MAINTAIN_ROLE(), deployer.address);
        tx = await turboFil.grantRole(await turboFil.SECTOR_ROLE(), deployer.address);
        tx = await turboFil.grantRole(await turboFil.SEED_ROLE(), deployer.address);
        tx = await turboFil.grantRole(await turboFil.VERIFY_ROLE(), deployer.address);
        tx = await turboFil.grantRole(await turboFil.MAINTAIN_ROLE(), deployer.address);
        tx = await deployer.sendTransaction({to: turboFil.address, value: ethers.utils.parseEther('1')});
        await tx.wait(1);

        console.log('Deploy finished, remember to update deployment.json');
    });

task('grant-verify-role')
    .addParam('account')
    .setAction(async (args, hre) => {
        const account = args.account;
        const [signer] = await hre.ethers.getSigners();
        const turboFil: TurboFil = networks.development.TurboFil.contract.connect(signer);
        const tx = await turboFil.grantRole(await turboFil.VERIFY_ROLE(), account);
        await tx.wait(1);
        console.log('VERIFY_ROLE granted to', account);
    });

task('set-verify-threshold')
    .addParam('threshold')
    .setAction(async (args, hre) => {
        const [signer] = await hre.ethers.getSigners();
        const turboFil: TurboFil = networks.development.TurboFil.contract.connect(signer);
        const tx = await turboFil.setVerifyThreshold(args.threshold);
        await tx.wait(1);
        console.log('Verify threshold set to', args.threshold);
    });

task('submit-sector', 'Submit sector')
    .addParam('owner')
    .addParam('sectorAfid')
    .setAction(async (args, hre) => {
        const [signer] = await hre.ethers.getSigners();
        const turboFil: TurboFil = networks.development.TurboFil.contract.connect(signer);
        const deposit = await turboFil.depositRequirement();
        const tx = await turboFil.submitSector(args.owner, args.sectorAfid, {value: deposit});
        console.log('Submit sector transaction pending...');
        const receipt = await tx.wait(1);
        const sectorAddr = receipt.events?.[0]?.args?.['sector'];
        console.log('Sector submitted, sector address:', sectorAddr);
    });

task('submit-seed', 'Submit seed')
    .addParam('seed')
    .setAction(async (args, hre) => {
        const [signer] = await hre.ethers.getSigners();
        const turboFil: TurboFil = networks.development.TurboFil.contract.connect(signer);
        try {
            const tx = await turboFil.submitSeed(args.seed);
            console.log('Submit seed transaction pending...');
            await tx.wait(1);
            console.log('Seed submitted, seed:', args.seed);
        } catch (e) {
            console.log(e.error.toString());
        }
    });

task('submit-verify-result', 'Submit sector-seed verification result')
    .addParam('sectorAfid')
    .addParam('seed')
    .addParam('result')
    .setAction(async (args, hre) => {
        const [signer] = await hre.ethers.getSigners();
        const turboFil: TurboFil = networks.development.TurboFil.contract.connect(signer);
        try {
            const tx = await turboFil.sectorVerification_callback(args.seed, args.sectorAfid, args.result);
            console.log('Submit verification result transaction pending...');
            const receipt = await tx.wait(1);
            const log = receipt.logs[0];
            const event = networks.development.Sector.factory.interface.parseLog(log);
            console.log('Sector verified:');
            console.log('Sector afid:', args.sectorAfid);
            console.log('Seed:', event.args.seed);
            console.log('Reward:', event.args.reward.toNumber());
            console.log('Punish:', event.args.punish.toNumber());
        } catch (e) {
            console.log(e.error.toString());
        }
    });
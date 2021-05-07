import {Sector, TurboFil, TurboFil__factory, Verification} from './typechain';
import {task, types} from 'hardhat/config';
import '@nomiclabs/hardhat-ethers';
import {skeletons} from './src/defines';
import {ethers, EventFilter} from 'ethers';
import env from './env';
import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import {Provider} from '@ethersproject/providers';
import crypto from 'crypto';

type Role = 'DEFAULT_ADMIN_ROLE' | 'MAINTAIN_ROLE' | 'SECTOR_ROLE' | 'SEED_ROLE' | 'VERIFY_ROLE';

async function preconditions(role: Role | undefined, hre: HardhatRuntimeEnvironment): Promise<{
    turboFil: TurboFil,
    signer: SignerWithAddress,
    provider: Provider,
}> {
    console.log('TFC-Chain endpoint:', env.endpoint);
    const [signer] = await hre.ethers.getSigners();
    console.log('Transaction sender account:', signer.address);
    console.log('TurboFil contract:', env.turboFilContract);
    const turboFil: TurboFil = skeletons.TurboFil.factory.attach(env.turboFilContract).connect(signer);

    // check role
    if (role) {
        const hasRole = await turboFil.hasRole(await turboFil[role](), signer.address);
        if (!hasRole) {
            throw new Error('Transaction sender does not have ' + role);
        }
    }

    console.log();

    return {
        turboFil, signer, provider: hre.ethers.provider,
    };
}

task('account')
    .setDescription('Show the current account used as transaction sender')
    .setAction(async (args, hre) => {
        await preconditions(undefined, hre);
    });

task('balance')
    .setDescription('Get TFC balance of an account')
    .addParam('account', 'account address', undefined, types.string)
    .setAction(async (args, hre) => {
        const balance = await hre.ethers.provider.getBalance(args.account);
        console.log(balance.toString());
    });

task('deploy', 'Deploy TurboFil contracts')
    .addParam('sectorReward', 'amount of reward for sectorOwner each time a sector\'s proof is verified (in minimal uint)', undefined, types.string)
    .addParam('seedReward', 'amount of reward for seedSubmitter when seed is used (in minimal uint)', undefined, types.string)
    .addParam('verifyReward', 'amount of reward for proofVerifier when sector verification is settled (in minimal unit)', undefined, types.string)
    .addParam('lockPeriod', 'the period to lock sector reward', undefined, types.int)
    .addParam('submitProofTimeout', 'the timeout before which sectorOwner must submit proof (measure by number of blocks)', undefined, types.int)
    .addParam('verifyProofTimeout', 'the timeout before which proofVerifier can submit verify result (measure by number of blocks)', undefined, types.int)
    .addParam('verifyThreshold', 'the minimum number of verifiers required to determine whether a proof is valid or not', undefined, types.int)
    .setAction(async (args, hre) => {
        const [deployer] = await hre.ethers.getSigners();
        let TurboFil = await hre.ethers.getContractFactory('TurboFil') as unknown as TurboFil__factory;
        TurboFil = TurboFil.connect(deployer);
        const turboFil = await TurboFil.deploy(args.sectorReward, args.seedReward, args.verifyReward, args.lockPeriod,
            args.submitProofTimeout, args.verifyProofTimeout, args.verifyThreshold);
        await turboFil.deployed();
        console.log(`Deployed TurboFil at ${turboFil.address}`);

        // console.log('Setting up roles...');
        // await turboFil.grantRole(await turboFil.MAINTAIN_ROLE(), deployer.address);
        // await turboFil.grantRole(await turboFil.SECTOR_ROLE(), deployer.address);
        // await turboFil.grantRole(await turboFil.SEED_ROLE(), deployer.address);
        // await turboFil.grantRole(await turboFil.VERIFY_ROLE(), deployer.address);
        // await turboFil.grantRole(await turboFil.MAINTAIN_ROLE(), deployer.address);
        // const tx = await deployer.sendTransaction({to: turboFil.address, value: ethers.utils.parseEther('1')});
        // await tx.wait(1);

        console.log('Deploy finished, remember to update deployment.json');
    });

task('has-role')
    .setDescription('Check if a account has a certain role')
    .addParam('role', 'role name: DEFAULT_ADMIN_ROLE, MAINTAIN_ROLE, SECTOR_ROLE, SEED_ROLE, VERIFY_ROLE', undefined, types.string)
    .addParam('account', 'account address', undefined, types.string)
    .setAction(async (args, hre) => {
        const {turboFil} = await preconditions(undefined, hre);
        console.log(await turboFil.hasRole(await turboFil[args.role](), args.account));
    });

task('grant-role')
    .setDescription('Grant a certain role to a specific account')
    .addParam('role', 'role name: DEFAULT_ADMIN_ROLE, MAINTAIN_ROLE, SECTOR_ROLE, SEED_ROLE, VERIFY_ROLE', undefined, types.string)
    .addParam('account', 'account address', undefined, types.string)
    .setAction(async (args, hre) => {
        const account = args.account;
        const {turboFil} = await preconditions('DEFAULT_ADMIN_ROLE', hre);
        const tx = await turboFil.grantRole(await turboFil[args.role](), account);
        await tx.wait(1);
        console.log(args.role, 'granted to', account);
    });

task('revoke-role')
    .setDescription('Revoke a certain role from a specific account')
    .addParam('role', 'role name: DEFAULT_ADMIN_ROLE, MAINTAIN_ROLE, SECTOR_ROLE, SEED_ROLE, VERIFY_ROLE', undefined, types.string)
    .addParam('account', 'account address', undefined, types.string)
    .setAction(async (args, hre) => {
        const account = args.account;
        const {turboFil} = await preconditions('DEFAULT_ADMIN_ROLE', hre);
        const tx = await turboFil.revokeRole(await turboFil[args.role](), account);
        await tx.wait(1);
        console.log('Revoke', args.role, 'from', account);
    });

task('fund-turbofil')
    .setDescription('Send TFC to TurboFil contract')
    .addParam('amount', 'the amount of TFC to fund TurboFil contract, in minimal unit', undefined, types.string)
    .setAction(async (args, hre) => {
        const {signer, turboFil} = await preconditions('DEFAULT_ADMIN_ROLE', hre);
        const tx = await signer.sendTransaction({to: turboFil.address, value: '0x' + BigInt(args.amount).toString(16)});
        await tx.wait(1);
        console.log(`Sent ${ethers.utils.formatEther(args.amount)} TFC to TurboFil contract`);
    });

task('withdraw-turbofil')
    .setDescription('Withdraw all TFC balance of TurboFil contract')
    .setAction(async (args, hre) => {
        const {turboFil} = await preconditions('DEFAULT_ADMIN_ROLE', hre);
        const tx = await turboFil.withdraw();
        await tx.wait(1);
        console.log('Withdrawn all TFC from TurboFil contract');
    });

task('set-sector-reward')
    .setDescription('Set the reward for sector owner each time sector verification passes')
    .addParam('reward', 'the reward in minimal unit of TFC', undefined, types.string)
    .setAction(async (args, hre) => {
        const {turboFil} = await preconditions('DEFAULT_ADMIN_ROLE', hre);
        const reward = args.reward;
        const tx = await turboFil.setSectorReward(reward);
        await tx.wait(1);
        console.log(`Sector reward set to ${reward}`);
    });

task('set-seed-reward')
    .setDescription('Set the reward for seed submitter each time sector verification finishes')
    .addParam('reward', 'the reward in minimal unit of TFC', undefined, types.string)
    .setAction(async (args, hre) => {
        const {turboFil} = await preconditions('DEFAULT_ADMIN_ROLE', hre);
        const reward = args.reward;
        const tx = await turboFil.setSeedReward(reward);
        await tx.wait(1);
        console.log(`Seed reward set to ${reward}`);
    });

task('set-verify-reward')
    .setDescription('Set the reward for proof verifier each time sector verification finishes')
    .addParam('reward', 'the reward in minimal unit of TFC', undefined, types.string)
    .setAction(async (args, hre) => {
        const {turboFil} = await preconditions('DEFAULT_ADMIN_ROLE', hre);
        const reward = args.reward;
        const tx = await turboFil.setVerifyReward(reward);
        await tx.wait(1);
        console.log(`Seed reward set to ${reward}`);
    });

task('set-verify-threshold')
    .setDescription('Set the minimal number of proof verifiers to settle the verification result')
    .addParam('threshold', 'the minimal number of proof verifiers', undefined, types.int)
    .setAction(async (args, hre) => {
        const {turboFil} = await preconditions('DEFAULT_ADMIN_ROLE', hre);
        const tx = await turboFil.setVerifyThreshold(args.threshold);
        await tx.wait(1);
        console.log('Verify threshold set to', args.threshold);
    });

task('set-lock-period')
    .setDescription('Set the period of lock for each sector reward')
    .addParam('period', 'the number of subsequent verifications, after which the reward can be unlocked', undefined, types.string)
    .setAction(async (args, hre) => {
        const {turboFil} = await preconditions('DEFAULT_ADMIN_ROLE', hre);
        const tx = await turboFil.setLockPeriod(args.period);
        await tx.wait(1);
        console.log(`Sector reward lock period set to ${args.period}`);
    });

task('set-submit-proof-timeout')
    .setDescription('Set the timeout (in terms of blocks) for a sector owner to submit proof')
    .addParam('timeout', 'the number of blocks before which a sector owner must submit proof', undefined, types.int)
    .setAction(async (args, hre) => {
        const {turboFil} = await preconditions('DEFAULT_ADMIN_ROLE', hre);
        const tx = await turboFil.setSubmitProofTimeout(args.timeout);
        await tx.wait(1);
        console.log('Submit proof timeout set to', args.timeout);
    });

task('set-verify-proof-timeout')
    .setDescription('Set the timeout (in terms of blocks) for a proof verifier to verify proof')
    .addParam('timeout', 'the number of blocks before which a proof verifier can verify proof', undefined, types.int)
    .setAction(async (args, hre) => {
        const {turboFil} = await preconditions('DEFAULT_ADMIN_ROLE', hre);
        const tx = await turboFil.setVerifyProofTimeout(args.timeout);
        await tx.wait(1);
        console.log('Verify proof timeout set to', args.timeout);
    });

task('show-config')
    .setDescription('Show current configuration of TurboFil contract')
    .setAction(async (args, hre) => {
        const {turboFil} = await preconditions(undefined, hre);
        console.log('Sector reward:', (await turboFil.sectorReward()).toString());
        console.log('Seed reward:', (await turboFil.seedReward()).toString());
        console.log('Verify reward:', (await turboFil.verifyReward()).toString());
        console.log('Verify threshold:', (await turboFil.verifyThreshold()).toString());
        console.log('Sector reward lock period:', (await turboFil.lockPeriod()).toString());
        console.log('Submit proof timeout:', (await turboFil.submitProofTimeout()).toString());
        console.log('Verify proof timeout:', (await turboFil.verifyProofTimeout()).toString());
    });

task('gen-afid')
    .setDescription('Generate a random afid (28 bytes). This is a fake afid and should only be used for testing')
    .setAction(async () => {
        const bytes = crypto.randomBytes(28);
        const afid = '0x' + bytes.toString('hex');
        console.log(afid);
    });

task('submit-sector')
    .setDescription('Submit sector')
    .addParam('afid', 'sector afid (afid-lite) in 28 bytes', undefined, types.string)
    .setAction(async (args, hre) => {
        const {signer, turboFil} = await preconditions('SECTOR_ROLE', hre);
        const deposit = await turboFil.depositRequirement();
        const tx = await turboFil.submitSector(signer.address, args.afid, {value: deposit});
        const receipt = await tx.wait(1);
        const sectorAddr = receipt.events?.[0]?.args?.['sector'];
        console.log('Sector submitted, sector address:', sectorAddr);
    });

task('listen-verification-task')
    .setDescription('Listen to the event that a sector proof is needed to be submitted')
    .addOptionalParam('sector', 'address of the sector on chain to listen to; if omitted, listen to all sectors', undefined, types.string)
    .setAction(async (args, hre) => {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise<void>(async (resolve, reject) => {
            try {
                const {signer, turboFil} = await preconditions(undefined, hre);
                if (args.sector) {
                    const sector: Sector = skeletons.Sector.factory.attach(args.sector).connect(signer);
                    const afid = await sector.afid();
                    const filter = turboFil.filters.VerificationTask(afid, null, null);
                    turboFil.on(filter, (sector_afid, seed, verification) => {
                        console.log('Verification task: ');
                        console.log('\tSector afid:', sector_afid);
                        console.log('\tSeed:', seed);
                        console.log('\tVerification id:', verification);
                    });
                } else {
                    turboFil.on('VerificationTask', (sector_afid, seed, verification) => {
                        console.log('Verification task: ');
                        console.log('\tSector afid:', sector_afid);
                        console.log('\tSeed:', seed);
                        console.log('\tVerification id:', verification);
                    });
                }
            } catch (e) {
                reject(e);
            }
        });
    });

task('submit-proof')
    .setDescription('Submit sector proof')
    .addParam('verification', 'the address of current verification')
    .addParam('afid', 'the afid (afid-lite, 28 bytes) of the sector proof')
    .setAction(async (args, hre) => {
        const {signer} = await preconditions(undefined, hre);
        const verification: Verification = skeletons.Verification.factory.attach(args.verification).connect(signer);
        const tx = await verification.submitProof(args.afid);
        await tx.wait(1);
        console.log('Proof submitted');
    });

task('submit-seed')
    .setDescription('Submit seed')
    .addParam('afid', 'the afid (afid-lite, 28 bytes) of the seed')
    .setAction(async (args, hre) => {
        const {turboFil} = await preconditions('SEED_ROLE', hre);
        const tx = await turboFil.submitSeed(args.afid);
        await tx.wait(1);
        console.log('Seed submitted, seed:', args.afid);
    });

task('listen-proof-submission')
    .setDescription('Listen to the event when sector proof are submitted')
    .setAction(async (args, hre) => {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise<void>(async (resolve, reject) => {
            try {
                const topic = skeletons.Verification.factory.interface.getEventTopic('ProofSubmitted');
                const filter: EventFilter = {
                    address: undefined,
                    topics: [topic],
                };
                const {provider} = await preconditions(undefined, hre);
                provider.on(filter, (log) => {
                    const description = skeletons.Verification.factory.interface.parseLog(log);
                    console.log('Proof submitted: ');
                    console.log('\tSector afid:', description.args.sector_afid);
                    console.log('\tSeed:', description.args.seed);
                    console.log('\tProof:', description.args.proof);
                    console.log('\tVerification id:', log.address);
                });
            } catch (e) {
                reject(e);
            }
        });
    });

task('verify-proof')
    .setDescription('Submit sector-seed verification result')
    .addParam('verification', 'id of the verification (address of Verification contract) that we submit result to', undefined, types.string)
    .addParam('result', 'whether the proof is valid or not', undefined, types.boolean)
    .setAction(async (args, hre) => {
        const {signer} = await preconditions('VERIFY_ROLE', hre);
        const verification: Verification = skeletons.Verification.factory.attach(args.verification).connect(signer);
        const tx = await verification.verifyProof(args.result);
        await tx.wait(1);
        console.log('Verification result submitted');
    });
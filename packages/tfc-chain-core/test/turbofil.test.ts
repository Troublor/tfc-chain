import {Sector, Sector__factory, TurboFil, TurboFil__factory, Verification} from '../typechain';
import {ethers} from 'hardhat';
import '@nomiclabs/hardhat-ethers';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import {genAfid} from './helpers';
import {skeletons} from '../index';

interface Event {
    address: string,
    event: string,
    args: Record<string, unknown>
}

describe('TurboFil', () => {
    const sectorReward = 1;
    const seedReward = 1;
    const verifyReward = 1;
    const lockPeriod = 3;
    const submitProofTimeout = 1;
    const verifyProofTimeout = 1;
    const verifyThreshold = 1;
    const deposit = sectorReward * lockPeriod;

    let turboFil: TurboFil;
    let Sector: Sector__factory;
    let deployer: SignerWithAddress;
    let sectorSubmitter: SignerWithAddress;
    let seedSubmitter: SignerWithAddress;
    let rnode: SignerWithAddress;

    beforeEach(async () => {
        [deployer, sectorSubmitter, seedSubmitter, rnode] = await ethers.getSigners();

        Sector = (await ethers.getContractFactory('Sector')) as unknown as Sector__factory;

        const TurboFil = (await ethers.getContractFactory('TurboFil')) as unknown as TurboFil__factory;
        turboFil = await TurboFil.connect(deployer).deploy(sectorReward, seedReward, verifyReward, lockPeriod,
            submitProofTimeout, verifyProofTimeout, verifyThreshold, {value: ethers.utils.parseEther('1')});
        await turboFil.deployed();

        // set up roles
        const promises: Promise<unknown>[] = [];
        let tx = await turboFil.connect(deployer).grantRole(await turboFil.SECTOR_ROLE(), sectorSubmitter.address);
        promises.push(tx.wait(1));
        tx = await turboFil.connect(deployer).grantRole(await turboFil.SEED_ROLE(), seedSubmitter.address);
        promises.push(tx.wait(1));
        tx = await turboFil.connect(deployer).grantRole(await turboFil.MAINTAIN_ROLE(), deployer.address);
        promises.push(tx.wait(1));
        tx = await turboFil.connect(deployer).grantRole(await turboFil.VERIFY_ROLE(), deployer.address);
        promises.push(tx.wait(1));

        await Promise.all(promises);
    });

    describe('Sector created', () => {
        const sectorAfid = genAfid();
        let sector: Sector;

        beforeEach(async () => {
            const tx = await turboFil.connect(sectorSubmitter).submitSector(rnode.address, sectorAfid, {value: deposit});
            const receipt = await tx.wait(1);
            const event = receipt.events?.[0] as unknown as Event;
            expect(event.event).toEqual('SectorSubmission');
            expect(event.args['owner']).toEqual(rnode.address);
            expect(event.args['afid']).toEqual(sectorAfid);
            const sectorAddr = event.args['sector'] as string;
            sector = Sector.attach(sectorAddr);

            // verify sector contract
            expect(await sector.afid()).toEqual(sectorAfid);
            expect(await sector.turboFil()).toEqual(turboFil.address);
            expect(await sector.owner()).toEqual(rnode.address);
            expect((await ethers.provider.getBalance(sectorAddr)).toNumber()).toEqual(deposit);
            expect((await sector.lockedTFC()).toNumber()).toEqual(deposit);
        });

        describe('Seed submitted', () => {
            const seed = genAfid();
            let verification: Verification;

            beforeEach(async () => {
                const tx = await turboFil.connect(seedSubmitter).submitSeed(seed);
                const receipt = await tx.wait(1);
                const event = receipt.events?.[0] as unknown as Event;
                expect(event.event).toEqual('VerificationTask');
                expect(event.args['verification']).toBeTruthy();

                verification = skeletons.Verification.factory.attach(event.args['verification'] as string);
            });

            test('should generate correct verification contract', async () => {
                expect(await verification.connect(deployer).sector()).toEqual(sector.address);
                expect(await verification.connect(deployer).seed()).toEqual(seed);
                expect(await verification.connect(deployer).seedSubmitter()).toEqual(seedSubmitter.address);
            });

            test('Other people cannot submit proof', async () => {
                await expect(verification.connect(seedSubmitter).submitProof('abcdef'))
                    .rejects.toThrow('Verification: caller is not sector owner');
            });

            describe('Proof submitted', () => {
                beforeEach(async () => {
                    const tx = await verification.connect(rnode).submitProof('proof');
                    await tx.wait(1);
                });

                test('Verifier verifies proof and distribute reward', async () => {
                    const rnodeBalanceBefore = await rnode.getBalance();
                    const seedSubmitterBalanceBefore = await seedSubmitter.getBalance();
                    const verifierBalanceBefore = await deployer.getBalance();

                    // verify
                    const tx = await verification.connect(deployer).verifyProof(true, {gasPrice: 0});
                    const receipt = await tx.wait(1);
                    let event = receipt.events?.[0];
                    expect(event?.event).toEqual('ProofVerified');
                    expect(event?.args?.[0]).toEqual(sectorAfid);
                    expect(event?.args?.[1]).toEqual(seed);
                    expect(event?.args?.[2]).toEqual('proof');
                    expect(event?.args?.[3]).toEqual(true);

                    event = receipt.events?.[1];
                    expect(event?.event).toEqual('VerifyFinish');
                    expect(event?.args?.[0]).toEqual(true);

                    // check balance
                    const rnodeBalanceAfter = await rnode.getBalance();
                    const seedSubmitterBalanceAfter = await seedSubmitter.getBalance();
                    const verifierBalanceAfter = await deployer.getBalance();
                    expect(rnodeBalanceAfter.toString()).toEqual(rnodeBalanceBefore.add(sectorReward).toString());
                    expect(seedSubmitterBalanceAfter.toString()).toEqual(seedSubmitterBalanceBefore.add(seedReward).toString());
                    expect(verifierBalanceAfter.toString()).toEqual(verifierBalanceBefore.add(verifyReward).toString());
                });
            });
        });
    });
});
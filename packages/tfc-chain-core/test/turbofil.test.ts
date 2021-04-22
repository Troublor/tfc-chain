import {Sector, Sector__factory, TurboFil, TurboFil__factory} from '../typechain';
import {ethers} from 'hardhat';
import '@nomiclabs/hardhat-ethers';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/dist/src/signer-with-address';
import {genAfid} from './helpers';

interface Event {
    address: string,
    event: string,
    args: Record<string, unknown>
}

describe('TurboFil contract', () => {
    const rewardUnit = 1;
    const lockPeriod = 3;
    const deposit = rewardUnit * lockPeriod;

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
        turboFil = await TurboFil.connect(deployer).deploy(rewardUnit, lockPeriod);
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

        // maintenance
        tx = await deployer.sendTransaction({to: turboFil.address, value: ethers.utils.parseEther('1')});
        promises.push(tx.wait(1));

        await Promise.all(promises);
    });

    describe('sector verification', () => {
        const afid = genAfid();
        let sector: Sector;

        beforeEach(async () => {
            const tx = await turboFil.connect(sectorSubmitter).submitSector(rnode.address, afid, {value: deposit});
            const receipt = await tx.wait(1);
            const event = receipt.events?.[0] as unknown as Event;
            expect(event.event).toEqual('SectorSubmission');
            expect(event.args['owner']).toEqual(rnode.address);
            expect(event.args['afid']).toEqual(afid);
            const sectorAddr = event.args['sector'] as string;
            sector = Sector.attach(sectorAddr);

            // verify sector contract
            expect(await sector.afid()).toEqual(afid);
            expect(await sector.turboFil()).toEqual(turboFil.address);
            expect(await sector.owner()).toEqual(rnode.address);
            expect((await ethers.provider.getBalance(sectorAddr)).toNumber()).toEqual(deposit);
            expect((await sector.lockedTFC()).toNumber()).toEqual(deposit);
        });

        describe('seed submission', () => {
            const seed = genAfid();

            beforeEach(async () => {
                const tx = await turboFil.connect(seedSubmitter).submitSeed(seed);
                const receipt = await tx.wait(1);
                const event = receipt.events?.[0] as unknown as Event;
                expect(event.event).toEqual('SeedSectorVerify');
                expect(event.args['seed']).toEqual(seed);
                expect(event.args['sector_afid']).toEqual(afid);
                expect(await turboFil.sectorWithAfid(afid)).toEqual(sector.address);
            });

            test('should accept verification success result', async () => {
                const balanceBefore = await rnode.getBalance();

                const tx = await turboFil.connect(deployer).sectorVerification_callback(seed, afid, true);
                const receipt = await tx.wait(1);
                const log = receipt.logs[0];
                const event = Sector.interface.parseLog(log);
                expect(log.address).toEqual(sector.address);
                expect(event.name).toEqual('Verification');
                expect(event.args['seed']).toEqual(seed);
                expect(event.args['success']).toEqual(true);
                expect(event.args['reward'].toNumber()).toEqual(rewardUnit);
                expect(event.args['punish'].toNumber()).toEqual(0);

                const balanceAfter = await rnode.getBalance();
                expect(balanceAfter.sub(balanceBefore).toNumber()).toEqual(rewardUnit);
            });

            test('should accept verification failed result', async () => {
                const lockedReward = await sector.lockedTFC();

                const tx = await turboFil.connect(deployer).sectorVerification_callback(seed, afid, false);
                const receipt = await tx.wait(1);
                const log = receipt.logs[0];
                const event = Sector.interface.parseLog(log);
                expect(log.address).toEqual(sector.address);
                expect(event.name).toEqual('Verification');
                expect(event.args['seed']).toEqual(seed);
                expect(event.args['success']).toEqual(false);
                expect(event.args['reward'].toNumber()).toEqual(0);
                expect(event.args['punish'].toNumber()).toEqual(lockedReward.toNumber());

                const balance = await ethers.provider.getBalance(sector.address);
                expect(balance.toNumber()).toEqual(0);
            });
        });
    });
});
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/signers';

import('@nomiclabs/hardhat-waffle');
import {ethers} from 'hardhat';
import {Seed, TFCShare} from '../src/typechain';
import {networks} from '../src';
import {deployTFCShare} from '../src/util/deploy';
import {containsEvent} from '../src/util/event';

describe('Seed contract', ()=>{
    let turboFil: SignerWithAddress;
    let deployer: SignerWithAddress;
    let submitter: SignerWithAddress;
    let consumer: SignerWithAddress;
    let seed: Seed;
    let seedSubmissionShare: TFCShare;
    let seedEvaluationShare: TFCShare;

    beforeEach(async ()=>{
        [turboFil, deployer, submitter, consumer] = await ethers.getSigners();
        seedSubmissionShare = await deployTFCShare('SeedSubmission', turboFil.address, deployer);
        seedEvaluationShare = await deployTFCShare('SeedEvaluation', turboFil.address, deployer);
        seed = await networks.mock.Seed.factory.connect(deployer).deploy(submitter.address, 'afid', seedSubmissionShare.address, seedEvaluationShare.address);
        await seed.deployed();
        // grant privilege to consumer
        let tx = await seed.connect(deployer).grantRole(await seed.CONSUMER_ROLE(), consumer.address);
        await tx.wait(1);
        // grant minter role of two TFCShares to the seed contract
        tx = await seedSubmissionShare.connect(turboFil).grantRole(await seedSubmissionShare.MINTER_ROLE(), seed.address);
        await tx.wait(1);
        tx = await seedEvaluationShare.connect(turboFil).grantRole(await seedEvaluationShare.MINTER_ROLE(), seed.address);
        await tx.wait(1);
    });

    test('should saved the afid and submitter', async ()=>{
        await expect(seed.afid()).resolves.toEqual('afid');
        await expect(seed.submitter()).resolves.toEqual(submitter.address);
    });

    test('should prevent being consumed by an unauthorized user', async ()=>{
        await expect(seed.connect(submitter).consume()).rejects.toThrow('Seed: Caller does not have privilege to consume');
    });

    test('should prevent being consumed before enough evaluations', async ()=>{
        await expect(seed.connect(consumer).consume()).rejects.toThrow('Seed: Not enough likes');
    });

    test('should allow evaluation and emit EvaluateSeed event', async ()=>{
        const tx = await seed.connect(submitter).evaluate(submitter.address, true);
        const receipt = await tx.wait(1);
        expect(containsEvent(receipt, {
            name: 'EvaluateSeed',
            args: {
                seed: seed.address,
                afid: 'afid',
                evaluator: submitter.address,
                like: true,
            },
        })).toBeTruthy();

        // the evaluator gets 1 shares in SeedEvaluation TFCShare
        expect((await seedEvaluationShare.shares(submitter.address)).toNumber()).toEqual(1);
    });

    test('should allow consume after get enough evaluations and prevent being consumed again', async ()=>{
        const evaluate=async (evaluator: string, like: boolean) => {
            const tx = await seed.connect(deployer).evaluate(evaluator, like);
            await tx.wait(1);
        };
        await evaluate(deployer.address, true);
        await evaluate(submitter.address, true);
        await evaluate(consumer.address, true);


        const tx = await seed.connect(consumer).consume();
        await tx.wait(1);
        // after the seed is consumed, submitter gets 1 share in SeedSubmission TFCShare
        expect((await seedSubmissionShare.shares(submitter.address)).toNumber()).toEqual(1);

        await expect(seed.connect(consumer).consume()).rejects.toThrow('Seed: Already consumed');
    });

    test('should prevent being repeatedly evaluated by the same user', async ()=>{
        await expect(seed.connect(deployer).evaluate(deployer.address, true)).resolves;
        await expect(seed.connect(submitter).evaluate(deployer.address, true)).rejects;
    });
});
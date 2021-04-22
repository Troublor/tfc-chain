/**
 * This script monitor SeedSectorVerify event from TurboFil contract and fulfill the verification result.
 */
import {networks} from '@tfc-chain/core';
import {TurboFil} from '@tfc-chain/core/typechain';
import {ethers} from 'ethers';
import {ContextLogger} from '@troubkit/log';
import env from './env';
import {genAfid} from './helpers';

interface context {
    provider: ethers.providers.Provider;
    turboFil: TurboFil;
    logger: ContextLogger;
    submitter: ethers.Signer;
}

async function submitSector(ctx: context): Promise<string> {
    const afid = genAfid();
    const owner = await ctx.submitter.getAddress();
    const deposit = await ctx.turboFil.connect(ctx.submitter).depositRequirement();
    const tx = await ctx.turboFil.connect(ctx.submitter).submitSector(owner, afid, {value: deposit});
    const receipt = await tx.wait(3);
    return receipt.events?.[0]?.args?.['sector'];
}

async function main(): Promise<void> {
    const logger = new ContextLogger('test');
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
    const submitter = (new ethers.Wallet(env.sectorSubmitterPrivateKey)).connect(provider);
    const turboFil: TurboFil = networks.development.TurboFil.contract.connect(submitter);
    const ctx: context = {provider, turboFil, logger, submitter};

    setInterval(()=>{
        submitSector(ctx).then(sector  => {
            logger.info('Submitted sector', {sector: sector});
        }).catch(e=>{
            logger.error('Submit sector failed', {err: e});
        });
    }, 5000);
}

if (require.main === module) {
    main().catch(console.error);
}
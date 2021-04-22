/**
 * This script monitor SeedSectorVerify event from TurboFil contract and fulfill the verification result.
 */
import {networks} from '@tfc-chain/core';
import {TurboFil} from '@tfc-chain/core/typechain';
import {ethers} from 'ethers';
import {ContextLogger} from '@troubkit/log';
import env from './env';

interface context {
    provider: ethers.providers.Provider;
    turboFil: TurboFil;
    logger: ContextLogger;
}

async function verify(seed: string, sectorAfid: string, ctx: context): Promise<boolean> {
    const rand = Math.random();
    return rand <= 0.9;
}

async function main(): Promise<void> {
    const logger = new ContextLogger('test');
    const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
    const verifier = new ethers.Wallet(env.verifierPrivateKey, provider);
    const turboFil: TurboFil = networks.development.TurboFil.contract.connect(verifier);
    const filter = turboFil.filters.SeedSectorVerify(null, null);
    const ctx: context = {
        provider, turboFil, logger,
    };

    provider.on(filter, async args => {
        const event = turboFil.interface.parseLog(args);
        const seed: string = event.args['seed'];
        const sectorAfid: string = event.args['sector_afid'];
        logger.info('Verifying sector', {sector: sectorAfid, seed: seed});
        try {
            const result = await verify(seed, sectorAfid, ctx);
            const tx = await turboFil.connect(verifier).sectorVerification_callback(sectorAfid, sectorAfid, result);
            await tx.wait(3);
            logger.info('Verified sector', {sector: sectorAfid, seed: seed, result: result});
        } catch (e) {
            logger.warn('Failed to verify sector', {err: e});
        }
    });
}

if (require.main === module) {
    main().catch(console.error);
}
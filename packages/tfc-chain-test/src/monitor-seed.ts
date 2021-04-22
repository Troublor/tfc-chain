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
        if (args.removed) return;
        const event = turboFil.interface.parseLog(args);
        const seed: string = event.args['seed'];
        const sectorAfid: string = event.args['sector_afid'];
        logger.info('Seed-sector verification task', {sector_afid: sectorAfid, seed: seed});
    });
}

if (require.main === module) {
    main().catch(console.error);
}
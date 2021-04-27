import {Middleware} from './internal/middleware';

export class SeedSubmitter extends Middleware{
    async submitSeed(seed: Buffer): Promise<{
        sectorAfid: string,
        verification: string,
    }> {
        if (!await this.hasSeedRole()) {
            throw new Error(`account ${this.wallet.address} does not have privilege to submit seed, please let maintainer grant the proper role`);
        }
        const tx = await this.turboFil.submitSeed(seed);
        const receipt = await tx.wait(this.confirmationRequirement);
        return {
            sectorAfid: receipt.events?.[0].args?.[0],
            verification: receipt.events?.[0].args?.[2],
        };
    }
}
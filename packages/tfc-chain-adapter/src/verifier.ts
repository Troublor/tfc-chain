import {Middleware} from './internal/middleware';
import {ethers} from 'ethers';
import {skeletons} from '@tfc-chain/core';
import {Verification} from '@tfc-chain/core';
import {User} from './user';

export class Verifier extends User {
    async verifyProof(verification: string, result: boolean): Promise<ethers.ContractReceipt> {
        if (!await this.hasVerifyRole()) {
            throw new Error(`account ${this.wallet.address} does not have privilege to verify sector proof, please let maintainer grant the proper role`);
        }
        const v: Verification = skeletons.Verification.factory.attach(verification).connect(this.wallet);
        const tx = await v.verifyProof(result);
        return await tx.wait(this.confirmationRequirement);
    }
}
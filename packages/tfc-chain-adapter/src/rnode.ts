import {ethers} from 'ethers';
import {Middleware} from './internal/middleware';
import {skeletons} from '@tfc-chain/core';

export class RNode extends Middleware {
    async submitSector(afid: Buffer): Promise<ethers.ContractReceipt> {
        if (!await this.hasSectorRole()) {
            throw new Error(`account ${this.wallet.address} does not have privilege to submit sector, please let maintainer grant the proper role`);
        }
        const tx = await this.turboFil.submitSector(this.wallet.address, afid);
        return await tx.wait(this.confirmationRequirement);
    }

    async submitProof(verification: string, proof: string): Promise<ethers.ContractReceipt> {
        const tx = await skeletons.Verification.factory.attach(verification).connect(this.wallet).submitProof(proof);
        return await tx.wait(this.confirmationRequirement);
    }

    onReceiveTransfer(listener: (sender: string, amount: ethers.BigNumber) => never): RNode {
        this.on('block', async block => {
            for (const txHash of block.transactions) {
                const tx = await this.provider.getTransaction(txHash);
                const receipt = await this.provider.getTransactionReceipt(txHash);
                if (receipt.status && tx.to === this.wallet.address && tx.value.gt(0)) {
                    listener(tx.from, tx.value as ethers.BigNumber);
                }
            }
        });
        return this;
    }
}
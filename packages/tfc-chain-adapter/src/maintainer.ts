import {Middleware} from './internal/middleware';
import {TurboFil} from '@tfc-chain/core/typechain';
import {skeletons} from '@tfc-chain/core';
import {ethers} from 'ethers';
import {TransactionReceipt} from '@ethersproject/abstract-provider';

export class Maintainer extends Middleware {

    constructor(chainEndpoint: string, maintainerPrivateKey: string, turboFilAddress: string) {
        super(chainEndpoint, maintainerPrivateKey, turboFilAddress);
    }

    async setSubmitProofTimeout(timeout: ethers.BigNumberish): Promise<ethers.ContractReceipt> {
        const tx = await this.turboFil.setSubmitProofTimeout(timeout);
        return await tx.wait(this.confirmationRequirement);
    }

    async setVerifyProofTimeout(timeout: ethers.BigNumberish): Promise<ethers.ContractReceipt> {
        const tx = await this.turboFil.setVerifyProofTimeout(timeout);
        return await tx.wait(this.confirmationRequirement);
    }

    async setVerifyThresholdTimeout(threshold: ethers.BigNumberish): Promise<ethers.ContractReceipt> {
        const tx = await this.turboFil.setVerifyThreshold(threshold);
        return await tx.wait(this.confirmationRequirement);
    }

    async setSectorReward(reward: ethers.BigNumberish): Promise<ethers.ContractReceipt> {
        const tx = await this.turboFil.setSectorReward(reward);
        return await tx.wait(this.confirmationRequirement);
    }

    async setSeedReward(reward: ethers.BigNumberish): Promise<ethers.ContractReceipt> {
        const tx = await this.turboFil.setSeedReward(reward);
        return await tx.wait(this.confirmationRequirement);
    }

    async setVerifyReward(reward: ethers.BigNumberish): Promise<ethers.ContractReceipt> {
        const tx = await this.turboFil.setVerifyReward(reward);
        return await tx.wait(this.confirmationRequirement);
    }

    async setLockPeriod(period: ethers.BigNumberish): Promise<ethers.ContractReceipt> {
        const tx = await this.turboFil.setLockPeriod(period);
        return await tx.wait(this.confirmationRequirement);
    }

    async withdraw(): Promise<ethers.ContractReceipt> {
        const tx = await this.turboFil.withdraw();
        return await tx.wait(this.confirmationRequirement);
    }

    async fund(amount: ethers.BigNumberish): Promise<TransactionReceipt> {
        const tx = await this.wallet.sendTransaction({to: this.turboFil.address, value: amount});
        return await tx.wait(this.confirmationRequirement);
    }
}
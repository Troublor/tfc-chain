import {Middleware} from './internal/middleware';
import {skeletons} from '@tfc-chain/core';
import {ethers} from 'ethers';

export class User extends Middleware {
    constructor(chainEndpoint: string, deployerPrivateKey: string, turboFilAddress: string) {
        super(chainEndpoint, deployerPrivateKey, turboFilAddress);
    }

    /**
     * Transfer TFC from one account to another
     * @param toAddress the address of the "to" account
     * @param amount amount of TFC to transfer
     */
    async transfer(toAddress: string, amount: ethers.BigNumber): Promise<void> {
        const tx = await this.wallet.sendTransaction({to: toAddress, value: amount});
        await tx.wait(1);
    }

    async hasVerifyRole(address?: string): Promise<boolean> {
        if (!address) address = this.wallet.address;
        return await this.turboFil.hasRole(await this.turboFil.VERIFY_ROLE(), address);
    }

    async hasSectorRole(address?: string): Promise<boolean> {
        if (!address) address = this.wallet.address;
        return await this.turboFil.hasRole(await this.turboFil.SECTOR_ROLE(), address);
    }

    async hasSeedRole(address?: string): Promise<boolean> {
        if (!address) address = this.wallet.address;
        return await this.turboFil.hasRole(await this.turboFil.SEED_ROLE(), address);
    }

    /**
     * Listen to reward distribution.
     * @param listener
     * @param verification the address of verification contract to listen to; null to listen to all.
     * @param rewardType 0=sector_reward, 1=seed_reward, 2=verify_reward;  null to listen to all.
     * @param to the address that receives the reward;  null to listen to all.
     * @param fromBlock optional, from which block to listen to, default=current head
     */
    onReceiveReward(listener: (rewardType: number, to: string, amount: ethers.BigNumber, verificationAddress: string) => unknown, verification: string | null, rewardType: number | null, to: string | null, fromBlock?: number): User {
        const filter = {
            address: verification ?? undefined,
            topics: [
                skeletons.Verification.factory.interface.getEventTopic('Reward'),
                rewardType ? ethers.utils.hexZeroPad(Buffer.from([rewardType as number]), 32) : null,
                to ? ethers.utils.hexZeroPad(to, 32) : null,
            ],
        };
        // check ancient blocks
        fromBlock && this.provider.getBlockNumber().then(head => {
            if (fromBlock <= head - this.confirmationRequirement) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                this.provider.getLogs({
                    ...filter,
                    fromBlock: fromBlock,
                    toBlock: head - this.confirmationRequirement,
                }).then(logs => {
                    for (const log of logs) {
                        const description = skeletons.Verification.factory.interface.parseLog(log);
                        listener(description.args[0], description.args[1], description.args[2], log.address);
                    }
                });
            }
        });
        this.on('block', async block => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.provider.getLogs({
                ...filter,
                fromBlock: block.number,
                toBlock: block.number,
            }).then(logs => {
                for (const log of logs) {
                    const description = skeletons.Verification.factory.interface.parseLog(log);
                    listener(description.args[0], description.args[1], description.args[2], log.address);
                }
            });
        });
        return this;
    }

    onSectorVerificationTask(listener: (sectorAfid: Buffer, seed: Buffer, verificationAddress: string) => unknown, sectorAfid: Buffer | null, fromBlock?: number): User {
        const filter = this.turboFil.filters.VerificationTask(sectorAfid, null, null);
        // check ancient blocks
        fromBlock && this.provider.getBlockNumber().then(head => {
            if (fromBlock <= head - this.confirmationRequirement) {
                this.turboFil.queryFilter(filter, fromBlock, head - this.confirmationRequirement).then(events => {
                    for (const event of events) {
                        listener(Buffer.from(event.args[0]), Buffer.from(event.args[1]), event.args[2]);
                    }
                });
            }
        });
        this.on('block', async block => {
            this.turboFil.queryFilter(filter, block.hash).then(events => {
                for (const event of events) {
                    listener(Buffer.from(event.args[0]), Buffer.from(event.args[1]), event.args[2]);
                }
            });
        });
        return this;
    }

    onSectorProofSubmitted(listener: (sectorAfid: Buffer, seed: Buffer, proof: Buffer, verificationAddress: string) => unknown, fromBlock?: number): User {
        const topic = skeletons.Verification.factory.interface.getEventTopic('ProofSubmitted');
        const filter = {
            topics: [
                topic,
            ],
        };
        // check ancient blocks
        fromBlock && this.provider.getBlockNumber().then(head => {
            if (fromBlock <= head - this.confirmationRequirement) {
                this.provider.getLogs({
                    ...filter,
                    fromBlock: fromBlock,
                    toBlock: head - this.confirmationRequirement,
                }).then(logs => {
                    for (const log of logs) {
                        const description = skeletons.Verification.factory.interface.parseLog(log);
                        listener(Buffer.from(description.args[0]), Buffer.from(description.args[1]), Buffer.from(description.args[2]), log.address);
                    }
                });
            }
        });
        this.on('block', async block => {
            this.provider.getLogs({
                ...filter,
                fromBlock: block.number,
                toBlock: block.number,
            }).then(logs => {
                for (const log of logs) {
                    const description = skeletons.Verification.factory.interface.parseLog(log);
                    listener(Buffer.from(description.args[0]), Buffer.from(description.args[1]), description.args[2], log.address);
                }
            });
        });
        return this;
    }
}
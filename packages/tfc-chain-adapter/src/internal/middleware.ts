import {ethers} from 'ethers';
import {endpoint2Provider} from './utils';
import {TurboFil} from '@tfc-chain/core';
import {skeletons} from '@tfc-chain/core';
import {EventEmitter, BuiltinEvents} from '@troubkit/tools';
import {Block} from '@ethersproject/abstract-provider';

type Events = BuiltinEvents & {
    block: [Block]
}

export class Middleware extends EventEmitter<Events> {
    provider: ethers.providers.Provider;
    wallet: ethers.Wallet;
    turboFil: TurboFil;

    confirmationRequirement = 1;

    constructor(chainEndpoint: string, privateKey: string, turboFilAddress: string) {
        super();
        this.provider = endpoint2Provider(chainEndpoint);
        this.wallet = new ethers.Wallet(privateKey);
        this.wallet.connect(this.provider);
        this.turboFil = skeletons.TurboFil.factory.attach(turboFilAddress).connect(this.wallet);

        this.on('newListener', (event) => {
            switch (event) {
            case 'block':
                this._startListeningBlocks();
                break;
            }
        });
        this.on('removeListener', (event) => {
            switch (event) {
            case 'block':
                this._stopListeningBlocks();
                break;
            }
        });
    }

    changeAccount(privateKey: string): Middleware {
        this.wallet = (new ethers.Wallet(privateKey)).connect(this.provider);
        return this;
    }

    changeNetwork(chainEndpoint: string): Middleware {
        this.provider = endpoint2Provider(chainEndpoint);
        this.wallet = this.wallet.connect(this.provider);
        return this;
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

    onSectorVerificationTask(listener: (sectorAfid: Buffer, seed: Buffer, verificationAddress: string) => never, sectorAfid: Buffer | null, fromBlock?: number): Middleware {
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

    onSectorProofSubmitted(listener: (sectorAfid: Buffer, seed: Buffer, proof: string) => never, fromBlock?: number): Middleware {
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
                        listener(Buffer.from(description.args[0]), Buffer.from(description.args[1]), description.args[2]);
                    }
                });
            }
        });
        this.on('block', async block => {
            this.provider.getLogs({
                ...filter,
                fromBlock: block.hash,
                toBlock: block.hash,
            }).then(logs => {
                for (const log of logs) {
                    const description = skeletons.Verification.factory.interface.parseLog(log);
                    listener(Buffer.from(description.args[0]), Buffer.from(description.args[1]), description.args[2]);
                }
            });
        });
        return this;
    }

    private _startListeningBlocks() {
        if (this.listenerCount('block') > 0) return;
        this.provider.on('block', async (blockNumber) => {
            const block = await this.provider.getBlock(blockNumber - this.confirmationRequirement);
            this.emit('block', block);
        });
    }

    private _stopListeningBlocks() {
        if (this.listenerCount('block') > 0) return;
        this.provider.off('block');
    }

}
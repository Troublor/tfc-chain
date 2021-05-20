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
        this.wallet = this.wallet.connect(this.provider);
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
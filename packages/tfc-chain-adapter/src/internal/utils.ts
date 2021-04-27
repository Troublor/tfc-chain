import {ethers} from 'ethers';

export function endpoint2Provider(chainEndpoint: string): ethers.providers.Provider {
    let provider: ethers.providers.Provider;
    if (chainEndpoint.toLowerCase().startsWith('ws')) {
        provider = new ethers.providers.WebSocketProvider(chainEndpoint);
    } else {
        provider = new ethers.providers.JsonRpcProvider(chainEndpoint);
    }
    return provider;
}
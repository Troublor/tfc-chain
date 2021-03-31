import wallet from 'ethereumjs-wallet';
import * as ethers from 'ethers';

export function generateKey(): string {
    const key = wallet.generate();
    return key.getPrivateKeyString();
}

export function getAddress(privateKey: string): string {
    return ethers.utils.computeAddress(privateKey);
}
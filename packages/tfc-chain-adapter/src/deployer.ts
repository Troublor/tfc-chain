import {ethers} from 'ethers';
import {TurboFil} from '@tfc-chain/core';
import {skeletons} from '@tfc-chain/core';
import {endpoint2Provider} from './internal/utils';
import {Middleware} from './internal/middleware';

export type DeployInitArgs = {
    sectorReward: ethers.BigNumberish,
    seedReward: ethers.BigNumberish,
    verifyReward: ethers.BigNumberish,
    lockPeriod: ethers.BigNumberish,

    submitProofTimeout: ethers.BigNumberish,
    verifyProofTimeout: ethers.BigNumberish,
    verifyThreshold: ethers.BigNumberish,

    maintainers: string[],
}

export class Deployer extends Middleware {
    static async deploy(chainEndpoint: string, deployerPrivateKey: string, initArgs: DeployInitArgs): Promise<Deployer> {
        // init provider
        const provider = endpoint2Provider(chainEndpoint);
        // init deploy account
        const deployer = (new ethers.Wallet(deployerPrivateKey)).connect(provider);

        // deploy contract
        const turboFil: TurboFil = await skeletons.TurboFil.factory.connect(deployer).deploy(
            initArgs.sectorReward, initArgs.seedReward, initArgs.verifyReward, initArgs.lockPeriod,
            initArgs.submitProofTimeout, initArgs.verifyProofTimeout, initArgs.verifyThreshold,
        );
        await turboFil.deployed();
        console.log('TurboFil contract deployed:', turboFil.address);

        if (initArgs.maintainers.length > 0) {
            const promises: Promise<unknown>[] = [];
            for (const addr of initArgs.maintainers) {
                console.log('Granting MAINTAIN_ROLE to', addr);
                const tx = await turboFil.grantRole(await turboFil.MAINTAIN_ROLE(), addr);
                promises.push(tx.wait(1));
            }
            await Promise.all(promises);
        }
        console.log('Deployment finished');

        return new Deployer(chainEndpoint, deployerPrivateKey, turboFil.address);
    }

    constructor(chainEndpoint: string, deployerPrivateKey: string, turboFilAddress: string) {
        super(chainEndpoint, deployerPrivateKey, turboFilAddress);
    }

    async grantSectorRole(address: string): Promise<void> {
        const tx = await this.turboFil.grantRole(await this.turboFil.SECTOR_ROLE(), address);
        await tx.wait(this.confirmationRequirement);
    }

    async grantSeedRole(address: string): Promise<void> {
        const tx = await this.turboFil.grantRole(await this.turboFil.SEED_ROLE(), address);
        await tx.wait(this.confirmationRequirement);
    }

    async grantVerifyRole(address: string): Promise<void> {
        const tx = await this.turboFil.grantRole(await this.turboFil.VERIFY_ROLE(), address);
        await tx.wait(this.confirmationRequirement);
    }

    async grantMaintainRole(address: string): Promise<void> {
        const tx = await this.turboFil.grantRole(await this.turboFil.MAINTAIN_ROLE(), address);
        await tx.wait(this.confirmationRequirement);
    }
}
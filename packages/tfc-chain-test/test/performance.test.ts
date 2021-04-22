import {networks, TurboFil} from '@tfc-chain/core';
import {ContextLogger, Level} from '@troubkit/log';
import {ethers} from 'ethers';
import crypto from 'crypto';
import * as net from 'net';


interface context {
    logger: ContextLogger;
    turboFil: TurboFil;
    provider: ethers.providers.Provider;
    admin: ethers.Signer;
    nonce: number;
}

type Afid = [string, string];

function genRandomAfid(): Afid {
    return [
        '0x' + crypto.randomBytes(32).toString('hex'),
        '0x' + crypto.randomBytes(32).toString('hex'),
    ];
}

function submitSectorLoop(ctx: context) {
    const owner = '0xd8444321ba7f99883a20ff2157A4e419F92E6fc5';
    const sectorsPerSecond = 25;
    let processedPerSecond = 0;
    const submitSectors = () => {
        for (let i = 0; i < sectorsPerSecond; i++) {
            const afid = genRandomAfid();
            ctx.turboFil.submitSector(owner, afid, {
                value: 90,
                nonce: ctx.nonce++,
            }).then(tx => {
                tx.wait(1).then(() => {
                    processedPerSecond++;
                });
            });

        }
    };
    setInterval(submitSectors, 1000);
    setInterval(() => {
        ctx.logger.info('Sector submission process report', {
            processRate: `${processedPerSecond / 30}/sec`,
            submitRate: `${sectorsPerSecond}/sec`,
        });
        processedPerSecond = 0;
    }, 30000);
}

function submitSeedLoop(ctx: context) {
    const seedsPerSecond = 75;
    let processedPerSecond = 0;
    let successCount = 0;
    let failCount = 0;
    const submitSeeds = async () => {
        for (let i = 0; i < seedsPerSecond; i++) {
            const afid = genRandomAfid();
            const tx = await ctx.turboFil.submitSeed(afid, {nonce: ctx.nonce++});
            tx.wait(1).then(() => {
                successCount++;
            }).catch(e => {
                // console.log(`["${afid[0]}","${afid[1]}"]`);
                failCount++;
                // ctx.logger.error(e);
            }).finally(()=>{
                processedPerSecond++;
            });
        }
    };
    setInterval(submitSeeds, 1000);
    setInterval(() => {
        ctx.logger.info('Seed submission process report', {
            processRate: `${processedPerSecond / 30}/sec`,
            submitRate: `${seedsPerSecond}/sec`,
            successCount,
            failCount,
        });
        processedPerSecond = 0;
        successCount = 0;
        failCount = 0;
    }, 30000);
}

async function main(): Promise<void> {
    const logger = new ContextLogger('performance', Level.INFO);
    const provider = new ethers.providers.WebSocketProvider('ws://localhost:8546');
    let admin = new ethers.Wallet('0xa26d6e7a49d34ef836b0296049edd0a916c1e50e3d342c9b0486ba358a46a3cf');
    admin = admin.connect(provider);
    const turboFil: TurboFil = networks.development.TurboFil.contract.connect(admin);
    const ctx: context = {logger, turboFil, provider, admin, nonce: await admin.getTransactionCount('pending')};
    console.log('TurboFil:', networks.development.TurboFil.contract.address);
    // const tx = await turboFil.submitSeed(genRandomAfid());
    // const receipt = await tx.wait(1);
    // console.log(receipt);
    // const event = networks.development.Sector.factory.interface.parseLog(receipt.logs[0]);
    // console.log(event);

    // const tx = await turboFil.submitSector('0xd8444321ba7f99883a20ff2157A4e419F92E6fc5', genRandomAfid(), {value: 90, nonce: ctx.nonce});
    // const receipt = await tx.wait(1);
    // console.log(receipt);
    submitSectorLoop(ctx);
    submitSeedLoop(ctx);
}

if (require.main === module) {
    main().catch(console.error);
}
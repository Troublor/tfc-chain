import {HardhatUserConfig} from 'hardhat/config';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import './tasks';
import env from './env';

module.exports = {
    solidity: {
        version: '0.8.3',
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000,
            },
            evmVersion: 'petersburg',
        },
    },
    paths: {
        artifacts: 'artifacts',
    },
    typechain: {
        outDir: 'typechain',
        target: 'ethers-v5',
        runOnCompile: true,
    },
    networks: {
        development: {
            url: env.endpoint,
            chainId: 9500,
            accounts: env.accountPrivateKey,
        },
    },
} as HardhatUserConfig;

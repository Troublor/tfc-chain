import {HardhatUserConfig} from 'hardhat/config';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import './tasks';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import path from 'path';

const env = yaml.load(fs.readFileSync(path.join(__dirname, 'env.yml'), {encoding: 'utf-8'})) as {
    deployerPrivateKey: string,
};

module.exports = {
    solidity: {
        version: '0.8.3',
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000,
            },
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
        hardhat: {},
        development: {
            url: 'http://localhost:8545',
            chainId: 9500,
            from: 'd8444321ba7f99883a20ff2157a4e419f92e6fc5',
            accounts: [
                env.deployerPrivateKey,
            ],
        },
    },
} as HardhatUserConfig;

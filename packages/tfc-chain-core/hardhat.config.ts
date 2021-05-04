import {HardhatUserConfig} from 'hardhat/config';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import './tasks';
import * as yaml from 'js-yaml';
import * as fs from 'fs';
import path from 'path';

const envFile = path.join(__dirname, 'env.yml');
let env: {
    endpoint: string,
    accountPrivateKey: string[],
};
if (fs.existsSync(envFile)) {
    env = yaml.load(fs.readFileSync(envFile, {encoding: 'utf-8'})) as {
        endpoint: string,
        accountPrivateKey: string[],
    };
}else {
    env = {
        endpoint: 'http://localhost:8545',
        accountPrivateKey: [],
    };
}



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
        development: {
            url: env.endpoint,
            chainId: 9500,
            accounts: env.accountPrivateKey,
        },
    },
} as HardhatUserConfig;

import {task, HardhatUserConfig} from 'hardhat/config';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-jest-plugin';

task('accounts', 'Prints the list of accounts', async (args, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(await account.address);
    }
});

module.exports = {
    solidity: '0.8.2',
} as HardhatUserConfig;

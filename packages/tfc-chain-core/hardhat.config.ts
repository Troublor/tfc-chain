import {task, HardhatUserConfig} from 'hardhat/config';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';

task('accounts', 'Prints the list of accounts', async (args, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        console.log(await account.address);
    }
});

module.exports = {
    solidity: '0.8.3',
} as HardhatUserConfig;

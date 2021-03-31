import {networks} from '@tfc-chain/core';

describe('core module', () => {
    test('should export networks', () => {
        console.log(networks.development.TurboFil.contract.address);
    });
});
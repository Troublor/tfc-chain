import * as ethers from 'ethers';

import deployment = require('../deployment.json');
import turboFilArtifact = require('../artifacts/contracts/TurboFil.sol/TurboFil.json');
import sectorArtifact = require('../artifacts/contracts/Sector.sol/Sector.json');
import {
    Sector__factory,
    TurboFil,
    TurboFil__factory,
} from '../typechain';

export interface Contracts {
    TurboFil: {
        artifact: typeof turboFilArtifact,
        factory: TurboFil__factory,
        contract: TurboFil,
    },
    Sector: {
        artifact: typeof sectorArtifact,
        factory: Sector__factory,
    },
}

type networks = keyof typeof deployment;

type Networks = {
    [n in networks]: Contracts
}

function buildNetworks(): Networks {
    const networks = {};
    for (const network of Object.keys(deployment)) {
        (networks as Networks)[network as networks] = {
            TurboFil: {
                artifact: turboFilArtifact,
                factory: new ethers.ContractFactory(turboFilArtifact.abi, turboFilArtifact.bytecode) as TurboFil__factory,
                contract: new ethers.Contract(deployment[network as networks].TurboFil, turboFilArtifact.abi) as TurboFil,
            },
            Sector: {
                artifact: sectorArtifact,
                factory: new ethers.ContractFactory(sectorArtifact.abi, sectorArtifact.bytecode) as Sector__factory,
            },
        };
    }

    return networks as Networks;
}

export const networks: Networks = buildNetworks();


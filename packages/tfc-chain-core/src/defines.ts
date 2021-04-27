import * as ethers from 'ethers';

import deployment = require('../deployment.json');
import turboFilArtifact = require('../artifacts/contracts/TurboFil.sol/TurboFil.json');
import sectorArtifact = require('../artifacts/contracts/Sector.sol/Sector.json');
import verificationArtifact = require('../artifacts/contracts/Verification.sol/Verification.json');
import {
    Sector__factory,
    TurboFil,
    TurboFil__factory, Verification__factory,
} from '../typechain';

export interface Skeletons {
    TurboFil: {
        artifact: typeof turboFilArtifact,
        factory: TurboFil__factory,
    },
    Sector: {
        artifact: typeof sectorArtifact,
        factory: Sector__factory,
    },
    Verification: {
        artifact: typeof verificationArtifact,
        factory: Verification__factory,
    }
}

export interface Deployment {
    TurboFil: TurboFil
}

type networks = keyof typeof deployment;

type NetworkDeployments = {
    [n in networks]: Deployment
}

export const skeletons: Skeletons = {
    TurboFil: {
        artifact: turboFilArtifact,
        factory: new ethers.ContractFactory(turboFilArtifact.abi, turboFilArtifact.bytecode) as TurboFil__factory,
    },
    Sector: {
        artifact: sectorArtifact,
        factory: new ethers.ContractFactory(sectorArtifact.abi, sectorArtifact.bytecode) as Sector__factory,
    },
    Verification: {
        artifact: verificationArtifact,
        factory: new ethers.ContractFactory(verificationArtifact.abi, verificationArtifact.bytecode) as Verification__factory,
    },
};

function buildNetworks(): NetworkDeployments {
    const networks = {};
    for (const network of Object.keys(deployment)) {
        (networks as NetworkDeployments)[network as networks] = {
            TurboFil: new ethers.Contract(deployment[network as networks].TurboFil, turboFilArtifact.abi) as TurboFil,
        };
    }

    return networks as NetworkDeployments;
}

export const deployments: NetworkDeployments = buildNetworks();


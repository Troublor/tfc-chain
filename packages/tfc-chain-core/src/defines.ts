import * as ethers from 'ethers';

import deployment = require('../deployment.json');
import turboFilArtifact = require('../artifacts/contracts/TurboFil.sol/TurboFil.json');
import tfcShareArtifact = require('../artifacts/contracts/TFCShare.sol/TFCShare.json');
import rnodeArtifact = require('../artifacts/contracts/RNode.sol/RNode.json');
import sectorArtifact = require('../artifacts/contracts/Sector.sol/Sector.json');
import seedArtifact = require('../artifacts/contracts/Seed.sol/Seed.json');
import {
    RNode__factory,
    Sector__factory, Seed__factory, TFCShare,
    TFCShare__factory,
    TurboFil,
    TurboFil__factory,
} from './typechain';

interface Contracts {
    TurboFil: {
        artifact: typeof turboFilArtifact,
        factory: TurboFil__factory,
        contract: TurboFil,
    },
    TFCShare: {
        artifact: typeof tfcShareArtifact,
        factory: TFCShare__factory,
        sectorSubmissionShare: TFCShare,
        sectorVerificationShare: TFCShare,
        seedSubmissionShare: TFCShare,
        seedEvaluationShare: TFCShare,
    },
    RNode: {
        artifact: typeof rnodeArtifact,
        factory: RNode__factory,
    },
    Sector: {
        artifact: typeof sectorArtifact,
        factory: Sector__factory,
    },
    Seed: {
        artifact: typeof seedArtifact,
        factory: Seed__factory,
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
            TFCShare: {
                artifact: tfcShareArtifact,
                factory: new ethers.ContractFactory(tfcShareArtifact.abi, tfcShareArtifact.bytecode) as TFCShare__factory,
                sectorSubmissionShare: new ethers.Contract(deployment[network as networks].SectorSubmissionShare, tfcShareArtifact.abi) as TFCShare,
                sectorVerificationShare: new ethers.Contract(deployment[network as networks].SectorVerificationShare, tfcShareArtifact.abi) as TFCShare,
                seedSubmissionShare: new ethers.Contract(deployment[network as networks].SeedSubmissionShare, tfcShareArtifact.abi) as TFCShare,
                seedEvaluationShare: new ethers.Contract(deployment[network as networks].SeedEvaluationShare, tfcShareArtifact.abi) as TFCShare,
            },
            RNode: {
                artifact: rnodeArtifact,
                factory: new ethers.ContractFactory(rnodeArtifact.abi, rnodeArtifact.bytecode) as RNode__factory,
            },
            Sector: {
                artifact: sectorArtifact,
                factory: new ethers.ContractFactory(sectorArtifact.abi, sectorArtifact.bytecode) as Sector__factory,
            },
            Seed: {
                artifact: seedArtifact,
                factory: new ethers.ContractFactory(seedArtifact.abi, seedArtifact.bytecode) as Seed__factory,
            },
        };
    }

    return networks as Networks;
}

export const networks: Networks = buildNetworks();


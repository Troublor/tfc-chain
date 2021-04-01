import deployment = require('../deployment.json');
import turboFilArtifact = require('../artifacts/contracts/TurboFil.sol/TurboFil.json');
import tfcShareArtifact = require('../artifacts/contracts/TFCShare.sol/TFCShare.json');
import rnodeArtifact = require('../artifacts/contracts/RNode.sol/RNode.json');
import sectorArtifact = require('../artifacts/contracts/Sector.sol/Sector.json');
import seedArtifact = require('../artifacts/contracts/Seed.sol/Seed.json');
import { RNode__factory, Sector__factory, Seed__factory, TFCShare, TFCShare__factory, TurboFil, TurboFil__factory } from './typechain';
interface Contracts {
    TurboFil: {
        artifact: typeof turboFilArtifact;
        factory: TurboFil__factory;
        contract: TurboFil;
    };
    TFCShare: {
        artifact: typeof tfcShareArtifact;
        factory: TFCShare__factory;
        sectorSubmissionShare: TFCShare;
        sectorVerificationShare: TFCShare;
        seedSubmissionShare: TFCShare;
        seedEvaluationShare: TFCShare;
    };
    RNode: {
        artifact: typeof rnodeArtifact;
        factory: RNode__factory;
    };
    Sector: {
        artifact: typeof sectorArtifact;
        factory: Sector__factory;
    };
    Seed: {
        artifact: typeof seedArtifact;
        factory: Seed__factory;
    };
}
declare type networks = keyof typeof deployment;
declare type Networks = {
    [n in networks]: Contracts;
};
export declare const networks: Networks;
export {};

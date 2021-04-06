"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deploy = exports.deployTurboFil = exports.deployTFCShare = void 0;
const defines_1 = require("../defines");
async function deployTFCShare(group, turboFil, signer) {
    const tfcShare = await defines_1.networks.mock.TFCShare.factory.connect(signer).deploy(group, turboFil);
    await tfcShare.deployed();
    return tfcShare;
}
exports.deployTFCShare = deployTFCShare;
async function deployTurboFil(signer) {
    const turboFil = await defines_1.networks.mock.TurboFil.factory.connect(signer).deploy();
    await turboFil.deployed();
    return turboFil;
}
exports.deployTurboFil = deployTurboFil;
async function deploy(signer) {
    const turboFil = await deployTurboFil(signer);
    const sectorSubmissionShare = await deployTFCShare('SectorSubmission', turboFil.address, signer);
    const sectorVerificationShare = await deployTFCShare('SectorVerification', turboFil.address, signer);
    const seedSubmissionShare = await deployTFCShare('SeedSubmission', turboFil.address, signer);
    const seedEvaluationShare = await deployTFCShare('SeedEvaluation', turboFil.address, signer);
    const tx = await turboFil.initialize(sectorSubmissionShare.address, sectorVerificationShare.address, seedSubmissionShare.address, seedEvaluationShare.address);
    await tx.wait(1);
    return {
        turboFil,
        sectorSubmissionShare,
        sectorVerificationShare,
        seedSubmissionShare,
        seedEvaluationShare,
    };
}
exports.deploy = deploy;
//# sourceMappingURL=deploy.js.map
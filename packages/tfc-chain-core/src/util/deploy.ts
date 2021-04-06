import {TFCShare, TurboFil} from '../typechain';
import {networks} from '../defines';
import {Signer} from 'ethers';

export async function deployTFCShare(group: string, turboFil: string, signer: Signer): Promise<TFCShare> {
    const tfcShare = await networks.mock.TFCShare.factory.connect(signer).deploy(group, turboFil);
    await tfcShare.deployed();
    return tfcShare;
}

export async function deployTurboFil(signer: Signer): Promise<TurboFil> {
    const turboFil = await networks.mock.TurboFil.factory.connect(signer).deploy();
    await turboFil.deployed();
    return turboFil;
}

export async function deploy(signer: Signer): Promise<{
    turboFil: TurboFil,
    sectorSubmissionShare: TFCShare,
    sectorVerificationShare: TFCShare,
    seedSubmissionShare: TFCShare,
    seedEvaluationShare: TFCShare,
}> {
    const turboFil = await deployTurboFil(signer);
    const sectorSubmissionShare = await deployTFCShare('SectorSubmission', turboFil.address, signer);
    const sectorVerificationShare = await deployTFCShare('SectorVerification', turboFil.address, signer);
    const seedSubmissionShare = await deployTFCShare('SeedSubmission', turboFil.address, signer);
    const seedEvaluationShare = await deployTFCShare('SeedEvaluation', turboFil.address, signer);
    const tx = await turboFil.initialize(
        sectorSubmissionShare.address,
        sectorVerificationShare.address,
        seedSubmissionShare.address,
        seedEvaluationShare.address,
    );
    await tx.wait(1);
    return {
        turboFil,
        sectorSubmissionShare,
        sectorVerificationShare,
        seedSubmissionShare,
        seedEvaluationShare,
    };
}


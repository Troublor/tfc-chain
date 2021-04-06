import { TFCShare, TurboFil } from '../typechain';
import { Signer } from 'ethers';
export declare function deployTFCShare(group: string, turboFil: string, signer: Signer): Promise<TFCShare>;
export declare function deployTurboFil(signer: Signer): Promise<TurboFil>;
export declare function deploy(signer: Signer): Promise<{
    turboFil: TurboFil;
    sectorSubmissionShare: TFCShare;
    sectorVerificationShare: TFCShare;
    seedSubmissionShare: TFCShare;
    seedEvaluationShare: TFCShare;
}>;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.networks = void 0;
const ethers = __importStar(require("ethers"));
const deployment = require("../deployment.json");
const turboFilArtifact = require("../artifacts/contracts/TurboFil.sol/TurboFil.json");
const tfcShareArtifact = require("../artifacts/contracts/TFCShare.sol/TFCShare.json");
const rnodeArtifact = require("../artifacts/contracts/RNode.sol/RNode.json");
const sectorArtifact = require("../artifacts/contracts/Sector.sol/Sector.json");
const seedArtifact = require("../artifacts/contracts/Seed.sol/Seed.json");
function buildNetworks() {
    const networks = {};
    for (const network of Object.keys(deployment)) {
        networks[network] = {
            TurboFil: {
                artifact: turboFilArtifact,
                factory: new ethers.ContractFactory(turboFilArtifact.abi, turboFilArtifact.bytecode),
                contract: new ethers.Contract(deployment[network].TurboFil, turboFilArtifact.abi),
            },
            TFCShare: {
                artifact: tfcShareArtifact,
                factory: new ethers.ContractFactory(tfcShareArtifact.abi, tfcShareArtifact.bytecode),
            },
            RNode: {
                artifact: rnodeArtifact,
                factory: new ethers.ContractFactory(rnodeArtifact.abi, rnodeArtifact.bytecode),
            },
            Sector: {
                artifact: sectorArtifact,
                factory: new ethers.ContractFactory(sectorArtifact.abi, sectorArtifact.bytecode),
            },
            Seed: {
                artifact: seedArtifact,
                factory: new ethers.ContractFactory(seedArtifact.abi, seedArtifact.bytecode),
            },
        };
    }
    return networks;
}
exports.networks = buildNetworks();
//# sourceMappingURL=defines.js.map
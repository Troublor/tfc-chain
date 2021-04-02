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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockEnvironment = void 0;
const ganache_core_1 = __importDefault(require("ganache-core"));
const ethers = __importStar(require("ethers"));
const defines_1 = require("../defines");
class MockEnvironment {
    constructor() {
        // This is default Ganache mnemonic, and it should not be used in production environment
        this.mnemonic = 'myth like bonus scare over problem client lizard pioneer submit female collect';
        this.provider = new ethers.providers.Web3Provider(ganache_core_1.default.provider({
            'mnemonic': this.mnemonic,
        }));
        this._ready = false;
    }
    get signers() {
        const signers = [];
        for (let i = 0; i < 10; i++) {
            const wallet = ethers.Wallet.fromMnemonic(this.mnemonic, `m/44'/60'/0'/0/${i}`).connect(this.provider);
            signers.push(wallet);
        }
        return signers;
    }
    get ready() {
        return this._ready;
    }
    get contracts() {
        if (!this.ready) {
            throw new Error('The mock environment is not yet set up. Please call setup() and await it');
        }
        return defines_1.networks.mock;
    }
    async setup() {
        const deployer = this.signers[0];
        const turboFil = await defines_1.networks.mock.TurboFil.factory.connect(deployer).deploy();
        await turboFil.deployed();
        // console.log(`Deployed TurboFil at ${turboFil.address}`);
        const sectorSubmissionShare = await defines_1.networks.mock.TFCShare.factory.connect(deployer).deploy('SectorSubmission', turboFil.address);
        await sectorSubmissionShare.deployed();
        // console.log(`Deployed SectorSubmissionShare at ${sectorSubmissionShare.address}`);
        const sectorVerificationShare = await defines_1.networks.mock.TFCShare.factory.connect(deployer).deploy('SectorVerification', turboFil.address);
        await sectorVerificationShare.deployed();
        // console.log(`Deployed SectorVerificationShare at ${sectorVerificationShare.address}`);
        const seedSubmissionShare = await defines_1.networks.mock.TFCShare.factory.connect(deployer).deploy('SeedSubmission', turboFil.address);
        await seedSubmissionShare.deployed();
        // console.log(`Deployed SeedSubmissionShare at ${seedSubmissionShare.address}`);
        const seedEvaluationShare = await defines_1.networks.mock.TFCShare.factory.connect(deployer).deploy('SeedEvaluation', turboFil.address);
        await seedEvaluationShare.deployed();
        // console.log(`Deployed SeedEvaluationShare at ${seedEvaluationShare.address}`);
        let tx = await turboFil.initialize(sectorSubmissionShare.address, sectorVerificationShare.address, seedSubmissionShare.address, seedEvaluationShare.address);
        await tx.wait(1);
        // console.log('Initialized TurboFil');
        let role = await turboFil['REGISTER_ROLE()']();
        tx = await turboFil.grantRole(role, deployer.address);
        await tx.wait(1);
        // console.log('Granted REGISTER_ROLE to deployer');
        role = await turboFil['REWARD_ROLE()']();
        tx = await turboFil.grantRole(role, deployer.address);
        await tx.wait(1);
        // console.log('Granted REWARD_ROLE to deployer');
        role = await turboFil['SEED_ROLE()']();
        tx = await turboFil.grantRole(role, deployer.address);
        await tx.wait(1);
        // console.log('Granted SEED_ROLE to deployer');
        role = await turboFil['SUBMIT_ROLE()']();
        tx = await turboFil.grantRole(role, deployer.address);
        await tx.wait(1);
        // console.log('Granted SUBMIT_ROLE to deployer');
        role = await turboFil['VERIFY_ROLE()']();
        tx = await turboFil.grantRole(role, deployer.address);
        await tx.wait(1);
        // console.log('Granted VERIFY_ROLE to deployer');
        // console.log('Deploy finished');
        const [admin] = this.signers;
        defines_1.networks.mock.TurboFil.factory.connect(admin);
        defines_1.networks.mock.TurboFil.contract.connect(admin);
        defines_1.networks.mock.TFCShare.factory.connect(admin);
        defines_1.networks.mock.TFCShare.sectorSubmissionShare.connect(admin);
        defines_1.networks.mock.TFCShare.sectorVerificationShare.connect(admin);
        defines_1.networks.mock.TFCShare.seedSubmissionShare.connect(admin);
        defines_1.networks.mock.TFCShare.seedEvaluationShare.connect(admin);
        defines_1.networks.mock.RNode.factory.connect(admin);
        defines_1.networks.mock.Sector.factory.connect(admin);
        defines_1.networks.mock.Seed.factory.connect(admin);
        this._ready = true;
        return this;
    }
}
exports.MockEnvironment = MockEnvironment;
//# sourceMappingURL=mock.js.map
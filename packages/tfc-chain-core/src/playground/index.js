"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listenRNodeForReceivingTFC = exports.getSeedEvaluationEventsEmittedInHistory = exports.listenToSeedSubmissionEvent = exports.registerRNode = void 0;
const mock_1 = require("./mock");
const defines_1 = require("../defines");
const assert_1 = __importDefault(require("assert"));
const ethers_1 = require("ethers");
const mockEnv = undefined;
async function setupMockEnvironment() {
    if (mockEnv) {
        return mockEnv;
    }
    return await new mock_1.MockEnvironment().setup();
}
async function registerRNode() {
    const mock = await setupMockEnvironment();
    const [admin, user1] = mock.signers;
    const afid = 'afid';
    // connect TurboFil contract instance to admin signer (use admin as transaction signer) to call registerRNode function
    const tx = await defines_1.networks.mock.TurboFil.contract.connect(admin).registerRNode(user1.address, afid);
    // The transaction is not yet executed, we wait for 1 block confirmation to avoid the impact of chain reorganization
    const receipt = await tx.wait(1); // NOTE: on Mock Environment, you can only wait for 1 confirmation, no more, otherwise it will stuck here.
    // check events emitted in the receipt
    assert_1.default(receipt.events !== undefined);
    for (const event of receipt.events) {
        console.log(`event name: ${event.event}`);
        console.log(`event args: ${event.args}`);
    }
}
exports.registerRNode = registerRNode;
async function listenToSeedSubmissionEvent() {
    const mock = await setupMockEnvironment();
    const [admin, user1] = mock.signers;
    // listen to SubmitSeed event
    // The filter is used to filter the events emitted by transactions.
    // Here we give all arguments null, meaning we want to get all SubmitSeed event regardless of arguments
    const eventFilter = defines_1.networks.mock.TurboFil.contract.filters.SubmitSeed(null, null, null);
    defines_1.networks.mock.TurboFil.contract.connect(admin).on(eventFilter, (submitter, seed, afid) => {
        console.log(`Seed(${seed}) with afid=${afid} is submitted by ${submitter}`);
    });
    const afid = 'afid';
    // submit a seed. The submitSeed function must be called by admin signer and specify the seed submitter address in the argument
    await defines_1.networks.mock.TurboFil.contract.connect(admin).submitSeed(user1.address, afid);
    // we don't explicit wait for transaction execution here, and our previous event listener should be able to catch the event.
}
exports.listenToSeedSubmissionEvent = listenToSeedSubmissionEvent;
async function getSeedEvaluationEventsEmittedInHistory() {
    const mock = await setupMockEnvironment();
    const [admin, user1] = mock.signers;
    // submit a seed.
    const afid = 'afid';
    let tx = await defines_1.networks.mock.TurboFil.contract.connect(admin).submitSeed(user1.address, afid);
    await tx.wait(1);
    // get all events submitted in history (SubmitSeed event)
    let filter = {
        address: defines_1.networks.mock.TurboFil.contract.address,
        topics: [
            defines_1.networks.mock.TurboFil.factory.interface.getEventTopic('SubmitSeed'),
        ],
    };
    const submitSeedEvents = (await mock.provider.getLogs(filter)).map(log => defines_1.networks.mock.TurboFil.factory.interface.parseLog(log));
    for (const event of submitSeedEvents) {
        console.log(`Found Seed ${event.args.seed}`);
    }
    // get the seed address of the first event
    const seedAddress = submitSeedEvents[0].args.seed;
    // construct a seed contract instance
    const seed = defines_1.networks.mock.Seed.factory.attach(seedAddress);
    // evaluate the seed (thumb up/down), use user1 to send the transaction
    tx = await seed.connect(user1).evaluate(user1.address, true);
    await tx.wait(1);
    // get all EvaluateSeed events in history
    filter = {
        address: undefined,
        topics: [
            defines_1.networks.mock.Seed.factory.interface.getEventTopic('EvaluateSeed'),
        ],
    };
    const evaluateSeedLogs = await mock.provider.getLogs(filter);
    for (const log of evaluateSeedLogs) {
        // we only get the low-level log before, so we need to parse the log to get the high-level event.
        const description = defines_1.networks.mock.Seed.factory.interface.parseLog(log);
        const s = description.args.like ? 'thumb up' : 'thumb down';
        console.log(`User ${description.args.evaluator} gives a ${s} to Seed ${log.address}`);
    }
}
exports.getSeedEvaluationEventsEmittedInHistory = getSeedEvaluationEventsEmittedInHistory;
async function listenRNodeForReceivingTFC() {
    const mock = await setupMockEnvironment();
    const [admin, rnodeOwner, otherUser] = mock.signers;
    // register a RNode
    const tx = await defines_1.networks.mock.TurboFil.contract.connect(admin).registerRNode(rnodeOwner.address, 'afid');
    const receipt = await tx.wait(1);
    const registerEvent = receipt.events?.find(ev => ev.event === 'RegisterRNode');
    if (!registerEvent) {
        throw new Error('This shouldn\'t happen, a successful transaction must emit RegisterRNode event.');
    }
    // Get RNode contract instance with its address
    const rnodeAddress = registerEvent.args?.rnode;
    const rnode = defines_1.networks.mock.RNode.factory.attach(rnodeAddress);
    // listen to ReceiveTFC event on RNode contract
    const filter = rnode.filters.ReceiveTFC(null, null);
    rnode.connect(rnodeOwner).on(filter, (from, value) => {
        console.log(`Receive ${ethers_1.ethers.utils.formatEther(value)} TFC from ${from}`);
    });
    // someone else send TFC to the rnode
    await otherUser.sendTransaction({
        to: rnodeAddress,
        value: ethers_1.ethers.utils.parseEther('1'),
    });
    // The previous listener should got the transferred TFC
}
exports.listenRNodeForReceivingTFC = listenRNodeForReceivingTFC;
__exportStar(require("./mock"), exports);
//# sourceMappingURL=index.js.map
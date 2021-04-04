import {MockEnvironment} from './mock';
import {networks} from '../defines';
import assert from 'assert';
import {ethers, EventFilter} from 'ethers';

const mockEnv: MockEnvironment | undefined = undefined;

async function setupMockEnvironment(): Promise<MockEnvironment> {
    if (mockEnv) {
        return mockEnv;
    }
    return await new MockEnvironment().setup();
}

export async function registerRNode(): Promise<void> {
    const mock = await setupMockEnvironment();
    const [admin, user1] = mock.signers;
    const afid = 'afid';
    // connect TurboFil contract instance to admin signer (use admin as transaction signer) to call registerRNode function
    const tx = await networks.mock.TurboFil.contract.connect(admin).registerRNode(user1.address, afid);
    // The transaction is not yet executed, we wait for 1 block confirmation to avoid the impact of chain reorganization
    const receipt = await tx.wait(1); // NOTE: on Mock Environment, you can only wait for 1 confirmation, no more, otherwise it will stuck here.

    // check events emitted in the receipt
    assert(receipt.events !== undefined);
    for (const event of receipt.events) {
        console.log(`event name: ${event.event}`);
        console.log(`event args: ${event.args}`);
    }
}

export async function listenToSeedSubmissionEvent(): Promise<void> {
    const mock = await setupMockEnvironment();
    const [admin, user1] = mock.signers;

    // listen to SubmitSeed event
    // The filter is used to filter the events emitted by transactions.
    // Here we give all arguments null, meaning we want to get all SubmitSeed event regardless of arguments
    const eventFilter = networks.mock.TurboFil.contract.filters.SubmitSeed(null, null, null);
    networks.mock.TurboFil.contract.connect(admin).on(eventFilter, (submitter, seed, afid) => {
        console.log(`Seed(${seed}) with afid=${afid} is submitted by ${submitter}`);
    });

    const afid = 'afid';
    // submit a seed. The submitSeed function must be called by admin signer and specify the seed submitter address in the argument
    await networks.mock.TurboFil.contract.connect(admin).submitSeed(user1.address, afid);
    // we don't explicit wait for transaction execution here, and our previous event listener should be able to catch the event.
}


export async function getSeedEvaluationEventsEmittedInHistory(): Promise<void> {
    const mock = await setupMockEnvironment();
    const [admin, user1] = mock.signers;

    // submit a seed.
    const afid = 'afid';
    let tx = await networks.mock.TurboFil.contract.connect(admin).submitSeed(user1.address, afid);
    await tx.wait(1);

    // get all events submitted in history (SubmitSeed event)
    let filter: EventFilter = {
        address: networks.mock.TurboFil.contract.address, // only allow events emitted from TurboFil contract
        topics: [
            networks.mock.TurboFil.factory.interface.getEventTopic('SubmitSeed'),
        ],
    };
    const submitSeedEvents = (await mock.provider.getLogs(filter)).map(log => networks.mock.TurboFil.factory.interface.parseLog(log));
    for (const event of submitSeedEvents) {
        console.log(`Found Seed ${event.args.seed}`);
    }

    // get the seed address of the first event
    const seedAddress = submitSeedEvents[0].args.seed;
    // construct a seed contract instance
    const seed = networks.mock.Seed.factory.attach(seedAddress);
    // evaluate the seed (thumb up/down), use user1 to send the transaction
    tx = await seed.connect(user1).evaluate(user1.address, true);
    await tx.wait(1);

    // get all EvaluateSeed events in history
    filter = {
        address: undefined, // allow events emitted from any contract
        topics: [
            networks.mock.Seed.factory.interface.getEventTopic('EvaluateSeed'),
        ],
    };
    const evaluateSeedLogs = await mock.provider.getLogs(filter);
    for (const log of evaluateSeedLogs) {
        // we only get the low-level log before, so we need to parse the log to get the high-level event.
        const description = networks.mock.Seed.factory.interface.parseLog(log);
        const s = description.args.like ? 'thumb up' : 'thumb down';
        console.log(`User ${description.args.evaluator} gives a ${s} to Seed ${log.address}`);
    }
}

export async function listenRNodeForReceivingTFC(): Promise<void> {
    const mock = await setupMockEnvironment();
    const [admin, rnodeOwner, otherUser] = mock.signers;

    // register a RNode
    const tx = await networks.mock.TurboFil.contract.connect(admin).registerRNode(rnodeOwner.address, 'afid');
    const receipt = await tx.wait(1);
    const registerEvent = receipt.events?.find(ev => ev.event === 'RegisterRNode');
    if (!registerEvent) {
        throw new Error('This shouldn\'t happen, a successful transaction must emit RegisterRNode event.');
    }
    // Get RNode contract instance with its address
    const rnodeAddress = registerEvent.args?.rnode;
    const rnode = networks.mock.RNode.factory.attach(rnodeAddress);

    // listen to ReceiveTFC event on RNode contract
    const filter = rnode.filters.ReceiveTFC(null, null);
    rnode.connect(rnodeOwner).on(filter, (from, value)=>{
        console.log(`Receive ${ethers.utils.formatEther(value)} TFC from ${from}`);
    });

    // someone else send TFC to the rnode
    await otherUser.sendTransaction({
        to: rnodeAddress,
        value: ethers.utils.parseEther('1'),
    });
    // The previous listener should got the transferred TFC
}

export * from './mock';
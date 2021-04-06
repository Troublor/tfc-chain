"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TFCShare__factory = void 0;
const ethers_1 = require("ethers");
class TFCShare__factory extends ethers_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(_group, turboFil_, overrides) {
        return super.deploy(_group, turboFil_, overrides || {});
    }
    getDeployTransaction(_group, turboFil_, overrides) {
        return super.getDeployTransaction(_group, turboFil_, overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.TFCShare__factory = TFCShare__factory;
const _abi = [
    {
        inputs: [
            {
                internalType: "string",
                name: "_group",
                type: "string",
            },
            {
                internalType: "address",
                name: "turboFil_",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "recipient",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
            },
        ],
        name: "Reward",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "previousAdminRole",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "bytes32",
                name: "newAdminRole",
                type: "bytes32",
            },
        ],
        name: "RoleAdminChanged",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "RoleGranted",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address",
            },
        ],
        name: "RoleRevoked",
        type: "event",
    },
    {
        inputs: [],
        name: "DEFAULT_ADMIN_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "MINTER_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "PAYER_ROLE",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "releaseTime_",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "comment_",
                type: "string",
            },
        ],
        name: "distributeTFC",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
        ],
        name: "getRoleAdmin",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "grantRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "group",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "hasRole",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "recipient",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "renounceRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "role",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "revokeRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "shares",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x60806040523480156200001157600080fd5b50604051620014763803806200147683398101604081905262000034916200022a565b62000041600082620000b7565b81516200005690600190602085019062000167565b50620000837f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a682620000b7565b620000af7f8ec07e268e32cae7f300b49ad34f20106d088445cb9d9b2d62cbd864638308b282620000b7565b505062000368565b620000c38282620000c7565b5050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff16620000c3576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055620001233390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b828054620001759062000315565b90600052602060002090601f016020900481019282620001995760008555620001e4565b82601f10620001b457805160ff1916838001178555620001e4565b82800160010185558215620001e4579182015b82811115620001e4578251825591602001919060010190620001c7565b50620001f2929150620001f6565b5090565b5b80821115620001f25760008155600101620001f7565b80516001600160a01b03811681146200022557600080fd5b919050565b600080604083850312156200023d578182fd5b82516001600160401b038082111562000254578384fd5b818501915085601f83011262000268578384fd5b8151818111156200027d576200027d62000352565b604051601f8201601f19908116603f01168101908382118183101715620002a857620002a862000352565b81604052828152602093508884848701011115620002c4578687fd5b8691505b82821015620002e75784820184015181830185015290830190620002c8565b82821115620002f857868484830101525b95506200030a9150508582016200020d565b925050509250929050565b600181811c908216806200032a57607f821691505b602082108114156200034c57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b6110fe80620003786000396000f3fe6080604052600436106100dd5760003560e01c806377f050b01161007f578063b95dac6e11610059578063b95dac6e14610258578063ce7c2ac21461026b578063d539139314610298578063d547741f146102cc576100dd565b806377f050b0146101ef57806391d1485414610223578063a217fddf14610243576100dd565b806329e7ef2d116100bb57806329e7ef2d1461016b5780632f2ff15d1461018d57806336568abe146101af57806340c10f19146101cf576100dd565b806301ffc9a7146100e257806318160ddd14610117578063248a9ca31461013b575b600080fd5b3480156100ee57600080fd5b506101026100fd366004610e7e565b6102ec565b60405190151581526020015b60405180910390f35b34801561012357600080fd5b5061012d60025481565b60405190815260200161010e565b34801561014757600080fd5b5061012d610156366004610e3b565b60009081526020819052604090206001015490565b34801561017757600080fd5b50610180610387565b60405161010e9190610fbf565b34801561019957600080fd5b506101ad6101a8366004610e53565b610415565b005b3480156101bb57600080fd5b506101ad6101ca366004610e53565b6104b7565b3480156101db57600080fd5b506101ad6101ea366004610e12565b61053f565b3480156101fb57600080fd5b5061012d7f8ec07e268e32cae7f300b49ad34f20106d088445cb9d9b2d62cbd864638308b281565b34801561022f57600080fd5b5061010261023e366004610e53565b6106d5565b34801561024f57600080fd5b5061012d600081565b6101ad610266366004610ebe565b610700565b34801561027757600080fd5b5061012d610286366004610df8565b60036020526000908152604090205481565b3480156102a457600080fd5b5061012d7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b3480156102d857600080fd5b506101ad6102e7366004610e53565b610a09565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167f7965db0b00000000000000000000000000000000000000000000000000000000148061037f57507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff000000000000000000000000000000000000000000000000000000008316145b90505b919050565b6001805461039490611061565b80601f01602080910402602001604051908101604052809291908181526020018280546103c090611061565b801561040d5780601f106103e25761010080835404028352916020019161040d565b820191906000526020600020905b8154815290600101906020018083116103f057829003601f168201915b505050505081565b600082815260208190526040902060010154610432905b3361023e565b6104a95760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e60448201527f2061646d696e20746f206772616e74000000000000000000000000000000000060648201526084015b60405180910390fd5b6104b38282610a96565b5050565b6001600160a01b03811633146105355760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201527f20726f6c657320666f722073656c66000000000000000000000000000000000060648201526084016104a0565b6104b38282610b1a565b6105697f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6336106d5565b6105db5760405162461bcd60e51b815260206004820152603060248201527f54464353686172653a2043616c6c657220646f6573206e6f742068617665207060448201527f726976696c65676520746f206d696e740000000000000000000000000000000060648201526084016104a0565b6001600160a01b0382166106575760405162461bcd60e51b815260206004820152602260248201527f54464353686172653a206d696e7420746f20746865207a65726f20616464726560448201527f737300000000000000000000000000000000000000000000000000000000000060648201526084016104a0565b80610661576104b3565b6001600160a01b03821660009081526003602052604090205461068b57610689600483610b7f565b505b6001600160a01b038216600090815260036020526040812080548392906106b3908490610ff3565b9250508190555080600260008282546106cc9190610ff3565b90915550505050565b6000828152602081815260408083206001600160a01b038516845290915290205460ff165b92915050565b61072a7f8ec07e268e32cae7f300b49ad34f20106d088445cb9d9b2d62cbd864638308b2336106d5565b61079c5760405162461bcd60e51b815260206004820152603a60248201527f54464353686172653a2043616c6c657220646f6573206e6f742068617665207060448201527f726976696c65676520746f20646973747269627574652054464300000000000060648201526084016104a0565b6000600254116107ee5760405162461bcd60e51b815260206004820152601360248201527f54464353686172653a204e6f20737570706c790000000000000000000000000060448201526064016104a0565b345b60006107fc6004610b9b565b11156109ff57600061080f600482610ba5565b6001600160a01b03811660009081526003602052604081205460025492935091610839858461102b565b610843919061100b565b9050823b801561092a576040517ff1215d2500000000000000000000000000000000000000000000000000000000815284906001600160a01b0382169063f1215d2590610896908b908b90600401610fd2565b600060405180830381600087803b1580156108b057600080fd5b505af19250505080156108c1575060015b610924576040516000906001600160a01b0387169085156108fc0290869084818181858888f1935050505090508061092257604051339085156108fc029086906000818181858888f19350505050158015610920573d6000803e3d6000fd5b505b505b50610989565b6040516000906001600160a01b0386169084156108fc0290859084818181858888f1935050505090508061098757604051339084156108fc029085906000818181858888f19350505050158015610985573d6000803e3d6000fd5b505b505b6001600160a01b0384166000908152600360205260408120556109ad600485610bb1565b50604080516001600160a01b038616815260208101849052428183015290517f02a6a2be713fedf52f113c0a759f1c1a23a113476d9b1b1a2a453c910660de4e9181900360600190a1505050506107f0565b5050600060025550565b600082815260208190526040902060010154610a249061042c565b6105355760405162461bcd60e51b815260206004820152603060248201527f416363657373436f6e74726f6c3a2073656e646572206d75737420626520616e60448201527f2061646d696e20746f207265766f6b650000000000000000000000000000000060648201526084016104a0565b610aa082826106d5565b6104b3576000828152602081815260408083206001600160a01b03851684529091529020805460ff19166001179055610ad63390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b610b2482826106d5565b156104b3576000828152602081815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b6000610b94836001600160a01b038416610bc6565b9392505050565b600061037f825490565b6000610b948383610c15565b6000610b94836001600160a01b038416610cc4565b6000818152600183016020526040812054610c0d575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556106fa565b5060006106fa565b81546000908210610c8e5760405162461bcd60e51b815260206004820152602260248201527f456e756d657261626c655365743a20696e646578206f7574206f6620626f756e60448201527f647300000000000000000000000000000000000000000000000000000000000060648201526084016104a0565b826000018281548110610cb157634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905092915050565b60008181526001830160205260408120548015610dd7576000610ce860018361104a565b8554909150600090610cfc9060019061104a565b90506000866000018281548110610d2357634e487b7160e01b600052603260045260246000fd5b9060005260206000200154905080876000018481548110610d5457634e487b7160e01b600052603260045260246000fd5b600091825260209091200155610d6b836001610ff3565b60008281526001890160205260409020558654879080610d9b57634e487b7160e01b600052603160045260246000fd5b600190038181906000526020600020016000905590558660010160008781526020019081526020016000206000905560019450505050506106fa565b60009150506106fa565b80356001600160a01b038116811461038257600080fd5b600060208284031215610e09578081fd5b610b9482610de1565b60008060408385031215610e24578081fd5b610e2d83610de1565b946020939093013593505050565b600060208284031215610e4c578081fd5b5035919050565b60008060408385031215610e65578182fd5b82359150610e7560208401610de1565b90509250929050565b600060208284031215610e8f578081fd5b81357fffffffff0000000000000000000000000000000000000000000000000000000081168114610b94578182fd5b60008060408385031215610ed0578182fd5b82359150602083013567ffffffffffffffff80821115610eee578283fd5b818501915085601f830112610f01578283fd5b813581811115610f1357610f136110b2565b604051601f8201601f19908116603f01168101908382118183101715610f3b57610f3b6110b2565b81604052828152886020848701011115610f53578586fd5b82602086016020830137856020848301015280955050505050509250929050565b60008151808452815b81811015610f9957602081850181015186830182015201610f7d565b81811115610faa5782602083870101525b50601f01601f19169290920160200192915050565b600060208252610b946020830184610f74565b600083825260406020830152610feb6040830184610f74565b949350505050565b600082198211156110065761100661109c565b500190565b60008261102657634e487b7160e01b81526012600452602481fd5b500490565b60008160001904831182151516156110455761104561109c565b500290565b60008282101561105c5761105c61109c565b500390565b600181811c9082168061107557607f821691505b6020821081141561109657634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052604160045260246000fdfea26469706673582212208a269fc04aee7a410926ba30814c365e14b4bfdc0fe5f32c25d3caa69b48465264736f6c63430008030033";
//# sourceMappingURL=TFCShare__factory.js.map
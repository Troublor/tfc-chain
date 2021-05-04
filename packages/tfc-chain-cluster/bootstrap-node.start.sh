#! /bin/bash

geth --datadir ~/blockchain/tfc-chain-bootstrap \
    --networkid 9500 \
    --port 30300 \
    --nat extip:**.**.**.** \
    --verbosity 3 \
    console
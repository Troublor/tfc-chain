#!/bin/bash

geth --datadir . \
    --networkid 9500 \
    --port 30303 \
    --bootnodes "enr:-J24QCKUBP18ZMXnCHX_sRA_SY6D_XUqfbU3ms8rXlT9BmYpTrkZ0fkW8vvQaqIy2G__yJcPwBgKnrQr9nUmmkVO9KQCg2V0aMfGhC1soHSAgmlkgnY0gmlwhI9ZNSeJc2VjcDI1NmsxoQIGFX-uQmqF_fz0a14_nLNlXFfRUJl0oaggVdkwfSEf2YRzbmFwwIN0Y3CCdlyDdWRwgnZc" \
    --syncmode full \
    --allow-insecure-unlock --unlock "0x4ba55198b7DD2dCbd7196002Ac9579583fF4E8f5" --password ./keystore/passwords.txt \
    --miner.etherbase "0x4ba55198b7DD2dCbd7196002Ac9579583fF4E8f5" \
    --miner.gasprice 0 \
    --miner.gaslimit 1000000000 \
    --miner.gastarget 1000000000 \
          --verbosity 3 \
    --http --http.addr 0.0.0.0 --http.corsdomain '*' --http.api admin,eth,web3,debug,net,miner,evm\
    --ws --ws.addr 0.0.0.0 --ws.origins '*' \
    --graphql \
    console
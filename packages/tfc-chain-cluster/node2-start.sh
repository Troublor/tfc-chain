#!/bin/bash

geth --datadir ~/blockchain/tfc-chain \
    --networkid 9500 \
    --bootnodes "enr:-J24QCKUBP18ZMXnCHX_sRA_SY6D_XUqfbU3ms8rXlT9BmYpTrkZ0fkW8vvQaqIy2G__yJcPwBgKnrQr9nUmmkVO9KQCg2V0aMfGhC1soHSAgmlkgnY0gmlwhI9ZNSeJc2VjcDI1NmsxoQIGFX-uQmqF_fz0a14_nLNlXFfRUJl0oaggVdkwfSEf2YRzbmFwwIN0Y3CCdlyDdWRwgnZc" \
    --unlock c7a9ba5c519f0145d2549dadaa5233161f8084ce --password ./keystore/passwords.txt \
    --verbosity 3 \
    --syncmode full \
    --miner.gasprice 0 \
    --miner.gastarget 1000000000 \
    --miner.gaslimit 1000000000 \
    --txpool.accountslots 1000000 \
    --txpool.accountqueue 1000000 \
    --txpool.globalqueue 10000000 \
    --txpool.lifetime 24h0m0s \
    console
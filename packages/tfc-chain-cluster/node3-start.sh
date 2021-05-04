#! /bin/bash

geth --datadir ~/blockchain/tfc-chain \
    --networkid 9500 \
    --bootnodes "enr:-J24QCKUBP18ZMXnCHX_sRA_SY6D_XUqfbU3ms8rXlT9BmYpTrkZ0fkW8vvQaqIy2G__yJcPwBgKnrQr9nUmmkVO9KQCg2V0aMfGhC1soHSAgmlkgnY0gmlwhI9ZNSeJc2VjcDI1NmsxoQIGFX-uQmqF_fz0a14_nLNlXFfRUJl0oaggVdkwfSEf2YRzbmFwwIN0Y3CCdlyDdWRwgnZc" \
    --unlock b710404abeff8215f61171924f90c6cbf47a6e88 --password ./keystore/passwords.txt \
    --verbosity 3 \
    --syncmode full \
    console
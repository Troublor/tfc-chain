# @tfc-chain/adapter

This adapter package is a sub-package of tfc-chain, which aims to hide complex logics of interactions with smart contracts, and provide high-level APIs.

## Main Features

- Maintain TurboFil contract: grant roles, set rewards, fund TFCs, etc. (with MAINTAIN_ROLE)
- Submit sector (with SECTOR_ROLE).
- Submit seed (with SEED_ROLE).
- Listen to sector verification tasks.
- Submit sector verification proof (by sector owner).
- Verify sector verification proof (with VERIFY_ROLE).
- Check TFC balance.

## Limitations

- @tfc-chain/adapter does not provide failure recovery feature, i.e., when bridge stops and restarts, it will miss the events emitted during downtime.

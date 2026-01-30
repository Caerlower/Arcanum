# Arcanum Swap — Leo Program (Wave 1)

Minimal Leo smart contract for **private token swaps**. Wave 1 only; no dark pool, batch, or oracle logic.

## What this program does

- **`Balance`** — Private record: `owner` (address) and `amount` (u64). One token type.
- **`mint`** — Test-only. Creates a Balance record for a receiver (for local testing/demos).
- **`private_swap`** — Consumes a user Balance, checks ownership and sufficient balance, outputs:
  - Updated user Balance (original amount minus swap amount).
  - Pool Balance record (mocked pool; owner = program, amount = swap amount).

The network verifies correctness and no value creation/destruction; it does **not** learn balances, amounts, or identity.

## Prerequisites

- [Leo](https://docs.leo-lang.org/getting_started/installation) installed (`leo --version`).
- For **deploy**: a testnet account. Copy `leo/.env.example` to `leo/.env`, set `NETWORK=testnet` and `PRIVATE_KEY=...` (get a key from [Aleo faucet](https://faucet.aleo.org/) or Leo wallet).

## Build

```bash
cd leo
leo build
```

## Deploy (testnet)

```bash
# Option A: inline
leo deploy --network testnet

# Option B: use .env (copy .env.example to .env, set NETWORK and PRIVATE_KEY)
leo deploy
```

## Run (local)

Set `.env` with `NETWORK=testnet` and `PRIVATE_KEY=...` (owner of the record you consume).

**Mint (test):**
```bash
leo run mint <receiver_address> <amount>u64
```

**Private swap:** (pass your Balance record as first argument)
```bash
leo run private_swap "<balance_record_json>" <swap_amount>u64
```

## Layout

- `program.json` — Leo project manifest.
- `src/main.leo` — Program source (Balance, mint, private_swap).

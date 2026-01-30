// Arcanum Protocol — Wave 1: Private Swaps
// Minimal Leo program for private token swaps.
// One token type. No dark pool, batch, or oracle logic.

program arcanum_swap.aleo {

    // -------------------------------------------------------------------------
    // Balance record: represents a user's (or pool's) private token balance.
    // All fields are private; the network verifies correctness without seeing values.
    // -------------------------------------------------------------------------
    record Balance {
        // Who owns this balance (required by Aleo records).
        owner: address,
        // Token amount in smallest units (single token type for Wave 1).
        amount: u64,
    }

    // -------------------------------------------------------------------------
    // mint — Test / dev only. Creates a new Balance record for a receiver.
    // Used for local testing and demos. Not for production liquidity.
    // -------------------------------------------------------------------------
    transition mint(receiver: address, amount: u64) -> Balance {
        return Balance {
            owner: receiver,
            amount: amount,
        };
    }

    // -------------------------------------------------------------------------
    // private_swap — Core Wave 1 transition.
    // User consumes part of their balance into a "pool" (mocked for Wave 1).
    // The network verifies: valid swap, rules followed, no negative balance,
    // no value created or destroyed. It does NOT learn amounts or identity.
    // -------------------------------------------------------------------------
    transition private_swap(user_balance: Balance, swap_amount: u64) -> (Balance, Balance) {
        // Only the record owner can spend it; signer must match.
        assert(user_balance.owner == self.caller);

        // Enforce sufficient balance (prevents underflow and invalid state).
        assert(user_balance.amount >= swap_amount);

        // Updated user balance: original minus the swap amount.
        let user_remaining: u64 = user_balance.amount - swap_amount;
        let user_new: Balance = Balance {
            owner: user_balance.owner,
            amount: user_remaining,
        };

        // Mocked pool: output a record representing the pool receiving this amount.
        // Owner is the program; in a full design this could be a pool record consumed/created.
        let pool_record: Balance = Balance {
            owner: self.address,
            amount: swap_amount,
        };

        return (user_new, pool_record);
    }
}

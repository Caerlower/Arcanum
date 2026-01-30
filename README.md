# Arcanum Protocol

**Private trading infrastructure on Aleo.**  
Prove everything. Reveal nothing.

Arcanum is a privacy-first DeFi protocol being built for the **Aleo Privacy Buildathon**. It explores how onchain trading can work **without leaking balances, order size, or execution intent**.

The long-term vision is a **dark pool–style trading protocol** on Aleo. Wave 1 focuses on the foundational primitive: **private swaps**.

---

## ✨ Why Arcanum?

Most blockchains expose everything:

* Who traded
* How much they traded
* When they traded
* At what price they were willing to trade

This creates:

* MEV and front-running
* Strategy leakage
* Poor execution for serious traders

**Arcanum flips this model.**

Instead of transparency by default, Arcanum uses **zero-knowledge proofs** to ensure:

* Trades are verifiably correct
* The system remains solvent
* Sensitive user data stays private

The network verifies correctness — **without seeing the data**.

---

## 🔒 Privacy Model (High Level)

**What the network can verify**

* A valid trade occurred
* The protocol rules were followed
* No balances go negative
* The pool remains solvent

**What stays private**

* Trader identity
* Order size
* Balances
* Limit price
* Execution intent and timing

This boundary is intentional and enforced cryptographically.

---

## 🧭 Buildathon Scope & Roadmap

Arcanum is developed in waves as part of the Aleo Buildathon.

### ✅ Wave 1 — Private Swaps (Current)

* Private token swaps
* Hidden balances and amounts
* No public order book
* No visible liquidity or TVL
* Frontend + Leo contract foundation

### 🔜 Wave 2 — Batch Execution

* Epoch-based trade execution
* MEV-resistant clearing
* Reduced price impact

### 🔜 Wave 3 — Two-Sided Matching

* True dark pool mechanics
* Private buy/sell intent matching
* Clearing price discovery without leakage

### 🔜 Wave 4+ — Institutional Features

* Advanced execution modes
* Selective disclosure
* Compliance-friendly workflows

---

## 🖥️ Frontend (This Repository)

This repository currently contains **only the frontend**. The app lives in the `arcanum/` directory.

### Design Principles

* Dark-mode, terminal-style UI
* Crypto-native and institutional
* No retail gamification
* Privacy-forward by default
* Persistent navigation for stateful UX

### Current Status

* Wallet connection: placeholder
* All blockchain interactions: mocked
* UI fully designed to support future waves without redesign

The frontend is intentionally complete so backend features can be activated incrementally without changing UX.

---

## 🧱 Tech Stack (Frontend)

* React
* TypeScript
* Modern component-based architecture
* Built to integrate with Aleo smart contracts (Leo) in later phases

---

## 🧪 Backend & Smart Contracts

Smart contracts and Aleo integration will be added in subsequent waves.

Planned backend characteristics:

* Leo-based private programs
* Zero-knowledge enforcement of swap validity
* Private state for balances and orders
* Off-chain execution with on-chain verification

---

## 🚫 Explicit Non-Goals (For Now)

To stay focused and honest, Arcanum **does not** currently include:

* Public order books
* Charts or analytics
* Liquidity mining or yield
* Governance tokens
* Cross-chain routing

These are intentionally excluded from Wave 1.

---

## 🧑‍💻 Getting Started

```bash
cd arcanum
npm install
npm run dev
```

> Note: This frontend currently runs entirely with mocked data.

---

## 📌 Project Status

This project is under active development as part of the **Aleo Privacy Buildathon**. Expect rapid iteration, wave-based feature activation, and evolving documentation.

---

## 📄 License

MIT

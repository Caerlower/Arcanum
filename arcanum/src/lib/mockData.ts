// Mock token data
export interface Token {
  symbol: string;
  name: string;
  icon: string;
  decimals: number;
}

export const TOKENS: Token[] = [
  { symbol: 'ALEO', name: 'Aleo', icon: '◈', decimals: 6 },
  { symbol: 'USDC', name: 'USD Coin', icon: '$', decimals: 6 },
  { symbol: 'ETH', name: 'Ethereum', icon: 'Ξ', decimals: 18 },
  { symbol: 'BTC', name: 'Bitcoin', icon: '₿', decimals: 8 },
  { symbol: 'USDT', name: 'Tether', icon: '₮', decimals: 6 },
];

// Mock exchange rates (base: USDC)
export const MOCK_RATES: Record<string, number> = {
  ALEO: 1.25,
  USDC: 1.0,
  ETH: 3450.0,
  BTC: 67500.0,
  USDT: 1.0,
};

// Mock order data
export type OrderStatus = 'pending' | 'executed' | 'failed';

export interface Order {
  id: string;
  tokenFrom: string;
  tokenTo: string;
  status: OrderStatus;
  timestamp: number;
  epoch: number;
  amountHidden: boolean;
}

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ord_001',
    tokenFrom: 'ALEO',
    tokenTo: 'USDC',
    status: 'executed',
    timestamp: Date.now() - 3600000,
    epoch: 1847293,
    amountHidden: true,
  },
  {
    id: 'ord_002',
    tokenFrom: 'ETH',
    tokenTo: 'ALEO',
    status: 'executed',
    timestamp: Date.now() - 7200000,
    epoch: 1847291,
    amountHidden: true,
  },
  {
    id: 'ord_003',
    tokenFrom: 'USDC',
    tokenTo: 'BTC',
    status: 'pending',
    timestamp: Date.now() - 300000,
    epoch: 1847295,
    amountHidden: true,
  },
  {
    id: 'ord_004',
    tokenFrom: 'ALEO',
    tokenTo: 'ETH',
    status: 'executed',
    timestamp: Date.now() - 86400000,
    epoch: 1847100,
    amountHidden: true,
  },
];

// Pool health indicators
export interface PoolHealth {
  status: 'healthy' | 'warning' | 'critical';
  solvencyVerified: boolean;
  liquiditySufficient: boolean;
  lastVerification: number;
}

export const MOCK_POOL_HEALTH: PoolHealth = {
  status: 'healthy',
  solvencyVerified: true,
  liquiditySufficient: true,
  lastVerification: Date.now() - 120000,
};

// Roadmap waves
export type WaveStatus = 'active' | 'development' | 'planned';

export interface Wave {
  number: number;
  title: string;
  description: string;
  status: WaveStatus;
  features: string[];
}

export const ROADMAP_WAVES: Wave[] = [
  {
    number: 1,
    title: 'Private Swaps',
    description: 'Execute token swaps with complete privacy. Order size, balances, and intent remain hidden.',
    status: 'active',
    features: [
      'Private token swaps',
      'Zero-knowledge proofs',
      'Oracle-referenced pricing',
      'Epoch-based execution',
    ],
  },
  {
    number: 2,
    title: 'Batch Execution',
    description: 'Aggregate multiple orders for enhanced privacy through batch processing.',
    status: 'development',
    features: [
      'Order batching',
      'Improved anonymity set',
      'Gas optimization',
      'Scheduled execution',
    ],
  },
  {
    number: 3,
    title: 'Two-Sided Matching',
    description: 'Private order matching between counterparties without revealing trade details.',
    status: 'planned',
    features: [
      'Order matching engine',
      'Private limit orders',
      'Partial fills',
      'Time-in-force options',
    ],
  },
  {
    number: 4,
    title: 'Institutional Dark Pool',
    description: 'Full dark pool functionality for institutional-grade private trading.',
    status: 'planned',
    features: [
      'Block trading',
      'RFQ system',
      'Cross-chain privacy',
      'Institutional APIs',
    ],
  },
];

// Helper functions
export function getTokenBySymbol(symbol: string): Token | undefined {
  return TOKENS.find(t => t.symbol === symbol);
}

export function calculateRate(from: string, to: string): number {
  const fromRate = MOCK_RATES[from] || 1;
  const toRate = MOCK_RATES[to] || 1;
  return fromRate / toRate;
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatEpoch(epoch: number): string {
  return `Epoch ${epoch.toLocaleString()}`;
}

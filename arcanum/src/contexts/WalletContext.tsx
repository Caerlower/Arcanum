import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  isConnecting: boolean;
}

interface WalletContextType extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
  truncatedAddress: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Mock wallet addresses for demo
const MOCK_ADDRESSES = [
  'aleo1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq3ljyzc',
  'aleo1r4pc5dkp6l7yjyz9qs7jvj89gkq8t4j3htmsf46k32xmdyfl5yqsd7u6yu',
  'aleo1xp4xyrc8n4kvfzjqx8w5cg5zj8vqy8x9qy8z9q8x9q8x9q8x9q8x9qy8',
];

export function WalletProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WalletState>({
    isConnected: false,
    address: null,
    isConnecting: false,
  });

  const connect = useCallback(async () => {
    setState(prev => ({ ...prev, isConnecting: true }));
    
    // Simulate wallet connection delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Pick a random mock address
    const address = MOCK_ADDRESSES[Math.floor(Math.random() * MOCK_ADDRESSES.length)];
    
    setState({
      isConnected: true,
      address,
      isConnecting: false,
    });
  }, []);

  const disconnect = useCallback(() => {
    setState({
      isConnected: false,
      address: null,
      isConnecting: false,
    });
  }, []);

  const truncatedAddress = state.address
    ? `${state.address.slice(0, 8)}...${state.address.slice(-6)}`
    : null;

  return (
    <WalletContext.Provider value={{ ...state, connect, disconnect, truncatedAddress }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}

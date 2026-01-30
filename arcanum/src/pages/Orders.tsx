import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusPill } from '@/components/ui/StatusPill';
import { useWallet } from '@/contexts/WalletContext';
import { MOCK_ORDERS, formatTimestamp, formatEpoch, getTokenBySymbol, Order } from '@/lib/mockData';
import { Eye, EyeOff, ClipboardList, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

function OrderRow({ order }: { order: Order }) {
  const [revealed, setRevealed] = useState(false);
  const fromToken = getTokenBySymbol(order.tokenFrom);
  const toToken = getTokenBySymbol(order.tokenTo);

  return (
    <Card className="gradient-card border-border/50">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          {/* Token Pair */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg">
              {fromToken?.icon}
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg">
              {toToken?.icon}
            </div>
          </div>
          
          {/* Details */}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-medium">
                {order.tokenFrom} → {order.tokenTo}
              </span>
              <StatusPill
                status={order.status === 'executed' ? 'executed' : order.status === 'pending' ? 'pending' : 'failed'}
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{formatTimestamp(order.timestamp)}</span>
              <span>•</span>
              <span className="font-mono">{formatEpoch(order.epoch)}</span>
            </div>
          </div>
        </div>

        {/* Amount / Reveal Toggle */}
        <div className="flex items-center gap-2">
          {revealed ? (
            <span className="font-mono text-sm text-muted-foreground">
              Amount: ████.██
            </span>
          ) : (
            <span className="font-mono text-sm text-muted-foreground">
              Amount: Hidden
            </span>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setRevealed(!revealed)}
            title="Reveal to Me (UI only)"
          >
            {revealed ? (
              <Eye className="h-4 w-4 text-muted-foreground" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <ClipboardList className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mb-2 text-lg font-semibold">No Orders Yet</h3>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">
        Your private trading activity will appear here. All order details remain
        hidden by default.
      </p>
      <Button asChild>
        <Link to="/trade">Start Trading</Link>
      </Button>
    </div>
  );
}

export default function Orders() {
  const { isConnected, connect, isConnecting } = useWallet();

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mx-auto max-w-2xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold md:text-3xl">Orders</h1>
          <p className="text-muted-foreground">
            Your private trading activity
          </p>
        </div>

        {!isConnected ? (
          <Card className="gradient-card border-border/50">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <ClipboardList className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Connect Wallet</h3>
              <p className="mb-6 max-w-sm text-center text-sm text-muted-foreground">
                Connect your wallet to view your private order history.
              </p>
              <Button onClick={connect} disabled={isConnecting}>
                {isConnecting ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            </CardContent>
          </Card>
        ) : MOCK_ORDERS.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {/* Info Banner */}
            <div className="mb-6 rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex items-start gap-3">
                <EyeOff className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Privacy by Default</p>
                  <p className="text-sm text-muted-foreground">
                    Order amounts are hidden. Use "Reveal to Me" to view your own order
                    details locally. This does not expose data on-chain.
                  </p>
                </div>
              </div>
            </div>

            {/* Order List */}
            {MOCK_ORDERS.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

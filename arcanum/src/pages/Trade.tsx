import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PrivacyIndicatorGroup } from '@/components/ui/PrivacyBadge';
import { StatusPill } from '@/components/ui/StatusPill';
import { useWallet } from '@/contexts/WalletContext';
import { TOKENS, calculateRate, getTokenBySymbol } from '@/lib/mockData';
import {
  ArrowDownUp,
  ChevronDown,
  Loader2,
  CheckCircle,
  AlertCircle,
  Lock,
  Clock,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type ExecutionState = 'idle' | 'submitting' | 'waiting' | 'success' | 'error';

export default function Trade() {
  const { isConnected, connect, isConnecting } = useWallet();
  const [tokenFrom, setTokenFrom] = useState('ALEO');
  const [tokenTo, setTokenTo] = useState('USDC');
  const [amount, setAmount] = useState('');
  const [executionState, setExecutionState] = useState<ExecutionState>('idle');
  const [executedEpoch, setExecutedEpoch] = useState<number | null>(null);

  const fromToken = getTokenBySymbol(tokenFrom);
  const toToken = getTokenBySymbol(tokenTo);
  const rate = calculateRate(tokenFrom, tokenTo);
  const estimatedOutput = amount ? (parseFloat(amount) * rate).toFixed(6) : '0.00';

  const handleSwapTokens = () => {
    setTokenFrom(tokenTo);
    setTokenTo(tokenFrom);
  };

  const handleSwap = async () => {
    if (!isConnected || !amount || parseFloat(amount) <= 0) return;

    setExecutionState('submitting');
    
    // Simulate proving
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setExecutionState('waiting');
    
    // Simulate execution
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Random success/error (90% success rate)
    if (Math.random() > 0.1) {
      setExecutedEpoch(Math.floor(1847000 + Math.random() * 1000));
      setExecutionState('success');
    } else {
      setExecutionState('error');
    }
  };

  const resetState = () => {
    setExecutionState('idle');
    setAmount('');
    setExecutedEpoch(null);
  };

  const renderExecutionContent = () => {
    switch (executionState) {
      case 'submitting':
        return (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-2 border-primary/30" />
              <Loader2 className="absolute inset-0 m-auto h-8 w-8 animate-spin text-primary" />
            </div>
            <div className="text-center">
              <p className="font-semibold">Proving privately...</p>
              <p className="text-sm text-muted-foreground">
                Generating zero-knowledge proof
              </p>
            </div>
          </div>
        );
      case 'waiting':
        return (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-2 border-warning/30 animate-pulse" />
              <Clock className="absolute inset-0 m-auto h-8 w-8 text-warning" />
            </div>
            <div className="text-center">
              <p className="font-semibold">Awaiting execution...</p>
              <p className="text-sm text-muted-foreground">
                Transaction submitted to network
              </p>
            </div>
          </div>
        );
      case 'success':
        return (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <div className="text-center">
              <p className="font-semibold">Swap Executed</p>
              <p className="font-mono text-sm text-muted-foreground">
                Epoch {executedEpoch?.toLocaleString()}
              </p>
            </div>
            <Button onClick={resetState} variant="outline" className="mt-2">
              New Swap
            </Button>
          </div>
        );
      case 'error':
        return (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/20">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <div className="text-center">
              <p className="font-semibold">Execution Failed</p>
              <p className="text-sm text-muted-foreground">
                Please try again
              </p>
            </div>
            <Button onClick={resetState} variant="outline" className="mt-2">
              Try Again
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mx-auto max-w-lg">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-2xl font-bold md:text-3xl">Private Swap</h1>
          <p className="text-muted-foreground">
            Execute token swaps with complete privacy
          </p>
        </div>

        {/* Privacy Indicators */}
        <div className="mb-6 flex justify-center">
          <PrivacyIndicatorGroup />
        </div>

        {/* Swap Card */}
        <Card className="gradient-card border-border/50">
          <CardContent className="pt-6">
            {executionState !== 'idle' ? (
              renderExecutionContent()
            ) : (
              <>
                {/* From Token */}
                <div className="mb-2">
                  <label className="mb-2 block text-sm text-muted-foreground">
                    From
                  </label>
                  <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-32 justify-between font-mono"
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-lg">{fromToken?.icon}</span>
                            {tokenFrom}
                          </span>
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40 bg-popover">
                        {TOKENS.filter(t => t.symbol !== tokenTo).map((token) => (
                          <DropdownMenuItem
                            key={token.symbol}
                            onClick={() => setTokenFrom(token.symbol)}
                            className="font-mono cursor-pointer"
                          >
                            <span className="mr-2 text-lg">{token.icon}</span>
                            {token.symbol}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="flex-1 input-mono text-right"
                    />
                  </div>
                </div>

                {/* Swap Direction Toggle */}
                <div className="my-4 flex justify-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full"
                    onClick={handleSwapTokens}
                  >
                    <ArrowDownUp className="h-4 w-4" />
                  </Button>
                </div>

                {/* To Token */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm text-muted-foreground">
                    To
                  </label>
                  <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-32 justify-between font-mono"
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-lg">{toToken?.icon}</span>
                            {tokenTo}
                          </span>
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-40 bg-popover">
                        {TOKENS.filter(t => t.symbol !== tokenFrom).map((token) => (
                          <DropdownMenuItem
                            key={token.symbol}
                            onClick={() => setTokenTo(token.symbol)}
                            className="font-mono cursor-pointer"
                          >
                            <span className="mr-2 text-lg">{token.icon}</span>
                            {token.symbol}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <div className="flex flex-1 items-center justify-end rounded-md border border-input bg-muted/50 px-3 font-mono text-lg">
                      {estimatedOutput}
                    </div>
                  </div>
                </div>

                {/* Rate Display */}
                <div className="mb-6 rounded-lg bg-muted/50 p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Exchange Rate</span>
                    <span className="font-mono">
                      1 {tokenFrom} = {rate.toFixed(6)} {tokenTo}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Oracle-referenced pricing
                  </p>
                </div>

                {/* CTA Button */}
                {!isConnected ? (
                  <Button
                    onClick={connect}
                    disabled={isConnecting}
                    className="w-full gap-2"
                    size="lg"
                  >
                    {isConnecting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      'Connect Wallet'
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleSwap}
                    disabled={!amount || parseFloat(amount) <= 0}
                    className="w-full gap-2 glow-primary"
                    size="lg"
                  >
                    <Lock className="h-4 w-4" />
                    Swap Privately
                  </Button>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Future Features */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <StatusPill status="coming" label="Batch Execution Mode" />
          <StatusPill status="coming" label="Dark Pool Matching (Wave 3)" />
        </div>
      </div>
    </div>
  );
}

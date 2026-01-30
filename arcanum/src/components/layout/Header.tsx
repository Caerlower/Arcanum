import { useState } from 'react';
import { Wallet, ChevronDown, LogOut, Copy, Check } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export function Header() {
  const { isConnected, isConnecting, truncatedAddress, address, connect, disconnect } = useWallet();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (address) {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
          <span className="font-mono text-lg font-bold text-primary">◈</span>
        </div>
        <span className="hidden font-semibold tracking-tight sm:inline-block">Arcanum</span>
      </div>

      {/* Wallet Dropdown */}
      <div className="flex items-center gap-2">
        {!isConnected ? (
          <Button
            onClick={connect}
            disabled={isConnecting}
            className="gap-2"
            size="sm"
          >
            {isConnecting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <Wallet className="h-4 w-4" />
                <span>Connect Wallet</span>
              </>
            )}
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 font-mono">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span>{truncatedAddress}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-popover">
              <div className="px-2 py-1.5">
                <p className="text-xs text-muted-foreground">Connected Wallet</p>
                <p className="font-mono text-sm">{truncatedAddress}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleCopy} className="gap-2 cursor-pointer">
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-primary" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Address</span>
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={disconnect} className="gap-2 text-destructive cursor-pointer">
                <LogOut className="h-4 w-4" />
                <span>Disconnect</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}

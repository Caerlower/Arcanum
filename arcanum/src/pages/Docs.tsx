import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusPill } from '@/components/ui/StatusPill';
import {
  Book,
  Code,
  Shield,
  FileText,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const docsSections = [
  {
    id: 'overview',
    icon: Book,
    title: 'Overview',
    content: `
# Arcanum Protocol

Arcanum is a privacy-first DeFi protocol built on Aleo, enabling private token swaps with zero-knowledge proofs.

## Core Principles

- **Privacy by Default**: All transactions are private unless explicitly revealed
- **Cryptographic Enforcement**: Security is mathematical, not trust-based
- **Selective Disclosure**: Prove specific facts without revealing underlying data

## Current Status

Wave 1 (Private Swaps) is currently active. Users can execute token swaps with complete privacy—order sizes, balances, and execution intent remain hidden.

## Getting Started

1. Connect your Aleo-compatible wallet
2. Navigate to the Trade page
3. Select tokens and enter amount
4. Execute your private swap
    `,
  },
  {
    id: 'architecture',
    icon: Code,
    title: 'Architecture',
    content: `
# Architecture

## System Components

### Client Layer
- Web-based interface for user interactions
- Local proof generation for privacy
- Wallet integration for transaction signing

### Protocol Layer
- Smart contracts deployed on Aleo
- Zero-knowledge circuit definitions
- Oracle price feeds (privacy-preserving)

### Network Layer
- Aleo blockchain for settlement
- Decentralized validators
- Epoch-based execution

## Technical Details

*Detailed architecture documentation coming soon.*

This section will cover:
- Circuit design
- State management
- Proof generation pipeline
- Settlement mechanics
    `,
  },
  {
    id: 'privacy-model',
    icon: Shield,
    title: 'Privacy Model',
    content: `
# Privacy Model

## What Gets Proven

1. **Trade Validity**: Mathematical proof that the swap adheres to protocol rules
2. **Solvency**: Pool has sufficient reserves without revealing exact amounts
3. **Ownership**: User controls the assets being traded
4. **Execution Correctness**: Trade executed as specified

## What Stays Hidden

1. **Order Amounts**: Size of trades never revealed
2. **Wallet Balances**: Total holdings remain private
3. **Trading Intent**: No advance signal of planned trades
4. **Execution Timing**: Obscured through batching

## Zero-Knowledge Proofs

Arcanum uses Aleo's zero-knowledge proof system to enable verification without revelation. This allows the network to confirm that:

- Your trade is valid
- You have sufficient funds
- The execution is correct

...all without seeing the actual values involved.

## Trust Model

- No trusted party has access to private data
- Security relies on cryptographic assumptions
- Proofs are publicly verifiable
    `,
  },
  {
    id: 'smart-contracts',
    icon: FileText,
    title: 'Smart Contracts',
    content: `
# Smart Contracts

## Status

Smart contract documentation is coming soon.

## Planned Coverage

- Contract addresses
- Function signatures
- Integration examples
- Security audits

## For Developers

If you're interested in integrating with Arcanum:
- Join our developer community (coming soon)
- Review our GitHub repository
- Contact the team for early access

*This section will be updated as contracts are finalized and audited.*
    `,
    comingSoon: true,
  },
];

export default function Docs() {
  const [activeSection, setActiveSection] = useState('overview');
  const currentSection = docsSections.find((s) => s.id === activeSection);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold md:text-3xl">Documentation</h1>
          <p className="text-muted-foreground">
            Learn about the Arcanum protocol
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[240px_1fr]">
          {/* Sidebar Navigation */}
          <nav className="space-y-1">
            {docsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors',
                  activeSection === section.id
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <div className="flex items-center gap-2">
                  <section.icon className="h-4 w-4" />
                  {section.title}
                </div>
                {section.comingSoon && (
                  <StatusPill status="coming" label="Soon" className="scale-75" />
                )}
              </button>
            ))}
          </nav>

          {/* Content Area */}
          <Card className="gradient-card border-border/50">
            <CardContent className="prose prose-invert max-w-none pt-6">
              <div className="markdown-content">
                {currentSection?.content.split('\n').map((line, i) => {
                  if (line.startsWith('# ')) {
                    return (
                      <h1 key={i} className="mb-4 text-2xl font-bold">
                        {line.slice(2)}
                      </h1>
                    );
                  }
                  if (line.startsWith('## ')) {
                    return (
                      <h2 key={i} className="mb-3 mt-8 text-xl font-semibold">
                        {line.slice(3)}
                      </h2>
                    );
                  }
                  if (line.startsWith('### ')) {
                    return (
                      <h3 key={i} className="mb-2 mt-6 text-lg font-semibold">
                        {line.slice(4)}
                      </h3>
                    );
                  }
                  if (line.startsWith('- ')) {
                    return (
                      <li key={i} className="ml-4 text-muted-foreground">
                        {line.slice(2).replace(/\*\*(.*?)\*\*/g, (_, text) => text)}
                      </li>
                    );
                  }
                  if (line.match(/^\d+\./)) {
                    return (
                      <li key={i} className="ml-4 list-decimal text-muted-foreground">
                        {line.replace(/^\d+\.\s/, '').replace(/\*\*(.*?)\*\*/g, (_, text) => text)}
                      </li>
                    );
                  }
                  if (line.startsWith('*') && line.endsWith('*')) {
                    return (
                      <p key={i} className="italic text-muted-foreground">
                        {line.slice(1, -1)}
                      </p>
                    );
                  }
                  if (line.trim() === '') {
                    return <div key={i} className="h-4" />;
                  }
                  return (
                    <p key={i} className="text-muted-foreground">
                      {line}
                    </p>
                  );
                })}
              </div>

              {currentSection?.comingSoon && (
                <div className="mt-8 rounded-lg border border-dashed border-border bg-muted/30 p-6 text-center">
                  <StatusPill status="development" label="Coming Soon" />
                  <p className="mt-4 text-sm text-muted-foreground">
                    This section is under development
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* External Links */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Button variant="outline" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Code className="mr-2 h-4 w-4" />
              GitHub
              <ExternalLink className="ml-2 h-3 w-3" />
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://aleo.org" target="_blank" rel="noopener noreferrer">
              Aleo Documentation
              <ExternalLink className="ml-2 h-3 w-3" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

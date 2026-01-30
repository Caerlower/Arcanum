import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StatusPill } from '@/components/ui/StatusPill';
import { ROADMAP_WAVES } from '@/lib/mockData';
import {
  ArrowRight,
  Shield,
  Eye,
  EyeOff,
  Lock,
  Zap,
  CheckCircle,
  XCircle,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
              <Lock className="h-4 w-4" />
              <span>Privacy-First DeFi on Aleo</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
              Private Trading.{' '}
              <span className="text-gradient-primary">No Information Leakage.</span>
            </h1>
            <p className="mb-10 text-lg text-muted-foreground md:text-xl">
              Trade without revealing balances, order size, or execution intent.
              Cryptographic enforcement, not trust-based opacity.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2 glow-primary">
                <Link to="/trade">
                  Enter Private Pool
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/privacy">
                  <Shield className="h-4 w-4" />
                  View Privacy Model
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Public DEXs Leak Intent */}
      <section className="border-b border-border py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">
              Why Public DEXs Leak Intent
            </h2>
            <p className="mb-12 text-center text-muted-foreground">
              On-chain transparency means your trading activity is visible to everyone—including adversaries.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="gradient-card border-border/50">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/20">
                    <Eye className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="mb-2 font-semibold">Visible Order Books</h3>
                  <p className="text-sm text-muted-foreground">
                    Your pending orders signal intent to sophisticated traders and MEV bots.
                  </p>
                </CardContent>
              </Card>
              <Card className="gradient-card border-border/50">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/20">
                    <Zap className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="mb-2 font-semibold">Front-Running</h3>
                  <p className="text-sm text-muted-foreground">
                    Bots detect large orders and execute ahead of you, extracting value.
                  </p>
                </CardContent>
              </Card>
              <Card className="gradient-card border-border/50">
                <CardContent className="pt-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/20">
                    <Eye className="h-6 w-6 text-destructive" />
                  </div>
                  <h3 className="mb-2 font-semibold">Balance Exposure</h3>
                  <p className="text-sm text-muted-foreground">
                    Wallet balances reveal your positions and trading capacity to all observers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How Private Execution Works */}
      <section className="border-b border-border py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">
              How Private Execution Works
            </h2>
            <p className="mb-12 text-center text-muted-foreground">
              Zero-knowledge proofs enable verification without revelation.
            </p>
            <div className="relative">
              {/* Flow diagram */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="gradient-card border-border/50">
                  <CardContent className="pt-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                        <EyeOff className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="mb-2 font-semibold">Private Inputs</h3>
                    <p className="text-sm text-muted-foreground">
                      Your order details, balances, and intent remain encrypted.
                    </p>
                  </CardContent>
                </Card>
                <Card className="gradient-card border-primary/30">
                  <CardContent className="pt-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 animate-pulse-glow">
                        <Lock className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="mb-2 font-semibold">Zero-Knowledge Proof</h3>
                    <p className="text-sm text-muted-foreground">
                      Cryptographic proof that your trade is valid without revealing details.
                    </p>
                  </CardContent>
                </Card>
                <Card className="gradient-card border-border/50">
                  <CardContent className="pt-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                        <CheckCircle className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="mb-2 font-semibold">Public Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      Network verifies correctness without seeing your data.
                    </p>
                  </CardContent>
                </Card>
              </div>
              {/* Connecting arrows (desktop) */}
              <div className="absolute left-1/3 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="absolute left-2/3 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Comparison Table */}
      <section className="border-b border-border py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">
              What the Network Sees
            </h2>
            <p className="mb-12 text-center text-muted-foreground">
              Transparency where it matters. Privacy where it counts.
            </p>
            <Card className="gradient-card border-border/50 overflow-hidden">
              <div className="grid grid-cols-3 border-b border-border bg-muted/50 px-4 py-3 text-sm font-medium">
                <span>Data Type</span>
                <span className="text-center">Public DEX</span>
                <span className="text-center">Arcanum</span>
              </div>
              {[
                { label: 'Order Size', public: true, arcanum: false },
                { label: 'Wallet Balance', public: true, arcanum: false },
                { label: 'Trading Intent', public: true, arcanum: false },
                { label: 'Execution Timing', public: true, arcanum: false },
                { label: 'Trade Validity', public: true, arcanum: true },
                { label: 'Pool Solvency', public: true, arcanum: true },
              ].map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-3 px-4 py-3 text-sm ${
                    i !== 5 ? 'border-b border-border' : ''
                  }`}
                >
                  <span className="font-medium">{row.label}</span>
                  <span className="flex justify-center">
                    {row.public ? (
                      <Eye className="h-4 w-4 text-destructive" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-primary" />
                    )}
                  </span>
                  <span className="flex justify-center">
                    {row.arcanum ? (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <EyeOff className="h-4 w-4 text-primary" />
                    )}
                  </span>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </section>

      {/* Roadmap Preview */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-center text-2xl font-bold md:text-3xl">
              Development Roadmap
            </h2>
            <p className="mb-12 text-center text-muted-foreground">
              Building institutional-grade privacy infrastructure, wave by wave.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ROADMAP_WAVES.map((wave) => (
                <Card key={wave.number} className="gradient-card border-border/50">
                  <CardContent className="pt-6">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="font-mono text-sm text-muted-foreground">
                        Wave {wave.number}
                      </span>
                      <StatusPill
                        status={wave.status === 'active' ? 'active' : wave.status === 'development' ? 'development' : 'coming'}
                      />
                    </div>
                    <h3 className="mb-2 font-semibold">{wave.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {wave.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button asChild variant="outline">
                <Link to="/roadmap">
                  View Full Roadmap
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                <span className="font-mono text-lg font-bold text-primary">◈</span>
              </div>
              <span className="font-semibold">Arcanum</span>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <Link to="/docs" className="hover:text-foreground transition-colors">
                Docs
              </Link>
              <a href="https://github.com" className="hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <Link to="/privacy" className="hover:text-foreground transition-colors">
                Privacy Model
              </Link>
              <a href="https://aleo.org" className="hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                Built on Aleo
              </a>
            </nav>
          </div>
          <div className="mt-8 text-center text-xs text-muted-foreground">
            <p>Prove everything. Reveal nothing.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

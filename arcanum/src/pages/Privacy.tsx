import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowRight,
  FileCheck,
  Fingerprint,
  Scale,
  Zap,
} from 'lucide-react';

export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">Privacy Model</h1>
          <p className="text-lg text-muted-foreground">
            Cryptographic enforcement, not trust-based opacity.
          </p>
        </div>

        {/* Core Statement */}
        <Card className="mb-12 border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
          <CardContent className="py-8 text-center">
            <p className="text-xl font-semibold md:text-2xl">
              "The network can verify correctness without seeing your data."
            </p>
          </CardContent>
        </Card>

        {/* What We Prove vs Hide */}
        <div className="mb-12 grid gap-6 md:grid-cols-2">
          {/* What We Prove */}
          <Card className="gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                What This Protocol Proves
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  icon: Scale,
                  title: 'Trade Validity',
                  desc: 'Your swap is mathematically valid and adheres to protocol rules.',
                },
                {
                  icon: FileCheck,
                  title: 'Pool Solvency',
                  desc: 'The pool has sufficient reserves to honor all obligations.',
                },
                {
                  icon: Fingerprint,
                  title: 'Ownership',
                  desc: 'You control the assets being traded without revealing amounts.',
                },
                {
                  icon: Zap,
                  title: 'Execution Correctness',
                  desc: 'The trade executed exactly as specified in your intent.',
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/20">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* What We Hide */}
          <Card className="gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <EyeOff className="h-5 w-5 text-accent-foreground" />
                What This Protocol Hides
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: 'Order Amounts',
                  desc: 'The size of your trade is never revealed to the network.',
                },
                {
                  title: 'Wallet Balances',
                  desc: 'Your total holdings remain private at all times.',
                },
                {
                  title: 'Trading Intent',
                  desc: 'No one can see what you plan to trade before execution.',
                },
                {
                  title: 'Execution Timing',
                  desc: 'When your order executes is obscured through batching.',
                },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent">
                    <Lock className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* ZK Flow Diagram */}
        <Card className="mb-12 gradient-card border-border/50">
          <CardHeader>
            <CardTitle>How Zero-Knowledge Proofs Work</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="grid gap-4 md:grid-cols-3">
                {/* Step 1 */}
                <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                      <EyeOff className="h-6 w-6 text-accent-foreground" />
                    </div>
                  </div>
                  <h4 className="mb-2 font-semibold">1. Private Inputs</h4>
                  <p className="text-sm text-muted-foreground">
                    Your trade details, balances, and intent are encrypted locally.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="rounded-lg border border-primary/30 bg-primary/10 p-4 text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 animate-pulse-glow">
                      <Lock className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h4 className="mb-2 font-semibold">2. Zero-Knowledge Proof</h4>
                  <p className="text-sm text-muted-foreground">
                    A cryptographic proof is generated that validates your trade.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="rounded-lg border border-border bg-muted/30 p-4 text-center">
                  <div className="mb-3 flex justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                      <CheckCircle className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h4 className="mb-2 font-semibold">3. Public Verification</h4>
                  <p className="text-sm text-muted-foreground">
                    Network verifies the proof without accessing your private data.
                  </p>
                </div>
              </div>

              {/* Arrows (desktop) */}
              <div className="absolute left-[33%] top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="absolute left-[67%] top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Principles */}
        <Card className="gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Key Principles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: 'Privacy is the Default',
                  desc: 'All transactions are private unless you explicitly choose to reveal information.',
                },
                {
                  title: 'Trustless Verification',
                  desc: 'No trusted party, oracle, or coordinator can access your private data.',
                },
                {
                  title: 'Cryptographic Guarantees',
                  desc: 'Security is mathematical, not based on promises or reputation.',
                },
                {
                  title: 'Selective Disclosure',
                  desc: 'You can prove specific facts (like solvency) without revealing underlying data.',
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-lg border border-border/50 bg-muted/30 p-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 font-mono text-sm text-primary">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

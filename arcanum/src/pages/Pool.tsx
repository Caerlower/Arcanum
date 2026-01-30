import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusPill } from '@/components/ui/StatusPill';
import { MOCK_POOL_HEALTH } from '@/lib/mockData';
import {
  CheckCircle,
  Shield,
  Droplets,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Info,
} from 'lucide-react';

export default function Pool() {
  const { solvencyVerified, liquiditySufficient, lastVerification, status } = MOCK_POOL_HEALTH;
  const verificationAge = Math.floor((Date.now() - lastVerification) / 60000);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mx-auto max-w-2xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-2xl font-bold md:text-3xl">Liquidity Pool</h1>
          <p className="text-muted-foreground">
            Pool health without balance exposure
          </p>
        </div>

        {/* Opacity Explanation */}
        <Card className="mb-6 border-primary/30 bg-primary/5">
          <CardContent className="flex items-start gap-4 pt-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
              <EyeOff className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="mb-1 font-semibold">Intentional Opacity</h3>
              <p className="text-sm text-muted-foreground">
                Pool balances, TVL, and APY are intentionally hidden. Revealing these
                metrics would enable front-running and information extraction. You can
                verify the pool is solvent and liquid without knowing exact amounts.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pool Health Indicators */}
        <div className="mb-8 grid gap-4 md:grid-cols-2">
          <Card className="gradient-card border-border/50">
            <CardContent className="pt-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Solvency Status</span>
                <StatusPill status={solvencyVerified ? 'active' : 'pending'} label={solvencyVerified ? 'Verified' : 'Checking'} />
              </div>
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${solvencyVerified ? 'bg-primary/20' : 'bg-warning/20'}`}>
                  {solvencyVerified ? (
                    <CheckCircle className="h-6 w-6 text-primary" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-warning" />
                  )}
                </div>
                <div>
                  <p className="font-semibold">Pool Solvent</p>
                  <p className="text-sm text-muted-foreground">
                    ZK-proven reserves exceed liabilities
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-border/50">
            <CardContent className="pt-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Liquidity Status</span>
                <StatusPill status={liquiditySufficient ? 'active' : 'pending'} label={liquiditySufficient ? 'Sufficient' : 'Low'} />
              </div>
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${liquiditySufficient ? 'bg-primary/20' : 'bg-warning/20'}`}>
                  {liquiditySufficient ? (
                    <Droplets className="h-6 w-6 text-primary" />
                  ) : (
                    <AlertCircle className="h-6 w-6 text-warning" />
                  )}
                </div>
                <div>
                  <p className="font-semibold">Liquidity Sufficient</p>
                  <p className="text-sm text-muted-foreground">
                    Adequate depth for typical trades
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Verification Info */}
        <Card className="mb-8 gradient-card border-border/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm">Last Verification</span>
              </div>
              <span className="font-mono text-sm text-muted-foreground">
                {verificationAge} minutes ago
              </span>
            </div>
          </CardContent>
        </Card>

        {/* What's Not Shown */}
        <Card className="gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lock className="h-5 w-5 text-primary" />
              What Remains Private
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: 'Total Value Locked', icon: EyeOff },
                { label: 'Individual Pool Balances', icon: EyeOff },
                { label: 'LP Token Distribution', icon: EyeOff },
                { label: 'APY / Yield Metrics', icon: EyeOff },
                { label: 'Historical Volumes', icon: EyeOff },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
                >
                  <span className="text-sm">{item.label}</span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <item.icon className="h-4 w-4" />
                    <span>Hidden</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* LP Placeholder */}
        <div className="mt-8 text-center">
          <Card className="border-dashed gradient-card border-border/50">
            <CardContent className="py-8">
              <div className="mb-4 flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <Droplets className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
              <h3 className="mb-2 font-semibold">Liquidity Provision</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Private LP functionality coming in Wave 2
              </p>
              <StatusPill status="development" label="In Development" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

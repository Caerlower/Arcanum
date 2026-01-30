import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusPill } from '@/components/ui/StatusPill';
import { ROADMAP_WAVES, Wave, WaveStatus } from '@/lib/mockData';
import { CheckCircle, Loader2, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

function WaveCard({ wave, isLast }: { wave: Wave; isLast: boolean }) {
  const statusIcon = {
    active: CheckCircle,
    development: Loader2,
    planned: Clock,
  };

  const StatusIcon = statusIcon[wave.status];

  return (
    <div className="relative">
      {/* Timeline connector */}
      {!isLast && (
        <div className="absolute left-6 top-14 hidden h-full w-0.5 bg-border md:block" />
      )}

      <Card className={cn(
        'gradient-card border-border/50 transition-all',
        wave.status === 'active' && 'border-primary/30 shadow-lg shadow-primary/10'
      )}>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Wave indicator */}
              <div className={cn(
                'relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full',
                wave.status === 'active' ? 'bg-primary/20' : 'bg-muted'
              )}>
                <StatusIcon className={cn(
                  'h-6 w-6',
                  wave.status === 'active' && 'text-primary',
                  wave.status === 'development' && 'text-accent-foreground animate-spin-slow',
                  wave.status === 'planned' && 'text-muted-foreground'
                )} />
              </div>
              
              <div>
                <p className="font-mono text-sm text-muted-foreground">
                  Wave {wave.number}
                </p>
                <CardTitle className="text-xl">{wave.title}</CardTitle>
              </div>
            </div>
            
            <StatusPill
              status={wave.status === 'active' ? 'active' : wave.status === 'development' ? 'development' : 'coming'}
            />
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-muted-foreground">{wave.description}</p>
          
          <div className="grid gap-2 sm:grid-cols-2">
            {wave.features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2 text-sm"
              >
                <div className={cn(
                  'h-1.5 w-1.5 rounded-full',
                  wave.status === 'active' ? 'bg-primary' : 'bg-muted-foreground'
                )} />
                {feature}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Roadmap() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mx-auto max-w-3xl">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">Development Roadmap</h1>
          <p className="text-lg text-muted-foreground">
            Building institutional-grade privacy infrastructure, wave by wave.
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="mb-12 gradient-card border-border/50">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              {ROADMAP_WAVES.map((wave, i) => (
                <div key={wave.number} className="flex items-center">
                  <div className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full font-mono text-sm font-semibold',
                    wave.status === 'active' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  )}>
                    {wave.number}
                  </div>
                  {i < ROADMAP_WAVES.length - 1 && (
                    <div className={cn(
                      'mx-2 h-0.5 w-8 md:w-16',
                      wave.status === 'active' ? 'bg-primary' : 'bg-muted'
                    )} />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Wave Cards */}
        <div className="space-y-6">
          {ROADMAP_WAVES.map((wave, i) => (
            <WaveCard key={wave.number} wave={wave} isLast={i === ROADMAP_WAVES.length - 1} />
          ))}
        </div>

        {/* Vision Statement */}
        <Card className="mt-12 border-dashed gradient-card border-border/50">
          <CardContent className="py-8 text-center">
            <p className="mb-4 text-lg font-semibold">The Vision</p>
            <p className="text-muted-foreground">
              A complete private trading infrastructure that enables institutional-grade
              dark pool functionality with cryptographic privacy guarantees. No information
              leakage. No trust assumptions. Just mathematics.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

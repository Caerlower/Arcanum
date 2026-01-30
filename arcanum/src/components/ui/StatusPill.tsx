import { cn } from '@/lib/utils';
import { CheckCircle, Clock, AlertCircle, Loader2 } from 'lucide-react';

type StatusType = 'active' | 'pending' | 'executed' | 'coming' | 'development' | 'failed';

interface StatusPillProps {
  status: StatusType;
  label?: string;
  className?: string;
}

const statusConfig: Record<StatusType, { icon: typeof CheckCircle; className: string; defaultLabel: string }> = {
  active: {
    icon: CheckCircle,
    className: 'bg-primary/20 text-primary border-primary/30',
    defaultLabel: 'Active',
  },
  executed: {
    icon: CheckCircle,
    className: 'bg-primary/20 text-primary border-primary/30',
    defaultLabel: 'Executed',
  },
  pending: {
    icon: Clock,
    className: 'bg-warning/20 text-warning border-warning/30',
    defaultLabel: 'Pending',
  },
  development: {
    icon: Loader2,
    className: 'bg-accent text-accent-foreground border-border',
    defaultLabel: 'In Development',
  },
  coming: {
    icon: Clock,
    className: 'bg-muted text-muted-foreground border-border',
    defaultLabel: 'Coming Soon',
  },
  failed: {
    icon: AlertCircle,
    className: 'bg-destructive/20 text-destructive border-destructive/30',
    defaultLabel: 'Failed',
  },
};

export function StatusPill({ status, label, className }: StatusPillProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  const displayLabel = label || config.defaultLabel;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
        config.className,
        className
      )}
    >
      <Icon className={cn('h-3 w-3', status === 'development' && 'animate-spin-slow')} />
      <span>{displayLabel}</span>
    </div>
  );
}

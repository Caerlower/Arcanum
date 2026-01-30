import { Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PrivacyBadgeProps {
  label: string;
  status: 'hidden' | 'visible' | 'verified';
  className?: string;
}

const statusConfig = {
  hidden: {
    icon: EyeOff,
    text: 'Hidden',
    className: 'bg-accent text-accent-foreground',
  },
  visible: {
    icon: Eye,
    text: 'Visible',
    className: 'bg-warning/20 text-warning border-warning/30',
  },
  verified: {
    icon: Shield,
    text: 'Verified',
    className: 'bg-primary/20 text-primary border-primary/30',
  },
};

export function PrivacyBadge({ label, status, className }: PrivacyBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono border border-transparent',
        config.className,
        className
      )}
    >
      <Icon className="h-3 w-3" />
      <span>{label}:</span>
      <span className="font-semibold">{config.text}</span>
    </div>
  );
}

export function PrivacyIndicatorGroup() {
  return (
    <div className="flex flex-wrap gap-2">
      <PrivacyBadge label="Order Size" status="hidden" />
      <PrivacyBadge label="Balance" status="hidden" />
      <PrivacyBadge label="Intent" status="hidden" />
    </div>
  );
}

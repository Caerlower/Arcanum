import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  ArrowLeftRight,
  ClipboardList,
  Droplets,
  Shield,
  Map,
  FileText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

type FeatureStatus = 'active' | 'read-only' | 'planned';

interface NavItem {
  to: string;
  icon: typeof Home;
  label: string;
  status?: FeatureStatus;
}

const navItems: NavItem[] = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/trade', icon: ArrowLeftRight, label: 'Trade', status: 'active' },
  { to: '/orders', icon: ClipboardList, label: 'Orders', status: 'active' },
  { to: '/pool', icon: Droplets, label: 'Pool', status: 'read-only' },
  { to: '/privacy', icon: Shield, label: 'Privacy' },
  { to: '/roadmap', icon: Map, label: 'Roadmap' },
  { to: '/docs', icon: FileText, label: 'Docs' },
];

function StatusIndicator({ status, collapsed }: { status?: FeatureStatus; collapsed: boolean }) {
  if (!status || collapsed) return null;

  const config = {
    active: {
      label: 'Live',
      className: 'text-primary/70',
    },
    'read-only': {
      label: 'View',
      className: 'text-muted-foreground/60',
    },
    planned: {
      label: 'Soon',
      className: 'text-muted-foreground/50',
    },
  };

  const { label, className } = config[status];

  return (
    <span className={cn('ml-auto text-[10px] font-medium uppercase tracking-wider', className)}>
      {label}
    </span>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col border-r bg-sidebar transition-all duration-300',
        collapsed ? 'w-16' : 'w-56',
        // Home page de-emphasis: reduced border contrast
        isHomePage ? 'border-sidebar-border/50' : 'border-sidebar-border'
      )}
    >
      {/* Toggle */}
      <div className={cn(
        'flex h-14 items-center justify-end border-b px-2 transition-colors duration-300',
        isHomePage ? 'border-sidebar-border/50' : 'border-sidebar-border'
      )}>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            'h-8 w-8 transition-colors duration-300',
            isHomePage ? 'text-sidebar-foreground/50 hover:text-sidebar-foreground/70' : 'text-sidebar-foreground'
          )}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          const isPlanned = item.status === 'planned';
          const isReadOnly = item.status === 'read-only';
          
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300',
                // Active state (current page)
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground',
                // Home page de-emphasis for inactive items
                isHomePage && !isActive
                  ? 'text-sidebar-foreground/50'
                  : !isActive && 'text-sidebar-foreground',
                // Planned features are more muted
                isPlanned && !isActive && 'opacity-50',
                // Read-only features slightly muted
                isReadOnly && !isActive && !isHomePage && 'text-sidebar-foreground/70'
              )}
            >
              <item.icon 
                className={cn(
                  'h-5 w-5 shrink-0 transition-colors duration-300',
                  isActive && 'text-primary',
                  // Home page icon de-emphasis
                  isHomePage && !isActive && 'text-sidebar-foreground/40'
                )} 
              />
              {!collapsed && (
                <>
                  <span className={cn(
                    'transition-colors duration-300',
                    isHomePage && !isActive && 'text-sidebar-foreground/50'
                  )}>
                    {item.label}
                  </span>
                  <StatusIndicator status={item.status} collapsed={collapsed} />
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className={cn(
          'border-t p-4 transition-colors duration-300',
          isHomePage ? 'border-sidebar-border/50' : 'border-sidebar-border'
        )}>
          <p className={cn(
            'text-xs transition-colors duration-300',
            isHomePage ? 'text-muted-foreground/40' : 'text-muted-foreground'
          )}>
            Powered by Aleo
          </p>
        </div>
      )}
    </aside>
  );
}

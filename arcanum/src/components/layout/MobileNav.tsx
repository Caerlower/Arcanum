import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  ArrowLeftRight,
  ClipboardList,
  Shield,
  MoreHorizontal,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Droplets, Map, FileText } from 'lucide-react';

type FeatureStatus = 'active' | 'read-only' | 'planned';

interface NavItem {
  to: string;
  icon: typeof Home;
  label: string;
  status?: FeatureStatus;
}

const mainNavItems: NavItem[] = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/trade', icon: ArrowLeftRight, label: 'Trade', status: 'active' },
  { to: '/orders', icon: ClipboardList, label: 'Orders', status: 'active' },
  { to: '/privacy', icon: Shield, label: 'Privacy' },
];

const moreNavItems: NavItem[] = [
  { to: '/pool', icon: Droplets, label: 'Pool', status: 'read-only' },
  { to: '/roadmap', icon: Map, label: 'Roadmap' },
  { to: '/docs', icon: FileText, label: 'Docs' },
];

export function MobileNav() {
  const location = useLocation();
  const isMoreActive = moreNavItems.some((item) => location.pathname === item.to);
  const isHomePage = location.pathname === '/';

  return (
    <nav className={cn(
      'fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden transition-colors duration-300',
      isHomePage ? 'border-border/50' : 'border-border'
    )}>
      {mainNavItems.map((item) => {
        const isActive = location.pathname === item.to;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={cn(
              'flex flex-col items-center gap-1 px-3 py-2 text-xs transition-colors',
              isActive ? 'text-primary' : 'text-muted-foreground',
              // Home page de-emphasis for inactive items
              isHomePage && !isActive && 'text-muted-foreground/50'
            )}
          >
            <div className="relative">
              <item.icon className="h-5 w-5" />
              {/* Small dot indicator for live features */}
              {item.status === 'active' && !isActive && (
                <div className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-primary/60" />
              )}
            </div>
            <span>{item.label}</span>
          </NavLink>
        );
      })}

      {/* More dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              'flex flex-col items-center gap-1 px-3 py-2 text-xs transition-colors',
              isMoreActive ? 'text-primary' : 'text-muted-foreground',
              isHomePage && !isMoreActive && 'text-muted-foreground/50'
            )}
          >
            <MoreHorizontal className="h-5 w-5" />
            <span>More</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="mb-2 w-40 bg-popover">
          {moreNavItems.map((item) => (
            <DropdownMenuItem key={item.to} asChild>
              <NavLink
                to={item.to}
                className={cn(
                  'flex items-center justify-between gap-2',
                  location.pathname === item.to && 'text-primary'
                )}
              >
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
                {item.status === 'read-only' && (
                  <span className="text-[10px] uppercase text-muted-foreground/60">View</span>
                )}
              </NavLink>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}

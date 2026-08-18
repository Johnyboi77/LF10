'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarDays,
  GraduationCap,
  Users,
  ArrowLeftRight,
  Upload,
  HeartPulse,
  UserCircle,
  LogOut,
  School,
  RefreshCw,
  CalendarCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Übersicht', icon: LayoutDashboard },
  { href: '/stundenplan', label: 'Stundenplan', icon: CalendarDays },
  { href: '/noten', label: 'Noten', icon: GraduationCap },
  { href: '/lehrer', label: 'Lehrkräfte', icon: Users },
  { href: '/vertretungsplan', label: 'Vertretungsplan', icon: ArrowLeftRight },
  { href: '/abgaben', label: 'Abgaben', icon: Upload },
  { href: '/termine', label: 'Termine', icon: CalendarCheck },
];

const secondaryItems = [
  { href: '/krankmeldung', label: 'Krankmeldung', icon: HeartPulse },
  { href: '/profil', label: 'Profil', icon: UserCircle },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  function handleLogout() {
    router.push('/login');
  }

  function handleRefresh() {
    setRefreshing(true);
    router.refresh();
    setTimeout(() => setRefreshing(false), 1000);
  }

  return (
    <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-school-primary text-white h-screen sticky top-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 shrink-0">
          <School className="h-5 w-5 text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold leading-tight">Pestalozzi Schule</p>
          <p className="text-xs text-white/60 leading-tight">Musterstadt</p>
        </div>
      </div>

      {/* Primary Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}

        <div className="my-3 border-t border-white/10" />

        {secondaryItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}

        <div className="my-3 border-t border-white/10" />

        {/* Aktualisieren — in der Nav */}
        <button
          onClick={handleRefresh}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-colors"
        >
          <RefreshCw className={`h-4 w-4 shrink-0 transition-transform duration-700 ${refreshing ? 'animate-spin' : ''}`} />
          Aktualisieren
        </button>
      </nav>

      {/* Logout Footer */}
      <div className="border-t border-white/10 p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white bg-red-600/80 hover:bg-red-600 transition-colors font-medium"
        >
          <LogOut className="h-4 w-4" />
          Abmelden
        </button>
      </div>
    </aside>
  );
}

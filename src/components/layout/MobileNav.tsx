'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarDays,
  GraduationCap,
  ArrowLeftRight,
  UserCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const mobileItems = [
  { href: '/dashboard', label: 'Übersicht', icon: LayoutDashboard },
  { href: '/stundenplan', label: 'Stundenplan', icon: CalendarDays },
  { href: '/noten', label: 'Noten', icon: GraduationCap },
  { href: '/vertretungsplan', label: 'Vertretung', icon: ArrowLeftRight },
  { href: '/profil', label: 'Profil', icon: UserCircle },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200">
      <div className="flex">
        {mobileItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-1 flex-col items-center gap-1 py-2 text-xs font-medium transition-colors',
                active ? 'text-school-primary' : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

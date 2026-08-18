'use client';

import { usePathname } from 'next/navigation';
import { School } from 'lucide-react';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Übersicht',
  '/stundenplan': 'Stundenplan',
  '/noten': 'Notenübersicht',
  '/lehrer': 'Lehrkräfte',
  '/vertretungsplan': 'Vertretungsplan',
  '/abgaben': 'Digitale Abgaben',
  '/krankmeldung': 'Krankmeldung',
  '/termine': 'Termine',
  '/profil': 'Mein Profil',
};

export default function TopBar() {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? 'Schülerportal';

  return (
    <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-school-primary text-white border-b border-white/10">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
        <School className="h-4 w-4" />
      </div>
      <div>
        <p className="text-xs text-white/60 leading-none">Pestalozzi-Realschule Musterstadt</p>
        <p className="text-sm font-semibold leading-tight">{title}</p>
      </div>
    </header>
  );
}

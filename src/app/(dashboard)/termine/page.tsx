'use client';

import { useState, useMemo } from 'react';
import { schoolEvents } from '@/lib/mockData';
import type { EventCategory } from '@/types';
import { Search, CalendarDays, BookOpen, Star, Bus, Users, Palmtree } from 'lucide-react';

const categoryConfig: Record<EventCategory, { label: string; border: string; text: string; icon: React.ElementType }> = {
  klassenarbeit:      { label: 'Klassenarbeit',      border: 'border-l-red-400',    text: 'text-red-700',    icon: BookOpen },
  schulveranstaltung: { label: 'Schulveranstaltung', border: 'border-l-violet-400', text: 'text-violet-700', icon: Star },
  ausflug:            { label: 'Ausflug',             border: 'border-l-cyan-400',   text: 'text-cyan-700',   icon: Bus },
  eltern:             { label: 'Elternevent',         border: 'border-l-amber-400',  text: 'text-amber-700',  icon: Users },
  feiertag:           { label: 'Ferien / Feiertag',   border: 'border-l-green-400',  text: 'text-green-700',  icon: Palmtree },
};

const PRESENTATION_DATE = new Date('2026-09-22');
const WINDOW_END = new Date('2026-11-17');

function parseDate(dateStr: string): Date {
  const [d, m, y] = dateStr.split('.');
  return new Date(`${y}-${m}-${d}`);
}

function isInWindow(event: typeof schoolEvents[0]): boolean {
  const start = parseDate(event.date);
  return start >= PRESENTATION_DATE && start <= WINDOW_END;
}

function groupByMonth(events: typeof schoolEvents) {
  const map = new Map<string, typeof schoolEvents>();
  for (const e of events) {
    const [, m, y] = e.date.split('.');
    const key = `${y}-${m}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(e);
  }
  return map;
}

const monthNames = ['', 'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

const uniqueSubjects = [...new Set(schoolEvents.map((e) => e.subject).filter(Boolean))] as string[];

const filterOptions = [
  { value: '', label: 'Alle Termine' },
  { value: '__klassenarbeit', label: 'Klassenarbeiten' },
  { value: '__schulveranstaltung', label: 'Schulveranstaltungen' },
  { value: '__ausflug', label: 'Ausflüge' },
  { value: '__eltern', label: 'Elternevents' },
  { value: '__feiertag', label: 'Ferien / Feiertage' },
  ...uniqueSubjects.map((s) => ({ value: s, label: `Fach: ${s}` })),
];

export default function TerminePage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return schoolEvents.filter((e) => {
      const matchesSearch =
        !q ||
        e.title.toLowerCase().includes(q) ||
        (e.subject?.toLowerCase().includes(q) ?? false) ||
        (e.description?.toLowerCase().includes(q) ?? false) ||
        categoryConfig[e.category].label.toLowerCase().includes(q);

      const matchesFilter =
        !filter ||
        (filter.startsWith('__') ? e.category === filter.slice(2) : e.subject === filter);

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  const grouped = groupByMonth(filtered);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Termine</h1>
        <p className="text-sm text-gray-500 mt-0.5">Schuljahr 2026/27 · Klasse 10A</p>
      </div>

      {/* Suche + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Suche nach Terminen, Fächern, Beschreibung…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-school-accent focus:ring-2 focus:ring-blue-100 transition-colors"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-school-accent focus:ring-2 focus:ring-blue-100 transition-colors sm:w-52"
        >
          {filterOptions.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Ergebnisse */}
      {grouped.size === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <CalendarDays className="h-10 w-10 text-gray-300 mb-3" />
          <p className="text-sm font-medium text-gray-500">Keine Termine gefunden</p>
          <p className="text-xs text-gray-400 mt-1">Suche oder Filter anpassen</p>
        </div>
      ) : (
        <div className="space-y-8">
          {[...grouped.entries()].map(([key, events]) => {
            const [year, month] = key.split('-');
            return (
              <div key={key}>
                <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {monthNames[parseInt(month)]} {year}
                </h2>
                <div className="space-y-2">
                  {events.map((event) => {
                    const cfg = categoryConfig[event.category];
                    const Icon = cfg.icon;
                    const inWindow = isInWindow(event);
                    const isMultiDay = event.endDate && event.endDate !== event.date;
                    return (
                      <div
                        key={event.id}
                        className={`bg-white rounded-xl border border-gray-200 border-l-4 ${cfg.border} px-5 py-4 ${inWindow ? 'shadow-sm ring-1 ring-school-primary/10' : ''}`}
                      >
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                          <div className="flex items-start gap-3 min-w-0">
                            <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${cfg.text}`} />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-sm font-semibold text-gray-900">{event.title}</p>
                                {inWindow && (
                                  <span className="rounded-full bg-school-primary/10 text-school-primary text-xs px-2 py-0.5 font-medium">
                                    nächste 8 Wochen
                                  </span>
                                )}
                              </div>
                              {event.subject && (
                                <p className="text-xs text-gray-500 mt-0.5">Fach: {event.subject}</p>
                              )}
                              {event.description && (
                                <p className="text-xs text-gray-400 mt-1">{event.description}</p>
                              )}
                              {event.createdBy && (
                                <p className="text-xs text-gray-300 mt-1">Eingetragen von: {event.createdBy}</p>
                              )}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-bold text-gray-700">
                              {event.date}{isMultiDay ? ` – ${event.endDate}` : ''}
                            </p>
                            <span className={`inline-block mt-1 text-xs font-medium ${cfg.text}`}>
                              {cfg.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

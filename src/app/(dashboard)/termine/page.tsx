import { schoolEvents } from '@/lib/mockData';
import type { EventCategory } from '@/types';
import { CalendarDays, BookOpen, Star, Bus, Users, Palmtree } from 'lucide-react';

const categoryConfig: Record<EventCategory, { label: string; bg: string; border: string; text: string; icon: React.ElementType }> = {
  klassenarbeit:      { label: 'Klassenarbeit',      bg: 'bg-red-50',    border: 'border-l-red-400',    text: 'text-red-700',    icon: BookOpen },
  schulveranstaltung: { label: 'Schulveranstaltung', bg: 'bg-violet-50', border: 'border-l-violet-400', text: 'text-violet-700', icon: Star },
  ausflug:            { label: 'Ausflug',             bg: 'bg-cyan-50',   border: 'border-l-cyan-400',   text: 'text-cyan-700',   icon: Bus },
  eltern:             { label: 'Eltern',              bg: 'bg-amber-50',  border: 'border-l-amber-400',  text: 'text-amber-700',  icon: Users },
  feiertag:           { label: 'Ferien / Feiertag',   bg: 'bg-green-50',  border: 'border-l-green-400',  text: 'text-green-700',  icon: Palmtree },
};

// Präsentationsdatum: 22.09.2026 — Anzeigefenster: +8 Wochen = 17.11.2026
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

export default function TerminePage() {
  const grouped = groupByMonth(schoolEvents);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Termine</h1>
        <p className="text-sm text-gray-500 mt-0.5">Schuljahr 2026/27 · Klasse 10A</p>
      </div>

      {/* Hinweis-Banner */}
      <div className="flex items-start gap-3 rounded-lg bg-school-primary/5 border border-school-primary/20 px-4 py-3">
        <CalendarDays className="h-4 w-4 text-school-primary shrink-0 mt-0.5" />
        <p className="text-sm text-school-primary">
          <span className="font-semibold">Nächste 8 Wochen</span> (22.09. – 17.11.2026) sind farblich hervorgehoben.
          Das vollständige Schuljahr ist unten aufgeführt.
        </p>
      </div>

      {/* Legende */}
      <div className="flex flex-wrap gap-2">
        {(Object.entries(categoryConfig) as [EventCategory, typeof categoryConfig[EventCategory]][]).map(([, cfg]) => {
          const Icon = cfg.icon;
          return (
            <span key={cfg.label} className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${cfg.bg} ${cfg.text}`}>
              <Icon className="h-3 w-3" />
              {cfg.label}
            </span>
          );
        })}
      </div>

      {/* Month Sections */}
      <div className="space-y-8">
        {[...grouped.entries()].map(([key, events]) => {
          const [year, month] = key.split('-');
          return (
            <div key={key}>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
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
                      className={`rounded-xl border-l-4 ${cfg.border} ${cfg.bg} px-5 py-4 ${inWindow ? 'ring-2 ring-school-primary/20 shadow-sm' : 'opacity-75'}`}
                    >
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="flex items-start gap-3 min-w-0">
                          <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${cfg.text}`} />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className={`text-sm font-semibold ${cfg.text}`}>{event.title}</p>
                              {inWindow && (
                                <span className="rounded-full bg-school-primary text-white text-xs px-2 py-0.5 font-medium">
                                  nächste 8 Wochen
                                </span>
                              )}
                            </div>
                            {event.subject && (
                              <p className="text-xs text-gray-500 mt-0.5">Fach: {event.subject}</p>
                            )}
                            {event.description && (
                              <p className="text-xs text-gray-500 mt-1">{event.description}</p>
                            )}
                            {event.createdBy && (
                              <p className="text-xs text-gray-400 mt-1">Eingetragen von: {event.createdBy}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className={`text-sm font-bold ${cfg.text}`}>
                            {event.date}{isMultiDay ? ` – ${event.endDate}` : ''}
                          </p>
                          <span className={`inline-block mt-1 rounded-full px-2 py-0.5 text-xs font-medium ${cfg.bg} ${cfg.text}`}>
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
    </div>
  );
}

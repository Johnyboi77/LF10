'use client';

import { useState } from 'react';
import { lessons, periods, weeklyChanges } from '@/lib/mockData';
import type { Lesson } from '@/types';
import { CalendarDays, Calendar } from 'lucide-react';

const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr'] as const;
const dayLabels: Record<string, string> = {
  Mo: 'Montag', Di: 'Dienstag', Mi: 'Mittwoch', Do: 'Donnerstag', Fr: 'Freitag',
};

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  blue:    { bg: 'bg-blue-50',    border: 'border-l-blue-400',    text: 'text-blue-900',    badge: 'bg-blue-100 text-blue-700' },
  emerald: { bg: 'bg-emerald-50', border: 'border-l-emerald-400', text: 'text-emerald-900', badge: 'bg-emerald-100 text-emerald-700' },
  violet:  { bg: 'bg-violet-50',  border: 'border-l-violet-400',  text: 'text-violet-900',  badge: 'bg-violet-100 text-violet-700' },
  amber:   { bg: 'bg-amber-50',   border: 'border-l-amber-400',   text: 'text-amber-900',   badge: 'bg-amber-100 text-amber-700' },
  rose:    { bg: 'bg-rose-50',    border: 'border-l-rose-400',    text: 'text-rose-900',    badge: 'bg-rose-100 text-rose-700' },
  cyan:    { bg: 'bg-cyan-50',    border: 'border-l-cyan-400',    text: 'text-cyan-900',    badge: 'bg-cyan-100 text-cyan-700' },
  orange:  { bg: 'bg-orange-50',  border: 'border-l-orange-400',  text: 'text-orange-900',  badge: 'bg-orange-100 text-orange-700' },
  pink:    { bg: 'bg-pink-50',    border: 'border-l-pink-400',    text: 'text-pink-900',    badge: 'bg-pink-100 text-pink-700' },
};

function getLesson(day: string, period: number): Lesson | undefined {
  return lessons.find((l) => l.day === day && l.period === period);
}

export default function StundenplanPage() {
  const [showLive, setShowLive] = useState(true);

  function getChange(day: string, period: number) {
    return weeklyChanges.find((c) => c.day === day && c.period === period);
  }

  function renderCell(day: string, period: number) {
    const lesson = getLesson(day, period);
    const change = showLive ? getChange(day, period) : undefined;

    if (!lesson) {
      return (
        <div className="h-full flex items-center justify-center">
          <span className="text-xs text-gray-300">–</span>
        </div>
      );
    }

    if (change?.type === 'entfall') {
      return (
        <div className="rounded-lg border-l-4 border-l-red-400 bg-red-50 px-2 py-1.5 h-full">
          <div className="text-xs font-bold text-red-700 line-through opacity-60">{lesson.subject}</div>
          <div className="text-xs font-semibold text-red-700 mt-0.5">Entfall</div>
          {change.note && <div className="text-xs text-red-500 mt-0.5 leading-tight">{change.note}</div>}
        </div>
      );
    }

    if (change?.type === 'vertretung') {
      const colors = colorMap[lesson.color];
      return (
        <div className={`rounded-lg border-l-4 ${colors.border} ${colors.bg} px-2 py-1.5 h-full relative`}>
          <div className={`text-xs font-bold ${colors.text}`}>{lesson.subject}</div>
          <div className="text-xs text-amber-700 font-medium mt-0.5">
            ↕ {change.substitute}
          </div>
          <div className="text-xs text-gray-400">{change.newRoom ?? lesson.room}</div>
          <span className="absolute top-1 right-1 rounded text-xs bg-amber-100 text-amber-700 px-1 font-medium">V</span>
        </div>
      );
    }

    const colors = colorMap[lesson.color];
    return (
      <div className={`rounded-lg border-l-4 ${colors.border} ${colors.bg} px-2 py-1.5 h-full`}>
        <div className={`text-xs font-bold ${colors.text}`}>{lesson.subject}</div>
        <div className="text-xs text-gray-500 mt-0.5">{lesson.teacher}</div>
        <div className="text-xs text-gray-400">{lesson.room}</div>
      </div>
    );
  }

  function renderMobileCell(lesson: Lesson | undefined, day: string, period: number) {
    const change = showLive ? getChange(day, period) : undefined;
    const p = periods.find((pr) => pr.period === period);

    if (!lesson) return null;

    if (change?.type === 'entfall') {
      return (
        <div key={period} className="flex items-center gap-3 px-4 py-3">
          <div className="text-right w-14 shrink-0">
            <div className="text-xs font-medium text-gray-600">{period}. Std</div>
            <div className="text-xs text-gray-400">{p?.startTime}</div>
          </div>
          <div className="rounded border-l-4 border-l-red-400 bg-red-50 px-2 py-1.5 flex-1">
            <div className="text-sm font-semibold text-red-600 line-through opacity-60">{lesson.subject}</div>
            <div className="text-xs font-semibold text-red-600">Entfall{change.note ? ` · ${change.note}` : ''}</div>
          </div>
        </div>
      );
    }

    if (change?.type === 'vertretung') {
      const colors = colorMap[lesson.color];
      return (
        <div key={period} className="flex items-center gap-3 px-4 py-3">
          <div className="text-right w-14 shrink-0">
            <div className="text-xs font-medium text-gray-600">{period}. Std</div>
            <div className="text-xs text-gray-400">{p?.startTime}</div>
          </div>
          <div className={`rounded border-l-4 ${colors.border} ${colors.bg} px-2 py-1.5 flex-1`}>
            <div className={`text-sm font-semibold ${colors.text}`}>{lesson.subject}</div>
            <div className="text-xs text-amber-700 font-medium">Vertretung: {change.substitute}</div>
            <div className="text-xs text-gray-500">{change.newRoom ?? lesson.room}</div>
          </div>
        </div>
      );
    }

    const colors = colorMap[lesson.color];
    return (
      <div key={period} className="flex items-center gap-3 px-4 py-3">
        <div className="text-right w-14 shrink-0">
          <div className="text-xs font-medium text-gray-600">{period}. Std</div>
          <div className="text-xs text-gray-400">{p?.startTime}</div>
        </div>
        <div className={`rounded border-l-4 ${colors.border} ${colors.bg} px-2 py-1.5 flex-1`}>
          <div className={`text-sm font-semibold ${colors.text}`}>{lesson.subject}</div>
          <div className="text-xs text-gray-500">{lesson.teacher} · {lesson.room}</div>
        </div>
      </div>
    );
  }

  const changeCount = weeklyChanges.length;

  return (
    <div className="space-y-4">
      {/* Header + Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Stundenplan</h1>
          <p className="text-sm text-gray-500 mt-0.5">Klasse 10A · Schuljahr 2024/25</p>
        </div>

        {/* Toggle */}
        <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white p-1 self-start sm:self-auto">
          <button
            onClick={() => setShowLive(true)}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              showLive
                ? 'bg-school-primary text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <CalendarDays className="h-4 w-4" />
            Aktuelle Woche
            {showLive && changeCount > 0 && (
              <span className="ml-1 rounded-full bg-white/20 px-1.5 py-0.5 text-xs font-bold">
                {changeCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setShowLive(false)}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              !showLive
                ? 'bg-school-primary text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Calendar className="h-4 w-4" />
            Regulärer Plan
          </button>
        </div>
      </div>

      {/* Live-Hinweis */}
      {showLive && changeCount > 0 && (
        <div className="flex flex-wrap gap-3 rounded-lg bg-amber-50 border border-amber-200 px-4 py-2.5 text-sm text-amber-800">
          <span className="font-semibold">Änderungen diese Woche:</span>
          {weeklyChanges.map((c, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className={`inline-flex h-5 w-5 items-center justify-center rounded text-xs font-bold ${
                c.type === 'entfall' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {c.type === 'entfall' ? '!' : 'V'}
              </span>
              {dayLabels[c.day]}, {c.period}. Std. – {c.type === 'entfall' ? 'Entfall' : `Vertretung (${c.substitute})`}
              {i < weeklyChanges.length - 1 ? ' ·' : ''}
            </span>
          ))}
        </div>
      )}

      {/* Desktop Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto hidden md:block">
        <table className="w-full border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-28">Zeit</th>
              {days.map((day) => {
                const hasChange = showLive && weeklyChanges.some((c) => c.day === day);
                return (
                  <th key={day} className={`px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider ${
                    hasChange ? 'text-amber-600' : 'text-gray-500'
                  }`}>
                    {dayLabels[day]}
                    {hasChange && <span className="ml-1 text-amber-500">•</span>}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {periods.map((period, idx) => (
              <tr key={period.period} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                <td className="px-4 py-2 border-b border-gray-100">
                  <div className="text-xs font-semibold text-gray-700">{period.period}. Stunde</div>
                  <div className="text-xs text-gray-400">{period.startTime}–{period.endTime}</div>
                </td>
                {days.map((day) => (
                  <td key={day} className="px-2 py-2 border-b border-gray-100 min-w-[120px]">
                    {renderCell(day, period.period)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: Day Cards */}
      <div className="md:hidden space-y-4">
        {days.map((day) => {
          const dayLessons = lessons.filter((l) => l.day === day).sort((a, b) => a.period - b.period);
          const hasChange = showLive && weeklyChanges.some((c) => c.day === day);
          return (
            <div key={day} className={`bg-white rounded-xl border shadow-sm ${hasChange ? 'border-amber-300' : 'border-gray-200'}`}>
              <div className={`px-4 py-3 border-b ${hasChange ? 'border-amber-100 bg-amber-50/50' : 'border-gray-100'}`}>
                <h3 className={`text-sm font-semibold ${hasChange ? 'text-amber-800' : 'text-gray-800'}`}>
                  {dayLabels[day]}{hasChange && ' ·'}
                  {hasChange && <span className="ml-1 text-xs font-normal text-amber-600">Änderungen</span>}
                </h3>
              </div>
              <div className="divide-y divide-gray-50">
                {dayLessons.length === 0 ? (
                  <p className="px-4 py-3 text-sm text-gray-400">Kein Unterricht</p>
                ) : (
                  dayLessons.map((lesson) => renderMobileCell(lesson, day, lesson.period))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legende */}
      <div className="flex flex-wrap gap-2">
        {Object.entries({
          Mathematik: 'blue', Deutsch: 'emerald', Englisch: 'violet',
          Physik: 'amber', Geschichte: 'rose', Informatik: 'cyan',
          Sport: 'orange', Kunst: 'pink',
        }).map(([subject, color]) => (
          <span key={subject} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${colorMap[color].badge}`}>
            {subject}
          </span>
        ))}
        {showLive && (
          <>
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium bg-red-100 text-red-700">
              Entfall
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium bg-amber-100 text-amber-700">
              V Vertretung
            </span>
          </>
        )}
      </div>
    </div>
  );
}

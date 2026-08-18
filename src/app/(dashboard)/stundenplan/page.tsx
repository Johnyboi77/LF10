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
  red:     { bg: 'bg-red-50',     border: 'border-l-red-400',     text: 'text-red-900',     badge: 'bg-red-100 text-red-700' },
  yellow:  { bg: 'bg-yellow-50',  border: 'border-l-yellow-400',  text: 'text-yellow-900',  badge: 'bg-yellow-100 text-yellow-700' },
  emerald: { bg: 'bg-emerald-50', border: 'border-l-emerald-400', text: 'text-emerald-900', badge: 'bg-emerald-100 text-emerald-700' },
  orange:  { bg: 'bg-orange-50',  border: 'border-l-orange-400',  text: 'text-orange-900',  badge: 'bg-orange-100 text-orange-700' },
  cyan:    { bg: 'bg-cyan-50',    border: 'border-l-cyan-400',    text: 'text-cyan-900',    badge: 'bg-cyan-100 text-cyan-700' },
  violet:  { bg: 'bg-violet-50',  border: 'border-l-violet-400',  text: 'text-violet-900',  badge: 'bg-violet-100 text-violet-700' },
  stone:   { bg: 'bg-stone-50',   border: 'border-l-stone-400',   text: 'text-stone-900',   badge: 'bg-stone-100 text-stone-700' },
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
      return (
        <div className="rounded-lg border-l-4 border-l-yellow-400 bg-yellow-50 px-2 py-1.5 h-full relative">
          <div className="text-xs font-bold text-yellow-900 line-through opacity-50">{lesson.subject}</div>
          {change.substitute && <div className="text-xs font-semibold text-yellow-800 mt-0.5">↕ {change.substitute}</div>}
          {change.newRoom && change.newRoom !== lesson.room && <div className="text-xs text-yellow-700">→ {change.newRoom}</div>}
          <span className="absolute top-1 right-1 rounded text-xs bg-yellow-200 text-yellow-800 px-1 font-bold">V</span>
        </div>
      );
    }

    // Aktuelle Woche: reguläre Stunden grau, damit Änderungen auffallen
    if (showLive) {
      return (
        <div className="rounded-lg border-l-4 border-l-gray-200 bg-gray-50 px-2 py-1.5 h-full">
          <div className="text-xs font-semibold text-gray-500">{lesson.subject}</div>
          <div className="text-xs text-gray-400 mt-0.5">{lesson.teacher}</div>
          <div className="text-xs text-gray-400">{lesson.room}</div>
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
      return (
        <div key={period} className="flex items-center gap-3 px-4 py-3">
          <div className="text-right w-14 shrink-0">
            <div className="text-xs font-medium text-gray-600">{period}. Std</div>
            <div className="text-xs text-gray-400">{p?.startTime}</div>
          </div>
          <div className="rounded border-l-4 border-l-yellow-400 bg-yellow-50 px-2 py-1.5 flex-1">
            <div className="text-sm font-semibold text-yellow-900 line-through opacity-50">{lesson.subject}</div>
            {change.substitute && <div className="text-xs text-yellow-800 font-semibold">↕ {change.substitute}</div>}
            {change.newRoom && change.newRoom !== lesson.room && <div className="text-xs text-yellow-700">→ {change.newRoom}</div>}
          </div>
        </div>
      );
    }

    if (showLive) {
      return (
        <div key={period} className="flex items-center gap-3 px-4 py-3">
          <div className="text-right w-14 shrink-0">
            <div className="text-xs font-medium text-gray-500">{period}. Std</div>
            <div className="text-xs text-gray-400">{p?.startTime}</div>
          </div>
          <div className="rounded border-l-4 border-l-gray-200 bg-gray-50 px-2 py-1.5 flex-1">
            <div className="text-sm font-medium text-gray-500">{lesson.subject}</div>
            <div className="text-xs text-gray-400">{lesson.teacher} · {lesson.room}</div>
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

  return (
    <div className="space-y-4">
      {/* Header + Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Stundenplan</h1>
          <p className="text-sm text-gray-500 mt-0.5">Klasse 10A · Schuljahr 2026/27</p>
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

      {/* Legende — nur in Aktuelle Woche */}
      {showLive && (
        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded border-l-2 border-l-red-400 bg-red-50 inline-block" />
            Entfall
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded border-l-2 border-l-yellow-400 bg-yellow-50 inline-block" />
            Vertretung
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded border-l-2 border-l-gray-200 bg-gray-50 inline-block" />
            Reguläre Stunde
          </span>
        </div>
      )}

    </div>
  );
}

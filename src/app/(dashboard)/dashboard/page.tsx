'use client';

import { useState, useEffect } from 'react';
import { Bell, BookOpen, ClipboardList, Calendar } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { lessons, periods, assignments, notifications, grades } from '@/lib/mockData';

const dayNames: Record<string, string> = { Mo: 'Montag', Di: 'Dienstag', Mi: 'Mittwoch', Do: 'Donnerstag', Fr: 'Freitag' };
const dayKeys = ['Mo', 'Di', 'Mi', 'Do', 'Fr'] as const;

const subjectBg: Record<string, string> = {
  blue: 'bg-blue-50 border-blue-200 text-blue-800',
  emerald: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  violet: 'bg-violet-50 border-violet-200 text-violet-800',
  amber: 'bg-amber-50 border-amber-200 text-amber-800',
  rose: 'bg-rose-50 border-rose-200 text-rose-800',
  cyan: 'bg-cyan-50 border-cyan-200 text-cyan-800',
  orange: 'bg-orange-50 border-orange-200 text-orange-800',
  pink: 'bg-pink-50 border-pink-200 text-pink-800',
};

export default function DashboardPage() {
  const [greeting, setGreeting] = useState('Guten Tag');
  const [dateStr, setDateStr] = useState('');
  const [todayKey, setTodayKey] = useState<string>('Mo');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Guten Morgen');
    else if (hour < 18) setGreeting('Guten Nachmittag');
    else setGreeting('Guten Abend');

    const jsDay = new Date().getDay();
    setTodayKey(dayKeys[jsDay - 1] ?? 'Mo');
    setDateStr(
      new Date().toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    );
  }, []);

  const todayLessons = lessons
    .filter((l) => l.day === todayKey)
    .sort((a, b) => a.period - b.period);

  const upcomingAssignments = assignments
    .filter((a) => a.status === 'ausstehend')
    .slice(0, 4);

  const recentGrades = grades.slice(0, 4);

  const notifList = notifications.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{greeting}, Jonas!</h1>
        <p className="text-sm text-gray-500 mt-0.5">{dateStr}</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {/* Tagesplan */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-school-primary" />
              <h2 className="text-sm font-semibold text-gray-800">
                Heute · {dayNames[todayKey] ?? 'Wochenende'}
              </h2>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {todayLessons.length === 0 ? (
              <p className="px-6 py-4 text-sm text-gray-500">Kein Unterricht heute.</p>
            ) : (
              <ul className="divide-y divide-gray-50">
                {todayLessons.map((lesson) => {
                  const period = periods.find((p) => p.period === lesson.period);
                  return (
                    <li key={`${lesson.day}-${lesson.period}`} className="flex items-center gap-3 px-6 py-3">
                      <div className="text-right w-16 shrink-0">
                        <p className="text-xs font-medium text-gray-600">{lesson.period}. Std.</p>
                        <p className="text-xs text-gray-400">{period?.startTime}</p>
                      </div>
                      <div className={`rounded-lg border px-2 py-1 text-xs font-semibold shrink-0 ${subjectBg[lesson.color]}`}>
                        {lesson.subjectShort}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{lesson.subject}</p>
                        <p className="text-xs text-gray-500">{lesson.teacher} · {lesson.room}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Anstehende Abgaben */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-school-primary" />
              <h2 className="text-sm font-semibold text-gray-800">Anstehende Abgaben</h2>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y divide-gray-50">
              {upcomingAssignments.map((a) => (
                <li key={a.id} className="flex items-start gap-3 px-6 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{a.title}</p>
                    <p className="text-xs text-gray-500">{a.subject}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-xs text-amber-700 font-medium">{a.dueDate}</p>
                    <Badge variant="warning">ausstehend</Badge>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Aktuelle Noten */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-school-primary" />
              <h2 className="text-sm font-semibold text-gray-800">Aktuelle Noten</h2>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y divide-gray-50">
              {recentGrades.map((g, i) => (
                <li key={i} className="flex items-center justify-between px-6 py-3">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{g.subject}</p>
                    <p className="text-xs text-gray-500">{g.halbjahr}. Halbjahr</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {g.grades.map((grade, j) => (
                      <span key={j} className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
                        {grade}
                      </span>
                    ))}
                    <span className="text-sm font-bold text-school-primary">Ø {g.average}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Benachrichtigungen */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-school-primary" />
              <h2 className="text-sm font-semibold text-gray-800">Benachrichtigungen</h2>
              <Badge variant="info" className="ml-auto">{notifList.length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y divide-gray-50">
              {notifList.map((n) => {
                const variant = n.type === 'success' ? 'success' : n.type === 'warning' ? 'warning' : 'info';
                return (
                  <li key={n.id} className="px-6 py-3">
                    <div className="flex items-start gap-2">
                      <Badge variant={variant} className="mt-0.5 shrink-0">{n.type === 'warning' ? '!' : 'i'}</Badge>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800">{n.title}</p>
                        <p className="text-xs text-gray-500 line-clamp-2">{n.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.date}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

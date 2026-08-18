'use client';

import { useState } from 'react';
import { grades } from '@/lib/mockData';
import { getGradeColor } from '@/lib/utils';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { GraduationCap } from 'lucide-react';

function gradeLabel(n: number) {
  const map: Record<number, string> = { 1: 'sehr gut', 2: 'gut', 3: 'befriedigend', 4: 'ausreichend', 5: 'mangelhaft', 6: 'ungenügend' };
  return map[n] ?? '';
}

const JAHRGAENGE = [5, 6, 7, 8, 9, 10];

export default function NotenPage() {
  const [selectedJahrgang, setSelectedJahrgang] = useState(10);

  const half1 = grades.filter((g) => g.jahrgang === selectedJahrgang && g.halbjahr === 1);
  const half2 = grades.filter((g) => g.jahrgang === selectedJahrgang && g.halbjahr === 2);

  const halfAvg = (rows: typeof grades) => {
    if (rows.length === 0) return null;
    const avgs = rows.map((r) => r.average);
    return (avgs.reduce((a, b) => a + b, 0) / avgs.length).toFixed(2);
  };

  const avg1 = halfAvg(half1);
  const avg2 = halfAvg(half2);

  function GradeTable({ rows, label, avg }: { rows: typeof grades; label: string; avg: string | null }) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-800">{label}</h2>
            {avg && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Gesamtdurchschnitt:</span>
                <span className={`text-lg font-bold ${getGradeColor(parseFloat(avg))}`}>{avg}</span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {rows.length === 0 ? (
            <p className="px-6 py-6 text-sm text-gray-400 text-center">Keine Noten für dieses Halbjahr vorhanden.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Fach</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Note 1</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Note 2</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Note 3</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Note 4</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Durchschnitt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {rows.map((row) => (
                    <tr key={row.subject} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-3 text-sm font-medium text-gray-800">{row.subject}</td>
                      {row.grades.map((g, i) => (
                        <td key={i} className="px-4 py-3 text-center">
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700 mx-auto">
                            {g}
                          </span>
                        </td>
                      ))}
                      {Array.from({ length: 4 - row.grades.length }).map((_, i) => (
                        <td key={`empty-${i}`} className="px-4 py-3 text-center text-gray-300 text-sm">–</td>
                      ))}
                      <td className="px-6 py-3 text-center">
                        <div className="flex flex-col items-center">
                          <span className={`text-base font-bold ${getGradeColor(row.average)}`}>
                            {row.average.toFixed(2)}
                          </span>
                          <span className="text-xs text-gray-400">{gradeLabel(Math.round(row.average))}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notenübersicht</h1>
          <p className="text-sm text-gray-500 mt-0.5">Jonas Frey · Klasse {selectedJahrgang}A</p>
        </div>

        {/* Jahrgang Dropdown */}
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4 text-gray-400 shrink-0" />
          <label htmlFor="jahrgang" className="text-sm font-medium text-gray-600 whitespace-nowrap">
            Jahrgang:
          </label>
          <select
            id="jahrgang"
            value={selectedJahrgang}
            onChange={(e) => setSelectedJahrgang(Number(e.target.value))}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-800 outline-none focus:border-school-accent focus:ring-2 focus:ring-blue-100"
          >
            {JAHRGAENGE.map((j) => (
              <option key={j} value={j}>
                {j}. Klasse{j === 10 ? ' (aktuell)' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      <GradeTable rows={half1} label="1. Halbjahr" avg={avg1} />
      <GradeTable rows={half2} label="2. Halbjahr" avg={avg2} />

      {/* Legende */}
      <div className="flex flex-wrap gap-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-green-200" /> Sehr gut (≤ 2,0)</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-amber-200" /> Befriedigend (≤ 3,0)</span>
        <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-full bg-red-200" /> Mangelhaft (&gt; 3,0)</span>
      </div>
    </div>
  );
}

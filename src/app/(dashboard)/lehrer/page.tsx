'use client';

import { useState } from 'react';
import { Search, Mail } from 'lucide-react';
import { teachers } from '@/lib/mockData';
import { Card } from '@/components/ui/Card';

export default function LehrerPage() {
  const [query, setQuery] = useState('');

  const filtered = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.subject.toLowerCase().includes(query.toLowerCase()) ||
      t.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Lehrkräfte</h1>
        <p className="text-sm text-gray-500 mt-0.5">{teachers.length} Lehrkräfte · Schuljahr 2024/25</p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Suchen nach Name, Fach oder E-Mail…"
          className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-school-accent focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Desktop Table */}
      <Card className="hidden md:block overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Fach</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">E-Mail-Adresse</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((teacher) => (
                <tr key={teacher.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-3 text-sm font-medium text-gray-700">{teacher.subject}</td>
                  <td className="px-6 py-3 text-sm text-gray-900 font-medium">{teacher.name}</td>
                  <td className="px-6 py-3">
                    <a
                      href={`mailto:${teacher.email}`}
                      className="inline-flex items-center gap-1.5 text-sm text-school-accent hover:text-school-primary transition-colors"
                    >
                      <Mail className="h-3.5 w-3.5" />
                      {teacher.email}
                    </a>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-8 text-center text-sm text-gray-400">
                    Keine Lehrkräfte gefunden.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filtered.map((teacher) => (
          <Card key={teacher.id} className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-school-primary/10 text-school-primary text-sm font-bold shrink-0">
                {teacher.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{teacher.name}</p>
                <p className="text-xs text-gray-500">{teacher.subject}</p>
                <a
                  href={`mailto:${teacher.email}`}
                  className="inline-flex items-center gap-1 text-xs text-school-accent hover:text-school-primary mt-1"
                >
                  <Mail className="h-3 w-3" />
                  {teacher.email}
                </a>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

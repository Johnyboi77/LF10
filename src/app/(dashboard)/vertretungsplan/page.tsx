import { vertretungsplan } from '@/lib/mockData';
import { getSubjectColor } from '@/lib/utils';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { AlertTriangle } from 'lucide-react';

export default function VertretungsplanPage() {
  const now = new Date();
  const weekStr = `${now.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })} – ${new Date(now.getTime() + 4 * 86400000).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Vertretungsplan</h1>
        <p className="text-sm text-gray-500 mt-0.5">Klasse 10A · Woche {weekStr}</p>
      </div>

      {/* Stand-Banner */}
      <div className="flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
        <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
        <p className="text-sm text-amber-800">
          <span className="font-semibold">Stand:</span>{' '}
          {now.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}, {now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} Uhr — Änderungen vorbehalten.
        </p>
      </div>

      {/* Desktop Table */}
      <Card className="hidden md:block overflow-hidden">
        <CardHeader>
          <h2 className="text-sm font-semibold text-gray-800">{vertretungsplan.length} Einträge diese Woche</h2>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Datum</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Std.</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Fach</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Ausfall</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Vertretung</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Raum</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Hinweis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {vertretungsplan.map((entry) => {
                  const roomChanged = entry.newRoom !== entry.originalRoom;
                  const isEntfall = entry.substitute === 'Entfall';
                  const sc = getSubjectColor(entry.subject);
                  return (
                    <tr key={entry.id} className={`hover:bg-gray-50/50 transition-colors ${isEntfall ? 'bg-red-50/30' : ''}`}>
                      <td className={`px-4 py-3 text-sm font-medium text-gray-700 whitespace-nowrap border-l-4 ${sc.border}`}>{entry.date}</td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-700">
                          {entry.period}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${getSubjectColor(entry.subject).bg} ${getSubjectColor(entry.subject).text}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${getSubjectColor(entry.subject).dot}`} />
                          {entry.subject}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 line-through">{entry.originalTeacher}</td>
                      <td className="px-4 py-3">
                        {isEntfall ? (
                          <Badge variant="danger">Entfall</Badge>
                        ) : (
                          <span className="text-sm font-medium text-gray-800">{entry.substitute}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {roomChanged ? (
                          <div className="flex flex-col items-center">
                            <span className="text-xs text-gray-400 line-through">{entry.originalRoom}</span>
                            <span className="text-xs font-semibold text-green-700">{entry.newRoom}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-600">{entry.originalRoom}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">{entry.note ?? '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {vertretungsplan.map((entry) => {
          const isEntfall = entry.substitute === 'Entfall';
          const roomChanged = entry.newRoom !== entry.originalRoom;
          const sc2 = getSubjectColor(entry.subject);
          return (
            <Card key={entry.id} className={`p-4 border-l-4 ${sc2.border} ${isEntfall ? 'border-red-200 bg-red-50/30' : ''}`}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{entry.date}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-xs text-gray-500">{entry.period}. Stunde ·</span>
                    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${getSubjectColor(entry.subject).bg} ${getSubjectColor(entry.subject).text}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${getSubjectColor(entry.subject).dot}`} />
                      {entry.subject}
                    </span>
                  </div>
                </div>
                {isEntfall ? <Badge variant="danger">Entfall</Badge> : <Badge variant="warning">Vertretung</Badge>}
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                <p><span className="font-medium">Ausfall:</span> <span className="line-through">{entry.originalTeacher}</span></p>
                {!isEntfall && <p><span className="font-medium">Vertretung:</span> {entry.substitute}</p>}
                {roomChanged && <p><span className="font-medium">Raum:</span> <span className="line-through">{entry.originalRoom}</span> → <span className="text-green-700 font-medium">{entry.newRoom}</span></p>}
                {entry.note && <p><span className="font-medium">Hinweis:</span> {entry.note}</p>}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

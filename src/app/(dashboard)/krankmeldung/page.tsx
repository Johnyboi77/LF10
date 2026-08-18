'use client';

import { useState } from 'react';
import { HeartPulse, Info } from 'lucide-react';
import Toast from '@/components/ui/Toast';

const REASONS = [
  { value: 'krankheit', label: 'Krankheit' },
  { value: 'arzt', label: 'Arzttermin' },
  { value: 'familie', label: 'Familiärer Grund' },
  { value: 'sonstiges', label: 'Sonstiges' },
];

export default function KrankmeldungPage() {
  const today = new Date().toISOString().split('T')[0];
  const [von, setVon] = useState(today);
  const [bis, setBis] = useState(today);
  const [grund, setGrund] = useState('');
  const [erziehungsberechtigter, setErziehungsberechtigter] = useState('');
  const [hinweis, setHinweis] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!von) e.von = 'Bitte ein Startdatum angeben.';
    if (!bis) e.bis = 'Bitte ein Enddatum angeben.';
    if (von && bis && bis < von) e.bis = 'Das Enddatum muss nach dem Startdatum liegen.';
    if (!grund) e.grund = 'Bitte einen Grund auswählen.';
    if (!erziehungsberechtigter.trim()) e.erziehungsberechtigter = 'Bitte den Namen des Erziehungsberechtigten angeben.';
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setToast(true);
    // Reset form
    setVon(today);
    setBis(today);
    setGrund('');
    setErziehungsberechtigter('');
    setHinweis('');
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Krankmeldung</h1>
        <p className="text-sm text-gray-500 mt-0.5">Melde deine Abwesenheit direkt über das Portal.</p>
      </div>

      {/* Info Box */}
      <div className="flex gap-3 rounded-lg bg-blue-50 border border-blue-100 p-4">
        <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700">
          Die Krankmeldung muss spätestens bis <strong>8:00 Uhr</strong> des betreffenden Tages eingereicht werden. Bei längerer Krankheit (ab 3 Tagen) ist ein ärztliches Attest erforderlich.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <HeartPulse className="h-5 w-5 text-school-primary" />
          <h2 className="text-base font-semibold text-gray-800">Krankmeldung einreichen</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="von" className="block text-sm font-medium text-gray-700 mb-1">
                Von <span className="text-red-500">*</span>
              </label>
              <input
                id="von"
                type="date"
                value={von}
                min={today}
                onChange={(e) => setVon(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-school-accent focus:ring-2 focus:ring-blue-100"
              />
              {errors.von && <p className="mt-1 text-xs text-red-600">{errors.von}</p>}
            </div>
            <div>
              <label htmlFor="bis" className="block text-sm font-medium text-gray-700 mb-1">
                Bis <span className="text-red-500">*</span>
              </label>
              <input
                id="bis"
                type="date"
                value={bis}
                min={von || today}
                onChange={(e) => setBis(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-school-accent focus:ring-2 focus:ring-blue-100"
              />
              {errors.bis && <p className="mt-1 text-xs text-red-600">{errors.bis}</p>}
            </div>
          </div>

          {/* Grund */}
          <div>
            <label htmlFor="grund" className="block text-sm font-medium text-gray-700 mb-1">
              Grund der Abwesenheit <span className="text-red-500">*</span>
            </label>
            <select
              id="grund"
              value={grund}
              onChange={(e) => setGrund(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-school-accent focus:ring-2 focus:ring-blue-100 bg-white"
            >
              <option value="" disabled>Bitte auswählen…</option>
              {REASONS.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
            {errors.grund && <p className="mt-1 text-xs text-red-600">{errors.grund}</p>}
          </div>

          {/* Schüler (readonly) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name des Schülers / der Schülerin
            </label>
            <input
              type="text"
              value="Jonas Frey"
              readOnly
              className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* Erziehungsberechtigter */}
          <div>
            <label htmlFor="erziehung" className="block text-sm font-medium text-gray-700 mb-1">
              Name des Erziehungsberechtigten <span className="text-red-500">*</span>
            </label>
            <input
              id="erziehung"
              type="text"
              value={erziehungsberechtigter}
              onChange={(e) => setErziehungsberechtigter(e.target.value)}
              placeholder="z. B. Thomas Frey"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-school-accent focus:ring-2 focus:ring-blue-100"
            />
            {errors.erziehungsberechtigter && (
              <p className="mt-1 text-xs text-red-600">{errors.erziehungsberechtigter}</p>
            )}
          </div>

          {/* Hinweis */}
          <div>
            <label htmlFor="hinweis" className="block text-sm font-medium text-gray-700 mb-1">
              Zusätzliche Hinweise <span className="text-xs text-gray-400">(optional)</span>
            </label>
            <textarea
              id="hinweis"
              value={hinweis}
              onChange={(e) => setHinweis(e.target.value)}
              placeholder="z. B. Attest wird nachgereicht…"
              rows={3}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-school-accent focus:ring-2 focus:ring-blue-100 resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-school-primary py-2.5 text-sm font-semibold text-white hover:bg-school-primary-light transition-colors disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
            >
              {submitting ? 'Wird übermittelt…' : 'Krankmeldung absenden'}
            </button>
            <p className="text-xs text-gray-400 text-center mt-2">
              * Pflichtfelder · Diese Meldung wird nur zu Demonstrationszwecken angezeigt.
            </p>
          </div>
        </form>
      </div>

      {toast && (
        <Toast
          message="Krankmeldung erfolgreich übermittelt. Die Schule wurde benachrichtigt."
          type="success"
          onClose={() => setToast(false)}
        />
      )}
    </div>
  );
}

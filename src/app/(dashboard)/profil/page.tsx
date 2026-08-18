'use client';

import { useState } from 'react';
import { Eye, EyeOff, User, Lock, CheckCircle, School, MapPin, Phone, Mail } from 'lucide-react';
import { student } from '@/lib/mockData';
import Toast from '@/components/ui/Toast';

const CURRENT_PASSWORD = 'Schule24';

export default function ProfilPage() {
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const e: Record<string, string> = {};
    if (!currentPw) e.current = 'Bitte aktuelles Passwort eingeben.';
    else if (currentPw !== CURRENT_PASSWORD) e.current = 'Das aktuelle Passwort ist falsch.';
    if (!newPw) e.new = 'Bitte neues Passwort eingeben.';
    else if (newPw.length < 8) e.new = 'Das Passwort muss mindestens 8 Zeichen lang sein.';
    if (!confirmPw) e.confirm = 'Bitte Passwort bestätigen.';
    else if (newPw !== confirmPw) e.confirm = 'Die Passwörter stimmen nicht überein.';
    return e;
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500));
    setSubmitting(false);
    setToast(true);
    setCurrentPw('');
    setNewPw('');
    setConfirmPw('');
  }

  function PasswordInput({
    id, label, value, onChange, show, onToggle, error,
  }: {
    id: string; label: string; value: string;
    onChange: (v: string) => void; show: boolean;
    onToggle: () => void; error?: string;
  }) {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <div className="relative">
          <input
            id={id}
            type={show ? 'text' : 'password'}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm text-gray-900 placeholder-gray-400 outline-none focus:ring-2 transition-colors ${
              error
                ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                : 'border-gray-300 focus:border-school-accent focus:ring-blue-100'
            }`}
          />
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mein Profil</h1>
        <p className="text-sm text-gray-500 mt-0.5">Persönliche Daten und Sicherheitseinstellungen</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profil Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <User className="h-5 w-5 text-school-primary" />
            <h2 className="text-base font-semibold text-gray-800">Schülerdaten</h2>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-school-primary text-white text-2xl font-bold mb-3">
              JF
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{student.name}</h3>
            <p className="text-sm text-gray-500">Klasse {student.klasse}</p>
          </div>

          <div className="space-y-3">
            {[
              { label: 'Schüler-ID', value: student.id },
              { label: 'Klasse', value: student.klasse },
              { label: 'Geburtsdatum', value: student.geburtsdatum },
              { label: 'Einschreibedatum', value: student.einschreibedatum },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-500">{label}</span>
                <span className="text-sm font-medium text-gray-800">{value}</span>
              </div>
            ))}
          </div>

          <button
            disabled
            className="mt-5 w-full rounded-lg border border-gray-200 bg-gray-50 py-2 text-sm text-gray-400 cursor-not-allowed"
            title="Änderungen nur über das Schulsekretariat möglich"
          >
            Daten bearbeiten (nur Sekretariat)
          </button>
        </div>

        {/* Passwort Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-6">
            <Lock className="h-5 w-5 text-school-primary" />
            <h2 className="text-base font-semibold text-gray-800">Passwort ändern</h2>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <PasswordInput
              id="current"
              label="Aktuelles Passwort"
              value={currentPw}
              onChange={setCurrentPw}
              show={showCurrent}
              onToggle={() => setShowCurrent((v) => !v)}
              error={errors.current}
            />
            <PasswordInput
              id="new"
              label="Neues Passwort"
              value={newPw}
              onChange={setNewPw}
              show={showNew}
              onToggle={() => setShowNew((v) => !v)}
              error={errors.new}
            />
            <PasswordInput
              id="confirm"
              label="Passwort bestätigen"
              value={confirmPw}
              onChange={setConfirmPw}
              show={showConfirm}
              onToggle={() => setShowConfirm((v) => !v)}
              error={errors.confirm}
            />

            {/* Password rules */}
            <ul className="space-y-1">
              <li className={`flex items-center gap-2 text-xs ${newPw.length >= 8 ? 'text-green-600' : 'text-gray-400'}`}>
                <CheckCircle className="h-3.5 w-3.5" />
                Mindestens 8 Zeichen
              </li>
            </ul>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg bg-school-primary py-2.5 text-sm font-semibold text-white hover:bg-school-primary-light transition-colors disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed mt-2"
            >
              {submitting ? 'Wird gespeichert…' : 'Passwort ändern'}
            </button>

            <p className="text-xs text-center text-gray-400">
              Demo-Modus — Passwort wird nicht tatsächlich geändert.
            </p>
          </form>
        </div>
      </div>

      {/* Schulinformationen */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-5">
          <School className="h-5 w-5 text-school-primary" />
          <h2 className="text-base font-semibold text-gray-800">Schulinformationen</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-start gap-3">
            <School className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Schule</p>
              <p className="text-sm font-medium text-gray-800">Pestalozzi-Realschule</p>
              <p className="text-xs text-gray-500">Musterstadt</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Adresse</p>
              <p className="text-sm font-medium text-gray-800">Schulstraße 12</p>
              <p className="text-xs text-gray-500">12345 Musterstadt</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Telefon</p>
              <p className="text-sm font-medium text-gray-800">(01234) 56789-0</p>
              <p className="text-xs text-gray-500">Mo–Fr 7:30–15:00</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="h-4 w-4 text-gray-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-gray-500 mb-0.5">E-Mail</p>
              <p className="text-sm font-medium text-gray-800">info@pestalozzi-rs.de</p>
              <p className="text-xs text-gray-500">Sekretariat</p>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message="Passwort erfolgreich geändert! (Demo — keine echte Änderung)"
          type="success"
          onClose={() => setToast(false)}
        />
      )}
    </div>
  );
}

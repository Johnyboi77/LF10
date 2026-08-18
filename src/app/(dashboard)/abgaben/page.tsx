'use client';

import { useState } from 'react';
import { Upload, CheckCircle, Clock, Award, FileText } from 'lucide-react';
import { assignments } from '@/lib/mockData';
import { getSubjectColor } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import Toast from '@/components/ui/Toast';
import type { Assignment, AssignmentStatus } from '@/types';

const subjects = [...new Set(assignments.map((a) => a.subject))];

function StatusBadge({ status }: { status: AssignmentStatus }) {
  if (status === 'bewertet') return <Badge variant="success">bewertet</Badge>;
  if (status === 'eingereicht') return <Badge variant="info">eingereicht</Badge>;
  return <Badge variant="warning">ausstehend</Badge>;
}

function StatusIcon({ status }: { status: AssignmentStatus }) {
  if (status === 'bewertet') return <CheckCircle className="h-4 w-4 text-green-500" />;
  if (status === 'eingereicht') return <Clock className="h-4 w-4 text-blue-500" />;
  return <Upload className="h-4 w-4 text-amber-500" />;
}

export default function AbgabenPage() {
  const [toast, setToast] = useState<string | null>(null);
  const [openSubjects, setOpenSubjects] = useState<Set<string>>(new Set([subjects[0]]));

  function toggleSubject(subject: string) {
    setOpenSubjects((prev) => {
      const next = new Set(prev);
      if (next.has(subject)) next.delete(subject);
      else next.add(subject);
      return next;
    });
  }

  function showDemo() {
    setToast('Demo-Funktion — in der echten App würde hier eine Aktion ausgeführt.');
  }

  const pending = assignments.filter((a) => a.status === 'ausstehend').length;
  const submitted = assignments.filter((a) => a.status === 'eingereicht').length;
  const graded = assignments.filter((a) => a.status === 'bewertet').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Digitale Abgaben</h1>
        <p className="text-sm text-gray-500 mt-0.5">Alle Aufgaben und Abgaben im Überblick</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">{pending}</p>
          <p className="text-xs text-gray-500 mt-1">Ausstehend</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{submitted}</p>
          <p className="text-xs text-gray-500 mt-1">Eingereicht</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{graded}</p>
          <p className="text-xs text-gray-500 mt-1">Bewertet</p>
        </div>
      </div>

      {/* Subject Sections */}
      <div className="space-y-3">
        {subjects.map((subject) => {
          const subjectAssignments = assignments.filter((a) => a.subject === subject);
          const isOpen = openSubjects.has(subject);
          const pendingCount = subjectAssignments.filter((a) => a.status === 'ausstehend').length;

          const sc = getSubjectColor(subject);
          return (
            <div key={subject} className={`bg-white rounded-xl border border-gray-200 border-l-4 ${sc.border} shadow-sm overflow-hidden`}>
              <button
                onClick={() => toggleSubject(subject)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className={`h-5 w-5 ${sc.text}`} />
                  <span className="text-sm font-semibold text-gray-800">{subject}</span>
                  <span className="text-xs text-gray-400">{subjectAssignments.length} Aufgaben</span>
                  {pendingCount > 0 && (
                    <Badge variant="warning">{pendingCount} offen</Badge>
                  )}
                </div>
                <svg
                  className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="border-t border-gray-100 divide-y divide-gray-50">
                  {subjectAssignments.map((assignment: Assignment) => (
                    <div key={assignment.id} className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <StatusIcon status={assignment.status} />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 flex-wrap">
                            <div>
                              <p className="text-sm font-medium text-gray-800">{assignment.title}</p>
                              {assignment.description && (
                                <p className="text-xs text-gray-500 mt-0.5">{assignment.description}</p>
                              )}
                              <p className="text-xs text-gray-400 mt-1">Abgabe: {assignment.dueDate}</p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              {assignment.status === 'bewertet' && assignment.grade && (
                                <div className="flex items-center gap-1 rounded-full bg-green-50 border border-green-200 px-2.5 py-1">
                                  <Award className="h-3.5 w-3.5 text-green-600" />
                                  <span className="text-xs font-bold text-green-700">Note: {assignment.grade}</span>
                                </div>
                              )}
                              <StatusBadge status={assignment.status} />
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="mt-3 flex gap-2">
                            {assignment.status === 'ausstehend' && (
                              <button
                                onClick={showDemo}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                              >
                                <Upload className="h-3.5 w-3.5" />
                                Datei hochladen
                              </button>
                            )}
                            {assignment.status === 'eingereicht' && (
                              <button
                                onClick={showDemo}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                              >
                                Zurückziehen
                              </button>
                            )}
                            {assignment.status === 'bewertet' && (
                              <button
                                onClick={showDemo}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                              >
                                Feedback anzeigen
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} type="info" />}
    </div>
  );
}

export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function getGradeColor(avg: number): string {
  if (avg <= 2.0) return 'text-green-600';
  if (avg <= 3.0) return 'text-amber-600';
  return 'text-red-600';
}

export function getGradeBg(avg: number): string {
  if (avg <= 2.0) return 'bg-green-50 text-green-700';
  if (avg <= 3.0) return 'bg-amber-50 text-amber-700';
  return 'bg-red-50 text-red-700';
}

const SUBJECT_COLORS: Record<string, { border: string; text: string; bg: string; dot: string }> = {
  'Mathematik': { border: 'border-l-blue-400',    text: 'text-blue-700',    bg: 'bg-blue-50',    dot: 'bg-blue-400' },
  'Deutsch':    { border: 'border-l-red-400',     text: 'text-red-700',     bg: 'bg-red-50',     dot: 'bg-red-400' },
  'Englisch':   { border: 'border-l-yellow-400',  text: 'text-yellow-700',  bg: 'bg-yellow-50',  dot: 'bg-yellow-400' },
  'Physik':     { border: 'border-l-emerald-400', text: 'text-emerald-700', bg: 'bg-emerald-50', dot: 'bg-emerald-400' },
  'Geschichte': { border: 'border-l-orange-400',  text: 'text-orange-700',  bg: 'bg-orange-50',  dot: 'bg-orange-400' },
  'Informatik': { border: 'border-l-cyan-400',    text: 'text-cyan-700',    bg: 'bg-cyan-50',    dot: 'bg-cyan-400' },
  'Sport':      { border: 'border-l-violet-400',  text: 'text-violet-700',  bg: 'bg-violet-50',  dot: 'bg-violet-400' },
  'Kunst':      { border: 'border-l-stone-400',   text: 'text-stone-700',   bg: 'bg-stone-50',   dot: 'bg-stone-400' },
};

const SUBJECT_COLOR_FALLBACK = { border: 'border-l-gray-300', text: 'text-gray-600', bg: 'bg-gray-50', dot: 'bg-gray-300' };

export function getSubjectColor(subject: string) {
  return SUBJECT_COLORS[subject] ?? SUBJECT_COLOR_FALLBACK;
}

export function gradeLabel(grade: number): string {
  const labels: Record<number, string> = {
    1: 'sehr gut',
    2: 'gut',
    3: 'befriedigend',
    4: 'ausreichend',
    5: 'mangelhaft',
    6: 'ungenügend',
  };
  return labels[grade] ?? '';
}

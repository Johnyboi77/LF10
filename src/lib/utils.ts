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

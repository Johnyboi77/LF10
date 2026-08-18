export interface Student {
  id: string;
  name: string;
  klasse: string;
  einschreibedatum: string;
  geburtsdatum: string;
}

export interface Period {
  period: number;
  startTime: string;
  endTime: string;
}

export interface Lesson {
  day: 'Mo' | 'Di' | 'Mi' | 'Do' | 'Fr';
  period: number;
  subject: string;
  subjectShort: string;
  teacher: string;
  room: string;
  color: string;
}

export interface GradeRow {
  subject: string;
  halbjahr: 1 | 2;
  grades: number[];
  average: number;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  email: string;
}

export interface VertretungsEntry {
  id: string;
  date: string;
  period: number;
  klasse: string;
  originalTeacher: string;
  substitute: string;
  subject: string;
  originalRoom: string;
  newRoom: string;
  note?: string;
}

export type AssignmentStatus = 'ausstehend' | 'eingereicht' | 'bewertet';

export interface Assignment {
  id: string;
  subject: string;
  title: string;
  dueDate: string;
  status: AssignmentStatus;
  grade?: number;
  description?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'info' | 'warning' | 'success';
}

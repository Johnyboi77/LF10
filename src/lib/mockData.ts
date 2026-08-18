import type {
  Student,
  Period,
  Lesson,
  GradeRow,
  Teacher,
  VertretungsEntry,
  Assignment,
  Notification,
  SchoolEvent,
} from '@/types';

export const student: Student = {
  id: 'S2024001',
  name: 'Jonas Frey',
  klasse: '10A',
  einschreibedatum: '01.08.2024',
  geburtsdatum: '15.03.2009',
};

export const periods: Period[] = [
  { period: 1, startTime: '07:45', endTime: '08:30' },
  { period: 2, startTime: '08:30', endTime: '09:15' },
  { period: 3, startTime: '09:30', endTime: '10:15' },
  { period: 4, startTime: '10:15', endTime: '11:00' },
  { period: 5, startTime: '11:15', endTime: '12:00' },
  { period: 6, startTime: '12:00', endTime: '12:45' },
  { period: 7, startTime: '13:30', endTime: '14:15' },
  { period: 8, startTime: '14:15', endTime: '15:00' },
];

export const lessons: Lesson[] = [
  // Montag
  { day: 'Mo', period: 1, subject: 'Mathematik', subjectShort: 'MAT', teacher: 'Frau Weber', room: 'R101', color: 'blue' },
  { day: 'Mo', period: 2, subject: 'Mathematik', subjectShort: 'MAT', teacher: 'Frau Weber', room: 'R101', color: 'blue' },
  { day: 'Mo', period: 3, subject: 'Deutsch', subjectShort: 'DEU', teacher: 'Herr Schneider', room: 'R203', color: 'emerald' },
  { day: 'Mo', period: 4, subject: 'Deutsch', subjectShort: 'DEU', teacher: 'Herr Schneider', room: 'R203', color: 'emerald' },
  { day: 'Mo', period: 5, subject: 'Sport', subjectShort: 'SPO', teacher: 'Herr Koch', room: 'Sporthalle', color: 'orange' },
  { day: 'Mo', period: 6, subject: 'Sport', subjectShort: 'SPO', teacher: 'Herr Koch', room: 'Sporthalle', color: 'orange' },
  // Dienstag
  { day: 'Di', period: 1, subject: 'Englisch', subjectShort: 'ENG', teacher: 'Frau Müller', room: 'R105', color: 'violet' },
  { day: 'Di', period: 2, subject: 'Englisch', subjectShort: 'ENG', teacher: 'Frau Müller', room: 'R105', color: 'violet' },
  { day: 'Di', period: 3, subject: 'Physik', subjectShort: 'PHY', teacher: 'Herr Braun', room: 'R301', color: 'amber' },
  { day: 'Di', period: 4, subject: 'Physik', subjectShort: 'PHY', teacher: 'Herr Braun', room: 'R301', color: 'amber' },
  { day: 'Di', period: 5, subject: 'Geschichte', subjectShort: 'GES', teacher: 'Frau Fischer', room: 'R208', color: 'rose' },
  { day: 'Di', period: 6, subject: 'Geschichte', subjectShort: 'GES', teacher: 'Frau Fischer', room: 'R208', color: 'rose' },
  { day: 'Di', period: 7, subject: 'Informatik', subjectShort: 'INF', teacher: 'Herr Richter', room: 'PC-Raum', color: 'cyan' },
  { day: 'Di', period: 8, subject: 'Informatik', subjectShort: 'INF', teacher: 'Herr Richter', room: 'PC-Raum', color: 'cyan' },
  // Mittwoch
  { day: 'Mi', period: 1, subject: 'Mathematik', subjectShort: 'MAT', teacher: 'Frau Weber', room: 'R101', color: 'blue' },
  { day: 'Mi', period: 2, subject: 'Mathematik', subjectShort: 'MAT', teacher: 'Frau Weber', room: 'R101', color: 'blue' },
  { day: 'Mi', period: 3, subject: 'Deutsch', subjectShort: 'DEU', teacher: 'Herr Schneider', room: 'R203', color: 'emerald' },
  { day: 'Mi', period: 4, subject: 'Kunst', subjectShort: 'KUN', teacher: 'Frau Lange', room: 'Kunstraum', color: 'pink' },
  { day: 'Mi', period: 5, subject: 'Englisch', subjectShort: 'ENG', teacher: 'Frau Müller', room: 'R105', color: 'violet' },
  { day: 'Mi', period: 6, subject: 'Englisch', subjectShort: 'ENG', teacher: 'Frau Müller', room: 'R105', color: 'violet' },
  // Donnerstag
  { day: 'Do', period: 1, subject: 'Physik', subjectShort: 'PHY', teacher: 'Herr Braun', room: 'R301', color: 'amber' },
  { day: 'Do', period: 2, subject: 'Geschichte', subjectShort: 'GES', teacher: 'Frau Fischer', room: 'R208', color: 'rose' },
  { day: 'Do', period: 3, subject: 'Informatik', subjectShort: 'INF', teacher: 'Herr Richter', room: 'PC-Raum', color: 'cyan' },
  { day: 'Do', period: 4, subject: 'Informatik', subjectShort: 'INF', teacher: 'Herr Richter', room: 'PC-Raum', color: 'cyan' },
  { day: 'Do', period: 5, subject: 'Mathematik', subjectShort: 'MAT', teacher: 'Frau Weber', room: 'R101', color: 'blue' },
  { day: 'Do', period: 6, subject: 'Deutsch', subjectShort: 'DEU', teacher: 'Herr Schneider', room: 'R203', color: 'emerald' },
  { day: 'Do', period: 7, subject: 'Kunst', subjectShort: 'KUN', teacher: 'Frau Lange', room: 'Kunstraum', color: 'pink' },
  // Freitag
  { day: 'Fr', period: 1, subject: 'Englisch', subjectShort: 'ENG', teacher: 'Frau Müller', room: 'R105', color: 'violet' },
  { day: 'Fr', period: 2, subject: 'Geschichte', subjectShort: 'GES', teacher: 'Frau Fischer', room: 'R208', color: 'rose' },
  { day: 'Fr', period: 3, subject: 'Sport', subjectShort: 'SPO', teacher: 'Herr Koch', room: 'Sporthalle', color: 'orange' },
  { day: 'Fr', period: 4, subject: 'Sport', subjectShort: 'SPO', teacher: 'Herr Koch', room: 'Sporthalle', color: 'orange' },
  { day: 'Fr', period: 5, subject: 'Physik', subjectShort: 'PHY', teacher: 'Herr Braun', room: 'R301', color: 'amber' },
];

export const grades: GradeRow[] = [
  // Klasse 5
  { subject: 'Mathematik', jahrgang: 5, halbjahr: 1, grades: [2, 2, 3, 2], average: 2.25 },
  { subject: 'Deutsch', jahrgang: 5, halbjahr: 1, grades: [3, 2, 3, 3], average: 2.75 },
  { subject: 'Englisch', jahrgang: 5, halbjahr: 1, grades: [2, 3, 2, 2], average: 2.25 },
  { subject: 'Sachkunde', jahrgang: 5, halbjahr: 1, grades: [2, 2, 2, 1], average: 1.75 },
  { subject: 'Mathematik', jahrgang: 5, halbjahr: 2, grades: [2, 3, 2, 2], average: 2.25 },
  { subject: 'Deutsch', jahrgang: 5, halbjahr: 2, grades: [2, 2, 3, 2], average: 2.25 },
  { subject: 'Englisch', jahrgang: 5, halbjahr: 2, grades: [2, 2, 1, 2], average: 1.75 },
  { subject: 'Sachkunde', jahrgang: 5, halbjahr: 2, grades: [1, 2, 2, 2], average: 1.75 },
  // Klasse 6
  { subject: 'Mathematik', jahrgang: 6, halbjahr: 1, grades: [3, 2, 3, 3], average: 2.75 },
  { subject: 'Deutsch', jahrgang: 6, halbjahr: 1, grades: [2, 2, 2, 3], average: 2.25 },
  { subject: 'Englisch', jahrgang: 6, halbjahr: 1, grades: [2, 1, 2, 2], average: 1.75 },
  { subject: 'Geschichte', jahrgang: 6, halbjahr: 1, grades: [2, 2, 3, 2], average: 2.25 },
  { subject: 'Mathematik', jahrgang: 6, halbjahr: 2, grades: [2, 3, 3, 2], average: 2.5 },
  { subject: 'Deutsch', jahrgang: 6, halbjahr: 2, grades: [2, 2, 3, 2], average: 2.25 },
  { subject: 'Englisch', jahrgang: 6, halbjahr: 2, grades: [1, 2, 1, 2], average: 1.5 },
  { subject: 'Geschichte', jahrgang: 6, halbjahr: 2, grades: [2, 2, 2, 3], average: 2.25 },
  // Klasse 7
  { subject: 'Mathematik', jahrgang: 7, halbjahr: 1, grades: [3, 3, 2, 3], average: 2.75 },
  { subject: 'Deutsch', jahrgang: 7, halbjahr: 1, grades: [2, 3, 2, 2], average: 2.25 },
  { subject: 'Englisch', jahrgang: 7, halbjahr: 1, grades: [1, 2, 1, 1], average: 1.25 },
  { subject: 'Physik', jahrgang: 7, halbjahr: 1, grades: [3, 4, 3, 3], average: 3.25 },
  { subject: 'Geschichte', jahrgang: 7, halbjahr: 1, grades: [2, 2, 2, 2], average: 2.0 },
  { subject: 'Mathematik', jahrgang: 7, halbjahr: 2, grades: [3, 2, 3, 3], average: 2.75 },
  { subject: 'Deutsch', jahrgang: 7, halbjahr: 2, grades: [2, 2, 2, 3], average: 2.25 },
  { subject: 'Englisch', jahrgang: 7, halbjahr: 2, grades: [1, 1, 2, 1], average: 1.25 },
  { subject: 'Physik', jahrgang: 7, halbjahr: 2, grades: [3, 3, 4, 3], average: 3.25 },
  { subject: 'Geschichte', jahrgang: 7, halbjahr: 2, grades: [2, 2, 1, 2], average: 1.75 },
  // Klasse 8
  { subject: 'Mathematik', jahrgang: 8, halbjahr: 1, grades: [2, 3, 2, 2], average: 2.25 },
  { subject: 'Deutsch', jahrgang: 8, halbjahr: 1, grades: [2, 2, 1, 2], average: 1.75 },
  { subject: 'Englisch', jahrgang: 8, halbjahr: 1, grades: [1, 1, 2, 1], average: 1.25 },
  { subject: 'Physik', jahrgang: 8, halbjahr: 1, grades: [3, 3, 3, 4], average: 3.25 },
  { subject: 'Geschichte', jahrgang: 8, halbjahr: 1, grades: [2, 2, 2, 3], average: 2.25 },
  { subject: 'Informatik', jahrgang: 8, halbjahr: 1, grades: [1, 2, 1, 1], average: 1.25 },
  { subject: 'Mathematik', jahrgang: 8, halbjahr: 2, grades: [2, 2, 3, 2], average: 2.25 },
  { subject: 'Deutsch', jahrgang: 8, halbjahr: 2, grades: [2, 1, 2, 2], average: 1.75 },
  { subject: 'Englisch', jahrgang: 8, halbjahr: 2, grades: [1, 2, 1, 1], average: 1.25 },
  { subject: 'Physik', jahrgang: 8, halbjahr: 2, grades: [3, 4, 3, 3], average: 3.25 },
  { subject: 'Geschichte', jahrgang: 8, halbjahr: 2, grades: [2, 3, 2, 2], average: 2.25 },
  { subject: 'Informatik', jahrgang: 8, halbjahr: 2, grades: [1, 1, 2, 1], average: 1.25 },
  // Klasse 9
  { subject: 'Mathematik', jahrgang: 9, halbjahr: 1, grades: [2, 2, 3, 2], average: 2.25 },
  { subject: 'Deutsch', jahrgang: 9, halbjahr: 1, grades: [2, 1, 2, 2], average: 1.75 },
  { subject: 'Englisch', jahrgang: 9, halbjahr: 1, grades: [1, 1, 2, 1], average: 1.25 },
  { subject: 'Physik', jahrgang: 9, halbjahr: 1, grades: [3, 3, 4, 3], average: 3.25 },
  { subject: 'Geschichte', jahrgang: 9, halbjahr: 1, grades: [2, 2, 2, 2], average: 2.0 },
  { subject: 'Informatik', jahrgang: 9, halbjahr: 1, grades: [1, 2, 1, 1], average: 1.25 },
  { subject: 'Mathematik', jahrgang: 9, halbjahr: 2, grades: [3, 2, 2, 3], average: 2.5 },
  { subject: 'Deutsch', jahrgang: 9, halbjahr: 2, grades: [2, 2, 1, 2], average: 1.75 },
  { subject: 'Englisch', jahrgang: 9, halbjahr: 2, grades: [1, 2, 1, 1], average: 1.25 },
  { subject: 'Physik', jahrgang: 9, halbjahr: 2, grades: [3, 3, 3, 4], average: 3.25 },
  { subject: 'Geschichte', jahrgang: 9, halbjahr: 2, grades: [2, 2, 3, 2], average: 2.25 },
  { subject: 'Informatik', jahrgang: 9, halbjahr: 2, grades: [1, 1, 1, 2], average: 1.25 },
  // Klasse 10 (aktuell)
  { subject: 'Mathematik', jahrgang: 10, halbjahr: 1, grades: [2, 3, 2, 3], average: 2.5 },
  { subject: 'Deutsch', jahrgang: 10, halbjahr: 1, grades: [2, 1, 2, 2], average: 1.75 },
  { subject: 'Englisch', jahrgang: 10, halbjahr: 1, grades: [1, 2, 1, 1], average: 1.25 },
  { subject: 'Physik', jahrgang: 10, halbjahr: 1, grades: [3, 4, 3, 3], average: 3.25 },
  { subject: 'Geschichte', jahrgang: 10, halbjahr: 1, grades: [2, 2, 3, 2], average: 2.25 },
  { subject: 'Informatik', jahrgang: 10, halbjahr: 1, grades: [1, 1, 2, 1], average: 1.25 },
  { subject: 'Mathematik', jahrgang: 10, halbjahr: 2, grades: [3, 2, 3, 2], average: 2.5 },
  { subject: 'Deutsch', jahrgang: 10, halbjahr: 2, grades: [2, 2, 1, 2], average: 1.75 },
  { subject: 'Englisch', jahrgang: 10, halbjahr: 2, grades: [1, 1, 2, 1], average: 1.25 },
  { subject: 'Physik', jahrgang: 10, halbjahr: 2, grades: [3, 3, 4, 3], average: 3.25 },
  { subject: 'Geschichte', jahrgang: 10, halbjahr: 2, grades: [2, 3, 2, 2], average: 2.25 },
  { subject: 'Informatik', jahrgang: 10, halbjahr: 2, grades: [1, 2, 1, 1], average: 1.25 },
];

// Aktuelle Wochenstundenplanänderungen
export const weeklyChanges: import('@/types').WeeklyChange[] = [
  // Montag: Frau Weber krankgeschrieben → Mathematik Std. 1+2 Entfall
  { day: 'Mo', period: 1, type: 'entfall', note: 'Frau Weber krankgeschrieben' },
  { day: 'Mo', period: 2, type: 'entfall', note: 'Frau Weber krankgeschrieben' },
  // Donnerstag: Std. 5 Entfall, Std. 7 Vertretung
  { day: 'Do', period: 5, type: 'entfall', note: 'Selbstlernzeit (Bibliothek)' },
  { day: 'Do', period: 7, type: 'vertretung', substitute: 'Herr Wolf', newRoom: 'R205', note: 'Raumwechsel' },
];

export const teachers: Teacher[] = [
  { id: 't1', name: 'Frau Weber', subject: 'Mathematik', email: 'web@pestalozzi-schule.de' },
  { id: 't2', name: 'Herr Schneider', subject: 'Deutsch', email: 'sch@pestalozzi-schule.de' },
  { id: 't3', name: 'Frau Müller', subject: 'Englisch', email: 'mue@pestalozzi-schule.de' },
  { id: 't4', name: 'Herr Braun', subject: 'Physik', email: 'bra@pestalozzi-schule.de' },
  { id: 't5', name: 'Frau Fischer', subject: 'Geschichte', email: 'fis@pestalozzi-schule.de' },
  { id: 't6', name: 'Herr Richter', subject: 'Informatik', email: 'ric@pestalozzi-schule.de' },
  { id: 't7', name: 'Herr Koch', subject: 'Sport', email: 'koc@pestalozzi-schule.de' },
  { id: 't8', name: 'Frau Lange', subject: 'Kunst', email: 'lan@pestalozzi-schule.de' },
  { id: 't9', name: 'Herr Wolf', subject: 'Biologie', email: 'wol@pestalozzi-schule.de' },
  { id: 't10', name: 'Frau Hartmann', subject: 'Chemie', email: 'har@pestalozzi-schule.de' },
];

export const vertretungsplan: VertretungsEntry[] = [
  {
    id: 'v1',
    date: 'Mo, 22.09.2026',
    period: 3,
    klasse: '10A',
    originalTeacher: 'Herr Schneider',
    substitute: 'Frau Hartmann',
    subject: 'Deutsch',
    originalRoom: 'R203',
    newRoom: 'R210',
    note: 'Raumwechsel beachten',
  },
  {
    id: 'v2',
    date: 'Di, 23.09.2026',
    period: 5,
    klasse: '10A',
    originalTeacher: 'Frau Fischer',
    substitute: 'Entfall',
    subject: 'Geschichte',
    originalRoom: 'R208',
    newRoom: 'R208',
    note: 'Stunde entfällt – bitte selbstständig arbeiten',
  },
  {
    id: 'v3',
    date: 'Mi, 24.09.2026',
    period: 1,
    klasse: '10A',
    originalTeacher: 'Frau Weber',
    substitute: 'Herr Wolf',
    subject: 'Mathematik',
    originalRoom: 'R101',
    newRoom: 'R101',
  },
  {
    id: 'v4',
    date: 'Do, 25.09.2026',
    period: 2,
    klasse: '10A',
    originalTeacher: 'Frau Fischer',
    substitute: 'Herr Schneider',
    subject: 'Geschichte',
    originalRoom: 'R208',
    newRoom: 'R204',
    note: 'Raumwechsel',
  },
  {
    id: 'v5',
    date: 'Fr, 26.09.2026',
    period: 5,
    klasse: '10A',
    originalTeacher: 'Herr Braun',
    substitute: 'Frau Hartmann',
    subject: 'Physik',
    originalRoom: 'R301',
    newRoom: 'R301',
  },
];

export const assignments: Assignment[] = [
  // Mathematik
  { id: 'a1', subject: 'Mathematik', title: 'Übungsblatt Quadratische Gleichungen', dueDate: '26.09.2026', status: 'ausstehend', description: 'Aufgaben 1–15 aus Kapitel 4' },
  { id: 'a2', subject: 'Mathematik', title: 'Hausaufgabe Geometrie', dueDate: '19.09.2026', status: 'bewertet', grade: 2 },
  { id: 'a3', subject: 'Mathematik', title: 'Klassenarbeitsvorbereitung', dueDate: '12.09.2026', status: 'eingereicht' },
  // Deutsch
  { id: 'a4', subject: 'Deutsch', title: 'Aufsatz: Digitale Medien im Alltag', dueDate: '30.09.2026', status: 'ausstehend', description: 'Min. 400 Wörter, Erörterung' },
  { id: 'a5', subject: 'Deutsch', title: 'Lektüre: Der Vorleser – Kapitel 1–5', dueDate: '16.09.2026', status: 'bewertet', grade: 1 },
  { id: 'a6', subject: 'Deutsch', title: 'Grammatik Übungsblatt', dueDate: '09.09.2026', status: 'eingereicht' },
  // Englisch
  { id: 'a7', subject: 'Englisch', title: 'Essay: My Future Career', dueDate: '03.10.2026', status: 'ausstehend', description: '250–300 words, present tenses' },
  { id: 'a8', subject: 'Englisch', title: 'Vocabulary Test Preparation', dueDate: '18.09.2026', status: 'bewertet', grade: 1 },
  { id: 'a9', subject: 'Englisch', title: 'Reading Comprehension', dueDate: '10.09.2026', status: 'eingereicht' },
  // Physik
  { id: 'a10', subject: 'Physik', title: 'Protokoll: Experiment Reibung', dueDate: '25.09.2026', status: 'ausstehend', description: 'Versuchsprotokoll nach Vorlage' },
  { id: 'a11', subject: 'Physik', title: 'Formelblatt Mechanik', dueDate: '15.09.2026', status: 'bewertet', grade: 3 },
  // Geschichte
  { id: 'a12', subject: 'Geschichte', title: 'Referat: Weimarer Republik', dueDate: '07.10.2026', status: 'ausstehend', description: '10 Minuten Präsentation + Handout' },
  { id: 'a13', subject: 'Geschichte', title: 'Quellenanalyse', dueDate: '11.09.2026', status: 'eingereicht' },
  // Informatik
  { id: 'a14', subject: 'Informatik', title: 'LF10-Präsentation: Schülerportal', dueDate: '22.09.2026', status: 'ausstehend', description: 'Demo des entwickelten Schülerportals vor der Klasse' },
  { id: 'a15', subject: 'Informatik', title: 'Pseudocode Übung', dueDate: '17.09.2026', status: 'bewertet', grade: 1 },
  { id: 'a16', subject: 'Informatik', title: 'Datenbankmodell ER-Diagramm', dueDate: '08.09.2026', status: 'eingereicht' },
];

// Alle Termine des Schuljahres 2026/27 — Anzeige: nächste 8 Wochen ab 22.09.2026 (Präsentation letzte Septemberwoche 2026)
export const schoolEvents: SchoolEvent[] = [
  // September 2026
  { id: 'e1', title: 'Klassenarbeit Mathematik', date: '11.09.2026', category: 'klassenarbeit', subject: 'Mathematik', createdBy: 'Frau Weber', description: 'Thema: Quadratische Gleichungen, Kapitel 4' },
  { id: 'e2', title: 'Klassenarbeit Deutsch', date: '17.09.2026', category: 'klassenarbeit', subject: 'Deutsch', createdBy: 'Herr Schneider', description: 'Erörterung, Thema wird am Tag bekannt gegeben' },
  { id: 'e3', title: 'LF10-Präsentation: Schülerportal', date: '22.09.2026', category: 'schulveranstaltung', createdBy: 'Herr Richter', description: 'Vorstellung des digitalen Schülerportals im Rahmen des Lernfelds LF10' },
  { id: 'e4', title: 'Elternsprechtag', date: '25.09.2026', category: 'eltern', createdBy: 'Schulleitung', description: '14:00–18:00 Uhr, Terminbuchung über das Portal' },
  { id: 'e5', title: 'Schulfest', date: '26.09.2026', endDate: '27.09.2026', category: 'schulveranstaltung', createdBy: 'Schulleitung', description: 'Jährliches Schulfest auf dem Schulgelände. Beginn: 10:00 Uhr' },
  // Oktober 2026
  { id: 'e6', title: 'Klassenarbeit Englisch', date: '02.10.2026', category: 'klassenarbeit', subject: 'Englisch', createdBy: 'Frau Müller', description: 'Reading & Writing, Unit 3–5' },
  { id: 'e7', title: 'Ausflug Naturkundemuseum', date: '09.10.2026', category: 'ausflug', createdBy: 'Frau Fischer', description: 'Kosten: 8 € – bitte bis 30.09. beim Klassenlehrer abgeben' },
  { id: 'e8', title: 'Tag der offenen Tür', date: '10.10.2026', category: 'schulveranstaltung', createdBy: 'Schulleitung', description: '10:00–14:00 Uhr, alle Schüler sind als Guides willkommen' },
  { id: 'e9', title: 'Klassenarbeit Physik', date: '16.10.2026', category: 'klassenarbeit', subject: 'Physik', createdBy: 'Herr Braun', description: 'Thema: Mechanik – Reibung und Kräfte' },
  { id: 'e10', title: 'Herbstferien', date: '26.10.2026', endDate: '30.10.2026', category: 'feiertag', description: 'Kein Unterricht' },
  // November 2026
  { id: 'e11', title: 'Projektwoche', date: '09.11.2026', endDate: '13.11.2026', category: 'schulveranstaltung', createdBy: 'Schulleitung', description: 'Thema: Nachhaltigkeit – kein regulärer Unterricht' },
  { id: 'e12', title: 'Klassenarbeit Informatik', date: '20.11.2026', category: 'klassenarbeit', subject: 'Informatik', createdBy: 'Herr Richter', description: 'Thema: Datenbanken und SQL-Grundlagen' },
  { id: 'e13', title: 'Klassenarbeit Geschichte', date: '27.11.2026', category: 'klassenarbeit', subject: 'Geschichte', createdBy: 'Frau Fischer', description: 'Thema: Weimarer Republik' },
];

export const notifications: Notification[] = [
  { id: 'n1', title: 'Elternsprechtag', message: 'Am 25.09.2026 findet der Elternsprechtag von 14:00–18:00 Uhr statt. Terminbuchung ab sofort möglich.', date: '20.09.2026', type: 'info' },
  { id: 'n2', title: 'LF10-Präsentation morgen', message: 'Denk daran: Morgen, 22.09.2026, findet die LF10-Präsentation statt. Viel Erfolg!', date: '21.09.2026', type: 'warning' },
  { id: 'n3', title: 'Schulausflug genehmigt', message: 'Der Ausflug ins Naturkundemuseum am 09.10.2026 wurde genehmigt. Kosten: 8 € (bis 30.09. einreichen).', date: '19.09.2026', type: 'success' },
  { id: 'n4', title: 'Klassenarbeit Mathematik', message: 'Die Klassenarbeit in Mathematik findet am 11.09.2026 statt. Thema: Quadratische Gleichungen.', date: '18.09.2026', type: 'warning' },
  { id: 'n5', title: 'Schulfest 26.–27.09.', message: 'Das Schulfest findet am 26. und 27. September statt. Freiwillige Helfer bitte bei der Schulleitung melden.', date: '17.09.2026', type: 'info' },
];

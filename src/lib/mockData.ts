import type {
  Student,
  Period,
  Lesson,
  GradeRow,
  Teacher,
  VertretungsEntry,
  Assignment,
  Notification,
} from '@/types';

export const student: Student = {
  id: 'S2024001',
  name: 'Max Mustermann',
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
  { day: 'Mo', period: 1, subject: 'Mathematik', subjectShort: 'MAT', teacher: 'Fr. Weber', room: 'R101', color: 'blue' },
  { day: 'Mo', period: 2, subject: 'Mathematik', subjectShort: 'MAT', teacher: 'Fr. Weber', room: 'R101', color: 'blue' },
  { day: 'Mo', period: 3, subject: 'Deutsch', subjectShort: 'DEU', teacher: 'Hr. Schneider', room: 'R203', color: 'emerald' },
  { day: 'Mo', period: 4, subject: 'Deutsch', subjectShort: 'DEU', teacher: 'Hr. Schneider', room: 'R203', color: 'emerald' },
  { day: 'Mo', period: 5, subject: 'Sport', subjectShort: 'SPO', teacher: 'Hr. Koch', room: 'Sporthalle', color: 'orange' },
  { day: 'Mo', period: 6, subject: 'Sport', subjectShort: 'SPO', teacher: 'Hr. Koch', room: 'Sporthalle', color: 'orange' },
  // Dienstag
  { day: 'Di', period: 1, subject: 'Englisch', subjectShort: 'ENG', teacher: 'Fr. Müller', room: 'R105', color: 'violet' },
  { day: 'Di', period: 2, subject: 'Englisch', subjectShort: 'ENG', teacher: 'Fr. Müller', room: 'R105', color: 'violet' },
  { day: 'Di', period: 3, subject: 'Physik', subjectShort: 'PHY', teacher: 'Hr. Braun', room: 'R301', color: 'amber' },
  { day: 'Di', period: 4, subject: 'Physik', subjectShort: 'PHY', teacher: 'Hr. Braun', room: 'R301', color: 'amber' },
  { day: 'Di', period: 5, subject: 'Geschichte', subjectShort: 'GES', teacher: 'Fr. Fischer', room: 'R208', color: 'rose' },
  { day: 'Di', period: 6, subject: 'Geschichte', subjectShort: 'GES', teacher: 'Fr. Fischer', room: 'R208', color: 'rose' },
  { day: 'Di', period: 7, subject: 'Informatik', subjectShort: 'INF', teacher: 'Hr. Richter', room: 'PC-Raum', color: 'cyan' },
  { day: 'Di', period: 8, subject: 'Informatik', subjectShort: 'INF', teacher: 'Hr. Richter', room: 'PC-Raum', color: 'cyan' },
  // Mittwoch
  { day: 'Mi', period: 1, subject: 'Mathematik', subjectShort: 'MAT', teacher: 'Fr. Weber', room: 'R101', color: 'blue' },
  { day: 'Mi', period: 2, subject: 'Mathematik', subjectShort: 'MAT', teacher: 'Fr. Weber', room: 'R101', color: 'blue' },
  { day: 'Mi', period: 3, subject: 'Deutsch', subjectShort: 'DEU', teacher: 'Hr. Schneider', room: 'R203', color: 'emerald' },
  { day: 'Mi', period: 4, subject: 'Kunst', subjectShort: 'KUN', teacher: 'Fr. Lange', room: 'Kunstraum', color: 'pink' },
  { day: 'Mi', period: 5, subject: 'Englisch', subjectShort: 'ENG', teacher: 'Fr. Müller', room: 'R105', color: 'violet' },
  { day: 'Mi', period: 6, subject: 'Englisch', subjectShort: 'ENG', teacher: 'Fr. Müller', room: 'R105', color: 'violet' },
  // Donnerstag
  { day: 'Do', period: 1, subject: 'Physik', subjectShort: 'PHY', teacher: 'Hr. Braun', room: 'R301', color: 'amber' },
  { day: 'Do', period: 2, subject: 'Geschichte', subjectShort: 'GES', teacher: 'Fr. Fischer', room: 'R208', color: 'rose' },
  { day: 'Do', period: 3, subject: 'Informatik', subjectShort: 'INF', teacher: 'Hr. Richter', room: 'PC-Raum', color: 'cyan' },
  { day: 'Do', period: 4, subject: 'Informatik', subjectShort: 'INF', teacher: 'Hr. Richter', room: 'PC-Raum', color: 'cyan' },
  { day: 'Do', period: 5, subject: 'Mathematik', subjectShort: 'MAT', teacher: 'Fr. Weber', room: 'R101', color: 'blue' },
  { day: 'Do', period: 6, subject: 'Deutsch', subjectShort: 'DEU', teacher: 'Hr. Schneider', room: 'R203', color: 'emerald' },
  { day: 'Do', period: 7, subject: 'Kunst', subjectShort: 'KUN', teacher: 'Fr. Lange', room: 'Kunstraum', color: 'pink' },
  // Freitag
  { day: 'Fr', period: 1, subject: 'Englisch', subjectShort: 'ENG', teacher: 'Fr. Müller', room: 'R105', color: 'violet' },
  { day: 'Fr', period: 2, subject: 'Geschichte', subjectShort: 'GES', teacher: 'Fr. Fischer', room: 'R208', color: 'rose' },
  { day: 'Fr', period: 3, subject: 'Sport', subjectShort: 'SPO', teacher: 'Hr. Koch', room: 'Sporthalle', color: 'orange' },
  { day: 'Fr', period: 4, subject: 'Sport', subjectShort: 'SPO', teacher: 'Hr. Koch', room: 'Sporthalle', color: 'orange' },
  { day: 'Fr', period: 5, subject: 'Physik', subjectShort: 'PHY', teacher: 'Hr. Braun', room: 'R301', color: 'amber' },
];

export const grades: GradeRow[] = [
  { subject: 'Mathematik', halbjahr: 1, grades: [2, 3, 2, 3], average: 2.5 },
  { subject: 'Deutsch', halbjahr: 1, grades: [2, 1, 2, 2], average: 1.75 },
  { subject: 'Englisch', halbjahr: 1, grades: [1, 2, 1, 1], average: 1.25 },
  { subject: 'Physik', halbjahr: 1, grades: [3, 4, 3, 3], average: 3.25 },
  { subject: 'Geschichte', halbjahr: 1, grades: [2, 2, 3, 2], average: 2.25 },
  { subject: 'Informatik', halbjahr: 1, grades: [1, 1, 2, 1], average: 1.25 },
  { subject: 'Mathematik', halbjahr: 2, grades: [3, 2, 3, 2], average: 2.5 },
  { subject: 'Deutsch', halbjahr: 2, grades: [2, 2, 1, 2], average: 1.75 },
  { subject: 'Englisch', halbjahr: 2, grades: [1, 1, 2, 1], average: 1.25 },
  { subject: 'Physik', halbjahr: 2, grades: [3, 3, 4, 3], average: 3.25 },
  { subject: 'Geschichte', halbjahr: 2, grades: [2, 3, 2, 2], average: 2.25 },
  { subject: 'Informatik', halbjahr: 2, grades: [1, 2, 1, 1], average: 1.25 },
];

export const teachers: Teacher[] = [
  { id: 't1', name: 'Dr. Petra Weber', subject: 'Mathematik', email: 'p.weber@schule-musterstadt.de' },
  { id: 't2', name: 'Thomas Schneider', subject: 'Deutsch', email: 't.schneider@schule-musterstadt.de' },
  { id: 't3', name: 'Sarah Müller', subject: 'Englisch', email: 's.mueller@schule-musterstadt.de' },
  { id: 't4', name: 'Dr. Klaus Braun', subject: 'Physik', email: 'k.braun@schule-musterstadt.de' },
  { id: 't5', name: 'Anna Fischer', subject: 'Geschichte', email: 'a.fischer@schule-musterstadt.de' },
  { id: 't6', name: 'Michael Richter', subject: 'Informatik', email: 'm.richter@schule-musterstadt.de' },
  { id: 't7', name: 'Jan Koch', subject: 'Sport', email: 'j.koch@schule-musterstadt.de' },
  { id: 't8', name: 'Nina Lange', subject: 'Kunst', email: 'n.lange@schule-musterstadt.de' },
  { id: 't9', name: 'Prof. Karl Wolf', subject: 'Biologie', email: 'k.wolf@schule-musterstadt.de' },
  { id: 't10', name: 'Eva Hartmann', subject: 'Chemie', email: 'e.hartmann@schule-musterstadt.de' },
];

export const vertretungsplan: VertretungsEntry[] = [
  {
    id: 'v1',
    date: 'Mo, 18.08.2025',
    period: 3,
    klasse: '10A',
    originalTeacher: 'Hr. Schneider',
    substitute: 'Fr. Hartmann',
    subject: 'Deutsch',
    originalRoom: 'R203',
    newRoom: 'R210',
    note: 'Raumwechsel beachten',
  },
  {
    id: 'v2',
    date: 'Di, 19.08.2025',
    period: 5,
    klasse: '10A',
    originalTeacher: 'Fr. Fischer',
    substitute: 'Entfall',
    subject: 'Geschichte',
    originalRoom: 'R208',
    newRoom: 'R208',
    note: 'Stunde entfällt – bitte selbstständig arbeiten',
  },
  {
    id: 'v3',
    date: 'Mi, 20.08.2025',
    period: 1,
    klasse: '10A',
    originalTeacher: 'Fr. Weber',
    substitute: 'Hr. Wolf',
    subject: 'Mathematik',
    originalRoom: 'R101',
    newRoom: 'R101',
  },
  {
    id: 'v4',
    date: 'Do, 21.08.2025',
    period: 2,
    klasse: '10A',
    originalTeacher: 'Fr. Fischer',
    substitute: 'Hr. Schneider',
    subject: 'Geschichte',
    originalRoom: 'R208',
    newRoom: 'R204',
    note: 'Raumwechsel',
  },
  {
    id: 'v5',
    date: 'Fr, 22.08.2025',
    period: 5,
    klasse: '10A',
    originalTeacher: 'Hr. Braun',
    substitute: 'Fr. Hartmann',
    subject: 'Physik',
    originalRoom: 'R301',
    newRoom: 'R301',
  },
];

export const assignments: Assignment[] = [
  // Mathematik
  { id: 'a1', subject: 'Mathematik', title: 'Übungsblatt Quadratische Gleichungen', dueDate: '22.08.2025', status: 'ausstehend', description: 'Aufgaben 1–15 aus Kapitel 4' },
  { id: 'a2', subject: 'Mathematik', title: 'Hausaufgabe Geometrie', dueDate: '15.08.2025', status: 'bewertet', grade: 2 },
  { id: 'a3', subject: 'Mathematik', title: 'Klassenarbeitsvorbereitung', dueDate: '10.08.2025', status: 'eingereicht' },
  // Deutsch
  { id: 'a4', subject: 'Deutsch', title: 'Aufsatz: Meine Sommerpläne', dueDate: '25.08.2025', status: 'ausstehend', description: 'Min. 400 Wörter, Erzählung' },
  { id: 'a5', subject: 'Deutsch', title: 'Lektüre: Der Vorleser – Kapitel 1–5', dueDate: '12.08.2025', status: 'bewertet', grade: 1 },
  { id: 'a6', subject: 'Deutsch', title: 'Grammatik Übungsblatt', dueDate: '08.08.2025', status: 'eingereicht' },
  // Englisch
  { id: 'a7', subject: 'Englisch', title: 'Essay: My Future Career', dueDate: '28.08.2025', status: 'ausstehend', description: '250–300 words, present tenses' },
  { id: 'a8', subject: 'Englisch', title: 'Vocabulary Test Preparation', dueDate: '14.08.2025', status: 'bewertet', grade: 1 },
  { id: 'a9', subject: 'Englisch', title: 'Reading Comprehension', dueDate: '07.08.2025', status: 'eingereicht' },
  // Physik
  { id: 'a10', subject: 'Physik', title: 'Protokoll: Experiment Reibung', dueDate: '20.08.2025', status: 'ausstehend', description: 'Versuchsprotokoll nach Vorlage' },
  { id: 'a11', subject: 'Physik', title: 'Formelblatt Mechanik', dueDate: '11.08.2025', status: 'bewertet', grade: 3 },
  // Geschichte
  { id: 'a12', subject: 'Geschichte', title: 'Referat: Weimarer Republik', dueDate: '27.08.2025', status: 'ausstehend', description: '10 Minuten Präsentation + Handout' },
  { id: 'a13', subject: 'Geschichte', title: 'Quellenanalyse', dueDate: '09.08.2025', status: 'eingereicht' },
  // Informatik
  { id: 'a14', subject: 'Informatik', title: 'Python Projekt: Taschenrechner', dueDate: '26.08.2025', status: 'ausstehend', description: 'Implementierung als CLI-App' },
  { id: 'a15', subject: 'Informatik', title: 'Pseudocode Übung', dueDate: '13.08.2025', status: 'bewertet', grade: 1 },
  { id: 'a16', subject: 'Informatik', title: 'Datenbankmodell ER-Diagramm', dueDate: '06.08.2025', status: 'eingereicht' },
];

export const notifications: Notification[] = [
  { id: 'n1', title: 'Elternsprechtag', message: 'Am 05.09.2025 findet der Elternsprechtag von 14:00–18:00 Uhr statt. Terminbuchung ab sofort möglich.', date: '18.08.2025', type: 'info' },
  { id: 'n2', title: 'Achtung: Klassenarbeit', message: 'In Mathematik findet am 29.08.2025 eine Klassenarbeit zu quadratischen Gleichungen statt.', date: '17.08.2025', type: 'warning' },
  { id: 'n3', title: 'Schulausflug genehmigt', message: 'Der Ausflug ins Naturkundemuseum am 12.09.2025 wurde genehmigt. Kosten: 8 € (bis 02.09. einreichen).', date: '16.08.2025', type: 'success' },
  { id: 'n4', title: 'IT-Wartung', message: 'Am Mittwoch, 20.08., sind die PC-Räume bis 10:00 Uhr gesperrt. Informatik-Stunden werden verlegt.', date: '15.08.2025', type: 'warning' },
  { id: 'n5', title: 'Neue Bücher verfügbar', message: 'Die bestellten Mathebücher liegen ab sofort im Sekretariat zur Abholung bereit.', date: '14.08.2025', type: 'info' },
];

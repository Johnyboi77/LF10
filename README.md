# Schülerportal — LF10 Mockup

Demo-Anwendung zur Darstellung des digitalen Einschulungsprozesses einer Schule.
Erstellt im Rahmen des Lernfelds LF10 mit **Next.js 16**, **React 19** und **Tailwind CSS v4**.

> **Hinweis:** Diese Anwendung ist ein reines Mockup zu Demonstrationszwecken.
> Es gibt kein Backend — alle Daten sind hardcodiert und keine Formulareingaben werden gespeichert.

---

## Zugangsdaten

Diese Daten befinden sich im Einschreibebrief:

| Feld | Wert |
|---|---|
| **Schüler-ID** | `S2024001` |
| **Passwort** | `Schule24` |

---

## Seiten

| Route | Beschreibung |
|---|---|
| `/login` | Anmeldeseite mit ID und Passwort |
| `/dashboard` | Übersicht: Tagesplan, Abgaben, Noten, Benachrichtigungen |
| `/stundenplan` | Wochenübersicht Klasse 10A |
| `/noten` | Notenübersicht nach Halbjahr und Fach |
| `/lehrer` | Lehrkräfte mit Suchfunktion |
| `/vertretungsplan` | Vertretungsplan für Klasse 10A |
| `/abgaben` | Digitale Abgaben nach Fach |
| `/krankmeldung` | Krankmeldung per Formular |
| `/termine` | Schultermine (Klassenarbeiten, Veranstaltungen) |
| `/profil` | Schülerprofil und Passwort ändern |

---

## Lokale Entwicklung

```bash
npm install
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.
Du wirst automatisch zur Login-Seite weitergeleitet.

---

## LF10-Präsentation

Die Demo ist auf die **letzte Septemberwoche 2026** ausgerichtet (Präsentationsdatum: **22.09.2026**).

- Die Seite **Termine** zeigt alle Schultermine der nächsten **8 Wochen** ab dem 22.09.2026 (bis 17.11.2026) hervorgehoben an — ältere Einträge aus dem Schuljahr erscheinen gedimmt.
- Vertretungsplan, Abgaben und weitere Termine sind ebenfalls auf den Zeitraum September / Oktober 2026 datiert.

---

## Tech Stack

- **Next.js 16** (App Router, Server + Client Components)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS v4**
- **lucide-react** (Icons)

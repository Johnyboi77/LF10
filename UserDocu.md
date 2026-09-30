# Schülerportal — LF10 Mockup

Demo-Anwendung zur Darstellung des digitalen Einschulungsprozesses einer Schule.
Erstellt im Rahmen des Lernfelds LF10

## Zugangsdaten

Da es sich zunächst nur um ein Mockup handelt, gibt es nur einen Benutzer mit folgenden Anmeldedaten

| Feld | Wert |
|---|---|
| **Schüler-ID** | `S2024001` |
| **Passwort** | `Schule24` |

Für die Zukunft ist geplant, dass individuelle Daten (Id & generisches Passwort, dass der Schüler/die Eltern anschließend ändern) direkt vom Land in einem Einschreibebrief erhält. 

## Seiten

Im Schulportal der Pestalozzi Schule gibt es folgende Seiten mit folgenden Funktionen:

`/login` 
Die Anmeldeseite der Plattform. Anmeldung erfordert ID und Passwort.

`/dashboard` 
Übersicht über den Tagesplan, anstehenden Abgaben, eine Notenübersicht des aktuellen Schuljahres und chronologisch sortiere Benachrichtigungen zu anstehenden Terminen und Abgaben 


`/stundenplan` 
 Bei aktuelle Woche steht die Wochenübersicht der Klasse des Schülers mit eventuellen Vertretungsstunden und Enfall der Stunden, sowie Raumänderungen.

 Unter dem regulären Plan steht der reguläre Stundenplan, falls die aktuelle Übersicht mit viel Vertrteung und Entfall zu unübersichtlich ist.

`/noten`  
Notenübersicht nach Halbjahr und Fach für das aktuelle Schuljahr mit Wechseloption zu vergangenen Schuljahren.

`/lehrer` 
Übersicht der Lehrkräfte des Schülers des aktuellen Schuljahres mit ihren Email Adressen der Schule für etwaige Rückfragen.

`/vertretungsplan`  
Der aktuelle Vertretungsplan für die Klasse des Schülers in der aktuellen Woche 

`/abgaben` 
Übersicht über ausstehenden, eingereichte und bewertete Agaben sowie sortiere Abgabebereiche nach Fach für digitale Abgaben mit ihrem Abgabestatus

`/termine` 
Anzeige von Schultermine (Klassenarbeiten, Veranstaltungen) mit Suchfunktion und Filter

`/krankmeldung` 
Digitales Forumular für Krankmeldung des Schülers mit einer Überischt der letzten Krankmeldungen

`/profil` 
Ansicht des Schülerprofil mit allen relevanten Daten, Schulinformationen und Passwortänderungsoption

# Buttons im Seitenmenu

>Aktualisieren
Aktualisiert die derzeit angezeigt Seite (gedacht für Änderung bei Vertrteungsplan oder Abgabestatus nach Einreichung)

>Abmelden
Meldet den Nutzer ab und leitet zur Login Seite weiter

## LF10-Präsentation

Die Demo ist auf die **letzte Septemberwoche 2026** ausgerichtet (Präsentationsdatum: **22.09.2026**).Die angezeigten Daten entsprechen fiktive Daten eines Schülers Namens Jonas Frey.

- Die Seite **Termine** zeigt alle Schultermine der nächsten **8 Wochen** ab dem 22.09.2026 (bis 17.11.2026) hervorgehoben an — ältere Einträge aus dem Schuljahr erscheinen gedimmt.
- Vertretungsplan, Abgaben und weitere Termine sind ebenfalls auf den Zeitraum September / Oktober 2026 datiert.

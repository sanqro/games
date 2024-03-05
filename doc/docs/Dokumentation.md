# Dokumentation

:::info
Das ist die Dokumentation unseres [Projekts](https://github.com/sanqro/games), welches nach der Projektmethode IPERKA umgesetzt wurde. Hier wird unser Ablauf und die Vorgehensweise des Projekts dokumentiert.

:::

### Inhaltsverzeichnis

- [Dokumentation - Games App](#dokumentation)
  - [Inhaltsverzeichnis](#inhaltsverzeichnis)
  - [IPERKA](#iperka)
    - [Informieren](#informieren)
    - [Planen](#planen)
    - [Entscheiden](#entscheiden)
    - [Realisieren](#realisieren)
    - [Kontrollieren](#kontrollieren)
    - [Auswerten](#auswerten)
  - [Einleitung](#einleitung)
  - [Technologien](#technologien)
  - [Quellen](#quellen)
  - [Lokale Entwicklungsumgebung](#lokale-entwicklungsumgebung)
    - [Lokale Entwicklungsumgebung aufsetzen](#Lokale-Entwicklungsumgebung-aufsetzen)
    - [Vorbereitung](#Vorbereitung)
    - [Dependencies mit NPM installieren](#Dependencies-mit-NPM-installieren)
  - [Anforderungen](#anforderungen)
  - [Arbeitspakete](#arbeitspakete)
  - [Ausführung](#ausführung)
  - [Testen](#testen)
    - [Testumgebungen](#testumgebungen)
  - [Testfälle](#testfälle)
    - [Testprotokoll](#testprotokoll)
    - [Testbericht](#testbericht)
  - [Projektauswertung](#projektauswertung)

## IPERKA

### Informieren

- [Einleitung](#einleitung)
- [Technologien](#technologien)
- [Quellen](#quellen)
- [Anforderungen](#anforderungen)

### Planen

- [Testfälle](#testfälle)
- [Arbeitspakete](#arbeitspakete)

### Entscheiden

- [Technologien](#technologien)

### Realisieren

- [Ausführung](#ausführung)

### Kontrollieren

- [Testfälle](#testfälle)
- [Tesprotokoll](#testprotokoll)
- [Testbericht](#testbericht)

### Auswerten

- [Projektauswertung](#projektauswertung)

## Einleitung

Für dieses Projekt haben wir uns dafür entschieden, dass wir die, für uns neue, Technologie SvelteKit kennenlernen und dafür eine Webapplikation realisieren möchten. Dafür haben haben wir eine Webapplikation erstellt, mit der man seine Tippgeschwindigkeit testen kann und sich mit den anderen Benutzern messen kann. Ausserdem kann man auch seine vorherigen Testläufe ansehen und seine Tipperlebnis individualisieren.

## Technologien

Für Games verwenden wir folgende Technologien:

- [SveleteKit](https://kit.svelte.dev)
- [TypeScript(tsx)](https://www.typescriptlang.org)
- [TailwindCSS](https://tailwindcss.com/)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)
- [Docusaurus](https://docusaurus.io/)
- [Git](https://git-scm.com/doc)
- [GitHub](https://docs.github.com/en)

### Hosts:

- [Supabase für das Hosten der Datenbank](https://supabase.com/)
- [0Auth-Provider für das Login](https://supabase.com)
- [Netlify für das Hosten der Website sowie dieser Dokumentation](https://www.netlify.com/)

## Quellen

- [Offiziele SvelteKit Lern-Ressource](https://learn.svelte.dev/tutorial/introducing-sveltekit)
- [Docusaurus](https://docusaurus.io/docs)
- [0Auth](https://supabase.com/docs/guides/auth/auth-helpers/sveltekit)

## Lokale Entwicklungsumgebung

### Lokale Entwicklungsumgebung aufsetzen

#### Vorbereitung

Für die Realisierung dieses Projekts haben wir Visual Studio Code mit wenigen Erweiterungen, und zwar ESLint, Prettier und Live Share verwendet. Bei der Live Share-Erweiterung haben wir keine speziellen Einstellungen vorgenommen, wobei wir bei der Erweiterung Prettier und ESLint eine eigene Konfiguration erstellt haben, um unsere eigenen Code-Konventionen zu erzwingen. Diese Einstellungen werden automatisch übernommen, insofern man die eine Erweiterung installiert hat und die Entwicklungsumgebung aufgesetzt hat.

Um die lokale Entwicklungsumgebung aufzusetzen, muss man sich zuerst eine Kopie vom Repository, von der [offiziellen Quelle](https://github.com/sanqro/games) holen.

Dies kann man tun, indem man eine eigene Kopie von dem Repository erstellt (forkt), damit man später seine Änderungen auch bei GitHub pushen kann, auch wenn man kein Contributor ist.

_Dadurch kann man auch die eigenen Änderungen im offiziellen Repository eingbringen, indem man eine Pull Request erstellt._

Wenn das Repository erfolgreich geforkt wurde, muss man das Repository klonen und in dessen Verzeichnis wechseln.

```shell
git clone https://github.com/[deinBenutzername]games.git
cd games/
```

#### Dependencies mit NPM installieren

:::caution
Für diesen Schritt ist es notwendig, die node.js-Runtime installiert zu haben. [Download von node.js](https://nodejs.org/de/)
:::

Nachdem man das Projekt geklont hat, sollte man alle Dependencies installieren. Dabei muss man in das entsprechende Verzeichnis wechseln und die Abhängigkeiten installieren.

```bash
cd games/ #Falls man noch nicht im richtigen Verzeichnis ist
npm i
cd ..
```

#### Projekt starten

:::caution
Für diesen Schritt ist es notwendig, die [Dependencies installiert](#Dependencies-mit-NPM-installieren) zu haben.
:::

```bash
cd games/ # Falls man noch nicht im richtigen Verzeichnis ist
npm run dev
```

Nun wurde die Applikation erfolgreich gestartet und kann unter http://localhost:5713 erreicht werden.

## Anforderungen


| Anf.-Nr. | Muss/<br />Kann | funk./<br />qual. | Beschreibung                                                                                                                                                              |
| :--------- | :---------------- | ------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.       | Muss            | funk.             | Die Applikation soll ein Knopf haben, durch den man sich mit GitHub anmelden kann.                                                                                        |
| 2.       | Muss            | funk.             | Die Anmeldung soll funktionieren, dabei sollt ein Benutzer ein JWT-Token zugewiesen bekommen.                                                                             |
| 3.       | Muss            | funk.             | Die Applikation soll ein Knopf haben, durch den man sich wieder ausloggen kann.                                                                                           |
| 4.       | Muss            | funk.             | Auf der Hauptseite können die Benutzer zwischen einem lokalen Spiel, einem neuem Spiel oder dem Beitreten von einem Spiel auswählen.                                    |
| 5.       | Muss            | funk.             | Dem Benutzer soll mitgeteilt werden, dass das Spiel voll ist, wenn er einem vollen Spiel beitreten will. Zusätzlich darf er nicht das Spielgeschehen verändern können. |
| 6.       | Muss            | funk.             | Wenn ein Benutzer ein lokales Spiel gestartet hat, soll nach jedem Spielzug zwischen Spieler X und Spieler Y abgewechselt werden.                                         |
| 7.       | Muss            | qual.             | Wenn die Benutzer ein lokales Spiel spielen, soll ermittelt werden, ob jemand schon gewonnen hat und dann soll ihnen ein Gewinner mitgeteilt werden.                      |
| 8.       | Muss            | qual.             | Wenn ein Benutzer ein neues Spiel gestartet hat, soll nur ein Spieler diesem Spiel beitreten können.                                                                     |
| 9.       | Muss            | qual.             | Wenn die Benutzer ein gemeinsames Spiel spielen, soll nach jedem Zug der Spielstand bei beiden Benutzern synchronisiert sein.                                             |
| 10.      | Muss            | qual.             | Wenn die Benutzer ein gemeinsames Spiel spielen, soll nach jedem Zug ermittelt werden, ob jemand schon gewonnen hat und soll ihnen ein Gewinner mitgeteilt werden.        |
| 11.      | Muss            | qual.             | Die Benutzer sollen auch ein Spiel spielen können, wenn sie nicht eingeloggt sind.                                                                                       |

## Arbeitspakete

:::info
1x Arbeitspaket = 45 Minuten (eine Schullektion) <br />
1x Sitzung = 5x Arbeitspakete (ein Halbtag) <br />
Arbeitspakete \* Sitzungen \* Gruppenmitglieder<br />
8 Arbeitspakete für Portfolio, welche man zu Hause machen muss<br />

5 \* 7 \* 2 + 8= 78 Arbeitpakete
:::


| Nr. | Frist      | Beschreibung                                         | Zeit in Arbeitspaketen (geplant) |
| :---- | :----------- | ------------------------------------------------------ | ---------------------------------- |
| 1   | 11.01.2024 | Informieren (von IPERKA)                             | 4                                |
| 2   | 11.01.2024 | Planen (von IPERKA)                                  | 6                                |
| 3   | 18.01.2024 | Entscheiden (von IPERKA)                             | 5                                |
| 4   | 25.01.2024 | Realisieren (von IPERKA) der Anforderungen Nr. 1 - 4 | 15                               |
| 5   | 01.02.2024 | Realisieren (von IPERKA) der Anforderungen Nr. 4 - 8 | 10                               |
| 6   | 22.02.2024 | Realisieren (von IPERKA) der Anforderungen Nr. 8 -11 | 10                               |
| 7   | 29.02.2024 | Kontrollieren (von IPERKA)                           | 10                               |
| 8   | 07.03.2024 | Auswerten (von IPERKA)                               | 10                               |
| 9   | 07.03.2024 | Portfolioeintrag fertigstellen                       | 8                                |

## Ausführung


| Nr. | Frist      | Bemerkung                                                                                                                          | Zeit (geplant) | Zeit (effektiv) |
| :---- | :----------- | ------------------------------------------------------------------------------------------------------------------------------------ | ---------------- | ----------------- |
| 1   | 11.01.2024 | Wir hatten schnell Ideen, aber haben konnten uns noch im Zeitrahmen entscheiden.                                                   | 4              | 4               |
| 2   | 11.01.2024 | Wir haben so geplant, dass im ersten Realisieren weniger Anforderungen zu machen sind, da wir wieder in Svelte reinkommen müssen. | 6              | 5               |
| 3   | 18.01.2024 | Das Entscheiden ging recht schnell, da es sehr eindeutig war, was wir benutzen wollen.                                             | 5              | 5               |
| 4   | 25.01.2024 | Es gab eigentlich keine Probleme. Wir waren aber einbisschen eingerostet in Svelte.                                                | 15             | 16              |
| 5   | 01.02.2024 | Es gab eigentlich keine Probleme. Alles lief relativ gut.                                                                          | 10             | 14              |
| 6   | 22.02.2024 | Das Matchmaking wollte zuerst nicht so recht, da wir ein unindentifizierbares Problem hatten.                                      | 10             | 12              |
| 7   | 29.02.2024 | Es ging wie geplant. Keine Probleme                                                                                                | 10             | 10              |
| 8   | 07.03.2024 | Wir wussten, wo es in unserem Projekt geholpert hat.                                                                               | 10             | 10              |
| 9   | 07.03.2024 | Die Erstellung des Portfolios ging schnell, da wir langsam geübt darin sind.                                                      | 8              | 6               |

### Testumgebungen

Wir verwenden für alle Testfälle eine Testumgebungen:

#### Manuell (Per Hand):

**Betriebssystem:**

Der Browser, mit dem wir die Tests in dem wir die Tests manuell testen, wird auf einer der neusten Version vonvon Microsoft 10 (**22H2** **Build: 19045.4046) ausgeführt.

**Browser:**

Für den Browser verwenden wir die neuste Version von Mozilla Firefox (123.0).

## Testfälle


| Testf.-Nr. | Anforderung | Vorraussetzung                                                                                                                    | Testumgebung | Eingabe                                                                                                                                                                                                                                             | Erw. Ausgabe                                                                                                                            |
| :----------- | ------------- | :---------------------------------------------------------------------------------------------------------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| 1.1        | 1           | Man ist auf "https://games.sanqro.me/login ".                                                                                     | Manuell      | 1. Auf "GitHub" drücken.                                                                                                                                                                                                                           | 2.Anmeldungsfeld wird angezeigt.                                                                                                        |
| 2.1        | 2           | Man ist auf "https://games.sanqro.me/login ".                                                                                     | Manuell      | 1. Auf "GitHub" drücken.<br /> 3. Github Login-Daten eingeben.                                                                                                                                                                                     | 2. Man wird zum GitHub-Login weitergeleitet.<br /><br /><br />4. Man ist eingeloggt.<br />                                              |
| 3.1        | 3.          | Man ist auf "https://games.sanqro.me/" und es ist bereits eingeloggt                                                              | Manuell      | 1. Oben rechts auf "Logout" drücken.                                                                                                                                                                                                               | 4. Man wird auf "/" geleitet und man ist ausgeloggt.                                                                                    |
| 4.1        | 4.          | Man ist auf "https://games.sanqro.me/mainpage".                                                                                   | Manuell      | 1. Auf "New Game" drücken.                                                                                                                                                                                                                         | 2. Das Tic-Tac-Toe-Feld wird angezeigt und der Gegner ist null.                                                                         |
| 4.2        | 4.          | Man ist auf "https://games.sanqro.me/mainpage".                                                                                   | Manuell      | 1. Auf "New Offline game" drücken.                                                                                                                                                                                                                 | 2. Das Tic-Tac-Toe-Feld wird angezeigt und man hat keinen "Online"-Gegner.                                                              |
| 4.3        | 4.          | Man ist auf "https://games.sanqro.me/mainpage" und hat die sessionID vom Gegner bekommen                                          | Manuell      | 1. SessionID im Eingabefeld eingeben.<br />2. Auf "Join Game" drücken.                                                                                                                                                                             | 3. Das Tic-Tac-Toe-Feld wird angezeigt und der Gegner ist nicht "null".                                                                 |
| 5.1        | 5.          | Man ist auf "https://games.sanqro.me" und es man will einem bereits vollen Spiel beitreten.                                       | Manuell      | 1. SessionID für ein volles Spiel eingeben.                                                                                                                                                                                                        | 2. Es kommt ein Pop-Up mit dem Text "Game is already full"                                                                              |
| 6.1        | 6.          | Man ist auf "https://games.sanqro.me" und man hat bereits ein lokales Spiel gestartet.                                            | Manuell      | 1. Auf das Feld ganz oben links drücken.<br />2. Auf das Feld ganz oben rechts drücken                                                                                                                                                            | 2. Current Player 0<br />4. Current Player X                                                                                            |
| 7.1        | 7.          | Man ist auf "https://games.sanqro.me" und man hat bereits ein lokales Spiel gestartet.                                            | Manuell      | 1. Auf das Feld ganz oben links drücken.<br /><br />2. Auf das Feld ganz oben rechts drücken.<br />3. Auf das Feld in der Mitte links drücken.<br />5. Auf das Feld rechts in der Mitte drücken<br />6. Auf das Feld ganz unten links drücken. | 7. Es kommt ein Pop-Up mit dem Text "Winner is X"                                                                                       |
| 8.1        | 8.1         | Man ist auf "https://games.sanqro.me"  und man hat bereits Spiel erstellt und es sind auch zwei andere Benutzer auf dieser Seite. | Manuell      | 1. Als 1. Benutzer die sessionID eingeben und auf "Join Game" drücken..<br />2. Als 2. Benutzer die sessionID eingeben und auf "Join game" drücken.                                                                                               | 2. Tic-Tac-Toe-Feld wird angezeigt.<br />5. Es kommt ein Pop-Up mit dem Text "Game is full"                                             |
| 9.1        | 9.          | Man ist auf "https://games.sanqro.me" und hat bereits ein Spiel mit zwei Benutzern erstellt.                                      | Manuell      | 1. Als Benutzer 1 ganz oben links auf das Feld drücken.<br />2. Als Benutzer 2 ganz oben rechts auf das Feld drücken.                                                                                                                             | 2. Bei beiden Spielern wird ganz oben links das Feld reserviert.<br />3. Bei beiden Spielern wird ganz oben rechts das Feld reserviert. |
| 10.1       | 10.         | Man ist auf "https://games.sanqro.me" und hat bereits ein Spiel mit zwei Benutzern erstellt.                                      | Manuell      | 1. Auf das Feld ganz oben links drücken.<br /><br />2. Auf das Feld ganz oben rechts drücken.<br />3. Auf das Feld in der Mitte links drücken.<br />5. Auf das Feld rechts in der Mitte drücken<br />6. Auf das Feld ganz unten links drücken. | 7. Es kommt ein Pop-Up mit dem Text "Winner is X"                                                                                       |
| 11.1       | 11.         | Man ist auf "https://games.sanqro.me/" und ist nicht angemeldet.                                                                  | Manuell      | 1. Auf "Go Play" drücken.<br />2. Auf "Play as Guest" drücken<br />4. Auf "New Game" drücken.                                                                                                                                                    | 4. Tic-TacToe-Feld wird angezeigt.                                                                                                      |

### Testprotokoll

:::info

**OK** = Dieser Testfall wurde erfolgreich getestet.

**NOK** = Dieses Testfall konnte nicht (erfolgreich) getestet werden.

:::


| Test-Nr | Bericht | Tester                                                                                    |
| :-------- | :-------- | :------------------------------------------------------------------------------------------ |
| 1.1     | OK      | [@sanqro](https://github.com/sanqro), [@Nicola3341246 ](https://github.com/Nicola3341246) |
| 2.1     | OK      | [@sanqro](https://github.com/sanqro), [@Nicola3341246 ](https://github.com/Nicola3341246) |
| 3.1     | OK      | [@sanqro](https://github.com/sanqro), [@Nicola3341246 ](https://github.com/Nicola3341246) |
| 4.1     | OK      | [@sanqro](https://github.com/sanqro), [@Nicola3341246 ](https://github.com/Nicola3341246) |
| 4.2     | OK      | [@sanqro](https://github.com/sanqro),[@Nicola3341246 ](https://github.com/Nicola3341246)  |
| 4.3     | OK      | [@sanqro](https://github.com/sanqro),[@Nicola3341246 ](https://github.com/Nicola3341246)  |
| 5.1     | OK      | [@sanqro](https://github.com/sanqro), [@Nicola3341246 ](https://github.com/Nicola3341246) |
| 6.1     | OK      | [@sanqro](https://github.com/sanqro), [@Nicola3341246 ](https://github.com/Nicola3341246) |
| 7.1     | OK      | [@sanqro](https://github.com/sanqro), [@Nicola3341246 ](https://github.com/Nicola3341246) |
| 8.1     | OK      | [@sanqro](https://github.com/sanqro), [@Nicola3341246 ](https://github.com/Nicola3341246) |
| 9.1     | OK      | [@sanqro](https://github.com/sanqro), [@Nicola3341246 ](https://github.com/Nicola3341246) |
| 10.1    | OK      | [@sanqro](https://github.com/sanqro),[@Nicola3341246 ](https://github.com/Nicola3341246)  |
| 11.1    | OK      | [@sanqro](https://github.com/sanqro),[@Nicola3341246 ](https://github.com/Nicola3341246)  |

### Testbericht

Alle Testfälle wurden erfolgreich getestet. Die Applikation muss nicht überarbeitet werden und diese ist bereit abgegeben zu werden.

## Projektauswertung

Am Anfang des Projekts hatten wir Schwierigkeiten damit gemeinsame Interessen zu finden, um dann mit dieser ein Projekt zu erstellen, da wir noch nie zusammengearbeitet haben. Allerdings haben wir uns schlussendlich dazu entschieden, dass wir ein TicTacToe implementieren wollen, bei dem man gegen andere Benutzer spielen kann. Diese Entscheidung haben wir getroffen, weil wir derzeit am Anfang des Modules 323 standen und uns gedacht haben, dass dies sicher nützlich sein könnte. Zudem lief die Programmierung am Anfang eher ein wenig holprig ab, da wir lange nicht mehr SvelteKit gearbeitet haben und das erste Mal Supabase verwendet haben, aber mit der Zeit kamen wir rein. Wir haben "unangenehmere" Aufgaben auch manchmal aufgeschoben, wie beispielsweise das Matchmaking, weil wir Probleme damit hatten, aber wir haben uns unser Ziel vor Augen gesetzt und dann konnten wir das erfolgreich implementieren.

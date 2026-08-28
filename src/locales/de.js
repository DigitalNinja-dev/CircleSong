/*
 * CircleSong - Interactive Music Theory & Composition Engine
 * Copyright (C) 2026 Nicolás Raul Jean-Pierre Figueroa
 * https://github.com/DigitalNinja-dev/CircleSong
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */


/**
 * German.
 *
 * Keys are the English source strings; see src/i18n.js. Anything absent falls
 * back to English, so a partial dictionary is a working one.
 *
 * Note letters are deliberately left in their international form. German
 * notation calls B natural "H" and B♭ "B", and swapping them here would rename
 * every chord symbol, every fretboard marker and every tuning string in the
 * app — a correctness change, not a translation. The words *about* the notes
 * are German; the letters on the instrument are not.
 */
export const LOCALE_DE = {
  // ---------------------------------------------------------------- chrome
  'Language': 'Sprache',
  'LANGUAGE': 'SPRACHE',
  'Everything the app says, including the lessons and the progression notes.':
    'Alles, was die App sagt, einschließlich der Lektionen und der Hinweise zu den Progressionen.',
  'About CircleSong': 'Über CircleSong',
  'Audio engine': 'Audio-Engine',
  'Audio engine ready': 'Audio-Engine bereit',
  'Tap anything to start audio': 'Tippe irgendwo, um das Audio zu starten',
  'Audio unavailable — {error}': 'Audio nicht verfügbar — {error}',
  'Play': 'Abspielen',
  'Stop': 'Stopp',
  'SONG:': 'SONG:',
  'Song title': 'Songtitel',
  'Untitled Song': 'Unbenannter Song',
  'Tempo': 'Tempo',
  'Time signature': 'Taktart',
  'Metro': 'Metro',
  'Loop': 'Loop',
  'Drums': 'Drums',
  'Backing drums': 'Begleitendes Schlagzeug',
  'CLOSE': 'SCHLIESSEN',
  'Theme': 'Design',
  'THEME': 'DESIGN',
  'System': 'System',
  'Light': 'Hell',
  'Dark': 'Dunkel',
  'High contrast': 'Hoher Kontrast',
  'Sepia': 'Sepia',
  'Currently {theme}.': 'Zurzeit: {theme}.',
  'Follows your device, and changes with it.': 'Folgt deinem Gerät und ändert sich mit ihm.',
  'The default. Neon on black.': 'Die Voreinstellung. Neon auf Schwarz.',
  'Ink on paper, with a darker accent so it stays legible.':
    'Tinte auf Papier, mit dunklerem Akzent, damit es lesbar bleibt.',
  'Pure black and white, visible borders, no faint washes.':
    'Reines Schwarzweiß, sichtbare Ränder, keine blassen Flächen.',
  'Warm and low-glare, for long sessions.': 'Warm und blendfrei, für lange Sessions.',

  // ------------------------------------------------------------------ tabs
  'Circle': 'Kreis',
  'Tuner': 'Stimmgerät',
  'Tone': 'Klang',
  'Compose': 'Komponieren',
  'Timeline': 'Timeline',
  'Assist': 'Assistent',
  'Learn': 'Lernen',
  'Songs': 'Songs',

  // --------------------------------------------------------- panel headings
  '/01 CIRCLE_OF_FIFTHS': '/01 QUINTENZIRKEL',
  '/02 GUITAR_TONE': '/02 GITARRENKLANG',
  '/02B VOICE': '/02B STIMME',
  '/02C PLAYBACK': '/02C WIEDERGABE',
  '/03 STRUM_&_RHYTHM': '/03 ANSCHLAG_&_RHYTHMUS',
  '/03 DRUM_MACHINE': '/03 DRUMCOMPUTER',
  '/04 DIATONIC_CHORDS': '/04 LEITEREIGENE_AKKORDE',
  '/05 TIMELINE': '/05 TIMELINE',
  '/06 MODES': '/06 MODI',
  '/07 SONGWRITING_ASSISTANT': '/07 SONGWRITING_ASSISTENT',
  '/08 SONGS': '/08 SONGS',
  '/09 TUNER': '/09 STIMMGERÄT',
  '// APPEARANCE': '// DARSTELLUNG',
  '// PROGRESSION_LIBRARY': '// PROGRESSIONS_BIBLIOTHEK',
  '// SAVED_PROJECTS': '// GESPEICHERTE_PROJEKTE',
  '// SONG_STRUCTURE_IDEAS': '// IDEEN_ZUR_SONGSTRUKTUR',
  'EAR_TRAINER // GUESS_THE_MODE': 'GEHÖRBILDUNG // ERRATE_DEN_MODUS',

  // ----------------------------------------------------------------- about
  'CircleSong is a circle-of-fifths powered composition tool for guitar players. It maps the theory behind keys, modes, and chord progressions onto an instrument you already play, so you can build song structures — verses, choruses, bridges — by ear and by understanding, not guesswork.':
    'CircleSong ist ein Kompositionswerkzeug für Gitarristinnen und Gitarristen, das auf dem Quintenzirkel aufbaut. Es überträgt die Theorie hinter Tonarten, Modi und Akkordverbindungen auf ein Instrument, das du bereits spielst, damit du Songstrukturen — Strophen, Refrains, Bridges — nach Gehör und mit Verständnis baust statt nach Gefühl zu raten.',
  'Pick a key, hear every diatonic chord and its inversions instantly, sequence them into a loop, and get progression ideas grounded in real theory and well-known songs. The Learn tab and ear trainer build your fluency in modes as you write — so composing and studying happen in the same place.':
    'Wähle eine Tonart, höre sofort jeden leitereigenen Akkord und seine Umkehrungen, reihe sie zu einem Loop und erhalte Ideen für Progressionen, die auf echter Theorie und bekannten Songs beruhen. Der Reiter Lernen und die Gehörbildung schulen dein Gefühl für die Modi, während du schreibst — Komponieren und Lernen finden am selben Ort statt.',
  'Everything the instrument needs is here: eight modelled tones from acoustic steel to grand piano, thirty-four strum and picking patterns, a drum machine, a tuner for eight instruments, and songs you can save. It runs entirely on your device, installs to your home screen, and keeps working with no signal.':
    'Alles, was das Instrument braucht, ist hier: acht modellierte Klänge von der Stahlsaiten-Akustik bis zum Konzertflügel, vierunddreißig Anschlag- und Zupfmuster, ein Drumcomputer, ein Stimmgerät für acht Instrumente und Songs, die du speichern kannst. Es läuft vollständig auf deinem Gerät, lässt sich auf dem Startbildschirm installieren und funktioniert auch ohne Empfang.',
  'Copyright © 2026. Free software under the': 'Copyright © 2026. Freie Software unter der',
  ', with no warranty. Section 13 of that licence gives everyone who uses CircleSong over a network the right to its source:':
    ', ohne jede Gewährleistung. Abschnitt 13 dieser Lizenz gibt allen, die CircleSong über ein Netzwerk nutzen, das Recht auf den Quelltext:',
  'Source Code (AGPL v3.0)': 'Quelltext (AGPL v3.0)',

  // ---------------------------------------------------------------- circle
  'Circle of fifths — arrow keys move around the wheel':
    'Quintenzirkel — mit den Pfeiltasten durch das Rad',
  '{chord} — {numeral}, the {degree}': '{chord} — {numeral}, die {degree}',
  '{chord} — outside this key': '{chord} — außerhalb dieser Tonart',
  'Mode': 'Modus',
  'WHEEL TAP PLAYS': 'TIPPEN AUF DEM RAD SPIELT',
  'Chord': 'Akkord',
  'Note': 'Note',
  'Show secondary dominants': 'Zwischendominanten anzeigen',
  'The chords that pull into each degree': 'Die Akkorde, die zu jeder Stufe hinziehen',
  'SECONDARY DOMINANTS': 'ZWISCHENDOMINANTEN',
  'Tap one to hear it resolve. Each arrow points at the chord that chord pulls into.':
    'Tippe eine an, um sie auflösen zu hören. Jeder Pfeil zeigt auf den Akkord, zu dem sie hinzieht.',
  '◄ Fourths (subdominant)': '◄ Quarten (Subdominante)',
  'Fifths (dominant) ►': 'Quinten (Dominante) ►',
  'Outer ring — major keys. Inner ring — their relative minors. Bright wedges are diatonic to the current key. Clockwise stacks a 5th toward the dominant; counter-clockwise a 4th toward the subdominant. Lock the key, then tap any wedge to hear it and see how it relates.':
    'Äußerer Ring: Durtonarten. Innerer Ring: ihre parallelen Molltonarten. Helle Segmente sind leitereigen zur aktuellen Tonart. Im Uhrzeigersinn geht es eine Quinte weiter zur Dominante, gegen den Uhrzeigersinn eine Quarte zur Subdominante. Sperre die Tonart und tippe dann ein beliebiges Segment an, um es zu hören und seinen Bezug zu sehen.',
  '🔒 Key Locked — tap wheel to explore': '🔒 Tonart gesperrt — tippe aufs Rad zum Erkunden',
  '🔓 Lock Key to Explore': '🔓 Tonart sperren zum Erkunden',
  '{note} — degree {n} of the key ({numeral})': '{note} — Stufe {n} der Tonart ({numeral})',
  '{chord} is the {function} ({numeral}) of {key} — a {interval} above the root.':
    '{chord} ist die {function} ({numeral}) von {key} — eine {interval} über dem Grundton.',
  '{chord} sits a {interval} from {key} — outside the current key, a borrowed or chromatic color.':
    '{chord} liegt eine {interval} von {key} entfernt — außerhalb der aktuellen Tonart, eine entlehnte oder chromatische Farbe.',
  'The V7 of {target} — it borrows a note from outside the key to point at the {numeral} chord.':
    'Die V7 von {target} — sie leiht sich einen Ton von außerhalb der Tonart, um auf den Akkord {numeral} zu zeigen.',
  'The key’s own v is minor and cannot pull home. Raising its third makes {chord}, which can.':
    'Die tonartseigene v ist Moll und kann nicht nach Hause ziehen. Erhöht man ihre Terz, entsteht {chord}, der es kann.',
  'Borrowed': 'Entlehnt',

  // ------------------------------------------------- functions and degrees
  'Tonic': 'Tonika',
  'Supertonic': 'Supertonika',
  'Mediant': 'Mediante',
  'Subdominant': 'Subdominante',
  'Dominant': 'Dominante',
  'Submediant': 'Submediante',
  'Leading Tone': 'Leitton',
  'Home base — the point of rest the progression resolves to.':
    'Das Zuhause — der Ruhepunkt, zu dem sich die Progression auflöst.',
  'Often leads toward the dominant; sets up motion away from home.':
    'Führt oft zur Dominante; setzt die Bewegung weg von zu Hause in Gang.',
  'Colors the tonic, blending stability with subtle tension.':
    'Färbt die Tonika und mischt Stabilität mit feiner Spannung.',
  'Pulls away from home and opens the door to the dominant.':
    'Zieht von zu Hause weg und öffnet die Tür zur Dominante.',
  'Strongest pull back to the tonic — the engine of resolution.':
    'Der stärkste Zug zurück zur Tonika — der Motor der Auflösung.',
  'A gentle detour from the tonic, often feels wistful or reflective.':
    'Ein sanfter Umweg von der Tonika, oft wehmütig oder nachdenklich.',
  'Maximum tension — wants urgently to resolve back to the tonic.':
    'Maximale Spannung — will dringend zur Tonika auflösen.',
  '{function} chord in this key.': '{function}-Akkord in dieser Tonart.',
  'home': 'zu Hause',
  'a step away from home': 'einen Schritt von zu Hause entfernt',
  "the tonic's shadow": 'der Schatten der Tonika',
  'the lift': 'der Auftrieb',
  'the pull back home': 'der Zug zurück nach Hause',
  'the relative minor': 'die Mollparallele',
  'the approach chord': 'der Zielakkord davor',

  // ---------------------------------------------------------------- modes
  'Ionian': 'Ionisch',
  'Dorian': 'Dorisch',
  'Phrygian': 'Phrygisch',
  'Lydian': 'Lydisch',
  'Mixolydian': 'Mixolydisch',
  'Aeolian': 'Äolisch',
  'Locrian': 'Lokrisch',
  'Ionian (Major)': 'Ionisch (Dur)',
  'Aeolian (Minor)': 'Äolisch (Moll)',
  'Major scale': 'Durtonleiter',
  'Natural minor': 'Natürliches Moll',
  'Bright, resolved, happy': 'Hell, aufgelöst, fröhlich',
  'Minor but hopeful, moody without being sad': 'Moll, aber hoffnungsvoll; stimmungsvoll ohne traurig zu sein',
  'Dark, exotic, tense': 'Dunkel, exotisch, gespannt',
  'Dreamy, floating, cinematic': 'Verträumt, schwebend, filmisch',
  'Bluesy, rootsy major': 'Bluesiges, erdiges Dur',
  'Sad, melancholic, introspective': 'Traurig, melancholisch, nach innen gekehrt',
  'Unstable, tense, rarely a home base': 'Instabil, gespannt, selten ein Zuhause',
  'The default major-key sound — home base for pop, country, and classical.':
    'Der Standardklang in Dur — die Heimat von Pop, Country und Klassik.',
  'The major 6th is the giveaway — vamp i–IV for a jazzy, less melancholic minor sound (Santana, Radiohead).':
    'Die große Sexte verrät es — spiele ein i–IV-Vamp für einen jazzigen, weniger melancholischen Mollklang (Santana, Radiohead).',
  'The ♭2 gives it away — vamp i–♭II for a flamenco or metal flavor.':
    'Die ♭2 verrät es — spiele ein i–♭II-Vamp für Flamenco- oder Metal-Färbung.',
  'The ♯4 makes it float above plain major — vamp I–II for a "movie score" wonder.':
    'Die ♯4 lässt es über schlichtem Dur schweben — spiele ein I–II-Vamp für filmmusikalisches Staunen.',
  'Major with a flat 7th — vamp I–♭VII for classic rock and blues-rock.':
    'Dur mit kleiner Septime — spiele ein I–♭VII-Vamp für Classic Rock und Bluesrock.',
  'The default minor-key sound — vamp i–VI for that classic sad or epic minor feel.':
    'Der Standardklang in Moll — spiele ein i–VI-Vamp für das klassische traurige oder epische Mollgefühl.',
  'Built on a diminished triad — usually a passing color (like vii° in a major key) rather than a tonic.':
    'Auf einem verminderten Dreiklang gebaut — meist eine Durchgangsfarbe (wie vii° in einer Durtonart) statt einer Tonika.',
  'Modes are the 7 scales hiding inside every major scale — same notes, different starting point, different mood. Pick one to hear it and read how guitarists use it.':
    'Die Modi sind die 7 Tonleitern, die in jeder Durtonleiter stecken — dieselben Töne, ein anderer Startpunkt, eine andere Stimmung. Wähle einen aus, um ihn zu hören und zu lesen, wie Gitarristen ihn einsetzen.',
  '▶ Play Scale': '▶ Tonleiter spielen',
  '▶ Play Vamp': '▶ Vamp spielen',
  'Scale degrees compared with the major scale': 'Tonleiterstufen im Vergleich zur Durtonleiter',
  'Modes identified correctly at least once': 'Mindestens einmal richtig erkannte Modi',
  'Score:': 'Punkte:',
  'Streak: {n} (best {best})': 'Serie: {n} (Bestwert {best})',
  '▶ Start': '▶ Start',
  '↻ New Round': '↻ Neue Runde',
  'Correct! 🎧': 'Richtig! 🎧',
  'Not quite — that was {mode}': 'Knapp daneben — das war {mode}',
  '{mode} — identified': '{mode} — erkannt',

  // -------------------------------------------------------------- intervals
  'Unison (root)': 'Prime (Grundton)',
  'Minor 2nd': 'Kleine Sekunde',
  'Major 2nd': 'Große Sekunde',
  'Minor 3rd': 'Kleine Terz',
  'Major 3rd': 'Große Terz',
  'Perfect 4th': 'Reine Quarte',
  'Tritone': 'Tritonus',
  'Perfect 5th': 'Reine Quinte',
  'Minor 6th': 'Kleine Sexte',
  'Major 6th': 'Große Sexte',
  'Minor 7th': 'Kleine Septime',
  'Major 7th': 'Große Septime',

  // ------------------------------------------------------------------ tone
  'VOLUME': 'LAUTSTÄRKE',
  'BRIGHTNESS': 'HELLIGKEIT',
  'SUSTAIN': 'SUSTAIN',
  'PICK POS': 'ANSCHLAGPOS.',
  'AUDITION': 'VORHÖREN',
  '1 bar': '1 Takt',
  'Play a full bar': 'Einen ganzen Takt spielen',
  'Play {n} beat': '{n} Schlag spielen',
  'Play {n} beats': '{n} Schläge spielen',
  'Cut previous sound': 'Vorherigen Klang abschneiden',
  'Each chord silences the one before it': 'Jeder Akkord bringt den vorherigen zum Schweigen',
  'On': 'Ein',
  'Off': 'Aus',
  'TUNING': 'STIMMUNG',
  'Tuning': 'Stimmung',

  // ---------------------------------------------------------------- rhythm
  'STYLE': 'STIL',
  'NOW PLAYING': 'LÄUFT GERADE',
  'FEEL': 'FEEL',
  'SWING': 'SWING',
  'HUMANIZE': 'HUMANISIEREN',
  'Rhythm family': 'Rhythmusfamilie',
  'All feels ({n})': 'Alle Feels ({n})',
  'Strumming': 'Anschlag',
  'Muted & Percussive': 'Abgedämpft & perkussiv',
  'Reggae, Ska & Offbeat': 'Reggae, Ska & Offbeat',
  'Jazz Comping': 'Jazz-Comping',
  'Latin & Syncopated': 'Latin & synkopiert',
  'Country & Bluegrass': 'Country & Bluegrass',
  'Other Meters': 'Andere Taktarten',
  'Fingerstyle': 'Fingerstyle',
  'Keyboard': 'Tasten',
  'written for {lo}–{hi} BPM': 'geschrieben für {lo}–{hi} BPM',
  'Written for {lo}–{hi} BPM': 'Geschrieben für {lo}–{hi} BPM',
  'any tempo': 'beliebiges Tempo',
  'Set {bpm} BPM': 'Auf {bpm} BPM setzen',
  'You are at {bpm}; this feel is written for {lo}–{hi}':
    'Du bist bei {bpm}; dieses Feel ist für {lo}–{hi} geschrieben',
  'machine': 'maschinell',
  'Straight': 'Gerade',
  'Double-time': 'Doppelzeit',
  'Half-time': 'Halbzeit',
  'The pattern as written.': 'Das Muster so, wie es notiert ist.',
  'Twice the density at the same tempo — a skank becomes ska.':
    'Doppelte Dichte bei gleichem Tempo — aus einem Skank wird Ska.',
  'The figure stretched across two bars. Everything gets heavier.':
    'Die Figur über zwei Takte gedehnt. Alles wird schwerer.',
  'Straight 8ths': 'Gerade Achtel',
  '16th Pop Strum': 'Pop-Anschlag in Sechzehnteln',
  'Folk D-DU-UDU': 'Folk A-AB-BAB',
  'Driving 16ths': 'Treibende Sechzehntel',
  'Anthem Half-Time': 'Hymne in Halbzeit',
  'Punk Downstrokes': 'Punk-Abschläge',
  'Muted Chuck': 'Abgedämpfter Chuck',
  'Funk 16ths': 'Funk-Sechzehntel',
  'Disco Chank': 'Disco-Chank',
  'Reggae Skank': 'Reggae-Skank',
  'One Drop': 'One Drop',
  'Rocksteady': 'Rocksteady',
  'Ska Upstrokes': 'Ska-Aufschläge',
  'Ska Bubble (16ths)': 'Ska-Bubble (Sechzehntel)',
  'Jazz Swing': 'Jazz-Swing',
  'Charleston Comp': 'Charleston-Comping',
  'Bossa Nova': 'Bossa Nova',
  'Rumba Clave': 'Rumba-Clave',
  'Rumba Flamenca': 'Rumba Flamenca',
  'Country Boom-Chick': 'Country-Boom-Chick',
  'Bluegrass Boom-Chuck': 'Bluegrass-Boom-Chuck',
  'Waltz Strum': 'Walzer-Anschlag',
  'Ballad 6/8': 'Ballade in 6/8',
  'Slow Blues 12/8': 'Langsamer Blues in 12/8',
  'Fingerstyle Arp': 'Fingerstyle-Arpeggio',
  'Travis Picking': 'Travis Picking',
  'Rising Arpeggio': 'Aufsteigendes Arpeggio',
  'Let Ring': 'Klingen lassen',
  'Block Chords': 'Blockakkorde',
  'Ballad Left Hand': 'Balladen-Linke',
  'Alberti Bass': 'Alberti-Bass',
  'Broken Chord': 'Gebrochener Akkord',
  'Comping Stabs': 'Comping-Stabs',
  'Reggae Organ Bubble': 'Reggae-Orgel-Bubble',

  // ----------------------------------------------------------------- drums
  'Groove': 'Groove',
  'Drum kit': 'Schlagzeug',
  'Drum step sequencer': 'Step-Sequenzer',
  'DRUM VOL': 'DRUM-LAUTST.',
  'Tap a step to cycle it through soft, medium and hard, then off. Tap a voice name to preview it; the ✕ clears that row.':
    'Tippe auf einen Step, um ihn durch leise, mittel und hart und dann auf aus zu schalten. Tippe auf einen Stimmennamen, um ihn vorzuhören; das ✕ leert die Zeile.',
  'Clear grid': 'Raster leeren',
  'Reset groove': 'Groove zurücksetzen',
  'Double': 'Verdoppeln',
  '✦ Vary': '✦ Variieren',
  'Copy the first half onto the second': 'Die erste Hälfte auf die zweite kopieren',
  'Nudge the groove into a variation of itself': 'Den Groove in eine Variation seiner selbst schubsen',
  'Fill before the loop turns': 'Fill, bevor der Loop umschlägt',
  'A short fill on the last bar': 'Ein kurzes Fill im letzten Takt',
  'Preview {voice}': '{voice} vorhören',
  'Clear {voice}': '{voice} leeren',
  '{voice} step {n}': '{voice}, Step {n}',
  'Kick': 'Bassdrum',
  'Snare': 'Snare',
  'Clap': 'Clap',
  'Rim': 'Rim',
  'Hat': 'Hi-Hat',
  'Open Hat': 'Offene Hi-Hat',
  'Ride': 'Ride',
  'Crash': 'Crash',
  'Tom': 'Tom',
  'Shaker': 'Shaker',
  'Rock Standard': 'Rock-Standard',
  'Cajon & Percussion': 'Cajón & Perkussion',
  'Acoustic Cajon': 'Akustische Cajón',
  'Reggae / Dub': 'Reggae / Dub',
  'Jazz Brushes': 'Jazz-Besen',
  'Lo-Fi / Chillhop': 'Lo-Fi / Chillhop',
  'Hard Rock / Metal': 'Hard Rock / Metal',
  'Rock & Pop': 'Rock & Pop',
  'Modern Rock Drive': 'Moderner Rock-Drive',
  'Pop / Funk 16ths': 'Pop-/Funk-Sechzehntel',
  'Indie Straight-8': 'Indie in geraden Achteln',
  'Half-Time Groove': 'Halbzeit-Groove',
  'Motown Pocket': 'Motown-Pocket',
  'Punk D-Beat': 'Punk-D-Beat',
  'Metal Double-Kick': 'Metal-Doppelfußmaschine',
  'Metal Half-Time': 'Metal in Halbzeit',
  'Funk & Soul': 'Funk & Soul',
  'Funk Ghost Notes': 'Funk-Ghostnotes',
  'Gospel Shuffle': 'Gospel-Shuffle',
  'Boom Bap': 'Boom Bap',
  'Hip-Hop & Lo-Fi': 'Hip-Hop & Lo-Fi',
  'Lo-Fi Chillhop': 'Lo-Fi-Chillhop',
  'Trap': 'Trap',
  'Breakbeat': 'Breakbeat',
  'Electronic & Dance': 'Elektronisch & Dance',
  'Disco Four-on-Floor': 'Disco-Four-on-the-Floor',
  'Deep House': 'Deep House',
  'House': 'House',
  'Techno': 'Techno',
  'Latin': 'Latin',
  'Son Montuno (2-3)': 'Son Montuno (2-3)',
  'Samba': 'Samba',
  'Partido Alto': 'Partido Alto',
  'Merengue': 'Merengue',
  'Cumbia Clásica': 'Klassische Cumbia',
  'Cumbia Moderna': 'Moderne Cumbia',
  'Soca': 'Soca',
  'Afro-Cuban 6/8': 'Afrokubanisch in 6/8',
  'Reggae & Caribbean': 'Reggae & Karibik',
  'Reggae One-Drop': 'Reggae-One-Drop',
  'Reggae Steppers': 'Reggae-Steppers',
  'Jazz & Blues': 'Jazz & Blues',
  'Jazz Swing Ride': 'Jazz-Swing-Ride',
  'Slow Blues Shuffle': 'Langsamer Blues-Shuffle',
  'Acoustic & Folk': 'Akustisch & Folk',
  'Folk Waltz': 'Folk-Walzer',
  'Country Train': 'Country-Train',
  'Metal': 'Metal',

  // -------------------------------------------------------- chord builder
  'SIZE': 'GRÖSSE',
  'COLOUR': 'FARBE',
  'ALTER': 'ALTERIEREN',
  'SHAPE': 'GRIFF',
  'Root': 'Grundstellung',
  '1st Inv': '1. Umk.',
  '2nd Inv': '2. Umk.',
  'Drop-2': 'Drop-2',
  'Drop-3': 'Drop-3',
  '↻ Next shape': '↻ Nächster Griff',
  '▶ Preview': '▶ Vorhören',
  'Chord diagram': 'Akkorddiagramm',
  'No playable shape': 'Kein spielbarer Griff',
  'No playable shape for that chord in this tuning.':
    'Für diesen Akkord gibt es in dieser Stimmung keinen spielbaren Griff.',
  'Open Position': 'Offene Lage',
  'Position — {fret}fr': 'Lage — Bund {fret}',
  'Triad': 'Dreiklang',
  'Seventh chord': 'Septakkord',
  'Ninth': 'None',
  'Eleventh': 'Undezime',
  'Triad — root, third, fifth': 'Dreiklang — Grundton, Terz, Quinte',
  'Thirteenth — the full stack': 'Tredezime — der volle Turm',
  'Reset this chord': 'Diesen Akkord zurücksetzen',
  'Reset all': 'Alles zurücksetzen',
  'Add a {alteration}': '{alteration} hinzufügen',
  'Alterations need a seventh — pick 7 or larger first.':
    'Alterationen brauchen eine Septime — wähle zuerst 7 oder größer.',
  'Diatonic': 'Leitereigen',
  'Dom 7': 'Dom 7',
  'The chord the key gives you.': 'Der Akkord, den dir die Tonart gibt.',
  'A dominant on this degree — the secondary-dominant pull.':
    'Eine Dominante auf dieser Stufe — der Zug der Zwischendominante.',
  'Third replaced by the fourth. Suspended, wants to resolve.':
    'Terz durch die Quarte ersetzt. Vorhalt, will auflösen.',
  'Third replaced by the second. Open and unresolved.':
    'Terz durch die Sekunde ersetzt. Offen und unaufgelöst.',
  'Sixth instead of a seventh. Warm, settled, vintage.':
    'Sexte statt Septime. Warm, gesetzt, vintage.',
  'Ninth added over a triad, with no seventh.': 'None über einem Dreiklang, ohne Septime.',
  'Fully diminished — a passing chord that leads anywhere.':
    'Vollvermindert — ein Durchgangsakkord, der überallhin führt.',
  'Half-diminished. The ii of a minor ii–V–i.': 'Halbvermindert. Die ii einer Moll-ii–V–i.',
  'Raised fifth, pushing upward.': 'Erhöhte Quinte, die nach oben drängt.',
  '{hint} — idiomatic on this degree.': '{hint} — auf dieser Stufe idiomatisch.',
  'Plain triad — the chord at its most direct.': 'Schlichter Dreiklang — der Akkord in seiner direktesten Form.',
  'Seventh added: the chord gains a direction to move in.':
    'Septime hinzugefügt: Der Akkord bekommt eine Richtung.',
  'Ninth on top — warmth and colour without changing the function.':
    'None obendrauf — Wärme und Farbe, ohne die Funktion zu ändern.',
  'Eleventh — open and suspended over the third.': 'Undezime — offen und über der Terz schwebend.',
  'Thirteenth — the full stack, the sound of a jazz voicing.':
    'Tredezime — der volle Turm, der Klang eines Jazz-Voicings.',
  'Diatonic — {role} in this key.': 'Leitereigen — {role} in dieser Tonart.',
  'The {alterations} tightens the tension — resolve it by step into the next chord.':
    'Die {alterations} zieht die Spannung an — löse sie schrittweise in den nächsten Akkord auf.',
  ' and ': ' und ',
  'Secondary dominant — the V7 of {target}, so it pulls to the {numeral} chord.':
    'Zwischendominante — die V7 von {target}, sie zieht also zum Akkord {numeral}.',
  'Borrowed dominant pulling to {target}, which sits outside this key.':
    'Entlehnte Dominante, die zu {target} zieht, das außerhalb dieser Tonart liegt.',
  "The key's own dominant, made a true V7 — the strongest pull to the tonic.":
    'Die tonartseigene Dominante, zur echten V7 gemacht — der stärkste Zug zur Tonika.',
  'No third, so it is neither major nor minor — it wants the chord after it.':
    'Keine Terz, also weder Dur noch Moll — er will den Akkord danach.',
  'Symmetrical: it can resolve up a semitone into almost anything.':
    'Symmetrisch: Er kann einen Halbton aufwärts in fast alles auflösen.',
  'Half-diminished — the ii of a minor ii–V–i, heading for the dominant.':
    'Halbvermindert — die ii einer Moll-ii–V–i, auf dem Weg zur Dominante.',
  'A sixth instead of a seventh: settled rather than in motion.':
    'Eine Sexte statt einer Septime: gesetzt statt in Bewegung.',
  'A ninth over a plain triad — colour with no seventh to resolve.':
    'Eine None über einem schlichten Dreiklang — Farbe ohne Septime, die aufgelöst werden müsste.',
  "The raised fifth leans upward into the next chord's root or third.":
    'Die erhöhte Quinte lehnt sich aufwärts in den Grundton oder die Terz des nächsten Akkords.',
  'Solo with {scale}.': 'Soliere mit {scale}.',
  'Careful with {note}.': 'Vorsicht mit {note}.',
  "The key's own notes, starting from this chord's root.":
    'Die tonartseigenen Töne, vom Grundton dieses Akkords aus.',
  'Altered (super-locrian)': 'Alteriert (superlokrisch)',
  'Every tension is raised or lowered — this is the scale the ♭9 is asking for.':
    'Jede Spannung ist erhöht oder erniedrigt — das ist die Skala, nach der die ♭9 verlangt.',
  'Lydian dominant': 'Lydisch-dominant',
  'A dominant with a raised 4th, which is exactly the ♯11.':
    'Eine Dominante mit erhöhter Quarte, also genau der ♯11.',
  "The dominant scale. The 4th clashes with the chord's 3rd — pass through it, do not land on it.":
    'Die Dominantskala. Die Quarte reibt sich mit der Terz des Akkords — geh hindurch, bleib nicht darauf stehen.',
  'Diminished (half–whole)': 'Vermindert (Halbton–Ganzton)',
  'Symmetrical, like the chord — it works from any of the four notes.':
    'Symmetrisch wie der Akkord — sie funktioniert von jedem der vier Töne aus.',
  'Locrian ♮2': 'Lokrisch ♮2',
  'Locrian with the 2nd raised, which keeps the 9th usable.':
    'Lokrisch mit erhöhter Sekunde, wodurch die None brauchbar bleibt.',

  // ------------------------------------------------ suggestions and reasons
  'SUGGESTED NEXT': 'ALS NÄCHSTES VORGESCHLAGEN',
  'EVERY CHORD IN THE KEY': 'JEDER AKKORD DER TONART',
  'THIS CHORD': 'DIESER AKKORD',
  'THIS LOOP IS A': 'DIESER LOOP IST EIN',
  'HOW THIS LOOP READS': 'WIE SICH DIESER LOOP LIEST',
  'Follow the key': 'Der Tonart folgen',
  'Remove chord': 'Akkord entfernen',
  'Section role': 'Rolle des Abschnitts',
  'Smooth voicings': 'Weiche Voicings',
  'Pick shapes that connect, so the hand barely moves':
    'Wählt Griffe, die aneinander anschließen, damit sich die Hand kaum bewegt',
  'Clear all': 'Alles leeren',
  'Done': 'Fertig',
  'BAR {n}': 'TAKT {n}',
  'BAR {n} · {half} HALF': 'TAKT {n} · {half} HÄLFTE',
  'FIRST': 'ERSTE',
  'SECOND': 'ZWEITE',
  'Bar {n}': 'Takt {n}',
  'Split bar into two chords': 'Takt in zwei Akkorde teilen',
  'Clear': 'Leeren',
  '+ Loop': '+ Loop',
  'Duplicate': 'Duplizieren',
  'Delete': 'Löschen',
  'Add an empty loop': 'Einen leeren Loop hinzufügen',
  'Duplicate this loop': 'Diesen Loop duplizieren',
  'Delete this loop': 'Diesen Loop löschen',
  'Loop {name}': 'Loop {name}',
  'Loop name': 'Name des Loops',
  'Starts at the next bar': 'Beginnt im nächsten Takt',
  'A big jump from the previous chord — try Smooth voicings.':
    'Ein großer Sprung vom vorherigen Akkord — probiere Weiche Voicings.',
  'Fret movement from the previous chord.': 'Bundbewegung gegenüber dem vorherigen Akkord.',
  'Total fret movement across the loop: {cost}.':
    'Gesamte Bundbewegung über den Loop: {cost}.',
  'Drop this bar’s own setting and follow the chord variation from Compose.':
    'Die eigene Einstellung dieses Takts verwerfen und der Akkordvariante aus Komponieren folgen.',
  'This bar already follows the chord variation set in Compose.':
    'Dieser Takt folgt bereits der in Komponieren gesetzten Akkordvariante.',
  'Timeline is empty — add chords, or switch the metronome on.':
    'Die Timeline ist leer — füge Akkorde hinzu oder schalte das Metronom ein.',
  'Loaded {chords} chords into {bars} bars.': '{chords} Akkorde in {bars} Takte geladen.',
  'Add another chord to hear a progression.': 'Füge einen weiteren Akkord hinzu, um eine Progression zu hören.',
  'Perfect cadence': 'Authentische Kadenz',
  'Plagal cadence': 'Plagale Kadenz',
  'Half cadence': 'Halbschluss',
  'Deceptive cadence': 'Trugschluss',
  'perfect': 'authentische',
  'plagal': 'plagale',
  'half': 'halbe',
  'any': 'beliebige',
  'Dominant to tonic — the section lands.': 'Dominante zu Tonika — der Abschnitt landet.',
  'IV to I — the "amen" ending, softer than a perfect cadence.':
    'IV zu I — der „Amen“-Schluss, weicher als eine authentische Kadenz.',
  'Ends on the dominant, unresolved — it hands over to whatever comes next.':
    'Endet unaufgelöst auf der Dominante — sie übergibt an das, was als Nächstes kommt.',
  'The dominant resolves to vi instead of I — the ending is dodged on purpose.':
    'Die Dominante löst sich zur vi statt zur I auf — dem Schluss wird absichtlich ausgewichen.',
  'A {section} usually ends with a {expected} cadence; this one ends with a {actual}.':
    'Ein Abschnitt vom Typ {section} endet meist mit einer {expected} Kadenz; dieser endet mit einer {actual}.',
  'No clear cadence — the section stops rather than ends.':
    'Keine klare Kadenz — der Abschnitt hört auf, statt zu enden.',
  'Nothing here acts as a dominant, so the loop stays flat. Try a V7 before the turn.':
    'Nichts hier wirkt als Dominante, deshalb bleibt der Loop flach. Probiere eine V7 vor dem Umschlag.',
  'All plain triads. A 7th or 9th on one chord will give the loop a centre of gravity.':
    'Nur schlichte Dreiklänge. Eine Septime oder None auf einem Akkord gibt dem Loop einen Schwerpunkt.',
  'same chord': 'derselbe Akkord',
  'a move': 'eine Bewegung',
  'down a fifth — the strongest move there is': 'eine Quinte abwärts — die stärkste Bewegung überhaupt',
  'down a third — two notes stay put': 'eine Terz abwärts — zwei Töne bleiben liegen',
  'up a step': 'einen Schritt aufwärts',
  'down a step': 'einen Schritt abwärts',
  'up a third': 'eine Terz aufwärts',
  'up a fifth — a step backwards, used deliberately':
    'eine Quinte aufwärts — ein Schritt zurück, bewusst eingesetzt',
  'opens a {section} well': 'eröffnet ein {section} gut',
  'ends a {section} the way it should': 'beendet ein {section} so, wie es soll',
  'resolving here would spend the tension the {section} is building':
    'hier aufzulösen würde die Spannung verbrauchen, die das {section} aufbaut',
  'the tonic, which states the key outright': 'die Tonika, die die Tonart unmissverständlich benennt',
  'resolves the dominant': 'löst die Dominante auf',
  'subdominant into dominant — the standard approach':
    'Subdominante zur Dominante — die Standardannäherung',
  'home straight to the dominant, which is how half a songbook works':
    'von zu Hause direkt zur Dominante, so funktioniert ein halbes Liederbuch',
  'steps away from home': 'geht schrittweise von zu Hause weg',
  'pulls back from the dominant, which loosens the tension':
    'zieht sich von der Dominante zurück, was die Spannung lockert',
  'The m7 — this is the ii of a ii–V, and it wants the dominant.':
    'Der m7 — das ist die ii einer ii–V, und sie will die Dominante.',
  'A m9: the same function, more air.': 'Ein m9: dieselbe Funktion, mehr Luft.',
  'Suspended, which delays the move.': 'Als Vorhalt, was die Bewegung verzögert.',
  'A maj7 on the subdominant — soft, and it floats.':
    'Ein maj7 auf der Subdominante — weich, und er schwebt.',
  'A 6th chord, the settled vintage sound.': 'Ein Sextakkord, der gesetzte Vintage-Klang.',
  'add9 keeps it a triad but opens it up.': 'add9 lässt ihn ein Dreiklang bleiben, öffnet ihn aber.',
  'The plain minor triad — the most direct statement of home.':
    'Der schlichte Mollakkord — die direkteste Aussage von Zuhause.',
  'A m7 tonic: home, but still moving.': 'Eine m7-Tonika: zu Hause, aber noch in Bewegung.',
  'A m9 tonic, which is where a lot of neo-soul lives.':
    'Eine m9-Tonika, dort lebt ein großer Teil des Neo-Soul.',
  'm6 — brighter than it looks, because of the raised 6th.':
    'm6 — heller, als er aussieht, wegen der großen Sexte.',
  'The plain triad — nothing is clearer than this.': 'Der schlichte Dreiklang — klarer geht es nicht.',
  'maj7 makes the tonic dreamier and less final.':
    'maj7 macht die Tonika verträumter und weniger endgültig.',
  'A 6/9 chord: resolved, but not a full stop.': 'Ein 6/9-Akkord: aufgelöst, aber kein Schlusspunkt.',
  'add9 — a triad with light on it.': 'add9 — ein Dreiklang mit Licht darauf.',
  'A true dominant 7th — the pull home.': 'Eine echte Dominantseptime — der Zug nach Hause.',
  'Add the 9th for warmth without losing the pull.':
    'Nimm die None dazu für Wärme, ohne den Zug zu verlieren.',
  'A 13th: the full dominant sound.': 'Eine Tredezime: der volle Dominantklang.',
  'Suspend the third, then release it into the 3rd.':
    'Halte die Terz zurück und löse sie dann in die Terz auf.',
  'With a ♭9 this is the classic minor-key dominant.':
    'Mit einer ♭9 ist das die klassische Molldominante.',
  'Half-diminished is how this degree is normally voiced — it heads for the dominant.':
    'Halbvermindert ist die übliche Gestalt dieser Stufe — sie strebt zur Dominante.',
  'The bare diminished triad, which is harsher and rarely held.':
    'Der nackte verminderte Dreiklang, härter und selten gehalten.',
  'Fully diminished, as a passing chord between two neighbours.':
    'Vollvermindert, als Durchgangsakkord zwischen zwei Nachbarn.',

  // ------------------------------------------------------- song structures
  'Intro': 'Intro',
  'Verse': 'Strophe',
  'Pre-Chorus': 'Pre-Chorus',
  'Chorus': 'Refrain',
  'Bridge': 'Bridge',
  'Outro': 'Outro',
  'Apply': 'Übernehmen',
  'Apply to timeline': 'In die Timeline übernehmen',
  'Establish the key without spending the big moment.':
    'Die Tonart etablieren, ohne den großen Moment zu verbrauchen.',
  'A loop that can carry many different melodies.':
    'Ein Loop, der viele verschiedene Melodien tragen kann.',
  'Climb, and hand the chorus an unresolved dominant.':
    'Steigen und dem Refrain eine unaufgelöste Dominante übergeben.',
  'The strongest, plainest statement of the key.':
    'Die stärkste, schlichteste Aussage der Tonart.',
  'Leave home so returning means something.':
    'Verlasse das Zuhause, damit die Rückkehr etwas bedeutet.',
  'Land, or vamp somewhere restful.': 'Landen, oder an einem ruhigen Ort vampen.',
  'Simple & Open': 'Schlicht & offen',
  'Suspended Mood': 'Schwebende Stimmung',
  'Single-Chord Drone': 'Bordun auf einem Akkord',
  'Dominant Tease': 'Andeutung der Dominante',
  'Establishes the key calmly before the verse enters.':
    'Etabliert die Tonart in Ruhe, bevor die Strophe einsetzt.',
  'Opens on a softer, unresolved colour.': 'Beginnt mit einer weicheren, unaufgelösten Farbe.',
  'Holds the tonic so the first vocal line does the work.':
    'Hält die Tonika, damit die erste Gesangszeile die Arbeit macht.',
  'Starts on tension and resolves into bar one.':
    'Beginnt in Spannung und löst sich in den ersten Takt auf.',
  'Narrative Motion': 'Erzählende Bewegung',
  'Understated': 'Zurückhaltend',
  'Descending Line': 'Absteigende Linie',
  'Minor Verse': 'Mollstrophe',
  'Steady storytelling motion, familiar and grounded.':
    'Gleichmäßige erzählende Bewegung, vertraut und geerdet.',
  'Restrained — leaves room for the chorus to lift.':
    'Zurückhaltend — lässt dem Refrain Platz zum Abheben.',
  'The axis loop, which never tires of being sung over.':
    'Der Achsen-Loop, über den zu singen nie langweilig wird.',
  'Same chords starting on the relative minor — darker footing.':
    'Dieselben Akkorde, beginnend auf der Mollparallele — dunklerer Boden.',
  'Rising Tension': 'Steigende Spannung',
  'Stepwise Build': 'Schrittweiser Aufbau',
  'Hold the Five': 'Die Fünf halten',
  'Climbs and holds the dominant so the chorus can release it.':
    'Steigt und hält die Dominante, damit der Refrain sie lösen kann.',
  'Walks up the scale — momentum without a key change.':
    'Geht die Tonleiter hinauf — Schwung ohne Tonartwechsel.',
  'Two chords, twice as long each. Maximum anticipation.':
    'Zwei Akkorde, jeder doppelt so lang. Maximale Erwartung.',
  'Big Lift': 'Großer Auftrieb',
  'Anthemic': 'Hymnisch',
  'Plagal Power': 'Plagale Kraft',
  'Minor Hook': 'Moll-Hook',
  'Climbs above the verse for a euphoric hook.':
    'Steigt über die Strophe hinaus für einen euphorischen Hook.',
  'Instantly singable — the classic pop lift.':
    'Sofort mitsingbar — der klassische Pop-Auftrieb.',
  'Tonic and subdominant only. Hymn-like and immovable.':
    'Nur Tonika und Subdominante. Hymnisch und unverrückbar.',
  'Begins minor and resolves major — bittersweet.':
    'Beginnt in Moll und löst sich nach Dur auf — bittersüß.',
  'Harmonic Detour': 'Harmonischer Umweg',
  'Mediant Shift': 'Mediantische Rückung',
  'Relative Minor': 'Mollparallele',
  'Suspended Halt': 'Schwebender Halt',
  'Borrows jazz motion to contrast the chorus.':
    'Leiht sich Jazzbewegung, um dem Refrain zu widersprechen.',
  'A brief modal colour before the final chorus.':
    'Eine kurze modale Farbe vor dem letzten Refrain.',
  'Moves the centre of gravity to the relative minor.':
    'Verlagert den Schwerpunkt auf die Mollparallele.',
  'Two chords, held. The pause before the last chorus.':
    'Zwei Akkorde, gehalten. Die Pause vor dem letzten Refrain.',
  'Fade Home': 'Nach Hause ausblenden',
  'Loop & Dissolve': 'Loopen & auflösen',
  'Plagal Amen': 'Plagales Amen',
  'Unresolved': 'Unaufgelöst',
  'A final cadence that settles the song.': 'Eine Schlusskadenz, die den Song zur Ruhe bringt.',
  'A gentle vamp to fade out on.': 'Ein sanftes Vamp zum Ausblenden.',
  'The IV–I "amen" cadence — restful, conclusive.':
    'Die IV–I-„Amen“-Kadenz — ruhig und abschließend.',
  'Ends on the dominant, leaving the question open.':
    'Endet auf der Dominante und lässt die Frage offen.',

  // ---------------------------------------------------------------- moods
  'EVERYTHING BELOW IS IN': 'ALLES UNTEN STEHT IN',
  '🔒 locked — suggestions stay in this key':
    '🔒 gesperrt — Vorschläge bleiben in dieser Tonart',
  'unlocked — a suggestion may bring its own mode':
    'entsperrt — ein Vorschlag darf seinen eigenen Modus mitbringen',
  'Melancholic': 'Melancholisch',
  'Energetic': 'Energisch',
  'Dreamy': 'Verträumt',
  'Heroic': 'Heldenhaft',
  'Bluesy': 'Bluesig',
  'Epic': 'Episch',
  'Hopeful': 'Hoffnungsvoll',
  'Nostalgic': 'Nostalgisch',
  'Hypnotic': 'Hypnotisch',
  'Sophisticated': 'Raffiniert',
  'Restless': 'Rastlos',
  'Tender': 'Zärtlich',
  'Triumphant': 'Triumphal',
  'Begins on the relative minor and circles home without ever quite settling.':
    'Beginnt auf der Mollparallele und kreist nach Hause, ohne je ganz zur Ruhe zu kommen.',
  'Primary triads, no minor chords, constant forward push.':
    'Hauptdreiklänge, keine Mollakkorde, ständiger Schub nach vorn.',
  'Lydian major sevenths — the raised 4th keeps the tonic floating.':
    'Lydische große Septakkorde — die erhöhte Quarte hält die Tonika in der Schwebe.',
  'Tonic and subdominant trading places, then the dominant to lift it.':
    'Tonika und Subdominante tauschen die Plätze, dann hebt die Dominante das Ganze an.',
  'Dominant sevenths on every degree — grit rather than sweetness.':
    'Dominantseptakkorde auf jeder Stufe — Kante statt Süße.',
  'Minor tonic under three major chords. Scale without brightness.':
    'Molltonika unter drei Durakkorden. Größe ohne Helligkeit.',
  'The ♭2 pressing against the tonic — unresolved and menacing.':
    'Die ♭2 drückt gegen die Tonika — unaufgelöst und bedrohlich.',
  'Starts away from the tonic so arriving home reads as relief.':
    'Beginnt fern der Tonika, damit das Ankommen wie Erleichterung wirkt.',
  'The doo-wop turnaround. Familiar to the point of comfort.':
    'Der Doo-Wop-Turnaround. Vertraut bis zur Behaglichkeit.',
  'Two chords, minor with a major 6th. Built for playing over.':
    'Zwei Akkorde, Moll mit großer Sexte. Gebaut zum Darüberspielen.',
  'ii–V–I with sevenths throughout — the jazz cadence.':
    'ii–V–I durchgehend mit Septimen — die Jazzkadenz.',
  'A stepwise descent that keeps arriving somewhere new.':
    'Ein schrittweiser Abstieg, der immer wieder irgendwo Neues ankommt.',
  'Gentle mediant motion — close voicings, little movement in the bass.':
    'Sanfte mediantische Bewegung — enge Voicings, wenig Bewegung im Bass.',
  'The ♭VII gives it swagger without losing the major tonic.':
    'Die ♭VII gibt ihm Lässigkeit, ohne die Durtonika zu verlieren.',

  // ------------------------------------------------- progression library
  'FAMILY': 'FAMILIE',
  'Progression family': 'Progressionsfamilie',
  'All families ({n})': 'Alle Familien ({n})',
  'Search name, numerals, or a song…': 'Suche nach Name, Stufen oder Song…',
  'Search progressions': 'Progressionen durchsuchen',
  '{n} PROGRESSION': '{n} PROGRESSION',
  '{n} PROGRESSIONS': '{n} PROGRESSIONEN',
  'MATCHING “{query}”': 'PASSEND ZU „{query}“',
  'Nothing matches that. Try a song name, a chord, or clear the search.':
    'Dazu passt nichts. Versuche einen Songtitel, einen Akkord, oder leere die Suche.',
  'Pick a family or search, then tap a progression to open it — you\'ll hear it in the current key. Apply writes it to the timeline. Numerals and chord names are computed from what will actually play.':
    'Wähle eine Familie oder suche, und tippe dann eine Progression an, um sie zu öffnen — du hörst sie in der aktuellen Tonart. Übernehmen schreibt sie in die Timeline. Stufen und Akkordnamen werden aus dem berechnet, was tatsächlich erklingt.',
  '▶ Hear it': '▶ Anhören',
  'HEARD IN': 'ZU HÖREN IN',
  '{n} bar': '{n} Takt',
  '{n} bars': '{n} Takte',
  '(written in {mode})': '(notiert in {mode})',
  'Previewing {name} — tap Apply to keep it.':
    '{name} wird vorgehört — tippe auf Übernehmen, um sie zu behalten.',
  'Stop playback to preview a progression.':
    'Stoppe die Wiedergabe, um eine Progression vorzuhören.',
  'Pop & Rock': 'Pop & Rock',
  'Modal Rock': 'Modaler Rock',
  'Minor Keys': 'Molltonarten',
  'Jazz': 'Jazz',
  'Jazz & Neo-Soul': 'Jazz & Neo-Soul',
  'Blues': 'Blues',
  'Folk & Country': 'Folk & Country',
  'Handbook': 'Handbuch',
  'Axis of Awesome': 'Die vier Akkorde',
  'Axis, Minor Start': 'Die vier Akkorde, Mollbeginn',
  '50s Doo-Wop': 'Doo-Wop der 50er',
  'Three-Chord Rock': 'Drei-Akkord-Rock',
  'Pop-Punk Lift': 'Pop-Punk-Auftrieb',
  'Ballad Climb': 'Balladen-Aufstieg',
  "Pachelbel's Canon": 'Pachelbels Kanon',
  'The four chords behind a startling share of the charts. Endlessly singable.':
    'Die vier Akkorde hinter einem erstaunlichen Teil der Charts. Endlos mitsingbar.',
  'The same loop rotated to begin on the relative minor — wistful rather than triumphant.':
    'Derselbe Loop, gedreht bis zum Beginn auf der Mollparallele — wehmütig statt triumphal.',
  'Ballads, prom scenes, "Stand By Me". Warm and instantly nostalgic.':
    'Balladen, Abschlussballszenen, „Stand By Me“. Warm und sofort nostalgisch.',
  'The primary triads and nothing else. Direct, and hard to make sound wrong.':
    'Die Hauptdreiklänge und sonst nichts. Direkt, und schwer falsch klingen zu lassen.',
  'Starts away from home so the chorus lands as a return.':
    'Beginnt fern von zu Hause, damit der Refrain als Rückkehr landet.',
  'A stepwise rise through the scale — builds tension without a key change.':
    'Ein schrittweiser Anstieg durch die Tonleiter — Spannung ohne Tonartwechsel.',
  'A descending sequence that has outlived three centuries of fashion.':
    'Eine absteigende Sequenz, die drei Jahrhunderte Mode überlebt hat.',
  'Mixolydian Rock': 'Mixolydischer Rock',
  'Dorian Vamp': 'Dorisches Vamp',
  'Grunge ♭VI–♭VII': 'Grunge ♭VI–♭VII',
  'Lydian Lift': 'Lydischer Auftrieb',
  'Phrygian Descent': 'Phrygischer Abstieg',
  'The ♭VII is what makes this rock rather than pop — think "Sweet Home Alabama".':
    'Die ♭VII macht daraus Rock statt Pop — denk an „Sweet Home Alabama“.',
  'Minor with a bright 6th. Hypnotic, jam-friendly, never fully sad.':
    'Moll mit heller Sexte. Hypnotisch, jamfreundlich, nie ganz traurig.',
  'Heavy and modal — the flat 6th and 7th give it the weight.':
    'Schwer und modal — die kleine Sexte und Septime geben ihm das Gewicht.',
  'The ♯4 floats the tonic. Cinematic wonder in two chords.':
    'Die ♯4 lässt die Tonika schweben. Filmisches Staunen in zwei Akkorden.',
  'The ♭2 leaning on the tonic — flamenco and metal share this one.':
    'Die ♭2 lehnt sich an die Tonika — Flamenco und Metal teilen sich diesen.',
  'Andalusian Cadence': 'Andalusische Kadenz',
  'Epic Minor': 'Episches Moll',
  'Minor Ballad': 'Mollballade',
  'Minor Climb': 'Mollaufstieg',
  'A stepwise descent from the tonic. Dramatic, and older than most of what it appears in.':
    'Ein schrittweiser Abstieg von der Tonika. Dramatisch, und älter als das meiste, worin er vorkommt.',
  'i–VI–III–VII. Trailers, anthems, anything that needs scale.':
    'i–VI–III–VII. Trailer, Hymnen, alles, was Größe braucht.',
  'The doo-wop shape in minor — familiar bones, darker colour.':
    'Die Doo-Wop-Form in Moll — vertrautes Gerüst, dunklere Farbe.',
  'Rises through the relative major before falling back to the tonic.':
    'Steigt über die Durparallele, bevor er zur Tonika zurückfällt.',
  'ii–V–I Turnaround': 'ii–V–I-Turnaround',
  'Rhythm Changes A': 'Rhythm Changes A',
  'Bossa Turnaround': 'Bossa-Turnaround',
  'Jazz Blues Head': 'Jazz-Blues-Thema',
  'Circle of Fifths Run': 'Lauf durch den Quintenzirkel',
  'The central cadence of jazz. Learn it in all twelve keys and half the language follows.':
    'Die zentrale Kadenz des Jazz. Lerne sie in allen zwölf Tonarten, und die halbe Sprache folgt von selbst.',
  'I–vi–ii–V, the most-played eight bars in the standard repertoire.':
    'I–vi–ii–V, die meistgespielten acht Takte des Standardrepertoires.',
  'Major sevenths and a gentle ii–V. Nylon strings and brushes.':
    'Große Septakkorde und ein sanftes ii–V. Nylonsaiten und Besen.',
  'Dominant sevenths throughout — the blues with a jazz accent.':
    'Durchgehend Dominantseptakkorde — der Blues mit Jazzakzent.',
  'Root movement by fourths all the way home — every chord pulls to the next.':
    'Grundtonbewegung in Quarten bis nach Hause — jeder Akkord zieht zum nächsten.',
  'Neo-Soul Loop': 'Neo-Soul-Loop',
  'Half-Diminished ii–V–i': 'Halbverminderte ii–V–i',
  'Minor ii–V–i with a ♭9': 'Moll-ii–V–i mit ♭9',
  'Sus4 Release': 'Sus4-Auflösung',
  '6/9 Turnaround': '6/9-Turnaround',
  'Secondary Dominant Cycle': 'Zwischendominanten-Zyklus',
  'Dorian with ninths on everything. The major IV is what makes Dorian sound like Dorian rather than minor.':
    'Dorisch mit Nonen auf allem. Die Dur-IV ist es, die Dorisch nach Dorisch und nicht nach Moll klingen lässt.',
  'The textbook minor cadence: iiø7 sets up the dominant, the dominant lands on a m9.':
    'Die Mollkadenz aus dem Lehrbuch: iiø7 bereitet die Dominante vor, die Dominante landet auf einem m9.',
  'Dm9 – E7♭9 – Am9 in A minor. The v has to be borrowed as a dominant to pull home, and the ♭9 is the note that makes it ache.':
    'Dm9 – E7♭9 – Am9 in a-Moll. Die v muss als Dominante entlehnt werden, um nach Hause zu ziehen, und die ♭9 ist der Ton, der schmerzt.',
  'Hold the 4th, then let it fall to the 3rd. The oldest tension-and-release there is.':
    'Halte die Quarte und lass sie dann auf die Terz fallen. Das älteste Spiel von Spannung und Lösung.',
  'A 6/9 tonic never quite sits down, so the loop keeps turning. The 13th on the V is the full jazz dominant.':
    'Eine 6/9-Tonika setzt sich nie ganz hin, deshalb dreht sich der Loop weiter. Die Tredezime auf der V ist die volle Jazzdominante.',
  'Every chord is the dominant of the next. Each borrowed 7th pulls a fifth down into the chord after it.':
    'Jeder Akkord ist die Dominante des nächsten. Jede entlehnte Septime zieht eine Quinte abwärts in den folgenden Akkord.',
  '12-Bar Blues': '12-taktiger Blues',
  '12-Bar Quick Change': '12-taktiger Blues mit Quick Change',
  'Minor Blues': 'Mollblues',
  'The form. Twelve bars, three chords, a century of music.':
    'Die Form. Zwölf Takte, drei Akkorde, ein Jahrhundert Musik.',
  'Moves to the IV in bar two — more motion early on.':
    'Geht im zweiten Takt zur IV — mehr Bewegung gleich zu Beginn.',
  'The same twelve bars in minor. Slower, heavier, more room to bend.':
    'Dieselben zwölf Takte in Moll. Langsamer, schwerer, mehr Raum zum Ziehen.',
  'Country I–IV–V': 'Country I–IV–V',
  'Folk Circle': 'Folk-Zirkel',
  'Celtic Vamp': 'Keltisches Vamp',
  'The three chords most songs are made of.': 'Die drei Akkorde, aus denen die meisten Songs bestehen.',
  'Home, away, home, away. The campfire progression.':
    'Zuhause, fort, zuhause, fort. Die Lagerfeuer-Progression.',
  'The ♭VII again, this time in a jig. Works beautifully in DADGAD.':
    'Wieder die ♭VII, diesmal in einem Jig. Klingt wunderbar in DADGAD.',

  // ------------------------------------------------------------- handbook
  '1 · Single Major Chord': '1 · Ein einzelner Durakkord',
  '2 · Single Minor Chord': '2 · Ein einzelner Mollakkord',
  '3 · Tonic–Dominant, Major': '3 · Tonika–Dominante, Dur',
  '4 · Tonic–Dominant, Minor': '4 · Tonika–Dominante, Moll',
  '5 · Tonic–Subdominant': '5 · Tonika–Subdominante',
  '6 · Major to Relative Minor': '6 · Von Dur zur Mollparallele',
  '7 · I–IV–V': '7 · I–IV–V',
  '8 · I–IV–V, Plagal Cadence': '8 · I–IV–V, plagale Kadenz',
  '9 · I–IV–V–IV': '9 · I–IV–V–IV',
  '10 · Minor to ♭III': '10 · Von Moll zur ♭III',
  '11 · Minor to ♭VII': '11 · Von Moll zur ♭VII',
  '12 · Doo-Wop / Ice Cream': '12 · Doo-Wop / Eisdiele',
  '12A · I–V–vi–IV': '12A · I–V–vi–IV',
  '12B · I–IV–vi–V': '12B · I–IV–vi–V',
  '13 · Rhythm Changes': '13 · Rhythm Changes',
  '13B · Secondary Dominants': '13B · Zwischendominanten',
  '13D · The Turnaround': '13D · Der Turnaround',
  '14 · ii–V–I–IV': '14 · ii–V–I–IV',
  '15 · Modal with ii and IV': '15 · Modal mit ii und IV',
  '16 · I–♭VII–IV–I': '16 · I–♭VII–IV–I',
  '18 · i–♭III–♭VII–i': '18 · i–♭III–♭VII–i',
  '19 · Andalusian Cadence': '19 · Andalusische Kadenz',
  "20 · Pachelbel's Canon": '20 · Pachelbels Kanon',
  'One chord, held. Everything else in music is a departure from this.':
    'Ein Akkord, gehalten. Alles andere in der Musik ist ein Aufbruch von hier.',
  'The same drone in minor. A whole song can live here.':
    'Derselbe Bordun in Moll. Ein ganzer Song kann hier leben.',
  'Away and back. The smallest complete musical sentence there is.':
    'Fort und zurück. Der kleinste vollständige musikalische Satz, den es gibt.',
  'The same two-chord motion with a minor tonic — darker, and it leans harder.':
    'Dieselbe Zwei-Akkord-Bewegung mit Molltonika — dunkler, und sie lehnt sich stärker.',
  'Away and back without tension. Restful where the dominant is restless.':
    'Fort und zurück ohne Spannung. Ruhig, wo die Dominante rastlos ist.',
  'The same seven notes, seen from its shadow.':
    'Dieselben sieben Töne, aus ihrem Schatten betrachtet.',
  'The three chords most songs are made of.':
    'Die drei Akkorde, aus denen die meisten Songs bestehen.',
  'Ends IV to I rather than V to I — the softer landing.':
    'Endet IV zu I statt V zu I — die weichere Landung.',
  'Sits on the tonic before moving — leaves space for the vocal.':
    'Bleibt zuerst auf der Tonika sitzen — lässt Platz für den Gesang.',
  'Minor tonic to its relative major. Used alone, or to open something longer.':
    'Von der Molltonika zu ihrer Durparallele. Allein verwendet, oder als Auftakt zu etwas Längerem.',
  'Minor, its relative major, and the subtonic. Endlessly loopable.':
    'Moll, seine Durparallele und die Subtonika. Endlos loopbar.',
  'The same four chords rotated. Probably the most recorded loop alive.':
    'Dieselben vier Akkorde, gedreht. Vermutlich der meistaufgenommene Loop überhaupt.',
  'The subdominant arrives early, so the minor lands harder.':
    'Die Subdominante kommt früh, deshalb landet das Moll härter.',
  'I–vi–ii–V. The circle of fifths, walked backwards, four bars at a time.':
    'I–vi–ii–V. Der Quintenzirkel, rückwärts gegangen, vier Takte auf einmal.',
  'Each chord turned into the dominant of the next, so the loop pulls all the way round.':
    'Jeder Akkord wird zur Dominante des nächsten, sodass der Loop die ganze Runde zieht.',
  'iii–vi–ii–V. Tacked on the end to extend an ending, in show tunes and jazz.':
    'iii–vi–ii–V. Hinten angehängt, um einen Schluss zu verlängern, im Musical und im Jazz.',
  'The jazz cadence, then straight out to the subdominant instead of resting.':
    'Die Jazzkadenz, dann direkt weiter zur Subdominante statt zur Ruhe.',
  'Stepwise out of the tonic. Modern pop leans on this constantly.':
    'Schrittweise aus der Tonika heraus. Moderner Pop stützt sich ständig darauf.',
  'Mixolydian rock. The ♭VII is what stops it sounding like a hymn.':
    'Mixolydischer Rock. Die ♭VII verhindert, dass es wie eine Hymne klingt.',
  'The first chord from outside the major scale. Modal, and instantly modern.':
    'Der erste Akkord von außerhalb der Durtonleiter. Modal, und sofort modern.',
  'The loop that never resolves, so it can go round forever.':
    'Der Loop, der sich nie auflöst und sich deshalb ewig drehen kann.',
  'Stepwise descending, out of Flamenco. The V7 at the bottom is what makes it Spanish rather than merely minor.':
    'Schrittweise absteigend, aus dem Flamenco. Die V7 am Ende macht es spanisch statt bloß mollig.',
  'Eight bars from 1680 that pop music has never stopped borrowing.':
    'Acht Takte aus dem Jahr 1680, die sich die Popmusik bis heute ausleiht.',
  'I–vi–IV–V. Fifty years of hits and it still has not worn out.':
    'I–vi–IV–V. Fünfzig Jahre Hits, und er ist immer noch nicht abgenutzt.',

  // ---------------------------------------------------------------- tuner
  'Instrument': 'Instrument',
  'Tuning meter': 'Stimmanzeige',
  'A4 = {hz} Hz': 'A4 = {hz} Hz',
  'Signal:': 'Signal:',
  'Status:': 'Status:',
  'Freq: —': 'Freq.: —',
  'Freq: {hz}Hz': 'Freq.: {hz} Hz',
  'listening': 'hört zu',
  'LOCKED': 'GESTIMMT',
  'FLAT': 'ZU TIEF',
  'SHARP': 'ZU HOCH',
  'START LISTENING': 'ZUHÖREN STARTEN',
  'STOP LISTENING': 'ZUHÖREN BEENDEN',
  'Auto': 'Auto',
  'AUTO': 'AUTO',
  'Manual': 'Manuell',
  'MANUAL · {note}': 'MANUELL · {note}',
  'OPTIONS': 'OPTIONEN',
  'TARGET': 'ZIEL',
  'REFERENCE TONE': 'REFERENZTON',
  'CHIME WHEN IN TUNE': 'SIGNAL BEI SAUBERER STIMMUNG',
  'SENSITIVITY': 'EMPFINDLICHKEIT',
  'RESPONSE': 'ANSPRECHVERHALTEN',
  'IN-TUNE WINDOW': 'TOLERANZFENSTER',
  'REFERENCE A4': 'REFERENZ-A4',
  'Follows the nearest string in the tuning': 'Folgt der nächstgelegenen Saite der Stimmung',
  'Holds the string you pinned': 'Bleibt auf der Saite, die du festgesetzt hast',
  'Follows whichever string of the tuning is nearest to what it hears':
    'Folgt derjenigen Saite der Stimmung, die dem Gehörten am nächsten liegt',
  'Stays on the pinned string, however far out it is':
    'Bleibt auf der festgesetzten Saite, wie weit sie auch daneben liegt',
  'Sine': 'Sinus',
  'Warm': 'Warm',
  'String': 'Saite',
  'Tapping a string pins it without sounding anything.':
    'Das Antippen einer Saite setzt sie fest, ohne dass etwas erklingt.',
  'A clean sine, sounded once. Tap again to hear it again.':
    'Ein sauberer Sinus, einmal angespielt. Tippe erneut, um ihn wieder zu hören.',
  'A triangle — rounder, and easier to pitch against.':
    'Ein Dreieck — runder, und leichter, die Tonhöhe daran abzugleichen.',
  'One pluck of the guitar itself, on the melody voices.':
    'Ein Anschlag der Gitarre selbst, auf den Melodiestimmen.',
  'A short two-note chime the moment a string settles':
    'Ein kurzes Zweitonsignal, sobald sich eine Saite einpendelt',
  'Silent — watch the dial': 'Lautlos — achte auf die Anzeige',
  'Low': 'Niedrig',
  'Normal': 'Normal',
  'High': 'Hoch',
  'Steady': 'Ruhig',
  'Quick': 'Schnell',
  'The default': 'Die Voreinstellung',
  'The default; below what most ears hear': 'Die Voreinstellung; unterhalb dessen, was die meisten Ohren hören',
  'Ignores everything quiet — for noisy rooms': 'Ignoriert alles Leise — für laute Räume',
  'Hears a soft, decaying note for longer': 'Hört einen leisen, ausklingenden Ton länger',
  'Slower needle, less jitter': 'Langsamere Nadel, weniger Zittern',
  'Follows the string immediately': 'Folgt der Saite sofort',
  'Studio — hard to hold, exact when it locks': 'Studio — schwer zu halten, exakt wenn es einrastet',
  'Forgiving — locks quickly on stage': 'Nachsichtig — rastet auf der Bühne schnell ein',
  'Uses the microphone. Nothing is recorded or sent anywhere.':
    'Nutzt das Mikrofon. Es wird nichts aufgezeichnet und nichts irgendwohin gesendet.',
  'Listening is unavailable here — the page CircleSong is embedded in withholds the microphone.':
    'Zuhören ist hier nicht möglich — die Seite, in die CircleSong eingebettet ist, gibt das Mikrofon nicht frei.',
  'Open CircleSong at its own address to listen. Tap a string to hear its exact pitch and tune by ear — that works anywhere.':
    'Öffne CircleSong unter seiner eigenen Adresse, um zuzuhören. Tippe eine Saite an, um ihre genaue Tonhöhe zu hören und nach Gehör zu stimmen — das funktioniert überall.',
  'Audio could not start, so the tuner cannot listen.':
    'Das Audio konnte nicht starten, deshalb kann das Stimmgerät nicht zuhören.',
  'This browser does not offer microphone access to the page.':
    'Dieser Browser bietet der Seite keinen Zugriff auf das Mikrofon.',
  'The page CircleSong is embedded in has not granted it the microphone, so it cannot even ask.':
    'Die Seite, in die CircleSong eingebettet ist, hat ihm das Mikrofon nicht gewährt, es kann also nicht einmal fragen.',
  'Open CircleSong from its own address — the installed app, or the copy served from GitHub — and listening will work.':
    'Öffne CircleSong über seine eigene Adresse — die installierte App oder die von GitHub ausgelieferte Kopie — dann funktioniert das Zuhören.',
  'Meanwhile you can tune by ear: tap a string above to hear its exact pitch.':
    'In der Zwischenzeit kannst du nach Gehör stimmen: Tippe oben eine Saite an, um ihre genaue Tonhöhe zu hören.',
  'Microphone access was refused. Allow it for this page in your browser’s site settings, then switch Listen on again. You can tune by ear in the meantime — tap a string above to hear its pitch.':
    'Der Zugriff auf das Mikrofon wurde verweigert. Erlaube ihn für diese Seite in den Website-Einstellungen deines Browsers und schalte Zuhören dann wieder ein. In der Zwischenzeit kannst du nach Gehör stimmen — tippe oben eine Saite an, um ihre Tonhöhe zu hören.',
  'No microphone was found on this device. Tap a string above to hear its pitch and tune by ear.':
    'Auf diesem Gerät wurde kein Mikrofon gefunden. Tippe oben eine Saite an, um ihre Tonhöhe zu hören und nach Gehör zu stimmen.',
  'The microphone could not be opened — {error}.':
    'Das Mikrofon konnte nicht geöffnet werden — {error}.',
  'unknown error': 'unbekannter Fehler',
  'Guitar': 'Gitarre',
  'Bass': 'Bass',
  'Ukulele': 'Ukulele',
  'Mandolin': 'Mandoline',
  'Banjo': 'Banjo',
  'Violin': 'Violine',
  'Cello / Viola': 'Cello / Bratsche',
  'Chromatic': 'Chromatisch',
  'Chromatic — play any note and it will be named. Tap one to hear it.':
    'Chromatisch — spiele einen beliebigen Ton, und er wird benannt. Tippe einen an, um ihn zu hören.',
  'Standard — E A D G B E': 'Standard — E A D G B E',
  'Drop D — D A D G B E': 'Drop D — D A D G B E',
  'Half step down — E♭ A♭ D♭ G♭ B♭ E♭': 'Einen Halbton tiefer — E♭ A♭ D♭ G♭ B♭ E♭',
  'Full step down — D G C F A D': 'Einen Ganzton tiefer — D G C F A D',
  'Open G — D G D G B D': 'Open G — D G D G B D',
  'Open D — D A D F♯ A D': 'Open D — D A D F♯ A D',
  'DADGAD — D A D G A D': 'DADGAD — D A D G A D',
  'Drop C — C G C F A D': 'Drop C — C G C F A D',
  '7-string — B E A D G B E': '7-saitig — B E A D G B E',
  'Standard 4-string — E A D G': 'Standard, 4-saitig — E A D G',
  'Drop D — D A D G': 'Drop D — D A D G',
  'Half step down — E♭ A♭ D♭ G♭': 'Einen Halbton tiefer — E♭ A♭ D♭ G♭',
  'Standard 5-string — B E A D G': 'Standard, 5-saitig — B E A D G',
  'Standard high-G — G C E A': 'Standard mit hohem G — G C E A',
  'Low-G — G C E A': 'Tiefes G — G C E A',
  'D tuning — A D F♯ B': 'D-Stimmung — A D F♯ B',
  'Baritone — D G B E': 'Bariton — D G B E',
  'Standard — G D A E': 'Standard — G D A E',
  'Open G — F♯ D A D': 'Open G — F♯ D A D',
  'Open G 5-string — g D G B D': 'Open G, 5-saitig — g D G B D',
  'Double C — g C G C D': 'Double C — g C G C D',
  'Sawmill — g D G C D': 'Sawmill — g D G C D',
  'Cello — C G D A': 'Cello — C G D A',
  'Viola — C G D A': 'Bratsche — C G D A',
  'Any note — C1 to B6': 'Beliebiger Ton — C1 bis B6',

  // ---------------------------------------------------------------- songs
  'CURRENT SONG': 'AKTUELLER SONG',
  'Save': 'Speichern',
  'Save as new': 'Als neu speichern',
  'New song': 'Neuer Song',
  'Open': 'Öffnen',
  'Import a song file': 'Eine Songdatei importieren',
  'Nothing saved yet.': 'Noch nichts gespeichert.',
  'Nothing saved yet. Save the current song to start a library.':
    'Noch nichts gespeichert. Speichere den aktuellen Song, um eine Bibliothek anzulegen.',
  '{n} loop': '{n} Loop',
  '{n} loops': '{n} Loops',
  '{n} bar written': '{n} Takt geschrieben',
  '{n} bars written': '{n} Takte geschrieben',
  'saved': 'gespeichert',
  'just now': 'gerade eben',
  '{n} min ago': 'vor {n} Min.',
  '{n} h ago': 'vor {n} Std.',
  'Delete “{name}”? This cannot be undone.': '„{name}“ löschen? Das lässt sich nicht rückgängig machen.',
  'Project deleted.': 'Projekt gelöscht.',
  'That project could not be read.': 'Dieses Projekt konnte nicht gelesen werden.',
  'Opened “{name}”.': '„{name}“ geöffnet.',
  'Saved “{name}”.': '„{name}“ gespeichert.',
  'Loaded “{name}”.': '„{name}“ geladen.',
  'This browser will not let the app save locally.':
    'Dieser Browser lässt die App nicht lokal speichern.',
  'This browser will not let the app store anything locally.':
    'Dieser Browser lässt die App nichts lokal ablegen.',
  "No room left in this browser's storage. Delete a project and try again.":
    'Im Speicher dieses Browsers ist kein Platz mehr. Lösche ein Projekt und versuche es erneut.',
  'Start a new song? Anything unsaved will be lost.':
    'Einen neuen Song beginnen? Alles Ungespeicherte geht verloren.',
  'New song started.': 'Neuer Song begonnen.',
  'Could not read that file — {error}': 'Diese Datei konnte nicht gelesen werden — {error}',
  'Unrecognised file format': 'Unbekanntes Dateiformat',
};

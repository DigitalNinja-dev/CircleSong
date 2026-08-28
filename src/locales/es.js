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
 * Spanish.
 *
 * Keys are the English source strings; see src/i18n.js. Anything absent falls
 * back to English, so a partial dictionary is a working one.
 *
 * Note letters (C, D, E…) are left alone. Spanish-speaking players read both
 * letter names and do-re-mi, and the app draws the letters on a fretboard where
 * "Do" would not fit; the mode and function names, which are read rather than
 * played, are translated.
 */
export const LOCALE_ES = {
  // ---------------------------------------------------------------- chrome
  'Language': 'Idioma',
  'LANGUAGE': 'IDIOMA',
  'Everything the app says, including the lessons and the progression notes.':
    'Todo lo que dice la aplicación, incluidas las lecciones y las notas de las progresiones.',
  'About CircleSong': 'Acerca de CircleSong',
  'Audio engine': 'Motor de audio',
  'Audio engine ready': 'Motor de audio listo',
  'Tap anything to start audio': 'Toca cualquier cosa para iniciar el audio',
  'Audio unavailable — {error}': 'Audio no disponible — {error}',
  'Play': 'Reproducir',
  'Stop': 'Detener',
  'SONG:': 'CANCIÓN:',
  'Song title': 'Título de la canción',
  'Untitled Song': 'Canción sin título',
  'Tempo': 'Tempo',
  'Time signature': 'Compás',
  'Metro': 'Metro',
  'Loop': 'Bucle',
  'Drums': 'Batería',
  'Backing drums': 'Batería de acompañamiento',
  'CLOSE': 'CERRAR',
  'Theme': 'Tema',
  'THEME': 'TEMA',
  'System': 'Sistema',
  'Light': 'Claro',
  'Dark': 'Oscuro',
  'High contrast': 'Alto contraste',
  'Sepia': 'Sepia',
  'Currently {theme}.': 'Ahora mismo: {theme}.',
  'Follows your device, and changes with it.': 'Sigue a tu dispositivo y cambia con él.',
  'The default. Neon on black.': 'El predeterminado. Neón sobre negro.',
  'Ink on paper, with a darker accent so it stays legible.':
    'Tinta sobre papel, con un acento más oscuro para que siga siendo legible.',
  'Pure black and white, visible borders, no faint washes.':
    'Blanco y negro puros, bordes visibles, sin veladuras tenues.',
  'Warm and low-glare, for long sessions.': 'Cálido y sin brillos, para sesiones largas.',

  // ------------------------------------------------------------------ tabs
  'Circle': 'Círculo',
  'Tuner': 'Afinador',
  'Tone': 'Timbre',
  'Compose': 'Componer',
  'Timeline': 'Línea',
  'Assist': 'Asistente',
  'Learn': 'Aprender',
  'Songs': 'Canciones',

  // --------------------------------------------------------- panel headings
  '/01 CIRCLE_OF_FIFTHS': '/01 CÍRCULO_DE_QUINTAS',
  '/02 GUITAR_TONE': '/02 TIMBRE_DE_GUITARRA',
  '/02B VOICE': '/02B VOZ',
  '/02C PLAYBACK': '/02C REPRODUCCIÓN',
  '/03 STRUM_&_RHYTHM': '/03 RASGUEO_Y_RITMO',
  '/03 DRUM_MACHINE': '/03 CAJA_DE_RITMOS',
  '/04 DIATONIC_CHORDS': '/04 ACORDES_DIATÓNICOS',
  '/05 TIMELINE': '/05 LÍNEA_DE_TIEMPO',
  '/06 MODES': '/06 MODOS',
  '/07 SONGWRITING_ASSISTANT': '/07 ASISTENTE_DE_COMPOSICIÓN',
  '/08 SONGS': '/08 CANCIONES',
  '/09 TUNER': '/09 AFINADOR',
  '// APPEARANCE': '// APARIENCIA',
  '// PROGRESSION_LIBRARY': '// BIBLIOTECA_DE_PROGRESIONES',
  '// SAVED_PROJECTS': '// PROYECTOS_GUARDADOS',
  '// SONG_STRUCTURE_IDEAS': '// IDEAS_DE_ESTRUCTURA',
  'EAR_TRAINER // GUESS_THE_MODE': 'ENTRENA_EL_OÍDO // ADIVINA_EL_MODO',

  // ----------------------------------------------------------------- about
  'CircleSong is a circle-of-fifths powered composition tool for guitar players. It maps the theory behind keys, modes, and chord progressions onto an instrument you already play, so you can build song structures — verses, choruses, bridges — by ear and by understanding, not guesswork.':
    'CircleSong es una herramienta de composición para guitarristas construida sobre el círculo de quintas. Traslada la teoría de las tonalidades, los modos y las progresiones al instrumento que ya tocas, para que construyas estructuras de canción —estrofas, estribillos, puentes— de oído y con criterio, no a base de suposiciones.',
  'Pick a key, hear every diatonic chord and its inversions instantly, sequence them into a loop, and get progression ideas grounded in real theory and well-known songs. The Learn tab and ear trainer build your fluency in modes as you write — so composing and studying happen in the same place.':
    'Elige una tonalidad, escucha al instante cada acorde diatónico y sus inversiones, secuéncialos en un bucle y recibe ideas de progresión basadas en teoría real y en canciones conocidas. La pestaña Aprender y el entrenador de oído afinan tu dominio de los modos mientras escribes: componer y estudiar ocurren en el mismo sitio.',
  'Everything the instrument needs is here: eight modelled tones from acoustic steel to grand piano, thirty-four strum and picking patterns, a drum machine, a tuner for eight instruments, and songs you can save. It runs entirely on your device, installs to your home screen, and keeps working with no signal.':
    'Aquí está todo lo que el instrumento necesita: ocho timbres modelados, desde la acústica de cuerdas de acero hasta el piano de cola, treinta y cuatro patrones de rasgueo y punteo, una caja de ritmos, un afinador para ocho instrumentos y canciones que puedes guardar. Funciona por completo en tu dispositivo, se instala en la pantalla de inicio y sigue funcionando sin cobertura.',
  'Copyright © 2026. Free software under the': 'Copyright © 2026. Software libre bajo la',
  ', with no warranty. Section 13 of that licence gives everyone who uses CircleSong over a network the right to its source:':
    ', sin garantía alguna. La sección 13 de esa licencia da a cualquiera que use CircleSong a través de una red el derecho a su código fuente:',
  'Source Code (AGPL v3.0)': 'Código fuente (AGPL v3.0)',

  // ---------------------------------------------------------------- circle
  'Circle of fifths — arrow keys move around the wheel':
    'Círculo de quintas — las flechas del teclado recorren la rueda',
  '{chord} — {numeral}, the {degree}': '{chord} — {numeral}, la {degree}',
  '{chord} — outside this key': '{chord} — fuera de esta tonalidad',
  'Mode': 'Modo',
  'WHEEL TAP PLAYS': 'AL TOCAR LA RUEDA SUENA',
  'Chord': 'Acorde',
  'Note': 'Nota',
  'Show secondary dominants': 'Mostrar dominantes secundarias',
  'The chords that pull into each degree': 'Los acordes que tiran hacia cada grado',
  'SECONDARY DOMINANTS': 'DOMINANTES SECUNDARIAS',
  'Tap one to hear it resolve. Each arrow points at the chord that chord pulls into.':
    'Toca una para oírla resolver. Cada flecha apunta al acorde hacia el que tira.',
  '◄ Fourths (subdominant)': '◄ Cuartas (subdominante)',
  'Fifths (dominant) ►': 'Quintas (dominante) ►',
  'Outer ring — major keys. Inner ring — their relative minors. Bright wedges are diatonic to the current key. Clockwise stacks a 5th toward the dominant; counter-clockwise a 4th toward the subdominant. Lock the key, then tap any wedge to hear it and see how it relates.':
    'Anillo exterior: tonalidades mayores. Anillo interior: sus relativos menores. Los sectores iluminados son diatónicos a la tonalidad actual. En sentido horario se apila una quinta hacia la dominante; en sentido antihorario una cuarta hacia la subdominante. Bloquea la tonalidad y toca cualquier sector para oírlo y ver cómo se relaciona.',
  '🔒 Key Locked — tap wheel to explore': '🔒 Tonalidad bloqueada — toca la rueda para explorar',
  '🔓 Lock Key to Explore': '🔓 Bloquea la tonalidad para explorar',
  '{note} — degree {n} of the key ({numeral})': '{note} — grado {n} de la tonalidad ({numeral})',
  '{chord} is the {function} ({numeral}) of {key} — a {interval} above the root.':
    '{chord} es la {function} ({numeral}) de {key} — una {interval} por encima de la fundamental.',
  '{chord} sits a {interval} from {key} — outside the current key, a borrowed or chromatic color.':
    '{chord} está a una {interval} de {key} — fuera de la tonalidad actual, un color prestado o cromático.',
  'The V7 of {target} — it borrows a note from outside the key to point at the {numeral} chord.':
    'La V7 de {target} — toma prestada una nota de fuera de la tonalidad para apuntar al acorde {numeral}.',
  'The key’s own v is minor and cannot pull home. Raising its third makes {chord}, which can.':
    'El v propio de la tonalidad es menor y no puede tirar hacia casa. Subir su tercera lo convierte en {chord}, que sí puede.',
  'Borrowed': 'Prestado',

  // ------------------------------------------------- functions and degrees
  'Tonic': 'Tónica',
  'Supertonic': 'Supertónica',
  'Mediant': 'Mediante',
  'Subdominant': 'Subdominante',
  'Dominant': 'Dominante',
  'Submediant': 'Submediante',
  'Leading Tone': 'Sensible',
  'Home base — the point of rest the progression resolves to.':
    'La casa: el punto de reposo al que resuelve la progresión.',
  'Often leads toward the dominant; sets up motion away from home.':
    'Suele conducir a la dominante; pone en marcha el alejamiento de casa.',
  'Colors the tonic, blending stability with subtle tension.':
    'Colorea la tónica, mezclando estabilidad con una tensión sutil.',
  'Pulls away from home and opens the door to the dominant.':
    'Se aleja de casa y abre la puerta a la dominante.',
  'Strongest pull back to the tonic — the engine of resolution.':
    'El tirón más fuerte de vuelta a la tónica: el motor de la resolución.',
  'A gentle detour from the tonic, often feels wistful or reflective.':
    'Un desvío suave desde la tónica; suele sonar nostálgico o reflexivo.',
  'Maximum tension — wants urgently to resolve back to the tonic.':
    'Tensión máxima: pide con urgencia resolver a la tónica.',
  '{function} chord in this key.': 'Acorde de {function} en esta tonalidad.',
  'home': 'casa',
  'a step away from home': 'a un paso de casa',
  'the tonic\'s shadow': 'la sombra de la tónica',
  'the lift': 'el impulso',
  'the pull back home': 'el tirón de vuelta a casa',
  'the relative minor': 'el relativo menor',
  'the approach chord': 'el acorde de aproximación',

  // ---------------------------------------------------------------- modes
  'Ionian': 'Jónico',
  'Dorian': 'Dórico',
  'Phrygian': 'Frigio',
  'Lydian': 'Lidio',
  'Mixolydian': 'Mixolidio',
  'Aeolian': 'Eólico',
  'Locrian': 'Locrio',
  'Ionian (Major)': 'Jónico (mayor)',
  'Aeolian (Minor)': 'Eólico (menor)',
  'Major scale': 'Escala mayor',
  'Natural minor': 'Menor natural',
  'Bright, resolved, happy': 'Brillante, resuelto, alegre',
  'Minor but hopeful, moody without being sad': 'Menor pero esperanzado; con carácter sin ser triste',
  'Dark, exotic, tense': 'Oscuro, exótico, tenso',
  'Dreamy, floating, cinematic': 'Onírico, flotante, cinematográfico',
  'Bluesy, rootsy major': 'Mayor con aire de blues y de raíces',
  'Sad, melancholic, introspective': 'Triste, melancólico, introspectivo',
  'Unstable, tense, rarely a home base': 'Inestable, tenso, rara vez un punto de reposo',
  'The default major-key sound — home base for pop, country, and classical.':
    'El sonido mayor por defecto: la casa del pop, el country y la música clásica.',
  'The major 6th is the giveaway — vamp i–IV for a jazzy, less melancholic minor sound (Santana, Radiohead).':
    'La sexta mayor lo delata: haz un vamp i–IV para un menor jazzístico y menos melancólico (Santana, Radiohead).',
  'The ♭2 gives it away — vamp i–♭II for a flamenco or metal flavor.':
    'El ♭2 lo delata: haz un vamp i–♭II para un sabor flamenco o metal.',
  'The ♯4 makes it float above plain major — vamp I–II for a "movie score" wonder.':
    'El ♯4 lo hace flotar por encima del mayor corriente: haz un vamp I–II para ese asombro de banda sonora.',
  'Major with a flat 7th — vamp I–♭VII for classic rock and blues-rock.':
    'Mayor con séptima menor: haz un vamp I–♭VII para rock clásico y blues-rock.',
  'The default minor-key sound — vamp i–VI for that classic sad or epic minor feel.':
    'El sonido menor por defecto: haz un vamp i–VI para ese menor triste o épico de siempre.',
  'Built on a diminished triad — usually a passing color (like vii° in a major key) rather than a tonic.':
    'Construido sobre una tríada disminuida: casi siempre un color de paso (como el vii° en una tonalidad mayor) más que una tónica.',
  'Modes are the 7 scales hiding inside every major scale — same notes, different starting point, different mood. Pick one to hear it and read how guitarists use it.':
    'Los modos son las 7 escalas escondidas dentro de cada escala mayor: las mismas notas, otro punto de partida, otro carácter. Elige uno para oírlo y leer cómo lo usan los guitarristas.',
  '▶ Play Scale': '▶ Tocar escala',
  '▶ Play Vamp': '▶ Tocar vamp',
  'Scale degrees compared with the major scale': 'Grados de la escala comparados con la escala mayor',
  'Modes identified correctly at least once': 'Modos identificados correctamente al menos una vez',
  'Score:': 'Puntuación:',
  'Streak: {n} (best {best})': 'Racha: {n} (mejor {best})',
  '▶ Start': '▶ Empezar',
  '↻ New Round': '↻ Nueva ronda',
  'Correct! 🎧': '¡Correcto! 🎧',
  'Not quite — that was {mode}': 'Casi — era {mode}',
  '{mode} — identified': '{mode} — identificado',

  // -------------------------------------------------------------- intervals
  'Unison (root)': 'Unísono (fundamental)',
  'Minor 2nd': '2ª menor',
  'Major 2nd': '2ª mayor',
  'Minor 3rd': '3ª menor',
  'Major 3rd': '3ª mayor',
  'Perfect 4th': '4ª justa',
  'Tritone': 'Tritono',
  'Perfect 5th': '5ª justa',
  'Minor 6th': '6ª menor',
  'Major 6th': '6ª mayor',
  'Minor 7th': '7ª menor',
  'Major 7th': '7ª mayor',

  // ------------------------------------------------------------------ tone
  'VOLUME': 'VOLUMEN',
  'BRIGHTNESS': 'BRILLO',
  'SUSTAIN': 'SOSTENIDO',
  'PICK POS': 'POS. PÚA',
  'AUDITION': 'AUDICIÓN',
  '1 bar': '1 compás',
  'Play a full bar': 'Tocar un compás entero',
  'Play {n} beat': 'Tocar {n} tiempo',
  'Play {n} beats': 'Tocar {n} tiempos',
  'Cut previous sound': 'Cortar el sonido anterior',
  'Each chord silences the one before it': 'Cada acorde silencia al anterior',
  'On': 'Sí',
  'Off': 'No',
  'TUNING': 'AFINACIÓN',
  'Tuning': 'Afinación',

  // ---------------------------------------------------------------- rhythm
  'STYLE': 'ESTILO',
  'NOW PLAYING': 'SONANDO AHORA',
  'FEEL': 'AIRE',
  'SWING': 'SWING',
  'HUMANIZE': 'HUMANIZAR',
  'Rhythm family': 'Familia rítmica',
  'All feels ({n})': 'Todos los aires ({n})',
  'Strumming': 'Rasgueo',
  'Muted & Percussive': 'Apagado y percusivo',
  'Reggae, Ska & Offbeat': 'Reggae, ska y contratiempo',
  'Jazz Comping': 'Acompañamiento de jazz',
  'Latin & Syncopated': 'Latino y sincopado',
  'Country & Bluegrass': 'Country y bluegrass',
  'Other Meters': 'Otros compases',
  'Fingerstyle': 'Fingerstyle',
  'Keyboard': 'Teclado',
  'written for {lo}–{hi} BPM': 'escrito para {lo}–{hi} BPM',
  'Written for {lo}–{hi} BPM': 'Escrito para {lo}–{hi} BPM',
  'any tempo': 'cualquier tempo',
  'Set {bpm} BPM': 'Poner {bpm} BPM',
  'You are at {bpm}; this feel is written for {lo}–{hi}':
    'Estás en {bpm}; este aire está escrito para {lo}–{hi}',
  'machine': 'máquina',
  'Straight': 'Recto',
  'Double-time': 'Doble tiempo',
  'Half-time': 'Medio tiempo',
  'The pattern as written.': 'El patrón tal como está escrito.',
  'Twice the density at the same tempo — a skank becomes ska.':
    'El doble de densidad al mismo tempo: un skank se vuelve ska.',
  'The figure stretched across two bars. Everything gets heavier.':
    'La figura estirada a lo largo de dos compases. Todo pesa más.',
  'Straight 8ths': 'Corcheas rectas',
  '16th Pop Strum': 'Rasgueo pop en semicorcheas',
  'Folk D-DU-UDU': 'Folk A-AB-BAB',
  'Driving 16ths': 'Semicorcheas con empuje',
  'Anthem Half-Time': 'Himno a medio tiempo',
  'Punk Downstrokes': 'Punk a golpe abajo',
  'Muted Chuck': 'Chuck apagado',
  'Funk 16ths': 'Semicorcheas funk',
  'Disco Chank': 'Chank disco',
  'Reggae Skank': 'Skank de reggae',
  'One Drop': 'One drop',
  'Rocksteady': 'Rocksteady',
  'Ska Upstrokes': 'Ska a golpe arriba',
  'Ska Bubble (16ths)': 'Burbuja de ska (semicorcheas)',
  'Jazz Swing': 'Swing de jazz',
  'Charleston Comp': 'Acompañamiento charleston',
  'Bossa Nova': 'Bossa nova',
  'Rumba Clave': 'Clave de rumba',
  'Rumba Flamenca': 'Rumba flamenca',
  'Country Boom-Chick': 'Country boom-chick',
  'Bluegrass Boom-Chuck': 'Bluegrass boom-chuck',
  'Waltz Strum': 'Rasgueo de vals',
  'Ballad 6/8': 'Balada en 6/8',
  'Slow Blues 12/8': 'Blues lento en 12/8',
  'Fingerstyle Arp': 'Arpegio fingerstyle',
  'Travis Picking': 'Travis picking',
  'Rising Arpeggio': 'Arpegio ascendente',
  'Let Ring': 'Dejar sonar',
  'Block Chords': 'Acordes en bloque',
  'Ballad Left Hand': 'Mano izquierda de balada',
  'Alberti Bass': 'Bajo de Alberti',
  'Broken Chord': 'Acorde quebrado',
  'Comping Stabs': 'Golpes de acompañamiento',
  'Reggae Organ Bubble': 'Burbuja de órgano reggae',

  // ----------------------------------------------------------------- drums
  'Groove': 'Groove',
  'Drum kit': 'Batería',
  'Drum step sequencer': 'Secuenciador de pasos',
  'DRUM VOL': 'VOL. BATERÍA',
  'Tap a step to cycle it through soft, medium and hard, then off. Tap a voice name to preview it; the ✕ clears that row.':
    'Toca un paso para pasarlo por suave, medio y fuerte, y luego apagarlo. Toca el nombre de una voz para escucharla; la ✕ borra esa fila.',
  'Clear grid': 'Vaciar rejilla',
  'Reset groove': 'Restablecer groove',
  'Double': 'Duplicar',
  '✦ Vary': '✦ Variar',
  'Copy the first half onto the second': 'Copiar la primera mitad sobre la segunda',
  'Nudge the groove into a variation of itself': 'Empujar el groove hacia una variación de sí mismo',
  'Fill before the loop turns': 'Redoble antes de que gire el bucle',
  'A short fill on the last bar': 'Un redoble corto en el último compás',
  'Preview {voice}': 'Escuchar {voice}',
  'Clear {voice}': 'Borrar {voice}',
  '{voice} step {n}': '{voice}, paso {n}',
  'Kick': 'Bombo',
  'Snare': 'Caja',
  'Clap': 'Palmada',
  'Rim': 'Aro',
  'Hat': 'Charles',
  'Open Hat': 'Charles abierto',
  'Ride': 'Ride',
  'Crash': 'Crash',
  'Tom': 'Tom',
  'Shaker': 'Shaker',
  'Rock Standard': 'Rock estándar',
  'Cajon & Percussion': 'Cajón y percusión',
  'Acoustic Cajon': 'Cajón acústico',
  'Reggae / Dub': 'Reggae / dub',
  'Jazz Brushes': 'Escobillas de jazz',
  'Lo-Fi / Chillhop': 'Lo-fi / chillhop',
  'Hard Rock / Metal': 'Hard rock / metal',
  'Rock & Pop': 'Rock y pop',
  'Modern Rock Drive': 'Empuje de rock moderno',
  'Pop / Funk 16ths': 'Semicorcheas pop / funk',
  'Indie Straight-8': 'Indie en corcheas',
  'Half-Time Groove': 'Groove a medio tiempo',
  'Motown Pocket': 'Pocket Motown',
  'Punk D-Beat': 'Punk d-beat',
  'Metal Double-Kick': 'Metal a doble bombo',
  'Metal Half-Time': 'Metal a medio tiempo',
  'Funk & Soul': 'Funk y soul',
  'Funk Ghost Notes': 'Notas fantasma de funk',
  'Gospel Shuffle': 'Shuffle gospel',
  'Boom Bap': 'Boom bap',
  'Hip-Hop & Lo-Fi': 'Hip-hop y lo-fi',
  'Lo-Fi Chillhop': 'Chillhop lo-fi',
  'Trap': 'Trap',
  'Breakbeat': 'Breakbeat',
  'Electronic & Dance': 'Electrónica y baile',
  'Disco Four-on-Floor': 'Disco a cuatro por el suelo',
  'Deep House': 'Deep house',
  'House': 'House',
  'Techno': 'Techno',
  'Latin': 'Latino',
  'Son Montuno (2-3)': 'Son montuno (2-3)',
  'Samba': 'Samba',
  'Partido Alto': 'Partido alto',
  'Merengue': 'Merengue',
  'Cumbia Clásica': 'Cumbia clásica',
  'Cumbia Moderna': 'Cumbia moderna',
  'Soca': 'Soca',
  'Afro-Cuban 6/8': 'Afrocubano en 6/8',
  'Reggae & Caribbean': 'Reggae y Caribe',
  'Reggae One-Drop': 'Reggae one-drop',
  'Reggae Steppers': 'Reggae steppers',
  'Jazz & Blues': 'Jazz y blues',
  'Jazz Swing Ride': 'Ride de swing de jazz',
  'Slow Blues Shuffle': 'Shuffle de blues lento',
  'Acoustic & Folk': 'Acústico y folk',
  'Folk Waltz': 'Vals folk',
  'Country Train': 'Tren de country',
  'Metal': 'Metal',

  // -------------------------------------------------------- chord builder
  'SIZE': 'TAMAÑO',
  'COLOUR': 'COLOR',
  'ALTER': 'ALTERAR',
  'SHAPE': 'POSICIÓN',
  'Root': 'Fundamental',
  '1st Inv': '1ª inv.',
  '2nd Inv': '2ª inv.',
  'Drop-2': 'Drop-2',
  'Drop-3': 'Drop-3',
  '↻ Next shape': '↻ Siguiente posición',
  '▶ Preview': '▶ Escuchar',
  'Chord diagram': 'Diagrama de acorde',
  'No playable shape': 'Ninguna posición tocable',
  'No playable shape for that chord in this tuning.':
    'No hay ninguna posición tocable para ese acorde en esta afinación.',
  'Open Position': 'Posición abierta',
  'Position — {fret}fr': 'Posición — traste {fret}',
  'Triad': 'Tríada',
  'Seventh chord': 'Acorde de séptima',
  'Ninth': 'Novena',
  'Eleventh': 'Oncena',
  'Triad — root, third, fifth': 'Tríada: fundamental, tercera, quinta',
  'Thirteenth — the full stack': 'Trecena: la pila completa',
  'Reset this chord': 'Restablecer este acorde',
  'Reset all': 'Restablecer todo',
  'Add a {alteration}': 'Añadir un {alteration}',
  'Alterations need a seventh — pick 7 or larger first.':
    'Las alteraciones necesitan una séptima: elige antes 7 o más.',
  'Diatonic': 'Diatónico',
  'Dom 7': 'Dom 7',
  'The chord the key gives you.': 'El acorde que te da la tonalidad.',
  'A dominant on this degree — the secondary-dominant pull.':
    'Una dominante sobre este grado: el tirón de la dominante secundaria.',
  'Third replaced by the fourth. Suspended, wants to resolve.':
    'La tercera sustituida por la cuarta. Suspendido, quiere resolver.',
  'Third replaced by the second. Open and unresolved.':
    'La tercera sustituida por la segunda. Abierto y sin resolver.',
  'Sixth instead of a seventh. Warm, settled, vintage.':
    'Sexta en lugar de séptima. Cálido, asentado, vintage.',
  'Ninth added over a triad, with no seventh.': 'Novena añadida sobre una tríada, sin séptima.',
  'Fully diminished — a passing chord that leads anywhere.':
    'Disminuido completo: un acorde de paso que lleva a cualquier parte.',
  'Half-diminished. The ii of a minor ii–V–i.': 'Semidisminuido. El ii de un ii–V–i menor.',
  'Raised fifth, pushing upward.': 'Quinta aumentada, empujando hacia arriba.',
  '{hint} — idiomatic on this degree.': '{hint} — idiomático en este grado.',
  'Plain triad — the chord at its most direct.': 'Tríada simple: el acorde en su forma más directa.',
  'Seventh added: the chord gains a direction to move in.':
    'Séptima añadida: el acorde gana una dirección hacia la que moverse.',
  'Ninth on top — warmth and colour without changing the function.':
    'Novena arriba: calidez y color sin cambiar la función.',
  'Eleventh — open and suspended over the third.': 'Oncena: abierta y suspendida sobre la tercera.',
  'Thirteenth — the full stack, the sound of a jazz voicing.':
    'Trecena: la pila completa, el sonido de una voz de jazz.',
  'Diatonic — {role} in this key.': 'Diatónico: {role} en esta tonalidad.',
  'The {alterations} tightens the tension — resolve it by step into the next chord.':
    'El {alterations} aprieta la tensión: resuélvelo por grados conjuntos hacia el acorde siguiente.',
  ' and ': ' y ',
  'Secondary dominant — the V7 of {target}, so it pulls to the {numeral} chord.':
    'Dominante secundaria: la V7 de {target}, así que tira hacia el acorde {numeral}.',
  'Borrowed dominant pulling to {target}, which sits outside this key.':
    'Dominante prestada que tira hacia {target}, que queda fuera de esta tonalidad.',
  "The key's own dominant, made a true V7 — the strongest pull to the tonic.":
    'La dominante propia de la tonalidad, convertida en una V7 de verdad: el tirón más fuerte hacia la tónica.',
  'No third, so it is neither major nor minor — it wants the chord after it.':
    'Sin tercera, así que no es mayor ni menor: pide el acorde siguiente.',
  'Symmetrical: it can resolve up a semitone into almost anything.':
    'Simétrico: puede resolver un semitono hacia arriba a casi cualquier cosa.',
  'Half-diminished — the ii of a minor ii–V–i, heading for the dominant.':
    'Semidisminuido: el ii de un ii–V–i menor, camino de la dominante.',
  'A sixth instead of a seventh: settled rather than in motion.':
    'Una sexta en lugar de una séptima: asentado más que en movimiento.',
  'A ninth over a plain triad — colour with no seventh to resolve.':
    'Una novena sobre una tríada simple: color sin séptima que resolver.',
  "The raised fifth leans upward into the next chord's root or third.":
    'La quinta aumentada se inclina hacia la fundamental o la tercera del acorde siguiente.',
  'Solo with {scale}.': 'Improvisa con {scale}.',
  'Careful with {note}.': 'Cuidado con {note}.',
  "The key's own notes, starting from this chord's root.":
    'Las notas propias de la tonalidad, empezando por la fundamental de este acorde.',
  'Altered (super-locrian)': 'Alterada (superlocria)',
  'Every tension is raised or lowered — this is the scale the ♭9 is asking for.':
    'Toda tensión está alterada: esta es la escala que pide el ♭9.',
  'Lydian dominant': 'Lidia dominante',
  'A dominant with a raised 4th, which is exactly the ♯11.':
    'Una dominante con la cuarta aumentada, que es exactamente el ♯11.',
  "The dominant scale. The 4th clashes with the chord's 3rd — pass through it, do not land on it.":
    'La escala de la dominante. La cuarta choca con la tercera del acorde: pasa por ella, no te quedes ahí.',
  'Diminished (half–whole)': 'Disminuida (semitono–tono)',
  'Symmetrical, like the chord — it works from any of the four notes.':
    'Simétrica, como el acorde: funciona desde cualquiera de las cuatro notas.',
  'Locrian ♮2': 'Locria ♮2',
  'Locrian with the 2nd raised, which keeps the 9th usable.':
    'Locria con la segunda subida, lo que deja la novena utilizable.',

  // ------------------------------------------------ suggestions and reasons
  'SUGGESTED NEXT': 'SUGERIDO A CONTINUACIÓN',
  'EVERY CHORD IN THE KEY': 'TODOS LOS ACORDES DE LA TONALIDAD',
  'THIS CHORD': 'ESTE ACORDE',
  'THIS LOOP IS A': 'ESTE BUCLE ES UN',
  'HOW THIS LOOP READS': 'CÓMO SE LEE ESTE BUCLE',
  'Follow the key': 'Seguir la tonalidad',
  'Remove chord': 'Quitar el acorde',
  'Section role': 'Papel de la sección',
  'Smooth voicings': 'Voces suaves',
  'Pick shapes that connect, so the hand barely moves':
    'Elige posiciones que se enlacen, para que la mano apenas se mueva',
  'Clear all': 'Vaciar todo',
  'Done': 'Listo',
  'BAR {n}': 'COMPÁS {n}',
  'BAR {n} · {half} HALF': 'COMPÁS {n} · {half} MITAD',
  'FIRST': 'PRIMERA',
  'SECOND': 'SEGUNDA',
  'Bar {n}': 'Compás {n}',
  'Split bar into two chords': 'Dividir el compás en dos acordes',
  'Clear': 'Borrar',
  '+ Loop': '+ Bucle',
  'Duplicate': 'Duplicar',
  'Delete': 'Eliminar',
  'Add an empty loop': 'Añadir un bucle vacío',
  'Duplicate this loop': 'Duplicar este bucle',
  'Delete this loop': 'Eliminar este bucle',
  'Loop {name}': 'Bucle {name}',
  'Loop name': 'Nombre del bucle',
  'Starts at the next bar': 'Empieza en el compás siguiente',
  'A big jump from the previous chord — try Smooth voicings.':
    'Un salto grande desde el acorde anterior: prueba con Voces suaves.',
  'Fret movement from the previous chord.': 'Movimiento de trastes desde el acorde anterior.',
  'Total fret movement across the loop: {cost}.':
    'Movimiento total de trastes en el bucle: {cost}.',
  'Drop this bar’s own setting and follow the chord variation from Compose.':
    'Descartar el ajuste propio de este compás y seguir la variación de acorde de Componer.',
  'This bar already follows the chord variation set in Compose.':
    'Este compás ya sigue la variación de acorde fijada en Componer.',
  'Timeline is empty — add chords, or switch the metronome on.':
    'La línea de tiempo está vacía: añade acordes o enciende el metrónomo.',
  'Loaded {chords} chords into {bars} bars.': 'Se cargaron {chords} acordes en {bars} compases.',
  'Add another chord to hear a progression.': 'Añade otro acorde para oír una progresión.',
  'Perfect cadence': 'Cadencia perfecta',
  'Plagal cadence': 'Cadencia plagal',
  'Half cadence': 'Semicadencia',
  'Deceptive cadence': 'Cadencia rota',
  'perfect': 'perfecta',
  'plagal': 'plagal',
  'half': 'suspendida',
  'any': 'cualquiera',
  'Dominant to tonic — the section lands.': 'De dominante a tónica: la sección aterriza.',
  'IV to I — the "amen" ending, softer than a perfect cadence.':
    'De IV a I: el final de «amén», más suave que una cadencia perfecta.',
  'Ends on the dominant, unresolved — it hands over to whatever comes next.':
    'Termina en la dominante, sin resolver: le pasa el testigo a lo que venga después.',
  'The dominant resolves to vi instead of I — the ending is dodged on purpose.':
    'La dominante resuelve al vi en lugar de al I: el final se esquiva a propósito.',
  'A {section} usually ends with a {expected} cadence; this one ends with a {actual}.':
    'Un/a {section} suele terminar con una cadencia {expected}; este termina con una {actual}.',
  'No clear cadence — the section stops rather than ends.':
    'Sin cadencia clara: la sección se detiene en lugar de terminar.',
  'Nothing here acts as a dominant, so the loop stays flat. Try a V7 before the turn.':
    'Aquí nada hace de dominante, así que el bucle se queda plano. Prueba una V7 antes del giro.',
  'All plain triads. A 7th or 9th on one chord will give the loop a centre of gravity.':
    'Solo tríadas simples. Una séptima o una novena en un acorde le dará al bucle un centro de gravedad.',
  'same chord': 'el mismo acorde',
  'a move': 'un movimiento',
  'down a fifth — the strongest move there is': 'una quinta abajo: el movimiento más fuerte que hay',
  'down a third — two notes stay put': 'una tercera abajo: dos notas se quedan quietas',
  'up a step': 'un grado arriba',
  'down a step': 'un grado abajo',
  'up a third': 'una tercera arriba',
  'up a fifth — a step backwards, used deliberately':
    'una quinta arriba: un paso atrás, usado a propósito',
  'opens a {section} well': 'abre bien un/a {section}',
  'ends a {section} the way it should': 'termina un/a {section} como debe',
  'resolving here would spend the tension the {section} is building':
    'resolver aquí gastaría la tensión que está acumulando el/la {section}',
  'the tonic, which states the key outright': 'la tónica, que enuncia la tonalidad sin rodeos',
  'resolves the dominant': 'resuelve la dominante',
  'subdominant into dominant — the standard approach':
    'de subdominante a dominante: la aproximación estándar',
  'home straight to the dominant, which is how half a songbook works':
    'de casa directo a la dominante, que es como funciona medio cancionero',
  'steps away from home': 'se aleja de casa por grados conjuntos',
  'pulls back from the dominant, which loosens the tension':
    'retrocede desde la dominante, lo que afloja la tensión',
  'The m7 — this is the ii of a ii–V, and it wants the dominant.':
    'El m7: este es el ii de un ii–V y pide la dominante.',
  'A m9: the same function, more air.': 'Un m9: la misma función, más aire.',
  'Suspended, which delays the move.': 'Suspendido, lo que retrasa el movimiento.',
  'A maj7 on the subdominant — soft, and it floats.':
    'Un maj7 sobre la subdominante: suave, y flota.',
  'A 6th chord, the settled vintage sound.': 'Un acorde de sexta, el sonido vintage asentado.',
  'add9 keeps it a triad but opens it up.': 'El add9 lo deja en tríada pero lo abre.',
  'The plain minor triad — the most direct statement of home.':
    'La tríada menor simple: la manera más directa de decir «casa».',
  'A m7 tonic: home, but still moving.': 'Una tónica m7: casa, pero todavía en movimiento.',
  'A m9 tonic, which is where a lot of neo-soul lives.':
    'Una tónica m9, que es donde vive buena parte del neo-soul.',
  'm6 — brighter than it looks, because of the raised 6th.':
    'm6: más luminoso de lo que parece, por la sexta mayor.',
  'The plain triad — nothing is clearer than this.': 'La tríada simple: nada es más claro que esto.',
  'maj7 makes the tonic dreamier and less final.':
    'El maj7 vuelve la tónica más soñadora y menos concluyente.',
  'A 6/9 chord: resolved, but not a full stop.': 'Un acorde 6/9: resuelto, pero sin punto final.',
  'add9 — a triad with light on it.': 'add9: una tríada con luz encima.',
  'A true dominant 7th — the pull home.': 'Una séptima de dominante de verdad: el tirón hacia casa.',
  'Add the 9th for warmth without losing the pull.':
    'Añade la novena para ganar calidez sin perder el tirón.',
  'A 13th: the full dominant sound.': 'Una trecena: el sonido dominante completo.',
  'Suspend the third, then release it into the 3rd.':
    'Suspende la tercera y luego suéltala sobre la tercera.',
  'With a ♭9 this is the classic minor-key dominant.':
    'Con un ♭9 esta es la dominante clásica de tonalidad menor.',
  'Half-diminished is how this degree is normally voiced — it heads for the dominant.':
    'Semidisminuido es como se suele armar este grado: se dirige a la dominante.',
  'The bare diminished triad, which is harsher and rarely held.':
    'La tríada disminuida desnuda, más áspera y que rara vez se sostiene.',
  'Fully diminished, as a passing chord between two neighbours.':
    'Disminuido completo, como acorde de paso entre dos vecinos.',

  // ------------------------------------------------------- song structures
  'Intro': 'Intro',
  'Verse': 'Estrofa',
  'Pre-Chorus': 'Pre-estribillo',
  'Chorus': 'Estribillo',
  'Bridge': 'Puente',
  'Outro': 'Coda',
  'Apply': 'Aplicar',
  'Apply to timeline': 'Aplicar a la línea de tiempo',
  'Establish the key without spending the big moment.':
    'Establecer la tonalidad sin gastar el gran momento.',
  'A loop that can carry many different melodies.':
    'Un bucle capaz de sostener muchas melodías distintas.',
  'Climb, and hand the chorus an unresolved dominant.':
    'Subir y entregarle al estribillo una dominante sin resolver.',
  'The strongest, plainest statement of the key.':
    'La afirmación más rotunda y más simple de la tonalidad.',
  'Leave home so returning means something.': 'Salir de casa para que volver signifique algo.',
  'Land, or vamp somewhere restful.': 'Aterrizar, o hacer un vamp en algún sitio tranquilo.',
  'Simple & Open': 'Simple y abierta',
  'Suspended Mood': 'Ambiente suspendido',
  'Single-Chord Drone': 'Bordón de un solo acorde',
  'Dominant Tease': 'Insinuación de dominante',
  'Establishes the key calmly before the verse enters.':
    'Establece la tonalidad con calma antes de que entre la estrofa.',
  'Opens on a softer, unresolved colour.': 'Abre con un color más suave y sin resolver.',
  'Holds the tonic so the first vocal line does the work.':
    'Sostiene la tónica para que el primer verso haga el trabajo.',
  'Starts on tension and resolves into bar one.':
    'Empieza en tensión y resuelve en el primer compás.',
  'Narrative Motion': 'Movimiento narrativo',
  'Understated': 'Contenida',
  'Descending Line': 'Línea descendente',
  'Minor Verse': 'Estrofa menor',
  'Steady storytelling motion, familiar and grounded.':
    'Movimiento narrativo constante, familiar y con los pies en el suelo.',
  'Restrained — leaves room for the chorus to lift.':
    'Contenida: deja sitio para que el estribillo levante.',
  'The axis loop, which never tires of being sung over.':
    'El bucle del eje, sobre el que nunca cansa cantar.',
  'Same chords starting on the relative minor — darker footing.':
    'Los mismos acordes empezando por el relativo menor: un terreno más oscuro.',
  'Rising Tension': 'Tensión creciente',
  'Stepwise Build': 'Construcción por grados',
  'Hold the Five': 'Sostener el quinto',
  'Climbs and holds the dominant so the chorus can release it.':
    'Sube y sostiene la dominante para que el estribillo pueda soltarla.',
  'Walks up the scale — momentum without a key change.':
    'Camina por la escala hacia arriba: impulso sin cambio de tonalidad.',
  'Two chords, twice as long each. Maximum anticipation.':
    'Dos acordes, cada uno el doble de largo. Máxima expectación.',
  'Big Lift': 'Gran subida',
  'Anthemic': 'De himno',
  'Plagal Power': 'Fuerza plagal',
  'Minor Hook': 'Gancho menor',
  'Climbs above the verse for a euphoric hook.':
    'Sube por encima de la estrofa para un gancho eufórico.',
  'Instantly singable — the classic pop lift.':
    'Cantable al instante: el clásico impulso del pop.',
  'Tonic and subdominant only. Hymn-like and immovable.':
    'Solo tónica y subdominante. Como un himno, e inamovible.',
  'Begins minor and resolves major — bittersweet.':
    'Empieza en menor y resuelve en mayor: agridulce.',
  'Harmonic Detour': 'Desvío armónico',
  'Mediant Shift': 'Giro mediántico',
  'Relative Minor': 'Relativo menor',
  'Suspended Halt': 'Parada suspendida',
  'Borrows jazz motion to contrast the chorus.':
    'Toma prestado el movimiento del jazz para contrastar con el estribillo.',
  'A brief modal colour before the final chorus.':
    'Un breve color modal antes del estribillo final.',
  'Moves the centre of gravity to the relative minor.':
    'Traslada el centro de gravedad al relativo menor.',
  'Two chords, held. The pause before the last chorus.':
    'Dos acordes, sostenidos. La pausa antes del último estribillo.',
  'Fade Home': 'Volver a casa',
  'Loop & Dissolve': 'Bucle y disolución',
  'Plagal Amen': 'Amén plagal',
  'Unresolved': 'Sin resolver',
  'A final cadence that settles the song.': 'Una cadencia final que asienta la canción.',
  'A gentle vamp to fade out on.': 'Un vamp suave sobre el que hacer el fundido.',
  'The IV–I "amen" cadence — restful, conclusive.':
    'La cadencia de «amén» IV–I: reposada y concluyente.',
  'Ends on the dominant, leaving the question open.':
    'Termina en la dominante y deja la pregunta abierta.',

  // ---------------------------------------------------------------- moods
  'EVERYTHING BELOW IS IN': 'TODO LO DE ABAJO ESTÁ EN',
  '🔒 locked — suggestions stay in this key':
    '🔒 bloqueado: las sugerencias se quedan en esta tonalidad',
  'unlocked — a suggestion may bring its own mode':
    'desbloqueado: una sugerencia puede traer su propio modo',
  'Melancholic': 'Melancólico',
  'Energetic': 'Enérgico',
  'Dreamy': 'Onírico',
  'Heroic': 'Heroico',
  'Bluesy': 'Bluesero',
  'Epic': 'Épico',
  'Dark': 'Oscuro',
  'Hopeful': 'Esperanzado',
  'Nostalgic': 'Nostálgico',
  'Hypnotic': 'Hipnótico',
  'Sophisticated': 'Sofisticado',
  'Restless': 'Inquieto',
  'Tender': 'Tierno',
  'Triumphant': 'Triunfal',
  'Begins on the relative minor and circles home without ever quite settling.':
    'Empieza en el relativo menor y da la vuelta a casa sin llegar a asentarse del todo.',
  'Primary triads, no minor chords, constant forward push.':
    'Tríadas principales, ningún acorde menor, empuje constante hacia delante.',
  'Lydian major sevenths — the raised 4th keeps the tonic floating.':
    'Séptimas mayores lidias: la cuarta aumentada mantiene la tónica flotando.',
  'Tonic and subdominant trading places, then the dominant to lift it.':
    'Tónica y subdominante intercambiándose, y luego la dominante para levantarlo.',
  'Dominant sevenths on every degree — grit rather than sweetness.':
    'Séptimas de dominante en todos los grados: aspereza en lugar de dulzura.',
  'Minor tonic under three major chords. Scale without brightness.':
    'Tónica menor bajo tres acordes mayores. Amplitud sin brillo.',
  'The ♭2 pressing against the tonic — unresolved and menacing.':
    'El ♭2 apretando contra la tónica: sin resolver y amenazante.',
  'Starts away from the tonic so arriving home reads as relief.':
    'Empieza lejos de la tónica para que llegar a casa se lea como un alivio.',
  'The doo-wop turnaround. Familiar to the point of comfort.':
    'El giro del doo-wop. Familiar hasta resultar reconfortante.',
  'Two chords, minor with a major 6th. Built for playing over.':
    'Dos acordes, menor con sexta mayor. Hecho para improvisar encima.',
  'ii–V–I with sevenths throughout — the jazz cadence.':
    'ii–V–I con séptimas en todo: la cadencia del jazz.',
  'A stepwise descent that keeps arriving somewhere new.':
    'Un descenso por grados conjuntos que no deja de llegar a sitios nuevos.',
  'Gentle mediant motion — close voicings, little movement in the bass.':
    'Movimiento mediántico suave: voces cerradas, poco movimiento en el bajo.',
  'The ♭VII gives it swagger without losing the major tonic.':
    'El ♭VII le da chulería sin perder la tónica mayor.',

  // ------------------------------------------------- progression library
  'FAMILY': 'FAMILIA',
  'Progression family': 'Familia de progresiones',
  'All families ({n})': 'Todas las familias ({n})',
  'Search name, numerals, or a song…': 'Busca por nombre, cifrado o canción…',
  'Search progressions': 'Buscar progresiones',
  '{n} PROGRESSION': '{n} PROGRESIÓN',
  '{n} PROGRESSIONS': '{n} PROGRESIONES',
  'MATCHING “{query}”': 'QUE COINCIDEN CON «{query}»',
  'Nothing matches that. Try a song name, a chord, or clear the search.':
    'No hay coincidencias. Prueba con el nombre de una canción, un acorde, o borra la búsqueda.',
  'Pick a family or search, then tap a progression to open it — you\'ll hear it in the current key. Apply writes it to the timeline. Numerals and chord names are computed from what will actually play.':
    'Elige una familia o busca, y luego toca una progresión para abrirla: la oirás en la tonalidad actual. Aplicar la escribe en la línea de tiempo. El cifrado y los nombres de acorde se calculan a partir de lo que realmente va a sonar.',
  '▶ Hear it': '▶ Escúchala',
  'HEARD IN': 'SE OYE EN',
  '{n} bar': '{n} compás',
  '{n} bars': '{n} compases',
  '(written in {mode})': '(escrita en {mode})',
  'Previewing {name} — tap Apply to keep it.':
    'Escuchando {name}: toca Aplicar para quedártela.',
  'Stop playback to preview a progression.':
    'Detén la reproducción para escuchar una progresión.',
  'Pop & Rock': 'Pop y rock',
  'Modal Rock': 'Rock modal',
  'Minor Keys': 'Tonalidades menores',
  'Jazz': 'Jazz',
  'Jazz & Neo-Soul': 'Jazz y neo-soul',
  'Blues': 'Blues',
  'Folk & Country': 'Folk y country',
  'Handbook': 'Manual',
  'Axis of Awesome': 'Los cuatro acordes',
  'Axis, Minor Start': 'Los cuatro acordes, empezando en menor',
  '50s Doo-Wop': 'Doo-wop de los 50',
  'Three-Chord Rock': 'Rock de tres acordes',
  'Pop-Punk Lift': 'Impulso pop-punk',
  'Ballad Climb': 'Ascenso de balada',
  "Pachelbel's Canon": 'El canon de Pachelbel',
  'The four chords behind a startling share of the charts. Endlessly singable.':
    'Los cuatro acordes detrás de una parte asombrosa de las listas de éxitos. Se cantan sin fin.',
  'The same loop rotated to begin on the relative minor — wistful rather than triumphant.':
    'El mismo bucle rotado para empezar en el relativo menor: nostálgico en lugar de triunfal.',
  'Ballads, prom scenes, "Stand By Me". Warm and instantly nostalgic.':
    'Baladas, bailes de fin de curso, «Stand By Me». Cálido y nostálgico al instante.',
  'The primary triads and nothing else. Direct, and hard to make sound wrong.':
    'Las tríadas principales y nada más. Directo, y difícil de hacer sonar mal.',
  'Starts away from home so the chorus lands as a return.':
    'Empieza lejos de casa para que el estribillo aterrice como un regreso.',
  'A stepwise rise through the scale — builds tension without a key change.':
    'Un ascenso por grados conjuntos a través de la escala: crea tensión sin cambiar de tonalidad.',
  'A descending sequence that has outlived three centuries of fashion.':
    'Una secuencia descendente que ha sobrevivido a tres siglos de modas.',
  'Mixolydian Rock': 'Rock mixolidio',
  'Dorian Vamp': 'Vamp dórico',
  'Grunge ♭VI–♭VII': 'Grunge ♭VI–♭VII',
  'Lydian Lift': 'Impulso lidio',
  'Phrygian Descent': 'Descenso frigio',
  'The ♭VII is what makes this rock rather than pop — think "Sweet Home Alabama".':
    'El ♭VII es lo que hace que esto sea rock y no pop; piensa en «Sweet Home Alabama».',
  'Minor with a bright 6th. Hypnotic, jam-friendly, never fully sad.':
    'Menor con una sexta luminosa. Hipnótico, ideal para improvisar, nunca del todo triste.',
  'Heavy and modal — the flat 6th and 7th give it the weight.':
    'Pesado y modal: la sexta y la séptima menores le dan el peso.',
  'The ♯4 floats the tonic. Cinematic wonder in two chords.':
    'El ♯4 hace flotar la tónica. Asombro cinematográfico en dos acordes.',
  'The ♭2 leaning on the tonic — flamenco and metal share this one.':
    'El ♭2 apoyándose en la tónica: el flamenco y el metal comparten este.',
  'Andalusian Cadence': 'Cadencia andaluza',
  'Epic Minor': 'Menor épico',
  'Minor Ballad': 'Balada menor',
  'Minor Climb': 'Ascenso menor',
  'A stepwise descent from the tonic. Dramatic, and older than most of what it appears in.':
    'Un descenso por grados conjuntos desde la tónica. Dramático, y más antiguo que casi todo aquello en lo que aparece.',
  'i–VI–III–VII. Trailers, anthems, anything that needs scale.':
    'i–VI–III–VII. Tráilers, himnos, cualquier cosa que necesite grandeza.',
  'The doo-wop shape in minor — familiar bones, darker colour.':
    'La forma del doo-wop en menor: el mismo esqueleto, un color más oscuro.',
  'Rises through the relative major before falling back to the tonic.':
    'Asciende por el relativo mayor antes de caer de vuelta a la tónica.',
  'ii–V–I Turnaround': 'Giro ii–V–I',
  'Rhythm Changes A': 'Rhythm changes A',
  'Bossa Turnaround': 'Giro de bossa',
  'Jazz Blues Head': 'Tema de blues de jazz',
  'Circle of Fifths Run': 'Recorrido por el círculo de quintas',
  'The central cadence of jazz. Learn it in all twelve keys and half the language follows.':
    'La cadencia central del jazz. Apréndela en las doce tonalidades y la mitad del idioma viene sola.',
  'I–vi–ii–V, the most-played eight bars in the standard repertoire.':
    'I–vi–ii–V, los ocho compases más tocados del repertorio estándar.',
  'Major sevenths and a gentle ii–V. Nylon strings and brushes.':
    'Séptimas mayores y un ii–V suave. Cuerdas de nailon y escobillas.',
  'Dominant sevenths throughout — the blues with a jazz accent.':
    'Séptimas de dominante en todo: el blues con acento de jazz.',
  'Root movement by fourths all the way home — every chord pulls to the next.':
    'Movimiento de fundamentales por cuartas hasta llegar a casa: cada acorde tira del siguiente.',
  'Neo-Soul Loop': 'Bucle neo-soul',
  'Half-Diminished ii–V–i': 'ii–V–i semidisminuido',
  'Minor ii–V–i with a ♭9': 'ii–V–i menor con ♭9',
  'Sus4 Release': 'Resolución de sus4',
  '6/9 Turnaround': 'Giro 6/9',
  'Secondary Dominant Cycle': 'Ciclo de dominantes secundarias',
  'Dorian with ninths on everything. The major IV is what makes Dorian sound like Dorian rather than minor.':
    'Dórico con novenas en todo. El IV mayor es lo que hace que el dórico suene a dórico y no a menor.',
  'The textbook minor cadence: iiø7 sets up the dominant, the dominant lands on a m9.':
    'La cadencia menor de manual: el iiø7 prepara la dominante y la dominante aterriza en un m9.',
  'Dm9 – E7♭9 – Am9 in A minor. The v has to be borrowed as a dominant to pull home, and the ♭9 is the note that makes it ache.':
    'Dm9 – E7♭9 – Am9 en la menor. El v hay que tomarlo prestado como dominante para que tire hacia casa, y el ♭9 es la nota que le da el dolor.',
  'Hold the 4th, then let it fall to the 3rd. The oldest tension-and-release there is.':
    'Sostén la cuarta y luego déjala caer a la tercera. La tensión y la relajación más antiguas que existen.',
  'A 6/9 tonic never quite sits down, so the loop keeps turning. The 13th on the V is the full jazz dominant.':
    'Una tónica 6/9 nunca llega a sentarse del todo, así que el bucle sigue girando. La trecena sobre el V es la dominante de jazz completa.',
  'Every chord is the dominant of the next. Each borrowed 7th pulls a fifth down into the chord after it.':
    'Cada acorde es la dominante del siguiente. Cada séptima prestada tira una quinta abajo hacia el acorde posterior.',
  '12-Bar Blues': 'Blues de 12 compases',
  '12-Bar Quick Change': 'Blues de 12 compases con cambio rápido',
  'Minor Blues': 'Blues menor',
  'The form. Twelve bars, three chords, a century of music.':
    'La forma. Doce compases, tres acordes, un siglo de música.',
  'Moves to the IV in bar two — more motion early on.':
    'Va al IV en el segundo compás: más movimiento desde el principio.',
  'The same twelve bars in minor. Slower, heavier, more room to bend.':
    'Los mismos doce compases en menor. Más lento, más pesado, con más sitio para hacer bendings.',
  'Country I–IV–V': 'Country I–IV–V',
  'Folk Circle': 'Círculo folk',
  'Celtic Vamp': 'Vamp celta',
  'The three chords most songs are made of.': 'Los tres acordes de los que está hecha la mayoría de canciones.',
  'Home, away, home, away. The campfire progression.':
    'Casa, fuera, casa, fuera. La progresión de la hoguera.',
  'The ♭VII again, this time in a jig. Works beautifully in DADGAD.':
    'Otra vez el ♭VII, esta vez en una jiga. Funciona de maravilla en DADGAD.',

  // ------------------------------------------------------------- handbook
  '1 · Single Major Chord': '1 · Un solo acorde mayor',
  '2 · Single Minor Chord': '2 · Un solo acorde menor',
  '3 · Tonic–Dominant, Major': '3 · Tónica–dominante, mayor',
  '4 · Tonic–Dominant, Minor': '4 · Tónica–dominante, menor',
  '5 · Tonic–Subdominant': '5 · Tónica–subdominante',
  '6 · Major to Relative Minor': '6 · De mayor al relativo menor',
  '7 · I–IV–V': '7 · I–IV–V',
  '8 · I–IV–V, Plagal Cadence': '8 · I–IV–V, cadencia plagal',
  '9 · I–IV–V–IV': '9 · I–IV–V–IV',
  '10 · Minor to ♭III': '10 · De menor al ♭III',
  '11 · Minor to ♭VII': '11 · De menor al ♭VII',
  '12 · Doo-Wop / Ice Cream': '12 · Doo-wop / heladería',
  '12A · I–V–vi–IV': '12A · I–V–vi–IV',
  '12B · I–IV–vi–V': '12B · I–IV–vi–V',
  '13 · Rhythm Changes': '13 · Rhythm changes',
  '13B · Secondary Dominants': '13B · Dominantes secundarias',
  '13D · The Turnaround': '13D · El giro',
  '14 · ii–V–I–IV': '14 · ii–V–I–IV',
  '15 · Modal with ii and IV': '15 · Modal con ii y IV',
  '16 · I–♭VII–IV–I': '16 · I–♭VII–IV–I',
  '18 · i–♭III–♭VII–i': '18 · i–♭III–♭VII–i',
  '19 · Andalusian Cadence': '19 · Cadencia andaluza',
  "20 · Pachelbel's Canon": '20 · El canon de Pachelbel',
  'One chord, held. Everything else in music is a departure from this.':
    'Un acorde, sostenido. Todo lo demás en música es una salida desde aquí.',
  'The same drone in minor. A whole song can live here.':
    'El mismo bordón en menor. Una canción entera puede vivir aquí.',
  'Away and back. The smallest complete musical sentence there is.':
    'Ir y volver. La frase musical completa más pequeña que existe.',
  'The same two-chord motion with a minor tonic — darker, and it leans harder.':
    'El mismo movimiento de dos acordes con tónica menor: más oscuro, y se inclina con más fuerza.',
  'Away and back without tension. Restful where the dominant is restless.':
    'Ir y volver sin tensión. Reposado donde la dominante es inquieta.',
  'The same seven notes, seen from its shadow.':
    'Las mismas siete notas, vistas desde su sombra.',
  'The three chords most songs are made of.':
    'Los tres acordes de los que está hecha la mayoría de canciones.',
  'Ends IV to I rather than V to I — the softer landing.':
    'Termina de IV a I en lugar de V a I: el aterrizaje más suave.',
  'Sits on the tonic before moving — leaves space for the vocal.':
    'Se asienta en la tónica antes de moverse: deja sitio para la voz.',
  'Minor tonic to its relative major. Used alone, or to open something longer.':
    'De tónica menor a su relativo mayor. Se usa sola, o para abrir algo más largo.',
  'Minor, its relative major, and the subtonic. Endlessly loopable.':
    'Menor, su relativo mayor y la subtónica. Se puede repetir sin fin.',
  'The same four chords rotated. Probably the most recorded loop alive.':
    'Los mismos cuatro acordes rotados. Probablemente el bucle más grabado que existe.',
  'The subdominant arrives early, so the minor lands harder.':
    'La subdominante llega pronto, así que el menor aterriza con más fuerza.',
  'I–vi–ii–V. The circle of fifths, walked backwards, four bars at a time.':
    'I–vi–ii–V. El círculo de quintas recorrido hacia atrás, de cuatro en cuatro compases.',
  'Each chord turned into the dominant of the next, so the loop pulls all the way round.':
    'Cada acorde convertido en la dominante del siguiente, de modo que el bucle tira durante toda la vuelta.',
  'iii–vi–ii–V. Tacked on the end to extend an ending, in show tunes and jazz.':
    'iii–vi–ii–V. Se añade al final para alargar un cierre, en el teatro musical y en el jazz.',
  'The jazz cadence, then straight out to the subdominant instead of resting.':
    'La cadencia del jazz, y luego directo a la subdominante en lugar de reposar.',
  'Stepwise out of the tonic. Modern pop leans on this constantly.':
    'Saliendo de la tónica por grados conjuntos. El pop moderno se apoya en esto constantemente.',
  'Mixolydian rock. The ♭VII is what stops it sounding like a hymn.':
    'Rock mixolidio. El ♭VII es lo que impide que suene a himno.',
  'The first chord from outside the major scale. Modal, and instantly modern.':
    'El primer acorde de fuera de la escala mayor. Modal, y moderno al instante.',
  'The loop that never resolves, so it can go round forever.':
    'El bucle que nunca resuelve, así que puede dar vueltas para siempre.',
  'Stepwise descending, out of Flamenco. The V7 at the bottom is what makes it Spanish rather than merely minor.':
    'Descenso por grados conjuntos, venido del flamenco. La V7 del final es lo que lo hace español y no simplemente menor.',
  'Eight bars from 1680 that pop music has never stopped borrowing.':
    'Ocho compases de 1680 que el pop no ha dejado de tomar prestados.',
  'I–vi–IV–V. Fifty years of hits and it still has not worn out.':
    'I–vi–IV–V. Cincuenta años de éxitos y todavía no se ha gastado.',

  // ---------------------------------------------------------------- tuner
  'Instrument': 'Instrumento',
  'Tuning meter': 'Medidor de afinación',
  'A4 = {hz} Hz': 'La4 = {hz} Hz',
  'Signal:': 'Señal:',
  'Status:': 'Estado:',
  'Freq: —': 'Frec.: —',
  'Freq: {hz}Hz': 'Frec.: {hz} Hz',
  'listening': 'escuchando',
  'LOCKED': 'AFINADA',
  'FLAT': 'BAJA',
  'SHARP': 'ALTA',
  'START LISTENING': 'EMPEZAR A ESCUCHAR',
  'STOP LISTENING': 'DEJAR DE ESCUCHAR',
  'Auto': 'Auto',
  'AUTO': 'AUTO',
  'Manual': 'Manual',
  'MANUAL · {note}': 'MANUAL · {note}',
  'OPTIONS': 'OPCIONES',
  'TARGET': 'OBJETIVO',
  'REFERENCE TONE': 'TONO DE REFERENCIA',
  'CHIME WHEN IN TUNE': 'AVISO AL AFINAR',
  'SENSITIVITY': 'SENSIBILIDAD',
  'RESPONSE': 'RESPUESTA',
  'IN-TUNE WINDOW': 'MARGEN DE AFINACIÓN',
  'REFERENCE A4': 'LA4 DE REFERENCIA',
  'Follows the nearest string in the tuning': 'Sigue la cuerda más cercana de la afinación',
  'Holds the string you pinned': 'Se queda en la cuerda que has fijado',
  'Follows whichever string of the tuning is nearest to what it hears':
    'Sigue la cuerda de la afinación más cercana a lo que oye',
  'Stays on the pinned string, however far out it is':
    'Se queda en la cuerda fijada, por muy desafinada que esté',
  'Sine': 'Seno',
  'Warm': 'Cálido',
  'String': 'Cuerda',
  'Tapping a string pins it without sounding anything.':
    'Tocar una cuerda la fija sin hacer sonar nada.',
  'A clean sine, sounded once. Tap again to hear it again.':
    'Un seno limpio, que suena una vez. Toca otra vez para volver a oírlo.',
  'A triangle — rounder, and easier to pitch against.':
    'Una triangular: más redonda y más fácil para comparar la altura.',
  'One pluck of the guitar itself, on the melody voices.':
    'Una pulsación de la guitarra misma, en las voces de melodía.',
  'A short two-note chime the moment a string settles':
    'Un aviso corto de dos notas en cuanto la cuerda se asienta',
  'Silent — watch the dial': 'En silencio: mira la aguja',
  'Low': 'Baja',
  'Normal': 'Normal',
  'High': 'Alta',
  'Steady': 'Estable',
  'Quick': 'Rápida',
  'The default': 'La opción por defecto',
  'The default; below what most ears hear': 'La opción por defecto; por debajo de lo que oye casi cualquier oído',
  'Ignores everything quiet — for noisy rooms': 'Ignora todo lo flojo: para salas ruidosas',
  'Hears a soft, decaying note for longer': 'Oye durante más tiempo una nota suave que se apaga',
  'Slower needle, less jitter': 'Aguja más lenta, menos temblor',
  'Follows the string immediately': 'Sigue la cuerda al instante',
  'Studio — hard to hold, exact when it locks': 'Estudio: difícil de mantener, exacto cuando fija',
  'Forgiving — locks quickly on stage': 'Indulgente: fija rápido en el escenario',
  'Uses the microphone. Nothing is recorded or sent anywhere.':
    'Usa el micrófono. No se graba ni se envía nada a ninguna parte.',
  'Listening is unavailable here — the page CircleSong is embedded in withholds the microphone.':
    'Aquí no se puede escuchar: la página en la que está incrustado CircleSong le niega el micrófono.',
  'Open CircleSong at its own address to listen. Tap a string to hear its exact pitch and tune by ear — that works anywhere.':
    'Abre CircleSong en su propia dirección para escuchar. Toca una cuerda para oír su altura exacta y afinar de oído: eso funciona en cualquier parte.',
  'Audio could not start, so the tuner cannot listen.':
    'El audio no ha podido arrancar, así que el afinador no puede escuchar.',
  'This browser does not offer microphone access to the page.':
    'Este navegador no ofrece acceso al micrófono a la página.',
  'The page CircleSong is embedded in has not granted it the microphone, so it cannot even ask.':
    'La página en la que está incrustado CircleSong no le ha dado el micrófono, así que ni siquiera puede pedirlo.',
  'Open CircleSong from its own address — the installed app, or the copy served from GitHub — and listening will work.':
    'Abre CircleSong desde su propia dirección —la aplicación instalada o la copia servida desde GitHub— y escuchar funcionará.',
  'Meanwhile you can tune by ear: tap a string above to hear its exact pitch.':
    'Mientras tanto puedes afinar de oído: toca una cuerda arriba para oír su altura exacta.',
  'Microphone access was refused. Allow it for this page in your browser’s site settings, then switch Listen on again. You can tune by ear in the meantime — tap a string above to hear its pitch.':
    'Se ha denegado el acceso al micrófono. Permítelo para esta página en los ajustes de sitios de tu navegador y vuelve a activar Escuchar. Mientras tanto puedes afinar de oído: toca una cuerda arriba para oír su altura.',
  'No microphone was found on this device. Tap a string above to hear its pitch and tune by ear.':
    'No se ha encontrado ningún micrófono en este dispositivo. Toca una cuerda arriba para oír su altura y afinar de oído.',
  'The microphone could not be opened — {error}.':
    'No se ha podido abrir el micrófono — {error}.',
  'unknown error': 'error desconocido',
  'Guitar': 'Guitarra',
  'Bass': 'Bajo',
  'Ukulele': 'Ukelele',
  'Mandolin': 'Mandolina',
  'Banjo': 'Banjo',
  'Violin': 'Violín',
  'Cello / Viola': 'Violonchelo / viola',
  'Chromatic': 'Cromático',
  'Chromatic — play any note and it will be named. Tap one to hear it.':
    'Cromático: toca cualquier nota y se te dirá cuál es. Toca una para oírla.',
  'Standard — E A D G B E': 'Estándar — E A D G B E',
  'Drop D — D A D G B E': 'Drop D — D A D G B E',
  'Half step down — E♭ A♭ D♭ G♭ B♭ E♭': 'Medio tono abajo — E♭ A♭ D♭ G♭ B♭ E♭',
  'Full step down — D G C F A D': 'Un tono abajo — D G C F A D',
  'Open G — D G D G B D': 'Sol abierto — D G D G B D',
  'Open D — D A D F♯ A D': 'Re abierto — D A D F♯ A D',
  'DADGAD — D A D G A D': 'DADGAD — D A D G A D',
  'Drop C — C G C F A D': 'Drop C — C G C F A D',
  '7-string — B E A D G B E': '7 cuerdas — B E A D G B E',
  'Standard 4-string — E A D G': 'Estándar de 4 cuerdas — E A D G',
  'Drop D — D A D G': 'Drop D — D A D G',
  'Half step down — E♭ A♭ D♭ G♭': 'Medio tono abajo — E♭ A♭ D♭ G♭',
  'Standard 5-string — B E A D G': 'Estándar de 5 cuerdas — B E A D G',
  'Standard high-G — G C E A': 'Estándar con sol agudo — G C E A',
  'Low-G — G C E A': 'Sol grave — G C E A',
  'D tuning — A D F♯ B': 'Afinación en re — A D F♯ B',
  'Baritone — D G B E': 'Barítono — D G B E',
  'Standard — G D A E': 'Estándar — G D A E',
  'Open G — F♯ D A D': 'Sol abierto — F♯ D A D',
  'Open G 5-string — g D G B D': 'Sol abierto de 5 cuerdas — g D G B D',
  'Double C — g C G C D': 'Do doble — g C G C D',
  'Sawmill — g D G C D': 'Sawmill — g D G C D',
  'Cello — C G D A': 'Violonchelo — C G D A',
  'Viola — C G D A': 'Viola — C G D A',
  'Any note — C1 to B6': 'Cualquier nota — de C1 a B6',

  // ---------------------------------------------------------------- songs
  'CURRENT SONG': 'CANCIÓN ACTUAL',
  'Save': 'Guardar',
  'Save as new': 'Guardar como nueva',
  'New song': 'Canción nueva',
  'Open': 'Abrir',
  'Import a song file': 'Importar un archivo de canción',
  'Nothing saved yet.': 'Todavía no hay nada guardado.',
  'Nothing saved yet. Save the current song to start a library.':
    'Todavía no hay nada guardado. Guarda la canción actual para empezar una biblioteca.',
  '{n} loop': '{n} bucle',
  '{n} loops': '{n} bucles',
  '{n} bar written': '{n} compás escrito',
  '{n} bars written': '{n} compases escritos',
  'saved': 'guardada',
  'just now': 'ahora mismo',
  '{n} min ago': 'hace {n} min',
  '{n} h ago': 'hace {n} h',
  'Delete “{name}”? This cannot be undone.': '¿Eliminar «{name}»? Esto no se puede deshacer.',
  'Project deleted.': 'Proyecto eliminado.',
  'That project could not be read.': 'No se ha podido leer ese proyecto.',
  'Opened “{name}”.': 'Abierta «{name}».',
  'Saved “{name}”.': 'Guardada «{name}».',
  'Loaded “{name}”.': 'Cargada «{name}».',
  'This browser will not let the app save locally.':
    'Este navegador no deja que la aplicación guarde en local.',
  'This browser will not let the app store anything locally.':
    'Este navegador no deja que la aplicación almacene nada en local.',
  "No room left in this browser's storage. Delete a project and try again.":
    'No queda espacio en el almacenamiento de este navegador. Elimina un proyecto e inténtalo de nuevo.',
  'Start a new song? Anything unsaved will be lost.':
    '¿Empezar una canción nueva? Se perderá todo lo que no esté guardado.',
  'New song started.': 'Canción nueva empezada.',
  'Could not read that file — {error}': 'No se ha podido leer ese archivo — {error}',
  'Unrecognised file format': 'Formato de archivo no reconocido',
};

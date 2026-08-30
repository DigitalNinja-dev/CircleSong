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
 * Indonesian.
 *
 * Keys are the English source strings; see src/i18n.js. Anything absent falls
 * back to English, so a partial dictionary is a working one.
 *
 * Note letters (C, D, E…) are left alone, and so are the chord suffixes.
 * Indonesian players read letter names; the theory vocabulary uses the
 * Dutch-derived terms that Indonesian music teaching actually uses — sekonde,
 * terts, kuint, septim — rather than a literal rendering of the English.
 */
export const LOCALE_ID = {
  // ---------------------------------------------------------------- chrome
  'Language': 'Bahasa',
  'LANGUAGE': 'BAHASA',
  'Everything the app says, including the lessons and the progression notes.':
    'Semua yang ditampilkan aplikasi, termasuk pelajaran dan catatan progresi.',
  'About CircleSong': 'Tentang CircleSong',
  'Audio engine': 'Mesin audio',
  'Audio engine ready': 'Mesin audio siap',
  'Tap anything to start audio': 'Ketuk di mana saja untuk memulai audio',
  'Audio unavailable — {error}': 'Audio tidak tersedia — {error}',
  'Play': 'Mainkan',
  'Stop': 'Berhenti',
  'SONG:': 'LAGU:',
  'Song title': 'Judul lagu',
  'Untitled Song': 'Lagu tanpa judul',
  'Tempo': 'Tempo',
  'Time signature': 'Birama',
  'Metro': 'Metro',
  'Loop': 'Loop',
  'Drums': 'Drum',
  'Backing drums': 'Drum pengiring',
  'CLOSE': 'TUTUP',
  'Theme': 'Tema',
  'THEME': 'TEMA',
  'System': 'Sistem',
  'Light': 'Terang',
  'Dark': 'Gelap',
  'High contrast': 'Kontras tinggi',
  'Sepia': 'Sepia',
  'Currently {theme}.': 'Saat ini: {theme}.',
  'Follows your device, and changes with it.': 'Mengikuti perangkat Anda dan berubah bersamanya.',
  'The default. Neon on black.': 'Bawaan. Neon di atas hitam.',
  'Ink on paper, with a darker accent so it stays legible.':
    'Tinta di atas kertas, dengan aksen lebih gelap agar tetap terbaca.',
  'Pure black and white, visible borders, no faint washes.':
    'Hitam putih murni, garis tepi jelas, tanpa sapuan samar.',
  'Warm and low-glare, for long sessions.': 'Hangat dan tidak menyilaukan, untuk sesi panjang.',

  // ------------------------------------------------------------------ tabs
  'Circle': 'Lingkaran',
  'Tuner': 'Penyetem',
  'Tone': 'Nada',
  'Compose': 'Menggubah',
  'Timeline': 'Linimasa',
  'Assist': 'Asisten',
  'Learn': 'Belajar',
  'Songs': 'Lagu',

  // --------------------------------------------------------- panel headings
  '/01 CIRCLE_OF_FIFTHS': '/01 LINGKARAN_KUINT',
  '/02 GUITAR_TONE': '/02 SUARA_GITAR',
  '/02B VOICE': '/02B SUARA',
  '/02C PLAYBACK': '/02C PEMUTARAN',
  '/03 STRUM_&_RHYTHM': '/03 GENJRENGAN_&_IRAMA',
  '/03 DRUM_MACHINE': '/03 MESIN_DRUM',
  '/04 DIATONIC_CHORDS': '/04 AKOR_DIATONIS',
  '/05 TIMELINE': '/05 LINIMASA',
  '/06 MODES': '/06 MODUS',
  '/07 SONGWRITING_ASSISTANT': '/07 ASISTEN_PENULISAN_LAGU',
  '/08 SONGS': '/08 LAGU',
  '/09 TUNER': '/09 PENYETEM',
  '// APPEARANCE': '// TAMPILAN',
  '// PROGRESSION_LIBRARY': '// PUSTAKA_PROGRESI',
  '// SAVED_PROJECTS': '// PROYEK_TERSIMPAN',
  '// SONG_STRUCTURE_IDEAS': '// IDE_STRUKTUR_LAGU',
  'EAR_TRAINER // GUESS_THE_MODE': 'LATIHAN_PENDENGARAN // TEBAK_MODUSNYA',

  // ----------------------------------------------------------------- about
  'CircleSong is a circle-of-fifths powered composition tool for guitar players. It maps the theory behind keys, modes, and chord progressions onto an instrument you already play, so you can build song structures — verses, choruses, bridges — by ear and by understanding, not guesswork.':
    'CircleSong adalah alat menggubah untuk pemain gitar yang dibangun di atas lingkaran kuint. Ia memetakan teori di balik tangga nada, modus, dan progresi akor ke instrumen yang sudah Anda mainkan, sehingga Anda dapat membangun struktur lagu — bait, refrain, bridge — dengan telinga dan pemahaman, bukan tebakan.',
  'Pick a key, hear every diatonic chord and its inversions instantly, sequence them into a loop, and get progression ideas grounded in real theory and well-known songs. The Learn tab and ear trainer build your fluency in modes as you write — so composing and studying happen in the same place.':
    'Pilih sebuah tangga nada, dengarkan seketika setiap akor diatonis beserta pembalikannya, rangkai menjadi loop, dan dapatkan ide progresi yang berpijak pada teori sungguhan dan lagu-lagu terkenal. Tab Belajar dan latihan pendengaran mengasah kefasihan Anda pada modus sambil Anda menulis — menggubah dan belajar terjadi di tempat yang sama.',
  'Everything the instrument needs is here: eight modelled tones from acoustic steel to grand piano, thirty-four strum and picking patterns, a drum machine, a tuner for eight instruments, and songs you can save. It runs entirely on your device, installs to your home screen, and keeps working with no signal.':
    'Semua yang dibutuhkan instrumen ada di sini: delapan suara termodelkan, dari gitar akustik senar baja sampai grand piano, tiga puluh empat pola genjrengan dan petikan, mesin drum, penyetem untuk delapan instrumen, dan lagu yang bisa Anda simpan. Semuanya berjalan di perangkat Anda, terpasang di layar utama, dan tetap bekerja tanpa sinyal.',
  'Copyright © 2026. Free software under the': 'Hak cipta © 2026. Perangkat lunak bebas di bawah',
  ', with no warranty. Section 13 of that licence gives everyone who uses CircleSong over a network the right to its source:':
    ', tanpa jaminan apa pun. Pasal 13 lisensi itu memberi setiap orang yang memakai CircleSong melalui jaringan hak atas kode sumbernya:',
  'Source Code (AGPL v3.0)': 'Kode sumber (AGPL v3.0)',

  // ---------------------------------------------------------------- circle
  'Circle of fifths — arrow keys move around the wheel':
    'Lingkaran kuint — tombol panah bergerak mengelilingi roda',
  '{chord} — {numeral}, the {degree}': '{chord} — {numeral}, {degree}',
  '{chord} — outside this key': '{chord} — di luar tangga nada ini',
  'Mode': 'Modus',
  'WHEEL TAP PLAYS': 'KETUKAN RODA MEMBUNYIKAN',
  'Chord': 'Akor',
  'Note': 'Nada',
  'Show secondary dominants': 'Tampilkan dominan sekunder',
  'The chords that pull into each degree': 'Akor yang menarik ke setiap tingkat',
  'SECONDARY DOMINANTS': 'DOMINAN SEKUNDER',
  'Tap one to hear it resolve. Each arrow points at the chord that chord pulls into.':
    'Ketuk salah satu untuk mendengarnya menyelesaikan. Setiap panah menunjuk akor yang ditariknya.',
  '◄ Fourths (subdominant)': '◄ Kuart (subdominan)',
  'Fifths (dominant) ►': 'Kuint (dominan) ►',
  'Outer ring — major keys. Inner ring — their relative minors. Bright wedges are diatonic to the current key. Clockwise stacks a 5th toward the dominant; counter-clockwise a 4th toward the subdominant. Lock the key, then tap any wedge to hear it and see how it relates.':
    'Cincin luar: tangga nada mayor. Cincin dalam: minor relatifnya. Juring yang terang bersifat diatonis terhadap tangga nada saat ini. Searah jarum jam menumpuk satu kuint menuju dominan; berlawanan arah jarum jam satu kuart menuju subdominan. Kunci tangga nadanya, lalu ketuk juring mana pun untuk mendengarnya dan melihat hubungannya.',
  '🔒 Key Locked — tap wheel to explore': '🔒 Tangga nada terkunci — ketuk roda untuk menjelajah',
  '🔓 Lock Key to Explore': '🔓 Kunci tangga nada untuk menjelajah',
  '{note} — degree {n} of the key ({numeral})': '{note} — tingkat {n} dari tangga nada ({numeral})',
  '{chord} is the {function} ({numeral}) of {key} — a {interval} above the root.':
    '{chord} adalah {function} ({numeral}) dari {key} — satu {interval} di atas nada dasar.',
  '{chord} sits a {interval} from {key} — outside the current key, a borrowed or chromatic color.':
    '{chord} berjarak satu {interval} dari {key} — di luar tangga nada saat ini, warna pinjaman atau kromatis.',
  'The V7 of {target} — it borrows a note from outside the key to point at the {numeral} chord.':
    'V7 dari {target} — ia meminjam satu nada dari luar tangga nada untuk menunjuk akor {numeral}.',
  'The key’s own v is minor and cannot pull home. Raising its third makes {chord}, which can.':
    'v milik tangga nada ini minor dan tidak bisa menarik pulang. Menaikkan tertsnya menjadikannya {chord}, yang bisa.',
  'Borrowed': 'Pinjaman',

  // ------------------------------------------------- functions and degrees
  'Tonic': 'Tonika',
  'Supertonic': 'Supertonika',
  'Mediant': 'Median',
  'Subdominant': 'Subdominan',
  'Dominant': 'Dominan',
  'Submediant': 'Submedian',
  'Leading Tone': 'Nada sensitif',
  'Home base — the point of rest the progression resolves to.':
    'Rumah: titik istirahat tempat progresi berlabuh.',
  'Often leads toward the dominant; sets up motion away from home.':
    'Sering mengarah ke dominan; memulai gerak menjauh dari rumah.',
  'Colors the tonic, blending stability with subtle tension.':
    'Mewarnai tonika, memadukan kemantapan dengan ketegangan halus.',
  'Pulls away from home and opens the door to the dominant.':
    'Menarik menjauh dari rumah dan membuka pintu ke dominan.',
  'Strongest pull back to the tonic — the engine of resolution.':
    'Tarikan terkuat kembali ke tonika: mesin penyelesaian.',
  'A gentle detour from the tonic, often feels wistful or reflective.':
    'Simpangan lembut dari tonika; sering terasa sendu atau merenung.',
  'Maximum tension — wants urgently to resolve back to the tonic.':
    'Ketegangan maksimum: mendesak untuk kembali ke tonika.',
  '{function} chord in this key.': 'Akor {function} dalam tangga nada ini.',
  'home': 'rumah',
  'a step away from home': 'satu langkah dari rumah',
  "the tonic's shadow": 'bayangan tonika',
  'the lift': 'pengangkat',
  'the pull back home': 'tarikan pulang',
  'the relative minor': 'minor relatif',
  'the approach chord': 'akor penghantar',

  // ---------------------------------------------------------------- modes
  'Ionian': 'Ionia',
  'Dorian': 'Doria',
  'Phrygian': 'Frigia',
  'Lydian': 'Lidia',
  'Mixolydian': 'Miksolidia',
  'Aeolian': 'Aeolia',
  'Locrian': 'Lokria',
  'Ionian (Major)': 'Ionia (mayor)',
  'Aeolian (Minor)': 'Aeolia (minor)',
  'Major scale': 'Tangga nada mayor',
  'Natural minor': 'Minor asli',
  'Bright, resolved, happy': 'Cerah, mantap, gembira',
  'Minor but hopeful, moody without being sad': 'Minor tapi penuh harap; berkarakter tanpa sedih',
  'Dark, exotic, tense': 'Gelap, eksotis, tegang',
  'Dreamy, floating, cinematic': 'Melamun, melayang, sinematik',
  'Bluesy, rootsy major': 'Mayor bernuansa blues dan akar',
  'Sad, melancholic, introspective': 'Sedih, muram, merenung ke dalam',
  'Unstable, tense, rarely a home base': 'Labil, tegang, jarang menjadi rumah',
  'The default major-key sound — home base for pop, country, and classical.':
    'Bunyi mayor bawaan: rumah bagi pop, country, dan musik klasik.',
  'The major 6th is the giveaway — vamp i–IV for a jazzy, less melancholic minor sound (Santana, Radiohead).':
    'Sekst mayor adalah penandanya: mainkan vamp i–IV untuk bunyi minor yang kejazzan dan tidak semuram biasanya (Santana, Radiohead).',
  'The ♭2 gives it away — vamp i–♭II for a flamenco or metal flavor.':
    '♭2 adalah penandanya: mainkan vamp i–♭II untuk rasa flamenco atau metal.',
  'The ♯4 makes it float above plain major — vamp I–II for a "movie score" wonder.':
    '♯4 membuatnya melayang di atas mayor biasa: mainkan vamp I–II untuk keajaiban ala musik film.',
  'Major with a flat 7th — vamp I–♭VII for classic rock and blues-rock.':
    'Mayor dengan septim kecil: mainkan vamp I–♭VII untuk rock klasik dan blues-rock.',
  'The default minor-key sound — vamp i–VI for that classic sad or epic minor feel.':
    'Bunyi minor bawaan: mainkan vamp i–VI untuk rasa minor sedih atau megah yang khas.',
  'Built on a diminished triad — usually a passing color (like vii° in a major key) rather than a tonic.':
    'Dibangun di atas trinada diminis: biasanya warna lintasan (seperti vii° dalam tangga nada mayor), bukan tonika.',
  'Modes are the 7 scales hiding inside every major scale — same notes, different starting point, different mood. Pick one to hear it and read how guitarists use it.':
    'Modus adalah 7 tangga nada yang bersembunyi di dalam setiap tangga nada mayor: nada yang sama, titik awal berbeda, suasana berbeda. Pilih satu untuk mendengarnya dan membaca bagaimana gitaris memakainya.',
  '▶ Play Scale': '▶ Mainkan tangga nada',
  '▶ Play Vamp': '▶ Mainkan vamp',
  'Scale degrees compared with the major scale': 'Tingkat tangga nada dibandingkan dengan tangga nada mayor',
  'Modes identified correctly at least once': 'Modus yang pernah ditebak benar setidaknya sekali',
  'Score:': 'Skor:',
  'Streak: {n} (best {best})': 'Beruntun: {n} (terbaik {best})',
  '▶ Start': '▶ Mulai',
  '↻ New Round': '↻ Ronde baru',
  'Correct! 🎧': 'Benar! 🎧',
  'Not quite — that was {mode}': 'Belum tepat — itu {mode}',
  '{mode} — identified': '{mode} — sudah dikenali',

  // -------------------------------------------------------------- intervals
  'Unison (root)': 'Unison (nada dasar)',
  'Minor 2nd': 'Sekonde kecil',
  'Major 2nd': 'Sekonde besar',
  'Minor 3rd': 'Terts kecil',
  'Major 3rd': 'Terts besar',
  'Perfect 4th': 'Kuart murni',
  'Tritone': 'Triton',
  'Perfect 5th': 'Kuint murni',
  'Minor 6th': 'Sekst kecil',
  'Major 6th': 'Sekst besar',
  'Minor 7th': 'Septim kecil',
  'Major 7th': 'Septim besar',

  // ------------------------------------------------------------------ tone
  'VOLUME': 'VOLUME',
  'BRIGHTNESS': 'KECERAHAN',
  'SUSTAIN': 'SUSTAIN',
  'PICK POS': 'POSISI PICK',
  'AUDITION': 'DENGARKAN',
  '1 bar': '1 birama',
  'Play a full bar': 'Mainkan satu birama penuh',
  'Play {n} beat': 'Mainkan {n} ketukan',
  'Play {n} beats': 'Mainkan {n} ketukan',
  'Cut previous sound': 'Potong bunyi sebelumnya',
  'Each chord silences the one before it': 'Setiap akor membungkam akor sebelumnya',
  'On': 'Nyala',
  'Off': 'Mati',
  'TUNING': 'STEMAN',
  'Tuning': 'Steman',

  // ---------------------------------------------------------------- rhythm
  'STYLE': 'GAYA',
  'NOW PLAYING': 'SEDANG DIMAINKAN',
  'FEEL': 'RASA',
  'SWING': 'SWING',
  'HUMANIZE': 'SENTUHAN MANUSIA',
  'Rhythm family': 'Keluarga irama',
  'All feels ({n})': 'Semua rasa ({n})',
  'Strumming': 'Genjrengan',
  'Muted & Percussive': 'Teredam & perkusif',
  'Reggae, Ska & Offbeat': 'Reggae, ska & offbeat',
  'Jazz Comping': 'Iringan jazz',
  'Latin & Syncopated': 'Latin & sinkopasi',
  'Country & Bluegrass': 'Country & bluegrass',
  'Other Meters': 'Birama lain',
  'Fingerstyle': 'Fingerstyle',
  'Keyboard': 'Kibor',
  'written for {lo}–{hi} BPM': 'ditulis untuk {lo}–{hi} BPM',
  'Written for {lo}–{hi} BPM': 'Ditulis untuk {lo}–{hi} BPM',
  'any tempo': 'tempo apa saja',
  'Set {bpm} BPM': 'Setel {bpm} BPM',
  'You are at {bpm}; this feel is written for {lo}–{hi}':
    'Anda di {bpm}; rasa ini ditulis untuk {lo}–{hi}',
  'machine': 'mesin',
  'Straight': 'Lurus',
  'Double-time': 'Tempo ganda',
  'Half-time': 'Setengah tempo',
  'The pattern as written.': 'Pola sebagaimana ditulis.',
  'Twice the density at the same tempo — a skank becomes ska.':
    'Kerapatan dua kali lipat pada tempo yang sama: skank menjadi ska.',
  'The figure stretched across two bars. Everything gets heavier.':
    'Figur yang direntang sepanjang dua birama. Semuanya jadi lebih berat.',
  'Straight 8ths': 'Not seperdelapan lurus',
  '16th Pop Strum': 'Genjrengan pop seperenam belas',
  'Folk D-DU-UDU': 'Folk B-BA-ABA',
  'Driving 16ths': 'Seperenam belas berdaya dorong',
  'Anthem Half-Time': 'Anthem setengah tempo',
  'Punk Downstrokes': 'Punk genjreng ke bawah',
  'Muted Chuck': 'Chuck teredam',
  'Funk 16ths': 'Funk seperenam belas',
  'Disco Chank': 'Chank disko',
  'Reggae Skank': 'Skank reggae',
  'One Drop': 'One drop',
  'Rocksteady': 'Rocksteady',
  'Ska Upstrokes': 'Ska genjreng ke atas',
  'Ska Bubble (16ths)': 'Bubble ska (seperenam belas)',
  'Jazz Swing': 'Swing jazz',
  'Charleston Comp': 'Iringan charleston',
  'Bossa Nova': 'Bossa nova',
  'Rumba Clave': 'Clave rumba',
  'Rumba Flamenca': 'Rumba flamenca',
  'Country Boom-Chick': 'Country boom-chick',
  'Bluegrass Boom-Chuck': 'Bluegrass boom-chuck',
  'Waltz Strum': 'Genjrengan waltz',
  'Ballad 6/8': 'Balada 6/8',
  'Slow Blues 12/8': 'Blues lambat 12/8',
  'Fingerstyle Arp': 'Arpegio fingerstyle',
  'Travis Picking': 'Travis picking',
  'Rising Arpeggio': 'Arpegio menaik',
  'Let Ring': 'Biarkan berdenting',
  'Block Chords': 'Akor blok',
  'Ballad Left Hand': 'Tangan kiri balada',
  'Alberti Bass': 'Bas Alberti',
  'Broken Chord': 'Akor patah',
  'Comping Stabs': 'Tusukan iringan',
  'Reggae Organ Bubble': 'Bubble organ reggae',

  // ----------------------------------------------------------------- drums
  'Groove': 'Groove',
  'Drum kit': 'Set drum',
  'Drum step sequencer': 'Sekuenser langkah drum',
  'DRUM VOL': 'VOL. DRUM',
  'Tap a step to cycle it through soft, medium and hard, then off. Tap a voice name to preview it; the ✕ clears that row.':
    'Ketuk satu langkah untuk memutarnya melalui lembut, sedang, keras, lalu mati. Ketuk nama suara untuk mendengarnya; tanda ✕ mengosongkan baris itu.',
  'Clear grid': 'Kosongkan kisi',
  'Reset groove': 'Setel ulang groove',
  'Double': 'Gandakan',
  '✦ Vary': '✦ Variasikan',
  'Copy the first half onto the second': 'Salin paruh pertama ke paruh kedua',
  'Nudge the groove into a variation of itself': 'Dorong groove menjadi variasi dari dirinya sendiri',
  'Fill before the loop turns': 'Isian sebelum loop berputar',
  'A short fill on the last bar': 'Isian pendek pada birama terakhir',
  'Preview {voice}': 'Dengarkan {voice}',
  'Clear {voice}': 'Kosongkan {voice}',
  '{voice} step {n}': '{voice}, langkah {n}',
  'Kick': 'Bas drum',
  'Snare': 'Snare',
  'Clap': 'Tepuk',
  'Rim': 'Rim',
  'Hat': 'Hi-hat',
  'Open Hat': 'Hi-hat terbuka',
  'Ride': 'Ride',
  'Crash': 'Crash',
  'Tom': 'Tom',
  'Shaker': 'Shaker',
  'Rock Standard': 'Rock standar',
  'Cajon & Percussion': 'Cajon & perkusi',
  'Acoustic Cajon': 'Cajon akustik',
  'Reggae / Dub': 'Reggae / dub',
  'Jazz Brushes': 'Sapu jazz',
  'Lo-Fi / Chillhop': 'Lo-fi / chillhop',
  'Hard Rock / Metal': 'Hard rock / metal',
  'Rock & Pop': 'Rock & pop',
  'Modern Rock Drive': 'Dorongan rock modern',
  'Pop / Funk 16ths': 'Pop / funk seperenam belas',
  'Indie Straight-8': 'Indie seperdelapan lurus',
  'Half-Time Groove': 'Groove setengah tempo',
  'Motown Pocket': 'Pocket Motown',
  'Punk D-Beat': 'Punk d-beat',
  'Metal Double-Kick': 'Metal bas ganda',
  'Metal Half-Time': 'Metal setengah tempo',
  'Funk & Soul': 'Funk & soul',
  'Funk Ghost Notes': 'Not hantu funk',
  'Gospel Shuffle': 'Shuffle gospel',
  'Boom Bap': 'Boom bap',
  'Hip-Hop & Lo-Fi': 'Hip-hop & lo-fi',
  'Lo-Fi Chillhop': 'Chillhop lo-fi',
  'Trap': 'Trap',
  'Breakbeat': 'Breakbeat',
  'Electronic & Dance': 'Elektronik & dansa',
  'Disco Four-on-Floor': 'Disko four-on-the-floor',
  'Deep House': 'Deep house',
  'House': 'House',
  'Techno': 'Techno',
  'Latin': 'Latin',
  'Son Montuno (2-3)': 'Son montuno (2-3)',
  'Samba': 'Samba',
  'Partido Alto': 'Partido alto',
  'Merengue': 'Merengue',
  'Cumbia Clásica': 'Cumbia klasik',
  'Cumbia Moderna': 'Cumbia modern',
  'Soca': 'Soca',
  'Afro-Cuban 6/8': 'Afro-Kuba 6/8',
  'Reggae & Caribbean': 'Reggae & Karibia',
  'Reggae One-Drop': 'Reggae one-drop',
  'Reggae Steppers': 'Reggae steppers',
  'Jazz & Blues': 'Jazz & blues',
  'Jazz Swing Ride': 'Ride swing jazz',
  'Slow Blues Shuffle': 'Shuffle blues lambat',
  'Acoustic & Folk': 'Akustik & folk',
  'Folk Waltz': 'Waltz folk',
  'Country Train': 'Kereta country',
  'Metal': 'Metal',

  // -------------------------------------------------------- chord builder
  'SIZE': 'UKURAN',
  'COLOUR': 'WARNA',
  'ALTER': 'ALTERASI',
  'SHAPE': 'BENTUK',
  'Root': 'Dasar',
  '1st Inv': 'Balikan 1',
  '2nd Inv': 'Balikan 2',
  'Drop-2': 'Drop-2',
  'Drop-3': 'Drop-3',
  '↻ Next shape': '↻ Bentuk berikutnya',
  '▶ Preview': '▶ Dengarkan',
  'Chord diagram': 'Diagram akor',
  'No playable shape': 'Tidak ada bentuk yang bisa dimainkan',
  'No playable shape for that chord in this tuning.':
    'Tidak ada bentuk yang bisa dimainkan untuk akor itu pada steman ini.',
  'Open Position': 'Posisi terbuka',
  'Position — {fret}fr': 'Posisi — fret {fret}',
  'Triad': 'Trinada',
  'Seventh chord': 'Akor septim',
  'Ninth': 'Nona',
  'Eleventh': 'Undesim',
  'Triad — root, third, fifth': 'Trinada: dasar, terts, kuint',
  'Thirteenth — the full stack': 'Tredesim: tumpukan penuh',
  'Reset this chord': 'Setel ulang akor ini',
  'Reset all': 'Setel ulang semua',
  'Add a {alteration}': 'Tambahkan {alteration}',
  'Alterations need a seventh — pick 7 or larger first.':
    'Alterasi memerlukan septim: pilih dulu 7 atau lebih besar.',
  'Diatonic': 'Diatonis',
  'Dom 7': 'Dom 7',
  'The chord the key gives you.': 'Akor yang diberikan tangga nada ini.',
  'A dominant on this degree — the secondary-dominant pull.':
    'Sebuah dominan pada tingkat ini: tarikan dominan sekunder.',
  'Third replaced by the fourth. Suspended, wants to resolve.':
    'Terts diganti kuart. Tertahan, ingin menyelesaikan.',
  'Third replaced by the second. Open and unresolved.':
    'Terts diganti sekonde. Terbuka dan belum selesai.',
  'Sixth instead of a seventh. Warm, settled, vintage.':
    'Sekst, bukan septim. Hangat, mapan, bergaya lawas.',
  'Ninth added over a triad, with no seventh.': 'Nona ditambahkan di atas trinada, tanpa septim.',
  'Fully diminished — a passing chord that leads anywhere.':
    'Diminis penuh: akor lintasan yang bisa membawa ke mana saja.',
  'Half-diminished. The ii of a minor ii–V–i.': 'Setengah diminis. ii dari ii–V–i minor.',
  'Raised fifth, pushing upward.': 'Kuint dinaikkan, mendorong ke atas.',
  '{hint} — idiomatic on this degree.': '{hint} — lazim pada tingkat ini.',
  'Plain triad — the chord at its most direct.': 'Trinada polos: akor dalam bentuk paling lugas.',
  'Seventh added: the chord gains a direction to move in.':
    'Septim ditambahkan: akor mendapat arah untuk bergerak.',
  'Ninth on top — warmth and colour without changing the function.':
    'Nona di atas: kehangatan dan warna tanpa mengubah fungsi.',
  'Eleventh — open and suspended over the third.': 'Undesim: terbuka dan tertahan di atas terts.',
  'Thirteenth — the full stack, the sound of a jazz voicing.':
    'Tredesim: tumpukan penuh, bunyi sebuah voicing jazz.',
  'Diatonic — {role} in this key.': 'Diatonis: {role} dalam tangga nada ini.',
  'The {alterations} tightens the tension — resolve it by step into the next chord.':
    '{alterations} mengencangkan ketegangan: selesaikan selangkah demi selangkah ke akor berikutnya.',
  ' and ': ' dan ',
  'Secondary dominant — the V7 of {target}, so it pulls to the {numeral} chord.':
    'Dominan sekunder: V7 dari {target}, jadi ia menarik ke akor {numeral}.',
  'Borrowed dominant pulling to {target}, which sits outside this key.':
    'Dominan pinjaman yang menarik ke {target}, yang berada di luar tangga nada ini.',
  "The key's own dominant, made a true V7 — the strongest pull to the tonic.":
    'Dominan milik tangga nada ini, dijadikan V7 sejati: tarikan terkuat ke tonika.',
  'No third, so it is neither major nor minor — it wants the chord after it.':
    'Tanpa terts, jadi ia bukan mayor maupun minor: ia menginginkan akor sesudahnya.',
  'Symmetrical: it can resolve up a semitone into almost anything.':
    'Simetris: ia bisa menyelesaikan naik satu semiton ke hampir apa saja.',
  'Half-diminished — the ii of a minor ii–V–i, heading for the dominant.':
    'Setengah diminis: ii dari ii–V–i minor, menuju dominan.',
  'A sixth instead of a seventh: settled rather than in motion.':
    'Sekst, bukan septim: mapan alih-alih bergerak.',
  'A ninth over a plain triad — colour with no seventh to resolve.':
    'Nona di atas trinada polos: warna tanpa septim yang harus diselesaikan.',
  "The raised fifth leans upward into the next chord's root or third.":
    'Kuint yang dinaikkan bersandar ke atas menuju dasar atau terts akor berikutnya.',
  'Solo with {scale}.': 'Bersolo dengan {scale}.',
  'Careful with {note}.': 'Hati-hati dengan {note}.',
  "The key's own notes, starting from this chord's root.":
    'Nada-nada milik tangga nada ini, dimulai dari dasar akor ini.',
  'Altered (super-locrian)': 'Alterasi (super-lokria)',
  'Every tension is raised or lowered — this is the scale the ♭9 is asking for.':
    'Setiap tensi dinaikkan atau diturunkan: inilah tangga nada yang diminta ♭9.',
  'Lydian dominant': 'Lidia dominan',
  'A dominant with a raised 4th, which is exactly the ♯11.':
    'Sebuah dominan dengan kuart dinaikkan, yang persis merupakan ♯11.',
  "The dominant scale. The 4th clashes with the chord's 3rd — pass through it, do not land on it.":
    'Tangga nada dominan. Kuartnya berbenturan dengan terts akor: lewati saja, jangan berhenti di sana.',
  'Diminished (half–whole)': 'Diminis (semiton–ton)',
  'Symmetrical, like the chord — it works from any of the four notes.':
    'Simetris seperti akornya: bisa dimulai dari mana pun di antara keempat nadanya.',
  'Locrian ♮2': 'Lokria ♮2',
  'Locrian with the 2nd raised, which keeps the 9th usable.':
    'Lokria dengan sekonde dinaikkan, yang membuat nona tetap bisa dipakai.',

  // ------------------------------------------------ suggestions and reasons
  'SUGGESTED NEXT': 'SARAN BERIKUTNYA',
  'EVERY CHORD IN THE KEY': 'SEMUA AKOR DALAM TANGGA NADA',
  'THIS CHORD': 'AKOR INI',
  'THIS LOOP IS A': 'LOOP INI ADALAH',
  'HOW THIS LOOP READS': 'BAGAIMANA LOOP INI TERBACA',
  'Follow the key': 'Ikuti tangga nada',
  'Remove chord': 'Hapus akor',
  'Section role': 'Peran bagian',
  'Smooth voicings': 'Voicing halus',
  'Pick shapes that connect, so the hand barely moves':
    'Memilih bentuk yang saling menyambung, sehingga tangan nyaris tidak bergerak',
  'Clear all': 'Kosongkan semua',
  'Done': 'Selesai',
  'BAR {n}': 'BIRAMA {n}',
  'BAR {n} · {half} HALF': 'BIRAMA {n} · PARUH {half}',
  'FIRST': 'PERTAMA',
  'SECOND': 'KEDUA',
  'Bar {n}': 'Birama {n}',
  'Split bar into two chords': 'Bagi birama menjadi dua akor',
  'Clear': 'Kosongkan',
  '+ Loop': '+ Loop',
  'Duplicate': 'Gandakan',
  'Delete': 'Hapus',
  'Add an empty loop': 'Tambahkan loop kosong',
  'Duplicate this loop': 'Gandakan loop ini',
  'Delete this loop': 'Hapus loop ini',
  'Loop {name}': 'Loop {name}',
  'Loop name': 'Nama loop',
  'Starts at the next bar': 'Mulai pada birama berikutnya',
  'A big jump from the previous chord — try Smooth voicings.':
    'Lompatan besar dari akor sebelumnya: coba Voicing halus.',
  'Fret movement from the previous chord.': 'Perpindahan fret dari akor sebelumnya.',
  'Total fret movement across the loop: {cost}.':
    'Total perpindahan fret sepanjang loop: {cost}.',
  'Drop this bar’s own setting and follow the chord variation from Compose.':
    'Buang setelan birama ini sendiri dan ikuti variasi akor dari Menggubah.',
  'This bar already follows the chord variation set in Compose.':
    'Birama ini sudah mengikuti variasi akor yang disetel di Menggubah.',
  'Timeline is empty — add chords, or switch the metronome on.':
    'Linimasa kosong: tambahkan akor, atau nyalakan metronomnya.',
  'Loaded {chords} chords into {bars} bars.': '{chords} akor dimuat ke dalam {bars} birama.',
  'Add another chord to hear a progression.': 'Tambahkan satu akor lagi untuk mendengar sebuah progresi.',
  'Perfect cadence': 'Kadens sempurna',
  'Plagal cadence': 'Kadens plagal',
  'Half cadence': 'Kadens setengah',
  'Deceptive cadence': 'Kadens tipuan',
  'perfect': 'sempurna',
  'plagal': 'plagal',
  'half': 'setengah',
  'any': 'apa saja',
  'Dominant to tonic — the section lands.': 'Dari dominan ke tonika: bagian ini mendarat.',
  'IV to I — the "amen" ending, softer than a perfect cadence.':
    'Dari IV ke I: akhiran «amin», lebih lembut daripada kadens sempurna.',
  'Ends on the dominant, unresolved — it hands over to whatever comes next.':
    'Berakhir pada dominan tanpa selesai: ia menyerahkan giliran kepada apa pun yang datang berikutnya.',
  'The dominant resolves to vi instead of I — the ending is dodged on purpose.':
    'Dominan menyelesaikan ke vi alih-alih ke I: akhirnya sengaja dielakkan.',
  'A {section} usually ends with a {expected} cadence; this one ends with a {actual}.':
    'Bagian {section} biasanya berakhir dengan kadens {expected}; yang ini berakhir dengan {actual}.',
  'No clear cadence — the section stops rather than ends.':
    'Tanpa kadens yang jelas: bagian ini berhenti, bukan berakhir.',
  'Nothing here acts as a dominant, so the loop stays flat. Try a V7 before the turn.':
    'Tidak ada yang berperan sebagai dominan di sini, jadi loopnya datar. Coba V7 sebelum putarannya.',
  'All plain triads. A 7th or 9th on one chord will give the loop a centre of gravity.':
    'Semuanya trinada polos. Sebuah septim atau nona pada satu akor akan memberi loop ini titik berat.',
  'same chord': 'akor yang sama',
  'a move': 'sebuah perpindahan',
  'down a fifth — the strongest move there is': 'turun satu kuint: perpindahan terkuat yang ada',
  'down a third — two notes stay put': 'turun satu terts: dua nada tetap di tempat',
  'up a step': 'naik satu langkah',
  'down a step': 'turun satu langkah',
  'up a third': 'naik satu terts',
  'up a fifth — a step backwards, used deliberately':
    'naik satu kuint: satu langkah mundur, dipakai dengan sengaja',
  'opens a {section} well': 'membuka bagian {section} dengan baik',
  'ends a {section} the way it should': 'mengakhiri bagian {section} sebagaimana mestinya',
  'resolving here would spend the tension the {section} is building':
    'menyelesaikan di sini akan menghabiskan ketegangan yang sedang dibangun bagian {section}',
  'the tonic, which states the key outright': 'tonika, yang menyatakan tangga nadanya terang-terangan',
  'resolves the dominant': 'menyelesaikan dominan',
  'subdominant into dominant — the standard approach':
    'dari subdominan ke dominan: pendekatan baku',
  'home straight to the dominant, which is how half a songbook works':
    'dari rumah langsung ke dominan, dan begitulah separuh buku lagu bekerja',
  'steps away from home': 'melangkah menjauh dari rumah',
  'pulls back from the dominant, which loosens the tension':
    'mundur dari dominan, yang mengendurkan ketegangan',
  'The m7 — this is the ii of a ii–V, and it wants the dominant.':
    'm7: ini adalah ii dari sebuah ii–V, dan ia menginginkan dominan.',
  'A m9: the same function, more air.': 'Sebuah m9: fungsi yang sama, lebih lapang.',
  'Suspended, which delays the move.': 'Tertahan, yang menunda perpindahannya.',
  'A maj7 on the subdominant — soft, and it floats.':
    'Sebuah maj7 pada subdominan: lembut, dan melayang.',
  'A 6th chord, the settled vintage sound.': 'Akor sekst, bunyi lawas yang mapan.',
  'add9 keeps it a triad but opens it up.': 'add9 membuatnya tetap trinada tapi membukanya.',
  'The plain minor triad — the most direct statement of home.':
    'Trinada minor polos: pernyataan paling lugas tentang rumah.',
  'A m7 tonic: home, but still moving.': 'Tonika m7: di rumah, tapi masih bergerak.',
  'A m9 tonic, which is where a lot of neo-soul lives.':
    'Tonika m9, tempat banyak neo-soul bermukim.',
  'm6 — brighter than it looks, because of the raised 6th.':
    'm6: lebih cerah dari kelihatannya, karena sekst besarnya.',
  'The plain triad — nothing is clearer than this.': 'Trinada polos: tidak ada yang lebih jelas dari ini.',
  'maj7 makes the tonic dreamier and less final.':
    'maj7 membuat tonika lebih melamun dan kurang final.',
  'A 6/9 chord: resolved, but not a full stop.': 'Akor 6/9: selesai, tapi bukan titik.',
  'add9 — a triad with light on it.': 'add9: trinada yang terkena cahaya.',
  'A true dominant 7th — the pull home.': 'Septim dominan sejati: tarikan pulang.',
  'Add the 9th for warmth without losing the pull.':
    'Tambahkan nona untuk kehangatan tanpa kehilangan tarikannya.',
  'A 13th: the full dominant sound.': 'Tredesim: bunyi dominan yang penuh.',
  'Suspend the third, then release it into the 3rd.':
    'Tahan tertsnya, lalu lepaskan ke terts.',
  'With a ♭9 this is the classic minor-key dominant.':
    'Dengan ♭9 inilah dominan klasik untuk tangga nada minor.',
  'Half-diminished is how this degree is normally voiced — it heads for the dominant.':
    'Setengah diminis adalah cara tingkat ini biasanya disusun: ia menuju dominan.',
  'The bare diminished triad, which is harsher and rarely held.':
    'Trinada diminis telanjang, yang lebih kasar dan jarang ditahan.',
  'Fully diminished, as a passing chord between two neighbours.':
    'Diminis penuh, sebagai akor lintasan di antara dua tetangga.',

  // ------------------------------------------------------- song structures
  'Intro': 'Intro',
  'Verse': 'Bait',
  'Pre-Chorus': 'Pra-refrain',
  'Chorus': 'Refrain',
  'Bridge': 'Bridge',
  'Outro': 'Outro',
  'Apply': 'Terapkan',
  'Apply to timeline': 'Terapkan ke linimasa',
  'Establish the key without spending the big moment.':
    'Menegakkan tangga nada tanpa menghabiskan momen besarnya.',
  'A loop that can carry many different melodies.':
    'Loop yang sanggup menopang banyak melodi berbeda.',
  'Climb, and hand the chorus an unresolved dominant.':
    'Menanjak, lalu menyerahkan dominan yang belum selesai kepada refrain.',
  'The strongest, plainest statement of the key.':
    'Pernyataan tangga nada yang paling kuat dan paling lugas.',
  'Leave home so returning means something.': 'Pergi dari rumah agar pulang menjadi bermakna.',
  'Land, or vamp somewhere restful.': 'Mendarat, atau ber-vamp di tempat yang tenang.',
  'Simple & Open': 'Sederhana & terbuka',
  'Suspended Mood': 'Suasana tertahan',
  'Single-Chord Drone': 'Dengung satu akor',
  'Dominant Tease': 'Godaan dominan',
  'Establishes the key calmly before the verse enters.':
    'Menegakkan tangga nada dengan tenang sebelum baitnya masuk.',
  'Opens on a softer, unresolved colour.': 'Membuka dengan warna yang lebih lembut dan belum selesai.',
  'Holds the tonic so the first vocal line does the work.':
    'Menahan tonika agar baris vokal pertama yang bekerja.',
  'Starts on tension and resolves into bar one.':
    'Mulai dari ketegangan dan menyelesaikan ke birama pertama.',
  'Narrative Motion': 'Gerak bertutur',
  'Understated': 'Bersahaja',
  'Descending Line': 'Garis menurun',
  'Minor Verse': 'Bait minor',
  'Steady storytelling motion, familiar and grounded.':
    'Gerak bertutur yang mantap, akrab dan membumi.',
  'Restrained — leaves room for the chorus to lift.':
    'Bersahaja: menyisakan ruang bagi refrain untuk mengangkat.',
  'The axis loop, which never tires of being sung over.':
    'Loop empat akor itu, yang tak pernah bosan dinyanyikan di atasnya.',
  'Same chords starting on the relative minor — darker footing.':
    'Akor yang sama tapi dimulai dari minor relatif: pijakan yang lebih gelap.',
  'Rising Tension': 'Ketegangan menanjak',
  'Stepwise Build': 'Bangunan selangkah demi selangkah',
  'Hold the Five': 'Tahan tingkat kelima',
  'Climbs and holds the dominant so the chorus can release it.':
    'Menanjak dan menahan dominan agar refrain bisa melepaskannya.',
  'Walks up the scale — momentum without a key change.':
    'Menaiki tangga nada: momentum tanpa perpindahan tangga nada.',
  'Two chords, twice as long each. Maximum anticipation.':
    'Dua akor, masing-masing dua kali lebih panjang. Penantian maksimum.',
  'Big Lift': 'Angkatan besar',
  'Anthemic': 'Bergaya anthem',
  'Plagal Power': 'Kekuatan plagal',
  'Minor Hook': 'Hook minor',
  'Climbs above the verse for a euphoric hook.':
    'Menanjak di atas bait untuk sebuah hook yang meluap.',
  'Instantly singable — the classic pop lift.':
    'Langsung bisa dinyanyikan: angkatan pop yang klasik.',
  'Tonic and subdominant only. Hymn-like and immovable.':
    'Hanya tonika dan subdominan. Seperti himne, dan tak tergoyahkan.',
  'Begins minor and resolves major — bittersweet.':
    'Mulai minor dan selesai mayor: manis bercampur getir.',
  'Harmonic Detour': 'Simpangan harmonis',
  'Mediant Shift': 'Geseran median',
  'Relative Minor': 'Minor relatif',
  'Suspended Halt': 'Henti tertahan',
  'Borrows jazz motion to contrast the chorus.':
    'Meminjam gerak jazz untuk mengontraskan refrain.',
  'A brief modal colour before the final chorus.':
    'Sekilas warna modal sebelum refrain terakhir.',
  'Moves the centre of gravity to the relative minor.':
    'Memindahkan titik berat ke minor relatif.',
  'Two chords, held. The pause before the last chorus.':
    'Dua akor, ditahan. Jeda sebelum refrain terakhir.',
  'Fade Home': 'Memudar pulang',
  'Loop & Dissolve': 'Loop & larut',
  'Plagal Amen': 'Amin plagal',
  'Unresolved': 'Belum selesai',
  'A final cadence that settles the song.': 'Kadens penutup yang menenangkan lagunya.',
  'A gentle vamp to fade out on.': 'Vamp lembut untuk memudar keluar.',
  'The IV–I "amen" cadence — restful, conclusive.':
    'Kadens «amin» IV–I: tenang dan menyimpulkan.',
  'Ends on the dominant, leaving the question open.':
    'Berakhir pada dominan, membiarkan pertanyaannya terbuka.',

  // ---------------------------------------------------------------- moods
  'EVERYTHING BELOW IS IN': 'SEMUA DI BAWAH INI DALAM',
  '🔒 locked — suggestions stay in this key':
    '🔒 terkunci: saran tetap dalam tangga nada ini',
  'unlocked — a suggestion may bring its own mode':
    'terbuka: sebuah saran boleh membawa modusnya sendiri',
  'Melancholic': 'Muram',
  'Energetic': 'Berenergi',
  'Dreamy': 'Melamun',
  'Heroic': 'Kepahlawanan',
  'Bluesy': 'Bernuansa blues',
  'Epic': 'Megah',
  'Dark': 'Gelap',
  'Hopeful': 'Penuh harap',
  'Nostalgic': 'Nostalgis',
  'Hypnotic': 'Menghipnotis',
  'Sophisticated': 'Berkelas',
  'Restless': 'Gelisah',
  'Tender': 'Lembut',
  'Triumphant': 'Penuh kemenangan',
  'Begins on the relative minor and circles home without ever quite settling.':
    'Mulai dari minor relatif dan berputar pulang tanpa pernah benar-benar mengendap.',
  'Primary triads, no minor chords, constant forward push.':
    'Trinada utama, tanpa akor minor, dorongan maju yang terus-menerus.',
  'Lydian major sevenths — the raised 4th keeps the tonic floating.':
    'Septim mayor lidia: kuart yang dinaikkan membuat tonika terus melayang.',
  'Tonic and subdominant trading places, then the dominant to lift it.':
    'Tonika dan subdominan bertukar tempat, lalu dominan mengangkatnya.',
  'Dominant sevenths on every degree — grit rather than sweetness.':
    'Septim dominan pada setiap tingkat: kasar alih-alih manis.',
  'Minor tonic under three major chords. Scale without brightness.':
    'Tonika minor di bawah tiga akor mayor. Kemegahan tanpa kecerahan.',
  'The ♭2 pressing against the tonic — unresolved and menacing.':
    '♭2 menekan tonika: belum selesai dan mengancam.',
  'Starts away from the tonic so arriving home reads as relief.':
    'Mulai jauh dari tonika agar tiba di rumah terasa sebagai kelegaan.',
  'The doo-wop turnaround. Familiar to the point of comfort.':
    'Putaran doo-wop. Akrab sampai terasa nyaman.',
  'Two chords, minor with a major 6th. Built for playing over.':
    'Dua akor, minor dengan sekst besar. Dibuat untuk dimainkan di atasnya.',
  'ii–V–I with sevenths throughout — the jazz cadence.':
    'ii–V–I dengan septim di semuanya: kadens jazz.',
  'A stepwise descent that keeps arriving somewhere new.':
    'Turunan selangkah demi selangkah yang terus tiba di tempat baru.',
  'Gentle mediant motion — close voicings, little movement in the bass.':
    'Gerak median yang lembut: voicing rapat, sedikit gerakan pada bas.',
  'The ♭VII gives it swagger without losing the major tonic.':
    '♭VII memberinya lagak tanpa kehilangan tonika mayornya.',

  // ------------------------------------------------- progression library
  'FAMILY': 'KELUARGA',
  'Progression family': 'Keluarga progresi',
  'All families ({n})': 'Semua keluarga ({n})',
  'Search name, numerals, or a song…': 'Cari nama, angka, atau lagu…',
  'Search progressions': 'Cari progresi',
  '{n} PROGRESSION': '{n} PROGRESI',
  '{n} PROGRESSIONS': '{n} PROGRESI',
  'MATCHING “{query}”': 'YANG COCOK DENGAN «{query}»',
  'Nothing matches that. Try a song name, a chord, or clear the search.':
    'Tidak ada yang cocok. Coba nama lagu, sebuah akor, atau kosongkan pencariannya.',
  "Pick a family or search, then tap a progression to open it — you'll hear it in the current key. Apply writes it to the timeline. Numerals and chord names are computed from what will actually play.":
    'Pilih sebuah keluarga atau cari, lalu ketuk sebuah progresi untuk membukanya: Anda akan mendengarnya dalam tangga nada saat ini. Terapkan menuliskannya ke linimasa. Angka dan nama akor dihitung dari apa yang benar-benar akan berbunyi.',
  '▶ Hear it': '▶ Dengarkan',
  'HEARD IN': 'TERDENGAR DI',
  '{n} bar': '{n} birama',
  '{n} bars': '{n} birama',
  '(written in {mode})': '(ditulis dalam {mode})',
  'Previewing {name} — tap Apply to keep it.':
    'Mendengarkan {name}: ketuk Terapkan untuk menyimpannya.',
  'Stop playback to preview a progression.':
    'Hentikan pemutaran untuk mendengarkan sebuah progresi.',
  'Pop & Rock': 'Pop & rock',
  'Modal Rock': 'Rock modal',
  'Minor Keys': 'Tangga nada minor',
  'Jazz': 'Jazz',
  'Jazz & Neo-Soul': 'Jazz & neo-soul',
  'Blues': 'Blues',
  'Folk & Country': 'Folk & country',
  'Handbook': 'Buku pegangan',
  'Axis of Awesome': 'Empat akor itu',
  'Axis, Minor Start': 'Empat akor itu, mulai dari minor',
  '50s Doo-Wop': 'Doo-wop era 50-an',
  'Three-Chord Rock': 'Rock tiga akor',
  'Pop-Punk Lift': 'Angkatan pop-punk',
  'Ballad Climb': 'Tanjakan balada',
  "Pachelbel's Canon": 'Kanon Pachelbel',
  'The four chords behind a startling share of the charts. Endlessly singable.':
    'Empat akor di balik sebagian tangga lagu yang mengejutkan banyaknya. Bisa dinyanyikan tanpa habis.',
  'The same loop rotated to begin on the relative minor — wistful rather than triumphant.':
    'Loop yang sama, diputar agar mulai dari minor relatif: sendu alih-alih penuh kemenangan.',
  'Ballads, prom scenes, "Stand By Me". Warm and instantly nostalgic.':
    'Balada, adegan pesta dansa sekolah, «Stand By Me». Hangat dan langsung membangkitkan kenangan.',
  'The primary triads and nothing else. Direct, and hard to make sound wrong.':
    'Trinada utama dan tidak ada yang lain. Lugas, dan sulit dibuat terdengar salah.',
  'Starts away from home so the chorus lands as a return.':
    'Mulai jauh dari rumah agar refrainnya mendarat sebagai kepulangan.',
  'A stepwise rise through the scale — builds tension without a key change.':
    'Tanjakan selangkah demi selangkah menaiki tangga nada: membangun ketegangan tanpa berpindah tangga nada.',
  'A descending sequence that has outlived three centuries of fashion.':
    'Rangkaian menurun yang bertahan melewati tiga abad selera zaman.',
  'Mixolydian Rock': 'Rock miksolidia',
  'Dorian Vamp': 'Vamp doria',
  'Grunge ♭VI–♭VII': 'Grunge ♭VI–♭VII',
  'Lydian Lift': 'Angkatan lidia',
  'Phrygian Descent': 'Turunan frigia',
  'The ♭VII is what makes this rock rather than pop — think "Sweet Home Alabama".':
    '♭VII-lah yang membuatnya rock, bukan pop: ingat «Sweet Home Alabama».',
  'Minor with a bright 6th. Hypnotic, jam-friendly, never fully sad.':
    'Minor dengan sekst yang cerah. Menghipnotis, enak untuk jam, tak pernah benar-benar sedih.',
  'Heavy and modal — the flat 6th and 7th give it the weight.':
    'Berat dan modal: sekst dan septim kecilnya yang memberi bobot.',
  'The ♯4 floats the tonic. Cinematic wonder in two chords.':
    '♯4 membuat tonika melayang. Keajaiban sinematik dalam dua akor.',
  'The ♭2 leaning on the tonic — flamenco and metal share this one.':
    '♭2 bersandar pada tonika: flamenco dan metal berbagi yang satu ini.',
  'Andalusian Cadence': 'Kadens Andalusia',
  'Epic Minor': 'Minor megah',
  'Minor Ballad': 'Balada minor',
  'Minor Climb': 'Tanjakan minor',
  'A stepwise descent from the tonic. Dramatic, and older than most of what it appears in.':
    'Turunan selangkah demi selangkah dari tonika. Dramatis, dan lebih tua daripada kebanyakan lagu yang memakainya.',
  'i–VI–III–VII. Trailers, anthems, anything that needs scale.':
    'i–VI–III–VII. Cuplikan film, anthem, apa pun yang butuh kemegahan.',
  'The doo-wop shape in minor — familiar bones, darker colour.':
    'Bentuk doo-wop dalam minor: kerangka yang akrab, warna yang lebih gelap.',
  'Rises through the relative major before falling back to the tonic.':
    'Menanjak lewat mayor relatif sebelum jatuh kembali ke tonika.',
  'ii–V–I Turnaround': 'Putaran ii–V–I',
  'Rhythm Changes A': 'Rhythm changes A',
  'Bossa Turnaround': 'Putaran bossa',
  'Jazz Blues Head': 'Tema blues jazz',
  'Circle of Fifths Run': 'Lari lingkaran kuint',
  'The central cadence of jazz. Learn it in all twelve keys and half the language follows.':
    'Kadens inti dalam jazz. Kuasai di dua belas tangga nada dan separuh bahasanya ikut.',
  'I–vi–ii–V, the most-played eight bars in the standard repertoire.':
    'I–vi–ii–V, delapan birama yang paling sering dimainkan dalam repertoar standar.',
  'Major sevenths and a gentle ii–V. Nylon strings and brushes.':
    'Septim mayor dan ii–V yang lembut. Senar nilon dan sapu drum.',
  'Dominant sevenths throughout — the blues with a jazz accent.':
    'Septim dominan di sepanjangnya: blues dengan logat jazz.',
  'Root movement by fourths all the way home — every chord pulls to the next.':
    'Gerak nada dasar per kuart sampai pulang: setiap akor menarik akor berikutnya.',
  'Neo-Soul Loop': 'Loop neo-soul',
  'Half-Diminished ii–V–i': 'ii–V–i setengah diminis',
  'Minor ii–V–i with a ♭9': 'ii–V–i minor dengan ♭9',
  'Sus4 Release': 'Pelepasan sus4',
  '6/9 Turnaround': 'Putaran 6/9',
  'Secondary Dominant Cycle': 'Siklus dominan sekunder',
  'Dorian with ninths on everything. The major IV is what makes Dorian sound like Dorian rather than minor.':
    'Doria dengan nona di semuanya. IV mayor-lah yang membuat doria terdengar doria, bukan minor.',
  'The textbook minor cadence: iiø7 sets up the dominant, the dominant lands on a m9.':
    'Kadens minor sesuai buku: iiø7 menyiapkan dominan, dan dominan mendarat pada m9.',
  'Dm9 – E7♭9 – Am9 in A minor. The v has to be borrowed as a dominant to pull home, and the ♭9 is the note that makes it ache.':
    'Dm9 – E7♭9 – Am9 dalam A minor. v harus dipinjam sebagai dominan agar bisa menarik pulang, dan ♭9 adalah nada yang membuatnya perih.',
  'Hold the 4th, then let it fall to the 3rd. The oldest tension-and-release there is.':
    'Tahan kuartnya, lalu biarkan jatuh ke terts. Ketegangan dan kelepasan yang paling tua yang ada.',
  'A 6/9 tonic never quite sits down, so the loop keeps turning. The 13th on the V is the full jazz dominant.':
    'Tonika 6/9 tak pernah benar-benar duduk, jadi loopnya terus berputar. Tredesim di atas V adalah dominan jazz yang penuh.',
  'Every chord is the dominant of the next. Each borrowed 7th pulls a fifth down into the chord after it.':
    'Setiap akor adalah dominan bagi akor berikutnya. Setiap septim pinjaman menarik turun satu kuint ke akor sesudahnya.',
  '12-Bar Blues': 'Blues 12 birama',
  '12-Bar Quick Change': 'Blues 12 birama dengan pergantian cepat',
  'Minor Blues': 'Blues minor',
  'The form. Twelve bars, three chords, a century of music.':
    'Bentuknya. Dua belas birama, tiga akor, satu abad musik.',
  'Moves to the IV in bar two — more motion early on.':
    'Berpindah ke IV pada birama kedua: lebih banyak gerak sejak awal.',
  'The same twelve bars in minor. Slower, heavier, more room to bend.':
    'Dua belas birama yang sama dalam minor. Lebih lambat, lebih berat, lebih banyak ruang untuk bending.',
  'Country I–IV–V': 'Country I–IV–V',
  'Folk Circle': 'Lingkaran folk',
  'Celtic Vamp': 'Vamp Kelt',
  'The three chords most songs are made of.': 'Tiga akor yang menyusun kebanyakan lagu.',
  'Home, away, home, away. The campfire progression.':
    'Rumah, pergi, rumah, pergi. Progresi api unggun.',
  'The ♭VII again, this time in a jig. Works beautifully in DADGAD.':
    '♭VII lagi, kali ini dalam sebuah jig. Terdengar indah di DADGAD.',

  // ------------------------------------------------------------- handbook
  '1 · Single Major Chord': '1 · Satu akor mayor tunggal',
  '2 · Single Minor Chord': '2 · Satu akor minor tunggal',
  '3 · Tonic–Dominant, Major': '3 · Tonika–dominan, mayor',
  '4 · Tonic–Dominant, Minor': '4 · Tonika–dominan, minor',
  '5 · Tonic–Subdominant': '5 · Tonika–subdominan',
  '6 · Major to Relative Minor': '6 · Dari mayor ke minor relatif',
  '7 · I–IV–V': '7 · I–IV–V',
  '8 · I–IV–V, Plagal Cadence': '8 · I–IV–V, kadens plagal',
  '9 · I–IV–V–IV': '9 · I–IV–V–IV',
  '10 · Minor to ♭III': '10 · Dari minor ke ♭III',
  '11 · Minor to ♭VII': '11 · Dari minor ke ♭VII',
  '12 · Doo-Wop / Ice Cream': '12 · Doo-wop / kedai es krim',
  '12A · I–V–vi–IV': '12A · I–V–vi–IV',
  '12B · I–IV–vi–V': '12B · I–IV–vi–V',
  '13 · Rhythm Changes': '13 · Rhythm changes',
  '13B · Secondary Dominants': '13B · Dominan sekunder',
  '13D · The Turnaround': '13D · Putarannya',
  '14 · ii–V–I–IV': '14 · ii–V–I–IV',
  '15 · Modal with ii and IV': '15 · Modal dengan ii dan IV',
  '16 · I–♭VII–IV–I': '16 · I–♭VII–IV–I',
  '18 · i–♭III–♭VII–i': '18 · i–♭III–♭VII–i',
  '19 · Andalusian Cadence': '19 · Kadens Andalusia',
  "20 · Pachelbel's Canon": '20 · Kanon Pachelbel',
  'One chord, held. Everything else in music is a departure from this.':
    'Satu akor, ditahan. Semua hal lain dalam musik adalah keberangkatan dari sini.',
  'The same drone in minor. A whole song can live here.':
    'Dengung yang sama dalam minor. Satu lagu utuh bisa hidup di sini.',
  'Away and back. The smallest complete musical sentence there is.':
    'Pergi dan kembali. Kalimat musik utuh yang paling kecil yang ada.',
  'The same two-chord motion with a minor tonic — darker, and it leans harder.':
    'Gerak dua akor yang sama dengan tonika minor: lebih gelap, dan bersandar lebih keras.',
  'Away and back without tension. Restful where the dominant is restless.':
    'Pergi dan kembali tanpa ketegangan. Tenang di tempat dominan justru gelisah.',
  'The same seven notes, seen from its shadow.':
    'Tujuh nada yang sama, dilihat dari bayangannya.',
  'Ends IV to I rather than V to I — the softer landing.':
    'Berakhir IV ke I, bukan V ke I: pendaratan yang lebih lembut.',
  'Sits on the tonic before moving — leaves space for the vocal.':
    'Duduk di tonika sebelum bergerak: menyisakan ruang untuk vokal.',
  'Minor tonic to its relative major. Used alone, or to open something longer.':
    'Dari tonika minor ke mayor relatifnya. Dipakai sendiri, atau untuk membuka sesuatu yang lebih panjang.',
  'Minor, its relative major, and the subtonic. Endlessly loopable.':
    'Minor, mayor relatifnya, dan subtonika. Bisa di-loop tanpa habis.',
  'The same four chords rotated. Probably the most recorded loop alive.':
    'Empat akor yang sama, diputar. Mungkin loop paling banyak direkam yang ada.',
  'The subdominant arrives early, so the minor lands harder.':
    'Subdominan datang lebih awal, sehingga minornya mendarat lebih keras.',
  'I–vi–ii–V. The circle of fifths, walked backwards, four bars at a time.':
    'I–vi–ii–V. Lingkaran kuint, ditelusuri mundur, empat birama sekali jalan.',
  'Each chord turned into the dominant of the next, so the loop pulls all the way round.':
    'Setiap akor dijadikan dominan bagi akor berikutnya, sehingga loopnya menarik sepanjang putaran.',
  'iii–vi–ii–V. Tacked on the end to extend an ending, in show tunes and jazz.':
    'iii–vi–ii–V. Ditempelkan di belakang untuk memanjangkan penutup, dalam lagu panggung dan jazz.',
  'The jazz cadence, then straight out to the subdominant instead of resting.':
    'Kadens jazz, lalu langsung keluar ke subdominan alih-alih beristirahat.',
  'Stepwise out of the tonic. Modern pop leans on this constantly.':
    'Keluar dari tonika selangkah demi selangkah. Pop modern bersandar pada ini terus-menerus.',
  'Mixolydian rock. The ♭VII is what stops it sounding like a hymn.':
    'Rock miksolidia. ♭VII-lah yang mencegahnya terdengar seperti himne.',
  'The first chord from outside the major scale. Modal, and instantly modern.':
    'Akor pertama dari luar tangga nada mayor. Modal, dan langsung terdengar modern.',
  'The loop that never resolves, so it can go round forever.':
    'Loop yang tak pernah selesai, sehingga bisa berputar selamanya.',
  'Stepwise descending, out of Flamenco. The V7 at the bottom is what makes it Spanish rather than merely minor.':
    'Menurun selangkah demi selangkah, berasal dari flamenco. V7 di bawahlah yang membuatnya Spanyol, bukan sekadar minor.',
  'Eight bars from 1680 that pop music has never stopped borrowing.':
    'Delapan birama dari tahun 1680 yang tak pernah berhenti dipinjam musik pop.',
  'I–vi–IV–V. Fifty years of hits and it still has not worn out.':
    'I–vi–IV–V. Lima puluh tahun lagu hit dan ia belum juga aus.',

  // ---------------------------------------------------------------- tuner
  'Instrument': 'Instrumen',
  'Tuning meter': 'Meteran steman',
  'A4 = {hz} Hz': 'A4 = {hz} Hz',
  'Signal:': 'Sinyal:',
  'Status:': 'Status:',
  'Freq: —': 'Frek.: —',
  'Freq: {hz}Hz': 'Frek.: {hz} Hz',
  'listening': 'mendengarkan',
  'LOCKED': 'PAS',
  'FLAT': 'TERLALU RENDAH',
  'SHARP': 'TERLALU TINGGI',
  'START LISTENING': 'MULAI MENDENGARKAN',
  'STOP LISTENING': 'BERHENTI MENDENGARKAN',
  'Auto': 'Otomatis',
  'AUTO': 'OTOMATIS',
  'Manual': 'Manual',
  'MANUAL · {note}': 'MANUAL · {note}',
  'OPTIONS': 'OPSI',
  'TARGET': 'SASARAN',
  'REFERENCE TONE': 'NADA ACUAN',
  'CHIME WHEN IN TUNE': 'BUNYI SAAT SUDAH PAS',
  'SENSITIVITY': 'KEPEKAAN',
  'RESPONSE': 'RESPONS',
  'IN-TUNE WINDOW': 'RENTANG DIANGGAP PAS',
  'REFERENCE A4': 'A4 ACUAN',
  'Follows the nearest string in the tuning': 'Mengikuti senar terdekat dalam steman',
  'Holds the string you pinned': 'Bertahan pada senar yang Anda sematkan',
  'Follows whichever string of the tuning is nearest to what it hears':
    'Mengikuti senar steman mana pun yang paling dekat dengan yang didengarnya',
  'Stays on the pinned string, however far out it is':
    'Tetap pada senar yang disematkan, sejauh apa pun melesetnya',
  'Sine': 'Sinus',
  'Warm': 'Hangat',
  'String': 'Senar',
  'Tapping a string pins it without sounding anything.':
    'Mengetuk sebuah senar menyematkannya tanpa membunyikan apa pun.',
  'A clean sine, sounded once. Tap again to hear it again.':
    'Gelombang sinus bersih, berbunyi sekali. Ketuk lagi untuk mendengarnya lagi.',
  'A triangle — rounder, and easier to pitch against.':
    'Gelombang segitiga: lebih bulat, dan lebih mudah dijadikan patokan.',
  'One pluck of the guitar itself, on the melody voices.':
    'Satu petikan dari gitarnya sendiri, pada suara melodi.',
  'A short two-note chime the moment a string settles':
    'Bunyi pendek dua nada begitu senarnya mapan',
  'Silent — watch the dial': 'Diam: perhatikan jarumnya',
  'Low': 'Rendah',
  'Normal': 'Normal',
  'High': 'Tinggi',
  'Steady': 'Mantap',
  'Quick': 'Cepat',
  'The default': 'Bawaan',
  'The default; below what most ears hear': 'Bawaan; di bawah yang bisa didengar kebanyakan telinga',
  'Ignores everything quiet — for noisy rooms': 'Mengabaikan semua yang lirih: untuk ruangan berisik',
  'Hears a soft, decaying note for longer': 'Mendengar nada lirih yang meluruh lebih lama',
  'Slower needle, less jitter': 'Jarum lebih lambat, lebih sedikit getaran',
  'Follows the string immediately': 'Mengikuti senar seketika',
  'Studio — hard to hold, exact when it locks': 'Studio: sulit dipertahankan, tepat ketika terkunci',
  'Forgiving — locks quickly on stage': 'Toleran: cepat terkunci di atas panggung',
  'Uses the microphone. Nothing is recorded or sent anywhere.':
    'Memakai mikrofon. Tidak ada yang direkam atau dikirim ke mana pun.',
  'Listening is unavailable here — the page CircleSong is embedded in withholds the microphone.':
    'Mendengarkan tidak tersedia di sini: halaman tempat CircleSong disematkan menahan mikrofonnya.',
  'Open CircleSong at its own address to listen. Tap a string to hear its exact pitch and tune by ear — that works anywhere.':
    'Buka CircleSong di alamatnya sendiri untuk mendengarkan. Ketuk sebuah senar untuk mendengar nadanya yang tepat dan menyetem dengan telinga: itu bekerja di mana saja.',
  'Audio could not start, so the tuner cannot listen.':
    'Audio tidak bisa dimulai, jadi penyetem tidak bisa mendengarkan.',
  'This browser does not offer microphone access to the page.':
    'Peramban ini tidak memberi halaman akses ke mikrofon.',
  'The page CircleSong is embedded in has not granted it the microphone, so it cannot even ask.':
    'Halaman tempat CircleSong disematkan tidak memberinya mikrofon, jadi ia bahkan tidak bisa meminta.',
  'Open CircleSong from its own address — the installed app, or the copy served from GitHub — and listening will work.':
    'Buka CircleSong dari alamatnya sendiri — aplikasi yang terpasang, atau salinan yang disajikan dari GitHub — dan mendengarkan akan berfungsi.',
  'Meanwhile you can tune by ear: tap a string above to hear its exact pitch.':
    'Sementara itu Anda bisa menyetem dengan telinga: ketuk sebuah senar di atas untuk mendengar nadanya yang tepat.',
  'Microphone access was refused. Allow it for this page in your browser’s site settings, then switch Listen on again. You can tune by ear in the meantime — tap a string above to hear its pitch.':
    'Akses mikrofon ditolak. Izinkan untuk halaman ini di pengaturan situs peramban Anda, lalu nyalakan Mendengarkan lagi. Sementara itu Anda bisa menyetem dengan telinga: ketuk sebuah senar di atas untuk mendengar nadanya.',
  'No microphone was found on this device. Tap a string above to hear its pitch and tune by ear.':
    'Tidak ditemukan mikrofon pada perangkat ini. Ketuk sebuah senar di atas untuk mendengar nadanya dan menyetem dengan telinga.',
  'The microphone could not be opened — {error}.':
    'Mikrofon tidak bisa dibuka — {error}.',
  'unknown error': 'kesalahan tak dikenal',
  'Guitar': 'Gitar',
  'Bass': 'Bas',
  'Ukulele': 'Ukulele',
  'Mandolin': 'Mandolin',
  'Banjo': 'Banjo',
  'Violin': 'Biola',
  'Cello / Viola': 'Selo / biola alto',
  'Chromatic': 'Kromatis',
  'Chromatic — play any note and it will be named. Tap one to hear it.':
    'Kromatis: mainkan nada apa pun dan namanya akan disebut. Ketuk salah satu untuk mendengarnya.',
  'Standard — E A D G B E': 'Standar — E A D G B E',
  'Drop D — D A D G B E': 'Drop D — D A D G B E',
  'Half step down — E♭ A♭ D♭ G♭ B♭ E♭': 'Turun setengah nada — E♭ A♭ D♭ G♭ B♭ E♭',
  'Full step down — D G C F A D': 'Turun satu nada — D G C F A D',
  'Open G — D G D G B D': 'Open G — D G D G B D',
  'Open D — D A D F♯ A D': 'Open D — D A D F♯ A D',
  'DADGAD — D A D G A D': 'DADGAD — D A D G A D',
  'Drop C — C G C F A D': 'Drop C — C G C F A D',
  '7-string — B E A D G B E': '7 senar — B E A D G B E',
  'Standard 4-string — E A D G': 'Standar 4 senar — E A D G',
  'Drop D — D A D G': 'Drop D — D A D G',
  'Half step down — E♭ A♭ D♭ G♭': 'Turun setengah nada — E♭ A♭ D♭ G♭',
  'Standard 5-string — B E A D G': 'Standar 5 senar — B E A D G',
  'Standard high-G — G C E A': 'Standar G tinggi — G C E A',
  'Low-G — G C E A': 'G rendah — G C E A',
  'D tuning — A D F♯ B': 'Steman D — A D F♯ B',
  'Baritone — D G B E': 'Bariton — D G B E',
  'Standard — G D A E': 'Standar — G D A E',
  'Open G — F♯ D A D': 'Open G — F♯ D A D',
  'Open G 5-string — g D G B D': 'Open G 5 senar — g D G B D',
  'Double C — g C G C D': 'Double C — g C G C D',
  'Sawmill — g D G C D': 'Sawmill — g D G C D',
  'Cello — C G D A': 'Selo — C G D A',
  'Viola — C G D A': 'Biola alto — C G D A',
  'Any note — C1 to B6': 'Nada apa saja — C1 sampai B6',

  // ---------------------------------------------------------------- songs
  'CURRENT SONG': 'LAGU SAAT INI',
  'Save': 'Simpan',
  'Save as new': 'Simpan sebagai baru',
  'New song': 'Lagu baru',
  'Open': 'Buka',
  'Import a song file': 'Impor berkas lagu',
  'Nothing saved yet.': 'Belum ada yang tersimpan.',
  'Nothing saved yet. Save the current song to start a library.':
    'Belum ada yang tersimpan. Simpan lagu saat ini untuk memulai pustaka.',
  '{n} loop': '{n} loop',
  '{n} loops': '{n} loop',
  '{n} bar written': '{n} birama tertulis',
  '{n} bars written': '{n} birama tertulis',
  'saved': 'tersimpan',
  'just now': 'baru saja',
  '{n} min ago': '{n} menit lalu',
  '{n} h ago': '{n} jam lalu',
  'Delete “{name}”? This cannot be undone.': 'Hapus «{name}»? Ini tidak bisa dibatalkan.',
  'Project deleted.': 'Proyek dihapus.',
  'That project could not be read.': 'Proyek itu tidak bisa dibaca.',
  'Opened “{name}”.': '«{name}» dibuka.',
  'Saved “{name}”.': '«{name}» disimpan.',
  'Loaded “{name}”.': '«{name}» dimuat.',
  'This browser will not let the app save locally.':
    'Peramban ini tidak mengizinkan aplikasi menyimpan secara lokal.',
  'This browser will not let the app store anything locally.':
    'Peramban ini tidak mengizinkan aplikasi menyimpan apa pun secara lokal.',
  "No room left in this browser's storage. Delete a project and try again.":
    'Penyimpanan peramban ini sudah penuh. Hapus sebuah proyek dan coba lagi.',
  'Start a new song? Anything unsaved will be lost.':
    'Mulai lagu baru? Semua yang belum tersimpan akan hilang.',
  'New song started.': 'Lagu baru dimulai.',
  'Could not read that file — {error}': 'Berkas itu tidak bisa dibaca — {error}',
  'Unrecognised file format': 'Format berkas tidak dikenali',
};

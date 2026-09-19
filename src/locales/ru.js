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
 * Russian.
 *
 * Keys are the English source strings; see src/i18n.js. Anything absent falls
 * back to English, so a partial dictionary is a working one.
 *
 * Note letters stay Latin, and this is the decision that matters most here.
 * Russian teaching uses the до-ре-ми syllables, but the fretboard diagram, the
 * chord symbols and the tuner all draw letters, and renaming them would be a
 * correctness change rather than a translation — Am would have to become Лям.
 * The words *about* the notes are Russian; the letters on the instrument are
 * not.
 */
export const LOCALE_RU = {
  // ---------------------------------------------------------------- chrome
  'Language': 'Язык',
  'LANGUAGE': 'ЯЗЫК',
  'Everything the app says, including the lessons and the progression notes.':
    'Всё, что говорит приложение, включая уроки и пояснения к последовательностям.',
  'About CircleSong': 'О CircleSong',
  'Audio engine': 'Звуковой движок',
  'Audio engine ready': 'Звуковой движок готов',
  'Tap anything to start audio': 'Коснитесь чего угодно, чтобы запустить звук',
  'Audio unavailable — {error}': 'Звук недоступен — {error}',
  'Play': 'Играть',
  'Stop': 'Стоп',
  'SONG:': 'ПЕСНЯ:',
  'Song title': 'Название песни',
  'Untitled Song': 'Песня без названия',
  'Tempo': 'Темп',
  'Time signature': 'Размер',
  'Metro': 'Метро',
  'Loop': 'Луп',
  'Drums': 'Ударные',
  'Backing drums': 'Ударные аккомпанемента',
  'CLOSE': 'ЗАКРЫТЬ',
  'Theme': 'Тема',
  'THEME': 'ТЕМА',
  'System': 'Системная',
  'Light': 'Светлая',
  'Dark': 'Тёмная',
  'High contrast': 'Высокий контраст',
  'Sepia': 'Сепия',
  'Currently {theme}.': 'Сейчас: {theme}.',
  'Follows your device, and changes with it.': 'Следует за устройством и меняется вместе с ним.',
  'The default. Neon on black.': 'По умолчанию. Неон на чёрном.',
  'Ink on paper, with a darker accent so it stays legible.':
    'Чернила на бумаге, с более тёмным акцентом, чтобы оставаться читаемой.',
  'Pure black and white, visible borders, no faint washes.':
    'Чистое чёрно-белое, видимые границы, никаких бледных заливок.',
  'Warm and low-glare, for long sessions.': 'Тёплая и без бликов, для долгих занятий.',

  // ------------------------------------------------------------------ tabs
  'Circle': 'Круг',
  'Tuner': 'Тюнер',
  'Tone': 'Тембр',
  'Compose': 'Сочинять',
  'Timeline': 'Таймлайн',
  'Assist': 'Помощник',
  'Learn': 'Учиться',
  'Songs': 'Песни',

  // --------------------------------------------------------- panel headings
  '/01 CIRCLE_OF_FIFTHS': '/01 КВИНТОВЫЙ_КРУГ',
  '/02 GUITAR_TONE': '/02 ТЕМБР_ГИТАРЫ',
  '/02B VOICE': '/02B ГОЛОС',
  '/02C PLAYBACK': '/02C ВОСПРОИЗВЕДЕНИЕ',
  '/03 STRUM_&_RHYTHM': '/03 БОЙ_И_РИТМ',
  '/03 DRUM_MACHINE': '/03 ДРАМ-МАШИНА',
  '/04 DIATONIC_CHORDS': '/04 ДИАТОНИЧЕСКИЕ_АККОРДЫ',
  '/05 TIMELINE': '/05 ТАЙМЛАЙН',
  '/06 LEARN': '/06 УЧИТЬСЯ',
  '/07 SONGWRITING_ASSISTANT': '/07 ПОМОЩНИК_СОЧИНИТЕЛЯ',
  '/08 SONGS': '/08 ПЕСНИ',
  '/09 TUNER': '/09 ТЮНЕР',
  '// APPEARANCE': '// ВНЕШНИЙ_ВИД',
  '// PROGRESSION_LIBRARY': '// БИБЛИОТЕКА_ПОСЛЕДОВАТЕЛЬНОСТЕЙ',
  '// SAVED_PROJECTS': '// СОХРАНЁННЫЕ_ПРОЕКТЫ',
  '// SONG_STRUCTURE_IDEAS': '// ИДЕИ_СТРУКТУРЫ_ПЕСНИ',
  'EAR_TRAINER // GUESS_THE_MODE': 'ТРЕНАЖЁР_СЛУХА // УГАДАЙ_ЛАД',

  // ----------------------------------------------------------------- about
  'CircleSong is a circle-of-fifths powered composition tool for guitar players. It maps the theory behind keys, modes, and chord progressions onto an instrument you already play, so you can build song structures — verses, choruses, bridges — by ear and by understanding, not guesswork.':
    'CircleSong — инструмент для сочинения музыки гитаристами, построенный на квинтовом круге. Он переносит теорию тональностей, ладов и аккордовых последовательностей на инструмент, на котором вы уже играете, чтобы вы строили форму песни — куплеты, припевы, бриджи — на слух и с пониманием, а не наугад.',
  'Pick a key, hear every diatonic chord and its inversions instantly, sequence them into a loop, and get progression ideas grounded in real theory and well-known songs. The Learn tab and ear trainer build your fluency in modes as you write — so composing and studying happen in the same place.':
    'Выберите тональность, мгновенно услышьте каждый диатонический аккорд и его обращения, соберите их в луп и получите идеи последовательностей, опирающиеся на настоящую теорию и известные песни. Вкладка «Учиться» и тренажёр слуха развивают свободу в ладах прямо по ходу сочинения — сочинение и учёба происходят в одном месте.',
  'Everything the instrument needs is here: eight modelled tones from acoustic steel to grand piano, thirty-four strum and picking patterns, a drum machine, a tuner for eight instruments, and songs you can save. It runs entirely on your device, installs to your home screen, and keeps working with no signal.':
    'Здесь есть всё, что нужно инструменту: восемь смоделированных тембров, от акустики со стальными струнами до рояля, тридцать четыре рисунка боя и перебора, драм-машина, тюнер для восьми инструментов и песни, которые можно сохранять. Всё работает прямо на вашем устройстве, ставится на домашний экран и продолжает работать без связи.',
  'Copyright © 2026. Free software under the': 'Copyright © 2026. Свободное ПО на условиях',
  ', with no warranty. Section 13 of that licence gives everyone who uses CircleSong over a network the right to its source:':
    ', без каких-либо гарантий. Раздел 13 этой лицензии даёт каждому, кто пользуется CircleSong через сеть, право на её исходный код:',
  'Source Code (AGPL v3.0)': 'Исходный код (AGPL v3.0)',

  // ---------------------------------------------------------------- circle
  'Circle of fifths — arrow keys move around the wheel':
    'Квинтовый круг — стрелки перемещают по колесу',
  '{chord} — {numeral}, the {degree}': '{chord} — {numeral}, {degree}',
  '{chord} — outside this key': '{chord} — вне этой тональности',
  'Mode': 'Лад',
  'WHEEL TAP PLAYS': 'КАСАНИЕ КОЛЕСА ИГРАЕТ',
  'Chord': 'Аккорд',
  'Note': 'Ноту',
  'Show secondary dominants': 'Показать побочные доминанты',
  'The chords that pull into each degree': 'Аккорды, которые тянут к каждой ступени',
  'SECONDARY DOMINANTS': 'ПОБОЧНЫЕ ДОМИНАНТЫ',
  'Tap one to hear it resolve. Each arrow points at the chord that chord pulls into.':
    'Коснитесь одной, чтобы услышать разрешение. Каждая стрелка указывает на аккорд, к которому тянет.',
  '◄ Fourths (subdominant)': '◄ Кварты (субдоминанта)',
  'Fifths (dominant) ►': 'Квинты (доминанта) ►',
  'Outer ring — major keys. Inner ring — their relative minors. Bright wedges are diatonic to the current key. Clockwise stacks a 5th toward the dominant; counter-clockwise a 4th toward the subdominant. Lock the key, then tap any wedge to hear it and see how it relates.':
    'Внешнее кольцо — мажорные тональности. Внутреннее — их параллельные минорные. Яркие сектора диатоничны текущей тональности. По часовой стрелке прибавляется квинта в сторону доминанты, против часовой — кварта в сторону субдоминанты. Зафиксируйте тональность и коснитесь любого сектора, чтобы услышать его и увидеть связь.',
  '🔒 Key Locked — tap wheel to explore': '🔒 Тональность закреплена — касайтесь колеса, чтобы изучать',
  '🔓 Lock Key to Explore': '🔓 Закрепите тональность, чтобы изучать',
  '{note} — degree {n} of the key ({numeral})': '{note} — {n}-я ступень тональности ({numeral})',
  '{chord} is the {function} ({numeral}) of {key} — a {interval} above the root.':
    '{chord} — это {function} ({numeral}) в {key}, на {interval} выше основного тона.',
  '{chord} sits a {interval} from {key} — outside the current key, a borrowed or chromatic color.':
    '{chord} отстоит на {interval} от {key} — вне текущей тональности, заимствованная или хроматическая краска.',
  'The V7 of {target} — it borrows a note from outside the key to point at the {numeral} chord.':
    'V7 к {target} — берёт ноту извне тональности, чтобы указать на аккорд {numeral}.',
  'The key’s own v is minor and cannot pull home. Raising its third makes {chord}, which can.':
    'Собственная v тональности минорная и не может тянуть домой. Повышение её терции даёт {chord}, который может.',
  'Borrowed': 'Заимствовано',

  // ------------------------------------------------- functions and degrees
  'Tonic': 'Тоника',
  'Supertonic': 'Вторая ступень',
  'Mediant': 'Медианта',
  'Subdominant': 'Субдоминанта',
  'Dominant': 'Доминанта',
  'Submediant': 'Субмедианта',
  'Leading Tone': 'Вводный тон',
  'Home base — the point of rest the progression resolves to.':
    'Дом: точка покоя, к которой разрешается последовательность.',
  'Often leads toward the dominant; sets up motion away from home.':
    'Часто ведёт к доминанте; запускает движение прочь от дома.',
  'Colors the tonic, blending stability with subtle tension.':
    'Окрашивает тонику, смешивая устойчивость с лёгким напряжением.',
  'Pulls away from home and opens the door to the dominant.':
    'Уводит от дома и открывает дверь к доминанте.',
  'Strongest pull back to the tonic — the engine of resolution.':
    'Сильнейшее притяжение обратно к тонике — двигатель разрешения.',
  'A gentle detour from the tonic, often feels wistful or reflective.':
    'Мягкий обход тоники; часто звучит грустно или задумчиво.',
  'Maximum tension — wants urgently to resolve back to the tonic.':
    'Предельное напряжение: настойчиво просится разрешиться в тонику.',
  '{function} chord in this key.': 'Аккорд {function} в этой тональности.',
  'home': 'дом',
  'a step away from home': 'в шаге от дома',
  "the tonic's shadow": 'тень тоники',
  'the lift': 'подъём',
  'the pull back home': 'притяжение домой',
  'the relative minor': 'параллельный минор',
  'the approach chord': 'подводящий аккорд',

  // ---------------------------------------------------------------- modes
  'Ionian': 'Ионийский',
  'Dorian': 'Дорийский',
  'Phrygian': 'Фригийский',
  'Lydian': 'Лидийский',
  'Mixolydian': 'Миксолидийский',
  'Aeolian': 'Эолийский',
  'Locrian': 'Локрийский',
  'Ionian (Major)': 'Ионийский (мажор)',
  'Aeolian (Minor)': 'Эолийский (минор)',
  'Major scale': 'Мажорная гамма',
  'Natural minor': 'Натуральный минор',
  'Bright, resolved, happy': 'Светлый, устойчивый, радостный',
  'Minor but hopeful, moody without being sad': 'Минорный, но с надеждой; выразительный, но не грустный',
  'Dark, exotic, tense': 'Мрачный, экзотический, напряжённый',
  'Dreamy, floating, cinematic': 'Мечтательный, парящий, кинематографичный',
  'Bluesy, rootsy major': 'Мажор с блюзовым, корневым оттенком',
  'Sad, melancholic, introspective': 'Грустный, меланхоличный, обращённый внутрь',
  'Unstable, tense, rarely a home base': 'Неустойчивый, напряжённый, редко бывает домом',
  'The default major-key sound — home base for pop, country, and classical.':
    'Мажорное звучание по умолчанию — дом поп-музыки, кантри и классики.',
  'The major 6th is the giveaway — vamp i–IV for a jazzy, less melancholic minor sound (Santana, Radiohead).':
    'Большая секста выдаёт его: сыграйте вамп i–IV ради джазового, менее меланхоличного минора (Santana, Radiohead).',
  'The ♭2 gives it away — vamp i–♭II for a flamenco or metal flavor.':
    '♭2 выдаёт его: сыграйте вамп i–♭II ради оттенка фламенко или метала.',
  'The ♯4 makes it float above plain major — vamp I–II for a "movie score" wonder.':
    '♯4 заставляет его парить над обычным мажором: сыграйте вамп I–II ради киношного изумления.',
  'Major with a flat 7th — vamp I–♭VII for classic rock and blues-rock.':
    'Мажор с малой септимой: сыграйте вамп I–♭VII ради классического рока и блюз-рока.',
  'The default minor-key sound — vamp i–VI for that classic sad or epic minor feel.':
    'Минорное звучание по умолчанию: сыграйте вамп i–VI ради того самого грустного или эпического минора.',
  'Built on a diminished triad — usually a passing color (like vii° in a major key) rather than a tonic.':
    'Построен на уменьшённом трезвучии: обычно проходящая краска (как vii° в мажоре), а не тоника.',
  'Modes are the 7 scales hiding inside every major scale — same notes, different starting point, different mood. Pick one to hear it and read how guitarists use it.':
    'Лады — это 7 гамм, спрятанных внутри каждой мажорной: те же ноты, другая точка отсчёта, другое настроение. Выберите один, чтобы услышать его и прочитать, как его используют гитаристы.',
  '▶ Play Scale': '▶ Сыграть гамму',
  '▶ Play Vamp': '▶ Сыграть вамп',
  'Scale degrees compared with the major scale': 'Ступени гаммы в сравнении с мажорной',
  'Modes identified correctly at least once': 'Лады, угаданные верно хотя бы раз',
  'Score:': 'Счёт:',
  'Streak: {n} (best {best})': 'Подряд: {n} (лучшее {best})',
  '▶ Start': '▶ Начать',
  '↻ New Round': '↻ Новый раунд',
  'Correct! 🎧': 'Верно! 🎧',
  'Not quite — that was {mode}': 'Не совсем — это был {mode}',
  '{mode} — identified': '{mode} — угадан',

  // -------------------------------------------------------------- intervals
  'Unison (root)': 'Прима (основной тон)',
  'Minor 2nd': 'Малая секунда',
  'Major 2nd': 'Большая секунда',
  'Minor 3rd': 'Малая терция',
  'Major 3rd': 'Большая терция',
  'Perfect 4th': 'Чистая кварта',
  'Tritone': 'Тритон',
  'Perfect 5th': 'Чистая квинта',
  'Minor 6th': 'Малая секста',
  'Major 6th': 'Большая секста',
  'Minor 7th': 'Малая септима',
  'Major 7th': 'Большая септима',

  // ------------------------------------------------------------------ tone
  'VOLUME': 'ГРОМКОСТЬ',
  'BRIGHTNESS': 'ЯРКОСТЬ',
  'SUSTAIN': 'СУСТЕЙН',
  'PICK POS': 'ТОЧКА УДАРА',
  'AUDITION': 'ПРОСЛУШИВАНИЕ',
  '1 bar': '1 такт',
  'Play a full bar': 'Сыграть целый такт',
  'Play {n} beat': 'Сыграть {n} долю',
  'Play {n} beats': 'Сыграть {n} доли',
  'Cut previous sound': 'Обрывать предыдущий звук',
  'Each chord silences the one before it': 'Каждый аккорд заглушает предыдущий',
  'On': 'Вкл.',
  'Off': 'Выкл.',
  'TUNING': 'СТРОЙ',
  'Tuning': 'Строй',

  // ---------------------------------------------------------------- rhythm
  'STYLE': 'СТИЛЬ',
  'NOW PLAYING': 'СЕЙЧАС ЗВУЧИТ',
  'FEEL': 'ХАРАКТЕР',
  'SWING': 'СВИНГ',
  'HUMANIZE': 'ЖИВОСТЬ',
  'Rhythm family': 'Семейство ритмов',
  'All feels ({n})': 'Все рисунки ({n})',
  'Strumming': 'Бой',
  'Muted & Percussive': 'Глушёное и ударное',
  'Reggae, Ska & Offbeat': 'Регги, ска и слабая доля',
  'Jazz Comping': 'Джазовый аккомпанемент',
  'Latin & Syncopated': 'Латина и синкопы',
  'Country & Bluegrass': 'Кантри и блюграсс',
  'Other Meters': 'Другие размеры',
  'Fingerstyle': 'Перебор',
  'Keyboard': 'Клавишные',
  'written for {lo}–{hi} BPM': 'написан для {lo}–{hi} BPM',
  'Written for {lo}–{hi} BPM': 'Написан для {lo}–{hi} BPM',
  'any tempo': 'любой темп',
  'Set {bpm} BPM': 'Поставить {bpm} BPM',
  'You are at {bpm}; this feel is written for {lo}–{hi}':
    'У вас {bpm}; этот рисунок написан для {lo}–{hi}',
  'machine': 'машинно',
  'Straight': 'Ровно',
  'Double-time': 'Вдвое быстрее',
  'Half-time': 'Вдвое медленнее',
  'The pattern as written.': 'Рисунок так, как он записан.',
  'Twice the density at the same tempo — a skank becomes ska.':
    'Вдвое плотнее при том же темпе: сканк превращается в ска.',
  'The figure stretched across two bars. Everything gets heavier.':
    'Фигура растянута на два такта. Всё становится тяжелее.',
  'Straight 8ths': 'Ровные восьмые',
  '16th Pop Strum': 'Поп-бой шестнадцатыми',
  'Folk D-DU-UDU': 'Фолк В-ВН-НВН',
  'Driving 16ths': 'Гонящие шестнадцатые',
  'Anthem Half-Time': 'Гимн вдвое медленнее',
  'Punk Downstrokes': 'Панк ударами вниз',
  'Muted Chuck': 'Глушёный чак',
  'Funk 16ths': 'Фанковые шестнадцатые',
  'Disco Chank': 'Диско-чанк',
  'Reggae Skank': 'Регги-сканк',
  'One Drop': 'One drop',
  'Rocksteady': 'Рокстеди',
  'Ska Upstrokes': 'Ска ударами вверх',
  'Ska Bubble (16ths)': 'Ска-бабл (шестнадцатые)',
  'Jazz Swing': 'Джазовый свинг',
  'Charleston Comp': 'Чарльстон-аккомпанемент',
  'Bossa Nova': 'Босанова',
  'Rumba Clave': 'Клаве румбы',
  'Rumba Flamenca': 'Румба фламенка',
  'Country Boom-Chick': 'Кантри бум-чик',
  'Bluegrass Boom-Chuck': 'Блюграсс бум-чак',
  'Waltz Strum': 'Вальсовый бой',
  'Ballad 6/8': 'Баллада 6/8',
  'Slow Blues 12/8': 'Медленный блюз 12/8',
  'Fingerstyle Arp': 'Арпеджио перебором',
  'Travis Picking': 'Тревис-пикинг',
  'Rising Arpeggio': 'Восходящее арпеджио',
  'Let Ring': 'Дать звучать',
  'Block Chords': 'Блок-аккорды',
  'Ballad Left Hand': 'Балладная левая рука',
  'Alberti Bass': 'Альбертиев бас',
  'Broken Chord': 'Разложенный аккорд',
  'Comping Stabs': 'Короткие удары аккомпанемента',
  'Reggae Organ Bubble': 'Регги-бабл на органе',

  // ----------------------------------------------------------------- drums
  'Groove': 'Грув',
  'Drum kit': 'Барабанная установка',
  'Drum step sequencer': 'Пошаговый секвенсор ударных',
  'DRUM VOL': 'ГРОМК. УДАРНЫХ',
  'Tap a step to cycle it through soft, medium and hard, then off. Tap a voice name to preview it; the ✕ clears that row.':
    'Касание шага перебирает тихо, средне, громко, затем выключено. Касание названия голоса проигрывает его; ✕ очищает эту строку.',
  'Clear grid': 'Очистить сетку',
  'Reset groove': 'Сбросить грув',
  'Double': 'Удвоить',
  '✦ Vary': '✦ Варьировать',
  'Copy the first half onto the second': 'Скопировать первую половину во вторую',
  'Nudge the groove into a variation of itself': 'Подтолкнуть грув к вариации самого себя',
  'Fill before the loop turns': 'Сбивка перед началом круга',
  'A short fill on the last bar': 'Короткая сбивка в последнем такте',
  'Preview {voice}': 'Прослушать {voice}',
  'Clear {voice}': 'Очистить {voice}',
  '{voice} step {n}': '{voice}, шаг {n}',
  'Kick': 'Бочка',
  'Snare': 'Малый',
  'Clap': 'Хлопок',
  'Rim': 'Обод',
  'Hat': 'Хай-хэт',
  'Open Hat': 'Открытый хай-хэт',
  'Ride': 'Райд',
  'Crash': 'Крэш',
  'Tom': 'Том',
  'Shaker': 'Шейкер',
  'Rock Standard': 'Рок-стандарт',
  'Cajon & Percussion': 'Кахон и перкуссия',
  'Acoustic Cajon': 'Акустический кахон',
  'Reggae / Dub': 'Регги / даб',
  'Jazz Brushes': 'Джазовые щётки',
  'Lo-Fi / Chillhop': 'Lo-fi / чиллхоп',
  'Hard Rock / Metal': 'Хард-рок / метал',
  'Rock & Pop': 'Рок и поп',
  'Modern Rock Drive': 'Современный рок-драйв',
  'Pop / Funk 16ths': 'Поп / фанк шестнадцатыми',
  'Indie Straight-8': 'Инди ровными восьмыми',
  'Half-Time Groove': 'Грув вдвое медленнее',
  'Motown Pocket': 'Мотаунский покет',
  'Punk D-Beat': 'Панк d-beat',
  'Metal Double-Kick': 'Метал с двойной бочкой',
  'Metal Half-Time': 'Метал вдвое медленнее',
  'Funk & Soul': 'Фанк и соул',
  'Funk Ghost Notes': 'Фанковые призрачные ноты',
  'Gospel Shuffle': 'Госпел-шаффл',
  'Boom Bap': 'Бум-бэп',
  'Hip-Hop & Lo-Fi': 'Хип-хоп и lo-fi',
  'Lo-Fi Chillhop': 'Lo-fi чиллхоп',
  'Trap': 'Трэп',
  'Breakbeat': 'Брейкбит',
  'Electronic & Dance': 'Электроника и танцевальная',
  'Disco Four-on-Floor': 'Диско four-on-the-floor',
  'Deep House': 'Дип-хаус',
  'House': 'Хаус',
  'Techno': 'Техно',
  'Latin': 'Латина',
  'Son Montuno (2-3)': 'Сон-монтуно (2-3)',
  'Samba': 'Самба',
  'Partido Alto': 'Партидо-алто',
  'Merengue': 'Меренге',
  'Cumbia Clásica': 'Классическая кумбия',
  'Cumbia Moderna': 'Современная кумбия',
  'Soca': 'Сока',
  'Afro-Cuban 6/8': 'Афрокубинский 6/8',
  'Reggae & Caribbean': 'Регги и Карибы',
  'Reggae One-Drop': 'Регги one-drop',
  'Reggae Steppers': 'Регги-степперс',
  'Jazz & Blues': 'Джаз и блюз',
  'Jazz Swing Ride': 'Джазовый свинг на райде',
  'Slow Blues Shuffle': 'Медленный блюзовый шаффл',
  'Acoustic & Folk': 'Акустика и фолк',
  'Folk Waltz': 'Фолк-вальс',
  'Country Train': 'Кантри-поезд',
  'Metal': 'Метал',

  // -------------------------------------------------------- chord builder
  'SIZE': 'РАЗМЕР',
  'COLOUR': 'КРАСКА',
  'ALTER': 'АЛЬТЕРАЦИЯ',
  'SHAPE': 'ПОЗИЦИЯ',
  'Root': 'Основной вид',
  '1st Inv': '1-е обр.',
  '2nd Inv': '2-е обр.',
  'Drop-2': 'Drop-2',
  'Drop-3': 'Drop-3',
  '↻ Next shape': '↻ Следующая позиция',
  '▶ Preview': '▶ Прослушать',
  'Chord diagram': 'Схема аккорда',
  'No playable shape': 'Нет играбельной позиции',
  'No playable shape for that chord in this tuning.':
    'Для этого аккорда в данном строе нет играбельной позиции.',
  'Open Position': 'Открытая позиция',
  'Position — {fret}fr': 'Позиция — {fret}-й лад',
  'Triad': 'Трезвучие',
  'Seventh chord': 'Септаккорд',
  'Ninth': 'Нонаккорд',
  'Eleventh': 'Ундецимаккорд',
  'Triad — root, third, fifth': 'Трезвучие: прима, терция, квинта',
  'Thirteenth — the full stack': 'Терцдецимаккорд: полная башня',
  'Reset this chord': 'Сбросить этот аккорд',
  'Reset all': 'Сбросить всё',
  'Add a {alteration}': 'Добавить {alteration}',
  'Alterations need a seventh — pick 7 or larger first.':
    'Альтерациям нужна септима: сначала выберите 7 или больше.',
  'Diatonic': 'Диатонический',
  'Dom 7': 'Дом. 7',
  'The chord the key gives you.': 'Аккорд, который даёт вам тональность.',
  'A dominant on this degree — the secondary-dominant pull.':
    'Доминанта на этой ступени: притяжение побочной доминанты.',
  'Third replaced by the fourth. Suspended, wants to resolve.':
    'Терция заменена квартой. Задержание, просится разрешиться.',
  'Third replaced by the second. Open and unresolved.':
    'Терция заменена секундой. Открыто и без разрешения.',
  'Sixth instead of a seventh. Warm, settled, vintage.':
    'Секста вместо септимы. Тёплое, устойчивое, винтажное.',
  'Ninth added over a triad, with no seventh.': 'Нона поверх трезвучия, без септимы.',
  'Fully diminished — a passing chord that leads anywhere.':
    'Уменьшённый вводный: проходящий аккорд, ведущий куда угодно.',
  'Half-diminished. The ii of a minor ii–V–i.': 'Полууменьшённый. Ступень ii минорного ii–V–i.',
  'Raised fifth, pushing upward.': 'Повышенная квинта, толкающая вверх.',
  '{hint} — idiomatic on this degree.': '{hint} — характерно на этой ступени.',
  'Plain triad — the chord at its most direct.': 'Простое трезвучие: аккорд в самом прямом виде.',
  'Seventh added: the chord gains a direction to move in.':
    'Добавлена септима: у аккорда появляется направление движения.',
  'Ninth on top — warmth and colour without changing the function.':
    'Нона сверху: тепло и краска без изменения функции.',
  'Eleventh — open and suspended over the third.': 'Ундецима: открыта и повисает над терцией.',
  'Thirteenth — the full stack, the sound of a jazz voicing.':
    'Терцдецима: полная башня, звучание джазового расположения.',
  'Diatonic — {role} in this key.': 'Диатонический: {role} в этой тональности.',
  'The {alterations} tightens the tension — resolve it by step into the next chord.':
    '{alterations} затягивает напряжение: разрешите его поступенно в следующий аккорд.',
  ' and ': ' и ',
  'Secondary dominant — the V7 of {target}, so it pulls to the {numeral} chord.':
    'Побочная доминанта: V7 к {target}, поэтому она тянет к аккорду {numeral}.',
  'Borrowed dominant pulling to {target}, which sits outside this key.':
    'Заимствованная доминанта, тянущая к {target}, который лежит вне этой тональности.',
  "The key's own dominant, made a true V7 — the strongest pull to the tonic.":
    'Собственная доминанта тональности, ставшая настоящей V7: сильнейшее притяжение к тонике.',
  'No third, so it is neither major nor minor — it wants the chord after it.':
    'Терции нет, поэтому он ни мажорный, ни минорный: он просит следующий аккорд.',
  'Symmetrical: it can resolve up a semitone into almost anything.':
    'Симметричен: может разрешиться на полтона вверх почти во что угодно.',
  'Half-diminished — the ii of a minor ii–V–i, heading for the dominant.':
    'Полууменьшённый: ступень ii минорного ii–V–i, направляется к доминанте.',
  'A sixth instead of a seventh: settled rather than in motion.':
    'Секста вместо септимы: устойчиво, а не в движении.',
  'A ninth over a plain triad — colour with no seventh to resolve.':
    'Нона поверх простого трезвучия: краска без септимы, которую надо разрешать.',
  "The raised fifth leans upward into the next chord's root or third.":
    'Повышенная квинта клонится вверх, к приме или терции следующего аккорда.',
  'Solo with {scale}.': 'Солируйте на {scale}.',
  'Careful with {note}.': 'Осторожно с {note}.',
  "The key's own notes, starting from this chord's root.":
    'Собственные ноты тональности, начиная от примы этого аккорда.',
  'Altered (super-locrian)': 'Альтерированная (супер-локрийская)',
  'Every tension is raised or lowered — this is the scale the ♭9 is asking for.':
    'Каждое напряжение повышено или понижено: именно эту гамму просит ♭9.',
  'Lydian dominant': 'Лидийская доминантовая',
  'A dominant with a raised 4th, which is exactly the ♯11.':
    'Доминанта с повышенной квартой, а это и есть ♯11.',
  "The dominant scale. The 4th clashes with the chord's 3rd — pass through it, do not land on it.":
    'Доминантовая гамма. Кварта конфликтует с терцией аккорда: пройдите сквозь неё, но не останавливайтесь.',
  'Diminished (half–whole)': 'Уменьшённая (полутон–тон)',
  'Symmetrical, like the chord — it works from any of the four notes.':
    'Симметрична, как и аккорд: работает от любой из четырёх нот.',
  'Locrian ♮2': 'Локрийская ♮2',
  'Locrian with the 2nd raised, which keeps the 9th usable.':
    'Локрийская с повышенной секундой, благодаря чему нона остаётся пригодной.',

  // ------------------------------------------------ suggestions and reasons
  'SUGGESTED NEXT': 'ЧТО ДАЛЬШЕ',
  'EVERY CHORD IN THE KEY': 'ВСЕ АККОРДЫ ТОНАЛЬНОСТИ',
  'THIS CHORD': 'ЭТОТ АККОРД',
  'THIS LOOP IS A': 'ЭТОТ ЛУП —',
  'HOW THIS LOOP READS': 'КАК ЧИТАЕТСЯ ЭТОТ ЛУП',
  'Follow the key': 'Следовать тональности',
  'Remove chord': 'Убрать аккорд',
  'Section role': 'Роль раздела',
  'Smooth voicings': 'Плавные расположения',
  'Pick shapes that connect, so the hand barely moves':
    'Подбирает позиции, которые смыкаются, чтобы рука почти не двигалась',
  'Clear all': 'Очистить всё',
  'Done': 'Готово',
  'BAR {n}': 'ТАКТ {n}',
  'BAR {n} · {half} HALF': 'ТАКТ {n} · {half} ПОЛОВИНА',
  'FIRST': 'ПЕРВАЯ',
  'SECOND': 'ВТОРАЯ',
  'Bar {n}': 'Такт {n}',
  'Split bar into two chords': 'Разделить такт на два аккорда',
  'Clear': 'Очистить',
  '+ Loop': '+ Луп',
  'Duplicate': 'Дублировать',
  'Delete': 'Удалить',
  'Add an empty loop': 'Добавить пустой луп',
  'Duplicate this loop': 'Дублировать этот луп',
  'Delete this loop': 'Удалить этот луп',
  'Loop {name}': 'Луп {name}',
  'Loop name': 'Название лупа',
  'Starts at the next bar': 'Начнётся со следующего такта',
  'A big jump from the previous chord — try Smooth voicings.':
    'Большой скачок от предыдущего аккорда: попробуйте плавные расположения.',
  'Fret movement from the previous chord.': 'Перемещение по ладам от предыдущего аккорда.',
  'Total fret movement across the loop: {cost}.':
    'Суммарное перемещение по ладам за луп: {cost}.',
  'Drop this bar’s own setting and follow the chord variation from Compose.':
    'Отказаться от собственной настройки такта и следовать варианту аккорда из «Сочинять».',
  'This bar already follows the chord variation set in Compose.':
    'Этот такт уже следует варианту аккорда, заданному в «Сочинять».',
  'Timeline is empty — add chords, or switch the metronome on.':
    'Таймлайн пуст: добавьте аккорды или включите метроном.',
  'Loaded {chords} chords into {bars} bars.': 'Загружено {chords} аккордов в {bars} тактов.',
  'Add another chord to hear a progression.': 'Добавьте ещё один аккорд, чтобы услышать последовательность.',
  'Perfect cadence': 'Совершенная каденция',
  'Plagal cadence': 'Плагальная каденция',
  'Half cadence': 'Половинная каденция',
  'Deceptive cadence': 'Прерванная каденция',
  'perfect': 'совершенной',
  'plagal': 'плагальной',
  'half': 'половинной',
  'any': 'любой',
  'Dominant to tonic — the section lands.': 'От доминанты к тонике: раздел приземляется.',
  'IV to I — the "amen" ending, softer than a perfect cadence.':
    'От IV к I: окончание «аминь», мягче совершенной каденции.',
  'Ends on the dominant, unresolved — it hands over to whatever comes next.':
    'Заканчивается на доминанте, без разрешения: передаёт ход тому, что будет дальше.',
  'The dominant resolves to vi instead of I — the ending is dodged on purpose.':
    'Доминанта разрешается в vi вместо I: окончание нарочно обойдено.',
  'A {section} usually ends with a {expected} cadence; this one ends with a {actual}.':
    'Раздел «{section}» обычно заканчивается {expected} каденцией; этот заканчивается {actual}.',
  'No clear cadence — the section stops rather than ends.':
    'Ясной каденции нет: раздел обрывается, а не заканчивается.',
  'Nothing here acts as a dominant, so the loop stays flat. Try a V7 before the turn.':
    'Здесь ничто не работает как доминанта, поэтому луп остаётся плоским. Попробуйте V7 перед поворотом.',
  'All plain triads. A 7th or 9th on one chord will give the loop a centre of gravity.':
    'Сплошь простые трезвучия. Септима или нона на одном аккорде дадут лупу центр тяжести.',
  'same chord': 'тот же аккорд',
  'a move': 'движение',
  'down a fifth — the strongest move there is': 'вниз на квинту — самое сильное движение, какое есть',
  'down a third — two notes stay put': 'вниз на терцию — две ноты остаются на месте',
  'up a step': 'вверх на ступень',
  'down a step': 'вниз на ступень',
  'up a third': 'вверх на терцию',
  'up a fifth — a step backwards, used deliberately':
    'вверх на квинту — шаг назад, применяемый намеренно',
  'opens a {section} well': 'хорошо открывает раздел «{section}»',
  'ends a {section} the way it should': 'завершает раздел «{section}» так, как следует',
  'resolving here would spend the tension the {section} is building':
    'разрешение здесь растратит напряжение, которое накапливает раздел «{section}»',
  'the tonic, which states the key outright': 'тоника, которая прямо объявляет тональность',
  'resolves the dominant': 'разрешает доминанту',
  'subdominant into dominant — the standard approach':
    'от субдоминанты к доминанте — стандартный подход',
  'home straight to the dominant, which is how half a songbook works':
    'из дома прямо к доминанте — так устроена половина песенника',
  'steps away from home': 'поступенно уходит от дома',
  'pulls back from the dominant, which loosens the tension':
    'отступает от доминанты, ослабляя напряжение',
  'The m7 — this is the ii of a ii–V, and it wants the dominant.':
    'm7: это ступень ii в ii–V, и она просит доминанту.',
  'A m9: the same function, more air.': 'm9: та же функция, больше воздуха.',
  'Suspended, which delays the move.': 'Задержание, откладывающее движение.',
  'A maj7 on the subdominant — soft, and it floats.':
    'maj7 на субдоминанте: мягко и парит.',
  'A 6th chord, the settled vintage sound.': 'Секстаккорд, устойчивое винтажное звучание.',
  'add9 keeps it a triad but opens it up.': 'add9 оставляет трезвучие, но раскрывает его.',
  'The plain minor triad — the most direct statement of home.':
    'Простое минорное трезвучие: самое прямое высказывание о доме.',
  'A m7 tonic: home, but still moving.': 'Тоника m7: дома, но всё ещё в движении.',
  'A m9 tonic, which is where a lot of neo-soul lives.':
    'Тоника m9 — именно там живёт немалая часть нео-соула.',
  'm6 — brighter than it looks, because of the raised 6th.':
    'm6: светлее, чем кажется, из-за большой сексты.',
  'The plain triad — nothing is clearer than this.': 'Простое трезвучие: яснее уже некуда.',
  'maj7 makes the tonic dreamier and less final.':
    'maj7 делает тонику мечтательнее и менее окончательной.',
  'A 6/9 chord: resolved, but not a full stop.': 'Аккорд 6/9: разрешён, но не точка.',
  'add9 — a triad with light on it.': 'add9: трезвучие, на которое падает свет.',
  'A true dominant 7th — the pull home.': 'Настоящий доминантсептаккорд: притяжение домой.',
  'Add the 9th for warmth without losing the pull.':
    'Добавьте нону ради тепла, не теряя притяжения.',
  'A 13th: the full dominant sound.': 'Терцдецима: полное доминантовое звучание.',
  'Suspend the third, then release it into the 3rd.':
    'Задержите терцию, затем отпустите её в терцию.',
  'With a ♭9 this is the classic minor-key dominant.':
    'С ♭9 это классическая доминанта минорной тональности.',
  'Half-diminished is how this degree is normally voiced — it heads for the dominant.':
    'Полууменьшённым эту ступень строят обычно: она направляется к доминанте.',
  'The bare diminished triad, which is harsher and rarely held.':
    'Голое уменьшённое трезвучие, более резкое и редко выдерживаемое.',
  'Fully diminished, as a passing chord between two neighbours.':
    'Уменьшённый вводный, как проходящий аккорд между двумя соседями.',

  // ------------------------------------------------------- song structures
  'Intro': 'Вступление',
  'Verse': 'Куплет',
  'Pre-Chorus': 'Предприпев',
  'Chorus': 'Припев',
  'Bridge': 'Бридж',
  'Outro': 'Кода',
  'Apply': 'Применить',
  'Apply to timeline': 'Применить к таймлайну',
  'Establish the key without spending the big moment.':
    'Утвердить тональность, не растратив главный момент.',
  'A loop that can carry many different melodies.':
    'Луп, способный нести множество разных мелодий.',
  'Climb, and hand the chorus an unresolved dominant.':
    'Подняться и передать припеву неразрешённую доминанту.',
  'The strongest, plainest statement of the key.':
    'Самое сильное и самое простое утверждение тональности.',
  'Leave home so returning means something.': 'Уйти из дома, чтобы возвращение что-то значило.',
  'Land, or vamp somewhere restful.': 'Приземлиться или покачаться на чём-то спокойном.',
  'Simple & Open': 'Простое и открытое',
  'Suspended Mood': 'Подвешенное настроение',
  'Single-Chord Drone': 'Бурдон на одном аккорде',
  'Dominant Tease': 'Намёк доминанты',
  'Establishes the key calmly before the verse enters.':
    'Спокойно утверждает тональность до вступления куплета.',
  'Opens on a softer, unresolved colour.': 'Открывается более мягкой, неразрешённой краской.',
  'Holds the tonic so the first vocal line does the work.':
    'Держит тонику, чтобы работу делала первая вокальная фраза.',
  'Starts on tension and resolves into bar one.':
    'Начинается с напряжения и разрешается в первый такт.',
  'Narrative Motion': 'Повествовательное движение',
  'Understated': 'Сдержанный',
  'Descending Line': 'Нисходящая линия',
  'Minor Verse': 'Минорный куплет',
  'Steady storytelling motion, familiar and grounded.':
    'Ровное повествовательное движение, знакомое и приземлённое.',
  'Restrained — leaves room for the chorus to lift.':
    'Сдержанно: оставляет припеву место для взлёта.',
  'The axis loop, which never tires of being sung over.':
    'Тот самый луп из четырёх аккордов, поверх которого не надоедает петь.',
  'Same chords starting on the relative minor — darker footing.':
    'Те же аккорды, но с параллельного минора: более тёмная опора.',
  'Rising Tension': 'Нарастающее напряжение',
  'Stepwise Build': 'Поступенное нарастание',
  'Hold the Five': 'Держать пятую',
  'Climbs and holds the dominant so the chorus can release it.':
    'Поднимается и держит доминанту, чтобы припев мог её отпустить.',
  'Walks up the scale — momentum without a key change.':
    'Идёт вверх по гамме: разгон без смены тональности.',
  'Two chords, twice as long each. Maximum anticipation.':
    'Два аккорда, каждый вдвое длиннее. Максимум ожидания.',
  'Big Lift': 'Большой взлёт',
  'Anthemic': 'Гимновый',
  'Plagal Power': 'Плагальная сила',
  'Minor Hook': 'Минорный хук',
  'Climbs above the verse for a euphoric hook.':
    'Поднимается выше куплета ради эйфорического хука.',
  'Instantly singable — the classic pop lift.':
    'Сразу поётся: классический поп-взлёт.',
  'Tonic and subdominant only. Hymn-like and immovable.':
    'Только тоника и субдоминанта. Как гимн, и непоколебимо.',
  'Begins minor and resolves major — bittersweet.':
    'Начинается в миноре и разрешается в мажор: горько-сладко.',
  'Harmonic Detour': 'Гармонический обход',
  'Mediant Shift': 'Медиантовый сдвиг',
  'Relative Minor': 'Параллельный минор',
  'Suspended Halt': 'Подвешенная остановка',
  'Borrows jazz motion to contrast the chorus.':
    'Заимствует джазовое движение, чтобы оттенить припев.',
  'A brief modal colour before the final chorus.':
    'Короткая модальная краска перед последним припевом.',
  'Moves the centre of gravity to the relative minor.':
    'Переносит центр тяжести в параллельный минор.',
  'Two chords, held. The pause before the last chorus.':
    'Два аккорда, выдержанные. Пауза перед последним припевом.',
  'Fade Home': 'Затухание домой',
  'Loop & Dissolve': 'Луп и растворение',
  'Plagal Amen': 'Плагальное «аминь»',
  'Unresolved': 'Без разрешения',
  'A final cadence that settles the song.': 'Заключительная каденция, успокаивающая песню.',
  'A gentle vamp to fade out on.': 'Мягкий вамп, на котором можно затухнуть.',
  'The IV–I "amen" cadence — restful, conclusive.':
    'Каденция «аминь» IV–I: покойная и завершающая.',
  'Ends on the dominant, leaving the question open.':
    'Заканчивается на доминанте, оставляя вопрос открытым.',

  // ---------------------------------------------------------------- moods
  'EVERYTHING BELOW IS IN': 'ВСЁ НИЖЕ — В',
  '🔒 locked — suggestions stay in this key':
    '🔒 закреплено: подсказки остаются в этой тональности',
  'unlocked — a suggestion may bring its own mode':
    'открыто: подсказка может привести свой собственный лад',
  'Melancholic': 'Меланхоличный',
  'Energetic': 'Энергичный',
  'Dreamy': 'Мечтательный',
  'Heroic': 'Героический',
  'Bluesy': 'Блюзовый',
  'Epic': 'Эпический',
  'Dark': 'Мрачный',
  'Hopeful': 'Обнадёживающий',
  'Nostalgic': 'Ностальгический',
  'Hypnotic': 'Гипнотический',
  'Sophisticated': 'Изысканный',
  'Restless': 'Беспокойный',
  'Tender': 'Нежный',
  'Triumphant': 'Торжествующий',
  'Begins on the relative minor and circles home without ever quite settling.':
    'Начинается с параллельного минора и кружит вокруг дома, так и не оседая.',
  'Primary triads, no minor chords, constant forward push.':
    'Главные трезвучия, никаких минорных аккордов, постоянный толчок вперёд.',
  'Lydian major sevenths — the raised 4th keeps the tonic floating.':
    'Лидийские большие септаккорды: повышенная кварта держит тонику в парении.',
  'Tonic and subdominant trading places, then the dominant to lift it.':
    'Тоника и субдоминанта меняются местами, затем доминанта поднимает всё.',
  'Dominant sevenths on every degree — grit rather than sweetness.':
    'Доминантсептаккорды на каждой ступени: жёсткость вместо сладости.',
  'Minor tonic under three major chords. Scale without brightness.':
    'Минорная тоника под тремя мажорными аккордами. Масштаб без света.',
  'The ♭2 pressing against the tonic — unresolved and menacing.':
    '♭2 давит на тонику: без разрешения и с угрозой.',
  'Starts away from the tonic so arriving home reads as relief.':
    'Начинается вдали от тоники, чтобы приход домой читался как облегчение.',
  'The doo-wop turnaround. Familiar to the point of comfort.':
    'Ду-воповый оборот. Знакомый до уюта.',
  'Two chords, minor with a major 6th. Built for playing over.':
    'Два аккорда, минор с большой секстой. Создано для игры поверх.',
  'ii–V–I with sevenths throughout — the jazz cadence.':
    'ii–V–I со септимами повсюду: джазовая каденция.',
  'A stepwise descent that keeps arriving somewhere new.':
    'Поступенный спуск, который всё время приводит куда-то новое.',
  'Gentle mediant motion — close voicings, little movement in the bass.':
    'Мягкое медиантовое движение: тесные расположения, почти нет движения в басу.',
  'The ♭VII gives it swagger without losing the major tonic.':
    '♭VII придаёт развязность, не теряя мажорной тоники.',

  // ------------------------------------------------- progression library
  'FAMILY': 'СЕМЕЙСТВО',
  'Progression family': 'Семейство последовательностей',
  'All families ({n})': 'Все семейства ({n})',
  'Search name, numerals, or a song…': 'Поиск по названию, цифровке или песне…',
  'Search progressions': 'Искать последовательности',
  '{n} PROGRESSION': '{n} ПОСЛЕДОВАТЕЛЬНОСТЬ',
  '{n} PROGRESSIONS': '{n} ПОСЛЕДОВАТЕЛЬНОСТЕЙ',
  'MATCHING “{query}”': 'ПО ЗАПРОСУ «{query}»',
  'Nothing matches that. Try a song name, a chord, or clear the search.':
    'Совпадений нет. Попробуйте название песни, аккорд или очистите поиск.',
  "Pick a family or search, then tap a progression to open it — you'll hear it in the current key. Apply writes it to the timeline. Numerals and chord names are computed from what will actually play.":
    'Выберите семейство или найдите нужное, затем коснитесь последовательности, чтобы открыть её: вы услышите её в текущей тональности. «Применить» запишет её в таймлайн. Цифровка и названия аккордов вычисляются из того, что действительно прозвучит.',
  '▶ Hear it': '▶ Послушать',
  'HEARD IN': 'ЗВУЧИТ В',
  '{n} bar': '{n} такт',
  '{n} bars': '{n} тактов',
  '(written in {mode})': '(записано в ладу {mode})',
  'Previewing {name} — tap Apply to keep it.':
    'Звучит {name}: коснитесь «Применить», чтобы оставить.',
  'Stop playback to preview a progression.':
    'Остановите воспроизведение, чтобы прослушать последовательность.',
  'Pop & Rock': 'Поп и рок',
  'Modal Rock': 'Модальный рок',
  'Minor Keys': 'Минорные тональности',
  'Jazz': 'Джаз',
  'Jazz & Neo-Soul': 'Джаз и нео-соул',
  'Blues': 'Блюз',
  'Folk & Country': 'Фолк и кантри',
  'Handbook': 'Справочник',
  'Axis of Awesome': 'Те самые четыре аккорда',
  'Axis, Minor Start': 'Те же четыре, с минора',
  '50s Doo-Wop': 'Ду-воп 50-х',
  'Three-Chord Rock': 'Рок на трёх аккордах',
  'Pop-Punk Lift': 'Поп-панковый взлёт',
  'Ballad Climb': 'Балладный подъём',
  "Pachelbel's Canon": 'Канон Пахельбеля',
  'The four chords behind a startling share of the charts. Endlessly singable.':
    'Четыре аккорда, стоящие за поразительной долей чартов. Поются бесконечно.',
  'The same loop rotated to begin on the relative minor — wistful rather than triumphant.':
    'Тот же луп, повёрнутый так, чтобы начинаться с параллельного минора: грустно, а не победно.',
  'Ballads, prom scenes, "Stand By Me". Warm and instantly nostalgic.':
    'Баллады, школьные балы, «Stand By Me». Тепло и сразу ностальгично.',
  'The primary triads and nothing else. Direct, and hard to make sound wrong.':
    'Главные трезвучия и ничего больше. Прямо, и трудно сыграть неудачно.',
  'Starts away from home so the chorus lands as a return.':
    'Начинается вдали от дома, чтобы припев прозвучал как возвращение.',
  'A stepwise rise through the scale — builds tension without a key change.':
    'Поступенный подъём по гамме: копит напряжение без смены тональности.',
  'A descending sequence that has outlived three centuries of fashion.':
    'Нисходящая секвенция, пережившая три века моды.',
  'Mixolydian Rock': 'Миксолидийский рок',
  'Dorian Vamp': 'Дорийский вамп',
  'Grunge ♭VI–♭VII': 'Гранж ♭VI–♭VII',
  'Lydian Lift': 'Лидийский взлёт',
  'Phrygian Descent': 'Фригийский спуск',
  'The ♭VII is what makes this rock rather than pop — think "Sweet Home Alabama".':
    'Именно ♭VII делает это роком, а не попом: вспомните «Sweet Home Alabama».',
  'Minor with a bright 6th. Hypnotic, jam-friendly, never fully sad.':
    'Минор со светлой секстой. Гипнотично, удобно для джема, никогда не до конца грустно.',
  'Heavy and modal — the flat 6th and 7th give it the weight.':
    'Тяжело и модально: вес дают малая секста и малая септима.',
  'The ♯4 floats the tonic. Cinematic wonder in two chords.':
    '♯4 поднимает тонику в парение. Киношное изумление в двух аккордах.',
  'The ♭2 leaning on the tonic — flamenco and metal share this one.':
    '♭2 опирается на тонику: этим делятся фламенко и метал.',
  'Andalusian Cadence': 'Андалузская каденция',
  'Epic Minor': 'Эпический минор',
  'Minor Ballad': 'Минорная баллада',
  'Minor Climb': 'Минорный подъём',
  'A stepwise descent from the tonic. Dramatic, and older than most of what it appears in.':
    'Поступенный спуск от тоники. Драматично и старше почти всего, где встречается.',
  'i–VI–III–VII. Trailers, anthems, anything that needs scale.':
    'i–VI–III–VII. Трейлеры, гимны, всё, чему нужен размах.',
  'The doo-wop shape in minor — familiar bones, darker colour.':
    'Ду-воповая форма в миноре: тот же костяк, темнее краска.',
  'Rises through the relative major before falling back to the tonic.':
    'Поднимается через параллельный мажор, прежде чем упасть обратно к тонике.',
  'ii–V–I Turnaround': 'Оборот ii–V–I',
  'Rhythm Changes A': 'Rhythm changes A',
  'Bossa Turnaround': 'Оборот босановы',
  'Jazz Blues Head': 'Тема джазового блюза',
  'Circle of Fifths Run': 'Пробег по квинтовому кругу',
  'The central cadence of jazz. Learn it in all twelve keys and half the language follows.':
    'Центральная каденция джаза. Выучите её во всех двенадцати тональностях, и половина языка придёт сама.',
  'I–vi–ii–V, the most-played eight bars in the standard repertoire.':
    'I–vi–ii–V, самые играемые восемь тактов стандартного репертуара.',
  'Major sevenths and a gentle ii–V. Nylon strings and brushes.':
    'Большие септаккорды и мягкий ii–V. Нейлоновые струны и щётки.',
  'Dominant sevenths throughout — the blues with a jazz accent.':
    'Доминантсептаккорды повсюду: блюз с джазовым акцентом.',
  'Root movement by fourths all the way home — every chord pulls to the next.':
    'Движение основных тонов квартами до самого дома: каждый аккорд тянет следующий.',
  'Neo-Soul Loop': 'Нео-соул-луп',
  'Half-Diminished ii–V–i': 'Полууменьшённый ii–V–i',
  'Minor ii–V–i with a ♭9': 'Минорный ii–V–i с ♭9',
  'Sus4 Release': 'Разрешение sus4',
  '6/9 Turnaround': 'Оборот 6/9',
  'Secondary Dominant Cycle': 'Цепь побочных доминант',
  'Dorian with ninths on everything. The major IV is what makes Dorian sound like Dorian rather than minor.':
    'Дорийский с нонами повсюду. Именно мажорная IV делает дорийский дорийским, а не минором.',
  'The textbook minor cadence: iiø7 sets up the dominant, the dominant lands on a m9.':
    'Учебниковая минорная каденция: iiø7 готовит доминанту, доминанта приземляется на m9.',
  'Dm9 – E7♭9 – Am9 in A minor. The v has to be borrowed as a dominant to pull home, and the ♭9 is the note that makes it ache.':
    'Dm9 – E7♭9 – Am9 в ля миноре. Ступень v приходится заимствовать как доминанту, чтобы тянуло домой, и именно ♭9 добавляет боль.',
  'Hold the 4th, then let it fall to the 3rd. The oldest tension-and-release there is.':
    'Задержите кварту, затем дайте ей упасть в терцию. Самое старое напряжение и разрешение, какое есть.',
  'A 6/9 tonic never quite sits down, so the loop keeps turning. The 13th on the V is the full jazz dominant.':
    'Тоника 6/9 так и не садится, поэтому луп продолжает вращаться. Терцдецима на V — это полная джазовая доминанта.',
  'Every chord is the dominant of the next. Each borrowed 7th pulls a fifth down into the chord after it.':
    'Каждый аккорд — доминанта следующего. Каждая заимствованная септима тянет на квинту вниз, в следующий аккорд.',
  '12-Bar Blues': '12-тактовый блюз',
  '12-Bar Quick Change': '12-тактовый блюз с быстрой сменой',
  'Minor Blues': 'Минорный блюз',
  'The form. Twelve bars, three chords, a century of music.':
    'Та самая форма. Двенадцать тактов, три аккорда, век музыки.',
  'Moves to the IV in bar two — more motion early on.':
    'Уходит на IV во втором такте: больше движения с самого начала.',
  'The same twelve bars in minor. Slower, heavier, more room to bend.':
    'Те же двенадцать тактов в миноре. Медленнее, тяжелее, больше места для бендов.',
  'Country I–IV–V': 'Кантри I–IV–V',
  'Folk Circle': 'Фолк-круг',
  'Celtic Vamp': 'Кельтский вамп',
  'The three chords most songs are made of.': 'Три аккорда, из которых сделано большинство песен.',
  'Home, away, home, away. The campfire progression.':
    'Дом, прочь, дом, прочь. Последовательность у костра.',
  'The ♭VII again, this time in a jig. Works beautifully in DADGAD.':
    'Снова ♭VII, на этот раз в джиге. Прекрасно звучит в DADGAD.',

  // ------------------------------------------------------------- handbook
  '1 · Single Major Chord': '1 · Один мажорный аккорд',
  '2 · Single Minor Chord': '2 · Один минорный аккорд',
  '3 · Tonic–Dominant, Major': '3 · Тоника–доминанта, мажор',
  '4 · Tonic–Dominant, Minor': '4 · Тоника–доминанта, минор',
  '5 · Tonic–Subdominant': '5 · Тоника–субдоминанта',
  '6 · Major to Relative Minor': '6 · От мажора к параллельному минору',
  '7 · I–IV–V': '7 · I–IV–V',
  '8 · I–IV–V, Plagal Cadence': '8 · I–IV–V, плагальная каденция',
  '9 · I–IV–V–IV': '9 · I–IV–V–IV',
  '10 · Minor to ♭III': '10 · От минора к ♭III',
  '11 · Minor to ♭VII': '11 · От минора к ♭VII',
  '12 · Doo-Wop / Ice Cream': '12 · Ду-воп / «мороженое»',
  '12A · I–V–vi–IV': '12A · I–V–vi–IV',
  '12B · I–IV–vi–V': '12B · I–IV–vi–V',
  '13 · Rhythm Changes': '13 · Rhythm changes',
  '13B · Secondary Dominants': '13B · Побочные доминанты',
  '13D · The Turnaround': '13D · Оборот',
  '14 · ii–V–I–IV': '14 · ii–V–I–IV',
  '15 · Modal with ii and IV': '15 · Модально, с ii и IV',
  '16 · I–♭VII–IV–I': '16 · I–♭VII–IV–I',
  '18 · i–♭III–♭VII–i': '18 · i–♭III–♭VII–i',
  '19 · Andalusian Cadence': '19 · Андалузская каденция',
  "20 · Pachelbel's Canon": '20 · Канон Пахельбеля',
  'One chord, held. Everything else in music is a departure from this.':
    'Один аккорд, выдержанный. Всё остальное в музыке — отправление отсюда.',
  'The same drone in minor. A whole song can live here.':
    'Тот же бурдон в миноре. Здесь может жить целая песня.',
  'Away and back. The smallest complete musical sentence there is.':
    'Туда и обратно. Самое короткое законченное музыкальное предложение.',
  'The same two-chord motion with a minor tonic — darker, and it leans harder.':
    'То же движение из двух аккордов, но с минорной тоникой: темнее и давит сильнее.',
  'Away and back without tension. Restful where the dominant is restless.':
    'Туда и обратно без напряжения. Покойно там, где доминанта беспокойна.',
  'The same seven notes, seen from its shadow.':
    'Те же семь нот, увиденные из их тени.',
  'Ends IV to I rather than V to I — the softer landing.':
    'Заканчивается IV–I, а не V–I: более мягкая посадка.',
  'Sits on the tonic before moving — leaves space for the vocal.':
    'Сидит на тонике, прежде чем двинуться: оставляет место вокалу.',
  'Minor tonic to its relative major. Used alone, or to open something longer.':
    'От минорной тоники к её параллельному мажору. Сама по себе или как начало чего-то длиннее.',
  'Minor, its relative major, and the subtonic. Endlessly loopable.':
    'Минор, его параллельный мажор и субтоника. Зацикливается бесконечно.',
  'The same four chords rotated. Probably the most recorded loop alive.':
    'Те же четыре аккорда, повёрнутые. Вероятно, самый записываемый луп на свете.',
  'The subdominant arrives early, so the minor lands harder.':
    'Субдоминанта приходит рано, поэтому минор приземляется жёстче.',
  'I–vi–ii–V. The circle of fifths, walked backwards, four bars at a time.':
    'I–vi–ii–V. Квинтовый круг, пройденный назад, по четыре такта за раз.',
  'Each chord turned into the dominant of the next, so the loop pulls all the way round.':
    'Каждый аккорд превращён в доминанту следующего, поэтому луп тянет весь круг.',
  'iii–vi–ii–V. Tacked on the end to extend an ending, in show tunes and jazz.':
    'iii–vi–ii–V. Подвешивается в конце, чтобы растянуть окончание, в мюзиклах и джазе.',
  'The jazz cadence, then straight out to the subdominant instead of resting.':
    'Джазовая каденция, а затем сразу к субдоминанте вместо покоя.',
  'Stepwise out of the tonic. Modern pop leans on this constantly.':
    'Поступенный выход из тоники. Современный поп опирается на это постоянно.',
  'Mixolydian rock. The ♭VII is what stops it sounding like a hymn.':
    'Миксолидийский рок. Именно ♭VII не даёт этому звучать гимном.',
  'The first chord from outside the major scale. Modal, and instantly modern.':
    'Первый аккорд извне мажорной гаммы. Модально и сразу современно.',
  'The loop that never resolves, so it can go round forever.':
    'Луп, который никогда не разрешается, поэтому может крутиться вечно.',
  'Stepwise descending, out of Flamenco. The V7 at the bottom is what makes it Spanish rather than merely minor.':
    'Поступенный спуск, пришедший из фламенко. Именно V7 внизу делает это испанским, а не просто минорным.',
  'Eight bars from 1680 that pop music has never stopped borrowing.':
    'Восемь тактов 1680 года, которые поп-музыка не перестаёт заимствовать.',
  'I–vi–IV–V. Fifty years of hits and it still has not worn out.':
    'I–vi–IV–V. Пятьдесят лет хитов, и это до сих пор не износилось.',

  // ---------------------------------------------------------------- tuner
  'Instrument': 'Инструмент',
  'Tuning meter': 'Шкала настройки',
  'A4 = {hz} Hz': 'A4 = {hz} Гц',
  'Signal:': 'Сигнал:',
  'Status:': 'Состояние:',
  'Freq: —': 'Частота: —',
  'Freq: {hz}Hz': 'Частота: {hz} Гц',
  'listening': 'слушаю',
  'LOCKED': 'В СТРОЮ',
  'FLAT': 'НИЗКО',
  'SHARP': 'ВЫСОКО',
  'START LISTENING': 'НАЧАТЬ СЛУШАТЬ',
  'STOP LISTENING': 'ПЕРЕСТАТЬ СЛУШАТЬ',
  'Auto': 'Авто',
  'AUTO': 'АВТО',
  'Manual': 'Вручную',
  'MANUAL · {note}': 'ВРУЧНУЮ · {note}',
  'OPTIONS': 'НАСТРОЙКИ',
  'TARGET': 'ЦЕЛЬ',
  'REFERENCE TONE': 'ЭТАЛОННЫЙ ТОН',
  'CHIME WHEN IN TUNE': 'СИГНАЛ ПРИ ПОПАДАНИИ',
  'SENSITIVITY': 'ЧУВСТВИТЕЛЬНОСТЬ',
  'RESPONSE': 'ОТКЛИК',
  'IN-TUNE WINDOW': 'ДОПУСК ПОПАДАНИЯ',
  'REFERENCE A4': 'ЭТАЛОННАЯ A4',
  'Follows the nearest string in the tuning': 'Следует за ближайшей струной строя',
  'Holds the string you pinned': 'Держится за струну, которую вы закрепили',
  'Follows whichever string of the tuning is nearest to what it hears':
    'Следует за той струной строя, которая ближе всего к услышанному',
  'Stays on the pinned string, however far out it is':
    'Остаётся на закреплённой струне, как бы сильно она ни расстроилась',
  'Sine': 'Синус',
  'Warm': 'Тёплый',
  'String': 'Струна',
  'Tapping a string pins it without sounding anything.':
    'Касание струны закрепляет её, ничего не проигрывая.',
  'A clean sine, sounded once. Tap again to hear it again.':
    'Чистый синус, звучит один раз. Коснитесь снова, чтобы услышать ещё раз.',
  'A triangle — rounder, and easier to pitch against.':
    'Треугольная волна: круглее и удобнее для сверки высоты.',
  'One pluck of the guitar itself, on the melody voices.':
    'Один щипок самой гитары, на мелодических голосах.',
  'A short two-note chime the moment a string settles':
    'Короткий двухнотный сигнал в момент, когда струна попадает в строй',
  'Silent — watch the dial': 'Молча: смотрите на шкалу',
  'Low': 'Низкая',
  'Normal': 'Обычная',
  'High': 'Высокая',
  'Steady': 'Плавный',
  'Quick': 'Быстрый',
  'The default': 'По умолчанию',
  'The default; below what most ears hear': 'По умолчанию; ниже того, что различает большинство ушей',
  'Ignores everything quiet — for noisy rooms': 'Не замечает всё тихое: для шумных помещений',
  'Hears a soft, decaying note for longer': 'Дольше слышит тихую затухающую ноту',
  'Slower needle, less jitter': 'Медленнее стрелка, меньше дрожания',
  'Follows the string immediately': 'Следует за струной мгновенно',
  'Studio — hard to hold, exact when it locks': 'Студия: трудно удержать, точно при попадании',
  'Forgiving — locks quickly on stage': 'Снисходительно: быстро ловит на сцене',
  'Uses the microphone. Nothing is recorded or sent anywhere.':
    'Использует микрофон. Ничего не записывается и никуда не отправляется.',
  'Listening is unavailable here — the page CircleSong is embedded in withholds the microphone.':
    'Здесь слушать нельзя: страница, в которую встроен CircleSong, не даёт микрофон.',
  'Open CircleSong at its own address to listen. Tap a string to hear its exact pitch and tune by ear — that works anywhere.':
    'Откройте CircleSong по его собственному адресу, чтобы слушать. Коснитесь струны, чтобы услышать её точную высоту и настроить на слух: это работает везде.',
  'Audio could not start, so the tuner cannot listen.':
    'Звук не запустился, поэтому тюнер не может слушать.',
  'This browser does not offer microphone access to the page.':
    'Этот браузер не даёт странице доступ к микрофону.',
  'The page CircleSong is embedded in has not granted it the microphone, so it cannot even ask.':
    'Страница, в которую встроен CircleSong, не дала ему микрофон, так что он не может даже спросить.',
  'Open CircleSong from its own address — the installed app, or the copy served from GitHub — and listening will work.':
    'Откройте CircleSong с его собственного адреса — установленное приложение или копию с GitHub — и слушать станет возможно.',
  'Meanwhile you can tune by ear: tap a string above to hear its exact pitch.':
    'А пока можно настроить на слух: коснитесь струны выше, чтобы услышать её точную высоту.',
  'Microphone access was refused. Allow it for this page in your browser’s site settings, then switch Listen on again. You can tune by ear in the meantime — tap a string above to hear its pitch.':
    'В доступе к микрофону отказано. Разрешите его для этой страницы в настройках сайтов браузера и снова включите прослушивание. Пока можно настроить на слух: коснитесь струны выше, чтобы услышать её высоту.',
  'No microphone was found on this device. Tap a string above to hear its pitch and tune by ear.':
    'На этом устройстве микрофон не найден. Коснитесь струны выше, чтобы услышать её высоту и настроить на слух.',
  'The microphone could not be opened — {error}.':
    'Не удалось открыть микрофон — {error}.',
  'unknown error': 'неизвестная ошибка',
  'Guitar': 'Гитара',
  'Bass': 'Бас-гитара',
  'Ukulele': 'Укулеле',
  'Mandolin': 'Мандолина',
  'Banjo': 'Банджо',
  'Violin': 'Скрипка',
  'Cello / Viola': 'Виолончель / альт',
  'Chromatic': 'Хроматический',
  'Chromatic — play any note and it will be named. Tap one to hear it.':
    'Хроматический: сыграйте любую ноту, и она будет названа. Коснитесь любой, чтобы услышать её.',
  'Standard — E A D G B E': 'Стандартный — E A D G B E',
  'Drop D — D A D G B E': 'Drop D — D A D G B E',
  'Half step down — E♭ A♭ D♭ G♭ B♭ E♭': 'На полтона ниже — E♭ A♭ D♭ G♭ B♭ E♭',
  'Full step down — D G C F A D': 'На тон ниже — D G C F A D',
  'Open G — D G D G B D': 'Открытый G — D G D G B D',
  'Open D — D A D F♯ A D': 'Открытый D — D A D F♯ A D',
  'DADGAD — D A D G A D': 'DADGAD — D A D G A D',
  'Drop C — C G C F A D': 'Drop C — C G C F A D',
  '7-string — B E A D G B E': '7 струн — B E A D G B E',
  'Standard 4-string — E A D G': 'Стандартный 4-струнный — E A D G',
  'Drop D — D A D G': 'Drop D — D A D G',
  'Half step down — E♭ A♭ D♭ G♭': 'На полтона ниже — E♭ A♭ D♭ G♭',
  'Standard 5-string — B E A D G': 'Стандартный 5-струнный — B E A D G',
  'Standard high-G — G C E A': 'Стандартный с высокой G — G C E A',
  'Low-G — G C E A': 'С низкой G — G C E A',
  'D tuning — A D F♯ B': 'Строй D — A D F♯ B',
  'Baritone — D G B E': 'Баритон — D G B E',
  'Standard — G D A E': 'Стандартный — G D A E',
  'Open G — F♯ D A D': 'Открытый G — F♯ D A D',
  'Open G 5-string — g D G B D': 'Открытый G, 5 струн — g D G B D',
  'Double C — g C G C D': 'Double C — g C G C D',
  'Sawmill — g D G C D': 'Sawmill — g D G C D',
  'Cello — C G D A': 'Виолончель — C G D A',
  'Viola — C G D A': 'Альт — C G D A',
  'Any note — C1 to B6': 'Любая нота — от C1 до B6',

  // ---------------------------------------------------------------- songs
  'CURRENT SONG': 'ТЕКУЩАЯ ПЕСНЯ',
  'Save': 'Сохранить',
  'Save as new': 'Сохранить как новую',
  'New song': 'Новая песня',
  'Open': 'Открыть',
  'Import a song file': 'Импортировать файл песни',
  'Nothing saved yet.': 'Пока ничего не сохранено.',
  'Nothing saved yet. Save the current song to start a library.':
    'Пока ничего не сохранено. Сохраните текущую песню, чтобы начать библиотеку.',
  '{n} loop': '{n} луп',
  '{n} loops': '{n} лупов',
  '{n} bar written': 'написан {n} такт',
  '{n} bars written': 'написано тактов: {n}',
  'saved': 'сохранена',
  'just now': 'только что',
  '{n} min ago': '{n} мин назад',
  '{n} h ago': '{n} ч назад',
  'Delete “{name}”? This cannot be undone.': 'Удалить «{name}»? Это нельзя отменить.',
  'Project deleted.': 'Проект удалён.',
  'That project could not be read.': 'Не удалось прочитать этот проект.',
  'Opened “{name}”.': '«{name}» открыта.',
  'Saved “{name}”.': '«{name}» сохранена.',
  'Loaded “{name}”.': '«{name}» загружена.',
  'This browser will not let the app save locally.':
    'Этот браузер не разрешает приложению сохранять локально.',
  'This browser will not let the app store anything locally.':
    'Этот браузер не разрешает приложению ничего хранить локально.',
  "No room left in this browser's storage. Delete a project and try again.":
    'В хранилище этого браузера не осталось места. Удалите проект и попробуйте снова.',
  'Start a new song? Anything unsaved will be lost.':
    'Начать новую песню? Всё несохранённое будет потеряно.',
  'New song started.': 'Новая песня начата.',
  'Could not read that file — {error}': 'Не удалось прочитать этот файл — {error}',
  'Unrecognised file format': 'Формат файла не распознан',

  // ------------------------------------------------ guide for guitarists
  '// MODES': '// ЛАДЫ',
  '// GUIDE_FOR_GUITARISTS': '// РУКОВОДСТВО_ДЛЯ_ГИТАРИСТОВ',
  'CircleSong is a songwriting tool that shows its working. Pick a key and it names every chord in it and what each one does; write a progression and it plays back on a modelled guitar, so you hear the idea before you can play it.':
    'CircleSong — инструмент для сочинения, который показывает свою работу. Выберите тональность, и он назовёт все её аккорды и роль каждого; напишите последовательность, и она прозвучит на смоделированной гитаре, так что идею слышно раньше, чем её получается сыграть.',
  '// START_HERE': '// НАЧНИТЕ_ЗДЕСЬ',
  'Tune up. The Tuner knows 8 instruments and 26 tunings, and you can tap any string to hear its pitch and tune by ear.':
    'Настройтесь. Тюнер знает 8 инструментов и 26 строёв, а коснувшись любой струны, можно услышать её высоту и настроиться на слух.',
  'Pick your key. Tap a wedge on the circle. The outlined block is every chord that belongs to that key.':
    'Выберите тональность. Коснитесь сектора круга. Обведённый блок — все аккорды, которые принадлежат этой тональности.',
  'Hear the chords. Compose lays out the seven degrees, each with a fretboard shape you can actually play.':
    'Послушайте аккорды. «Сочинять» раскладывает семь ступеней, и у каждой есть аппликатура, которую действительно можно взять.',
  'Write something. Timeline turns bars into a song — tap a bar, choose a chord, press play.':
    'Напишите что-нибудь. Таймлайн превращает такты в песню: коснитесь такта, выберите аккорд, нажмите воспроизведение.',
  'Make it move. Tone decides how it is strummed; Drums puts a groove underneath.':
    'Приведите это в движение. Тембр решает, как по струнам бьют; Ударные подкладывают грув.',
  '// READING_THE_WHEEL': '// КАК_ЧИТАТЬ_КРУГ',
  'The outer ring is major chords. The inner ring is their relative minors — the same notes, a darker place to start.':
    'Внешнее кольцо — мажорные аккорды. Внутреннее — их параллельные минорные: те же ноты, более тёмная отправная точка.',
  'The outlined block is your key. Three or four wedges on each ring, always side by side, because a key is a place on this circle rather than a list to memorise.':
    'Обведённый блок — ваша тональность. Три-четыре сектора на каждом кольце, всегда рядом, потому что тональность — это место на этом круге, а не список для заучивания.',
  'Clockwise is a fifth up. G is the V of C and pulls back home. Anticlockwise is a fourth up: F is the IV of C, and it relaxes instead.':
    'По часовой стрелке — вверх на квинту: G это V от C, и она тянет домой. Против часовой — вверх на кварту: F это IV от C, и она, наоборот, расслабляет.',
  "The roman numeral on a wedge is that chord's job. I, IV and V are your three majors; ii, iii and vi the three minors; vii° the one that cannot sit still.":
    'Римская цифра на секторе — работа этого аккорда. I, IV и V — три ваших мажора; ii, iii и vi — три минора; vii° — тот, который не может усидеть на месте.',
  'Neighbours share the most notes. On a guitar that means the least hand movement, which is why so many songs are built from wedges that touch.':
    'Соседние секторы делят больше всего общих нот. На гитаре это значит наименьшее движение руки — потому столько песен собрано из секторов, которые соприкасаются.',
  '// IF_YOU_ALREADY_PLAY': '// ЕСЛИ_ВЫ_УЖЕ_ИГРАЕТЕ',
  'The open chords you already know are a key. G, C and D are I, IV and V in G — the circle is that one relationship drawn out for all twelve keys.':
    'Открытые аккорды, которые вы уже знаете, — это тональность. G, C и D — это I, IV и V в G: круг и есть та же самая связь, вычерченная для всех двенадцати тональностей.',
  'A capo turns the wheel, not the shapes. The same grip two frets up is a key two wedges clockwise; set that key here and the app names the chords you are really playing.':
    'Каподастр поворачивает круг, а не аппликатуры. Тот же захват на два лада выше — это тональность на два сектора по часовой стрелке; задайте её здесь, и приложение назовёт аккорды, которые вы играете на самом деле.',
  'A shape is not a chord. Compose offers several playable voicings of the same chord, and the ↔ number in the timeline is how many frets your hand travels to reach one. Smooth voicings picks the shapes that barely move.':
    'Аппликатура — это не аккорд. «Сочинять» предлагает несколько играбельных расположений одного аккорда, а число ↔ на таймлайне — сколько ладов проходит рука, чтобы взять его. «Плавные расположения» выбирают те, что почти не двигаются.',
  'Borrowed chords are the wedges just outside the outline. Try the one next door before anything exotic — a single note from outside the key is where most of the colour in pop music comes from.':
    'Заимствованные аккорды — это секторы сразу за обводкой. Прежде чем браться за экзотику, попробуйте соседний: одна нота из-за пределов тональности — источник почти всего цвета в поп-музыке.',
  '// WHAT_EACH_TAB_IS_FOR': '// ДЛЯ_ЧЕГО_КАЖДАЯ_ВКЛАДКА',
  'Choose a key and see what is in it.': 'Выбрать тональность и увидеть, что в ней есть.',
  'Get in tune, on any of eight instruments.': 'Настроиться — на любом из восьми инструментов.',
  'How it is played: instrument, strumming pattern, feel and swing.':
    'Как это играется: инструмент, рисунок боя, характер и свинг.',
  'A groove underneath, editable step by step.': 'Грув снизу, редактируемый шаг за шагом.',
  'The chord itself: sevenths, extensions, inversions, and a shape for your hands.':
    'Сам аккорд: септимы, надстройки, обращения и аппликатура для ваших рук.',
  'The song: bars, loops and sections.': 'Песня: такты, петли и разделы.',
  'What could come next, and 56 progressions taken from real songs.':
    'Что может быть дальше, и 56 последовательностей из настоящих песен.',
  'The modes, and an ear trainer to test them.': 'Лады и тренировка слуха, чтобы их проверить.',
  'Save, reopen, import and export what you write.':
    'Сохранить, открыть заново, импортировать и экспортировать написанное.',
  'If you take one thing from this: chords that sit next to each other on the wheel share most of their notes. Move one step, leave most of your fingers where they are, and it will sound like it belongs.':
    'Если запомнить только одно: аккорды, стоящие рядом на круге, делят почти все свои ноты. Сдвиньтесь на шаг, оставьте большинство пальцев на месте — и это прозвучит как своё.',
};

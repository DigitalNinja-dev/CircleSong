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
 * Portuguese.
 *
 * Keys are the English source strings; see src/i18n.js. Anything absent falls
 * back to English, so a partial dictionary is a working one.
 *
 * Registered as `pt` rather than `pt-BR` because `resolveLang` matches on the
 * primary subtag — a phone set to pt-BR or pt-PT finds this file either way,
 * where a `pt-BR` id would match neither. The wording is Brazilian, which is
 * where the readers are, and a Portuguese reader loses nothing by it.
 *
 * Note letters (C, D, E…) are left alone. Brazilian players read both letter
 * names and dó-ré-mi, and the app draws the letters on a fretboard where "Dó"
 * would not fit; the mode and function names, which are read rather than
 * played, are translated.
 */
export const LOCALE_PT = {
  // ---------------------------------------------------------------- chrome
  'Language': 'Idioma',
  'LANGUAGE': 'IDIOMA',
  'Everything the app says, including the lessons and the progression notes.':
    'Tudo o que o app diz, incluindo as lições e as notas das progressões.',
  'About CircleSong': 'Sobre o CircleSong',
  'Audio engine': 'Motor de áudio',
  'Audio engine ready': 'Motor de áudio pronto',
  'Tap anything to start audio': 'Toque em qualquer lugar para iniciar o áudio',
  'Audio unavailable — {error}': 'Áudio indisponível — {error}',
  'Play': 'Tocar',
  'Stop': 'Parar',
  'SONG:': 'MÚSICA:',
  'Song title': 'Título da música',
  'Untitled Song': 'Música sem título',
  'Tempo': 'Andamento',
  'Time signature': 'Fórmula de compasso',
  'Metro': 'Metrô',
  'Loop': 'Loop',
  'Drums': 'Bateria',
  'Backing drums': 'Bateria de acompanhamento',
  'CLOSE': 'FECHAR',
  'Theme': 'Tema',
  'THEME': 'TEMA',
  'System': 'Sistema',
  'Light': 'Claro',
  'Dark': 'Escuro',
  'High contrast': 'Alto contraste',
  'Sepia': 'Sépia',
  'Currently {theme}.': 'No momento: {theme}.',
  'Follows your device, and changes with it.': 'Segue o seu aparelho e muda junto com ele.',
  'The default. Neon on black.': 'O padrão. Néon sobre preto.',
  'Ink on paper, with a darker accent so it stays legible.':
    'Tinta sobre papel, com um destaque mais escuro para continuar legível.',
  'Pure black and white, visible borders, no faint washes.':
    'Preto e branco puros, bordas visíveis, sem tons esmaecidos.',
  'Warm and low-glare, for long sessions.': 'Quente e sem brilho, para sessões longas.',

  // ------------------------------------------------------------------ tabs
  'Circle': 'Círculo',
  'Tuner': 'Afinador',
  'Tone': 'Timbre',
  'Compose': 'Compor',
  'Timeline': 'Linha',
  'Assist': 'Assistente',
  'Learn': 'Aprender',
  'Songs': 'Músicas',

  // --------------------------------------------------------- panel headings
  '/01 CIRCLE_OF_FIFTHS': '/01 CÍRCULO_DE_QUINTAS',
  '/02 GUITAR_TONE': '/02 TIMBRE_DE_VIOLÃO',
  '/02B VOICE': '/02B VOZ',
  '/02C PLAYBACK': '/02C REPRODUÇÃO',
  '/03 STRUM_&_RHYTHM': '/03 BATIDA_E_RITMO',
  '/03 DRUM_MACHINE': '/03 BATERIA_ELETRÔNICA',
  '/04 DIATONIC_CHORDS': '/04 ACORDES_DIATÔNICOS',
  '/05 TIMELINE': '/05 LINHA_DO_TEMPO',
  '/06 MODES': '/06 MODOS',
  '/07 SONGWRITING_ASSISTANT': '/07 ASSISTENTE_DE_COMPOSIÇÃO',
  '/08 SONGS': '/08 MÚSICAS',
  '/09 TUNER': '/09 AFINADOR',
  '// APPEARANCE': '// APARÊNCIA',
  '// PROGRESSION_LIBRARY': '// BIBLIOTECA_DE_PROGRESSÕES',
  '// SAVED_PROJECTS': '// PROJETOS_SALVOS',
  '// SONG_STRUCTURE_IDEAS': '// IDEIAS_DE_ESTRUTURA',
  'EAR_TRAINER // GUESS_THE_MODE': 'TREINO_AUDITIVO // ADIVINHE_O_MODO',

  // ----------------------------------------------------------------- about
  'CircleSong is a circle-of-fifths powered composition tool for guitar players. It maps the theory behind keys, modes, and chord progressions onto an instrument you already play, so you can build song structures — verses, choruses, bridges — by ear and by understanding, not guesswork.':
    'O CircleSong é uma ferramenta de composição para violonistas e guitarristas construída sobre o círculo de quintas. Ele transporta a teoria por trás dos tons, dos modos e das progressões de acordes para o instrumento que você já toca, para que você monte estruturas de música — estrofes, refrões, pontes — de ouvido e com entendimento, e não no chute.',
  'Pick a key, hear every diatonic chord and its inversions instantly, sequence them into a loop, and get progression ideas grounded in real theory and well-known songs. The Learn tab and ear trainer build your fluency in modes as you write — so composing and studying happen in the same place.':
    'Escolha um tom, ouça na hora cada acorde diatônico e suas inversões, encadeie tudo em um loop e receba ideias de progressão baseadas em teoria de verdade e em músicas conhecidas. A aba Aprender e o treino auditivo desenvolvem sua fluência nos modos enquanto você escreve — compor e estudar acontecem no mesmo lugar.',
  'Everything the instrument needs is here: eight modelled tones from acoustic steel to grand piano, thirty-four strum and picking patterns, a drum machine, a tuner for eight instruments, and songs you can save. It runs entirely on your device, installs to your home screen, and keeps working with no signal.':
    'Tudo o que o instrumento precisa está aqui: oito timbres modelados, do violão de aço ao piano de cauda, trinta e quatro padrões de batida e dedilhado, uma bateria eletrônica, um afinador para oito instrumentos e músicas que você pode salvar. Roda inteiramente no seu aparelho, instala na tela inicial e continua funcionando sem sinal.',
  'Copyright © 2026. Free software under the': 'Copyright © 2026. Software livre sob a',
  ', with no warranty. Section 13 of that licence gives everyone who uses CircleSong over a network the right to its source:':
    ', sem garantia alguma. A seção 13 dessa licença dá a quem usa o CircleSong através de uma rede o direito ao código-fonte:',
  'Source Code (AGPL v3.0)': 'Código-fonte (AGPL v3.0)',

  // ---------------------------------------------------------------- circle
  'Circle of fifths — arrow keys move around the wheel':
    'Círculo de quintas — as setas do teclado percorrem a roda',
  '{chord} — {numeral}, the {degree}': '{chord} — {numeral}, a {degree}',
  '{chord} — outside this key': '{chord} — fora deste tom',
  'Mode': 'Modo',
  'WHEEL TAP PLAYS': 'TOCAR NA RODA SOA',
  'Chord': 'Acorde',
  'Note': 'Nota',
  'Show secondary dominants': 'Mostrar dominantes secundárias',
  'The chords that pull into each degree': 'Os acordes que puxam para cada grau',
  'SECONDARY DOMINANTS': 'DOMINANTES SECUNDÁRIAS',
  'Tap one to hear it resolve. Each arrow points at the chord that chord pulls into.':
    'Toque em uma para ouvi-la resolver. Cada seta aponta para o acorde ao qual ela puxa.',
  '◄ Fourths (subdominant)': '◄ Quartas (subdominante)',
  'Fifths (dominant) ►': 'Quintas (dominante) ►',
  'Outer ring — major keys. Inner ring — their relative minors. Bright wedges are diatonic to the current key. Clockwise stacks a 5th toward the dominant; counter-clockwise a 4th toward the subdominant. Lock the key, then tap any wedge to hear it and see how it relates.':
    'Anel externo: tons maiores. Anel interno: seus relativos menores. As fatias claras são diatônicas ao tom atual. No sentido horário empilha-se uma quinta rumo à dominante; no anti-horário, uma quarta rumo à subdominante. Trave o tom e toque em qualquer fatia para ouvi-la e ver como ela se relaciona.',
  '🔒 Key Locked — tap wheel to explore': '🔒 Tom travado — toque na roda para explorar',
  '🔓 Lock Key to Explore': '🔓 Trave o tom para explorar',
  '{note} — degree {n} of the key ({numeral})': '{note} — grau {n} do tom ({numeral})',
  '{chord} is the {function} ({numeral}) of {key} — a {interval} above the root.':
    '{chord} é a {function} ({numeral}) de {key} — uma {interval} acima da fundamental.',
  '{chord} sits a {interval} from {key} — outside the current key, a borrowed or chromatic color.':
    '{chord} fica a uma {interval} de {key} — fora do tom atual, uma cor emprestada ou cromática.',
  'The V7 of {target} — it borrows a note from outside the key to point at the {numeral} chord.':
    'O V7 de {target} — ele toma emprestada uma nota de fora do tom para apontar ao acorde {numeral}.',
  'The key’s own v is minor and cannot pull home. Raising its third makes {chord}, which can.':
    'O v próprio do tom é menor e não consegue puxar para casa. Elevar sua terça o transforma em {chord}, que consegue.',
  'Borrowed': 'Emprestado',

  // ------------------------------------------------- functions and degrees
  'Tonic': 'Tônica',
  'Supertonic': 'Supertônica',
  'Mediant': 'Mediante',
  'Subdominant': 'Subdominante',
  'Dominant': 'Dominante',
  'Submediant': 'Submediante',
  'Leading Tone': 'Sensível',
  'Home base — the point of rest the progression resolves to.':
    'A casa: o ponto de repouso ao qual a progressão resolve.',
  'Often leads toward the dominant; sets up motion away from home.':
    'Costuma levar à dominante; põe em marcha o afastamento de casa.',
  'Colors the tonic, blending stability with subtle tension.':
    'Colore a tônica, misturando estabilidade com uma tensão sutil.',
  'Pulls away from home and opens the door to the dominant.':
    'Afasta-se de casa e abre a porta para a dominante.',
  'Strongest pull back to the tonic — the engine of resolution.':
    'O puxão mais forte de volta à tônica: o motor da resolução.',
  'A gentle detour from the tonic, often feels wistful or reflective.':
    'Um desvio suave da tônica; costuma soar nostálgico ou reflexivo.',
  'Maximum tension — wants urgently to resolve back to the tonic.':
    'Tensão máxima: pede com urgência para resolver na tônica.',
  '{function} chord in this key.': 'Acorde de {function} neste tom.',
  'home': 'casa',
  'a step away from home': 'a um passo de casa',
  "the tonic's shadow": 'a sombra da tônica',
  'the lift': 'o impulso',
  'the pull back home': 'o puxão de volta para casa',
  'the relative minor': 'o relativo menor',
  'the approach chord': 'o acorde de aproximação',

  // ---------------------------------------------------------------- modes
  'Ionian': 'Jônio',
  'Dorian': 'Dórico',
  'Phrygian': 'Frígio',
  'Lydian': 'Lídio',
  'Mixolydian': 'Mixolídio',
  'Aeolian': 'Eólio',
  'Locrian': 'Lócrio',
  'Ionian (Major)': 'Jônio (maior)',
  'Aeolian (Minor)': 'Eólio (menor)',
  'Major scale': 'Escala maior',
  'Natural minor': 'Menor natural',
  'Bright, resolved, happy': 'Claro, resolvido, alegre',
  'Minor but hopeful, moody without being sad': 'Menor mas esperançoso; expressivo sem ser triste',
  'Dark, exotic, tense': 'Sombrio, exótico, tenso',
  'Dreamy, floating, cinematic': 'Onírico, flutuante, cinematográfico',
  'Bluesy, rootsy major': 'Maior com ar de blues e de raiz',
  'Sad, melancholic, introspective': 'Triste, melancólico, introspectivo',
  'Unstable, tense, rarely a home base': 'Instável, tenso, raramente um ponto de repouso',
  'The default major-key sound — home base for pop, country, and classical.':
    'O som padrão dos tons maiores: a casa do pop, do country e da música clássica.',
  'The major 6th is the giveaway — vamp i–IV for a jazzy, less melancholic minor sound (Santana, Radiohead).':
    'A sexta maior entrega o modo: faça um vamp i–IV para um menor jazzístico e menos melancólico (Santana, Radiohead).',
  'The ♭2 gives it away — vamp i–♭II for a flamenco or metal flavor.':
    'O ♭2 entrega o modo: faça um vamp i–♭II para um sabor flamenco ou metal.',
  'The ♯4 makes it float above plain major — vamp I–II for a "movie score" wonder.':
    'O ♯4 faz o modo flutuar acima do maior comum: faça um vamp I–II para aquele deslumbre de trilha sonora.',
  'Major with a flat 7th — vamp I–♭VII for classic rock and blues-rock.':
    'Maior com sétima menor: faça um vamp I–♭VII para rock clássico e blues-rock.',
  'The default minor-key sound — vamp i–VI for that classic sad or epic minor feel.':
    'O som padrão dos tons menores: faça um vamp i–VI para aquele menor triste ou épico de sempre.',
  'Built on a diminished triad — usually a passing color (like vii° in a major key) rather than a tonic.':
    'Construído sobre uma tríade diminuta: quase sempre uma cor de passagem (como o vii° num tom maior), não uma tônica.',
  'Modes are the 7 scales hiding inside every major scale — same notes, different starting point, different mood. Pick one to hear it and read how guitarists use it.':
    'Os modos são as 7 escalas escondidas dentro de cada escala maior: as mesmas notas, outro ponto de partida, outro clima. Escolha um para ouvi-lo e ler como os guitarristas o usam.',
  '▶ Play Scale': '▶ Tocar escala',
  '▶ Play Vamp': '▶ Tocar vamp',
  'Scale degrees compared with the major scale': 'Graus da escala comparados com a escala maior',
  'Modes identified correctly at least once': 'Modos identificados corretamente ao menos uma vez',
  'Score:': 'Pontos:',
  'Streak: {n} (best {best})': 'Sequência: {n} (melhor {best})',
  '▶ Start': '▶ Começar',
  '↻ New Round': '↻ Nova rodada',
  'Correct! 🎧': 'Correto! 🎧',
  'Not quite — that was {mode}': 'Quase — era {mode}',
  '{mode} — identified': '{mode} — identificado',

  // -------------------------------------------------------------- intervals
  'Unison (root)': 'Uníssono (fundamental)',
  'Minor 2nd': '2ª menor',
  'Major 2nd': '2ª maior',
  'Minor 3rd': '3ª menor',
  'Major 3rd': '3ª maior',
  'Perfect 4th': '4ª justa',
  'Tritone': 'Trítono',
  'Perfect 5th': '5ª justa',
  'Minor 6th': '6ª menor',
  'Major 6th': '6ª maior',
  'Minor 7th': '7ª menor',
  'Major 7th': '7ª maior',

  // ------------------------------------------------------------------ tone
  'VOLUME': 'VOLUME',
  'BRIGHTNESS': 'BRILHO',
  'SUSTAIN': 'SUSTENTAÇÃO',
  'PICK POS': 'POS. PALHETA',
  'AUDITION': 'AUDIÇÃO',
  '1 bar': '1 compasso',
  'Play a full bar': 'Tocar um compasso inteiro',
  'Play {n} beat': 'Tocar {n} tempo',
  'Play {n} beats': 'Tocar {n} tempos',
  'Cut previous sound': 'Cortar o som anterior',
  'Each chord silences the one before it': 'Cada acorde silencia o anterior',
  'On': 'Sim',
  'Off': 'Não',
  'TUNING': 'AFINAÇÃO',
  'Tuning': 'Afinação',

  // ---------------------------------------------------------------- rhythm
  'STYLE': 'ESTILO',
  'NOW PLAYING': 'TOCANDO AGORA',
  'FEEL': 'LEVADA',
  'SWING': 'SWING',
  'HUMANIZE': 'HUMANIZAR',
  'Rhythm family': 'Família rítmica',
  'All feels ({n})': 'Todas as levadas ({n})',
  'Strumming': 'Batida',
  'Muted & Percussive': 'Abafado e percussivo',
  'Reggae, Ska & Offbeat': 'Reggae, ska e contratempo',
  'Jazz Comping': 'Acompanhamento de jazz',
  'Latin & Syncopated': 'Latino e sincopado',
  'Country & Bluegrass': 'Country e bluegrass',
  'Other Meters': 'Outros compassos',
  'Fingerstyle': 'Dedilhado',
  'Keyboard': 'Teclado',
  'written for {lo}–{hi} BPM': 'escrita para {lo}–{hi} BPM',
  'Written for {lo}–{hi} BPM': 'Escrita para {lo}–{hi} BPM',
  'any tempo': 'qualquer andamento',
  'Set {bpm} BPM': 'Definir {bpm} BPM',
  'You are at {bpm}; this feel is written for {lo}–{hi}':
    'Você está em {bpm}; esta levada foi escrita para {lo}–{hi}',
  'machine': 'máquina',
  'Straight': 'Reto',
  'Double-time': 'Tempo dobrado',
  'Half-time': 'Meio tempo',
  'The pattern as written.': 'O padrão como está escrito.',
  'Twice the density at the same tempo — a skank becomes ska.':
    'O dobro da densidade no mesmo andamento: um skank vira ska.',
  'The figure stretched across two bars. Everything gets heavier.':
    'A figura esticada por dois compassos. Tudo fica mais pesado.',
  'Straight 8ths': 'Colcheias retas',
  '16th Pop Strum': 'Batida pop em semicolcheias',
  'Folk D-DU-UDU': 'Folk B-BC-CBC',
  'Driving 16ths': 'Semicolcheias com impulso',
  'Anthem Half-Time': 'Hino em meio tempo',
  'Punk Downstrokes': 'Punk só para baixo',
  'Muted Chuck': 'Chuck abafado',
  'Funk 16ths': 'Semicolcheias funk',
  'Disco Chank': 'Chank disco',
  'Reggae Skank': 'Skank de reggae',
  'One Drop': 'One drop',
  'Rocksteady': 'Rocksteady',
  'Ska Upstrokes': 'Ska só para cima',
  'Ska Bubble (16ths)': 'Bolha de ska (semicolcheias)',
  'Jazz Swing': 'Swing de jazz',
  'Charleston Comp': 'Acompanhamento charleston',
  'Bossa Nova': 'Bossa nova',
  'Rumba Clave': 'Clave de rumba',
  'Rumba Flamenca': 'Rumba flamenca',
  'Country Boom-Chick': 'Country boom-chick',
  'Bluegrass Boom-Chuck': 'Bluegrass boom-chuck',
  'Waltz Strum': 'Batida de valsa',
  'Ballad 6/8': 'Balada em 6/8',
  'Slow Blues 12/8': 'Blues lento em 12/8',
  'Fingerstyle Arp': 'Arpejo dedilhado',
  'Travis Picking': 'Travis picking',
  'Rising Arpeggio': 'Arpejo ascendente',
  'Let Ring': 'Deixar soar',
  'Block Chords': 'Acordes em bloco',
  'Ballad Left Hand': 'Mão esquerda de balada',
  'Alberti Bass': 'Baixo de Alberti',
  'Broken Chord': 'Acorde quebrado',
  'Comping Stabs': 'Pancadas de acompanhamento',
  'Reggae Organ Bubble': 'Bolha de órgão reggae',

  // ----------------------------------------------------------------- drums
  'Groove': 'Groove',
  'Drum kit': 'Kit de bateria',
  'Drum step sequencer': 'Sequenciador de passos',
  'DRUM VOL': 'VOL. BATERIA',
  'Tap a step to cycle it through soft, medium and hard, then off. Tap a voice name to preview it; the ✕ clears that row.':
    'Toque num passo para percorrer fraco, médio e forte e depois desligar. Toque no nome de uma voz para ouvi-la; o ✕ limpa aquela linha.',
  'Clear grid': 'Limpar grade',
  'Reset groove': 'Restaurar groove',
  'Double': 'Dobrar',
  '✦ Vary': '✦ Variar',
  'Copy the first half onto the second': 'Copiar a primeira metade sobre a segunda',
  'Nudge the groove into a variation of itself': 'Empurrar o groove para uma variação de si mesmo',
  'Fill before the loop turns': 'Virada antes do loop girar',
  'A short fill on the last bar': 'Uma virada curta no último compasso',
  'Preview {voice}': 'Ouvir {voice}',
  'Clear {voice}': 'Limpar {voice}',
  '{voice} step {n}': '{voice}, passo {n}',
  'Kick': 'Bumbo',
  'Snare': 'Caixa',
  'Clap': 'Palma',
  'Rim': 'Aro',
  'Hat': 'Chimbal',
  'Open Hat': 'Chimbal aberto',
  'Ride': 'Ride',
  'Crash': 'Crash',
  'Tom': 'Tom',
  'Shaker': 'Ganzá',
  'Rock Standard': 'Rock padrão',
  'Cajon & Percussion': 'Cajón e percussão',
  'Acoustic Cajon': 'Cajón acústico',
  'Reggae / Dub': 'Reggae / dub',
  'Jazz Brushes': 'Vassourinhas de jazz',
  'Lo-Fi / Chillhop': 'Lo-fi / chillhop',
  'Hard Rock / Metal': 'Hard rock / metal',
  'Rock & Pop': 'Rock e pop',
  'Modern Rock Drive': 'Rock moderno com impulso',
  'Pop / Funk 16ths': 'Semicolcheias pop / funk',
  'Indie Straight-8': 'Indie em colcheias retas',
  'Half-Time Groove': 'Groove em meio tempo',
  'Motown Pocket': 'Pocket Motown',
  'Punk D-Beat': 'Punk d-beat',
  'Metal Double-Kick': 'Metal com bumbo duplo',
  'Metal Half-Time': 'Metal em meio tempo',
  'Funk & Soul': 'Funk e soul',
  'Funk Ghost Notes': 'Notas fantasma de funk',
  'Gospel Shuffle': 'Shuffle gospel',
  'Boom Bap': 'Boom bap',
  'Hip-Hop & Lo-Fi': 'Hip-hop e lo-fi',
  'Lo-Fi Chillhop': 'Chillhop lo-fi',
  'Trap': 'Trap',
  'Breakbeat': 'Breakbeat',
  'Electronic & Dance': 'Eletrônica e dança',
  'Disco Four-on-Floor': 'Disco four-on-the-floor',
  'Deep House': 'Deep house',
  'House': 'House',
  'Techno': 'Techno',
  'Latin': 'Latino',
  'Son Montuno (2-3)': 'Son montuno (2-3)',
  'Samba': 'Samba',
  'Partido Alto': 'Partido-alto',
  'Merengue': 'Merengue',
  'Cumbia Clásica': 'Cumbia clássica',
  'Cumbia Moderna': 'Cumbia moderna',
  'Soca': 'Soca',
  'Afro-Cuban 6/8': 'Afro-cubano em 6/8',
  'Reggae & Caribbean': 'Reggae e Caribe',
  'Reggae One-Drop': 'Reggae one-drop',
  'Reggae Steppers': 'Reggae steppers',
  'Jazz & Blues': 'Jazz e blues',
  'Jazz Swing Ride': 'Ride de swing de jazz',
  'Slow Blues Shuffle': 'Shuffle de blues lento',
  'Acoustic & Folk': 'Acústico e folk',
  'Folk Waltz': 'Valsa folk',
  'Country Train': 'Trem country',
  'Metal': 'Metal',

  // -------------------------------------------------------- chord builder
  'SIZE': 'TAMANHO',
  'COLOUR': 'COR',
  'ALTER': 'ALTERAR',
  'SHAPE': 'FORMA',
  'Root': 'Fundamental',
  '1st Inv': '1ª inv.',
  '2nd Inv': '2ª inv.',
  'Drop-2': 'Drop-2',
  'Drop-3': 'Drop-3',
  '↻ Next shape': '↻ Próxima forma',
  '▶ Preview': '▶ Ouvir',
  'Chord diagram': 'Diagrama de acorde',
  'No playable shape': 'Nenhuma forma tocável',
  'No playable shape for that chord in this tuning.':
    'Não há forma tocável para esse acorde nesta afinação.',
  'Open Position': 'Posição aberta',
  'Position — {fret}fr': 'Posição — casa {fret}',
  'Triad': 'Tríade',
  'Seventh chord': 'Acorde de sétima',
  'Ninth': 'Nona',
  'Eleventh': 'Décima primeira',
  'Triad — root, third, fifth': 'Tríade: fundamental, terça, quinta',
  'Thirteenth — the full stack': 'Décima terceira: a pilha completa',
  'Reset this chord': 'Restaurar este acorde',
  'Reset all': 'Restaurar tudo',
  'Add a {alteration}': 'Adicionar um {alteration}',
  'Alterations need a seventh — pick 7 or larger first.':
    'As alterações precisam de uma sétima: escolha antes 7 ou maior.',
  'Diatonic': 'Diatônico',
  'Dom 7': 'Dom 7',
  'The chord the key gives you.': 'O acorde que o tom lhe dá.',
  'A dominant on this degree — the secondary-dominant pull.':
    'Uma dominante sobre este grau: o puxão da dominante secundária.',
  'Third replaced by the fourth. Suspended, wants to resolve.':
    'A terça substituída pela quarta. Suspenso, quer resolver.',
  'Third replaced by the second. Open and unresolved.':
    'A terça substituída pela segunda. Aberto e sem resolução.',
  'Sixth instead of a seventh. Warm, settled, vintage.':
    'Sexta em vez de sétima. Quente, assentado, vintage.',
  'Ninth added over a triad, with no seventh.': 'Nona acrescentada a uma tríade, sem sétima.',
  'Fully diminished — a passing chord that leads anywhere.':
    'Diminuto completo: um acorde de passagem que leva a qualquer lugar.',
  'Half-diminished. The ii of a minor ii–V–i.': 'Meio-diminuto. O ii de um ii–V–i menor.',
  'Raised fifth, pushing upward.': 'Quinta aumentada, empurrando para cima.',
  '{hint} — idiomatic on this degree.': '{hint} — idiomático neste grau.',
  'Plain triad — the chord at its most direct.': 'Tríade simples: o acorde na forma mais direta.',
  'Seventh added: the chord gains a direction to move in.':
    'Sétima acrescentada: o acorde ganha uma direção para onde ir.',
  'Ninth on top — warmth and colour without changing the function.':
    'Nona no topo: calor e cor sem mudar a função.',
  'Eleventh — open and suspended over the third.': 'Décima primeira: aberta e suspensa sobre a terça.',
  'Thirteenth — the full stack, the sound of a jazz voicing.':
    'Décima terceira: a pilha completa, o som de um voicing de jazz.',
  'Diatonic — {role} in this key.': 'Diatônico: {role} neste tom.',
  'The {alterations} tightens the tension — resolve it by step into the next chord.':
    'O {alterations} aperta a tensão: resolva por graus conjuntos no acorde seguinte.',
  ' and ': ' e ',
  'Secondary dominant — the V7 of {target}, so it pulls to the {numeral} chord.':
    'Dominante secundária: o V7 de {target}, então puxa para o acorde {numeral}.',
  'Borrowed dominant pulling to {target}, which sits outside this key.':
    'Dominante emprestada puxando para {target}, que está fora deste tom.',
  "The key's own dominant, made a true V7 — the strongest pull to the tonic.":
    'A dominante própria do tom, transformada num V7 de verdade: o puxão mais forte à tônica.',
  'No third, so it is neither major nor minor — it wants the chord after it.':
    'Sem terça, então não é maior nem menor: pede o acorde seguinte.',
  'Symmetrical: it can resolve up a semitone into almost anything.':
    'Simétrico: pode resolver um semitom acima em quase qualquer coisa.',
  'Half-diminished — the ii of a minor ii–V–i, heading for the dominant.':
    'Meio-diminuto: o ii de um ii–V–i menor, a caminho da dominante.',
  'A sixth instead of a seventh: settled rather than in motion.':
    'Uma sexta em vez de uma sétima: assentado em vez de em movimento.',
  'A ninth over a plain triad — colour with no seventh to resolve.':
    'Uma nona sobre uma tríade simples: cor sem sétima para resolver.',
  "The raised fifth leans upward into the next chord's root or third.":
    'A quinta aumentada se inclina para a fundamental ou a terça do acorde seguinte.',
  'Solo with {scale}.': 'Improvise com {scale}.',
  'Careful with {note}.': 'Cuidado com {note}.',
  "The key's own notes, starting from this chord's root.":
    'As notas próprias do tom, começando pela fundamental deste acorde.',
  'Altered (super-locrian)': 'Alterada (super-lócria)',
  'Every tension is raised or lowered — this is the scale the ♭9 is asking for.':
    'Toda tensão está alterada: é esta a escala que o ♭9 pede.',
  'Lydian dominant': 'Lídia dominante',
  'A dominant with a raised 4th, which is exactly the ♯11.':
    'Uma dominante com a quarta aumentada, que é exatamente o ♯11.',
  "The dominant scale. The 4th clashes with the chord's 3rd — pass through it, do not land on it.":
    'A escala da dominante. A quarta atrita com a terça do acorde: passe por ela, não pare nela.',
  'Diminished (half–whole)': 'Diminuta (semitom–tom)',
  'Symmetrical, like the chord — it works from any of the four notes.':
    'Simétrica, como o acorde: funciona a partir de qualquer das quatro notas.',
  'Locrian ♮2': 'Lócria ♮2',
  'Locrian with the 2nd raised, which keeps the 9th usable.':
    'Lócria com a segunda elevada, o que mantém a nona utilizável.',

  // ------------------------------------------------ suggestions and reasons
  'SUGGESTED NEXT': 'SUGERIDO A SEGUIR',
  'EVERY CHORD IN THE KEY': 'TODOS OS ACORDES DO TOM',
  'THIS CHORD': 'ESTE ACORDE',
  'THIS LOOP IS A': 'ESTE LOOP É UM',
  'HOW THIS LOOP READS': 'COMO ESTE LOOP SE LÊ',
  'Follow the key': 'Seguir o tom',
  'Remove chord': 'Remover acorde',
  'Section role': 'Papel da seção',
  'Smooth voicings': 'Condução suave',
  'Pick shapes that connect, so the hand barely moves':
    'Escolhe formas que se encaixam, para a mão quase não se mover',
  'Clear all': 'Limpar tudo',
  'Done': 'Pronto',
  'BAR {n}': 'COMPASSO {n}',
  'BAR {n} · {half} HALF': 'COMPASSO {n} · {half} METADE',
  'FIRST': 'PRIMEIRA',
  'SECOND': 'SEGUNDA',
  'Bar {n}': 'Compasso {n}',
  'Split bar into two chords': 'Dividir o compasso em dois acordes',
  'Clear': 'Limpar',
  '+ Loop': '+ Loop',
  'Duplicate': 'Duplicar',
  'Delete': 'Excluir',
  'Add an empty loop': 'Adicionar um loop vazio',
  'Duplicate this loop': 'Duplicar este loop',
  'Delete this loop': 'Excluir este loop',
  'Loop {name}': 'Loop {name}',
  'Loop name': 'Nome do loop',
  'Starts at the next bar': 'Começa no próximo compasso',
  'A big jump from the previous chord — try Smooth voicings.':
    'Um salto grande a partir do acorde anterior: experimente a condução suave.',
  'Fret movement from the previous chord.': 'Movimento de casas desde o acorde anterior.',
  'Total fret movement across the loop: {cost}.':
    'Movimento total de casas ao longo do loop: {cost}.',
  'Drop this bar’s own setting and follow the chord variation from Compose.':
    'Descartar o ajuste próprio deste compasso e seguir a variação de acorde de Compor.',
  'This bar already follows the chord variation set in Compose.':
    'Este compasso já segue a variação de acorde definida em Compor.',
  'Timeline is empty — add chords, or switch the metronome on.':
    'A linha do tempo está vazia: adicione acordes ou ligue o metrônomo.',
  'Loaded {chords} chords into {bars} bars.': '{chords} acordes carregados em {bars} compassos.',
  'Add another chord to hear a progression.': 'Adicione outro acorde para ouvir uma progressão.',
  'Perfect cadence': 'Cadência perfeita',
  'Plagal cadence': 'Cadência plagal',
  'Half cadence': 'Meia cadência',
  'Deceptive cadence': 'Cadência de engano',
  'perfect': 'perfeita',
  'plagal': 'plagal',
  'half': 'suspensa',
  'any': 'qualquer',
  'Dominant to tonic — the section lands.': 'Da dominante à tônica: a seção pousa.',
  'IV to I — the "amen" ending, softer than a perfect cadence.':
    'De IV para I: o final de «amém», mais suave que uma cadência perfeita.',
  'Ends on the dominant, unresolved — it hands over to whatever comes next.':
    'Termina na dominante, sem resolver: passa a vez para o que vier depois.',
  'The dominant resolves to vi instead of I — the ending is dodged on purpose.':
    'A dominante resolve no vi em vez do I: o final é desviado de propósito.',
  'A {section} usually ends with a {expected} cadence; this one ends with a {actual}.':
    'Um trecho de {section} costuma terminar com uma cadência {expected}; este termina com uma {actual}.',
  'No clear cadence — the section stops rather than ends.':
    'Sem cadência clara: a seção para em vez de terminar.',
  'Nothing here acts as a dominant, so the loop stays flat. Try a V7 before the turn.':
    'Nada aqui funciona como dominante, então o loop fica plano. Experimente um V7 antes da virada.',
  'All plain triads. A 7th or 9th on one chord will give the loop a centre of gravity.':
    'Só tríades simples. Uma sétima ou nona em um acorde dará ao loop um centro de gravidade.',
  'same chord': 'o mesmo acorde',
  'a move': 'um movimento',
  'down a fifth — the strongest move there is': 'uma quinta abaixo: o movimento mais forte que existe',
  'down a third — two notes stay put': 'uma terça abaixo: duas notas ficam paradas',
  'up a step': 'um grau acima',
  'down a step': 'um grau abaixo',
  'up a third': 'uma terça acima',
  'up a fifth — a step backwards, used deliberately':
    'uma quinta acima: um passo atrás, usado de propósito',
  'opens a {section} well': 'abre bem um trecho de {section}',
  'ends a {section} the way it should': 'termina um trecho de {section} como deve',
  'resolving here would spend the tension the {section} is building':
    'resolver aqui gastaria a tensão que o trecho de {section} está acumulando',
  'the tonic, which states the key outright': 'a tônica, que enuncia o tom sem rodeios',
  'resolves the dominant': 'resolve a dominante',
  'subdominant into dominant — the standard approach':
    'da subdominante à dominante: a aproximação padrão',
  'home straight to the dominant, which is how half a songbook works':
    'de casa direto à dominante, que é como funciona metade de um cancioneiro',
  'steps away from home': 'afasta-se de casa por graus conjuntos',
  'pulls back from the dominant, which loosens the tension':
    'recua da dominante, o que afrouxa a tensão',
  'The m7 — this is the ii of a ii–V, and it wants the dominant.':
    'O m7: este é o ii de um ii–V, e ele pede a dominante.',
  'A m9: the same function, more air.': 'Um m9: a mesma função, mais ar.',
  'Suspended, which delays the move.': 'Suspenso, o que adia o movimento.',
  'A maj7 on the subdominant — soft, and it floats.':
    'Um maj7 na subdominante: macio, e flutua.',
  'A 6th chord, the settled vintage sound.': 'Um acorde de sexta, o som vintage assentado.',
  'add9 keeps it a triad but opens it up.': 'O add9 o mantém tríade, mas o abre.',
  'The plain minor triad — the most direct statement of home.':
    'A tríade menor simples: a maneira mais direta de dizer «casa».',
  'A m7 tonic: home, but still moving.': 'Uma tônica m7: em casa, mas ainda em movimento.',
  'A m9 tonic, which is where a lot of neo-soul lives.':
    'Uma tônica m9, que é onde mora boa parte do neo-soul.',
  'm6 — brighter than it looks, because of the raised 6th.':
    'm6: mais claro do que parece, por causa da sexta maior.',
  'The plain triad — nothing is clearer than this.': 'A tríade simples: nada é mais claro que isso.',
  'maj7 makes the tonic dreamier and less final.':
    'O maj7 deixa a tônica mais onírica e menos conclusiva.',
  'A 6/9 chord: resolved, but not a full stop.': 'Um acorde 6/9: resolvido, mas sem ponto final.',
  'add9 — a triad with light on it.': 'add9: uma tríade com luz em cima.',
  'A true dominant 7th — the pull home.': 'Uma sétima de dominante de verdade: o puxão para casa.',
  'Add the 9th for warmth without losing the pull.':
    'Acrescente a nona para ganhar calor sem perder o puxão.',
  'A 13th: the full dominant sound.': 'Uma décima terceira: o som dominante completo.',
  'Suspend the third, then release it into the 3rd.':
    'Suspenda a terça e depois solte-a na terça.',
  'With a ♭9 this is the classic minor-key dominant.':
    'Com um ♭9 esta é a dominante clássica dos tons menores.',
  'Half-diminished is how this degree is normally voiced — it heads for the dominant.':
    'Meio-diminuto é como este grau costuma ser montado: ele se dirige à dominante.',
  'The bare diminished triad, which is harsher and rarely held.':
    'A tríade diminuta nua, mais áspera e raramente sustentada.',
  'Fully diminished, as a passing chord between two neighbours.':
    'Diminuto completo, como acorde de passagem entre dois vizinhos.',

  // ------------------------------------------------------- song structures
  'Intro': 'Introdução',
  'Verse': 'Estrofe',
  'Pre-Chorus': 'Pré-refrão',
  'Chorus': 'Refrão',
  'Bridge': 'Ponte',
  'Outro': 'Final',
  'Apply': 'Aplicar',
  'Apply to timeline': 'Aplicar à linha do tempo',
  'Establish the key without spending the big moment.':
    'Estabelecer o tom sem gastar o grande momento.',
  'A loop that can carry many different melodies.':
    'Um loop capaz de sustentar muitas melodias diferentes.',
  'Climb, and hand the chorus an unresolved dominant.':
    'Subir e entregar ao refrão uma dominante sem resolver.',
  'The strongest, plainest statement of the key.':
    'A afirmação mais forte e mais simples do tom.',
  'Leave home so returning means something.': 'Sair de casa para que voltar signifique algo.',
  'Land, or vamp somewhere restful.': 'Pousar, ou fazer um vamp em algum lugar tranquilo.',
  'Simple & Open': 'Simples e aberta',
  'Suspended Mood': 'Clima suspenso',
  'Single-Chord Drone': 'Bordão de um acorde só',
  'Dominant Tease': 'Provocação da dominante',
  'Establishes the key calmly before the verse enters.':
    'Estabelece o tom com calma antes de a estrofe entrar.',
  'Opens on a softer, unresolved colour.': 'Abre com uma cor mais suave e sem resolução.',
  'Holds the tonic so the first vocal line does the work.':
    'Sustenta a tônica para que a primeira linha vocal faça o trabalho.',
  'Starts on tension and resolves into bar one.':
    'Começa em tensão e resolve no primeiro compasso.',
  'Narrative Motion': 'Movimento narrativo',
  'Understated': 'Contida',
  'Descending Line': 'Linha descendente',
  'Minor Verse': 'Estrofe menor',
  'Steady storytelling motion, familiar and grounded.':
    'Movimento narrativo constante, familiar e com os pés no chão.',
  'Restrained — leaves room for the chorus to lift.':
    'Contida: deixa espaço para o refrão levantar.',
  'The axis loop, which never tires of being sung over.':
    'O loop dos quatro acordes, sobre o qual nunca cansa cantar.',
  'Same chords starting on the relative minor — darker footing.':
    'Os mesmos acordes começando no relativo menor: um chão mais escuro.',
  'Rising Tension': 'Tensão crescente',
  'Stepwise Build': 'Construção por graus',
  'Hold the Five': 'Segurar o quinto',
  'Climbs and holds the dominant so the chorus can release it.':
    'Sobe e segura a dominante para que o refrão possa soltá-la.',
  'Walks up the scale — momentum without a key change.':
    'Sobe pela escala: impulso sem mudança de tom.',
  'Two chords, twice as long each. Maximum anticipation.':
    'Dois acordes, cada um com o dobro da duração. Expectativa máxima.',
  'Big Lift': 'Grande subida',
  'Anthemic': 'De hino',
  'Plagal Power': 'Força plagal',
  'Minor Hook': 'Gancho menor',
  'Climbs above the verse for a euphoric hook.':
    'Sobe acima da estrofe para um gancho eufórico.',
  'Instantly singable — the classic pop lift.':
    'Cantável na hora: o clássico impulso do pop.',
  'Tonic and subdominant only. Hymn-like and immovable.':
    'Só tônica e subdominante. Como um hino, e inabalável.',
  'Begins minor and resolves major — bittersweet.':
    'Começa em menor e resolve em maior: agridoce.',
  'Harmonic Detour': 'Desvio harmônico',
  'Mediant Shift': 'Deslocamento mediântico',
  'Relative Minor': 'Relativo menor',
  'Suspended Halt': 'Parada suspensa',
  'Borrows jazz motion to contrast the chorus.':
    'Toma emprestado o movimento do jazz para contrastar com o refrão.',
  'A brief modal colour before the final chorus.':
    'Uma breve cor modal antes do refrão final.',
  'Moves the centre of gravity to the relative minor.':
    'Move o centro de gravidade para o relativo menor.',
  'Two chords, held. The pause before the last chorus.':
    'Dois acordes, sustentados. A pausa antes do último refrão.',
  'Fade Home': 'Voltar para casa',
  'Loop & Dissolve': 'Loop e dissolução',
  'Plagal Amen': 'Amém plagal',
  'Unresolved': 'Sem resolução',
  'A final cadence that settles the song.': 'Uma cadência final que assenta a música.',
  'A gentle vamp to fade out on.': 'Um vamp suave para ir sumindo.',
  'The IV–I "amen" cadence — restful, conclusive.':
    'A cadência de «amém» IV–I: repousada e conclusiva.',
  'Ends on the dominant, leaving the question open.':
    'Termina na dominante, deixando a pergunta em aberto.',

  // ---------------------------------------------------------------- moods
  'EVERYTHING BELOW IS IN': 'TUDO ABAIXO ESTÁ EM',
  '🔒 locked — suggestions stay in this key':
    '🔒 travado: as sugestões ficam neste tom',
  'unlocked — a suggestion may bring its own mode':
    'destravado: uma sugestão pode trazer o próprio modo',
  'Melancholic': 'Melancólico',
  'Energetic': 'Enérgico',
  'Dreamy': 'Onírico',
  'Heroic': 'Heroico',
  'Bluesy': 'Bluesy',
  'Epic': 'Épico',
  'Dark': 'Sombrio',
  'Hopeful': 'Esperançoso',
  'Nostalgic': 'Nostálgico',
  'Hypnotic': 'Hipnótico',
  'Sophisticated': 'Sofisticado',
  'Restless': 'Inquieto',
  'Tender': 'Terno',
  'Triumphant': 'Triunfante',
  'Begins on the relative minor and circles home without ever quite settling.':
    'Começa no relativo menor e dá a volta até em casa sem nunca assentar de vez.',
  'Primary triads, no minor chords, constant forward push.':
    'Tríades principais, nenhum acorde menor, impulso constante para a frente.',
  'Lydian major sevenths — the raised 4th keeps the tonic floating.':
    'Sétimas maiores lídias: a quarta aumentada mantém a tônica flutuando.',
  'Tonic and subdominant trading places, then the dominant to lift it.':
    'Tônica e subdominante trocando de lugar, e então a dominante para levantar.',
  'Dominant sevenths on every degree — grit rather than sweetness.':
    'Sétimas de dominante em todos os graus: aspereza em vez de doçura.',
  'Minor tonic under three major chords. Scale without brightness.':
    'Tônica menor sob três acordes maiores. Grandeza sem brilho.',
  'The ♭2 pressing against the tonic — unresolved and menacing.':
    'O ♭2 pressionando a tônica: sem resolução e ameaçador.',
  'Starts away from the tonic so arriving home reads as relief.':
    'Começa longe da tônica para que chegar em casa soe como alívio.',
  'The doo-wop turnaround. Familiar to the point of comfort.':
    'A virada do doo-wop. Familiar a ponto de confortar.',
  'Two chords, minor with a major 6th. Built for playing over.':
    'Dois acordes, menor com sexta maior. Feito para improvisar por cima.',
  'ii–V–I with sevenths throughout — the jazz cadence.':
    'ii–V–I com sétimas em tudo: a cadência do jazz.',
  'A stepwise descent that keeps arriving somewhere new.':
    'Uma descida por graus conjuntos que não para de chegar a lugares novos.',
  'Gentle mediant motion — close voicings, little movement in the bass.':
    'Movimento mediântico suave: vozes fechadas, pouco movimento no baixo.',
  'The ♭VII gives it swagger without losing the major tonic.':
    'O ♭VII dá gingado sem perder a tônica maior.',

  // ------------------------------------------------- progression library
  'FAMILY': 'FAMÍLIA',
  'Progression family': 'Família de progressões',
  'All families ({n})': 'Todas as famílias ({n})',
  'Search name, numerals, or a song…': 'Busque por nome, cifra ou música…',
  'Search progressions': 'Buscar progressões',
  '{n} PROGRESSION': '{n} PROGRESSÃO',
  '{n} PROGRESSIONS': '{n} PROGRESSÕES',
  'MATCHING “{query}”': 'QUE CORRESPONDEM A «{query}»',
  'Nothing matches that. Try a song name, a chord, or clear the search.':
    'Nada corresponde a isso. Tente o nome de uma música, um acorde, ou limpe a busca.',
  "Pick a family or search, then tap a progression to open it — you'll hear it in the current key. Apply writes it to the timeline. Numerals and chord names are computed from what will actually play.":
    'Escolha uma família ou busque, e então toque numa progressão para abri-la: você a ouvirá no tom atual. Aplicar escreve na linha do tempo. As cifras e os nomes dos acordes são calculados a partir do que vai realmente soar.',
  '▶ Hear it': '▶ Ouça',
  'HEARD IN': 'OUVE-SE EM',
  '{n} bar': '{n} compasso',
  '{n} bars': '{n} compassos',
  '(written in {mode})': '(escrita em {mode})',
  'Previewing {name} — tap Apply to keep it.':
    'Ouvindo {name}: toque em Aplicar para ficar com ela.',
  'Stop playback to preview a progression.':
    'Pare a reprodução para ouvir uma progressão.',
  'Pop & Rock': 'Pop e rock',
  'Modal Rock': 'Rock modal',
  'Minor Keys': 'Tons menores',
  'Jazz': 'Jazz',
  'Jazz & Neo-Soul': 'Jazz e neo-soul',
  'Blues': 'Blues',
  'Folk & Country': 'Folk e country',
  'Handbook': 'Manual',
  'Axis of Awesome': 'Os quatro acordes',
  'Axis, Minor Start': 'Os quatro acordes, começando em menor',
  '50s Doo-Wop': 'Doo-wop dos anos 50',
  'Three-Chord Rock': 'Rock de três acordes',
  'Pop-Punk Lift': 'Impulso pop-punk',
  'Ballad Climb': 'Subida de balada',
  "Pachelbel's Canon": 'O cânone de Pachelbel',
  'The four chords behind a startling share of the charts. Endlessly singable.':
    'Os quatro acordes por trás de uma fatia surpreendente das paradas. Cantáveis sem fim.',
  'The same loop rotated to begin on the relative minor — wistful rather than triumphant.':
    'O mesmo loop girado para começar no relativo menor: nostálgico em vez de triunfante.',
  'Ballads, prom scenes, "Stand By Me". Warm and instantly nostalgic.':
    'Baladas, cenas de baile de formatura, «Stand By Me». Quente e nostálgico na hora.',
  'The primary triads and nothing else. Direct, and hard to make sound wrong.':
    'As tríades principais e nada mais. Direto, e difícil de fazer soar errado.',
  'Starts away from home so the chorus lands as a return.':
    'Começa longe de casa para que o refrão pouse como um retorno.',
  'A stepwise rise through the scale — builds tension without a key change.':
    'Uma subida por graus conjuntos pela escala: cria tensão sem mudar de tom.',
  'A descending sequence that has outlived three centuries of fashion.':
    'Uma sequência descendente que sobreviveu a três séculos de modas.',
  'Mixolydian Rock': 'Rock mixolídio',
  'Dorian Vamp': 'Vamp dórico',
  'Grunge ♭VI–♭VII': 'Grunge ♭VI–♭VII',
  'Lydian Lift': 'Impulso lídio',
  'Phrygian Descent': 'Descida frígia',
  'The ♭VII is what makes this rock rather than pop — think "Sweet Home Alabama".':
    'O ♭VII é o que faz disso rock e não pop: pense em «Sweet Home Alabama».',
  'Minor with a bright 6th. Hypnotic, jam-friendly, never fully sad.':
    'Menor com uma sexta clara. Hipnótico, ótimo para improvisar, nunca de todo triste.',
  'Heavy and modal — the flat 6th and 7th give it the weight.':
    'Pesado e modal: a sexta e a sétima menores dão o peso.',
  'The ♯4 floats the tonic. Cinematic wonder in two chords.':
    'O ♯4 faz a tônica flutuar. Deslumbre de cinema em dois acordes.',
  'The ♭2 leaning on the tonic — flamenco and metal share this one.':
    'O ♭2 apoiado na tônica: o flamenco e o metal dividem este.',
  'Andalusian Cadence': 'Cadência andaluza',
  'Epic Minor': 'Menor épico',
  'Minor Ballad': 'Balada menor',
  'Minor Climb': 'Subida menor',
  'A stepwise descent from the tonic. Dramatic, and older than most of what it appears in.':
    'Uma descida por graus conjuntos a partir da tônica. Dramática, e mais antiga que quase tudo em que aparece.',
  'i–VI–III–VII. Trailers, anthems, anything that needs scale.':
    'i–VI–III–VII. Trailers, hinos, qualquer coisa que precise de grandeza.',
  'The doo-wop shape in minor — familiar bones, darker colour.':
    'A forma do doo-wop em menor: os mesmos ossos, cor mais escura.',
  'Rises through the relative major before falling back to the tonic.':
    'Sobe pelo relativo maior antes de cair de volta à tônica.',
  'ii–V–I Turnaround': 'Virada ii–V–I',
  'Rhythm Changes A': 'Rhythm changes A',
  'Bossa Turnaround': 'Virada de bossa',
  'Jazz Blues Head': 'Tema de blues de jazz',
  'Circle of Fifths Run': 'Corrida pelo círculo de quintas',
  'The central cadence of jazz. Learn it in all twelve keys and half the language follows.':
    'A cadência central do jazz. Aprenda-a nos doze tons e metade da linguagem vem junto.',
  'I–vi–ii–V, the most-played eight bars in the standard repertoire.':
    'I–vi–ii–V, os oito compassos mais tocados do repertório padrão.',
  'Major sevenths and a gentle ii–V. Nylon strings and brushes.':
    'Sétimas maiores e um ii–V suave. Cordas de nylon e vassourinhas.',
  'Dominant sevenths throughout — the blues with a jazz accent.':
    'Sétimas de dominante em tudo: o blues com sotaque de jazz.',
  'Root movement by fourths all the way home — every chord pulls to the next.':
    'Movimento de fundamentais por quartas até chegar em casa: cada acorde puxa o seguinte.',
  'Neo-Soul Loop': 'Loop neo-soul',
  'Half-Diminished ii–V–i': 'ii–V–i meio-diminuto',
  'Minor ii–V–i with a ♭9': 'ii–V–i menor com ♭9',
  'Sus4 Release': 'Resolução de sus4',
  '6/9 Turnaround': 'Virada 6/9',
  'Secondary Dominant Cycle': 'Ciclo de dominantes secundárias',
  'Dorian with ninths on everything. The major IV is what makes Dorian sound like Dorian rather than minor.':
    'Dórico com nonas em tudo. O IV maior é o que faz o dórico soar dórico e não menor.',
  'The textbook minor cadence: iiø7 sets up the dominant, the dominant lands on a m9.':
    'A cadência menor de manual: o iiø7 prepara a dominante, e a dominante pousa num m9.',
  'Dm9 – E7♭9 – Am9 in A minor. The v has to be borrowed as a dominant to pull home, and the ♭9 is the note that makes it ache.':
    'Dm9 – E7♭9 – Am9 em lá menor. O v precisa ser tomado emprestado como dominante para puxar para casa, e o ♭9 é a nota que dói.',
  'Hold the 4th, then let it fall to the 3rd. The oldest tension-and-release there is.':
    'Segure a quarta e depois deixe-a cair na terça. A tensão e o alívio mais antigos que existem.',
  'A 6/9 tonic never quite sits down, so the loop keeps turning. The 13th on the V is the full jazz dominant.':
    'Uma tônica 6/9 nunca senta de vez, então o loop continua girando. A décima terceira sobre o V é a dominante de jazz completa.',
  'Every chord is the dominant of the next. Each borrowed 7th pulls a fifth down into the chord after it.':
    'Cada acorde é a dominante do seguinte. Cada sétima emprestada puxa uma quinta abaixo para o acorde posterior.',
  '12-Bar Blues': 'Blues de 12 compassos',
  '12-Bar Quick Change': 'Blues de 12 compassos com troca rápida',
  'Minor Blues': 'Blues menor',
  'The form. Twelve bars, three chords, a century of music.':
    'A forma. Doze compassos, três acordes, um século de música.',
  'Moves to the IV in bar two — more motion early on.':
    'Vai ao IV no segundo compasso: mais movimento logo no começo.',
  'The same twelve bars in minor. Slower, heavier, more room to bend.':
    'Os mesmos doze compassos em menor. Mais lento, mais pesado, com mais espaço para bends.',
  'Country I–IV–V': 'Country I–IV–V',
  'Folk Circle': 'Círculo folk',
  'Celtic Vamp': 'Vamp celta',
  'The three chords most songs are made of.': 'Os três acordes de que a maioria das músicas é feita.',
  'Home, away, home, away. The campfire progression.':
    'Casa, fora, casa, fora. A progressão de fogueira.',
  'The ♭VII again, this time in a jig. Works beautifully in DADGAD.':
    'De novo o ♭VII, desta vez numa jiga. Fica lindo em DADGAD.',

  // ------------------------------------------------------------- handbook
  '1 · Single Major Chord': '1 · Um único acorde maior',
  '2 · Single Minor Chord': '2 · Um único acorde menor',
  '3 · Tonic–Dominant, Major': '3 · Tônica–dominante, maior',
  '4 · Tonic–Dominant, Minor': '4 · Tônica–dominante, menor',
  '5 · Tonic–Subdominant': '5 · Tônica–subdominante',
  '6 · Major to Relative Minor': '6 · De maior ao relativo menor',
  '7 · I–IV–V': '7 · I–IV–V',
  '8 · I–IV–V, Plagal Cadence': '8 · I–IV–V, cadência plagal',
  '9 · I–IV–V–IV': '9 · I–IV–V–IV',
  '10 · Minor to ♭III': '10 · De menor ao ♭III',
  '11 · Minor to ♭VII': '11 · De menor ao ♭VII',
  '12 · Doo-Wop / Ice Cream': '12 · Doo-wop / sorveteria',
  '12A · I–V–vi–IV': '12A · I–V–vi–IV',
  '12B · I–IV–vi–V': '12B · I–IV–vi–V',
  '13 · Rhythm Changes': '13 · Rhythm changes',
  '13B · Secondary Dominants': '13B · Dominantes secundárias',
  '13D · The Turnaround': '13D · A virada',
  '14 · ii–V–I–IV': '14 · ii–V–I–IV',
  '15 · Modal with ii and IV': '15 · Modal com ii e IV',
  '16 · I–♭VII–IV–I': '16 · I–♭VII–IV–I',
  '18 · i–♭III–♭VII–i': '18 · i–♭III–♭VII–i',
  '19 · Andalusian Cadence': '19 · Cadência andaluza',
  "20 · Pachelbel's Canon": '20 · O cânone de Pachelbel',
  'One chord, held. Everything else in music is a departure from this.':
    'Um acorde, sustentado. Todo o resto da música é uma partida a partir daqui.',
  'The same drone in minor. A whole song can live here.':
    'O mesmo bordão em menor. Uma música inteira pode morar aqui.',
  'Away and back. The smallest complete musical sentence there is.':
    'Ir e voltar. A menor frase musical completa que existe.',
  'The same two-chord motion with a minor tonic — darker, and it leans harder.':
    'O mesmo movimento de dois acordes com tônica menor: mais escuro, e se inclina mais.',
  'Away and back without tension. Restful where the dominant is restless.':
    'Ir e voltar sem tensão. Repousado onde a dominante é inquieta.',
  'The same seven notes, seen from its shadow.':
    'As mesmas sete notas, vistas da sua sombra.',
  'Ends IV to I rather than V to I — the softer landing.':
    'Termina de IV para I em vez de V para I: o pouso mais suave.',
  'Sits on the tonic before moving — leaves space for the vocal.':
    'Fica na tônica antes de se mover: deixa espaço para o vocal.',
  'Minor tonic to its relative major. Used alone, or to open something longer.':
    'Da tônica menor ao seu relativo maior. Usada sozinha, ou para abrir algo mais longo.',
  'Minor, its relative major, and the subtonic. Endlessly loopable.':
    'Menor, seu relativo maior e a subtônica. Dá para repetir sem fim.',
  'The same four chords rotated. Probably the most recorded loop alive.':
    'Os mesmos quatro acordes girados. Provavelmente o loop mais gravado que existe.',
  'The subdominant arrives early, so the minor lands harder.':
    'A subdominante chega cedo, então o menor pousa com mais força.',
  'I–vi–ii–V. The circle of fifths, walked backwards, four bars at a time.':
    'I–vi–ii–V. O círculo de quintas percorrido de trás para a frente, de quatro em quatro compassos.',
  'Each chord turned into the dominant of the next, so the loop pulls all the way round.':
    'Cada acorde transformado na dominante do seguinte, de modo que o loop puxa a volta inteira.',
  'iii–vi–ii–V. Tacked on the end to extend an ending, in show tunes and jazz.':
    'iii–vi–ii–V. Grudado no fim para alongar um final, no teatro musical e no jazz.',
  'The jazz cadence, then straight out to the subdominant instead of resting.':
    'A cadência do jazz, e então direto para a subdominante em vez de repousar.',
  'Stepwise out of the tonic. Modern pop leans on this constantly.':
    'Saindo da tônica por graus conjuntos. O pop moderno se apoia nisso o tempo todo.',
  'Mixolydian rock. The ♭VII is what stops it sounding like a hymn.':
    'Rock mixolídio. O ♭VII é o que impede que soe como um hino.',
  'The first chord from outside the major scale. Modal, and instantly modern.':
    'O primeiro acorde de fora da escala maior. Modal, e moderno na hora.',
  'The loop that never resolves, so it can go round forever.':
    'O loop que nunca resolve, e por isso pode girar para sempre.',
  'Stepwise descending, out of Flamenco. The V7 at the bottom is what makes it Spanish rather than merely minor.':
    'Descendo por graus conjuntos, vindo do flamenco. O V7 no fim é o que a torna espanhola e não apenas menor.',
  'Eight bars from 1680 that pop music has never stopped borrowing.':
    'Oito compassos de 1680 que a música pop nunca parou de tomar emprestados.',
  'I–vi–IV–V. Fifty years of hits and it still has not worn out.':
    'I–vi–IV–V. Cinquenta anos de sucessos e ainda não gastou.',

  // ---------------------------------------------------------------- tuner
  'Instrument': 'Instrumento',
  'Tuning meter': 'Medidor de afinação',
  'A4 = {hz} Hz': 'Lá4 = {hz} Hz',
  'Signal:': 'Sinal:',
  'Status:': 'Estado:',
  'Freq: —': 'Freq.: —',
  'Freq: {hz}Hz': 'Freq.: {hz} Hz',
  'listening': 'ouvindo',
  'LOCKED': 'AFINADA',
  'FLAT': 'BAIXA',
  'SHARP': 'ALTA',
  'START LISTENING': 'COMEÇAR A OUVIR',
  'STOP LISTENING': 'PARAR DE OUVIR',
  'Auto': 'Auto',
  'AUTO': 'AUTO',
  'Manual': 'Manual',
  'MANUAL · {note}': 'MANUAL · {note}',
  'OPTIONS': 'OPÇÕES',
  'TARGET': 'ALVO',
  'REFERENCE TONE': 'TOM DE REFERÊNCIA',
  'CHIME WHEN IN TUNE': 'AVISO AO AFINAR',
  'SENSITIVITY': 'SENSIBILIDADE',
  'RESPONSE': 'RESPOSTA',
  'IN-TUNE WINDOW': 'MARGEM DE AFINAÇÃO',
  'REFERENCE A4': 'LÁ4 DE REFERÊNCIA',
  'Follows the nearest string in the tuning': 'Segue a corda mais próxima da afinação',
  'Holds the string you pinned': 'Fica na corda que você fixou',
  'Follows whichever string of the tuning is nearest to what it hears':
    'Segue a corda da afinação mais próxima do que ele ouve',
  'Stays on the pinned string, however far out it is':
    'Fica na corda fixada, por mais desafinada que esteja',
  'Sine': 'Senoide',
  'Warm': 'Quente',
  'String': 'Corda',
  'Tapping a string pins it without sounding anything.':
    'Tocar numa corda a fixa sem fazer soar nada.',
  'A clean sine, sounded once. Tap again to hear it again.':
    'Uma senoide limpa, soada uma vez. Toque de novo para ouvi-la outra vez.',
  'A triangle — rounder, and easier to pitch against.':
    'Uma triangular: mais redonda, e mais fácil de comparar a altura.',
  'One pluck of the guitar itself, on the melody voices.':
    'Uma palhetada do próprio violão, nas vozes de melodia.',
  'A short two-note chime the moment a string settles':
    'Um aviso curto de duas notas assim que a corda assenta',
  'Silent — watch the dial': 'Em silêncio: olhe o mostrador',
  'Low': 'Baixa',
  'Normal': 'Normal',
  'High': 'Alta',
  'Steady': 'Estável',
  'Quick': 'Rápida',
  'The default': 'O padrão',
  'The default; below what most ears hear': 'O padrão; abaixo do que a maioria dos ouvidos percebe',
  'Ignores everything quiet — for noisy rooms': 'Ignora tudo o que for fraco: para salas barulhentas',
  'Hears a soft, decaying note for longer': 'Ouve por mais tempo uma nota fraca que vai sumindo',
  'Slower needle, less jitter': 'Ponteiro mais lento, menos tremor',
  'Follows the string immediately': 'Segue a corda na hora',
  'Studio — hard to hold, exact when it locks': 'Estúdio: difícil de manter, exato quando trava',
  'Forgiving — locks quickly on stage': 'Tolerante: trava rápido no palco',
  'Uses the microphone. Nothing is recorded or sent anywhere.':
    'Usa o microfone. Nada é gravado nem enviado a lugar algum.',
  'Listening is unavailable here — the page CircleSong is embedded in withholds the microphone.':
    'Não dá para ouvir aqui: a página em que o CircleSong está embutido não libera o microfone.',
  'Open CircleSong at its own address to listen. Tap a string to hear its exact pitch and tune by ear — that works anywhere.':
    'Abra o CircleSong no endereço próprio dele para ouvir. Toque numa corda para ouvir a altura exata e afinar de ouvido: isso funciona em qualquer lugar.',
  'Audio could not start, so the tuner cannot listen.':
    'O áudio não conseguiu iniciar, então o afinador não consegue ouvir.',
  'This browser does not offer microphone access to the page.':
    'Este navegador não oferece acesso ao microfone para a página.',
  'The page CircleSong is embedded in has not granted it the microphone, so it cannot even ask.':
    'A página em que o CircleSong está embutido não lhe deu o microfone, então ele nem consegue pedir.',
  'Open CircleSong from its own address — the installed app, or the copy served from GitHub — and listening will work.':
    'Abra o CircleSong pelo endereço próprio dele — o app instalado ou a cópia servida pelo GitHub — e a escuta vai funcionar.',
  'Meanwhile you can tune by ear: tap a string above to hear its exact pitch.':
    'Enquanto isso você pode afinar de ouvido: toque numa corda acima para ouvir a altura exata.',
  'Microphone access was refused. Allow it for this page in your browser’s site settings, then switch Listen on again. You can tune by ear in the meantime — tap a string above to hear its pitch.':
    'O acesso ao microfone foi negado. Libere-o para esta página nas configurações de site do navegador e ligue Ouvir de novo. Enquanto isso dá para afinar de ouvido: toque numa corda acima para ouvir a altura.',
  'No microphone was found on this device. Tap a string above to hear its pitch and tune by ear.':
    'Nenhum microfone foi encontrado neste aparelho. Toque numa corda acima para ouvir a altura e afinar de ouvido.',
  'The microphone could not be opened — {error}.':
    'Não foi possível abrir o microfone — {error}.',
  'unknown error': 'erro desconhecido',
  'Guitar': 'Violão',
  'Bass': 'Baixo',
  'Ukulele': 'Ukulele',
  'Mandolin': 'Bandolim',
  'Banjo': 'Banjo',
  'Violin': 'Violino',
  'Cello / Viola': 'Violoncelo / viola',
  'Chromatic': 'Cromático',
  'Chromatic — play any note and it will be named. Tap one to hear it.':
    'Cromático: toque qualquer nota e ela será nomeada. Toque numa para ouvi-la.',
  'Standard — E A D G B E': 'Padrão — E A D G B E',
  'Drop D — D A D G B E': 'Drop D — D A D G B E',
  'Half step down — E♭ A♭ D♭ G♭ B♭ E♭': 'Meio tom abaixo — E♭ A♭ D♭ G♭ B♭ E♭',
  'Full step down — D G C F A D': 'Um tom abaixo — D G C F A D',
  'Open G — D G D G B D': 'Sol aberto — D G D G B D',
  'Open D — D A D F♯ A D': 'Ré aberto — D A D F♯ A D',
  'DADGAD — D A D G A D': 'DADGAD — D A D G A D',
  'Drop C — C G C F A D': 'Drop C — C G C F A D',
  '7-string — B E A D G B E': '7 cordas — B E A D G B E',
  'Standard 4-string — E A D G': 'Padrão de 4 cordas — E A D G',
  'Drop D — D A D G': 'Drop D — D A D G',
  'Half step down — E♭ A♭ D♭ G♭': 'Meio tom abaixo — E♭ A♭ D♭ G♭',
  'Standard 5-string — B E A D G': 'Padrão de 5 cordas — B E A D G',
  'Standard high-G — G C E A': 'Padrão com sol agudo — G C E A',
  'Low-G — G C E A': 'Sol grave — G C E A',
  'D tuning — A D F♯ B': 'Afinação em ré — A D F♯ B',
  'Baritone — D G B E': 'Barítono — D G B E',
  'Standard — G D A E': 'Padrão — G D A E',
  'Open G — F♯ D A D': 'Sol aberto — F♯ D A D',
  'Open G 5-string — g D G B D': 'Sol aberto de 5 cordas — g D G B D',
  'Double C — g C G C D': 'Dó duplo — g C G C D',
  'Sawmill — g D G C D': 'Sawmill — g D G C D',
  'Cello — C G D A': 'Violoncelo — C G D A',
  'Viola — C G D A': 'Viola — C G D A',
  'Any note — C1 to B6': 'Qualquer nota — de C1 a B6',

  // ---------------------------------------------------------------- songs
  'CURRENT SONG': 'MÚSICA ATUAL',
  'Save': 'Salvar',
  'Save as new': 'Salvar como nova',
  'New song': 'Nova música',
  'Open': 'Abrir',
  'Import a song file': 'Importar um arquivo de música',
  'Nothing saved yet.': 'Nada salvo ainda.',
  'Nothing saved yet. Save the current song to start a library.':
    'Nada salvo ainda. Salve a música atual para começar uma biblioteca.',
  '{n} loop': '{n} loop',
  '{n} loops': '{n} loops',
  '{n} bar written': '{n} compasso escrito',
  '{n} bars written': '{n} compassos escritos',
  'saved': 'salva',
  'just now': 'agora mesmo',
  '{n} min ago': 'há {n} min',
  '{n} h ago': 'há {n} h',
  'Delete “{name}”? This cannot be undone.': 'Excluir «{name}»? Isso não pode ser desfeito.',
  'Project deleted.': 'Projeto excluído.',
  'That project could not be read.': 'Não foi possível ler esse projeto.',
  'Opened “{name}”.': '«{name}» aberta.',
  'Saved “{name}”.': '«{name}» salva.',
  'Loaded “{name}”.': '«{name}» carregada.',
  'This browser will not let the app save locally.':
    'Este navegador não deixa o app salvar localmente.',
  'This browser will not let the app store anything locally.':
    'Este navegador não deixa o app guardar nada localmente.',
  "No room left in this browser's storage. Delete a project and try again.":
    'Não há mais espaço no armazenamento deste navegador. Exclua um projeto e tente de novo.',
  'Start a new song? Anything unsaved will be lost.':
    'Começar uma música nova? Tudo o que não estiver salvo será perdido.',
  'New song started.': 'Nova música começada.',
  'Could not read that file — {error}': 'Não foi possível ler esse arquivo — {error}',
  'Unrecognised file format': 'Formato de arquivo não reconhecido',
};

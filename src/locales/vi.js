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
 * Vietnamese.
 *
 * Keys are the English source strings; see src/i18n.js. Anything absent falls
 * back to English, so a partial dictionary is a working one.
 *
 * Note letters (C, D, E…) are left alone, and so are the chord suffixes.
 * Vietnamese teaching does use the đô-rê-mi syllables, but the fretboard, the
 * chord symbols and the tuner all draw letters, and renaming them would be a
 * correctness change rather than a translation. The words *about* the notes
 * are Vietnamese; the letters on the instrument are not.
 */
export const LOCALE_VI = {
  // ---------------------------------------------------------------- chrome
  'Language': 'Ngôn ngữ',
  'LANGUAGE': 'NGÔN NGỮ',
  'Everything the app says, including the lessons and the progression notes.':
    'Mọi thứ ứng dụng hiển thị, kể cả các bài học và ghi chú về vòng hợp âm.',
  'About CircleSong': 'Giới thiệu CircleSong',
  'Audio engine': 'Bộ máy âm thanh',
  'Audio engine ready': 'Bộ máy âm thanh đã sẵn sàng',
  'Tap anything to start audio': 'Chạm vào bất cứ đâu để khởi động âm thanh',
  'Audio unavailable — {error}': 'Âm thanh không khả dụng — {error}',
  'Play': 'Phát',
  'Stop': 'Dừng',
  'SONG:': 'BÀI HÁT:',
  'Song title': 'Tên bài hát',
  'Untitled Song': 'Bài hát chưa đặt tên',
  'Tempo': 'Nhịp độ',
  'Time signature': 'Số chỉ nhịp',
  'Metro': 'Nhịp',
  'Loop': 'Vòng lặp',
  'Drums': 'Trống',
  'Backing drums': 'Trống đệm',
  'CLOSE': 'ĐÓNG',
  'Theme': 'Giao diện',
  'THEME': 'GIAO DIỆN',
  'System': 'Hệ thống',
  'Light': 'Sáng',
  'Dark': 'Tối',
  'High contrast': 'Tương phản cao',
  'Sepia': 'Nâu cổ',
  'Currently {theme}.': 'Hiện tại: {theme}.',
  'Follows your device, and changes with it.': 'Theo thiết bị của bạn và thay đổi cùng nó.',
  'The default. Neon on black.': 'Mặc định. Neon trên nền đen.',
  'Ink on paper, with a darker accent so it stays legible.':
    'Mực trên giấy, với màu nhấn đậm hơn để vẫn dễ đọc.',
  'Pure black and white, visible borders, no faint washes.':
    'Đen trắng thuần, viền rõ, không có mảng màu nhạt.',
  'Warm and low-glare, for long sessions.': 'Ấm và ít chói, cho những buổi tập dài.',

  // ------------------------------------------------------------------ tabs
  'Circle': 'Vòng tròn',
  'Tuner': 'Lên dây',
  'Tone': 'Âm sắc',
  'Compose': 'Sáng tác',
  'Timeline': 'Dòng thời gian',
  'Assist': 'Trợ lý',
  'Learn': 'Học',
  'Songs': 'Bài hát',

  // --------------------------------------------------------- panel headings
  '/01 CIRCLE_OF_FIFTHS': '/01 VÒNG_QUÃNG_NĂM',
  '/02 GUITAR_TONE': '/02 ÂM_SẮC_GUITAR',
  '/02B VOICE': '/02B GIỌNG',
  '/02C PLAYBACK': '/02C PHÁT_LẠI',
  '/03 STRUM_&_RHYTHM': '/03 QUẠT_CHẢ_&_TIẾT_TẤU',
  '/03 DRUM_MACHINE': '/03 MÁY_TRỐNG',
  '/04 DIATONIC_CHORDS': '/04 HỢP_ÂM_DIATONIC',
  '/05 TIMELINE': '/05 DÒNG_THỜI_GIAN',
  '/06 LEARN': '/06 HỌC',
  '/07 SONGWRITING_ASSISTANT': '/07 TRỢ_LÝ_SÁNG_TÁC',
  '/08 SONGS': '/08 BÀI_HÁT',
  '/09 TUNER': '/09 LÊN_DÂY',
  '// APPEARANCE': '// GIAO_DIỆN',
  '// PROGRESSION_LIBRARY': '// THƯ_VIỆN_VÒNG_HỢP_ÂM',
  '// SAVED_PROJECTS': '// DỰ_ÁN_ĐÃ_LƯU',
  '// SONG_STRUCTURE_IDEAS': '// Ý_TƯỞNG_CẤU_TRÚC_BÀI',
  'EAR_TRAINER // GUESS_THE_MODE': 'LUYỆN_TAI // ĐOÁN_ĐIỆU_THỨC',

  // ----------------------------------------------------------------- about
  'CircleSong is a circle-of-fifths powered composition tool for guitar players. It maps the theory behind keys, modes, and chord progressions onto an instrument you already play, so you can build song structures — verses, choruses, bridges — by ear and by understanding, not guesswork.':
    'CircleSong là công cụ sáng tác dành cho người chơi guitar, xây trên vòng quãng năm. Nó chuyển lý thuyết về giọng, điệu thức và vòng hợp âm lên chính cây đàn bạn đang chơi, để bạn dựng cấu trúc bài hát — phiên khúc, điệp khúc, đoạn nối — bằng tai và bằng hiểu biết, chứ không phải đoán mò.',
  'Pick a key, hear every diatonic chord and its inversions instantly, sequence them into a loop, and get progression ideas grounded in real theory and well-known songs. The Learn tab and ear trainer build your fluency in modes as you write — so composing and studying happen in the same place.':
    'Chọn một giọng, nghe ngay mọi hợp âm diatonic cùng các thể đảo của nó, xâu chúng thành một vòng lặp, và nhận những ý tưởng vòng hợp âm dựa trên lý thuyết thật và những bài hát quen thuộc. Thẻ Học và phần luyện tai rèn sự thuần thục về điệu thức ngay trong lúc bạn viết — sáng tác và học diễn ra cùng một chỗ.',
  'Everything the instrument needs is here: eight modelled tones from acoustic steel to grand piano, thirty-four strum and picking patterns, a drum machine, a tuner for eight instruments, and songs you can save. It runs entirely on your device, installs to your home screen, and keeps working with no signal.':
    'Mọi thứ cây đàn cần đều có ở đây: tám âm sắc được mô phỏng, từ guitar thùng dây thép tới đại dương cầm, ba mươi tư mẫu quạt chả và móc dây, một máy trống, một bộ lên dây cho tám nhạc cụ, và những bài hát bạn có thể lưu lại. Tất cả chạy hoàn toàn trên thiết bị của bạn, cài được vào màn hình chính, và vẫn hoạt động khi không có sóng.',
  'Copyright © 2026. Free software under the': 'Bản quyền © 2026. Phần mềm tự do theo',
  ', with no warranty. Section 13 of that licence gives everyone who uses CircleSong over a network the right to its source:':
    ', không kèm bảo đảm nào. Điều 13 của giấy phép đó cho mọi người dùng CircleSong qua mạng quyền được xem mã nguồn của nó:',
  'Source Code (AGPL v3.0)': 'Mã nguồn (AGPL v3.0)',

  // ---------------------------------------------------------------- circle
  'Circle of fifths — arrow keys move around the wheel':
    'Vòng quãng năm — các phím mũi tên di chuyển quanh bánh xe',
  '{chord} — {numeral}, the {degree}': '{chord} — {numeral}, {degree}',
  '{chord} — outside this key': '{chord} — ngoài giọng này',
  'Mode': 'Điệu thức',
  'WHEEL TAP PLAYS': 'CHẠM VÀO BÁNH XE SẼ PHÁT',
  'Chord': 'Hợp âm',
  'Note': 'Nốt',
  'Show secondary dominants': 'Hiện các át phụ',
  'The chords that pull into each degree': 'Những hợp âm kéo về từng bậc',
  'SECONDARY DOMINANTS': 'ÁT PHỤ',
  'Tap one to hear it resolve. Each arrow points at the chord that chord pulls into.':
    'Chạm vào một cái để nghe nó giải quyết. Mỗi mũi tên chỉ vào hợp âm mà nó kéo tới.',
  '◄ Fourths (subdominant)': '◄ Quãng bốn (hạ át)',
  'Fifths (dominant) ►': 'Quãng năm (át) ►',
  'Outer ring — major keys. Inner ring — their relative minors. Bright wedges are diatonic to the current key. Clockwise stacks a 5th toward the dominant; counter-clockwise a 4th toward the subdominant. Lock the key, then tap any wedge to hear it and see how it relates.':
    'Vòng ngoài: các giọng trưởng. Vòng trong: các giọng thứ song song. Những múi sáng là diatonic với giọng hiện tại. Theo chiều kim đồng hồ là chồng thêm một quãng năm về phía át; ngược chiều là một quãng bốn về phía hạ át. Khóa giọng lại, rồi chạm vào múi bất kỳ để nghe nó và thấy mối liên hệ.',
  '🔒 Key Locked — tap wheel to explore': '🔒 Đã khóa giọng — chạm bánh xe để khám phá',
  '🔓 Lock Key to Explore': '🔓 Khóa giọng để khám phá',
  '{note} — degree {n} of the key ({numeral})': '{note} — bậc {n} của giọng ({numeral})',
  '{chord} is the {function} ({numeral}) of {key} — a {interval} above the root.':
    '{chord} là {function} ({numeral}) của {key} — cách nốt gốc một {interval}.',
  '{chord} sits a {interval} from {key} — outside the current key, a borrowed or chromatic color.':
    '{chord} cách {key} một {interval} — ngoài giọng hiện tại, một màu mượn hoặc màu bán cung.',
  'The V7 of {target} — it borrows a note from outside the key to point at the {numeral} chord.':
    'V7 của {target} — nó mượn một nốt ngoài giọng để trỏ vào hợp âm {numeral}.',
  'The key’s own v is minor and cannot pull home. Raising its third makes {chord}, which can.':
    'Bậc v của chính giọng này là thứ nên không kéo về nhà được. Nâng quãng ba của nó lên thành {chord}, và nó làm được.',
  'Borrowed': 'Mượn',

  // ------------------------------------------------- functions and degrees
  'Tonic': 'Chủ âm',
  'Supertonic': 'Bậc II',
  'Mediant': 'Trung âm',
  'Subdominant': 'Hạ át',
  'Dominant': 'Át',
  'Submediant': 'Hạ trung âm',
  'Leading Tone': 'Âm dẫn',
  'Home base — the point of rest the progression resolves to.':
    'Nhà: điểm nghỉ mà vòng hợp âm giải quyết về.',
  'Often leads toward the dominant; sets up motion away from home.':
    'Thường dẫn tới át; khởi động chuyển động rời khỏi nhà.',
  'Colors the tonic, blending stability with subtle tension.':
    'Tô màu cho chủ âm, pha sự vững chãi với chút căng nhẹ.',
  'Pulls away from home and opens the door to the dominant.':
    'Kéo ra khỏi nhà và mở cửa dẫn tới át.',
  'Strongest pull back to the tonic — the engine of resolution.':
    'Lực kéo mạnh nhất trở về chủ âm: động cơ của sự giải quyết.',
  'A gentle detour from the tonic, often feels wistful or reflective.':
    'Một lối rẽ nhẹ khỏi chủ âm; thường nghe man mác hoặc trầm ngâm.',
  'Maximum tension — wants urgently to resolve back to the tonic.':
    'Căng thẳng tối đa: khẩn thiết muốn giải quyết về chủ âm.',
  '{function} chord in this key.': 'Hợp âm {function} trong giọng này.',
  'home': 'nhà',
  'a step away from home': 'cách nhà một bậc',
  "the tonic's shadow": 'cái bóng của chủ âm',
  'the lift': 'lực nâng',
  'the pull back home': 'lực kéo về nhà',
  'the relative minor': 'giọng thứ song song',
  'the approach chord': 'hợp âm dẫn vào',

  // ---------------------------------------------------------------- modes
  'Ionian': 'Ionian',
  'Dorian': 'Dorian',
  'Phrygian': 'Phrygian',
  'Lydian': 'Lydian',
  'Mixolydian': 'Mixolydian',
  'Aeolian': 'Aeolian',
  'Locrian': 'Locrian',
  'Ionian (Major)': 'Ionian (trưởng)',
  'Aeolian (Minor)': 'Aeolian (thứ)',
  'Major scale': 'Âm giai trưởng',
  'Natural minor': 'Thứ tự nhiên',
  'Bright, resolved, happy': 'Sáng, ổn định, vui',
  'Minor but hopeful, moody without being sad': 'Thứ mà vẫn hy vọng; có tâm trạng nhưng không buồn',
  'Dark, exotic, tense': 'Tối, lạ, căng',
  'Dreamy, floating, cinematic': 'Mơ màng, bồng bềnh, đậm chất điện ảnh',
  'Bluesy, rootsy major': 'Trưởng pha chất blues và chất mộc',
  'Sad, melancholic, introspective': 'Buồn, u sầu, hướng nội',
  'Unstable, tense, rarely a home base': 'Bấp bênh, căng, hiếm khi làm nhà',
  'The default major-key sound — home base for pop, country, and classical.':
    'Âm thanh giọng trưởng mặc định: ngôi nhà của pop, country và cổ điển.',
  'The major 6th is the giveaway — vamp i–IV for a jazzy, less melancholic minor sound (Santana, Radiohead).':
    'Quãng sáu trưởng là dấu hiệu: chơi vamp i–IV để có màu thứ đậm chất jazz và bớt u sầu (Santana, Radiohead).',
  'The ♭2 gives it away — vamp i–♭II for a flamenco or metal flavor.':
    '♭2 là dấu hiệu: chơi vamp i–♭II để có hương vị flamenco hoặc metal.',
  'The ♯4 makes it float above plain major — vamp I–II for a "movie score" wonder.':
    '♯4 khiến nó bay lơ lửng trên giọng trưởng thường: chơi vamp I–II để có nét kỳ diệu như nhạc phim.',
  'Major with a flat 7th — vamp I–♭VII for classic rock and blues-rock.':
    'Trưởng với quãng bảy thứ: chơi vamp I–♭VII cho rock cổ điển và blues-rock.',
  'The default minor-key sound — vamp i–VI for that classic sad or epic minor feel.':
    'Âm thanh giọng thứ mặc định: chơi vamp i–VI để có cảm giác thứ buồn hoặc hùng tráng quen thuộc.',
  'Built on a diminished triad — usually a passing color (like vii° in a major key) rather than a tonic.':
    'Dựng trên hợp âm ba giảm: thường là màu đi ngang (như vii° trong giọng trưởng) chứ không phải chủ âm.',
  'Modes are the 7 scales hiding inside every major scale — same notes, different starting point, different mood. Pick one to hear it and read how guitarists use it.':
    'Điệu thức là 7 âm giai ẩn trong mỗi âm giai trưởng: cùng những nốt ấy, điểm bắt đầu khác, tâm trạng khác. Chọn một để nghe và đọc xem người chơi guitar dùng nó thế nào.',
  '▶ Play Scale': '▶ Chơi âm giai',
  '▶ Play Vamp': '▶ Chơi vamp',
  'Scale degrees compared with the major scale': 'Các bậc so với âm giai trưởng',
  'Modes identified correctly at least once': 'Những điệu thức từng đoán đúng ít nhất một lần',
  'Score:': 'Điểm:',
  'Streak: {n} (best {best})': 'Chuỗi: {n} (tốt nhất {best})',
  '▶ Start': '▶ Bắt đầu',
  '↻ New Round': '↻ Vòng mới',
  'Correct! 🎧': 'Chính xác! 🎧',
  'Not quite — that was {mode}': 'Chưa đúng — đó là {mode}',
  '{mode} — identified': '{mode} — đã nhận ra',

  // -------------------------------------------------------------- intervals
  'Unison (root)': 'Đồng âm (nốt gốc)',
  'Minor 2nd': 'Quãng hai thứ',
  'Major 2nd': 'Quãng hai trưởng',
  'Minor 3rd': 'Quãng ba thứ',
  'Major 3rd': 'Quãng ba trưởng',
  'Perfect 4th': 'Quãng bốn đúng',
  'Tritone': 'Quãng ba cung',
  'Perfect 5th': 'Quãng năm đúng',
  'Minor 6th': 'Quãng sáu thứ',
  'Major 6th': 'Quãng sáu trưởng',
  'Minor 7th': 'Quãng bảy thứ',
  'Major 7th': 'Quãng bảy trưởng',

  // ------------------------------------------------------------------ tone
  'VOLUME': 'ÂM LƯỢNG',
  'BRIGHTNESS': 'ĐỘ SÁNG',
  'SUSTAIN': 'ĐỘ NGÂN',
  'PICK POS': 'VỊ TRÍ GẢY',
  'AUDITION': 'NGHE THỬ',
  '1 bar': '1 ô nhịp',
  'Play a full bar': 'Chơi trọn một ô nhịp',
  'Play {n} beat': 'Chơi {n} phách',
  'Play {n} beats': 'Chơi {n} phách',
  'Cut previous sound': 'Ngắt âm trước đó',
  'Each chord silences the one before it': 'Mỗi hợp âm làm tắt hợp âm trước nó',
  'On': 'Bật',
  'Off': 'Tắt',
  'TUNING': 'LÊN DÂY',
  'Tuning': 'Lên dây',

  // ---------------------------------------------------------------- rhythm
  'STYLE': 'PHONG CÁCH',
  'NOW PLAYING': 'ĐANG CHƠI',
  'FEEL': 'CẢM GIÁC',
  'SWING': 'SWING',
  'HUMANIZE': 'TỰ NHIÊN HÓA',
  'Rhythm family': 'Nhóm tiết tấu',
  'All feels ({n})': 'Tất cả cảm giác ({n})',
  'Strumming': 'Quạt chả',
  'Muted & Percussive': 'Chặn tiếng và gõ nhịp',
  'Reggae, Ska & Offbeat': 'Reggae, ska và phách lệch',
  'Jazz Comping': 'Đệm jazz',
  'Latin & Syncopated': 'Latin và đảo phách',
  'Country & Bluegrass': 'Country và bluegrass',
  'Other Meters': 'Nhịp khác',
  'Fingerstyle': 'Fingerstyle',
  'Keyboard': 'Phím đàn',
  'written for {lo}–{hi} BPM': 'viết cho {lo}–{hi} BPM',
  'Written for {lo}–{hi} BPM': 'Viết cho {lo}–{hi} BPM',
  'any tempo': 'mọi nhịp độ',
  'Set {bpm} BPM': 'Đặt {bpm} BPM',
  'You are at {bpm}; this feel is written for {lo}–{hi}':
    'Bạn đang ở {bpm}; cảm giác này được viết cho {lo}–{hi}',
  'machine': 'máy móc',
  'Straight': 'Đều',
  'Double-time': 'Nhịp đôi',
  'Half-time': 'Nhịp rưỡi chậm',
  'The pattern as written.': 'Mẫu tiết tấu đúng như đã viết.',
  'Twice the density at the same tempo — a skank becomes ska.':
    'Dày gấp đôi ở cùng nhịp độ — một cú skank thành ska.',
  'The figure stretched across two bars. Everything gets heavier.':
    'Hình tiết tấu kéo dài qua hai ô nhịp. Mọi thứ nặng hơn.',
  'Straight 8ths': 'Móc đơn đều',
  '16th Pop Strum': 'Quạt pop móc kép',
  'Folk D-DU-UDU': 'Folk X-XL-LXL',
  'Driving 16ths': 'Móc kép thúc đẩy',
  'Anthem Half-Time': 'Anthem nhịp chậm đôi',
  'Punk Downstrokes': 'Punk quạt xuống',
  'Muted Chuck': 'Chuck chặn tiếng',
  'Funk 16ths': 'Móc kép funk',
  'Disco Chank': 'Chank disco',
  'Reggae Skank': 'Skank reggae',
  'One Drop': 'One drop',
  'Rocksteady': 'Rocksteady',
  'Ska Upstrokes': 'Ska quạt lên',
  'Ska Bubble (16ths)': 'Bong bóng ska (móc kép)',
  'Jazz Swing': 'Swing jazz',
  'Charleston Comp': 'Đệm charleston',
  'Bossa Nova': 'Bossa nova',
  'Rumba Clave': 'Clave rumba',
  'Rumba Flamenca': 'Rumba flamenca',
  'Country Boom-Chick': 'Country boom-chick',
  'Bluegrass Boom-Chuck': 'Bluegrass boom-chuck',
  'Waltz Strum': 'Quạt điệu valse',
  'Ballad 6/8': 'Ballad 6/8',
  'Slow Blues 12/8': 'Blues chậm 12/8',
  'Fingerstyle Arp': 'Rải fingerstyle',
  'Travis Picking': 'Travis picking',
  'Rising Arpeggio': 'Rải đi lên',
  'Let Ring': 'Để ngân',
  'Block Chords': 'Hợp âm khối',
  'Ballad Left Hand': 'Tay trái ballad',
  'Alberti Bass': 'Bè trầm Alberti',
  'Broken Chord': 'Hợp âm rải gãy',
  'Comping Stabs': 'Chấm đệm ngắt',
  'Reggae Organ Bubble': 'Bong bóng organ reggae',

  // ----------------------------------------------------------------- drums
  'Groove': 'Groove',
  'Drum kit': 'Bộ trống',
  'Drum step sequencer': 'Bộ tạo nhịp trống theo bước',
  'DRUM VOL': 'ÂM LƯỢNG TRỐNG',
  'Tap a step to cycle it through soft, medium and hard, then off. Tap a voice name to preview it; the ✕ clears that row.':
    'Chạm một bước để lần lượt chuyển qua nhẹ, vừa, mạnh rồi tắt. Chạm tên một tiếng trống để nghe thử; dấu ✕ xóa hàng đó.',
  'Clear grid': 'Xóa lưới',
  'Reset groove': 'Đặt lại groove',
  'Double': 'Nhân đôi',
  '✦ Vary': '✦ Biến tấu',
  'Copy the first half onto the second': 'Chép nửa đầu sang nửa sau',
  'Nudge the groove into a variation of itself': 'Đẩy groove thành một biến thể của chính nó',
  'Fill before the loop turns': 'Dồn trống trước khi vòng lặp quay lại',
  'A short fill on the last bar': 'Một câu dồn ngắn ở ô nhịp cuối',
  'Preview {voice}': 'Nghe thử {voice}',
  'Clear {voice}': 'Xóa {voice}',
  '{voice} step {n}': '{voice}, bước {n}',
  'Kick': 'Trống cái',
  'Snare': 'Trống lẫy',
  'Clap': 'Vỗ tay',
  'Rim': 'Vành trống',
  'Hat': 'Hi-hat',
  'Open Hat': 'Hi-hat mở',
  'Ride': 'Ride',
  'Crash': 'Crash',
  'Tom': 'Tom',
  'Shaker': 'Lắc tay',
  'Rock Standard': 'Rock chuẩn',
  'Cajon & Percussion': 'Cajon và bộ gõ',
  'Acoustic Cajon': 'Cajon mộc',
  'Reggae / Dub': 'Reggae / dub',
  'Jazz Brushes': 'Chổi jazz',
  'Lo-Fi / Chillhop': 'Lo-fi / chillhop',
  'Hard Rock / Metal': 'Hard rock / metal',
  'Rock & Pop': 'Rock và pop',
  'Modern Rock Drive': 'Rock hiện đại thúc đẩy',
  'Pop / Funk 16ths': 'Móc kép pop / funk',
  'Indie Straight-8': 'Indie móc đơn đều',
  'Half-Time Groove': 'Groove nhịp chậm đôi',
  'Motown Pocket': 'Pocket Motown',
  'Punk D-Beat': 'Punk d-beat',
  'Metal Double-Kick': 'Metal đạp đôi',
  'Metal Half-Time': 'Metal nhịp chậm đôi',
  'Funk & Soul': 'Funk và soul',
  'Funk Ghost Notes': 'Nốt bóng funk',
  'Gospel Shuffle': 'Shuffle gospel',
  'Boom Bap': 'Boom bap',
  'Hip-Hop & Lo-Fi': 'Hip-hop và lo-fi',
  'Lo-Fi Chillhop': 'Chillhop lo-fi',
  'Trap': 'Trap',
  'Breakbeat': 'Breakbeat',
  'Electronic & Dance': 'Điện tử và nhảy',
  'Disco Four-on-Floor': 'Disco bốn nhịp sàn',
  'Deep House': 'Deep house',
  'House': 'House',
  'Techno': 'Techno',
  'Latin': 'Latin',
  'Son Montuno (2-3)': 'Son montuno (2-3)',
  'Samba': 'Samba',
  'Partido Alto': 'Partido alto',
  'Merengue': 'Merengue',
  'Cumbia Clásica': 'Cumbia clásica',
  'Cumbia Moderna': 'Cumbia moderna',
  'Soca': 'Soca',
  'Afro-Cuban 6/8': 'Afro-Cuba 6/8',
  'Reggae & Caribbean': 'Reggae và Caribe',
  'Reggae One-Drop': 'Reggae one-drop',
  'Reggae Steppers': 'Reggae steppers',
  'Jazz & Blues': 'Jazz và blues',
  'Jazz Swing Ride': 'Ride swing jazz',
  'Slow Blues Shuffle': 'Shuffle blues chậm',
  'Acoustic & Folk': 'Mộc và folk',
  'Folk Waltz': 'Valse folk',
  'Country Train': 'Country nhịp tàu',
  'Metal': 'Metal',

  // -------------------------------------------------------- chord builder
  'SIZE': 'CỠ',
  'COLOUR': 'MÀU',
  'ALTER': 'BIẾN ÂM',
  'SHAPE': 'THẾ BẤM',
  'Root': 'Thể gốc',
  '1st Inv': 'Thể đảo 1',
  '2nd Inv': 'Thể đảo 2',
  'Drop-2': 'Drop-2',
  'Drop-3': 'Drop-3',
  '↻ Next shape': '↻ Thế bấm tiếp theo',
  '▶ Preview': '▶ Nghe thử',
  'Chord diagram': 'Sơ đồ hợp âm',
  'No playable shape': 'Không có thế bấm nào chơi được',
  'No playable shape for that chord in this tuning.':
    'Không có thế bấm nào chơi được cho hợp âm đó ở kiểu lên dây này.',
  'Open Position': 'Thế mở',
  'Position — {fret}fr': 'Thế bấm — ngăn {fret}',
  'Triad': 'Hợp âm ba',
  'Seventh chord': 'Hợp âm bảy',
  'Ninth': 'Hợp âm chín',
  'Eleventh': 'Hợp âm mười một',
  'Triad — root, third, fifth': 'Hợp âm ba: gốc, quãng ba, quãng năm',
  'Thirteenth — the full stack': 'Hợp âm mười ba: chồng âm đầy đủ',
  'Reset this chord': 'Đặt lại hợp âm này',
  'Reset all': 'Đặt lại tất cả',
  'Add a {alteration}': 'Thêm một {alteration}',
  'Alterations need a seventh — pick 7 or larger first.':
    'Biến âm cần có quãng bảy — hãy chọn 7 trở lên trước.',
  'Diatonic': 'Thuộc điệu thức',
  'Dom 7': 'Dom 7',
  'The chord the key gives you.': 'Hợp âm mà giọng này cho bạn.',
  'A dominant on this degree — the secondary-dominant pull.':
    'Một hợp âm át trên bậc này — sức hút của át phụ.',
  'Third replaced by the fourth. Suspended, wants to resolve.':
    'Quãng ba thay bằng quãng bốn. Treo lơ lửng, muốn được giải quyết.',
  'Third replaced by the second. Open and unresolved.':
    'Quãng ba thay bằng quãng hai. Mở và chưa giải quyết.',
  'Sixth instead of a seventh. Warm, settled, vintage.':
    'Quãng sáu thay cho quãng bảy. Ấm, yên vị, cổ điển.',
  'Ninth added over a triad, with no seventh.': 'Thêm quãng chín lên hợp âm ba, không có quãng bảy.',
  'Fully diminished — a passing chord that leads anywhere.':
    'Giảm hoàn toàn — một hợp âm lướt dẫn đi bất cứ đâu.',
  'Half-diminished. The ii of a minor ii–V–i.': 'Nửa giảm. Chính là ii của một ii–V–i thứ.',
  'Raised fifth, pushing upward.': 'Quãng năm tăng, đẩy đi lên.',
  '{hint} — idiomatic on this degree.': '{hint} — rất tự nhiên trên bậc này.',
  'Plain triad — the chord at its most direct.': 'Hợp âm ba trơn — hợp âm ở dạng thẳng thắn nhất.',
  'Seventh added: the chord gains a direction to move in.':
    'Thêm quãng bảy: hợp âm có được một hướng để đi tới.',
  'Ninth on top — warmth and colour without changing the function.':
    'Quãng chín ở trên — thêm ấm và màu mà không đổi chức năng.',
  'Eleventh — open and suspended over the third.': 'Quãng mười một — mở và treo trên quãng ba.',
  'Thirteenth — the full stack, the sound of a jazz voicing.':
    'Quãng mười ba — chồng âm đầy đủ, âm thanh của một thế bấm jazz.',
  'Diatonic — {role} in this key.': 'Thuộc điệu thức — {role} trong giọng này.',
  'The {alterations} tightens the tension — resolve it by step into the next chord.':
    '{alterations} siết chặt sức căng — hãy giải quyết nó bằng bước liền bậc vào hợp âm sau.',
  ' and ': ' và ',
  'Secondary dominant — the V7 of {target}, so it pulls to the {numeral} chord.':
    'Át phụ — chính là V7 của {target}, nên nó kéo về hợp âm {numeral}.',
  'Borrowed dominant pulling to {target}, which sits outside this key.':
    'Át mượn kéo về {target}, vốn nằm ngoài giọng này.',
  "The key's own dominant, made a true V7 — the strongest pull to the tonic.":
    'Hợp âm át của chính giọng này, làm thành V7 thật sự — sức hút mạnh nhất về chủ âm.',
  'No third, so it is neither major nor minor — it wants the chord after it.':
    'Không có quãng ba nên không trưởng cũng không thứ — nó đòi hợp âm đứng sau.',
  'Symmetrical: it can resolve up a semitone into almost anything.':
    'Đối xứng: nó có thể giải quyết lên một nửa cung vào gần như bất cứ hợp âm nào.',
  'Half-diminished — the ii of a minor ii–V–i, heading for the dominant.':
    'Nửa giảm — ii của một ii–V–i thứ, đang hướng về hợp âm át.',
  'A sixth instead of a seventh: settled rather than in motion.':
    'Quãng sáu thay cho quãng bảy: yên vị hơn là đang chuyển động.',
  'A ninth over a plain triad — colour with no seventh to resolve.':
    'Quãng chín trên một hợp âm ba trơn — có màu mà không có quãng bảy phải giải quyết.',
  "The raised fifth leans upward into the next chord's root or third.":
    'Quãng năm tăng nghiêng lên phía nốt gốc hoặc quãng ba của hợp âm sau.',
  'Solo with {scale}.': 'Solo bằng {scale}.',
  'Careful with {note}.': 'Cẩn thận với {note}.',
  "The key's own notes, starting from this chord's root.":
    'Các nốt của chính giọng này, bắt đầu từ nốt gốc của hợp âm.',
  'Altered (super-locrian)': 'Altered (super-locrian)',
  'Every tension is raised or lowered — this is the scale the ♭9 is asking for.':
    'Mọi âm căng đều được tăng hoặc giảm — đây chính là gam mà ♭9 đang đòi hỏi.',
  'Lydian dominant': 'Lydian át',
  'A dominant with a raised 4th, which is exactly the ♯11.':
    'Một hợp âm át với quãng bốn tăng, tức đúng là ♯11.',
  "The dominant scale. The 4th clashes with the chord's 3rd — pass through it, do not land on it.":
    'Gam của hợp âm át. Quãng bốn nghịch với quãng ba của hợp âm — hãy lướt qua, đừng dừng lại ở đó.',
  'Diminished (half–whole)': 'Giảm (nửa cung–nguyên cung)',
  'Symmetrical, like the chord — it works from any of the four notes.':
    'Đối xứng như chính hợp âm — dùng được từ bất kỳ nốt nào trong bốn nốt.',
  'Locrian ♮2': 'Locrian ♮2',
  'Locrian with the 2nd raised, which keeps the 9th usable.':
    'Locrian với quãng hai được nâng lên, nhờ vậy quãng chín vẫn dùng được.',

  // ------------------------------------------------ suggestions and reasons
  'SUGGESTED NEXT': 'GỢI Ý TIẾP THEO',
  'EVERY CHORD IN THE KEY': 'MỌI HỢP ÂM TRONG GIỌNG',
  'THIS CHORD': 'HỢP ÂM NÀY',
  'THIS LOOP IS A': 'VÒNG LẶP NÀY LÀ',
  'HOW THIS LOOP READS': 'VÒNG LẶP NÀY ĐỌC RA SAO',
  'Follow the key': 'Theo giọng',
  'Remove chord': 'Bỏ hợp âm',
  'Section role': 'Vai trò của đoạn',
  'Smooth voicings': 'Nối thế bấm mượt',
  'Pick shapes that connect, so the hand barely moves':
    'Chọn những thế bấm nối được với nhau, để tay gần như không phải di chuyển',
  'Clear all': 'Xóa tất cả',
  'Done': 'Xong',
  'BAR {n}': 'Ô NHỊP {n}',
  'BAR {n} · {half} HALF': 'Ô NHỊP {n} · NỬA {half}',
  'FIRST': 'ĐẦU',
  'SECOND': 'SAU',
  'Bar {n}': 'Ô nhịp {n}',
  'Split bar into two chords': 'Chia ô nhịp thành hai hợp âm',
  'Clear': 'Xóa',
  '+ Loop': '+ Vòng lặp',
  'Duplicate': 'Nhân bản',
  'Delete': 'Xóa bỏ',
  'Add an empty loop': 'Thêm một vòng lặp trống',
  'Duplicate this loop': 'Nhân bản vòng lặp này',
  'Delete this loop': 'Xóa vòng lặp này',
  'Loop {name}': 'Vòng lặp {name}',
  'Loop name': 'Tên vòng lặp',
  'Starts at the next bar': 'Bắt đầu ở ô nhịp kế tiếp',
  'A big jump from the previous chord — try Smooth voicings.':
    'Một bước nhảy lớn từ hợp âm trước — hãy thử Nối thế bấm mượt.',
  'Fret movement from the previous chord.': 'Khoảng dịch ngăn tính từ hợp âm trước.',
  'Total fret movement across the loop: {cost}.':
    'Tổng khoảng dịch ngăn trong cả vòng lặp: {cost}.',
  'Drop this bar’s own setting and follow the chord variation from Compose.':
    'Bỏ thiết lập riêng của ô nhịp này và theo biến thể hợp âm bên Sáng tác.',
  'This bar already follows the chord variation set in Compose.':
    'Ô nhịp này vốn đã theo biến thể hợp âm đặt bên Sáng tác.',
  'Timeline is empty — add chords, or switch the metronome on.':
    'Dòng thời gian đang trống — hãy thêm hợp âm, hoặc bật máy đập nhịp.',
  'Loaded {chords} chords into {bars} bars.': 'Đã nạp {chords} hợp âm vào {bars} ô nhịp.',
  'Add another chord to hear a progression.': 'Thêm một hợp âm nữa để nghe thành vòng hòa âm.',
  'Perfect cadence': 'Kết trọn',
  'Plagal cadence': 'Kết biến cách',
  'Half cadence': 'Kết nửa',
  'Deceptive cadence': 'Kết lừa',
  'perfect': 'trọn',
  'plagal': 'biến cách',
  'half': 'nửa',
  'any': 'bất kỳ',
  'Dominant to tonic — the section lands.': 'Từ át về chủ — đoạn nhạc đáp xuống.',
  'IV to I — the "amen" ending, softer than a perfect cadence.':
    'Từ IV về I — cái kết “amen”, dịu hơn kết trọn.',
  'Ends on the dominant, unresolved — it hands over to whatever comes next.':
    'Kết ở hợp âm át, chưa giải quyết — nó chuyền tiếp cho bất cứ điều gì đến sau.',
  'The dominant resolves to vi instead of I — the ending is dodged on purpose.':
    'Hợp âm át giải quyết về vi thay vì I — cái kết bị né đi một cách cố ý.',
  'A {section} usually ends with a {expected} cadence; this one ends with a {actual}.':
    'Một {section} thường kết bằng kết {expected}; đoạn này lại kết bằng kết {actual}.',
  'No clear cadence — the section stops rather than ends.':
    'Không có kết rõ ràng — đoạn nhạc dừng lại chứ không kết thúc.',
  'Nothing here acts as a dominant, so the loop stays flat. Try a V7 before the turn.':
    'Ở đây không có gì đóng vai hợp âm át, nên vòng lặp cứ phẳng lì. Hãy thử một V7 trước khi vòng quay lại.',
  'All plain triads. A 7th or 9th on one chord will give the loop a centre of gravity.':
    'Toàn hợp âm ba trơn. Một quãng bảy hay quãng chín trên một hợp âm sẽ cho vòng lặp một trọng tâm.',
  'same chord': 'vẫn hợp âm đó',
  'a move': 'một bước chuyển',
  'down a fifth — the strongest move there is': 'xuống một quãng năm — bước chuyển mạnh nhất có thể có',
  'down a third — two notes stay put': 'xuống một quãng ba — hai nốt đứng yên',
  'up a step': 'lên một bậc',
  'down a step': 'xuống một bậc',
  'up a third': 'lên một quãng ba',
  'up a fifth — a step backwards, used deliberately':
    'lên một quãng năm — một bước lùi, được dùng một cách có chủ ý',
  'opens a {section} well': 'mở đầu một {section} rất tốt',
  'ends a {section} the way it should': 'kết một {section} đúng như nó nên kết',
  'resolving here would spend the tension the {section} is building':
    'giải quyết ở đây sẽ tiêu mất sức căng mà {section} đang dựng lên',
  'the tonic, which states the key outright': 'chủ âm, nói thẳng ra giọng của bài',
  'resolves the dominant': 'giải quyết hợp âm át',
  'subdominant into dominant — the standard approach':
    'từ hạ át sang át — cách tiếp cận chuẩn mực',
  'home straight to the dominant, which is how half a songbook works':
    'từ nhà thẳng tới hợp âm át, cách mà nửa quyển bài hát vẫn dùng',
  'steps away from home': 'bước liền bậc rời khỏi nhà',
  'pulls back from the dominant, which loosens the tension':
    'lùi lại khỏi hợp âm át, khiến sức căng chùng xuống',
  'The m7 — this is the ii of a ii–V, and it wants the dominant.':
    'Hợp âm m7 — đây là ii của một ii–V, và nó đòi hợp âm át.',
  'A m9: the same function, more air.': 'Một m9: cùng chức năng, thoáng hơn.',
  'Suspended, which delays the move.': 'Treo lơ lửng, làm chậm bước chuyển lại.',
  'A maj7 on the subdominant — soft, and it floats.':
    'Một maj7 trên bậc hạ át — dịu, và trôi bồng bềnh.',
  'A 6th chord, the settled vintage sound.': 'Một hợp âm sáu, âm thanh cổ điển đã yên vị.',
  'add9 keeps it a triad but opens it up.': 'add9 giữ nó là hợp âm ba nhưng mở nó ra.',
  'The plain minor triad — the most direct statement of home.':
    'Hợp âm ba thứ trơn — lời tuyên bố về nhà thẳng thắn nhất.',
  'A m7 tonic: home, but still moving.': 'Chủ âm m7: về nhà, mà vẫn còn đang đi.',
  'A m9 tonic, which is where a lot of neo-soul lives.':
    'Chủ âm m9, nơi phần lớn neo-soul sinh sống.',
  'm6 — brighter than it looks, because of the raised 6th.':
    'm6 — sáng hơn vẻ ngoài của nó, nhờ quãng sáu trưởng.',
  'The plain triad — nothing is clearer than this.': 'Hợp âm ba trơn — không gì rõ hơn thế.',
  'maj7 makes the tonic dreamier and less final.':
    'maj7 làm chủ âm mơ màng hơn và bớt dứt điểm.',
  'A 6/9 chord: resolved, but not a full stop.': 'Một hợp âm 6/9: đã giải quyết, nhưng chưa phải dấu chấm hết.',
  'add9 — a triad with light on it.': 'add9 — một hợp âm ba có ánh sáng rọi vào.',
  'A true dominant 7th — the pull home.': 'Một hợp âm bảy át thật sự — sức kéo về nhà.',
  'Add the 9th for warmth without losing the pull.':
    'Thêm quãng chín cho ấm mà không mất đi sức kéo.',
  'A 13th: the full dominant sound.': 'Một quãng mười ba: âm thanh át đầy đủ.',
  'Suspend the third, then release it into the 3rd.':
    'Treo quãng ba lại, rồi thả nó về đúng quãng ba.',
  'With a ♭9 this is the classic minor-key dominant.':
    'Với một ♭9, đây là hợp âm át kinh điển của giọng thứ.',
  'Half-diminished is how this degree is normally voiced — it heads for the dominant.':
    'Nửa giảm là cách bậc này thường được dựng — nó hướng về hợp âm át.',
  'The bare diminished triad, which is harsher and rarely held.':
    'Hợp âm ba giảm trần trụi, gắt hơn và hiếm khi được giữ lâu.',
  'Fully diminished, as a passing chord between two neighbours.':
    'Giảm hoàn toàn, dùng làm hợp âm lướt giữa hai hợp âm kề bên.',

  // ------------------------------------------------------- song structures
  'Intro': 'Dạo đầu',
  'Verse': 'Phiên khúc',
  'Pre-Chorus': 'Tiền điệp khúc',
  'Chorus': 'Điệp khúc',
  'Bridge': 'Đoạn cầu',
  'Outro': 'Kết bài',
  'Apply': 'Áp dụng',
  'Apply to timeline': 'Áp dụng vào dòng thời gian',
  'Establish the key without spending the big moment.':
    'Xác lập giọng mà chưa tiêu mất khoảnh khắc lớn.',
  'A loop that can carry many different melodies.':
    'Một vòng lặp có thể đỡ được nhiều giai điệu khác nhau.',
  'Climb, and hand the chorus an unresolved dominant.':
    'Leo lên, rồi trao cho điệp khúc một hợp âm át chưa giải quyết.',
  'The strongest, plainest statement of the key.':
    'Lời tuyên bố mạnh nhất và mộc nhất về giọng của bài.',
  'Leave home so returning means something.': 'Rời nhà để việc quay về có ý nghĩa.',
  'Land, or vamp somewhere restful.': 'Đáp xuống, hoặc lặp vòng ở một chỗ nghỉ ngơi.',
  'Simple & Open': 'Đơn giản và thoáng',
  'Suspended Mood': 'Không khí treo lơ lửng',
  'Single-Chord Drone': 'Ngân một hợp âm',
  'Dominant Tease': 'Nhử bằng hợp âm át',
  'Establishes the key calmly before the verse enters.':
    'Xác lập giọng một cách điềm tĩnh trước khi phiên khúc vào.',
  'Opens on a softer, unresolved colour.': 'Mở ra bằng một màu dịu hơn, chưa giải quyết.',
  'Holds the tonic so the first vocal line does the work.':
    'Giữ chủ âm để câu hát đầu tiên làm phần việc của nó.',
  'Starts on tension and resolves into bar one.':
    'Bắt đầu bằng sức căng rồi giải quyết vào ô nhịp một.',
  'Narrative Motion': 'Chuyển động kể chuyện',
  'Understated': 'Kiềm chế',
  'Descending Line': 'Bè đi xuống',
  'Minor Verse': 'Phiên khúc thứ',
  'Steady storytelling motion, familiar and grounded.':
    'Chuyển động kể chuyện đều đặn, quen thuộc và vững chân đất.',
  'Restrained — leaves room for the chorus to lift.':
    'Kiềm chế — chừa chỗ cho điệp khúc bốc lên.',
  'The axis loop, which never tires of being sung over.':
    'Vòng lặp trục, hát lên trên bao nhiêu cũng không chán.',
  'Same chords starting on the relative minor — darker footing.':
    'Vẫn những hợp âm ấy nhưng bắt đầu từ giọng thứ song song — nền tối hơn.',
  'Rising Tension': 'Sức căng dâng lên',
  'Stepwise Build': 'Dựng dần theo bậc',
  'Hold the Five': 'Giữ bậc năm',
  'Climbs and holds the dominant so the chorus can release it.':
    'Leo lên và giữ hợp âm át để điệp khúc được thả nó ra.',
  'Walks up the scale — momentum without a key change.':
    'Đi ngược lên theo gam — có đà mà không phải chuyển giọng.',
  'Two chords, twice as long each. Maximum anticipation.':
    'Hai hợp âm, mỗi cái dài gấp đôi. Chờ đợi tối đa.',
  'Big Lift': 'Cú nâng lớn',
  'Anthemic': 'Như một bài ca chung',
  'Plagal Power': 'Sức mạnh biến cách',
  'Minor Hook': 'Câu móc giọng thứ',
  'Climbs above the verse for a euphoric hook.':
    'Leo lên cao hơn phiên khúc để có một câu móc phấn khích.',
  'Instantly singable — the classic pop lift.':
    'Hát theo được ngay — cú nâng pop kinh điển.',
  'Tonic and subdominant only. Hymn-like and immovable.':
    'Chỉ chủ âm và hạ át. Như thánh ca, không lay chuyển.',
  'Begins minor and resolves major — bittersweet.':
    'Bắt đầu ở thứ và giải quyết về trưởng — ngọt đắng lẫn lộn.',
  'Harmonic Detour': 'Đường vòng hòa âm',
  'Mediant Shift': 'Dịch sang bậc ba',
  'Relative Minor': 'Giọng thứ song song',
  'Suspended Halt': 'Dừng lại treo lơ lửng',
  'Borrows jazz motion to contrast the chorus.':
    'Mượn chuyển động của jazz để tương phản với điệp khúc.',
  'A brief modal colour before the final chorus.':
    'Một chút màu điệu thức ngắn trước điệp khúc cuối.',
  'Moves the centre of gravity to the relative minor.':
    'Dời trọng tâm sang giọng thứ song song.',
  'Two chords, held. The pause before the last chorus.':
    'Hai hợp âm, giữ ngân. Khoảng lặng trước điệp khúc cuối.',
  'Fade Home': 'Nhỏ dần về nhà',
  'Loop & Dissolve': 'Lặp rồi tan',
  'Plagal Amen': 'Amen biến cách',
  'Unresolved': 'Chưa giải quyết',
  'A final cadence that settles the song.': 'Một kết cuối cùng đặt bài hát xuống yên vị.',
  'A gentle vamp to fade out on.': 'Một vòng lặp nhẹ để nhỏ dần rồi tắt.',
  'The IV–I "amen" cadence — restful, conclusive.':
    'Kết “amen” IV–I — nghỉ ngơi, dứt khoát.',
  'Ends on the dominant, leaving the question open.':
    'Kết ở hợp âm át, để ngỏ câu hỏi.',

  // ---------------------------------------------------------------- moods
  'EVERYTHING BELOW IS IN': 'MỌI THỨ BÊN DƯỚI ĐỀU Ở GIỌNG',
  '🔒 locked — suggestions stay in this key':
    '🔒 đã khóa — các gợi ý vẫn ở trong giọng này',
  'unlocked — a suggestion may bring its own mode':
    'đã mở khóa — một gợi ý có thể mang theo điệu thức riêng của nó',
  'Melancholic': 'U sầu',
  'Energetic': 'Đầy năng lượng',
  'Dreamy': 'Mơ màng',
  'Heroic': 'Hào hùng',
  'Bluesy': 'Đậm chất blues',
  'Epic': 'Hùng tráng',
  'Dark': 'Tối',
  'Hopeful': 'Hy vọng',
  'Nostalgic': 'Hoài niệm',
  'Hypnotic': 'Thôi miên',
  'Sophisticated': 'Tinh tế',
  'Restless': 'Bồn chồn',
  'Tender': 'Dịu dàng',
  'Triumphant': 'Khải hoàn',
  'Begins on the relative minor and circles home without ever quite settling.':
    'Bắt đầu ở giọng thứ song song rồi vòng về nhà mà chẳng bao giờ thật sự yên vị.',
  'Primary triads, no minor chords, constant forward push.':
    'Toàn hợp âm ba chính, không hợp âm thứ nào, luôn đẩy tới trước.',
  'Lydian major sevenths — the raised 4th keeps the tonic floating.':
    'Những hợp âm bảy trưởng kiểu Lydian — quãng bốn tăng giữ chủ âm bồng bềnh.',
  'Tonic and subdominant trading places, then the dominant to lift it.':
    'Chủ âm và hạ át đổi chỗ cho nhau, rồi hợp âm át nâng nó lên.',
  'Dominant sevenths on every degree — grit rather than sweetness.':
    'Hợp âm bảy át trên mọi bậc — sạn sỏi chứ không ngọt ngào.',
  'Minor tonic under three major chords. Scale without brightness.':
    'Chủ âm thứ nằm dưới ba hợp âm trưởng. Hoành tráng mà không sáng.',
  'The ♭2 pressing against the tonic — unresolved and menacing.':
    '♭2 ép sát vào chủ âm — chưa giải quyết và đầy đe dọa.',
  'Starts away from the tonic so arriving home reads as relief.':
    'Bắt đầu xa chủ âm để khi về tới nhà nghe như một sự nhẹ nhõm.',
  'The doo-wop turnaround. Familiar to the point of comfort.':
    'Vòng quay doo-wop. Quen tới mức thấy dễ chịu.',
  'Two chords, minor with a major 6th. Built for playing over.':
    'Hai hợp âm, thứ với quãng sáu trưởng. Sinh ra để chơi ngẫu hứng lên trên.',
  'ii–V–I with sevenths throughout — the jazz cadence.':
    'ii–V–I với quãng bảy suốt cả vòng — kết của jazz.',
  'A stepwise descent that keeps arriving somewhere new.':
    'Một đường đi xuống liền bậc cứ liên tục tới một chỗ mới.',
  'Gentle mediant motion — close voicings, little movement in the bass.':
    'Chuyển động bậc ba dịu dàng — thế bấm khít, bè trầm ít di chuyển.',
  'The ♭VII gives it swagger without losing the major tonic.':
    '♭VII cho nó dáng vẻ ngông nghênh mà không đánh mất chủ âm trưởng.',

  // ------------------------------------------------- progression library
  'FAMILY': 'NHÓM',
  'Progression family': 'Nhóm vòng hòa âm',
  'All families ({n})': 'Tất cả các nhóm ({n})',
  'Search name, numerals, or a song…': 'Tìm theo tên, số bậc, hoặc một bài hát…',
  'Search progressions': 'Tìm vòng hòa âm',
  '{n} PROGRESSION': '{n} VÒNG HÒA ÂM',
  '{n} PROGRESSIONS': '{n} VÒNG HÒA ÂM',
  'MATCHING “{query}”': 'KHỚP VỚI “{query}”',
  'Nothing matches that. Try a song name, a chord, or clear the search.':
    'Không có gì khớp cả. Thử tên một bài hát, một hợp âm, hoặc xóa ô tìm kiếm.',
  "Pick a family or search, then tap a progression to open it — you'll hear it in the current key. Apply writes it to the timeline. Numerals and chord names are computed from what will actually play.":
    'Chọn một nhóm hoặc tìm kiếm, rồi chạm vào một vòng hòa âm để mở nó — bạn sẽ nghe nó ở giọng hiện tại. Áp dụng sẽ ghi nó vào dòng thời gian. Số bậc và tên hợp âm được tính từ chính những gì sẽ vang lên.',
  '▶ Hear it': '▶ Nghe thử',
  'HEARD IN': 'NGHE THẤY TRONG',
  '{n} bar': '{n} ô nhịp',
  '{n} bars': '{n} ô nhịp',
  '(written in {mode})': '(viết ở {mode})',
  'Previewing {name} — tap Apply to keep it.':
    'Đang nghe thử {name} — chạm Áp dụng để giữ lại.',
  'Stop playback to preview a progression.':
    'Hãy dừng phát để nghe thử một vòng hòa âm.',
  'Pop & Rock': 'Pop và rock',
  'Modal Rock': 'Rock điệu thức',
  'Minor Keys': 'Giọng thứ',
  'Jazz': 'Jazz',
  'Jazz & Neo-Soul': 'Jazz và neo-soul',
  'Blues': 'Blues',
  'Folk & Country': 'Folk và country',
  'Handbook': 'Sổ tay',
  'Axis of Awesome': 'Bốn hợp âm thần thánh',
  'Axis, Minor Start': 'Bốn hợp âm, bắt đầu từ thứ',
  '50s Doo-Wop': 'Doo-wop thập niên 50',
  'Three-Chord Rock': 'Rock ba hợp âm',
  'Pop-Punk Lift': 'Cú nâng pop-punk',
  'Ballad Climb': 'Ballad leo dốc',
  "Pachelbel's Canon": 'Canon của Pachelbel',
  'The four chords behind a startling share of the charts. Endlessly singable.':
    'Bốn hợp âm đứng sau một phần đáng kinh ngạc của các bảng xếp hạng. Hát mãi không chán.',
  'The same loop rotated to begin on the relative minor — wistful rather than triumphant.':
    'Vẫn vòng lặp ấy, xoay lại để bắt đầu từ giọng thứ song song — man mác chứ không khải hoàn.',
  'Ballads, prom scenes, "Stand By Me". Warm and instantly nostalgic.':
    'Ballad, cảnh dạ hội, “Stand By Me”. Ấm áp và gợi nhớ ngay lập tức.',
  'The primary triads and nothing else. Direct, and hard to make sound wrong.':
    'Chỉ những hợp âm ba chính, không gì khác. Thẳng thắn, và khó mà chơi sai.',
  'Starts away from home so the chorus lands as a return.':
    'Bắt đầu xa nhà để điệp khúc đáp xuống như một cuộc trở về.',
  'A stepwise rise through the scale — builds tension without a key change.':
    'Một đường đi lên liền bậc qua gam — dựng sức căng mà không phải chuyển giọng.',
  'A descending sequence that has outlived three centuries of fashion.':
    'Một chuỗi đi xuống đã sống lâu hơn ba thế kỷ thời trang.',
  'Mixolydian Rock': 'Rock Mixolydian',
  'Dorian Vamp': 'Vòng lặp Dorian',
  'Grunge ♭VI–♭VII': 'Grunge ♭VI–♭VII',
  'Lydian Lift': 'Cú nâng Lydian',
  'Phrygian Descent': 'Đường xuống Phrygian',
  'The ♭VII is what makes this rock rather than pop — think "Sweet Home Alabama".':
    '♭VII là thứ khiến cái này thành rock chứ không phải pop — hãy nghĩ tới “Sweet Home Alabama”.',
  'Minor with a bright 6th. Hypnotic, jam-friendly, never fully sad.':
    'Giọng thứ với quãng sáu sáng. Thôi miên, dễ chơi ngẫu hứng, chẳng bao giờ buồn hẳn.',
  'Heavy and modal — the flat 6th and 7th give it the weight.':
    'Nặng và đậm điệu thức — quãng sáu và bảy giáng cho nó sức nặng.',
  'The ♯4 floats the tonic. Cinematic wonder in two chords.':
    '♯4 làm chủ âm bồng bềnh. Sự kỳ diệu như trong phim, gói trong hai hợp âm.',
  'The ♭2 leaning on the tonic — flamenco and metal share this one.':
    '♭2 tì lên chủ âm — flamenco và metal cùng dùng chung cái này.',
  'Andalusian Cadence': 'Kết Andalusia',
  'Epic Minor': 'Giọng thứ hùng tráng',
  'Minor Ballad': 'Ballad giọng thứ',
  'Minor Climb': 'Leo dốc giọng thứ',
  'A stepwise descent from the tonic. Dramatic, and older than most of what it appears in.':
    'Một đường đi xuống liền bậc từ chủ âm. Kịch tính, và già hơn phần lớn những bài nó xuất hiện.',
  'i–VI–III–VII. Trailers, anthems, anything that needs scale.':
    'i–VI–III–VII. Trailer phim, ca khúc hiệu triệu, bất cứ thứ gì cần tầm vóc.',
  'The doo-wop shape in minor — familiar bones, darker colour.':
    'Hình doo-wop ở giọng thứ — vẫn bộ xương quen thuộc, màu tối hơn.',
  'Rises through the relative major before falling back to the tonic.':
    'Đi lên qua giọng trưởng song song rồi rơi trở về chủ âm.',
  'ii–V–I Turnaround': 'Vòng quay ii–V–I',
  'Rhythm Changes A': 'Rhythm changes A',
  'Bossa Turnaround': 'Vòng quay bossa',
  'Jazz Blues Head': 'Chủ đề blues jazz',
  'Circle of Fifths Run': 'Chạy vòng quãng năm',
  'The central cadence of jazz. Learn it in all twelve keys and half the language follows.':
    'Cái kết trung tâm của jazz. Học nó ở cả mười hai giọng thì một nửa ngôn ngữ jazz tự đến.',
  'I–vi–ii–V, the most-played eight bars in the standard repertoire.':
    'I–vi–ii–V, tám ô nhịp được chơi nhiều nhất trong kho bài chuẩn mực.',
  'Major sevenths and a gentle ii–V. Nylon strings and brushes.':
    'Những hợp âm bảy trưởng và một ii–V dịu dàng. Dây nylon và chổi trống.',
  'Dominant sevenths throughout — the blues with a jazz accent.':
    'Hợp âm bảy át suốt cả bài — blues với giọng jazz.',
  'Root movement by fourths all the way home — every chord pulls to the next.':
    'Nốt gốc đi theo quãng bốn suốt đường về nhà — mỗi hợp âm kéo lấy hợp âm sau.',
  'Neo-Soul Loop': 'Vòng lặp neo-soul',
  'Half-Diminished ii–V–i': 'ii–V–i nửa giảm',
  'Minor ii–V–i with a ♭9': 'ii–V–i thứ với ♭9',
  'Sus4 Release': 'Thả sus4',
  '6/9 Turnaround': 'Vòng quay 6/9',
  'Secondary Dominant Cycle': 'Chu trình át phụ',
  'Dorian with ninths on everything. The major IV is what makes Dorian sound like Dorian rather than minor.':
    'Dorian với quãng chín trên mọi hợp âm. Bậc IV trưởng chính là thứ khiến Dorian nghe ra Dorian chứ không phải giọng thứ.',
  'The textbook minor cadence: iiø7 sets up the dominant, the dominant lands on a m9.':
    'Cái kết giọng thứ trong sách giáo khoa: iiø7 dọn đường cho hợp âm át, hợp âm át đáp xuống một m9.',
  'Dm9 – E7♭9 – Am9 in A minor. The v has to be borrowed as a dominant to pull home, and the ♭9 is the note that makes it ache.':
    'Dm9 – E7♭9 – Am9 ở giọng La thứ. Bậc v phải được mượn thành hợp âm át thì mới kéo được về nhà, và ♭9 là nốt làm nó nhức nhối.',
  'Hold the 4th, then let it fall to the 3rd. The oldest tension-and-release there is.':
    'Giữ quãng bốn lại, rồi thả nó rơi xuống quãng ba. Cặp căng–giãn xưa nhất từng có.',
  'A 6/9 tonic never quite sits down, so the loop keeps turning. The 13th on the V is the full jazz dominant.':
    'Một chủ âm 6/9 chẳng bao giờ ngồi hẳn xuống, nên vòng lặp cứ quay tiếp. Quãng mười ba trên bậc V là hợp âm át jazz đầy đủ.',
  'Every chord is the dominant of the next. Each borrowed 7th pulls a fifth down into the chord after it.':
    'Mỗi hợp âm là hợp âm át của hợp âm kế tiếp. Mỗi quãng bảy mượn về kéo xuống một quãng năm vào hợp âm sau nó.',
  '12-Bar Blues': 'Blues 12 ô nhịp',
  '12-Bar Quick Change': 'Blues 12 ô nhịp đổi nhanh',
  'Minor Blues': 'Blues giọng thứ',
  'The form. Twelve bars, three chords, a century of music.':
    'Cấu trúc kinh điển. Mười hai ô nhịp, ba hợp âm, một thế kỷ âm nhạc.',
  'Moves to the IV in bar two — more motion early on.':
    'Sang bậc IV ngay ở ô nhịp hai — chuyển động nhiều hơn ngay từ đầu.',
  'The same twelve bars in minor. Slower, heavier, more room to bend.':
    'Vẫn mười hai ô nhịp ấy nhưng ở giọng thứ. Chậm hơn, nặng hơn, rộng chỗ để miết dây.',
  'Country I–IV–V': 'Country I–IV–V',
  'Folk Circle': 'Vòng tròn folk',
  'Celtic Vamp': 'Vòng lặp Celtic',
  'The three chords most songs are made of.': 'Ba hợp âm làm nên phần lớn các bài hát.',
  'Home, away, home, away. The campfire progression.':
    'Về nhà, đi xa, về nhà, đi xa. Vòng hòa âm của lửa trại.',
  'The ♭VII again, this time in a jig. Works beautifully in DADGAD.':
    'Lại là ♭VII, lần này trong một điệu jig. Nghe rất đẹp ở kiểu lên dây DADGAD.',

  // ------------------------------------------------------------- handbook
  '1 · Single Major Chord': '1 · Một hợp âm trưởng duy nhất',
  '2 · Single Minor Chord': '2 · Một hợp âm thứ duy nhất',
  '3 · Tonic–Dominant, Major': '3 · Chủ–át, giọng trưởng',
  '4 · Tonic–Dominant, Minor': '4 · Chủ–át, giọng thứ',
  '5 · Tonic–Subdominant': '5 · Chủ–hạ át',
  '6 · Major to Relative Minor': '6 · Từ trưởng sang thứ song song',
  '7 · I–IV–V': '7 · I–IV–V',
  '8 · I–IV–V, Plagal Cadence': '8 · I–IV–V, kết biến cách',
  '9 · I–IV–V–IV': '9 · I–IV–V–IV',
  '10 · Minor to ♭III': '10 · Từ thứ sang ♭III',
  '11 · Minor to ♭VII': '11 · Từ thứ sang ♭VII',
  '12 · Doo-Wop / Ice Cream': '12 · Doo-wop / kem que',
  '12A · I–V–vi–IV': '12A · I–V–vi–IV',
  '12B · I–IV–vi–V': '12B · I–IV–vi–V',
  '13 · Rhythm Changes': '13 · Rhythm changes',
  '13B · Secondary Dominants': '13B · Át phụ',
  '13D · The Turnaround': '13D · Vòng quay',
  '14 · ii–V–I–IV': '14 · ii–V–I–IV',
  '15 · Modal with ii and IV': '15 · Điệu thức với ii và IV',
  '16 · I–♭VII–IV–I': '16 · I–♭VII–IV–I',
  '18 · i–♭III–♭VII–i': '18 · i–♭III–♭VII–i',
  '19 · Andalusian Cadence': '19 · Kết Andalusia',
  "20 · Pachelbel's Canon": '20 · Canon của Pachelbel',
  'One chord, held. Everything else in music is a departure from this.':
    'Một hợp âm, giữ ngân. Mọi thứ khác trong âm nhạc đều là một cuộc ra đi từ đây.',
  'The same drone in minor. A whole song can live here.':
    'Vẫn tiếng ngân ấy ở giọng thứ. Cả một bài hát có thể sống ở đây.',
  'Away and back. The smallest complete musical sentence there is.':
    'Đi và về. Câu nhạc trọn vẹn nhỏ nhất từng có.',
  'The same two-chord motion with a minor tonic — darker, and it leans harder.':
    'Vẫn chuyển động hai hợp âm ấy nhưng với chủ âm thứ — tối hơn, và tì mạnh hơn.',
  'Away and back without tension. Restful where the dominant is restless.':
    'Đi và về mà không có sức căng. Yên nghỉ ở chỗ mà hợp âm át thì bồn chồn.',
  'The same seven notes, seen from its shadow.':
    'Vẫn bảy nốt ấy, nhìn từ phía cái bóng của nó.',
  'Ends IV to I rather than V to I — the softer landing.':
    'Kết từ IV về I thay vì V về I — cú đáp dịu hơn.',
  'Sits on the tonic before moving — leaves space for the vocal.':
    'Ngồi lại trên chủ âm rồi mới đi — chừa chỗ cho giọng hát.',
  'Minor tonic to its relative major. Used alone, or to open something longer.':
    'Từ chủ âm thứ sang giọng trưởng song song của nó. Dùng riêng, hoặc để mở màn một thứ dài hơi hơn.',
  'Minor, its relative major, and the subtonic. Endlessly loopable.':
    'Giọng thứ, giọng trưởng song song của nó, và bậc bảy giáng. Lặp mãi không hết.',
  'The same four chords rotated. Probably the most recorded loop alive.':
    'Vẫn bốn hợp âm ấy, xoay đi. Có lẽ là vòng lặp được thu âm nhiều nhất còn sống.',
  'The subdominant arrives early, so the minor lands harder.':
    'Bậc hạ át đến sớm, nên hợp âm thứ đáp xuống mạnh hơn.',
  'I–vi–ii–V. The circle of fifths, walked backwards, four bars at a time.':
    'I–vi–ii–V. Vòng quãng năm, đi ngược lại, mỗi lần bốn ô nhịp.',
  'Each chord turned into the dominant of the next, so the loop pulls all the way round.':
    'Mỗi hợp âm được biến thành hợp âm át của hợp âm sau, nên vòng lặp kéo suốt cả vòng.',
  'iii–vi–ii–V. Tacked on the end to extend an ending, in show tunes and jazz.':
    'iii–vi–ii–V. Gắn thêm vào cuối để kéo dài cái kết, trong nhạc kịch và jazz.',
  'The jazz cadence, then straight out to the subdominant instead of resting.':
    'Cái kết của jazz, rồi đi thẳng ra bậc hạ át thay vì nghỉ lại.',
  'Stepwise out of the tonic. Modern pop leans on this constantly.':
    'Rời chủ âm bằng bước liền bậc. Pop hiện đại tựa vào cái này liên tục.',
  'Mixolydian rock. The ♭VII is what stops it sounding like a hymn.':
    'Rock Mixolydian. ♭VII là thứ ngăn nó nghe ra như một bài thánh ca.',
  'The first chord from outside the major scale. Modal, and instantly modern.':
    'Hợp âm đầu tiên lấy từ ngoài gam trưởng. Đậm điệu thức, và hiện đại ngay lập tức.',
  'The loop that never resolves, so it can go round forever.':
    'Vòng lặp không bao giờ giải quyết, nên nó có thể quay mãi mãi.',
  'Stepwise descending, out of Flamenco. The V7 at the bottom is what makes it Spanish rather than merely minor.':
    'Đi xuống liền bậc, ra từ flamenco. Hợp âm V7 ở cuối mới là thứ khiến nó mang chất Tây Ban Nha chứ không chỉ là giọng thứ.',
  'Eight bars from 1680 that pop music has never stopped borrowing.':
    'Tám ô nhịp từ năm 1680 mà nhạc pop chưa từng ngừng vay mượn.',
  'I–vi–IV–V. Fifty years of hits and it still has not worn out.':
    'I–vi–IV–V. Năm mươi năm ăn khách mà vẫn chưa mòn.',

  // ---------------------------------------------------------------- tuner
  'Instrument': 'Nhạc cụ',
  'Tuning meter': 'Đồng hồ lên dây',
  'A4 = {hz} Hz': 'A4 = {hz} Hz',
  'Signal:': 'Tín hiệu:',
  'Status:': 'Trạng thái:',
  'Freq: —': 'Tần số: —',
  'Freq: {hz}Hz': 'Tần số: {hz} Hz',
  'listening': 'đang nghe',
  'LOCKED': 'ĐÚNG DÂY',
  'FLAT': 'THẤP',
  'SHARP': 'CAO',
  'START LISTENING': 'BẮT ĐẦU NGHE',
  'STOP LISTENING': 'NGỪNG NGHE',
  'Auto': 'Tự động',
  'AUTO': 'TỰ ĐỘNG',
  'Manual': 'Thủ công',
  'MANUAL · {note}': 'THỦ CÔNG · {note}',
  'OPTIONS': 'TÙY CHỌN',
  'TARGET': 'MỤC TIÊU',
  'REFERENCE TONE': 'ÂM CHUẨN',
  'CHIME WHEN IN TUNE': 'BÁO KHI ĐÚNG DÂY',
  'SENSITIVITY': 'ĐỘ NHẠY',
  'RESPONSE': 'ĐỘ ĐÁP ỨNG',
  'IN-TUNE WINDOW': 'BIÊN ĐỘ ĐÚNG DÂY',
  'REFERENCE A4': 'A4 CHUẨN',
  'Follows the nearest string in the tuning': 'Bám theo dây gần nhất trong kiểu lên dây',
  'Holds the string you pinned': 'Giữ nguyên dây bạn đã ghim',
  'Follows whichever string of the tuning is nearest to what it hears':
    'Bám theo dây nào của kiểu lên dây gần nhất với thứ nó nghe được',
  'Stays on the pinned string, however far out it is':
    'Ở lại dây đã ghim, dù nó lệch xa đến đâu',
  'Sine': 'Hình sin',
  'Warm': 'Ấm',
  'String': 'Dây đàn',
  'Tapping a string pins it without sounding anything.':
    'Chạm vào một dây sẽ ghim nó lại mà không phát ra tiếng gì.',
  'A clean sine, sounded once. Tap again to hear it again.':
    'Một sóng sin sạch, vang lên một lần. Chạm lần nữa để nghe lại.',
  'A triangle — rounder, and easier to pitch against.':
    'Sóng tam giác — tròn hơn, và dễ so cao độ hơn.',
  'One pluck of the guitar itself, on the melody voices.':
    'Một tiếng gảy của chính cây đàn, ở các bè giai điệu.',
  'A short two-note chime the moment a string settles':
    'Một tiếng chuông hai nốt ngắn ngay khi dây đàn ổn định',
  'Silent — watch the dial': 'Im lặng — hãy nhìn mặt đồng hồ',
  'Low': 'Thấp',
  'Normal': 'Bình thường',
  'High': 'Cao',
  'Steady': 'Ổn định',
  'Quick': 'Nhanh',
  'The default': 'Mặc định',
  'The default; below what most ears hear': 'Mặc định; thấp hơn ngưỡng phần lớn tai người nghe được',
  'Ignores everything quiet — for noisy rooms': 'Bỏ qua mọi thứ nhỏ tiếng — dành cho phòng ồn',
  'Hears a soft, decaying note for longer': 'Nghe được lâu hơn một nốt nhẹ đang tắt dần',
  'Slower needle, less jitter': 'Kim chậm hơn, ít rung hơn',
  'Follows the string immediately': 'Bám theo dây đàn ngay lập tức',
  'Studio — hard to hold, exact when it locks': 'Phòng thu — khó giữ, nhưng chính xác khi đã bắt được',
  'Forgiving — locks quickly on stage': 'Dễ tính — bắt nhanh khi ở trên sân khấu',
  'Uses the microphone. Nothing is recorded or sent anywhere.':
    'Dùng micrô. Không có gì được ghi lại hay gửi đi đâu cả.',
  'Listening is unavailable here — the page CircleSong is embedded in withholds the microphone.':
    'Ở đây không nghe được — trang đang nhúng CircleSong không cho phép dùng micrô.',
  'Open CircleSong at its own address to listen. Tap a string to hear its exact pitch and tune by ear — that works anywhere.':
    'Hãy mở CircleSong ở địa chỉ riêng của nó để nghe. Chạm một dây để nghe đúng cao độ của nó và lên dây bằng tai — cách đó chỗ nào cũng dùng được.',
  'Audio could not start, so the tuner cannot listen.':
    'Âm thanh không khởi động được, nên bộ lên dây không thể nghe.',
  'This browser does not offer microphone access to the page.':
    'Trình duyệt này không cho trang truy cập micrô.',
  'The page CircleSong is embedded in has not granted it the microphone, so it cannot even ask.':
    'Trang đang nhúng CircleSong chưa cấp micrô cho nó, nên nó thậm chí không thể hỏi xin.',
  'Open CircleSong from its own address — the installed app, or the copy served from GitHub — and listening will work.':
    'Hãy mở CircleSong từ địa chỉ riêng của nó — ứng dụng đã cài, hoặc bản chạy từ GitHub — thì việc nghe sẽ hoạt động.',
  'Meanwhile you can tune by ear: tap a string above to hear its exact pitch.':
    'Trong lúc đó bạn có thể lên dây bằng tai: chạm một dây ở trên để nghe đúng cao độ của nó.',
  'Microphone access was refused. Allow it for this page in your browser’s site settings, then switch Listen on again. You can tune by ear in the meantime — tap a string above to hear its pitch.':
    'Quyền dùng micrô đã bị từ chối. Hãy cho phép trang này trong phần cài đặt trang web của trình duyệt, rồi bật Nghe lại. Trong lúc chờ, bạn có thể lên dây bằng tai — chạm một dây ở trên để nghe cao độ của nó.',
  'No microphone was found on this device. Tap a string above to hear its pitch and tune by ear.':
    'Không tìm thấy micrô nào trên thiết bị này. Hãy chạm một dây ở trên để nghe cao độ và lên dây bằng tai.',
  'The microphone could not be opened — {error}.':
    'Không mở được micrô — {error}.',
  'unknown error': 'lỗi không rõ',
  'Guitar': 'Ghi-ta',
  'Bass': 'Ghi-ta bass',
  'Ukulele': 'Ukulele',
  'Mandolin': 'Mandolin',
  'Banjo': 'Banjo',
  'Violin': 'Vĩ cầm',
  'Cello / Viola': 'Cello / viola',
  'Chromatic': 'Bán cung',
  'Chromatic — play any note and it will be named. Tap one to hear it.':
    'Bán cung — chơi bất kỳ nốt nào rồi nó sẽ gọi tên nốt đó. Chạm một nốt để nghe.',
  'Standard — E A D G B E': 'Chuẩn — E A D G B E',
  'Drop D — D A D G B E': 'Drop D — D A D G B E',
  'Half step down — E♭ A♭ D♭ G♭ B♭ E♭': 'Hạ nửa cung — E♭ A♭ D♭ G♭ B♭ E♭',
  'Full step down — D G C F A D': 'Hạ nguyên cung — D G C F A D',
  'Open G — D G D G B D': 'Mở G — D G D G B D',
  'Open D — D A D F♯ A D': 'Mở D — D A D F♯ A D',
  'DADGAD — D A D G A D': 'DADGAD — D A D G A D',
  'Drop C — C G C F A D': 'Drop C — C G C F A D',
  '7-string — B E A D G B E': '7 dây — B E A D G B E',
  'Standard 4-string — E A D G': 'Chuẩn 4 dây — E A D G',
  'Drop D — D A D G': 'Drop D — D A D G',
  'Half step down — E♭ A♭ D♭ G♭': 'Hạ nửa cung — E♭ A♭ D♭ G♭',
  'Standard 5-string — B E A D G': 'Chuẩn 5 dây — B E A D G',
  'Standard high-G — G C E A': 'Chuẩn G cao — G C E A',
  'Low-G — G C E A': 'G trầm — G C E A',
  'D tuning — A D F♯ B': 'Lên dây theo D — A D F♯ B',
  'Baritone — D G B E': 'Baritone — D G B E',
  'Standard — G D A E': 'Chuẩn — G D A E',
  'Open G — F♯ D A D': 'Mở G — F♯ D A D',
  'Open G 5-string — g D G B D': 'Mở G 5 dây — g D G B D',
  'Double C — g C G C D': 'C kép — g C G C D',
  'Sawmill — g D G C D': 'Sawmill — g D G C D',
  'Cello — C G D A': 'Cello — C G D A',
  'Viola — C G D A': 'Viola — C G D A',
  'Any note — C1 to B6': 'Nốt bất kỳ — từ C1 đến B6',

  // ---------------------------------------------------------------- songs
  'CURRENT SONG': 'BÀI HÁT HIỆN TẠI',
  'Save': 'Lưu',
  'Save as new': 'Lưu thành bài mới',
  'New song': 'Bài hát mới',
  'Open': 'Mở',
  'Import a song file': 'Nhập một tệp bài hát',
  'Nothing saved yet.': 'Chưa lưu gì cả.',
  'Nothing saved yet. Save the current song to start a library.':
    'Chưa lưu gì cả. Hãy lưu bài hát hiện tại để bắt đầu một thư viện.',
  '{n} loop': '{n} vòng lặp',
  '{n} loops': '{n} vòng lặp',
  '{n} bar written': 'đã viết {n} ô nhịp',
  '{n} bars written': 'đã viết {n} ô nhịp',
  'saved': 'đã lưu',
  'just now': 'vừa xong',
  '{n} min ago': '{n} phút trước',
  '{n} h ago': '{n} giờ trước',
  'Delete “{name}”? This cannot be undone.': 'Xóa “{name}”? Việc này không thể hoàn tác.',
  'Project deleted.': 'Đã xóa dự án.',
  'That project could not be read.': 'Không đọc được dự án đó.',
  'Opened “{name}”.': 'Đã mở “{name}”.',
  'Saved “{name}”.': 'Đã lưu “{name}”.',
  'Loaded “{name}”.': 'Đã nạp “{name}”.',
  'This browser will not let the app save locally.':
    'Trình duyệt này không cho ứng dụng lưu vào máy.',
  'This browser will not let the app store anything locally.':
    'Trình duyệt này không cho ứng dụng lưu trữ bất cứ thứ gì vào máy.',
  "No room left in this browser's storage. Delete a project and try again.":
    'Bộ nhớ của trình duyệt này đã hết chỗ. Hãy xóa một dự án rồi thử lại.',
  'Start a new song? Anything unsaved will be lost.':
    'Bắt đầu một bài hát mới? Mọi thứ chưa lưu sẽ mất.',
  'New song started.': 'Đã bắt đầu bài hát mới.',
  'Could not read that file — {error}': 'Không đọc được tệp đó — {error}',
  'Unrecognised file format': 'Định dạng tệp không nhận ra',

  // ------------------------------------------------ guide for guitarists
  '// MODES': '// ĐIỆU_THỨC',
  '// GUIDE_FOR_GUITARISTS': '// HƯỚNG_DẪN_CHO_NGƯỜI_CHƠI_GHI-TA',
  'CircleSong is a songwriting tool that shows its working. Pick a key and it names every chord in it and what each one does; write a progression and it plays back on a modelled guitar, so you hear the idea before you can play it.':
    'CircleSong là một công cụ sáng tác cho bạn thấy cả cách nó tính. Chọn một giọng và nó gọi tên từng hợp âm trong giọng đó cùng vai trò của mỗi hợp âm; viết một vòng hòa âm và nó vang lên trên một cây ghi-ta được mô phỏng, nên bạn nghe được ý tưởng trước khi chơi được nó.',
  '// START_HERE': '// BẮT_ĐẦU_TỪ_ĐÂY',
  'Tune up. The Tuner knows 8 instruments and 26 tunings, and you can tap any string to hear its pitch and tune by ear.':
    'Lên dây trước đã. Bộ lên dây biết 8 nhạc cụ và 26 kiểu lên dây, và bạn có thể chạm vào bất kỳ dây nào để nghe cao độ của nó rồi lên dây bằng tai.',
  'Pick your key. Tap a wedge on the circle. The outlined block is every chord that belongs to that key.':
    'Chọn giọng của bạn. Chạm vào một múi trên vòng tròn. Khối được viền lại chính là mọi hợp âm thuộc về giọng đó.',
  'Hear the chords. Compose lays out the seven degrees, each with a fretboard shape you can actually play.':
    'Nghe các hợp âm. Sáng tác bày ra đủ bảy bậc, mỗi bậc kèm một thế bấm trên cần đàn mà bạn thực sự chơi được.',
  'Write something. Timeline turns bars into a song — tap a bar, choose a chord, press play.':
    'Viết một thứ gì đó. Dòng thời gian biến các ô nhịp thành một bài hát: chạm vào một ô nhịp, chọn hợp âm, rồi bấm phát.',
  'Make it move. Tone decides how it is strummed; Drums puts a groove underneath.':
    'Cho nó chuyển động. Âm sắc quyết định cách quạt chả; Trống đặt một groove xuống bên dưới.',
  '// READING_THE_WHEEL': '// ĐỌC_VÒNG_TRÒN_NHƯ_THẾ_NÀO',
  'The outer ring is major chords. The inner ring is their relative minors — the same notes, a darker place to start.':
    'Vành ngoài là hợp âm trưởng. Vành trong là các giọng thứ song song của chúng — vẫn những nốt ấy, chỉ là một chỗ xuất phát tối hơn.',
  'The outlined block is your key. Three or four wedges on each ring, always side by side, because a key is a place on this circle rather than a list to memorise.':
    'Khối được viền là giọng của bạn. Ba hoặc bốn múi trên mỗi vành, luôn nằm cạnh nhau, bởi một giọng là một chỗ trên vòng tròn này chứ không phải một danh sách phải học thuộc.',
  'Clockwise is a fifth up. G is the V of C and pulls back home. Anticlockwise is a fourth up: F is the IV of C, and it relaxes instead.':
    'Theo chiều kim đồng hồ là lên một quãng năm: G là bậc V của C và nó kéo về nhà. Ngược chiều kim đồng hồ là lên một quãng bốn: F là bậc IV của C, và nó lại làm mọi thứ chùng xuống.',
  "The roman numeral on a wedge is that chord's job. I, IV and V are your three majors; ii, iii and vi the three minors; vii° the one that cannot sit still.":
    'Số La Mã trên một múi là việc mà hợp âm đó làm. I, IV và V là ba hợp âm trưởng của bạn; ii, iii và vi là ba hợp âm thứ; còn vii° là cái không chịu ngồi yên.',
  'Neighbours share the most notes. On a guitar that means the least hand movement, which is why so many songs are built from wedges that touch.':
    'Các múi kề nhau dùng chung nhiều nốt nhất. Trên ghi-ta điều đó có nghĩa là tay phải di chuyển ít nhất, và đó là lý do rất nhiều bài hát được dựng từ những múi chạm nhau.',
  '// IF_YOU_ALREADY_PLAY': '// NẾU_BẠN_ĐÃ_BIẾT_CHƠI',
  'The open chords you already know are a key. G, C and D are I, IV and V in G — the circle is that one relationship drawn out for all twelve keys.':
    'Những hợp âm mở bạn đã biết chính là một giọng. G, C và D là I, IV và V trong giọng G — vòng tròn này chỉ là đúng mối quan hệ ấy, vẽ ra cho cả mười hai giọng.',
  'A capo turns the wheel, not the shapes. The same grip two frets up is a key two wedges clockwise; set that key here and the app names the chords you are really playing.':
    'Capo xoay vòng tròn chứ không đổi thế bấm. Vẫn thế bấm ấy nhưng cao hơn hai ngăn là một giọng lệch hai múi theo chiều kim đồng hồ; đặt giọng đó ở đây và ứng dụng sẽ gọi đúng tên những hợp âm bạn đang thực sự chơi.',
  'A shape is not a chord. Compose offers several playable voicings of the same chord, and the ↔ number in the timeline is how many frets your hand travels to reach one. Smooth voicings picks the shapes that barely move.':
    'Một thế bấm không phải là một hợp âm. Sáng tác đưa ra nhiều thế bấm chơi được của cùng một hợp âm, và con số ↔ trên dòng thời gian là số ngăn tay bạn phải đi để tới thế bấm ấy. Nối thế bấm mượt sẽ chọn những thế gần như không phải di chuyển.',
  'Borrowed chords are the wedges just outside the outline. Try the one next door before anything exotic — a single note from outside the key is where most of the colour in pop music comes from.':
    'Hợp âm mượn là những múi nằm ngay bên ngoài đường viền. Hãy thử múi kề bên trước khi thử thứ gì lạ lẫm — chỉ một nốt nằm ngoài giọng thôi đã là nguồn gốc của phần lớn màu sắc trong nhạc pop.',
  '// WHAT_EACH_TAB_IS_FOR': '// TỪNG_THẺ_DÙNG_ĐỂ_LÀM_GÌ',
  'Choose a key and see what is in it.': 'Chọn một giọng và xem trong đó có gì.',
  'Get in tune, on any of eight instruments.':
    'Lên dây cho chuẩn, trên bất kỳ nhạc cụ nào trong tám nhạc cụ.',
  'How it is played: instrument, strumming pattern, feel and swing.':
    'Cách chơi nó: nhạc cụ, mẫu quạt chả, cảm giác và swing.',
  'A groove underneath, editable step by step.': 'Một groove ở bên dưới, sửa được theo từng bước.',
  'The chord itself: sevenths, extensions, inversions, and a shape for your hands.':
    'Bản thân hợp âm: quãng bảy, các âm mở rộng, thể đảo, và một thế bấm cho đôi tay bạn.',
  'The song: bars, loops and sections.': 'Bài hát: ô nhịp, vòng lặp và các đoạn.',
  'What could come next, and 56 progressions taken from real songs.':
    'Thứ có thể đến tiếp theo, cùng 56 vòng hòa âm lấy từ những bài hát có thật.',
  'The modes, and an ear trainer to test them.':
    'Các điệu thức, và một bài luyện tai để kiểm tra chúng.',
  'Save, reopen, import and export what you write.':
    'Lưu, mở lại, nhập và xuất những gì bạn viết ra.',
  'If you take one thing from this: chords that sit next to each other on the wheel share most of their notes. Move one step, leave most of your fingers where they are, and it will sound like it belongs.':
    'Nếu chỉ mang theo được một điều: những hợp âm ngồi cạnh nhau trên vòng tròn dùng chung gần hết số nốt. Bước sang một múi, để phần lớn ngón tay nguyên chỗ, và nó sẽ nghe như thể vốn thuộc về đó.',
};

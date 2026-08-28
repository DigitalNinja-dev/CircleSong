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
 * Hindi.
 *
 * Keys are the English source strings; see src/i18n.js. Anything absent falls
 * back to English, so a partial dictionary is a working one.
 *
 * Western harmony has no settled Hindi vocabulary, and the Hindustani words
 * that look like translations are not: a "tonic" is not a षड्ज and a "mode" is
 * not a राग, and using those words would teach the wrong thing. So the theory
 * terms are transliterated into Devanagari — टॉनिक, डॉमिनेंट, डोरियन — which is
 * what Hindi-speaking guitarists actually say, and the prose around them is
 * translated properly. Note letters stay in their international form.
 */
export const LOCALE_HI = {
  // ---------------------------------------------------------------- chrome
  'Language': 'भाषा',
  'LANGUAGE': 'भाषा',
  'Everything the app says, including the lessons and the progression notes.':
    'ऐप जो कुछ भी कहता है, पाठ और प्रोग्रेशन की टिप्पणियाँ भी।',
  'About CircleSong': 'CircleSong के बारे में',
  'Audio engine': 'ऑडियो इंजन',
  'Audio engine ready': 'ऑडियो इंजन तैयार है',
  'Tap anything to start audio': 'ऑडियो शुरू करने के लिए कहीं भी टैप करें',
  'Audio unavailable — {error}': 'ऑडियो उपलब्ध नहीं — {error}',
  'Play': 'चलाएँ',
  'Stop': 'रोकें',
  'SONG:': 'गीत:',
  'Song title': 'गीत का शीर्षक',
  'Untitled Song': 'बिना शीर्षक का गीत',
  'Tempo': 'लय',
  'Time signature': 'ताल',
  'Metro': 'मेट्रो',
  'Loop': 'लूप',
  'Drums': 'ड्रम',
  'Backing drums': 'संगत के ड्रम',
  'CLOSE': 'बंद करें',
  'Theme': 'थीम',
  'THEME': 'थीम',
  'System': 'सिस्टम',
  'Light': 'हल्का',
  'Dark': 'गहरा',
  'High contrast': 'उच्च कंट्रास्ट',
  'Sepia': 'सीपिया',
  'Currently {theme}.': 'इस समय: {theme}.',
  'Follows your device, and changes with it.': 'आपके डिवाइस का अनुसरण करता है और उसके साथ बदलता है।',
  'The default. Neon on black.': 'डिफ़ॉल्ट। काले पर नियॉन।',
  'Ink on paper, with a darker accent so it stays legible.':
    'कागज़ पर स्याही, गहरे उच्चारण रंग के साथ ताकि पढ़ने में आसानी रहे।',
  'Pure black and white, visible borders, no faint washes.':
    'शुद्ध श्वेत-श्याम, स्पष्ट किनारे, कोई हल्की छाया नहीं।',
  'Warm and low-glare, for long sessions.': 'गर्म और कम चमक वाला, लंबे सत्रों के लिए।',

  // ------------------------------------------------------------------ tabs
  'Circle': 'चक्र',
  'Tuner': 'ट्यूनर',
  'Tone': 'ध्वनि',
  'Compose': 'रचना',
  'Timeline': 'टाइमलाइन',
  'Assist': 'सहायक',
  'Learn': 'सीखें',
  'Songs': 'गीत',

  // --------------------------------------------------------- panel headings
  '/01 CIRCLE_OF_FIFTHS': '/01 पंचम_चक्र',
  '/02 GUITAR_TONE': '/02 गिटार_की_ध्वनि',
  '/02B VOICE': '/02B स्वर',
  '/02C PLAYBACK': '/02C प्लेबैक',
  '/03 STRUM_&_RHYTHM': '/03 स्ट्रम_और_ताल',
  '/03 DRUM_MACHINE': '/03 ड्रम_मशीन',
  '/04 DIATONIC_CHORDS': '/04 डायटॉनिक_कॉर्ड',
  '/05 TIMELINE': '/05 टाइमलाइन',
  '/06 MODES': '/06 मोड',
  '/07 SONGWRITING_ASSISTANT': '/07 गीत_रचना_सहायक',
  '/08 SONGS': '/08 गीत',
  '/09 TUNER': '/09 ट्यूनर',
  '// APPEARANCE': '// रूप-रंग',
  '// PROGRESSION_LIBRARY': '// प्रोग्रेशन_संग्रह',
  '// SAVED_PROJECTS': '// सहेजे_गए_प्रोजेक्ट',
  '// SONG_STRUCTURE_IDEAS': '// गीत_संरचना_के_विचार',
  'EAR_TRAINER // GUESS_THE_MODE': 'श्रवण_अभ्यास // मोड_पहचानें',

  // ----------------------------------------------------------------- about
  'CircleSong is a circle-of-fifths powered composition tool for guitar players. It maps the theory behind keys, modes, and chord progressions onto an instrument you already play, so you can build song structures — verses, choruses, bridges — by ear and by understanding, not guesswork.':
    'CircleSong गिटार बजाने वालों के लिए एक रचना-उपकरण है, जो पंचम चक्र पर आधारित है। यह कुंजियों, मोडों और कॉर्ड प्रोग्रेशनों के पीछे की थ्योरी को उसी वाद्य पर उतारता है जिसे आप पहले से बजाते हैं, ताकि आप गीत की संरचना — अंतरा, मुखड़ा, ब्रिज — कान और समझ से बनाएँ, अंदाज़े से नहीं।',
  'Pick a key, hear every diatonic chord and its inversions instantly, sequence them into a loop, and get progression ideas grounded in real theory and well-known songs. The Learn tab and ear trainer build your fluency in modes as you write — so composing and studying happen in the same place.':
    'एक कुंजी चुनिए, हर डायटॉनिक कॉर्ड और उसके व्युत्क्रम तुरंत सुनिए, उन्हें एक लूप में पिरोइए, और असली थ्योरी तथा जानी-पहचानी धुनों पर टिके प्रोग्रेशन के सुझाव पाइए। सीखें टैब और श्रवण अभ्यास लिखते-लिखते ही मोडों पर आपकी पकड़ बनाते हैं — यानी रचना और अध्ययन एक ही जगह होते हैं।',
  'Everything the instrument needs is here: eight modelled tones from acoustic steel to grand piano, thirty-four strum and picking patterns, a drum machine, a tuner for eight instruments, and songs you can save. It runs entirely on your device, installs to your home screen, and keeps working with no signal.':
    'वाद्य को जो कुछ चाहिए, सब यहाँ है: स्टील-तार की एकॉस्टिक से लेकर ग्रैंड पियानो तक आठ मॉडल की गई ध्वनियाँ, चौंतीस स्ट्रम और पिकिंग पैटर्न, एक ड्रम मशीन, आठ वाद्यों के लिए ट्यूनर, और गीत जिन्हें आप सहेज सकते हैं। यह पूरी तरह आपके डिवाइस पर चलता है, होम स्क्रीन पर इंस्टॉल हो जाता है, और बिना सिग्नल के भी काम करता रहता है।',
  'Copyright © 2026. Free software under the': 'कॉपीराइट © 2026। मुक्त सॉफ़्टवेयर, अंतर्गत',
  ', with no warranty. Section 13 of that licence gives everyone who uses CircleSong over a network the right to its source:':
    ', बिना किसी वारंटी के। उस लाइसेंस की धारा 13 हर उस व्यक्ति को स्रोत-कोड का अधिकार देती है जो CircleSong को नेटवर्क पर इस्तेमाल करता है:',
  'Source Code (AGPL v3.0)': 'स्रोत कोड (AGPL v3.0)',

  // ---------------------------------------------------------------- circle
  'Circle of fifths — arrow keys move around the wheel':
    'पंचम चक्र — तीर कुंजियों से चक्र में घूमिए',
  '{chord} — {numeral}, the {degree}': '{chord} — {numeral}, {degree}',
  '{chord} — outside this key': '{chord} — इस कुंजी के बाहर',
  'Mode': 'मोड',
  'WHEEL TAP PLAYS': 'चक्र पर टैप करने से बजेगा',
  'Chord': 'कॉर्ड',
  'Note': 'स्वर',
  'Show secondary dominants': 'सेकंडरी डॉमिनेंट दिखाएँ',
  'The chords that pull into each degree': 'वे कॉर्ड जो हर डिग्री की ओर खींचते हैं',
  'SECONDARY DOMINANTS': 'सेकंडरी डॉमिनेंट',
  'Tap one to hear it resolve. Each arrow points at the chord that chord pulls into.':
    'किसी एक पर टैप कर उसका समाधान सुनिए। हर तीर उस कॉर्ड की ओर इशारा करता है जिसकी ओर वह खींचता है।',
  '◄ Fourths (subdominant)': '◄ चतुर्थांश (सबडॉमिनेंट)',
  'Fifths (dominant) ►': 'पंचम (डॉमिनेंट) ►',
  'Outer ring — major keys. Inner ring — their relative minors. Bright wedges are diatonic to the current key. Clockwise stacks a 5th toward the dominant; counter-clockwise a 4th toward the subdominant. Lock the key, then tap any wedge to hear it and see how it relates.':
    'बाहरी वलय — मेजर कुंजियाँ। भीतरी वलय — उनकी सापेक्ष माइनर कुंजियाँ। चमकीले खंड वर्तमान कुंजी के डायटॉनिक हैं। घड़ी की दिशा में हर कदम डॉमिनेंट की ओर एक पंचम जोड़ता है; उल्टी दिशा में सबडॉमिनेंट की ओर एक चतुर्थांश। कुंजी को लॉक कीजिए, फिर किसी भी खंड पर टैप कर उसे सुनिए और देखिए कि उसका क्या रिश्ता है।',
  '🔒 Key Locked — tap wheel to explore': '🔒 कुंजी लॉक है — खोजने के लिए चक्र पर टैप करें',
  '🔓 Lock Key to Explore': '🔓 खोजने के लिए कुंजी लॉक करें',
  '{note} — degree {n} of the key ({numeral})': '{note} — कुंजी की डिग्री {n} ({numeral})',
  '{chord} is the {function} ({numeral}) of {key} — a {interval} above the root.':
    '{chord}, {key} का {function} ({numeral}) है — मूल स्वर से {interval} ऊपर।',
  '{chord} sits a {interval} from {key} — outside the current key, a borrowed or chromatic color.':
    '{chord}, {key} से {interval} दूर बैठता है — वर्तमान कुंजी के बाहर, एक उधार लिया या क्रोमैटिक रंग।',
  'The V7 of {target} — it borrows a note from outside the key to point at the {numeral} chord.':
    '{target} का V7 — यह कुंजी के बाहर से एक स्वर उधार लेकर {numeral} कॉर्ड की ओर इशारा करता है।',
  'The key’s own v is minor and cannot pull home. Raising its third makes {chord}, which can.':
    'कुंजी का अपना v माइनर है और घर की ओर नहीं खींच सकता। उसका तीसरा स्वर ऊपर उठाने पर {chord} बनता है, जो खींच सकता है।',
  'Borrowed': 'उधार लिया',

  // ------------------------------------------------- functions and degrees
  'Tonic': 'टॉनिक',
  'Supertonic': 'सुपरटॉनिक',
  'Mediant': 'मीडिएंट',
  'Subdominant': 'सबडॉमिनेंट',
  'Dominant': 'डॉमिनेंट',
  'Submediant': 'सबमीडिएंट',
  'Leading Tone': 'लीडिंग टोन',
  'Home base — the point of rest the progression resolves to.':
    'घर — वह विश्राम-बिंदु जहाँ प्रोग्रेशन आकर ठहरता है।',
  'Often leads toward the dominant; sets up motion away from home.':
    'प्रायः डॉमिनेंट की ओर ले जाता है; घर से दूर जाने की गति शुरू करता है।',
  'Colors the tonic, blending stability with subtle tension.':
    'टॉनिक को रंग देता है, स्थिरता में हल्का तनाव घोलकर।',
  'Pulls away from home and opens the door to the dominant.':
    'घर से दूर खींचता है और डॉमिनेंट का दरवाज़ा खोलता है।',
  'Strongest pull back to the tonic — the engine of resolution.':
    'टॉनिक की ओर सबसे तगड़ा खिंचाव — समाधान का इंजन।',
  'A gentle detour from the tonic, often feels wistful or reflective.':
    'टॉनिक से एक कोमल चक्कर; प्रायः उदास या चिंतनशील लगता है।',
  'Maximum tension — wants urgently to resolve back to the tonic.':
    'अधिकतम तनाव — टॉनिक पर लौटने की तीव्र चाह।',
  '{function} chord in this key.': 'इस कुंजी में {function} कॉर्ड।',
  'home': 'घर',
  'a step away from home': 'घर से एक कदम दूर',
  "the tonic's shadow": 'टॉनिक की छाया',
  'the lift': 'उठान',
  'the pull back home': 'घर की ओर खिंचाव',
  'the relative minor': 'सापेक्ष माइनर',
  'the approach chord': 'पहुँच वाला कॉर्ड',

  // ---------------------------------------------------------------- modes
  'Ionian': 'आयोनियन',
  'Dorian': 'डोरियन',
  'Phrygian': 'फ्रिजियन',
  'Lydian': 'लिडियन',
  'Mixolydian': 'मिक्सोलिडियन',
  'Aeolian': 'एओलियन',
  'Locrian': 'लोक्रियन',
  'Ionian (Major)': 'आयोनियन (मेजर)',
  'Aeolian (Minor)': 'एओलियन (माइनर)',
  'Major scale': 'मेजर स्केल',
  'Natural minor': 'नैचुरल माइनर',
  'Bright, resolved, happy': 'उजला, स्थिर, प्रसन्न',
  'Minor but hopeful, moody without being sad': 'माइनर पर आशा भरा; भावपूर्ण, पर उदास नहीं',
  'Dark, exotic, tense': 'गहरा, अनोखा, तना हुआ',
  'Dreamy, floating, cinematic': 'स्वप्निल, तैरता हुआ, सिनेमाई',
  'Bluesy, rootsy major': 'ब्लूज़ की छाँव वाला, माटी से जुड़ा मेजर',
  'Sad, melancholic, introspective': 'उदास, विषादपूर्ण, अंतर्मुखी',
  'Unstable, tense, rarely a home base': 'अस्थिर, तना हुआ; विरले ही घर बनता है',
  'The default major-key sound — home base for pop, country, and classical.':
    'मेजर कुंजी की सामान्य ध्वनि — पॉप, कंट्री और शास्त्रीय संगीत का घर।',
  'The major 6th is the giveaway — vamp i–IV for a jazzy, less melancholic minor sound (Santana, Radiohead).':
    'मेजर छठा स्वर इसे पहचनवा देता है — जैज़ जैसी, कम उदास माइनर ध्वनि के लिए i–IV का वैंप बजाइए (सैंटाना, रेडियोहेड)।',
  'The ♭2 gives it away — vamp i–♭II for a flamenco or metal flavor.':
    '♭2 इसे पकड़वा देता है — फ्लेमेंको या मेटल की छाँव के लिए i–♭II का वैंप बजाइए।',
  'The ♯4 makes it float above plain major — vamp I–II for a "movie score" wonder.':
    '♯4 इसे सादे मेजर के ऊपर तैरा देता है — फ़िल्म-संगीत जैसे विस्मय के लिए I–II का वैंप बजाइए।',
  'Major with a flat 7th — vamp I–♭VII for classic rock and blues-rock.':
    'फ्लैट सातवें स्वर वाला मेजर — क्लासिक रॉक और ब्लूज़-रॉक के लिए I–♭VII का वैंप बजाइए।',
  'The default minor-key sound — vamp i–VI for that classic sad or epic minor feel.':
    'माइनर कुंजी की सामान्य ध्वनि — उस चिरपरिचित उदास या भव्य माइनर भाव के लिए i–VI का वैंप बजाइए।',
  'Built on a diminished triad — usually a passing color (like vii° in a major key) rather than a tonic.':
    'डिमिनिश्ड त्रिक पर टिका — प्रायः गुज़रता हुआ रंग (जैसे मेजर कुंजी में vii°), टॉनिक नहीं।',
  'Modes are the 7 scales hiding inside every major scale — same notes, different starting point, different mood. Pick one to hear it and read how guitarists use it.':
    'मोड वे 7 स्केल हैं जो हर मेजर स्केल के भीतर छिपे रहते हैं — वही स्वर, अलग शुरुआत, अलग मिज़ाज। किसी एक को चुनकर सुनिए और पढ़िए कि गिटार बजाने वाले उसे कैसे बरतते हैं।',
  '▶ Play Scale': '▶ स्केल बजाएँ',
  '▶ Play Vamp': '▶ वैंप बजाएँ',
  'Scale degrees compared with the major scale': 'मेजर स्केल की तुलना में स्केल की डिग्रियाँ',
  'Modes identified correctly at least once': 'कम से कम एक बार सही पहचाने गए मोड',
  'Score:': 'अंक:',
  'Streak: {n} (best {best})': 'लगातार: {n} (सर्वश्रेष्ठ {best})',
  '▶ Start': '▶ शुरू करें',
  '↻ New Round': '↻ नया दौर',
  'Correct! 🎧': 'सही! 🎧',
  'Not quite — that was {mode}': 'बिल्कुल नहीं — वह {mode} था',
  '{mode} — identified': '{mode} — पहचाना गया',

  // -------------------------------------------------------------- intervals
  'Unison (root)': 'एकस्वर (मूल)',
  'Minor 2nd': 'माइनर 2रा',
  'Major 2nd': 'मेजर 2रा',
  'Minor 3rd': 'माइनर 3रा',
  'Major 3rd': 'मेजर 3रा',
  'Perfect 4th': 'परफ़ेक्ट 4था',
  'Tritone': 'ट्राइटोन',
  'Perfect 5th': 'परफ़ेक्ट 5वाँ',
  'Minor 6th': 'माइनर 6ठा',
  'Major 6th': 'मेजर 6ठा',
  'Minor 7th': 'माइनर 7वाँ',
  'Major 7th': 'मेजर 7वाँ',

  // ------------------------------------------------------------------ tone
  'VOLUME': 'आवाज़',
  'BRIGHTNESS': 'चमक',
  'SUSTAIN': 'ठहराव',
  'PICK POS': 'पिक की जगह',
  'AUDITION': 'सुनवाई',
  '1 bar': '1 बार',
  'Play a full bar': 'पूरा बार बजाएँ',
  'Play {n} beat': '{n} मात्रा बजाएँ',
  'Play {n} beats': '{n} मात्राएँ बजाएँ',
  'Cut previous sound': 'पिछली ध्वनि काटें',
  'Each chord silences the one before it': 'हर कॉर्ड अपने से पहले वाले को चुप कर देता है',
  'On': 'चालू',
  'Off': 'बंद',
  'TUNING': 'ट्यूनिंग',
  'Tuning': 'ट्यूनिंग',

  // ---------------------------------------------------------------- rhythm
  'STYLE': 'शैली',
  'NOW PLAYING': 'अभी बज रहा है',
  'FEEL': 'भाव',
  'SWING': 'स्विंग',
  'HUMANIZE': 'मानवीय स्पर्श',
  'Rhythm family': 'ताल का परिवार',
  'All feels ({n})': 'सभी भाव ({n})',
  'Strumming': 'स्ट्रमिंग',
  'Muted & Percussive': 'दबा हुआ और तालवाद्य जैसा',
  'Reggae, Ska & Offbeat': 'रेगे, स्का और ऑफ़बीट',
  'Jazz Comping': 'जैज़ संगत',
  'Latin & Syncopated': 'लैटिन और विषम-आघात',
  'Country & Bluegrass': 'कंट्री और ब्लूग्रास',
  'Other Meters': 'अन्य ताल',
  'Fingerstyle': 'फ़िंगरस्टाइल',
  'Keyboard': 'कीबोर्ड',
  'written for {lo}–{hi} BPM': '{lo}–{hi} BPM के लिए लिखा गया',
  'Written for {lo}–{hi} BPM': '{lo}–{hi} BPM के लिए लिखा गया',
  'any tempo': 'कोई भी लय',
  'Set {bpm} BPM': '{bpm} BPM करें',
  'You are at {bpm}; this feel is written for {lo}–{hi}':
    'आप {bpm} पर हैं; यह भाव {lo}–{hi} के लिए लिखा गया है',
  'machine': 'मशीनी',
  'Straight': 'सीधा',
  'Double-time': 'दुगुनी लय',
  'Half-time': 'आधी लय',
  'The pattern as written.': 'पैटर्न जैसा लिखा गया है।',
  'Twice the density at the same tempo — a skank becomes ska.':
    'उसी लय पर दुगुनी सघनता — स्कैंक स्का बन जाता है।',
  'The figure stretched across two bars. Everything gets heavier.':
    'वही आकृति दो बार में फैली हुई। सब कुछ भारी हो जाता है।',
  'Straight 8ths': 'सीधे आठवें',
  '16th Pop Strum': 'सोलहवें में पॉप स्ट्रम',
  'Folk D-DU-UDU': 'फ़ोक D-DU-UDU',
  'Driving 16ths': 'गति भरे सोलहवें',
  'Anthem Half-Time': 'गान, आधी लय में',
  'Punk Downstrokes': 'पंक, नीचे की ओर आघात',
  'Muted Chuck': 'दबा हुआ चक',
  'Funk 16ths': 'फ़ंक सोलहवें',
  'Disco Chank': 'डिस्को चैंक',
  'Reggae Skank': 'रेगे स्कैंक',
  'One Drop': 'वन ड्रॉप',
  'Rocksteady': 'रॉकस्टेडी',
  'Ska Upstrokes': 'स्का, ऊपर की ओर आघात',
  'Ska Bubble (16ths)': 'स्का बबल (सोलहवें)',
  'Jazz Swing': 'जैज़ स्विंग',
  'Charleston Comp': 'चार्ल्सटन संगत',
  'Bossa Nova': 'बोसा नोवा',
  'Rumba Clave': 'रुंबा क्लावे',
  'Rumba Flamenca': 'रुंबा फ्लेमेंका',
  'Country Boom-Chick': 'कंट्री बूम-चिक',
  'Bluegrass Boom-Chuck': 'ब्लूग्रास बूम-चक',
  'Waltz Strum': 'वाल्ट्ज़ स्ट्रम',
  'Ballad 6/8': '6/8 में बैलेड',
  'Slow Blues 12/8': '12/8 में धीमा ब्लूज़',
  'Fingerstyle Arp': 'फ़िंगरस्टाइल आर्पेजियो',
  'Travis Picking': 'ट्रैविस पिकिंग',
  'Rising Arpeggio': 'चढ़ता आर्पेजियो',
  'Let Ring': 'गूँजने दें',
  'Block Chords': 'ब्लॉक कॉर्ड',
  'Ballad Left Hand': 'बैलेड का बायाँ हाथ',
  'Alberti Bass': 'अल्बेर्टी बास',
  'Broken Chord': 'टूटा कॉर्ड',
  'Comping Stabs': 'संगत के छोटे आघात',
  'Reggae Organ Bubble': 'रेगे ऑर्गन बबल',

  // ----------------------------------------------------------------- drums
  'Groove': 'ग्रूव',
  'Drum kit': 'ड्रम किट',
  'Drum step sequencer': 'ड्रम स्टेप सीक्वेंसर',
  'DRUM VOL': 'ड्रम आवाज़',
  'Tap a step to cycle it through soft, medium and hard, then off. Tap a voice name to preview it; the ✕ clears that row.':
    'किसी स्टेप पर टैप करने से वह हल्का, मध्यम, तेज़ और फिर बंद होता जाता है। किसी स्वर का नाम टैप कर उसे सुनिए; ✕ उस पंक्ति को खाली कर देता है।',
  'Clear grid': 'ग्रिड खाली करें',
  'Reset groove': 'ग्रूव रीसेट करें',
  'Double': 'दुगुना',
  '✦ Vary': '✦ बदलाव',
  'Copy the first half onto the second': 'पहला आधा हिस्सा दूसरे पर कॉपी करें',
  'Nudge the groove into a variation of itself': 'ग्रूव को उसी के एक रूपांतर की ओर धकेलें',
  'Fill before the loop turns': 'लूप पलटने से पहले फ़िल',
  'A short fill on the last bar': 'आख़िरी बार में एक छोटा फ़िल',
  'Preview {voice}': '{voice} सुनें',
  'Clear {voice}': '{voice} खाली करें',
  '{voice} step {n}': '{voice}, स्टेप {n}',
  'Kick': 'किक',
  'Snare': 'स्नेयर',
  'Clap': 'ताली',
  'Rim': 'रिम',
  'Hat': 'हाई-हैट',
  'Open Hat': 'खुला हाई-हैट',
  'Ride': 'राइड',
  'Crash': 'क्रैश',
  'Tom': 'टॉम',
  'Shaker': 'शेकर',
  'Rock Standard': 'रॉक स्टैंडर्ड',
  'Cajon & Percussion': 'काहोन और तालवाद्य',
  'Acoustic Cajon': 'एकॉस्टिक काहोन',
  'Reggae / Dub': 'रेगे / डब',
  'Jazz Brushes': 'जैज़ ब्रश',
  'Lo-Fi / Chillhop': 'लो-फ़ाई / चिलहॉप',
  'Hard Rock / Metal': 'हार्ड रॉक / मेटल',
  'Rock & Pop': 'रॉक और पॉप',
  'Modern Rock Drive': 'आधुनिक रॉक ड्राइव',
  'Pop / Funk 16ths': 'पॉप / फ़ंक सोलहवें',
  'Indie Straight-8': 'इंडी सीधे आठवें',
  'Half-Time Groove': 'आधी लय का ग्रूव',
  'Motown Pocket': 'मोटाउन पॉकेट',
  'Punk D-Beat': 'पंक डी-बीट',
  'Metal Double-Kick': 'मेटल डबल-किक',
  'Metal Half-Time': 'मेटल, आधी लय में',
  'Funk & Soul': 'फ़ंक और सोल',
  'Funk Ghost Notes': 'फ़ंक घोस्ट नोट',
  'Gospel Shuffle': 'गॉस्पेल शफ़ल',
  'Boom Bap': 'बूम बैप',
  'Hip-Hop & Lo-Fi': 'हिप-हॉप और लो-फ़ाई',
  'Lo-Fi Chillhop': 'लो-फ़ाई चिलहॉप',
  'Trap': 'ट्रैप',
  'Breakbeat': 'ब्रेकबीट',
  'Electronic & Dance': 'इलेक्ट्रॉनिक और डांस',
  'Disco Four-on-Floor': 'डिस्को फ़ोर-ऑन-द-फ़्लोर',
  'Deep House': 'डीप हाउस',
  'House': 'हाउस',
  'Techno': 'टेक्नो',
  'Latin': 'लैटिन',
  'Son Montuno (2-3)': 'सोन मोंटूनो (2-3)',
  'Samba': 'साम्बा',
  'Partido Alto': 'पार्तीदो आल्तो',
  'Merengue': 'मेरेंगे',
  'Cumbia Clásica': 'शास्त्रीय कुम्बिया',
  'Cumbia Moderna': 'आधुनिक कुम्बिया',
  'Soca': 'सोका',
  'Afro-Cuban 6/8': '6/8 में एफ़्रो-क्यूबन',
  'Reggae & Caribbean': 'रेगे और कैरेबियाई',
  'Reggae One-Drop': 'रेगे वन-ड्रॉप',
  'Reggae Steppers': 'रेगे स्टेपर्स',
  'Jazz & Blues': 'जैज़ और ब्लूज़',
  'Jazz Swing Ride': 'जैज़ स्विंग राइड',
  'Slow Blues Shuffle': 'धीमा ब्लूज़ शफ़ल',
  'Acoustic & Folk': 'एकॉस्टिक और लोक',
  'Folk Waltz': 'लोक वाल्ट्ज़',
  'Country Train': 'कंट्री ट्रेन',
  'Metal': 'मेटल',

  // -------------------------------------------------------- chord builder
  'SIZE': 'आकार',
  'COLOUR': 'रंग',
  'ALTER': 'बदलाव',
  'SHAPE': 'पकड़',
  'Root': 'मूल',
  '1st Inv': 'पहला व्युत्क्रम',
  '2nd Inv': 'दूसरा व्युत्क्रम',
  'Drop-2': 'ड्रॉप-2',
  'Drop-3': 'ड्रॉप-3',
  '↻ Next shape': '↻ अगली पकड़',
  '▶ Preview': '▶ सुनें',
  'Chord diagram': 'कॉर्ड आरेख',
  'No playable shape': 'कोई बजाने योग्य पकड़ नहीं',
  'No playable shape for that chord in this tuning.':
    'इस ट्यूनिंग में उस कॉर्ड के लिए कोई बजाने योग्य पकड़ नहीं है।',
  'Open Position': 'खुली स्थिति',
  'Position — {fret}fr': 'स्थिति — फ़्रेट {fret}',
  'Triad': 'त्रिक',
  'Seventh chord': 'सातवाँ कॉर्ड',
  'Ninth': 'नौवाँ',
  'Eleventh': 'ग्यारहवाँ',
  'Triad — root, third, fifth': 'त्रिक — मूल, तीसरा, पाँचवाँ',
  'Thirteenth — the full stack': 'तेरहवाँ — पूरा ढेर',
  'Reset this chord': 'यह कॉर्ड रीसेट करें',
  'Reset all': 'सब रीसेट करें',
  'Add a {alteration}': '{alteration} जोड़ें',
  'Alterations need a seventh — pick 7 or larger first.':
    'बदलावों के लिए सातवाँ स्वर चाहिए — पहले 7 या उससे बड़ा चुनिए।',
  'Diatonic': 'डायटॉनिक',
  'Dom 7': 'डॉम 7',
  'The chord the key gives you.': 'वह कॉर्ड जो कुंजी आपको देती है।',
  'A dominant on this degree — the secondary-dominant pull.':
    'इस डिग्री पर एक डॉमिनेंट — सेकंडरी डॉमिनेंट का खिंचाव।',
  'Third replaced by the fourth. Suspended, wants to resolve.':
    'तीसरे की जगह चौथा। लटका हुआ, समाधान चाहता है।',
  'Third replaced by the second. Open and unresolved.':
    'तीसरे की जगह दूसरा। खुला और बिना समाधान का।',
  'Sixth instead of a seventh. Warm, settled, vintage.':
    'सातवें की जगह छठा। गर्म, जमा हुआ, पुराने ज़माने का।',
  'Ninth added over a triad, with no seventh.': 'त्रिक के ऊपर नौवाँ, बिना सातवें के।',
  'Fully diminished — a passing chord that leads anywhere.':
    'पूर्ण डिमिनिश्ड — एक गुज़रता कॉर्ड जो कहीं भी ले जा सकता है।',
  'Half-diminished. The ii of a minor ii–V–i.': 'अर्ध-डिमिनिश्ड। माइनर ii–V–i का ii।',
  'Raised fifth, pushing upward.': 'ऊपर उठा हुआ पाँचवाँ, ऊपर की ओर धकेलता हुआ।',
  '{hint} — idiomatic on this degree.': '{hint} — इस डिग्री पर यही चलन है।',
  'Plain triad — the chord at its most direct.': 'सादा त्रिक — कॉर्ड अपने सबसे सीधे रूप में।',
  'Seventh added: the chord gains a direction to move in.':
    'सातवाँ जुड़ा: कॉर्ड को चलने की दिशा मिल जाती है।',
  'Ninth on top — warmth and colour without changing the function.':
    'ऊपर नौवाँ — भूमिका बदले बिना गर्माहट और रंग।',
  'Eleventh — open and suspended over the third.': 'ग्यारहवाँ — तीसरे के ऊपर खुला और लटका हुआ।',
  'Thirteenth — the full stack, the sound of a jazz voicing.':
    'तेरहवाँ — पूरा ढेर, जैज़ वॉइसिंग की ध्वनि।',
  'Diatonic — {role} in this key.': 'डायटॉनिक — इस कुंजी में {role}।',
  'The {alterations} tightens the tension — resolve it by step into the next chord.':
    '{alterations} तनाव को कसता है — इसे अगले कॉर्ड की ओर एक-एक स्वर करके सुलझाइए।',
  ' and ': ' और ',
  'Secondary dominant — the V7 of {target}, so it pulls to the {numeral} chord.':
    'सेकंडरी डॉमिनेंट — {target} का V7, इसलिए यह {numeral} कॉर्ड की ओर खींचता है।',
  'Borrowed dominant pulling to {target}, which sits outside this key.':
    'उधार लिया डॉमिनेंट जो {target} की ओर खींचता है, और वह इस कुंजी के बाहर है।',
  "The key's own dominant, made a true V7 — the strongest pull to the tonic.":
    'कुंजी का अपना डॉमिनेंट, सच्चा V7 बनाया गया — टॉनिक की ओर सबसे तगड़ा खिंचाव।',
  'No third, so it is neither major nor minor — it wants the chord after it.':
    'तीसरा स्वर नहीं, इसलिए न मेजर न माइनर — इसे अपने बाद वाला कॉर्ड चाहिए।',
  'Symmetrical: it can resolve up a semitone into almost anything.':
    'सममित: यह आधा स्वर ऊपर लगभग किसी भी चीज़ में सुलझ सकता है।',
  'Half-diminished — the ii of a minor ii–V–i, heading for the dominant.':
    'अर्ध-डिमिनिश्ड — माइनर ii–V–i का ii, डॉमिनेंट की ओर बढ़ता हुआ।',
  'A sixth instead of a seventh: settled rather than in motion.':
    'सातवें की जगह छठा: गति में नहीं, ठहरा हुआ।',
  'A ninth over a plain triad — colour with no seventh to resolve.':
    'सादे त्रिक के ऊपर नौवाँ — रंग, पर सुलझाने को कोई सातवाँ नहीं।',
  "The raised fifth leans upward into the next chord's root or third.":
    'उठा हुआ पाँचवाँ अगले कॉर्ड के मूल या तीसरे स्वर की ओर झुक जाता है।',
  'Solo with {scale}.': '{scale} पर सोलो कीजिए।',
  'Careful with {note}.': '{note} से सावधान।',
  "The key's own notes, starting from this chord's root.":
    'कुंजी के अपने स्वर, इस कॉर्ड के मूल से शुरू।',
  'Altered (super-locrian)': 'ऑल्टर्ड (सुपर-लोक्रियन)',
  'Every tension is raised or lowered — this is the scale the ♭9 is asking for.':
    'हर तनाव ऊपर या नीचे किया गया है — ♭9 इसी स्केल की माँग करता है।',
  'Lydian dominant': 'लिडियन डॉमिनेंट',
  'A dominant with a raised 4th, which is exactly the ♯11.':
    'ऊपर उठे चौथे स्वर वाला डॉमिनेंट, यानी ठीक वही ♯11।',
  "The dominant scale. The 4th clashes with the chord's 3rd — pass through it, do not land on it.":
    'डॉमिनेंट स्केल। चौथा स्वर कॉर्ड के तीसरे से टकराता है — उससे गुज़र जाइए, उस पर ठहरिए मत।',
  'Diminished (half–whole)': 'डिमिनिश्ड (आधा–पूरा)',
  'Symmetrical, like the chord — it works from any of the four notes.':
    'कॉर्ड की तरह सममित — चारों स्वरों में से किसी से भी चलती है।',
  'Locrian ♮2': 'लोक्रियन ♮2',
  'Locrian with the 2nd raised, which keeps the 9th usable.':
    'दूसरा स्वर उठाकर बनाई गई लोक्रियन, जिससे नौवाँ काम लायक बना रहता है।',

  // ------------------------------------------------ suggestions and reasons
  'SUGGESTED NEXT': 'आगे के सुझाव',
  'EVERY CHORD IN THE KEY': 'कुंजी का हर कॉर्ड',
  'THIS CHORD': 'यह कॉर्ड',
  'THIS LOOP IS A': 'यह लूप है',
  'HOW THIS LOOP READS': 'यह लूप कैसे पढ़ा जाता है',
  'Follow the key': 'कुंजी का अनुसरण करें',
  'Remove chord': 'कॉर्ड हटाएँ',
  'Section role': 'खंड की भूमिका',
  'Smooth voicings': 'सहज वॉइसिंग',
  'Pick shapes that connect, so the hand barely moves':
    'ऐसी पकड़ें चुनता है जो आपस में जुड़ती हैं, ताकि हाथ मुश्किल से हिले',
  'Clear all': 'सब खाली करें',
  'Done': 'हो गया',
  'BAR {n}': 'बार {n}',
  'BAR {n} · {half} HALF': 'बार {n} · {half} आधा',
  'FIRST': 'पहला',
  'SECOND': 'दूसरा',
  'Bar {n}': 'बार {n}',
  'Split bar into two chords': 'बार को दो कॉर्ड में बाँटें',
  'Clear': 'खाली करें',
  '+ Loop': '+ लूप',
  'Duplicate': 'प्रतिलिपि',
  'Delete': 'हटाएँ',
  'Add an empty loop': 'एक खाली लूप जोड़ें',
  'Duplicate this loop': 'इस लूप की प्रतिलिपि बनाएँ',
  'Delete this loop': 'यह लूप हटाएँ',
  'Loop {name}': 'लूप {name}',
  'Loop name': 'लूप का नाम',
  'Starts at the next bar': 'अगले बार से शुरू होगा',
  'A big jump from the previous chord — try Smooth voicings.':
    'पिछले कॉर्ड से बड़ी छलाँग — सहज वॉइसिंग आज़माइए।',
  'Fret movement from the previous chord.': 'पिछले कॉर्ड से फ़्रेट की दूरी।',
  'Total fret movement across the loop: {cost}.':
    'पूरे लूप में फ़्रेट की कुल दूरी: {cost}।',
  'Drop this bar’s own setting and follow the chord variation from Compose.':
    'इस बार की अपनी सेटिंग छोड़कर रचना टैब की कॉर्ड विविधता का अनुसरण करें।',
  'This bar already follows the chord variation set in Compose.':
    'यह बार पहले से ही रचना टैब में तय की गई कॉर्ड विविधता का अनुसरण करता है।',
  'Timeline is empty — add chords, or switch the metronome on.':
    'टाइमलाइन खाली है — कॉर्ड जोड़िए, या मेट्रोनोम चालू कीजिए।',
  'Loaded {chords} chords into {bars} bars.': '{bars} बार में {chords} कॉर्ड लोड किए गए।',
  'Add another chord to hear a progression.': 'प्रोग्रेशन सुनने के लिए एक और कॉर्ड जोड़िए।',
  'Perfect cadence': 'पूर्ण कैडेंस',
  'Plagal cadence': 'प्लेगल कैडेंस',
  'Half cadence': 'अर्ध कैडेंस',
  'Deceptive cadence': 'छलावा कैडेंस',
  'perfect': 'पूर्ण',
  'plagal': 'प्लेगल',
  'half': 'अर्ध',
  'any': 'कोई भी',
  'Dominant to tonic — the section lands.': 'डॉमिनेंट से टॉनिक — खंड आकर टिक जाता है।',
  'IV to I — the "amen" ending, softer than a perfect cadence.':
    'IV से I — «आमीन» वाला अंत, पूर्ण कैडेंस से कोमल।',
  'Ends on the dominant, unresolved — it hands over to whatever comes next.':
    'डॉमिनेंट पर बिना सुलझे ख़त्म होता है — आगे जो आए, उसे सौंप देता है।',
  'The dominant resolves to vi instead of I — the ending is dodged on purpose.':
    'डॉमिनेंट I की जगह vi पर सुलझता है — अंत जान-बूझकर टाला गया है।',
  'A {section} usually ends with a {expected} cadence; this one ends with a {actual}.':
    '{section} आम तौर पर {expected} कैडेंस पर ख़त्म होता है; यह {actual} पर ख़त्म होता है।',
  'No clear cadence — the section stops rather than ends.':
    'कोई स्पष्ट कैडेंस नहीं — खंड ख़त्म नहीं होता, बस रुक जाता है।',
  'Nothing here acts as a dominant, so the loop stays flat. Try a V7 before the turn.':
    'यहाँ कुछ भी डॉमिनेंट का काम नहीं करता, इसलिए लूप सपाट रह जाता है। मोड़ से पहले एक V7 आज़माइए।',
  'All plain triads. A 7th or 9th on one chord will give the loop a centre of gravity.':
    'सभी सादे त्रिक। किसी एक कॉर्ड पर सातवाँ या नौवाँ स्वर लूप को गुरुत्व-केंद्र दे देगा।',
  'same chord': 'वही कॉर्ड',
  'a move': 'एक चाल',
  'down a fifth — the strongest move there is': 'एक पंचम नीचे — सबसे तगड़ी चाल',
  'down a third — two notes stay put': 'एक तीसरा नीचे — दो स्वर जहाँ के तहाँ',
  'up a step': 'एक कदम ऊपर',
  'down a step': 'एक कदम नीचे',
  'up a third': 'एक तीसरा ऊपर',
  'up a fifth — a step backwards, used deliberately':
    'एक पंचम ऊपर — एक कदम पीछे, जान-बूझकर',
  'opens a {section} well': '{section} की अच्छी शुरुआत करता है',
  'ends a {section} the way it should': '{section} को वैसे ही ख़त्म करता है जैसे होना चाहिए',
  'resolving here would spend the tension the {section} is building':
    'यहाँ सुलझाने से वह तनाव ख़र्च हो जाएगा जो {section} बना रहा है',
  'the tonic, which states the key outright': 'टॉनिक, जो कुंजी को खुलकर कह देता है',
  'resolves the dominant': 'डॉमिनेंट को सुलझाता है',
  'subdominant into dominant — the standard approach':
    'सबडॉमिनेंट से डॉमिनेंट — मानक रास्ता',
  'home straight to the dominant, which is how half a songbook works':
    'घर से सीधे डॉमिनेंट तक, आधी गीत-पुस्तिका इसी तरह चलती है',
  'steps away from home': 'घर से एक-एक कदम दूर जाता है',
  'pulls back from the dominant, which loosens the tension':
    'डॉमिनेंट से पीछे हटता है, जिससे तनाव ढीला पड़ता है',
  'The m7 — this is the ii of a ii–V, and it wants the dominant.':
    'm7 — यह ii–V का ii है, और इसे डॉमिनेंट चाहिए।',
  'A m9: the same function, more air.': 'एक m9: वही भूमिका, ज़्यादा हवा।',
  'Suspended, which delays the move.': 'लटका हुआ, जो चाल को टाल देता है।',
  'A maj7 on the subdominant — soft, and it floats.':
    'सबडॉमिनेंट पर एक maj7 — कोमल, और तैरता हुआ।',
  'A 6th chord, the settled vintage sound.': 'छठे स्वर वाला कॉर्ड, जमी हुई पुरानी ध्वनि।',
  'add9 keeps it a triad but opens it up.': 'add9 इसे त्रिक ही रखता है, पर खोल देता है।',
  'The plain minor triad — the most direct statement of home.':
    'सादा माइनर त्रिक — घर का सबसे सीधा बयान।',
  'A m7 tonic: home, but still moving.': 'एक m7 टॉनिक: घर, पर अब भी चलता हुआ।',
  'A m9 tonic, which is where a lot of neo-soul lives.':
    'एक m9 टॉनिक, जहाँ बहुत सारा नियो-सोल बसता है।',
  'm6 — brighter than it looks, because of the raised 6th.':
    'm6 — दिखने से ज़्यादा उजला, उठे हुए छठे स्वर की वजह से।',
  'The plain triad — nothing is clearer than this.': 'सादा त्रिक — इससे स्पष्ट कुछ नहीं।',
  'maj7 makes the tonic dreamier and less final.':
    'maj7 टॉनिक को ज़्यादा स्वप्निल और कम अंतिम बना देता है।',
  'A 6/9 chord: resolved, but not a full stop.': 'एक 6/9 कॉर्ड: सुलझा हुआ, पर पूर्ण विराम नहीं।',
  'add9 — a triad with light on it.': 'add9 — रोशनी पड़ा हुआ त्रिक।',
  'A true dominant 7th — the pull home.': 'सच्चा डॉमिनेंट सातवाँ — घर की ओर खिंचाव।',
  'Add the 9th for warmth without losing the pull.':
    'खिंचाव खोए बिना गर्माहट के लिए नौवाँ स्वर जोड़िए।',
  'A 13th: the full dominant sound.': 'एक तेरहवाँ: पूरा डॉमिनेंट रंग।',
  'Suspend the third, then release it into the 3rd.':
    'तीसरे को लटकाइए, फिर उसे तीसरे स्वर पर छोड़ दीजिए।',
  'With a ♭9 this is the classic minor-key dominant.':
    '♭9 के साथ यह माइनर कुंजी का चिरपरिचित डॉमिनेंट है।',
  'Half-diminished is how this degree is normally voiced — it heads for the dominant.':
    'इस डिग्री को आम तौर पर अर्ध-डिमिनिश्ड ही बजाया जाता है — यह डॉमिनेंट की ओर बढ़ता है।',
  'The bare diminished triad, which is harsher and rarely held.':
    'नंगा डिमिनिश्ड त्रिक, जो ज़्यादा कठोर है और कम ही ठहराया जाता है।',
  'Fully diminished, as a passing chord between two neighbours.':
    'पूर्ण डिमिनिश्ड, दो पड़ोसियों के बीच एक गुज़रते कॉर्ड की तरह।',

  // ------------------------------------------------------- song structures
  'Intro': 'प्रारंभ',
  'Verse': 'अंतरा',
  'Pre-Chorus': 'मुखड़े से पहले',
  'Chorus': 'मुखड़ा',
  'Bridge': 'ब्रिज',
  'Outro': 'समापन',
  'Apply': 'लागू करें',
  'Apply to timeline': 'टाइमलाइन पर लागू करें',
  'Establish the key without spending the big moment.':
    'बड़ा पल ख़र्च किए बिना कुंजी स्थापित कीजिए।',
  'A loop that can carry many different melodies.':
    'ऐसा लूप जो कई अलग-अलग धुनें उठा सके।',
  'Climb, and hand the chorus an unresolved dominant.':
    'चढ़िए, और मुखड़े को बिना सुलझा डॉमिनेंट थमा दीजिए।',
  'The strongest, plainest statement of the key.':
    'कुंजी का सबसे मज़बूत, सबसे सादा बयान।',
  'Leave home so returning means something.':
    'घर छोड़िए, ताकि लौटने का कोई अर्थ हो।',
  'Land, or vamp somewhere restful.': 'उतर जाइए, या किसी शांत जगह वैंप कीजिए।',
  'Simple & Open': 'सरल और खुला',
  'Suspended Mood': 'लटका हुआ मिज़ाज',
  'Single-Chord Drone': 'एक कॉर्ड का आधार',
  'Dominant Tease': 'डॉमिनेंट का इशारा',
  'Establishes the key calmly before the verse enters.':
    'अंतरे के आने से पहले शांति से कुंजी स्थापित करता है।',
  'Opens on a softer, unresolved colour.': 'एक कोमल, बिना सुलझे रंग से शुरू होता है।',
  'Holds the tonic so the first vocal line does the work.':
    'टॉनिक को थामे रखता है ताकि गायन की पहली पंक्ति काम कर सके।',
  'Starts on tension and resolves into bar one.':
    'तनाव से शुरू होकर पहले बार में सुलझ जाता है।',
  'Narrative Motion': 'कथा की गति',
  'Understated': 'संयत',
  'Descending Line': 'उतरती पंक्ति',
  'Minor Verse': 'माइनर अंतरा',
  'Steady storytelling motion, familiar and grounded.':
    'कहानी कहने की स्थिर गति, जानी-पहचानी और ज़मीन से जुड़ी।',
  'Restrained — leaves room for the chorus to lift.':
    'संयत — मुखड़े को उठने की जगह देता है।',
  'The axis loop, which never tires of being sung over.':
    'वही चार-कॉर्ड लूप, जिस पर गाते-गाते कभी थकान नहीं होती।',
  'Same chords starting on the relative minor — darker footing.':
    'वही कॉर्ड, पर शुरुआत सापेक्ष माइनर से — ज़मीन ज़्यादा गहरी।',
  'Rising Tension': 'बढ़ता तनाव',
  'Stepwise Build': 'कदम-दर-कदम उठान',
  'Hold the Five': 'पाँचवें को थामिए',
  'Climbs and holds the dominant so the chorus can release it.':
    'चढ़कर डॉमिनेंट को थाम लेता है ताकि मुखड़ा उसे छोड़ सके।',
  'Walks up the scale — momentum without a key change.':
    'स्केल पर ऊपर चढ़ता है — कुंजी बदले बिना गति।',
  'Two chords, twice as long each. Maximum anticipation.':
    'दो कॉर्ड, हर एक दुगुना लंबा। अधिकतम प्रतीक्षा।',
  'Big Lift': 'बड़ी उठान',
  'Anthemic': 'गान जैसा',
  'Plagal Power': 'प्लेगल ताक़त',
  'Minor Hook': 'माइनर हुक',
  'Climbs above the verse for a euphoric hook.':
    'उल्लासभरे हुक के लिए अंतरे से ऊपर चढ़ जाता है।',
  'Instantly singable — the classic pop lift.':
    'तुरंत गाने लायक — पॉप की चिरपरिचित उठान।',
  'Tonic and subdominant only. Hymn-like and immovable.':
    'सिर्फ़ टॉनिक और सबडॉमिनेंट। भजन जैसा और अटल।',
  'Begins minor and resolves major — bittersweet.':
    'माइनर से शुरू होकर मेजर पर सुलझता है — मीठा-कड़वा।',
  'Harmonic Detour': 'स्वर-संगति का चक्कर',
  'Mediant Shift': 'मीडिएंट की सरकन',
  'Relative Minor': 'सापेक्ष माइनर',
  'Suspended Halt': 'लटका हुआ ठहराव',
  'Borrows jazz motion to contrast the chorus.':
    'मुखड़े से फ़र्क़ दिखाने के लिए जैज़ की चाल उधार लेता है।',
  'A brief modal colour before the final chorus.':
    'आख़िरी मुखड़े से पहले एक छोटा मोडल रंग।',
  'Moves the centre of gravity to the relative minor.':
    'गुरुत्व-केंद्र को सापेक्ष माइनर की ओर सरका देता है।',
  'Two chords, held. The pause before the last chorus.':
    'दो कॉर्ड, थामे हुए। आख़िरी मुखड़े से पहले का ठहराव।',
  'Fade Home': 'घर की ओर धीमा होना',
  'Loop & Dissolve': 'लूप और विलय',
  'Plagal Amen': 'प्लेगल आमीन',
  'Unresolved': 'बिना सुलझा',
  'A final cadence that settles the song.': 'एक अंतिम कैडेंस जो गीत को टिका देती है।',
  'A gentle vamp to fade out on.': 'धीमे-धीमे ख़त्म होने के लिए एक कोमल वैंप।',
  'The IV–I "amen" cadence — restful, conclusive.':
    'IV–I वाली «आमीन» कैडेंस — शांत और निर्णायक।',
  'Ends on the dominant, leaving the question open.':
    'डॉमिनेंट पर ख़त्म होता है, सवाल खुला छोड़कर।',

  // ---------------------------------------------------------------- moods
  'EVERYTHING BELOW IS IN': 'नीचे सब कुछ इसमें है',
  '🔒 locked — suggestions stay in this key':
    '🔒 लॉक — सुझाव इसी कुंजी में रहेंगे',
  'unlocked — a suggestion may bring its own mode':
    'अनलॉक — कोई सुझाव अपना मोड साथ ला सकता है',
  'Melancholic': 'विषादपूर्ण',
  'Energetic': 'ऊर्जावान',
  'Dreamy': 'स्वप्निल',
  'Heroic': 'वीरोचित',
  'Bluesy': 'ब्लूज़ भरा',
  'Epic': 'भव्य',
  'Hopeful': 'आशा भरा',
  'Nostalgic': 'पुरानी यादों वाला',
  'Hypnotic': 'सम्मोहक',
  'Sophisticated': 'परिष्कृत',
  'Restless': 'बेचैन',
  'Tender': 'कोमल',
  'Triumphant': 'विजयी',
  'Begins on the relative minor and circles home without ever quite settling.':
    'सापेक्ष माइनर से शुरू होकर घर के गिर्द घूमता है, पर कभी पूरी तरह टिकता नहीं।',
  'Primary triads, no minor chords, constant forward push.':
    'मुख्य त्रिक, कोई माइनर कॉर्ड नहीं, लगातार आगे की ओर धक्का।',
  'Lydian major sevenths — the raised 4th keeps the tonic floating.':
    'लिडियन मेजर सातवें — उठा हुआ चौथा स्वर टॉनिक को तैराए रखता है।',
  'Tonic and subdominant trading places, then the dominant to lift it.':
    'टॉनिक और सबडॉमिनेंट जगह बदलते हैं, फिर डॉमिनेंट उसे उठा देता है।',
  'Dominant sevenths on every degree — grit rather than sweetness.':
    'हर डिग्री पर डॉमिनेंट सातवाँ — मिठास नहीं, खुरदरापन।',
  'Minor tonic under three major chords. Scale without brightness.':
    'तीन मेजर कॉर्ड के नीचे माइनर टॉनिक। बिना चमक का विस्तार।',
  'The ♭2 pressing against the tonic — unresolved and menacing.':
    '♭2 टॉनिक पर दबाव डालता हुआ — बिना सुलझा और डरावना।',
  'Starts away from the tonic so arriving home reads as relief.':
    'टॉनिक से दूर शुरू होता है ताकि घर पहुँचना राहत जैसा लगे।',
  'The doo-wop turnaround. Familiar to the point of comfort.':
    'डू-वॉप का घुमाव। इतना जाना-पहचाना कि आराम देता है।',
  'Two chords, minor with a major 6th. Built for playing over.':
    'दो कॉर्ड, मेजर छठे स्वर वाला माइनर। ऊपर बजाने के लिए ही बना है।',
  'ii–V–I with sevenths throughout — the jazz cadence.':
    'हर जगह सातवें स्वरों के साथ ii–V–I — जैज़ की कैडेंस।',
  'A stepwise descent that keeps arriving somewhere new.':
    'कदम-दर-कदम उतरता हुआ, हर बार किसी नई जगह पहुँचता हुआ।',
  'Gentle mediant motion — close voicings, little movement in the bass.':
    'कोमल मीडिएंट चाल — पास-पास की वॉइसिंग, बास में कम हलचल।',
  'The ♭VII gives it swagger without losing the major tonic.':
    '♭VII इसे अकड़ देता है, और मेजर टॉनिक भी नहीं छूटता।',

  // ------------------------------------------------- progression library
  'FAMILY': 'परिवार',
  'Progression family': 'प्रोग्रेशन का परिवार',
  'All families ({n})': 'सभी परिवार ({n})',
  'Search name, numerals, or a song…': 'नाम, अंक या किसी गीत से खोजिए…',
  'Search progressions': 'प्रोग्रेशन खोजें',
  '{n} PROGRESSION': '{n} प्रोग्रेशन',
  '{n} PROGRESSIONS': '{n} प्रोग्रेशन',
  'MATCHING “{query}”': '«{query}» से मेल खाते',
  'Nothing matches that. Try a song name, a chord, or clear the search.':
    'इससे कुछ भी मेल नहीं खाता। किसी गीत का नाम, कोई कॉर्ड आज़माइए, या खोज मिटा दीजिए।',
  'Pick a family or search, then tap a progression to open it — you\'ll hear it in the current key. Apply writes it to the timeline. Numerals and chord names are computed from what will actually play.':
    'कोई परिवार चुनिए या खोजिए, फिर किसी प्रोग्रेशन पर टैप कर उसे खोलिए — वह आपको वर्तमान कुंजी में सुनाई देगा। «लागू करें» उसे टाइमलाइन पर लिख देता है। अंक और कॉर्ड के नाम उसी से निकाले जाते हैं जो असल में बजेगा।',
  '▶ Hear it': '▶ सुनिए',
  'HEARD IN': 'इनमें सुनाई देता है',
  '{n} bar': '{n} बार',
  '{n} bars': '{n} बार',
  '(written in {mode})': '({mode} में लिखा गया)',
  'Previewing {name} — tap Apply to keep it.':
    '{name} सुनाया जा रहा है — रखने के लिए «लागू करें» टैप कीजिए।',
  'Stop playback to preview a progression.':
    'कोई प्रोग्रेशन सुनने के लिए पहले प्लेबैक रोकिए।',
  'Pop & Rock': 'पॉप और रॉक',
  'Modal Rock': 'मोडल रॉक',
  'Minor Keys': 'माइनर कुंजियाँ',
  'Jazz': 'जैज़',
  'Jazz & Neo-Soul': 'जैज़ और नियो-सोल',
  'Blues': 'ब्लूज़',
  'Folk & Country': 'लोक और कंट्री',
  'Handbook': 'पुस्तिका',
  'Axis of Awesome': 'वही चार कॉर्ड',
  'Axis, Minor Start': 'वही चार कॉर्ड, माइनर से शुरू',
  '50s Doo-Wop': '50 के दशक का डू-वॉप',
  'Three-Chord Rock': 'तीन कॉर्ड का रॉक',
  'Pop-Punk Lift': 'पॉप-पंक उठान',
  'Ballad Climb': 'बैलेड की चढ़ाई',
  "Pachelbel's Canon": 'पाखेलबेल का कैनन',
  'The four chords behind a startling share of the charts. Endlessly singable.':
    'चार्ट के चौंकाने वाले हिस्से के पीछे यही चार कॉर्ड हैं। अनंत बार गाए जा सकते हैं।',
  'The same loop rotated to begin on the relative minor — wistful rather than triumphant.':
    'वही लूप, घुमाकर सापेक्ष माइनर से शुरू — विजयी नहीं, उदास।',
  'Ballads, prom scenes, "Stand By Me". Warm and instantly nostalgic.':
    'बैलेड, विदाई-नृत्य के दृश्य, «Stand By Me»। गर्म और तुरंत पुरानी यादें जगाने वाला।',
  'The primary triads and nothing else. Direct, and hard to make sound wrong.':
    'सिर्फ़ मुख्य त्रिक, और कुछ नहीं। सीधा, और ग़लत बजाना मुश्किल।',
  'Starts away from home so the chorus lands as a return.':
    'घर से दूर शुरू होता है ताकि मुखड़ा लौटने जैसा लगे।',
  'A stepwise rise through the scale — builds tension without a key change.':
    'स्केल पर कदम-दर-कदम चढ़ाई — कुंजी बदले बिना तनाव बनाता है।',
  'A descending sequence that has outlived three centuries of fashion.':
    'उतरती हुई शृंखला, जो तीन सदियों के फ़ैशन से ज़्यादा जी गई।',
  'Mixolydian Rock': 'मिक्सोलिडियन रॉक',
  'Dorian Vamp': 'डोरियन वैंप',
  'Grunge ♭VI–♭VII': 'ग्रंज ♭VI–♭VII',
  'Lydian Lift': 'लिडियन उठान',
  'Phrygian Descent': 'फ्रिजियन उतार',
  'The ♭VII is what makes this rock rather than pop — think "Sweet Home Alabama".':
    '♭VII ही इसे पॉप नहीं, रॉक बनाता है — «Sweet Home Alabama» याद कीजिए।',
  'Minor with a bright 6th. Hypnotic, jam-friendly, never fully sad.':
    'उजले छठे स्वर वाला माइनर। सम्मोहक, जैम के लिए बढ़िया, कभी पूरी तरह उदास नहीं।',
  'Heavy and modal — the flat 6th and 7th give it the weight.':
    'भारी और मोडल — फ्लैट छठा और सातवाँ स्वर ही इसे वज़न देते हैं।',
  'The ♯4 floats the tonic. Cinematic wonder in two chords.':
    '♯4 टॉनिक को तैरा देता है। दो कॉर्ड में सिनेमाई विस्मय।',
  'The ♭2 leaning on the tonic — flamenco and metal share this one.':
    '♭2 टॉनिक पर झुका हुआ — फ्लेमेंको और मेटल दोनों इसे बरतते हैं।',
  'Andalusian Cadence': 'अंदालूसी कैडेंस',
  'Epic Minor': 'भव्य माइनर',
  'Minor Ballad': 'माइनर बैलेड',
  'Minor Climb': 'माइनर चढ़ाई',
  'A stepwise descent from the tonic. Dramatic, and older than most of what it appears in.':
    'टॉनिक से कदम-दर-कदम उतार। नाटकीय, और जिन चीज़ों में यह आता है उनमें से अधिकांश से पुराना।',
  'i–VI–III–VII. Trailers, anthems, anything that needs scale.':
    'i–VI–III–VII। ट्रेलर, गान, और हर वह चीज़ जिसे भव्यता चाहिए।',
  'The doo-wop shape in minor — familiar bones, darker colour.':
    'डू-वॉप का ढाँचा माइनर में — वही हड्डियाँ, गहरा रंग।',
  'Rises through the relative major before falling back to the tonic.':
    'टॉनिक पर लौटने से पहले सापेक्ष मेजर से होकर चढ़ता है।',
  'ii–V–I Turnaround': 'ii–V–I घुमाव',
  'Rhythm Changes A': 'रिदम चेंजेस A',
  'Bossa Turnaround': 'बोसा घुमाव',
  'Jazz Blues Head': 'जैज़ ब्लूज़ का मुखड़ा',
  'Circle of Fifths Run': 'पंचम चक्र की दौड़',
  'The central cadence of jazz. Learn it in all twelve keys and half the language follows.':
    'जैज़ की केंद्रीय कैडेंस। इसे बारहों कुंजियों में सीख लीजिए, आधी भाषा अपने आप आ जाएगी।',
  'I–vi–ii–V, the most-played eight bars in the standard repertoire.':
    'I–vi–ii–V, मानक रेपर्टवार के सबसे ज़्यादा बजाए गए आठ बार।',
  'Major sevenths and a gentle ii–V. Nylon strings and brushes.':
    'मेजर सातवें स्वर और एक कोमल ii–V। नायलॉन के तार और ब्रश।',
  'Dominant sevenths throughout — the blues with a jazz accent.':
    'हर जगह डॉमिनेंट सातवें — जैज़ के लहजे वाला ब्लूज़।',
  'Root movement by fourths all the way home — every chord pulls to the next.':
    'घर तक चतुर्थांश-दर-चतुर्थांश मूल स्वर की चाल — हर कॉर्ड अगले को खींचता है।',
  'Neo-Soul Loop': 'नियो-सोल लूप',
  'Half-Diminished ii–V–i': 'अर्ध-डिमिनिश्ड ii–V–i',
  'Minor ii–V–i with a ♭9': '♭9 के साथ माइनर ii–V–i',
  'Sus4 Release': 'Sus4 की छूट',
  '6/9 Turnaround': '6/9 घुमाव',
  'Secondary Dominant Cycle': 'सेकंडरी डॉमिनेंट चक्र',
  'Dorian with ninths on everything. The major IV is what makes Dorian sound like Dorian rather than minor.':
    'हर चीज़ पर नौवें स्वर के साथ डोरियन। मेजर IV ही डोरियन को माइनर नहीं, डोरियन जैसा सुनाता है।',
  'The textbook minor cadence: iiø7 sets up the dominant, the dominant lands on a m9.':
    'किताबी माइनर कैडेंस: iiø7 डॉमिनेंट की ज़मीन बनाता है, और डॉमिनेंट m9 पर उतरता है।',
  'Dm9 – E7♭9 – Am9 in A minor. The v has to be borrowed as a dominant to pull home, and the ♭9 is the note that makes it ache.':
    'A माइनर में Dm9 – E7♭9 – Am9। घर की ओर खींचने के लिए v को डॉमिनेंट के रूप में उधार लेना पड़ता है, और ♭9 ही वह स्वर है जो टीस पैदा करता है।',
  'Hold the 4th, then let it fall to the 3rd. The oldest tension-and-release there is.':
    'चौथे स्वर को थामिए, फिर उसे तीसरे पर गिरने दीजिए। तनाव और राहत का सबसे पुराना खेल।',
  'A 6/9 tonic never quite sits down, so the loop keeps turning. The 13th on the V is the full jazz dominant.':
    '6/9 टॉनिक कभी पूरी तरह बैठता नहीं, इसलिए लूप घूमता रहता है। V पर तेरहवाँ स्वर पूरा जैज़ डॉमिनेंट है।',
  'Every chord is the dominant of the next. Each borrowed 7th pulls a fifth down into the chord after it.':
    'हर कॉर्ड अगले का डॉमिनेंट है। हर उधार लिया सातवाँ स्वर एक पंचम नीचे, अगले कॉर्ड की ओर खींचता है।',
  '12-Bar Blues': '12-बार ब्लूज़',
  '12-Bar Quick Change': '12-बार ब्लूज़, त्वरित बदलाव के साथ',
  'Minor Blues': 'माइनर ब्लूज़',
  'The form. Twelve bars, three chords, a century of music.':
    'वही ढाँचा। बारह बार, तीन कॉर्ड, एक सदी का संगीत।',
  'Moves to the IV in bar two — more motion early on.':
    'दूसरे बार में ही IV पर चला जाता है — शुरू में ज़्यादा हलचल।',
  'The same twelve bars in minor. Slower, heavier, more room to bend.':
    'वही बारह बार माइनर में। धीमे, भारी, बेंड के लिए ज़्यादा जगह।',
  'Country I–IV–V': 'कंट्री I–IV–V',
  'Folk Circle': 'लोक चक्र',
  'Celtic Vamp': 'केल्टिक वैंप',
  'The three chords most songs are made of.': 'वही तीन कॉर्ड, जिनसे ज़्यादातर गीत बने हैं।',
  'Home, away, home, away. The campfire progression.':
    'घर, दूर, घर, दूर। अलाव के गीतों वाला प्रोग्रेशन।',
  'The ♭VII again, this time in a jig. Works beautifully in DADGAD.':
    'फिर वही ♭VII, इस बार एक जिग में। DADGAD में बेहद सुंदर लगता है।',

  // ------------------------------------------------------------- handbook
  '1 · Single Major Chord': '1 · अकेला मेजर कॉर्ड',
  '2 · Single Minor Chord': '2 · अकेला माइनर कॉर्ड',
  '3 · Tonic–Dominant, Major': '3 · टॉनिक–डॉमिनेंट, मेजर',
  '4 · Tonic–Dominant, Minor': '4 · टॉनिक–डॉमिनेंट, माइनर',
  '5 · Tonic–Subdominant': '5 · टॉनिक–सबडॉमिनेंट',
  '6 · Major to Relative Minor': '6 · मेजर से सापेक्ष माइनर तक',
  '7 · I–IV–V': '7 · I–IV–V',
  '8 · I–IV–V, Plagal Cadence': '8 · I–IV–V, प्लेगल कैडेंस',
  '9 · I–IV–V–IV': '9 · I–IV–V–IV',
  '10 · Minor to ♭III': '10 · माइनर से ♭III तक',
  '11 · Minor to ♭VII': '11 · माइनर से ♭VII तक',
  '12 · Doo-Wop / Ice Cream': '12 · डू-वॉप / आइसक्रीम',
  '12A · I–V–vi–IV': '12A · I–V–vi–IV',
  '12B · I–IV–vi–V': '12B · I–IV–vi–V',
  '13 · Rhythm Changes': '13 · रिदम चेंजेस',
  '13B · Secondary Dominants': '13B · सेकंडरी डॉमिनेंट',
  '13D · The Turnaround': '13D · घुमाव',
  '14 · ii–V–I–IV': '14 · ii–V–I–IV',
  '15 · Modal with ii and IV': '15 · ii और IV के साथ मोडल',
  '16 · I–♭VII–IV–I': '16 · I–♭VII–IV–I',
  '18 · i–♭III–♭VII–i': '18 · i–♭III–♭VII–i',
  '19 · Andalusian Cadence': '19 · अंदालूसी कैडेंस',
  "20 · Pachelbel's Canon": '20 · पाखेलबेल का कैनन',
  'One chord, held. Everything else in music is a departure from this.':
    'एक कॉर्ड, थामा हुआ। संगीत में बाकी सब कुछ यहीं से रवाना होता है।',
  'The same drone in minor. A whole song can live here.':
    'वही आधार माइनर में। पूरा गीत यहीं बस सकता है।',
  'Away and back. The smallest complete musical sentence there is.':
    'दूर जाकर वापस। संगीत का सबसे छोटा पूरा वाक्य।',
  'The same two-chord motion with a minor tonic — darker, and it leans harder.':
    'वही दो-कॉर्ड की चाल, माइनर टॉनिक के साथ — गहरी, और ज़्यादा झुकी हुई।',
  'Away and back without tension. Restful where the dominant is restless.':
    'बिना तनाव के दूर जाकर वापस। जहाँ डॉमिनेंट बेचैन है, वहाँ यह शांत है।',
  'The same seven notes, seen from its shadow.':
    'वही सात स्वर, उसकी छाया से देखे गए।',
  'Ends IV to I rather than V to I — the softer landing.':
    'V से I नहीं, IV से I पर ख़त्म होता है — कोमल उतार।',
  'Sits on the tonic before moving — leaves space for the vocal.':
    'चलने से पहले टॉनिक पर बैठा रहता है — गायन के लिए जगह छोड़ता है।',
  'Minor tonic to its relative major. Used alone, or to open something longer.':
    'माइनर टॉनिक से उसके सापेक्ष मेजर तक। अकेले भी, या किसी लंबी चीज़ की शुरुआत के लिए।',
  'Minor, its relative major, and the subtonic. Endlessly loopable.':
    'माइनर, उसका सापेक्ष मेजर, और सबटॉनिक। अनंत बार लूप किया जा सकता है।',
  'The same four chords rotated. Probably the most recorded loop alive.':
    'वही चार कॉर्ड, घुमाए हुए। शायद अब तक का सबसे ज़्यादा रिकॉर्ड किया गया लूप।',
  'The subdominant arrives early, so the minor lands harder.':
    'सबडॉमिनेंट जल्दी आ जाता है, इसलिए माइनर ज़्यादा ज़ोर से उतरता है।',
  'I–vi–ii–V. The circle of fifths, walked backwards, four bars at a time.':
    'I–vi–ii–V। पंचम चक्र, उल्टा चला गया, चार-चार बार करके।',
  'Each chord turned into the dominant of the next, so the loop pulls all the way round.':
    'हर कॉर्ड को अगले का डॉमिनेंट बना दिया गया, इसलिए लूप पूरे चक्कर तक खींचता है।',
  'iii–vi–ii–V. Tacked on the end to extend an ending, in show tunes and jazz.':
    'iii–vi–ii–V। अंत को लंबा करने के लिए पीछे जोड़ा जाता है, शो-धुनों और जैज़ में।',
  'The jazz cadence, then straight out to the subdominant instead of resting.':
    'जैज़ की कैडेंस, फिर विश्राम की जगह सीधे सबडॉमिनेंट की ओर।',
  'Stepwise out of the tonic. Modern pop leans on this constantly.':
    'टॉनिक से कदम-दर-कदम बाहर। आधुनिक पॉप लगातार इसी पर टिका है।',
  'Mixolydian rock. The ♭VII is what stops it sounding like a hymn.':
    'मिक्सोलिडियन रॉक। ♭VII ही इसे भजन जैसा लगने से रोकता है।',
  'The first chord from outside the major scale. Modal, and instantly modern.':
    'मेजर स्केल के बाहर का पहला कॉर्ड। मोडल, और तुरंत आधुनिक।',
  'The loop that never resolves, so it can go round forever.':
    'वह लूप जो कभी सुलझता नहीं, इसलिए हमेशा घूमता रह सकता है।',
  'Stepwise descending, out of Flamenco. The V7 at the bottom is what makes it Spanish rather than merely minor.':
    'फ्लेमेंको से आया, कदम-दर-कदम उतरता हुआ। नीचे का V7 ही इसे केवल माइनर नहीं, स्पेनिश बनाता है।',
  'Eight bars from 1680 that pop music has never stopped borrowing.':
    '1680 के आठ बार, जिन्हें पॉप संगीत आज तक उधार लेता आ रहा है।',
  'I–vi–IV–V. Fifty years of hits and it still has not worn out.':
    'I–vi–IV–V। पचास साल के हिट, और अब तक घिसा नहीं।',

  // ---------------------------------------------------------------- tuner
  'Instrument': 'वाद्य',
  'Tuning meter': 'ट्यूनिंग मीटर',
  'A4 = {hz} Hz': 'A4 = {hz} Hz',
  'Signal:': 'संकेत:',
  'Status:': 'स्थिति:',
  'Freq: —': 'आवृत्ति: —',
  'Freq: {hz}Hz': 'आवृत्ति: {hz} Hz',
  'listening': 'सुन रहा है',
  'LOCKED': 'सुर में',
  'FLAT': 'नीचे',
  'SHARP': 'ऊपर',
  'START LISTENING': 'सुनना शुरू करें',
  'STOP LISTENING': 'सुनना बंद करें',
  'Auto': 'स्वतः',
  'AUTO': 'स्वतः',
  'Manual': 'हाथ से',
  'MANUAL · {note}': 'हाथ से · {note}',
  'OPTIONS': 'विकल्प',
  'TARGET': 'लक्ष्य',
  'REFERENCE TONE': 'संदर्भ स्वर',
  'CHIME WHEN IN TUNE': 'सुर में आने पर घंटी',
  'SENSITIVITY': 'संवेदनशीलता',
  'RESPONSE': 'प्रतिक्रिया',
  'IN-TUNE WINDOW': 'सुर की सीमा',
  'REFERENCE A4': 'संदर्भ A4',
  'Follows the nearest string in the tuning': 'ट्यूनिंग की सबसे नज़दीकी तार का अनुसरण करता है',
  'Holds the string you pinned': 'आपकी चुनी हुई तार पर टिका रहता है',
  'Follows whichever string of the tuning is nearest to what it hears':
    'जो सुनाई देता है, ट्यूनिंग की उसके सबसे नज़दीक की तार का अनुसरण करता है',
  'Stays on the pinned string, however far out it is':
    'चुनी हुई तार पर ही टिका रहता है, चाहे वह कितनी भी बेसुरी हो',
  'Sine': 'साइन',
  'Warm': 'गर्म',
  'String': 'तार',
  'Tapping a string pins it without sounding anything.':
    'किसी तार पर टैप करने से वह चुन ली जाती है, बिना कुछ बजाए।',
  'A clean sine, sounded once. Tap again to hear it again.':
    'एक साफ़ साइन, एक बार बजती है। फिर सुनने के लिए दोबारा टैप कीजिए।',
  'A triangle — rounder, and easier to pitch against.':
    'एक ट्रायंगल तरंग — ज़्यादा गोल, और सुर मिलाने में आसान।',
  'One pluck of the guitar itself, on the melody voices.':
    'गिटार की अपनी एक ही झंकार, धुन वाले स्वरों पर।',
  'A short two-note chime the moment a string settles':
    'तार के सुर में आते ही दो स्वरों की छोटी घंटी',
  'Silent — watch the dial': 'चुप — डायल देखिए',
  'Low': 'कम',
  'Normal': 'सामान्य',
  'High': 'ज़्यादा',
  'Steady': 'स्थिर',
  'Quick': 'तेज़',
  'The default': 'डिफ़ॉल्ट',
  'The default; below what most ears hear': 'डिफ़ॉल्ट; अधिकांश कान जितना सुन पाते हैं उससे कम',
  'Ignores everything quiet — for noisy rooms': 'हर धीमी आवाज़ अनदेखी कर देता है — शोरगुल वाले कमरों के लिए',
  'Hears a soft, decaying note for longer': 'धीमे पड़ते हल्के स्वर को ज़्यादा देर सुनता है',
  'Slower needle, less jitter': 'धीमी सुई, कम कँपकँपी',
  'Follows the string immediately': 'तार का तुरंत अनुसरण करता है',
  'Studio — hard to hold, exact when it locks': 'स्टूडियो — टिकाना कठिन, पर सटीक जब जम जाए',
  'Forgiving — locks quickly on stage': 'उदार — मंच पर जल्दी जम जाता है',
  'Uses the microphone. Nothing is recorded or sent anywhere.':
    'माइक्रोफ़ोन का उपयोग करता है। कुछ भी रिकॉर्ड या कहीं भेजा नहीं जाता।',
  'Listening is unavailable here — the page CircleSong is embedded in withholds the microphone.':
    'यहाँ सुनना संभव नहीं — जिस पृष्ठ में CircleSong जड़ा है, वह माइक्रोफ़ोन नहीं देता।',
  'Open CircleSong at its own address to listen. Tap a string to hear its exact pitch and tune by ear — that works anywhere.':
    'सुनने के लिए CircleSong को उसके अपने पते पर खोलिए। किसी तार पर टैप कर उसका सटीक सुर सुनिए और कान से मिलाइए — यह हर जगह काम करता है।',
  'Audio could not start, so the tuner cannot listen.':
    'ऑडियो शुरू नहीं हो सका, इसलिए ट्यूनर सुन नहीं सकता।',
  'This browser does not offer microphone access to the page.':
    'यह ब्राउज़र पृष्ठ को माइक्रोफ़ोन तक पहुँच नहीं देता।',
  'The page CircleSong is embedded in has not granted it the microphone, so it cannot even ask.':
    'जिस पृष्ठ में CircleSong जड़ा है, उसने माइक्रोफ़ोन नहीं दिया, इसलिए यह माँग भी नहीं सकता।',
  'Open CircleSong from its own address — the installed app, or the copy served from GitHub — and listening will work.':
    'CircleSong को उसके अपने पते से खोलिए — इंस्टॉल किया गया ऐप, या GitHub से दी गई प्रति — तब सुनना काम करेगा।',
  'Meanwhile you can tune by ear: tap a string above to hear its exact pitch.':
    'तब तक आप कान से मिला सकते हैं: ऊपर किसी तार पर टैप कर उसका सटीक सुर सुनिए।',
  'Microphone access was refused. Allow it for this page in your browser’s site settings, then switch Listen on again. You can tune by ear in the meantime — tap a string above to hear its pitch.':
    'माइक्रोफ़ोन की अनुमति नहीं मिली। अपने ब्राउज़र की साइट सेटिंग में इस पृष्ठ के लिए इसे अनुमति दीजिए, फिर «सुनें» दोबारा चालू कीजिए। तब तक कान से मिला सकते हैं — ऊपर किसी तार पर टैप कर उसका सुर सुनिए।',
  'No microphone was found on this device. Tap a string above to hear its pitch and tune by ear.':
    'इस डिवाइस पर कोई माइक्रोफ़ोन नहीं मिला। ऊपर किसी तार पर टैप कर उसका सुर सुनिए और कान से मिलाइए।',
  'The microphone could not be opened — {error}.':
    'माइक्रोफ़ोन नहीं खुल सका — {error}।',
  'unknown error': 'अज्ञात त्रुटि',
  'Guitar': 'गिटार',
  'Bass': 'बास',
  'Ukulele': 'युकलेले',
  'Mandolin': 'मैंडोलिन',
  'Banjo': 'बैंजो',
  'Violin': 'वायलिन',
  'Cello / Viola': 'चेलो / वियोला',
  'Chromatic': 'क्रोमैटिक',
  'Chromatic — play any note and it will be named. Tap one to hear it.':
    'क्रोमैटिक — कोई भी स्वर बजाइए, उसका नाम बता दिया जाएगा। किसी एक पर टैप कर उसे सुनिए।',
  'Standard — E A D G B E': 'मानक — E A D G B E',
  'Drop D — D A D G B E': 'ड्रॉप D — D A D G B E',
  'Half step down — E♭ A♭ D♭ G♭ B♭ E♭': 'आधा स्वर नीचे — E♭ A♭ D♭ G♭ B♭ E♭',
  'Full step down — D G C F A D': 'पूरा स्वर नीचे — D G C F A D',
  'Open G — D G D G B D': 'ओपन G — D G D G B D',
  'Open D — D A D F♯ A D': 'ओपन D — D A D F♯ A D',
  'DADGAD — D A D G A D': 'DADGAD — D A D G A D',
  'Drop C — C G C F A D': 'ड्रॉप C — C G C F A D',
  '7-string — B E A D G B E': '7 तार — B E A D G B E',
  'Standard 4-string — E A D G': 'मानक 4 तार — E A D G',
  'Drop D — D A D G': 'ड्रॉप D — D A D G',
  'Half step down — E♭ A♭ D♭ G♭': 'आधा स्वर नीचे — E♭ A♭ D♭ G♭',
  'Standard 5-string — B E A D G': 'मानक 5 तार — B E A D G',
  'Standard high-G — G C E A': 'मानक ऊँचा G — G C E A',
  'Low-G — G C E A': 'नीचा G — G C E A',
  'D tuning — A D F♯ B': 'D ट्यूनिंग — A D F♯ B',
  'Baritone — D G B E': 'बैरिटोन — D G B E',
  'Standard — G D A E': 'मानक — G D A E',
  'Open G — F♯ D A D': 'ओपन G — F♯ D A D',
  'Open G 5-string — g D G B D': 'ओपन G, 5 तार — g D G B D',
  'Double C — g C G C D': 'डबल C — g C G C D',
  'Sawmill — g D G C D': 'सॉमिल — g D G C D',
  'Cello — C G D A': 'चेलो — C G D A',
  'Viola — C G D A': 'वियोला — C G D A',
  'Any note — C1 to B6': 'कोई भी स्वर — C1 से B6 तक',

  // ---------------------------------------------------------------- songs
  'CURRENT SONG': 'वर्तमान गीत',
  'Save': 'सहेजें',
  'Save as new': 'नए के रूप में सहेजें',
  'New song': 'नया गीत',
  'Open': 'खोलें',
  'Import a song file': 'गीत की फ़ाइल आयात करें',
  'Nothing saved yet.': 'अभी कुछ भी सहेजा नहीं गया।',
  'Nothing saved yet. Save the current song to start a library.':
    'अभी कुछ भी सहेजा नहीं गया। संग्रह शुरू करने के लिए वर्तमान गीत सहेजिए।',
  '{n} loop': '{n} लूप',
  '{n} loops': '{n} लूप',
  '{n} bar written': '{n} बार लिखा गया',
  '{n} bars written': '{n} बार लिखे गए',
  'saved': 'सहेजा गया',
  'just now': 'अभी-अभी',
  '{n} min ago': '{n} मिनट पहले',
  '{n} h ago': '{n} घंटे पहले',
  'Delete “{name}”? This cannot be undone.': '«{name}» हटाएँ? यह वापस नहीं लिया जा सकता।',
  'Project deleted.': 'प्रोजेक्ट हटा दिया गया।',
  'That project could not be read.': 'वह प्रोजेक्ट पढ़ा नहीं जा सका।',
  'Opened “{name}”.': '«{name}» खोला गया।',
  'Saved “{name}”.': '«{name}» सहेजा गया।',
  'Loaded “{name}”.': '«{name}» लोड किया गया।',
  'This browser will not let the app save locally.':
    'यह ब्राउज़र ऐप को स्थानीय रूप से सहेजने नहीं देगा।',
  'This browser will not let the app store anything locally.':
    'यह ब्राउज़र ऐप को स्थानीय रूप से कुछ भी रखने नहीं देगा।',
  "No room left in this browser's storage. Delete a project and try again.":
    'इस ब्राउज़र के भंडार में जगह नहीं बची। कोई प्रोजेक्ट हटाकर फिर कोशिश कीजिए।',
  'Start a new song? Anything unsaved will be lost.':
    'नया गीत शुरू करें? जो सहेजा नहीं गया है, वह खो जाएगा।',
  'New song started.': 'नया गीत शुरू हुआ।',
  'Could not read that file — {error}': 'वह फ़ाइल पढ़ी नहीं जा सकी — {error}',
  'Unrecognised file format': 'अपरिचित फ़ाइल प्रारूप',
};

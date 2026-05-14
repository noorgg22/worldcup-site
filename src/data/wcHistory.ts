// "This Day in World Cup History" — famous moments keyed by MM-DD
// Dates are the actual match/event dates (all UTC/local match dates)

export interface HistoryMoment {
  id: string;
  date: string;       // MM-DD format for lookup
  fullDate: string;   // Display: "June 22, 1986"
  isoDate: string;    // YYYY-MM-DD
  title: string;
  summary: string;
  detail: string;
  category: 'goal' | 'upset' | 'record' | 'controversy' | 'final' | 'moment';
  teams?: string[];
  flags?: string[];
  videoQuery?: string; // YouTube search query — opens youtube.com/results
  youtubeId?: string;  // YouTube video ID for direct embed (takes priority over videoQuery)
}

export const WC_HISTORY_MOMENTS: HistoryMoment[] = [
  {
    id: 'maradona-hand-of-god',
    date: '06-22',
    fullDate: 'June 22, 1986',
    isoDate: '1986-06-22',
    title: 'The Hand of God & Goal of the Century',
    summary: 'Maradona scores two of the most iconic goals in football history in a single match.',
    detail: 'In the 1986 World Cup quarterfinal between Argentina and England, Diego Maradona scored two goals that defined his legacy and football history. The first — punched in with his left hand — he later described as scored "a little with the head of Maradona and a little with the hand of God." Four minutes later, he collected the ball in his own half and dribbled past five England defenders and the goalkeeper to score what FIFA voted the Goal of the Century. Argentina won 2–1 and went on to lift the trophy.',
    category: 'moment',
    teams: ['Argentina', 'England'],
    flags: ['🇦🇷', '🏴󠁧󠁢󠁥󠁮󠁧󠁿'],
    videoQuery: 'Maradona Hand of God Goal of the Century 1986 World Cup',
  },
  {
    id: 'germany-brazil-7-1',
    date: '07-08',
    fullDate: 'July 8, 2014',
    isoDate: '2014-07-08',
    title: 'The Mineirazo — Germany 7–1 Brazil',
    summary: 'Host nation Brazil suffers a historic 7–1 semifinal collapse against Germany.',
    detail: 'In the 2014 World Cup semifinal at Estádio Mineirão in Belo Horizonte, Germany dismantled host Brazil 7–1 in one of the most shocking results in football history. Germany scored five goals in 18 devastating first-half minutes. Thomas Müller (hat-trick), Miroslav Klose (his record 16th WC goal), Toni Kroos (2), Sami Khedira, and André Schürrle scored. The result, known as the "Mineirazo," left Brazilians in stunned tears and remains the heaviest defeat ever suffered by a World Cup host.',
    category: 'moment',
    teams: ['Germany', 'Brazil'],
    flags: ['🇩🇪', '🇧🇷'],
    videoQuery: 'Germany 7-1 Brazil 2014 World Cup semifinal',
    youtubeId: 'TbDzouUuD8E',
  },
  {
    id: 'iniesta-final-goal',
    date: '07-11',
    fullDate: 'July 11, 2010',
    isoDate: '2010-07-11',
    title: 'Iniesta\'s Extra-Time Winner — Spain\'s First World Cup',
    summary: 'Andrés Iniesta\'s 116th-minute goal gives Spain their first ever World Cup title.',
    detail: 'In the 2010 World Cup Final in Johannesburg, Spain and Netherlands were level at 0–0 after 90 minutes of a bruising final. In the 116th minute of extra time, Cesc Fàbregas played a perfectly weighted through ball and Andrés Iniesta buried it past Dutch goalkeeper Maarten Stekelenburg. Iniesta pulled off his shirt to reveal a message dedicating the goal to his friend Dani Jarque, who had died the previous year. Spain won 1–0 to become world champions for the first time.',
    category: 'final',
    teams: ['Spain', 'Netherlands'],
    flags: ['🇪🇸', '🇳🇱'],
    videoQuery: 'Iniesta goal 2010 World Cup final Spain Netherlands',
    youtubeId: '2WmSkGwEN5Q',
  },
  {
    id: 'zidane-headbutt',
    date: '07-09',
    fullDate: 'July 9, 2006',
    isoDate: '2006-07-09',
    title: 'Zidane\'s Headbutt — The Final Goodbye',
    summary: 'Zinedine Zidane ends his career with a red card for headbutting Materazzi in the World Cup Final.',
    detail: 'In the 2006 World Cup Final in Berlin, France and Italy were level 1–1 heading into extra time. In the 110th minute, Zinedine Zidane — playing the final match of his career — turned and headbutted Italian defender Marco Materazzi in the chest, knocking him to the ground. He was shown a straight red card and sent off. Zidane had opened the scoring with a Panenka penalty and was in line to be named player of the match. Italy won on penalties 5–3. Materazzi later revealed he had insulted Zidane\'s sister, provoking the reaction.',
    category: 'controversy',
    teams: ['France', 'Italy'],
    flags: ['🇫🇷', '🇮🇹'],
    videoQuery: 'Zidane headbutt Materazzi 2006 World Cup Final',
    youtubeId: 'DhIAs8vRZlc',
  },
  {
    id: 'miracle-of-bern',
    date: '07-04',
    fullDate: 'July 4, 1954',
    isoDate: '1954-07-04',
    title: 'The Miracle of Bern — West Germany 3–2 Hungary',
    summary: 'West Germany stuns tournament favorites Hungary to win their first World Cup.',
    detail: 'The 1954 World Cup Final in Bern, Switzerland pitted unbeaten Hungary — regarded as the greatest team in the world — against West Germany, who Hungary had beaten 8–3 in the group stage. Hungary led 2–0 after 8 minutes. Helmut Rahn scored twice, including the winner in the 84th minute, to complete an astonishing comeback. The result became known as the "Miracle of Bern" and was hugely significant for post-war West German national identity. The match inspired an award-winning German film of the same name.',
    category: 'upset',
    teams: ['West Germany', 'Hungary'],
    flags: ['🇩🇪', '🇭🇺'],
    videoQuery: 'Miracle of Bern 1954 World Cup Final West Germany Hungary',
  },
  {
    id: 'pele-first-wc-goal',
    date: '06-19',
    fullDate: 'June 19, 1958',
    isoDate: '1958-06-19',
    title: 'Pelé Becomes Youngest World Cup Goalscorer',
    summary: 'A 17-year-old Pelé scores against Wales, becoming the youngest WC goalscorer in history.',
    detail: 'In the 1958 World Cup quarterfinal between Brazil and Wales in Gothenburg, a 17-year-old Pelé scored the only goal of the match — his first World Cup goal — to send Brazil to the semifinal. At 17 years and 239 days old, he became the youngest goalscorer in World Cup history, a record that has never been broken. He went on to score a hat-trick against France in the semifinal and two goals in the final against Sweden. Brazil won 5–2 for their first ever World Cup title.',
    category: 'record',
    teams: ['Brazil', 'Wales'],
    flags: ['🇧🇷', '🏴󠁧󠁢󠁷󠁬󠁳󠁿'],
    videoQuery: 'Pelé youngest World Cup goalscorer 1958 Brazil Wales',
  },
  {
    id: 'roger-milla-dance',
    date: '06-23',
    fullDate: 'June 23, 1990',
    isoDate: '1990-06-23',
    title: 'Roger Milla & The Corner Flag Dance',
    summary: 'Cameroon\'s 38-year-old substitute Roger Milla scores twice and celebrates at the corner flag.',
    detail: 'At the 1990 World Cup in Italy, Cameroon\'s Roger Milla came off the bench against Colombia in the Round of 16 and scored two goals — at the age of 38 — to send Cameroon through 2–1. His distinctive corner-flag dance became one of the most iconic celebrations in World Cup history. Cameroon became the first African nation to reach the World Cup quarterfinals. Milla would return in 1994 at age 42, scoring against Russia to become the oldest ever World Cup goalscorer.',
    category: 'moment',
    teams: ['Cameroon', 'Colombia'],
    flags: ['🇨🇲', '🇨🇴'],
    videoQuery: 'Roger Milla corner flag dance 1990 World Cup Cameroon',
    youtubeId: 'ku206qzLrzg',
  },
  {
    id: 'senegal-france-2002',
    date: '05-31',
    fullDate: 'May 31, 2002',
    isoDate: '2002-05-31',
    title: 'Senegal Stuns France — Defending Champions Crash Out',
    summary: 'Debut nation Senegal defeats World Cup defending champion France 1–0 in the tournament opener.',
    detail: 'The opening match of the 2002 World Cup in Seoul saw debutants Senegal pull off one of the biggest upsets in tournament history, defeating reigning champions France 1–0. Papa Bouba Diop scored the winner. France, who also lost to Uruguay and Denmark without scoring a single goal, were eliminated in the group stage — the first time a defending champion had been knocked out without scoring. Senegal went on to reach the quarterfinals, the best ever African World Cup performance at the time.',
    category: 'upset',
    teams: ['Senegal', 'France'],
    flags: ['🇸🇳', '🇫🇷'],
    videoQuery: 'Senegal vs France 2002 World Cup opening match upset',
    youtubeId: 'UC-12ZNs2xg',
  },
  {
    id: 'italy-west-germany-1970',
    date: '06-17',
    fullDate: 'June 17, 1970',
    isoDate: '1970-06-17',
    title: 'The Game of the Century — Italy 4–3 West Germany',
    summary: 'FIFA votes the 1970 semifinal between Italy and West Germany the Game of the Century.',
    detail: 'In the 1970 World Cup semifinal in Mexico City, Italy and West Germany produced one of the most dramatic matches in football history. West Germany equalized in the 90th minute through Karl-Heinz Schnellinger. The match then exploded in extra time: four more goals were scored, with the lead changing hands multiple times. Italy ultimately won 4–3 to reach the final. FIFA later voted the match "Game of the Century" and erected a commemorative plaque at the Azteca Stadium.',
    category: 'moment',
    teams: ['Italy', 'West Germany'],
    flags: ['🇮🇹', '🇩🇪'],
    videoQuery: 'Italy West Germany 1970 World Cup semifinal Game of the Century',
  },
  {
    id: 'england-1966-final',
    date: '07-30',
    fullDate: 'July 30, 1966',
    isoDate: '1966-07-30',
    title: 'England\'s Only World Cup Title',
    summary: 'England defeats West Germany 4–2 at Wembley in extra time — their only World Cup triumph.',
    detail: 'England hosted and won the 1966 World Cup Final at Wembley, defeating West Germany 4–2 in extra time. West Germany equalized in the 89th minute to force extra time. Geoff Hurst then struck the crossbar with the ball controversially bouncing down — the "goal" was awarded despite debate. Hurst completed his hat-trick in injury time to seal a famous 4–2 win. It remains England\'s only World Cup title. The "Hurst hat-trick" and "was it over the line?" remain football talking points 60 years later.',
    category: 'final',
    teams: ['England', 'West Germany'],
    flags: ['🏴󠁧󠁢󠁥󠁮󠁧󠁿', '🇩🇪'],
    videoQuery: 'England 1966 World Cup Final Geoff Hurst hat-trick',
    youtubeId: '9687zUgzILo',
  },
  {
    id: 'usa-shock-england-1950',
    date: '06-29',
    fullDate: 'June 29, 1950',
    isoDate: '1950-06-29',
    title: 'USA Shocks England 1–0',
    summary: 'Amateur USA defeats England in one of the biggest World Cup upsets ever.',
    detail: 'At the 1950 World Cup in Brazil, the United States — a team of amateurs and part-timers — defeated England 1–0 in Belo Horizonte. Joe Gaetjens headed in the winning goal in the 37th minute. England, one of the pre-tournament favorites making their first ever World Cup appearance, were stunned. The result was so unbelievable that some English newspapers initially printed it as a typo, assuming it must have been 10–1 to England. The match remains one of the greatest upsets in World Cup history.',
    category: 'upset',
    teams: ['USA', 'England'],
    flags: ['🇺🇸', '🏴󠁧󠁢󠁥󠁮󠁧󠁿'],
    videoQuery: 'USA beats England 1950 World Cup biggest upset',
  },
  {
    id: 'messi-2022-winner',
    date: '12-18',
    fullDate: 'December 18, 2022',
    isoDate: '2022-12-18',
    title: 'Messi Finally Lifts the World Cup',
    summary: 'Argentina defeats France in the greatest World Cup Final ever, ending Messi\'s 20-year quest.',
    detail: 'The 2022 World Cup Final in Lusail, Qatar produced the greatest match in World Cup history. Argentina led 2–0 with 10 minutes remaining before Kylian Mbappé scored twice in 97 seconds to equalize. In extra time, Messi scored Argentina\'s third goal, only for Mbappé to complete a hat-trick and make it 3–3. The shootout came down to nerves — Argentina\'s goalkeeper Emiliano Martínez saved two penalties and Gonzalo Montiel converted the winner. Messi, playing in his fifth and final World Cup at 35, finally lifted the trophy he had spent his entire career pursuing.',
    category: 'final',
    teams: ['Argentina', 'France'],
    flags: ['🇦🇷', '🇫🇷'],
    videoQuery: 'Argentina vs France 2022 World Cup Final Messi',
    youtubeId: 'Mxkg3qLIPC8',
  },
  {
    id: 'klose-record-goal',
    date: '07-08',
    fullDate: 'July 8, 2014',
    isoDate: '2014-07-08',
    title: 'Klose Breaks All-Time Scoring Record',
    summary: 'Miroslav Klose scores his record 16th World Cup goal, surpassing Ronaldo during the 7–1 win.',
    detail: 'During Germany\'s historic 7–1 semifinal victory over Brazil, Miroslav Klose scored Germany\'s second goal to become the all-time leading scorer in World Cup history with 16 goals. He surpassed Brazilian legend Ronaldo, who had held the record with 15 goals. Klose celebrated modestly, fully aware of the weight of the moment amid the chaos unfolding at the Mineirão. His record across four World Cups (2002, 2006, 2010, 2014) is widely considered one of the most unassailable in football.',
    category: 'record',
    teams: ['Germany', 'Brazil'],
    flags: ['🇩🇪', '🇧🇷'],
    videoQuery: 'Klose record breaking 16th World Cup goal 2014',
  },
  {
    id: 'morocco-semifinal-2022',
    date: '12-14',
    fullDate: 'December 14, 2022',
    isoDate: '2022-12-14',
    title: 'Morocco Makes History — Africa\'s First World Cup Semifinal',
    summary: 'Morocco becomes the first African and Arab nation to reach a World Cup semifinal.',
    detail: 'At the 2022 World Cup in Qatar, Morocco stunned the world by reaching the semifinal — becoming the first African or Arab nation in history to do so. They eliminated Belgium (2–0), Spain (on penalties), and Portugal (1–0) along the way. Youssef En-Nesyri\'s header against Portugal sent the Atlas Lions into the last four. Though they lost to France 2–0 in the semifinal, Morocco\'s historic run united the Arab world and inspired a generation of African footballers. Their achievement remains the greatest by any African team in World Cup history.',
    category: 'moment',
    teams: ['Morocco', 'Portugal'],
    flags: ['🇲🇦', '🇵🇹'],
    videoQuery: 'Morocco quarterfinal win 2022 World Cup Portugal',
    youtubeId: 'op4mGRTAlEY',
  },
  {
    id: 'sukur-fastest-goal',
    date: '06-29',
    fullDate: 'June 29, 2002',
    isoDate: '2002-06-29',
    title: 'Hakan Şükür — Fastest Goal in World Cup History',
    summary: 'Turkey\'s Hakan Şükür scores 11 seconds into the third-place playoff — the fastest WC goal ever.',
    detail: 'In the 2002 World Cup third-place match between Turkey and South Korea, Turkish striker Hakan Şükür received a long ball from kick-off and scored after just 11 seconds — the fastest goal in World Cup history. It came as some payback: South Korea had beaten Turkey\'s neighbour Japan and eliminated Italy and Spain controversially. Turkey won the match 3–2 to finish third, their best ever World Cup result. Şükür\'s record has stood for over two decades and counting.',
    category: 'record',
    teams: ['Turkey', 'South Korea'],
    flags: ['🇹🇷', '🇰🇷'],
    videoQuery: 'Hakan Sukur fastest goal World Cup history 11 seconds 2002',
    youtubeId: 'SK1aDApXGOQ',
  },
  {
    id: 'north-korea-italy-1966',
    date: '07-19',
    fullDate: 'July 19, 1966',
    isoDate: '1966-07-19',
    title: 'North Korea Eliminates Italy',
    summary: 'North Korea shocks Italy 1–0 to reach the quarterfinals in one of football\'s greatest upsets.',
    detail: 'At the 1966 World Cup in Middlesbrough, Park Doo-ik scored the only goal as North Korea defeated Italy 1–0, sending the Azzurri home in disgrace. Italy had been heavy favorites. The result sent North Korea to the quarterfinals where they famously led Portugal 3–0 before Eusébio scored four times in a stunning Portuguese comeback to win 5–3. The Italian players were pelted with tomatoes on their return home. The story was immortalized in the 2002 documentary "The Game of Their Lives."',
    category: 'upset',
    teams: ['North Korea', 'Italy'],
    flags: ['🇰🇵', '🇮🇹'],
    videoQuery: 'North Korea beats Italy 1966 World Cup biggest upset',
  },
  {
    id: 'west-germany-penalties-1982',
    date: '07-08',
    fullDate: 'July 8, 1982',
    isoDate: '1982-07-08',
    title: 'First Penalty Shootout in World Cup History',
    summary: 'West Germany vs France in 1982 produces the first ever World Cup penalty shootout.',
    detail: 'The 1982 World Cup semifinal between West Germany and France in Seville is remembered for two things: the brutal foul by German goalkeeper Harald Schumacher on Patrick Battiston (who lost two teeth and was carried off unconscious — no red card was given), and the first ever penalty shootout in World Cup history. France led 3–1 in extra time before West Germany equalized. The shootout went to sudden death, with Schumacher saving from Bossis to send West Germany through. A night of controversy that changed football forever.',
    category: 'controversy',
    teams: ['West Germany', 'France'],
    flags: ['🇩🇪', '🇫🇷'],
    videoQuery: 'West Germany France 1982 World Cup semifinal first penalty shootout',
  },
  {
    id: 'ronaldo-1998-final',
    date: '07-12',
    fullDate: 'July 12, 1998',
    isoDate: '1998-07-12',
    title: 'The Ronaldo Mystery — Brazil\'s 1998 Final',
    summary: 'Brazil\'s talisman Ronaldo plays the 1998 final in mysterious circumstances — France win 3–0.',
    detail: 'Hours before the 1998 World Cup Final in Paris, Brazil\'s lineup was submitted without Ronaldo — then withdrawn and resubmitted with him. He played but was clearly not himself. France won 3–0 with a Zinedine Zidane double. It later emerged Ronaldo had suffered a convulsive fit in the team hotel before the match. The true story remains partly disputed, with various accounts of pressure from kit sponsor Nike and team officials. The "Ronaldo mystery" became one of football\'s most enduring controversies.',
    category: 'controversy',
    teams: ['Brazil', 'France'],
    flags: ['🇧🇷', '🇫🇷'],
    videoQuery: 'Ronaldo 1998 World Cup Final mystery France Brazil',
  },
  {
    id: 'greece-2004-euro-comparison',
    date: '06-20',
    fullDate: 'June 20, 2010',
    isoDate: '2010-06-20',
    title: 'North Korea\'s World Cup Return After 44 Years',
    summary: 'North Korea return to the World Cup for the first time since 1966, facing Brazil.',
    detail: 'North Korea qualified for the 2010 World Cup in South Africa — their first appearance since their legendary 1966 campaign 44 years earlier. They were drawn against Brazil, Portugal, and Ivory Coast in what many called the "Group of Death." They held Portugal\'s full strength side to 0–0 at halftime before losing 7–0. Their campaign ended after the group stage but their presence captivated the world and brought memories of their 1966 giant-killing flooding back.',
    category: 'moment',
    teams: ['North Korea', 'Brazil'],
    flags: ['🇰🇵', '🇧🇷'],
    videoQuery: 'North Korea 2010 World Cup South Africa return',
  },
  {
    id: 'fontaine-13-goals',
    date: '06-28',
    fullDate: 'June 28, 1958',
    isoDate: '1958-06-28',
    title: 'Just Fontaine\'s Extraordinary 13-Goal Tournament',
    summary: 'France\'s Just Fontaine scores his 12th and 13th goals in the 3rd-place match — a record for all time.',
    detail: 'At the 1958 World Cup in Sweden, French striker Just Fontaine scored 13 goals in just 6 matches — a record that has stood for over 65 years and is widely regarded as untouchable. In the third-place match against West Germany, Fontaine scored four goals to take his tally to 13. He finished the tournament as top scorer with a phenomenal goal-per-game ratio. Fontaine was a late callup to the squad — the starting centre-forward had been injured before the tournament — making his achievement even more remarkable.',
    category: 'record',
    teams: ['France', 'West Germany'],
    flags: ['🇫🇷', '🇩🇪'],
    videoQuery: 'Just Fontaine 13 goals 1958 World Cup record France',
  },
];

// Helper: get moments for a given MM-DD date
export function getMomentsForDate(mmdd: string): HistoryMoment[] {
  return WC_HISTORY_MOMENTS.filter(m => m.date === mmdd);
}

// Helper: get today's or nearest moments
export function getTodayOrNearestMoments(): HistoryMoment[] {
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayKey = `${mm}-${dd}`;

  const todayMoments = getMomentsForDate(todayKey);
  if (todayMoments.length > 0) return todayMoments;

  // Find nearest (search ±15 days)
  const allDates = WC_HISTORY_MOMENTS.map(m => m.date);
  const unique = [...new Set(allDates)].sort();

  const todayNum = parseInt(mm) * 100 + parseInt(dd);
  let closest = unique[0];
  let minDiff = Infinity;

  for (const d of unique) {
    const [m2, d2] = d.split('-').map(Number);
    const num = m2 * 100 + d2;
    const diff = Math.abs(num - todayNum);
    const wrapDiff = 1200 - diff; // wrap around year
    const effectiveDiff = Math.min(diff, wrapDiff);
    if (effectiveDiff < minDiff) {
      minDiff = effectiveDiff;
      closest = d;
    }
  }

  return getMomentsForDate(closest);
}

// All moments sorted chronologically by date (for the full history page)
export const WC_HISTORY_SORTED = [...WC_HISTORY_MOMENTS].sort(
  (a, b) => a.isoDate.localeCompare(b.isoDate)
);

export const CATEGORY_LABELS: Record<HistoryMoment['category'], string> = {
  goal: 'Goal',
  upset: 'Upset',
  record: 'Record',
  controversy: 'Controversy',
  final: 'Final',
  moment: 'Iconic Moment',
};

export const CATEGORY_COLORS: Record<HistoryMoment['category'], string> = {
  goal: '#f5c842',
  upset: '#ef5350',
  record: '#4fc3f7',
  controversy: '#ab47bc',
  final: '#e8a020',
  moment: '#66bb6a',
};

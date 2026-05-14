export type MatchStatus = 'upcoming' | 'live' | 'completed';
export type MatchRound = 'group' | 'r32' | 'r16' | 'qf' | 'sf' | 'final';

export interface GoalEvent {
  player: string;
  minute: number;
  isPenalty?: boolean;
  isOwnGoal?: boolean;
}

export interface MatchTeam {
  name: string;
  flag: string;
  score?: number;
  scorers?: GoalEvent[];
}

export interface MatchStatsFull {
  possession: [number, number];   // [home, away]
  shots: [number, number];
  shotsOnTarget: [number, number];
  corners: [number, number];
  fouls: [number, number];
  yellowCards: [number, number];
  redCards: [number, number];
  xG: [number, number];
}

export interface Match {
  id: string;
  group: string;          // 'A'–'L', or 'R32'/'R16'/'QF'/'SF'/'F'
  round: MatchRound;
  matchday?: 1 | 2 | 3;
  date: string;           // display: 'Jun 11'
  isoDate: string;        // sort key: '2026-06-11'
  time: string;           // '7:00 PM ET'
  venue: string;
  city: string;
  home: MatchTeam;
  away: MatchTeam;
  status: MatchStatus;
  stats?: MatchStatsFull;
  highlightUrl?: string;
}

// ── factory ──────────────────────────────────────────────────────────────────
const mk = (
  id: string, group: string, round: MatchRound, matchday: 1|2|3|undefined,
  date: string, isoDate: string, time: string, venue: string, city: string,
  homeName: string, homeFlag: string, awayName: string, awayFlag: string,
  status: MatchStatus = 'upcoming',
): Match => ({
  id, group, round, matchday, date, isoDate, time, venue, city,
  home: { name: homeName, flag: homeFlag },
  away: { name: awayName, flag: awayFlag },
  status,
});

// ── GROUP STAGE — 72 matches ──────────────────────────────────────────────────
export const ALL_MATCHES: Match[] = [

  // ── Group A: Mexico · South Africa · Korea Republic · Czechia ────────────
  mk('A1','A','group',1,'Jun 11','2026-06-11','7:00 PM ET','SoFi Stadium','Los Angeles','Mexico','🇲🇽','South Africa','🇿🇦'),
  mk('A2','A','group',1,'Jun 11','2026-06-11','10:00 PM ET','AT&T Stadium','Dallas','Korea Republic','🇰🇷','Czechia','🇨🇿'),
  mk('A3','A','group',2,'Jun 19','2026-06-19','3:00 PM ET','Lumen Field','Seattle','Mexico','🇲🇽','Korea Republic','🇰🇷'),
  mk('A4','A','group',2,'Jun 19','2026-06-19','6:00 PM ET','Hard Rock Stadium','Miami','South Africa','🇿🇦','Czechia','🇨🇿'),
  mk('A5','A','group',3,'Jun 26','2026-06-26','3:00 PM ET','Mercedes-Benz Stadium','Atlanta','Mexico','🇲🇽','Czechia','🇨🇿'),
  mk('A6','A','group',3,'Jun 26','2026-06-26','3:00 PM ET','Arrowhead Stadium','Kansas City','South Africa','🇿🇦','Korea Republic','🇰🇷'),

  // ── Group B: Canada · Switzerland · Qatar · Bosnia & Herzegovina ──────────
  mk('B1','B','group',1,'Jun 12','2026-06-12','3:00 PM ET','BMO Field','Toronto','Canada','🇨🇦','Switzerland','🇨🇭'),
  mk('B2','B','group',1,'Jun 12','2026-06-12','6:00 PM ET','Gillette Stadium','Boston','Qatar','🇶🇦','Bosnia & Herzegovina','🇧🇦'),
  mk('B3','B','group',2,'Jun 20','2026-06-20','3:00 PM ET','BC Place','Vancouver','Canada','🇨🇦','Qatar','🇶🇦'),
  mk('B4','B','group',2,'Jun 20','2026-06-20','6:00 PM ET','Lincoln Financial Field','Philadelphia','Switzerland','🇨🇭','Bosnia & Herzegovina','🇧🇦'),
  mk('B5','B','group',3,'Jun 26','2026-06-26','6:00 PM ET','BMO Field','Toronto','Canada','🇨🇦','Bosnia & Herzegovina','🇧🇦'),
  mk('B6','B','group',3,'Jun 26','2026-06-26','6:00 PM ET','MetLife Stadium','New York / NJ','Switzerland','🇨🇭','Qatar','🇶🇦'),

  // ── Group C: Brazil · Morocco · Haiti · Scotland ──────────────────────────
  mk('C1','C','group',1,'Jun 12','2026-06-12','9:00 PM ET','MetLife Stadium','New York / NJ','Brazil','🇧🇷','Morocco','🇲🇦'),
  mk('C2','C','group',1,'Jun 13','2026-06-13','12:00 PM ET','NRG Stadium','Houston','Haiti','🇭🇹','Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿'),
  mk('C3','C','group',2,'Jun 20','2026-06-20','9:00 PM ET','SoFi Stadium','Los Angeles','Brazil','🇧🇷','Haiti','🇭🇹'),
  mk('C4','C','group',2,'Jun 21','2026-06-21','12:00 PM ET','Hard Rock Stadium','Miami','Morocco','🇲🇦','Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿'),
  mk('C5','C','group',3,'Jun 27','2026-06-27','3:00 PM ET','AT&T Stadium','Dallas','Brazil','🇧🇷','Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿'),
  mk('C6','C','group',3,'Jun 27','2026-06-27','3:00 PM ET',"Levi's Stadium",'San Francisco Bay Area','Morocco','🇲🇦','Haiti','🇭🇹'),

  // ── Group D: USA · Paraguay · Australia · Türkiye ────────────────────────
  mk('D1','D','group',1,'Jun 13','2026-06-13','3:00 PM ET','AT&T Stadium','Dallas','United States','🇺🇸','Paraguay','🇵🇾'),
  mk('D2','D','group',1,'Jun 13','2026-06-13','6:00 PM ET','Lumen Field','Seattle','Australia','🇦🇺','Türkiye','🇹🇷'),
  mk('D3','D','group',2,'Jun 21','2026-06-21','3:00 PM ET','MetLife Stadium','New York / NJ','United States','🇺🇸','Australia','🇦🇺'),
  mk('D4','D','group',2,'Jun 21','2026-06-21','6:00 PM ET','NRG Stadium','Houston','Paraguay','🇵🇾','Türkiye','🇹🇷'),
  mk('D5','D','group',3,'Jun 27','2026-06-27','6:00 PM ET','SoFi Stadium','Los Angeles','United States','🇺🇸','Türkiye','🇹🇷'),
  mk('D6','D','group',3,'Jun 27','2026-06-27','6:00 PM ET','Mercedes-Benz Stadium','Atlanta','Paraguay','🇵🇾','Australia','🇦🇺'),

  // ── Group E: Germany · Curaçao · Côte d'Ivoire · Ecuador ────────────────
  mk('E1','E','group',1,'Jun 14','2026-06-14','12:00 PM ET','Mercedes-Benz Stadium','Atlanta','Germany','🇩🇪','Ecuador','🇪🇨'),
  mk('E2','E','group',1,'Jun 14','2026-06-14','3:00 PM ET','Hard Rock Stadium','Miami','Curaçao','🇨🇼',"Côte d'Ivoire",'🇨🇮'),
  mk('E3','E','group',2,'Jun 22','2026-06-22','12:00 PM ET','MetLife Stadium','New York / NJ','Germany','🇩🇪','Curaçao','🇨🇼'),
  mk('E4','E','group',2,'Jun 22','2026-06-22','3:00 PM ET','Arrowhead Stadium','Kansas City','Ecuador','🇪🇨',"Côte d'Ivoire",'🇨🇮'),
  mk('E5','E','group',3,'Jun 28','2026-06-28','3:00 PM ET','Lumen Field','Seattle','Germany','🇩🇪',"Côte d'Ivoire",'🇨🇮'),
  mk('E6','E','group',3,'Jun 28','2026-06-28','3:00 PM ET','Lincoln Financial Field','Philadelphia','Ecuador','🇪🇨','Curaçao','🇨🇼'),

  // ── Group F: Netherlands · Japan · Tunisia · Sweden ───────────────────────
  mk('F1','F','group',1,'Jun 14','2026-06-14','6:00 PM ET','BC Place','Vancouver','Netherlands','🇳🇱','Sweden','🇸🇪'),
  mk('F2','F','group',1,'Jun 14','2026-06-14','9:00 PM ET','Gillette Stadium','Boston','Japan','🇯🇵','Tunisia','🇹🇳'),
  mk('F3','F','group',2,'Jun 22','2026-06-22','6:00 PM ET','AT&T Stadium','Dallas','Netherlands','🇳🇱','Japan','🇯🇵'),
  mk('F4','F','group',2,'Jun 22','2026-06-22','9:00 PM ET','NRG Stadium','Houston','Sweden','🇸🇪','Tunisia','🇹🇳'),
  mk('F5','F','group',3,'Jun 28','2026-06-28','6:00 PM ET','SoFi Stadium','Los Angeles','Netherlands','🇳🇱','Tunisia','🇹🇳'),
  mk('F6','F','group',3,'Jun 28','2026-06-28','6:00 PM ET','Arrowhead Stadium','Kansas City','Sweden','🇸🇪','Japan','🇯🇵'),

  // ── Group G: Belgium · Egypt · Iran · New Zealand ────────────────────────
  mk('G1','G','group',1,'Jun 15','2026-06-15','12:00 PM ET','Arrowhead Stadium','Kansas City','Belgium','🇧🇪','New Zealand','🇳🇿'),
  mk('G2','G','group',1,'Jun 15','2026-06-15','3:00 PM ET','Lincoln Financial Field','Philadelphia','Egypt','🇪🇬','Iran','🇮🇷'),
  mk('G3','G','group',2,'Jun 23','2026-06-23','12:00 PM ET','MetLife Stadium','New York / NJ','Belgium','🇧🇪','Egypt','🇪🇬'),
  mk('G4','G','group',2,'Jun 23','2026-06-23','3:00 PM ET','Lumen Field','Seattle','New Zealand','🇳🇿','Iran','🇮🇷'),
  mk('G5','G','group',3,'Jun 29','2026-06-29','3:00 PM ET','Mercedes-Benz Stadium','Atlanta','Belgium','🇧🇪','Iran','🇮🇷'),
  mk('G6','G','group',3,'Jun 29','2026-06-29','3:00 PM ET','Hard Rock Stadium','Miami','Egypt','🇪🇬','New Zealand','🇳🇿'),

  // ── Group H: Spain · Cabo Verde · Saudi Arabia · Uruguay ─────────────────
  mk('H1','H','group',1,'Jun 15','2026-06-15','6:00 PM ET','Estadio Azteca','Mexico City','Spain','🇪🇸','Uruguay','🇺🇾'),
  mk('H2','H','group',1,'Jun 15','2026-06-15','9:00 PM ET','Estadio Akron','Guadalajara','Cabo Verde','🇨🇻','Saudi Arabia','🇸🇦'),
  mk('H3','H','group',2,'Jun 23','2026-06-23','6:00 PM ET','Estadio Azteca','Mexico City','Spain','🇪🇸','Cabo Verde','🇨🇻'),
  mk('H4','H','group',2,'Jun 23','2026-06-23','9:00 PM ET','Estadio BBVA','Monterrey','Uruguay','🇺🇾','Saudi Arabia','🇸🇦'),
  mk('H5','H','group',3,'Jun 29','2026-06-29','6:00 PM ET','Estadio Azteca','Mexico City','Spain','🇪🇸','Saudi Arabia','🇸🇦'),
  mk('H6','H','group',3,'Jun 29','2026-06-29','6:00 PM ET','Estadio Akron','Guadalajara','Uruguay','🇺🇾','Cabo Verde','🇨🇻'),

  // ── Group I: France · Senegal · Norway · Iraq ─────────────────────────────
  mk('I1','I','group',1,'Jun 16','2026-06-16','12:00 PM ET','Lumen Field','Seattle','France','🇫🇷','Norway','🇳🇴'),
  mk('I2','I','group',1,'Jun 16','2026-06-16','3:00 PM ET','Hard Rock Stadium','Miami','Senegal','🇸🇳','Iraq','🇮🇶'),
  mk('I3','I','group',2,'Jun 24','2026-06-24','12:00 PM ET',"Levi's Stadium",'San Francisco Bay Area','France','🇫🇷','Senegal','🇸🇳'),
  mk('I4','I','group',2,'Jun 24','2026-06-24','3:00 PM ET','AT&T Stadium','Dallas','Norway','🇳🇴','Iraq','🇮🇶'),
  mk('I5','I','group',3,'Jun 30','2026-06-30','3:00 PM ET','SoFi Stadium','Los Angeles','France','🇫🇷','Iraq','🇮🇶'),
  mk('I6','I','group',3,'Jun 30','2026-06-30','3:00 PM ET','MetLife Stadium','New York / NJ','Norway','🇳🇴','Senegal','🇸🇳'),

  // ── Group J: Argentina · Algeria · Austria · Jordan ──────────────────────
  mk('J1','J','group',1,'Jun 16','2026-06-16','6:00 PM ET','Estadio BBVA','Monterrey','Argentina','🇦🇷','Austria','🇦🇹'),
  mk('J2','J','group',1,'Jun 16','2026-06-16','9:00 PM ET','Hard Rock Stadium','Miami','Algeria','🇩🇿','Jordan','🇯🇴'),
  mk('J3','J','group',2,'Jun 24','2026-06-24','6:00 PM ET','MetLife Stadium','New York / NJ','Argentina','🇦🇷','Algeria','🇩🇿'),
  mk('J4','J','group',2,'Jun 24','2026-06-24','9:00 PM ET','Gillette Stadium','Boston','Austria','🇦🇹','Jordan','🇯🇴'),
  mk('J5','J','group',3,'Jun 30','2026-06-30','6:00 PM ET','AT&T Stadium','Dallas','Argentina','🇦🇷','Jordan','🇯🇴'),
  mk('J6','J','group',3,'Jun 30','2026-06-30','6:00 PM ET','Lumen Field','Seattle','Austria','🇦🇹','Algeria','🇩🇿'),

  // ── Group K: Portugal · Uzbekistan · Colombia · DR Congo ─────────────────
  mk('K1','K','group',1,'Jun 17','2026-06-17','12:00 PM ET','MetLife Stadium','New York / NJ','Portugal','🇵🇹','DR Congo','🇨🇩'),
  mk('K2','K','group',1,'Jun 17','2026-06-17','3:00 PM ET','Mercedes-Benz Stadium','Atlanta','Uzbekistan','🇺🇿','Colombia','🇨🇴'),
  mk('K3','K','group',2,'Jun 25','2026-06-25','12:00 PM ET','SoFi Stadium','Los Angeles','Portugal','🇵🇹','Uzbekistan','🇺🇿'),
  mk('K4','K','group',2,'Jun 25','2026-06-25','3:00 PM ET','Arrowhead Stadium','Kansas City','Colombia','🇨🇴','DR Congo','🇨🇩'),
  mk('K5','K','group',3,'Jul 1','2026-07-01','3:00 PM ET',"Levi's Stadium",'San Francisco Bay Area','Portugal','🇵🇹','Colombia','🇨🇴'),
  mk('K6','K','group',3,'Jul 1','2026-07-01','3:00 PM ET','NRG Stadium','Houston','Uzbekistan','🇺🇿','DR Congo','🇨🇩'),

  // ── Group L: England · Croatia · Ghana · Panama ───────────────────────────
  mk('L1','L','group',1,'Jun 17','2026-06-17','6:00 PM ET','Lincoln Financial Field','Philadelphia','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿','Croatia','🇭🇷'),
  mk('L2','L','group',1,'Jun 17','2026-06-17','9:00 PM ET',"Levi's Stadium",'San Francisco Bay Area','Ghana','🇬🇭','Panama','🇵🇦'),
  mk('L3','L','group',2,'Jun 25','2026-06-25','6:00 PM ET','MetLife Stadium','New York / NJ','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿','Ghana','🇬🇭'),
  mk('L4','L','group',2,'Jun 25','2026-06-25','9:00 PM ET','Hard Rock Stadium','Miami','Croatia','🇭🇷','Panama','🇵🇦'),
  mk('L5','L','group',3,'Jul 1','2026-07-01','6:00 PM ET','AT&T Stadium','Dallas','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿','Panama','🇵🇦'),
  mk('L6','L','group',3,'Jul 1','2026-07-01','6:00 PM ET','Mercedes-Benz Stadium','Atlanta','Croatia','🇭🇷','Ghana','🇬🇭'),
];

// ── Knockout placeholder slots ────────────────────────────────────────────────
export const KNOCKOUT_ROUNDS = [
  { round: 'r32'   as MatchRound, label: 'Round of 32',   dates: 'Jul 4 – Jul 7',  matches: 16, icon: '🔵' },
  { round: 'r16'   as MatchRound, label: 'Round of 16',   dates: 'Jul 9 – Jul 12', matches: 8,  icon: '🟢' },
  { round: 'qf'    as MatchRound, label: 'Quarter-Finals', dates: 'Jul 14 – Jul 15', matches: 4, icon: '🟣' },
  { round: 'sf'    as MatchRound, label: 'Semi-Finals',   dates: 'Jul 17 – Jul 18', matches: 2, icon: '🔴' },
  { round: 'final' as MatchRound, label: 'The Final',     dates: 'Jul 19',          matches: 1, icon: '🏆' },
];

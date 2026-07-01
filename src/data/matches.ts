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
  penScore?: [number, number];   // [home pens, away pens] — only set if penalties decided it
}

// ── factory ──────────────────────────────────────────────────────────────────
const mk = (
  id: string, group: string, round: MatchRound, matchday: 1|2|3|undefined,
  date: string, isoDate: string, time: string, venue: string, city: string,
  homeName: string, homeFlag: string, awayName: string, awayFlag: string,
  status: MatchStatus = 'upcoming',
  homeScore?: number, awayScore?: number,
): Match => ({
  id, group, round, matchday, date, isoDate, time, venue, city,
  home: { name: homeName, flag: homeFlag, ...(homeScore !== undefined ? { score: homeScore } : {}) },
  away: { name: awayName, flag: awayFlag, ...(awayScore !== undefined ? { score: awayScore } : {}) },
  status,
});

// ── GROUP STAGE — 72 matches ──────────────────────────────────────────────────
export const ALL_MATCHES: Match[] = [

  // ── Group A: Mexico · South Africa · Korea Republic · Czechia ────────────
  mk('A1','A','group',1,'Jun 11','2026-06-11','7:00 PM ET','SoFi Stadium','Los Angeles','Mexico','🇲🇽','South Africa','🇿🇦','completed',2,0),
  mk('A2','A','group',1,'Jun 11','2026-06-11','10:00 PM ET','AT&T Stadium','Dallas','Korea Republic','🇰🇷','Czechia','🇨🇿','completed',2,1),
  mk('A3','A','group',2,'Jun 19','2026-06-19','3:00 PM ET','Lumen Field','Seattle','Mexico','🇲🇽','Korea Republic','🇰🇷','completed',1,0),
  mk('A4','A','group',2,'Jun 19','2026-06-19','6:00 PM ET','Hard Rock Stadium','Miami','South Africa','🇿🇦','Czechia','🇨🇿','completed',1,1),
  mk('A5','A','group',3,'Jun 26','2026-06-26','3:00 PM ET','Mercedes-Benz Stadium','Atlanta','Mexico','🇲🇽','Czechia','🇨🇿','completed',3,0),
  mk('A6','A','group',3,'Jun 26','2026-06-26','3:00 PM ET','Arrowhead Stadium','Kansas City','South Africa','🇿🇦','Korea Republic','🇰🇷','completed',1,0),

  // ── Group B: Canada · Switzerland · Qatar · Bosnia & Herzegovina ──────────
  mk('B1','B','group',1,'Jun 12','2026-06-12','3:00 PM ET','BMO Field','Toronto','Canada','🇨🇦','Bosnia & Herzegovina','🇧🇦','completed',1,1),
  mk('B2','B','group',1,'Jun 12','2026-06-12','6:00 PM ET','Gillette Stadium','Boston','Switzerland','🇨🇭','Qatar','🇶🇦','completed',1,1),
  mk('B3','B','group',2,'Jun 20','2026-06-20','3:00 PM ET','BC Place','Vancouver','Canada','🇨🇦','Qatar','🇶🇦','completed',6,0),
  mk('B4','B','group',2,'Jun 20','2026-06-20','6:00 PM ET','Lincoln Financial Field','Philadelphia','Switzerland','🇨🇭','Bosnia & Herzegovina','🇧🇦','completed',4,1),
  mk('B5','B','group',3,'Jun 26','2026-06-26','6:00 PM ET','BMO Field','Toronto','Switzerland','🇨🇭','Canada','🇨🇦','completed',1,2),
  mk('B6','B','group',3,'Jun 26','2026-06-26','6:00 PM ET','MetLife Stadium','New York / NJ','Bosnia & Herzegovina','🇧🇦','Qatar','🇶🇦','completed',3,1),

  // ── Group C: Brazil · Morocco · Haiti · Scotland ──────────────────────────
  mk('C1','C','group',1,'Jun 12','2026-06-12','9:00 PM ET','MetLife Stadium','New York / NJ','Brazil','🇧🇷','Morocco','🇲🇦','completed',1,1),
  mk('C2','C','group',1,'Jun 13','2026-06-13','12:00 PM ET','NRG Stadium','Houston','Haiti','🇭🇹','Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿','completed',0,1),
  mk('C3','C','group',2,'Jun 19','2026-06-19','9:00 PM ET','SoFi Stadium','Los Angeles','Brazil','🇧🇷','Haiti','🇭🇹','completed',3,0),
  mk('C4','C','group',2,'Jun 21','2026-06-21','12:00 PM ET','Hard Rock Stadium','Miami','Morocco','🇲🇦','Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿','completed',1,0),
  mk('C5','C','group',3,'Jun 24','2026-06-24','3:00 PM ET','AT&T Stadium','Dallas','Brazil','🇧🇷','Scotland','🏴󠁧󠁢󠁳󠁣󠁴󠁿','completed',3,0),
  mk('C6','C','group',3,'Jun 24','2026-06-24','3:00 PM ET',"Levi's Stadium",'San Francisco Bay Area','Morocco','🇲🇦','Haiti','🇭🇹','completed',1,0),

  // ── Group D: USA · Paraguay · Australia · Türkiye ────────────────────────
  mk('D1','D','group',1,'Jun 13','2026-06-13','3:00 PM ET','AT&T Stadium','Dallas','United States','🇺🇸','Paraguay','🇵🇾','completed',4,1),
  mk('D2','D','group',1,'Jun 13','2026-06-13','6:00 PM ET','Lumen Field','Seattle','Australia','🇦🇺','Türkiye','🇹🇷','completed',2,0),
  mk('D3','D','group',2,'Jun 21','2026-06-21','3:00 PM ET','MetLife Stadium','New York / NJ','United States','🇺🇸','Australia','🇦🇺','completed',2,0),
  mk('D4','D','group',2,'Jun 21','2026-06-21','6:00 PM ET','NRG Stadium','Houston','Paraguay','🇵🇾','Türkiye','🇹🇷','completed',1,0),
  mk('D5','D','group',3,'Jun 25','2026-06-25','6:00 PM ET','SoFi Stadium','Los Angeles','United States','🇺🇸','Türkiye','🇹🇷','completed',2,3),
  mk('D6','D','group',3,'Jun 25','2026-06-25','6:00 PM ET','Mercedes-Benz Stadium','Atlanta','Paraguay','🇵🇾','Australia','🇦🇺','completed',0,0),

  // ── Group E: Germany · Curaçao · Côte d'Ivoire · Ecuador ────────────────
  mk('E1','E','group',1,'Jun 14','2026-06-14','12:00 PM ET','Mercedes-Benz Stadium','Atlanta','Germany','🇩🇪','Curaçao','🇨🇼','completed',7,1),
  mk('E2','E','group',1,'Jun 14','2026-06-14','3:00 PM ET','Hard Rock Stadium','Miami',"Côte d'Ivoire",'🇨🇮','Ecuador','🇪🇨','completed',1,0),
  mk('E3','E','group',2,'Jun 20','2026-06-20','12:00 PM ET','MetLife Stadium','New York / NJ','Germany','🇩🇪',"Côte d'Ivoire",'🇨🇮','completed',2,1),
  mk('E4','E','group',2,'Jun 20','2026-06-20','3:00 PM ET','Arrowhead Stadium','Kansas City','Ecuador','🇪🇨','Curaçao','🇨🇼','completed',0,0),
  mk('E5','E','group',3,'Jun 25','2026-06-25','3:00 PM ET','Lumen Field','Seattle','Germany','🇩🇪','Ecuador','🇪🇨','completed',1,2),
  mk('E6','E','group',3,'Jun 25','2026-06-25','3:00 PM ET','Lincoln Financial Field','Philadelphia','Curaçao','🇨🇼',"Côte d'Ivoire",'🇨🇮','completed',0,2),

  // ── Group F: Netherlands · Japan · Tunisia · Sweden ───────────────────────
  mk('F1','F','group',1,'Jun 14','2026-06-14','6:00 PM ET','BC Place','Vancouver','Netherlands','🇳🇱','Japan','🇯🇵','completed',2,2),
  mk('F2','F','group',1,'Jun 14','2026-06-14','9:00 PM ET','Gillette Stadium','Boston','Sweden','🇸🇪','Tunisia','🇹🇳','completed',5,1),
  mk('F3','F','group',2,'Jun 20','2026-06-20','6:00 PM ET','AT&T Stadium','Dallas','Netherlands','🇳🇱','Sweden','🇸🇪','completed',5,1),
  mk('F4','F','group',2,'Jun 20','2026-06-20','9:00 PM ET','NRG Stadium','Houston','Japan','🇯🇵','Tunisia','🇹🇳','completed',4,0),
  mk('F5','F','group',3,'Jun 25','2026-06-25','6:00 PM ET','SoFi Stadium','Los Angeles','Netherlands','🇳🇱','Tunisia','🇹🇳','completed',3,1),
  mk('F6','F','group',3,'Jun 25','2026-06-25','6:00 PM ET','Arrowhead Stadium','Kansas City','Japan','🇯🇵','Sweden','🇸🇪','completed',1,1),

  // ── Group G: Belgium · Egypt · Iran · New Zealand ────────────────────────
  mk('G1','G','group',1,'Jun 15','2026-06-15','12:00 PM ET','Arrowhead Stadium','Kansas City','Belgium','🇧🇪','Egypt','🇪🇬','completed',1,1),
  mk('G2','G','group',1,'Jun 15','2026-06-15','3:00 PM ET','Lincoln Financial Field','Philadelphia','Iran','🇮🇷','New Zealand','🇳🇿','completed',2,2),
  mk('G3','G','group',2,'Jun 21','2026-06-21','12:00 PM ET','MetLife Stadium','New York / NJ','Belgium','🇧🇪','Iran','🇮🇷','completed',0,0),
  mk('G4','G','group',2,'Jun 21','2026-06-21','3:00 PM ET','Lumen Field','Seattle','Egypt','🇪🇬','New Zealand','🇳🇿','completed',3,1),
  mk('G5','G','group',3,'Jun 26','2026-06-26','3:00 PM ET','Mercedes-Benz Stadium','Atlanta','Egypt','🇪🇬','Iran','🇮🇷','completed',1,1),
  mk('G6','G','group',3,'Jun 26','2026-06-26','3:00 PM ET','Hard Rock Stadium','Miami','New Zealand','🇳🇿','Belgium','🇧🇪','completed',1,5),

  // ── Group H: Spain · Cabo Verde · Saudi Arabia · Uruguay ─────────────────
  mk('H1','H','group',1,'Jun 15','2026-06-15','6:00 PM ET','Estadio Azteca','Mexico City','Spain','🇪🇸','Cabo Verde','🇨🇻','completed',0,0),
  mk('H2','H','group',1,'Jun 15','2026-06-15','9:00 PM ET','Estadio Akron','Guadalajara','Saudi Arabia','🇸🇦','Uruguay','🇺🇾','completed',1,1),
  mk('H3','H','group',2,'Jun 21','2026-06-21','6:00 PM ET','Estadio Azteca','Mexico City','Spain','🇪🇸','Saudi Arabia','🇸🇦','completed',4,0),
  mk('H4','H','group',2,'Jun 21','2026-06-21','9:00 PM ET','Estadio BBVA','Monterrey','Uruguay','🇺🇾','Cabo Verde','🇨🇻','completed',2,2),
  mk('H5','H','group',3,'Jun 26','2026-06-26','6:00 PM ET','Estadio Azteca','Mexico City','Spain','🇪🇸','Uruguay','🇺🇾','completed',1,0),
  mk('H6','H','group',3,'Jun 26','2026-06-26','6:00 PM ET','Estadio Akron','Guadalajara','Cabo Verde','🇨🇻','Saudi Arabia','🇸🇦','completed',0,0),

  // ── Group I: France · Senegal · Norway · Iraq ─────────────────────────────
  mk('I1','I','group',1,'Jun 16','2026-06-16','12:00 PM ET','Lumen Field','Seattle','France','🇫🇷','Senegal','🇸🇳','completed',3,1),
  mk('I2','I','group',1,'Jun 16','2026-06-16','3:00 PM ET','Hard Rock Stadium','Miami','Norway','🇳🇴','Iraq','🇮🇶','completed',4,1),
  mk('I3','I','group',2,'Jun 22','2026-06-22','12:00 PM ET',"Levi's Stadium",'San Francisco Bay Area','France','🇫🇷','Iraq','🇮🇶','completed',3,0),
  mk('I4','I','group',2,'Jun 22','2026-06-22','3:00 PM ET','AT&T Stadium','Dallas','Norway','🇳🇴','Senegal','🇸🇳','completed',3,2),
  mk('I5','I','group',3,'Jun 26','2026-06-26','3:00 PM ET','SoFi Stadium','Los Angeles','Norway','🇳🇴','France','🇫🇷','completed',1,4),
  mk('I6','I','group',3,'Jun 26','2026-06-26','3:00 PM ET','MetLife Stadium','New York / NJ','Senegal','🇸🇳','Iraq','🇮🇶','completed',5,0),

  // ── Group J: Argentina · Algeria · Austria · Jordan ──────────────────────
  mk('J1','J','group',1,'Jun 16','2026-06-16','6:00 PM ET','Estadio BBVA','Monterrey','Argentina','🇦🇷','Algeria','🇩🇿','completed',3,0),
  mk('J2','J','group',1,'Jun 17','2026-06-17','12:00 PM ET','Hard Rock Stadium','Miami','Austria','🇦🇹','Jordan','🇯🇴','completed',3,1),
  mk('J3','J','group',2,'Jun 22','2026-06-22','6:00 PM ET','MetLife Stadium','New York / NJ','Argentina','🇦🇷','Austria','🇦🇹','completed',1,0),
  mk('J4','J','group',2,'Jun 22','2026-06-22','9:00 PM ET','Gillette Stadium','Boston','Algeria','🇩🇿','Jordan','🇯🇴','completed',2,1),
  mk('J5','J','group',3,'Jun 27','2026-06-27','6:00 PM ET','AT&T Stadium','Dallas','Argentina','🇦🇷','Jordan','🇯🇴','completed',3,1),
  mk('J6','J','group',3,'Jun 27','2026-06-27','6:00 PM ET','Lumen Field','Seattle','Algeria','🇩🇿','Austria','🇦🇹','completed',3,3),

  // ── Group K: Portugal · Uzbekistan · Colombia · DR Congo ─────────────────
  mk('K1','K','group',1,'Jun 17','2026-06-17','12:00 PM ET','MetLife Stadium','New York / NJ','Portugal','🇵🇹','DR Congo','🇨🇩','completed',1,1),
  mk('K2','K','group',1,'Jun 17','2026-06-17','3:00 PM ET','Mercedes-Benz Stadium','Atlanta','Colombia','🇨🇴','Uzbekistan','🇺🇿','completed',3,1),
  mk('K3','K','group',2,'Jun 23','2026-06-23','12:00 PM ET','SoFi Stadium','Los Angeles','Portugal','🇵🇹','Uzbekistan','🇺🇿','completed',5,0),
  mk('K4','K','group',2,'Jun 23','2026-06-23','3:00 PM ET','Arrowhead Stadium','Kansas City','Colombia','🇨🇴','DR Congo','🇨🇩','completed',1,0),
  mk('K5','K','group',3,'Jun 27','2026-06-27','3:00 PM ET',"Levi's Stadium",'San Francisco Bay Area','Colombia','🇨🇴','Portugal','🇵🇹','completed',0,0),
  mk('K6','K','group',3,'Jun 27','2026-06-27','3:00 PM ET','NRG Stadium','Houston','DR Congo','🇨🇩','Uzbekistan','🇺🇿','completed',3,1),

  // ── Group L: England · Croatia · Ghana · Panama ───────────────────────────
  mk('L1','L','group',1,'Jun 17','2026-06-17','6:00 PM ET','Lincoln Financial Field','Philadelphia','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿','Croatia','🇭🇷','completed',4,2),
  mk('L2','L','group',1,'Jun 17','2026-06-17','9:00 PM ET',"Levi's Stadium",'San Francisco Bay Area','Ghana','🇬🇭','Panama','🇵🇦','completed',1,0),
  mk('L3','L','group',2,'Jun 23','2026-06-23','6:00 PM ET','MetLife Stadium','New York / NJ','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿','Ghana','🇬🇭','completed',0,0),
  mk('L4','L','group',2,'Jun 23','2026-06-23','9:00 PM ET','Hard Rock Stadium','Miami','Croatia','🇭🇷','Panama','🇵🇦','completed',1,0),
  mk('L5','L','group',3,'Jun 27','2026-06-27','6:00 PM ET','AT&T Stadium','Dallas','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿','Panama','🇵🇦','completed',2,0),
  mk('L6','L','group',3,'Jun 27','2026-06-27','6:00 PM ET','Mercedes-Benz Stadium','Atlanta','Croatia','🇭🇷','Ghana','🇬🇭','completed',2,1),

  // ── ROUND OF 32 ────────────────────────────────────────────────────────────
  mk('R1','R32','r32',undefined,'Jun 28','2026-06-28','TBD','BC Place','Vancouver','Canada','🇨🇦','South Africa','🇿🇦','completed',1,0),
  mk('R2','R32','r32',undefined,'Jun 29','2026-06-29','TBD','AT&T Stadium','Dallas','Brazil','🇧🇷','Japan','🇯🇵','completed',2,1),
  // Germany won 4-2 on penalties (regular time 1-1)
  mk('R3','R32','r32',undefined,'Jun 29','2026-06-29','TBD','Lumen Field','Seattle','Germany','🇩🇪','Paraguay','🇵🇾','completed',1,1),
  // Morocco won 3-1 on penalties (regular time 1-1)
  mk('R4','R32','r32',undefined,'Jun 29','2026-06-29','TBD','MetLife Stadium','New York / NJ','Netherlands','🇳🇱','Morocco','🇲🇦','completed',1,1),
  mk('R5','R32','r32',undefined,'Jun 30','2026-06-30','TBD','Hard Rock Stadium','Miami','Norway','🇳🇴',"Côte d'Ivoire",'🇨🇮','completed',2,1),
  mk('R6','R32','r32',undefined,'Jun 30','2026-06-30','TBD','SoFi Stadium','Los Angeles','France','🇫🇷','Sweden','🇸🇪','completed',3,0),
  mk('R7','R32','r32',undefined,'Jun 30','2026-06-30','TBD','Estadio Azteca','Mexico City','Mexico','🇲🇽','Ecuador','🇪🇨','completed',2,0),
  mk('R8','R32','r32',undefined,'Jul 1','2026-07-01','TBD','Wembley-alt','London','England','🏴󠁧󠁢󠁥󠁮󠁧󠁿','DR Congo','🇨🇩','completed',2,1),
  mk('R9','R32','r32',undefined,'Jul 1','2026-07-01','TBD','NRG Stadium','Houston','Belgium','🇧🇪','Senegal','🇸🇳','upcoming'),
  mk('R10','R32','r32',undefined,'Jul 1','2026-07-01','TBD','Mercedes-Benz Stadium','Atlanta','United States','🇺🇸','Bosnia & Herzegovina','🇧🇦','upcoming'),
  mk('R11','R32','r32',undefined,'Jul 2','2026-07-02','TBD','Estadio Akron','Guadalajara','Spain','🇪🇸','Austria','🇦🇹','upcoming'),
  mk('R12','R32','r32',undefined,'Jul 2','2026-07-02','TBD','Gillette Stadium','Boston','Portugal','🇵🇹','Croatia','🇭🇷','upcoming'),
  mk('R13','R32','r32',undefined,'Jul 2','2026-07-02','TBD','BMO Field','Toronto','Switzerland','🇨🇭','Algeria','🇩🇿','upcoming'),
  mk('R14','R32','r32',undefined,'Jul 3','2026-07-03','TBD','Lincoln Financial Field','Philadelphia','Australia','🇦🇺','Egypt','🇪🇬','upcoming'),
  mk('R15','R32','r32',undefined,'Jul 3','2026-07-03','TBD',"Levi's Stadium",'San Francisco Bay Area','Argentina','🇦🇷','Cabo Verde','🇨🇻','upcoming'),
  mk('R16','R32','r32',undefined,'Jul 3','2026-07-03','TBD','Arrowhead Stadium','Kansas City','Colombia','🇨🇴','Ghana','🇬🇭','upcoming'),
];

// Set penalty shootout scores for matches that went to penalties
// R3: Germany won 4-2 on penalties after 1-1 draw
ALL_MATCHES.find(m => m.id === 'R3')!.penScore = [4, 2];
// R4: Morocco won 3-1 on penalties after 1-1 draw
ALL_MATCHES.find(m => m.id === 'R4')!.penScore = [3, 1];

// ── Knockout placeholder slots ────────────────────────────────────────────────
export const KNOCKOUT_ROUNDS = [
  { round: 'r32'   as MatchRound, label: 'Round of 32',   dates: 'Jul 4 – Jul 7',  matches: 16, icon: '🔵' },
  { round: 'r16'   as MatchRound, label: 'Round of 16',   dates: 'Jul 9 – Jul 12', matches: 8,  icon: '🟢' },
  { round: 'qf'    as MatchRound, label: 'Quarter-Finals', dates: 'Jul 14 – Jul 15', matches: 4, icon: '🟣' },
  { round: 'sf'    as MatchRound, label: 'Semi-Finals',   dates: 'Jul 17 – Jul 18', matches: 2, icon: '🔴' },
  { round: 'final' as MatchRound, label: 'The Final',     dates: 'Jul 19',          matches: 1, icon: '🏆' },
];

// ── Compute live standings from match results ─────────────────────────────────
import { mockTeams } from '../mock/teams';
import type { StandingsRow } from '../types';

export function computeStandings(matches: Match[]): StandingsRow[] {
  const map = new Map<string, StandingsRow>();

  for (const team of mockTeams) {
    map.set(team.name, {
      team,
      played: 0, won: 0, drawn: 0, lost: 0,
      goalsFor: 0, goalsAgainst: 0, goalDiff: 0,
      points: 0,
      qualified: 'pending',
    });
  }

  for (const match of matches) {
    if (match.status !== 'completed') continue;
    const hs = match.home.score ?? 0;
    const as_ = match.away.score ?? 0;
    const home = map.get(match.home.name);
    const away = map.get(match.away.name);
    if (!home || !away) continue;

    home.played++; away.played++;
    home.goalsFor += hs;  home.goalsAgainst += as_;
    away.goalsFor += as_; away.goalsAgainst += hs;
    home.goalDiff = home.goalsFor - home.goalsAgainst;
    away.goalDiff = away.goalsFor - away.goalsAgainst;

    if (hs > as_) {
      home.won++; home.points += 3; away.lost++;
    } else if (as_ > hs) {
      away.won++; away.points += 3; home.lost++;
    } else {
      home.drawn++; home.points++;
      away.drawn++; away.points++;
    }
  }

  return Array.from(map.values());
}

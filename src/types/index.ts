// ── Core data types ───────────────────────────────────────────────────────────
// These are the contracts the whole app uses.
// Mock data and real API data must always match these shapes.

export interface Team {
  id: number;
  name: string;
  shortName: string;
  flag: string;        // emoji flag or URL
  flagUrl?: string;
  group: string;       // 'A' | 'B' | ...
  confederation: string;
}

export interface StandingsRow {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
  qualified: 'first' | 'second' | 'playoff' | 'eliminated' | 'pending';
}

export interface MatchEvent {
  minute: number;
  type: 'goal' | 'owngoal' | 'penalty' | 'yellowcard' | 'redcard' | 'sub';
  team: 'home' | 'away';
  playerName: string;
}

export interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number | null;
  awayScore: number | null;
  status: 'scheduled' | 'live' | 'finished';
  stage: 'group' | 'round16' | 'quarter' | 'semi' | 'third' | 'final';
  group?: string;
  matchday?: number;
  kickoff: string;       // ISO datetime string
  venue: string;
  city: string;
  events: MatchEvent[];
  stats?: MatchStats;
}

export interface MatchStats {
  homePossession: number;
  awayPossession: number;
  homeShots: number;
  awayShots: number;
  homeShotsOnTarget: number;
  awayShotsOnTarget: number;
  homeXG: number;
  awayXG: number;
  homeCorners: number;
  awayCorners: number;
  homeFouls: number;
  awayFouls: number;
}

export interface HeatmapZone {
  x: number;        // 0–100 (% across pitch width)
  y: number;        // 0–100 (% down pitch length)
  intensity: number; // 0–1
}

export interface Player {
  id: number;
  name: string;
  photo: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  nationality: string;
  team: Team;
  age: number;
  club: string;
  statistics: PlayerStats;
  heatmap: HeatmapZone[];
}

export interface PlayerStats {
  goals: number;
  assists: number;
  shots: number;
  shotsOnTarget: number;
  minutesPlayed: number;
  matches: number;
  yellowCards: number;
  redCards: number;
  passAccuracy: number;
  xG: number;
  xA: number;
  tackles: number;
  interceptions: number;
  keyPasses: number;
  dribbles: number;
}

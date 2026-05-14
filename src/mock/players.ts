import type { Player } from '../types';
import { mockTeams } from './teams';

const france  = mockTeams.find(t => t.shortName === 'FRA')!;
const brazil  = mockTeams.find(t => t.shortName === 'BRA')!;
const england = mockTeams.find(t => t.shortName === 'ENG')!;
const arg     = mockTeams.find(t => t.shortName === 'ARG')!;
const por     = mockTeams.find(t => t.shortName === 'POR')!;
const esp     = mockTeams.find(t => t.shortName === 'ESP')!;
const ger     = mockTeams.find(t => t.shortName === 'GER')!;

export const mockPlayers: Player[] = [
  {
    id: 1, name: 'Kylian Mbappé', photo: '', position: 'FWD',
    nationality: 'France', team: france, age: 27, club: 'Real Madrid',
    statistics: { goals: 5, assists: 2, shots: 22, shotsOnTarget: 14, minutesPlayed: 540,
      matches: 6, yellowCards: 1, redCards: 0, passAccuracy: 84, xG: 4.2, xA: 1.8,
      tackles: 3, interceptions: 1, keyPasses: 18, dribbles: 24 },
    heatmap: [
      { x: 80, y: 50, intensity: 0.95 }, { x: 85, y: 35, intensity: 0.80 },
      { x: 75, y: 60, intensity: 0.70 }, { x: 90, y: 50, intensity: 0.65 },
      { x: 70, y: 45, intensity: 0.50 }, { x: 60, y: 40, intensity: 0.30 },
    ],
  },
  {
    id: 2, name: 'Vinicius Jr.', photo: '', position: 'FWD',
    nationality: 'Brazil', team: brazil, age: 25, club: 'Real Madrid',
    statistics: { goals: 4, assists: 3, shots: 18, shotsOnTarget: 10, minutesPlayed: 510,
      matches: 6, yellowCards: 0, redCards: 0, passAccuracy: 80, xG: 3.5, xA: 2.9,
      tackles: 5, interceptions: 2, keyPasses: 21, dribbles: 38 },
    heatmap: [
      { x: 78, y: 75, intensity: 0.95 }, { x: 85, y: 80, intensity: 0.85 },
      { x: 70, y: 70, intensity: 0.70 }, { x: 60, y: 72, intensity: 0.50 },
      { x: 50, y: 68, intensity: 0.30 }, { x: 90, y: 85, intensity: 0.60 },
    ],
  },
  {
    id: 3, name: 'Jude Bellingham', photo: '', position: 'MID',
    nationality: 'England', team: england, age: 22, club: 'Real Madrid',
    statistics: { goals: 3, assists: 4, shots: 14, shotsOnTarget: 8, minutesPlayed: 540,
      matches: 6, yellowCards: 1, redCards: 0, passAccuracy: 88, xG: 2.8, xA: 3.1,
      tackles: 18, interceptions: 12, keyPasses: 24, dribbles: 15 },
    heatmap: [
      { x: 60, y: 50, intensity: 0.90 }, { x: 70, y: 45, intensity: 0.75 },
      { x: 50, y: 55, intensity: 0.65 }, { x: 75, y: 55, intensity: 0.60 },
      { x: 40, y: 50, intensity: 0.40 }, { x: 65, y: 35, intensity: 0.55 },
    ],
  },
  {
    id: 4, name: 'Lionel Messi', photo: '', position: 'FWD',
    nationality: 'Argentina', team: arg, age: 39, club: 'Inter Miami',
    statistics: { goals: 3, assists: 5, shots: 16, shotsOnTarget: 9, minutesPlayed: 480,
      matches: 5, yellowCards: 0, redCards: 0, passAccuracy: 91, xG: 2.5, xA: 4.1,
      tackles: 2, interceptions: 1, keyPasses: 32, dribbles: 20 },
    heatmap: [
      { x: 72, y: 55, intensity: 0.85 }, { x: 65, y: 50, intensity: 0.80 },
      { x: 80, y: 60, intensity: 0.70 }, { x: 58, y: 58, intensity: 0.55 },
      { x: 75, y: 40, intensity: 0.65 }, { x: 85, y: 50, intensity: 0.50 },
    ],
  },
  {
    id: 5, name: 'Cristiano Ronaldo', photo: '', position: 'FWD',
    nationality: 'Portugal', team: por, age: 41, club: 'Al Nassr',
    statistics: { goals: 4, assists: 1, shots: 20, shotsOnTarget: 11, minutesPlayed: 540,
      matches: 6, yellowCards: 1, redCards: 0, passAccuracy: 79, xG: 3.8, xA: 0.9,
      tackles: 1, interceptions: 0, keyPasses: 9, dribbles: 10 },
    heatmap: [
      { x: 82, y: 48, intensity: 0.90 }, { x: 88, y: 50, intensity: 0.85 },
      { x: 78, y: 40, intensity: 0.70 }, { x: 85, y: 60, intensity: 0.65 },
      { x: 70, y: 50, intensity: 0.45 }, { x: 92, y: 45, intensity: 0.60 },
    ],
  },
  {
    id: 6, name: 'Pedri', photo: '', position: 'MID',
    nationality: 'Spain', team: esp, age: 23, club: 'Barcelona',
    statistics: { goals: 2, assists: 4, shots: 10, shotsOnTarget: 5, minutesPlayed: 540,
      matches: 6, yellowCards: 2, redCards: 0, passAccuracy: 93, xG: 1.5, xA: 3.2,
      tackles: 22, interceptions: 15, keyPasses: 28, dribbles: 30 },
    heatmap: [
      { x: 55, y: 50, intensity: 0.92 }, { x: 62, y: 44, intensity: 0.80 },
      { x: 48, y: 52, intensity: 0.70 }, { x: 68, y: 48, intensity: 0.65 },
      { x: 40, y: 48, intensity: 0.45 }, { x: 60, y: 35, intensity: 0.55 },
    ],
  },
  {
    id: 7, name: 'Florian Wirtz', photo: '', position: 'MID',
    nationality: 'Germany', team: ger, age: 22, club: 'Bayern Munich',
    statistics: { goals: 3, assists: 3, shots: 13, shotsOnTarget: 7, minutesPlayed: 480,
      matches: 5, yellowCards: 0, redCards: 0, passAccuracy: 87, xG: 2.4, xA: 2.8,
      tackles: 14, interceptions: 8, keyPasses: 22, dribbles: 26 },
    heatmap: [
      { x: 65, y: 45, intensity: 0.88 }, { x: 72, y: 50, intensity: 0.78 },
      { x: 58, y: 40, intensity: 0.68 }, { x: 75, y: 38, intensity: 0.60 },
      { x: 50, y: 50, intensity: 0.40 }, { x: 68, y: 60, intensity: 0.55 },
    ],
  },
];

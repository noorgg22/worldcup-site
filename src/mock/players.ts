import type { Player } from '../types';
import { mockTeams } from './teams';

const getTeam = (short: string) => mockTeams.find(t => t.shortName === short)!;

const france  = getTeam('FRA');
const brazil  = getTeam('BRA');
const england = getTeam('ENG');
const arg     = getTeam('ARG');
const por     = getTeam('POR');
const esp     = getTeam('ESP');
const ger     = getTeam('GER');
const nor     = getTeam('NOR');
const usa     = getTeam('USA');
const uru     = getTeam('URU');
const mex     = getTeam('MEX');
const ned     = getTeam('NED');
const cro     = getTeam('CRO');
const mor     = getTeam('MAR');

export const mockPlayers: Player[] = [
  // ── France ──────────────────────────────────────────────────────────────
  {
    id: 1, name: 'Kylian Mbappé', photo: '', position: 'FWD',
    nationality: 'France', team: france, age: 27, club: 'Real Madrid',
    statistics: { goals: 7, assists: 3, shots: 26, shotsOnTarget: 16, minutesPlayed: 609,
      matches: 7, yellowCards: 1, redCards: 0, passAccuracy: 84, xG: 5.8, xA: 2.4,
      tackles: 3, interceptions: 1, keyPasses: 21, dribbles: 28 },
    heatmap: [
      { x: 82, y: 50, intensity: 0.95 }, { x: 88, y: 36, intensity: 0.82 },
      { x: 76, y: 62, intensity: 0.72 }, { x: 92, y: 50, intensity: 0.66 },
      { x: 70, y: 45, intensity: 0.50 }, { x: 62, y: 40, intensity: 0.30 },
    ],
  },
  {
    id: 2, name: 'Marcus Thuram', photo: '', position: 'FWD',
    nationality: 'France', team: france, age: 27, club: 'Inter Milan',
    statistics: { goals: 4, assists: 3, shots: 16, shotsOnTarget: 9, minutesPlayed: 540,
      matches: 6, yellowCards: 1, redCards: 0, passAccuracy: 80, xG: 3.6, xA: 2.5,
      tackles: 8, interceptions: 4, keyPasses: 14, dribbles: 18 },
    heatmap: [
      { x: 80, y: 50, intensity: 0.88 }, { x: 75, y: 42, intensity: 0.72 },
      { x: 85, y: 58, intensity: 0.65 }, { x: 70, y: 55, intensity: 0.52 },
      { x: 60, y: 50, intensity: 0.38 }, { x: 88, y: 45, intensity: 0.60 },
    ],
  },

  // ── Brazil ───────────────────────────────────────────────────────────────
  {
    id: 3, name: 'Vinicius Jr.', photo: '', position: 'FWD',
    nationality: 'Brazil', team: brazil, age: 25, club: 'Real Madrid',
    statistics: { goals: 5, assists: 4, shots: 20, shotsOnTarget: 12, minutesPlayed: 570,
      matches: 7, yellowCards: 0, redCards: 0, passAccuracy: 80, xG: 4.2, xA: 3.4,
      tackles: 5, interceptions: 2, keyPasses: 24, dribbles: 42 },
    heatmap: [
      { x: 80, y: 76, intensity: 0.95 }, { x: 88, y: 82, intensity: 0.85 },
      { x: 72, y: 70, intensity: 0.70 }, { x: 62, y: 73, intensity: 0.50 },
      { x: 52, y: 68, intensity: 0.30 }, { x: 92, y: 86, intensity: 0.62 },
    ],
  },
  {
    id: 4, name: 'Raphinha', photo: '', position: 'FWD',
    nationality: 'Brazil', team: brazil, age: 28, club: 'Barcelona',
    statistics: { goals: 4, assists: 5, shots: 17, shotsOnTarget: 9, minutesPlayed: 540,
      matches: 6, yellowCards: 0, redCards: 0, passAccuracy: 83, xG: 3.3, xA: 4.0,
      tackles: 7, interceptions: 3, keyPasses: 26, dribbles: 31 },
    heatmap: [
      { x: 78, y: 26, intensity: 0.92 }, { x: 85, y: 20, intensity: 0.80 },
      { x: 70, y: 30, intensity: 0.68 }, { x: 60, y: 28, intensity: 0.52 },
      { x: 50, y: 32, intensity: 0.36 }, { x: 88, y: 22, intensity: 0.60 },
    ],
  },
  {
    id: 5, name: 'Rodrygo', photo: '', position: 'FWD',
    nationality: 'Brazil', team: brazil, age: 24, club: 'Real Madrid',
    statistics: { goals: 3, assists: 4, shots: 13, shotsOnTarget: 7, minutesPlayed: 480,
      matches: 6, yellowCards: 0, redCards: 0, passAccuracy: 85, xG: 2.6, xA: 3.0,
      tackles: 6, interceptions: 3, keyPasses: 19, dribbles: 24 },
    heatmap: [
      { x: 75, y: 38, intensity: 0.86 }, { x: 82, y: 30, intensity: 0.74 },
      { x: 68, y: 44, intensity: 0.64 }, { x: 58, y: 35, intensity: 0.48 },
      { x: 48, y: 40, intensity: 0.32 }, { x: 88, y: 32, intensity: 0.58 },
    ],
  },

  // ── England ──────────────────────────────────────────────────────────────
  {
    id: 6, name: 'Jude Bellingham', photo: '', position: 'MID',
    nationality: 'England', team: england, age: 22, club: 'Real Madrid',
    statistics: { goals: 4, assists: 5, shots: 16, shotsOnTarget: 9, minutesPlayed: 630,
      matches: 7, yellowCards: 1, redCards: 0, passAccuracy: 88, xG: 3.2, xA: 3.8,
      tackles: 20, interceptions: 13, keyPasses: 28, dribbles: 17 },
    heatmap: [
      { x: 62, y: 50, intensity: 0.90 }, { x: 72, y: 45, intensity: 0.76 },
      { x: 52, y: 55, intensity: 0.66 }, { x: 77, y: 56, intensity: 0.62 },
      { x: 42, y: 50, intensity: 0.40 }, { x: 68, y: 36, intensity: 0.56 },
    ],
  },
  {
    id: 7, name: 'Harry Kane', photo: '', position: 'FWD',
    nationality: 'England', team: england, age: 32, club: 'Bayern Munich',
    statistics: { goals: 6, assists: 2, shots: 22, shotsOnTarget: 13, minutesPlayed: 590,
      matches: 7, yellowCards: 0, redCards: 0, passAccuracy: 78, xG: 5.4, xA: 1.8,
      tackles: 4, interceptions: 2, keyPasses: 12, dribbles: 8 },
    heatmap: [
      { x: 76, y: 50, intensity: 0.90 }, { x: 84, y: 46, intensity: 0.80 },
      { x: 80, y: 58, intensity: 0.72 }, { x: 70, y: 52, intensity: 0.58 },
      { x: 64, y: 48, intensity: 0.44 }, { x: 88, y: 52, intensity: 0.65 },
    ],
  },
  {
    id: 8, name: 'Phil Foden', photo: '', position: 'MID',
    nationality: 'England', team: england, age: 26, club: 'Manchester City',
    statistics: { goals: 3, assists: 4, shots: 14, shotsOnTarget: 7, minutesPlayed: 540,
      matches: 6, yellowCards: 1, redCards: 0, passAccuracy: 89, xG: 2.4, xA: 3.2,
      tackles: 12, interceptions: 7, keyPasses: 25, dribbles: 22 },
    heatmap: [
      { x: 70, y: 30, intensity: 0.88 }, { x: 78, y: 24, intensity: 0.76 },
      { x: 62, y: 36, intensity: 0.68 }, { x: 80, y: 40, intensity: 0.60 },
      { x: 52, y: 32, intensity: 0.44 }, { x: 84, y: 28, intensity: 0.56 },
    ],
  },
  {
    id: 9, name: 'Bukayo Saka', photo: '', position: 'FWD',
    nationality: 'England', team: england, age: 24, club: 'Arsenal',
    statistics: { goals: 3, assists: 5, shots: 15, shotsOnTarget: 8, minutesPlayed: 560,
      matches: 7, yellowCards: 0, redCards: 0, passAccuracy: 86, xG: 2.8, xA: 4.0,
      tackles: 9, interceptions: 5, keyPasses: 27, dribbles: 29 },
    heatmap: [
      { x: 78, y: 24, intensity: 0.90 }, { x: 85, y: 18, intensity: 0.78 },
      { x: 70, y: 30, intensity: 0.68 }, { x: 62, y: 26, intensity: 0.52 },
      { x: 52, y: 30, intensity: 0.36 }, { x: 88, y: 20, intensity: 0.58 },
    ],
  },

  // ── Argentina ────────────────────────────────────────────────────────────
  {
    id: 10, name: 'Lionel Messi', photo: '', position: 'FWD',
    nationality: 'Argentina', team: arg, age: 39, club: 'Inter Miami',
    statistics: { goals: 4, assists: 6, shots: 18, shotsOnTarget: 10, minutesPlayed: 520,
      matches: 6, yellowCards: 0, redCards: 0, passAccuracy: 91, xG: 3.0, xA: 5.0,
      tackles: 2, interceptions: 1, keyPasses: 36, dribbles: 22 },
    heatmap: [
      { x: 74, y: 55, intensity: 0.85 }, { x: 66, y: 50, intensity: 0.80 },
      { x: 82, y: 60, intensity: 0.72 }, { x: 60, y: 58, intensity: 0.58 },
      { x: 76, y: 42, intensity: 0.65 }, { x: 86, y: 52, intensity: 0.52 },
    ],
  },
  {
    id: 11, name: 'Lautaro Martínez', photo: '', position: 'FWD',
    nationality: 'Argentina', team: arg, age: 27, club: 'Inter Milan',
    statistics: { goals: 5, assists: 2, shots: 19, shotsOnTarget: 11, minutesPlayed: 560,
      matches: 7, yellowCards: 1, redCards: 0, passAccuracy: 76, xG: 4.6, xA: 1.6,
      tackles: 6, interceptions: 3, keyPasses: 10, dribbles: 14 },
    heatmap: [
      { x: 80, y: 50, intensity: 0.92 }, { x: 86, y: 44, intensity: 0.80 },
      { x: 76, y: 56, intensity: 0.70 }, { x: 72, y: 46, intensity: 0.56 },
      { x: 66, y: 52, intensity: 0.44 }, { x: 90, y: 50, intensity: 0.64 },
    ],
  },
  {
    id: 12, name: 'Alexis Mac Allister', photo: '', position: 'MID',
    nationality: 'Argentina', team: arg, age: 26, club: 'Liverpool',
    statistics: { goals: 2, assists: 4, shots: 11, shotsOnTarget: 6, minutesPlayed: 570,
      matches: 7, yellowCards: 2, redCards: 0, passAccuracy: 90, xG: 1.8, xA: 3.2,
      tackles: 24, interceptions: 16, keyPasses: 22, dribbles: 16 },
    heatmap: [
      { x: 52, y: 50, intensity: 0.88 }, { x: 60, y: 44, intensity: 0.76 },
      { x: 44, y: 54, intensity: 0.68 }, { x: 66, y: 50, intensity: 0.60 },
      { x: 38, y: 50, intensity: 0.42 }, { x: 62, y: 36, intensity: 0.54 },
    ],
  },

  // ── Portugal ─────────────────────────────────────────────────────────────
  {
    id: 13, name: 'Cristiano Ronaldo', photo: '', position: 'FWD',
    nationality: 'Portugal', team: por, age: 41, club: 'Al Nassr',
    statistics: { goals: 5, assists: 1, shots: 22, shotsOnTarget: 12, minutesPlayed: 580,
      matches: 7, yellowCards: 1, redCards: 0, passAccuracy: 78, xG: 4.4, xA: 0.9,
      tackles: 1, interceptions: 0, keyPasses: 9, dribbles: 10 },
    heatmap: [
      { x: 84, y: 48, intensity: 0.90 }, { x: 90, y: 50, intensity: 0.85 },
      { x: 80, y: 40, intensity: 0.70 }, { x: 87, y: 60, intensity: 0.66 },
      { x: 72, y: 50, intensity: 0.46 }, { x: 94, y: 46, intensity: 0.60 },
    ],
  },
  {
    id: 14, name: 'Bruno Fernandes', photo: '', position: 'MID',
    nationality: 'Portugal', team: por, age: 30, club: 'Manchester United',
    statistics: { goals: 3, assists: 5, shots: 14, shotsOnTarget: 7, minutesPlayed: 590,
      matches: 7, yellowCards: 2, redCards: 0, passAccuracy: 86, xG: 2.6, xA: 4.0,
      tackles: 14, interceptions: 8, keyPasses: 30, dribbles: 18 },
    heatmap: [
      { x: 65, y: 48, intensity: 0.88 }, { x: 72, y: 42, intensity: 0.78 },
      { x: 58, y: 54, intensity: 0.68 }, { x: 76, y: 50, intensity: 0.62 },
      { x: 48, y: 50, intensity: 0.44 }, { x: 70, y: 36, intensity: 0.56 },
    ],
  },
  {
    id: 15, name: 'Diogo Jota', photo: '', position: 'FWD',
    nationality: 'Portugal', team: por, age: 28, club: 'Liverpool',
    statistics: { goals: 4, assists: 2, shots: 16, shotsOnTarget: 9, minutesPlayed: 500,
      matches: 6, yellowCards: 0, redCards: 0, passAccuracy: 81, xG: 3.5, xA: 1.6,
      tackles: 5, interceptions: 2, keyPasses: 12, dribbles: 16 },
    heatmap: [
      { x: 78, y: 48, intensity: 0.90 }, { x: 82, y: 40, intensity: 0.78 },
      { x: 74, y: 56, intensity: 0.68 }, { x: 86, y: 52, intensity: 0.60 },
      { x: 68, y: 50, intensity: 0.44 }, { x: 88, y: 44, intensity: 0.64 },
    ],
  },

  // ── Spain ────────────────────────────────────────────────────────────────
  {
    id: 16, name: 'Lamine Yamal', photo: '', position: 'FWD',
    nationality: 'Spain', team: esp, age: 18, club: 'Barcelona',
    statistics: { goals: 3, assists: 6, shots: 14, shotsOnTarget: 7, minutesPlayed: 560,
      matches: 7, yellowCards: 0, redCards: 0, passAccuracy: 87, xG: 2.5, xA: 5.0,
      tackles: 7, interceptions: 3, keyPasses: 32, dribbles: 38 },
    heatmap: [
      { x: 76, y: 22, intensity: 0.92 }, { x: 84, y: 16, intensity: 0.80 },
      { x: 68, y: 28, intensity: 0.70 }, { x: 60, y: 24, intensity: 0.54 },
      { x: 52, y: 28, intensity: 0.38 }, { x: 88, y: 18, intensity: 0.60 },
    ],
  },
  {
    id: 17, name: 'Pedri', photo: '', position: 'MID',
    nationality: 'Spain', team: esp, age: 23, club: 'Barcelona',
    statistics: { goals: 2, assists: 5, shots: 11, shotsOnTarget: 5, minutesPlayed: 590,
      matches: 7, yellowCards: 2, redCards: 0, passAccuracy: 93, xG: 1.6, xA: 4.0,
      tackles: 24, interceptions: 16, keyPasses: 32, dribbles: 32 },
    heatmap: [
      { x: 56, y: 50, intensity: 0.92 }, { x: 64, y: 44, intensity: 0.80 },
      { x: 48, y: 52, intensity: 0.70 }, { x: 70, y: 48, intensity: 0.65 },
      { x: 40, y: 48, intensity: 0.46 }, { x: 62, y: 36, intensity: 0.56 },
    ],
  },
  {
    id: 18, name: 'Dani Olmo', photo: '', position: 'MID',
    nationality: 'Spain', team: esp, age: 27, club: 'Barcelona',
    statistics: { goals: 3, assists: 4, shots: 13, shotsOnTarget: 7, minutesPlayed: 520,
      matches: 6, yellowCards: 1, redCards: 0, passAccuracy: 88, xG: 2.4, xA: 3.2,
      tackles: 16, interceptions: 10, keyPasses: 24, dribbles: 20 },
    heatmap: [
      { x: 65, y: 44, intensity: 0.88 }, { x: 72, y: 38, intensity: 0.76 },
      { x: 58, y: 50, intensity: 0.66 }, { x: 76, y: 50, intensity: 0.60 },
      { x: 50, y: 48, intensity: 0.42 }, { x: 70, y: 32, intensity: 0.54 },
    ],
  },

  // ── Germany ──────────────────────────────────────────────────────────────
  {
    id: 19, name: 'Florian Wirtz', photo: '', position: 'MID',
    nationality: 'Germany', team: ger, age: 22, club: 'Bayern Munich',
    statistics: { goals: 4, assists: 4, shots: 15, shotsOnTarget: 8, minutesPlayed: 540,
      matches: 6, yellowCards: 0, redCards: 0, passAccuracy: 88, xG: 3.0, xA: 3.4,
      tackles: 14, interceptions: 8, keyPasses: 26, dribbles: 28 },
    heatmap: [
      { x: 66, y: 46, intensity: 0.88 }, { x: 74, y: 50, intensity: 0.78 },
      { x: 60, y: 40, intensity: 0.68 }, { x: 76, y: 38, intensity: 0.60 },
      { x: 52, y: 50, intensity: 0.40 }, { x: 70, y: 60, intensity: 0.54 },
    ],
  },
  {
    id: 20, name: 'Jamal Musiala', photo: '', position: 'MID',
    nationality: 'Germany', team: ger, age: 22, club: 'Bayern Munich',
    statistics: { goals: 3, assists: 4, shots: 13, shotsOnTarget: 7, minutesPlayed: 520,
      matches: 6, yellowCards: 0, redCards: 0, passAccuracy: 87, xG: 2.6, xA: 3.0,
      tackles: 12, interceptions: 7, keyPasses: 22, dribbles: 32 },
    heatmap: [
      { x: 68, y: 52, intensity: 0.86 }, { x: 76, y: 46, intensity: 0.76 },
      { x: 62, y: 58, intensity: 0.68 }, { x: 74, y: 60, intensity: 0.58 },
      { x: 54, y: 52, intensity: 0.42 }, { x: 80, y: 48, intensity: 0.58 },
    ],
  },

  // ── Norway ───────────────────────────────────────────────────────────────
  {
    id: 21, name: 'Erling Haaland', photo: '', position: 'FWD',
    nationality: 'Norway', team: nor, age: 26, club: 'Manchester City',
    statistics: { goals: 8, assists: 1, shots: 28, shotsOnTarget: 18, minutesPlayed: 560,
      matches: 7, yellowCards: 0, redCards: 0, passAccuracy: 72, xG: 7.2, xA: 0.8,
      tackles: 2, interceptions: 1, keyPasses: 7, dribbles: 8 },
    heatmap: [
      { x: 84, y: 50, intensity: 0.96 }, { x: 90, y: 44, intensity: 0.88 },
      { x: 80, y: 56, intensity: 0.76 }, { x: 88, y: 58, intensity: 0.68 },
      { x: 76, y: 46, intensity: 0.52 }, { x: 94, y: 50, intensity: 0.72 },
    ],
  },
  {
    id: 22, name: 'Martin Ødegaard', photo: '', position: 'MID',
    nationality: 'Norway', team: nor, age: 27, club: 'Arsenal',
    statistics: { goals: 2, assists: 5, shots: 12, shotsOnTarget: 6, minutesPlayed: 580,
      matches: 7, yellowCards: 1, redCards: 0, passAccuracy: 90, xG: 1.8, xA: 4.2,
      tackles: 16, interceptions: 10, keyPasses: 30, dribbles: 20 },
    heatmap: [
      { x: 62, y: 48, intensity: 0.86 }, { x: 70, y: 42, intensity: 0.76 },
      { x: 56, y: 54, intensity: 0.68 }, { x: 74, y: 50, intensity: 0.60 },
      { x: 46, y: 50, intensity: 0.42 }, { x: 68, y: 36, intensity: 0.54 },
    ],
  },

  // ── USA ──────────────────────────────────────────────────────────────────
  {
    id: 23, name: 'Christian Pulisic', photo: '', position: 'FWD',
    nationality: 'USA', team: usa, age: 26, club: 'AC Milan',
    statistics: { goals: 3, assists: 3, shots: 14, shotsOnTarget: 7, minutesPlayed: 540,
      matches: 6, yellowCards: 0, redCards: 0, passAccuracy: 82, xG: 2.6, xA: 2.4,
      tackles: 8, interceptions: 5, keyPasses: 18, dribbles: 22 },
    heatmap: [
      { x: 74, y: 32, intensity: 0.88 }, { x: 80, y: 24, intensity: 0.76 },
      { x: 66, y: 40, intensity: 0.68 }, { x: 60, y: 32, intensity: 0.52 },
      { x: 52, y: 36, intensity: 0.36 }, { x: 84, y: 28, intensity: 0.58 },
    ],
  },

  // ── Uruguay ──────────────────────────────────────────────────────────────
  {
    id: 24, name: 'Darwin Núñez', photo: '', position: 'FWD',
    nationality: 'Uruguay', team: uru, age: 26, club: 'Liverpool',
    statistics: { goals: 4, assists: 2, shots: 18, shotsOnTarget: 10, minutesPlayed: 510,
      matches: 6, yellowCards: 1, redCards: 0, passAccuracy: 73, xG: 3.8, xA: 1.6,
      tackles: 4, interceptions: 2, keyPasses: 9, dribbles: 16 },
    heatmap: [
      { x: 82, y: 50, intensity: 0.90 }, { x: 88, y: 44, intensity: 0.80 },
      { x: 78, y: 56, intensity: 0.70 }, { x: 86, y: 56, intensity: 0.62 },
      { x: 74, y: 48, intensity: 0.48 }, { x: 92, y: 50, intensity: 0.64 },
    ],
  },
  {
    id: 25, name: 'Federico Valverde', photo: '', position: 'MID',
    nationality: 'Uruguay', team: uru, age: 26, club: 'Real Madrid',
    statistics: { goals: 2, assists: 3, shots: 10, shotsOnTarget: 5, minutesPlayed: 560,
      matches: 7, yellowCards: 1, redCards: 0, passAccuracy: 87, xG: 1.6, xA: 2.4,
      tackles: 26, interceptions: 18, keyPasses: 20, dribbles: 22 },
    heatmap: [
      { x: 54, y: 50, intensity: 0.86 }, { x: 62, y: 44, intensity: 0.74 },
      { x: 46, y: 54, intensity: 0.66 }, { x: 68, y: 50, intensity: 0.58 },
      { x: 38, y: 50, intensity: 0.40 }, { x: 64, y: 36, intensity: 0.52 },
    ],
  },

  // ── Morocco ──────────────────────────────────────────────────────────────
  {
    id: 26, name: 'Achraf Hakimi', photo: '', position: 'DEF',
    nationality: 'Morocco', team: mor, age: 27, club: 'PSG',
    statistics: { goals: 2, assists: 4, shots: 10, shotsOnTarget: 5, minutesPlayed: 590,
      matches: 7, yellowCards: 1, redCards: 0, passAccuracy: 84, xG: 1.4, xA: 3.0,
      tackles: 22, interceptions: 14, keyPasses: 18, dribbles: 24 },
    heatmap: [
      { x: 70, y: 18, intensity: 0.84 }, { x: 80, y: 12, intensity: 0.72 },
      { x: 60, y: 22, intensity: 0.62 }, { x: 50, y: 18, intensity: 0.48 },
      { x: 40, y: 22, intensity: 0.32 }, { x: 84, y: 14, intensity: 0.56 },
    ],
  },

  // ── Netherlands ──────────────────────────────────────────────────────────
  {
    id: 27, name: 'Cody Gakpo', photo: '', position: 'FWD',
    nationality: 'Netherlands', team: ned, age: 26, club: 'Liverpool',
    statistics: { goals: 4, assists: 3, shots: 16, shotsOnTarget: 9, minutesPlayed: 530,
      matches: 6, yellowCards: 0, redCards: 0, passAccuracy: 81, xG: 3.4, xA: 2.4,
      tackles: 6, interceptions: 3, keyPasses: 16, dribbles: 19 },
    heatmap: [
      { x: 76, y: 44, intensity: 0.88 }, { x: 82, y: 36, intensity: 0.76 },
      { x: 70, y: 50, intensity: 0.66 }, { x: 80, y: 56, intensity: 0.58 },
      { x: 64, y: 46, intensity: 0.44 }, { x: 86, y: 42, intensity: 0.60 },
    ],
  },

  // ── Mexico ───────────────────────────────────────────────────────────────
  {
    id: 28, name: 'Santiago Giménez', photo: '', position: 'FWD',
    nationality: 'Mexico', team: mex, age: 24, club: 'AC Milan',
    statistics: { goals: 4, assists: 1, shots: 17, shotsOnTarget: 9, minutesPlayed: 500,
      matches: 6, yellowCards: 1, redCards: 0, passAccuracy: 74, xG: 3.6, xA: 0.8,
      tackles: 3, interceptions: 1, keyPasses: 8, dribbles: 11 },
    heatmap: [
      { x: 80, y: 50, intensity: 0.88 }, { x: 86, y: 44, intensity: 0.76 },
      { x: 76, y: 56, intensity: 0.66 }, { x: 84, y: 56, intensity: 0.58 },
      { x: 72, y: 48, intensity: 0.44 }, { x: 90, y: 50, intensity: 0.62 },
    ],
  },

  // ── Croatia ──────────────────────────────────────────────────────────────
  {
    id: 29, name: 'Luka Modrić', photo: '', position: 'MID',
    nationality: 'Croatia', team: cro, age: 41, club: 'Real Madrid',
    statistics: { goals: 1, assists: 4, shots: 8, shotsOnTarget: 4, minutesPlayed: 500,
      matches: 6, yellowCards: 1, redCards: 0, passAccuracy: 92, xG: 0.8, xA: 3.2,
      tackles: 18, interceptions: 12, keyPasses: 28, dribbles: 14 },
    heatmap: [
      { x: 54, y: 50, intensity: 0.82 }, { x: 62, y: 44, intensity: 0.72 },
      { x: 46, y: 54, intensity: 0.64 }, { x: 68, y: 50, intensity: 0.56 },
      { x: 38, y: 50, intensity: 0.38 }, { x: 60, y: 36, intensity: 0.50 },
    ],
  },
];

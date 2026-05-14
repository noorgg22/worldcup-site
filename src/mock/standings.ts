import type { StandingsRow } from '../types';
import { mockTeams } from './teams';

// All stats start at 0 — will be replaced by live API data during the tournament
const blank = (name: string): StandingsRow => {
  const team = mockTeams.find(t => t.name === name)!;
  return { team, played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDiff: 0, points: 0, qualified: 'pending' };
};

export const mockStandings: StandingsRow[] = [
  // Group A
  blank('Mexico'), blank('South Africa'), blank('Korea Republic'), blank('Czechia'),
  // Group B
  blank('Canada'), blank('Switzerland'), blank('Qatar'), blank('Bosnia & Herzegovina'),
  // Group C
  blank('Brazil'), blank('Morocco'), blank('Haiti'), blank('Scotland'),
  // Group D
  blank('United States'), blank('Paraguay'), blank('Australia'), blank('Türkiye'),
  // Group E
  blank('Germany'), blank('Curaçao'), blank("Côte d'Ivoire"), blank('Ecuador'),
  // Group F
  blank('Netherlands'), blank('Japan'), blank('Tunisia'), blank('Sweden'),
  // Group G
  blank('Belgium'), blank('Egypt'), blank('Iran'), blank('New Zealand'),
  // Group H
  blank('Spain'), blank('Cabo Verde'), blank('Saudi Arabia'), blank('Uruguay'),
  // Group I
  blank('France'), blank('Senegal'), blank('Norway'), blank('Iraq'),
  // Group J
  blank('Argentina'), blank('Algeria'), blank('Austria'), blank('Jordan'),
  // Group K
  blank('Portugal'), blank('Uzbekistan'), blank('Colombia'), blank('DR Congo'),
  // Group L
  blank('England'), blank('Croatia'), blank('Ghana'), blank('Panama'),
];

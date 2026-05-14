import type { Team } from '../types';

export const mockTeams: Team[] = [
  // Group A
  { id: 1,  name: 'Mexico',              shortName: 'MEX', flag: '🇲🇽', group: 'A', confederation: 'CONCACAF' },
  { id: 2,  name: 'South Africa',        shortName: 'RSA', flag: '🇿🇦', group: 'A', confederation: 'CAF' },
  { id: 3,  name: 'Korea Republic',      shortName: 'KOR', flag: '🇰🇷', group: 'A', confederation: 'AFC' },
  { id: 4,  name: 'Czechia',             shortName: 'CZE', flag: '🇨🇿', group: 'A', confederation: 'UEFA' },
  // Group B
  { id: 5,  name: 'Canada',              shortName: 'CAN', flag: '🇨🇦', group: 'B', confederation: 'CONCACAF' },
  { id: 6,  name: 'Switzerland',         shortName: 'SUI', flag: '🇨🇭', group: 'B', confederation: 'UEFA' },
  { id: 7,  name: 'Qatar',               shortName: 'QAT', flag: '🇶🇦', group: 'B', confederation: 'AFC' },
  { id: 8,  name: 'Bosnia & Herzegovina',shortName: 'BIH', flag: '🇧🇦', group: 'B', confederation: 'UEFA' },
  // Group C
  { id: 9,  name: 'Brazil',              shortName: 'BRA', flag: '🇧🇷', group: 'C', confederation: 'CONMEBOL' },
  { id: 10, name: 'Morocco',             shortName: 'MAR', flag: '🇲🇦', group: 'C', confederation: 'CAF' },
  { id: 11, name: 'Haiti',               shortName: 'HAI', flag: '🇭🇹', group: 'C', confederation: 'CONCACAF' },
  { id: 12, name: 'Scotland',            shortName: 'SCO', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', group: 'C', confederation: 'UEFA' },
  // Group D
  { id: 13, name: 'United States',       shortName: 'USA', flag: '🇺🇸', group: 'D', confederation: 'CONCACAF' },
  { id: 14, name: 'Paraguay',            shortName: 'PAR', flag: '🇵🇾', group: 'D', confederation: 'CONMEBOL' },
  { id: 15, name: 'Australia',           shortName: 'AUS', flag: '🇦🇺', group: 'D', confederation: 'AFC' },
  { id: 16, name: 'Türkiye',             shortName: 'TUR', flag: '🇹🇷', group: 'D', confederation: 'UEFA' },
  // Group E
  { id: 17, name: 'Germany',             shortName: 'GER', flag: '🇩🇪', group: 'E', confederation: 'UEFA' },
  { id: 18, name: 'Curaçao',             shortName: 'CUW', flag: '🇨🇼', group: 'E', confederation: 'CONCACAF' },
  { id: 19, name: "Côte d'Ivoire",       shortName: 'CIV', flag: '🇨🇮', group: 'E', confederation: 'CAF' },
  { id: 20, name: 'Ecuador',             shortName: 'ECU', flag: '🇪🇨', group: 'E', confederation: 'CONMEBOL' },
  // Group F
  { id: 21, name: 'Netherlands',         shortName: 'NED', flag: '🇳🇱', group: 'F', confederation: 'UEFA' },
  { id: 22, name: 'Japan',               shortName: 'JPN', flag: '🇯🇵', group: 'F', confederation: 'AFC' },
  { id: 23, name: 'Tunisia',             shortName: 'TUN', flag: '🇹🇳', group: 'F', confederation: 'CAF' },
  { id: 24, name: 'Sweden',              shortName: 'SWE', flag: '🇸🇪', group: 'F', confederation: 'UEFA' },
  // Group G
  { id: 25, name: 'Belgium',             shortName: 'BEL', flag: '🇧🇪', group: 'G', confederation: 'UEFA' },
  { id: 26, name: 'Egypt',               shortName: 'EGY', flag: '🇪🇬', group: 'G', confederation: 'CAF' },
  { id: 27, name: 'Iran',                shortName: 'IRN', flag: '🇮🇷', group: 'G', confederation: 'AFC' },
  { id: 28, name: 'New Zealand',         shortName: 'NZL', flag: '🇳🇿', group: 'G', confederation: 'OFC' },
  // Group H
  { id: 29, name: 'Spain',               shortName: 'ESP', flag: '🇪🇸', group: 'H', confederation: 'UEFA' },
  { id: 30, name: 'Cabo Verde',          shortName: 'CPV', flag: '🇨🇻', group: 'H', confederation: 'CAF' },
  { id: 31, name: 'Saudi Arabia',        shortName: 'KSA', flag: '🇸🇦', group: 'H', confederation: 'AFC' },
  { id: 32, name: 'Uruguay',             shortName: 'URU', flag: '🇺🇾', group: 'H', confederation: 'CONMEBOL' },
  // Group I
  { id: 33, name: 'France',              shortName: 'FRA', flag: '🇫🇷', group: 'I', confederation: 'UEFA' },
  { id: 34, name: 'Senegal',             shortName: 'SEN', flag: '🇸🇳', group: 'I', confederation: 'CAF' },
  { id: 35, name: 'Norway',              shortName: 'NOR', flag: '🇳🇴', group: 'I', confederation: 'UEFA' },
  { id: 36, name: 'Iraq',                shortName: 'IRQ', flag: '🇮🇶', group: 'I', confederation: 'AFC' },
  // Group J
  { id: 37, name: 'Argentina',           shortName: 'ARG', flag: '🇦🇷', group: 'J', confederation: 'CONMEBOL' },
  { id: 38, name: 'Algeria',             shortName: 'ALG', flag: '🇩🇿', group: 'J', confederation: 'CAF' },
  { id: 39, name: 'Austria',             shortName: 'AUT', flag: '🇦🇹', group: 'J', confederation: 'UEFA' },
  { id: 40, name: 'Jordan',              shortName: 'JOR', flag: '🇯🇴', group: 'J', confederation: 'AFC' },
  // Group K
  { id: 41, name: 'Portugal',            shortName: 'POR', flag: '🇵🇹', group: 'K', confederation: 'UEFA' },
  { id: 42, name: 'Uzbekistan',          shortName: 'UZB', flag: '🇺🇿', group: 'K', confederation: 'AFC' },
  { id: 43, name: 'Colombia',            shortName: 'COL', flag: '🇨🇴', group: 'K', confederation: 'CONMEBOL' },
  { id: 44, name: 'DR Congo',            shortName: 'COD', flag: '🇨🇩', group: 'K', confederation: 'CAF' },
  // Group L
  { id: 45, name: 'England',             shortName: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'L', confederation: 'UEFA' },
  { id: 46, name: 'Croatia',             shortName: 'CRO', flag: '🇭🇷', group: 'L', confederation: 'UEFA' },
  { id: 47, name: 'Ghana',               shortName: 'GHA', flag: '🇬🇭', group: 'L', confederation: 'CAF' },
  { id: 48, name: 'Panama',              shortName: 'PAN', flag: '🇵🇦', group: 'L', confederation: 'CONCACAF' },
];

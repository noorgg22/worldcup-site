export interface WCStat {
  name: string;
  titles: number;
  titleYears: string;
  finals: number;
  semis: number;
  appearances: number;   // total including 2026
  bestResult: string;
  group: string;
  confederation: string;
}

// Keyed by the English country name as it appears in world GeoJSON (properties.name)
export const WC_STATS: Record<string, WCStat> = {
  // ── Group A ──────────────────────────────────────────────────────────────────
  'Mexico': {
    name: 'Mexico', titles: 0, titleYears: '', finals: 0, semis: 0,
    // 1930,1950,1954,1958,1962,1966,1970,1974,1978,1982,1986,1994,1998,2002,2006,2010,2014,2018,2022,2026
    // (missed 1934, 1938, banned 1990)
    appearances: 20, bestResult: 'Quarter-Final (1970, 1986)',
    group: 'A', confederation: 'CONCACAF',
  },
  'South Africa': {
    name: 'South Africa', titles: 0, titleYears: '', finals: 0, semis: 0,
    // 1998, 2002, 2010 (host), 2026
    appearances: 4, bestResult: 'Group Stage (1998, 2002, 2010)',
    group: 'A', confederation: 'CAF',
  },
  'Korea Republic': {
    name: 'Korea Republic', titles: 0, titleYears: '', finals: 0, semis: 1,
    appearances: 12, bestResult: 'Semi-Final (2002)',
    group: 'A', confederation: 'AFC',
  },
  'Czechia': {
    name: 'Czechia', titles: 0, titleYears: '',
    // Includes Czechoslovakia history (FIFA successor state)
    // Czechoslovakia finals: 1934 (lost to Italy 2-1), 1962 (lost to Brazil 3-1)
    // Czechoslovakia SFs: 1934 (won), 1962 (won)
    // Czechoslovakia appearances: 1934,1938,1954,1958,1962,1970,1982 (7)
    // Czech Republic: 2006 (1) · Czechia: 2026 (1)
    finals: 2, semis: 2,
    appearances: 9, bestResult: 'Runner-Up (1934, 1962 as Czechoslovakia)',
    group: 'A', confederation: 'UEFA',
  },
  // ── Group B ──────────────────────────────────────────────────────────────────
  'Canada': {
    name: 'Canada', titles: 0, titleYears: '', finals: 0, semis: 0,
    // 1986, 2022, 2026
    appearances: 3, bestResult: 'Group Stage (1986)',
    group: 'B', confederation: 'CONCACAF',
  },
  'Switzerland': {
    name: 'Switzerland', titles: 0, titleYears: '', finals: 0, semis: 0,
    // 1934,1938,1950,1954,1962,1966,1994,2006,2010,2014,2018,2022,2026
    appearances: 13, bestResult: 'Quarter-Final (1934, 1938, 1954)',
    group: 'B', confederation: 'UEFA',
  },
  'Qatar': {
    name: 'Qatar', titles: 0, titleYears: '', finals: 0, semis: 0,
    // 2022 (host), 2026
    appearances: 2, bestResult: 'Group Stage (2022)',
    group: 'B', confederation: 'AFC',
  },
  'Bosnia and Herzegovina': {
    name: 'Bosnia & Herzegovina', titles: 0, titleYears: '', finals: 0, semis: 0,
    // 2014, 2026
    appearances: 2, bestResult: 'Group Stage (2014)',
    group: 'B', confederation: 'UEFA',
  },
  // ── Group C ──────────────────────────────────────────────────────────────────
  'Brazil': {
    name: 'Brazil', titles: 5, titleYears: '1958, 1962, 1970, 1994, 2002',
    // Only nation to appear in every World Cup (23 tournaments)
    finals: 7, semis: 12,
    appearances: 23, bestResult: '🏆 Champions — 5 times',
    group: 'C', confederation: 'CONMEBOL',
  },
  'Morocco': {
    name: 'Morocco', titles: 0, titleYears: '', finals: 0, semis: 1,
    // 1970,1986,1994,1998,2018,2022,2026
    appearances: 7, bestResult: 'Semi-Final (2022)',
    group: 'C', confederation: 'CAF',
  },
  'Haiti': {
    name: 'Haiti', titles: 0, titleYears: '', finals: 0, semis: 0,
    // 1974, 2026
    appearances: 2, bestResult: 'Group Stage (1974)',
    group: 'C', confederation: 'CONCACAF',
  },
  'Scotland': {
    name: 'Scotland', titles: 0, titleYears: '', finals: 0, semis: 0,
    // 1954,1958,1974,1978,1982,1986,1990,1998,2026
    appearances: 9, bestResult: 'Group Stage (never advanced from groups)',
    group: 'C', confederation: 'UEFA',
  },
  // ── Group D ──────────────────────────────────────────────────────────────────
  'United States of America': {
    name: 'United States', titles: 0, titleYears: '', finals: 0, semis: 1,
    // 1930,1934,1950,1990,1994,1998,2002,2006,2010,2014,2022,2026
    // (missed 1958-1986 and missed 2018 — lost to Trinidad & Tobago in qualifying)
    appearances: 12, bestResult: 'Semi-Final (1930)',
    group: 'D', confederation: 'CONCACAF',
  },
  'Paraguay': {
    name: 'Paraguay', titles: 0, titleYears: '', finals: 0, semis: 0,
    // 1930,1950,1958,1986,1998,2002,2006,2010,2026 (did NOT play in 1954)
    appearances: 9, bestResult: 'Quarter-Final (2010)',
    group: 'D', confederation: 'CONMEBOL',
  },
  'Australia': {
    name: 'Australia', titles: 0, titleYears: '', finals: 0, semis: 0,
    // 1974,2006,2010,2014,2018,2022,2026
    appearances: 7, bestResult: 'Round of 16 (2006, 2022)',
    group: 'D', confederation: 'AFC',
  },
  'Turkey': {
    name: 'Türkiye', titles: 0, titleYears: '', finals: 0, semis: 1,
    // 1954,1966,2002,2026
    appearances: 4, bestResult: '3rd Place (2002)',
    group: 'D', confederation: 'UEFA',
  },
  // ── Group E ──────────────────────────────────────────────────────────────────
  'Germany': {
    name: 'Germany', titles: 4, titleYears: '1954, 1974, 1990, 2014',
    // Includes West Germany history (FIFA successor state)
    // 1934,1938,1954,1958,1962,1966,1970,1974,1978,1982,1986,1990,1994,1998,2002,2006,2010,2014,2018,2022,2026
    finals: 8, semis: 13,
    appearances: 21, bestResult: '🏆 Champions — 4 times',
    group: 'E', confederation: 'UEFA',
  },
  'Curaçao': {
    name: 'Curaçao', titles: 0, titleYears: '', finals: 0, semis: 0,
    appearances: 1, bestResult: 'Tournament Debut in 2026!',
    group: 'E', confederation: 'CONCACAF',
  },
  "Côte d'Ivoire": {
    name: "Côte d'Ivoire", titles: 0, titleYears: '', finals: 0, semis: 0,
    // 2006,2010,2014,2026
    appearances: 4, bestResult: 'Group Stage (2006, 2010, 2014)',
    group: 'E', confederation: 'CAF',
  },
  'Ecuador': {
    name: 'Ecuador', titles: 0, titleYears: '', finals: 0, semis: 0,
    // 2002,2006,2014,2022,2026
    appearances: 5, bestResult: 'Round of 16 (2006)',
    group: 'E', confederation: 'CONMEBOL',
  },
  // ── Group F ──────────────────────────────────────────────────────────────────
  'Netherlands': {
    name: 'Netherlands', titles: 0, titleYears: '', finals: 3, semis: 5,
    // 1934,1938,1974,1978,1990,1994,1998,2006,2010,2014,2022,2026
    appearances: 12, bestResult: 'Runner-Up (1974, 1978, 2010)',
    group: 'F', confederation: 'UEFA',
  },
  'Japan': {
    name: 'Japan', titles: 0, titleYears: '', finals: 0, semis: 0,
    // First appearance 1998; 1998,2002,2006,2010,2014,2018,2022,2026
    appearances: 8, bestResult: 'Round of 16 (2002, 2010, 2018, 2022)',
    group: 'F', confederation: 'AFC',
  },
  'Tunisia': {
    name: 'Tunisia', titles: 0, titleYears: '', finals: 0, semis: 0,
    // 1978,1998,2002,2006,2018,2022,2026
    appearances: 7, bestResult: 'Group Stage',
    group: 'F', confederation: 'CAF',
  },
  'Sweden': {
    name: 'Sweden', titles: 0, titleYears: '', finals: 1, semis: 3,
    // 1934,1938,1950,1958,1970,1974,1978,1990,1994,2002,2006,2018,2026
    appearances: 13, bestResult: 'Runner-Up (1958), 3rd Place (1950, 1994)',
    group: 'F', confederation: 'UEFA',
  },
  // ── Group G ──────────────────────────────────────────────────────────────────
  'Belgium': {
    name: 'Belgium', titles: 0, titleYears: '', finals: 0, semis: 2,
    // 1930,1934,1938,1954,1970,1982,1986,1990,1994,1998,2002,2014,2018,2022,2026
    appearances: 15, bestResult: '3rd Place (2018)',
    group: 'G', confederation: 'UEFA',
  },
  'Egypt': {
    name: 'Egypt', titles: 0, titleYears: '', finals: 0, semis: 0,
    // 1934,1990,2018,2026
    appearances: 4, bestResult: 'Group Stage (1934, 1990, 2018)',
    group: 'G', confederation: 'CAF',
  },
  'Iran': {
    name: 'Iran', titles: 0, titleYears: '', finals: 0, semis: 0,
    // 1978,1998,2006,2014,2018,2022,2026
    appearances: 7, bestResult: 'Group Stage',
    group: 'G', confederation: 'AFC',
  },
  'New Zealand': {
    name: 'New Zealand', titles: 0, titleYears: '', finals: 0, semis: 0,
    // 1982,2010,2026
    appearances: 3, bestResult: 'Group Stage (1982, 2010)',
    group: 'G', confederation: 'OFC',
  },
  // ── Group H ──────────────────────────────────────────────────────────────────
  'Spain': {
    name: 'Spain', titles: 1, titleYears: '2010',
    // 1934,1950,1962,1966,1978,1982,1986,1990,1994,1998,2002,2006,2010,2014,2018,2022,2026
    finals: 1, semis: 4,
    appearances: 17, bestResult: '🏆 Champions (2010)',
    group: 'H', confederation: 'UEFA',
  },
  'Cape Verde': {
    name: 'Cabo Verde', titles: 0, titleYears: '', finals: 0, semis: 0,
    appearances: 1, bestResult: 'Tournament Debut in 2026!',
    group: 'H', confederation: 'CAF',
  },
  'Saudi Arabia': {
    name: 'Saudi Arabia', titles: 0, titleYears: '', finals: 0, semis: 0,
    // 1994,1998,2002,2006,2018,2022,2026
    appearances: 7, bestResult: 'Round of 16 (1994)',
    group: 'H', confederation: 'AFC',
  },
  'Uruguay': {
    name: 'Uruguay', titles: 2, titleYears: '1930, 1950',
    // 1930,1950,1954,1962,1966,1970,1974,1986,1990,2002,2010,2014,2018,2022,2026
    finals: 3, semis: 6,
    appearances: 15, bestResult: '🏆 Champions — 2 times',
    group: 'H', confederation: 'CONMEBOL',
  },
  // ── Group I ──────────────────────────────────────────────────────────────────
  'France': {
    name: 'France', titles: 2, titleYears: '1998, 2018',
    // Finals: 1998 (won), 2006 (lost), 2018 (won), 2022 (lost) = 4 finals
    // Semis: 1958,1982,1986,1998,2006,2018,2022 = 7 semi-final appearances
    finals: 4, semis: 7,
    appearances: 16, bestResult: '🏆 Champions — 2 times',
    group: 'I', confederation: 'UEFA',
  },
  'Senegal': {
    name: 'Senegal', titles: 0, titleYears: '', finals: 0, semis: 0,
    // 2002,2018,2022,2026
    appearances: 4, bestResult: 'Quarter-Final (2002)',
    group: 'I', confederation: 'CAF',
  },
  'Norway': {
    name: 'Norway', titles: 0, titleYears: '', finals: 0, semis: 0,
    // 1938,1994,1998,2026
    appearances: 4, bestResult: 'Round of 16 (1998)',
    group: 'I', confederation: 'UEFA',
  },
  'Iraq': {
    name: 'Iraq', titles: 0, titleYears: '', finals: 0, semis: 0,
    // 1986,2026
    appearances: 2, bestResult: 'Group Stage (1986)',
    group: 'I', confederation: 'AFC',
  },
  // ── Group J ──────────────────────────────────────────────────────────────────
  'Argentina': {
    name: 'Argentina', titles: 3, titleYears: '1978, 1986, 2022',
    // 1930,1934,1958,1962,1966,1974,1978,1982,1986,1990,1994,1998,2002,2006,2010,2014,2018,2022,2026
    finals: 6, semis: 8,
    appearances: 19, bestResult: '🏆 Champions — 3 times',
    group: 'J', confederation: 'CONMEBOL',
  },
  'Algeria': {
    name: 'Algeria', titles: 0, titleYears: '', finals: 0, semis: 0,
    // 1982,1986,2010,2014,2026
    appearances: 5, bestResult: 'Round of 16 (2014)',
    group: 'J', confederation: 'CAF',
  },
  'Austria': {
    name: 'Austria', titles: 0, titleYears: '', finals: 0, semis: 2,
    // 1934,1954,1958,1978,1982,1990,1998,2026
    // SFs: 1934 (lost to Germany, finished 4th), 1954 (lost to W. Germany 1-6, finished 3rd)
    appearances: 8, bestResult: '3rd Place (1954)',
    group: 'J', confederation: 'UEFA',
  },
  'Jordan': {
    name: 'Jordan', titles: 0, titleYears: '', finals: 0, semis: 0,
    appearances: 1, bestResult: 'Tournament Debut in 2026!',
    group: 'J', confederation: 'AFC',
  },
  // ── Group K ──────────────────────────────────────────────────────────────────
  'Portugal': {
    name: 'Portugal', titles: 0, titleYears: '', finals: 0, semis: 2,
    // 1966,1986,2002,2006,2010,2014,2018,2022,2026
    // SFs: 1966 (lost to England, finished 3rd), 2006 (lost to France, finished 4th)
    appearances: 9, bestResult: '3rd Place (1966), 4th Place (2006)',
    group: 'K', confederation: 'UEFA',
  },
  'Uzbekistan': {
    name: 'Uzbekistan', titles: 0, titleYears: '', finals: 0, semis: 0,
    appearances: 1, bestResult: 'Tournament Debut in 2026!',
    group: 'K', confederation: 'AFC',
  },
  'Colombia': {
    name: 'Colombia', titles: 0, titleYears: '', finals: 0, semis: 0,
    // 1962,1990,1994,1998,2014,2018,2026
    appearances: 7, bestResult: 'Quarter-Final (2014)',
    group: 'K', confederation: 'CONMEBOL',
  },
  'Democratic Republic of the Congo': {
    name: 'DR Congo', titles: 0, titleYears: '', finals: 0, semis: 0,
    // 1974 (as Zaire), 2026
    appearances: 2, bestResult: 'Group Stage (1974 as Zaire)',
    group: 'K', confederation: 'CAF',
  },
  // ── Group L ──────────────────────────────────────────────────────────────────
  'England': {
    name: 'England', titles: 1, titleYears: '1966',
    // 1950,1954,1958,1962,1966,1970,1982,1986,1990,1998,2002,2006,2010,2014,2018,2022,2026
    finals: 1, semis: 3,
    appearances: 17, bestResult: '🏆 Champions (1966)',
    group: 'L', confederation: 'UEFA',
  },
  'Croatia': {
    name: 'Croatia', titles: 0, titleYears: '', finals: 1, semis: 2,
    // 1998,2002,2006,2014,2018,2022,2026
    appearances: 7, bestResult: 'Runner-Up (2018), 3rd Place (1998)',
    group: 'L', confederation: 'UEFA',
  },
  'Ghana': {
    name: 'Ghana', titles: 0, titleYears: '', finals: 0, semis: 0,
    // 2006,2010,2014,2022,2026
    appearances: 5, bestResult: 'Quarter-Final (2010)',
    group: 'L', confederation: 'CAF',
  },
  'Panama': {
    name: 'Panama', titles: 0, titleYears: '', finals: 0, semis: 0,
    // 2018,2026
    appearances: 2, bestResult: 'Group Stage (2018)',
    group: 'L', confederation: 'CONCACAF',
  },
};

// GeoJSON country name → WC_STATS key (for names that differ)
export const GEO_ALIAS: Record<string, string> = {
  'United States of America': 'United States of America',
  'USA': 'United States of America',
  'United States': 'United States of America',
  'Turkey': 'Turkey',
  'Türkiye': 'Turkey',
  'Ivory Coast': "Côte d'Ivoire",
  "Côte d'Ivoire": "Côte d'Ivoire",
  'Bosnia and Herzegovina': 'Bosnia and Herzegovina',
  'Bosnia & Herzegovina': 'Bosnia and Herzegovina',
  'Democratic Republic of the Congo': 'Democratic Republic of the Congo',
  'DR Congo': 'Democratic Republic of the Congo',
  'Czech Republic': 'Czechia',
  'Czechia': 'Czechia',
  'Cape Verde': 'Cape Verde',
  'Cabo Verde': 'Cape Verde',
  'South Korea': 'Korea Republic',
  'Republic of Korea': 'Korea Republic',
  'Korea Republic': 'Korea Republic',
  'Curacao': 'Curaçao',
  'Curaçao': 'Curaçao',
};

export const GROUP_COLORS: Record<string, string> = {
  A: '#f5c842', B: '#4fc3f7', C: '#ef5350', D: '#66bb6a',
  E: '#ab47bc', F: '#ff7043', G: '#26c6da', H: '#8d6e63',
  I: '#ec407a', J: '#29b6f6', K: '#9ccc65', L: '#ffa726',
};

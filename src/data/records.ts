// All-Time World Cup Records — verified accurate as of 2022
// Germany includes West Germany (same DFB federation)
// Czechia includes Czechoslovakia (direct FA successor)
// Russia includes Soviet Union (direct FA successor)
// Yugoslavia/Serbia combined (Yugoslavia 1930–1998, Serbia 2006–2022)

export interface LeaderboardEntry {
  rank: number;
  name: string;
  country: string;
  flag: string;
  value: string;
  year: string;
}

export interface IndividualRecord {
  category: string;
  holder: string;
  country: string;
  flag: string;
  value: string;
  detail: string;
  year: string;
  leaderboard?: LeaderboardEntry[];
}

export interface TeamRecord {
  category: string;
  holder: string;
  flag: string;
  value: string;
  detail: string;
  year: string;
}

export interface TournamentRecord {
  category: string;
  value: string;
  detail: string;
  year: string;
}

export interface AllTimeStanding {
  country: string;
  flag: string;
  note?: string;
  titles: number;
  finals: number;
  semis: number;
  apps: number;
  gp: number;
  w: number;
  d: number;
  l: number;
  gf: number;
  ga: number;
  // Year arrays for hover tooltips
  titleYears?: number[];
  finalYears?: number[];
  semiYears?: number[];  // ALL years that reached SF or better
}

// ── Individual Records ────────────────────────────────────────────────────────
export const INDIVIDUAL_RECORDS: IndividualRecord[] = [
  {
    category: 'All-Time Top Scorer',
    holder: 'Miroslav Klose',
    country: 'Germany', flag: '🇩🇪',
    value: '16 goals',
    detail: 'Scored across 4 tournaments (2002–2014). Broke Ronaldo\'s record with his 16th goal in the 2014 semifinal against Brazil.',
    year: '2002–2014',
    leaderboard: [
      { rank: 1,  name: 'Miroslav Klose',      country: 'Germany',       flag: '🇩🇪', value: '16 goals', year: '2002–2014' },
      { rank: 2,  name: 'Ronaldo',              country: 'Brazil',        flag: '🇧🇷', value: '15 goals', year: '1994–2006' },
      { rank: 3,  name: 'Gerd Müller',          country: 'West Germany',  flag: '🇩🇪', value: '14 goals', year: '1970–1974' },
      { rank: 4,  name: 'Just Fontaine',        country: 'France',        flag: '🇫🇷', value: '13 goals', year: '1958' },
      { rank: 5,  name: 'Pelé',                 country: 'Brazil',        flag: '🇧🇷', value: '12 goals', year: '1958–1970' },
      { rank: 6,  name: 'Sándor Kocsis',        country: 'Hungary',       flag: '🇭🇺', value: '11 goals', year: '1954' },
      { rank: 7,  name: 'Jürgen Klinsmann',     country: 'Germany',       flag: '🇩🇪', value: '11 goals', year: '1990–1998' },
      { rank: 8,  name: 'Gary Lineker',         country: 'England',       flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', value: '10 goals', year: '1986–1990' },
      { rank: 9,  name: 'Gabriel Batistuta',    country: 'Argentina',     flag: '🇦🇷', value: '10 goals', year: '1994–2002' },
      { rank: 10, name: 'Teófilo Cubillas',     country: 'Peru',          flag: '🇵🇪', value: '10 goals', year: '1970–1978' },
      { rank: 11, name: 'Grzegorz Lato',        country: 'Poland',        flag: '🇵🇱', value: '10 goals', year: '1974–1982' },
      { rank: 12, name: 'Thomas Müller',        country: 'Germany',       flag: '🇩🇪', value: '10 goals', year: '2010–2018' },
      { rank: 13, name: 'Eusébio',              country: 'Portugal',      flag: '🇵🇹', value: '9 goals',  year: '1966' },
      { rank: 14, name: 'Jairzinho',            country: 'Brazil',        flag: '🇧🇷', value: '9 goals',  year: '1966–1974' },
      { rank: 15, name: 'Karl-Heinz Rummenigge',country: 'West Germany',  flag: '🇩🇪', value: '9 goals',  year: '1978–1986' },
      { rank: 16, name: 'Uwe Seeler',           country: 'West Germany',  flag: '🇩🇪', value: '9 goals',  year: '1958–1970' },
      { rank: 17, name: 'Ademir',               country: 'Brazil',        flag: '🇧🇷', value: '9 goals',  year: '1950' },
      { rank: 18, name: 'Guillermo Stábile',    country: 'Argentina',     flag: '🇦🇷', value: '8 goals',  year: '1930' },
      { rank: 19, name: 'Leônidas',             country: 'Brazil',        flag: '🇧🇷', value: '8 goals',  year: '1934–1938' },
      { rank: 20, name: 'Rivaldo',              country: 'Brazil',        flag: '🇧🇷', value: '8 goals',  year: '1998–2002' },
    ],
  },
  {
    category: 'Most Goals in a Single Tournament',
    holder: 'Just Fontaine',
    country: 'France', flag: '🇫🇷',
    value: '13 goals',
    detail: 'Scored 13 goals in just 6 matches at the 1958 World Cup in Sweden — a record widely regarded as untouchable.',
    year: '1958',
    leaderboard: [
      { rank: 1,  name: 'Just Fontaine',     country: 'France',       flag: '🇫🇷', value: '13 goals', year: '1958' },
      { rank: 2,  name: 'Sándor Kocsis',     country: 'Hungary',      flag: '🇭🇺', value: '11 goals', year: '1954' },
      { rank: 3,  name: 'Gerd Müller',       country: 'West Germany', flag: '🇩🇪', value: '10 goals', year: '1970' },
      { rank: 4,  name: 'Eusébio',           country: 'Portugal',     flag: '🇵🇹', value: '9 goals',  year: '1966' },
      { rank: 5,  name: 'Guillermo Stábile', country: 'Argentina',    flag: '🇦🇷', value: '8 goals',  year: '1930' },
      { rank: 6,  name: 'Ademir',            country: 'Brazil',       flag: '🇧🇷', value: '8 goals',  year: '1950' },
      { rank: 7,  name: 'Ronaldo',           country: 'Brazil',       flag: '🇧🇷', value: '8 goals',  year: '2002' },
      { rank: 8,  name: 'Leônidas',          country: 'Brazil',       flag: '🇧🇷', value: '7 goals',  year: '1938' },
      { rank: 9,  name: 'Grzegorz Lato',     country: 'Poland',       flag: '🇵🇱', value: '7 goals',  year: '1974' },
      { rank: 10, name: 'Gary Lineker',      country: 'England',      flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', value: '6 goals',  year: '1986' },
      { rank: 11, name: 'Oleg Salenko',      country: 'Russia',       flag: '🇷🇺', value: '6 goals',  year: '1994' },
      { rank: 12, name: 'Helmut Rahn',       country: 'West Germany', flag: '🇩🇪', value: '6 goals',  year: '1958' },
      { rank: 13, name: 'Thomas Müller',     country: 'Germany',      flag: '🇩🇪', value: '5 goals',  year: '2010' },
      { rank: 14, name: 'Miroslav Klose',    country: 'Germany',      flag: '🇩🇪', value: '5 goals',  year: '2006' },
      { rank: 15, name: 'Miroslav Klose',    country: 'Germany',      flag: '🇩🇪', value: '5 goals',  year: '2002' },
    ],
  },
  {
    category: 'Most Goals in a Single Match',
    holder: 'Oleg Salenko',
    country: 'Russia', flag: '🇷🇺',
    value: '5 goals',
    detail: 'Scored 5 goals against Cameroon on June 28, 1994 — still the record for goals by one player in a single WC match.',
    year: '1994',
    leaderboard: [
      { rank: 1, name: 'Oleg Salenko',       country: 'Russia',       flag: '🇷🇺', value: '5 goals', year: '1994 vs Cameroon' },
      { rank: 2, name: 'Sándor Kocsis',      country: 'Hungary',      flag: '🇭🇺', value: '4 goals', year: '1954 vs W.Germany' },
      { rank: 2, name: 'Just Fontaine',      country: 'France',       flag: '🇫🇷', value: '4 goals', year: '1958 vs W.Germany' },
      { rank: 2, name: 'Eusébio',            country: 'Portugal',     flag: '🇵🇹', value: '4 goals', year: '1966 vs N.Korea' },
      { rank: 2, name: 'Emilio Butragueño',  country: 'Spain',        flag: '🇪🇸', value: '4 goals', year: '1986 vs Denmark' },
      { rank: 2, name: 'László Kiss',        country: 'Hungary',      flag: '🇭🇺', value: '4 goals', year: '1982 vs El Salvador' },
      { rank: 2, name: 'Gerd Müller',        country: 'West Germany', flag: '🇩🇪', value: '4 goals', year: '1970 vs Bulgaria' },
      { rank: 2, name: 'Leônidas',           country: 'Brazil',       flag: '🇧🇷', value: '4 goals', year: '1938 vs Poland' },
      { rank: 2, name: 'Ernst Willimowski',  country: 'Poland',       flag: '🇵🇱', value: '4 goals', year: '1938 vs Brazil' },
    ],
  },
  {
    category: 'Fastest Goal',
    holder: 'Hakan Şükür',
    country: 'Turkey', flag: '🇹🇷',
    value: '11 seconds',
    detail: 'Scored against South Korea in the 3rd-place match on June 29, 2002 — the fastest goal in World Cup history.',
    year: '2002',
    leaderboard: [
      { rank: 1,  name: 'Hakan Şükür',         country: 'Turkey',      flag: '🇹🇷', value: '11 sec',   year: '2002 vs South Korea' },
      { rank: 2,  name: 'Václav Mašek',         country: 'Czechia',     flag: '🇨🇿', value: '15 sec',   year: '1962 vs Mexico' },
      { rank: 3,  name: 'Ernst Lehner',         country: 'Germany',     flag: '🇩🇪', value: '25 sec',   year: '1934 vs Austria' },
      { rank: 4,  name: 'Esteban Cambiasso',    country: 'Argentina',   flag: '🇦🇷', value: '26 sec',   year: '2006 vs Serbia' },
      { rank: 5,  name: 'Bryan Ruiz',           country: 'Costa Rica',  flag: '🇨🇷', value: '26 sec',   year: '2014 vs Uruguay' },
      { rank: 6,  name: 'Clint Dempsey',        country: 'USA',         flag: '🇺🇸', value: '29 sec',   year: '2014 vs Ghana' },
      { rank: 7,  name: 'Robbie Rensenbrink',   country: 'Netherlands', flag: '🇳🇱', value: '1 min',    year: '1978 vs Scotland' },
    ],
  },
  {
    category: 'Most Appearances',
    holder: 'Lionel Messi',
    country: 'Argentina', flag: '🇦🇷',
    value: '26 matches',
    detail: 'Surpassed Lothar Matthäus (25) at the 2022 World Cup. Appeared in 5 World Cups (2006–2022).',
    year: '2006–2022',
    leaderboard: [
      { rank: 1,  name: 'Lionel Messi',          country: 'Argentina',    flag: '🇦🇷', value: '26 matches', year: '2006–2022' },
      { rank: 2,  name: 'Lothar Matthäus',       country: 'Germany',      flag: '🇩🇪', value: '25 matches', year: '1982–1998' },
      { rank: 3,  name: 'Paolo Maldini',         country: 'Italy',        flag: '🇮🇹', value: '23 matches', year: '1990–2002' },
      { rank: 4,  name: 'Władysław Żmuda',       country: 'Poland',       flag: '🇵🇱', value: '21 matches', year: '1974–1986' },
      { rank: 5,  name: 'Diego Maradona',        country: 'Argentina',    flag: '🇦🇷', value: '21 matches', year: '1982–1994' },
      { rank: 6,  name: 'Grzegorz Lato',         country: 'Poland',       flag: '🇵🇱', value: '20 matches', year: '1974–1982' },
      { rank: 7,  name: 'Uwe Seeler',            country: 'West Germany', flag: '🇩🇪', value: '21 matches', year: '1958–1970' },
      { rank: 8,  name: 'Cafu',                  country: 'Brazil',       flag: '🇧🇷', value: '20 matches', year: '1994–2006' },
      { rank: 9,  name: 'Ronaldo',               country: 'Brazil',       flag: '🇧🇷', value: '19 matches', year: '1994–2006' },
      { rank: 10, name: 'Roberto Carlos',        country: 'Brazil',       flag: '🇧🇷', value: '17 matches', year: '1998–2006' },
      { rank: 11, name: 'Cristiano Ronaldo',     country: 'Portugal',     flag: '🇵🇹', value: '17 matches', year: '2006–2022' },
      { rank: 12, name: 'Miroslav Klose',        country: 'Germany',      flag: '🇩🇪', value: '17 matches', year: '2002–2014' },
      { rank: 13, name: 'Gerd Müller',           country: 'West Germany', flag: '🇩🇪', value: '13 matches', year: '1970–1974' },
      { rank: 14, name: 'Pelé',                  country: 'Brazil',       flag: '🇧🇷', value: '14 matches', year: '1958–1970' },
    ],
  },
  {
    category: 'Youngest Player Ever',
    holder: 'Norman Whiteside',
    country: 'Northern Ireland', flag: '🇬🇧',
    value: '17 years, 41 days',
    detail: 'Became the youngest player to appear in a World Cup match when he played for Northern Ireland in 1982.',
    year: '1982',
    leaderboard: [
      { rank: 1, name: 'Norman Whiteside',   country: 'Northern Ireland', flag: '🇬🇧', value: '17y 41d',  year: '1982' },
      { rank: 2, name: 'Celestine Babayaro', country: 'Nigeria',          flag: '🇳🇬', value: '17y 77d',  year: '1994' },
      { rank: 3, name: 'Cyle Larin',         country: 'Canada',           flag: '🇨🇦', value: '—',        year: '—' },
      { rank: 3, name: 'Pelé',               country: 'Brazil',           flag: '🇧🇷', value: '17y 239d', year: '1958' },
      { rank: 4, name: 'Rubén Marcos',       country: 'Brazil',           flag: '🇧🇷', value: '17y 244d', year: '1934' },
      { rank: 5, name: 'Cesc Fàbregas',      country: 'Spain',            flag: '🇪🇸', value: '17y 268d', year: '2006' },
      { rank: 6, name: 'Theo Walcott',       country: 'England',          flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', value: '17y 275d', year: '2006' },
      { rank: 7, name: 'Gael Kakuta',        country: 'DR Congo',         flag: '🇨🇩', value: '17y 355d', year: '2010' },
    ],
  },
  {
    category: 'Youngest Goalscorer',
    holder: 'Pelé',
    country: 'Brazil', flag: '🇧🇷',
    value: '17 years, 239 days',
    detail: 'Scored against Wales in the quarterfinal on June 19, 1958, becoming the youngest WC goalscorer ever.',
    year: '1958',
    leaderboard: [
      { rank: 1, name: 'Pelé',               country: 'Brazil',       flag: '🇧🇷', value: '17y 239d', year: '1958' },
      { rank: 2, name: 'Manuel Rosas',       country: 'Mexico',       flag: '🇲🇽', value: '17y 364d', year: '1930' },
      { rank: 3, name: 'Cyle Larin',         country: 'Canada',       flag: '🇨🇦', value: '18y 29d',  year: '2022' },
      { rank: 4, name: 'Michael Owen',       country: 'England',      flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', value: '18y 190d', year: '1998' },
      { rank: 5, name: 'Cesc Fàbregas',      country: 'Spain',        flag: '🇪🇸', value: '—',        year: '—' },
      { rank: 5, name: 'Wayne Rooney',       country: 'England',      flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', value: '18y 236d', year: '2004 Euro' },
      { rank: 6, name: 'Kylian Mbappé',      country: 'France',       flag: '🇫🇷', value: '19y 183d', year: '2018' },
      { rank: 7, name: 'Gerd Müller',        country: 'West Germany', flag: '🇩🇪', value: '23y',      year: '1970' },
    ],
  },
  {
    category: 'Oldest Goalscorer',
    holder: 'Roger Milla',
    country: 'Cameroon', flag: '🇨🇲',
    value: '42 years, 39 days',
    detail: 'Came off the bench and scored against Russia at the 1994 World Cup — the oldest goalscorer in tournament history.',
    year: '1994',
    leaderboard: [
      { rank: 1, name: 'Roger Milla',        country: 'Cameroon',   flag: '🇨🇲', value: '42y 39d',  year: '1994' },
      { rank: 2, name: 'Faryd Mondragón',    country: 'Colombia',   flag: '🇨🇴', value: '43y 3d',   year: '2014 (GK goal)' },
      { rank: 3, name: 'Essam El-Hadary',    country: 'Egypt',      flag: '🇪🇬', value: '44y 21d',  year: '2018 (pen save)' },
      { rank: 4, name: 'Hossam Hassan',      country: 'Egypt',      flag: '🇪🇬', value: '40y 225d', year: '2006' },
      { rank: 5, name: 'Rivaldo',            country: 'Brazil',     flag: '🇧🇷', value: '36y 183d', year: '2002' },
      { rank: 6, name: 'Miroslav Klose',     country: 'Germany',    flag: '🇩🇪', value: '36y 64d',  year: '2014' },
      { rank: 7, name: 'Cristiano Ronaldo',  country: 'Portugal',   flag: '🇵🇹', value: '37y 293d', year: '2022' },
    ],
  },
  {
    category: 'Most World Cup Titles (Player)',
    holder: 'Pelé',
    country: 'Brazil', flag: '🇧🇷',
    value: '3 titles',
    detail: 'Pelé won in 1958, 1962, and 1970 — the only player ever to win three World Cup medals.',
    year: '1958–1970',
    leaderboard: [
      { rank: 1, name: 'Pelé',               country: 'Brazil',     flag: '🇧🇷', value: '3 titles', year: '1958, 1962, 1970' },
      { rank: 2, name: 'Cafú',               country: 'Brazil',     flag: '🇧🇷', value: '2 titles', year: '1994, 2002' },
      { rank: 2, name: 'Ronaldo',            country: 'Brazil',     flag: '🇧🇷', value: '2 titles', year: '1994, 2002' },
      { rank: 2, name: 'Roberto Carlos',     country: 'Brazil',     flag: '🇧🇷', value: '2 titles', year: '1994, 2002' },
      { rank: 2, name: 'Aldair',             country: 'Brazil',     flag: '🇧🇷', value: '2 titles', year: '1994, 2002' },
      { rank: 2, name: 'Marcos',             country: 'Brazil',     flag: '🇧🇷', value: '2 titles', year: '1994, 2002' },
      { rank: 3, name: 'Romário',            country: 'Brazil',     flag: '🇧🇷', value: '1 title',  year: '1994' },
      { rank: 3, name: 'Rivaldo',            country: 'Brazil',     flag: '🇧🇷', value: '1 title',  year: '2002' },
      { rank: 3, name: 'Ronaldinho',         country: 'Brazil',     flag: '🇧🇷', value: '1 title',  year: '2002' },
      { rank: 3, name: 'Didier Deschamps',   country: 'France',     flag: '🇫🇷', value: '1 title',  year: '1998' },
      { rank: 3, name: 'Zinedine Zidane',    country: 'France',     flag: '🇫🇷', value: '1 title',  year: '1998' },
      { rank: 3, name: 'Lionel Messi',       country: 'Argentina',  flag: '🇦🇷', value: '1 title',  year: '2022' },
      { rank: 3, name: 'Ángel Di María',     country: 'Argentina',  flag: '🇦🇷', value: '1 title',  year: '2022' },
      { rank: 3, name: 'Franz Beckenbauer',  country: 'Germany',    flag: '🇩🇪', value: '1 title',  year: '1974' },
      { rank: 3, name: 'Gerd Müller',        country: 'Germany',    flag: '🇩🇪', value: '1 title',  year: '1974' },
    ],
  },
  {
    category: 'Most Career Assists',
    holder: 'Pelé',
    country: 'Brazil', flag: '🇧🇷',
    value: '10 assists',
    detail: 'Pelé provided 10 career World Cup assists across four tournaments (1958–1970), the most in World Cup history. His vision and creativity made him as dangerous setting up teammates as he was scoring himself — epitomised by his sublime assist to Carlos Alberto in the 1970 final.',
    year: '1958–1970',
    leaderboard: [
      { rank: 1,  name: 'Pelé',                     country: 'Brazil',    flag: '🇧🇷', value: '10 assists', year: '1958–1970' },
      { rank: 2,  name: 'Lionel Messi',             country: 'Argentina', flag: '🇦🇷', value: '8 assists',  year: '2006–2022' },
      { rank: 2,  name: 'Diego Maradona',           country: 'Argentina', flag: '🇦🇷', value: '8 assists',  year: '1982–1990' },
      { rank: 4,  name: 'Pierre Littbarski',        country: 'Germany',   flag: '🇩🇪', value: '7 assists',  year: '1974–1986' },
      { rank: 4,  name: 'Grzegorz Lato',            country: 'Poland',    flag: '🇵🇱', value: '7 assists',  year: '1974–1982' },
      { rank: 6,  name: 'Thomas Müller',            country: 'Germany',   flag: '🇩🇪', value: '6 assists',  year: '2010–2018' },
      { rank: 6,  name: 'David Beckham',            country: 'England',   flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', value: '6 assists',  year: '1998–2010' },
      { rank: 6,  name: 'Bastian Schweinsteiger',   country: 'Germany',   flag: '🇩🇪', value: '6 assists',  year: '2006–2014' },
      { rank: 6,  name: 'Thomas Häßler',            country: 'Germany',   flag: '🇩🇪', value: '6 assists',  year: '1986–2002' },
      { rank: 6,  name: 'Francesco Totti',          country: 'Italy',     flag: '🇮🇹', value: '6 assists',  year: '1998–2006' },
      { rank: 11, name: 'Antoine Griezmann',        country: 'France',    flag: '🇫🇷', value: '5 assists',  year: '2014–2022' },
      { rank: 11, name: 'Ivan Perišić',             country: 'Croatia',   flag: '🇭🇷', value: '5 assists',  year: '2014–2022' },
      { rank: 11, name: 'Zico',                     country: 'Brazil',    flag: '🇧🇷', value: '5 assists',  year: '1978–1986' },
      { rank: 11, name: 'Gerd Müller',              country: 'Germany',   flag: '🇩🇪', value: '5 assists',  year: '1970–1974' },
      { rank: 11, name: 'Michael Ballack',          country: 'Germany',   flag: '🇩🇪', value: '5 assists',  year: '2002–2010' },
      { rank: 11, name: 'Robert Gadocha',           country: 'Poland',    flag: '🇵🇱', value: '5 assists',  year: '1974–1978' },
      { rank: 11, name: 'Juan Cuadrado',            country: 'Colombia',  flag: '🇨🇴', value: '5 assists',  year: '2014–2018' },
      { rank: 11, name: 'Juan Sebastián Verón',     country: 'Argentina', flag: '🇦🇷', value: '5 assists',  year: '1998–2006' },
    ],
  },
  {
    category: 'Most Tournaments Played',
    holder: 'Five players',
    country: 'Various', flag: '🌍',
    value: '5 tournaments',
    detail: 'Carbajal (MEX), Matthäus (GER), Márquez (MEX), Buffon (ITA), and Messi (ARG) each played in 5 World Cups.',
    year: 'Various',
    leaderboard: [
      { rank: 1, name: 'Antonio Carbajal',   country: 'Mexico',      flag: '🇲🇽', value: '5 WCs', year: '1950–1966' },
      { rank: 1, name: 'Lothar Matthäus',    country: 'Germany',     flag: '🇩🇪', value: '5 WCs', year: '1982–1998' },
      { rank: 1, name: 'Rafael Márquez',     country: 'Mexico',      flag: '🇲🇽', value: '5 WCs', year: '2002–2018' },
      { rank: 1, name: 'Gianluigi Buffon',   country: 'Italy',       flag: '🇮🇹', value: '5 WCs', year: '1998–2014' },
      { rank: 1, name: 'Lionel Messi',       country: 'Argentina',   flag: '🇦🇷', value: '5 WCs', year: '2006–2022' },
      { rank: 2, name: 'Pelé',              country: 'Brazil',       flag: '🇧🇷', value: '4 WCs', year: '1958–1970' },
      { rank: 2, name: 'Uwe Seeler',         country: 'West Germany', flag: '🇩🇪', value: '4 WCs', year: '1958–1970' },
      { rank: 2, name: 'Diego Maradona',     country: 'Argentina',   flag: '🇦🇷', value: '4 WCs', year: '1982–1994' },
      { rank: 2, name: 'Cafu',              country: 'Brazil',       flag: '🇧🇷', value: '4 WCs', year: '1994–2006' },
      { rank: 2, name: 'Cristiano Ronaldo',  country: 'Portugal',    flag: '🇵🇹', value: '5 WCs', year: '2006–2022' },
    ],
  },
];

// ── Team Records ──────────────────────────────────────────────────────────────
export const TEAM_RECORDS: TeamRecord[] = [
  {
    category: 'Most World Cup Titles',
    holder: 'Brazil', flag: '🇧🇷',
    value: '5 titles',
    detail: '1958 (Sweden), 1962 (Chile), 1970 (Mexico), 1994 (USA), 2002 (South Korea/Japan)',
    year: '1958–2002',
  },
  {
    category: 'Most Final Appearances',
    holder: 'Germany / West Germany', flag: '🇩🇪',
    value: '8 finals',
    detail: 'Won in 1954, 1974, 1990, 2014. Lost in 1966, 1982, 1986, 2002. The most consistent finals presence in WC history.',
    year: '1954–2014',
  },
  {
    category: 'Most Consecutive Titles',
    holder: 'Italy & Brazil', flag: '🇮🇹',
    value: '2 in a row',
    detail: 'Italy won 1934 and 1938. Brazil won 1958 and 1962. No nation has ever won three consecutive World Cups.',
    year: '1934–38 / 1958–62',
  },
  {
    category: 'Biggest Victory',
    holder: 'Hungary vs El Salvador', flag: '🇭🇺',
    value: '10–1',
    detail: 'Hungary beat El Salvador 10–1 on June 15, 1982. László Kiss scored a hat-trick as a substitute.',
    year: '1982',
  },
  {
    category: 'Highest-Scoring Match',
    holder: 'Austria vs Switzerland', flag: '🇦🇹',
    value: '12 goals (7–5)',
    detail: 'Austria defeated Switzerland 7–5 on June 26, 1954 in Lausanne — still the highest-scoring WC match ever.',
    year: '1954',
  },
  {
    category: 'Most Goals in a Final',
    holder: 'Brazil vs Sweden', flag: '🇧🇷',
    value: '7 goals (5–2)',
    detail: 'Brazil beat Sweden 5–2 in the 1958 Final in Stockholm. Pelé scored twice, Vavá twice, Zagallo once.',
    year: '1958',
  },
  {
    category: 'Longest Unbeaten Run',
    holder: 'Brazil', flag: '🇧🇷',
    value: '13 matches',
    detail: 'Brazil went 13 consecutive WC matches unbeaten (1958–1966), a record that stood for decades.',
    year: '1958–1966',
  },
  {
    category: 'Most Goals Scored in a Tournament',
    holder: 'Hungary', flag: '🇭🇺',
    value: '27 goals',
    detail: 'Hungary scored 27 goals in just 5 matches at the 1954 World Cup — the most by any team in a single tournament.',
    year: '1954',
  },
  {
    category: 'Most Total Goals (Tournament)',
    holder: 'Qatar 2022', flag: '🏆',
    value: '172 goals',
    detail: '172 goals across 64 matches at the 2022 World Cup — the most in tournament history at 2.69 per game.',
    year: '2022',
  },
  {
    category: 'Worst Defeat in a Semifinal',
    holder: 'Brazil vs Germany', flag: '🇧🇷',
    value: '1–7',
    detail: 'July 8, 2014: Germany defeated host Brazil 7–1 in Belo Horizonte. Known as the "Mineirazo."',
    year: '2014',
  },
];

// ── Tournament Records ────────────────────────────────────────────────────────
export const TOURNAMENT_RECORDS: TournamentRecord[] = [
  {
    category: 'Most Teams',
    value: '48 teams',
    detail: 'World Cup 2026 is the first tournament with 48 participating nations, up from 32.',
    year: '2026',
  },
  {
    category: 'Most Matches Played',
    value: '104 matches',
    detail: 'World Cup 2026 features 104 matches across 3 host countries — the most in tournament history.',
    year: '2026',
  },
  {
    category: 'First World Cup',
    value: '13 teams, 18 matches',
    detail: 'The inaugural World Cup was held in Uruguay in 1930. Uruguay won, beating Argentina 4–2 in the final.',
    year: '1930',
  },
  {
    category: 'Most Host Countries',
    value: '3 nations (2026)',
    detail: 'USA, Canada, and Mexico co-host 2026 — the first 3-nation World Cup. Japan/South Korea in 2002 were the only prior co-hosts.',
    year: '2026',
  },
  {
    category: 'Highest Average Attendance',
    value: '68,991 per match',
    detail: 'USA 1994 holds the record for highest average attendance, drawing over 3.5 million total fans.',
    year: '1994',
  },
  {
    category: 'First Penalty Shootout',
    value: 'West Germany vs France',
    detail: 'The first WC penalty shootout was in the 1982 semifinal. West Germany prevailed 5–4, eliminating France.',
    year: '1982',
  },
  {
    category: 'Most Red Cards',
    value: '28 red cards',
    detail: 'The 2006 World Cup in Germany saw 28 red cards — the most ever issued in a single WC tournament.',
    year: '2006',
  },
];

// ── All-Time Standings (every nation that has appeared at a World Cup through 2022) ──
export const ALL_TIME_STANDINGS: AllTimeStanding[] = [
  // ── Champions ──────────────────────────────────────────────────────────────
  { country: 'Brazil',            flag: '🇧🇷', note: '',                     titles:5, finals:7,  semis:11, apps:22, gp:114, w:76, d:19, l:19, gf:237, ga:105,
    titleYears:[1958,1962,1970,1994,2002],
    finalYears:[1950,1958,1962,1970,1994,1998,2002],
    semiYears: [1938,1950,1958,1962,1970,1974,1978,1994,1998,2002,2014] },
  { country: 'Germany',           flag: '🇩🇪', note: 'incl. West Germany',   titles:4, finals:8,  semis:13, apps:20, gp:109, w:67, d:20, l:22, gf:226, ga:125,
    titleYears:[1954,1974,1990,2014],
    finalYears:[1954,1966,1974,1982,1986,1990,2002,2014],
    semiYears: [1934,1954,1958,1966,1970,1974,1982,1986,1990,2002,2006,2010,2014] },
  { country: 'Italy',             flag: '🇮🇹', note: '',                     titles:4, finals:6,  semis:8,  apps:18, gp:83,  w:45, d:21, l:17, gf:128, ga:77,
    titleYears:[1934,1938,1982,2006],
    finalYears:[1934,1938,1970,1982,1994,2006],
    semiYears: [1934,1938,1970,1978,1982,1990,1994,2006] },
  { country: 'Argentina',         flag: '🇦🇷', note: '',                     titles:3, finals:6,  semis:7,  apps:18, gp:87,  w:47, d:15, l:25, gf:145, ga:93,
    titleYears:[1978,1986,2022],
    finalYears:[1930,1978,1986,1990,2014,2022],
    semiYears: [1930,1978,1982,1986,1990,2014,2022] },
  { country: 'France',            flag: '🇫🇷', note: '',                     titles:2, finals:4,  semis:7,  apps:16, gp:66,  w:38, d:13, l:15, gf:123, ga:73,
    titleYears:[1998,2018],
    finalYears:[1998,2006,2018,2022],
    semiYears: [1958,1982,1986,1998,2006,2018,2022] },
  { country: 'Uruguay',           flag: '🇺🇾', note: '',                     titles:2, finals:2,  semis:5,  apps:14, gp:56,  w:26, d:10, l:20, gf:87,  ga:74,
    titleYears:[1930,1950],
    finalYears:[1930,1950],
    semiYears: [1930,1950,1954,1970,2010] },
  { country: 'England',           flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', note: '',                     titles:1, finals:1,  semis:3,  apps:17, gp:69,  w:29, d:21, l:19, gf:93,  ga:74,
    titleYears:[1966],
    finalYears:[1966],
    semiYears: [1966,1990,2018] },
  { country: 'Spain',             flag: '🇪🇸', note: '',                     titles:1, finals:1,  semis:3,  apps:16, gp:67,  w:31, d:16, l:20, gf:99,  ga:80,
    titleYears:[2010],
    finalYears:[2010],
    semiYears: [1950,1982,2010] },
  // ── Finalists ──────────────────────────────────────────────────────────────
  { country: 'Netherlands',       flag: '🇳🇱', note: '',                     titles:0, finals:3,  semis:5,  apps:11, gp:52,  w:30, d:10, l:12, gf:93,  ga:60,
    finalYears:[1974,1978,2010],
    semiYears: [1974,1978,1998,2010,2014] },
  { country: 'Hungary',           flag: '🇭🇺', note: '',                     titles:0, finals:2,  semis:2,  apps:9,  gp:32,  w:15, d:3,  l:14, gf:87,  ga:57,
    finalYears:[1938,1954],
    semiYears: [1938,1954] },
  { country: 'Czechia',           flag: '🇨🇿', note: 'incl. Czechoslovakia', titles:0, finals:2,  semis:2,  apps:9,  gp:34,  w:11, d:5,  l:18, gf:52,  ga:50,
    finalYears:[1934,1962],
    semiYears: [1934,1962] },
  { country: 'Sweden',            flag: '🇸🇪', note: '',                     titles:0, finals:1,  semis:4,  apps:12, gp:51,  w:18, d:8,  l:25, gf:82,  ga:86,
    finalYears:[1958],
    semiYears: [1938,1950,1958,1994] },
  { country: 'Croatia',           flag: '🇭🇷', note: '',                     titles:0, finals:1,  semis:3,  apps:6,  gp:32,  w:16, d:5,  l:11, gf:49,  ga:33,
    finalYears:[2018],
    semiYears: [1998,2018,2022] },
  // ── Semifinalists ──────────────────────────────────────────────────────────
  { country: 'Poland',            flag: '🇵🇱', note: '',                     titles:0, finals:0,  semis:3,  apps:9,  gp:39,  w:16, d:5,  l:18, gf:44,  ga:45,
    semiYears:[1974,1978,1982] },
  { country: 'Portugal',          flag: '🇵🇹', note: '',                     titles:0, finals:0,  semis:2,  apps:8,  gp:35,  w:17, d:4,  l:14, gf:59,  ga:36,
    semiYears:[1966,2006] },
  { country: 'Austria',           flag: '🇦🇹', note: '',                     titles:0, finals:0,  semis:2,  apps:7,  gp:26,  w:12, d:4,  l:10, gf:43,  ga:47,
    semiYears:[1934,1954] },
  { country: 'Yugoslavia / Serbia',flag: '🇷🇸',note: 'combined history',     titles:0, finals:0,  semis:2,  apps:13, gp:55,  w:20, d:10, l:25, gf:73,  ga:72,
    semiYears:[1930,1962] },
  { country: 'Russia',            flag: '🇷🇺', note: 'incl. Soviet Union',   titles:0, finals:0,  semis:1,  apps:11, gp:43,  w:16, d:6,  l:21, gf:65,  ga:52,
    semiYears:[1966] },
  { country: 'Turkey',            flag: '🇹🇷', note: '',                     titles:0, finals:0,  semis:1,  apps:3,  gp:14,  w:7,  d:1,  l:6,  gf:27,  ga:23,
    semiYears:[2002] },
  { country: 'Chile',             flag: '🇨🇱', note: '',                     titles:0, finals:0,  semis:1,  apps:9,  gp:29,  w:9,  d:4,  l:16, gf:36,  ga:55,
    semiYears:[1962] },
  { country: 'USA',               flag: '🇺🇸', note: '',                     titles:0, finals:0,  semis:1,  apps:11, gp:36,  w:11, d:5,  l:20, gf:40,  ga:64,
    semiYears:[1930] },
  { country: 'Belgium',           flag: '🇧🇪', note: '',                     titles:0, finals:0,  semis:2,  apps:14, gp:51,  w:17, d:11, l:23, gf:68,  ga:88,
    semiYears:[1986,2018] },
  { country: 'Bulgaria',          flag: '🇧🇬', note: '',                     titles:0, finals:0,  semis:1,  apps:7,  gp:26,  w:3,  d:8,  l:15, gf:22,  ga:53,
    semiYears:[1994] },
  { country: 'Morocco',           flag: '🇲🇦', note: '',                     titles:0, finals:0,  semis:1,  apps:6,  gp:23,  w:8,  d:5,  l:10, gf:21,  ga:21,
    semiYears:[2022] },
  { country: 'South Korea',       flag: '🇰🇷', note: '',                     titles:0, finals:0,  semis:1,  apps:11, gp:37,  w:9,  d:6,  l:22, gf:39,  ga:72,
    semiYears:[2002] },
  // ── QF / Round of 16 regulars ──────────────────────────────────────────────
  { country: 'Romania',           flag: '🇷🇴', note: '',                        titles:0, finals:0,  semis:0,  apps:8,  gp:22,  w:8,  d:5,  l:9,  gf:30,  ga:32  },
  { country: 'Mexico',            flag: '🇲🇽', note: '',                        titles:0, finals:0,  semis:0,  apps:17, gp:57,  w:16, d:14, l:27, gf:64,  ga:99  },
  { country: 'Switzerland',       flag: '🇨🇭', note: '',                        titles:0, finals:0,  semis:0,  apps:11, gp:36,  w:11, d:7,  l:18, gf:57,  ga:72  },
  { country: 'Denmark',           flag: '🇩🇰', note: '',                        titles:0, finals:0,  semis:0,  apps:6,  gp:24,  w:9,  d:4,  l:11, gf:41,  ga:44  },
  { country: 'Colombia',          flag: '🇨🇴', note: '',                        titles:0, finals:0,  semis:0,  apps:6,  gp:21,  w:7,  d:3,  l:11, gf:28,  ga:38  },
  { country: 'Japan',             flag: '🇯🇵', note: '',                        titles:0, finals:0,  semis:0,  apps:7,  gp:25,  w:7,  d:4,  l:14, gf:27,  ga:43  },
  { country: 'Cameroon',          flag: '🇨🇲', note: '',                        titles:0, finals:0,  semis:0,  apps:8,  gp:23,  w:4,  d:4,  l:15, gf:17,  ga:44  },
  { country: 'Nigeria',           flag: '🇳🇬', note: '',                        titles:0, finals:0,  semis:0,  apps:6,  gp:18,  w:5,  d:4,  l:9,  gf:21,  ga:29  },
  { country: 'Senegal',           flag: '🇸🇳', note: '',                        titles:0, finals:0,  semis:0,  apps:3,  gp:13,  w:5,  d:2,  l:6,  gf:15,  ga:16  },
  { country: 'Costa Rica',        flag: '🇨🇷', note: '',                        titles:0, finals:0,  semis:0,  apps:6,  gp:20,  w:5,  d:5,  l:10, gf:18,  ga:31  },
  { country: 'Paraguay',          flag: '🇵🇾', note: '',                        titles:0, finals:0,  semis:0,  apps:9,  gp:25,  w:5,  d:9,  l:11, gf:27,  ga:44  },
  { country: 'Scotland',          flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', note: '',                        titles:0, finals:0,  semis:0,  apps:8,  gp:23,  w:4,  d:7,  l:12, gf:25,  ga:41  },
  { country: 'Ghana',             flag: '🇬🇭', note: '',                        titles:0, finals:0,  semis:0,  apps:3,  gp:13,  w:4,  d:3,  l:6,  gf:13,  ga:22  },
  { country: 'Peru',              flag: '🇵🇪', note: '',                        titles:0, finals:0,  semis:0,  apps:5,  gp:15,  w:4,  d:3,  l:8,  gf:19,  ga:31  },
  { country: 'Australia',         flag: '🇦🇺', note: '',                        titles:0, finals:0,  semis:0,  apps:6,  gp:17,  w:3,  d:3,  l:11, gf:17,  ga:32  },
  { country: 'Algeria',           flag: '🇩🇿', note: '',                        titles:0, finals:0,  semis:0,  apps:4,  gp:14,  w:3,  d:4,  l:7,  gf:12,  ga:21  },
  { country: 'Rep. of Ireland',   flag: '🇮🇪', note: '',                        titles:0, finals:0,  semis:0,  apps:3,  gp:13,  w:2,  d:7,  l:4,  gf:10,  ga:12  },
  { country: 'Iran',              flag: '🇮🇷', note: '',                        titles:0, finals:0,  semis:0,  apps:6,  gp:18,  w:2,  d:4,  l:12, gf:13,  ga:31  },
  { country: 'Norway',            flag: '🇳🇴', note: '',                        titles:0, finals:0,  semis:0,  apps:3,  gp:9,   w:2,  d:1,  l:6,  gf:9,   ga:17  },
  { country: 'Tunisia',           flag: '🇹🇳', note: '',                        titles:0, finals:0,  semis:0,  apps:6,  gp:18,  w:2,  d:4,  l:12, gf:11,  ga:30  },
  { country: 'Ecuador',           flag: '🇪🇨', note: '',                        titles:0, finals:0,  semis:0,  apps:3,  gp:10,  w:3,  d:1,  l:6,  gf:9,   ga:16  },
  { country: 'Northern Ireland',  flag: '🇬🇧', note: '',                        titles:0, finals:0,  semis:0,  apps:3,  gp:11,  w:3,  d:2,  l:6,  gf:13,  ga:23  },
  { country: 'Ukraine',           flag: '🇺🇦', note: '',                        titles:0, finals:0,  semis:0,  apps:1,  gp:5,   w:2,  d:2,  l:1,  gf:6,   ga:4   },
  { country: 'Slovenia',          flag: '🇸🇮', note: '',                        titles:0, finals:0,  semis:0,  apps:2,  gp:6,   w:1,  d:2,  l:3,  gf:5,   ga:8   },
  { country: 'South Africa',      flag: '🇿🇦', note: '',                        titles:0, finals:0,  semis:0,  apps:3,  gp:9,   w:1,  d:3,  l:5,  gf:9,   ga:16  },
  { country: 'Saudi Arabia',      flag: '🇸🇦', note: '',                        titles:0, finals:0,  semis:0,  apps:6,  gp:19,  w:3,  d:2,  l:14, gf:16,  ga:46  },
  { country: 'Ivory Coast',       flag: '🇨🇮', note: '',                        titles:0, finals:0,  semis:0,  apps:3,  gp:9,   w:1,  d:2,  l:6,  gf:7,   ga:13  },
  { country: 'Slovakia',          flag: '🇸🇰', note: '',                        titles:0, finals:0,  semis:0,  apps:1,  gp:4,   w:1,  d:1,  l:2,  gf:5,   ga:6   },
  { country: 'North Korea',       flag: '🇰🇵', note: '',                        titles:0, finals:0,  semis:0,  apps:2,  gp:7,   w:1,  d:1,  l:5,  gf:5,   ga:21  },
  { country: 'Greece',            flag: '🇬🇷', note: '',                        titles:0, finals:0,  semis:0,  apps:2,  gp:7,   w:1,  d:1,  l:5,  gf:4,   ga:14  },
  { country: 'Egypt',             flag: '🇪🇬', note: '',                        titles:0, finals:0,  semis:0,  apps:3,  gp:9,   w:1,  d:1,  l:7,  gf:6,   ga:22  },
  { country: 'Wales',             flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', note: '',                        titles:0, finals:0,  semis:0,  apps:2,  gp:7,   w:1,  d:2,  l:4,  gf:5,   ga:10  },
  { country: 'Canada',            flag: '🇨🇦', note: '',                        titles:0, finals:0,  semis:0,  apps:2,  gp:6,   w:1,  d:0,  l:5,  gf:3,   ga:10  },
  { country: 'Honduras',          flag: '🇭🇳', note: '',                        titles:0, finals:0,  semis:0,  apps:3,  gp:9,   w:0,  d:2,  l:7,  gf:5,   ga:19  },
  { country: 'Jamaica',           flag: '🇯🇲', note: '',                        titles:0, finals:0,  semis:0,  apps:1,  gp:3,   w:1,  d:0,  l:2,  gf:3,   ga:9   },
  { country: 'Bolivia',           flag: '🇧🇴', note: '',                        titles:0, finals:0,  semis:0,  apps:3,  gp:9,   w:0,  d:1,  l:8,  gf:3,   ga:27  },
  { country: 'Bosnia & Herz.',    flag: '🇧🇦', note: '',                        titles:0, finals:0,  semis:0,  apps:1,  gp:3,   w:1,  d:0,  l:2,  gf:4,   ga:4   },
  { country: 'Haiti',             flag: '🇭🇹', note: '',                        titles:0, finals:0,  semis:0,  apps:1,  gp:3,   w:0,  d:1,  l:2,  gf:2,   ga:14  },
  { country: 'El Salvador',       flag: '🇸🇻', note: '',                        titles:0, finals:0,  semis:0,  apps:2,  gp:6,   w:0,  d:1,  l:5,  gf:4,   ga:22  },
  { country: 'New Zealand',       flag: '🇳🇿', note: '',                        titles:0, finals:0,  semis:0,  apps:2,  gp:6,   w:0,  d:4,  l:2,  gf:4,   ga:11  },
  { country: 'Israel',            flag: '🇮🇱', note: '',                        titles:0, finals:0,  semis:0,  apps:1,  gp:3,   w:0,  d:2,  l:1,  gf:1,   ga:3   },
  { country: 'Iraq',              flag: '🇮🇶', note: '',                        titles:0, finals:0,  semis:0,  apps:1,  gp:3,   w:0,  d:1,  l:2,  gf:1,   ga:4   },
  { country: 'Kuwait',            flag: '🇰🇼', note: '',                        titles:0, finals:0,  semis:0,  apps:1,  gp:3,   w:0,  d:0,  l:3,  gf:2,   ga:6   },
  { country: 'UAE',               flag: '🇦🇪', note: '',                        titles:0, finals:0,  semis:0,  apps:1,  gp:3,   w:0,  d:0,  l:3,  gf:2,   ga:11  },
  { country: 'Qatar',             flag: '🇶🇦', note: 'host 2022',               titles:0, finals:0,  semis:0,  apps:1,  gp:3,   w:0,  d:0,  l:3,  gf:1,   ga:7   },
  { country: 'China',             flag: '🇨🇳', note: '',                        titles:0, finals:0,  semis:0,  apps:1,  gp:3,   w:0,  d:0,  l:3,  gf:0,   ga:9   },
  { country: 'Iceland',           flag: '🇮🇸', note: '',                        titles:0, finals:0,  semis:0,  apps:1,  gp:3,   w:0,  d:1,  l:2,  gf:2,   ga:11  },
  { country: 'Panama',            flag: '🇵🇦', note: '',                        titles:0, finals:0,  semis:0,  apps:1,  gp:3,   w:0,  d:0,  l:3,  gf:2,   ga:11  },
  { country: 'Trinidad & Tobago', flag: '🇹🇹', note: '',                        titles:0, finals:0,  semis:0,  apps:1,  gp:3,   w:0,  d:1,  l:2,  gf:0,   ga:4   },
  { country: 'DR Congo (Zaire)',  flag: '🇨🇩', note: '1974 as Zaire',           titles:0, finals:0,  semis:0,  apps:1,  gp:3,   w:0,  d:0,  l:3,  gf:0,   ga:14  },
  { country: 'Angola',            flag: '🇦🇴', note: '',                        titles:0, finals:0,  semis:0,  apps:1,  gp:3,   w:0,  d:1,  l:2,  gf:1,   ga:2   },
  { country: 'Togo',              flag: '🇹🇬', note: '',                        titles:0, finals:0,  semis:0,  apps:1,  gp:3,   w:0,  d:0,  l:3,  gf:1,   ga:6   },
  { country: 'East Germany',      flag: '🇩🇪', note: '1974 only',               titles:0, finals:0,  semis:0,  apps:1,  gp:6,   w:2,  d:2,  l:2,  gf:5,   ga:5   },
  { country: 'Cuba',              flag: '🇨🇺', note: '',                        titles:0, finals:0,  semis:0,  apps:1,  gp:3,   w:1,  d:0,  l:2,  gf:5,   ga:12  },
  { country: 'Indonesia',         flag: '🇮🇩', note: 'Dutch E. Indies 1938',    titles:0, finals:0,  semis:0,  apps:1,  gp:1,   w:0,  d:0,  l:1,  gf:0,   ga:6   },
];

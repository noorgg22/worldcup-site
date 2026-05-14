// ── Country Profile Data ──────────────────────────────────────────────────────
// Supplements records.ts with year-by-year WC history, legends, and facts.
// history: WC year → round reached
//   0 = Did Not Qualify  1 = Group Stage  2 = Round of 16
//   3 = Quarter-Final    4 = Semi-Final   5 = Runner-Up    6 = Champions

export const WC_YEARS = [
  1930,1934,1938,1950,1954,1958,
  1962,1966,1970,1974,1978,1982,
  1986,1990,1994,1998,2002,2006,
  2010,2014,2018,2022,
] as const;

export type WCYear = (typeof WC_YEARS)[number];

export const ROUND_LABEL: Record<number, string> = {
  0: 'Did Not Qualify',
  1: 'Group Stage',
  2: 'Round of 16',
  3: 'Quarter-Final',
  4: 'Semi-Final',
  5: 'Runner-Up',
  6: 'Champions',
};

export const ROUND_SHORT: Record<number, string> = {
  0: '—', 1: 'GS', 2: 'R16', 3: 'QF', 4: 'SF', 5: 'F', 6: 'W',
};

export const ROUND_COLOR: Record<number, string> = {
  0: 'rgba(255,255,255,0.04)',
  1: '#2a3548',
  2: '#1565c0',
  3: '#00838f',
  4: '#e65100',
  5: '#9e9e9e',
  6: '#f5c842',
};

export interface Legend {
  name: string;
  wikiName?: string; // override for Wikipedia page title (disambiguation)
  years: string;
  pos: string;
  note: string;
}

export interface CountryProfile {
  name: string;
  flag: string;
  color: string;   // primary kit color for theming
  color2?: string; // secondary
  confederation: 'UEFA' | 'CONMEBOL' | 'CONCACAF' | 'AFC' | 'CAF' | 'OFC';
  history: Partial<Record<WCYear, number>>;
  legends: Legend[];
  facts: string[];
}

// ── Profiles ──────────────────────────────────────────────────────────────────
export const COUNTRY_PROFILES: Record<string, CountryProfile> = {

  Brazil: {
    name: 'Brazil', flag: '🇧🇷', color: '#009c3b', color2: '#FFDF00',
    confederation: 'CONMEBOL',
    history: {
      1930:1, 1934:2, 1938:4, 1950:5, 1954:3, 1958:6, 1962:6,
      1966:1, 1970:6, 1974:4, 1978:4, 1982:3, 1986:3, 1990:2,
      1994:6, 1998:5, 2002:6, 2006:3, 2010:3, 2014:4, 2018:3, 2022:3,
    },
    legends: [
      { name: 'Pelé', wikiName: 'Pelé', years: '1958–1970', pos: 'Forward', note: '12 WC goals, 3× World Champion. Only player to win 3 titles.' },
      { name: 'Ronaldo', wikiName: 'Ronaldo (footballer)', years: '1994–2006', pos: 'Forward', note: '15 WC goals across 4 tournaments, then an all-time record.' },
      { name: 'Ronaldinho', wikiName: 'Ronaldinho', years: '2002–2006', pos: 'Midfielder', note: '2002 champion & 2004 Ballon d\'Or. Famous free-kick vs England.' },
      { name: 'Roberto Carlos', wikiName: 'Roberto Carlos', years: '1994–2006', pos: 'Left Back', note: '3× WC champion; famous for an impossible free-kick vs France. Greatest attacking full-back ever.' },
      { name: 'Cafu', wikiName: 'Cafu', years: '1994–2006', pos: 'Right Back', note: '2× WC champion; played in 3 finals — the only player ever to do so.' },
      { name: 'Garrincha', wikiName: 'Garrincha', years: '1958–1966', pos: 'Right Wing', note: 'Never played on a losing Brazil team until his last WC match.' },
      { name: 'Zico', wikiName: 'Zico', years: '1978–1986', pos: 'Midfielder', note: 'Called "White Pelé" — arguably the best player never to win a WC.' },
    ],
    facts: [
      'Brazil is the only nation to appear in every FIFA World Cup — all 22 editions from 1930 to 2022.',
      'In 2014, Brazil suffered the "Mineirazo" — a 7-1 home semi-final defeat to Germany, the worst result in their history.',
      'The 1970 Brazil squad is widely regarded as the greatest national football team ever assembled.',
      'Brazil\'s all-time WC record of 237 goals scored is the highest of any nation.',
    ],
  },

  Germany: {
    name: 'Germany', flag: '🇩🇪', color: '#ffffff', color2: '#000000',
    confederation: 'UEFA',
    history: {
      1934:4, 1938:2, 1954:6, 1958:4, 1962:3, 1966:5,
      1970:4, 1974:6, 1978:3, 1982:5, 1986:5, 1990:6,
      1994:3, 1998:3, 2002:5, 2006:4, 2010:4, 2014:6,
      2018:1, 2022:1,
    },
    legends: [
      { name: 'Miroslav Klose', wikiName: 'Miroslav Klose', years: '2002–2014', pos: 'Forward', note: 'All-time WC top scorer with 16 goals across 4 tournaments.' },
      { name: 'Franz Beckenbauer', wikiName: 'Franz Beckenbauer', years: '1966–1974', pos: 'Sweeper', note: 'Won WC as captain (1974) and later as manager (1990).' },
      { name: 'Gerd Müller', wikiName: 'Gerd Müller', years: '1970–1974', pos: 'Forward', note: '14 WC goals; scored the 1974 winner in the final.' },
      { name: 'Lothar Matthäus', wikiName: 'Lothar Matthäus', years: '1982–1998', pos: 'Midfielder', note: 'WC record 25 games played; 1990 champion & Ballon d\'Or.' },
      { name: 'Sepp Maier', wikiName: 'Sepp Maier', years: '1966–1978', pos: 'Goalkeeper', note: 'Legendary keeper across 3 WC runs including 1974 title.' },
    ],
    facts: [
      'Germany (incl. West Germany) has appeared in 8 World Cup finals — more than any other European nation.',
      'Their 1970 semi-final vs Italy is known as the "Game of the Century" after a 4-3 extra-time thriller.',
      'Winning in 2014, Germany became the first European team to win a WC held in the Americas.',
      'The 2018 and 2022 group-stage exits were their worst WC results since 1938.',
    ],
  },

  Italy: {
    name: 'Italy', flag: '🇮🇹', color: '#003399', color2: '#ffffff',
    confederation: 'UEFA',
    history: {
      1934:6, 1938:6, 1950:1, 1954:1, 1962:1, 1966:1,
      1970:5, 1974:1, 1978:4, 1982:6, 1986:2, 1990:4,
      1994:5, 1998:3, 2002:2, 2006:6, 2010:1, 2014:1,
    },
    legends: [
      { name: 'Paolo Rossi', years: '1978–1986', pos: 'Forward', note: '6 goals in 1982 to save Italy, tournament top scorer & Ballon d\'Or.' },
      { name: 'Gianluigi Buffon', years: '1998–2006', pos: 'Goalkeeper', note: '2006 World Champion; conceded just 2 open-play goals in the tournament.' },
      { name: 'Roberto Baggio', years: '1990–1998', pos: 'Forward', note: 'Led Italy to the 1994 final but missed the decisive penalty.' },
      { name: 'Sandro Mazzola', years: '1962–1970', pos: 'Midfielder', note: 'Key figure in Italy\'s 1970 final run against Brazil.' },
      { name: 'Dino Zoff', years: '1974–1982', pos: 'Goalkeeper', note: '1982 champion at age 40 — oldest WC winner ever.' },
    ],
    facts: [
      'Italy\'s Dino Zoff became the oldest World Cup winner ever at 40 years old in 1982.',
      'Italy famously failed to qualify for the 2018 and 2022 World Cups — their worst run since the 1950s.',
      'The Azzurri conceded only 2 goals in the entire 2006 tournament, keeping 5 clean sheets.',
      'Italy\'s 1938 victory was achieved under Benito Mussolini, who had political motivations behind the squad selection.',
    ],
  },

  Argentina: {
    name: 'Argentina', flag: '🇦🇷', color: '#74acdf', color2: '#ffffff',
    confederation: 'CONMEBOL',
    history: {
      1930:5, 1934:2, 1958:1, 1962:1, 1966:3,
      1974:3, 1978:6, 1982:3, 1986:6, 1990:5,
      1994:2, 1998:3, 2002:1, 2006:3, 2010:3,
      2014:5, 2018:2, 2022:6,
    },
    legends: [
      { name: 'Lionel Messi', wikiName: 'Lionel Messi', years: '2006–2022', pos: 'Forward', note: 'Greatest of all time. 13 WC goals, 5 tournaments, 2022 Champion.' },
      { name: 'Diego Maradona', wikiName: 'Diego Maradona', years: '1982–1994', pos: 'Midfielder', note: '"Hand of God" & "Goal of the Century" in 1 game. 1986 legend.' },
      { name: 'Mario Kempes', wikiName: 'Mario Kempes', years: '1974–1982', pos: 'Forward', note: '1978 tournament top scorer & final hero; 6 goals in the tournament.' },
      { name: 'Julián Álvarez', wikiName: 'Julián Álvarez', years: '2022', pos: 'Forward', note: '4 goals in 2022 WC including 2 in the semi-final vs Croatia.' },
      { name: 'Gabriel Batistuta', wikiName: 'Gabriel Batistuta', years: '1994–2002', pos: 'Forward', note: '10 WC goals; scored in 3 consecutive World Cups.' },
    ],
    facts: [
      'Lionel Messi completed his WC journey in Qatar 2022, winning the one trophy that eluded him for 16 years.',
      'Maradona\'s performance in the 1986 WC — leading a country of 30M to glory — is considered football\'s greatest individual feat.',
      'Argentina were eliminated in the group stage in 2002 despite having Batistuta, Veron, Ortega, and Crespo.',
      'The 1978 final was played in Buenos Aires; Argentina beat Netherlands 3-1 in front of a sea of ticker tape.',
    ],
  },

  France: {
    name: 'France', flag: '🇫🇷', color: '#003189', color2: '#ffffff',
    confederation: 'UEFA',
    history: {
      1930:1, 1934:2, 1938:3, 1954:1, 1958:4,
      1966:1, 1978:1, 1982:4, 1986:4, 1998:6,
      2002:1, 2006:5, 2010:1, 2014:3, 2018:6, 2022:5,
    },
    legends: [
      { name: 'Zinedine Zidane', wikiName: 'Zinedine Zidane', years: '1998–2006', pos: 'Midfielder', note: '1998 champion (2 finals goals), 2006 final headbutt end.' },
      { name: 'Just Fontaine', wikiName: 'Just Fontaine', years: '1958', pos: 'Forward', note: 'Scored 13 goals in one tournament (1958) — the all-time single-WC record.' },
      { name: 'Kylian Mbappé', wikiName: 'Kylian Mbappé', years: '2018–2022', pos: 'Forward', note: '12 WC goals by age 23; hat-trick in 2022 final.' },
      { name: 'Michel Platini', wikiName: 'Michel Platini', years: '1978–1986', pos: 'Midfielder', note: 'Led France to 4th in 1982 and 3rd in 1986. Ballon d\'Or 3 times.' },
      { name: 'Thierry Henry', wikiName: 'Thierry Henry', years: '1998–2006', pos: 'Forward', note: 'Key member of 1998 winners; carried France to 2006 final.' },
    ],
    facts: [
      'Just Fontaine\'s 13 goals in the 1958 tournament is a record that has stood for over 65 years.',
      'France\'s 2022 final against Argentina is regarded as the greatest World Cup final ever played.',
      'As defending champions in 2002, France went out in the group stage without scoring a single goal.',
      'France have reached at least the semi-finals in 4 of the last 5 World Cups (1998–2022).',
    ],
  },

  England: {
    name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', color: '#ffffff', color2: '#cf081f',
    confederation: 'UEFA',
    history: {
      1950:1, 1954:3, 1958:1, 1962:3, 1966:6, 1970:3,
      1982:3, 1986:3, 1990:4, 1998:2, 2002:3, 2006:3,
      2010:2, 2014:1, 2018:4, 2022:3,
    },
    legends: [
      { name: 'Bobby Moore', years: '1962–1970', pos: 'Defender', note: 'Captained England to 1966 glory; Pelé called him the greatest defender he faced.' },
      { name: 'Gary Lineker', years: '1986–1990', pos: 'Forward', note: '10 WC goals, 1986 tournament top scorer despite a Hand of God exit.' },
      { name: 'Geoff Hurst', years: '1966', pos: 'Forward', note: 'Only player to score a hat-trick in a World Cup final.' },
      { name: 'Peter Shilton', years: '1982–1990', pos: 'Goalkeeper', note: 'WC record 17 appearances for a keeper; victim of the Hand of God.' },
      { name: 'Harry Kane', years: '2018–2022', pos: 'Forward', note: '2018 Golden Boot (6 goals); 3 WC goals in 2022.' },
    ],
    facts: [
      'England won their only World Cup in 1966, hosting the tournament. They beat West Germany 4-2 in the final.',
      'The "Hand of God" goal by Maradona vs England in 1986 remains the most controversial moment in WC history.',
      'England have been eliminated by penalty shootout 4 times — more than any other nation.',
      'Despite having world-class players in every generation, England have not reached a WC final since 1966.',
    ],
  },

  Spain: {
    name: 'Spain', flag: '🇪🇸', color: '#c60b1e', color2: '#ffc400',
    confederation: 'UEFA',
    history: {
      1934:3, 1950:4, 1954:1, 1962:1, 1966:1, 1974:1,
      1978:3, 1982:3, 1986:3, 1990:2, 1994:3, 1998:2,
      2002:3, 2006:2, 2010:6, 2014:1, 2018:2, 2022:3,
    },
    legends: [
      { name: 'Iker Casillas', years: '2006–2014', pos: 'Goalkeeper', note: '2010 World Champion; kept clean sheet in the 2010 final.' },
      { name: 'Xavi Hernández', years: '2002–2014', pos: 'Midfielder', note: 'The heartbeat of Spain\'s 2010 tiki-taka triumph; WC best player.' },
      { name: 'David Villa', years: '2006–2014', pos: 'Forward', note: 'Spain\'s all-time WC top scorer — 9 goals, including 2010 winner.' },
      { name: 'Andrés Iniesta', years: '2006–2018', pos: 'Midfielder', note: 'Scored the 2010 WC final winner in extra time vs Netherlands.' },
      { name: 'Emilio Butragueño', years: '1986–1990', pos: 'Forward', note: 'Scored 4 goals vs Denmark in 1986 R16, Spain\'s best pre-2010 moment.' },
    ],
    facts: [
      'Spain\'s 2010 World Cup was won with a record-low 8 goals scored — efficiency over entertainment.',
      'They became the first European team to win a WC held outside Europe (South Africa 2010).',
      'Iniesta\'s extra-time winner in the 2010 final came in the 116th minute against the Netherlands.',
      'Spain went out in the group stage in 2014 as defending champions, losing 5-1 to the Netherlands.',
    ],
  },

  Netherlands: {
    name: 'Netherlands', flag: '🇳🇱', color: '#ff6600', color2: '#ffffff',
    confederation: 'UEFA',
    history: {
      1934:3, 1938:2, 1974:5, 1978:5,
      1990:2, 1994:3, 1998:4, 2006:3,
      2010:5, 2014:4, 2022:3,
    },
    legends: [
      { name: 'Johan Cruyff', years: '1974', pos: 'Forward', note: 'Invented "Total Football." Led Netherlands to the final in 1974.' },
      { name: 'Johan Neeskens', years: '1974–1978', pos: 'Midfielder', note: 'Penalty goal in 60 seconds of the 1974 final; 5 WC goals total.' },
      { name: 'Dennis Bergkamp', years: '1994–1998', pos: 'Forward', note: 'His last-minute QF goal vs Argentina in 1998 is one of the greatest ever.' },
      { name: 'Van Persie', years: '2006–2014', pos: 'Forward', note: 'Flying header vs Spain in 2014 group stage; 4 goals in the tournament.' },
      { name: 'Arjen Robben', years: '2006–2014', pos: 'Winger', note: '3 WC goals including 2014 sprint header vs Spain. 2010 finalist.' },
    ],
    facts: [
      'Netherlands are the most successful nation never to have won the World Cup — 3 finals, 0 titles.',
      '"Total Football" — the 1974 Dutch philosophy of fluid positional play — revolutionised modern football.',
      'They beat Brazil 3-0 in the 2014 third-place play-off, Brazil\'s second-heaviest defeat in WC history.',
      'The 1978 final in Buenos Aires was played on Argentina\'s home turf, which many historians consider an advantage.' ,
    ],
  },

  Portugal: {
    name: 'Portugal', flag: '🇵🇹', color: '#006600', color2: '#ff0000',
    confederation: 'UEFA',
    history: {
      1966:4, 1986:1, 2002:1, 2006:4, 2010:2, 2014:1, 2022:3,
    },
    legends: [
      { name: 'Eusébio', years: '1966', pos: 'Forward', note: '9 goals in 1966 — tournament top scorer; saved Portugal vs North Korea (3-0 down, won 5-3).' },
      { name: 'Cristiano Ronaldo', years: '2006–2022', pos: 'Forward', note: '8 WC goals; 4th place in 2006. The defining player of his era.' },
      { name: 'Luís Figo', years: '1998–2006', pos: 'Winger', note: 'Carried Portugal to 4th in 2006; Ballon d\'Or 2001.' },
      { name: 'Pepe', years: '2010–2022', pos: 'Defender', note: 'Appeared in 4 World Cups; legendary defensive stalwart.' },
      { name: 'Bernardo Silva', years: '2018–2022', pos: 'Midfielder', note: 'Key creative force in Portugal\'s recent QF runs.' },
    ],
    facts: [
      'Eusébio\'s 9-goal performance in 1966 remains the foundation of Portugal\'s World Cup legacy.',
      'In 2022, Morocco beat Portugal 1-0 in the QF — Portugal\'s earliest exit in their last 4 WC campaigns.',
      'Portugal beat North Korea 5-3 in 1966 after being 3-0 down at half time — one of the greatest comebacks.',
      'Cristiano Ronaldo has the most goals for Portugal in WC history but has never won the tournament.',
    ],
  },

  Uruguay: {
    name: 'Uruguay', flag: '🇺🇾', color: '#5EB6E4', color2: '#ffffff',
    confederation: 'CONMEBOL',
    history: {
      1930:6, 1950:6, 1954:4, 1962:1, 1966:3,
      1970:4, 1974:1, 1978:1, 1982:1, 1986:2,
      1990:2, 1994:2, 1998:1, 2002:1, 2010:4,
      2014:2, 2018:3, 2022:1,
    },
    legends: [
      { name: 'Alcides Ghiggia', years: '1950', pos: 'Right Wing', note: 'Scored the Maracanazo winner vs Brazil in 1950 to silence 200,000 fans.' },
      { name: 'Luis Suárez', years: '2010–2022', pos: 'Forward', note: 'Saved Uruguay with handball on the line in 2010 QF; 3 WC goals total.' },
      { name: 'Juan Schiaffino', years: '1950–1954', pos: 'Midfielder', note: 'Scored the equalizer in the 1950 "final" vs Brazil; considered South America\'s best player of the era.' },
      { name: 'Diego Forlán', years: '2002–2010', pos: 'Forward', note: '5 WC goals; won Golden Ball at 2010 WC as best player.' },
    ],
    facts: [
      'Uruguay\'s 1950 "Maracanazo" — beating Brazil 2-1 in the deciding game in front of 200,000 fans — is football\'s greatest shock.',
      'Uruguay won the first ever World Cup in 1930 on home soil, beating Argentina 4-2 in the final.',
      'They have won two World Cups but from just 13 appearances — an extraordinary win rate for a nation of 3.5M.',
      'Luis Suárez\'s handball in the 2010 QF vs Ghana is one of the most controversial acts in World Cup history.',
    ],
  },

  Hungary: {
    name: 'Hungary', flag: '🇭🇺', color: '#CE2939', color2: '#477050',
    confederation: 'UEFA',
    history: {
      1934:3, 1938:5, 1954:5, 1958:1, 1962:3, 1966:1, 1978:1, 1982:1, 1986:1,
    },
    legends: [
      { name: 'Ferenc Puskás', wikiName: 'Ferenc Puskás', years: '1954', pos: 'Forward', note: 'One of the greatest players ever. 84 goals in 85 games for Hungary; heart of the Golden Team.' },
      { name: 'Sándor Kocsis', wikiName: 'Sándor Kocsis', years: '1954', pos: 'Forward', note: '11 goals at the 1954 WC — a record that stood for decades. Nicknamed "Golden Head" for his aerial ability.' },
      { name: 'Nándor Hidegkuti', wikiName: 'Nándor Hidegkuti', years: '1954', pos: 'Forward', note: 'The original "false nine" — his deep-lying role confused England and revolutionized football tactics.' },
      { name: 'Gyula Grosics', wikiName: 'Gyula Grosics', years: '1954', pos: 'Goalkeeper', note: 'One of the first modern sweeper-keepers; crucial to the Golden Team\'s dominance across 5 years unbeaten.' },
    ],
    facts: [
      'Hungary\'s "Aranycsapat" (Golden Team) went 32 games unbeaten from 1950–1954, including a 6-3 thrashing of England at Wembley — England\'s first-ever home defeat to a continental side.',
      'The 1954 final loss to West Germany — "The Miracle of Bern" — is one of sport\'s greatest upsets. Hungary had beaten Germany 8-3 in the group stage weeks earlier.',
      'Sándor Kocsis scored 11 goals at the 1954 WC in just 5 games — a stunning strike rate that surpassed records set since the 1930s.',
      'Ferenc Puskás later represented Spain and won 3 European Cups with Real Madrid, becoming a citizen of two countries\' football legend.',
    ],
  },

  Belgium: {
    name: 'Belgium', flag: '🇧🇪', color: '#000000', color2: '#EF3340',
    confederation: 'UEFA',
    history: {
      1930:1, 1934:2, 1938:2, 1970:1, 1982:3,
      1986:4, 1990:2, 1994:2, 1998:2, 2002:1,
      2014:3, 2018:4, 2022:1,
    },
    legends: [
      { name: 'Kevin De Bruyne', years: '2014–2022', pos: 'Midfielder', note: 'The engine of Belgium\'s "Golden Generation"; named Best Player in 2018 R16.' },
      { name: 'Romelu Lukaku', years: '2014–2022', pos: 'Forward', note: 'Belgium\'s all-time top scorer; 4 WC goals but missed crucial chances in 2022.' },
      { name: 'Jan Ceulemans', years: '1982–1990', pos: 'Forward', note: 'Key figure in Belgium\'s 1986 run to the semi-finals.' },
      { name: 'Thibaut Courtois', years: '2014–2022', pos: 'Goalkeeper', note: 'Won Golden Glove at 2018 WC with 3 crucial saves in the knockout rounds.' },
    ],
    facts: [
      'Belgium\'s "Golden Generation" peaked at 3rd place in 2018, but failed to convert in 2022 — perhaps the most talented squad never to win.',
      'Belgium came back from 0-2 down to beat Japan 3-2 in the 2018 R16 in the last minute — one of the great WC comebacks.',
      'Belgium beat the Soviet Union 4-3 in the 1986 R16 in one of the most dramatic matches in WC history.',
      'Despite reaching 3rd in 2018, Belgium were ranked No. 1 in FIFA rankings for a record 3 years.',
    ],
  },

  Croatia: {
    name: 'Croatia', flag: '🇭🇷', color: '#FF0000', color2: '#ffffff',
    confederation: 'UEFA',
    history: {
      1998:4, 2002:1, 2006:1, 2014:1, 2018:5, 2022:4,
    },
    legends: [
      { name: 'Luka Modrić', years: '2006–2022', pos: 'Midfielder', note: '2018 Golden Ball winner; arguably the best player in the world at 32.' },
      { name: 'Davor Šuker', years: '1998–2002', pos: 'Forward', note: '1998 Golden Boot winner with 6 goals; Croatia\'s greatest ever striker.' },
      { name: 'Ivan Rakitić', years: '2014–2022', pos: 'Midfielder', note: 'Scored the opening goal in the 2018 WC final vs France.' },
      { name: 'Dražen Ladić', years: '1998', pos: 'Goalkeeper', note: 'Key to Croatia\'s historic 3rd-place finish in their debut World Cup.' },
    ],
    facts: [
      'Croatia reached the final in just their second-ever World Cup appearance (2018), losing to France.',
      'They became the smallest nation (4M people) to reach a WC final since Uruguay in 1950.',
      'Luka Modrić\'s 2018 Golden Ball at age 32 made him the first player since Ronaldo (2002) to win it without winning the tournament.',
      'Croatia\'s 2022 run included penalty shootout wins over Japan and Brazil — extraordinary nerves of steel.',
    ],
  },

  Mexico: {
    name: 'Mexico', flag: '🇲🇽', color: '#006847', color2: '#ffffff',
    confederation: 'CONCACAF',
    history: {
      1930:1, 1950:1, 1954:1, 1958:1, 1962:1, 1966:1,
      1970:3, 1974:1, 1978:1, 1986:3, 1994:2,
      1998:2, 2002:2, 2006:2, 2010:2, 2014:2, 2018:2, 2022:1,
    },
    legends: [
      { name: 'Hugo Sánchez', years: '1978–1994', pos: 'Forward', note: 'Mexico\'s greatest striker; scored in 1986 QF run as hosts.' },
      { name: 'Cuauhtémoc Blanco', years: '1998–2010', pos: 'Forward', note: 'Iconic dribbles and bicycle-kick goals across 3 World Cups.' },
      { name: 'Jorge Campos', years: '1994–1998', pos: 'Goalkeeper', note: 'Flamboyant keeper with outfield instincts; designed his own kits.' },
      { name: 'Javier "Chicharito" Hernández', years: '2010–2018', pos: 'Forward', note: 'Mexico\'s all-time top WC scorer with 4 goals.' },
    ],
    facts: [
      'Mexico hold the infamous "Curse of the Fifth Game" — they have reached the R16 in 7 consecutive WCs (1994–2018) but never advanced.',
      'As 1986 hosts, Mexico reached the QF before losing to West Germany on penalties.',
      'Mexico\'s 2022 exit on goal difference was their first group-stage elimination since 1978.',
      'Mexico vs Germany in 2018 produced one of the great WC upsets — 1-0 win in Group F shocked the world.',
    ],
  },

  'United States': {
    name: 'United States', flag: '🇺🇸', color: '#003087', color2: '#BF0A30',
    confederation: 'CONCACAF',
    history: {
      1930:4, 1934:2, 1950:1, 1990:1, 1994:2,
      1998:1, 2002:3, 2006:1, 2010:2, 2014:2, 2022:2,
    },
    legends: [
      { name: 'Landon Donovan', years: '2002–2014', pos: 'Forward', note: '5 WC goals; scored the last-minute winner vs Algeria in 2010.' },
      { name: 'Clint Dempsey', years: '2006–2014', pos: 'Midfielder', note: '4 WC goals; fastest ever US scorer (37 seconds vs Ghana in 2014).' },
      { name: 'Tim Howard', years: '2010–2014', pos: 'Goalkeeper', note: 'Made 16 saves vs Belgium in 2014 — the most in a WC game ever.' },
      { name: 'Joe Gaetjens', years: '1950', pos: 'Forward', note: 'Scored the goal that shocked England 1-0 in 1950 — the biggest WC upset at the time.' },
    ],
    facts: [
      'In 1930, the USA reached the semi-finals in their first ever World Cup, defeating Belgium and Paraguay.',
      'The USA\'s 1-0 win over England in 1950 is still considered one of the greatest upsets in WC history.',
      'Tim Howard\'s 16 saves against Belgium in 2014 is the all-time record for a single World Cup match.',
      'The USA failed to qualify for 2018 — a national embarrassment that triggered a complete footballing overhaul.',
    ],
  },

  'South Korea': {
    name: 'South Korea', flag: '🇰🇷', color: '#C60C30', color2: '#003478',
    confederation: 'AFC',
    history: {
      1954:1, 1986:1, 1990:1, 1994:1, 1998:1,
      2002:4, 2006:1, 2010:2, 2014:1, 2018:1, 2022:2,
    },
    legends: [
      { name: 'Park Ji-sung', years: '2002–2010', pos: 'Midfielder', note: '2002 co-host hero; first Asian player to score in a WC semi-final.' },
      { name: 'Cha Bum-kun', years: '1986', pos: 'Forward', note: 'South Korea\'s first WC goal scorer in 1986.' },
      { name: 'Hwang Hee-chan', years: '2022', pos: 'Forward', note: 'Last-minute goal vs Portugal in 2022 sent South Korea to the R16.' },
      { name: 'Son Heung-min', years: '2014–2022', pos: 'Forward', note: '3 WC goals; one of Asia\'s greatest ever players.' },
    ],
    facts: [
      'South Korea\'s 2002 co-host run to the semi-finals — beating Spain, Italy, and Portugal en route — is the greatest Asian WC performance ever.',
      'At the 1954 WC, South Korea lost 0-9 to Hungary and 0-7 to Turkey — still two of the biggest defeats in WC history.',
      'South Korea became only the third non-European or South American team to reach the semi-finals (after USA 1930 and North Korea 1966).',
      'In 2022, South Korea famously beat Portugal 2-1 in stoppage time to advance to the R16.',
    ],
  },

  Japan: {
    name: 'Japan', flag: '🇯🇵', color: '#003087', color2: '#ffffff',
    confederation: 'AFC',
    history: {
      1998:1, 2002:2, 2006:1, 2010:2, 2014:1, 2018:2, 2022:2,
    },
    legends: [
      { name: 'Hidetoshi Nakata', wikiName: 'Hidetoshi Nakata', years: '1998–2006', pos: 'Midfielder', note: 'Played in Italy\'s Serie A; one of Asia\'s first true global football stars.' },
      { name: 'Kunishige Kamamoto', wikiName: 'Kunishige Kamamoto', years: '1968 Olympics', pos: 'Forward', note: 'Japan\'s all-time greatest scorer in the pre-WC era.' },
      { name: 'Shunsuke Nakamura', wikiName: 'Shunsuke Nakamura', years: '2002–2010', pos: 'Midfielder', note: 'Brilliant free-kick specialist; key to Japan\'s 2002 R16 run.' },
      { name: 'Ritsu Doan', wikiName: 'Ritsu Doan', years: '2022', pos: 'Midfielder', note: 'Scored crucial goals vs Spain and Germany in the historic 2022 group stage.' },
    ],
    facts: [
      'In 2022, Japan became the first Asian team to beat both Germany and Spain in the same tournament.',
      'Japan were eliminated on penalties by Croatia in 2022 after leading 1-0 — heartbreak for a squad that had outperformed every expectation.',
      'Japan\'s 2-1 lead over Belgium in the 2018 R16 was overturned in the 90th+1 minute — the biggest WC collapse in recent history.',
      'Japan have qualified for every World Cup since 1998 — establishing themselves as Asia\'s most consistent WC nation.',
    ],
  },

  Morocco: {
    name: 'Morocco', flag: '🇲🇦', color: '#C1272D', color2: '#006233',
    confederation: 'CAF',
    history: {
      1970:1, 1986:1, 1994:1, 1998:1, 2018:1, 2022:4,
    },
    legends: [
      { name: 'Sofiane Boufal', wikiName: 'Sofiane Boufal', years: '2022', pos: 'Winger', note: 'Dribbling maestro of the 2022 magical run.' },
      { name: 'Yassine Bounou', wikiName: 'Yassine Bounou', years: '2022', pos: 'Goalkeeper', note: 'Saved 2 penalties vs Spain in the 2022 QF — hero of the run.' },
      { name: 'Achraf Hakimi', wikiName: 'Achraf Hakimi', years: '2022', pos: 'Right Back', note: 'Scored the decisive penalty vs Spain in the 2022 QF; one of the world\'s best fullbacks.' },
      { name: 'Mustapha Merry', wikiName: 'Mustapha Merry', years: '1986', pos: 'Forward', note: 'Part of the 1986 squad that became the first African team to top a WC group.' },
    ],
    facts: [
      'Morocco\'s 2022 run to the semi-finals was the greatest achievement by an African or Arab nation in World Cup history.',
      'In 1986, Morocco became the first African team to win their group and advance from the group stage of a WC.',
      'Their 2022 squad drew from players born in France, Spain, Belgium and elsewhere — a symbol of the global Moroccan diaspora.',
      'Morocco did not concede a single open-play goal in their first five 2022 WC matches — extraordinary defensive resilience.',
    ],
  },

  Poland: {
    name: 'Poland', flag: '🇵🇱', color: '#DC143C', color2: '#ffffff',
    confederation: 'UEFA',
    history: {
      1938:2, 1974:4, 1978:3, 1982:4, 1986:2,
      2002:1, 2006:1, 2018:1, 2022:2,
    },
    legends: [
      { name: 'Grzegorz Lato', wikiName: 'Grzegorz Lato', years: '1974–1982', pos: 'Right Wing', note: '10 WC goals; 1974 top scorer. Part of Poland\'s golden generation.' },
      { name: 'Robert Lewandowski', wikiName: 'Robert Lewandowski', years: '2018–2022', pos: 'Forward', note: 'All-time Poland top scorer; finally scored his first WC goal in 2022.' },
      { name: 'Zbigniew Boniek', wikiName: 'Zbigniew Boniek', years: '1978–1986', pos: 'Forward', note: '"Bello di Notte" — brilliant in the 1982 night matches on the way to 3rd.' },
      { name: 'Włodzimierz Lubański', wikiName: 'Włodzimierz Lubański', years: '1974–1978', pos: 'Forward', note: 'One of Europe\'s top strikers in the 1970s; key in 1974 3rd-place finish.' },
    ],
    facts: [
      'Poland\'s 1974 squad is considered one of the best to never win the World Cup — 3rd place with a squad of legends.',
      'In 1982, Poland beat the Soviet Union in a match nicknamed the "Battle of Shame" — both teams accused of playing for a draw.',
      'Grzegorz Lato\'s 10 WC goals from just 2 tournaments is one of the best scoring rates in WC history.',
      'Robert Lewandowski, despite being one of the greatest strikers ever, had never scored a WC goal before 2022.',
    ],
  },

  Sweden: {
    name: 'Sweden', flag: '🇸🇪', color: '#006AA7', color2: '#FECC02',
    confederation: 'UEFA',
    history: {
      1934:3, 1938:4, 1950:4, 1958:5, 1974:3,
      1978:1, 1990:1, 1994:4, 2002:2, 2006:2, 2018:3,
    },
    legends: [
      { name: 'Gunnar Nordahl', wikiName: 'Gunnar Nordahl', years: '1950', pos: 'Forward', note: 'One of the greatest center-forwards of the 1950s; part of the 1950 3rd-place squad.' },
      { name: 'Zlatan Ibrahimović', wikiName: 'Zlatan Ibrahimović', years: '2002–2014', pos: 'Forward', note: 'One of the most gifted strikers ever; never scored at a WC but dominated European football.' },
      { name: 'Henrik Larsson', wikiName: 'Henrik Larsson', years: '1994–2002', pos: 'Forward', note: 'Key player in 1994 3rd-place run and beyond; Scotland and Celtic legend.' },
      { name: 'Karl-Erik Palmér', wikiName: 'Karl-Erik Palmér', years: '1958', pos: 'Forward', note: 'Scored in the 1958 final — Sweden\'s only final appearance as hosts.' },
    ],
    facts: [
      'Sweden hosted and reached the 1958 final, losing to Brazil 2-5 in the most watched game in Swedish TV history at the time.',
      'Just Fontaine scored 4 goals against Sweden in the 1958 third-place match — a single-game WC record.',
      'Sweden\'s 1994 squad with Brolin, Dahlin, Larsson, and Ravelli is the nation\'s greatest modern-era team.',
      'Zlatan Ibrahimović, despite being Sweden\'s all-time top scorer, never scored a goal at a World Cup.',
    ],
  },

  Switzerland: {
    name: 'Switzerland', flag: '🇨🇭', color: '#FF0000', color2: '#ffffff',
    confederation: 'UEFA',
    history: {
      1934:3, 1938:3, 1950:2, 1954:3, 1962:1, 1966:1,
      1994:2, 2006:3, 2010:2, 2014:2, 2018:1, 2022:2,
    },
    legends: [
      { name: 'Granit Xhaka', wikiName: 'Granit Xhaka', years: '2014–2022', pos: 'Midfielder', note: 'Switzerland\'s captain and engine room across 3 WC campaigns.' },
      { name: 'Xherdan Shaqiri', wikiName: 'Xherdan Shaqiri', years: '2014–2022', pos: 'Winger', note: 'Bicycle-kick vs Poland in 2016, clutch goals at multiple WCs.' },
      { name: 'Stéphane Chapuisat', wikiName: 'Stéphane Chapuisat', years: '1994', pos: 'Forward', note: 'Scored in the 1994 WC; one of Switzerland\'s finest ever players.' },
    ],
    facts: [
      'Switzerland hosted the 1954 World Cup — won by West Germany, with Hungary as runners-up in the famous "Miracle of Bern."',
      'In 2006, Switzerland were eliminated by Ukraine on penalties without conceding a single goal in 120 minutes — uniquely unlucky.',
      'Switzerland became just the 3rd team ever to eliminate defending champions Spain in the 2010 group stage.',
      'The Swiss have qualified for every World Cup since 1994 — one of Europe\'s most consistent performers.',
    ],
  },

  Senegal: {
    name: 'Senegal', flag: '🇸🇳', color: '#00853F', color2: '#FDEF42',
    confederation: 'CAF',
    history: { 2002:3, 2018:1, 2022:2 },
    legends: [
      { name: 'El-Hadji Diouf', wikiName: 'El-Hadji Diouf', years: '2002', pos: 'Forward', note: '2002 WC run hero; played a key role in beating France in the opener.' },
      { name: 'Sadio Mané', wikiName: 'Sadio Mané', years: '2018–2022', pos: 'Forward', note: 'One of Africa\'s greatest ever players; Ballon d\'Or runner-up 2022.' },
      { name: 'Aliou Cissé', wikiName: 'Aliou Cissé', years: '2002', pos: 'Midfielder', note: 'Captained Senegal in 2002; now head coach of the national team.' },
      { name: 'Kalidou Koulibaly', wikiName: 'Kalidou Koulibaly', years: '2018–2022', pos: 'Defender', note: 'One of the world\'s best defenders during his prime at Napoli.' },
    ],
    facts: [
      'Senegal\'s 2002 debut WC run to the quarter-finals started with a 1-0 shock win over holders France.',
      'In 2018, Senegal became the first team ever eliminated from a World Cup on fair play (yellow card) tiebreaker vs Japan.',
      'Senegal won their first Africa Cup of Nations in 2022 — the same year they reached the R16 at the World Cup.',
      'Sadio Mané suffered a pre-tournament injury in 2022 that robbed Senegal of their best player at a crucial moment.',
    ],
  },

  Australia: {
    name: 'Australia', flag: '🇦🇺', color: '#FFD700', color2: '#006400',
    confederation: 'AFC',
    history: { 1974:1, 2006:2, 2010:1, 2014:1, 2022:2 },
    legends: [
      { name: 'Harry Kewell', wikiName: 'Harry Kewell', years: '2006', pos: 'Midfielder', note: 'Scored vs Croatia in 2006 to send Socceroos to the R16.' },
      { name: 'Tim Cahill', wikiName: 'Tim Cahill', years: '2006–2014', pos: 'Midfielder', note: '4 WC goals; scored 2 in 2006 comeback vs Japan. Greatest Asian WC scorer.' },
      { name: 'Mark Schwarzer', wikiName: 'Mark Schwarzer', years: '2006–2014', pos: 'Goalkeeper', note: 'Saved the crucial penalty vs Uruguay in the 2006 WC qualifying play-off.' },
    ],
    facts: [
      'Australia\'s 2006 run to the R16 — their first WC since 1974 — ended with a controversial penalty against Italy in the 95th minute.',
      'Tim Cahill scored 4 World Cup goals for Australia — the most of any Asian or Oceanian player.',
      'In 2022, Australia beat Argentina\'s conquerors Saudi Arabia and reached the R16 for only the second time.',
      'Australia joined the Asian Football Confederation (AFC) in 2006, dramatically improving their WC qualifying chances.',
    ],
  },

  Denmark: {
    name: 'Denmark', flag: '🇩🇰', color: '#C60C30', color2: '#ffffff',
    confederation: 'UEFA',
    history: { 1986:2, 1998:3, 2002:1, 2010:1, 2018:2, 2022:2 },
    legends: [
      { name: 'Peter Schmeichel', wikiName: 'Peter Schmeichel', years: '1986–1998', pos: 'Goalkeeper', note: 'Arguably the greatest goalkeeper ever; captained Denmark in 1998.' },
      { name: 'Michael Laudrup', wikiName: 'Michael Laudrup', years: '1986–1998', pos: 'Midfielder', note: 'One of the most skilful players of his era; orchestrated 1986 group victories.' },
      { name: 'Brian Laudrup', wikiName: 'Brian Laudrup', years: '1998', pos: 'Winger', note: 'Scored in the 1998 QF vs Brazil in a shock 3-2 win.' },
    ],
    facts: [
      'Denmark\'s 1992 EURO victory (as last-minute replacements for Yugoslavia) is considered the greatest underdog triumph in European football.',
      'Denmark beat Brazil 3-2 in the 1998 quarter-final — one of the biggest WC shocks of the decade.',
      'Their 1986 group stage form was spectacular, with a 6-1 win over Uruguay — but they then lost 5-1 to Spain in the R16.',
      'Denmark have qualified for 6 World Cups but have never gone beyond the quarter-final stage.',
    ],
  },

  Türkiye: {
    name: 'Türkiye', flag: '🇹🇷', color: '#E30A17', color2: '#ffffff',
    confederation: 'UEFA',
    history: { 1954:4, 2002:4 },
    legends: [
      { name: 'Hakan Şükür', wikiName: 'Hakan Şükür', years: '2002', pos: 'Forward', note: 'Scored the fastest WC goal ever — 10.8 seconds vs South Korea in the 3rd-place match.' },
      { name: 'İlhan Mansız', wikiName: 'İlhan Mansız', years: '2002', pos: 'Forward', note: 'Scored a stunning bicycle kick vs Senegal in the 2002 QF.' },
      { name: 'Rüştü Reçber', wikiName: 'Rüştü Reçber', years: '2002', pos: 'Goalkeeper', note: 'Goalkeeper of the tournament in 2002; crucial to Turkey\'s 3rd-place run.' },
    ],
    facts: [
      'Hakan Şükür\'s goal after 10.8 seconds vs South Korea in 2002 is the fastest goal in World Cup history.',
      'Turkey\'s 3rd-place finish in 2002 is the best result by any team from Western Asia.',
      'In 1954, Turkey beat West Germany 4-1 in the group stage — but West Germany went on to win the tournament.',
      'Turkey\'s 2002 run included beating Senegal in the QF with a Mansız bicycle kick and then Japan in the semi-final.',
    ],
  },

  Cameroon: {
    name: 'Cameroon', flag: '🇨🇲', color: '#007A5E', color2: '#CE1126',
    confederation: 'CAF',
    history: { 1982:1, 1990:3, 1994:1, 1998:1, 2002:1, 2010:1, 2014:1 },
    legends: [
      { name: 'Roger Milla', wikiName: 'Roger Milla', years: '1982–1994', pos: 'Forward', note: 'Scored 5 WC goals and celebrated with the corner flag; played at 42 in 1994.' },
      { name: 'Samuel Eto\'o', wikiName: 'Samuel Eto\'o', years: '1998–2014', pos: 'Forward', note: 'Africa\'s greatest striker; 3 WC appearances but never replicated club form.' },
      { name: 'Thomas N\'Kono', wikiName: 'Thomas N\'Kono', years: '1982–1990', pos: 'Goalkeeper', note: 'Inspired the 1990 QF run with brilliant saves.' },
    ],
    facts: [
      'In 1990, Cameroon became the first African team to reach a WC quarter-final, beating Argentina 1-0 in the opening game.',
      'Roger Milla\'s corner flag dance in 1990 became the most iconic goal celebration in WC history.',
      'Milla scored a WC goal at age 42 in 1994 — the oldest WC goalscorer in history.',
      'Cameroon have appeared 8 times but never gone beyond the quarter-finals — Africa\'s most consistent yet unlucky WC nation.',
    ],
  },

  Nigeria: {
    name: 'Nigeria', flag: '🇳🇬', color: '#008751', color2: '#ffffff',
    confederation: 'CAF',
    history: { 1994:2, 1998:2, 2002:1, 2010:1, 2014:2, 2018:1, 2022:1 },
    legends: [
      { name: 'Nwankwo Kanu', wikiName: 'Nwankwo Kanu', years: '1994–2002', pos: 'Forward', note: 'Dribbling magician; 1996 Olympic gold medallist, key WC performer.' },
      { name: 'Jay-Jay Okocha', wikiName: 'Jay-Jay Okocha', years: '1994–2002', pos: 'Midfielder', note: 'One of the most skilful players of his generation; entertained across 2 WC campaigns.' },
      { name: 'Rashidi Yekini', wikiName: 'Rashidi Yekini', years: '1994', pos: 'Forward', note: 'Scored Nigeria\'s first-ever WC goal in 1994 vs Bulgaria and wept at the net.' },
      { name: 'Ahmed Musa', wikiName: 'Ahmed Musa', years: '2014–2018', pos: 'Forward', note: 'Scored twice in Nigeria\'s famous 3-2 win vs Argentina in 2014.' },
    ],
    facts: [
      'Nigeria\'s 1994 debut WC squad — with Okocha, Kanu, Yekini, Amunike — is widely regarded as Nigeria\'s greatest ever team.',
      'The Super Eagles were ranked 5th in the world in 1994 and 1995 — the highest any African nation had ever been ranked.',
      'Nigeria\'s 1998 R16 exit vs Denmark came with both teams scoring spectacular goals in one of the tournament\'s best games.',
      'In 2014, Nigeria\'s famous win over Argentina (3-2) in the group stage secured passage — only to fall to France in the R16.',
    ],
  },

  Ghana: {
    name: 'Ghana', flag: '🇬🇭', color: '#006B3F', color2: '#FCD116',
    confederation: 'CAF',
    history: { 2006:2, 2010:3, 2014:1, 2022:1 },
    legends: [
      { name: 'Michael Essien', wikiName: 'Michael Essien', years: '2006–2014', pos: 'Midfielder', note: 'One of Africa\'s greatest midfielders; carried Ghana in their debut WC.' },
      { name: 'Asamoah Gyan', wikiName: 'Asamoah Gyan', years: '2006–2014', pos: 'Forward', note: 'Top African scorer in WC history (6 goals); missed the 2010 penalty vs Uruguay.' },
      { name: 'Kevin-Prince Boateng', wikiName: 'Kevin-Prince Boateng', years: '2010', pos: 'Midfielder', note: 'Scored the opener against England in 2010, sending Ghana to the QF.' },
    ],
    facts: [
      'Asamoah Gyan\'s missed penalty against Uruguay in the 2010 QF — seconds after Suárez\'s infamous handball — is football\'s greatest what-if.',
      'Ghana became the third African team ever to reach a WC semi-final... but were denied by one missed penalty.',
      'In 2010, Ghana beat the USA in extra time with a Stephen Appiah assist and Gyan goal — a moment of pure continental pride.',
      'Ghana\'s debut in 2006 included beating Czech Republic and the United States to reach the R16.',
    ],
  },

  // ── Additional 2026 WC nations ──────────────────────────────────────────────

  Canada: {
    name: 'Canada', flag: '🇨🇦', color: '#FF0000', color2: '#ffffff',
    confederation: 'CONCACAF',
    history: { 1986:1, 2022:1 },
    legends: [
      { name: 'Alphonso Davies', wikiName: 'Alphonso Davies', years: '2022–', pos: 'Left Back / Winger', note: 'Bayern Munich star; the face of Canada\'s golden generation and 2026 host nation hopes.' },
      { name: 'Jonathan David', wikiName: 'Jonathan David', years: '2022–', pos: 'Forward', note: 'One of Europe\'s most prolific scorers at Lille; Canada\'s all-time leading WC scorer.' },
      { name: 'Atiba Hutchinson', wikiName: 'Atiba Hutchinson', years: '2012–2022', pos: 'Midfielder', note: 'Captain who led Canada\'s historic 2022 WC qualification campaign.' },
      { name: 'Dale Mitchell', years: '1986', pos: 'Midfielder', note: 'Part of the only Canada squad to qualify for the WC before 2022.' },
    ],
    facts: [
      'Canada co-hosts the 2026 World Cup alongside the USA and Mexico — their first major tournament as a host nation.',
      'The "Golden Generation" of Davies, David, and Larin broke a 36-year WC absence when qualifying for Qatar 2022.',
      'Alphonso Davies is the first Canadian to win the UEFA Champions League (2020, with Bayern Munich).',
      'Canada have been drawn in Group B with Switzerland, Qatar, and Bosnia & Herzegovina for 2026.',
    ],
  },

  Algeria: {
    name: 'Algeria', flag: '🇩🇿', color: '#006233', color2: '#ffffff',
    confederation: 'CAF',
    history: { 1982:1, 1986:1, 2010:1, 2014:2 },
    legends: [
      { name: 'Lakhdar Belloumi', wikiName: 'Lakhdar Belloumi', years: '1982–1986', pos: 'Midfielder', note: 'African Player of the Year 1981; scored the historic goal vs West Germany in 1982.' },
      { name: 'Islam Slimani', wikiName: 'Islam Slimani', years: '2010–2022', pos: 'Forward', note: 'Algeria\'s all-time top scorer; key to the 2014 R16 run.' },
      { name: 'Riyad Mahrez', wikiName: 'Riyad Mahrez', years: '2014–2022', pos: 'Winger', note: '2019 AFCON winner with Algeria; Premier League champion with Leicester & Man City.' },
      { name: 'Rabah Madjer', wikiName: 'Rabah Madjer', years: '1982–1986', pos: 'Forward', note: 'African Player of the Year 1987; scored the famous backheel in the 1987 European Cup final.' },
    ],
    facts: [
      'In 1982, Algeria became the first African team to beat a European WC finalist, defeating West Germany 2-1.',
      'The infamous "Disgrace of Gijón" (1982) — West Germany & Austria drew 1-0 to eliminate Algeria — led to FIFA changing the rules so final group games are now played simultaneously.',
      'Algeria\'s 2014 R16 match against Germany went to extra time — the last major scare before Schürrle\'s winner.',
      'Riyad Mahrez won the 2019 Africa Cup of Nations with Algeria and became one of the Premier League\'s elite wingers.',
    ],
  },

  Scotland: {
    name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', color: '#003F87', color2: '#ffffff',
    confederation: 'UEFA',
    history: { 1954:1, 1958:1, 1974:1, 1978:1, 1982:1, 1986:1, 1990:1, 1998:1 },
    legends: [
      { name: 'Kenny Dalglish', wikiName: 'Kenny Dalglish', years: '1974–1982', pos: 'Forward', note: 'Scotland\'s greatest player; scored in 4 World Cups, won league titles in England & Europe.' },
      { name: 'Denis Law', wikiName: 'Denis Law', years: '1974', pos: 'Forward', note: 'One of the greatest British players ever; 1964 Ballon d\'Or winner.' },
      { name: 'Archie Gemmill', wikiName: 'Archie Gemmill', years: '1978', pos: 'Midfielder', note: 'Scored one of the greatest WC goals ever vs Netherlands in 1978 (3-2).' },
      { name: 'Billy Bremner', wikiName: 'Billy Bremner', years: '1974', pos: 'Midfielder', note: 'Captained Scotland\'s best-ever squad in 1974, unbeaten but eliminated on goal difference.' },
    ],
    facts: [
      'Scotland were eliminated from the 1974 WC without losing a game — the only team to do so while going home.',
      'Archie Gemmill\'s 1978 goal vs Netherlands is rated by many as the greatest individual WC goal before Maradona\'s 1986 effort.',
      'Scotland have qualified for 8 World Cups but never advanced past the group stage — the all-time most appearances without getting beyond groups.',
      'For 2026, Scotland return to the WC for the first time since 1998 after a 28-year absence.',
    ],
  },

  Colombia: {
    name: 'Colombia', flag: '🇨🇴', color: '#FCD116', color2: '#003087',
    confederation: 'CONMEBOL',
    history: { 1962:1, 1990:1, 1994:2, 1998:2, 2014:3, 2018:2 },
    legends: [
      { name: 'Carlos Valderrama', wikiName: 'Carlos Valderrama', years: '1990–1998', pos: 'Midfielder', note: 'The iconic afro. Regarded as the greatest South American midfielder of the 1990s.' },
      { name: 'Falcao', wikiName: 'Radamel Falcao', years: '2014–2018', pos: 'Forward', note: 'Colombia\'s all-time top scorer; missed 2014 through injury but returned in 2018.' },
      { name: 'James Rodríguez', wikiName: 'James Rodríguez', years: '2014–2018', pos: 'Midfielder', note: '2014 Golden Boot winner with 6 goals; his volley vs Uruguay is one of the all-time WC goals.' },
      { name: 'René Higuita', wikiName: 'René Higuita', years: '1990–1994', pos: 'Goalkeeper', note: 'Famous for the "Scorpion Kick." The most flamboyant goalkeeper in WC history.' },
    ],
    facts: [
      'James Rodríguez\'s 2014 Golden Boot is the finest individual performance by a Colombian at a WC — his tournament made him a global star.',
      'Colombia\'s 1994 run was overshadowed by tragedy — defender Andrés Escobar was murdered upon returning home after scoring an own goal.',
      'In 2014, Colombia reached the quarter-finals for the first time, beating Uruguay, Greece, and Ivory Coast en route.',
      'Carlos Valderrama\'s distinctive afro made him the most recognisable figure of 1990s football.',
    ],
  },

  Ecuador: {
    name: 'Ecuador', flag: '🇪🇨', color: '#FFD100', color2: '#003087',
    confederation: 'CONMEBOL',
    history: { 2002:1, 2006:2, 2014:1, 2022:1 },
    legends: [
      { name: 'Agustín Delgado', wikiName: 'Agustín Delgado', years: '2002–2006', pos: 'Forward', note: 'Ecuador\'s first-ever WC scorer in 2002; led the team to 2006 R16.' },
      { name: 'Carlos Tenorio', wikiName: 'Carlos Tenorio', years: '2002–2006', pos: 'Forward', note: 'Scored twice vs Costa Rica in 2006 to send Ecuador to the knockout stage.' },
      { name: 'Enner Valencia', wikiName: 'Enner Valencia', years: '2014–2022', pos: 'Forward', note: 'Scored 3 of Ecuador\'s 4 goals in 2014; scored vs Qatar in the 2022 tournament opener.' },
    ],
    facts: [
      'Ecuador opened the 2022 World Cup against host nation Qatar and won 2-0 — both scored by Enner Valencia.',
      'In 2006, Ecuador became just the second South American team to qualify from their group ahead of England.',
      'Ecuador were stripped of 2022 WC points due to an eligibility dispute over defender Byron Castillo, but ultimately kept their place.',
      'Enner Valencia has scored in three consecutive World Cups — a remarkable consistency for a small nation.',
    ],
  },

  Norway: {
    name: 'Norway', flag: '🇳🇴', color: '#EF2B2D', color2: '#ffffff',
    confederation: 'UEFA',
    history: { 1938:2, 1994:1, 1998:1 },
    legends: [
      { name: 'Erling Haaland', wikiName: 'Erling Haaland', years: '2026–', pos: 'Forward', note: 'The most clinical striker in the world; leads Norway\'s push to finally reach a WC.' },
      { name: 'Ole Gunnar Solskjær', wikiName: 'Ole Gunnar Solskjær', years: '1994–1998', pos: 'Forward', note: 'Man United legend; played in Norway\'s only two modern WC appearances.' },
      { name: 'Tore André Flo', wikiName: 'Tore André Flo', years: '1998', pos: 'Forward', note: 'Scored 3 WC goals including the winner vs Brazil in 1998 — Norway\'s greatest upset.' },
      { name: 'Frode Grodås', wikiName: 'Frode Grodås', years: '1994–1998', pos: 'Goalkeeper', note: 'Saved a Diego Maradona penalty in 1994 — Norway\'s most iconic WC moment.' },
    ],
    facts: [
      'Norway beat Brazil 4-2 in the 1998 group stage — one of the biggest upsets in WC history.',
      'Frode Grodås saved Diego Maradona\'s penalty in 1994 vs Argentina — Maradona was later banned for doping that tournament.',
      'With Erling Haaland, Norway finally have the striker to match their huge potential — 2026 is their big chance.',
      'Norway hosted the 1938 WC match vs Italy and despite losing, their Arne Brustad scored 2 goals in a 2-1 defeat.',
    ],
  },

  Iran: {
    name: 'Iran', flag: '🇮🇷', color: '#239F40', color2: '#ffffff',
    confederation: 'AFC',
    history: { 1978:1, 1998:1, 2006:1, 2014:1, 2018:1, 2022:1 },
    legends: [
      { name: 'Ali Daei', wikiName: 'Ali Daei', years: '1996–2006', pos: 'Forward', note: 'Former all-time international top scorer (109 goals); Iran\'s greatest striker.' },
      { name: 'Mehdi Taremi', wikiName: 'Mehdi Taremi', years: '2018–2022', pos: 'Forward', note: 'Scored a stunning bicycle-kick vs England in 2022; leads Iran\'s modern era.' },
      { name: 'Javad Nekounam', wikiName: 'Javad Nekounam', years: '2006–2014', pos: 'Midfielder', note: 'Iran\'s most-capped player of the modern era; led the squad for 3 WC cycles.' },
    ],
    facts: [
      'Iran\'s 1998 match vs USA was politically charged — known as "the most important game in the world" beyond sport.',
      'Iran beat the USA 2-1 in 1998 in one of the most politically loaded matches in WC history.',
      'Mehdi Taremi\'s bicycle-kick vs England in 2022 was one of the tournament\'s finest goals, even in a 6-2 defeat.',
      'Iran have qualified for 6 World Cups but have never advanced past the group stage.',
    ],
  },

  'Saudi Arabia': {
    name: 'Saudi Arabia', flag: '🇸🇦', color: '#006C35', color2: '#ffffff',
    confederation: 'AFC',
    history: { 1994:2, 1998:2, 2002:1, 2006:1, 2018:1, 2022:1 },
    legends: [
      { name: 'Sami Al-Jaber', wikiName: 'Sami Al-Jaber', years: '1994–2006', pos: 'Forward', note: 'Saudi Arabia\'s greatest player; scored at 3 World Cups spanning 12 years.' },
      { name: 'Yasser Al-Qahtani', wikiName: 'Yasser Al-Qahtani', years: '2006–2018', pos: 'Forward', note: 'Prolific striker known as "The Phenomenon" in Asian football.' },
      { name: 'Salem Al-Dawsari', wikiName: 'Salem Al-Dawsari', years: '2018–2022', pos: 'Winger', note: 'Scored the winner vs Argentina in the greatest WC upset of 2022.' },
    ],
    facts: [
      'Saudi Arabia\'s 2-1 win over Argentina in 2022 is widely considered the biggest WC upset of the modern era.',
      'Salem Al-Dawsari\'s winning goal vs Messi\'s Argentina in 2022 became the most-watched sports moment in Saudi history.',
      'In 1994, Saudi Arabia reached the Round of 16 in their debut WC — defeating Belgium 1-0 in the group stage.',
      'Saudi Arabia will host the 2034 World Cup, continuing the Gulf region\'s rise as a football power.',
    ],
  },

  Tunisia: {
    name: 'Tunisia', flag: '🇹🇳', color: '#E70013', color2: '#ffffff',
    confederation: 'CAF',
    history: { 1978:1, 1998:1, 2002:1, 2006:1, 2018:1, 2022:1 },
    legends: [
      { name: 'Wahbi Khazri', wikiName: 'Wahbi Khazri', years: '2018–2022', pos: 'Forward', note: 'Tunisia\'s most creative player of the modern era; starred at the 2022 WC.' },
      { name: 'Faouzi Ghoulam', wikiName: 'Faouzi Ghoulam', years: '2018', pos: 'Defender', note: 'One of the best fullbacks in Serie A history at his peak with Napoli.' },
      { name: 'Hassen Gabsi', years: '1978', pos: 'Midfielder', note: 'Part of the 1978 squad that became the first African team to win a WC match.' },
    ],
    facts: [
      'In 1978, Tunisia became the first African team to win a WC match — beating Mexico 3-1 in the group stage.',
      'Tunisia beat France 1-0 in 2022 — a historic result even though France had already qualified and were resting players.',
      'Tunisia have appeared at 6 World Cups but have never advanced past the group stage.',
      'Wahbi Khazri was one of the tournament\'s most technically gifted players in 2022, despite Tunisia\'s early exit.',
    ],
  },

  'Côte d\'Ivoire': {
    name: "Côte d'Ivoire", flag: '🇨🇮', color: '#FF6600', color2: '#009A44',
    confederation: 'CAF',
    history: { 2006:1, 2010:1, 2014:1 },
    legends: [
      { name: 'Didier Drogba', wikiName: 'Didier Drogba', years: '2006–2014', pos: 'Forward', note: 'African legend, Chelsea icon. Led Ivory Coast through their golden generation.' },
      { name: 'Yaya Touré', wikiName: 'Yaya Touré', years: '2006–2014', pos: 'Midfielder', note: 'African Player of the Year 4 times; the dominant midfield force of his era.' },
      { name: 'Kolo Touré', wikiName: 'Kolo Touré', years: '2006–2014', pos: 'Defender', note: 'Yaya\'s brother; Arsenal and Man City stalwart who epitomised Ivory Coast\'s power.' },
    ],
    facts: [
      'Ivory Coast were drawn in the "Group of Death" in 2006 — with Argentina, Netherlands, and Serbia — and still scored 5 goals.',
      'Their 2014 WC included a famous comeback 2-1 win over Greece in stoppage time, though they exited in the group stage.',
      'Didier Drogba is widely regarded as the greatest African striker in Premier League history.',
      'Despite having one of Africa\'s best squads in the late 2000s, Ivory Coast never made it past the group stage.',
    ],
  },

  Qatar: {
    name: 'Qatar', flag: '🇶🇦', color: '#8D1B3D', color2: '#ffffff',
    confederation: 'AFC',
    history: { 2022:1 },
    legends: [
      { name: 'Hassan Al-Haydos', wikiName: 'Hassan Al-Haydos', years: '2022', pos: 'Midfielder', note: 'Qatar\'s most-capped player and captain at the 2022 home WC.' },
      { name: 'Almoez Ali', wikiName: 'Almoez Ali', years: '2022', pos: 'Forward', note: 'Scored Qatar\'s first-ever WC goal against Senegal in 2022.' },
      { name: 'Akram Afif', wikiName: 'Akram Afif', years: '2022', pos: 'Winger', note: '2023 Asian Cup Golden Boot; one of the most talented Asian players of his generation.' },
    ],
    facts: [
      'Qatar became the first host nation to lose their opening WC match (1-0 vs Ecuador) in the tournament\'s history.',
      'Qatar were the first host nation to be eliminated in the group stage of a World Cup.',
      'Despite the early exit, Qatar hosting 2022 transformed the sport\'s global landscape and stadium infrastructure in the Middle East.',
      'Qatar won the 2019 Asian Cup — their best result before the home World Cup.',
    ],
  },

  'Bosnia & Herzegovina': {
    name: 'Bosnia & Herzegovina', flag: '🇧🇦', color: '#002395', color2: '#FFCD00',
    confederation: 'UEFA',
    history: { 2014:1 },
    legends: [
      { name: 'Edin Džeko', wikiName: 'Edin Džeko', years: '2014', pos: 'Forward', note: 'One of Europe\'s elite strikers at Man City and Roma; scored Bosnia\'s first-ever WC goal.' },
      { name: 'Miralem Pjanić', wikiName: 'Miralem Pjanić', years: '2014', pos: 'Midfielder', note: 'Juventus and Barcelona midfielder; technically one of Europe\'s best passers.' },
      { name: 'Asmir Begović', wikiName: 'Asmir Begović', years: '2014', pos: 'Goalkeeper', note: 'Played in the Premier League with Chelsea and Bournemouth; Bosnia\'s first-choice keeper.' },
    ],
    facts: [
      'Bosnia & Herzegovina made their debut WC appearance in 2014 — a remarkable achievement for a nation that didn\'t exist as a sovereign state until 1992.',
      'Edin Džeko scored Bosnia\'s first-ever World Cup goal vs Iran in 2014.',
      'Bosnia beat Argentina 3-1 in a 2013 friendly — a sign of the talent they\'d bring to 2014.',
      'For 2026, Bosnia return to the WC for only their second appearance ever.',
    ],
  },

  Paraguay: {
    name: 'Paraguay', flag: '🇵🇾', color: '#D52B1E', color2: '#0038A8',
    confederation: 'CONMEBOL',
    history: { 1930:1, 1950:1, 1958:1, 1986:2, 1998:2, 2002:2, 2006:2, 2010:3 },
    legends: [
      { name: 'José Luis Chilavert', wikiName: 'José Luis Chilavert', years: '1986–2002', pos: 'Goalkeeper', note: 'Goalscoring goalkeeper with 62 international goals; world\'s best keeper in the late 1990s.' },
      { name: 'Salvador Cabañas', wikiName: 'Salvador Cabañas', years: '2006–2010', pos: 'Forward', note: 'Brilliant striker whose career was tragically cut short by a nightclub shooting in 2010.' },
      { name: 'Roque Santa Cruz', wikiName: 'Roque Santa Cruz', years: '1998–2010', pos: 'Forward', note: 'Bayern Munich and Man City forward; key figure in Paraguay\'s 2010 QF run.' },
    ],
    facts: [
      'In 2010, Paraguay reached the quarter-finals by eliminating Japan — their best-ever WC result.',
      'José Luis Chilavert was arguably the most famous goalkeeper in the world in the late 1990s and an expert penalty taker.',
      'Salvador Cabañas\' shooting in January 2010 — months before the WC — robbed Paraguay of their best striker.',
      'Paraguay\'s 2010 WC run featured three consecutive draws in the group stage — they advanced on goal difference.',
    ],
  },

  'New Zealand': {
    name: 'New Zealand', flag: '🇳🇿', color: '#ffffff', color2: '#000000',
    confederation: 'OFC',
    history: { 1982:1, 2010:1 },
    legends: [
      { name: 'Winston Reid', wikiName: 'Winston Reid', years: '2010', pos: 'Defender', note: 'Scored the equalizer vs Slovakia in 2010 — NZ\'s first WC goal in 28 years.' },
      { name: 'Ryan Nelsen', wikiName: 'Ryan Nelsen', years: '2010', pos: 'Defender', note: 'Blackburn Rovers captain; leader of the All Whites in their 2010 unbeaten group stage.' },
      { name: 'Shane Smeltz', wikiName: 'Shane Smeltz', years: '2010', pos: 'Forward', note: 'Scored New Zealand\'s first goal of the 2010 WC — the equalizer vs Italy.' },
    ],
    facts: [
      'New Zealand were the only unbeaten team at the 2010 WC — drawing all 3 group games (Italy, Slovakia, Paraguay) but still going out.',
      'Their draw 1-1 with Italy (the 2006 champions) in 2010 was one of the biggest group stage shocks in WC history.',
      'New Zealand won the 2024 OFC qualifiers and will appear at the 2026 WC in their home confederation\'s qualifier format.',
      'The All Whites have only appeared at two World Cups (1982, 2010) — among the lowest total appearances in Oceania.',
    ],
  },

  Iraq: {
    name: 'Iraq', flag: '🇮🇶', color: '#007A3D', color2: '#ffffff',
    confederation: 'AFC',
    history: { 1986:1 },
    legends: [
      { name: 'Hussein Saeed', wikiName: 'Hussein Saeed', years: '1986', pos: 'Forward', note: 'Iraq\'s all-time top scorer with 63 goals; captain of the 1986 WC squad.' },
      { name: 'Ahmed Radhi', wikiName: 'Ahmed Radhi', years: '1986', pos: 'Forward', note: 'Scored Iraq\'s only-ever World Cup goal — vs Belgium in 1986.' },
    ],
    facts: [
      'Ahmed Radhi\'s goal vs Belgium in 1986 remains Iraq\'s only-ever World Cup goal.',
      'Iraq qualified for the 2026 WC after a stunning qualification campaign — their second-ever WC appearance.',
      'Iraq won the 2007 Asia Cup — the biggest trophy in their football history — in an emotional victory during a period of national hardship.',
      'For 2026, Iraq will face France, Senegal, and Norway in Group H — the ultimate test of their progress.',
    ],
  },

  Austria: {
    name: 'Austria', flag: '🇦🇹', color: '#ED2939', color2: '#ffffff',
    confederation: 'UEFA',
    history: { 1934:3, 1954:4, 1958:1, 1978:1, 1982:1, 1990:1, 1998:1 },
    legends: [
      { name: 'Matthias Sindelar', wikiName: 'Matthias Sindelar', years: '1934', pos: 'Forward', note: '"The Paper Man" — regarded as Central Europe\'s greatest pre-WWII player; refused to play for Nazi Germany.' },
      { name: 'Hans Krankl', wikiName: 'Hans Krankl', years: '1978–1982', pos: 'Forward', note: 'Scored the winner vs Germany in 1978 in one of the WC\'s most dramatic moments.' },
      { name: 'David Alaba', wikiName: 'David Alaba', years: '2014–2022', pos: 'Defender', note: 'Real Madrid star; one of Europe\'s best defenders. Leads Austria\'s modern golden generation.' },
    ],
    facts: [
      'Austria\'s 3rd-place finish at the 1954 WC remains their best-ever result — they beat the hosts Switzerland 7-5 in the QF.',
      'Hans Krankl\'s winner vs West Germany in 1978 — called "The Miracle of Córdoba" in Austria — is the most celebrated Austrian sports moment ever.',
      'Matthias Sindelar was so opposed to the Nazi annexation of Austria that he reportedly refused a personal request from Hitler to play for Germany.',
      'Austria return to the WC in 2026 with David Alaba and a new golden generation — their first appearance since 1998.',
    ],
  },

  'South Africa': {
    name: 'South Africa', flag: '🇿🇦', color: '#007A4D', color2: '#FFB81C',
    confederation: 'CAF',
    history: { 1998:1, 2002:1, 2010:1 },
    legends: [
      { name: 'Benni McCarthy', wikiName: 'Benni McCarthy', years: '1998–2002', pos: 'Forward', note: 'Most prolific South African WC scorer; Champions League winner with Porto in 2004.' },
      { name: 'Mark Fish', wikiName: 'Mark Fish', years: '1998–2002', pos: 'Defender', note: 'Commanding defender who anchored South Africa\'s defence across two WC campaigns.' },
      { name: 'Siphiwe Tshabalala', wikiName: 'Siphiwe Tshabalala', years: '2010', pos: 'Winger', note: 'Scored the iconic first goal of the 2010 WC as host — the moment a nation exploded.' },
    ],
    facts: [
      'Siphiwe Tshabalala\'s opening goal of the 2010 World Cup — in the host nation\'s first game — became one of football\'s most celebrated moments.',
      'South Africa became the first host nation to be eliminated in the group stage in 2010, despite drawing with Mexico and Uruguay.',
      'The 2010 WC in South Africa was the first ever held on the African continent.',
      'South Africa meet Mexico in the opening match of the 2026 World Cup — a rematch of their famous 2010 group stage draw.',
    ],
  },

  'Czechia': {
    name: 'Czechia', flag: '🇨🇿', color: '#D7141A', color2: '#ffffff',
    confederation: 'UEFA',
    history: { 1934:5, 1938:3, 1954:1, 1958:1, 1962:5, 1970:1, 1982:1, 1990:2, 2006:1 },
    legends: [
      { name: 'Antonín Panenka', wikiName: 'Antonín Panenka', years: '1980 Euro', pos: 'Midfielder', note: 'Inventor of the "Panenka" penalty — a chipped penalty now used worldwide.' },
      { name: 'Pavel Nedvěd', wikiName: 'Pavel Nedvěd', years: '2006', pos: 'Midfielder', note: '2003 Ballon d\'Or; one of the greatest European midfielders of the 2000s era.' },
      { name: 'Oldřich Nejedlý', wikiName: 'Oldřich Nejedlý', years: '1934', pos: 'Forward', note: 'Top scorer at the 1934 WC with 5 goals; Czechoslovakia\'s first WC legend.' },
      { name: 'Tomáš Rosický', wikiName: 'Tomáš Rosický', years: '2006', pos: 'Midfielder', note: 'Arsenal\'s "Little Mozart" — technically brilliant Czech midfielder of the 2000s.' },
    ],
    facts: [
      'Czechoslovakia reached two World Cup finals — 1934 and 1962 — losing to Italy and Brazil respectively.',
      'The "Panenka" penalty (a soft chip down the middle) was invented by Antonín Panenka in the 1976 Euro final and is now one of football\'s most iconic moves.',
      'Pavel Nedvěd\'s 2003 Ballon d\'Or win was the first for a Czech or Slovak player since the split.',
      'In 2006, Czech Republic were eliminated from the group stage despite Pavel Nedvěd being arguably Europe\'s best player at the time.',
    ],
  },

  Haiti: {
    name: 'Haiti', flag: '🇭🇹', color: '#00209F', color2: '#D21034',
    confederation: 'CONCACAF',
    history: { 1974:1 },
    legends: [
      { name: 'Emmanuel Sanon', wikiName: 'Emmanuel Sanon', years: '1974', pos: 'Forward', note: 'Scored Haiti\'s only WC goal vs Italy in 1974 — the first time Italy conceded in 12 WC games.' },
    ],
    facts: [
      'Haiti\'s only World Cup appearance was in 1974 — they scored against Italy and broke their run of clean sheets.',
      'Emmanuel Sanon\'s goal vs Italy in 1974 ended a 1,143-minute streak without conceding for the Azzurri.',
      'Haiti return to the WC in 2026 after a 52-year absence — one of football\'s great comeback stories.',
      'The 2026 appearance represents Haiti\'s best generation in decades, fuelled by diaspora players from the USA, France, and Canada.',
    ],
  },

  Egypt: {
    name: 'Egypt', flag: '🇪🇬', color: '#C8102E', color2: '#ffffff',
    confederation: 'CAF',
    history: { 1934:1, 1990:1 },
    legends: [
      { name: 'Mohamed Salah', wikiName: 'Mohamed Salah', years: '2018', pos: 'Forward', note: 'One of the world\'s greatest players; scored in the 2018 WC despite injury.' },
      { name: 'Hossam Hassan', wikiName: 'Hossam Hassan', years: '1990', pos: 'Forward', note: 'Africa\'s all-time record goalscorer with 69 goals; played in Egypt\'s 1990 WC.' },
      { name: 'Ahmed El-Kass', years: '1934', pos: 'Forward', note: 'Part of the first African team to ever play at a World Cup in 1934.' },
    ],
    facts: [
      'Egypt played in the 1934 WC — one of only two African nations to participate before 1970, making them a true WC pioneer.',
      'Mohamed Salah\'s 2018 WC penalty vs Saudi Arabia was scored while playing through a shoulder injury from the Champions League final.',
      'Egypt\'s 7 Africa Cup of Nations titles are the most of any nation — yet they\'ve barely featured at the World Cup.',
      'For 2026, Egypt return to the WC for the first time since 1990 — Salah\'s final chance to shine on the biggest stage.',
    ],
  },

  Panama: {
    name: 'Panama', flag: '🇵🇦', color: '#DA121A', color2: '#ffffff',
    confederation: 'CONCACAF',
    history: { 2018:1 },
    legends: [
      { name: 'Román Torres', wikiName: 'Román Torres', years: '2018', pos: 'Defender', note: 'Scored the qualifying goal vs Costa Rica that sent Panama to their first-ever WC.' },
      { name: 'Blas Pérez', wikiName: 'Blas Pérez', years: '2018', pos: 'Forward', note: 'Panama\'s all-time top scorer; veteran of the historic 2018 qualification.' },
      { name: 'Felipe Baloy', wikiName: 'Felipe Baloy', years: '2018', pos: 'Defender', note: 'Scored Panama\'s first-ever World Cup goal vs England in 2018.' },
    ],
    facts: [
      'Román Torres\'s 88th-minute qualifier goal vs Costa Rica in 2017 sent Panama to their first-ever World Cup — triggering national celebrations.',
      'Felipe Baloy\'s goal vs England in 2018 was Panama\'s first-ever WC goal — scored in a 6-1 defeat, but celebrated like a victory.',
      'Panama qualified for the 2026 WC after finishing 4th in CONCACAF — securing their second-ever WC appearance.',
      'The entire country of Panama essentially shut down to celebrate Román Torres\'s qualifying goal in 2017.',
    ],
  },

  'Curaçao': {
    name: 'Curaçao', flag: '🇨🇼', color: '#003DA5', color2: '#FFD100',
    confederation: 'CONCACAF',
    history: {},
    legends: [
      { name: 'Leandro Bacuna', wikiName: 'Leandro Bacuna', years: '2016–', pos: 'Midfielder', note: 'Longtime CONCACAF stalwart; built his career in the English Championship with Aston Villa and Cardiff.' },
      { name: 'Cuco Martina', wikiName: 'Cuco Martina', years: '2014–2019', pos: 'Defender', note: 'Played in the Premier League with Southampton and Everton; one of Curaçao\'s most accomplished exports.' },
      { name: 'Juriën Timber', wikiName: 'Juriën Timber', years: '2023–', pos: 'Defender', note: 'Arsenal and former Ajax star; chose to represent Curaçao internationally, boosting the island\'s football profile.' },
    ],
    facts: [
      'Curaçao qualifies for the 2026 World Cup — their historic first-ever WC appearance, a remarkable achievement for an island of just 150,000 people.',
      'Part of the Kingdom of the Netherlands, Curaçao produces players eligible for the Dutch national team, yet many proudly choose to represent the island nation.',
      'Juriën Timber\'s decision to represent Curaçao rather than the Netherlands was seen as a major statement of Caribbean pride.',
      'Curaçao\'s CONCACAF Gold Cup runs have steadily raised their profile — their 2026 qualification is the culmination of years of development.',
    ],
  },

  'Cabo Verde': {
    name: 'Cabo Verde', flag: '🇨🇻', color: '#003893', color2: '#CF2027',
    confederation: 'CAF',
    history: {},
    legends: [
      { name: 'Ryan Mendes', wikiName: 'Ryan Mendes', years: '2012–2022', pos: 'Winger', note: 'Cabo Verde\'s most creative player; played in France\'s Ligue 1 and carried the national team for a decade.' },
      { name: 'Garry Rodrigues', wikiName: 'Garry Rodrigues', years: '2014–2022', pos: 'Winger', note: 'Scored the famous AFCON 2021 goal vs Morocco; star of Galatasaray and the Cape Verdean golden age.' },
      { name: 'Stopira', wikiName: 'Stopira', years: '2012–2022', pos: 'Defender', note: 'Long-serving left back who captained Cabo Verde through their rise in African football.' },
    ],
    facts: [
      'Cabo Verde qualifies for the 2026 World Cup — their first-ever WC appearance, an extraordinary achievement for a small archipelago of 500,000 people.',
      'In 2013, Cabo Verde shook African football by reaching the Africa Cup of Nations quarter-finals as a major underdog, putting the island nation on the map.',
      'Many Cabo Verdean players are of Portuguese-Cape Verdean descent and built careers in Portugal, France, and Switzerland before representing the islands.',
      'Known as the "Tubarões Azuis" (Blue Sharks), Cabo Verde\'s rise represents one of African football\'s most inspiring small-nation stories.',
    ],
  },

  Jordan: {
    name: 'Jordan', flag: '🇯🇴', color: '#007A3D', color2: '#CE1126',
    confederation: 'AFC',
    history: {},
    legends: [
      { name: 'Ahmad Hayel', wikiName: 'Ahmad Hayel', years: '2014–2022', pos: 'Forward', note: 'Jordan\'s leading scorer in the modern era; spearheaded the qualification campaigns.' },
      { name: 'Mousa Al-Taamari', wikiName: 'Mousa Al-Taamari', years: '2018–', pos: 'Forward', note: 'Electric winger who plays for Montpellier in Ligue 1; the brightest star of Jordan\'s golden generation.' },
      { name: 'Yazan Al-Naimat', wikiName: 'Yazan Al-Naimat', years: '2018–', pos: 'Midfielder', note: 'Industrious central midfielder; captain of the squad that made WC history.' },
    ],
    facts: [
      'Jordan qualifies for their first-ever FIFA World Cup in 2026 — completing a journey from AFC minnows to genuine contenders.',
      'Mousa Al-Taamari\'s performances in Ligue 1 with Montpellier signalled a new era for Jordanian football on the world stage.',
      'Jordan reached the 2023 Asian Cup final, losing to Qatar — that run gave them the belief to go all the way in WC qualifying.',
      'Amman\'s International Stadium has become a fortress — Jordan went unbeaten at home throughout their historic 2026 qualifying campaign.',
    ],
  },

  Uzbekistan: {
    name: 'Uzbekistan', flag: '🇺🇿', color: '#1EB53A', color2: '#0099B5',
    confederation: 'AFC',
    history: {},
    legends: [
      { name: 'Eldor Shomurodov', wikiName: 'Eldor Shomurodov', years: '2018–', pos: 'Forward', note: 'Plays in Serie A with Roma; the most accomplished Uzbek player of the modern era and the face of the 2026 squad.' },
      { name: 'Jasur Yaxshiboyev', wikiName: 'Jasur Yaxshiboyev', years: '2012–2022', pos: 'Winger', note: 'Veteran winger who served as the team\'s creative spark across multiple qualification campaigns.' },
      { name: 'Odil Ahmedov', wikiName: 'Odil Ahmedov', years: '2010–2022', pos: 'Midfielder', note: 'Deep-lying playmaker; one of the most technically refined players in Central Asian football history.' },
    ],
    facts: [
      'Uzbekistan qualifies for their first-ever FIFA World Cup in 2026 — a historic milestone for Central Asian football.',
      'Eldor Shomurodov\'s move to Genoa and then Roma in Serie A opened a new chapter for Uzbek football, proving their players can compete at the highest level.',
      'Uzbekistan are known as the "White Wolves" and have been one of the most consistent AFC nations in recent years, regularly reaching the Asian Cup knockout rounds.',
      'With a population of 36 million and a passionate football culture, Uzbekistan\'s WC debut is expected to generate enormous national pride.',
    ],
  },

  'DR Congo': {
    name: 'DR Congo', flag: '🇨🇩', color: '#007FFF', color2: '#CE1126',
    confederation: 'CAF',
    history: { 1974:1 },
    legends: [
      { name: 'Chancel Mbemba', wikiName: 'Chancel Mbemba', years: '2014–', pos: 'Defender', note: 'Champions League winner with Porto; commanding centre-back and the cornerstone of the national team.' },
      { name: 'Dieumerci Mbokani', wikiName: 'Dieumerci Mbokani', years: '2008–2020', pos: 'Forward', note: 'All-time top scorer for DR Congo; prolific striker who played across Europe\'s top leagues.' },
      { name: 'Yannick Bolasie', wikiName: 'Yannick Bolasie', years: '2012–2022', pos: 'Winger', note: 'Crystal Palace and Everton winger; electrifying dribbler who brought international attention to Congolese football.' },
    ],
    facts: [
      'DR Congo appeared at the 1974 World Cup as Zaire — the first sub-Saharan African team to play at a WC. A player famously ran out and kicked the ball away during a Brazil free-kick.',
      'The 1974 Zaire squad was politically charged — players were promised rewards but were reportedly threatened with repercussions if they lost by large margins.',
      'DR Congo have won the Africa Cup of Nations twice (1968 and 1974) as Congo-Kinshasa/Zaire — one of Africa\'s most historically significant football nations.',
      'For 2026, DR Congo return to the WC stage after a 52-year absence, fuelled by players scattered across Europe\'s major leagues.',
    ],
  },
};

// ── Name aliases for resolving different spellings → profile key ───────────────
const ALIASES: Record<string, string> = {
  // Globe GeoJSON names → profile keys
  'United States of America': 'United States',
  'USA': 'United States',
  'US': 'United States',
  'Korea, Republic of': 'South Korea',
  'Korea Republic': 'South Korea',
  'Republic of Korea': 'South Korea',
  'KOR': 'South Korea',
  'Turkey': 'Türkiye',
  'TUR': 'Türkiye',
  'Bosnia and Herzegovina': 'Bosnia & Herzegovina',
  'Bosnia-Herzegovina': 'Bosnia & Herzegovina',
  'Democratic Republic of the Congo': 'DR Congo',
  'Congo, Democratic Republic of the': 'DR Congo',
  'DRC': 'DR Congo',
  'Zaire': 'DR Congo',
  'Cape Verde': 'Cabo Verde',
  'Ivory Coast': "Côte d'Ivoire",
  "Cote d'Ivoire": "Côte d'Ivoire",
  'Holland': 'Netherlands',
  'Curacao': 'Curaçao',
  'Czech Republic': 'Czechia',
  'Czechia': 'Czechia',
  'Saudi Arabia': 'Saudi Arabia',
  'New Zealand': 'New Zealand',
  'Côte d\'Ivoire': "Côte d'Ivoire",
};

export function resolveProfileKey(name: string): string | null {
  if (COUNTRY_PROFILES[name]) return name;
  const alias = ALIASES[name];
  if (alias && COUNTRY_PROFILES[alias]) return alias;
  // Partial match fallback
  const lower = name.toLowerCase();
  const found = Object.keys(COUNTRY_PROFILES).find(k => k.toLowerCase() === lower);
  return found ?? null;
}

export function getProfile(name: string): CountryProfile | null {
  const key = resolveProfileKey(name);
  return key ? COUNTRY_PROFILES[key] : null;
}

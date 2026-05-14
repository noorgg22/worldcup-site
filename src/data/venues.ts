export interface Venue {
  id: string;
  city: string;
  state: string;
  country: 'USA' | 'Canada' | 'Mexico';
  stadium: string;
  capacity: number;
  matches: number;
  lat: number;
  lng: number;
  description: string;
  builtYear: number;
  surface: string;
  wikiTitle: string;
  interiorPhotoUrl: string;
}

// Helper: Wikimedia Commons Special:FilePath redirect (no hash needed)
const wiki = (filename: string) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(filename)}?width=1200`;

export const venues: Venue[] = [
  // ── USA ──────────────────────────────────────────────────────────────────────
  {
    id: 'metlife', city: 'New York / New Jersey', state: 'NJ', country: 'USA',
    stadium: 'MetLife Stadium', capacity: 82_500, matches: 8,
    lat: 40.8135, lng: -74.0745,
    description: 'Home of the Super Bowl and set to host the 2026 World Cup Final. The largest stadium in the tournament, nestled in the New Jersey Meadowlands just 8 miles from Times Square.',
    builtYear: 2010, surface: 'Natural Grass',
    wikiTitle: 'MetLife_Stadium',
    interiorPhotoUrl: wiki('MetLife Stadium interior.jpg'),
  },
  {
    id: 'sofi', city: 'Los Angeles', state: 'CA', country: 'USA',
    stadium: 'SoFi Stadium', capacity: 70_240, matches: 7,
    lat: 33.9535, lng: -118.3392,
    description: 'The most expensive stadium ever built at $5.5 billion, SoFi Stadium features a translucent roof and a massive dual-sided video board. Home to the Rams and Chargers.',
    builtYear: 2020, surface: 'Natural Grass',
    wikiTitle: 'SoFi_Stadium',
    interiorPhotoUrl: wiki('SoFi Stadium interior 2020.jpg'),
  },
  {
    id: 'att', city: 'Dallas', state: 'TX', country: 'USA',
    stadium: 'AT&T Stadium', capacity: 80_000, matches: 6,
    lat: 32.7480, lng: -97.0928,
    description: "Known as \"Jerry's World,\" AT&T Stadium features the world's largest column-free interior and a retractable roof. One of the most iconic venues in American sports.",
    builtYear: 2009, surface: 'Natural Grass',
    wikiTitle: 'AT%26T_Stadium',
    interiorPhotoUrl: wiki("AT&T Stadium interior.jpg"),
  },
  {
    id: 'levis', city: 'San Francisco Bay Area', state: 'CA', country: 'USA',
    stadium: "Levi's Stadium", capacity: 68_500, matches: 6,
    lat: 37.4032, lng: -121.9698,
    description: "Silicon Valley's premier stadium, home to the 49ers. Features a rooftop garden and solar panels that generate enough energy to power every home game.",
    builtYear: 2014, surface: 'Natural Grass',
    wikiTitle: "Levi%27s_Stadium",
    interiorPhotoUrl: wiki("Levi's Stadium interior.jpg"),
  },
  {
    id: 'lumen', city: 'Seattle', state: 'WA', country: 'USA',
    stadium: 'Lumen Field', capacity: 68_740, matches: 5,
    lat: 47.5952, lng: -122.3316,
    description: 'Known for the loudest crowd in American sports, Lumen Field sits on the Seattle waterfront with stunning views of Puget Sound and the Olympic Mountains.',
    builtYear: 2002, surface: 'FieldTurf',
    wikiTitle: 'Lumen_Field',
    interiorPhotoUrl: wiki('Lumen Field interior.jpg'),
  },
  {
    id: 'nrg', city: 'Houston', state: 'TX', country: 'USA',
    stadium: 'NRG Stadium', capacity: 72_220, matches: 6,
    lat: 29.6847, lng: -95.4107,
    description: 'The first NFL stadium with a retractable roof, NRG is a multi-purpose fortress in the heart of Houston that has hosted four Super Bowls.',
    builtYear: 2002, surface: 'Natural Grass',
    wikiTitle: 'NRG_Stadium',
    interiorPhotoUrl: wiki('NRG Stadium interior.jpg'),
  },
  {
    id: 'mercedesbenz', city: 'Atlanta', state: 'GA', country: 'USA',
    stadium: 'Mercedes-Benz Stadium', capacity: 71_000, matches: 6,
    lat: 33.7554, lng: -84.4009,
    description: 'A marvel of modern architecture with a retractable roof that opens like a camera aperture. The first stadium to receive LEED Platinum certification.',
    builtYear: 2017, surface: 'FieldTurf',
    wikiTitle: 'Mercedes-Benz_Stadium',
    interiorPhotoUrl: wiki('Mercedes-Benz Stadium interior.jpg'),
  },
  {
    id: 'hardrock', city: 'Miami', state: 'FL', country: 'USA',
    stadium: 'Hard Rock Stadium', capacity: 65_326, matches: 6,
    lat: 25.9579, lng: -80.2389,
    description: 'Set in sunny South Florida, Hard Rock Stadium is surrounded by a canopy shade structure unique in the NFL. Has hosted five Super Bowls and numerous major events.',
    builtYear: 1987, surface: 'Natural Grass',
    wikiTitle: 'Hard_Rock_Stadium',
    interiorPhotoUrl: wiki('Hard Rock Stadium interior.jpg'),
  },
  {
    id: 'lincolnfinancial', city: 'Philadelphia', state: 'PA', country: 'USA',
    stadium: 'Lincoln Financial Field', capacity: 69_796, matches: 5,
    lat: 39.9008, lng: -75.1675,
    description: 'Home to the Philadelphia Eagles, "The Linc" is powered entirely by renewable energy — wind and solar — making it the greenest stadium in sports.',
    builtYear: 2003, surface: 'Natural Grass',
    wikiTitle: 'Lincoln_Financial_Field',
    interiorPhotoUrl: wiki('Lincoln Financial Field interior.jpg'),
  },
  {
    id: 'arrowhead', city: 'Kansas City', state: 'MO', country: 'USA',
    stadium: 'Arrowhead Stadium', capacity: 76_416, matches: 5,
    lat: 39.0489, lng: -94.4839,
    description: 'Held the Guinness World Record for loudest outdoor stadium. Home of the Chiefs dynasty, Arrowhead is one of the most intimidating venues in world sport.',
    builtYear: 1972, surface: 'Natural Grass',
    wikiTitle: 'Arrowhead_Stadium',
    interiorPhotoUrl: wiki('Arrowhead Stadium interior.jpg'),
  },
  {
    id: 'gillette', city: 'Boston', state: 'MA', country: 'USA',
    stadium: 'Gillette Stadium', capacity: 65_878, matches: 5,
    lat: 42.0909, lng: -71.2643,
    description: 'Located in Foxborough, 25 miles south of Boston, Gillette Stadium is home to the New England Patriots and the New England Revolution MLS team.',
    builtYear: 2002, surface: 'Natural Grass',
    wikiTitle: 'Gillette_Stadium',
    interiorPhotoUrl: wiki('Gillette Stadium interior.jpg'),
  },
  // ── Canada ───────────────────────────────────────────────────────────────────
  {
    id: 'bmo', city: 'Toronto', state: 'ON', country: 'Canada',
    stadium: 'BMO Field', capacity: 45_736, matches: 6,
    lat: 43.6333, lng: -79.4187,
    description: "Canada's soccer home on the shores of Lake Ontario, BMO Field will be expanded for the World Cup. Nestled inside Exhibition Place with stunning views of the Toronto skyline.",
    builtYear: 2007, surface: 'Natural Grass',
    wikiTitle: 'BMO_Field',
    interiorPhotoUrl: wiki('BMO Field interior.jpg'),
  },
  {
    id: 'bcplace', city: 'Vancouver', state: 'BC', country: 'Canada',
    stadium: 'BC Place', capacity: 54_500, matches: 7,
    lat: 49.2767, lng: -123.1121,
    description: "An iconic domed stadium in downtown Vancouver, BC Place features the world's largest cable-supported retractable roof and sits between the mountains and the Pacific Ocean.",
    builtYear: 1983, surface: 'FieldTurf',
    wikiTitle: 'BC_Place',
    interiorPhotoUrl: wiki('BC Place interior.jpg'),
  },
  // ── Mexico ───────────────────────────────────────────────────────────────────
  {
    id: 'azteca', city: 'Mexico City', state: 'CDMX', country: 'Mexico',
    stadium: 'Estadio Azteca', capacity: 87_523, matches: 7,
    lat: 19.3029, lng: -99.1505,
    description: "The only stadium to host two World Cup Finals (1970 & 1986). A sacred ground of football history where Pelé lifted the trophy and Maradona scored the \"Hand of God.\" Iconic doesn't cover it.",
    builtYear: 1966, surface: 'Natural Grass',
    wikiTitle: 'Estadio_Azteca',
    interiorPhotoUrl: wiki('Estadio Azteca interior.jpg'),
  },
  {
    id: 'akron', city: 'Guadalajara', state: 'JAL', country: 'Mexico',
    stadium: 'Estadio Akron', capacity: 49_850, matches: 5,
    lat: 20.6668, lng: -103.4579,
    description: "A stunning modern bowl with a flowing curved roof, Estadio Akron sits in Zapopan and is the home of Club Deportivo Guadalajara, one of Mexico's most beloved clubs.",
    builtYear: 2010, surface: 'Natural Grass',
    wikiTitle: 'Estadio_Akron',
    interiorPhotoUrl: wiki('Estadio Akron interior.jpg'),
  },
  {
    id: 'bbva', city: 'Monterrey', state: 'NL', country: 'Mexico',
    stadium: 'Estadio BBVA', capacity: 53_500, matches: 5,
    lat: 25.6694, lng: -100.2483,
    description: 'Nestled at the foot of the Cerro de la Silla mountain, Estadio BBVA is widely regarded as one of the most beautiful stadiums in Latin America. Home of CF Monterrey.',
    builtYear: 2015, surface: 'Natural Grass',
    wikiTitle: 'Estadio_BBVA',
    interiorPhotoUrl: wiki('Estadio BBVA interior.jpg'),
  },
];

export const venuesByCountry = {
  USA:    venues.filter(v => v.country === 'USA'),
  Canada: venues.filter(v => v.country === 'Canada'),
  Mexico: venues.filter(v => v.country === 'Mexico'),
};

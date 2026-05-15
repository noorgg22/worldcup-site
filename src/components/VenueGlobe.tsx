import { useEffect, useRef, useState, useCallback } from 'react';
import Globe from 'react-globe.gl';
import { venues as VENUE_DATA } from '../data/venues';
import type { Venue as VenueData } from '../data/venues';
import { ALL_MATCHES } from '../data/matches';
import type { Match } from '../data/matches';
import { useIsMobile } from '../hooks/useIsMobile';

// ── Globe venue type ──────────────────────────────────────────────────────────
export interface Venue {
  id: string;
  name: string;
  shortName: string;
  city: string;
  country: 'USA' | 'Canada' | 'Mexico';
  countryFlag: string;
  lat: number;
  lng: number;
  capacity: number;
}

export const VENUES: Venue[] = [
  { id: 'sofi',             name: 'SoFi Stadium',             shortName: 'SoFi',          city: 'Los Angeles',            country: 'USA',    countryFlag: '🇺🇸', lat: 33.9535,  lng: -118.3392, capacity: 70240 },
  { id: 'att',              name: 'AT&T Stadium',             shortName: 'AT&T',          city: 'Dallas',                 country: 'USA',    countryFlag: '🇺🇸', lat: 32.7480,  lng: -97.0930,  capacity: 80000 },
  { id: 'lumen',            name: 'Lumen Field',              shortName: 'Lumen',         city: 'Seattle',                country: 'USA',    countryFlag: '🇺🇸', lat: 47.5952,  lng: -122.3316, capacity: 68740 },
  { id: 'hardrock',         name: 'Hard Rock Stadium',        shortName: 'Hard Rock',     city: 'Miami',                  country: 'USA',    countryFlag: '🇺🇸', lat: 25.9580,  lng: -80.2389,  capacity: 65326 },
  { id: 'mercedesbenz',     name: 'Mercedes-Benz Stadium',    shortName: 'Mercedes-Benz', city: 'Atlanta',                country: 'USA',    countryFlag: '🇺🇸', lat: 33.7557,  lng: -84.4007,  capacity: 71000 },
  { id: 'arrowhead',        name: 'Arrowhead Stadium',        shortName: 'Arrowhead',     city: 'Kansas City',            country: 'USA',    countryFlag: '🇺🇸', lat: 39.0489,  lng: -94.4839,  capacity: 76416 },
  { id: 'bmo',              name: 'BMO Field',                shortName: 'BMO Field',     city: 'Toronto',                country: 'Canada', countryFlag: '🇨🇦', lat: 43.6333,  lng: -79.4186,  capacity: 45736 },
  { id: 'gillette',         name: 'Gillette Stadium',         shortName: 'Gillette',      city: 'Boston',                 country: 'USA',    countryFlag: '🇺🇸', lat: 42.0909,  lng: -71.2643,  capacity: 65878 },
  { id: 'bcplace',          name: 'BC Place',                 shortName: 'BC Place',      city: 'Vancouver',              country: 'Canada', countryFlag: '🇨🇦', lat: 49.2767,  lng: -123.1116, capacity: 54500 },
  { id: 'lincolnfinancial', name: 'Lincoln Financial Field',  shortName: 'Lincoln',       city: 'Philadelphia',           country: 'USA',    countryFlag: '🇺🇸', lat: 39.9008,  lng: -75.1675,  capacity: 69796 },
  { id: 'metlife',          name: 'MetLife Stadium',          shortName: 'MetLife',       city: 'New York / NJ',          country: 'USA',    countryFlag: '🇺🇸', lat: 40.8136,  lng: -74.0744,  capacity: 82500 },
  { id: 'nrg',              name: 'NRG Stadium',              shortName: 'NRG',           city: 'Houston',                country: 'USA',    countryFlag: '🇺🇸', lat: 29.6847,  lng: -95.4107,  capacity: 72220 },
  { id: 'levis',            name: 'Levi\u2019s Stadium',      shortName: "Levi's",        city: 'San Francisco Bay Area', country: 'USA',    countryFlag: '🇺🇸', lat: 37.4034,  lng: -121.9697, capacity: 68500 },
  { id: 'azteca',           name: 'Estadio Azteca',           shortName: 'Azteca',        city: 'Mexico City',            country: 'Mexico', countryFlag: '🇲🇽', lat: 19.3029,  lng: -99.1505,  capacity: 87523 },
  { id: 'akron',            name: 'Estadio Akron',            shortName: 'Akron',         city: 'Guadalajara',            country: 'Mexico', countryFlag: '🇲🇽', lat: 20.7250,  lng: -103.4567, capacity: 45000 },
  { id: 'bbva',             name: 'Estadio BBVA',             shortName: 'BBVA',          city: 'Monterrey',              country: 'Mexico', countryFlag: '🇲🇽', lat: 25.6693,  lng: -100.2461, capacity: 51228 },
];

const VENUE_MAP: Record<string, VenueData> = Object.fromEntries(VENUE_DATA.map(v => [v.id, v]));

export function getVenueMatches(venue: Venue): Match[] {
  return ALL_MATCHES.filter(m => m.venue === venue.name);
}

const COUNTRY_COLOR: Record<string, string> = {
  USA:    '#4fc3f7',
  Canada: '#ef5350',
  Mexico: '#66bb6a',
};

// Module-level photo cache — persists across re-renders, never re-fetched
const photoCache: Record<string, string | null> = {};

async function fetchVenuePhoto(wikiTitle: string): Promise<string | null> {
  try {
    // pageimages API is purpose-built for article thumbnails and more reliable
    // than the REST summary endpoint for non-English or lesser-covered articles
    const title = decodeURIComponent(wikiTitle).replace(/_/g, ' ');
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=900&origin=*`;
    const res  = await fetch(url);
    const json = await res.json();
    const pages = json?.query?.pages ?? {};
    const page: any = Object.values(pages)[0];
    return page?.thumbnail?.source ?? null;
  } catch {
    return null;
  }
}

interface Props {
  onVenueNav?: (venue: VenueData) => void;
}

export default function VenueGlobe({ onVenueNav }: Props) {
  const isMobile     = useIsMobile();
  const globeEl      = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [globeW, setGlobeW]             = useState(900);
  const [hoveredVenue, setHoveredVenue] = useState<Venue | null>(null);
  const [mousePos, setMousePos]         = useState({ x: 0, y: 0 });
  const [venuePhotos, setVenuePhotos]   = useState<Record<string, string | null>>({});

  const clickRef = useRef<(v: Venue) => void>(() => {});
  clickRef.current = (v: Venue) => {
    const full = VENUE_MAP[v.id];
    if (full && onVenueNav) onVenueNav(full);
  };

  // Pre-fetch all venue photos via Wikipedia pageimages API on mount.
  // Only skip venues with a confirmed non-null photo already cached.
  useEffect(() => {
    VENUE_DATA.forEach(venue => {
      if (photoCache[venue.id] != null) {
        setVenuePhotos(prev => ({ ...prev, [venue.id]: photoCache[venue.id] }));
        return;
      }
      fetchVenuePhoto(venue.wikiTitle).then(url => {
        photoCache[venue.id] = url;
        setVenuePhotos(prev => ({ ...prev, [venue.id]: url }));
      });
    });
  }, []);

  // Global mouse tracker — works regardless of what the canvas consumes
  useEffect(() => {
    const handler = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  // Responsive width
  useEffect(() => {
    const update = () => {
      if (containerRef.current) setGlobeW(containerRef.current.clientWidth);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Lock camera, disable all controls
  useEffect(() => {
    if (!globeEl.current) return;
    globeEl.current.pointOfView({ lat: 37, lng: -98, altitude: 1.05 }, 0);
    const ctrl = globeEl.current.controls();
    ctrl.enableZoom   = false;
    ctrl.enablePan    = false;
    ctrl.enableRotate = false;
    ctrl.autoRotate   = false;
  }, []);

  // HTML pulsing rings — purely visual, pointer-events: none so they don't
  // block the WebGL raycasting that drives onPointHover
  const htmlElement = useCallback((d: any) => {
    const venue = d as Venue;
    const color = COUNTRY_COLOR[venue.country] ?? '#f5c842';
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'position:relative;width:32px;height:32px;pointer-events:none;';
    wrapper.innerHTML = `
      <div style="
        position:absolute;top:50%;left:50%;
        transform:translate(-50%,-50%);
        width:24px;height:24px;border-radius:50%;
        background:${color}18;border:1.5px solid ${color}55;
        animation:vPulse 2.4s ease-out infinite;
        animation-delay:${Math.random() * 1.5}s;
        pointer-events:none;
      "></div>
    `;
    return wrapper;
  }, []);

  // Point color & radius — slightly larger on hover for feedback
  const pointColor = useCallback((d: any) => {
    const v = d as Venue;
    const base = COUNTRY_COLOR[v.country] ?? '#f5c842';
    return hoveredVenue?.id === v.id ? base : base + 'cc';
  }, [hoveredVenue]);

  const pointRadius = useCallback((d: any) => {
    const v = d as Venue;
    const base = v.capacity >= 80000 ? 0.48 : v.capacity >= 65000 ? 0.40 : 0.34;
    return hoveredVenue?.id === v.id ? base * 1.55 : base;
  }, [hoveredVenue]);

  // Tooltip geometry
  const tooltipData  = hoveredVenue ? VENUE_MAP[hoveredVenue.id] : null;
  const tooltipColor = hoveredVenue ? COUNTRY_COLOR[hoveredVenue.country] : '#f5c842';
  const tooltipPhoto = hoveredVenue ? (venuePhotos[hoveredVenue.id] ?? null) : null;
  const TW = 280, TH = 170;
  const vw = typeof window !== 'undefined' ? window.innerWidth  : 1200;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  const tx = mousePos.x + TW + 20 > vw ? mousePos.x - TW - 14 : mousePos.x + 18;
  const ty = Math.max(8, Math.min(mousePos.y - TH / 2, vh - TH - 8));

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: '100%', background: '#06090f' }}
    >
      {/* ── Mobile header — above the globe, not overlaid ──────────────────── */}
      {isMobile && (
        <div style={{
          padding: '16px 20px 12px',
          background: 'linear-gradient(180deg, #06090f 0%, rgba(6,9,15,0.9) 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
        }}>
          {/* Left: title + hint */}
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 6,
              background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.2)',
              borderRadius: 100, padding: '3px 10px',
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#f5c842', display: 'inline-block' }} />
              <span style={{ fontSize: 9, color: '#f5c842', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
                16 Venues · 3 Nations
              </span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 26,
              color: '#fff', letterSpacing: '0.06em', lineHeight: 1, margin: '0 0 4px',
            }}>
              MATCH VENUES
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11, margin: 0 }}>
              Tap a dot to explore the venue
            </p>
          </div>
          {/* Right: legend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
            {(['USA', 'Canada', 'Mexico'] as const).map(c => (
              <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: COUNTRY_COLOR[c], boxShadow: `0 0 6px ${COUNTRY_COLOR[c]}`, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', fontWeight: 600 }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Desktop header overlay ──────────────────────────────────────────── */}
      {!isMobile && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
          padding: '36px 48px', pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(6,9,15,0.92) 0%, transparent 100%)',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 12,
            background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.2)',
            borderRadius: 100, padding: '5px 14px',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f5c842', display: 'inline-block' }} />
            <span style={{ fontSize: 10, color: '#f5c842', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>
              16 Venues · 3 Nations
            </span>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,52px)',
            color: '#fff', letterSpacing: '0.06em', lineHeight: 1, margin: 0,
          }}>
            MATCH VENUES
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12, marginTop: 6 }}>
            Hover a stadium to preview · Click to explore
          </p>
          <div style={{ display: 'flex', gap: 18, marginTop: 16 }}>
            {(['USA', 'Canada', 'Mexico'] as const).map(c => (
              <div key={c} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: COUNTRY_COLOR[c], boxShadow: `0 0 8px ${COUNTRY_COLOR[c]}` }} />
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Globe ─────────────────────────────────────────────────────────────── */}
      {/* pointsData drives hover/click via built-in THREE.js raycasting.       */}
      {/* htmlElementsData adds pulsing rings (pointer-events:none so they      */}
      {/* don't block the raycasting beneath them).                             */}
      <Globe
        ref={globeEl}
        width={globeW}
        height={isMobile ? 400 : 560}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        atmosphereColor="#f5c842"
        atmosphereAltitude={0.12}
        // ── Interactive WebGL points ──────────────────────────────────────────
        pointsData={VENUES}
        pointLat="lat"
        pointLng="lng"
        pointColor={pointColor}
        pointRadius={pointRadius}
        pointAltitude={0.012}
        pointLabel=""
        onPointHover={(point: any) => setHoveredVenue(point as Venue | null)}
        onPointClick={(point: any) => clickRef.current(point as Venue)}
        // ── Visual HTML rings (no pointer events) ─────────────────────────────
        htmlElementsData={VENUES}
        htmlElement={htmlElement}
        htmlLat="lat"
        htmlLng="lng"
        htmlAltitude={0.022}
      />

      {/* ── Bottom fade ─────────────────────────────────────────────────────── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
        background: 'linear-gradient(to top, #06090f 0%, transparent 100%)',
        pointerEvents: 'none', zIndex: 5,
      }} />

      {/* ── Hover tooltip ────────────────────────────────────────────────────── */}
      {hoveredVenue && tooltipData && (
        <div
          key={hoveredVenue.id}
          style={{
            position: 'fixed', left: tx, top: ty,
            width: TW, zIndex: 9999,
            pointerEvents: 'none',
            animation: 'fadeUp 0.15s ease both',
            filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.9))',
            borderRadius: 16,
            overflow: 'hidden',
          }}
        >
          {/* Photo — full bleed */}
          <div style={{ width: '100%', height: 170, position: 'relative', background: '#0b1018' }}>
            {tooltipPhoto && (
              <img
                src={tooltipPhoto}
                alt={tooltipData.stadium}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            )}
            {/* Bottom gradient so name reads over the photo */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(6,9,15,0.88) 0%, transparent 50%)',
            }} />
            {/* Country badge */}
            <div style={{
              position: 'absolute', top: 10, right: 10,
              background: `${tooltipColor}28`, border: `1px solid ${tooltipColor}80`,
              backdropFilter: 'blur(12px)', borderRadius: 6, padding: '3px 10px',
              fontSize: 10, fontWeight: 700, color: tooltipColor, letterSpacing: '0.1em',
            }}>
              {hoveredVenue.countryFlag} {hoveredVenue.country}
            </div>
            {/* Stadium name over photo */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '0 14px 12px',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 20,
                color: '#fff', letterSpacing: '0.04em', lineHeight: 1.1,
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
              }}>
                {tooltipData.stadium}
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 3 }}>
                {tooltipData.city}{tooltipData.state ? `, ${tooltipData.state}` : ''}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

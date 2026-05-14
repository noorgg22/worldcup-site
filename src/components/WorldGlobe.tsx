import { useEffect, useRef, useState, useCallback } from 'react';
import Globe from 'react-globe.gl';
import { mockTeams } from '../mock/teams';
import { WC_STATS, GEO_ALIAS, GROUP_COLORS } from '../data/wcStats';

const TEAM_COORDS: Record<string, { lat: number; lng: number }> = {
  'Mexico':               { lat: 23.6, lng: -102.5 },
  'South Africa':         { lat: -30.6, lng: 22.9 },
  'Korea Republic':       { lat: 35.9, lng: 127.8 },
  'Czechia':              { lat: 49.8, lng: 15.5 },
  'Canada':               { lat: 56.1, lng: -106.3 },
  'Switzerland':          { lat: 46.8, lng: 8.2 },
  'Qatar':                { lat: 25.3, lng: 51.2 },
  'Bosnia & Herzegovina': { lat: 44.2, lng: 17.9 },
  'Brazil':               { lat: -14.2, lng: -51.9 },
  'Morocco':              { lat: 31.8, lng: -7.1 },
  'Haiti':                { lat: 18.9, lng: -72.3 },
  'Scotland':             { lat: 56.5, lng: -4.2 },
  'United States':        { lat: 37.1, lng: -95.7 },
  'Paraguay':             { lat: -23.4, lng: -58.4 },
  'Australia':            { lat: -25.3, lng: 133.8 },
  'Türkiye':              { lat: 38.9, lng: 35.2 },
  'Germany':              { lat: 51.2, lng: 10.5 },
  'Curaçao':              { lat: 12.2, lng: -69.0 },
  "Côte d'Ivoire":        { lat: 7.5, lng: -5.5 },
  'Ecuador':              { lat: -1.8, lng: -78.2 },
  'Netherlands':          { lat: 52.1, lng: 5.3 },
  'Japan':                { lat: 36.2, lng: 138.3 },
  'Tunisia':              { lat: 33.9, lng: 9.5 },
  'Sweden':               { lat: 60.1, lng: 18.6 },
  'Belgium':              { lat: 50.5, lng: 4.5 },
  'Egypt':                { lat: 26.8, lng: 30.8 },
  'Iran':                 { lat: 32.4, lng: 53.7 },
  'New Zealand':          { lat: -40.9, lng: 174.9 },
  'Spain':                { lat: 40.5, lng: -3.7 },
  'Cabo Verde':           { lat: 16.0, lng: -24.0 },
  'Saudi Arabia':         { lat: 23.9, lng: 45.1 },
  'Uruguay':              { lat: -32.5, lng: -55.8 },
  'France':               { lat: 46.2, lng: 2.2 },
  'Senegal':              { lat: 14.5, lng: -14.5 },
  'Norway':               { lat: 60.5, lng: 8.5 },
  'Iraq':                 { lat: 33.2, lng: 43.7 },
  'Argentina':            { lat: -38.4, lng: -63.6 },
  'Algeria':              { lat: 28.0, lng: 1.7 },
  'Austria':              { lat: 47.5, lng: 14.5 },
  'Jordan':               { lat: 30.6, lng: 36.2 },
  'Portugal':             { lat: 39.4, lng: -8.2 },
  'Uzbekistan':           { lat: 41.4, lng: 64.6 },
  'Colombia':             { lat: 4.6, lng: -74.3 },
  'DR Congo':             { lat: -4.0, lng: 21.8 },
  'England':              { lat: 52.4, lng: -1.5 },
  'Croatia':              { lat: 45.1, lng: 15.2 },
  'Ghana':                { lat: 7.9, lng: -1.0 },
  'Panama':               { lat: 8.5, lng: -80.8 },
};

// Resolve a GeoJSON feature name → WC_STATS key
function resolveStatKey(geoName: string): string | null {
  // Direct match
  if (WC_STATS[geoName]) return geoName;
  // Via alias
  const aliasKey = GEO_ALIAS[geoName];
  if (aliasKey && WC_STATS[aliasKey]) return aliasKey;
  return null;
}

// Country flag emojis for the tooltip
const COUNTRY_FLAGS: Record<string, string> = {
  'Mexico': '🇲🇽', 'South Africa': '🇿🇦', 'Korea Republic': '🇰🇷',
  'Czechia': '🇨🇿', 'Canada': '🇨🇦', 'Switzerland': '🇨🇭',
  'Qatar': '🇶🇦', 'Bosnia and Herzegovina': '🇧🇦', 'Brazil': '🇧🇷',
  'Morocco': '🇲🇦', 'Haiti': '🇭🇹', 'Scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
  'United States of America': '🇺🇸', 'Paraguay': '🇵🇾', 'Australia': '🇦🇺',
  'Turkey': '🇹🇷', 'Germany': '🇩🇪', 'Curaçao': '🇨🇼',
  "Côte d'Ivoire": '🇨🇮', 'Ecuador': '🇪🇨', 'Netherlands': '🇳🇱',
  'Japan': '🇯🇵', 'Tunisia': '🇹🇳', 'Sweden': '🇸🇪',
  'Belgium': '🇧🇪', 'Egypt': '🇪🇬', 'Iran': '🇮🇷',
  'New Zealand': '🇳🇿', 'Spain': '🇪🇸', 'Cape Verde': '🇨🇻',
  'Saudi Arabia': '🇸🇦', 'Uruguay': '🇺🇾', 'France': '🇫🇷',
  'Senegal': '🇸🇳', 'Norway': '🇳🇴', 'Iraq': '🇮🇶',
  'Argentina': '🇦🇷', 'Algeria': '🇩🇿', 'Austria': '🇦🇹',
  'Jordan': '🇯🇴', 'Portugal': '🇵🇹', 'Uzbekistan': '🇺🇿',
  'Colombia': '🇨🇴', 'Democratic Republic of the Congo': '🇨🇩',
  'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', 'Croatia': '🇭🇷', 'Ghana': '🇬🇭', 'Panama': '🇵🇦',
};

const markers = mockTeams
  .filter(t => TEAM_COORDS[t.name])
  .map(t => ({
    lat: TEAM_COORDS[t.name].lat,
    lng: TEAM_COORDS[t.name].lng,
    name: t.name,
    group: t.group,
    color: GROUP_COLORS[t.group] || '#f5c842',
    size: 0.5,
  }));

export default function WorldGlobe({ onCountryClick }: { onCountryClick?: (name: string) => void }) {
  const globeEl = useRef<any>(null);
  const [countries, setCountries] = useState<any[]>([]);
  const [hoveredCountry, setHoveredCountry] = useState<any>(null);

  // Fetch world GeoJSON on mount
  useEffect(() => {
    fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then(r => r.json())
      .then(data => setCountries(data.features || []))
      .catch(() => setCountries([]));
  }, []);

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.6;
      globeEl.current.controls().enableZoom = false;
      globeEl.current.pointOfView({ lat: 20, lng: -20, altitude: 2.2 }, 0);
    }
  }, []);

  const getStatKey = useCallback((feat: any) => {
    const name = feat?.properties?.name || '';
    return resolveStatKey(name);
  }, []);

  const polygonCapColor = useCallback((feat: any) => {
    const key = getStatKey(feat);
    if (!key) return 'rgba(255,255,255,0.02)';
    const stat = WC_STATS[key];
    const isHovered = hoveredCountry === feat;
    if (isHovered) return 'rgba(245,200,66,0.55)';
    const color = GROUP_COLORS[stat.group];
    // Parse hex color and return with transparency
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r},${g},${b},0.28)`;
  }, [hoveredCountry, getStatKey]);

  const polygonSideColor = useCallback((feat: any) => {
    const key = getStatKey(feat);
    if (!key) return 'rgba(255,255,255,0.0)';
    const isHovered = hoveredCountry === feat;
    if (isHovered) return 'rgba(245,200,66,0.4)';
    return 'rgba(255,255,255,0.05)';
  }, [hoveredCountry, getStatKey]);

  const polygonStrokeColor = useCallback((feat: any) => {
    const key = getStatKey(feat);
    if (!key) return 'rgba(255,255,255,0.04)';
    const isHovered = hoveredCountry === feat;
    if (isHovered) return '#f5c842';
    const stat = WC_STATS[key];
    return GROUP_COLORS[stat.group] + '80';
  }, [hoveredCountry, getStatKey]);

  const polygonLabel = useCallback((feat: any) => {
    const geoName = feat?.properties?.name || '';
    const key = resolveStatKey(geoName);
    if (!key) return '';
    const stat = WC_STATS[key];
    const flag = COUNTRY_FLAGS[key] || '';
    const groupColor = GROUP_COLORS[stat.group];

    const titlesRow = stat.titles > 0
      ? `<div style="display:flex;align-items:center;gap:6px;margin-bottom:5px">
           <span style="font-size:16px">🏆</span>
           <span style="color:#f5c842;font-weight:700;font-size:13px">${stat.titles}× World Champion</span>
         </div>
         <div style="font-size:10px;color:#aaa;margin-bottom:8px;padding-left:22px">${stat.titleYears}</div>`
      : '';

    return `
      <div style="
        background:rgba(8,12,20,0.95);
        border:1px solid ${groupColor};
        border-radius:12px;
        padding:14px 16px;
        font-family:Inter,sans-serif;
        min-width:220px;
        box-shadow:0 8px 32px rgba(0,0,0,0.6),0 0 20px ${groupColor}33;
      ">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
          <span style="font-size:22px">${flag}</span>
          <div>
            <div style="font-size:15px;font-weight:700;color:#fff;letter-spacing:0.03em">${stat.name}</div>
            <div style="
              font-size:9px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;
              color:${groupColor};margin-top:1px
            ">GROUP ${stat.group} · ${stat.confederation}</div>
          </div>
        </div>
        <div style="height:1px;background:${groupColor}33;margin-bottom:10px"></div>
        ${titlesRow}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
          <div style="background:rgba(255,255,255,0.05);border-radius:7px;padding:8px 10px;text-align:center">
            <div style="font-size:18px;font-weight:700;color:#fff">${stat.finals}</div>
            <div style="font-size:9px;color:#888;letter-spacing:0.1em;text-transform:uppercase;margin-top:2px">Finals</div>
          </div>
          <div style="background:rgba(255,255,255,0.05);border-radius:7px;padding:8px 10px;text-align:center">
            <div style="font-size:18px;font-weight:700;color:#fff">${stat.appearances}</div>
            <div style="font-size:9px;color:#888;letter-spacing:0.1em;text-transform:uppercase;margin-top:2px">Appearances</div>
          </div>
        </div>
        <div style="
          margin-top:8px;font-size:11px;color:#aaa;
          background:rgba(255,255,255,0.04);border-radius:6px;padding:7px 10px;
          line-height:1.4
        ">
          <span style="color:${groupColor};font-weight:600">Best: </span>${stat.bestResult}
        </div>
      </div>
    `;
  }, []);

  return (
    <Globe
      ref={globeEl}
      width={600}
      height={600}
      backgroundColor="rgba(0,0,0,0)"
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      atmosphereColor="#f5c842"
      atmosphereAltitude={0.15}
      // ── Country polygons ──────────────────────────────────────────────────
      polygonsData={countries}
      polygonCapColor={polygonCapColor}
      polygonSideColor={polygonSideColor}
      polygonStrokeColor={polygonStrokeColor}
      polygonAltitude={(feat: any) => hoveredCountry === feat ? 0.015 : 0.004}
      polygonLabel={polygonLabel}
      onPolygonHover={(feat: any) => setHoveredCountry(feat || null)}
      onPolygonClick={(feat: any) => {
        const key = resolveStatKey(feat?.properties?.name || '');
        if (key && onCountryClick) onCountryClick(key);
      }}
      polygonsTransitionDuration={200}
      // ── Team markers ─────────────────────────────────────────────────────
      pointsData={markers}
      pointLat="lat"
      pointLng="lng"
      pointColor="color"
      pointRadius="size"
      pointAltitude={0.02}
      pointLabel={(d: any) => `<div style="background:rgba(8,12,20,0.85);border:1px solid ${d.color};color:#fff;padding:5px 10px;border-radius:6px;font-family:Inter,sans-serif;font-size:12px;font-weight:600;white-space:nowrap">${d.name} <span style="color:${d.color};font-size:10px">GROUP ${d.group}</span></div>`}
    />
  );
}

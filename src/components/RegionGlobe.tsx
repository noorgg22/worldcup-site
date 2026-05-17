import { useEffect, useRef, useState, useCallback } from 'react';
import Globe from 'react-globe.gl';
import type { Region } from '../data/rosters';

const REGION_POV: Record<Region, { lat: number; lng: number; altitude: number }> = {
  'europe':        { lat: 54,  lng: 15,   altitude: 1.7 },
  'south-america': { lat: -15, lng: -58,  altitude: 1.7 },
  'north-america': { lat: 42,  lng: -100, altitude: 1.7 },
  'africa':        { lat: 5,   lng: 20,   altitude: 1.7 },
  'asia':          { lat: 35,  lng: 100,  altitude: 1.7 },
  'oceania':       { lat: -28, lng: 148,  altitude: 2.0 },
};

const COUNTRY_REGIONS: Record<string, Region> = {
  'Spain':'europe','France':'europe','England':'europe','Germany':'europe','Portugal':'europe',
  'Netherlands':'europe','Belgium':'europe','Switzerland':'europe','Croatia':'europe','Denmark':'europe',
  'Austria':'europe','Scotland':'europe','Serbia':'europe','Turkey':'europe','Poland':'europe',
  'Hungary':'europe','Sweden':'europe','Norway':'europe','Czechia':'europe',
  'Bosnia and Herzegovina':'europe','Bosnia & Herzegovina':'europe',
  'Argentina':'south-america','Brazil':'south-america','Uruguay':'south-america',
  'Colombia':'south-america','Ecuador':'south-america','Venezuela':'south-america','Paraguay':'south-america',
  'United States of America':'north-america','United States':'north-america','Canada':'north-america',
  'Mexico':'north-america','Panama':'north-america','Honduras':'north-america','Jamaica':'north-america',
  'Haiti':'north-america',"Curaçao":'north-america',
  'Morocco':'africa','Senegal':'africa','Egypt':'africa','Nigeria':'africa','Ghana':'africa',
  'Cameroon':'africa','South Africa':'africa','Tunisia':'africa','Democratic Republic of the Congo':'africa',
  'DR Congo':'africa',"Côte d'Ivoire":'africa','Algeria':'africa','Cape Verde':'africa','Cabo Verde':'africa',
  'Japan':'asia','Korea Republic':'asia','Australia':'asia','Iran':'asia','Saudi Arabia':'asia',
  'Iraq':'asia','Jordan':'asia','Uzbekistan':'asia','Qatar':'asia',
  'New Zealand':'oceania',
};

const REGION_COLOR: Record<Region, string> = {
  'europe':        '#4fc3f7',
  'south-america': '#66bb6a',
  'north-america': '#ffa726',
  'africa':        '#ef5350',
  'asia':          '#ab47bc',
  'oceania':       '#26c6da',
};

interface Props {
  activeRegion: Region;
  onCountryClick?: (country: string) => void;
  size?: number;
}

export default function RegionGlobe({ activeRegion, onCountryClick, size = 480 }: Props) {
  const globeEl      = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(size);
  const [countries, setCountries]   = useState<any[]>([]);
  const [hovered, setHovered]       = useState<any>(null);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setContainerW(containerRef.current.clientWidth);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
      .then(r => r.json()).then(d => setCountries(d.features || [])).catch(() => {});
  }, []);

  useEffect(() => {
    if (!globeEl.current) return;
    globeEl.current.controls().enableZoom   = false;
    globeEl.current.controls().autoRotate   = false;
    globeEl.current.pointOfView({ lat: 20, lng: -10, altitude: 2.0 }, 0);
  }, []);

  useEffect(() => {
    if (!globeEl.current) return;
    globeEl.current.pointOfView(REGION_POV[activeRegion], 900);
  }, [activeRegion]);

  const getName = useCallback((feat: any): string => feat?.properties?.name || '', []);
  const getRegion = useCallback((feat: any): Region | null => COUNTRY_REGIONS[getName(feat)] ?? null, [getName]);

  const capColor = useCallback((feat: any) => {
    const region = getRegion(feat);
    if (!region) return 'rgba(255,255,255,0.02)';
    const col = REGION_COLOR[region];
    const r = parseInt(col.slice(1,3),16), g = parseInt(col.slice(3,5),16), b = parseInt(col.slice(5,7),16);
    if (feat === hovered) return `rgba(${r},${g},${b},0.95)`;
    if (region === activeRegion) return `rgba(${r},${g},${b},0.65)`;
    return `rgba(${r},${g},${b},0.28)`;  // all WC nations always visible
  }, [activeRegion, hovered, getRegion]);

  const sideColor = useCallback((feat: any) => {
    const region = getRegion(feat);
    if (!region) return 'rgba(0,0,0,0)';
    return region === activeRegion ? `${REGION_COLOR[region]}66` : `${REGION_COLOR[region]}22`;
  }, [activeRegion, getRegion]);

  const strokeColor = useCallback((feat: any) => {
    const region = getRegion(feat);
    if (!region) return 'rgba(255,255,255,0.03)';
    return region === activeRegion ? REGION_COLOR[region] : `${REGION_COLOR[region]}30`;
  }, [activeRegion, getRegion]);

  const label = useCallback((feat: any) => {
    const name = getName(feat);
    const region = getRegion(feat);
    if (!region) return '';
    return `<div style="background:rgba(8,12,20,0.92);border:1px solid ${REGION_COLOR[region]};color:#fff;padding:8px 14px;border-radius:8px;font-family:Inter,sans-serif;font-size:13px;font-weight:600;white-space:nowrap">${name}</div>`;
  }, [getName, getRegion]);

  const globeSize = size ?? containerW;

  return (
    <div ref={containerRef} style={{ width: '100%', cursor: 'grab' }}>
      <Globe
        ref={globeEl}
        width={globeSize} height={globeSize}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        atmosphereColor={REGION_COLOR[activeRegion]}
        atmosphereAltitude={0.18}
        polygonsData={countries}
        polygonCapColor={capColor}
        polygonSideColor={sideColor}
        polygonStrokeColor={strokeColor}
        polygonAltitude={(feat: any) => feat === hovered ? 0.02 : getRegion(feat) === activeRegion ? 0.008 : 0.003}
        polygonLabel={label}
        polygonsTransitionDuration={300}
        onPolygonHover={(feat: any) => setHovered(feat || null)}
        onPolygonClick={(feat: any) => {
          const region = getRegion(feat);
          if (region && onCountryClick) onCountryClick(getName(feat));
        }}
      />
    </div>
  );
}

import { useState } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import RegionGlobe from '../components/RegionGlobe';
import type { Region, TeamRoster } from '../data/rosters';
import { ROSTERS, getRegionTeams, REGION_LABELS } from '../data/rosters';

const REGION_EMOJI: Record<Region, string> = {
  'europe': '🌍', 'south-america': '🌎', 'north-america': '🌎',
  'africa': '🌍', 'asia': '🌏', 'oceania': '🌏',
};

const CONF_COLOR: Record<string, string> = {
  UEFA: '#4fc3f7', CONMEBOL: '#66bb6a', CONCACAF: '#ffa726',
  CAF: '#ef5350', AFC: '#ab47bc', OFC: '#26c6da',
};

const REGIONS: Region[] = ['europe','south-america','north-america','africa','asia','oceania'];

// GeoJSON feature names → roster country names
const GEO_TO_ROSTER: Record<string, string> = {
  'United States of America': 'United States',
  'Democratic Republic of the Congo': 'DR Congo',
  'Turkey': 'Türkiye',
  'Bosnia and Herzegovina': 'Bosnia & Herzegovina',
  'Cape Verde': 'Cabo Verde',
  "Ivory Coast": "Côte d'Ivoire",
  'South Korea': 'Korea Republic',
  'Republic of Korea': 'Korea Republic',
};

interface Props { onTeamSelect: (team: TeamRoster) => void; }

function TeamCard({ team, onClick }: { team: TeamRoster; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 14, padding: '16px 18px', cursor: 'pointer',
        transition: 'all .2s ease', display: 'flex', flexDirection: 'column', gap: 10,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = `${CONF_COLOR[team.confederation]}55`;
        el.style.transform = 'translateY(-3px)';
        el.style.boxShadow = `0 8px 28px rgba(0,0,0,0.4)`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'var(--border)';
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = 'none';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 32, lineHeight: 1 }}>{team.flag}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--white)', lineHeight: 1.2 }}>{team.country}</div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>Group {team.group}</div>
        </div>
        <div style={{
          padding: '3px 8px', borderRadius: 6,
          background: `${CONF_COLOR[team.confederation]}18`,
          border: `1px solid ${CONF_COLOR[team.confederation]}40`,
          fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
          color: CONF_COLOR[team.confederation],
        }}>{team.confederation}</div>
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)', borderTop: '1px solid var(--border)', paddingTop: 10 }}>
        <span style={{ color: 'var(--text-dim)' }}>Coach: </span>
        <span>{team.coach.name}</span>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontSize: 11, color: `${CONF_COLOR[team.confederation]}`,
        fontWeight: 600,
      }}>
        <span>{team.players.length} players listed</span>
        <span>View Roster →</span>
      </div>
    </div>
  );
}

export default function RosterPage({ onTeamSelect }: Props) {
  const isMobile = useIsMobile();
  const [activeRegion, setActiveRegion] = useState<Region>('europe');
  const teams = getRegionTeams(activeRegion);

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Page hero */}
      <div className="page-hero">
        <div className="section-pill">⚽ World Cup 2026</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,6vw,72px)', color: 'var(--white)', lineHeight: 1, marginBottom: 10 }}>
          TEAM <span className="gold-text">ROSTERS</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, maxWidth: 480, margin: '0 auto' }}>
          Select a region to explore all {ROSTERS.length} confirmed squads, coaches, and player profiles.
        </p>
      </div>

      {/* Region tabs */}
      <div style={{
        display: 'flex', justifyContent: 'center', flexWrap: 'nowrap', gap: 6,
        padding: '24px 16px 0', maxWidth: 1100, margin: '0 auto', overflowX: 'auto',
      }}>
        {REGIONS.map(region => {
          const active = activeRegion === region;
          const count  = getRegionTeams(region).length;
          return (
            <button key={region} onClick={() => setActiveRegion(region)} style={{
              display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
              padding: '9px 14px', borderRadius: 100,
              background: active ? 'rgba(245,200,66,0.1)' : 'transparent',
              border: `1px solid ${active ? 'rgba(245,200,66,0.35)' : 'var(--border)'}`,
              color: active ? 'var(--gold)' : 'var(--text-muted)',
              fontSize: 12, fontWeight: 700, letterSpacing: '0.06em',
              cursor: 'pointer', transition: 'all .18s',
            }}>
              <span>{REGION_EMOJI[region]}</span>
              <span>{REGION_LABELS[region]}</span>
              <span style={{
                background: active ? 'rgba(245,200,66,0.2)' : 'rgba(255,255,255,0.06)',
                borderRadius: 100, padding: '1px 7px', fontSize: 10,
              }}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* Globe + Teams */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px 24px 80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: 32, alignItems: 'start',
        }}>
          {/* Globe */}
          <div style={{ position: isMobile ? 'relative' : 'sticky', top: 80 }}>
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 20, overflow: 'hidden', padding: 8,
            }}>
              <div style={{
                textAlign: 'center', padding: '12px 0 4px',
                fontFamily: 'var(--font-display)', fontSize: 14,
                color: 'var(--gold)', letterSpacing: '0.1em',
              }}>
                {REGION_EMOJI[activeRegion]} {REGION_LABELS[activeRegion].toUpperCase()}
              </div>
              <RegionGlobe
                activeRegion={activeRegion}
                size={isMobile ? Math.min(window.innerWidth - 64, 400) : 480}
                onCountryClick={geoName => {
                  const rosterName = GEO_TO_ROSTER[geoName] ?? geoName;
                  const team = ROSTERS.find(r => r.country === rosterName);
                  if (team) onTeamSelect(team);
                }}
              />
              <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-dim)', padding: '4px 0 10px', margin: 0 }}>
                Drag to rotate · Click a nation on the globe to view their roster
              </p>
            </div>
          </div>

          {/* Team cards */}
          <div>
            <div style={{ marginBottom: 16, display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--white)', margin: 0 }}>
                {REGION_LABELS[activeRegion].toUpperCase()}
              </h2>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{teams.length} nations</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 12 }}>
              {teams.map((team, i) => (
                <div key={team.country} style={{ animation: 'fadeUp 0.3s ease both', animationDelay: `${i * 0.06}s` }}>
                  <TeamCard team={team} onClick={() => onTeamSelect(team)} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

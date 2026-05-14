import { useEffect, useState, useRef, Component, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import {
  WC_YEARS, ROUND_LABEL, ROUND_SHORT, ROUND_COLOR,
  getProfile,
} from '../data/countryProfiles';
import { ALL_TIME_STANDINGS } from '../data/records';

interface Props { country: string; onClose: () => void; }

// ── Error boundary — prevents crashes from showing a black screen ─────────────
class ModalErrorBoundary extends Component<{ onClose: () => void; children: ReactNode }, { error: boolean }> {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  render() {
    if (this.state.error) {
      return createPortal(
        <div
          onClick={this.props.onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div style={{
            background: '#0b1018', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 16, padding: '40px 48px', textAlign: 'center', maxWidth: 360,
          }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🏳️</div>
            <div style={{ color: '#fff', fontWeight: 700, marginBottom: 8, fontSize: 16 }}>
              Profile unavailable
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24 }}>
              We couldn't load this country profile. Click anywhere to close.
            </div>
          </div>
        </div>,
        document.body
      );
    }
    return this.props.children;
  }
}

// ── Wikipedia pageimages API — specifically designed for article thumbnails ────
// Uses the MediaWiki action API with prop=pageimages which is more reliable
// than the REST summary endpoint for getting the main portrait photo.
// Only successful API results are cached. Network errors are NOT cached so
// re-opening the modal retries them.
const wikiCache: Record<string, string | null> = {};

function useWikiPhoto(name: string) {
  const [src, setSrc] = useState<string | null>(
    name in wikiCache ? wikiCache[name] : null
  );
  const didFetch = useRef(false);

  useEffect(() => {
    if (name in wikiCache) { setSrc(wikiCache[name]); return; }
    if (didFetch.current) return;
    didFetch.current = true;

    // MediaWiki pageimages API — purpose-built for fetching main article images.
    // origin=* enables CORS. pithumbsize=300 gives a portrait-quality resolution.
    // Parentheses and apostrophes must stay literal in the title parameter.
    const title = name.replace(/ /g, '_');
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=300&origin=*`;

    fetch(url)
      .then(r => r.json())
      .then((data: any) => {
        const pages = data?.query?.pages ?? {};
        const page: any = Object.values(pages)[0];
        // pageimages returns thumbnail.source for the main article image
        const imgUrl: string | null = page?.thumbnail?.source ?? null;
        wikiCache[name] = imgUrl;
        setSrc(imgUrl);
      })
      .catch(() => {
        // Network error — do NOT cache so the next modal open can retry.
        didFetch.current = false;
      });
  }, [name]);


  return src;
}

export default function CountryProfileModal({ country, onClose }: Props) {
  return (
    <ModalErrorBoundary onClose={onClose}>
      <CountryProfileInner country={country} onClose={onClose} />
    </ModalErrorBoundary>
  );
}

function CountryProfileInner({ country, onClose }: Props) {
  const [visible, setVisible] = useState(false);

  // Animate in
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  function close() {
    setVisible(false);
    setTimeout(onClose, 280);
  }

  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  });

  const profile = getProfile(country);

  // Map from WC_STATS / GeoJSON names → ALL_TIME_STANDINGS country field
  const STANDING_NAME_MAP: Record<string, string> = {
    // GeoJSON / WC_STATS key           → standings key
    'United States of America':           'USA',
    'United States':                      'USA',
    'Türkiye':                            'Turkey',
    "Côte d'Ivoire":                      'Ivory Coast',
    'Ivory Coast':                        'Ivory Coast',
    'Bosnia & Herzegovina':               'Bosnia & Herz.',
    'Bosnia and Herzegovina':             'Bosnia & Herz.',
    'Korea Republic':                     'South Korea',
    'South Korea':                        'South Korea',
    'DR Congo':                           'DR Congo',
    'Democratic Republic of the Congo':   'DR Congo',
    'North Korea':                        'North Korea',
    'Korea DPR':                          'North Korea',
    'Trinidad & Tobago':                  'Trinidad & Tobago',
    'Trinidad and Tobago':                'Trinidad & Tobago',
    'China':                              'China',
    "China PR":                           'China',
    'Iran':                               'Iran',
    'IR Iran':                            'Iran',
  };

  // Clean display names for the modal header
  const DISPLAY_NAME_MAP: Record<string, string> = {
    'United States of America': 'USA',
    'United States':            'USA',
    'Korea Republic':           'South Korea',
    'IR Iran':                  'Iran',
    "China PR":                 'China',
    'Korea DPR':                'North Korea',
    'Trinidad and Tobago':      'Trinidad & Tobago',
    'Bosnia and Herzegovina':   'Bosnia & Herzegovina',
    "Côte d'Ivoire":            "Côte d'Ivoire",
    'Democratic Republic of the Congo': 'DR Congo',
  };

  const standingKey = STANDING_NAME_MAP[country] ?? country;
  const standing = ALL_TIME_STANDINGS.find(s =>
    s.country === standingKey ||
    s.country === country ||
    s.country.toLowerCase() === country.toLowerCase()
  );

  // Fallback flag / color
  const flag  = profile?.flag ?? standing?.flag ?? '🏳️';
  const color = profile?.color ?? '#f5c842';
  const conf  = profile?.confederation ?? '';

  // Stats from standing (safe null handling — never use profile! non-null assertion)
  const historyValues = profile ? Object.values(profile.history).filter(v => v > 0) : [];
  const apps   = standing?.apps   ?? historyValues.length;
  const titles = standing?.titles ?? 0;
  const finals = standing?.finals ?? 0;
  const semis  = standing?.semis  ?? 0;
  const gp     = standing?.gp ?? 0;
  const w      = standing?.w  ?? 0;
  const d      = standing?.d  ?? 0;
  const l      = standing?.l  ?? 0;
  const gf     = standing?.gf ?? 0;
  const ga     = standing?.ga ?? 0;
  const gd     = gf - ga;
  const winPct = gp > 0 ? Math.round((w / gp) * 100) : 0;


  const history = profile?.history ?? {};

  return createPortal(
    <div
      onClick={e => { if (e.target === e.currentTarget) close(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end',
        opacity: visible ? 1 : 0, transition: 'opacity 0.28s ease',
      }}
    >
      {/* Panel */}
      <div style={{
        width: 'min(700px, 95vw)',
        height: '100vh',
        background: '#06090f',
        borderLeft: `1px solid rgba(255,255,255,0.08)`,
        overflowY: 'auto',
        transform: visible ? 'translateX(0)' : 'translateX(60px)',
        transition: 'transform 0.28s cubic-bezier(0.22,1,0.36,1)',
        display: 'flex', flexDirection: 'column',
      }}>

        {/* ── HERO HEADER ─────────────────────────────────────── */}
        <div style={{
          position: 'relative',
          background: `linear-gradient(135deg, ${color}18 0%, transparent 60%)`,
          borderBottom: `1px solid ${color}25`,
          padding: '40px 36px 32px',
          flexShrink: 0,
        }}>
          {/* Close */}
          <button
            onClick={close}
            style={{
              position: 'absolute', top: 20, right: 20,
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--text-muted)', borderRadius: '50%',
              width: 36, height: 36, fontSize: 18, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)';
              (e.currentTarget as HTMLButtonElement).style.color = '#fff';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.07)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
            }}
          >
            ✕
          </button>

          {/* Flag + Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
            <span style={{ fontSize: 64, lineHeight: 1, filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}>{flag}</span>
            <div>
              <div style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,5vw,44px)',
                color: '#fff', letterSpacing: '0.08em', lineHeight: 1, marginBottom: 6,
              }}>
                {(DISPLAY_NAME_MAP[country] ?? country).toUpperCase()}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {conf && (
                  <span style={{
                    background: `${color}20`, border: `1px solid ${color}40`,
                    color, fontSize: 10, fontWeight: 700, letterSpacing: '0.14em',
                    textTransform: 'uppercase', padding: '3px 10px', borderRadius: 100,
                  }}>{conf}</span>
                )}
                {titles > 0 && (
                  <span style={{ fontSize: 13, color: '#f5c842', fontWeight: 700 }}>
                    {'🏆'.repeat(Math.min(titles, 5))} {titles}× World Champion
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10 }}>
            {[
              { label: 'Appearances', value: apps },
              { label: 'Titles', value: titles, gold: titles > 0 },
              { label: 'Finals', value: finals },
              { label: 'Semi-Finals', value: semis },
              { label: 'Win Rate', value: `${winPct}%`, gold: winPct >= 50 },
            ].map(s => (
              <div key={s.label} style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 10, padding: '12px 8px', textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 26, lineHeight: 1, marginBottom: 4,
                  color: s.gold ? '#f5c842' : '#fff',
                }}>{s.value}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SCROLLABLE BODY ──────────────────────────────────── */}
        <div style={{ padding: '0 36px 60px', display: 'flex', flexDirection: 'column', gap: 36 }}>

          {/* ── PERFORMANCE CHART ─────────────────────────────── */}
          <Section title="World Cup Journey" color={color}>
            <PerformanceChart history={history} color={color} />
          </Section>

          {/* ── ALL-TIME RECORD ───────────────────────────────── */}
          {gp > 0 && (
            <Section title="All-Time Record" color={color}>
              <RecordStats w={w} d={d} l={l} gf={gf} ga={ga} gd={gd} gp={gp} />
            </Section>
          )}

          {/* ── TOURNAMENT HISTORY TABLE ──────────────────────── */}
          {Object.keys(history).length > 0 && (
            <Section title="Tournament History" color={color}>
              <HistoryTable history={history} country={country} />
            </Section>
          )}

          {/* ── LEGENDARY PLAYERS ────────────────────────────── */}
          {profile?.legends && profile.legends.length > 0 && (
            <Section title="Legendary Players" color={color}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {profile.legends.map((l, i) => (
                  <LegendCard key={i} legend={l} color={color} rank={i + 1} />
                ))}
              </div>
            </Section>
          )}

          {/* ── FACTS ─────────────────────────────────────────── */}
          {profile?.facts && profile.facts.length > 0 && (
            <Section title="Did You Know?" color={color}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {profile.facts.map((f, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: 14, alignItems: 'flex-start',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 10, padding: '14px 16px',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1,
                      color, flexShrink: 0, minWidth: 28, textAlign: 'center',
                    }}>{i + 1}</span>
                    <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.65, margin: 0 }}>{f}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* Fallback if no profile */}
          {!profile && (
            <div style={{
              textAlign: 'center', color: 'var(--text-muted)',
              fontSize: 14, padding: '40px 0',
            }}>
              Detailed profile coming soon for {country}.
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

// ── Section wrapper ────────────────────────────────────────────────────────────
function Section({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div style={{ paddingTop: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <div style={{ width: 3, height: 18, background: color, borderRadius: 2, flexShrink: 0 }} />
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: 18, color: '#fff',
          letterSpacing: '0.1em', margin: 0,
        }}>{title.toUpperCase()}</h3>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
      </div>
      {children}
    </div>
  );
}

// ── Performance Chart (SVG) ───────────────────────────────────────────────────
function PerformanceChart({ history, color: _color }: { history: Partial<Record<number, number>>; color: string }) {
  const BAR_W = 22;
  const GAP   = 7;
  const MAX_H = 90;
  const CHART_W = WC_YEARS.length * (BAR_W + GAP);
  const CHART_H = MAX_H + 40; // + label row

  const roundColors: Record<number, string> = {
    0: 'rgba(255,255,255,0.04)',
    1: '#2a3650',
    2: '#1565c0',
    3: '#00838f',
    4: '#e65100',
    5: '#9e9e9e',
    6: '#f5c842',
  };

  return (
    <div style={{ overflowX: 'auto', overflowY: 'visible' }}>
      {/* Legend */}
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 14 }}>
        {[1,2,3,4,5,6].map(r => (
          <div key={r} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: roundColors[r] }} />
            <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>
              {ROUND_SHORT[r]}
            </span>
          </div>
        ))}
      </div>

      <svg
        viewBox={`0 0 ${CHART_W} ${CHART_H}`}
        width={CHART_W}
        height={CHART_H}
        style={{ display: 'block', overflow: 'visible' }}
      >
        {WC_YEARS.map((year, i) => {
          const round = history[year] ?? 0;
          const barH  = round === 0 ? 4 : (round / 6) * MAX_H;
          const x = i * (BAR_W + GAP);
          const y = MAX_H - barH;
          const barColor = round === 0 ? 'rgba(255,255,255,0.05)' : roundColors[round];
          const isChamp = round === 6;
          const shortYear = String(year).slice(2);

          return (
            <g key={year}>
              {/* Bar */}
              <rect
                x={x} y={y}
                width={BAR_W} height={barH}
                fill={barColor}
                rx={3}
                style={{ transition: 'all 0.2s' }}
              />
              {/* Champion star */}
              {isChamp && (
                <text
                  x={x + BAR_W / 2} y={y - 5}
                  textAnchor="middle" fontSize={10} fill="#f5c842"
                >★</text>
              )}
              {/* Year label */}
              <text
                x={x + BAR_W / 2} y={MAX_H + 18}
                textAnchor="middle" fontSize={8}
                fill={round > 0 ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.18)'}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {shortYear}
              </text>
              {/* Round label inside bar for medium+ bars */}
              {round >= 2 && barH > 20 && (
                <text
                  x={x + BAR_W / 2} y={y + barH - 5}
                  textAnchor="middle" fontSize={7}
                  fill="rgba(255,255,255,0.7)"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700 }}
                >
                  {ROUND_SHORT[round]}
                </text>
              )}
            </g>
          );
        })}
        {/* Baseline */}
        <line x1={0} y1={MAX_H} x2={CHART_W} y2={MAX_H} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
      </svg>
    </div>
  );
}

// ── All-Time Record Stats ─────────────────────────────────────────────────────
function RecordStats({ w, d, l, gf, ga, gd, gp }: {
  w: number; d: number; l: number; gf: number; ga: number; gd: number; gp: number;
}) {
  const total = w + d + l || 1;
  const wPct  = (w / total) * 100;
  const dPct  = (d / total) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* W/D/L bar */}
      <div>
        <div style={{ display: 'flex', gap: 0, borderRadius: 6, overflow: 'hidden', height: 10, marginBottom: 10 }}>
          <div style={{ width: `${wPct}%`, background: '#66bb6a', transition: 'width 0.5s' }} />
          <div style={{ width: `${dPct}%`, background: '#ffb74d', transition: 'width 0.5s' }} />
          <div style={{ flex: 1, background: '#ef5350' }} />
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          <Stat label="Won" value={w} color="#66bb6a" />
          <Stat label="Drawn" value={d} color="#ffb74d" />
          <Stat label="Lost" value={l} color="#ef5350" />
          <Stat label="Played" value={gp} />
        </div>
      </div>

      {/* Goals + averages */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10 }}>
        {[
          { label: 'Goals Scored', value: gf, color: '#66bb6a' },
          { label: 'Goals Conceded', value: ga, color: '#ef5350' },
          { label: 'Goal Diff', value: gd >= 0 ? `+${gd}` : gd, color: gd > 0 ? '#66bb6a' : gd < 0 ? '#ef5350' : undefined },
          { label: 'Goals / Game', value: gp > 0 ? (gf / gp).toFixed(2) : '—', color: '#f5c842' },
        ].map(s => (
          <div key={s.label} style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 10, padding: '12px 14px', textAlign: 'center',
          }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 24, lineHeight: 1,
              color: (s.color as string | undefined) ?? '#fff', marginBottom: 4,
            }}>{s.value}</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: number | string; color?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {color && <div style={{ width: 8, height: 8, borderRadius: 2, background: color, flexShrink: 0 }} />}
      <span style={{ fontSize: 13, fontWeight: 700, color: color ?? '#fff' }}>{value}</span>
      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{label}</span>
    </div>
  );
}

// ── Tournament History Table ──────────────────────────────────────────────────
function HistoryTable({ history }: { history: Partial<Record<number, number>>; country: string }) {
  const entries = WC_YEARS.filter(y => (history[y] ?? 0) > 0)
    .map(y => ({ year: y, round: history[y]! }))
    .reverse(); // newest first

  return (
    <div style={{ borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
      {/* Header */}
      <div style={{
        display: 'grid', gridTemplateColumns: '70px 1fr 90px',
        padding: '9px 16px',
        background: 'rgba(255,255,255,0.04)',
        fontSize: 10, color: 'var(--text-muted)',
        letterSpacing: '0.12em', textTransform: 'uppercase',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <span>Year</span>
        <span>Result</span>
        <span style={{ textAlign: 'right' }}>Round</span>
      </div>
      {entries.map(({ year, round }, i) => {
        const rc = ROUND_COLOR[round];
        const isChamp = round === 6;
        const isF = round === 5;
        return (
          <div key={year} style={{
            display: 'grid', gridTemplateColumns: '70px 1fr 90px',
            padding: '10px 16px', alignItems: 'center',
            borderTop: i > 0 ? '1px solid rgba(255,255,255,0.04)' : undefined,
            background: isChamp ? 'rgba(245,200,66,0.05)' : isF ? 'rgba(255,255,255,0.02)' : 'transparent',
          }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, color: isChamp ? '#f5c842' : '#fff' }}>
              {year}
            </span>
            <span style={{ fontSize: 13, color: 'var(--text)' }}>
              {isChamp && '🏆 '}{ROUND_LABEL[round]}
            </span>
            <span style={{
              textAlign: 'right',
              background: `${rc}33`,
              color: rc === 'rgba(255,255,255,0.04)' ? 'var(--text-muted)' : rc,
              border: `1px solid ${rc}55`,
              fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
              padding: '3px 8px', borderRadius: 6, display: 'inline-block',
              marginLeft: 'auto',
            }}>
              {ROUND_SHORT[round]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ── Legend Card ───────────────────────────────────────────────────────────────
function LegendCard({ legend, color, rank }: {
  legend: { name: string; wikiName?: string; years: string; pos: string; note: string };
  color: string; rank: number;
}) {
  const wikiTitle = legend.wikiName ?? legend.name;
  const photo = useWikiPhoto(wikiTitle);
  // Track whether the <img> element itself fails to load (broken URL, CORS, etc.)
  const [imgFailed, setImgFailed] = useState(false);

  // Reset on photo URL change (new fetch result)
  useEffect(() => { setImgFailed(false); }, [photo]);

  const showPhoto = photo && !imgFailed;

  // Initials fallback
  const initials = legend.name
    .split(' ')
    .filter(w => w.length > 0)
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 12, padding: '14px 16px',
      transition: 'border-color 0.18s, background 0.18s',
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${color}40`;
        (e.currentTarget as HTMLDivElement).style.background = `${color}07`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)';
        (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)';
      }}
    >
      {/* Photo avatar */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          overflow: 'hidden',
          border: `2px solid ${color}50`,
          background: showPhoto ? 'transparent' : `${color}18`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {showPhoto ? (
            <img
              src={photo}
              alt={legend.name}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'top center',
                display: 'block',
              }}
              onError={() => setImgFailed(true)}
            />
          ) : (
            <span style={{
              fontFamily: 'var(--font-display)', fontSize: 18,
              color, letterSpacing: '0.05em',
            }}>{initials}</span>
          )}
        </div>
        {/* Rank badge */}
        <div style={{
          position: 'absolute', bottom: -2, right: -2,
          width: 20, height: 20, borderRadius: '50%',
          background: color, color: '#06090f',
          fontSize: 10, fontWeight: 900,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '2px solid #06090f',
          fontFamily: 'var(--font-body)',
        }}>
          {rank}
        </div>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 5 }}>
          <span style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>{legend.name}</span>
          <span style={{
            fontSize: 10, color, fontWeight: 700,
            background: `${color}18`, border: `1px solid ${color}35`,
            padding: '2px 8px', borderRadius: 100,
          }}>{legend.pos}</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{legend.years}</span>
        </div>
        <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, margin: 0 }}>{legend.note}</p>
      </div>
    </div>
  );
}

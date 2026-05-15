import { useState, useEffect } from 'react';
import { GROUP_COLORS } from '../data/wcStats';
import { useIsMobile } from '../hooks/useIsMobile';

// ── Storage ───────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'wc2026_predictions';

interface Predictions {
  champion: string | null;
  goldenBoot: string | null;
  darkHorse: string | null;
}

function loadPredictions(): Predictions {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { champion: null, goldenBoot: null, darkHorse: null };
  } catch {
    return { champion: null, goldenBoot: null, darkHorse: null };
  }
}

function savePredictions(p: Predictions) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

// ── Community vote data (simulated) ──────────────────────────────────────────
interface VoteSlice { name: string; pct: number; color: string; flag?: string }

const CHAMPION_VOTES: VoteSlice[] = [
  { name: 'Brazil',      pct: 21, color: '#16a34a', flag: '🇧🇷' },
  { name: 'France',      pct: 18, color: '#2563eb', flag: '🇫🇷' },
  { name: 'Argentina',   pct: 17, color: '#7c3aed', flag: '🇦🇷' },
  { name: 'England',     pct: 12, color: '#dc2626', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { name: 'Germany',     pct:  9, color: '#4b5563', flag: '🇩🇪' },
  { name: 'Spain',       pct:  8, color: '#ea580c', flag: '🇪🇸' },
  { name: 'Portugal',    pct:  7, color: '#b91c1c', flag: '🇵🇹' },
  { name: 'Others',      pct:  8, color: '#374151' },
];

const BOOT_VOTES: VoteSlice[] = [
  { name: 'Erling Haaland',  pct: 24, color: '#0ea5e9', flag: '🇳🇴' },
  { name: 'Kylian Mbappé',   pct: 21, color: '#1d4ed8', flag: '🇫🇷' },
  { name: 'Lionel Messi',    pct: 16, color: '#7c3aed', flag: '🇦🇷' },
  { name: 'Vinicius Jr.',    pct: 13, color: '#16a34a', flag: '🇧🇷' },
  { name: 'Harry Kane',      pct:  9, color: '#dc2626', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { name: 'Jude Bellingham', pct:  7, color: '#b45309', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { name: 'Others',          pct: 10, color: '#374151' },
];

const HORSE_VOTES: VoteSlice[] = [
  { name: 'Norway',         pct: 19, color: '#0ea5e9', flag: '🇳🇴' },
  { name: 'Morocco',        pct: 17, color: '#16a34a', flag: '🇲🇦' },
  { name: 'United States',  pct: 15, color: '#dc2626', flag: '🇺🇸' },
  { name: 'Japan',          pct: 13, color: '#b91c1c', flag: '🇯🇵' },
  { name: 'Belgium',        pct: 10, color: '#d97706', flag: '🇧🇪' },
  { name: 'Croatia',        pct:  8, color: '#7c3aed', flag: '🇭🇷' },
  { name: 'Colombia',       pct:  7, color: '#d4a017', flag: '🇨🇴' },
  { name: 'Others',         pct: 11, color: '#374151' },
];

// ── Pie chart helpers ─────────────────────────────────────────────────────────
function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg - 90) * Math.PI / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function donutSlicePath(
  cx: number, cy: number,
  outerR: number, innerR: number,
  startAngle: number, endAngle: number,
): string {
  const outerStart = polarToCartesian(cx, cy, outerR, startAngle);
  const outerEnd   = polarToCartesian(cx, cy, outerR, endAngle);
  const innerStart = polarToCartesian(cx, cy, innerR, startAngle);
  const innerEnd   = polarToCartesian(cx, cy, innerR, endAngle);
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${large} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerR} ${innerR} 0 ${large} 0 ${innerStart.x} ${innerStart.y}`,
    'Z',
  ].join(' ');
}

function PieChart({ data, userPick, size }: { data: VoteSlice[]; userPick: string; size: number }) {
  const cx = size / 2, cy = size / 2;
  const outerR = size * 0.42;
  const innerR = size * 0.24;

  // Build slices
  let angle = 0;
  const slices = data.map(d => {
    const deg = (d.pct / 100) * 360;
    const s = { ...d, startAngle: angle, endAngle: angle + deg };
    angle += deg;
    return s;
  });

  const userSlice = slices.find(s => s.name === userPick);
  const userPct = userSlice?.pct ?? 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {/* Chart */}
      <svg width={size} height={size} style={{ overflow: 'visible' }}>
        {slices.map((s, i) => {
          const isUser = s.name === userPick;
          const r = isUser ? outerR + 6 : outerR;
          return (
            <path
              key={i}
              d={donutSlicePath(cx, cy, r, innerR, s.startAngle, s.endAngle)}
              fill={s.color}
              opacity={isUser ? 1 : 0.65}
              stroke={isUser ? '#f5c842' : 'rgba(6,9,15,0.6)'}
              strokeWidth={isUser ? 2 : 1}
            />
          );
        })}
        {/* Center */}
        <text x={cx} y={cy - 10} textAnchor="middle" fill="#ffffff" fontSize={size * 0.12} fontWeight={700} fontFamily="var(--font-display)">
          {userPct}%
        </text>
        <text x={cx} y={cy + 8} textAnchor="middle" fill="#888888" fontSize={size * 0.06} fontFamily="var(--font-body)">
          YOUR PICK
        </text>
      </svg>

      {/* Legend */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {data.map((d, i) => {
          const isUser = d.name === userPick;
          return (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: isUser ? 'rgba(245,200,66,0.07)' : 'transparent',
              border: isUser ? '1px solid rgba(245,200,66,0.2)' : '1px solid transparent',
              borderRadius: 8, padding: '6px 10px',
            }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: isUser ? 'var(--white)' : 'var(--text-muted)', flex: 1, fontWeight: isUser ? 700 : 400 }}>
                {d.flag ? `${d.flag} ` : ''}{d.name}
                {isUser && <span style={{ fontSize: 10, color: 'var(--gold)', marginLeft: 6 }}>← Your pick</span>}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 60, height: 5, borderRadius: 3,
                  background: 'var(--border)', overflow: 'hidden',
                }}>
                  <div style={{ width: `${d.pct}%`, height: '100%', background: d.color, borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 11, color: isUser ? 'var(--gold)' : 'var(--text-muted)', fontWeight: isUser ? 700 : 400, minWidth: 28, textAlign: 'right' }}>
                  {d.pct}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ fontSize: 10, color: 'var(--text-muted)', textAlign: 'center' }}>
        Based on 12,847 fan predictions worldwide
      </div>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const GROUPS: Record<string, { name: string; flag: string }[]> = {
  A: [
    { name: 'Mexico',         flag: '🇲🇽' },
    { name: 'South Africa',   flag: '🇿🇦' },
    { name: 'Korea Republic', flag: '🇰🇷' },
    { name: 'Czechia',        flag: '🇨🇿' },
  ],
  B: [
    { name: 'Canada',               flag: '🇨🇦' },
    { name: 'Switzerland',          flag: '🇨🇭' },
    { name: 'Qatar',                flag: '🇶🇦' },
    { name: 'Bosnia & Herzegovina', flag: '🇧🇦' },
  ],
  C: [
    { name: 'Brazil',   flag: '🇧🇷' },
    { name: 'Morocco',  flag: '🇲🇦' },
    { name: 'Haiti',    flag: '🇭🇹' },
    { name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  ],
  D: [
    { name: 'United States', flag: '🇺🇸' },
    { name: 'Paraguay',      flag: '🇵🇾' },
    { name: 'Australia',     flag: '🇦🇺' },
    { name: 'Türkiye',       flag: '🇹🇷' },
  ],
  E: [
    { name: 'Germany',        flag: '🇩🇪' },
    { name: 'Curaçao',        flag: '🇨🇼' },
    { name: "Côte d'Ivoire",  flag: '🇨🇮' },
    { name: 'Ecuador',        flag: '🇪🇨' },
  ],
  F: [
    { name: 'Netherlands', flag: '🇳🇱' },
    { name: 'Japan',       flag: '🇯🇵' },
    { name: 'Tunisia',     flag: '🇹🇳' },
    { name: 'Sweden',      flag: '🇸🇪' },
  ],
  G: [
    { name: 'Belgium',     flag: '🇧🇪' },
    { name: 'Egypt',       flag: '🇪🇬' },
    { name: 'Iran',        flag: '🇮🇷' },
    { name: 'New Zealand', flag: '🇳🇿' },
  ],
  H: [
    { name: 'Spain',        flag: '🇪🇸' },
    { name: 'Cabo Verde',   flag: '🇨🇻' },
    { name: 'Saudi Arabia', flag: '🇸🇦' },
    { name: 'Uruguay',      flag: '🇺🇾' },
  ],
  I: [
    { name: 'France',  flag: '🇫🇷' },
    { name: 'Senegal', flag: '🇸🇳' },
    { name: 'Norway',  flag: '🇳🇴' },
    { name: 'Iraq',    flag: '🇮🇶' },
  ],
  J: [
    { name: 'Argentina', flag: '🇦🇷' },
    { name: 'Algeria',   flag: '🇩🇿' },
    { name: 'Austria',   flag: '🇦🇹' },
    { name: 'Jordan',    flag: '🇯🇴' },
  ],
  K: [
    { name: 'Portugal',   flag: '🇵🇹' },
    { name: 'Uzbekistan', flag: '🇺🇿' },
    { name: 'Colombia',   flag: '🇨🇴' },
    { name: 'DR Congo',   flag: '🇨🇩' },
  ],
  L: [
    { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { name: 'Croatia', flag: '🇭🇷' },
    { name: 'Ghana',   flag: '🇬🇭' },
    { name: 'Panama',  flag: '🇵🇦' },
  ],
};

const FAVOURITES = ['Brazil', 'France', 'Argentina', 'Germany', 'Spain', 'England', 'Portugal', 'Netherlands'];

const DARK_HORSES = [
  { name: 'Morocco',        flag: '🇲🇦', reason: '2022 semi-finalists — Africa\'s giant killers' },
  { name: 'United States',  flag: '🇺🇸', reason: 'Home advantage across 11 stadiums' },
  { name: 'Belgium',        flag: '🇧🇪', reason: 'Golden generation\'s last dance' },
  { name: 'Uruguay',        flag: '🇺🇾', reason: '2× champions — never count them out' },
  { name: 'Japan',          flag: '🇯🇵', reason: 'Shock wins over Germany & Spain in 2022' },
  { name: 'Croatia',        flag: '🇭🇷', reason: '2018 runners-up, always punch above weight' },
  { name: 'Colombia',       flag: '🇨🇴', reason: 'New golden generation led by Díaz & Arias' },
  { name: 'Korea Republic', flag: '🇰🇷', reason: '2002 semi-finalists — can do it again' },
  { name: 'Senegal',        flag: '🇸🇳', reason: 'Africa Cup champions with world-class talent' },
  { name: 'Mexico',         flag: '🇲🇽', reason: 'Co-hosts with a point to prove on home soil' },
  { name: 'Canada',         flag: '🇨🇦', reason: 'Rising force — co-hosts with home crowd behind them' },
  { name: 'Norway',         flag: '🇳🇴', reason: 'Haaland & company — could be their tournament' },
];

const GOLDEN_BOOT_CANDIDATES = [
  { name: 'Kylian Mbappé',    flag: '🇫🇷', team: 'France',    club: 'Real Madrid' },
  { name: 'Vinicius Jr.',     flag: '🇧🇷', team: 'Brazil',    club: 'Real Madrid' },
  { name: 'Lionel Messi',     flag: '🇦🇷', team: 'Argentina', club: 'Inter Miami' },
  { name: 'Erling Haaland',   flag: '🇳🇴', team: 'Norway',    club: 'Man City' },
  { name: 'Harry Kane',       flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', team: 'England',   club: 'Bayern Munich' },
  { name: 'Jude Bellingham',  flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', team: 'England',   club: 'Real Madrid' },
  { name: 'Lamine Yamal',     flag: '🇪🇸', team: 'Spain',     club: 'Barcelona' },
  { name: 'Florian Wirtz',    flag: '🇩🇪', team: 'Germany',   club: 'Bayern Munich' },
  { name: 'Jamal Musiala',    flag: '🇩🇪', team: 'Germany',   club: 'Bayern Munich' },
  { name: 'Pedri',            flag: '🇪🇸', team: 'Spain',     club: 'Barcelona' },
  { name: 'Bukayo Saka',      flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', team: 'England',   club: 'Arsenal' },
  { name: 'Rodrygo',          flag: '🇧🇷', team: 'Brazil',    club: 'Real Madrid' },
  { name: 'Darwin Núñez',     flag: '🇺🇾', team: 'Uruguay',   club: 'Liverpool' },
  { name: 'Rafael Leão',      flag: '🇵🇹', team: 'Portugal',  club: 'AC Milan' },
  { name: 'Dušan Vlahović',   flag: '🇷🇸', team: 'Serbia',    club: 'Juventus' },
  { name: 'Ousmane Dembélé',  flag: '🇫🇷', team: 'France',    club: 'PSG' },
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function PredictionsPage() {
  const isMobile = useIsMobile();
  const [preds, setPreds] = useState<Predictions>(loadPredictions);
  const [championStage, setChampionStage] = useState<'pick' | 'done'>(
    () => loadPredictions().champion ? 'done' : 'pick'
  );
  const [bootStage, setBootStage] = useState<'pick' | 'done'>(
    () => loadPredictions().goldenBoot ? 'done' : 'pick'
  );
  const [horseStage, setHorseStage] = useState<'pick' | 'done'>(
    () => loadPredictions().darkHorse ? 'done' : 'pick'
  );

  const [pendingChampion, setPendingChampion] = useState<string | null>(null);
  const [pendingBoot, setPendingBoot]         = useState<string | null>(null);
  const [pendingHorse, setPendingHorse]       = useState<string | null>(null);

  useEffect(() => { savePredictions(preds); }, [preds]);

  function confirmChampion() {
    if (!pendingChampion) return;
    setPreds(p => ({ ...p, champion: pendingChampion }));
    setChampionStage('done');
    setPendingChampion(null);
  }
  function confirmBoot() {
    if (!pendingBoot) return;
    setPreds(p => ({ ...p, goldenBoot: pendingBoot }));
    setBootStage('done');
    setPendingBoot(null);
  }
  function confirmHorse() {
    if (!pendingHorse) return;
    setPreds(p => ({ ...p, darkHorse: pendingHorse }));
    setHorseStage('done');
    setPendingHorse(null);
  }

  function resetChampion() { setPreds(p => ({ ...p, champion: null })); setChampionStage('pick'); }
  function resetBoot()     { setPreds(p => ({ ...p, goldenBoot: null })); setBootStage('pick'); }
  function resetHorse()    { setPreds(p => ({ ...p, darkHorse: null })); setHorseStage('pick'); }

  const allLocked = preds.champion && preds.goldenBoot && preds.darkHorse;
  const pieSize = isMobile ? 180 : 220;

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: isMobile ? '28px 16px 80px' : '40px 24px 100px' }}>

        {/* ── Header ─────────────────────────────────────────────── */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14,
            background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.2)',
            borderRadius: 100, padding: '5px 14px',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f5c842', display: 'inline-block' }} />
            <span style={{ fontSize: 10, color: 'var(--gold)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>
              Your Predictions · Saved Locally
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 40 : 'clamp(40px,6vw,72px)', color: 'var(--white)', lineHeight: 1, marginBottom: 10 }}>
            PREDICTIONS
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, maxWidth: 560 }}>
            Lock in your calls before the tournament starts. Your picks are saved to this device — come back and see how you did.
          </p>
        </div>

        {/* ── All locked summary ─────────────────────────────────── */}
        {allLocked && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(245,200,66,0.1) 0%, rgba(245,200,66,0.04) 100%)',
            border: '1px solid rgba(245,200,66,0.35)',
            borderRadius: 20, padding: isMobile ? '20px 16px' : '28px 32px', marginBottom: 48,
          }}>
            <div style={{ fontSize: 10, color: 'var(--gold)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 20 }}>
              Your 2026 World Cup Predictions
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 12 }}>
              {[
                { label: 'Tournament Winner', value: preds.champion!, icon: '🏆' },
                { label: 'Golden Boot',        value: preds.goldenBoot!, icon: '👟' },
                { label: 'Dark Horse',         value: preds.darkHorse!, icon: '🐎' },
              ].map(item => (
                <div key={item.label} style={{
                  background: 'rgba(255,255,255,0.04)', borderRadius: 12,
                  padding: '18px 20px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--white)', marginBottom: 4 }}>{item.value}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 1. TOURNAMENT CHAMPION ─────────────────────────────── */}
        <PredictionCard
          number={1}
          title="Who Lifts the Trophy?"
          subtitle="Pick the 2026 World Cup champion from all 48 qualified nations"
          icon="🏆"
          locked={championStage === 'done'}
          lockedValue={preds.champion}
          onReset={resetChampion}
          chartNode={preds.champion ? (
            <PieChart data={CHAMPION_VOTES} userPick={preds.champion} size={pieSize} />
          ) : null}
        >
          {championStage === 'pick' && (
            <div>
              {Object.entries(GROUPS).map(([grp, teams]) => {
                const gc = GROUP_COLORS[grp];
                return (
                  <div key={grp} style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 10, color: gc, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 }}>
                      Group {grp}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 8 }}>
                      {teams.map(t => {
                        const selected = pendingChampion === t.name;
                        const isFav = FAVOURITES.includes(t.name);
                        return (
                          <button
                            key={t.name}
                            onClick={() => setPendingChampion(selected ? null : t.name)}
                            style={{
                              background: selected ? `${gc}20` : 'var(--bg-card)',
                              border: selected ? `2px solid ${gc}` : '1px solid var(--border)',
                              borderRadius: 12, padding: '12px 8px',
                              cursor: 'pointer', textAlign: 'center',
                              transition: 'all 0.15s', position: 'relative',
                            }}
                          >
                            {isFav && (
                              <div style={{
                                position: 'absolute', top: 4, right: 6,
                                fontSize: 8, color: '#f5c842', fontWeight: 700,
                                letterSpacing: '0.08em',
                              }}>★</div>
                            )}
                            <div style={{ fontSize: 26, lineHeight: 1, marginBottom: 6 }}>{t.flag}</div>
                            <div style={{ fontSize: 10, color: selected ? 'var(--white)' : 'var(--text-muted)', fontWeight: 600, lineHeight: 1.3 }}>
                              {t.name}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>★ Recognised title favourite</span>
                <div style={{ flex: 1 }} />
                {pendingChampion && (
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    Selected: <strong style={{ color: 'var(--white)' }}>{pendingChampion}</strong>
                  </div>
                )}
                <button
                  onClick={confirmChampion}
                  disabled={!pendingChampion}
                  style={{
                    background: pendingChampion ? 'rgba(245,200,66,0.15)' : 'rgba(255,255,255,0.04)',
                    border: pendingChampion ? '1px solid rgba(245,200,66,0.4)' : '1px solid var(--border)',
                    color: pendingChampion ? 'var(--gold)' : 'var(--text-muted)',
                    fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 13,
                    padding: '10px 28px', borderRadius: 10, cursor: pendingChampion ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                  }}
                >
                  Lock In Pick →
                </button>
              </div>
            </div>
          )}
        </PredictionCard>

        {/* ── 2. GOLDEN BOOT ─────────────────────────────────────── */}
        <PredictionCard
          number={2}
          title="Golden Boot Winner"
          subtitle="Who finishes as the tournament's top scorer?"
          icon="👟"
          locked={bootStage === 'done'}
          lockedValue={preds.goldenBoot}
          onReset={resetBoot}
          chartNode={preds.goldenBoot ? (
            <PieChart data={BOOT_VOTES} userPick={preds.goldenBoot} size={pieSize} />
          ) : null}
        >
          {bootStage === 'pick' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 8, marginBottom: 20 }}>
                {GOLDEN_BOOT_CANDIDATES.map(p => {
                  const selected = pendingBoot === p.name;
                  return (
                    <button
                      key={p.name}
                      onClick={() => setPendingBoot(selected ? null : p.name)}
                      style={{
                        background: selected ? 'rgba(245,200,66,0.12)' : 'var(--bg-card)',
                        border: selected ? '2px solid rgba(245,200,66,0.5)' : '1px solid var(--border)',
                        borderRadius: 12, padding: '14px 16px',
                        cursor: 'pointer', textAlign: 'left',
                        display: 'flex', alignItems: 'center', gap: 14,
                        transition: 'all 0.15s',
                      }}
                    >
                      <span style={{ fontSize: 26, flexShrink: 0 }}>{p.flag}</span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: selected ? 'var(--gold)' : 'var(--white)', marginBottom: 2 }}>
                          {p.name}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                          {p.team} · {p.club}
                        </div>
                      </div>
                      {selected && (
                        <span style={{ marginLeft: 'auto', fontSize: 16, color: 'var(--gold)', flexShrink: 0 }}>✓</span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
                {pendingBoot && (
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', alignSelf: 'center' }}>
                    Selected: <strong style={{ color: 'var(--white)' }}>{pendingBoot}</strong>
                  </div>
                )}
                <button
                  onClick={confirmBoot}
                  disabled={!pendingBoot}
                  style={{
                    background: pendingBoot ? 'rgba(245,200,66,0.15)' : 'rgba(255,255,255,0.04)',
                    border: pendingBoot ? '1px solid rgba(245,200,66,0.4)' : '1px solid var(--border)',
                    color: pendingBoot ? 'var(--gold)' : 'var(--text-muted)',
                    fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 13,
                    padding: '10px 28px', borderRadius: 10, cursor: pendingBoot ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                  }}
                >
                  Lock In Pick →
                </button>
              </div>
            </div>
          )}
        </PredictionCard>

        {/* ── 3. DARK HORSE ──────────────────────────────────────── */}
        <PredictionCard
          number={3}
          title="Dark Horse Pick"
          subtitle="Which team surprises everyone and goes further than expected?"
          icon="🐎"
          locked={horseStage === 'done'}
          lockedValue={preds.darkHorse}
          onReset={resetHorse}
          chartNode={preds.darkHorse ? (
            <PieChart data={HORSE_VOTES} userPick={preds.darkHorse} size={pieSize} />
          ) : null}
        >
          {horseStage === 'pick' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 8, marginBottom: 20 }}>
                {DARK_HORSES.map(t => {
                  const selected = pendingHorse === t.name;
                  return (
                    <button
                      key={t.name}
                      onClick={() => setPendingHorse(selected ? null : t.name)}
                      style={{
                        background: selected ? 'rgba(171,71,188,0.12)' : 'var(--bg-card)',
                        border: selected ? '2px solid rgba(171,71,188,0.5)' : '1px solid var(--border)',
                        borderRadius: 12, padding: '16px 18px',
                        cursor: 'pointer', textAlign: 'left',
                        transition: 'all 0.15s',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                        <span style={{ fontSize: 24 }}>{t.flag}</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: selected ? '#ab47bc' : 'var(--white)' }}>
                          {t.name}
                        </span>
                        {selected && <span style={{ marginLeft: 'auto', color: '#ab47bc' }}>✓</span>}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                        {t.reason}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, flexWrap: 'wrap' }}>
                {pendingHorse && (
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', alignSelf: 'center' }}>
                    Selected: <strong style={{ color: 'var(--white)' }}>{pendingHorse}</strong>
                  </div>
                )}
                <button
                  onClick={confirmHorse}
                  disabled={!pendingHorse}
                  style={{
                    background: pendingHorse ? 'rgba(171,71,188,0.15)' : 'rgba(255,255,255,0.04)',
                    border: pendingHorse ? '1px solid rgba(171,71,188,0.4)' : '1px solid var(--border)',
                    color: pendingHorse ? '#ab47bc' : 'var(--text-muted)',
                    fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 13,
                    padding: '10px 28px', borderRadius: 10, cursor: pendingHorse ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s',
                  }}
                >
                  Lock In Pick →
                </button>
              </div>
            </div>
          )}
        </PredictionCard>

      </div>
    </div>
  );
}

// ── Prediction Card wrapper ───────────────────────────────────────────────────
function PredictionCard({
  number, title, subtitle, icon, locked, lockedValue, onReset, children, chartNode,
}: {
  number: number; title: string; subtitle: string; icon: string;
  locked: boolean; lockedValue: string | null; onReset: () => void;
  children?: React.ReactNode;
  chartNode?: React.ReactNode;
}) {
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 20, padding: '28px 24px', marginBottom: 24,
      transition: 'border-color 0.2s',
    }}>
      {/* Card header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: locked ? 0 : 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: locked ? 'rgba(102,187,106,0.12)' : 'rgba(245,200,66,0.08)',
            border: locked ? '1px solid rgba(102,187,106,0.3)' : '1px solid rgba(245,200,66,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20, flexShrink: 0,
          }}>
            {locked ? '✓' : icon}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>
                #{number}
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--white)', margin: 0 }}>
                {title}
              </h2>
              {locked && (
                <span style={{
                  background: 'rgba(102,187,106,0.12)', border: '1px solid rgba(102,187,106,0.3)',
                  color: '#66bb6a', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em',
                  padding: '2px 8px', borderRadius: 4, textTransform: 'uppercase',
                }}>
                  Locked
                </span>
              )}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: 12, margin: '4px 0 0' }}>{subtitle}</p>
          </div>
        </div>

        {locked && (
          <button onClick={onReset} style={{
            background: 'transparent', border: '1px solid var(--border)',
            color: 'var(--text-muted)', fontFamily: 'var(--font-body)',
            fontSize: 11, fontWeight: 600, padding: '6px 14px',
            borderRadius: 8, cursor: 'pointer', flexShrink: 0,
            letterSpacing: '0.05em', marginLeft: 8,
          }}>
            Change →
          </button>
        )}
      </div>

      {/* Locked state: show pick + pie chart */}
      {locked && lockedValue && (
        <div style={{ marginTop: 20 }}>
          {/* Your pick pill */}
          <div style={{
            padding: '16px 20px',
            background: 'rgba(102,187,106,0.06)', border: '1px solid rgba(102,187,106,0.2)',
            borderRadius: 14, display: 'flex', alignItems: 'center', gap: 14,
            marginBottom: 24,
          }}>
            <span style={{ fontSize: 30 }}>{icon}</span>
            <div>
              <div style={{ fontSize: 11, color: '#66bb6a', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 3 }}>
                Your Pick
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--white)' }}>
                {lockedValue}
              </div>
            </div>
          </div>

          {/* Community pie chart */}
          {chartNode && (
            <div>
              <div style={{
                fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.14em',
                textTransform: 'uppercase', fontWeight: 700, marginBottom: 16,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f5c842', display: 'inline-block' }} />
                Fan Predictions
              </div>
              {chartNode}
            </div>
          )}
        </div>
      )}

      {/* Children (picker UI) */}
      {!locked && children}
    </div>
  );
}

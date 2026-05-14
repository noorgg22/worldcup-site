import { useState, useEffect } from 'react';
import { GROUP_COLORS } from '../data/wcStats';

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

// Recognised contenders for the title (shown with odds-style tier labels)
const FAVOURITES = ['Brazil', 'France', 'Argentina', 'Germany', 'Spain', 'England', 'Portugal', 'Netherlands'];

// Dark-horse picks — non-favourites with a realistic shot
const DARK_HORSES = [
  { name: 'Morocco',      flag: '🇲🇦', reason: '2022 semi-finalists — Africa\'s giant killers' },
  { name: 'United States', flag: '🇺🇸', reason: 'Home advantage across 11 stadiums' },
  { name: 'Belgium',      flag: '🇧🇪', reason: 'Golden generation\'s last dance' },
  { name: 'Uruguay',      flag: '🇺🇾', reason: '2× champions — never count them out' },
  { name: 'Japan',        flag: '🇯🇵', reason: 'Shock wins over Germany & Spain in 2022' },
  { name: 'Croatia',      flag: '🇭🇷', reason: '2018 runners-up, always punch above weight' },
  { name: 'Colombia',     flag: '🇨🇴', reason: 'New golden generation led by Díaz & Arias' },
  { name: 'Korea Republic', flag: '🇰🇷', reason: '2002 semi-finalists — can do it again' },
  { name: 'Senegal',      flag: '🇸🇳', reason: 'Africa Cup champions with world-class talent' },
  { name: 'Mexico',       flag: '🇲🇽', reason: 'Co-hosts with a point to prove on home soil' },
  { name: 'Canada',       flag: '🇨🇦', reason: 'Rising force — co-hosts with home crowd behind them' },
  { name: 'Norway',       flag: '🇳🇴', reason: 'Haaland & company — could be their tournament' },
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

  // Pending selections before user confirms
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

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px 100px' }}>

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
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,6vw,72px)', color: 'var(--white)', lineHeight: 1, marginBottom: 10 }}>
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
            borderRadius: 20, padding: '28px 32px', marginBottom: 48,
          }}>
            <div style={{ fontSize: 10, color: 'var(--gold)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 20 }}>
              Your 2026 World Cup Predictions
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
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

        {/* ─────────────────────────────────────────────────────────
            1. TOURNAMENT CHAMPION
        ───────────────────────────────────────────────────────── */}
        <PredictionCard
          number={1}
          title="Who Lifts the Trophy?"
          subtitle="Pick the 2026 World Cup champion from all 48 qualified nations"
          icon="🏆"
          locked={championStage === 'done'}
          lockedValue={preds.champion}
          onReset={resetChampion}
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
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
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
                              borderRadius: 12, padding: '14px 8px',
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
                            <div style={{ fontSize: 28, lineHeight: 1, marginBottom: 6 }}>{t.flag}</div>
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

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
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

        {/* ─────────────────────────────────────────────────────────
            2. GOLDEN BOOT
        ───────────────────────────────────────────────────────── */}
        <PredictionCard
          number={2}
          title="Golden Boot Winner"
          subtitle="Who finishes as the tournament's top scorer?"
          icon="👟"
          locked={bootStage === 'done'}
          lockedValue={preds.goldenBoot}
          onReset={resetBoot}
        >
          {bootStage === 'pick' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 20 }}>
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

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
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

        {/* ─────────────────────────────────────────────────────────
            3. DARK HORSE
        ───────────────────────────────────────────────────────── */}
        <PredictionCard
          number={3}
          title="Dark Horse Pick"
          subtitle="Which team surprises everyone and goes further than expected?"
          icon="🐎"
          locked={horseStage === 'done'}
          lockedValue={preds.darkHorse}
          onReset={resetHorse}
        >
          {horseStage === 'pick' && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, marginBottom: 20 }}>
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

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
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
  number, title, subtitle, icon, locked, lockedValue, onReset, children,
}: {
  number: number; title: string; subtitle: string; icon: string;
  locked: boolean; lockedValue: string | null; onReset: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 20, padding: '32px 32px', marginBottom: 24,
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>
                #{number}
              </span>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--white)', margin: 0 }}>
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
            letterSpacing: '0.05em',
          }}>
            Change →
          </button>
        )}
      </div>

      {/* Locked state: show the pick */}
      {locked && lockedValue && (
        <div style={{
          marginTop: 20, padding: '20px 24px',
          background: 'rgba(102,187,106,0.06)', border: '1px solid rgba(102,187,106,0.2)',
          borderRadius: 14, display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <span style={{ fontSize: 36 }}>
            {icon}
          </span>
          <div>
            <div style={{ fontSize: 11, color: '#66bb6a', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 4 }}>
              Your Pick
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--white)' }}>
              {lockedValue}
            </div>
          </div>
        </div>
      )}

      {/* Children (the picker UI) */}
      {!locked && children}
    </div>
  );
}

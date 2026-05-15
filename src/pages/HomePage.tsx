import { useEffect, useState, useRef, Suspense, lazy } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { venuesByCountry, venues as ALL_VENUES } from '../data/venues';
import type { Venue } from '../data/venues';
import { getTodayOrNearestMoments, CATEGORY_COLORS, CATEGORY_LABELS } from '../data/wcHistory';
import type { HistoryMoment } from '../data/wcHistory';
import MomentModal from '../components/MomentModal';
import Flag from '../components/Flag';
import PageFooter from '../components/PageFooter';

const WorldGlobe = lazy(() => import('../components/WorldGlobe'));

const WC_START = new Date('2026-06-11T20:00:00Z');

// ── Venue photo cache for fixture modal ───────────────────────────────────────
const fixturePhotoCache: Record<string, string | null> = {};
const venueWikiMap: Record<string, string> = Object.fromEntries(
  ALL_VENUES.map(v => [v.stadium, v.wikiTitle])
);
async function fetchFixturePhoto(stadiumName: string): Promise<string | null> {
  if (stadiumName in fixturePhotoCache) return fixturePhotoCache[stadiumName];
  const wikiTitle = venueWikiMap[stadiumName];
  if (!wikiTitle) { fixturePhotoCache[stadiumName] = null; return null; }
  try {
    const title = decodeURIComponent(wikiTitle).replace(/_/g, ' ');
    const res = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=1200&origin=*`
    );
    const json = await res.json();
    const pages = json?.query?.pages ?? {};
    const page: any = Object.values(pages)[0];
    fixturePhotoCache[stadiumName] = page?.thumbnail?.source ?? null;
    return fixturePhotoCache[stadiumName];
  } catch {
    fixturePhotoCache[stadiumName] = null;
    return null;
  }
}

function useCountdown() {
  const [diff, setDiff] = useState(WC_START.getTime() - Date.now());
  useEffect(() => {
    const id = setInterval(() => setDiff(WC_START.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (diff <= 0) return null;
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

type Props = { onNav: (p: any) => void; onVenue: (v: Venue) => void; onHistory?: () => void; onCountryClick?: (name: string) => void };

// ── Mock opening fixtures ─────────────────────────────────────────────────────
interface Fixture {
  id: string;
  date: string;
  time: string;
  group: string;
  home: { name: string; flag: string };
  away: { name: string; flag: string };
  venue: string;
  city: string;
}

const GROUP_COLORS: Record<string, string> = {
  A: '#f5c842', B: '#4fc3f7', C: '#ef5350', D: '#66bb6a',
  E: '#ab47bc', F: '#ff7043', G: '#26c6da', H: '#8d6e63',
  I: '#ec407a', J: '#29b6f6', K: '#9ccc65', L: '#ffa726',
};

const OPENING_FIXTURES: Fixture[] = [
  { id: 'f1', date: 'Jun 11', time: '4:00 PM', group: 'A', home: { name: 'Mexico', flag: '🇲🇽' }, away: { name: 'South Africa', flag: '🇿🇦' }, venue: 'SoFi Stadium', city: 'Los Angeles' },
  { id: 'f2', date: 'Jun 12', time: '1:00 PM', group: 'B', home: { name: 'Canada', flag: '🇨🇦' }, away: { name: 'Switzerland', flag: '🇨🇭' }, venue: 'BMO Field', city: 'Toronto' },
  { id: 'f3', date: 'Jun 12', time: '4:00 PM', group: 'C', home: { name: 'Brazil', flag: '🇧🇷' }, away: { name: 'Morocco', flag: '🇲🇦' }, venue: 'MetLife Stadium', city: 'New York / NJ' },
  { id: 'f4', date: 'Jun 13', time: '1:00 PM', group: 'D', home: { name: 'USA', flag: '🇺🇸' }, away: { name: 'Paraguay', flag: '🇵🇾' }, venue: 'AT&T Stadium', city: 'Dallas' },
  { id: 'f5', date: 'Jun 13', time: '4:00 PM', group: 'E', home: { name: 'Germany', flag: '🇩🇪' }, away: { name: 'Ecuador', flag: '🇪🇨' }, venue: 'Mercedes-Benz Stadium', city: 'Atlanta' },
  { id: 'f6', date: 'Jun 14', time: '1:00 PM', group: 'I', home: { name: 'France', flag: '🇫🇷' }, away: { name: 'Norway', flag: '🇳🇴' }, venue: 'Lumen Field', city: 'Seattle' },
  { id: 'f7', date: 'Jun 14', time: '4:00 PM', group: 'L', home: { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' }, away: { name: 'Croatia', flag: '🇭🇷' }, venue: 'Lincoln Financial Field', city: 'Philadelphia' },
  { id: 'f8', date: 'Jun 15', time: '1:00 PM', group: 'J', home: { name: 'Argentina', flag: '🇦🇷' }, away: { name: 'Austria', flag: '🇦🇹' }, venue: 'NRG Stadium', city: 'Houston' },
];

// ── Must-watch marquee matchups ────────────────────────────────────────────────
const MARQUEE = [
  {
    group: 'C', date: 'Jun 12',
    home: { name: 'Brazil', flag: '🇧🇷' }, away: { name: 'Morocco', flag: '🇲🇦' },
    label: '5× Champions vs 2022 Semi-Finalists',
    desc: "Brazil's record 5 titles clash with Morocco's stunning 2022 run where they became Africa's first semi-finalists.",
    color: '#ef5350',
  },
  {
    group: 'L', date: 'Jun 14',
    home: { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' }, away: { name: 'Croatia', flag: '🇭🇷' },
    label: 'Euro 2020 Final Rematch',
    desc: "England's heartbreak in the Euro 2020 final against Croatia gets another chapter on the World Cup stage.",
    color: '#ffa726',
  },
  {
    group: 'J', date: 'Jun 15',
    home: { name: 'Argentina', flag: '🇦🇷' }, away: { name: 'Austria', flag: '🇦🇹' },
    label: 'Defending Champions Open',
    desc: "Messi's Argentina enter as 2022 World Cup holders, looking to become the first back-to-back champions since Brazil 1958-62.",
    color: '#29b6f6',
  },
];

// ── Tournament milestones ─────────────────────────────────────────────────────
const MILESTONES = [
  { phase: 'Group Stage', dates: 'Jun 11 – Jul 2', matches: '72 matches', color: '#f5c842', icon: '⚽' },
  { phase: 'Round of 32', dates: 'Jul 4 – Jul 7',  matches: '16 matches', color: '#4fc3f7', icon: '🔵' },
  { phase: 'Round of 16', dates: 'Jul 9 – Jul 12', matches: '8 matches',  color: '#66bb6a', icon: '🟢' },
  { phase: 'Quarter-Finals', dates: 'Jul 14 – Jul 15', matches: '4 matches', color: '#ab47bc', icon: '🟣' },
  { phase: 'Semi-Finals',  dates: 'Jul 17 – Jul 18', matches: '2 matches', color: '#ff7043', icon: '🔴' },
  { phase: 'The Final',    dates: 'Jul 19',          matches: 'MetLife, NJ', color: '#f5c842', icon: '🏆' },
];

export default function HomePage({ onNav, onVenue, onHistory, onCountryClick }: Props) {
  const isMobile = useIsMobile();
  const countdown = useCountdown();

  return (
    <div style={{ paddingTop: 64, overflowX: 'hidden' }}>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <div style={{
        position: 'relative', minHeight: isMobile ? 'auto' : '100vh',
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
        alignItems: 'center', overflow: 'hidden',
        padding: isMobile ? '32px 20px 40px' : '0 60px',
      }}>
        {/* Ambient background */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          <div style={{
            position: 'absolute', top: '-20%', left: '-10%',
            width: '60%', height: '80%', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,200,66,0.06) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: '-10%', right: '-10%',
            width: '50%', height: '60%', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(79,195,247,0.04) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }} />
        </div>

        {/* LEFT — Text */}
        <div style={{ position: 'relative', zIndex: 1, paddingRight: isMobile ? 0 : 40 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24,
            background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.25)',
            borderRadius: 100, padding: '6px 16px',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f5c842', display: 'inline-block', boxShadow: '0 0 8px #f5c842' }} />
            <span style={{ fontSize: 11, color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
              USA · Canada · Mexico
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(52px, 7vw, 96px)',
            lineHeight: 0.95, letterSpacing: '0.03em',
            marginBottom: 20,
          }}>
            <span style={{ color: 'var(--white)' }}>FIFA</span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #f5c842 0%, #ffb300 40%, #f5c842 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundSize: '200% auto',
              animation: 'shimmer 3s linear infinite',
            }}>WORLD</span>
            <br />
            <span style={{ color: 'var(--white)' }}>CUP 2026</span>
          </h1>

          {countdown ? (
            <div style={{ marginBottom: 40 }}>
              <p style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
                Kicks Off In
              </p>
              <div style={{ display: 'flex', gap: isMobile ? 8 : 12 }}>
                {[
                  { val: countdown.d, label: 'Days' },
                  { val: countdown.h, label: 'Hrs' },
                  { val: countdown.m, label: 'Min' },
                  { val: countdown.s, label: 'Sec' },
                ].map(({ val, label }) => (
                  <div key={label} style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(245,200,66,0.2)',
                    borderRadius: 12, padding: isMobile ? '10px 12px' : '12px 16px', textAlign: 'center',
                    minWidth: isMobile ? 72 : 64, flex: isMobile ? 1 : undefined,
                    backdropFilter: 'blur(8px)',
                  }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 30 : 36, color: 'var(--gold)', lineHeight: 1 }}>
                      {String(val).padStart(2, '0')}
                    </div>
                    <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 4 }}>
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 40,
              background: 'rgba(239,83,80,0.12)', border: '1px solid rgba(239,83,80,0.3)',
              borderRadius: 100, padding: '10px 20px',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef5350', animation: 'pulse-gold 1.5s infinite' }} />
              <span style={{ color: '#ef5350', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 13 }}>Live Now</span>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn-gold" onClick={() => onNav('groups')}>
              View Groups
            </button>
            <button onClick={() => onNav('players')} style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
              color: 'var(--white)', fontFamily: 'var(--font-body)', fontWeight: 600,
              fontSize: 14, padding: '10px 24px', borderRadius: 8, cursor: 'pointer',
              backdropFilter: 'blur(8px)', transition: 'all 0.2s',
            }}>
              Player Stats →
            </button>
          </div>
        </div>

        {/* RIGHT — Globe (desktop only) */}
        {!isMobile && (
          <div style={{
            position: 'relative', zIndex: 1,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
          }}>
            <div style={{
              position: 'absolute', width: 500, height: 500, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(245,200,66,0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <Suspense fallback={
              <div style={{ width: 600, height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Loading globe...</div>
              </div>
            }>
              <WorldGlobe onCountryClick={onCountryClick} />
            </Suspense>
          </div>
        )}
      </div>

      {/* ── MOBILE GLOBE — below hero text ───────────────────────── */}
      {isMobile && (
        <div style={{ position: 'relative', overflow: 'hidden', marginTop: -20, marginBottom: 0 }}>
          {/* Hint above globe */}
          <div style={{
            textAlign: 'center', fontSize: 10, color: 'var(--text-muted)',
            letterSpacing: '0.14em', textTransform: 'uppercase', paddingBottom: 8,
          }}>
            Tap a country to view profile
          </div>
          {/* Gold ambient glow */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center, rgba(245,200,66,0.06) 0%, transparent 70%)',
          }} />
          <Suspense fallback={
            <div style={{ height: 320, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Loading globe...</div>
            </div>
          }>
            <WorldGlobe onCountryClick={onCountryClick} />
          </Suspense>
          {/* Bottom fade into next section */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
            background: 'linear-gradient(to top, var(--bg) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
        </div>
      )}

      {/* ── TOURNAMENT AT A GLANCE ───────────────────────────────── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 16px 60px' : '0 24px 80px' }}>
        {/* Host nations banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(245,200,66,0.08) 0%, rgba(255,255,255,0.03) 50%, rgba(79,195,247,0.06) 100%)',
          border: '1px solid rgba(245,200,66,0.2)',
          borderRadius: 20, padding: isMobile ? '20px 20px' : '32px 40px', marginBottom: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
        }}>
          <div style={{ width: '100%' }}>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
              Host Nations · {isMobile ? 'Tap' : 'Hover'} to explore venues
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: isMobile ? 8 : 16 }}>
              <HostNationCard flag="🇺🇸" name="United States" venueKey="USA" onVenue={onVenue} />
              <HostNationCard flag="🇨🇦" name="Canada"        venueKey="Canada" onVenue={onVenue} />
              <HostNationCard flag="🇲🇽" name="Mexico"        venueKey="Mexico" onVenue={onVenue} />
            </div>
          </div>
        </div>

        {/* Stats strip + confederation + road to final — all in one compact card */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 20, overflow: 'hidden',
        }}>
          {/* Row 1: key numbers */}
          <div style={{
            display: 'grid', gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)',
            borderBottom: '1px solid var(--border)',
          }}>
            {[
              { val: '48',     label: 'Nations' },
              { val: '104',    label: 'Matches' },
              { val: '16',     label: 'Stadiums' },
              { val: '12',     label: 'Groups' },
              { val: 'Jun 11', label: 'Kicks Off' },
              { val: 'Jul 19', label: 'The Final' },
            ].map((s, i) => (
              <div key={s.label} style={{
                padding: isMobile ? '16px 0' : '20px 0', textAlign: 'center',
                borderRight: isMobile
                  ? (i % 3 < 2 ? '1px solid var(--border)' : 'none')
                  : (i < 5 ? '1px solid var(--border)' : 'none'),
                borderBottom: isMobile && i < 3 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--gold)', lineHeight: 1, marginBottom: 4 }}>{s.val}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Row 2: confederation proportional bar */}
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 8 }}>
              Teams by Confederation
            </div>
            {/* Stacked bar */}
            <div style={{ display: 'flex', height: 7, borderRadius: 4, overflow: 'hidden', marginBottom: 10, gap: 1 }}>
              {[
                { color: '#4fc3f7', pct: 33.3 },
                { color: '#ef5350', pct: 18.75 },
                { color: '#ab47bc', pct: 16.67 },
                { color: '#f5c842', pct: 12.5 },
                { color: '#66bb6a', pct: 12.5 },
                { color: '#ff7043', pct: 2.08 },
              ].map((c, i) => (
                <div key={i} style={{ width: `${c.pct}%`, background: c.color, borderRadius: 2 }} />
              ))}
            </div>
            {/* Labels */}
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {[
                { name: 'UEFA', teams: 16, color: '#4fc3f7' },
                { name: 'CAF',  teams: 9,  color: '#ef5350' },
                { name: 'AFC',  teams: 8,  color: '#ab47bc' },
                { name: 'CONMEBOL', teams: 6, color: '#f5c842' },
                { name: 'CONCACAF', teams: 6, color: '#66bb6a' },
                { name: 'OFC',  teams: 1,  color: '#ff7043' },
              ].map(c => (
                <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                  <div style={{ width: 7, height: 7, borderRadius: 2, background: c.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{c.name}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--white)' }}>{c.teams}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Row 3: road to the final — compact timeline */}
          <div style={{ padding: isMobile ? '16px 16px' : '20px 32px', overflowX: isMobile ? 'auto' : 'visible' }}>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>
              Road to the Final
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {MILESTONES.map((m, i) => (
                <div key={m.phase} style={{ display: 'flex', alignItems: 'center', flex: i < MILESTONES.length - 1 ? 1 : 0 }}>
                  {/* Node + label */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: '50%',
                      background: i === MILESTONES.length - 1 ? `${m.color}20` : 'var(--bg)',
                      border: `1.5px solid ${m.color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, boxShadow: `0 0 12px ${m.color}25`, flexShrink: 0,
                    }}>
                      {m.icon}
                    </div>
                    <div style={{ textAlign: 'center', minWidth: 72 }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: m.color, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>
                        {m.phase}
                      </div>
                      <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>{m.dates}</div>
                    </div>
                  </div>

                  {/* Connector */}
                  {i < MILESTONES.length - 1 && (
                    <div style={{
                      flex: 1, height: 1.5, margin: '0 6px', marginBottom: 26,
                      background: `linear-gradient(90deg, ${m.color}50, ${MILESTONES[i + 1].color}50)`,
                    }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OPENING FIXTURES ─────────────────────────────────────── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 16px 60px' : '0 24px 80px' }}>
        <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'baseline', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: 12, marginBottom: isMobile ? 16 : 28 }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 28 : 38, color: 'var(--white)', marginBottom: 6 }}>OPENING FIXTURES</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>First week of group stage · All times local</p>
          </div>
          <button onClick={() => onNav('groups')} style={{
            background: 'transparent', border: '1px solid var(--border)', color: 'var(--text-muted)',
            fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', padding: '7px 16px',
            borderRadius: 8, cursor: 'pointer', fontFamily: 'var(--font-body)',
          }}>
            All Groups →
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 10 }}>
          {OPENING_FIXTURES.map(f => {
            const gc = GROUP_COLORS[f.group] || '#f5c842';
            return (
              <FixtureCard key={f.id} fixture={f} groupColor={gc} />
            );
          })}
        </div>
      </section>

      {/* ── THIS DAY IN WC HISTORY ───────────────────────────────── */}
      <ThisDayWidget onViewAll={onHistory ?? (() => onNav('history'))} />


      {/* ── MUST-WATCH MATCHUPS ───────────────────────────────────── */}
      <section style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '0 16px 60px' : '0 24px 100px' }}>
        <div style={{ marginBottom: isMobile ? 16 : 28 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 28 : 38, color: 'var(--white)', marginBottom: 6 }}>MATCHUPS TO WATCH</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Can't-miss clashes of the group stage</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 12 : 16 }}>
          {MARQUEE.map(m => {
            const gc = GROUP_COLORS[m.group];
            return (
              <div key={`${m.home.name}-${m.away.name}`} style={{
                background: 'var(--bg-card)',
                border: `1px solid ${gc}30`,
                borderRadius: 20, padding: '28px 24px', position: 'relative', overflow: 'hidden',
                transition: 'all 0.25s',
              }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = `${gc}70`;
                  el.style.transform = 'translateY(-4px)';
                  el.style.boxShadow = `0 16px 48px ${gc}15`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = `${gc}30`;
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = 'none';
                }}
              >
                {/* Background glow */}
                <div style={{
                  position: 'absolute', top: -40, right: -40, width: 140, height: 140,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${gc}15 0%, transparent 70%)`,
                  pointerEvents: 'none',
                }} />

                {/* Group badge + date */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{
                    background: `${gc}20`, border: `1px solid ${gc}40`,
                    borderRadius: 6, padding: '3px 10px',
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: gc,
                  }}>
                    GROUP {m.group}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>{m.date}</div>
                </div>

                {/* Teams */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}><Flag emoji={m.home.flag} size={42} style={{ borderRadius: 4 }} /></div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--white)' }}>{m.home.name}</div>
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--text-muted)',
                    padding: '0 12px',
                  }}>VS</div>
                  <div style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}><Flag emoji={m.away.flag} size={42} style={{ borderRadius: 4 }} /></div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--white)' }}>{m.away.name}</div>
                  </div>
                </div>

                {/* Label */}
                <div style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: gc, marginBottom: 8,
                }}>
                  {m.label}
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
                  {m.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>
      <PageFooter />
    </div>
  );
}

// ── This Day in WC History Widget ────────────────────────────────────────────
function ThisDayWidget({ onViewAll }: { onViewAll: () => void }) {
  const moments = getTodayOrNearestMoments();
  const [modalMoment, setModalMoment] = useState<HistoryMoment | null>(null);

  if (moments.length === 0) return null;

  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayKey = `${mm}-${dd}`;
  const isToday = moments[0].date === todayKey;

  const hero = moments[0];
  const rest = moments.slice(1);
  const catColor = CATEGORY_COLORS[hero.category];

  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
      {/* Inline modal */}
      {modalMoment && (
        <MomentModal moment={modalMoment} onClose={() => setModalMoment(null)} />
      )}

      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, marginBottom: 24 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 5vw, 38px)', color: 'var(--white)', marginBottom: 6 }}>
            {isToday ? 'THIS DAY IN WORLD CUP HISTORY' : 'ON THIS DATE IN WORLD CUP HISTORY'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
            {isToday ? `On this day · ${hero.fullDate}` : `Nearest moment · ${hero.fullDate}`}
          </p>
        </div>
        <button
          onClick={onViewAll}
          style={{
            background: 'transparent', border: '1px solid var(--border)',
            color: 'var(--text-muted)', fontSize: 12, fontWeight: 600,
            letterSpacing: '0.06em', padding: '7px 16px', borderRadius: 8,
            cursor: 'pointer', fontFamily: 'var(--font-body)',
          }}
        >
          Full Archive →
        </button>
      </div>

      {/* Hero moment card */}
      <div style={{
        background: 'var(--bg-card)', border: `1px solid ${catColor}30`,
        borderRadius: 20, padding: 'clamp(20px, 4vw, 32px) clamp(16px, 4vw, 36px)',
        position: 'relative', overflow: 'hidden', marginBottom: rest.length > 0 ? 12 : 0,
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${catColor}, transparent)`,
        }} />
        <div style={{
          position: 'absolute', top: -60, right: -60, width: 200, height: 200,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${catColor}12 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>
          {/* Left: flags + meta */}
          <div style={{ flexShrink: 0 }}>
            {hero.flags && (
              <div style={{ fontSize: 40, letterSpacing: 6, marginBottom: 12, lineHeight: 1 }}>
                {hero.flags.join(' ')}
              </div>
            )}
            <div style={{ marginBottom: 8 }}>
              <span style={{
                background: `${catColor}22`, color: catColor,
                fontSize: 10, fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', padding: '3px 10px', borderRadius: 20,
                border: `1px solid ${catColor}44`,
              }}>
                {CATEGORY_LABELS[hero.category]}
              </span>
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 600 }}>
              {hero.fullDate}
            </div>
          </div>

          {/* Right: text */}
          <div style={{ flex: 1 }}>
            <h3 style={{
              fontFamily: 'var(--font-display)', fontSize: 'clamp(18px,2.5vw,26px)',
              letterSpacing: '0.06em', color: '#fff', margin: '0 0 10px', lineHeight: 1.15,
            }}>
              {hero.title}
            </h3>
            <p style={{ color: catColor, fontSize: 14, fontWeight: 600, lineHeight: 1.6, margin: '0 0 12px' }}>
              {hero.summary}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.7, margin: '0 0 20px' }}>
              {hero.detail.length > 300 ? hero.detail.slice(0, 300) + '…' : hero.detail}
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button
                onClick={() => setModalMoment(hero)}
                style={{
                  background: `${catColor}18`, border: `1px solid ${catColor}44`,
                  color: catColor, fontFamily: 'var(--font-body)', fontWeight: 700,
                  fontSize: 13, padding: '9px 20px', borderRadius: 8, cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                Read Full Story →
              </button>
              {hero.videoQuery && (
                <button
                  onClick={() => setModalMoment(hero)}
                  style={{
                    background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.25)',
                    color: '#ff4444', fontFamily: 'var(--font-body)', fontWeight: 700,
                    fontSize: 13, padding: '9px 20px', borderRadius: 8, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s',
                  }}
                >
                  <span>▶</span> Watch Highlights
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional moments (if multiple on same date) */}
      {rest.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10, marginTop: 10 }}>
          {rest.map((m: HistoryMoment) => {
            const cc = CATEGORY_COLORS[m.category];
            return (
              <div
                key={m.id}
                onClick={() => setModalMoment(m)}
                style={{
                  background: 'var(--bg-card)', border: `1px solid ${cc}25`,
                  borderRadius: 14, padding: '18px 20px', cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${cc}55`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = `${cc}25`; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{
                    background: `${cc}20`, color: cc, fontSize: 10, fontWeight: 700,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    padding: '2px 8px', borderRadius: 20,
                  }}>
                    {CATEGORY_LABELS[m.category]}
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>{m.fullDate}</span>
                </div>
                {m.flags && <div style={{ fontSize: 20, marginBottom: 6, letterSpacing: 3 }}>{m.flags.join(' ')}</div>}
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{m.title}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.5 }}>{m.summary}</div>
                <div style={{ color: cc, fontSize: 12, fontWeight: 600, marginTop: 8 }}>Read more →</div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

// ── Fixture Card ──────────────────────────────────────────────────────────────
function FixtureCard({ fixture: f, groupColor: gc }: { fixture: Fixture; groupColor: string }) {
  const isMobile = useIsMobile();
  const [showTickets, setShowTickets] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null | undefined>(undefined);
  const ticketSearch = encodeURIComponent(`${f.home.name} ${f.away.name} World Cup 2026`);
  const ticketUrl = `https://www.stubhub.com/secure/search?q=${ticketSearch}&clickref=YOUR_AFFILIATE_ID`;

  // Fetch stadium photo when modal first opens
  useEffect(() => {
    if (!showTickets || photoUrl !== undefined) return;
    fetchFixturePhoto(f.venue).then(url => setPhotoUrl(url));
  }, [showTickets, f.venue, photoUrl]);

  return (
    <>
      <div
        onClick={() => setShowTickets(true)}
        style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderLeft: `3px solid ${gc}`,
          borderRadius: 14, overflow: 'hidden',
          transition: 'all 0.2s', cursor: 'pointer',
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = `${gc}60`;
          el.style.background = `${gc}06`;
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.borderColor = 'var(--border)';
          el.style.borderLeftColor = gc;
          el.style.background = 'var(--bg-card)';
        }}
      >
        {isMobile ? (
          /* ── MOBILE layout ── */
          <div style={{ padding: '12px 14px' }}>
            {/* Top row: date + group badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--white)' }}>{f.date}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{f.time}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  background: `${gc}20`, border: `1px solid ${gc}40`, borderRadius: 4,
                  fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', color: gc, padding: '2px 7px',
                }}>GRP {f.group}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{f.city}</div>
              </div>
            </div>
            {/* Teams row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                <Flag emoji={f.home.flag} size={22} style={{ flexShrink: 0 }} />
                <span style={{
                  fontSize: 14, fontWeight: 700, color: 'var(--white)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>{f.home.name}</span>
              </div>
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: 11, color: 'var(--text-muted)',
                background: 'rgba(255,255,255,0.06)', borderRadius: 4, padding: '3px 8px',
                flexShrink: 0,
              }}>VS</span>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end', minWidth: 0 }}>
                <span style={{
                  fontSize: 14, fontWeight: 700, color: 'var(--white)', textAlign: 'right',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>{f.away.name}</span>
                <Flag emoji={f.away.flag} size={22} style={{ flexShrink: 0 }} />
              </div>
            </div>
          </div>
        ) : (
          /* ── DESKTOP layout ── */
          <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Date/time */}
            <div style={{ textAlign: 'center', minWidth: 48, flexShrink: 0 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--white)', lineHeight: 1 }}>{f.date}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 3 }}>{f.time}</div>
            </div>
            <div style={{ width: 1, height: 36, background: 'var(--border)', flexShrink: 0 }} />
            {/* Teams */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }}>
              <Flag emoji={f.home.flag} size={20} />
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--white)', textAlign: 'right', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.home.name}</span>
              <span style={{
                fontFamily: 'var(--font-display)', fontSize: 12, color: 'var(--text-muted)',
                background: 'rgba(255,255,255,0.05)', borderRadius: 4, padding: '2px 8px', flexShrink: 0,
              }}>VS</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--white)', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.away.name}</span>
              <Flag emoji={f.away.flag} size={20} />
            </div>
            <div style={{ width: 1, height: 36, background: 'var(--border)', flexShrink: 0 }} />
            {/* Group + venue */}
            <div style={{ textAlign: 'right', minWidth: 90, flexShrink: 0 }}>
              <div style={{
                display: 'inline-block', background: `${gc}20`,
                border: `1px solid ${gc}40`, borderRadius: 4,
                fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', color: gc, padding: '2px 7px', marginBottom: 4,
              }}>GRP {f.group}</div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{f.city}</div>
              <div style={{ fontSize: 9, color: 'var(--gold)', opacity: 0.7, marginTop: 3, letterSpacing: '0.06em' }}>🎟 Get Tickets</div>
            </div>
          </div>
        )}
      </div>

      {/* ── Ticket modal ──────────────────────────────────────── */}
      {showTickets && (
        <div
          onClick={() => setShowTickets(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            background: 'rgba(0,0,0,0.78)',
            backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
            animation: 'fadeIn 0.18s ease both',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              background: 'var(--bg-card)',
              border: `1px solid ${gc}35`,
              borderRadius: 22,
              width: '100%', maxWidth: 500,
              overflow: 'hidden',
              boxShadow: `0 32px 100px rgba(0,0,0,0.85), 0 0 60px ${gc}15`,
              animation: 'slideUpPanel 0.22s ease both',
            }}
          >
            {/* ── Stadium photo hero ─── */}
            <div style={{
              position: 'relative',
              height: 230,
              background: 'var(--bg-elevated)',
              overflow: 'hidden',
            }}>
              {/* Photo */}
              {photoUrl && (
                <img
                  src={photoUrl}
                  alt={f.venue}
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'center',
                    filter: 'saturate(1.4) brightness(0.75)',
                  }}
                />
              )}

              {/* Dark gradient — heavier at bottom so content is readable */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.25) 40%, rgba(6,9,15,0.92) 100%)',
              }} />

              {/* Group + date pill — top left */}
              <div style={{
                position: 'absolute', top: 16, left: 18,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <div style={{
                  background: `${gc}22`, border: `1px solid ${gc}55`,
                  backdropFilter: 'blur(8px)',
                  borderRadius: 6, padding: '4px 12px',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: gc,
                }}>
                  GROUP {f.group}
                </div>
                <div style={{
                  fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600,
                  textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                }}>
                  {f.date} · {f.time}
                </div>
              </div>

              {/* Teams overlaid on photo — pinned to bottom */}
              <div style={{
                position: 'absolute', bottom: 18, left: 0, right: 0,
                display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
                padding: '0 28px',
              }}>
                {/* Home */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ lineHeight: 1, filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.8))' }}><Flag emoji={f.home.flag} size={58} style={{ borderRadius: 6 }} /></div>
                  <div style={{
                    fontSize: 14, fontWeight: 800, color: '#fff',
                    textShadow: '0 2px 8px rgba(0,0,0,0.9)', marginTop: 6,
                    letterSpacing: '0.02em',
                  }}>{f.home.name}</div>
                </div>

                {/* VS */}
                <div style={{
                  fontFamily: 'var(--font-display)', fontSize: 32,
                  color: 'rgba(255,255,255,0.55)',
                  textShadow: '0 2px 12px rgba(0,0,0,0.8)',
                  paddingBottom: 4,
                }}>VS</div>

                {/* Away */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ lineHeight: 1, filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.8))' }}><Flag emoji={f.away.flag} size={58} style={{ borderRadius: 6 }} /></div>
                  <div style={{
                    fontSize: 14, fontWeight: 800, color: '#fff',
                    textShadow: '0 2px 8px rgba(0,0,0,0.9)', marginTop: 6,
                    letterSpacing: '0.02em',
                  }}>{f.away.name}</div>
                </div>
              </div>
            </div>

            {/* ── Bottom info + CTA ─── */}
            <div style={{ padding: '20px 28px 24px' }}>
              {/* Venue name */}
              <div style={{
                textAlign: 'center', fontSize: 12, color: 'var(--text-muted)',
                marginBottom: 18,
              }}>
                📍 {f.venue} · {f.city}
              </div>

              {/* CTA */}
              <a
                href={ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block', textAlign: 'center',
                  background: 'linear-gradient(135deg, #f5c842, #c9a224)',
                  color: '#06090f',
                  fontFamily: 'var(--font-display)',
                  fontSize: 20,
                  letterSpacing: '0.1em',
                  padding: '16px 24px',
                  borderRadius: 12,
                  textDecoration: 'none',
                  boxShadow: '0 0 32px rgba(245,200,66,0.3)',
                  transition: 'box-shadow 0.2s, transform 0.15s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 48px rgba(245,200,66,0.55)';
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 32px rgba(245,200,66,0.3)';
                  (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
                }}
              >
                🎟 BUY TICKETS ON STUBHUB
              </a>

              <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-dim)', marginTop: 10 }}>
                Powered by StubHub · Prices may vary
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => setShowTickets(false)}
              style={{
                position: 'absolute', top: 14, right: 14,
                background: 'rgba(0,0,0,0.45)', border: '1px solid rgba(255,255,255,0.15)',
                backdropFilter: 'blur(6px)',
                color: '#fff', fontSize: 14,
                width: 30, height: 30, borderRadius: '50%',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.7)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(0,0,0,0.45)'; }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ── Host Nation Card with hover city dropdown ─────────────────────────────────
type VenueKey = 'USA' | 'Canada' | 'Mexico';

function HostNationCard({ flag, name, venueKey, onVenue }: {
  flag: string; name: string; venueKey: VenueKey; onVenue: (v: Venue) => void;
}) {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cities = venuesByCountry[venueKey];

  function handleEnter() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }
  function handleLeave() {
    closeTimer.current = setTimeout(() => setOpen(false), 180);
  }

  const shortName = name === 'United States' ? 'USA' : name;

  return (
    <div
      style={{ position: 'relative' }}
      onMouseEnter={!isMobile ? handleEnter : undefined}
      onMouseLeave={!isMobile ? handleLeave : undefined}
      onClick={isMobile ? () => setOpen(o => !o) : undefined}
    >
      <div style={{
        display: 'flex', flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center', gap: isMobile ? 4 : 10,
        background: open ? 'rgba(245,200,66,0.08)' : 'transparent',
        border: `1px solid ${open ? 'rgba(245,200,66,0.25)' : 'transparent'}`,
        borderRadius: 10, padding: isMobile ? '10px 8px' : '10px 14px',
        cursor: isMobile ? 'pointer' : 'default',
        transition: 'all 0.2s', textAlign: isMobile ? 'center' : 'left',
      }}>
        <span style={{ fontSize: isMobile ? 24 : 30 }}>{flag}</span>
        <div>
          <div style={{ fontWeight: 700, color: 'var(--white)', fontSize: isMobile ? 12 : 14, whiteSpace: 'nowrap' }}>
            {isMobile ? shortName : name}
          </div>
          <div style={{ fontSize: 10, color: open ? 'var(--gold)' : 'var(--text-muted)', transition: 'color 0.2s' }}>
            {cities.length} {isMobile ? 'venues' : 'venues ↓'}
          </div>
        </div>
      </div>

      {open && (
        <div
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          style={{
            position: 'absolute', top: '100%', left: 0, zIndex: 50,
            paddingTop: 6, minWidth: 260,
          }}
        >
        <div style={{
          background: 'rgba(14,20,32,0.97)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(245,200,66,0.2)',
          borderRadius: 12, padding: 8,
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          animation: 'fadeUp 0.15s ease',
        }}>
          <div style={{
            fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.15em',
            textTransform: 'uppercase', padding: '6px 10px 8px', fontWeight: 600,
          }}>
            {flag} {name} · Click a venue
          </div>
          {cities.map(v => (
            <button
              key={v.id}
              onClick={() => onVenue(v)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', background: 'transparent',
                border: '1px solid transparent', borderRadius: 8,
                padding: '10px 12px', cursor: 'pointer', textAlign: 'left',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = 'rgba(245,200,66,0.08)';
                el.style.borderColor = 'rgba(245,200,66,0.2)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.background = 'transparent';
                el.style.borderColor = 'transparent';
              }}
            >
              <div>
                <div style={{ fontWeight: 600, color: 'var(--white)', fontSize: 13 }}>{v.city}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>{v.stadium}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 12 }}>
                <div style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 700 }}>{v.matches} games</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{v.capacity.toLocaleString()} cap.</div>
              </div>
            </button>
          ))}
        </div>
        </div>
      )}
    </div>
  );
}

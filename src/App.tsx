import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { useIsMobile } from './hooks/useIsMobile';
import './index.css';
import HomePage from './pages/HomePage';
import GroupsPage from './pages/GroupsPage';
import RosterPage from './pages/RosterPage';
import TeamProfilePage from './pages/TeamProfilePage';
import VenuePage from './pages/VenuePage';
import MatchCenterPage from './pages/MatchCenterPage';
import RecordsPage from './pages/RecordsPage';
import HistoryPage from './pages/HistoryPage';
import ArticlesPage from './pages/ArticlesPage';
import PrivacyPage from './pages/PrivacyPage';
import CountryProfileModal from './components/CountryProfileModal';
import type { Venue } from './data/venues';
import type { TeamRoster } from './data/rosters';

export type Page = 'home' | 'groups' | 'roster' | 'teamprofile' | 'venue' | 'matches' | 'records' | 'history' | 'articles' | 'privacy';

export default function App() {
  const [history, setHistory] = useState<Page[]>(['home']);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [selectedTeam, setSelectedTeam]   = useState<TeamRoster | null>(null);
  const [countryProfile, setCountryProfile] = useState<string | null>(null);

  const page = history[history.length - 1];

  function navTo(p: Page) {
    setHistory(h => [...h, p]);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function navBack() {
    setHistory(h => h.length > 1 ? h.slice(0, -1) : h);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function navToVenue(venue: Venue) {
    setSelectedVenue(venue);
    setHistory(h => [...h, 'venue']);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function openCountry(name: string) {
    if (name) setCountryProfile(name);
  }

  const canGoBack = history.length > 1;

  // Footer nav events
  useState(() => {
    const handler = (e: Event) => navTo((e as CustomEvent).detail as Page);
    window.addEventListener('navto', handler);
    return () => window.removeEventListener('navto', handler);
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Analytics />
      {page !== 'venue' && page !== 'teamprofile' && <Nav current={page} onNav={navTo} onBack={navBack} canGoBack={canGoBack} />}
      {page === 'home'    && <HomePage    onNav={navTo} onVenue={navToVenue} onHistory={() => navTo('history')} onCountryClick={openCountry} />}
      {page === 'groups'  && <GroupsPage  onCountryClick={openCountry} />}
      {page === 'roster'  && <RosterPage onTeamSelect={team => { setSelectedTeam(team); setHistory(h => [...h, 'teamprofile']); window.scrollTo({top:0,behavior:'instant'}); }} />}
      {page === 'teamprofile' && selectedTeam && <TeamProfilePage team={selectedTeam} onBack={navBack} />}
      {page === 'matches'     && <MatchCenterPage onCountryClick={openCountry} onVenueNav={navToVenue} />}
      {page === 'records'     && <RecordsPage onCountryClick={openCountry} />}
      {page === 'history'     && <HistoryPage />}
      {page === 'articles'    && <ArticlesPage />}
      {page === 'privacy'     && <PrivacyPage />}
      {page === 'venue' && selectedVenue && (
        <VenuePage venue={selectedVenue} onBack={navBack} />
      )}

      {/* Global country profile modal */}
      {countryProfile && (
        <CountryProfileModal
          country={countryProfile}
          onClose={() => setCountryProfile(null)}
        />
      )}
    </div>
  );
}

function Nav({ current, onNav, onBack, canGoBack }: {
  current: Page; onNav: (p: Page) => void;
  onBack: () => void; canGoBack: boolean;
}) {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const links: { id: Page; label: string }[] = [
    { id: 'home',        label: 'Home' },
    { id: 'matches',     label: 'Matches' },
    { id: 'groups',      label: 'Groups' },
    { id: 'records',     label: 'Records' },
    { id: 'history',     label: 'History' },
    { id: 'roster',      label: 'Roster' },
    { id: 'articles',    label: 'Articles' },
  ];

  function handleNav(p: Page) {
    onNav(p);
    setMenuOpen(false);
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(6,9,15,0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: isMobile ? '0 20px' : '0 36px', height: 'var(--nav-h)',
        overflow: 'hidden',
      }}>
        {/* Pixel art runner */}
        <NavRunner />

        {/* Logo + back button — always grouped on the left */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, position: 'relative', zIndex: 1 }}>
          {canGoBack && current !== 'home' && (
            <button
              onClick={onBack}
              style={{
                background: 'transparent', border: 'none', cursor: 'pointer',
                color: 'var(--text-muted)', fontSize: 18, padding: '6px 4px 6px 0',
                display: 'flex', alignItems: 'center', lineHeight: 1,
              }}
              title="Go back"
            >
              ←
            </button>
          )}
          <div
            onClick={() => handleNav('home')}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <span style={{ fontSize: 22, lineHeight: 1 }}>⚽</span>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: isMobile ? 16 : 19,
              letterSpacing: '0.12em', lineHeight: 1,
              background: 'linear-gradient(135deg, #f5c842 0%, #d4901e 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              WORLD CUP 2026
            </div>
          </div>
        </div>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {links.map(l => {
              const active = current === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => handleNav(l.id)}
                  style={{
                    position: 'relative',
                    background: 'transparent',
                    border: 'none',
                    color: active ? '#fff' : 'var(--text-muted)',
                    fontFamily: 'var(--font-body)', fontWeight: active ? 600 : 500, fontSize: 13,
                    letterSpacing: '0.05em',
                    padding: '6px 14px', borderRadius: 8, cursor: 'pointer',
                    transition: 'color 0.18s',
                  }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)'; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'; }}
                >
                  {l.label}
                  {active && (
                    <span style={{
                      position: 'absolute', bottom: -1, left: '50%',
                      transform: 'translateX(-50%)',
                      width: 20, height: 2,
                      background: 'var(--gold)',
                      borderRadius: 2,
                    }} />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: menuOpen ? 'var(--gold)' : 'var(--text-muted)',
              fontSize: 20, padding: '6px 8px', lineHeight: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        )}
      </nav>

      {/* Mobile drawer */}
      {isMobile && menuOpen && (
        <div style={{
          position: 'fixed', top: 'var(--nav-h)', left: 0, right: 0, zIndex: 99,
          background: 'rgba(6,9,15,0.98)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          padding: '12px 16px 20px',
          display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          {links.map(l => {
            const active = current === l.id;
            return (
              <button
                key={l.id}
                onClick={() => handleNav(l.id)}
                style={{
                  background: active ? 'rgba(245,200,66,0.08)' : 'transparent',
                  border: `1px solid ${active ? 'rgba(245,200,66,0.2)' : 'transparent'}`,
                  color: active ? 'var(--gold)' : 'var(--text)',
                  fontFamily: 'var(--font-body)', fontWeight: active ? 600 : 500,
                  fontSize: 15, letterSpacing: '0.04em',
                  padding: '13px 16px', borderRadius: 10, cursor: 'pointer',
                  textAlign: 'left', transition: 'all 0.15s',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}
              >
                {l.label}
                {active && <span style={{ color: 'var(--gold)', fontSize: 12 }}>●</span>}
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}

// ── Pixel-art nav runners (Brazil → Argentina pass, Argentina → Brazil pass back)
const _P = 3;
function _r(x: number, y: number, fill: string, k: string) {
  return <rect key={k} x={x*_P} y={y*_P} width={_P} height={_P} fill={fill}/>;
}

function NavRunner() {
  const S  = '#f5c5a3'; // skin
  const Ha = '#1a0500'; // hair
  const Ey = '#111111'; // eyes
  // Brazil
  const Y  = '#FFD700'; const Bg = '#003DA5'; const Gr = '#009C3B';
  // Argentina — stripes every 2 cols: blue/white/blue/white/blue
  const Ab = '#6CAEE0'; const Aw = '#f0f4ff'; const Ad = '#0d1b2a';
  const Ak = '#002f6c'; // dark blue for argentina "10"
  // Common
  const W  = '#f0f0f0'; const K  = '#111111';

  // Stripe colour for Argentina jersey (alternates every 2 columns)
  const as = (c: number) => (Math.floor(c / 2) % 2 === 0) ? Ab : Aw;

  // ── Shared head (with eyes) ───────────────────────────────────────────────
  const head: [number,number,string][] = [
    [3,0,S],[4,0,S],[5,0,S],[6,0,S],
    [2,1,S],[3,1,Ha],[4,1,Ha],[5,1,Ha],[6,1,Ha],[7,1,S],
    [2,2,S],[3,2,S],[4,2,S],[5,2,S],[6,2,S],[7,2,S],
    [2,3,S],[3,3,Ey],[4,3,S],[5,3,S],[6,3,Ey],[7,3,S],
    [3,4,S],[4,4,S],[5,4,S],[6,4,S],
  ];

  // ── Brazil jersey + shorts ────────────────────────────────────────────────
  const brJ: [number,number,string][] = [
    // Collar (green)
    [2,5,Gr],[3,5,Gr],[4,5,Gr],[5,5,Gr],[6,5,Gr],[7,5,Gr],
    [1,5,Y],[8,5,Y],
    // Arms + body (wide rows 6-7)
    [0,6,Y],[1,6,Y],[2,6,Y],[3,6,Y],[4,6,Y],[5,6,Y],[6,6,Y],[7,6,Y],[8,6,Y],[9,6,Y],
    [0,7,Y],[1,7,Y],[2,7,Y],[3,7,Y],[4,7,Y],[5,7,Y],[6,7,Y],[7,7,Y],[8,7,Y],[9,7,Y],
    // Body narrowing
    [1,8,Y],[2,8,Y],[3,8,Y],[4,8,Y],[5,8,Y],[6,8,Y],[7,8,Y],[8,8,Y],
    [2,9,Y],[3,9,Y],[4,9,Y],[5,9,Y],[6,9,Y],[7,9,Y],
    // "1" in green
    [3,6,Gr],[3,7,Gr],[3,8,Gr],
    // "0" in green (outline)
    [5,6,Gr],[6,6,Gr],[5,7,Gr],[6,7,Gr],[5,8,Gr],[6,8,Gr],
    // Shorts
    [2,10,Bg],[3,10,Bg],[4,10,Bg],[5,10,Bg],[6,10,Bg],[7,10,Bg],
    [2,11,Bg],[3,11,Bg],[4,11,Bg],[5,11,Bg],[6,11,Bg],[7,11,Bg],
  ];

  // ── Argentina jersey + shorts (proper vertical stripes) ───────────────────
  const arJ: [number,number,string][] = [
    // Collar row
    [1,5,as(1)],[2,5,as(2)],[3,5,as(3)],[4,5,as(4)],[5,5,as(5)],[6,5,as(6)],[7,5,as(7)],[8,5,as(8)],
    // Arms + body rows 6-9 with stripes
    ...[6,7,8,9].flatMap(row => {
      const cols = row <= 7 ? [0,1,2,3,4,5,6,7,8,9] : row === 8 ? [1,2,3,4,5,6,7,8] : [2,3,4,5,6,7];
      return cols.map(c => [c, row, as(c)] as [number,number,string]);
    }),
    // "10" dark blue (override stripes at cols 3-4)
    [3,6,Ak],[3,7,Ak],[3,8,Ak],         // "1"
    [5,6,Ak],[6,6,Ak],[5,8,Ak],[6,8,Ak],[5,7,Ak],[6,7,Ak], // "0"
    // Shorts (very dark navy)
    [2,10,Ad],[3,10,Ad],[4,10,Ad],[5,10,Ad],[6,10,Ad],[7,10,Ad],
    [2,11,Ad],[3,11,Ad],[4,11,Ad],[5,11,Ad],[6,11,Ad],[7,11,Ad],
  ];

  // ── Leg frames (rows 12-16) ───────────────────────────────────────────────
  const f1: [number,number,string][] = [
    // Left thigh forward, right thigh back
    [2,12,W],[3,12,W],[6,12,W],[7,12,W],
    [2,13,W],[3,13,W],[6,13,W],[7,13,W],
    [2,14,W],[3,14,W],[6,14,W],[7,14,W],
    [1,15,K],[2,15,K],[3,15,K],[4,15,K],[6,15,K],[7,15,K],
    [2,16,K],[3,16,K],[6,16,K],[7,16,K],
  ];
  const f2: [number,number,string][] = [
    // Right thigh forward, left thigh back
    [1,12,W],[2,12,W],[7,12,W],[8,12,W],
    [1,13,W],[2,13,W],[7,13,W],[8,13,W],
    [1,14,W],[2,14,W],[7,14,W],[8,14,W],
    [1,15,K],[2,15,K],[7,15,K],[8,15,K],[9,15,K],
    [1,16,K],[2,16,K],[7,16,K],[8,16,K],
  ];

  // ── Ball (4×4 at origin 0,0) ──────────────────────────────────────────────
  const ball: [number,number,string][] = [
    [1,0,W],[2,0,W],
    [0,1,W],[1,1,K],[2,1,K],[3,1,W],
    [0,2,W],[1,2,K],[2,2,K],[3,2,W],
    [1,3,W],[2,3,W],
  ];

  const svgW = 10 * _P;
  const svgH = 17 * _P;
  const ballSz = 4 * _P;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>

      {/* ── Brazil #10 — stationary, faces right ── */}
      <div style={{
        position: 'absolute', top: '50%', marginTop: -(svgH / 2),
        left: '16%',
      }}>
        <div style={{ animation: 'playerBounce 0.6s ease-in-out infinite' }}>
          <svg width={svgW} height={svgH} style={{ display: 'block' }}>
            {[...head, ...brJ].map(([x,y,c],i) => _r(x,y,c,`br${i}`))}
            <g style={{ animation: 'legsF1 0.4s steps(1,end) infinite' }}>
              {f1.map(([x,y,c],i) => _r(x,y,c,`brf1${i}`))}
            </g>
            <g style={{ animation: 'legsF2 0.4s steps(1,end) infinite' }}>
              {f2.map(([x,y,c],i) => _r(x,y,c,`brf2${i}`))}
            </g>
          </svg>
        </div>
      </div>

      {/* ── Argentina #10 — stationary, faces left (mirrored) ── */}
      <div style={{
        position: 'absolute', top: '50%', marginTop: -(svgH / 2),
        left: '55%',
        transform: 'scaleX(-1)',
      }}>
        <div style={{ animation: 'playerBounce 0.6s ease-in-out infinite', animationDelay: '0.3s' }}>
          <svg width={svgW} height={svgH} style={{ display: 'block' }}>
            {[...head, ...arJ].map(([x,y,c],i) => _r(x,y,c,`ar${i}`))}
            <g style={{ animation: 'legsF2 0.4s steps(1,end) infinite' }}>
              {f1.map(([x,y,c],i) => _r(x,y,c,`arf1${i}`))}
            </g>
            <g style={{ animation: 'legsF1 0.4s steps(1,end) infinite' }}>
              {f2.map(([x,y,c],i) => _r(x,y,c,`arf2${i}`))}
            </g>
          </svg>
        </div>
      </div>

      {/* ── Ball — bounces back and forth between the two ── */}
      <div style={{
        position: 'absolute',
        top: '50%',
        marginTop: svgH / 2 - ballSz - 2,
        left: 'calc(16% + 12px)',
        animation: 'ballBounce 8s linear infinite',
      }}>
        <svg width={ballSz} height={ballSz} style={{ display: 'block' }}>
          {ball.map(([x,y,c],i) => _r(x,y,c,`ball${i}`))}
        </svg>
      </div>

    </div>
  );
}

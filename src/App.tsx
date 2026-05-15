import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { useIsMobile } from './hooks/useIsMobile';
import './index.css';
import HomePage from './pages/HomePage';
import GroupsPage from './pages/GroupsPage';
import PlayersPage from './pages/PlayersPage';
import VenuePage from './pages/VenuePage';
import MatchCenterPage from './pages/MatchCenterPage';
import PredictionsPage from './pages/PredictionsPage';
import RecordsPage from './pages/RecordsPage';
import HistoryPage from './pages/HistoryPage';
import CountryProfileModal from './components/CountryProfileModal';
import type { Venue } from './data/venues';

export type Page = 'home' | 'groups' | 'players' | 'venue' | 'matches' | 'predictions' | 'records' | 'history';

export default function App() {
  const [history, setHistory] = useState<Page[]>(['home']);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
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

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Analytics />
      {page !== 'venue' && <Nav current={page} onNav={navTo} onBack={navBack} canGoBack={canGoBack} />}
      {page === 'home'    && <HomePage    onNav={navTo} onVenue={navToVenue} onHistory={() => navTo('history')} onCountryClick={openCountry} />}
      {page === 'groups'  && <GroupsPage  onCountryClick={openCountry} />}
      {page === 'players' && <PlayersPage />}
      {page === 'matches'     && <MatchCenterPage onCountryClick={openCountry} onVenueNav={navToVenue} />}
      {page === 'predictions' && <PredictionsPage />}
      {page === 'records'     && <RecordsPage onCountryClick={openCountry} />}
      {page === 'history'     && <HistoryPage />}
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
    { id: 'players',     label: 'Players' },
    { id: 'predictions', label: 'Predictions' },
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
        {/* Back button */}
        {canGoBack && current !== 'home' && (
          <button
            onClick={onBack}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: 'var(--text-muted)', fontSize: 18, padding: '6px 4px 6px 0',
              display: 'flex', alignItems: 'center', lineHeight: 1,
              marginRight: 4,
            }}
            title="Go back"
          >
            ←
          </button>
        )}

        {/* Logo */}
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

// ── Pixel-art Brazil #10 runner ──────────────────────────────────────────────
const _P = 3; // one "pixel" = 3 CSS px

function _r(x: number, y: number, fill: string, k: string) {
  return <rect key={k} x={x * _P} y={y * _P} width={_P} height={_P} fill={fill} />;
}

function NavRunner() {
  const S  = '#f5c5a3'; // skin
  const Ha = '#1a0500'; // hair
  const Y  = '#FFCC00'; // Brazil yellow jersey
  const B  = '#003DA5'; // Brazil blue shorts
  const W  = '#ffffff'; // socks / ball white
  const K  = '#111111'; // shoes / ball dark
  const G  = '#009C3B'; // green detail

  // ── Shared body pixels (head + jersey + shorts) ──────────────────────────
  const body: [number, number, string][] = [
    // Head
    [3,0,S],[4,0,S],[5,0,S],[6,0,S],
    [2,1,S],[3,1,S],[4,1,S],[5,1,S],[6,1,S],[7,1,S],
    [2,2,S],[3,2,Ha],[4,2,Ha],[5,2,Ha],[6,2,Ha],[7,2,S],
    [2,3,S],[3,3,S],[4,3,S],[5,3,S],[6,3,S],[7,3,S],
    // Jersey body
    [1,4,Y],[2,4,Y],[3,4,Y],[4,4,Y],[5,4,Y],[6,4,Y],[7,4,Y],[8,4,Y],
    [0,5,Y],[1,5,Y],[2,5,Y],[3,5,Y],[4,5,Y],[5,5,Y],[6,5,Y],[7,5,Y],[8,5,Y],[9,5,Y],
    [0,6,Y],[1,6,Y],[2,6,Y],[3,6,Y],[4,6,Y],[5,6,Y],[6,6,Y],[7,6,Y],[8,6,Y],[9,6,Y],
    [1,7,Y],[2,7,Y],[3,7,Y],[4,7,Y],[5,7,Y],[6,7,Y],[7,7,Y],[8,7,Y],
    [2,8,Y],[3,8,Y],[4,8,Y],[5,8,Y],[6,8,Y],[7,8,Y],
    // "#10" on jersey — green "1" + green "0"
    [3,5,G],[3,6,G],[3,7,G],                                     // "1"
    [5,5,G],[6,5,G],[5,6,G],[6,6,G],[5,7,G],[6,7,G],            // "0" (filled block)
    // Green collar stripe
    [2,4,G],[3,4,G],[4,4,G],[5,4,G],[6,4,G],[7,4,G],
    // Shorts
    [2,9,B],[3,9,B],[4,9,B],[5,9,B],[6,9,B],[7,9,B],
    [2,10,B],[3,10,B],[4,10,B],[5,10,B],[6,10,B],[7,10,B],
  ];

  // ── Frame 1 — left leg forward ───────────────────────────────────────────
  const frame1: [number, number, string][] = [
    [2,11,B],[3,11,B],[6,11,B],[7,11,B],
    [2,12,W],[3,12,W],[6,12,W],[7,12,W],
    [2,13,W],[3,13,W],[6,13,W],[7,13,W],
    [1,14,K],[2,14,K],[3,14,K],[4,14,K],[6,14,K],[7,14,K],
    [2,15,K],[3,15,K],[6,15,K],[7,15,K],
  ];

  // ── Frame 2 — right leg forward ──────────────────────────────────────────
  const frame2: [number, number, string][] = [
    [1,11,B],[2,11,B],[7,11,B],[8,11,B],
    [1,12,W],[2,12,W],[7,12,W],[8,12,W],
    [1,13,W],[2,13,W],[7,13,W],[8,13,W],
    [1,14,K],[2,14,K],[7,14,K],[8,14,K],[9,14,K],
    [1,15,K],[2,15,K],[7,15,K],[8,15,K],
  ];

  // ── Soccer ball ──────────────────────────────────────────────────────────
  const ballBase: [number, number, string][] = [
    [11,12,W],[12,12,W],
    [10,13,W],[11,13,K],[12,13,K],[13,13,W],
    [10,14,W],[11,14,K],[12,14,K],[13,14,W],
    [11,15,W],[12,15,W],
  ];

  const svgW = 14 * _P;
  const svgH = 16 * _P;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      overflow: 'hidden', pointerEvents: 'none', zIndex: 0,
    }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        marginTop: -(svgH / 2),
        animation: 'playerRun 22s linear infinite',
        willChange: 'transform',
      }}>
        <div style={{ animation: 'playerBounce 0.22s ease-in-out infinite' }}>
          <svg width={svgW} height={svgH} style={{ display: 'block' }}>
            {body.map(([x, y, c], i) => _r(x, y, c, `b${i}`))}
            {/* Frame 1 legs */}
            <g style={{ animation: 'legsF1 0.22s steps(1, end) infinite' }}>
              {frame1.map(([x, y, c], i) => _r(x, y, c, `f1${i}`))}
            </g>
            {/* Frame 2 legs */}
            <g style={{ animation: 'legsF2 0.22s steps(1, end) infinite' }}>
              {frame2.map(([x, y, c], i) => _r(x, y, c, `f2${i}`))}
            </g>
            {/* Ball */}
            {ballBase.map(([x, y, c], i) => _r(x, y, c, `ball${i}`))}
          </svg>
        </div>
      </div>
    </div>
  );
}

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

// ── Smooth SVG soccer players (Brazil → Argentina pass) ──────────────────────

/** Shared running frame groups for legs + arms */
function RunFrames({ jerseyColor, shortsColor }: { jerseyColor: string; shortsColor: string }) {
  return (
    <>
      {/* Frame 1: left leg/arm forward */}
      <g style={{ animation: 'legsF1 0.25s steps(1,end) infinite' }}>
        {/* Left arm forward */}
        <rect x="-3" y="20" width="10" height="4.5" rx="2.2" fill={jerseyColor} transform="rotate(-25,-3,22)"/>
        {/* Right arm back */}
        <rect x="29" y="22" width="10" height="4.5" rx="2.2" fill={jerseyColor} transform="rotate(20,34,24)"/>
        {/* Left leg (forward, lower) */}
        <rect x="9" y="36" width="9" height="14" rx="3.5" fill="#ffffff"/>
        <rect x="7" y="46" width="13" height="5" rx="2.5" fill="#111"/>
        {/* Right leg (back, higher) */}
        <rect x="20" y="37" width="9" height="11" rx="3.5" fill="#ffffff"/>
        <rect x="19" y="45" width="11" height="4" rx="2" fill="#111"/>
      </g>
      {/* Frame 2: right leg/arm forward */}
      <g style={{ animation: 'legsF2 0.25s steps(1,end) infinite' }}>
        {/* Left arm back */}
        <rect x="-3" y="22" width="10" height="4.5" rx="2.2" fill={jerseyColor} transform="rotate(20,-3,24)"/>
        {/* Right arm forward */}
        <rect x="29" y="20" width="10" height="4.5" rx="2.2" fill={jerseyColor} transform="rotate(-25,34,22)"/>
        {/* Left leg (back, higher) */}
        <rect x="9" y="37" width="9" height="11" rx="3.5" fill="#ffffff"/>
        <rect x="8" y="45" width="11" height="4" rx="2" fill="#111"/>
        {/* Right leg (forward, lower) */}
        <rect x="20" y="36" width="9" height="14" rx="3.5" fill="#ffffff"/>
        <rect x="18" y="46" width="13" height="5" rx="2.5" fill="#111"/>
      </g>
    </>
  );
}

function BrazilPlayer() {
  return (
    <svg width="38" height="52" viewBox="0 0 38 52" style={{ display: 'block', overflow: 'visible' }}>
      {/* Hair */}
      <ellipse cx="19" cy="7" rx="10" ry="8" fill="#1a0500"/>
      {/* Head */}
      <circle cx="19" cy="11" r="10" fill="#f5c5a3"/>
      {/* Ears */}
      <circle cx="9" cy="12" r="3" fill="#f5c5a3"/>
      <circle cx="29" cy="12" r="3" fill="#f5c5a3"/>
      {/* Eyes */}
      <circle cx="14.5" cy="10" r="1.8" fill="#1a0500"/>
      <circle cx="23.5" cy="10" r="1.8" fill="#1a0500"/>
      <circle cx="15" cy="9.5" r="0.7" fill="#fff"/>
      <circle cx="24" cy="9.5" r="0.7" fill="#fff"/>
      {/* Smile */}
      <path d="M15 14 Q19 17 23 14" stroke="#c8956a" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      {/* Jersey */}
      <rect x="8" y="21" width="22" height="14" rx="4" fill="#FFCC00"/>
      {/* Green collar */}
      <rect x="15" y="21" width="8" height="4" rx="2" fill="#009C3B"/>
      {/* Number 10 */}
      <text x="19" y="32" textAnchor="middle" fontSize="5.5" fill="#009C3B" fontFamily="Arial,sans-serif" fontWeight="900">10</text>
      {/* Shorts */}
      <rect x="9" y="35" width="20" height="8" rx="3" fill="#003DA5"/>
      {/* Running frames */}
      <RunFrames jerseyColor="#FFCC00" shortsColor="#003DA5"/>
    </svg>
  );
}

function ArgentinaPlayer() {
  return (
    <svg width="38" height="52" viewBox="0 0 38 52" style={{ display: 'block', overflow: 'visible' }}>
      {/* Hair (Messi - darker brown) */}
      <ellipse cx="19" cy="7" rx="10" ry="8" fill="#3d2200"/>
      {/* Head */}
      <circle cx="19" cy="11" r="10" fill="#f5c5a3"/>
      {/* Ears */}
      <circle cx="9" cy="12" r="3" fill="#f5c5a3"/>
      <circle cx="29" cy="12" r="3" fill="#f5c5a3"/>
      {/* Eyes */}
      <circle cx="14.5" cy="10" r="1.8" fill="#1a0500"/>
      <circle cx="23.5" cy="10" r="1.8" fill="#1a0500"/>
      <circle cx="15" cy="9.5" r="0.7" fill="#fff"/>
      <circle cx="24" cy="9.5" r="0.7" fill="#fff"/>
      {/* Stubble (Messi beard hint) */}
      <rect x="13" y="15.5" width="12" height="2.5" rx="1.2" fill="#7a5500" opacity="0.3"/>
      {/* Jersey - light blue base */}
      <rect x="8" y="21" width="22" height="14" rx="4" fill="#74ACDF"/>
      {/* White stripe */}
      <rect x="16" y="21" width="6" height="14" fill="#ffffff"/>
      {/* Number 10 */}
      <text x="19" y="32" textAnchor="middle" fontSize="5.5" fill="#2A5DA8" fontFamily="Arial,sans-serif" fontWeight="900">10</text>
      {/* Shorts */}
      <rect x="9" y="35" width="20" height="8" rx="3" fill="#1a1a3e"/>
      {/* Running frames (offset phase) */}
      <g style={{ animation: 'legsF2 0.25s steps(1,end) infinite' }}>
        <rect x="-3" y="20" width="10" height="4.5" rx="2.2" fill="#74ACDF" transform="rotate(-25,-3,22)"/>
        <rect x="29" y="22" width="10" height="4.5" rx="2.2" fill="#74ACDF" transform="rotate(20,34,24)"/>
        <rect x="9" y="36" width="9" height="14" rx="3.5" fill="#ffffff"/>
        <rect x="7" y="46" width="13" height="5" rx="2.5" fill="#111"/>
        <rect x="20" y="37" width="9" height="11" rx="3.5" fill="#ffffff"/>
        <rect x="19" y="45" width="11" height="4" rx="2" fill="#111"/>
      </g>
      <g style={{ animation: 'legsF1 0.25s steps(1,end) infinite' }}>
        <rect x="-3" y="22" width="10" height="4.5" rx="2.2" fill="#74ACDF" transform="rotate(20,-3,24)"/>
        <rect x="29" y="20" width="10" height="4.5" rx="2.2" fill="#74ACDF" transform="rotate(-25,34,22)"/>
        <rect x="9" y="37" width="9" height="11" rx="3.5" fill="#ffffff"/>
        <rect x="8" y="45" width="11" height="4" rx="2" fill="#111"/>
        <rect x="20" y="36" width="9" height="14" rx="3.5" fill="#ffffff"/>
        <rect x="18" y="46" width="13" height="5" rx="2.5" fill="#111"/>
      </g>
    </svg>
  );
}

function SoccerBall() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ display: 'block' }}>
      <circle cx="8" cy="8" r="8" fill="#f2f2f2"/>
      {/* Pentagon patches */}
      <circle cx="8" cy="8" r="3" fill="#222"/>
      <circle cx="3" cy="4" r="2" fill="#222"/>
      <circle cx="13" cy="4" r="2" fill="#222"/>
      <circle cx="13" cy="12" r="2" fill="#222"/>
      <circle cx="3" cy="12" r="2" fill="#222"/>
      <circle cx="8" cy="1.5" r="1.8" fill="#222"/>
      <circle cx="8" cy="14.5" r="1.8" fill="#222"/>
      {/* Shine */}
      <circle cx="5" cy="5" r="2" fill="#fff" opacity="0.35"/>
    </svg>
  );
}

function NavRunner() {
  const pH = 52;

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>

      {/* Brazil #10 — starts from left */}
      <div style={{
        position: 'absolute',
        top: `calc(50% - ${pH / 2}px)`,
        animation: 'playerRun 26s linear infinite',
        willChange: 'transform',
      }}>
        <div style={{ animation: 'playerBounce 0.28s ease-in-out infinite' }}>
          <BrazilPlayer />
        </div>
      </div>

      {/* Argentina #10 — 5s ahead of Brazil */}
      <div style={{
        position: 'absolute',
        top: `calc(50% - ${pH / 2}px)`,
        animation: 'playerRun 26s linear infinite',
        animationDelay: '-5s',
        willChange: 'transform',
      }}>
        <div style={{ animation: 'playerBounce 0.28s ease-in-out infinite', animationDelay: '0.14s' }}>
          <ArgentinaPlayer />
        </div>
      </div>

      {/* Ball — travels with Brazil then passes to Argentina */}
      <div style={{
        position: 'absolute',
        top: `calc(50% + ${pH / 2 - 20}px)`,
        animation: 'ballPass 26s linear infinite',
        willChange: 'transform',
      }}>
        <SoccerBall />
      </div>

    </div>
  );
}

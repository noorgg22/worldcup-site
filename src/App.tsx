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
  const [page, setPage] = useState<Page>('home');
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [countryProfile, setCountryProfile] = useState<string | null>(null);

  function navTo(p: Page) {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function navToVenue(venue: Venue) {
    setSelectedVenue(venue);
    setPage('venue');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function openCountry(name: string) {
    if (name) setCountryProfile(name);
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Analytics />
      {page !== 'venue' && <Nav current={page} onNav={navTo} />}
      {page === 'home'    && <HomePage    onNav={navTo} onVenue={navToVenue} onHistory={() => navTo('history')} onCountryClick={openCountry} />}
      {page === 'groups'  && <GroupsPage  onCountryClick={openCountry} />}
      {page === 'players' && <PlayersPage />}
      {page === 'matches'     && <MatchCenterPage onCountryClick={openCountry} onVenueNav={navToVenue} />}
      {page === 'predictions' && <PredictionsPage />}
      {page === 'records'     && <RecordsPage onCountryClick={openCountry} />}
      {page === 'history'     && <HistoryPage />}
      {page === 'venue' && selectedVenue && (
        <VenuePage venue={selectedVenue} onBack={() => navTo('home')} />
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

function Nav({ current, onNav }: { current: Page; onNav: (p: Page) => void }) {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const links: { id: Page; label: string }[] = [
    { id: 'home',        label: 'Home' },
    { id: 'matches',     label: 'Matches' },
    { id: 'groups',      label: 'Groups' },
    { id: 'players',     label: 'Players' },
    { id: 'records',     label: 'Records' },
    { id: 'history',     label: 'History' },
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
      }}>
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

import { useState } from 'react';
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
  const links: { id: Page; label: string }[] = [
    { id: 'home',        label: 'Home' },
    { id: 'matches',     label: 'Matches' },
    { id: 'groups',      label: 'Groups' },
    { id: 'players',     label: 'Players' },
    { id: 'records',     label: 'Records' },
    { id: 'history',     label: 'History' },
    { id: 'predictions', label: 'Predictions' },
  ];

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(6,9,15,0.88)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.07)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 36px', height: 'var(--nav-h)',
    }}>
      {/* Logo */}
      <div
        onClick={() => onNav('home')}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
      >
        <span style={{ fontSize: 24, lineHeight: 1 }}>⚽</span>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 19, letterSpacing: '0.12em', lineHeight: 1,
            background: 'linear-gradient(135deg, #f5c842 0%, #d4901e 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            WORLD CUP 2026
          </div>
        </div>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {links.map(l => {
          const active = current === l.id;
          return (
            <button
              key={l.id}
              onClick={() => onNav(l.id)}
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
    </nav>
  );
}

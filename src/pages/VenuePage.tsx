import { useState, useEffect } from 'react';
import type { Venue } from '../data/venues';
import { useIsMobile } from '../hooks/useIsMobile';

interface Props {
  venue: Venue;
  onBack: () => void;
}

const COUNTRY_FLAG: Record<string, string> = {
  USA: '🇺🇸', Canada: '🇨🇦', Mexico: '🇲🇽',
};

// Fetch the best available photo for a stadium from Wikipedia (pageimages API — more reliable)
async function fetchWikiPhoto(wikiTitle: string): Promise<string | null> {
  try {
    const title = decodeURIComponent(wikiTitle).replace(/_/g, ' ');
    const res = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=1200&origin=*`
    );
    const json = await res.json();
    const pages = json?.query?.pages ?? {};
    const page: any = Object.values(pages)[0];
    return page?.thumbnail?.source ?? null;
  } catch {
    return null;
  }
}

export default function VenuePage({ venue, onBack }: Props) {
  const isMobile = useIsMobile();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoLoading, setPhotoLoading] = useState(true);
  const [photoError, setPhotoError] = useState(false);

  // Wide satellite overview
  const satelliteOverview = `https://maps.google.com/maps?q=${venue.lat},${venue.lng}&t=k&z=14&output=embed`;

  useEffect(() => {
    setPhotoLoading(true);
    setPhotoError(false);
    setPhotoUrl(null);
    fetchWikiPhoto(venue.wikiTitle).then(url => {
      setPhotoUrl(url);
      setPhotoLoading(false);
    });
  }, [venue.wikiTitle]);

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ── Back bar ─────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 0' }}>
        <button onClick={onBack} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'transparent', border: '1px solid var(--border)',
          color: 'var(--text-muted)', fontWeight: 600, fontSize: 13,
          padding: '8px 16px', borderRadius: 8, cursor: 'pointer', transition: 'all 0.2s',
        }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(245,200,66,0.3)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--gold)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
          }}
        >
          ← Back
        </button>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* ── Header ───────────────────────────────────────────────── */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <span style={{ fontSize: 28 }}>{COUNTRY_FLAG[venue.country]}</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>
              {venue.city} · {venue.country}
            </span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 66px)',
            color: 'var(--white)', lineHeight: 1, marginBottom: 14,
          }}>
            {venue.stadium}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.8, maxWidth: 660 }}>
            {venue.description}
          </p>
        </div>

        {/* ── Quick stats ───────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 12, marginBottom: 28 }}>
          {[
            { icon: '🏟️', label: 'Capacity',   value: venue.capacity.toLocaleString() },
            { icon: '⚽', label: 'WC Matches', value: `${venue.matches} games` },
            { icon: '📅', label: 'Built',       value: venue.builtYear },
            { icon: '🌿', label: 'Surface',     value: venue.surface },
          ].map(s => (
            <div key={s.label} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 12, padding: '16px 18px',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <span style={{ fontSize: 22 }}>{s.icon}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--gold)' }}>{s.value}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Photo + Map ───────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>

          {/* LEFT — Stadium interior/main photo */}
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 16, overflow: 'hidden', position: 'relative',
          }}>
            <div style={{
              padding: '13px 18px', borderBottom: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ fontSize: 15 }}>📸</span>
              <span style={{ fontWeight: 700, color: 'var(--white)', fontSize: 14 }}>{venue.stadium}</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 'auto' }}>via Wikipedia</span>
            </div>

            <div style={{ position: 'relative', height: isMobile ? 240 : 400 }}>
              {/* Loading state */}
              {photoLoading && (
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 12,
                  background: 'var(--bg-card2)',
                }}>
                  <div style={{ fontSize: 36 }}>🏟️</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: 13 }}>Loading photo...</div>
                </div>
              )}

              {/* Photo */}
              {photoUrl && !photoError && (
                <img
                  src={photoUrl}
                  alt={venue.stadium}
                  style={{
                    width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'center',
                    display: 'block',
                  }}
                  onError={() => setPhotoError(true)}
                />
              )}

              {/* Error / fallback */}
              {(photoError || (!photoLoading && !photoUrl)) && (
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 12,
                  background: 'linear-gradient(135deg, var(--bg-card2) 0%, var(--bg) 100%)',
                }}>
                  <div style={{ fontSize: 48 }}>🏟️</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--white)' }}>
                    {venue.stadium}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{venue.city}</div>
                </div>
              )}

              {/* Gold gradient overlay at bottom */}
              {photoUrl && !photoError && (
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
                  background: 'linear-gradient(transparent, rgba(8,12,20,0.85))',
                  display: 'flex', alignItems: 'flex-end', padding: '12px 16px',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)', fontSize: 16, color: 'var(--white)',
                    letterSpacing: '0.06em',
                  }}>
                    {venue.city} · Est. {venue.builtYear}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Wide satellite overview */}
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 16, overflow: 'hidden',
          }}>
            <div style={{
              padding: '13px 18px', borderBottom: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ fontSize: 15 }}>🗺️</span>
              <span style={{ fontWeight: 700, color: 'var(--white)', fontSize: 14 }}>Surrounding Area</span>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 'auto' }}>Satellite · Overview</span>
            </div>
            <iframe
              src={satelliteOverview}
              width="100%" height={isMobile ? 240 : 414}
              style={{ border: 'none', display: 'block' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${venue.stadium} overview`}
            />
          </div>
        </div>

        {/* ── Location bar ─────────────────────────────────────────── */}
        <div style={{
          marginTop: 14,
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '14px 20px',
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <span style={{ fontSize: 18 }}>📍</span>
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>Coordinates: </span>
            <span style={{ color: 'var(--text)', fontSize: 12, fontWeight: 600 }}>
              {venue.lat}° N, {Math.abs(venue.lng)}° {venue.lng < 0 ? 'W' : 'E'}
            </span>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <a
              href={`https://www.google.com/maps?q=${venue.lat},${venue.lng}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                color: 'var(--gold)', fontSize: 12, fontWeight: 600,
                textDecoration: 'none', border: '1px solid rgba(245,200,66,0.3)',
                padding: '6px 14px', borderRadius: 6, transition: 'all 0.2s',
              }}
            >
              Open in Google Maps ↗
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}

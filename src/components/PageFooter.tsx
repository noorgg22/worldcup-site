/**
 * PageFooter — appears at the bottom of every page.
 * Contains an AdSense leaderboard ad slot + site links.
 *
 * TO ACTIVATE ADS: replace ca-pub-XXXXXXXXXXXXXXXX with your real
 * AdSense publisher ID and replace XXXXXXXXXX with your ad slot ID.
 * Both are available in your AdSense dashboard under Ads → By ad unit.
 */
export default function PageFooter() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.07)',
      marginTop: 60,
      padding: '40px 24px 32px',
      textAlign: 'center',
    }}>
      {/* ── AdSense leaderboard unit ─────────────────────────────── */}
      {/* Uncomment and fill in your publisher + slot IDs to activate */}
      {/*
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      */}

      {/* Placeholder shown until AdSense is activated */}
      <div style={{
        maxWidth: 728, margin: '0 auto 32px',
        height: 90,
        background: 'rgba(255,255,255,0.03)',
        border: '1px dashed rgba(255,255,255,0.1)',
        borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.2)', fontSize: 11, letterSpacing: '0.1em',
      }}>
        ADVERTISEMENT
      </div>

      {/* Footer links */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 6, flexWrap: 'wrap',
      }}>
        <span style={{ fontSize: 16 }}>⚽</span>
        <span style={{
          fontFamily: 'var(--font-display)', fontSize: 13,
          letterSpacing: '0.1em', color: 'var(--gold)',
        }}>WORLD CUP 2026</span>
        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 11, margin: '0 8px' }}>·</span>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
          Fan-made. All stats sourced from FIFA official records.
        </span>
      </div>
    </footer>
  );
}

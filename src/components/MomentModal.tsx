import { CATEGORY_COLORS, CATEGORY_LABELS, type HistoryMoment } from '../data/wcHistory';

interface Props {
  moment: HistoryMoment;
  onClose: () => void;
}

export default function MomentModal({ moment, onClose }: Props) {
  const catColor = CATEGORY_COLORS[moment.category];

  // Direct embed URL if we have a known video ID
  const embedSrc = moment.youtubeId
    ? `https://www.youtube-nocookie.com/embed/${moment.youtubeId}?autoplay=1&rel=0&modestbranding=1`
    : null;

  const youtubeSearchUrl = moment.videoQuery
    ? `https://www.youtube.com/results?search_query=${encodeURIComponent(moment.videoQuery)}`
    : null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 500,
        background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.18s ease both',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#0d1117',
          border: `1px solid ${catColor}44`,
          borderRadius: 16, maxWidth: 700, width: '100%', maxHeight: '92vh',
          overflowY: 'auto', position: 'relative',
          animation: 'slideUpPanel 0.22s ease both',
        }}
      >
        {/* Top stripe */}
        <div style={{
          height: 4,
          background: `linear-gradient(90deg, ${catColor}, transparent)`,
          borderRadius: '16px 16px 0 0',
        }} />

        <div style={{ padding: '28px 32px 32px' }}>
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 16, right: 20,
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff', width: 32, height: 32, borderRadius: 8,
              cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center',
              justifyContent: 'center', lineHeight: 1,
            }}
          >
            ✕
          </button>

          {/* Category badge */}
          <div style={{ marginBottom: 16 }}>
            <span style={{
              background: `${catColor}22`, color: catColor, fontSize: 11,
              fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '4px 12px', borderRadius: 20, border: `1px solid ${catColor}44`,
            }}>
              {CATEGORY_LABELS[moment.category]}
            </span>
          </div>

          {/* Flags + teams */}
          {moment.flags && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
              <span style={{ fontSize: 38, letterSpacing: 6, lineHeight: 1 }}>
                {moment.flags.join(' ')}
              </span>
              {moment.teams && (
                <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>
                  {moment.teams.join(' vs ')}
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(20px, 3vw, 30px)',
            letterSpacing: '0.06em', color: '#fff',
            margin: '0 0 6px', lineHeight: 1.15,
          }}>
            {moment.title}
          </h2>
          <div style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 20, fontWeight: 500 }}>
            {moment.fullDate}
          </div>

          {/* Summary (highlighted) */}
          <p style={{
            color: catColor, fontSize: 15, fontWeight: 600,
            lineHeight: 1.65, margin: '0 0 16px',
          }}>
            {moment.summary}
          </p>

          {/* Full detail */}
          <p style={{
            color: '#ccc', fontSize: 14.5, lineHeight: 1.8,
            margin: '0 0 24px',
          }}>
            {moment.detail}
          </p>

          {/* ── Video section ── */}
          {embedSrc ? (
            /* Known video ID — embed plays immediately */
            <div style={{
              borderRadius: 12, overflow: 'hidden',
              border: `1px solid ${catColor}22`,
              boxShadow: '0 0 40px rgba(0,0,0,0.6)',
            }}>
              {/* 16:9 ratio wrapper */}
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  src={embedSrc}
                  title={moment.title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  style={{
                    position: 'absolute', top: 0, left: 0,
                    width: '100%', height: '100%',
                    border: 'none',
                  }}
                />
              </div>

              {/* Footer link */}
              <div style={{
                padding: '10px 16px',
                background: 'rgba(255,255,255,0.03)',
                display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}>
                <a
                  href={`https://www.youtube.com/watch?v=${moment.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontSize: 11, color: '#ff4444', fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  Open full video on YouTube ↗
                </a>
              </div>
            </div>
          ) : youtubeSearchUrl ? (
            /* No known ID — single-click YouTube search link */
            <a
              href={youtubeSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                background: 'rgba(255,0,0,0.1)',
                border: '1px solid rgba(255,0,0,0.3)',
                borderRadius: 12, padding: '18px 24px',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,0,0,0.18)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,0,0,0.1)'; }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: '#ff0000',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontSize: 18,
              }}>
                ▶
              </div>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 3 }}>
                  Watch Highlights on YouTube
                </div>
                <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: 12 }}>
                  {moment.videoQuery}
                </div>
              </div>
              <div style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.4)', fontSize: 18 }}>↗</div>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

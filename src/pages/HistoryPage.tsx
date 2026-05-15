import { useState, useMemo } from 'react';
import {
  WC_HISTORY_SORTED,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  type HistoryMoment,
} from '../data/wcHistory';
import MomentModal from '../components/MomentModal';
import PageFooter from '../components/PageFooter';
import { useIsMobile } from '../hooks/useIsMobile';

type FilterCategory = HistoryMoment['category'] | 'all';

const ALL_CATEGORIES: FilterCategory[] = ['all', 'final', 'upset', 'record', 'moment', 'controversy', 'goal'];

export default function HistoryPage() {
  const isMobile = useIsMobile();
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState<FilterCategory>('all');
  const [selected, setSelected] = useState<HistoryMoment | null>(null);

  const filtered = useMemo(() => {
    return WC_HISTORY_SORTED.filter(m => {
      const matchesCat = catFilter === 'all' || m.category === catFilter;
      const matchesSearch = !search || (
        m.title.toLowerCase().includes(search.toLowerCase()) ||
        m.summary.toLowerCase().includes(search.toLowerCase()) ||
        (m.teams?.some(t => t.toLowerCase().includes(search.toLowerCase())) ?? false)
      );
      return matchesCat && matchesSearch;
    });
  }, [search, catFilter]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 64 }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(180deg, rgba(245,200,66,0.07) 0%, transparent 100%)',
        borderBottom: '1px solid rgba(245,200,66,0.1)',
        padding: isMobile ? '36px 20px 24px' : '48px 40px 32px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>📖</div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,5vw,52px)',
          letterSpacing: '0.12em', color: 'var(--gold)', margin: '0 0 8px',
        }}>
          THIS DAY IN WORLD CUP HISTORY
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 15, margin: 0 }}>
          The moments that defined football · 1930 to 2022
        </p>
      </div>

      {/* Filters */}
      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: isMobile ? '16px 16px 0' : '24px 40px 0',
        display: 'flex', flexDirection: 'column', gap: 16,
      }}>
        {/* Search */}
        <input
          type="text"
          placeholder="Search moments, teams, years..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 8, padding: '10px 16px', color: '#fff', fontSize: 14,
            fontFamily: 'var(--font-body)', outline: 'none', width: '100%',
            boxSizing: 'border-box',
          }}
        />

        {/* Category filters */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {ALL_CATEGORIES.map(cat => {
            const color = cat === 'all' ? '#f5c842' : CATEGORY_COLORS[cat as HistoryMoment['category']];
            const active = catFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setCatFilter(cat)}
                style={{
                  background: active ? `${color}22` : 'transparent',
                  border: `1px solid ${active ? color : 'rgba(255,255,255,0.12)'}`,
                  color: active ? color : 'var(--text-muted)',
                  fontSize: 12, fontWeight: 600, letterSpacing: '0.06em',
                  textTransform: 'uppercase', padding: '6px 14px', borderRadius: 20,
                  cursor: 'pointer', transition: 'all 0.15s',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {cat === 'all' ? 'All Moments' : CATEGORY_LABELS[cat as HistoryMoment['category']]}
              </button>
            );
          })}
          <span style={{
            marginLeft: 'auto', color: 'var(--text-muted)', fontSize: 13,
            display: 'flex', alignItems: 'center',
          }}>
            {filtered.length} moment{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Content: grid of cards + modal */}
      <div style={{ maxWidth: 1100, margin: '24px auto 80px', padding: isMobile ? '0 16px' : '0 40px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '60px 0', fontSize: 15 }}>
            No moments found for that search.
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 16,
          }}>
            {filtered.map(m => (
              <MomentCard key={m.id} moment={m} onClick={() => setSelected(m)} />
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <MomentModal moment={selected} onClose={() => setSelected(null)} />
      )}
      <PageFooter />
    </div>
  );
}

/* ─── Moment Card ─── */
function MomentCard({ moment, onClick }: { moment: HistoryMoment; onClick: () => void }) {
  const catColor = CATEGORY_COLORS[moment.category];
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '20px', cursor: 'pointer',
        transition: 'all 0.2s', position: 'relative', overflow: 'hidden',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = catColor + '55';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
      }}
    >
      {/* Top stripe */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${catColor}, transparent)`,
      }} />

      {/* Category + date */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span style={{
          background: catColor + '22', color: catColor,
          fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
          textTransform: 'uppercase', padding: '3px 10px', borderRadius: 20,
          border: `1px solid ${catColor}44`,
        }}>
          {CATEGORY_LABELS[moment.category]}
        </span>
        <span style={{ color: 'var(--text-muted)', fontSize: 12, fontWeight: 600 }}>
          {moment.fullDate}
        </span>
      </div>

      {/* Flags */}
      {moment.flags && (
        <div style={{ fontSize: 24, marginBottom: 10, letterSpacing: 4 }}>
          {moment.flags.join(' ')}
        </div>
      )}

      {/* Title */}
      <h3 style={{
        color: '#fff', fontSize: 16, fontWeight: 700, margin: '0 0 8px',
        lineHeight: 1.3,
      }}>
        {moment.title}
      </h3>

      {/* Summary */}
      <p style={{
        color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.6,
        margin: '0 0 14px',
      }}>
        {moment.summary}
      </p>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ color: catColor, fontSize: 12, fontWeight: 600 }}>Read more →</span>
        {moment.youtubeId && (
          <span style={{
            background: 'rgba(255,0,0,0.12)', border: '1px solid rgba(255,0,0,0.25)',
            color: '#ff4444', fontSize: 11, fontWeight: 700, padding: '3px 10px',
            borderRadius: 6, letterSpacing: '0.04em',
          }}>
            ▶ VIDEO
          </span>
        )}
      </div>
    </div>
  );
}

// MomentModal is imported from ../components/MomentModal

import { useState, useMemo, useEffect, useRef, type ReactNode } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { ALL_MATCHES, KNOCKOUT_ROUNDS } from '../data/matches';
import type { Match, MatchStatsFull } from '../data/matches';
import { GROUP_COLORS } from '../data/wcStats';
import VenueGlobe from '../components/VenueGlobe';
import Flag from '../components/Flag';
import PageFooter from '../components/PageFooter';
import type { Venue as VenueData } from '../data/venues';
import { venues as ALL_VENUES } from '../data/venues';

// ── Venue photo cache (shared across all MatchCards) ─────────────────────────
const venuePhotoCache: Record<string, string | null> = {};
const venueByStadium = Object.fromEntries(ALL_VENUES.map(v => [v.stadium, v]));

async function fetchVenuePhoto(wikiTitle: string): Promise<string | null> {
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

// ── Scroll-reveal wrapper ─────────────────────────────────────────────────────
function RevealSection({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.06 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(22px)',
      transition: `opacity 0.52s ease ${delay}s, transform 0.52s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

const GROUPS = ['A','B','C','D','E','F','G','H','I','J','K','L'];

const ROUND_LABEL: Record<string, string> = {
  group: 'Group Stage', r32: 'Round of 32', r16: 'Round of 16',
  qf: 'Quarter-Final', sf: 'Semi-Final', final: 'Final',
};

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  upcoming:  { bg: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)', label: 'UPCOMING' },
  live:      { bg: 'rgba(239,83,80,0.15)',   color: '#ef5350',           label: '● LIVE' },
  completed: { bg: 'rgba(102,187,106,0.12)', color: '#66bb6a',           label: 'FT' },
};

// ── Long display date ─────────────────────────────────────────────────────────
const LONG_DATE: Record<string, string> = {
  '2026-06-11': 'Thursday, June 11', '2026-06-12': 'Friday, June 12',
  '2026-06-13': 'Saturday, June 13', '2026-06-14': 'Sunday, June 14',
  '2026-06-15': 'Monday, June 15',   '2026-06-16': 'Tuesday, June 16',
  '2026-06-17': 'Wednesday, June 17','2026-06-19': 'Friday, June 19',
  '2026-06-20': 'Saturday, June 20', '2026-06-21': 'Sunday, June 21',
  '2026-06-22': 'Monday, June 22',   '2026-06-23': 'Tuesday, June 23',
  '2026-06-24': 'Wednesday, June 24','2026-06-25': 'Thursday, June 25',
  '2026-06-26': 'Friday, June 26',   '2026-06-27': 'Saturday, June 27',
  '2026-06-28': 'Sunday, June 28',   '2026-06-29': 'Monday, June 29',
  '2026-06-30': 'Tuesday, June 30',  '2026-07-01': 'Wednesday, July 1',
};

export default function MatchCenterPage({ onCountryClick, onVenueNav }: { onCountryClick?: (name: string) => void; onVenueNav?: (venue: VenueData) => void }) {
  const isMobile = useIsMobile();
  const [roundTab, setRoundTab]       = useState<'group' | 'knockout'>('group');
  const [groupFilter, setGroupFilter] = useState<string>('all');
  const [search, setSearch]           = useState('');
  const [expandedId, setExpandedId]   = useState<string | null>(null);

  const filtered = useMemo(() => {
    return ALL_MATCHES.filter(m => {
      if (groupFilter !== 'all' && m.group !== groupFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return m.home.name.toLowerCase().includes(q) || m.away.name.toLowerCase().includes(q);
      }
      return true;
    });
  }, [groupFilter, search]);

  // Group by date for display
  const byDate = useMemo(() => {
    const map: Record<string, Match[]> = {};
    filtered.forEach(m => {
      if (!map[m.isoDate]) map[m.isoDate] = [];
      map[m.isoDate].push(m);
    });
    return map;
  }, [filtered]);

  const sortedDates = Object.keys(byDate).sort();

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ── Interactive Venue Globe ─────────────────────────────── */}
      <VenueGlobe onVenueNav={onVenueNav} />

      {/* ── Header ─────────────────────────────────────────────── */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        background: 'linear-gradient(180deg, rgba(245,200,66,0.04) 0%, transparent 100%)',
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: isMobile ? '28px 16px 24px' : '48px 24px 36px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16,
            background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.2)',
            borderRadius: 100, padding: '5px 14px',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f5c842', display: 'inline-block' }} />
            <span style={{ fontSize: 10, color: 'var(--gold)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600 }}>
              FIFA World Cup 2026
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,6vw,72px)', color: 'var(--white)', lineHeight: 1, margin: 0 }}>
              MATCH CENTER
            </h1>
            {/* Quick stats */}
            <div style={{ display: 'flex', gap: isMobile ? 8 : 12, paddingBottom: 6, flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
              {[
                { val: '104', label: 'Matches' },
                { val: '48',  label: 'Teams' },
                { val: '12',  label: 'Groups' },
                { val: '16',  label: 'Venues' },
              ].map(s => (
                <div key={s.label} style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 10, padding: '8px 16px', textAlign: 'center',
                }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--gold)', lineHeight: 1 }}>{s.val}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky filter bar ──────────────────────────────────── */}
      <div style={{
        position: 'sticky', top: 64, zIndex: 50,
        background: 'rgba(6,9,15,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', padding: isMobile ? '0 16px' : '0 24px' }}>

          {/* Stage toggle + search row */}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: isMobile ? 'stretch' : 'center', gap: isMobile ? 10 : 12, padding: isMobile ? '12px 0 10px' : '14px 0 12px' }}>
            {/* Segmented control */}
            <div style={{
              display: 'flex',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 10, padding: 3, gap: 2,
            }}>
              {(['group', 'knockout'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => { setRoundTab(tab); setGroupFilter('all'); }}
                  style={{
                    flex: isMobile ? 1 : undefined,
                    background: roundTab === tab
                      ? 'linear-gradient(135deg, rgba(245,200,66,0.18), rgba(245,200,66,0.08))'
                      : 'transparent',
                    border: roundTab === tab ? '1px solid rgba(245,200,66,0.3)' : '1px solid transparent',
                    color: roundTab === tab ? 'var(--gold)' : 'var(--text-muted)',
                    fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 11,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '9px 18px', borderRadius: 7, cursor: 'pointer',
                    transition: 'all 0.2s', whiteSpace: 'nowrap',
                  }}
                >
                  {tab === 'group' ? '⚽ Group Stage' : '🏆 Knockouts'}
                </button>
              ))}
            </div>

            {/* Search */}
            <div style={{ position: 'relative', flex: isMobile ? undefined : undefined, width: isMobile ? '100%' : undefined, marginLeft: isMobile ? 0 : 'auto' }}>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search team…"
                style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  color: 'var(--white)', fontFamily: 'var(--font-body)',
                  fontSize: 13, padding: '9px 14px 9px 34px',
                  borderRadius: 9, outline: 'none',
                  width: isMobile ? '100%' : 190,
                  transition: 'border-color 0.2s', boxSizing: 'border-box',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(245,200,66,0.35)')}
                onBlur={e  => (e.currentTarget.style.borderColor = 'var(--border)')}
              />
              <span style={{
                position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)',
                fontSize: 13, opacity: 0.35, pointerEvents: 'none',
              }}>🔍</span>
            </div>
          </div>

          {/* Group pills — horizontal scroll, single row */}
          {roundTab === 'group' && (
            <div style={{ position: 'relative', marginBottom: 14 }}>
              <div style={{
                display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 2,
                scrollbarWidth: 'none', msOverflowStyle: 'none',
              }}>
                {/* "All" pill */}
                <button
                  onClick={() => setGroupFilter('all')}
                  style={{
                    flexShrink: 0,
                    background: groupFilter === 'all' ? 'rgba(245,200,66,0.14)' : 'transparent',
                    border: groupFilter === 'all' ? '1px solid rgba(245,200,66,0.4)' : '1px solid var(--border)',
                    color: groupFilter === 'all' ? 'var(--gold)' : 'var(--text-muted)',
                    fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 11,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    padding: '5px 14px', borderRadius: 7, cursor: 'pointer', transition: 'all 0.15s',
                  }}
                >
                  All
                </button>

                {GROUPS.map(g => {
                  const c = GROUP_COLORS[g];
                  const active = groupFilter === g;
                  return (
                    <button
                      key={g}
                      onClick={() => setGroupFilter(active ? 'all' : g)}
                      style={{
                        flexShrink: 0,
                        background: active ? `${c}20` : 'transparent',
                        border: active ? `1px solid ${c}55` : '1px solid var(--border)',
                        color: active ? c : 'var(--text-muted)',
                        fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 11,
                        letterSpacing: '0.08em', textTransform: 'uppercase',
                        padding: '5px 13px', borderRadius: 7, cursor: 'pointer', transition: 'all 0.15s',
                        boxShadow: active ? `0 0 10px ${c}30` : 'none',
                      }}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
              {/* Right fade hint */}
              <div style={{
                position: 'absolute', right: 0, top: 0, bottom: 2, width: 40,
                background: 'linear-gradient(to right, transparent, rgba(6,9,15,0.92))',
                pointerEvents: 'none',
              }} />
            </div>
          )}
        </div>
      </div>

      {/* ── Match list ─────────────────────────────────────────── */}
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: isMobile ? '20px 16px 80px' : '36px 24px 100px' }}>

        {/* GROUP STAGE */}
        {roundTab === 'group' && (
          <>
            {sortedDates.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--text-muted)', fontSize: 14 }}>
                No matches found
              </div>
            ) : (
              sortedDates.map((iso, idx) => (
                <RevealSection key={iso} delay={Math.min(idx * 0.03, 0.18)}>
                  <div style={{ marginBottom: 32 }}>
                    {/* Date header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                      <div style={{
                        fontFamily: 'var(--font-display)', fontSize: 12, color: 'var(--gold)',
                        letterSpacing: '0.14em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                      }}>
                        {LONG_DATE[iso] || iso}
                      </div>
                      <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                      <div style={{
                        fontSize: 10, color: 'var(--text-muted)', fontWeight: 600,
                        background: 'var(--bg-card)', border: '1px solid var(--border)',
                        borderRadius: 5, padding: '2px 9px', whiteSpace: 'nowrap',
                        letterSpacing: '0.06em',
                      }}>
                        {byDate[iso].length} {byDate[iso].length === 1 ? 'match' : 'matches'}
                      </div>
                    </div>

                    {/* Cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {byDate[iso].map(match => (
                        <MatchCard
                          key={match.id}
                          match={match}
                          expanded={expandedId === match.id}
                          onToggle={() => setExpandedId(expandedId === match.id ? null : match.id)}
                          onCountryClick={onCountryClick}
                        />
                      ))}
                    </div>
                  </div>
                </RevealSection>
              ))
            )}
          </>
        )}

        {/* KNOCKOUT */}
        {roundTab === 'knockout' && (
          <div>
            <RevealSection>
              <div style={{
                background: 'rgba(245,200,66,0.06)', border: '1px solid rgba(245,200,66,0.18)',
                borderRadius: 16, padding: '24px 28px', marginBottom: 28,
                display: 'flex', alignItems: 'center', gap: 16,
              }}>
                <span style={{ fontSize: 32 }}>🏆</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--white)', marginBottom: 4 }}>
                    Knockout Stage Begins July 4
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    32 teams advance from the group stage. Matchups confirmed after final group matches on July 1–2.
                  </div>
                </div>
              </div>
            </RevealSection>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {KNOCKOUT_ROUNDS.map((r, i) => (
                <RevealSection key={r.round} delay={i * 0.07}>
                  <div style={{
                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                    borderRadius: 14, padding: '20px 24px',
                    display: 'flex', alignItems: 'center', gap: 18,
                    transition: 'border-color 0.2s',
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(245,200,66,0.2)'}
                    onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'}
                  >
                    <div style={{
                      width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                      background: 'rgba(245,200,66,0.07)', border: '1px solid rgba(245,200,66,0.18)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                    }}>
                      {r.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--white)', marginBottom: 3 }}>
                        {r.label}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                        {r.dates} · {r.matches} {r.matches === 1 ? 'match' : 'matches'}
                      </div>
                    </div>
                    <div style={{
                      background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                      borderRadius: 7, padding: '5px 12px',
                      fontSize: 10, color: 'var(--text-muted)', fontWeight: 700,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                    }}>
                      TBD
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        )}

      </div>
      <PageFooter />
    </div>
  );
}


// ── Match Card ────────────────────────────────────────────────────────────────
function MatchCard({ match: m, expanded, onToggle, onCountryClick }: {
  match: Match; expanded: boolean; onToggle: () => void; onCountryClick?: (name: string) => void;
}) {
  const isMobile = useIsMobile();
  const gc = GROUP_COLORS[m.group] || '#f5c842';
  const ss = STATUS_STYLE[m.status];
  const hasScore = m.status !== 'upcoming';

  return (
    <div style={{
      background: expanded ? `${gc}06` : 'var(--bg-card)',
      border: expanded ? `1px solid ${gc}35` : '1px solid var(--border)',
      borderRadius: 14, overflow: 'hidden', transition: 'all 0.2s',
    }}>
      {/* ── Collapsed row ── */}
      {isMobile ? (
        /* ── MOBILE layout ── */
        <div onClick={onToggle} style={{ padding: '12px 14px', cursor: 'pointer' }}>
          {/* Top row: group badge + status */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                background: `${gc}18`, border: `1px solid ${gc}40`,
                borderRadius: 5, padding: '2px 8px',
                fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', color: gc,
              }}>
                GRP {m.group}
              </div>
              {m.matchday && (
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>MD{m.matchday}</div>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                background: ss.bg, borderRadius: 5,
                fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: ss.color,
                padding: '2px 8px',
              }}>
                {ss.label}
              </div>
              <div style={{
                fontSize: 12, color: 'var(--text-muted)',
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s',
              }}>▾</div>
            </div>
          </div>

          {/* Teams row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {/* Home */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 7, minWidth: 0 }}>
              <Flag emoji={m.home.flag} size={20} />
              <span
                onClick={e => { e.stopPropagation(); onCountryClick?.(m.home.name); }}
                style={{
                  fontSize: 13, fontWeight: 700, color: 'var(--white)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  cursor: onCountryClick ? 'pointer' : 'default',
                }}
              >{m.home.name}</span>
            </div>

            {/* Score / time */}
            <div style={{
              flexShrink: 0, textAlign: 'center', minWidth: 70, fontFamily: 'var(--font-display)',
            }}>
              {hasScore ? (
                <span style={{ fontSize: 20, color: 'var(--white)' }}>
                  {m.home.score ?? 0}–{m.away.score ?? 0}
                </span>
              ) : (
                <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                  {m.time}
                </span>
              )}
            </div>

            {/* Away */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 7, minWidth: 0, justifyContent: 'flex-end' }}>
              <span
                onClick={e => { e.stopPropagation(); onCountryClick?.(m.away.name); }}
                style={{
                  fontSize: 13, fontWeight: 700, color: 'var(--white)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  textAlign: 'right', cursor: onCountryClick ? 'pointer' : 'default',
                }}
              >{m.away.name}</span>
              <Flag emoji={m.away.flag} size={20} />
            </div>
          </div>

          {/* City */}
          <div style={{ marginTop: 8, fontSize: 10, color: 'var(--text-muted)' }}>
            📍 {m.city}
          </div>
        </div>
      ) : (
        /* ── DESKTOP layout ── */
        <div
          onClick={onToggle}
          style={{ padding: '14px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14 }}
        >
          {/* Group badge */}
          <div style={{
            background: `${gc}18`, border: `1px solid ${gc}40`,
            borderRadius: 6, padding: '2px 8px', flexShrink: 0,
            fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', color: gc,
          }}>
            GRP {m.group}
          </div>

          {/* Matchday */}
          {m.matchday && (
            <div style={{ fontSize: 10, color: 'var(--text-muted)', flexShrink: 0, minWidth: 32 }}>
              MD{m.matchday}
            </div>
          )}

          {/* Teams + score */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            {/* Home */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, justifyContent: 'flex-end' }}>
              <span
                onClick={e => { e.stopPropagation(); onCountryClick?.(m.home.name); }}
                style={{
                  fontSize: 14, fontWeight: 700, color: 'var(--white)', textAlign: 'right',
                  cursor: onCountryClick ? 'pointer' : 'default',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => { if (onCountryClick) (e.currentTarget as HTMLSpanElement).style.color = '#f5c842'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.color = 'var(--white)'; }}
              >{m.home.name}</span>
              <Flag emoji={m.home.flag} size={22} />
            </div>

            {/* Score / vs */}
            <div style={{
              minWidth: 60, textAlign: 'center', flexShrink: 0,
              fontFamily: 'var(--font-display)',
            }}>
              {hasScore ? (
                <span style={{ fontSize: 22, color: 'var(--white)' }}>
                  {m.home.score ?? 0} – {m.away.score ?? 0}
                </span>
              ) : (
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{m.time}</span>
              )}
            </div>

            {/* Away */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
              <Flag emoji={m.away.flag} size={22} />
              <span
                onClick={e => { e.stopPropagation(); onCountryClick?.(m.away.name); }}
                style={{
                  fontSize: 14, fontWeight: 700, color: 'var(--white)',
                  cursor: onCountryClick ? 'pointer' : 'default',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => { if (onCountryClick) (e.currentTarget as HTMLSpanElement).style.color = '#f5c842'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLSpanElement).style.color = 'var(--white)'; }}
              >{m.away.name}</span>
            </div>
          </div>

          {/* Status + venue */}
          <div style={{ flexShrink: 0, textAlign: 'right', minWidth: 120 }}>
            <div style={{
              display: 'inline-block', background: ss.bg, borderRadius: 5,
              fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: ss.color,
              padding: '2px 8px', marginBottom: 3,
            }}>
              {ss.label}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{m.city}</div>
          </div>

          {/* Expand chevron */}
          <div style={{
            fontSize: 12, color: 'var(--text-muted)', flexShrink: 0,
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s',
          }}>▾</div>
        </div>
      )}

      {/* ── Expanded detail ── */}
      {expanded && (
        <div style={{ borderTop: `1px solid ${gc}25` }}>

          {m.status === 'upcoming' ? (
            <UpcomingPanel match={m} gc={gc} />
          ) : (
            <div style={{ padding: '24px 24px 20px', background: 'rgba(0,0,0,0.2)' }}>
              {/* Venue + time */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                <span style={{ fontSize: 14 }}>🏟️</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{m.venue}, {m.city}</span>
                <span style={{ fontSize: 10, color: 'var(--text-muted)', marginLeft: 8, opacity: 0.6 }}>·</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{m.date} · {m.time}</span>
                <span style={{
                  marginLeft: 'auto', background: `${gc}18`, border: `1px solid ${gc}35`,
                  borderRadius: 5, padding: '2px 10px',
                  fontSize: 10, fontWeight: 700, color: gc, letterSpacing: '0.08em',
                }}>
                  {ROUND_LABEL[m.round]} {m.matchday ? `· Matchday ${m.matchday}` : ''}
                </span>
              </div>
              {/* Scorers */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, marginBottom: 24 }}>
                <div style={{ textAlign: 'right' }}>
                  {m.home.scorers?.map((g, i) => (
                    <div key={i} style={{ fontSize: 12, color: 'var(--text)', marginBottom: 3 }}>
                      {g.player} <span style={{ color: 'var(--text-muted)' }}>{g.minute}'</span>
                      {g.isPenalty && <span style={{ color: '#f5c842', fontSize: 10 }}> (P)</span>}
                      {g.isOwnGoal && <span style={{ color: '#ef5350', fontSize: 10 }}> (OG)</span>}
                    </div>
                  ))}
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: 'var(--white)', textAlign: 'center', lineHeight: 1 }}>
                  {m.home.score ?? 0} – {m.away.score ?? 0}
                </div>
                <div style={{ textAlign: 'left' }}>
                  {m.away.scorers?.map((g, i) => (
                    <div key={i} style={{ fontSize: 12, color: 'var(--text)', marginBottom: 3 }}>
                      {g.player} <span style={{ color: 'var(--text-muted)' }}>{g.minute}'</span>
                      {g.isPenalty && <span style={{ color: '#f5c842', fontSize: 10 }}> (P)</span>}
                      {g.isOwnGoal && <span style={{ color: '#ef5350', fontSize: 10 }}> (OG)</span>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats bars */}
              {m.stats && <MatchStatsView stats={m.stats} homeFlag={m.home.flag} awayFlag={m.away.flag} color={gc} />}

              {/* Highlights */}
              <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
                {m.highlightUrl ? (
                  <a href={m.highlightUrl} target="_blank" rel="noopener noreferrer" style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: 'rgba(239,83,80,0.12)', border: '1px solid rgba(239,83,80,0.35)',
                    color: '#ef5350', fontFamily: 'var(--font-body)', fontWeight: 700,
                    fontSize: 13, padding: '10px 24px', borderRadius: 10,
                    textDecoration: 'none', letterSpacing: '0.04em',
                  }}>
                    ▶ Watch Highlights
                  </a>
                ) : (
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                    color: 'var(--text-muted)', fontFamily: 'var(--font-body)',
                    fontSize: 13, padding: '10px 24px', borderRadius: 10,
                  }}>
                    🎬 Highlights available after the match
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Upcoming Match Panel ─────────────────────────────────────────────────────
// Stadium photo background + team flags + BUY TICKETS CTA
function UpcomingPanel({ match: m, gc }: { match: Match; gc: string }) {
  const venueData = venueByStadium[m.venue];
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (!venueData) return;
    const cached = venuePhotoCache[venueData.id];
    if (cached != null) { setPhoto(cached); return; }
    fetchVenuePhoto(venueData.wikiTitle).then(url => {
      venuePhotoCache[venueData.id] = url;
      setPhoto(url);
    });
  }, [venueData]);

  // ── Ticket URL — replace with your StubHub/SeatGeek affiliate link ──────────
  // Sign up at stubhub.com/partner-program to get your affiliate ID, then
  // replace `YOUR_AFFILIATE_ID` below. Each click earns a commission.
  const ticketSearch = encodeURIComponent(`FIFA World Cup 2026 ${m.home.name} ${m.away.name}`);
  const ticketUrl = `https://www.stubhub.com/secure/search?q=${ticketSearch}&clickref=YOUR_AFFILIATE_ID`;

  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: 320 }}>

      {/* Stadium photo — vibrant, fills the top */}
      {photo && (
        <img
          src={photo}
          alt={m.venue}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 30%',
            opacity: 0.62,
          }}
        />
      )}

      {/* Gradient: transparent top → heavy dark at bottom so text is readable */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(6,9,15,0.1) 0%, rgba(6,9,15,0.55) 45%, rgba(6,9,15,0.97) 100%)',
      }} />

      {/* Content pinned to the bottom */}
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: 320, padding: '0 28px 24px' }}>

        {/* Venue + time + matchday — sits just above the teams */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13 }}>🏟️</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{m.venue}, {m.city}</span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>·</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{m.date} · {m.time}</span>
          <span style={{
            marginLeft: 'auto',
            background: `${gc}18`, border: `1px solid ${gc}35`,
            borderRadius: 6, padding: '2px 10px',
            fontSize: 10, fontWeight: 700, color: gc, letterSpacing: '0.08em',
          }}>
            {ROUND_LABEL[m.round]}{m.matchday ? ` · Matchday ${m.matchday}` : ''}
          </span>
        </div>

        {/* Teams + BUY TICKETS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'center' }}>

          {/* Home team */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ lineHeight: 1, marginBottom: 10, display: 'flex', justifyContent: 'flex-end' }}><Flag emoji={m.home.flag} size={56} style={{ borderRadius: 6 }} /></div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 18, color: '#fff',
              letterSpacing: '0.04em', lineHeight: 1.1,
            }}>{m.home.name}</div>
          </div>

          {/* Center: VS + ticket CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '0 12px' }}>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 13, letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.25)',
            }}>VS</div>
            <a
              href={ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                background: 'linear-gradient(135deg, #f5c842 0%, #d4901e 100%)',
                color: '#06090f',
                fontFamily: 'var(--font-display)', fontSize: 14, letterSpacing: '0.1em',
                fontWeight: 700, padding: '11px 22px', borderRadius: 10,
                textDecoration: 'none', whiteSpace: 'nowrap',
                boxShadow: '0 0 28px rgba(245,200,66,0.4), 0 4px 16px rgba(0,0,0,0.4)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 40px rgba(245,200,66,0.6), 0 4px 20px rgba(0,0,0,0.5)'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 28px rgba(245,200,66,0.4), 0 4px 16px rgba(0,0,0,0.4)'}
            >
              🎫 BUY TICKETS
            </a>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>
              via StubHub
            </div>
          </div>

          {/* Away team */}
          <div style={{ textAlign: 'left' }}>
            <div style={{ lineHeight: 1, marginBottom: 10 }}><Flag emoji={m.away.flag} size={56} style={{ borderRadius: 6 }} /></div>
            <div style={{
              fontFamily: 'var(--font-display)', fontSize: 18, color: '#fff',
              letterSpacing: '0.04em', lineHeight: 1.1,
            }}>{m.away.name}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Match Stats Bars ──────────────────────────────────────────────────────────
function MatchStatsView({ stats, homeFlag, awayFlag, color }: {
  stats: MatchStatsFull; homeFlag: string; awayFlag: string; color: string;
}) {
  const rows: { label: string; h: number; a: number; format?: (v: number) => string }[] = [
    { label: 'Possession', h: stats.possession[0], a: stats.possession[1], format: v => `${v}%` },
    { label: 'Shots',            h: stats.shots[0],          a: stats.shots[1] },
    { label: 'Shots on Target',  h: stats.shotsOnTarget[0],  a: stats.shotsOnTarget[1] },
    { label: 'xG',               h: stats.xG[0],             a: stats.xG[1], format: v => v.toFixed(1) },
    { label: 'Corners',          h: stats.corners[0],        a: stats.corners[1] },
    { label: 'Fouls',            h: stats.fouls[0],          a: stats.fouls[1] },
    { label: 'Yellow Cards',     h: stats.yellowCards[0],    a: stats.yellowCards[1] },
    { label: 'Red Cards',        h: stats.redCards[0],       a: stats.redCards[1] },
  ];

  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20 }}>
      <div style={{
        fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.15em',
        textTransform: 'uppercase', marginBottom: 16, textAlign: 'center',
      }}>
        Match Statistics
      </div>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <Flag emoji={homeFlag} size={24} />
        <span style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>STAT</span>
        <Flag emoji={awayFlag} size={24} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {rows.map(row => {
          const total = row.h + row.a || 1;
          const homePct = (row.h / total) * 100;
          const fmt = row.format || String;
          return (
            <div key={row.label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--white)' }}>{fmt(row.h)}</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{row.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--white)' }}>{fmt(row.a)}</span>
              </div>
              <div style={{ display: 'flex', height: 5, borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${homePct}%`, background: color, transition: 'width 0.4s ease' }} />
                <div style={{ flex: 1, background: 'rgba(255,255,255,0.12)' }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

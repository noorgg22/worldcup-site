import { useState, useEffect } from 'react';
import type { TeamRoster, Player, Position } from '../data/rosters';
import { useIsMobile } from '../hooks/useIsMobile';

interface Props { team: TeamRoster; onBack: () => void; }

async function fetchWikiPhoto(name: string): Promise<string | null> {
  const tryTitle = async (title: string): Promise<string | null> => {
    try {
      const res = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=400&origin=*`
      );
      const json = await res.json();
      const pages = json?.query?.pages ?? {};
      const page: any = Object.values(pages)[0];
      if (page?.missing !== undefined) return null;
      // Reject thumbnails that look like flags, kits, logos (very wide or tall aspect ratio)
      const src = page?.thumbnail?.source ?? null;
      return src;
    } catch { return null; }
  };
  // Try multiple fallbacks to maximise hit rate
  return (
    (await tryTitle(name)) ??
    (await tryTitle(name + ' footballer')) ??
    (await tryTitle(name + ' (footballer)')) ??
    (await tryTitle(name + ' soccer player')) ??
    null
  );
}

const POS_COLOR: Record<Position, string> = {
  GK: '#f5c842', DEF: '#4fc3f7', MID: '#66bb6a', FWD: '#ef5350',
};
const POS_ORDER: Position[] = ['GK','DEF','MID','FWD'];

function PlayerCard({ player }: { player: Player }) {
  const [photo, setPhoto]   = useState<string | null>(null);
  useEffect(() => {
    const name = player.wikiName || player.name;
    fetchWikiPhoto(name).then(url => setPhoto(url));
  }, [player.wikiName, player.name]);

  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 12, overflow: 'hidden',
      transition: 'border-color .2s, transform .2s',
      cursor: 'default',
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = `${POS_COLOR[player.position]}55`;
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
      }}
    >
      {/* Photo area */}
      <div style={{ position: 'relative', height: 180, background: 'var(--bg-card2)', overflow: 'hidden' }}>
        {photo ? (
          <img src={photo} alt={player.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
            onError={() => setPhoto(null)}
          />
        ) : (
          <div style={{
            height: '100%', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <div style={{
              width: 60, height: 60, borderRadius: '50%',
              background: `${POS_COLOR[player.position]}22`,
              border: `2px solid ${POS_COLOR[player.position]}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-display)', fontSize: 24, color: POS_COLOR[player.position],
            }}>{player.number}</div>
          </div>
        )}
        {/* Number badge */}
        <div style={{
          position: 'absolute', top: 8, left: 8,
          background: 'rgba(8,12,20,0.85)', border: `1px solid ${POS_COLOR[player.position]}55`,
          borderRadius: 6, padding: '2px 7px',
          fontFamily: 'var(--font-display)', fontSize: 13, color: POS_COLOR[player.position],
        }}>#{player.number}</div>
        {/* Position badge */}
        <div style={{
          position: 'absolute', top: 8, right: 8,
          background: `${POS_COLOR[player.position]}22`, border: `1px solid ${POS_COLOR[player.position]}55`,
          borderRadius: 6, padding: '2px 7px',
          fontSize: 10, fontWeight: 700, letterSpacing: '0.1em',
          color: POS_COLOR[player.position],
        }}>{player.position}</div>
      </div>

      {/* Info */}
      <div style={{ padding: '10px 12px' }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--white)', marginBottom: 2, lineHeight: 1.3 }}>
          {player.name}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>{player.club}</div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ flex: 1, background: 'var(--bg-elevated)', borderRadius: 6, padding: '5px 0', textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--white)' }}>{player.age}</div>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>AGE</div>
          </div>
          <div style={{ flex: 1, background: 'var(--bg-elevated)', borderRadius: 6, padding: '5px 0', textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--white)' }}>{player.caps}</div>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>CAPS</div>
          </div>
          <div style={{ flex: 1, background: 'var(--bg-elevated)', borderRadius: 6, padding: '5px 0', textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: POS_COLOR[player.position] }}>{player.goals}</div>
            <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>GOALS</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamProfilePage({ team, onBack }: Props) {
  const isMobile = useIsMobile();
  const [activePos, setActivePos] = useState<Position | 'ALL'>('ALL');
  const [coachPhoto, setCoachPhoto] = useState<string | null>(null);

  useEffect(() => {
    const name = team.coach.wikiName || team.coach.name;
    fetchWikiPhoto(name).then(setCoachPhoto);
  }, [team.coach.wikiName, team.coach.name]);

  const starSort = (a: Player, b: Player) => (b.goals - a.goals) || (b.caps - a.caps);
  const filtered = activePos === 'ALL'
    ? [...team.players].sort(starSort)
    : team.players.filter(p => p.position === activePos).sort(starSort);

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', background: 'var(--bg)' }}>

      {/* Back */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 24px 0' }}>
        <button onClick={onBack} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'transparent', border: '1px solid var(--border)',
          color: 'var(--text-muted)', fontWeight: 600, fontSize: 13,
          padding: '8px 16px', borderRadius: 8, cursor: 'pointer',
        }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(245,200,66,0.3)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--gold)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
          }}
        >← Back to Rosters</button>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '28px 24px 80px' }}>

        {/* Hero */}
        <div style={{ marginBottom: 32, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ fontSize: isMobile ? 56 : 80, lineHeight: 1 }}>{team.flag}</div>
          <div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>
              {team.confederation} · Group {team.group} · Expected Squad
            </div>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontSize: isMobile ? 36 : 60,
              color: 'var(--white)', lineHeight: 1, margin: 0,
            }}>{team.country}</h1>
          </div>
        </div>

        {/* Coach card */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 16, padding: 24, marginBottom: 32,
          display: 'flex', gap: 24, flexWrap: 'wrap',
        }}>
          {/* Coach photo */}
          <div style={{
            width: isMobile ? 80 : 120, height: isMobile ? 80 : 120,
            borderRadius: 12, overflow: 'hidden', flexShrink: 0,
            background: 'var(--bg-card2)', border: '1px solid var(--border)',
          }}>
            {coachPhoto ? (
              <img src={coachPhoto} alt={team.coach.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%' }}
                onError={() => setCoachPhoto(null)}
              />
            ) : (
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36 }}>👨‍💼</div>
            )}
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ fontSize: 10, color: 'var(--gold)', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>
              Head Coach
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? 22 : 28, color: 'var(--white)', marginBottom: 4 }}>
              {team.coach.name}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
              {team.coach.nationality} · Age {team.coach.age} · Appointed {team.coach.appointed}
            </div>
            <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
              {team.coach.bio}
            </p>
          </div>
        </div>

        {/* Roster header + filter */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--white)' }}>
            SQUAD — {team.players.length} PLAYERS
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {(['ALL', ...POS_ORDER] as (Position|'ALL')[]).map(pos => {
              const active = activePos === pos;
              return (
                <button key={pos} onClick={() => setActivePos(pos)} style={{
                  padding: '6px 14px', borderRadius: 100,
                  background: active ? (pos === 'ALL' ? 'rgba(245,200,66,0.12)' : `${POS_COLOR[pos as Position]}18`) : 'transparent',
                  border: `1px solid ${active ? (pos === 'ALL' ? 'rgba(245,200,66,0.35)' : `${POS_COLOR[pos as Position]}55`) : 'var(--border)'}`,
                  color: active ? (pos === 'ALL' ? 'var(--gold)' : POS_COLOR[pos as Position]) : 'var(--text-muted)',
                  fontFamily: 'var(--font-body)', fontSize: 11, fontWeight: 700,
                  letterSpacing: '0.1em', cursor: 'pointer', transition: 'all .18s',
                }}>{pos}</button>
              );
            })}
          </div>
        </div>

        {/* Player grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(170px, 1fr))',
          gap: 14,
        }}>
          {filtered.map((player, i) => (
            <div key={player.name} style={{ animation: `fadeUp 0.35s ease both`, animationDelay: `${i * 0.04}s` }}>
              <PlayerCard player={player} />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

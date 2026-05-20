import { useState } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { ARTICLES } from '../data/articles';
import type { Article } from '../data/articles';

const CAT_COLOR: Record<string, string> = {
  Analysis: '#4fc3f7',
  Feature:  '#f5c842',
  Explainer:'#66bb6a',
};

function ArticleCard({ article, onClick }: { article: Article; onClick: () => void }) {
  const color = CAT_COLOR[article.category] ?? '#ab47bc';
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
        transition: 'all .2s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = `${color}55`;
        el.style.transform = 'translateY(-3px)';
        el.style.boxShadow = `0 8px 28px rgba(0,0,0,0.4)`;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = 'var(--border)';
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Color bar */}
      <div style={{ height: 4, background: `linear-gradient(90deg, ${color}, ${color}88)` }} />

      <div style={{ padding: '20px 22px 22px' }}>
        {/* Category + read time */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <span style={{
            background: `${color}18`, border: `1px solid ${color}44`,
            color: color, fontSize: 9, fontWeight: 700,
            letterSpacing: '0.14em', padding: '3px 9px', borderRadius: 100,
          }}>{article.category.toUpperCase()}</span>
          <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>{article.readTime} min read</span>
          <span style={{ fontSize: 11, color: 'var(--text-dim)', marginLeft: 'auto' }}>{article.date}</span>
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 20,
          color: 'var(--white)', lineHeight: 1.2, margin: '0 0 8px',
        }}>{article.title}</h2>

        {/* Subtitle */}
        <p style={{ fontSize: 12, color: color, fontStyle: 'italic', margin: '0 0 12px' }}>
          {article.subtitle}
        </p>

        {/* Excerpt */}
        <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7, margin: '0 0 18px' }}>
          {article.excerpt}
        </p>

        <div style={{
          fontSize: 12, fontWeight: 700, color: color,
          display: 'flex', alignItems: 'center', gap: 4,
        }}>Read Article →</div>
      </div>
    </div>
  );
}

function ArticleView({ article, onBack }: { article: Article; onBack: () => void }) {
  const isMobile = useIsMobile();
  const color = CAT_COLOR[article.category] ?? '#ab47bc';

  return (
    <div style={{ maxWidth: 740, margin: '0 auto', padding: isMobile ? '24px 20px 80px' : '40px 24px 80px' }}>
      {/* Back */}
      <button onClick={onBack} style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'transparent', border: '1px solid var(--border)',
        color: 'var(--text-muted)', fontWeight: 600, fontSize: 13,
        padding: '8px 16px', borderRadius: 8, cursor: 'pointer',
        marginBottom: 32,
      }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = `${color}44`;
          (e.currentTarget as HTMLButtonElement).style.color = color;
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)';
          (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)';
        }}
      >← All Articles</button>

      {/* Category + meta */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <span style={{
          background: `${color}18`, border: `1px solid ${color}44`,
          color: color, fontSize: 9, fontWeight: 700,
          letterSpacing: '0.14em', padding: '3px 9px', borderRadius: 100,
        }}>{article.category.toUpperCase()}</span>
        <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>{article.date} · {article.readTime} min read</span>
      </div>

      {/* Title */}
      <h1 style={{
        fontFamily: 'var(--font-display)', fontSize: isMobile ? 28 : 42,
        color: 'var(--white)', lineHeight: 1.15, margin: '0 0 10px',
      }}>{article.title}</h1>

      {/* Subtitle */}
      <p style={{
        fontSize: 16, color: color, fontStyle: 'italic',
        margin: '0 0 32px', lineHeight: 1.5,
      }}>{article.subtitle}</p>

      {/* Divider */}
      <div style={{ height: 1, background: `linear-gradient(90deg, ${color}44, transparent)`, marginBottom: 32 }} />

      {/* Body */}
      {article.body.map((para, i) => (
        <p key={i} style={{
          fontSize: 15, color: 'var(--text)', lineHeight: 1.85,
          margin: '0 0 22px',
          ...(i === 0 ? {
            fontSize: 16, color: 'var(--white)', fontWeight: 500,
          } : {}),
        }}>{para}</p>
      ))}
    </div>
  );
}

export default function ArticlesPage() {
  const isMobile = useIsMobile();
  const [selected, setSelected] = useState<Article | null>(null);

  if (selected) {
    return (
      <div style={{ paddingTop: 64, minHeight: '100vh', background: 'var(--bg)' }}>
        <ArticleView article={selected} onBack={() => setSelected(null)} />
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Hero */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px 40px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-block', background: 'rgba(245,200,66,0.1)',
          border: '1px solid rgba(245,200,66,0.25)', borderRadius: 100,
          padding: '5px 16px', fontSize: 11, fontWeight: 700,
          letterSpacing: '0.15em', color: 'var(--gold)', marginBottom: 16,
        }}>✍️ WORLD CUP ANALYSIS</div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: isMobile ? 36 : 56,
          color: 'var(--white)', lineHeight: 1, margin: '0 0 12px',
        }}>ARTICLES &amp; <span className="gold-text">FEATURES</span></h1>
        <p style={{ color: 'var(--text-muted)', fontSize: 14, maxWidth: 460, margin: '0 auto' }}>
          In-depth analysis, features, and explainers on the 2026 FIFA World Cup.
        </p>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 20,
        }}>
          {ARTICLES.map((article, i) => (
            <div key={article.id} style={{ animation: 'fadeUp 0.35s ease both', animationDelay: `${i * 0.07}s` }}>
              <ArticleCard article={article} onClick={() => { setSelected(article); window.scrollTo({ top: 0, behavior: 'instant' }); }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

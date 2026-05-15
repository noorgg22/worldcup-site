/**
 * Flag — renders a country flag as an <img> from flagcdn.com instead of
 * a Unicode emoji, so it works on Windows and every other platform.
 *
 * Usage:  <Flag emoji="🇦🇷" size={24} />
 *
 * flagcdn.com provides free flag images for every ISO 3166-1 alpha-2 code.
 * We extract the 2-letter code from the regional-indicator emoji pair.
 */
export default function Flag({
  emoji,
  size = 24,
  style,
}: {
  emoji: string;
  size?: number;
  style?: React.CSSProperties;
}) {
  // Regional indicator Unicode block starts at U+1F1E6 (= 'A').
  // Two consecutive regional indicators form a flag emoji.
  const codePoints = [...emoji]
    .map(c => c.codePointAt(0) ?? 0)
    .filter(p => p >= 0x1F1E6 && p <= 0x1F1FF);

  if (codePoints.length < 2) {
    // Not a flag emoji — render as-is
    return <span style={{ fontSize: size, lineHeight: 1, ...style }}>{emoji}</span>;
  }

  const iso = codePoints
    .slice(0, 2)
    .map(p => String.fromCodePoint(p - 0x1F1E6 + 0x41)) // offset back to A–Z
    .join('')
    .toLowerCase();

  return (
    <img
      src={`https://flagcdn.com/w40/${iso}.png`}
      srcSet={`https://flagcdn.com/w80/${iso}.png 2x`}
      alt={iso.toUpperCase()}
      loading="lazy"
      style={{
        width: Math.round(size * 1.4),
        height: size,
        objectFit: 'cover',
        borderRadius: 3,
        verticalAlign: 'middle',
        flexShrink: 0,
        ...style,
      }}
      onError={e => {
        // Fallback: hide broken image
        (e.currentTarget as HTMLImageElement).style.display = 'none';
      }}
    />
  );
}

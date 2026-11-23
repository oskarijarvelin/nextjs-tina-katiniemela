import Link from './Link';

// Pyöristetty painikelinkki (valkoinen täytetty tai ääriviiva), käytetään hero-, nosto- ym. lohkoissa.
export default function PillLink({ href, children, filled = false, sx = {}, ...props }) {
  const isExternal = typeof href === 'string' && href.startsWith('http');
  return (
    <Link
      href={href || '#'}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1,
        px: 3,
        py: 1,
        borderRadius: 999,
        border: '1px solid',
        borderColor: filled ? '#fff' : 'rgba(255,255,255,.7)',
        backgroundColor: filled ? '#fff' : 'transparent',
        color: filled ? '#000' : '#fff',
        textDecoration: 'none',
        fontSize: { xs: 15, lg: 17 },
        lineHeight: 1.4,
        transition: 'background-color .3s ease, color .3s ease, border-color .3s ease',
        '&:hover': filled
          ? { backgroundColor: '#ddd', borderColor: '#ddd' }
          : { backgroundColor: 'rgba(255,255,255,.12)', borderColor: '#fff' },
        ...sx,
      }}
    >
      {children}
    </Link>
  );
}

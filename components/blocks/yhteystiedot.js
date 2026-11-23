import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Link from '../Link';
import settings from '../../content/settings/index.json';

// "Ota yhteyttä" -lohko, jonka tiedot tulevat Asetuksista: päivitetään yhdessä paikassa,
// muutos näkyy kaikilla sivuilla.
function kahva(url) {
  const osa = (url || '').replace(/\/+$/, '').split('/').pop();
  return osa ? `@${decodeURIComponent(osa)}` : url;
}

export default function YhteystiedotBlock({ block }) {
  const rivit = [
    settings.sahkoposti && { nimi: 'Sähköposti', href: `mailto:${settings.sahkoposti}`, teksti: settings.sahkoposti },
    settings.facebook_url && { nimi: 'Facebook', href: settings.facebook_url, teksti: kahva(settings.facebook_url) },
    settings.instagram_url && { nimi: 'Instagram', href: settings.instagram_url, teksti: kahva(settings.instagram_url) },
    settings.linkedin_url && { nimi: 'LinkedIn', href: settings.linkedin_url, teksti: settings.sivuston_nimi },
  ].filter(Boolean);

  return (
    <Box sx={{ my: { xs: 6, lg: '200px' }, px: { xs: 4, lg: 12 }, textAlign: 'center' }}>
      <Container maxWidth="md" disableGutters>
        <Typography variant="h2" sx={{ fontSize: { xs: '4rem', lg: '7rem' }, mt: { xs: 4, lg: 0 }, mb: { xs: 4, lg: 8 } }}>
          {block.yhteystiedot_otsikko || 'Ota yhteyttä'}
        </Typography>
        {rivit.map((r) => (
          <Typography key={r.nimi} sx={{ mb: 2 }}>
            <b>{r.nimi}:</b>{' '}
            <Link
              href={r.href}
              {...(r.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              sx={{ color: '#AAA', textDecoration: 'underline', transition: 'color .3s ease', '&:hover': { color: '#fff' }, overflowWrap: 'anywhere' }}
            >
              {r.teksti}
            </Link>
          </Typography>
        ))}
        {settings.yritys && <Typography sx={{ mt: 3 }}>{settings.yritys}</Typography>}
      </Container>
    </Box>
  );
}

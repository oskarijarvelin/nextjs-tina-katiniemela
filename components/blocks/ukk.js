import Head from 'next/head';
import RichText from '../RichText';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Muuttaa Tinan rich-text-rakenteen pelkäksi tekstiksi FAQPage-rakenteista dataa varten.
function tekstiksi(node) {
  if (!node) return '';
  if (typeof node === 'string') return node;
  if (node.text) return node.text;
  const lapset = (node.children || []).map(tekstiksi);
  const lohko = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'blockquote'].includes(node.type);
  return lapset.join('') + (lohko ? '\n' : '');
}

export default function UkkBlock({ block }) {
  const lista = (block.ukk_lista || []).filter((k) => k?.kysymys);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: lista.map((k) => ({
      '@type': 'Question',
      name: k.kysymys,
      acceptedAnswer: { '@type': 'Answer', text: tekstiksi(k.vastaus).trim() },
    })),
  };

  return (
    <Box sx={{ my: { xs: 6, lg: '160px' } }}>
      {lista.length > 0 && (
        <Head>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        </Head>
      )}
      <Container maxWidth="md">
        <Typography variant="h2" sx={{ fontSize: { xs: '4rem', lg: '6rem' }, mb: { xs: 3, lg: 5 }, textAlign: 'center' }}>
          {block.ukk_otsikko}
        </Typography>
        {block.ukk_sisalto && (
          <Box sx={{ mb: { xs: 4, lg: 6 }, textAlign: 'center' }}>
            <RichText content={block.ukk_sisalto} />
          </Box>
        )}
        {lista.map((k, i) => (
          <Accordion
            key={i}
            disableGutters
            elevation={0}
            sx={{
              backgroundColor: 'transparent',
              borderTop: '1px solid #333',
              '&:last-of-type': { borderBottom: '1px solid #333' },
              '&:before': { display: 'none' },
              '& a': { color: '#AAA' },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />} sx={{ px: 0 }}>
              <Typography component="h3" sx={{ fontSize: { xs: 17, lg: 19 }, fontWeight: 700 }}>{k.kysymys}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, pt: 0, color: '#ddd' }}>
              <RichText content={k.vastaus} />
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}

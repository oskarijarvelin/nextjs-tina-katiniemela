import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const KokemusBox = styled(Box)({
  '& a:not(.linkki)': {
    color: '#AAA',
    textDecoration: 'underline',
    transition: 'color .3s ease',
  },
  '& a:not(.linkki):hover': {
    color: '#FFF',
  },
  '& a.linkki': {
    color: '#FFF',
    textDecoration: 'none',
    paddingRight: 10,
    transition: 'padding .3s ease, color .3s ease',
  },
  '& a.linkki:hover': {
    color: '#CCC',
    paddingLeft: 10,
    paddingRight: 0,
  },
});

export default function KokemusBlock({ block }) {
  return (
    <KokemusBox sx={{ my: { xs: 6, lg: '200px' } }}>
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ fontSize: { xs: '4rem', lg: '7rem' }, mt: { xs: 4, lg: 0 }, mb: { xs: 3, lg: 6 }, textAlign: 'center' }}>{block?.kokemus_otsikko}</Typography>
        {block.kokemus_sisalto &&
          <Box sx={{ mb: { xs: 6, lg: 12 }, textAlign: 'center' }}>
            <TinaMarkdown content={block?.kokemus_sisalto} />
          </Box>
        }
        {block?.kokemus_lista?.map((k, i) => (
          <Box key={i} sx={{ display: 'flex', flexWrap: 'wrap', mb: 8 }}>
            <Box sx={{ pt: '4px', pb: 3, flex: { xs: '0 0 100%', md: '0 0 180px' }, maxWidth: { xs: '100%', md: '180px' }, width: { xs: '100%', md: '180px' } }}>
              <Typography>{k.ajankohta}</Typography>
            </Box>
            <Box sx={{ pl: { xs: 3, md: 8 }, flex: { xs: '0 0 100%', md: '0 0 calc(100% - 180px)' }, maxWidth: { xs: '100%', md: 'calc(100% - 180px)' }, width: { xs: '100%', md: 'calc(100% - 180px)' } }}>
              <Typography variant="body" component="h3" sx={{ mb: 2, fontWeight: 700 }}>{k.title}</Typography>
              <TinaMarkdown content={k.kuvaus} />
            </Box>
          </Box>
        ))}
      </Container>
    </KokemusBox>
  )
}
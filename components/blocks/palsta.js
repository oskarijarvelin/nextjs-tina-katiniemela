import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { styled } from '@mui/material/styles';
import Link from '../Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const PalstaBox = styled(Box)({
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

export default function PalstaBlock({block}) {
  return (
    <Container maxWidth="md" >
        <PalstaBox sx={{ py: {xs: 8, lg: 16 }, px: 2 }}>
            <Typography variant="h2" sx={{ mb: { xs: 4, lg: 8 }, pr: { xs: 0, lg: 12 } }}>{block.palsta_otsikko}</Typography>
            <Box sx={{ pl: {xs: 2, lg: 12 } }}>
              <TinaMarkdown content={block.palsta_sisalto} />
            </Box>

            {block.linkit &&
              <Box sx={{ pl: {xs: 2, lg: 12 }, display: 'flex', flexWrap: 'wrap' }}>
                {block?.linkit?.map((linkki, i) => (
                  <Box>
                    ↪ <Link key={i} className="linkki" href={linkki.url} sx={{ mr: 4, fontSize: { xs: 24, lg: 36 }, fontFamily: 'MonteCarlo' }}>{linkki.title}</Link>
                  </Box>
                ))}
              </Box>
            }
            
        </PalstaBox>
    </Container>
  )
}
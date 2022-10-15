import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { styled } from '@mui/material/styles';
import Link from '../Link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const PalstaBox = styled(Box)({
  '& img': {
    objectFit: 'cover',
    objectPosition: 'top center',
  },
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
    <PalstaBox sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: { xs: 'column-reverse', lg: block.palsta_reverse ? 'row-reverse' : 'row' }, justifyContent: 'center', height: { xs: 'auto', lg: block.palsta_kuva ? '100vh' : 'auto' }, overflow: 'hidden', my: { xs: 6, lg: '200px' } }}>
      <Box sx={{ flex: {xs: '0 0 100%', lg: '0 0 50%' }, display: 'flex', alignItems: 'center', mt: { xs: 0, lg: '64px' }, px: {xs: 4, lg: 12 }, position: 'relative' }}>
        <Box sx={{ textAlign: block.palsta_kuva ? 'left' : 'center', width: '100%' }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '4rem', lg: '7rem' }, mt: { xs: 4, lg: 0 }, mb: { xs: 4, lg: 8 } }}>{block.palsta_otsikko}</Typography>
          <TinaMarkdown content={block.palsta_sisalto} />
          {block.palsta_linkit &&
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: block.palsta_kuva ? 'flex-start' : 'center', mt: { xs: 2, lg: 4 } }}>
              {block?.palsta_linkit?.map((linkki, i) => (
                <Box key={i} sx={{ mr: block.palsta_kuva ? 4 : 2, ml: block.palsta_kuva ? 0 : 2 }}>
                  ↪ <Link className="linkki" href={linkki.url} sx={{ fontSize: { xs: 28, lg: 36 }, fontFamily: 'MonteCarlo' }}>{linkki.title}</Link>
                </Box>
              ))}
            </Box>
          }
        </Box>
        {block.palsta_kuvateksti &&     
          <Box sx= {{ position: 'absolute', left: { xs: 0, lg: block.palsta_reverse ? 0 : 'unset' }, right: { xs: 'unset', lg: block.palsta_reverse ? 'unset' : 0 }, bottom: {xs: 'unset', lg: 0 }, top: { xs: -4, lg: 'unset' } }}>
            <Typography sx={{ fontSize: { xs: 11, lg: 14 }, color: '#666', px: { xs: '2px', lg: 0 }, py: {xs: 0, lg: '2px' }, lineHeight: 1, writingMode: { xs: 'unset', lg: 'vertical-rl' }, transform: { xs: 'unset', lg: block.palsta_reverse ? 'unset' : 'rotate(180deg)' }}}>{block.palsta_kuvateksti}</Typography>
          </Box>
        }
      </Box>
      {block.palsta_kuva &&
        <Box sx={{ flex: {xs: '0 0 100%', lg: '0 0 50%' }, pt: { xs: '64px', lg: 0 }, height: { xs: 'auto', lg: '100%' } }}>
          <img src={block.palsta_kuva} width="100%" height="100%" />
        </Box>
      }
    </PalstaBox>
  )
}
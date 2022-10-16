import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { styled } from '@mui/material/styles';

import Link from '../Link';
import Video from '../Video';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { FaYoutube } from 'react-icons/fa';

const VideotBox = styled(Box)({
  '& img': {
    maxWidth: '100%',
    height: 'auto',
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

export default function VideotBlock({ block }) {
  function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
  }

  return (
    <VideotBox sx={{ my: { xs: 6, lg: '200px' } }}>
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ fontSize: { xs: '4rem', lg: '7rem' }, mt: { xs: 4, lg: 0 }, mb: { xs: 3, lg: 6 }, textAlign: 'center' }}>{block?.videot_otsikko}</Typography>
        {block.videot_sisalto &&
          <Box sx={{ mb: { xs: 6, lg: 12 }, textAlign: 'center' }}>
            <TinaMarkdown content={block?.videot_sisalto} />
          </Box>
        }
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mr: '-80px', mb: '-80px' }} >
          {block?.videot_lista?.map((j, i) => (
            <Box key={i} sx={{ mb: 8, flex: { xs: '0 0 calc(100% - 80px)', md: '0 0 calc(50% - 80px)' }, mr: '80px', mb: '80px' }}>
              <Typography variant="body" component="h3" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, fontSize: 16, fontWeight: 700 }}>
                {j.title}
                {j.ajankohta &&
                  <Typography component="span" sx={{ pl: 4 }}>{j?.ajankohta}</Typography>
                }
              </Typography>
              <Video video={youtube_parser(j.url)} />
            </Box>
          ))}
        </Box>
      </Container>
    </VideotBox>
  )
}
import { useState } from 'react';
import RichText from '../RichText';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';

import Video from '../Video';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

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
    var match = (url || "").match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
  }

  const [kaikki, setKaikki] = useState(false);
  const lista = block?.videot_lista || [];
  const raja = block?.videot_nakyvissa > 0 ? block.videot_nakyvissa : lista.length;
  const naytettavat = kaikki ? lista : lista.slice(0, raja);

  return (
    <VideotBox sx={{ my: { xs: 6, lg: '200px' } }}>
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ fontSize: { xs: '4rem', lg: '7rem' }, mt: { xs: 4, lg: 0 }, mb: { xs: 3, lg: 6 }, textAlign: 'center' }}>{block?.videot_otsikko}</Typography>
        {block.videot_sisalto &&
          <Box sx={{ mb: { xs: 6, lg: 12 }, textAlign: 'center' }}>
            <RichText content={block?.videot_sisalto} />
          </Box>
        }
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'repeat(2, minmax(0, 1fr))' }, columnGap: 10, rowGap: { xs: 6, md: 10 } }}>
          {naytettavat.map((j, i) => (
            <Box key={i} sx={{ minWidth: 0 }}>
              <Typography variant="body" component="h3" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2, fontSize: 16, fontWeight: 700 }}>
                {j.title}
                {j.ajankohta &&
                  <Typography component="span" sx={{ pl: 4 }}>{j?.ajankohta}</Typography>
                }
              </Typography>
              {youtube_parser(j.url) && <Video video={youtube_parser(j.url)} title={j.title} />}
            </Box>
          ))}
        </Box>
        {!kaikki && lista.length > raja && (
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <ButtonBase onClick={() => setKaikki(true)} focusRipple sx={{ px: 3, py: 1, borderRadius: 999, border: '1px solid rgba(255,255,255,.7)', fontFamily: 'inherit', fontSize: 17, '&:hover': { backgroundColor: 'rgba(255,255,255,.12)' } }}>
              Näytä kaikki videot ({lista.length}) ▾
            </ButtonBase>
          </Box>
        )}
      </Container>
    </VideotBox>
  )
}
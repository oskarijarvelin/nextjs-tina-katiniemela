import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { styled } from '@mui/material/styles';

import Link from './../Link'
import Image from '../Image';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { FaSpotify, FaYoutube } from 'react-icons/fa';

const JulkaisutBox = styled(Box)({
  '& .image': {
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

export default function JulkaisutBlock({ block }) {
  return (
    <JulkaisutBox sx={{ my: { xs: 6, lg: '200px' } }}>
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ fontSize: { xs: '4rem', lg: '7rem' }, mt: { xs: 4, lg: 0 }, mb: { xs: 3, lg: 6 }, textAlign: 'center' }}>{block?.julkaisut_otsikko}</Typography>
        {block.julkaisut_sisalto &&
          <Box sx={{ mb: { xs: 6, lg: 12 }, textAlign: 'center' }}>
            <TinaMarkdown content={block?.julkaisut_sisalto} />
          </Box>
        }
        {block?.julkaisut_lista?.map((j, i) => (
          <Box key={i} sx={{ display: 'flex', flexWrap: 'wrap', mb: 8 }}>

            <Box sx={{ pt: '4px', pb: 3, flex: { xs: '0 0 100%', md: '0 0 240px' }, maxWidth: { xs: '100%', md: '240px' }, width: { xs: '100%', md: '240px' } }}>
              <Image src={j.kuva} orientation="julkaisu" alt={j.title} />
            </Box>

            <Box sx={{ pl: { xs: 3, md: 8 }, flex: { xs: '0 0 100%', md: '0 0 calc(100% - 240px)' }, maxWidth: { xs: '100%', md: 'calc(100% - 240px)' }, width: { xs: '100%', md: 'calc(100% - 240px)' } }}>
              <Typography variant="h3" component="h3" sx={{ mb: 2, fontWeight: 700 }}>{j.title}</Typography>
              <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mb: 4 }} >
                {j.tyyppi &&
                  <Typography component="span" sx={{ mr: 3 }}>{j?.tyyppi}</Typography>
                }
                {j.ajankohta &&
                  <Typography component="span" sx={{ mr: 3 }}>{j?.ajankohta}</Typography>
                }
                {j.spotify &&
                  <Typography component="span" sx={{ mr: 3 }}>
                    <Link href={j?.spotify} target="_blank" rel="noopener" sx={{ color: '#fff', textDecoration: "none", display: 'inline-flex' }} aria-label={j.title + ' Spotifyssä'}>
                      <FaSpotify />
                    </Link>
                  </Typography>
                }
                {j.youtube &&
                  <Typography component="span">
                    <Link href={j?.youtube} target="_blank" rel="noopener" sx={{ color: '#fff', textDecoration: "none", display: 'inline-flex' }} aria-label={j.title + ' YouTubessa'}>
                      <FaYoutube />
                    </Link>
                  </Typography>
                }
              </Typography>
              <TinaMarkdown content={j.kuvaus} />
              {j?.kappaleet?.map((k, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                  <Typography variant="body" component="h4">{k.title}</Typography>
                  <Typography><small>{k.meta}</small></Typography>
                </Box>
              ))}
            </Box>

          </Box>
        ))}
      </Container>
    </JulkaisutBox>
  )
}
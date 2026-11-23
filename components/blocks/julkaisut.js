import { Fragment, useState } from 'react';
import RichText from '../RichText';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import Image from '../Image';
import PillLink from '../PillLink';

import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Collapse from '@mui/material/Collapse';
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
});

function slug(text, i) {
  return `julkaisu-${i}-${(text || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-')}`;
}

function Kansi({ j, i, avoinna, onToggle }) {
  return (
    <ButtonBase
      onClick={onToggle}
      aria-expanded={avoinna}
      aria-controls={slug(j.title, i)}
      focusRipple
      sx={{
        display: 'block',
        width: '100%',
        textAlign: 'left',
        borderRadius: 1,
        outline: avoinna ? '2px solid #ffd28a' : 'none',
        outlineOffset: 4,
        transition: 'opacity .3s ease',
        '&:hover .kansi': { opacity: 0.85 },
      }}
    >
      <Box className="kansi" sx={{ transition: 'opacity .3s ease' }}>
        <Image src={j.kuva} orientation="julkaisu" alt={`${j.title} – kansikuva`} />
      </Box>
      <Typography component="h3" sx={{ mt: 1, fontSize: { xs: 15, lg: 17 }, fontWeight: 700, lineHeight: 1.3 }}>{j.title}</Typography>
      <Typography component="span" sx={{ display: 'block', fontSize: { xs: 13, lg: 14 }, color: '#AAA' }}>
        {[j.tyyppi, j.ajankohta].filter(Boolean).join(' · ')}
        <Box component="span" sx={{ ml: 1 }} aria-hidden="true">{avoinna ? '▴' : '▾'}</Box>
      </Typography>
    </ButtonBase>
  );
}

function Tiedot({ j, i, avoinna }) {
  return (
    <Collapse in={avoinna} id={slug(j.title, i)}>
      <Box sx={{ backgroundColor: 'background.paper', borderRadius: 2, p: { xs: 3, md: 4 }, my: 1 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 2 }}>
          <Box>
            <Typography variant="h3" component="p" sx={{ fontSize: { xs: '2.4rem', lg: '3rem' }, lineHeight: 1.1 }}>{j.title}</Typography>
            <Typography sx={{ color: '#AAA' }}>{[j.tyyppi, j.ajankohta].filter(Boolean).join(' · ')}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            {j.spotify && <PillLink className="linkki" href={j.spotify} filled aria-label={`${j.title} Spotifyssä`}><FaSpotify /> Spotify</PillLink>}
            {j.youtube && <PillLink className="linkki" href={j.youtube} aria-label={`${j.title} YouTubessa`}><FaYoutube /> YouTube</PillLink>}
          </Box>
        </Box>
        {j.kuvaus && <RichText content={j.kuvaus} />}
        {j?.kappaleet?.length > 0 && (
          <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0, columns: { xs: 1, md: 2 }, columnGap: 6 }}>
            {j.kappaleet.map((k, ki) => (
              <Box component="li" key={ki} sx={{ mb: 1.5, breakInside: 'avoid' }}>
                <Typography component="span" sx={{ display: 'block' }}>{k.title}</Typography>
                {k.meta && <Typography component="span" sx={{ display: 'block', fontSize: 14, color: '#AAA' }}>{k.meta}</Typography>}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Collapse>
  );
}

export default function JulkaisutBlock({ block }) {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const sm = useMediaQuery(theme.breakpoints.up('sm'));
  const sarakkeet = md ? 4 : sm ? 3 : 2;
  const [avoin, setAvoin] = useState(null);
  const lista = block?.julkaisut_lista || [];

  // Kansikuvat ruudukossa; avatun julkaisun tiedot aukeavat sen rivin alle koko leveydelle.
  // Kaikkien julkaisujen tiedot ovat DOM:ssa (piilossa), jotta tekijätiedot löytyvät myös hakukoneista.
  const rivit = [];
  for (let r = 0; r < lista.length; r += sarakkeet) rivit.push(lista.slice(r, r + sarakkeet).map((j, k) => ({ j, i: r + k })));

  return (
    <JulkaisutBox sx={{ my: { xs: 6, lg: '200px' } }}>
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ fontSize: { xs: '4rem', lg: '7rem' }, mt: { xs: 4, lg: 0 }, mb: { xs: 3, lg: 6 }, textAlign: 'center' }}>{block?.julkaisut_otsikko}</Typography>
        {block.julkaisut_sisalto &&
          <Box sx={{ mb: { xs: 6, lg: 8 }, textAlign: 'center' }}>
            <RichText content={block?.julkaisut_sisalto} />
          </Box>
        }
        <Box sx={{ display: 'grid', gridTemplateColumns: `repeat(${sarakkeet}, minmax(0, 1fr))`, columnGap: { xs: 2, md: 4 }, rowGap: 0 }}>
          {rivit.map((rivi, ri) => (
            <Fragment key={ri}>
              {rivi.map(({ j, i }) => (
                <Box key={i} sx={{ mb: { xs: 3, md: 4 } }}>
                  <Kansi j={j} i={i} avoinna={avoin === i} onToggle={() => setAvoin(avoin === i ? null : i)} />
                </Box>
              ))}
              <Box sx={{ gridColumn: '1 / -1' }}>
                {rivi.map(({ j, i }) => (
                  <Tiedot key={i} j={j} i={i} avoinna={avoin === i} />
                ))}
              </Box>
            </Fragment>
          ))}
        </Box>
      </Container>
    </JulkaisutBox>
  );
}

import { useEffect, useState } from 'react';
import ButtonBase from '@mui/material/ButtonBase';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Link from '../Link';
import PillLink from '../PillLink';

const TZ = 'Europe/Helsinki';
const KUUKAUDET = ['TAMMI', 'HELMI', 'MAALIS', 'HUHTI', 'TOUKO', 'KESÄ', 'HEINÄ', 'ELO', 'SYYS', 'LOKA', 'MARRAS', 'JOULU'];

// Päivämäärä Suomen aikavyöhykkeellä muodossa { v, k, p, avain: 'YYYY-MM-DD' }.
// Tina tallentaa päivämäärän UTC-aikana, joten pelkkä getDate() voisi näyttää väärän päivän.
function osat(date) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' })
      .formatToParts(date)
      .map((p) => [p.type, p.value])
  );
  return { v: Number(parts.year), k: Number(parts.month), p: Number(parts.day), avain: `${parts.year}-${parts.month}-${parts.day}` };
}

function KeikkaRivi({ keikka, iso, vuosi = false }) {
  const { v, k, p } = keikka.osat;
  const sisalto = (
    <>
      <Typography component="span" sx={{ display: 'block', fontSize: iso ? { xs: 18, lg: 20 } : 'inherit' }}>{keikka.tapahtuma}</Typography>
      {keikka.lisatieto && (
        <Typography component="span" sx={{ display: 'block', fontSize: iso ? 15 : 14, color: '#AAA' }}>{keikka.lisatieto}</Typography>
      )}
    </>
  );

  if (iso) {
    return (
      <Box component="li" sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 3 }, backgroundColor: 'background.paper', borderRadius: 2, p: { xs: 2, md: 3 } }}>
        <Box sx={{ flex: 'none', width: { xs: 64, md: 76 }, textAlign: 'center', border: '1px solid #555', borderRadius: 1, py: 1, lineHeight: 1.1 }}>
          <Typography component="span" sx={{ display: 'block', fontSize: { xs: 26, md: 30 }, lineHeight: 1.1 }}>{p}</Typography>
          <Typography component="span" sx={{ display: 'block', fontSize: 11, letterSpacing: '.08em' }}>{KUUKAUDET[k - 1]} {v}</Typography>
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {keikka.linkki ? (
            <Link href={keikka.linkki} target="_blank" rel="noopener noreferrer" sx={{ color: '#fff' }}>{sisalto}</Link>
          ) : sisalto}
        </Box>
      </Box>
    );
  }

  return (
    <Box component="li" sx={{ display: 'flex', gap: 2, py: 1, borderBottom: '1px solid #2a2a2a', '&:last-of-type': { borderBottom: 0 } }}>
      <Typography component="span" sx={{ flex: 'none', width: vuosi ? 96 : 64, fontWeight: 700 }}>{p}.{k}.{vuosi ? v : ''}</Typography>
      <Box sx={{ flex: 1, minWidth: 0 }}>{sisalto}</Box>
    </Box>
  );
}

export default function KeikatBlock({ block, rakennettu }) {
  // Tulevat ja menneet erotellaan tämän päivän mukaan. Sivu rakennetaan staattisesti, joten
  // päivä tarkistetaan uudelleen selaimessa: keikka siirtyy menneisiin ilman uutta julkaisua.
  // Ensimmäinen renderöinti käyttää rakennusaikaa (sama palvelimella ja selaimessa), sitten päivitetään tähän päivään.
  const [tanaan, setTanaan] = useState(() => osat(rakennettu ? new Date(rakennettu) : new Date()).avain);
  useEffect(() => setTanaan(osat(new Date()).avain), []);

  const keikat = (block.keikat_lista || [])
    .filter((k) => k?.pvm && k?.tapahtuma && !isNaN(new Date(k.pvm)))
    .map((k) => ({ ...k, osat: osat(new Date(k.pvm)) }))
    .sort((a, b) => a.osat.avain.localeCompare(b.osat.avain));

  const tulevat = keikat.filter((k) => k.osat.avain >= tanaan);
  const menneet = keikat.filter((k) => k.osat.avain < tanaan);
  const vuodet = [...new Set(menneet.map((k) => k.osat.v))].sort((a, b) => b - a);

  // Tiivistys: lähimmät keikat isoina kortteina, loput tiiviinä riveinä; pitkä lista avataan painikkeesta.
  const KORTTEJA = 3;
  const RIVEJA = 5;
  const [kaikkiTulevat, setKaikkiTulevat] = useState(false);
  const kortit = tulevat.slice(0, KORTTEJA);
  const rivit = tulevat.slice(KORTTEJA);
  const naytettavatRivit = kaikkiTulevat ? rivit : rivit.slice(0, RIVEJA);

  return (
    <Box sx={{ my: { xs: 6, lg: '160px' } }}>
      <Container maxWidth="md">
        <Typography variant="h2" sx={{ fontSize: { xs: '4rem', lg: '6rem' }, mb: { xs: 3, lg: 5 }, textAlign: 'center' }}>
          {block.keikat_otsikko || 'Tulevat keikat'}
        </Typography>

        {tulevat.length > 0 ? (
          <>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'grid', gap: 2 }}>
              {kortit.map((k, i) => <KeikkaRivi key={i} keikka={k} iso />)}
            </Box>
            {naytettavatRivit.length > 0 && (
              <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, mt: 2, px: { xs: 0, md: 1 } }}>
                {naytettavatRivit.map((k, i) => <KeikkaRivi key={i} keikka={k} vuosi />)}
              </Box>
            )}
            {!kaikkiTulevat && rivit.length > RIVEJA && (
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <ButtonBase onClick={() => setKaikkiTulevat(true)} focusRipple sx={{ px: 3, py: 1, borderRadius: 999, border: '1px solid rgba(255,255,255,.7)', fontFamily: 'inherit', fontSize: 16, '&:hover': { backgroundColor: 'rgba(255,255,255,.12)' } }}>
                  Näytä kaikki tulevat keikat ({tulevat.length}) ▾
                </ButtonBase>
              </Box>
            )}
          </>
        ) : (
          <Typography sx={{ textAlign: 'center', color: '#ccc' }}>
            {block.keikat_tyhja || 'Uusia keikkoja on tulossa!'}
          </Typography>
        )}

        {block.keikat_cta_url && (
          <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2, border: '1px dashed #555', borderRadius: 2, p: { xs: 2, md: 3 } }}>
            <Typography>Haluatko minut tapahtumaasi?</Typography>
            <PillLink href={block.keikat_cta_url} filled>{block.keikat_cta_teksti || 'Tilaa keikka'} →</PillLink>
          </Box>
        )}

        {vuodet.length > 0 && (
          <>
            <Typography variant="h2" component="h3" sx={{ fontSize: { xs: '3rem', lg: '4rem' }, mt: { xs: 8, lg: 12 }, mb: 2, textAlign: 'center' }}>
              {block.keikat_menneet_otsikko || 'Menneet keikat'}
            </Typography>
            {vuodet.map((vuosi) => {
              const vuoden = menneet.filter((k) => k.osat.v === vuosi);
              return (
                <Accordion
                  key={vuosi}
                  disableGutters
                  elevation={0}
                  sx={{
                    backgroundColor: 'transparent',
                    borderTop: '1px solid #333',
                    '&:last-of-type': { borderBottom: '1px solid #333' },
                    '&:before': { display: 'none' },
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />} sx={{ px: 0 }}>
                    <Typography component="h4" sx={{ fontSize: { xs: 17, lg: 19 } }}>
                      <b>{vuosi}</b> · {vuoden.length} {vuoden.length === 1 ? 'keikka' : 'keikkaa'}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 0, pt: 0 }}>
                    <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                      {vuoden.map((k, i) => <KeikkaRivi key={i} keikka={k} />)}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </>
        )}
      </Container>
    </Box>
  );
}

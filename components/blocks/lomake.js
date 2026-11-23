import { useState } from 'react';
import RichText from '../RichText';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// Tumma tyyli MUI:n lomakekentille (teema on vaalea, sivusto tumma)
const LomakeBox = styled(Box)(({ theme }) => ({
  '& .MuiInputBase-root': { color: '#fff', backgroundColor: 'rgba(255,255,255,.04)' },
  '& .MuiInputLabel-root': { color: '#bbb' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#ffd28a' },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,.35)' },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,.7)' },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#ffd28a' },
  '& .MuiSelect-icon': { color: '#fff' },
  '& .MuiFormHelperText-root': { color: '#999' },
  '& input[type="date"]::-webkit-calendar-picker-indicator': { filter: 'invert(1)' },
  '& a': { color: '#AAA' },
}));

const KENTAT = {
  laulutunti: [
    { name: 'nimi', label: 'Nimi', required: true, autoComplete: 'name' },
    { name: 'email', label: 'Sähköposti', type: 'email', required: true, autoComplete: 'email' },
    { name: 'puhelin', label: 'Puhelin (vapaaehtoinen)', type: 'tel', autoComplete: 'tel' },
    { name: 'kenelle', label: 'Kenelle tunnit ovat?', select: ['Itselleni', 'Lapselleni / nuorelle', 'Lahjaksi (lahjakortti)'] },
    { name: 'viesti', label: 'Toiveet ja sopivat ajat', multiline: true, full: true, helper: 'Esim. mitä haluaisit oppia ja mitkä päivät tai kellonajat sopivat sinulle.' },
  ],
  keikka: [
    { name: 'nimi', label: 'Nimi', required: true, autoComplete: 'name' },
    { name: 'email', label: 'Sähköposti', type: 'email', required: true, autoComplete: 'email' },
    { name: 'puhelin', label: 'Puhelin (vapaaehtoinen)', type: 'tel', autoComplete: 'tel' },
    { name: 'tilaisuus', label: 'Tilaisuus', select: ['Häät', 'Syntymäpäivät', 'Muistotilaisuus', 'Yritystilaisuus', 'Festivaali tai yleisötapahtuma', 'Muu tilaisuus'] },
    { name: 'paivamaara', label: 'Päivämäärä', type: 'date' },
    { name: 'paikkakunta', label: 'Paikkakunta' },
    { name: 'kokoonpano', label: 'Kokoonpano', select: ['Kaniffi (bändi)', 'Kaniffi Duo', 'Iist Side Singers', 'Muu'] },
    { name: 'viesti', label: 'Kerro tapahtumasta', multiline: true, full: true, helper: 'Esim. arvioitu kesto, yleisön koko, toivottu musiikki ja budjetti.' },
  ],
};

export default function LomakeBlock({ block }) {
  const tyyppi = block.lomake_tyyppi === 'keikka' ? 'keikka' : 'laulutunti';
  const kentat = KENTAT[tyyppi];
  const [arvot, setArvot] = useState({});
  const [tila, setTila] = useState('idle'); // idle | lahetetaan | ok | virhe
  const [virhe, setVirhe] = useState('');

  const muuta = (e) => setArvot({ ...arvot, [e.target.name]: e.target.value });

  async function laheta(e) {
    e.preventDefault();
    setTila('lahetetaan');
    setVirhe('');
    try {
      const vastaus = await fetch('/api/lomake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...arvot, tyyppi, sivu: typeof window !== 'undefined' ? window.location.pathname : '' }),
      });
      const data = await vastaus.json().catch(() => ({}));
      if (!vastaus.ok) throw new Error(data.virhe || 'Lähetys epäonnistui.');
      setTila('ok');
    } catch (err) {
      setVirhe(err.message);
      setTila('virhe');
    }
  }

  return (
    <LomakeBox sx={{ my: { xs: 6, lg: '160px' } }}>
      <Container maxWidth="md">
        {block.lomake_otsikko && (
          <Typography variant="h2" sx={{ fontSize: { xs: '4rem', lg: '6rem' }, mb: { xs: 2, lg: 4 }, textAlign: 'center' }}>
            {block.lomake_otsikko}
          </Typography>
        )}
        {block.lomake_sisalto && (
          <Box sx={{ mb: { xs: 4, lg: 6 }, textAlign: 'center' }}>
            <RichText content={block.lomake_sisalto} />
          </Box>
        )}

        {tila === 'ok' ? (
          <Box role="status" sx={{ textAlign: 'center', backgroundColor: 'background.paper', borderRadius: 2, p: { xs: 4, md: 6 } }}>
            <Typography variant="h3" component="p" sx={{ fontSize: '3rem', mb: 1 }}>Kiitos!</Typography>
            <Typography sx={{ whiteSpace: 'pre-line' }}>
              {block.lomake_kiitos || 'Kiitos viestistäsi! Vastaan sinulle mahdollisimman pian.'}
            </Typography>
          </Box>
        ) : (
          <Box component="form" onSubmit={laheta} noValidate={false} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
            {kentat.map((k) => (
              <TextField
                key={k.name}
                name={k.name}
                label={k.label}
                type={k.type || 'text'}
                required={k.required}
                autoComplete={k.autoComplete}
                select={!!k.select}
                multiline={k.multiline}
                minRows={k.multiline ? 4 : undefined}
                helperText={k.helper}
                value={arvot[k.name] || ''}
                onChange={muuta}
                InputLabelProps={k.type === 'date' ? { shrink: true } : undefined}
                inputProps={{ maxLength: k.multiline ? 3000 : 200 }}
                sx={{ gridColumn: k.full ? '1 / -1' : 'auto' }}
              >
                {k.select && k.select.map((v) => <MenuItem key={v} value={v}>{v}</MenuItem>)}
              </TextField>
            ))}

            {/* Roskapostisuoja: ihmiset eivät näe tätä kenttää, botit täyttävät sen */}
            <Box aria-hidden="true" sx={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
              <label>Jätä tämä tyhjäksi <input type="text" name="kotisivu" tabIndex={-1} autoComplete="off" value={arvot.kotisivu || ''} onChange={muuta} /></label>
            </Box>

            {tila === 'virhe' && (
              <Alert severity="error" sx={{ gridColumn: '1 / -1' }}>
                {virhe} Voit myös lähettää sähköpostia osoitteeseen <a href="mailto:kaniffivirallinen@gmail.com">kaniffivirallinen@gmail.com</a>.
              </Alert>
            )}

            <Box sx={{ gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
              <Typography sx={{ fontSize: 13, color: '#999', maxWidth: 420 }}>
                Tietojasi käytetään vain yhteydenottoosi vastaamiseen.
              </Typography>
              <ButtonBase
                type="submit"
                disabled={tila === 'lahetetaan'}
                focusRipple
                sx={{ px: 4, py: 1.5, borderRadius: 999, backgroundColor: '#fff', color: '#000', fontFamily: 'inherit', fontSize: 18, transition: 'background-color .3s ease', '&:hover': { backgroundColor: '#ddd' }, '&.Mui-disabled': { opacity: 0.6 } }}
              >
                {tila === 'lahetetaan' ? 'Lähetetään…' : tyyppi === 'keikka' ? 'Lähetä tarjouspyyntö' : 'Lähetä viesti'}
              </ButtonBase>
            </Box>
          </Box>
        )}
      </Container>
    </LomakeBox>
  );
}

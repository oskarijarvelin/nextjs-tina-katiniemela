// Lomakkeiden lähetys sähköpostiin Resendin kautta (https://resend.com).
//
// Ympäristömuuttujat (Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY          Resendin API-avain (pakollinen tuotannossa)
//   LOMAKE_VASTAANOTTAJA    Mihin viestit lähetetään (oletus: kaniffivirallinen@gmail.com)
//   LOMAKE_LAHETTAJA        Lähettäjä, esim. "Kotisivut <lomake@katiniemela.fi>" (domain varmennettava Resendissä)
//
// Kehityksessä ilman API-avainta viesti tulostetaan konsoliin eikä sitä lähetetä.

const OTSIKOT = {
  laulutunnit: 'Laulutuntipyyntö',
  keikka: 'Keikkatarjouspyyntö',
  lahjakortti: 'Lahjakorttikysely',
  muu: 'Yhteydenotto',
};

const KENTTIEN_NIMET = {
  nimi: 'Nimi',
  email: 'Sähköposti',
  puhelin: 'Puhelin',
  kenelle: 'Kenelle',
  tilaisuus: 'Tilaisuus',
  paivamaara: 'Päivämäärä',
  paikkakunta: 'Paikkakunta',
  kokoonpano: 'Kokoonpano',
  viesti: 'Viesti',
  sivu: 'Lähetetty sivulta',
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function siisti(arvo, max = 200) {
  return typeof arvo === 'string' ? arvo.trim().slice(0, max) : '';
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ virhe: 'Vain POST on sallittu.' });
  }

  const body = req.body || {};

  // Roskapostisuoja: piilokenttä täytetty → hiljainen "onnistui"
  if (body.kotisivu) return res.status(200).json({ ok: true });

  // Vanha lomake lähetti tyypin 'laulutunti'
  const tyyppi = body.tyyppi === 'laulutunti' ? 'laulutunnit' : (Object.prototype.hasOwnProperty.call(OTSIKOT, body.tyyppi) ? body.tyyppi : 'muu');
  const tiedot = {};
  for (const kentta of Object.keys(KENTTIEN_NIMET)) {
    const arvo = siisti(body[kentta], kentta === 'viesti' ? 3000 : 200);
    if (arvo) tiedot[kentta] = arvo;
  }

  if (!tiedot.nimi) return res.status(400).json({ virhe: 'Kerro vielä nimesi.' });
  if (!tiedot.email || !EMAIL.test(tiedot.email)) return res.status(400).json({ virhe: 'Tarkista sähköpostiosoite.' });

  const otsikko = `${OTSIKOT[tyyppi]}: ${tiedot.nimi}`;
  const rivit = Object.entries(tiedot).map(([k, v]) => [KENTTIEN_NIMET[k], v]);
  const text = rivit.map(([k, v]) => `${k}: ${v}`).join('\n');
  const html = `<h2>${escapeHtml(otsikko)}</h2><table cellpadding="6">${rivit
    .map(([k, v]) => `<tr><th align="left" valign="top">${escapeHtml(k)}</th><td>${escapeHtml(v).replace(/\n/g, '<br>')}</td></tr>`)
    .join('')}</table>`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[lomake] RESEND_API_KEY puuttuu, viestiä ei lähetetty:\n' + otsikko + '\n' + text);
      return res.status(200).json({ ok: true, kehitys: true });
    }
    console.error('[lomake] RESEND_API_KEY puuttuu');
    return res.status(500).json({ virhe: 'Lomakkeen lähetys ei juuri nyt onnistu.' });
  }

  try {
    const vastaus = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.LOMAKE_LAHETTAJA || 'Kotisivut <onboarding@resend.dev>',
        to: [process.env.LOMAKE_VASTAANOTTAJA || 'kaniffivirallinen@gmail.com'],
        reply_to: tiedot.email,
        subject: otsikko,
        text,
        html,
      }),
    });
    if (!vastaus.ok) {
      console.error('[lomake] Resend-virhe', vastaus.status, await vastaus.text());
      return res.status(502).json({ virhe: 'Lomakkeen lähetys epäonnistui.' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[lomake] Lähetysvirhe', err);
    return res.status(502).json({ virhe: 'Lomakkeen lähetys epäonnistui.' });
  }
}

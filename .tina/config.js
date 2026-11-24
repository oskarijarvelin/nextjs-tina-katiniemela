import { defineConfig, RouteMappingPlugin } from 'tinacms';

// ---------- Kenttäapurit ----------
const teksti = (name, label, extra = {}) => ({ type: 'string', name, label, ...extra });
const alue = (name, label, extra = {}) => ({ type: 'string', name, label, ui: { component: 'textarea' }, ...extra });
const rikas = (name, label) => ({ type: 'rich-text', name, label });
const kuva = (name, label = 'Kuva') => ({ type: 'image', name, label });
const kytkin = (name, label) => ({ type: 'boolean', name, label });
const valinta = (name, label, vaihtoehdot) => ({ type: 'string', name, label, options: vaihtoehdot.map(([value, l]) => ({ value, label: l })) });
const ankkuri = teksti('ankkuri', 'Ankkuri (esim. videot → linkki #videot)');
const kohdistus = (name, label = 'Kuvan kohdistus (esim. 50% 30% = vaaka pystykohta)') => teksti(name, label);

const AIHEET = [['laulutunnit', 'Laulutunnit'], ['keikka', 'Keikka'], ['lahjakortti', 'Lahjakortti'], ['muu', 'Muu']];
const IKONIT = [
  ['aanentoisto', 'Äänentoisto'], ['valot', 'Valot'], ['taustakangas', 'Taustakangas'], ['ihmiset', 'Ihmiset'],
  ['kalenteri', 'Kalenteri'], ['peruutus', 'Peruutus'], ['lasku', 'Lasku'], ['sijainti', 'Sijainti'], ['tahti', 'Tähti'],
  ['sydan', 'Sydän'], ['nuotti', 'Nuotti'], ['lahja', 'Lahja'], ['mikki', 'Mikrofoni'], ['viesti', 'Viesti'],
  ['verkko', 'Verkkosivu'], ['facebook', 'Facebook'], ['instagram', 'Instagram'], ['linkedin', 'LinkedIn'], ['sahkoposti', 'Sähköposti'],
];
const ikoni = (name = 'ikoni') => valinta(name, 'Ikoni', IKONIT);

// Painikelista: tyyli ja aihe (aihe vie yhteydenottolomakkeeseen ja valitsee asian valmiiksi)
const painikkeet = (name, label = 'Painikkeet', pillerit = false) => ({
  type: 'object', name, label, list: true,
  ui: { itemProps: (item) => ({ label: item?.title }), defaultItem: { title: 'Painike', tyyli: 'ensisijainen' } },
  fields: [
    teksti('title', 'Teksti'),
    teksti('url', 'Osoite (esim. /keikat, #hinnasto tai https://…). Tyhjä + aihe = yhteydenottolomake'),
    valinta('tyyli', 'Tyyli', [['ensisijainen', 'Kultainen painike'], ['haamu', 'Ääriviivapainike'], ...(pillerit ? [['pilleri', 'Pilleri (osiolinkki)']] : [])]),
    valinta('aihe', 'Lomakkeen aihe (valinnainen)', AIHEET),
  ],
});
const linkkilista = (name, label) => ({
  type: 'object', name, label, list: true,
  ui: { itemProps: (item) => ({ label: item?.title }), defaultItem: { url: '/', title: 'Linkki' } },
  fields: [teksti('url', 'URL'), teksti('title', 'Teksti')],
});
const varusteet = (name) => ({
  type: 'object', name, label: 'Mukana keikalla (ikoniruudut)', list: true,
  ui: { itemProps: (item) => ({ label: item?.teksti }) },
  fields: [ikoni(), teksti('teksti', 'Teksti')],
});

// ---------- Lohkot ----------
const TEMPLATES = [
  {
    name: 'hero', label: 'Hero (sivun yläosa)',
    ui: { defaultItem: { otsikko: 'Sivun otsikko', hero_tyyli: 'sivu' } },
    fields: [
      valinta('hero_tyyli', 'Asettelu', [['sivu', 'Alasivu (kuva sivussa)'], ['etusivu', 'Etusivu (täysleveä kuva)']]),
      teksti('pieni_otsikko', 'Pieni otsikko (etusivu)'),
      teksti('saatavuus', 'Saatavuusrivi (esim. Uusille oppilaille on tilaa)'),
      teksti('otsikko', 'Otsikko', { required: true }),
      teksti('murupolku', 'Nimi murupolussa (jos eri kuin otsikko)'),
      alue('sisalto', 'Sisältö'),
      kuva('bgImg', 'Kuva'),
      teksti('kuvateksti', 'Kuvateksti (kuvaaja)'),
      teksti('kuva_alt', 'Kuvan kuvaus näkövammaisille'),
      kohdistus('kuva_kohdistus'),
      kohdistus('kuva_kohdistus_desktop', 'Kuvan kohdistus tietokoneella (valinnainen)'),
      kohdistus('kuva_kohdistus_mobiili', 'Kuvan kohdistus puhelimella (valinnainen)'),
      kytkin('aalto', 'Äänialto ja kuva oikealla (Musiikki-sivu)'),
      painikkeet('hero_linkit', 'Painikkeet ja osiolinkit', true),
    ],
  },
  {
    name: 'nauha', label: 'Juokseva nauha',
    fields: [
      { type: 'string', name: 'nauha_tekstit', label: 'Tekstit', list: true },
      valinta('nauha_tyyli', 'Tyyli', [['normaali', 'Normaali'], ['roolit', 'Iso käsiala (etusivu)']]),
    ],
  },
  {
    name: 'polut', label: 'Polkukortit (kuva, otsikko, linkki)',
    fields: [
      ankkuri,
      {
        type: 'object', name: 'polut_lista', label: 'Kortit', list: true,
        ui: { itemProps: (item) => ({ label: item?.otsikko }) },
        fields: [
          kuva('kuva'), teksti('kuvateksti', 'Kuvateksti (kuvaaja)'), teksti('alt', 'Kuvan kuvaus näkövammaisille'),
          kohdistus('kohdistus'), kohdistus('kohdistus_mobiili', 'Kuvan kohdistus puhelimella (valinnainen)'),
          { type: 'number', name: 'zoom_mobiili', label: 'Lähennys puhelimella (esim. 1.75, valinnainen)' },
          teksti('otsikko', 'Otsikko'), alue('teksti', 'Teksti'), teksti('linkki_teksti', 'Linkin teksti'), teksti('linkki_url', 'Linkin osoite'),
        ],
      },
    ],
  },
  {
    name: 'nosto', label: 'Nosto (kuva tai video ja teksti)',
    ui: { defaultItem: { nosto_pieni_otsikko: 'Ajankohtaista', nosto_otsikko: 'Noston otsikko', nosto_reverse: true } },
    fields: [
      ankkuri,
      teksti('nosto_pieni_otsikko', 'Pieni otsikko'),
      kytkin('nosto_taajuus', 'Taajuuspalkit pienen otsikon edessä'),
      teksti('nosto_otsikko', 'Otsikko', { required: true }),
      rikas('nosto_sisalto', 'Sisältö'),
      kuva('nosto_kuva'),
      teksti('nosto_kuvateksti', 'Kuvateksti (kuvaaja)'),
      teksti('nosto_alt', 'Kuvan kuvaus näkövammaisille'),
      kohdistus('nosto_kohdistus'),
      teksti('nosto_video', 'YouTube-video (osoite, näytetään kuvan paikalla)'),
      kytkin('nosto_reverse', 'Kuva oikealle'),
      teksti('nosto_merkki_arvo', 'Pyöreä merkki: iso teksti (esim. 35 €)'),
      alue('nosto_merkki_teksti', 'Pyöreä merkki: pieni teksti'),
      painikkeet('nosto_painikkeet'),
    ],
  },
  {
    name: 'palsta', label: 'Sisältöpalsta (kuva ja teksti)',
    fields: [
      ankkuri,
      kuva('palsta_kuva'),
      teksti('palsta_kuvateksti', 'Kuvateksti (kuvaaja)'),
      teksti('palsta_alt', 'Kuvan kuvaus näkövammaisille'),
      kohdistus('palsta_kohdistus'),
      kytkin('palsta_reverse', 'Kuva vasemmalle'),
      teksti('palsta_merkki_arvo', 'Pyöreä merkki: iso teksti (esim. 35 €)'),
      alue('palsta_merkki_teksti', 'Pyöreä merkki: pieni teksti'),
      teksti('palsta_pieni_otsikko', 'Pieni otsikko'),
      teksti('palsta_otsikko', 'Otsikko'),
      rikas('palsta_sisalto', 'Sisältö'),
      {
        type: 'object', name: 'palsta_listat', label: 'Listat (esim. vahvuusalueet)', list: true,
        ui: { itemProps: (item) => ({ label: item?.otsikko }) },
        fields: [
          teksti('otsikko', 'Listan otsikko'),
          { type: 'string', name: 'kohteet', label: 'Kohteet', list: true },
          teksti('suosikki', 'Sydämellä merkitty kohde (kirjoita täsmälleen sama teksti)'),
          kytkin('pehmea', 'Himmeämpi tyyli'),
        ],
      },
      rikas('palsta_sisalto_jalkeen', 'Sisältö listojen jälkeen'),
      {
        type: 'object', name: 'palsta_edut', label: 'Edut (ikonikortit)', list: true,
        ui: { itemProps: (item) => ({ label: item?.otsikko }) },
        fields: [ikoni(), teksti('otsikko', 'Otsikko'), teksti('teksti', 'Teksti')],
      },
      {
        type: 'object', name: 'palsta_tilastot', label: 'Luvut (esim. 2017 Laulunopettajana)', list: true,
        ui: { itemProps: (item) => ({ label: `${item?.arvo || ''} ${item?.teksti || ''}` }) },
        fields: [teksti('arvo', 'Luku'), teksti('teksti', 'Teksti')],
      },
      teksti('palsta_allekirjoitus', 'Käsialarivi lopussa'),
      painikkeet('palsta_painikkeet'),
      linkkilista('palsta_linkit', 'Pillerilinkit'),
    ],
  },
  {
    name: 'kuva', label: 'Leveä kuva',
    fields: [
      kuva('img'), teksti('kuva_kuvateksti', 'Kuvateksti (kuvaaja)'), teksti('kuva_alt', 'Kuvan kuvaus näkövammaisille'),
      kohdistus('kuva_kohdistus'), kohdistus('kuva_kohdistus_mobiili', 'Kuvan kohdistus puhelimella (valinnainen)'),
      alue('kuva_lainaus', 'Käsialalainaus kuvan päällä (valinnainen)'),
    ],
  },
  {
    name: 'keikat', label: 'Keikat',
    ui: {
      defaultItem: {
        keikat_nakyma: 'keikkasivu', keikat_otsikko: 'Tulevat keikat', keikat_menneet_otsikko: 'Menneet keikat',
        keikat_tyhja: 'Uusia keikkoja on tulossa, seuraa Instagramia!', keikat_cta_teksti: 'Tilaa keikalle',
      },
    },
    fields: [
      ankkuri,
      valinta('keikat_nakyma', 'Näkymä', [['keikkasivu', 'Tulevat keikat lippuina'], ['menneet', 'Menneet keikat'], ['kaikki', 'Tulevat ja menneet'], ['etusivu', 'Etusivun tiivis lista ja tilauslaatikko']]),
      teksti('keikat_otsikko', 'Otsikko (tulevat keikat)'),
      teksti('keikat_tyhja', 'Teksti, kun tulevia keikkoja ei ole'),
      teksti('keikat_cta_teksti', 'Tilaa keikalle -painikkeen teksti'),
      teksti('keikat_cta_url', 'Painikkeen osoite (tyhjä = yhteydenottolomake)'),
      teksti('keikat_menneet_otsikko', 'Otsikko (menneet keikat)'),
      teksti('keikat_linkki_teksti', 'Etusivu: linkin teksti (esim. Menneet keikat)'),
      teksti('keikat_linkki_url', 'Etusivu: linkin osoite'),
      teksti('tilaa_otsikko', 'Etusivu: tilauslaatikon otsikko'),
      rikas('tilaa_sisalto', 'Etusivu: tilauslaatikon teksti'),
      kuva('tilaa_kuva', 'Etusivu: tilauslaatikon kuva'),
      teksti('tilaa_kuvateksti', 'Etusivu: kuvateksti (kuvaaja)'),
      teksti('tilaa_alt', 'Etusivu: kuvan kuvaus näkövammaisille'),
      kohdistus('tilaa_kohdistus'),
      {
        type: 'object', name: 'keikat_lista', label: 'Keikat (järjestyksellä ei väliä, päivämäärä ratkaisee). Lista ylläpidetään Keikat-sivulla.', list: true,
        ui: {
          itemProps: (item) => {
            const d = item?.pvm ? new Date(item.pvm) : null;
            const pvm = d && !isNaN(d) ? d.toLocaleDateString('fi-FI', { timeZone: 'Europe/Helsinki' }) : '?';
            return { label: `${pvm} ${item?.tapahtuma || ''}` };
          },
        },
        fields: [
          { type: 'datetime', label: 'Päivämäärä', name: 'pvm', required: true, ui: { dateFormat: 'D.M.YYYY' } },
          teksti('tapahtuma', 'Tapahtuma ja paikka (esim. Paiste-lava Villa Rana, Jyväskylä)', { required: true }),
          teksti('lisatieto', 'Lisätieto (esim. kokoonpano)'),
          teksti('linkki', 'Linkki (esim. liput tai tapahtuman sivu)'),
        ],
      },
    ],
  },
  {
    name: 'musiikkinosto', label: 'Musiikki-nosto (etusivu, sisältö Musiikki-sivulta)',
    ui: { defaultItem: { mn_otsikko: 'Musiikki', mn_linkki_teksti: 'Kuuntele musiikkiani', mn_linkki_url: '/musiikki', mn_videoita: 4 } },
    fields: [
      ankkuri, teksti('mn_otsikko', 'Otsikko'), teksti('mn_linkki_teksti', 'Linkin teksti'), teksti('mn_linkki_url', 'Linkin osoite'),
      { type: 'number', name: 'mn_videoita', label: 'Näytettävien videoiden määrä' },
    ],
  },
  {
    name: 'palautteet', label: 'Oppilaiden palautteet (sisältö: Oppilaiden palautteet)',
    fields: [
      ankkuri, teksti('pal_otsikko', 'Otsikko (valinnainen)'),
      valinta('pal_nakyma', 'Näkymä', [['karuselli', 'Vaihtuva nosto'], ['kortit', 'Kortit (nostettu palaute isona)']]),
    ],
  },
  {
    name: 'faktat', label: 'Lyhyesti-kortit',
    fields: [
      ankkuri, teksti('fak_otsikko', 'Pieni otsikko (valinnainen)'),
      valinta('fak_asettelu', 'Asettelu', [['laulunopettaja', 'Heron alla'], ['cv', 'Oma osio (CV)']]),
      {
        type: 'object', name: 'fak_lista', label: 'Kortit', list: true,
        ui: { itemProps: (item) => ({ label: `${item?.arvo || ''} ${item?.otsikko || ''}` }) },
        fields: [teksti('arvo', 'Iso teksti (esim. 2017, AMK, 35 €)'), teksti('pieni', 'Pieni lisäteksti (esim. alkaen)'), teksti('otsikko', 'Otsikko'), alue('teksti', 'Teksti')],
      },
    ],
  },
  {
    name: 'kokemus', label: 'Kokemuslista (CV)',
    fields: [
      ankkuri, teksti('kokemus_otsikko', 'Otsikko'), rikas('kokemus_sisalto', 'Sisältö'),
      {
        type: 'object', name: 'kokemus_lista', label: 'Kokemukset', list: true,
        ui: { itemProps: (item) => ({ label: item?.title }) },
        fields: [teksti('title', 'Otsikko'), teksti('ajankohta', 'Ajankohta'), rikas('kuvaus', 'Kuvaus')],
      },
    ],
  },
  {
    name: 'julkaisut', label: 'Diskografia',
    fields: [
      ankkuri, teksti('julkaisut_otsikko', 'Otsikko'), rikas('julkaisut_sisalto', 'Sisältö'),
      {
        type: 'object', name: 'julkaisut_lista', label: 'Julkaisut (ensimmäinen albumi näytetään isona)', list: true,
        ui: { itemProps: (item) => ({ label: `${item?.ajankohta || ''} ${item?.title || ''}` }) },
        fields: [
          kuva('kuva', 'Kansikuva'), teksti('title', 'Nimi'), teksti('tyyppi', 'Tyyppi (Albumi, EP, Single)'), teksti('ajankohta', 'Vuosi'),
          teksti('spotify', 'Spotify URL'), teksti('youtube', 'YouTube URL'), rikas('kuvaus', 'Kuvaus (esim. tekijät)'),
          {
            type: 'object', name: 'kappaleet', label: 'Kappaleet', list: true,
            ui: { itemProps: (item) => ({ label: item?.title }) },
            fields: [teksti('title', 'Kappale'), teksti('meta', 'Tekijät')],
          },
        ],
      },
    ],
  },
  {
    name: 'videot', label: 'Musiikkivideot',
    fields: [
      ankkuri, teksti('videot_otsikko', 'Otsikko'), rikas('videot_sisalto', 'Sisältö'),
      { type: 'number', name: 'videot_nakyvissa', label: '(Ei käytössä uudessa ilmeessä)' },
      {
        type: 'object', name: 'videot_lista', label: 'Videot (ensimmäinen näytetään isona)', list: true,
        ui: { itemProps: (item) => ({ label: item?.title }) },
        fields: [
          teksti('title', 'Nimi (muodossa Esittäjä - Kappale)'), teksti('ajankohta', 'Vuosi'), teksti('url', 'YouTube URL'),
          kuva('kuva', 'Kuva (valinnainen; ilman kuvaa nimi näytetään käsialalla)'),
        ],
      },
    ],
  },
  {
    name: 'lainaus', label: 'Lainaus (iso käsiala)',
    fields: [ankkuri, alue('lai_teksti', 'Lainaus')],
  },
  {
    name: 'ominaisuudet', label: 'Ikoniruudut',
    fields: [
      ankkuri, teksti('omi_otsikko', 'Otsikko'),
      {
        type: 'object', name: 'omi_lista', label: 'Ruudut', list: true,
        ui: { itemProps: (item) => ({ label: item?.otsikko }) },
        fields: [ikoni(), teksti('otsikko', 'Otsikko'), alue('teksti', 'Teksti')],
      },
    ],
  },
  {
    name: 'hinnasto', label: 'Hinnasto',
    ui: { defaultItem: { hin_otsikko: 'Hinnasto' } },
    fields: [
      ankkuri, teksti('hin_otsikko', 'Otsikko'),
      {
        type: 'object', name: 'hin_kortit', label: 'Hintakortit', list: true,
        ui: { itemProps: (item) => ({ label: `${item?.otsikko || ''} ${item?.hinta || ''}${item?.yksikko || ''}` }) },
        fields: [
          teksti('chip', 'Pieni merkintä (valinnainen)'), teksti('otsikko', 'Otsikko'), teksti('hinta', 'Hinta (esim. 35)'),
          teksti('yksikko', 'Yksikkö (esim. € tai %)'), teksti('alv', 'Pieni teksti (esim. sis. alv.)'), kytkin('korostettu', 'Korostettu kortti'),
          teksti('painike_teksti', 'Painikkeen teksti (valinnainen)'), valinta('painike_aihe', 'Painikkeen lomakeaihe', AIHEET),
        ],
      },
      rikas('hin_lahja_teksti', 'Lahjakorttirivi'),
      teksti('hin_lahja_painike', 'Lahjakorttipainikkeen teksti'),
      teksti('hin_paikka_teksti', 'Paikkarivi (valinnainen)'),
      teksti('hin_paikka_linkki', 'Paikkarivin linkin teksti'),
      teksti('hin_paikka_url', 'Paikkarivin linkin osoite'),
      {
        type: 'object', name: 'hin_ehdot', label: 'Ehdot', list: true,
        ui: { itemProps: (item) => ({ label: item?.otsikko }) },
        fields: [ikoni(), teksti('otsikko', 'Otsikko'), alue('teksti', 'Teksti')],
      },
    ],
  },
  {
    name: 'cta', label: 'Kehotus kuvalla (esim. Tilaa keikalle)',
    fields: [
      ankkuri, kuva('cta_kuva'), teksti('cta_kuvateksti', 'Kuvateksti (kuvaaja)'), teksti('cta_alt', 'Kuvan kuvaus näkövammaisille'),
      kohdistus('cta_kohdistus'), kohdistus('cta_kohdistus_mobiili', 'Kuvan kohdistus puhelimella (valinnainen)'),
      teksti('cta_saatavuus', 'Saatavuusrivi (valinnainen)'), teksti('cta_otsikko', 'Otsikko'), rikas('cta_sisalto', 'Sisältö'),
      varusteet('cta_varusteet'),
      teksti('cta_painike_teksti', 'Painikkeen teksti'), teksti('cta_painike_url', 'Painikkeen osoite (tyhjä = yhteydenottolomake)'),
      valinta('cta_painike_aihe', 'Painikkeen lomakeaihe', AIHEET),
    ],
  },
  {
    name: 'kokoonpanot', label: 'Kokoonpanot',
    fields: [
      ankkuri, kuva('kok_kuva'), teksti('kok_kuvateksti', 'Kuvateksti (kuvaaja)'), teksti('kok_alt', 'Kuvan kuvaus näkövammaisille'), kohdistus('kok_kohdistus'),
      teksti('kok_otsikko', 'Otsikko'), rikas('kok_sisalto', 'Sisältö'), varusteet('kok_varusteet'), painikkeet('kok_painikkeet'),
      {
        type: 'object', name: 'kok_kortit', label: 'Kokoonpanokortit', list: true,
        ui: { itemProps: (item) => ({ label: item?.otsikko }) },
        fields: [
          valinta('tyyli', 'Tyyli', [['normaali', 'Normaali'], ['nostettu', 'Nostettu (leveä, logo)'], ['mennyt', 'Ei-aktiivinen (kansikuva)']]),
          kuva('kuva', 'Logo tai kuva'), teksti('alt', 'Kuvan kuvaus näkövammaisille'), teksti('chip', 'Pieni merkintä'), teksti('otsikko', 'Nimi'),
          rikas('teksti', 'Teksti'),
          {
            type: 'object', name: 'linkit', label: 'Linkit', list: true,
            ui: { itemProps: (item) => ({ label: item?.teksti }) },
            fields: [ikoni(), teksti('teksti', 'Teksti'), teksti('url', 'Osoite')],
          },
        ],
      },
    ],
  },
  {
    name: 'vaiheet', label: 'Vaiheet (Näin pääset alkuun)',
    fields: [
      ankkuri, teksti('vai_otsikko', 'Otsikko'),
      {
        type: 'object', name: 'vai_lista', label: 'Vaiheet', list: true,
        ui: { itemProps: (item) => ({ label: item?.otsikko }) },
        fields: [teksti('otsikko', 'Otsikko'), alue('teksti', 'Teksti'), teksti('merkki', 'Pieni merkintä (esim. 35 €)'), kytkin('korostettu', 'Korostettu')],
      },
      teksti('vai_painike_teksti', 'Painikkeen teksti'), valinta('vai_painike_aihe', 'Painikkeen lomakeaihe', AIHEET),
    ],
  },
  {
    name: 'ukk', label: 'Usein kysyttyä',
    ui: { defaultItem: { ukk_otsikko: 'Usein kysyttyä' } },
    fields: [
      ankkuri, teksti('ukk_otsikko', 'Otsikko'), rikas('ukk_sisalto', 'Sisältö'),
      teksti('ukk_painike_teksti', 'Painikkeen teksti (esim. Kysy lisää)'), valinta('ukk_painike_aihe', 'Painikkeen lomakeaihe', AIHEET),
      {
        type: 'object', name: 'ukk_lista', label: 'Kysymykset', list: true,
        ui: { itemProps: (item) => ({ label: item?.kysymys }) },
        fields: [teksti('kysymys', 'Kysymys'), rikas('vastaus', 'Vastaus')],
      },
    ],
  },
  {
    name: 'lomake', label: 'Ota yhteyttä + lomakkeen johdanto',
    ui: { defaultItem: { lomake_tyyppi: 'laulutunti', lomake_otsikko: 'Varaa tutustumistunti', lomake_kiitos: 'Kiitos viestistäsi! Vastaan sinulle mahdollisimman pian.' } },
    fields: [
      ankkuri,
      valinta('lomake_tyyppi', 'Lomakkeen oletusaihe', [['laulutunti', 'Laulutunnit'], ['keikka', 'Keikka'], ['lahjakortti', 'Lahjakortti'], ['muu', 'Muu']]),
      teksti('yhteystiedot_otsikko', 'Osion otsikko (oletus: Ota yhteyttä)'),
      teksti('lomake_otsikko', 'Lomakkeen otsikko'), rikas('lomake_sisalto', 'Lomakkeen johdanto'),
      alue('lomake_kiitos', 'Kiitosviesti lähetyksen jälkeen'),
    ],
  },
  {
    name: 'yhteystiedot', label: 'Ota yhteyttä (yhteystiedot Asetuksista)',
    ui: { defaultItem: { yhteystiedot_otsikko: 'Ota yhteyttä' } },
    fields: [teksti('yhteystiedot_otsikko', 'Otsikko (yhteystiedot muokataan Asetuksissa)')],
  },
];

const config = defineConfig({
  schema: {
    collections: [
      {
        label: 'Sivut',
        name: 'page',
        path: 'pages/content',
        format: 'md',
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => `${(values?.title || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`,
          },
        },
        fields: [
          {
            name: 'title', label: 'Otsikko', type: 'string', isTitle: true, required: true,
            ui: { validate: (value) => (value?.length > 60 ? 'Otsikon tulee olla alle 60 merkkiä pitkä' : undefined) },
          },
          { name: 'description', label: 'Kuvaus (hakukoneille)', type: 'string', isBody: true, ui: { component: 'textarea' } },
          valinta('lomake_aihe', 'Yhteydenottolomakkeen oletusaihe tällä sivulla', AIHEET),
          { type: 'object', list: true, name: 'blocks', label: 'Sisältöeditori', ui: { visualSelector: true }, templates: TEMPLATES },
        ],
      },
      {
        label: 'Oppilaiden palautteet',
        name: 'palautteet',
        path: 'content/palautteet',
        format: 'md',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { name: 'title', label: 'Otsikko', type: 'string', isTitle: true, required: true },
          {
            type: 'object', name: 'palautteet', label: 'Palautteet', list: true,
            ui: { itemProps: (item) => ({ label: item?.nimi }) },
            fields: [
              teksti('nimi', 'Nimi'),
              teksti('kuvaus', 'Lisätieto (esim. Oppilaana kaksi vuotta)'),
              alue('lainaus', 'Lyhyt lainaus (näkyy vaihtuvassa nostossa ja pienissä korteissa)'),
              kytkin('nostettu', 'Nostettu palaute (näytetään isona Laulunopettaja-sivulla)'),
              rikas('teksti', 'Koko palaute (nostetulle palautteelle)'),
            ],
          },
        ],
      },
      {
        label: 'Asetukset',
        name: 'settings',
        path: 'content/settings',
        format: 'json',
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { name: 'title', label: 'Asetus-sivun otsikko', type: 'string', isTitle: true, required: true },
          teksti('sivuston_nimi', 'Sivuston nimi'),
          teksti('rooli_teksti', 'Roolirivi alapalkissa (esim. Artisti · Laulaja · …)'),
          teksti('varaa_teksti', 'Yläpalkin painike (esim. Varaa tunti)'),
          teksti('alapalkki_painike', 'Alapalkin painike (esim. Varaa tutustumistunti)'),
          teksti('sahkoposti', 'Sähköposti'),
          teksti('sijainti', 'Laulutuntien sijainti (esim. Savela, Jyväskylä)'),
          teksti('yritys', 'Yrityksen nimi'),
          teksti('facebook_url', 'Facebook URL'), teksti('facebook_nimi', 'Facebook-nimi (esim. @kaniffivirallinen)'),
          teksti('instagram_url', 'Instagram URL'), teksti('instagram_nimi', 'Instagram-nimi (esim. @kaniffi)'),
          teksti('linkedin_url', 'LinkedIn URL'), teksti('linkedin_nimi', 'LinkedIn-nimi'),
          kuva('yhteys_kuva', 'Ota yhteyttä -osion kuva'),
          teksti('yhteys_kuvateksti', 'Ota yhteyttä -kuvan kuvateksti (kuvaaja)'),
          teksti('yhteys_kuva_alt', 'Ota yhteyttä -kuvan kuvaus näkövammaisille'),
          {
            type: 'object', label: 'Päävalikko', name: 'mainnav',
            fields: [linkkilista('nav', 'Linkit')],
          },
        ],
      },
    ],
  },
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH ||
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
    process.env.HEAD,
  token: process.env.TINA_TOKEN,
  media: {
    tina: {
      publicFolder: 'public',
      mediaRoot: 'uploads',
    },
  },
  build: {
    publicFolder: 'public',
    outputFolder: 'admin',
  },
  cmsCallback: (cms) => {
    const RouteMapping = new RouteMappingPlugin((collection, document) => {
      if (['page'].includes(collection.name)) {
        return document._sys.filename === 'home' ? '/' : `/${document._sys.filename}`;
      }
      return undefined;
    });
    cms.plugins.add(RouteMapping);
    return cms;
  },
});

export default config;

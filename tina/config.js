import { defineConfig } from 'tinacms';

const config = defineConfig({
  schema: {
    collections: [
      {
        label: 'Sivut',
        name: 'page',
        path: 'pages/content',
        format: 'md',
        ui: {
          // Visuaalinen editori: mikä sivu avataan esikatseluun kunkin dokumentin kohdalla
          router: ({ document }) =>
            document._sys.filename === 'home' ? '/' : `/${document._sys.filename}`,
          filename: {
            readonly: true,
            slugify: values => {
              return `${(values?.title || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`
            },
          },
        },
        fields: [
          {
            name: 'title',
            label: 'Otsikko',
            type: 'string',
            isTitle: true,
            required: true,
            ui: {
              validate: value => {
                if (value?.length > 60) {
                  return "Otsikon tulee olla alle 60 merkkiä pitkä"
                }
              },
            },
          },
          {
            name: 'description',
            label: 'Kuvaus',
            type: 'string',
            isBody: true,
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'object',
            list: true,
            name: 'blocks',
            label: 'Sisältöeditori',
            ui: {
              visualSelector: true,
            },
            templates: [
              {
                name: 'hero',
                label: 'Hero',
                ui: {
                  defaultItem: {
                    otsikko: 'Tähän tulee heron otsikko',
                    sisalto: 'Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.',
                  },
                },
                fields: [
                  {
                    type: 'string',
                    label: 'Otsikko',
                    name: 'otsikko',
                    required: true,
                  },
                  {
                    type: 'string',
                    label: 'Sisältö',
                    name: 'sisalto',
                    ui: {
                      component: 'textarea',
                    },
                  },
                  {
                    type: 'image',
                    label: 'Taustakuva',
                    name: 'bgImg',
                  },
                  {
                    type: 'string',
                    label: 'Kuvateksti',
                    name: 'kuvateksti',
                  },
                  {
                    type: 'object',
                    label: 'Painikkeet',
                    name: 'hero_linkit',
                    list: true,
                    ui: {
                      itemProps: (item) => ({ label: item?.title }),
                      defaultItem: { url: '#', title: 'Painike' },
                    },
                    fields: [
                      { type: 'string', label: 'URL (esim. /keikat tai #videot)', name: 'url' },
                      { type: 'string', label: 'Teksti', name: 'title' },
                    ],
                  },
                ],
              },
              {
                name: 'kuva',
                label: 'Kuva',
                fields: [
                  {
                    type: 'image',
                    label: 'Kuva',
                    name: 'img',
                  },
                  {
                    type: 'string',
                    label: 'Kuvateksti',
                    name: 'kuva_kuvateksti',
                  },
                ],
              },
              {
                name: 'palsta',
                label: 'Sisältöpalsta',
                ui: {
                  defaultItem: {
                    palsta_otsikko: 'Tähän tulee heron otsikko',
                    palsta_sisalto: 'Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.',
                  },
                },
                fields: [
                  {
                    type: 'string',
                    label: 'Ankkuri (esim. videot → linkki #videot)',
                    name: 'ankkuri',
                  },
                  {
                    type: 'image',
                    label: 'Kuva',
                    name: 'palsta_kuva',
                  },
                  {
                    type: 'string',
                    label: 'Kuvateksti',
                    name: 'palsta_kuvateksti',
                  },
                  {
                    type: 'boolean',
                    label: 'Kuva vasemmalle',
                    name: 'palsta_reverse',
                  },
                  {
                    type: 'string',
                    label: 'Otsikko',
                    name: 'palsta_otsikko',
                  },
                  {
                    type: 'rich-text',
                    label: 'Sisältö',
                    name: 'palsta_sisalto',
                  },
                  {
                    type: 'object',
                    label: 'Linkit',
                    name: 'palsta_linkit',
                    list: true,
                    ui: {
                      itemProps: (item) => {
                        return { label: item?.title };
                      },
                      defaultItem: {
                        url: '/',
                        title: 'Etusivu',
                      },
                    },
                    fields: [
                      {
                        type: 'string',
                        label: 'URL',
                        name: 'url',
                      },
                      {
                        type: 'string',
                        label: 'Teksti',
                        name: 'title',
                      },
                    ],
                  },
                ],
              },
              {
                name: 'kokemus',
                label: 'Kokemuslista',
                ui: {
                  defaultItem: {
                    kokemus_otsikko: 'Työkokemus',
                    kokemus_sisalto: 'Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.',
                  },
                },
                fields: [
                  {
                    type: 'string',
                    label: 'Otsikko',
                    name: 'kokemus_otsikko',
                  },
                  {
                    type: 'rich-text',
                    label: 'Sisältö',
                    name: 'kokemus_sisalto',
                  },
                  {
                    type: 'object',
                    label: 'Kokemukset',
                    name: 'kokemus_lista',
                    list: true,
                    ui: {
                      itemProps: (item) => {
                        return { label: item?.title };
                      },
                      defaultItem: {
                        title: 'Laulunopettaja',
                        ajankohta: '01/2022 - 12/2022'
                      },
                    },
                    fields: [
                      {
                        type: 'string',
                        label: 'Teksti',
                        name: 'title',
                      },
                      {
                        type: 'string',
                        label: 'Ajankohta',
                        name: 'ajankohta',
                      },
                      {
                        name: 'kuvaus',
                        label: 'Kuvaus',
                        type: 'rich-text',
                      },
                    ],
                  },
                ],
              },
              {
                name: 'julkaisut',
                label: 'Julkaisut',
                ui: {
                  defaultItem: {
                    julkaisut_otsikko: 'Discografia',
                    julkaisut_sisalto: 'Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.',
                  },
                },
                fields: [
                  {
                    type: 'string',
                    label: 'Ankkuri (esim. videot → linkki #videot)',
                    name: 'ankkuri',
                  },
                  {
                    type: 'string',
                    label: 'Otsikko',
                    name: 'julkaisut_otsikko',
                  },
                  {
                    type: 'rich-text',
                    label: 'Sisältö',
                    name: 'julkaisut_sisalto',
                  },
                  {
                    type: 'object',
                    label: 'Julkaisut',
                    name: 'julkaisut_lista',
                    list: true,
                    ui: {
                      itemProps: (item) => {
                        return { label: item?.title };
                      },
                      defaultItem: {
                        title: 'Albumi X',
                        tyyppi: 'Albumi',
                        ajankohta: '01.01.2022'
                      },
                    },
                    fields: [
                      {
                        type: 'image',
                        label: 'Kuva',
                        name: 'kuva',
                      },
                      {
                        type: 'string',
                        label: 'Nimi',
                        name: 'title',
                      },
                      {
                        type: 'string',
                        label: 'Tyyppi',
                        name: 'tyyppi',
                      },
                      {
                        type: 'string',
                        label: 'Ajankohta',
                        name: 'ajankohta',
                      },
                      {
                        type: 'string',
                        label: 'Spotify URL',
                        name: 'spotify',
                      },
                      {
                        type: 'string',
                        label: 'YouTube URL',
                        name: 'youtube',
                      },
                      {
                        name: 'kuvaus',
                        label: 'Kuvaus',
                        type: 'rich-text',
                      },
                      {
                        type: 'object',
                        label: 'Kappaleet',
                        name: 'kappaleet',
                        list: true,
                        ui: {
                          itemProps: (item) => {
                            return { label: item?.title };
                          },
                          defaultItem: {
                            title: '1. Laulu',
                            meta: '(säv.&san. Kati Niemelä)',
                          },
                        },
                        fields: [
                          {
                            type: 'string',
                            label: 'Nimi',
                            name: 'title',
                          },
                          {
                            type: 'string',
                            label: 'Meta',
                            name: 'meta',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                name: 'videot',
                label: 'Videot',
                ui: {
                  defaultItem: {
                    videot_otsikko: 'Musiikkivideot',
                    videot_sisalto: 'Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.',
                  },
                },
                fields: [
                  {
                    type: 'string',
                    label: 'Ankkuri (esim. videot → linkki #videot)',
                    name: 'ankkuri',
                  },
                  {
                    type: 'number',
                    label: 'Näytä aluksi (tyhjä = kaikki)',
                    name: 'videot_nakyvissa',
                  },
                  {
                    type: 'string',
                    label: 'Otsikko',
                    name: 'videot_otsikko',
                  },
                  {
                    type: 'rich-text',
                    label: 'Sisältö',
                    name: 'videot_sisalto',
                  },
                  {
                    type: 'object',
                    label: 'Videot',
                    name: 'videot_lista',
                    list: true,
                    ui: {
                      itemProps: (item) => {
                        return { label: item?.title };
                      },
                      defaultItem: {
                        title: 'Video 1',
                        ajankohta: '2022'
                      },
                    },
                    fields: [
                      {
                        type: 'string',
                        label: 'Teksti',
                        name: 'title',
                      },
                      {
                        type: 'string',
                        label: 'Ajankohta',
                        name: 'ajankohta',
                      },
                      {
                        type: 'string',
                        label: 'YouTube URL',
                        name: 'url',
                      },
                    ],
                  },
                ],
              },

              {
                name: 'nosto',
                label: 'Nosto',
                ui: {
                  defaultItem: {
                    nosto_pieni_otsikko: 'Ajankohtaista',
                    nosto_otsikko: 'Noston otsikko',
                  },
                },
                fields: [
                  {
                    type: 'string',
                    label: 'Ankkuri (esim. videot → linkki #videot)',
                    name: 'ankkuri',
                  },
                  {
                    type: 'string',
                    label: 'Pieni otsikko',
                    name: 'nosto_pieni_otsikko',
                  },
                  {
                    type: 'string',
                    label: 'Otsikko',
                    name: 'nosto_otsikko',
                    required: true,
                  },
                  {
                    type: 'rich-text',
                    label: 'Sisältö',
                    name: 'nosto_sisalto',
                  },
                  {
                    type: 'image',
                    label: 'Kuva',
                    name: 'nosto_kuva',
                  },
                  {
                    type: 'string',
                    label: 'Kuvateksti',
                    name: 'nosto_kuvateksti',
                  },
                  {
                    type: 'string',
                    label: 'YouTube-video (osoite, näytetään kuvan paikalla)',
                    name: 'nosto_video',
                  },
                  {
                    type: 'boolean',
                    label: 'Kuva oikealle',
                    name: 'nosto_reverse',
                  },
                  {
                    type: 'object',
                    label: 'Painikkeet',
                    name: 'nosto_painikkeet',
                    list: true,
                    ui: {
                      itemProps: (item) => ({ label: item?.title }),
                      defaultItem: { url: '/', title: 'Lue lisää' },
                    },
                    fields: [
                      { type: 'string', label: 'URL', name: 'url' },
                      { type: 'string', label: 'Teksti', name: 'title' },
                    ],
                  },
                ],
              },
              {
                name: 'lomake',
                label: 'Lomake',
                ui: {
                  defaultItem: {
                    lomake_tyyppi: 'laulutunti',
                    lomake_otsikko: 'Varaa tutustumistunti',
                    lomake_kiitos: 'Kiitos viestistäsi! Vastaan sinulle mahdollisimman pian.',
                  },
                },
                fields: [
                  {
                    type: 'string',
                    label: 'Ankkuri (esim. videot → linkki #videot)',
                    name: 'ankkuri',
                  },
                  {
                    type: 'string',
                    label: 'Lomakkeen tyyppi',
                    name: 'lomake_tyyppi',
                    options: [
                      { value: 'laulutunti', label: 'Laulutunti / tutustumistunti' },
                      { value: 'keikka', label: 'Keikkatarjouspyyntö' },
                    ],
                  },
                  {
                    type: 'string',
                    label: 'Otsikko',
                    name: 'lomake_otsikko',
                  },
                  {
                    type: 'rich-text',
                    label: 'Sisältö',
                    name: 'lomake_sisalto',
                  },
                  {
                    type: 'string',
                    label: 'Kiitosviesti lähetyksen jälkeen',
                    name: 'lomake_kiitos',
                    ui: { component: 'textarea' },
                  },
                ],
              },
              {
                name: 'yhteystiedot',
                label: 'Yhteystiedot (Asetuksista)',
                ui: {
                  defaultItem: { yhteystiedot_otsikko: 'Ota yhteyttä' },
                },
                fields: [
                  {
                    type: 'string',
                    label: 'Otsikko (yhteystiedot muokataan Asetuksissa)',
                    name: 'yhteystiedot_otsikko',
                  },
                ],
              },
              {
                name: 'keikat',
                label: 'Keikkalista',
                ui: {
                  defaultItem: {
                    keikat_otsikko: 'Tulevat keikat',
                    keikat_menneet_otsikko: 'Menneet keikat',
                    keikat_tyhja: 'Uusia keikkoja on tulossa, seuraa Instagramia!',
                    keikat_cta_teksti: 'Tilaa keikka',
                    keikat_cta_url: '/muusikko#tilaa-keikka',
                  },
                },
                fields: [
                  {
                    type: 'string',
                    label: 'Ankkuri (esim. keikat → linkki #keikat)',
                    name: 'ankkuri',
                  },
                  {
                    type: 'string',
                    label: 'Otsikko (tulevat keikat)',
                    name: 'keikat_otsikko',
                  },
                  {
                    type: 'string',
                    label: 'Teksti, kun tulevia keikkoja ei ole',
                    name: 'keikat_tyhja',
                  },
                  {
                    type: 'string',
                    label: 'Tilaa keikka -painikkeen teksti',
                    name: 'keikat_cta_teksti',
                  },
                  {
                    type: 'string',
                    label: 'Tilaa keikka -painikkeen osoite',
                    name: 'keikat_cta_url',
                  },
                  {
                    type: 'string',
                    label: 'Otsikko (menneet keikat)',
                    name: 'keikat_menneet_otsikko',
                  },
                  {
                    type: 'object',
                    label: 'Keikat (järjestyksellä ei väliä, päivämäärä ratkaisee)',
                    name: 'keikat_lista',
                    list: true,
                    ui: {
                      itemProps: (item) => {
                        const d = item?.pvm ? new Date(item.pvm) : null;
                        const pvm = d && !isNaN(d) ? d.toLocaleDateString('fi-FI', { timeZone: 'Europe/Helsinki' }) : '?';
                        return { label: `${pvm} ${item?.tapahtuma || ''}` };
                      },
                    },
                    fields: [
                      {
                        type: 'datetime',
                        label: 'Päivämäärä',
                        name: 'pvm',
                        required: true,
                        ui: { dateFormat: 'D.M.YYYY' },
                      },
                      {
                        type: 'string',
                        label: 'Tapahtuma ja paikka',
                        name: 'tapahtuma',
                        required: true,
                      },
                      {
                        type: 'string',
                        label: 'Lisätieto (esim. kokoonpano)',
                        name: 'lisatieto',
                      },
                      {
                        type: 'string',
                        label: 'Linkki (esim. liput tai tapahtuman sivu)',
                        name: 'linkki',
                      },
                    ],
                  },
                ],
              },
              {
                name: 'ukk',
                label: 'Usein kysyttyä',
                ui: {
                  defaultItem: {
                    ukk_otsikko: 'Usein kysyttyä',
                  },
                },
                fields: [
                  {
                    type: 'string',
                    label: 'Ankkuri (esim. videot → linkki #videot)',
                    name: 'ankkuri',
                  },
                  {
                    type: 'string',
                    label: 'Otsikko',
                    name: 'ukk_otsikko',
                  },
                  {
                    type: 'rich-text',
                    label: 'Sisältö',
                    name: 'ukk_sisalto',
                  },
                  {
                    type: 'object',
                    label: 'Kysymykset',
                    name: 'ukk_lista',
                    list: true,
                    ui: {
                      itemProps: (item) => ({ label: item?.kysymys }),
                    },
                    fields: [
                      { type: 'string', label: 'Kysymys', name: 'kysymys' },
                      { type: 'rich-text', label: 'Vastaus', name: 'vastaus' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: 'Asetukset',
        name: 'settings',
        path: 'content/settings',
        format: 'json',
        ui: {
          title: {
            readonly: true,
          },
        },
        fields: [
          {
            name: 'title',
            label: 'Asetus-sivun otsikko',
            type: 'string',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            label: 'Sivuston nimi',
            name: 'sivuston_nimi',
          },
          {
            type: 'string',
            label: 'Sähköposti (näkyy Ota yhteyttä -lohkossa)',
            name: 'sahkoposti',
          },
          {
            type: 'string',
            label: 'Facebook URL',
            name: 'facebook_url',
          },
          {
            type: 'string',
            label: 'Instagram URL',
            name: 'instagram_url',
          },
          {
            type: 'string',
            label: 'LinkedIn URL',
            name: 'linkedin_url',
          },
          {
            type: 'string',
            label: 'Yrityksen nimi (näkyy Ota yhteyttä -lohkossa)',
            name: 'yritys',
          },
          {
            type: 'object',
            label: 'Päävalikko',
            name: 'mainnav',
            fields: [
              {
                type: 'object',
                label: 'Linkit',
                name: 'nav',
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.title };
                  },
                  defaultItem: {
                    url: '/',
                    title: 'Etusivu',
                  },
                },
                fields: [
                  {
                    type: 'string',
                    label: 'Linkin osoite',
                    name: 'url',
                  },
                  {
                    type: 'string',
                    label: 'Linkin teksti',
                    name: 'title',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Vercelin git-haara ensin: preview-deploy lukee oman haaransa skeeman ja sisällön Tina Cloudista
  // (tuotannossa haara on main). NEXT_PUBLIC_TINA_BRANCH on varalla muille ympäristöille.
  branch:
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.NEXT_PUBLIC_TINA_BRANCH ||
    process.env.HEAD,
  token: process.env.TINA_TOKEN,
  media: {
    tina: {
      publicFolder: 'public',
      mediaRoot: 'uploads',
    },
  },
  build: {
    publicFolder: "public",
    outputFolder: "admin"
  }
});

export default config;

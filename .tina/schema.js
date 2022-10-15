import { defineConfig, defineSchema, RouteMappingPlugin } from 'tinacms';
import { client } from './__generated__/client';

const schema = defineSchema({
  config: {
    clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
    branch:
      process.env.NEXT_PUBLIC_TINA_BRANCH ||
      process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
      process.env.HEAD,
    token: process.env.TINA_TOKEN,
    media: {
      tina: {
        mediaRoot: 'uploads',
        publicFolder: 'public',
      },
    },
  },
  collections: [
    {
      label: 'Sivut',
      name: 'page',
      path: 'pages/content',
      format: 'md',
      ui: {
        filename: {
          readonly: true,
          slugify: values => {
            return `${values?.title?.toLowerCase().replace(/ /g, '_')}`
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
          label: 'Instagram URL',
          name: 'instagram_url',
        },
        {
          type: 'string',
          label: 'LinkedIn URL',
          name: 'linkedin_url',
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
});

export default schema;

export const tinaConfig = defineConfig({
  client,
  schema,
  cmsCallback: (cms) => {
    const RouteMapping = new RouteMappingPlugin((collection, document) => {
      if (['page'].includes(collection.name)) {
        if (document._sys.filename === 'home') {
          return '/';
        } else {
          return `/${document._sys.filename}`;
        }
      }
      return undefined;
    });

    cms.plugins.add(RouteMapping);

    return cms;
  },
});

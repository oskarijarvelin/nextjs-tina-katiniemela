import { defineConfig, defineSchema, RouteMappingPlugin } from "tinacms";
import { client } from "./__generated__/client";

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
        mediaRoot: "uploads",
        publicFolder: "public",
      },
    },
  },
  collections: [
    {
      label: "Page Content",
      name: "page",
      path: "pages/content",
      format: "md",
      fields: [
        {
          name: "title",
          label: "Otsikko",
          type: "string",
          isTitle: true,
          required: true,
        },
        {
          name: "description",
          label: "Kuvaus",
          type: "string",
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
                }
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
                  label: 'Otsikko',
                  name: 'palsta_otsikko',
                },
                {
                  type: 'rich-text',
                  label: 'Sisältö',
                  name: 'palsta_sisalto',
                },
              ],
            },  
          ],
        },
      ],
    },
    {
      label: "Global",
      name: "global",
      path: "content/global",
      format: "json",
      ui: {
        global: true,
      },
      fields: [
        {
          type: "object",
          label: "Päävalikko",
          name: "mainnav",
          fields: [
            {
              type: "object",
              label: "Linkit",
              name: "nav",
              list: true,
              ui: {
                itemProps: (item) => {
                  return { label: item?.label };
                },
                defaultItem: {
                  href: "home",
                  label: "Home",
                },
              },
              fields: [
                {
                  type: "string",
                  label: "Link",
                  name: "href",
                },
                {
                  type: "string",
                  label: "Label",
                  name: "label",
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
      if (["page"].includes(collection.name)) {
        if (document._sys.filename === "home") {
          return "/";
        }
      }
      return undefined;
    });

    cms.plugins.add(RouteMapping);

    return cms;
  },
});

import { useTina } from 'tinacms/dist/react';
import { client } from '../.tina/__generated__/client';
import { haeGlobaali } from '../lib/sivudata';

import { sivunRakenne } from '../lib/seo';
import Layout from '../components/Layout';
import Content from '../components/Content';

export default function Home(props) {
  const { data } = useTina({ query: props.query, variables: props.variables, data: props.data });
  const hero = data.page.blocks?.find((b) => b?.__typename === 'PageBlocksHero');
  return (
    <Layout title={data.page.title} description={data.page.description} jsonLd={sivunRakenne({ blocks: data.page.blocks || [], title: data.page.title, description: data.page.description, polku: '/' })} ogImage={hero?.bgImg}>
      <Content blocks={data.page.blocks} rakennettu={props.rakennettu} globaali={props.globaali} oletusAihe={data.page.lomake_aihe} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.page({ relativePath: 'home.md' });
  return {
    props: { data, query, variables, globaali: await haeGlobaali(), rakennettu: new Date().toISOString() },
  };
};

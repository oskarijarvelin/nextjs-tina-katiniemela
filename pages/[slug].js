import { useTina } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";
import { haeGlobaali } from "../lib/sivudata";

import { sivunRakenne } from "../lib/seo";
import Layout from "../components/Layout";
import Content from "../components/Content";

export default function Home(props) {

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout title={data.page.title} description={data.page.description} jsonLd={sivunRakenne({ blocks: data.page.blocks || [], title: data.page.title, description: data.page.description, polku: `/${props.slug}` })} ogImage={data.page.blocks?.find((b) => b?.__typename === "PageBlocksHero")?.bgImg}>
      <Content blocks={data.page.blocks} rakennettu={props.rakennettu} globaali={props.globaali} oletusAihe={data.page.lomake_aihe} />
    </Layout>
  );
}

export const getStaticPaths = async () => {
  const { data } = await client.queries.pageConnection();
  const paths = data.pageConnection.edges.map((x) => {
    return { params: { slug: x.node._sys.filename } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async (ctx) => {
  let tulos;
  try {
    tulos = await client.queries.page({
      relativePath: ctx.params.slug + ".md",
    });
  } catch (e) {
    // Tuntematon osoite (esim. /favicon.ico) → 404 eikä palvelinvirhe
    return { notFound: true };
  }
  const { data, query, variables } = tulos;

  return {
    props: {
      data,
      query,
      variables,
      slug: ctx.params.slug,
      globaali: await haeGlobaali(),
      // Sivun rakennusaika: keikkalista erottelee tulevat ja menneet tämän mukaan ennen kuin selain tarkistaa päivän
      rakennettu: new Date().toISOString(),
    },
  };
};
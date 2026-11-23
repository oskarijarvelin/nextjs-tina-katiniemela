import { useTina } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";

import Layout from "../components/Layout";
import Content from "../components/Content";

export default function Home(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout title={data.page.title} description={data.page.description} ogImage={data.page.blocks?.find((b) => b?.__typename === "PageBlocksHero")?.bgImg}>
      <Content blocks={data.page.blocks} rakennettu={props.rakennettu} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.page({
    relativePath: "home.md",
  });

  return {
    props: {
      data,
      query,
      variables,
      // Sivun rakennusaika: keikkalista erottelee tulevat ja menneet tämän mukaan ennen kuin selain tarkistaa päivän
      rakennettu: new Date().toISOString(),
    },
  };
};

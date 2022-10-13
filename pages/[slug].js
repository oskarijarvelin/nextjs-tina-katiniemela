import { useTina } from "tinacms/dist/edit-state";
import { client } from "../.tina/__generated__/client";

import Layout from "../components/Layout";
import Content from "../components/Content";

export default function Home(props) {

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout title={data.page.title} description={data.page.description}>
      <Content blocks={data.page.blocks} />
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
  const { data, query, variables } = await client.queries.page({
    relativePath: ctx.params.slug + ".md",
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
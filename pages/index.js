import { useTina } from "tinacms/dist/edit-state";
import { client } from "../.tina/__generated__/client";

import Layout from "../components/Layout";
import HeroBlock from "../components/blocks/hero";
import KuvaBlock from "../components/blocks/kuva";
import PalstaBlock from "../components/blocks/palsta";

import Box from '@mui/material/Box';

export default function Home(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  console.log(data.page)

  return (
    <Layout title={data.page.title} description={data.page.description}>
      {data.page.blocks.map((block, i) => (
        <Box key={i}>
          {(block.__typename == 'PageBlocksHero') &&
            <HeroBlock block={block} />
          }
          {(block.__typename == 'PageBlocksKuva') &&
            <KuvaBlock block={block} />
          }
          {(block.__typename == 'PageBlocksPalsta') &&
            <PalstaBlock block={block} />
          }
        </Box>
      ))}
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
    },
  };
};

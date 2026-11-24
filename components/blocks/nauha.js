import { Nauha } from '../lava/ui';

export default function NauhaBlock({ block }) {
  return <Nauha tekstit={block.nauha_tekstit} roolit={block.nauha_tyyli === 'roolit'} />;
}

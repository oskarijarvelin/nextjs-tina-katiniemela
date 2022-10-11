import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const KuvaBox = styled(Box)({
    position: 'relative',
    display: 'flex',
});

export default function KuvaBlock({block}) {
  return (
    <KuvaBox>
      <img src={block.img} width="100%" height="auto"/>
    </KuvaBox>
  )
}
import { styled } from '@mui/material/styles';
import Image from '../Image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const KuvaBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  height: 'auto',
}));

export default function KuvaBlock({ block }) {
  return (
    <KuvaBox sx={{ my: { xs: 6, lg: '200px' } }}>
      <Image src={block.img} orientation="landscape" alt={block?.kuva_kuvateksti} />
      {block.kuva_kuvateksti &&
        <Box sx={{ position: 'absolute', left: 0, bottom: { xs: '-8px', lg: '-12px' } }}>
          <Typography sx={{ fontSize: { xs: 11, lg: 14 }, color: '#777', p: '2px', lineHeight: 1 }}>{block.kuva_kuvateksti}</Typography>
        </Box>
      }
    </KuvaBox>
  )
}
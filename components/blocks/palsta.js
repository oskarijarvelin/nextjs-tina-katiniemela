import { TinaMarkdown } from 'tinacms/dist/rich-text'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function PalstaBlock({block}) {
  return (
    <Container maxWidth="md" >
        <Box sx={{ py: 16 }}>
            <Typography variant="h1" sx={{ mb: 8 }}>{block.palsta_otsikko}</Typography>
            <TinaMarkdown content={block.palsta_sisalto} />
        </Box>
    </Container>
  )
}
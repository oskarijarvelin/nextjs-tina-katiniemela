import Head from 'next/head'

import Link from './Link'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function Layout({ title, description, children }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" component="header" sx={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(0,0,0,.66)', boxShadow: 0 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'MonteCarlo', fontSize: 30 }}>
              <Link href="/" sx={{ color: '#fff', textDecoration: 'none' }}>
                {title}
              </Link>
            </Typography>
            <Box sx={{ display: { sm: 'none', lg: 'flex' } }}>
              <Typography color="inherit" sx={{ fontSize: 20, pl: 4 }}>
                <Link href="/" sx={{ color: '#fff', textDecoration: 'none' }}>Etusivu</Link>
              </Typography>
              <Typography color="inherit" sx={{ fontSize: 20, pl: 4 }}>
                <Link href="/cv" sx={{ color: '#fff', textDecoration: 'none' }}>CV</Link>
              </Typography>
              <Typography color="inherit" sx={{ fontSize: 20, pl: 4 }}>
                <Link href="/lauluopetus" sx={{ color: '#fff', textDecoration: 'none' }}>Lauluopetus</Link>
              </Typography>
            </Box>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ ml: 4, display: { sm: 'block', lg: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Box component="main">{children}</Box>
    </div>
  )
}

import Head from 'next/head'
import { useRouter } from 'next/router';

import Link from './Link'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Layout({ title, description, children }) {
  const router = useRouter();
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
            <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
              <Typography color="inherit" sx={{ fontSize: 20, pl: 4 }}>
                <Link href="/" sx={{ color: '#fff', textDecoration: (router.asPath == "/") ? "underline" : "none" }}>Etusivu</Link>
              </Typography>
              <Typography color="inherit" sx={{ fontSize: 20, pl: 4 }}>
                <Link href="/cv" sx={{ color: '#fff', textDecoration: (router.asPath == "/cv") ? "underline" : "none" }}>CV</Link>
              </Typography>
              <Typography color="inherit" sx={{ fontSize: 20, pl: 4 }}>
                <Link href="/muusikko" sx={{ color: '#fff', textDecoration: (router.asPath == "/muusikko") ? "underline" : "none" }}>Muusikko</Link>
              </Typography>
              <Typography color="inherit" sx={{ fontSize: 20, pl: 4 }}>
                <Link href="/laulunopettaja" sx={{ color: '#fff', textDecoration: (router.asPath == "/laulunopettaja") ? "underline" : "none" }}>Laulunopettaja</Link>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <Typography color="inherit" sx={{ fontSize: 20, pl: {xs: 2, lg: 4 } }}>
                <Link href="https://www.instagram.com/kaniffi/" sx={{ color: '#fff', textDecoration: "none", display: 'flex' }}><InstagramIcon /></Link>
              </Typography>
              <Typography color="inherit" sx={{ fontSize: 20, pl: {xs: 2, lg: 4 } }}>
                <Link href="https://www.linkedin.com/in/kati-niemel%C3%A4-a81b08250/" sx={{ color: '#fff', textDecoration: "none", display: 'flex' }}><LinkedInIcon /></Link>
              </Typography>
            </Box>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ ml: 4, display: { xs: 'flex', lg: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Box component="main">{children}</Box>
      <Box component="footer">
        <Typography sx={{ py: 4, fontSize: 14, textAlign: 'center', color: '#AAA' }} >
          &copy; 2022 Kati Niemelä
        </Typography>
      </Box>
    </div>
  )
}

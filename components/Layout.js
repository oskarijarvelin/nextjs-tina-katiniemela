import { useState } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router';

import Link from './Link'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { styled } from '@mui/material/styles';

import MenuIcon from '@mui/icons-material/Menu';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import theme from '../src/theme';

import settings from "../content/settings/index.json";

export default function Layout({ title, description, children, ogImage }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const closeMenu = () => {
    setAnchorEl(null);
  }

  const siteUrl = 'https://katiniemela.fi';
  const currentUrl = `${siteUrl}${router.asPath}`;
  const defaultOgImage = `${siteUrl}/favicon.png`;
  const imageUrl = ogImage || defaultOgImage;

  // Structured Data for SEO (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "name": "Kati Niemelä",
        "alternateName": "Kaniffi",
        "description": "Artisti, laulaja-lauluntekijä ja pop/jazz laulunopettaja",
        "url": siteUrl,
        "image": imageUrl,
        "jobTitle": ["Laulaja", "Lauluntekijä", "Laulunopettaja", "Artisti"],
        "knowsAbout": ["Musiikki", "Laulu", "Musiikkipedagogia", "Pop", "Jazz", "Musiikkiteatteri"],
        "sameAs": [
          settings.instagram_url,
          settings.linkedin_url,
          "https://www.facebook.com/kaniffivirallinen"
        ],
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "FI"
        }
      },
      {
        "@type": "WebSite",
        "name": settings.sivuston_nimi,
        "url": siteUrl,
        "description": description,
        "inLanguage": "fi",
        "publisher": {
          "@type": "Person",
          "name": "Kati Niemelä"
        }
      }
    ]
  };

  const NaviBox = styled(Box)({
    '& a': {
      textDecoration: 'none',
    }
  });

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: 0,
      minWidth: 180,
      color: theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
    },
  }));

  // Skip to main content link for accessibility
  const SkipLink = styled('a')({
    position: 'absolute',
    left: '-9999px',
    zIndex: 999,
    padding: '1rem',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    textDecoration: 'none',
    '&:focus': {
      left: '50%',
      transform: 'translateX(-50%)',
      top: '10px',
    }
  });

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={currentUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:alt" content={title} />
        <meta property="og:site_name" content={settings.sivuston_nimi} />
        <meta property="og:locale" content="fi_FI" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={currentUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:image:alt" content={title} />
        
        {/* Additional SEO tags */}
        <meta name="author" content="Kati Niemelä" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="language" content="Finnish" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      
      {/* Skip to main content link for accessibility */}
      <SkipLink href="#main-content">
        Siirry pääsisältöön
      </SkipLink>
      
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" component="header" sx={{ backdropFilter: 'blur(6px)', backgroundColor: 'rgba(0,0,0,.66)', boxShadow: 0 }}>
          <Toolbar>
            <NaviBox sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'MonteCarlo', fontSize: 30 }}>
                <Link href="/" sx={{ color: '#fff', textDecoration: 'none' }} aria-label="Koti - Kati Niemelä">
                  {settings.sivuston_nimi}
                </Link>
              </Typography>
            </NaviBox>
            <NaviBox sx={{ display: { xs: 'none', lg: 'flex' } }} component="nav" aria-label="Päänavigaatio">
              {settings.mainnav.nav.map((item, index) => (
                <Typography key={index} color="inherit" sx={{ fontSize: 20, pl: 4 }}>
                  <Link href={item.url} passHref sx={{ color: '#fff', textDecoration: (router.asPath == item.url) ? "underline" : "none" }}>{item.title}</Link>
                </Typography>
              ))}
            </NaviBox>
            <Box sx={{ display: 'flex' }} aria-label="Sosiaalinen media">
              {settings.instagram_url &&
                <Typography color="inherit" sx={{ fontSize: 20, pl: { xs: 2, lg: 4 } }}>
                  <Link href={settings.instagram_url} target="_blank" rel="noopener noreferrer" sx={{ color: '#fff', textDecoration: "none", display: 'flex' }} aria-label="Seuraa Instagramissa">
                    <InstagramIcon />
                  </Link>
                </Typography>
              }
              {settings.linkedin_url &&
                <Typography color="inherit" sx={{ fontSize: 20, pl: { xs: 2, lg: 4 } }}>
                  <Link href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" sx={{ color: '#fff', textDecoration: "none", display: 'flex' }} aria-label="Yhdistä LinkedInissä">
                    <LinkedInIcon />
                  </Link>
                </Typography>
              }
            </Box>
            <IconButton
              id="mainmenutoggle"
              size="large"
              edge="start"
              color="inherit"
              aria-label="Avaa päävalikko"
              aria-controls={open ? 'mainmenu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={openMenu}
              sx={{ ml: 4, display: { xs: 'flex', lg: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <StyledMenu
              id="mainmenu"
              anchorEl={anchorEl}
              open={open}
              onClose={closeMenu}
              MenuListProps={{
                'aria-labelledby': 'mainmenutoggle',
              }}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 20,
                    width: 10,
                    height: 10,
                    bgcolor: theme.palette.background.paper,
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
            >
              {settings.mainnav.nav.map((item, index) => (
                <MenuItem key={index} onClick={closeMenu} sx={{ p: 0 }}>
                  <Link href={item.url} sx={{ px: 2, py: 1, width: '100%', color: '#fff', transition: 'background-color .4s ease', '&:hover': { backgroundColor: 'rgba(255,255,255,.05)' }, textDecoration: (router.asPath == item.url) ? "underline" : "none" }}>{item.title}</Link>
                </MenuItem>
              ))}
            </StyledMenu>
          </Toolbar>
        </AppBar>
      </Box>
      <Box component="main" id="main-content">{children}</Box>
      <Box component="footer" role="contentinfo">
        <Typography sx={{ py: 4, fontSize: 14, textAlign: 'center', color: '#AAA' }} >
          &copy; 2022 - {new Date().getFullYear()} {settings.sivuston_nimi}
        </Typography>
      </Box>
    </div>
  )
}

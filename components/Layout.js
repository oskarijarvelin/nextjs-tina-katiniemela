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

export default function Layout({ title, description, children }) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  }

  const closeMenu = () => {
    setAnchorEl(null);
  }

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

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" component="header" sx={{ backdropFilter: 'blur(6px)', backgroundColor: 'rgba(0,0,0,.66)', boxShadow: 0 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'MonteCarlo', fontSize: 30 }}>
              <Link href="/" sx={{ color: '#fff', textDecoration: 'none' }}>
                {settings.sivuston_nimi}
              </Link>
            </Typography>
            <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
              {settings.mainnav.nav.map((item, index) => (
                <Typography key={index} color="inherit" sx={{ fontSize: 20, pl: 4 }}>
                  <Link href={item.url} sx={{ color: '#fff', textDecoration: (router.asPath == item.url) ? "underline" : "none" }}>{item.title}</Link>
                </Typography>
              ))}
            </Box>
            <Box sx={{ display: 'flex' }}>
              {settings.instagram_url &&
                <Typography color="inherit" sx={{ fontSize: 20, pl: { xs: 2, lg: 4 } }}>
                  <Link href={settings.instagram_url} target="_blank" rel="noopener" sx={{ color: '#fff', textDecoration: "none", display: 'flex' }}><InstagramIcon /></Link>
                </Typography>
              }
              {settings.linkedin_url &&
                <Typography color="inherit" sx={{ fontSize: 20, pl: { xs: 2, lg: 4 } }}>
                  <Link href={settings.linkedin_url} target="_blank" rel="noopener" sx={{ color: '#fff', textDecoration: "none", display: 'flex' }}><LinkedInIcon /></Link>
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
                <MenuItem key={index} onClick={closeMenu}>
                  <Link href={item.url} sx={{ color: '#fff', textDecoration: (router.asPath == item.url) ? "underline" : "none" }}>{item.title}</Link>
                </MenuItem>
              ))}
            </StyledMenu>
          </Toolbar>
        </AppBar>
      </Box>
      <Box component="main">{children}</Box>
      <Box component="footer">
        <Typography sx={{ py: 4, fontSize: 14, textAlign: 'center', color: '#AAA' }} >
          &copy; 2022 {settings.sivuston_nimi}
        </Typography>
      </Box>
    </div>
  )
}

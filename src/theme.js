import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: '#fff',
    },
    background: {
      default: '#000',
      paper: '#232323',
    },
  },
  typography: {
    fontFamily: 'Tillana',
    fontSize: 16,
    '@media (min-width:600px)': {
      fontSize: 18,
    },
    h1: {
      fontFamily: 'MonteCarlo',
    },
    h2: {
      fontFamily: 'MonteCarlo',
    },
    h3: {
      fontFamily: 'MonteCarlo',
    },
    h4: {
      fontFamily: 'MonteCarlo',
    },
    h5: {
      fontFamily: 'MonteCarlo',
    },
    h6: {
      fontFamily: 'MonteCarlo',
      fontSize: 23,
      '@media (min-width:600px)': {
        fontSize: 25,
      },
    },
  },
});

theme.typography.h2 = {
  fontSize: '3rem',
  fontFamily: 'MonteCarlo',
  fontWeight: 400,
  [theme.breakpoints.up('xl')]: {
    fontSize: '4rem',
  },
};

export default theme;
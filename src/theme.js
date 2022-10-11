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
    },
  },
  typography: {
    fontFamily: 'Tillana',
    fontSize: 18,
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
    },
  },
});

export default theme;
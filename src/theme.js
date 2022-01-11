import { createTheme } from '@mui/material/styles';
import { deepPurple, grey } from '@mui/material/colors';

export default createTheme({
  palette: {
    primary: {
      main: deepPurple[300],
    },
    secondary: {
      main: grey[400],
    },
  },
});
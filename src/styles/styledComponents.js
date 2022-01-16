import { Box, Button, Card, Typography, TextField } from '@mui/material';
import { styled } from '@mui/system';

export const FullWidthHeightButton = styled(Button)({
  height: '100%', 
  width: '100%'
});

export const FullHeightBox = styled(Box)({
  height: '100%', 
});

export const AuthOuterBox = styled(Box)({
  height: '100vh', 
  padding: '1rem'
});

export const AuthInnerBox = styled(Box)({
  position: 'relative', 
  top: '20%'
});

export const AuthCard = styled(Card)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 auto',
  padding: '1rem',
  borderRadius: '10px',
  maxWidth: '600px',
  background: 'white',
});

export const GreyTypography = styled(Typography)({
  color: 'grey',
});

export const AuthTextField = styled(TextField)({
  width: '90%',
});

export const AuthAltButton = styled(Button)({
  margin: '1rem',
});
import React, { useState } from 'react';
import { Card, TextField, Typography, Box, Button, Grid } from '@mui/material';
import Header from '../components/Header';
import { useTheme } from '@mui/material/styles';
import MyAttendanceBooks from '../components/MyAttendanceBooks';

function HomePage() {
  // const [username, setUsername] = useState('');

  return (
    <Box sx={{ height: '100%' }}>
      <Header />
      <MyAttendanceBooks />
    </Box>
  );
}

export default HomePage;

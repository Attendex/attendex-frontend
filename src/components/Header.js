import React, { useState } from 'react';
import { Card, TextField, Typography, Box, Button, Stack } from '@mui/material';

// Replace with username route param
const username = "lily"

function HomePage() {
  return (
    <Box sx={{ 
      padding: '1rem', 
      boxShadow: '2px 2px 2px grey'
    }}>
      <Stack 
        direction="row" 
        alignItems="center" 
        justifyContent="space-between" 
        sx={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}
      >
        <Typography variant="p">{username}</Typography>
        <Button variant="contained" color="secondary" href="/signin">Sign Out</Button>
      </Stack>
    </Box>
  );
}

export default HomePage;

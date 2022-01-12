import React, { useState } from 'react';
import { Card, TextField, Typography, Box, Button, Grid } from '@mui/material';
import Header from '../components/Header';
import { useTheme } from '@mui/material/styles';

function AttendanceBook(props) {
  const theme = useTheme();

  return (
    <Grid item xs={12} sm={4}>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.light,
          display: 'flex',
          alignItems: 'flex-end',
          padding: '0.5rem',
          borderRadius: '5px',
          height: '5rem',
          '&:hover': {
            cursor: 'pointer',
            background: theme.palette.primary.main,
            color: 'white',
            fontSize: '1.25rem',
            transition: '1s ease'
         },
        }}
      >
        <Typography variant="p">{props.book.bookName}</Typography>
      </Box>
    </Grid>
  );
}

export default AttendanceBook;

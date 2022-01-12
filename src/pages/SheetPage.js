import React, { useState } from 'react';
import { Box, Button, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import Header from '../components/Header';
import { useParams } from 'react-router-dom';
import SheetHeader from '../components/SheetHeader';

// URL path would be /:username/:bookId/:bookName/:sheetId/:date

function SheetPage() {
  // const { username, bookId, bookName, sheetId, date } = useParams();

  return (
    <Box sx={{ height: '100%' }}>
      <Header />
      <SheetHeader />
    </Box>
  );
}

export default SheetPage;

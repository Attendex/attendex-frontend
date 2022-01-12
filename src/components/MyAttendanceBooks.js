import React, { useState } from 'react';
import { Card, TextField, Typography, Box, Button, Grid } from '@mui/material';
import AttendanceBook from './AttendanceBook';
import NewAttendanceBook from './NewAttendanceBook';

// Replace with payload from get all books endpoint
const attBooks = [{
  "bookName": "CS1231S Lecture",
  "bookID": "1"
},
{
  "bookName": "CS1231S Tutorial",
  "bookID": "2"
},
{
  "bookName": "Soccer Practice",
  "bookID": "3"
},
{
  "bookName": "CS1231S Lab",
  "bookID": "7"
},
]

function MyAttendanceBooks() {
  return (
    <Box sx={{ padding: '2rem 1rem', maxWidth: '1000px', margin: '0 auto'}}>
      <Typography variant="h4">My Attendance Books</Typography>
      <Grid container spacing={2} sx={{marginTop: '1rem'}}>
        {attBooks.map((book) => (<AttendanceBook book={book} />))}
        <NewAttendanceBook />
      </Grid>
    </Box>
  );
}

export default MyAttendanceBooks;

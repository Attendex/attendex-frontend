import React, { useState } from 'react';
import { Card, TextField, Typography, Box, Button } from '@mui/material';

// Replace with username route param
const username = "lily"

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

function HomePage() {
  // const [username, setUsername] = useState('');

  return (
    <Box sx={{ height: '100vh', padding: '1rem' }}>
      
    </Box>
  );
}

export default HomePage;

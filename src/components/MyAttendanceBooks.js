import { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Box, Grid } from '@mui/material';
import AttendanceBook from './AttendanceBook';
import NewAttendanceBook from './NewAttendanceBook';

function MyAttendanceBooks() {
  const [attBooks, setAttBooks] = useState([]);

  const fetchAttBooks = () => {
     // Fetch all of user's attendance books
    const token = window.localStorage.getItem("token");
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/getbook`,
      { headers: {"Authorization" : `Bearer ${token}`}})
      .then(res => {
        setAttBooks(res.data);
      })
  }

  useEffect(() => {
    fetchAttBooks();
  }, []); 

  return (
    <Box sx={{ padding: '2rem 1rem', maxWidth: '1000px', margin: '0 auto'}}>
      <Typography variant="h4">My Attendance Books</Typography>
      <Grid container spacing={2} sx={{marginTop: '1rem'}}>
        {attBooks.map((book) => (<AttendanceBook key={book.bookID} book={book} />))}
        <NewAttendanceBook onAdd={() => fetchAttBooks()} />
      </Grid>
    </Box>
  );
}

export default MyAttendanceBooks;

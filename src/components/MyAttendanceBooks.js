import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Grid, Collapse, Alert } from '@mui/material';
import { getToken } from '../utils/utils';
import AttendanceBook from './AttendanceBook';
import NewAttendanceBook from './NewAttendanceBook';

function MyAttendanceBooks() {
  const navigate = useNavigate();
  
  const [successMsg, setSuccessMsg] = useState(null);
  const [attBooks, setAttBooks] = useState([]);

  const fetchAttBooks = () => {
    // Fetch all of user's attendance books
    const token = getToken();
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/getbook`,
      { headers: {"Authorization" : `Bearer ${token}`}})
      .then(res => {
        setAttBooks(res.data);
      }).catch((error) => { 
        if (error.response.status === 401) {
          navigate('/signin');
        }
    })
  }

  useEffect(() => {
    fetchAttBooks();
  }, []); 

  return (
    <Box sx={{ padding: '2rem 1rem', maxWidth: '1000px', margin: '0 auto'}}>
      <Typography variant="h4">My Attendance Books</Typography>
      <Grid container spacing={2} sx={{marginTop: '1rem'}}>
        {attBooks.map((book) => 
          (<AttendanceBook 
            key={book.bookID} 
            book={book} 
            onDeleteBook={() => {fetchAttBooks(); setSuccessMsg("Book deleted successfully!");}}
          />))}
        <NewAttendanceBook onAdd={() => {fetchAttBooks(); setSuccessMsg("Book added successfully!");}} />
      </Grid>
      <Collapse in={!!successMsg} sx={{marginTop: '1rem'}}>
        <Alert severity="success" onClose={() => {setSuccessMsg(null);}}>{successMsg}</Alert>
      </Collapse>
    </Box>
  );
}

export default MyAttendanceBooks;

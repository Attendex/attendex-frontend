import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Typography, Box, Grid } from '@mui/material';
import { getToken } from '../utils/utils';
import AttendanceBook from './AttendanceBook';
import NewAttendanceBook from './NewAttendanceBook';
import { alertSeverity } from './AlertFeedback';
import AlertFeedback from './AlertFeedback';

function MyAttendanceBooks() {
  const navigate = useNavigate();

  const [successMsg, setSuccessMsg] = useState(null);
  const [attBooks, setAttBooks] = useState([]);

  useEffect(() => {
    fetchAttBooks();
  }, []); 
  
  const fetchAttBooks = () => {
    const token = getToken();
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/getbook`,
      { 
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      })
      .then(res => {
        setAttBooks(res.data);
      })
      .catch((error) => { 
        if (error.response.status === 401) {
          navigate('/signin');
        }
    });
  }

  const handleAddNewAttBook = () => {
    fetchAttBooks(); 
    setSuccessMsg("Book added successfully!");
  };

  const handleDeleteAttBook = () => {
    fetchAttBooks();
    setSuccessMsg("Book deleted successfully!");
  };

  const renderAttBooks = () => {
    return attBooks.map((book) => (
      <AttendanceBook 
        key={book.bookID} 
        book={book} 
        onDeleteBook={handleDeleteAttBook}
      />
    ));
  };

  return (
    <MyAttBooksBox>
      <Typography variant="h4">My Attendance Books</Typography>
      <TopSpacedGrid container spacing={2}>
        {renderAttBooks()}
        <NewAttendanceBook onAdd={handleAddNewAttBook} />
      </TopSpacedGrid>
      <AlertFeedback msg={successMsg} severity={alertSeverity.SUCCESS} onClose={() => setSuccessMsg(null)} />
    </MyAttBooksBox>
  );
}

const MyAttBooksBox = styled(Box)({
  padding: '2rem 1rem', 
  maxWidth: '1000px', 
  margin: '0 auto',
});

const TopSpacedGrid = styled(Grid)({
  marginTop: '1rem',
});

export default MyAttendanceBooks;

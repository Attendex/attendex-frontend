import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';
import { getToken } from '../utils/utils';

// URL path would be /

function BookLandingPage() {
  const { username, bookName, bookId } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get dates and redirect to latest date
    const token = getToken();
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/getdate?bookid=${bookId}`,
      { headers: {"Authorization" : `Bearer ${token}`}})
      .then(res => {
        if (res.data.length === 0) {
          // get today's date
          const today = new Date();
          const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
          
          // create sheet for today
          axios.post(`${process.env.REACT_APP_BACKEND_URL}/addsheet`,
            {"bookid": bookId, "date": formattedDate},
            { headers: {"Authorization" : `Bearer ${token}`}})
            .then(res => {
              const sheetId = res.data.sheetID;
              navigate(`/${username}/${bookName}/${bookId}/${formattedDate}/${sheetId}`);
            })
        } else {
          const date = res.data[0].date;
          const sheetId = res.data[0].sheetID;
          navigate(`/${username}/${bookName}/${bookId}/${date}/${sheetId}`);
        }
      })
  }, []);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
      <CircularProgress />
    </Box>
  );
}

export default BookLandingPage;

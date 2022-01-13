import { Box } from '@mui/material';
import Header from '../components/Header';
import MyAttendanceBooks from '../components/MyAttendanceBooks';
import { useParams } from 'react-router-dom';

// URL path would be /:username

function HomePage() {
  // const { username, bookId, bookName, sheetId, date } = useParams();

  return (
    <Box sx={{ height: '100%' }}>
      <Header />
      <MyAttendanceBooks />
    </Box>
  );
}

export default HomePage;

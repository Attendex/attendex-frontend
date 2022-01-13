import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from '../components/Header';
import MyAttendanceBooks from '../components/MyAttendanceBooks';

// URL path would be /:username

function HomePage() {
  const { username } = useParams();

  return (
    <Box sx={{ height: '100%' }}>
      <Header username={username} />
      <MyAttendanceBooks />
    </Box>
  );
}

export default HomePage;

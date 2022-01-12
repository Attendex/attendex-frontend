import { Box } from '@mui/material';
import Header from '../components/Header';
import MyAttendanceBooks from '../components/MyAttendanceBooks';

function HomePage() {
  return (
    <Box sx={{ height: '100%' }}>
      <Header />
      <MyAttendanceBooks />
    </Box>
  );
}

export default HomePage;

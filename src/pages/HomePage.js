import { useParams } from 'react-router-dom';
import { FullHeightBox } from '../styles/styledComponents';
import Header from '../components/Header';
import MyAttendanceBooks from '../components/MyAttendanceBooks';

// URL path would be /:username

function HomePage() {
  const { username } = useParams();

  return (
    <FullHeightBox sx={{ height: '100%' }}>
      <Header username={username} />
      <MyAttendanceBooks />
    </FullHeightBox>
  );
}

export default HomePage;

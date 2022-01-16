import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import SheetHeader from '../components/SheetHeader';
import Attendances from '../components/Attendances.js';

// URL path would be /:username/:bookId/:bookName/:sheetId/:date

function SheetPage() {
  const { username } = useParams();

  return (
    <Box sx={{ height: '100%' }}>
      <Header username={username}/>
      <SheetHeader withDateSelector={true} />
      <Attendances emptyAttendances={false} />
    </Box>
  );
}

export default SheetPage;

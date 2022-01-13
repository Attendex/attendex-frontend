import { Box, Typography } from '@mui/material';
import AttendanceTable from './AttendanceTable';

// URL path would be /:username/:bookId/:bookName/:sheetId/:date

function Attendances() {
  // const { username, bookId, bookName, sheetId, date } = useParams();

  return (
    <Box sx={{ marginTop: '1rem' }}>
      <Typography variant="h5">Attendances</Typography>
      <AttendanceTable />
    </Box>
  );
}

export default Attendances;

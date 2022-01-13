import { Box, Typography } from '@mui/material';
import AttendanceTable from './AttendanceTable';

// URL path would be /:username/:bookId/:bookName/:sheetId/:date

function Attendances(props) {
  const { emptyAttendance } = props;
  
  return (
    <Box sx={{ marginTop: '1rem' }}>
      <Typography variant="h5">Attendances</Typography>
      <AttendanceTable emptyTable={emptyAttendance} />
    </Box>
  );
}

export default Attendances;

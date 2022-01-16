import { styled } from '@mui/system';
import { Box, Typography } from '@mui/material';
import AttendanceTable from './AttendanceTable';

// URL path would be /:username/:bookId/:bookName/:sheetId/:date

function Attendances(props) {
  const { emptyAttendance } = props;
  
  return (
    <AttendancesBox>
      <Typography variant="h5">Attendances</Typography>
      <AttendanceTable emptyTable={emptyAttendance} />
    </AttendancesBox>
  );
}

const AttendancesBox = styled(Box)({
  marginTop: '1rem'
});

export default Attendances;

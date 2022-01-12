import { Box, Typography } from '@mui/material';

// URL path would be /:username/:bookId/:bookName/:sheetId/:date

function Attendances() {
  // const { username, bookId, bookName, sheetId, date } = useParams();

  return (
    <Box sx={{ height: '100%' }}>
      <Typography variant="h5">Attendances</Typography>
    </Box>
  );
}

export default Attendances;

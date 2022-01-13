import { Typography, Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

function AttendanceBook(props) {
  const theme = useTheme();
  let navigate = useNavigate();

  return (
    <Grid item xs={12} sm={4}>
      <Box
        onClick={()=> navigate('/sheet')}
        sx={{
          backgroundColor: theme.palette.primary.light,
          display: 'flex',
          alignItems: 'flex-end',
          padding: '0.5rem',
          borderRadius: '5px',
          height: '5rem',
          '&:hover': {
            cursor: 'pointer',
            background: theme.palette.primary.main,
            color: 'white',
            fontSize: '1.25rem',
            transition: '1s ease'
         },
        }}
      >
        <Typography variant="p">{props.book.bookName}</Typography>
      </Box>
    </Grid>
  );
}

export default AttendanceBook;

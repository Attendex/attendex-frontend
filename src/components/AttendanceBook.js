import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Typography, Box, Grid } from '@mui/material';

function AttendanceBook(props) {
  const { book } = props;
  const theme = useTheme();
  const navigate = useNavigate();
  const { username } = useParams();

  return (
    <Grid item xs={12} sm={4}>
      <Box
        onClick={()=> navigate(`/${username}/${book.bookName}/${book.bookID}`)}
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
        <Typography variant="p">{book.bookName}</Typography>
      </Box>
    </Grid>
  );
}

export default AttendanceBook;

import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Typography, Box, Grid, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import ConfirmationDialog from './ConfirmationDialog';
import { getToken } from '../utils/utils';
import axios from 'axios';

function AttendanceBook(props) {
  const { book, onDeleteBook } = props;
  const theme = useTheme();
  const navigate = useNavigate();
  const { username } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openDelConfirmation, setOpenDelConfirmation] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteBook = (isConfirmed) => {
    if (isConfirmed) {
      console.log('delete book', book.bookID)
      // Send API call to delete member with sheetID
      const token = getToken();
      axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deletebook`,
        { headers: {"Authorization" : `Bearer ${token}`}, data: { "bookid": book.bookID }})
        .then(res => {
          console.log('deletebook success')
          onDeleteBook();
        }).catch((error) => { 
          if (error.response.status === 401) {
            navigate('/signin');
          }
      })
    }
    setAnchorEl(null);
  };

  return (
    <Grid item xs={12} sm={4}>
      <Box
        sx={{
          backgroundColor: theme.palette.primary.light,
          display: 'flex',
          padding: '0.5rem',
          borderRadius: '5px',
          height: '5rem',
          '&:hover': {
            cursor: 'pointer',
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            fontSize: '1.25rem',
            transition: '1s ease'
         },
        }}
      >
        <Typography variant="p" 
          sx={{
            width:'100%', 
            height: '100%',
            display: 'flex',
            alignItems: 'flex-end',
          }} 
          onClick={()=> navigate(`/${username}/${book.bookName}/${book.bookID}`)}
        >
          {book.bookName}
        </Typography>
        <MoreVertIcon sx={{color:'grey'}} onClick={handleClick}/>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => {setOpenDelConfirmation(true);}}>
            <ListItemIcon><DeleteIcon sx={{color:'#757575'}}/></ListItemIcon>
            <ListItemText>Delete Book</ListItemText>
          </MenuItem>
        </Menu>
        <ConfirmationDialog 
          open={openDelConfirmation} 
          onClose={(isConfirmed) => { setOpenDelConfirmation(false); handleDeleteBook(isConfirmed);}}
          title="Delete book"
          text="Please note that ALL ATTENDANCE DATA of deleted book will be permanently deleted. Proceed to delete book?"
          cancelButtonText="Cancel"
          actionButtonText="Delete"
        />
      </Box>
    </Grid>
  );
}

export default AttendanceBook;

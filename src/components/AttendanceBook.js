import axios from 'axios';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, Grid, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { getToken } from '../utils/utils';
import ConfirmationDialog from './ConfirmationDialog';

function AttendanceBook(props) {
  const { book, onDeleteBook } = props;

  const theme = useTheme();
  const navigate = useNavigate();
  const { username } = useParams();

  const [moreAnchorEl, setMoreAnchorEl] = useState(null);
  const openMore = Boolean(moreAnchorEl);
  const [openDelConfirm, setOpenDelConfirm] = useState(false);

  const handleAttBookClick = () => {
    navigate(`/${username}/${book.bookName}/${book.bookID}`);
  };

  const handleMoreClick = (event) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setMoreAnchorEl(null);
  };

  const handleDeleteClick = () => {
    setOpenDelConfirm(true);
  };

  const handleDelConfirmClose = (isConfirmed) => {
    setOpenDelConfirm(false); 
    handleDeleteBook(isConfirmed);
  };

  const handleDeleteBook = (isConfirmed) => {
    if (isConfirmed) {
      const token = getToken();
      axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deletebook`,
        { headers: {"Authorization" : `Bearer ${token}`}, data: { "bookid": book.bookID }})
        .then(res => {
          onDeleteBook();
        }).catch((error) => { 
          if (error.response.status === 401) {
            navigate('/signin');
          }
      })
    }
    setMoreAnchorEl(null);
  };

  return (
    <Grid item xs={12} sm={4}>
      <AttendanceBookBox>
        <BookNameTypography 
          variant="p" 
          onClick={handleAttBookClick}
        >
          {book.bookName}
        </BookNameTypography>
        <MoreVertIcon color="action" onClick={handleMoreClick}/>
        <Menu
          anchorEl={moreAnchorEl}
          open={openMore}
          onClose={handleMoreClose}
        >
          <MenuItem onClick={handleDeleteClick}>
            <ListItemIcon><DeleteIcon color="action" /></ListItemIcon>
            <ListItemText>Delete Book</ListItemText>
          </MenuItem>
        </Menu>
        <ConfirmationDialog 
          open={openDelConfirm} 
          onClose={(isConfirmed) => handleDelConfirmClose(isConfirmed)}
          title="Delete book"
          text="Please note that ALL ATTENDANCE DATA of deleted book will be permanently deleted. Proceed to delete book?"
          cancelButtonText="Cancel"
          actionButtonText="Delete"
        />
      </AttendanceBookBox>
    </Grid>
  );
}

const AttendanceBookBox = styled(Box)(({ theme }) => ({
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
}));

const BookNameTypography = styled(Typography)({
  width:'100%', 
  height: '100%',
  display: 'flex',
  alignItems: 'flex-end',
});

export default AttendanceBook;

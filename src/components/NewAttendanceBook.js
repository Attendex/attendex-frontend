import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { TextField, Typography, Box, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { getToken } from '../utils/utils';
import { alertSeverity } from './AlertFeedback';
import AlertFeedback from './AlertFeedback';

function NewAttendanceBook(props) {
  const { onAdd } = props;
  
  const navigate = useNavigate();
  const theme = useTheme();

  const [openNewBookDialog, setOpenNewBookDialog] = useState(false);
  const [newBookName, setNewBookName] = useState('');
  const [warnMsg, setWarnMsg] = useState(null);

  const handleNewBookNameChange = (event) => {
    setNewBookName(event.target.value);
  };

  const handleCreate = () => {
    if (newBookName.length > 45) {
      setWarnMsg('Book names cannot be longer than 45 characters');
    } else {
      const token = getToken();
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/addbook`,
        {
          "bookname": newBookName
        },
        { 
          headers: {
            "Authorization" : `Bearer ${token}`
          }
        })
        .then(res => {
          onAdd();
          setOpenNewBookDialog(false);
        })
        .catch((error) => { 
          if (error.response.status === 401) {
            navigate('/signin');
          }
      });
    }
  }

  const handleCancel = () => {
    setOpenNewBookDialog(false);
    setWarnMsg(null);
  };

  return (
    <Grid item xs={12} sm={4}>
      <NewAttBookBox onClick={() => setOpenNewBookDialog(true)}>
        <Typography variant="p">Create New Book</Typography>
      </NewAttBookBox>
      <Dialog open={openNewBookDialog} onBackdropClick={handleCancel}>
        <DialogTitle>Create New Book</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Book Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleNewBookNameChange}
          />
          <AlertFeedback msg={warnMsg} severity={alertSeverity.WARN} onClose={() => setWarnMsg(null)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

const NewAttBookBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.lighter,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
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
}));

export default NewAttendanceBook;

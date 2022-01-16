import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Alert, Collapse, TextField, Typography, Box, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { getToken } from '../utils/utils';

function NewAttendanceBook(props) {
  const { onAdd } = props;
  
  const navigate = useNavigate();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [newBookName, setNewBookName] = useState('');
  const [warnMsg, setWarnMsg] = useState(null);

  const handleCreate = () => {
    if (newBookName.length > 45) {
      setWarnMsg('Book names cannot be longer than 45 characters');
    } else {
      const token = getToken();
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/addbook`,
        {"bookname": newBookName},
        { headers: {"Authorization" : `Bearer ${token}`}})
        .then(res => {
          onAdd();
          setOpen(false);
        }).catch((error) => { 
          if (error.response.status === 401) {
            navigate('/signin');
          }
      });
    }
    
  }

  return (
    <Grid item xs={12} sm={4}>
      <Box
        onClick={() => setOpen(true)}
        sx={{
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
        }}
      >
        <Typography variant="p">Create New Book</Typography>
      </Box>
      <Dialog open={open} onBackdropClick={() => {setOpen(false); setWarnMsg(null);}}>
        <DialogTitle>Create New Book</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Book Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => setNewBookName(event.target.value)}
          />
          <Collapse in={!!warnMsg} sx={{marginTop: '1rem'}}>
            <Alert severity="warning" onClose={() => {setWarnMsg(null);}}>{warnMsg}</Alert>
          </Collapse>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setOpen(false); setWarnMsg(null);}}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default NewAttendanceBook;

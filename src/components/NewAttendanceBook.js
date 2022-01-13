import { useState } from 'react';
import { TextField, Typography, Box, Button, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { getToken } from '../utils/utils';

function NewAttendanceBook(props) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [newBookName, setNewBookName] = useState('');
  const { onAdd } = props;

  const handleCreate = () => {
    const token = getToken();
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/addbook`,
      {"bookname": newBookName},
      { headers: {"Authorization" : `Bearer ${token}`}})
      .then(res => {
        onAdd();
        setOpen(false);
      })
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
      <Dialog open={open} onClose={() => setOpen(false)}>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleCreate}>Create</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default NewAttendanceBook;

import axios from 'axios';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, DialogActions, DialogContent, Dialog, DialogTitle, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { getToken, formatDate } from '../utils/utils';
import { alertSeverity } from './AlertFeedback';
import AlertFeedback from './AlertFeedback';

function SheetDatePicker(props) {
  const { onChange } = props;
  const [value, setValue] = useState(Date.now());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date for new sheet"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          onChange(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

function NewSheetDialog (props) {
  const navigate = useNavigate();
  const { username, bookId, bookName } = useParams();
  const { onClose, open } = props;
  const [newDate, setNewDate] = useState(Date.now());
  const [errorMsg, setErrorMsg] = useState(null);

  const handleCreateNewSheet = () => {
    const formattedDate = formatDate(newDate);

    const token = getToken();
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/addsheet`,
      { "bookid": bookId, "date": formattedDate },
      { headers: {"Authorization" : `Bearer ${token}`}})
      .then(res => {
        setErrorMsg("A sheet already exists on this date!");
        const sheetId = res.data.sheetID;
        onClose();
        navigate(`/${username}/${bookName}/${bookId}/${formattedDate}/${sheetId}`);
      }).catch((error) => { 
        if (error.response.status === 401) {
          navigate('/signin');
        } else if (error.response.status === 409) {
          setErrorMsg(null);
        }
    })
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Create New Sheet</DialogTitle>
      <DialogContent>
        <Box sx={{padding: '1rem'}}><SheetDatePicker onChange={(newValue) => {setNewDate(newValue);}}/></Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>Cancel</Button>
        <Button onClick={handleCreateNewSheet} autoFocus>Create</Button>
      </DialogActions>
      <AlertFeedback msg={errorMsg} severity={alertSeverity.ERROR} onClose={() => setErrorMsg(null)} />
    </Dialog>
  );
}

export default NewSheetDialog;
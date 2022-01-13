import { useState } from 'react';
import { Box, Button, DialogActions, DialogContent, Dialog, DialogTitle, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

function SheetDatePicker() {
  const [value, setValue] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Date for new sheet"
        value={Date.now()}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}

function NewSheetDialog (props) {
  const { onClose, open, } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Create New Sheet</DialogTitle>
      <DialogContent>
        <Box sx={{padding: '1rem'}}><SheetDatePicker /></Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>Cancel</Button>
        <Button onClick={() => onClose(true)} autoFocus>Create</Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewSheetDialog;
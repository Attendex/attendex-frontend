import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Stack, Typography, Button, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import ConfirmationDialog from './ConfirmationDialog';
import NewSheetDialog from './NewSheetDialog';
import ViewMembers from '../components/ViewMembers';
import axios from 'axios';
import { getToken } from '../utils/utils';

// Replace with payload from get all dates endpoint
const dates = [
  {
    "date": "11-01-2022",
    "sheetId": "1",
  },
  {
    "date": "09-01-2022",
    "sheetId": "3",
  },
  {
    "date": "2-01-2022",
    "sheetId": "7",
  },
  {
    "date": "11-12-2021",
    "sheetId": "10",
  }
]

function SheetHeader(props) {
  const { withDateSelector } = props;
  const { bookId, bookName, sheetId, date } = useParams();
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(''); //set default value as most recent date
  // const [dateToCreate, setDateToCreate] = useState(null);
  const [openDelConfirmation, setOpenDelConfirmation] = useState(false);
  const [openCreateConfirmation, setOpenCreateConfirmation] = useState(false);

  useEffect(() => {
    // Get dates and save into state
    const token = getToken();
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/getdate?bookid=${bookId}`,
      { headers: {"Authorization" : `Bearer ${token}`}})
      .then(res => {
        const dates = res.data;
        setSelectedDate(dates[0].date);
        setDates(dates);
      })
  }, []);

  const handleSelectDate = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleDelete = (isConfirmed) => {
    if (isConfirmed) {
      // Send API call to delete selectedDate with sheetID
    }
  }

  const handleCreate = (isConfirmed) => {
    if (isConfirmed) {
      // Send API call to create new sheet with dateToCreate
    }
  }

  return (
    <Stack sx={{padding: '1rem', maxWidth: '1000px', margin: '0 auto'}}>
      <Stack direction="row" justifyContent="space-between" sx={{margin: '1rem 0'}}>
        <Typography variant="h4">{bookName}</Typography>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Date</InputLabel>
          { withDateSelector ? <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedDate}
            label="Date"
            onChange={handleSelectDate}
          >
            {dates.map((date) => <MenuItem value={date.date} key={date.date}>{date.date}</MenuItem>)}
          </Select> : null}
        </FormControl>
      </Stack>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={4}><ViewMembers /></Grid>
        <Grid item sm={3} xs={4}><Button variant="contained" sx={{height: '100%', width: '100%'}} onClick={() => setOpenDelConfirmation(true)}>Delete Sheet</Button></Grid>
        <Grid item sm={3} xs={4}><Button variant="contained" sx={{height: '100%', width: '100%'}} onClick={() => setOpenCreateConfirmation(true)}>Create New Sheet</Button></Grid>
      </Grid>
      <ConfirmationDialog 
        open={openDelConfirmation} 
        onClose={(isConfirmed) => { setOpenDelConfirmation(false); handleDelete(isConfirmed);}}
        title="Delete today's sheet?"
        text="Please note that ALL ATTENDANCE DATA of from today will be permanently deleted. Proceed to delete sheet?"
        cancelButtonText="Cancel"
        actionButtonText="Delete"
      />
      <NewSheetDialog  
        open={openCreateConfirmation} 
        onClose={(isConfirmed) => { setOpenCreateConfirmation(false); handleCreate(isConfirmed);}}
      />
    </Stack>
  );
}

export default SheetHeader;

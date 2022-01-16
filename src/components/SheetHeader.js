import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Collapse, Alert, Stack, Typography, Button, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { getToken } from '../utils/utils';
import ConfirmationDialog from './ConfirmationDialog';
import NewSheetDialog from './NewSheetDialog';
import ViewMembers from '../components/ViewMembers';

function SheetHeader(props) {
  const navigate = useNavigate();
  const { withDateSelector } = props;
  const { username, bookId, bookName, sheetId, date } = useParams();
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(''); //set default value as most recent date
  const [openDelConfirmation, setOpenDelConfirmation] = useState(false);
  const [openDelSuccess, setOpenDelSuccess] = useState(false);
  const [openCreateConfirmation, setOpenCreateConfirmation] = useState(false);

  useEffect(() => {
    // Get dates and save into state
    const token = getToken();
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/getdate?bookid=${bookId}`,
      { headers: {"Authorization" : `Bearer ${token}`}})
      .then(res => {
        const dates = res.data;
        setSelectedDate(date);
        setDates(dates);
      }).catch((error) => { 
        if (error.response.status === 401) {
          navigate('/signin');
        }
    })
  }, [sheetId]);

  const handleSelectDate = (event) => {
    const dateStr = event.target.value;
    setSelectedDate(dateStr);
    dates.forEach((date) => {
      if (date.date === dateStr) {
        navigate(`/${username}/${bookName}/${bookId}/${dateStr}/${date.sheetID}`);
      }
    })
  };

  const handleDelete = (isConfirmed) => {
    if (isConfirmed) {
      // Send API call to delete selectedDate with sheetID
      const token = getToken();
      console.log('sheetid', sheetId)
      axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deletesheet`,
        { headers: {"Authorization" : `Bearer ${token}`}, data: { "sheetid": sheetId }})
        .then(res => {
          setOpenDelSuccess(true);
          navigate(`/${username}/${bookName}/${bookId}`)
        }).catch((error) => { 
          if (error.response.status === 401) {
            navigate('/signin');
          }
      })
    }
  }

  return (
    <Stack sx={{padding: '1rem', maxWidth: '1000px', margin: '0 auto'}}>
      <Collapse in={openDelSuccess}>
        <Alert severity="success" onClose={() => {setOpenDelSuccess(false);}}>Sheet successfully deleted!</Alert>
      </Collapse>
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
        <Grid item sm={3} xs={4}><Button variant="contained" sx={{height: '100%', width: '100%'}} onClick={() => setOpenDelConfirmation(true)} disabled={!withDateSelector}>Delete Current Sheet</Button></Grid>
        <Grid item sm={3} xs={4}><Button variant="contained" sx={{height: '100%', width: '100%'}} onClick={() => setOpenCreateConfirmation(true)}>Create New Sheet</Button></Grid>
      </Grid>
      <ConfirmationDialog 
        open={openDelConfirmation} 
        onClose={(isConfirmed) => { setOpenDelConfirmation(false); handleDelete(isConfirmed);}}
        title="Delete current sheet?"
        text="Please note that ALL ATTENDANCE DATA of from today will be permanently deleted. Proceed to delete sheet?"
        cancelButtonText="Cancel"
        actionButtonText="Delete"
      />
      <NewSheetDialog  
        open={openCreateConfirmation} 
        onClose={() => setOpenCreateConfirmation(false)}
      />
    </Stack>
  );
}

export default SheetHeader;

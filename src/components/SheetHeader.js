import React, { useState } from 'react';
import { Stack, Card, TextField, Typography, Box, Button, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import ViewMembers from '../components/ViewMembers'
import { useParams } from 'react-router-dom';


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

function SheetHeader() {
  // const { username, bookId, bookName, sheetId, date } = useParams();
  const [selectedDate, setSelectedDate] = useState(dates[0].date); //set default value as most recent date

  const handleChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <Stack sx={{padding: '1rem', maxWidth: '1000px', margin: '0 auto'}}>
      <Stack direction="row" justifyContent="space-between" sx={{margin: '1rem 0'}}>
        <Typography variant="h4">Book name</Typography>
        <FormControl>
          <InputLabel id="demo-simple-select-label">Date</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedDate}
            label="Date"
            onChange={handleChange}
          >
            {dates.map((date) => <MenuItem value={date.date} key={date.date}>{date.date}</MenuItem>)}
          </Select>
        </FormControl>
      </Stack>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={4}><ViewMembers /></Grid>
        <Grid item sm={3} xs={4}><Button variant="contained" sx={{height: '100%', width: '100%'}}>Delete Today's Sheet</Button></Grid>
        <Grid item sm={3} xs={4}><Button variant="contained" sx={{height: '100%', width: '100%'}}>Create Today's Sheet</Button></Grid>
      </Grid>
    </Stack>
  );
}

export default SheetHeader;

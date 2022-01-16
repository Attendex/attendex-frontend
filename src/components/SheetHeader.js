import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Stack, Typography, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { getToken } from '../utils/utils';
import { FullWidthHeightButton } from '../styles/styledComponents';
import ConfirmationDialog from './ConfirmationDialog';
import NewSheetDialog from './NewSheetDialog';
import ViewMembers from '../components/ViewMembers';
import { alertSeverity } from './AlertFeedback';
import AlertFeedback from './AlertFeedback';

function SheetHeader(props) {
  const { withDateSelector } = props;
  
  const navigate = useNavigate();
  const { username, bookId, bookName, sheetId, date } = useParams();

  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(''); //set default value as most recent date
  const [openDelConfirmation, setOpenDelConfirmation] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [openCreateConfirmation, setOpenCreateConfirmation] = useState(false);

  useEffect(() => {
    fetchDates();
  }, [sheetId]);

  const fetchDates = () => {
    const token = getToken();
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/getdate?bookid=${bookId}`,
      { 
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(res => {
        const dates = res.data;
        setSelectedDate(date);
        setDates(dates);
      })
      .catch((error) => { 
        if (error.response.status === 401) {
          navigate('/signin');
        }
      });
  };

  const handleSelectDate = (event) => {
    const dateStr = event.target.value;
    setSelectedDate(dateStr);
    dates.forEach((date) => {
      if (date.date === dateStr) {
        navigate(`/${username}/${bookName}/${bookId}/${dateStr}/${date.sheetID}`);
      }
    })
  };

  const handleDelConfirmClose = (isConfirmed) => {
    setOpenDelConfirmation(false); 
    handleDeleteSheet(isConfirmed);
  };

  const handleDeleteSheet = (isConfirmed) => {
    if (isConfirmed) {
      // Send API call to delete selectedDate with sheetID
      const token = getToken();
      console.log('sheetid', sheetId)
      axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deletesheet`,
        { headers: {"Authorization" : `Bearer ${token}`}, data: { "sheetid": sheetId }})
        .then(res => {
          setSuccessMsg("Sheet successfully deleted!");
          navigate(`/${username}/${bookName}/${bookId}`)
        }).catch((error) => { 
          if (error.response.status === 401) {
            navigate('/signin');
          }
      })
    }
  }

  const renderDateSelector = () => {
    if (withDateSelector) {
      return (
        <Select
          value={selectedDate}
          label="Date"
          onChange={handleSelectDate}
        >
          {dates.map((date) => (
            <MenuItem 
              value={date.date} 
              key={date.date}
            >
              {date.date}
            </MenuItem>
          ))}
        </Select> 
      );
    } else {
      return null;
    }
  };

  return (
    <SheetHeaderStack>
      <AlertFeedback msg={successMsg} severity={alertSeverity.SUCCESS} onClose={() => setSuccessMsg(null)} />
      <InnerStack direction="row" justifyContent="space-between" >
        <Typography variant="h4">{bookName}</Typography>
        <FormControl>
          <InputLabel>Date</InputLabel>
          {renderDateSelector()}
        </FormControl>
      </InnerStack>
      <Grid container spacing={1}>
        <Grid item sm={6} xs={4}><ViewMembers /></Grid>
        <Grid item sm={3} xs={4}>
          <FullWidthHeightButton 
            variant="contained" 
            onClick={() => setOpenDelConfirmation(true)} 
            disabled={!withDateSelector}
          >
            Delete Current Sheet
          </FullWidthHeightButton>
        </Grid>
        <Grid item sm={3} xs={4}>
          <FullWidthHeightButton 
            variant="contained" 
            onClick={() => setOpenCreateConfirmation(true)}
          >
            Create New Sheet
          </FullWidthHeightButton>
        </Grid>
      </Grid>
      <ConfirmationDialog 
        open={openDelConfirmation} 
        onClose={(isConfirmed) => handleDelConfirmClose(isConfirmed)}
        title="Delete current sheet?"
        text="Please note that ALL ATTENDANCE DATA of from today will be permanently deleted. Proceed to delete sheet?"
        cancelButtonText="Cancel"
        actionButtonText="Delete"
      />
      <NewSheetDialog  
        open={openCreateConfirmation} 
        onClose={() => setOpenCreateConfirmation(false)}
      />
    </SheetHeaderStack>
  );
}

const SheetHeaderStack = styled(Stack)({
  padding: '1rem', 
  maxWidth: '1000px', 
  margin: '0 auto'
});

const InnerStack = styled(Stack)({
  margin: '1rem 0',
});

export default SheetHeader;

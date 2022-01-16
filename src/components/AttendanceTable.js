import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { update } from '../store/membersSlice';
import { Box, Checkbox } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getToken } from '../utils/utils';
import axios from 'axios';

// URL path would be /:username/:bookId/:bookName/:sheetId/:date

function AttendanceTable(props) {
  const navigate = useNavigate();
  const members = useSelector((state) => state.members.members);
  const { emptyTable } = props;
  const theme = useTheme();
  const [memberAtts, setMemberAtts] = useState([]);
  const { username, bookId, bookName, sheetId, date } = useParams();

  useEffect(() => {
    if (!emptyTable) {
      fetchMemberAtts();
    }
  }, [members, sheetId]);

  const fetchMemberAtts = () => {
    console.log('fetching member atts');
    // Fetch member attendances for this date
    const token = getToken();
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/getsheet?sheetid=${sheetId}`,
    { headers: {"Authorization" : `Bearer ${token}`}})
    .then(res => {
      const fetchedMemberAtts = res.data;
      setMemberAtts(fetchedMemberAtts);
    }).catch((error) => { 
      if (error.response.status === 401) {
        navigate('/signin');
      }
    });
  };

  const updateAtt = (event, key) => {
    const newMemberAtts = [...memberAtts] // creating a shallow copy of array to trigger change in state
    newMemberAtts[key].attended = event.target.checked ? 1 : 0;
    setMemberAtts(newMemberAtts);
    const member = memberAtts[key];
    const memberId = member.memberID;
    const attended = event.target.checked ? 1 : 0;
    const token = getToken();
    axios.put(`${process.env.REACT_APP_BACKEND_URL}/updatememberattendance`, 
      { 
        "memberid": memberId,
        "attended": attended,
        "sheetid": sheetId,
      },
      { headers: {"Authorization" : `Bearer ${token}`}}
    ).then(res => {
      fetchMemberAtts();
    }).catch((error) => { 
      if (error.response.status === 401) {
        navigate('/signin');
      }
    });
  }

  return (
    <Box sx={{ maxWidth: '1000px', padding: '1rem', margin: '0 auto' }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{
                backgroundColor: theme.palette.primary.main,
                color: 'white',
            }}>
              <TableCell sx={{color: 'white', fontWeight: 'bold', borderRight: '1px solid white'}}>Name</TableCell>
              <TableCell sx={{color: 'white', fontWeight: 'bold'}} align="center">Attended</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emptyTable || memberAtts.length === 0 ? <TableRow><TableCell align="center" colSpan={2}>Add members or create new sheet to begin :)</TableCell></TableRow>
            : memberAtts.map((memberAtt, index) => (
              <TableRow
                key={index}
                sx={{ 
                  '&:last-child td, &:last-child th': { borderBottom: 0,},
                  '&:nth-of-type(odd)': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <TableCell component="th" scope="row" sx={{borderRight: '1px solid grey'}}>
                  {memberAtt.memberName}
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={!!memberAtts[index].attended}
                    onChange={(event) => updateAtt(event, index)}
                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AttendanceTable;

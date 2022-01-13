import { Box, Checkbox } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

// URL path would be /:username/:bookId/:bookName/:sheetId/:date

function AttendanceTable() {
  const theme = useTheme();
  const [memberAttendances, setMemberAttendances] = useState([
    {
      "memberName": "ryan",
      "memberID": 1,
      "attended": 0
    },
    {
      "memberName": "siqi",
      "memberID": 2,
      "attended": 0
    }
  ]);
  // const { username, bookId, bookName, sheetId, date } = useParams();

  const onChange = (event, key) => {
    const newMemberAttendances = [...memberAttendances] // creating a shallow copy of array to trigger change in state
    newMemberAttendances[key].attended = event.target.checked ? 1 : 0;
    setMemberAttendances(newMemberAttendances);
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
            {memberAttendances.map((memberAttendance, index) => (
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
                  {memberAttendance.memberName}
                </TableCell>
                <TableCell align="center">
                  <Checkbox
                    checked={!!memberAttendances[index].attended}
                    onChange={(event) => onChange(event, index)}
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

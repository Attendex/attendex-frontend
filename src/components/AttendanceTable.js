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

const memberAttendances = [
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
];

function AttendanceTable() {
  const theme = useTheme();
  // const { username, bookId, bookName, sheetId, date } = useParams();

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
            {memberAttendances.map((memberAttendance) => (
              <TableRow
                key={memberAttendance.memberID}
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
                    defaultChecked
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

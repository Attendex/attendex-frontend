import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { Box, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { getToken } from '../utils/utils';

// URL path would be /:username/:bookId/:bookName/:sheetId/:date

function AttendanceTable(props) {
  const { emptyTable } = props;
  
  const navigate = useNavigate();
  const theme = useTheme();
  const { sheetId } = useParams();
  const members = useSelector((state) => state.members.members); // fetch members from redux store
  
  const [memberAtts, setMemberAtts] = useState([]);

  useEffect(() => {
    if (!emptyTable) {
      fetchMemberAtts();
    }
  }, [members, sheetId]); // if members updated, fetch member attendances

  const fetchMemberAtts = () => {
    const token = getToken();
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/getsheet?sheetid=${sheetId}`,
      { 
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      })
      .then(res => {
        const fetchedMemberAtts = res.data;
        setMemberAtts(fetchedMemberAtts);
      })
      .catch((error) => { 
        if (error.response.status === 401) {
          navigate('/signin');
        }
      });
  };

  const handleUpdateMemberAtt = (event, key) => {
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
      { 
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      })
      .then(res => {
        fetchMemberAtts();
      })
      .catch((error) => { 
        if (error.response.status === 401) {
          navigate('/signin');
        }
      });
  }

  const renderMemberAttRows = () => {
    if (emptyTable || memberAtts.length === 0) {
      return (
        <TableRow>
          <TableCell align="center" colSpan={2}>Add members or create new sheet to begin :)</TableCell>
        </TableRow>
      );
    }
    return memberAtts.map((memberAtt, index) => {
      return (
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
              onChange={(event) => handleUpdateMemberAtt(event, index)}
              sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
            />
          </TableCell>
        </TableRow>
      )
    });
  };

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
            {renderMemberAttRows()}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AttendanceTable;

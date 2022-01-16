import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
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
        <MemberAttTableRow key={index}>
          <MemberAttTableCell>{memberAtt.memberName}</MemberAttTableCell>
          <TableCell align="center">
            <MemberAttCheckbox
              checked={!!memberAtts[index].attended}
              onChange={(event) => handleUpdateMemberAtt(event, index)}
            />
          </TableCell>
        </MemberAttTableRow>
      )
    });
  };

  return (
    <AttTableBox>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <AttTableHeaderTableRow>
              <HeaderLeftTableCell>Name</HeaderLeftTableCell>
              <HeaderRightTableCell align="center">Attended</HeaderRightTableCell>
            </AttTableHeaderTableRow>
          </TableHead>
          <TableBody>{renderMemberAttRows()}</TableBody>
        </Table>
      </TableContainer>
    </AttTableBox>
  );
}

const MemberAttTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': { 
    borderBottom: 0,
  },
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const MemberAttTableCell = styled(TableCell)({
  borderRight: '1px solid grey',
});

const MemberAttCheckbox = styled(Checkbox)({
  '& .MuiSvgIcon-root': { 
    fontSize: 28 
  },
});

const AttTableBox = styled(Box)({
  maxWidth: '1000px', 
  padding: '1rem', 
  margin: '0 auto',
});

const AttTableHeaderTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
}));

const HeaderLeftTableCell = styled(TableCell)({
  color: 'white', 
  fontWeight: 'bold', 
  borderRight: '1px solid white'
});

const HeaderRightTableCell = styled(TableCell)({
  color: 'white', 
  fontWeight: 'bold', 
});

export default AttendanceTable;

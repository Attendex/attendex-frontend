import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Collapse, Alert, Stack, Box, Button, Chip, DialogContentText, DialogActions, DialogContent, DialogTitle, Dialog, TextField } from '@mui/material';
import { update } from '../store/membersSlice';
import { getToken } from '../utils/utils';
import ConfirmationDialog from './ConfirmationDialog';
import { alertSeverity } from './AlertFeedback';
import AlertFeedback from './AlertFeedback';

function MemberDialog(props) {
  const { onClose, open } = props;
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookId } = useParams();

  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [newMember, setNewMember] = useState('');
  const [memberIdToDelete, setMemberIdToDelete] = useState(null);
  const [members, setMembers] = useState([]);
  const [successMsg, setSuccessMsg] = useState(null);
  const [warnMsg, setWarnMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    getMembers();
  }, [bookId]);

  const getMembers = () => {
    const token = getToken();
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/getmember?bookid=${bookId}`,
      { headers: {"Authorization" : `Bearer ${token}`}})
      .then(res => {
        const members = [...res.data];
        console.log('fetched members', members);
        setMembers(members);
        dispatch(update(members));
      }).catch((error) => { 
        if (error.response.status === 401) {
          navigate('/signin');
        }
    })
  };

  const addMember = () => {
    if (newMember.length > 45) {
      setWarnMsg("Member names cannot be longer than 45 characters.");
    }
    const token = getToken();
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/addmember`,
      { "bookid": bookId, "name": newMember },
      { headers: {"Authorization" : `Bearer ${token}`}})
      .then(res => {
        setSuccessMsg("Member added successfully!");
        setNewMember('');
      }).catch((error) => { 
        if (error.response.status === 401) {
          navigate('/signin');
        } else if (error.response.status === 409) {
          setErrorMsg("Cannot add duplicate member names!");
        }
    });
    getMembers();
  };

  const handleDelete = (isConfirmed) => {
    if (isConfirmed) {
      const token = getToken();
      axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deletemember`,
        { headers: {"Authorization" : `Bearer ${token}`}, data: { "memberid": memberIdToDelete }})
        .then(res => {
          setSuccessMsg("Member deleted successfully!");
        }).catch((error) => { 
          if (error.response.status === 401) {
            navigate('/signin');
          }
      })
      setMemberIdToDelete(null);
      getMembers();
    } else {
      onClose();
    }
  };

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Members</DialogTitle>
      <DialogContent>
        <Stack direction="row">
          <TextField
            autoFocus
            fullWidth
            value={newMember}
            label="New member name"
            type="text"
            variant="standard"
            onChange={(event) => setNewMember(event.target.value)}
          />
          <Button onClick={addMember}>Add</Button>
        </Stack>
        <DialogContentText sx={{marginTop: '1rem'}}>Delete members</DialogContentText>
        {members.map((member) => (
          <Chip
            key={member.memberID}
            label={member.memberName}
            onDelete={() => {setOpenConfirmation(true); setMemberIdToDelete(member.memberID);}}
          />
        ))}
        <AlertFeedback msg={successMsg} severity={alertSeverity.SUCCESS} onClose={() => setSuccessMsg(null)} />
        <AlertFeedback msg={warnMsg} severity={alertSeverity.WARN} onClose={() => setWarnMsg(null)} />
        <AlertFeedback msg={errorMsg} severity={alertSeverity.ERROR} onClose={() => setErrorMsg(null)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Done</Button>
        <ConfirmationDialog 
          open={openConfirmation} 
          onClose={(isConfirmed) => { setOpenConfirmation(false); handleDelete(isConfirmed);}}
          title="Delete member data?"
          text="Please note that ALL ATTENDANCE DATA of deleted members will be permanently deleted. Proceed to delete member?"
          cancelButtonText="Cancel"
          actionButtonText="Delete"
        />
      </DialogActions>
    </Dialog>
  );
}

function ViewMembers() {
  // const { username, bookId, bookName, sheetId, date } = useParams();
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Button 
        variant="contained" 
        sx={{height: '100%', width: '100%'}}
        onClick={() => setOpen(true)}
      >View Members</Button>
      <MemberDialog
        open={open}
        onClose={() => setOpen(false)}
      />
    </Box>
  );
}

export default ViewMembers;

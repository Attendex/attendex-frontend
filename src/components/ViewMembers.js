import { Collapse, Alert, Stack, Box, Button, Chip, DialogContentText, DialogActions, DialogContent, DialogTitle, Dialog, TextField } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ConfirmationDialog from './ConfirmationDialog';
import axios from 'axios';
import { getToken } from '../utils/utils';


function MemberDialog(props) {
  const navigate = useNavigate();
  const { onClose, open } = props;
  const { username, bookId, bookName, sheetId, date } = useParams();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [newMember, setNewMember] = useState(null);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [tempCounter, setCounter] = useState(3);
  // Replace with payload from get all members from book
  const [members, setMembers] = useState([]);

  useEffect(() => {
    // Get dates and save into state
    const token = getToken();
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/getmember?bookid=${bookId}`,
      { headers: {"Authorization" : `Bearer ${token}`}})
      .then(res => {
        const members = res.data;
        setMembers(members);
      }).catch((error) => { 
        if (error.response.status === 401) {
          navigate('/signin');
        }
    })
  }, [bookId]);

  const handleSave = (isConfirmed) => {
    if (isConfirmed) {
      // TODO: call API to update member data
      onClose()
    } else {
      onClose()
    }
  };

  const addMember = () => {
    let newMembers = members;
    newMembers.push({"memberName": newMember, "memberID": tempCounter});
    setMembers(newMembers);
    setCounter(tempCounter+1);
    setNewMember('');
    // API call to add member
  };

  const handleDelete = (isConfirmed) => {
    if (isConfirmed) {
      setMembers((members) => members.filter((member) => member.memberID !== memberToDelete.memberID));
      // API call to delete member
      setMemberToDelete(null);
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
            onDelete={() => {setOpenConfirmation(true); setMemberToDelete(member);}}
          />
        ))}
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

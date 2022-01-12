import { Stack, Box, Button, Chip, DialogContentText, DialogActions, DialogContent, TextField } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

function ConfirmationDialog (props) {
  const { onClose, open } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        Save member data?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please note that ALL ATTENDANCE DATA of deleted members will be permanently deleted. Proceed to save member data?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>Disagree</Button>
        <Button onClick={() => onClose(true)} autoFocus>Agree</Button>
      </DialogActions>
    </Dialog>
  );
}

function MemberDialog(props) {
  const { onClose, open } = props;
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [newMember, setNewMember] = useState('');
  const [tempCounter, setCounter] = useState(3);
  // Replace with payload from get all members from book
  const [members, setMembers] = useState([
    {
      "memberName": "ryan",
      "memberID": 1
    },
    {
      "memberName": "siqi",
      "memberID": 2
    }
  ]);

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
  };

  const handleDelete = (memberToDelete) => () => {
    setMembers((members) => members.filter((member) => member.memberID !== memberToDelete.memberID));
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
            onDelete={handleDelete(member)}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => setOpenConfirmation(true)}>Save</Button>
        <ConfirmationDialog open={openConfirmation} onClose={(isConfirmed) => { setOpenConfirmation(false); handleSave(isConfirmed) }} />
      </DialogActions>
    </Dialog>
  );
}

function ViewMembers() {
  // const { username, bookId, bookName, sheetId, date } = useParams();
  const [open, setOpen] = useState(false);
  console.log('open', open)
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

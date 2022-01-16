import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { styled } from '@mui/system';
import { Stack, Box, Button, Chip, DialogContentText, DialogActions, DialogContent, DialogTitle, Dialog, TextField } from '@mui/material';
import { update } from '../store/membersSlice';
import { getToken } from '../utils/utils';
import ConfirmationDialog from './ConfirmationDialog';
import { alertSeverity } from './AlertFeedback';
import AlertFeedback from './AlertFeedback';

function ViewMembers() {
  const [openMemberDialog, setOpenMemberDialog] = useState(false);

  const handleOpenMemberDialog = () => setOpenMemberDialog(true);
  const handleCloseMemberDialog = () => setOpenMemberDialog(false);

  return (
    <Box>
      <FullWidthHeightButton 
        variant="contained" 
        onClick={handleOpenMemberDialog}
      >
        View Members
      </FullWidthHeightButton>
      <MemberDialog
        open={openMemberDialog}
        onClose={handleCloseMemberDialog}
      />
    </Box>
  );
}

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
    fetchMembers();
  }, [bookId]);

  const fetchMembers = () => {
    const token = getToken();
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/getmember?bookid=${bookId}`,
      { 
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(res => {
        const members = [...res.data];
        console.log('fetched members', members);
        setMembers(members);
        dispatch(update(members));
      })
      .catch((error) => { 
        if (error.response.status === 401) {
          navigate('/signin');
        }
      });
  };

  const handleAddMember = () => {
    if (newMember.length > 45) {
      setWarnMsg("Member names cannot be longer than 45 characters.");
    }
    const token = getToken();
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/addmember`,
      { 
        "bookid": bookId,
        "name": newMember, 
      },
      { 
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      .then(res => {
        setSuccessMsg("Member added successfully!");
        setNewMember('');
      })
      .catch((error) => { 
        if (error.response.status === 401) {
          navigate('/signin');
        } else if (error.response.status === 409) {
          setErrorMsg("Cannot add duplicate member names!");
        }
      });
    fetchMembers();
  };

  const handleDeleteChipClick = (member) => {
    console.log('member.id', member)
    setOpenConfirmation(true);
    setMemberIdToDelete(member.memberID);
  };

  const handleDelConfirmClose = (isConfirmed) => {
    setOpenConfirmation(false); 
    handleDeleteMember(isConfirmed);
  };

  const handleDeleteMember = (isConfirmed) => {
    if (isConfirmed) {
      const token = getToken();
      axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deletemember`,
        { 
          headers: {
            "Authorization": `Bearer ${token}`
          }, 
          data: { 
            "memberid": memberIdToDelete 
          }
        })
        .then(res => {
          setSuccessMsg("Member deleted successfully!");
        })
        .catch((error) => { 
          if (error.response.status === 401) {
            navigate('/signin');
          }
        });
      setMemberIdToDelete(null);
      fetchMembers();
    } else {
      onClose();
    }
  };

  const renderMemberChips = () => {
    return members.map((member) => (
      <Chip
        key={member.memberID}
        label={member.memberName}
        onDelete={() => handleDeleteChipClick(member)}
      />
    ));
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
          <Button onClick={handleAddMember}>Add</Button>
        </Stack>
        <TopSpacedDialogContentText>Delete members</TopSpacedDialogContentText>
        {renderMemberChips()}
        <AlertFeedback msg={successMsg} severity={alertSeverity.SUCCESS} onClose={() => setSuccessMsg(null)} />
        <AlertFeedback msg={warnMsg} severity={alertSeverity.WARN} onClose={() => setWarnMsg(null)} />
        <AlertFeedback msg={errorMsg} severity={alertSeverity.ERROR} onClose={() => setErrorMsg(null)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Done</Button>
        <ConfirmationDialog 
          open={openConfirmation} 
          onClose={(isConfirmed) => handleDelConfirmClose(isConfirmed)}
          title="Delete member data?"
          text="Please note that ALL ATTENDANCE DATA of deleted members will be permanently deleted. Proceed to delete member?"
          cancelButtonText="Cancel"
          actionButtonText="Delete"
        />
      </DialogActions>
    </Dialog>
  );
}

const FullWidthHeightButton = styled(Button)({
  height: '100%', 
  width: '100%'
});

const TopSpacedDialogContentText = styled(DialogContentText)({
  marginTop: '1rem',
});

export default ViewMembers;

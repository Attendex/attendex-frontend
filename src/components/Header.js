import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { Typography, Box, Stack, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { getToken } from '../utils/utils';
import ConfirmationDialog from './ConfirmationDialog';

function Header(props) {
  const { username } = props;
  
  const navigate = useNavigate();
  
  const [userAnchorEl, setUserAnchorEl] = useState(null);
  const openUserMenu = Boolean(userAnchorEl);
  const [openDelConfirm, setOpenDelConfirm] = useState(false);

  const handleUserClick = (event) => {
    setUserAnchorEl(event.currentTarget);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate(`/signin`);
  };

  const handleDelConfirmClose = (isConfirmed) => {
    setOpenDelConfirm(false); 
    handleDeleteAccount(isConfirmed);
  };

  const handleDeleteAccount = (isConfirmed) => {
    if (isConfirmed) {
      const token = getToken();
      axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deleteaccount`,
        { 
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        .then(res => {
          navigate('/signin');
        })
        .catch((error) => { 
          if (error.response.status === 401) {
            navigate('/signin');
          }
        });
    }
    setUserAnchorEl(null);
  };

  return (
    <HeaderBox>
      <OuterStack 
        direction="row" 
        alignItems="center" 
        justifyContent="space-between" 
      >
        <Typography variant="p">{username}</Typography>
        <Stack direction="row" spacing={2}>
          <HomeIcon color="action" onClick={() => navigate(`/${username}`)}/>
          <ManageAccountsIcon color="action" onClick={handleUserClick}/>
          <Menu
            anchorEl={userAnchorEl}
            open={openUserMenu}
            onClose={() => setUserAnchorEl(null)}
          >
            <MenuItem onClick={handleSignOut}>
              <ListItemIcon><LogoutIcon color="action" /></ListItemIcon>
              <ListItemText>Sign Out</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => setOpenDelConfirm(true)}>
              <ListItemIcon><DeleteIcon color="action" /></ListItemIcon>
              <ListItemText>Delete account</ListItemText>
            </MenuItem>
          </Menu>
          <ConfirmationDialog 
            open={openDelConfirm} 
            onClose={(isConfirmed) => handleDelConfirmClose(isConfirmed)}
            title="Delete account"
            text="Please note that ALL ATTENDANCE DATA of books in this account will be permanently deleted. Proceed to delete account?"
            cancelButtonText="Cancel"
            actionButtonText="Delete"
          />
        </Stack>
      </OuterStack>
    </HeaderBox>
  );
}

const HeaderBox = styled(Box)({
  padding: '1rem', 
  boxShadow: '2px 2px 2px grey',
});

const OuterStack = styled(Stack)({
  maxWidth: '1000px',
  margin: '0 auto',
});


export default Header;

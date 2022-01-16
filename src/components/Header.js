import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Stack, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmationDialog from './ConfirmationDialog';
import { getToken } from '../utils/utils';
import axios from 'axios';

function Header(props) {
  const navigate = useNavigate();
  const { username } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);
  const [openDelConfirmation, setOpenDelConfirmation] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate(`/signin`);
  };

  const handleDeleteAccount = (isConfirmed) => {
    if (isConfirmed) {
      // Send API call to delete member
      const token = getToken();
      axios.delete(`${process.env.REACT_APP_BACKEND_URL}/deleteaccount`,
        { headers: {"Authorization" : `Bearer ${token}`}})
        .then(res => {
          console.log('delete account success')
          navigate('/signin');
        }).catch((error) => { 
          if (error.response.status === 401) {
            navigate('/signin');
          }
      })
    }
    setAnchorEl(null);
  };

  return (
    <Box sx={{ 
      padding: '1rem', 
      boxShadow: '2px 2px 2px grey'
    }}>
      <Stack 
        direction="row" 
        alignItems="center" 
        justifyContent="space-between" 
        sx={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}
      >
        <Typography variant="p">{username}</Typography>
        <ManageAccountsIcon color="action" onClick={handleClick}/>
        {/* <Button variant="contained" color="secondary" onClick={handleSignOut}>Sign Out</Button> */}
        <Menu
          anchorEl={anchorEl}
          open={openUserMenu}
          onClose={() => setAnchorEl(null)}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleSignOut}>
            <ListItemIcon><DeleteIcon color="action" /></ListItemIcon>
            <ListItemText>Sign Out</ListItemText>
          </MenuItem>
          <MenuItem onClick={() => {setOpenDelConfirmation(true);}}>
            <ListItemIcon><DeleteIcon color="action" /></ListItemIcon>
            <ListItemText>Delete account</ListItemText>
          </MenuItem>
        </Menu>
        <ConfirmationDialog 
          open={openDelConfirmation} 
          onClose={(isConfirmed) => { setOpenDelConfirmation(false); handleDeleteAccount(isConfirmed);}}
          title="Delete account"
          text="Please note that ALL ATTENDANCE DATA of books in this account will be permanently deleted. Proceed to delete account?"
          cancelButtonText="Cancel"
          actionButtonText="Delete"
        />
      </Stack>
    </Box>
  );
}

export default Header;

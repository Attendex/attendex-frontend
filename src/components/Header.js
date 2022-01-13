import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button, Stack } from '@mui/material';

function Header(props) {
  const navigate = useNavigate();
  const { username } = props;

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate(`/signin`);
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
        <Button variant="contained" color="secondary" onClick={handleSignOut}>Sign Out</Button>
      </Stack>
    </Box>
  );
}

export default Header;

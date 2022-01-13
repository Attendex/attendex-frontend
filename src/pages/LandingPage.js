import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import jwt_decode from 'jwt-decode';
import { getToken } from '../utils/utils';

// URL path would be /

function LandingPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get token from localStorage
    const token = getToken();
    
    // if token not found, redirect to /signin
    if (token === null) {
      navigate(`/signin`);
    } else {
      // if token found, get username from token and redirect to /:username
      const decoded = jwt_decode(token);
      navigate(`/${decoded.userid}`);
    }
  });

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
      <CircularProgress />
    </Box>
  );
}

export default LandingPage;

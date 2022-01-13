import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import jwt_decode from 'jwt-decode';

// URL path would be /

function LandingPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get token from localStorage
    const token = window.localStorage.getItem("token");
    // if token not found, redirect to /signin
    if (token === null || token === undefined) {
      navigate(`/signin`);
    } else {
      // if token found, get username from token and redirect to /:username
      const decoded = jwt_decode(token);
      navigate(`/${decoded.userid}`);
    }
  }); // only rerun if things in the square bracket changes

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
      <CircularProgress />
    </Box>
  );
}

export default LandingPage;

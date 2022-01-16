import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { getToken } from '../utils/utils';

// URL path would be /

function LandingPage() {
  const navigate = useNavigate();
  
  useEffect(() => {
    authenticate();
  });

  const authenticate = () => {
    const token = getToken();
    if (token === null) {
      navigate(`/signin`);
    } else {
      const decoded = jwt_decode(token);
      navigate(`/${decoded.userid}`);
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', height: '100vh', alignItems: 'center' }}>
      <CircularProgress />
    </Box>
  );
}

export default LandingPage;

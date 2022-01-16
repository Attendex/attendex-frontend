import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, TextField, Typography, Box, Button } from '@mui/material';
import { storeToken } from '../utils/utils';
import { alertSeverity } from '../components/AlertFeedback';
import AlertFeedback from '../components/AlertFeedback';

function SignInPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSignIn = () => {
    // Make API call to sign in, returns jwt token
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`,
      {
        "userid": username, 
        "password": password,
      })
      .then(res => {
        storeToken(res.data.accessToken);  // Store jwt token in localStorage as token with expiry of 30mins
        const decoded = jwt_decode(res.data.accessToken);
        navigate(`/${decoded.userid}`);
      })
      .catch((error) => { 
        if (error.response.status === 403) {
          setErrorMsg("Invalid username or password! Please try again.");
        }
      });
  };

  return (
    <Box sx={{ height: '100vh', padding: '1rem' }}>
      <Box sx={{ position: 'relative', top: '20%' }}>
        <Card
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '0 auto',
            padding: '1rem',
            borderRadius: '10px',
            maxWidth: '600px',
            background: 'white',
          }}
        >
          <Typography variant="h3" sx={{ color: 'grey' }}>
            Sign In
          </Typography>
          <TextField 
            label="Username" 
            variant="outlined" 
            margin="normal" 
            sx={{ width: '90%' }}
            onChange={(event) => setUsername(event.target.value)} 
          />
          <TextField 
            label="Password" 
            type="password" 
            margin="normal" 
            sx={{width: '90%'}}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button variant="contained" onClick={handleSignIn}>Sign In</Button>
          <AlertFeedback msg={errorMsg} severity={alertSeverity.ERROR} onClose={() => setErrorMsg(null)} />
        </Card>
        <Button variant="none" sx={{ margin:'1rem' }} href="/signup">Don't have an account? Sign up here</Button>
      </Box>
    </Box>
  );
}

export default SignInPage;

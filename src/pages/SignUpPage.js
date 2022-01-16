import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Collapse, Card, TextField, Typography, Box, Button } from '@mui/material';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { storeToken } from '../utils/utils';

function SignUpPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [warnMsg, setWarnMsg] = useState(null);

  const handleSignUp = () => {
    // Make API call to sign up 
    if (username.length > 25 || password.length > 25) {
      setWarnMsg("Username and password length cannot be more than 25 characters!");
    } else {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`,
      {
        "userid": username, 
        "password": password,
      }).then(res => {
        storeToken(res.data.accessToken); // Store jwt token into localStorage as token with expiry of 30mins
        const decoded = jwt_decode(res.data.accessToken);
        navigate(`/${decoded.userid}`);
      })
    }
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
            Sign Up
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
            sx={{ width: '90%' }} 
            onChange={(event) => setPassword(event.target.value)}
          />
          <TextField 
            label="Confirm Password" 
            type="password" 
            margin="normal" 
            sx={{width: '90%'}} 
            error={password !== confirmPassword} 
            onChange={(event) => setConfirmPassword(event.target.value)} 
          />
          <Button variant="contained" onClick={handleSignUp}>Sign Up</Button>
          <Collapse in={!!warnMsg} sx={{marginTop: '1rem'}}>
            <Alert severity="warning" onClose={() => {setWarnMsg(null);}}>{warnMsg}</Alert>
          </Collapse>
        </Card>
        <Button variant="none" sx={ {margin:'1rem' }} href="/signin">Already have an account? Sign in here</Button>
      </Box>
    </Box>
  );
}

export default SignUpPage;

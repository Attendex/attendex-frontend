import { useState } from 'react';
import { Card, TextField, Typography, Box, Button } from '@mui/material';
import axios from 'axios';

function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Make API call to sign up {"userid": username, "password": password}
    axios.post(`http://localhost:3000/signup`,
      {
        "userid": username, 
        "password": password,
      }).then(res => {
        console.log('res.accessToken', res.accessToken)
        window.localStorage.setItem("token", res.accessToken);
      })
    // Store jwt token into localStorage as token with expiry of 30mins
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
        </Card>
        <Button variant="none" sx={ {margin:'1rem' }} href="/signin">Already have an account? Sign in here</Button>
      </Box>
    </Box>
  );
}

export default SignUpPage;

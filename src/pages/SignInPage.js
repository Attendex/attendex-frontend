import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthOuterBox, AuthInnerBox, AuthCard, GreyTypography, AuthTextField, AuthAltButton } from '../styles/styledComponents';
import { Button } from '@mui/material';
import { storeToken } from '../utils/utils';
import { alertSeverity } from '../components/AlertFeedback';
import AlertFeedback from '../components/AlertFeedback';

function SignInPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSignIn = () => {
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
    <AuthOuterBox>
      <AuthInnerBox>
        <AuthCard elevation={3}>
          <GreyTypography variant="h3">Sign In</GreyTypography>
          <AuthTextField 
            label="Username" 
            variant="outlined" 
            margin="normal" 
            onChange={(event) => setUsername(event.target.value)} 
          />
          <AuthTextField 
            label="Password" 
            type="password" 
            margin="normal" 
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button variant="contained" onClick={handleSignIn}>Sign In</Button>
          <AlertFeedback msg={errorMsg} severity={alertSeverity.ERROR} onClose={() => setErrorMsg(null)} />
        </AuthCard>
        <AuthAltButton variant="none" href="/signup">Don't have an account? Sign up here</AuthAltButton>
      </AuthInnerBox>
    </AuthOuterBox>
  );
}

export default SignInPage;

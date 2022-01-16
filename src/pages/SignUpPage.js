import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { storeToken } from '../utils/utils';
import { AuthOuterBox, AuthInnerBox, AuthCard, GreyTypography, AuthTextField, AuthAltButton } from '../styles/styledComponents';
import { alertSeverity } from '../components/AlertFeedback';
import AlertFeedback from '../components/AlertFeedback';

function SignUpPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [warnMsg, setWarnMsg] = useState(null);

  const handleSignUp = () => {
    if (username.length > 25 || password.length > 25) {
      setWarnMsg("Username and password length cannot be more than 25 characters!");
    } else {
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`,
      {
        "userid": username, 
        "password": password,
      })
      .then(res => {
        storeToken(res.data.accessToken); // Store jwt token into localStorage as token with expiry of 30mins
        const decoded = jwt_decode(res.data.accessToken);
        navigate(`/${decoded.userid}`);
      })
    }
  };

  return (
    <AuthOuterBox>
      <AuthInnerBox>
        <AuthCard elevation={3}>
          <GreyTypography variant="h3">Sign Up</GreyTypography>
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
          <AuthTextField 
            label="Confirm Password" 
            type="password" 
            margin="normal" 
            error={password !== confirmPassword} 
            onChange={(event) => setConfirmPassword(event.target.value)} 
          />
          <Button variant="contained" onClick={handleSignUp}>Sign Up</Button>
          <AlertFeedback msg={warnMsg} severity={alertSeverity.WARN} onClose={() => setWarnMsg(null)} />
        </AuthCard>
        <AuthAltButton variant="none" href="/signin">Already have an account? Sign in here</AuthAltButton>
      </AuthInnerBox>
    </AuthOuterBox>
  );
}

export default SignUpPage;

import { Card, TextField, Typography, Box, Button } from '@mui/material';


function SignInPage() {
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
          <TextField label="Username" variant="outlined" margin="normal" sx={{width: '90%'}}/>
          <TextField label="Password" type="password" margin="normal" sx={{width: '90%'}}/>
          <Button variant="contained">Sign In</Button>
        </Card>
        <Button variant="none" sx={ {margin:'1rem' }} href="/signup">Don't have an account? Sign up here</Button>
      </Box>
    </Box>
  );
}

export default SignInPage;

import { Card, TextField, Typography, Box, Button } from '@mui/material';


function SignInPage() {
  return (
    <Box sx={{ 
      height: '100vh',
      padding: '1rem'
    }}>
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
          position: 'relative',
          top: '20%',
        }}
      >
        <Typography variant="h3" sx={{color: 'grey'}}>
          Sign In
        </Typography>
        <TextField label="Username" variant="outlined" margin="normal" sx={{width: '90%'}}/>
        <TextField label="Password" type="password" margin="normal" sx={{width: '90%'}}/>
        <Button variant="contained">Sign In</Button>
      </Card>
    </Box>
  );
}

export default SignInPage;

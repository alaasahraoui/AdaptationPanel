import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Container, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

const LoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const handleSubmit = (event) => { 
    navigate('/MainPage'); // Navigate to the dashboard page 
    //TODO later ... 
    event.preventDefault();
    if (onLogin) {
      onLogin(credentials.username, credentials.password);
    }
  };

  const handleSignUpClick = () => {
    // Navigate to the sign-up page or component
    navigate('/signup');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form onSubmit={handleSubmit} style={{ marginTop: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={credentials.username}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ margin: '24px 0px 16px' }}
          >
              
             Sign In 
          </Button>
          {/* Add a Button or Link for Sign Up */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={handleSignUpClick}>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;

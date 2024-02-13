// NavBar.js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          this is a nav bar 
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

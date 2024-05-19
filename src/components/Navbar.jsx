// Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar, Toolbar, IconButton, Typography, Box, Button, Menu, MenuItem
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  // Handle Menu Open/Close
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar sx={{ background: '#1976d2' }}> {/* ปรับพื้นหลังของ AppBar */}
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Orders Manager
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button color="inherit" component={Link} to="/">Pending</Button>
          <Button color="inherit" component={Link} to="/orders">All</Button>
        </Box>
      </Toolbar>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={Link} to="/">Pending</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/orders">All</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;

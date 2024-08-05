import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const drawerWidth = 240;

const Sidebar = ({ children }) => {
  const [open, setOpen] = useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <div style={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        style={{ width: open ? `calc(100% - ${drawerWidth}px)` : '100%', transition: 'width 0.3s' }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            style={{ marginRight: 36 }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          {/* <Typography variant="h6" noWrap>
            My Application
          </Typography> */}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        style={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <div>
          <IconButton onClick={handleDrawerToggle}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem component={Link} to="/home">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component={Link} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
          {/* Thêm các mục khác ở đây */}
        </List>
      </Drawer>

      <main style={{ flexGrow: 1, padding: '16px', marginLeft: open ? drawerWidth : 0, transition: 'margin 0.3s' }}>
        {children}
      </main>
    </div>
  );
};

export default Sidebar;

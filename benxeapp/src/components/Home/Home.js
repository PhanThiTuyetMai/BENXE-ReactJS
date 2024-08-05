import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import MyContext from '../../configs/MyContext';

const Home = () => {
    const [state] = useContext(MyContext)
    const [drawerOpen, setDrawerOpen] = useState(false);

    const {user} = state;

    const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
    }
    setDrawerOpen(open);
    };

    const menuItems = (
    <div role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
        <List>
            <ListItem button component={Link} to="/">
                <ListItemText primary="Trang Chủ" />
            </ListItem>
            <ListItem button component={Link} to="/login">
                <ListItemText primary="Đăng Nhập" />
            </ListItem>
            <ListItem button component={Link} to="/nhanvien">
                <ListItemText primary="Nhân Viên" />
            </ListItem>
        </List>
    </div>
    );

    return (
    <div>
        <AppBar position="static">
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
            Trang Chủ
            </Typography>
            <Button color="inherit" component={Link} to="/login">
            Đăng Nhập
            </Button>
        </Toolbar>
        </AppBar>

        {/* Menu điều hướng */}
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {menuItems}
        </Drawer>

        {/* Nội dung chính của trang */}
        <div style={{ padding: '20px' }}>
        <Typography variant="h3" align="center" gutterBottom>
            Chào Mừng Đến Với Trang Chủ
        </Typography>
        <Typography variant="h6" align="center">
            Đây là nơi bạn có thể tìm thấy thông tin quan trọng và các dịch vụ mà chúng tôi cung cấp.
        </Typography>
        <Typography>
            Chào Mừng Bạn {user?.first_name || 'Khách'}
        </Typography>
        </div>
    </div>
    );
    };

    export default Home;

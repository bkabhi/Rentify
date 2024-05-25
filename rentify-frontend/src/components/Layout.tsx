import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC<any> = ({ children }) => {
    const navigate = useNavigate();
    const { logout, user, isAuthenticated } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1, textDecoration: 'none' }} color="inherit" component={Link} to="/">
                        Rentify
                    </Typography>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    {
                        user?.isSeller &&
                        <Button color="inherit" component={Link} to="/post-property">Post Property</Button>
                    }
                    {
                        isAuthenticated ? <Button color="inherit" onClick={handleLogout}>Logout</Button>
                            : <Button color="inherit" onClick={handleLogout}>Login</Button>
                    }
                </Toolbar>
            </AppBar>
            <Container>
                {children}
            </Container>
        </>
    );
};

export default Layout;

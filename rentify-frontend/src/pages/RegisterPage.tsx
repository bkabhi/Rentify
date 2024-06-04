import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, FormControlLabel, Checkbox, CircularProgress, InputAdornment, IconButton } from '@mui/material';
import { registerUser } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', isSeller: false });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const validateForm = (name: string, value: string) => {
        const newErrors = { ...errors };

        switch (name) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                newErrors.email = !value.match(emailRegex) ? 'Please enter a valid email address' : '';
                break;
            case 'phone':
                const phoneRegex = /^\d{10}$/;
                newErrors.phone = !value.match(phoneRegex) ? 'Please enter a 10-digit phone number' : '';
                break;
            case 'password':
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
                newErrors.password = !value.match(passwordRegex)
                    ? 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character'
                    : '';
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
        validateForm(name, type === 'checkbox' ? String(checked) : value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (Object.values(errors).every(error => error === '') && Object.values(formData).every(field => field !== '')) {
            setLoading(true);
            try {
                const data = await registerUser(formData);
                login(data.token);
                navigate('/');
            } catch (error) {
                alert(error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Typography variant="h4" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="First Name"
                        fullWidth
                        margin="normal"
                        name="firstName"
                        variant="standard"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Last Name"
                        fullWidth
                        margin="normal"
                        variant="standard"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        variant="standard"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        label="Phone"
                        fullWidth
                        margin="normal"
                        variant="standard"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={!!errors.phone}
                        helperText={errors.phone}
                    />
                    <TextField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        variant="standard"
                        fullWidth
                        margin="normal"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="isSeller"
                                checked={formData.isSeller}
                                onChange={handleChange}
                            />
                        }
                        label="I am a seller"
                    />
                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : 'Register'}
                        </Button>
                    </Box>
                </form>
                <Box mt={2}>
                    <Typography>
                        Already have an account? <Link to="/login">Login</Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default RegisterPage;

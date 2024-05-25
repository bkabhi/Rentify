import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, FormControlLabel, Checkbox } from '@mui/material';
import { registerUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', isSeller: false });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();
    const { login } = useAuth();

    const validateForm = () => {
        const errors: { [key: string]: string } = {};

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.match(emailRegex)) {
            errors.email = 'Please enter a valid email address';
        }

        // Validate phone number
        const phoneRegex = /^\d{10}$/;
        if (!formData.phone.match(phoneRegex)) {
            errors.phone = 'Please enter a 10-digit phone number';
        }

        // Validate password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!formData.password.match(passwordRegex)) {
            errors.password = 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0; // Return true if there are no errors
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const data = await registerUser(formData);
                login(data.token);
                navigate('/');
            } catch (error) {
                alert(error);
            }
        }
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
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Last Name"
                        fullWidth
                        margin="normal"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
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
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={!!errors.phone}
                        helperText={errors.phone}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!errors.password}
                        helperText={errors.password}
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
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Register
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

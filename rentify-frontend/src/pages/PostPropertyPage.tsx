import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { fetchPropertyById, postProperty, updateProperty } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const PostPropertyPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [propertyData, setPropertyData] = useState({ place: '', area: '', bedrooms: '', bathrooms: '', nearbyAmenities: '' });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    useEffect(() => {
        if (isEditing) {
            const fetchProperty = async () => {
                try {
                    setLoading(true);
                    const property = await fetchPropertyById(id!);
                    setPropertyData(property);
                } catch (error) {
                    alert(error);
                } finally {
                    setLoading(false);
                }
            };
            fetchProperty();
        }
    }, [id, isEditing]);

    const validateForm = () => {
        const errors: { [key: string]: string } = {};

        if (!propertyData.place.trim()) errors.place = 'Place is required';
        if (!propertyData.area.trim() || isNaN(Number(propertyData.area))) errors.area = 'Valid area is required';
        if (!propertyData.bedrooms.trim() || isNaN(Number(propertyData.bedrooms))) errors.bedrooms = 'Valid number of bedrooms is required';
        if (!propertyData.bathrooms.trim() || isNaN(Number(propertyData.bathrooms))) errors.bathrooms = 'Valid number of bathrooms is required';
        if (!propertyData.nearbyAmenities.trim()) errors.nearbyAmenities = 'Nearby amenities are required';

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPropertyData({ ...propertyData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        try {
            if (isEditing && id) {
                await updateProperty(id, propertyData);
                alert('Property updated successfully!');
            } else {
                await postProperty(propertyData);
                alert('Property posted successfully!');
            }
            navigate('/');
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Typography variant="h4" gutterBottom>
                    {isEditing ? 'Edit Property' : 'Post Property'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Place"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        name="place"
                        value={propertyData.place}
                        onChange={handleChange}
                        error={!!errors.place}
                        helperText={errors.place}
                    />
                    <TextField
                        label="Area (sq.ft)"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        name="area"
                        value={propertyData.area}
                        onChange={handleChange}
                        error={!!errors.area}
                        helperText={errors.area}
                    />
                    <TextField
                        label="Bedrooms"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        name="bedrooms"
                        value={propertyData.bedrooms}
                        onChange={handleChange}
                        error={!!errors.bedrooms}
                        helperText={errors.bedrooms}
                    />
                    <TextField
                        label="Bathrooms"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        name="bathrooms"
                        value={propertyData.bathrooms}
                        onChange={handleChange}
                        error={!!errors.bathrooms}
                        helperText={errors.bathrooms}
                    />
                    <TextField
                        label="Nearby Amenities"
                        variant="standard"
                        fullWidth
                        margin="normal"
                        name="nearbyAmenities"
                        value={propertyData.nearbyAmenities}
                        onChange={handleChange}
                        error={!!errors.nearbyAmenities}
                        helperText={errors.nearbyAmenities}
                    />
                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : isEditing ? 'Update Property' : 'Post Property'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default PostPropertyPage;

import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { fetchPropertyById, postProperty, updateProperty } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';


const PostPropertyPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const [propertyData, setPropertyData] = useState({ place: '', area: '', bedrooms: '', bathrooms: '', nearbyAmenities: '' });
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    useEffect(() => {
        if (isEditing) {
            const fetchProperty = async () => {
                try {
                    const property = await fetchPropertyById(id!);
                    setPropertyData(property);
                } catch (error) {
                    alert(error);
                }
            };
            fetchProperty();
        }
    }, [id, isEditing]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPropertyData({ ...propertyData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
        }
    };

    return (
        <Container maxWidth="sm">
            <Box mt={5}>
                <Typography variant="h4" gutterBottom>
                    Post Property
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Place"
                        fullWidth
                        margin="normal"
                        name="place"
                        value={propertyData.place}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Area (sq.ft)"
                        fullWidth
                        margin="normal"
                        name="area"
                        value={propertyData.area}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Bedrooms"
                        fullWidth
                        margin="normal"
                        name="bedrooms"
                        value={propertyData.bedrooms}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Bathrooms"
                        fullWidth
                        margin="normal"
                        name="bathrooms"
                        value={propertyData.bathrooms}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Nearby Amenities"
                        fullWidth
                        margin="normal"
                        name="nearbyAmenities"
                        value={propertyData.nearbyAmenities}
                        onChange={handleChange}
                    />
                    <Box mt={2}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Post Property
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default PostPropertyPage;

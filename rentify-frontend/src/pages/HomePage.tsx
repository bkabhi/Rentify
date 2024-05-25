import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Pagination, TextField, Typography } from '@mui/material';
import PropertyCard from '../components/PropertyCard';
import { fetchProperties, fetchPropertiesBySeller } from '../services/api';
import { IProperty } from '../models';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
    const [properties, setProperties] = useState<IProperty[]>([]);
    const [filters, setFilters] = useState({ place: '', bedrooms: '', bathrooms: '' });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { user } = useAuth();

    const fetchUserProperties = async () => {
        try {
            const data = user?.isSeller && user?._id ? await fetchPropertiesBySeller(user._id, { params: { ...filters, page } }) : await fetchProperties({ params: { ...filters, page } });
            setProperties(data.properties);
            setTotalPages(data.pages);
        } catch (error) {
            alert(error);
        }
    };

    useEffect(() => {
        fetchUserProperties();
        // eslint-disable-next-line
    }, [user, filters, page]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {user?.isSeller ? 'My Posted Properties' : 'Available Properties'}
            </Typography>
            <Box mb={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            label="Place"
                            name="place"
                            value={filters.place}
                            onChange={handleFilterChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Bedrooms"
                            name="bedrooms"
                            value={filters.bedrooms}
                            onChange={handleFilterChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Bathrooms"
                            name="bathrooms"
                            value={filters.bathrooms}
                            onChange={handleFilterChange}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={3}>
                {properties?.map((property: any) => (
                    <PropertyCard
                        key={property._id}
                        property={property}
                        isSeller={user?.isSeller || false}
                        isLiked={user?.likedProperties?.includes(property._id) || false}
                        getProperties={fetchUserProperties}
                    />
                ))}
            </Grid>
            <Box mt={4} display="flex" justifyContent="center">
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Container>
    );
};

export default HomePage;

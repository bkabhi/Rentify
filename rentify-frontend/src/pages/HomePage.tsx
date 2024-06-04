import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Container, Grid, Pagination, Typography } from '@mui/material';
import PropertyCard from '../components/PropertyCard';
import { fetchProperties, fetchPropertiesBySeller } from '../services/api';
import { IProperty } from '../models';
import { useAuth } from '../context/AuthContext';
import FiltersProperty from '../components/FiltersProperty';

const HomePage: React.FC = () => {
    const [properties, setProperties] = useState<IProperty[]>([]);
    const [filters, setFilters] = useState({ place: '', bedrooms: '', bathrooms: '' });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

    const fetchUserProperties = async () => {
        try {
            setLoading(true);
            const config = { params: { ...filters, page } };
            const data = user?.isSeller && user?._id ? await fetchPropertiesBySeller(user._id, config) : await fetchProperties(config);
            setProperties(data.properties);
            setTotalPages(data.pages);
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
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
            <FiltersProperty filters={filters} handleFilterChange={handleFilterChange} />
            {loading ? (
                <Box display="flex" justifyContent="center" mt={5}>
                    <CircularProgress />
                </Box>
            ) : properties.length === 0 ? (
                <Box display="flex" justifyContent="center" mt={5}>
                    <Typography variant="h6" color="textSecondary">
                        No properties found.
                    </Typography>
                </Box>
            ) : (
                <>
                    <Grid container spacing={3}>
                        {properties.map((property: IProperty) => (
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
                </>
            )}
        </Container>
    );
};

export default HomePage;

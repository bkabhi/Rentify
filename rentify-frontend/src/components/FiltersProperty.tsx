import React, { useState } from 'react';
import { Box, Grid, TextField, IconButton, Collapse, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';


interface FiltersProps {
    filters: {
        place: string;
        bedrooms: string;
        bathrooms: string;
    };
    handleFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FiltersProperty: React.FC<FiltersProps> = ({ filters, handleFilterChange }) => {
    const [showFilters, setShowFilters] = useState(false);

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    return (
        <>
            <Box display="flex" justifyContent="flex-end" mb={2}>
                <IconButton onClick={toggleFilters} color="primary">
                    <Typography variant="button" sx={{ mr: 1 }}>Filter</Typography>
                    <FilterListIcon />
                </IconButton>
            </Box>
            <Collapse in={showFilters}>
                <Box mb={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                label="Place"
                                name="place"
                                value={filters.place}
                                onChange={handleFilterChange}
                                variant="outlined"
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
                                variant="outlined"
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
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Collapse>
        </>
    );
};

export default FiltersProperty;

import React, { useState } from 'react';
import { Card, CardContent, Typography, CardActions, Button, Grid, Box } from '@mui/material';
import { deleteProperty, expressInterest, likeProperty } from '../services/api';
import { IProperty, IUser } from '../models';
import { useNavigate } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useAuth } from '../context/AuthContext';
import { LoadingButton } from '@mui/lab';
import { Delete } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface PropertyCardProps {
    property: IProperty;
    isSeller: boolean;
    isLiked: boolean;
    getProperties: () => Promise<void>;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, isSeller, isLiked, getProperties }) => {
    const navigate = useNavigate();
    const [sellerDetails, setSellerDetails] = useState<IUser>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { isAuthenticated, fetchUser } = useAuth();

    const handleInterest = async () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        try {
            setIsLoading(true);
            const data = await expressInterest(property._id);
            setSellerDetails(data.seller);
            setIsLoading(false);
        } catch (error) {
            alert(error);
            setIsLoading(false);
        }
    };

    const handleLike = async () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        try {
            await likeProperty(property._id);
            await fetchUser();
            await getProperties();
        } catch (error) {
            alert(error);
        }
    };

    const handleEdit = async () => {
        navigate(`/post-property/${property._id}`);
    };

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            await deleteProperty(property._id);
            await getProperties();
            setIsLoading(false);
        } catch (error) {
            alert(error);
            setIsLoading(false);
        }
    };

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {property.place}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Area: {property.area} sq.ft.
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Bedrooms: {property.bedrooms}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Bathrooms: {property.bathrooms}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Nearby: {property.nearbyAmenities}
                    </Typography>
                </CardContent>
                <CardActions>
                    {isSeller ? (
                        <>
                            <Button size="small" variant="contained" color="primary" onClick={handleEdit}>
                                Edit
                            </Button>
                            <LoadingButton loading={isLoading} loadingPosition="start" startIcon={<Delete />} size="small" variant="contained" color="error" onClick={handleDelete}>
                                Delete
                            </LoadingButton>
                        </>
                    )
                        :
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                {
                                    isLiked ? <ThumbUpIcon onClick={handleLike} sx={{ cursor: 'pointer' }} /> : <ThumbUpOffAltIcon sx={{ cursor: 'pointer' }} onClick={handleLike} />
                                }
                                <span>{property.likes}</span>
                            </Box>
                            {
                                sellerDetails ?
                                    <Box>
                                        <p style={{ margin: '0' }}>{sellerDetails.firstName} {sellerDetails.lastName}</p>
                                        <p style={{ margin: '0' }}>{sellerDetails.phone}</p>
                                        <p style={{ margin: '0' }}>{sellerDetails.email}</p>
                                    </Box>
                                    :
                                    <LoadingButton loading={isLoading} loadingPosition="start" startIcon={<VisibilityIcon />} size="small" variant="contained" color="primary" onClick={handleInterest}>
                                        I'm Interested
                                    </LoadingButton>
                            }
                        </Box>
                    }
                </CardActions>
            </Card>
        </Grid>
    );
};

export default PropertyCard;

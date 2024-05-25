import Property from '../models/Property';
import User from '../models/User';
import { createTransportService } from '../utils/mail';

const getProperties = async (req: any, res: any) => {
    try {
        const { page = 1, limit = 12, place, bedrooms, bathrooms } = req.query;

        const filters: any = {};
        if (place) filters.place = { $regex: place, $options: 'i' };
        if (bedrooms) filters.bedrooms = bedrooms;
        if (bathrooms) filters.bathrooms = bathrooms;

        const properties = await Property.find(filters)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

        const total = await Property.countDocuments(filters);

        res.json({
            properties,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit))
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getPropertiesBySeller = async (req: any, res: any) => {
    try {
        const { sellerId } = req.params;
        const { page = 1, limit = 12, place, bedrooms, bathrooms } = req.query;

        const filters: any = { owner: sellerId };
        if (place) filters.place = { $regex: place, $options: 'i' };
        if (bedrooms) filters.bedrooms = bedrooms;
        if (bathrooms) filters.bathrooms = bathrooms;

        const properties = await Property.find(filters)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));

        const total = await Property.countDocuments(filters);

        res.json({
            properties,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit))
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message || 'Failed to fetch properties' });
    }
};

const getPropertiesByID = async (req: any, res: any) => {
    const property = await Property.findById(req.params.id);
    res.json(property);
};

const createProperty = async (req: any, res: any) => {
    const { place, area, bedrooms, bathrooms, nearbyAmenities } = req.body;

    const property = new Property({
        owner: req.user._id,
        place,
        area,
        bedrooms,
        bathrooms,
        nearbyAmenities,
    });

    const createdProperty = await property.save();
    res.status(201).json(createdProperty);
};

const updateProperty = async (req: any, res: any) => {
    const { place, area, bedrooms, bathrooms, nearbyAmenities } = req.body;


    const property = await Property.findById(req.params.id);

    if (property) {
        property.place = place;
        property.area = area;
        property.bedrooms = bedrooms;
        property.bathrooms = bathrooms;
        property.nearbyAmenities = nearbyAmenities;

        const updatedProperty = await property.save();
        res.json(updatedProperty);
    } else {
        res.status(404).json({ message: 'Property not found' });
    }
};

const deleteProperty = async (req: any, res: any) => {
    const property = await Property.findById(req.params.id);

    if (property) {
        await property.deleteOne();;
        res.json({ message: 'Property removed' });
    } else {
        res.status(404).json({ message: 'Property not found' });
    }
};

const expressInterest = async (req: any, res: any) => {
    try {
        const property = await Property.findById(req.params.id);
        const buyer = req.user;

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        const seller = await User.findById(property.owner);

        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        const transporter = createTransportService();
        await transporter.sendMail({
            to: seller.email,
            subject: 'Someone is interested in your property',
            text: `Buyer ${buyer.firstName} ${buyer.lastName} is interested in your property located at ${property.place}. Contact them at ${buyer.email} or ${buyer.phone}.`,
        });

        await transporter.sendMail({
            to: buyer.email,
            subject: 'You showed interest in a property',
            text: `You showed interest in the property located at ${property.place}. 
                    The seller, ${seller.firstName} ${seller.lastName}, can be contacted at ${seller.email} or ${seller.phone}. 
                    The seller will contact you soon.`,
        });
        return res.json({ message: 'Interest expressed and emails sent', seller: { firstName: seller.firstName, lastName: seller.lastName, email: seller.email, phone: seller.phone } });
    } catch (error) {
        console.error('Error expressing interest:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const likeProperty = async (req: any, res: any) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const property = await Property.findById(id);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        const isLiked = user.likedProperties.includes(id);

        if (isLiked) {
            user.likedProperties = user.likedProperties.filter(
                (propertyId: any) => propertyId.toString() !== id
            );
            property.likes -= 1;
        } else {
            user.likedProperties.push(id);
            property.likes += 1;
        }

        await user.save();
        await property.save();
        
        const test = await User.findById(userId)

        res.status(200).json({ message: isLiked ? 'Property unliked' : 'Property liked' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to like/unlike property' });
    }
};

export { getProperties, createProperty, updateProperty, deleteProperty, likeProperty, expressInterest, getPropertiesByID, getPropertiesBySeller };

import express from 'express';
const router = express.Router();
import { getProperties, createProperty, updateProperty, deleteProperty, likeProperty, expressInterest, getPropertiesByID, getPropertiesBySeller } from '../controllers/propertyController';
import { authenticate } from '../middleware/authMiddleware';

router.route('/')
  .get(getProperties)
  .post(authenticate, createProperty);

router.route('/:id')
  .get(authenticate, getPropertiesByID)
  .put(authenticate, updateProperty)
  .delete(authenticate, deleteProperty);

router.post('/:id/interest', authenticate, expressInterest);
router.get('/seller/:sellerId', authenticate, getPropertiesBySeller);
router.post('/like/:id', authenticate, likeProperty);

export default router;

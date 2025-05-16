import express from 'express';
import reviewController from '../controllers/reviewController.js';

const router = express.Router();

router.get('/user', reviewController.showReviewByUser);
router.get('/restaurant/:restaurantId', reviewController.showReviewByRestaurant);
router.post('/:restaurantId', reviewController.addReview);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

export default router;

import express from 'express';
import reviewController from '../controllers/reviewController.js';
import { isLoggedInAPI } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/user', isLoggedInAPI,reviewController.showReviewByUser);
router.get('/restaurant/:restaurantId', reviewController.showReviewByRestaurant);
router.post('/:restaurantId', isLoggedInAPI, reviewController.addReview);
router.put('/:id', isLoggedInAPI,reviewController.updateReview);
router.delete('/:id', isLoggedInAPI,reviewController.deleteReview);

export default router;

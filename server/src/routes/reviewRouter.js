import express from 'express';
import reviewController from '../controllers/reviewController.js';
import { isLoggedInAPI } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

router.get('/user', isLoggedInAPI,reviewController.showReviewByUser);
router.get('/restaurant/:restaurantId', reviewController.showReviewByRestaurant);
router.post('/:restaurantId', upload.single('image'), isLoggedInAPI, reviewController.addReview);
router.put('/:reviewId/image', upload.single('image'), isLoggedInAPI, reviewController.updateReviewImage);
router.delete('/:reviewId/image', isLoggedInAPI, reviewController.deleteReviewImage);
router.put('/:id', isLoggedInAPI, reviewController.updateReview);
router.delete('/:id', isLoggedInAPI, reviewController.deleteReview);

export default router;

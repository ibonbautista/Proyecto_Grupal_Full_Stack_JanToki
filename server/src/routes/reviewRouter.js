import express from 'express';
import reviewController from '../controllers/reviewController.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

router.get('/user', reviewController.showReviewByUser);
router.get('/restaurant/:restaurantId', reviewController.showReviewByRestaurant);
router.post('/:restaurantId', upload.single('image'),reviewController.addReview);
router.put('/:reviewId/image', upload.single('image'), reviewController.updateReviewImage);
router.delete('/:reviewId/image', reviewController.deleteReviewImage);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

export default router;

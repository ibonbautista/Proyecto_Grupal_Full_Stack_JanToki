import express from 'express';
import reviewController from '../controllers/reviewController.js';

const router = express.Router();

router.get('/', reviewController.showReview);
router.post('/', reviewController.addReview);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

export default router;

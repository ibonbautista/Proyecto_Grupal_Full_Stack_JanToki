import express from 'express';
import favoriteController from '../controllers/favoriteController.js';

const router = express.Router();


router.get('/', favoriteController.showFavorite);
router.post('/:restaurantId', favoriteController.addFavorite); 
router.delete('/:favoriteId', favoriteController.deleteFavorite);

export default router;

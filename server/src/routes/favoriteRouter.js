import express from 'express';
import favoriteController from '../controllers/favoriteController.js';

const router = express.Router();


router.get('/', favoriteController.showFavorite);
router.post('/:id', favoriteController.addFavorite); 
router.delete('/:id', favoriteController.deleteFavorite);

export default router;

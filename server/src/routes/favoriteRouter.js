import express from 'express';
import favoriteController from '../controllers/favoriteController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Favorite
 *   description: Rutas de favoritos, permite obtener información de los favoritos, crear, actualizar y eliminar favoritos
 */

/**
 * @swagger
 * /favorite:
 *   get:
 *     summary: Obtener todos los favoritos
 *     tags: [Favorite]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 */
router.get('/', favoriteController.showFavorite);

/**
 * @swagger
 * /favorite/{restaurantId}:
 *   get:
 *     summary: Obtener un favorito por su ID
 *     tags: [Favorite]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del favorito
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 */
router.post('/:restaurantId', favoriteController.addFavorite); 

/**
 * @swagger
 * /favorite/{favouriteId}:
 *   delete:
 *     summary: Eliminar un favorito por su ID
 *     tags: [Favorite]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del favorito
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 */
router.delete('/:favoriteId', favoriteController.deleteFavorite);

export default router;

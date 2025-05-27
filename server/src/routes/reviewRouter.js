import express from 'express';
import reviewController from '../controllers/reviewController.js';
import { isLoggedInAPI } from '../middlewares/authMiddleware.js';
import { upload, prepareRestaurantName } from '../middlewares/multer.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Review
 *   description: Rutas de reseñas, permite obtener información de las reseñas, crear, actualizar y eliminar reseñas
 */

/**
 * @swagger
 * /review/user:
 *   get:
 *     summary: Obtener todas las reseñas de un usuario
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 */
router.get('/user', isLoggedInAPI,reviewController.showReviewByUser);

/**
 * @swagger
 * /review/restaurant/{restaurantId}:
 *   get:
 *     summary: Obtener todas las reseñas de un restaurante por su ID
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del restaurante
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 */
router.get('/restaurant/:restaurantId', reviewController.showReviewByRestaurant);

/**
 * @swagger
 * /review/{restaurantId}:
 *   get:
 *     summary: Obtener una reseña por su ID
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reseña
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 */
router.post('/:restaurantId', isLoggedInAPI, prepareRestaurantName, upload.single('image'), reviewController.addReview);

/**
 * @swagger
 * /review/{reviewId}/image:
 *   put:
 *     summary: Actualizar la foto de una reseña
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reseña
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 */
router.put('/:reviewId/image', upload.single('image'), isLoggedInAPI, reviewController.updateReviewImage);

/**
 * @swagger
 * /review/{reviewId}/image:
 *   delete:
 *     summary: Eliminar la foto de una reseña
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reseña
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 */
router.delete('/:reviewId/image', isLoggedInAPI, reviewController.deleteReviewImage);

/**
 * @swagger
 * /review/{id}:
 *   put:
 *     summary: Actualizar una reseña por su ID
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reseña
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 */
router.put('/:id', isLoggedInAPI, prepareRestaurantName, upload.single('image'), reviewController.updateReview);

/**
 * @swagger
 * /review/{id}:
 *   delete:
 *     summary: Eliminar una reseña por su ID
 *     tags: [Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reseña
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 */
router.delete('/:id', isLoggedInAPI, reviewController.deleteReview);

export default router;

import {Router} from "express";
import restaurantController from "../controllers/restaurantController.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isLoggedInAPI } from "../middlewares/authMiddleware.js";
import { uploadRestaurant } from "../middlewares/multer.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Restaurant
 *   description: Rutas de restaurantes, permite obtener información de los restaurantes, crear, actualizar y eliminar restaurantes 
 */

/**
 * @swagger
 * /restaurant:
 *   get:
 *     summary: Obtener todos los restaurantes
 *     tags: [Restaurant]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 restaurants:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Restaurant'
 */
router.get("/",restaurantController.getRestaurants);

/**
 * @swagger
 * /restaurant/{id}:
 *   get:
 *     summary: Obtener un restaurante por su ID
 *     tags: [Restaurant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del restaurante
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Name:
 *                   type: string
 *                   description: Nombre del restaurante
 *                 Description:
 *                   type: string
 *                   description: Descripción del restaurante
 *                 Address:
 *                   type: string
 *                   description: Dirección del restaurante
 *                 Phone:
 *                   type: string
 *                   description: Teléfono del restaurante
 *                 Email:
 *                   type: string
 *                   description: Correo electrónico del restaurante
 *                 Image:
 *                   type: string
 *                   description: URL de la imagen del restaurante
 *                 createdAt:
 *                   type: string
 *                   description: Fecha de creación del restaurante
 *                 updatedAt:
 *                   type: string
 *                   description: Fecha de actualización del restaurante
 */
router.get("/:id",restaurantController.getRestaurantById);

/**
 * @swagger
 * /restaurant:
 *   post:
 *     summary: Crear un nuevo restaurante
 *     tags: [Restaurant]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *                 description: Nombre del restaurante
 *               Description:
 *                 type: string
 *                 description: Descripción del restaurante
 *               Address:
 *                 type: string
 *                 description: Dirección del restaurante
 *               Phone:
 *                 type: string
 *                 description: Teléfono del restaurante
 *               Email:
 *                 type: string
 *                 description: Correo electrónico del restaurante
 *               Image:
 *                 type: file
 *                 description: Imagen del restaurante
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Name:
 *                   type: string
 *                   description: Nombre del restaurante
 *                 Description:
 *                   type: string
 *                   description: Descripción del restaurante
 *                 Address:
 *                   type: string
 *                   description: Dirección del restaurante
 *                 Phone:
 *                   type: string
 *                   description: Teléfono del restaurante
 *                 Email:
 *                   type: string
 *                   description: Correo electrónico del restaurante
 *                 Image:
 *                   type: string
 *                   description: URL de la imagen del restaurante
 *                 createdAt:
 *                   type: string
 *                   description: Fecha de creación del restaurante
 *                 updatedAt:
 *                   type: string
 *                   description: Fecha de actualización del restaurante
 */
router.post("/", isLoggedInAPI, isAdmin, uploadRestaurant.single('image'),restaurantController.createRestaurant);

/**
 * @swagger
 * /restaurant/{id}:
 *   put:
 *     summary: Actualizar un restaurante por su ID
 *     tags: [Restaurant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del restaurante
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *                 description: Nombre del restaurante
 *               Description:
 *                 type: string
 *                 description: Descripción del restaurante
 *               Address:
 *                 type: string
 *                 description: Dirección del restaurante
 *               Phone:
 *                 type: string
 *                 description: Teléfono del restaurante
 *               Email:
 *                 type: string
 *                 description: Correo electrónico del restaurante
 *               Image:
 *                 type: file
 *                 description: Imagen del restaurante
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Name:
 *                   type: string
 *                   description: Nombre del restaurante
 *                 Description:
 *                   type: string
 *                   description: Descripción del restaurante
 *                 Address:
 *                   type: string
 *                   description: Dirección del restaurante
 *                 Phone:
 *                   type: string
 *                   description: Teléfono del restaurante
 *                 Email:
 *                   type: string
 *                   description: Correo electrónico del restaurante
 *                 Image:
 *                   type: string
 *                   description: URL de la imagen del restaurante
 *                 createdAt:
 *                   type: string
 *                   description: Fecha de creación del restaurante
 *                 updatedAt:
 *                   type: string
 *                   description: Fecha de actualización del restaurante
 */
router.put("/:id",isLoggedInAPI, isAdmin, uploadRestaurant.single('image'),restaurantController.updateRestaurant);

/**
 * @swagger
 * /restaurant/{id}:
 *   delete:
 *     summary: Eliminar un restaurante por su ID
 *     tags: [Restaurant]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del restaurante
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 */
router.delete("/:id", isLoggedInAPI, isAdmin, restaurantController.deleteRestaurant);

export default router
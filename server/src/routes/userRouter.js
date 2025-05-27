import {Router} from "express";
import userController from "../controllers/userController.js";
import { isAdmin } from '../middlewares/isAdmin.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Rutas de usuarios, permite obtener información de los usuarios, crear, actualizar y eliminar usuarios
 */

/**
 * @swagger
 * /user/me:
 *   put:
 *     summary: Modificar el usuario autenticado
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: Nombre de usuario
 *                 email:
 *                   type: string
 */
router.put("/me",userController.updateCurrentUser);

/**
 *  @swagger
 * /user:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: Nombre de usuario
 *                 email:
 *                   type: string
 */
router.get("/",isAdmin,userController.getUsers);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Obtener un usuario por su ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: Nombre de usuario
 *                 email:
 *                   type: string
 */
router.get("/:id",isAdmin, userController.getUserById);

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *             example:
 *               username: JohnDoe
 *               email: 0t0gj@example.com
 *               password: password123
 *     responses:
 *       201:
 *         description: Respuesta exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: Nombre de usuario
 *                 email:
 *                   type: string
 */
router.post("/",isAdmin, userController.createUser);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Actualizar un usuario por su ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *             example:
 *               username: JohnDoe
 *               email: 0t0gj@example.com
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 */
router.put("/:id",isAdmin,userController.updateUser);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Eliminar un usuario por su ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 */
router.delete("/:id",isAdmin, userController.deleteUser);

export default router
import {Router} from "express";
import authController from "../controllers/authController.js";
import { isLoggedInAPI } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger 
 * tags:
 *   name: Auth
 *   description: Rutas de autenticación de usuarios, permite registrarse, loguearse y obtener información del usuario autenticado
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *             example:
 *               email: 0t0gj@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Usuario creado correctamente
 *                 token:
 *                   type: string
 *                   description: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID del usuario
 *                     username:
 *                       type: string
 *                       description: Nombre de usuario
 *                     email:
 *                       type: string
 *                       description: Correo electrónico del usuario
 *                     role:
 *                       type: string
 *                       description: Rol del usuario
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 */
router.post("/login",authController.login);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
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
 *         description: Registro correcto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Usuario creado correctamente
 *                 token:
 *                   type: string
 *                   description: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID del usuario
 *                     username:
 *                       type: string
 *                       description: Nombre de usuario
 *                     email:
 *                       type: string
 *                       description: Correo electrónico del usuario
 *                     role:
 *                       type: string
 *                       description: Rol del usuario
 *       400:
 *         description: Error en el registro
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error
 */
router.post("/register",authController.register);

/**
 * @swagger
 * /user-info:
 *   get:
 *     summary: Obtener información del usuario autenticado
 *     tags: [Auth]
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
 *                 user:
 *                   type: object
 *                   properties:
 *                      id:
 *                          type: string
 *                          description: ID del usuario
 *                      username:
 *                          type: string
 *                          description: Nombre de usuario
 *                      email:
 *                          type: string
 *                          description: Correo electrónico del usuario
 *                      role:
 *                          type: string
 *                          description: Rol del usuario
 *                   example:
 *                          id: "18757664654"
 *                          username: JohnDoe
 *                          email: 0t0gj@example.com
 *                          role: admin
 * 
 */
router.get("/user-info", isLoggedInAPI, authController.getUserInfo);

export default router
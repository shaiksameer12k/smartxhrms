import { Router } from "express";
import { getAdminList, postAdmin, deleteAdmin } from "./admin.controller.js";

const routes = new Router();

routes.get("/admins", getAdminList);
routes.post("/admins", postAdmin);
routes.delete("/admins/:user_id", deleteAdmin);

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management
 */

// common api res

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     APIResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 200
 *
 *         message:
 *           type: string
 *           example: Success Message
 *
 *         isTriggerToast:
 *           type: boolean
 *           example: true
 *
 *         data:
 *           type: object
 */
/**
 * @swagger
 * components:
 *   schemas:
 *
 *     APIRequest:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           example: 200
 *
 *         message:
 *           type: string
 *           example: Success Message
 *
 *         isTriggerToast:
 *           type: boolean
 *           example: true
 *
 *         data:
 *           type: object
 */

/**
 * @swagger
 * /api/v1/admins:
 *   get:
 *     summary: Get all admins
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: List of all admins
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/APIResponse'
 *       404:
 *         description: No admins found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/admins:
 *   post:
 *     summary: Create a new admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_name
 *               - user_email
 *             properties:
 *               user_name:
 *                 type: string
 *                 example: Arshi
 *               user_email:
 *                 type: string
 *                 example: arshi@gmail.com
 *     responses:
 *       201:
 *         description: Admin created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/APIResponse'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/admins/{user_id}:
 *   delete:
 *     summary: Delete Admin
 *     tags:
 *       - Admin
 *
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *         description: Admin User ID
 *
 *     responses:
 *       200:
 *         description: Admin deleted successfully
 *
 *       404:
 *         description: Admin not found
 */
export default routes;

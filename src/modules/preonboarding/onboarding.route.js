import {getonboardingList, postonboardingList} from "./onboarding.controller.js";

import {Router} from "express";

const router = new Router();

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
 * /api/v1/onboarding:
 *   get:
 *     summary: Get all onboarding list
 *     tags: [PreOnboarding]
 *     responses:
 *       200:
 *         description: List of all onboarding
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/APIResponse'
 *       404:
 *         description: No admins found
 *       500:
 *         description: Internal server error
 */

router.get("/onboarding", getonboardingList);

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     APIRequest:
 *       type: object
 *
 *       required:
 *         - firstname
 *         - middlename
 *         - lastname
 *         - dob
 *         - email
 *         - mobileno
 *
 *       properties:
 *
 *         firstname:
 *           type: string
 *           example: Sameer
 *
 *         middlename:
 *           type: string
 *           example: Kumar
 *
 *         lastname:
 *           type: string
 *           example: Shaik
 *
 *         dob:
 *           type: string
 *           example: 1999-01-01
 *
 *         email:
 *           type: string
 *           format: email
 *           example: sameer@gmail.com
 *
 *         mobileno:
 *           type: string
 *           example: "9876543210"
 */

/**
 * @swagger
 * /api/v1/onboarding:
 *   post:
 *     summary: Trigger onboarding Employee
 *
 *     tags:
 *       - PreOnboarding
 *
 *     requestBody:
 *       required: true
 *
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             required:
 *               - firstname
 *               - middlename
 *               - lastname
 *               - dob
 *               - email
 *               - mobileno
 *
 *             properties:
 *
 *               firstname:
 *                 type: string
 *                 example: Sameer
 *
 *               middlename:
 *                 type: string
 *                 example: Kumar
 *
 *               lastname:
 *                 type: string
 *                 example: Shaik
 *
 *               dob:
 *                 type: string
 *                 example: 1999-01-01
 *
 *               email:
 *                 type: string
 *                 format: email
 *                 example: sameer@gmail.com
 *
 *               mobileno:
 *                 type: string
 *                 example: "9876543210"
 *
 *     responses:
 *
 *       200:
 *         description: Employee onboarding created successfully
 *
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/APIResponse'
 *
 *       400:
 *         description: Bad request
 *
 *       404:
 *         description: No admins found
 *
 *       500:
 *         description: Internal server error
 */

router.post("/onboarding", postonboardingList);

export default router;

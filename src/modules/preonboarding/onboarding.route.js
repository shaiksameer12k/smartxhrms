import {getonboardingEmpFullDetails, getonboardingList, postonboardingList} from "./onboarding.controller.js";

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

// get full submited emp details

/**
 * @swagger
 * /api/v1/onboarding/{trigger_emp_id}:
 *   get:
 *     summary: Get full onboarding details for a specific employee
 *     tags: [PreOnboarding]
 *     parameters:
 *       - in: path
 *         name: trigger_emp_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee trigger ID
 *     responses:
 *       200:
 *         description: Employee onboarding details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 personal_details:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/PersonalDetails'
 *                 family_details:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/FamilyDetails'
 *                 education_details:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EducationDetails'
 *                 documents_details:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/DocumentDetails'
 *             example:
 *               personal_details:
 *                 - id: 1
 *                   firstname: "John"
 *                   middlename: "A"
 *                   lastname: "Doe"
 *                   dob: "1995-06-15"
 *                   aadharno: "123456789012"
 *                   email: "john.doe@company.com"
 *                   personalemail: "john.personal@gmail.com"
 *                   mobileno: "9876543210"
 *                   personalcontactno: "9123456780"
 *                   address1_state: "Telangana"
 *                   address1_city: "Hyderabad"
 *                   address1_location: "Madhapur"
 *                   address2_state: "Andhra Pradesh"
 *                   address3_city: "Vijayawada"
 *                   address4_location: "Benz Circle"
 *                   trigger_emp_id: 1
 *               family_details:
 *                 - id: 1
 *                   relation: "Father"
 *                   fullname: "Robert Doe"
 *                   dob: "1965-08-20"
 *                   contactno: "9876500001"
 *                   trigger_emp_id: 1
 *                 - id: 2
 *                   relation: "Mother"
 *                   fullname: "Mary Doe"
 *                   dob: "1970-03-10"
 *                   contactno: "9876500002"
 *                   trigger_emp_id: 1
 *               education_details:
 *                 - id: 1
 *                   course: "B.Tech Computer Science"
 *                   passedyear: "2017"
 *                   percentage: "85"
 *                   trigger_emp_id: 1
 *                 - id: 2
 *                   course: "Intermediate MPC"
 *                   passedyear: "2013"
 *                   percentage: "92"
 *                   trigger_emp_id: 1
 *               documents_details:
 *                 - id: 1
 *                   documnetname: "Resume.pdf"
 *                   status: 1
 *                   hr_status: 1
 *                   trigger_emp_id: 1
 *                 - id: 2
 *                   documnetname: "Aadhar Card.pdf"
 *                   status: 1
 *                   hr_status: 0
 *                   trigger_emp_id: 1
 *       404:
 *         description: Employee onboarding details not found
 *       500:
 *         description: Internal server error
 */

router.get("/onboarding/:trigger_emp_id", getonboardingEmpFullDetails);

export default router;

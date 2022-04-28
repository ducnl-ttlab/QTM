const express = require("express");
const router = express.Router();
const { AuthApi } = require("../../controllers");
const { auth } = require("../../middlewares/auth");
const upload = require("../../utils/multer");
const { AuthValidation } = require("../../middlewares/validate");

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - title
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the Course
 *         title:
 *           type: string
 *           description: The Course title
 *         author:
 *           type: string
 *           description: The Course author
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The books managing API
 */
/**
 * @swagger
 * tags:
 *   name: Course
 *   description: The books managing API
 */
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

router.post("/register", AuthValidation, AuthApi.register);
/**
 * @swagger
 * /auth/login:
 *   get:
 *     summary: Returns the list of all the books
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.post("/login", AuthApi.login);

module.exports = router;

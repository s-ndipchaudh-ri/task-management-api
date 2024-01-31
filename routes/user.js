const router = require('express').Router();
const controller = require('../controller');
const sendResponse = require("../helpers/sendResponses");

/**
 * @swagger
 * /user:
 *   post:
 *     summary: User Registration
 *     tags: [USER]
 *     description: Authenticate a user and return a token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Authentication token
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

router.post("/", async function (req, res) {
	controller.UserController.registerUser(req.body).then((data) => {
		sendResponse.sendSuccessMessage("success", data, res);
	}).catch((err) => {
		if (err.isJoi) {
			sendResponse.sendErorMessage(err.details[0].message, {}, res);
		}
		else {
			sendResponse.sendErorMessage(err.message, {}, res);
		}
	});
})

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User login
 *     tags: [USER]
 *     description: Authenticate a user and return a token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The user's username
 *               password:
 *                 type: string
 *                 description: The user's password
 *     responses:
 *       200:
 *         description: Successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Authentication token
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */



router.post("/login", async function (req, res) {
	controller.UserController.loginUser(req.body).then((data) => {
		sendResponse.sendSuccessMessage("success", data, res);
	}).catch((err) => {
		console.log(err)
		if (err.isJoi) {
			sendResponse.sendErorMessage(err.details[0].message, {}, res);
		}
		else {
			sendResponse.sendErorMessage(err.message, {}, res);
		}
	});
})

/*
update task 
*/
router.patch("/", async function (req, res) {
	controller.TaskController.updateTask(req.body).then((data) => {
		sendResponse.sendSuccessMessage("success", data, res);
	}).catch((err) => {
		if (err.isJoi) {
			sendResponse.sendErorMessage(err.details[0].message, {}, res);
		}
		else {
			sendResponse.sendErorMessage(err.message, {}, res);
		}
	});
})


/*
del task 
*/
router.delete("/", async function (req, res) {
	controller.TaskController.deleteTask(req.body).then((data) => {
		sendResponse.sendSuccessMessage("success", data, res);
	}).catch((err) => {
		if (err.isJoi) {
			sendResponse.sendErorMessage(err.details[0].message, {}, res);
		}
		else {
			sendResponse.sendErorMessage(err.message, {}, res);
		}
	});
})



module.exports = router;

const router = require('express').Router();
const controller = require('../controller');
const sendResponse = require("../helpers/sendResponses");
const { verifyToken } = require('../middleware/authentication');


router.get("/", verifyToken, async function (req, res) {
	req.query.user_id = req.body.user_id
	controller.TaskController.getTask(req.query).then((data) => {
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
add task 
*/
router.post("/",verifyToken, async function (req, res) {
	controller.TaskController.addTask(req.body).then((data) => {
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
update task 
*/
router.patch("/", verifyToken, async function (req, res) {
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
router.delete("/",verifyToken, async function (req, res) {
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

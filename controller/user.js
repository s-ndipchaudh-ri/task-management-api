/*global Joi*/
/*eslint no-undef: "error"*/

let commonController = require("../helpers/common");

const Response = require("../config/response");
const Constants = require("../config/constant");
const Jwt = require("jsonwebtoken");
const model = require("../model");

module.exports = {

	registerUser: async (payloadData) => {
		try {
			
			const schema = Joi.object({
				username: Joi.string().required(),
				password: Joi.string().required(),
			});
			let payload = await commonController.verifyJoiSchema(payloadData, schema);
		

			payload.password = await commonController.generateNewPassword(payload.password);
			let checkUserExist = await model.user.findOne({where : {
				username : payload.username
			}})
			if(checkUserExist) throw Response.error_msg.alreadyExist
			let createUser = await  model.user.create(payload);

			let tokenData = {
				username: payload.username,
				id: createUser.id
			};
			let token = await Jwt.sign(tokenData, Constants.key.privateKey);
			return {
				accessToken: token,
				id: createUser.id,
				username: createUser.username,
			};
		}
		catch (err) {
			throw err;
		}
	},
	loginUser: async (payloadData) => {
		try {
			const schema = Joi.object({
				username: Joi.string().required(),
				password: Joi.string().required(),
			});
			let payload = await commonController.verifyJoiSchema(payloadData, schema);

			let checkUsernameAlreadyExist = await model.user.findOne({where : {username : payload.username}})
		
            if (!checkUsernameAlreadyExist) throw Response.error_msg.usernameAndPasswordNotFound;

			let checkPassword = await commonController.comparePassword(payload.password, checkUsernameAlreadyExist.password);
			if (!checkPassword) throw Response.error_msg.usernameAndPasswordNotFound;
			payload.userId = checkUsernameAlreadyExist.id;

			let tokenData = {
				id: checkUsernameAlreadyExist.id,
				username: checkUsernameAlreadyExist.username
			};
			let token = await Jwt.sign(tokenData, Constants.key.privateKey);

			return {
				accessToken: token,
                ...tokenData
			};
		}
		catch (err) {
			throw err;
		}
	}
};





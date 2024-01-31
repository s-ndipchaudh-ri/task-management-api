/* eslint-disable */
var randomstring = require("randomstring");
const bcrypt = require("bcryptjs");
const SaltSounds = 10;

module.exports = {
	randomIntegerOtp: function () {
		return Math.floor(1000 + Math.random() * 9000);
	},
	generateHashPassword: async (password) => {
		const hash = await encrypt(password);
		return hash;
	},
	generateRandomString: (size, type) => {
		return randomstring.generate({ length: size, charset: type });
	},
	escapeRegExp(str) {
		// eslint-disable-next-line
		return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	},
	verifyJoiSchema: async (data, schema) => {
		try {
			const value = await schema.validateAsync(data);
			return value;
		}
		catch (error) {
			throw error;
		}
	},
	generateNewPassword: async (text) => {
		var hash = await bcrypt.hashSync(text, SaltSounds);
		return hash;
	},
	comparePassword: async (text, hash) => {
		var hash = await bcrypt.compare(text, hash);
		return hash;
	},
	decrypt: async (text) => {
		const decipher = crypto.createDecipher(algorithm, secretKey);
		let dec = decipher.update(text, "hex", "utf8");
		dec += decipher.final("utf8");
		return dec;
	},
	encrypt: async (text) => {
		const cipher = crypto.createCipher(algorithm, secretKey);
		let crypted = cipher.update(text, "utf8", "hex");
		crypted += cipher.final("hex");
		return crypted;
	}
};
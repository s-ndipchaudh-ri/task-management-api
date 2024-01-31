const Jwt = require("jsonwebtoken");
const response = require("../config/response");
const privateKey = require("../config/constant").key.privateKey;



const verifyToken = (req, res, next) => {
	try {
		if (req.headers && req.headers.authorization) {
			var token = req.headers.authorization;
            if(token){
                token = token.split("Bearer ")[1]
                
            }
			Jwt.verify(token, privateKey, async (err, tokenData) => {
				console.log("tokenData   ",token, tokenData);
				if (err) {
					return res.status(401).send(response.error_msg.invalidToken);
				}
				else {
					req.body.user_id = tokenData.id;
					next();
				}
			});
		}
		else {
			return res.status(401).send(response.error_msg.invalidToken);
		}
	}
	catch (err) {
		return res.status(401).send(response.error_msg.invalidToken);
	}
};


module.exports = {
	verifyToken: verifyToken,
};
var error_msg = {	
	invalidToken:{
		message:"Provided token is invalid.",
		statusCode:401,
		responseType:""
	},
	invalidCred:{
		message:"Username or password required",
		statusCode:401,
		responseType:""
	},
	usernameAndPasswordNotFound :{
		statusCode:400,
		message : "This Username or password is invalid.",
		responseType:""
	},
	taskNotFound :{
		statusCode:400,
		message : "Task Not Found.",
		responseType:""
	}
};


var sendSuccess = function(data){
	
	let success_msg={
		"statusCode": 200,
		"message":  data.message ||"Success",
		"data" :  data.data,
	};
	return success_msg;	
};

module.exports={
	error_msg:error_msg,
	sendSuccess:sendSuccess,
};
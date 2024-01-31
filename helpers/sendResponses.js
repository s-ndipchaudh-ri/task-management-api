exports.sendSuccessMessage = (message, data, res) => {
    let code = data?.statusCode || 200
	let success_msg = {
		"data": data || {}
	};
    delete data.statusCode;
	return res.status(code).send(success_msg);
};

exports.sendErorMessage = (message, data, res,err) => {
    let code = data?.statusCode ||  err?.statusCode ||  400
	let error_message = {
        message : message ? message : "",
		"responseType": data ? data : {}
	};
    delete data.statusCode;
	return res.status(code).send(error_message);
};

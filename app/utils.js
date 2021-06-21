function getPostData(req) {    //getReqData() function retrieves data from the client on the server.
	return new Promise((resolve, reject) => {
		try {
			let body = '';
			req.on('data', (chunk) => {
				body += chunk.toString();
			});
			req.on('end', () => {
				resolve(body);
			});
		} catch (error) {
			reject(error);
		}
	});
}

module.exports = { getPostData };
const http = require('http');
const Employee = require('./app/controller');
const { getPostData } = require('./app/utils');

const server = http.createServer(async (req, res) => {
	if (req.url === '/api/employees' && req.method === 'GET') {  
		const employeeGET = await Employee.findAll();
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(employeeGET));
	}
	else if (req.url.match(/\/api\/employees\/([a-z A-Z 0-9]+)/) && req.method === 'GET') {  
		try {
			const id = req.url.split('/')[3];
			const employeeGETiD = await Employee.findById(id);
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(employeeGETiD));
		} catch (error) {
			res.writeHead(404, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'Employee not found!' }));
		}
	}
	else if (req.url.match(/\/api\/employees\/([a-z A-Z 0-9]+)/) && req.method === 'DELETE') {
		try {
			const id = req.url.split('/')[3];
			await Employee.deleteById(id);
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'Employee has been deleted successfully!!!' }));
		} catch (error) {
			console.log(error);
			res.writeHead(404, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'Error! Employee not found!' }));
		}
	}
	else if (req.url.match(/\/api\/employees\/([a-z A-Z 0-9]+)/) && req.method === 'PATCH') {
		try {
			const body = await getPostData(req);
			const id = req.url.split('/')[3];
			const updateEmployee = await Employee.updateById(id, JSON.parse(body));
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(updateEmployee));
		} catch (error) {
			console.log(error);
			res.writeHead(404, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'Cannot update Employee, not found!' }));
		}
	}
	else if (req.url === '/api/employees' && req.method === 'POST') {
		const body = await getPostData(req);
		const { FirstName, LastName, Occupation, Department} = JSON.parse(body);
		const newEmployee= await Employee.create({ FirstName, LastName, Occupation, Department });
		res.writeHead(201, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(newEmployee));
	}
	else {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'The Route is not found!' }));
	}
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server listening on port ${PORT}!!!`));
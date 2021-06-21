let Employees = require('./employees');

const findAll = () => {
	return new Promise((resolve, reject) => {   // find all employees
        if(Employees){
            resolve(Employees);

        }
        else{
          reject('Employees not found');

        }
		
	});
};

const findById = (id) => {                 //find an employee by its id
	return new Promise((resolve, reject) => {
		const FindEmployee = Employees.find((Employees) => Employees.id === id);
		if (FindEmployee) {
			resolve(FindEmployee);
		}
		else {
			reject(`We cannot find employee with id ${id}`);
		}
	});
};

const deleteById = (id) => {   //delete employee by its id
	return new Promise((resolve, reject) => {
		const deleteEmployee = Employees.filter((Employees) => Employees.id !== id);
		Employees= [
			...deleteEmployee    //three dot operator spreads the object, get all its property to overwrite it with new ones we're passing
		];             

        if(!deleteEmployee){
            reject('Error!  Employee cannot be deleted');
        } 

        resolve({ message: 'Employee has been deleted successfully!!' });

	});
};

const create = (Employee) => {   //create  a new employee
	return new Promise((resolve, reject) => {
		const newEmployee = {
			id : Math.floor(4 + Math.random() * 10).toString(),
			...Employee
		};
		Employees= [
			newEmployee,
			...Employees
		];
		resolve(newEmployee);
        reject('Error! Could not create a new employee');
	});

};

const updateById = async (id, body) => {   //update an employee by id
	try {
		const { FirstName, LastName, Occupation, Department} = body;
		const employees = await findById(id);
		if (!employees) {
			res.writeHead(404, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'Cannot update employee, not found' }));
		}
		return new Promise((resolve, reject) => {
			const updateEmployee= {
				id,
				FirstName: employees.FirstName,
			    LastName:  employees.LastName,
                Occupation: employees.Occupation,
                Department: employees.Department,
				
			};
			const index = Employees.findIndex((employees) => employees.id === id);
			Employees[index] = updateEmployee;


			resolve(updateEmployee);
            reject('cannot update Employee with id ${id}');

		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	findAll,
	findById,
	deleteById,
	create,
	updateById
};
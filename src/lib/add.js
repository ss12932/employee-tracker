import inquirer from 'inquirer';
class Add {
  constructor(connection, callback) {
    this.connection = connection;
    this.callback = callback;
  }
  async addDepartment() {
    const addDepartment = await inquirer.prompt([
      {
        type: 'input',
        name: 'dpt_name',
        message: 'What is the name of the department you would like to add?',
        validate: (answer) => {
          if (!answer) {
            return 'Please enter the name of the department you would like to add';
          }
          return true;
        },
      },
    ]);
    this.connection.query(
      `INSERT INTO department (name) 
      VALUES ("${addDepartment.dpt_name}")`,
      (error, results) => {
        if (error) throw error;
        console.log(
          `The department "${addDepartment.dpt_name}" has been successfully added to the employee-tracker database.`
        );
        this.callback();
      }
    );
  }
  addRole() {
    this.connection.query(
      'SELECT * FROM department',
      async (error, results) => {
        if (error) throw error;
        const addRole = await inquirer.prompt([
          {
            type: 'input',
            name: 'role',
            message: 'What is the name of the job role you would like to add?',
            validate: (answer) => {
              if (!answer) {
                return 'Please enter the name of the role you would like to add';
              }
              return true;
            },
          },
          {
            type: 'input',
            name: 'salary',
            message: 'What is the annual salary amount of the role?',
            validate: (answer) => {
              if (!answer) {
                return 'Please enter the annual salary amount of the role';
              }
              return true;
            },
          },
          {
            type: 'list',
            name: 'department',
            message: 'Which department should the role be assigned to?',
            choices: function () {
              return results.map((choice) => ({
                name: `${choice.name}`,
                value: { id: `${choice.id}`, name: `${choice.name}` },
              }));
            },
          },
        ]);
        this.connection.query(
          `INSERT INTO role (title, salary, department_id) VALUES ("${addRole.role}", "${addRole.salary}", "${addRole.department.id}");`,
          (error, results) => {
            if (error) throw error;
            console.log(
              `The role "${addRole.role}" has been successfully assigned to department "${addRole.department.name}" with a salary of "${addRole.salary}".`
            );
            this.callback();
          }
        );
      }
    );
  }
  addEmployee() {
    this.connection.query(
      `SELECT role.*, employee.manager_id, CONCAT(employee.first_name, " ", employee.last_name) AS manager, department.name as department FROM role LEFT JOIN employee ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id`,
      async (error, results) => {
        console.log(results);
        if (error) throw error;
        const addEmployee = await inquirer.prompt([
          {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?",
            validate: (answer) => {
              if (!answer) {
                return 'Please enter the first name of the employee you would like to add.';
              }
              return true;
            },
          },
          {
            type: 'input',
            name: 'lastName',
            message: (answer) => `What is ${answer.firstName}'s last name?`,
            validate: (answer) => {
              if (!answer) {
                return 'Please enter the last name of the employee you would like to add.';
              }
              return true;
            },
          },
          {
            type: 'list',
            name: 'role',
            message: (answer) =>
              `What is ${answer.firstName} ${answer.lastName}'s role at the company?`,
            choices: function () {
              return results
                .filter((value, index, self) => {
                  return (
                    self.findIndex((v) => v.title === value.title) === index
                  );
                })
                .map((choice) => ({
                  name: `${choice.title}`,
                  value: {
                    role_id: `${choice.id}`,
                    title: `${choice.title}`,
                    manager_id: `${choice.manager_id}`,
                    manager: `${choice.manager}`,
                    department: `${choice.department}`,
                    salary: `${choice.salary}`,
                  },
                }));
            },
          },
        ]);

        this.connection.query(
          `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${addEmployee.firstName}", "${addEmployee.lastName}", "${addEmployee.role.role_id}", ${addEmployee.role.manager_id});`,
          (error, results) => {
            if (error) throw error;
            console.log(
              `${addEmployee.firstName} ${addEmployee.lastName} has been added with role: ${addEmployee.role.title}, with salary: £${addEmployee.role.salary}, under the supervision of ${addEmployee.role.manager} in the ${addEmployee.role.department} department.`
            );
            this.callback();
          }
        );
      }
    );
  }
}
export default Add;

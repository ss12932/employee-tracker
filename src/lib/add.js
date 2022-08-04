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
    console.log(addDepartment);
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
              // map will return an array of objects here which will provide us a list of choices for the inquirer prompt
              return results.map((choice) => ({
                name: `${choice.name}`,
                value: { id: `${choice.id}`, name: `${choice.name}` },
              }));
            },
          },
        ]);
        console.log(addRole);
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
  addEmployee() {}
}
export default Add;

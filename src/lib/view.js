import inquirer from 'inquirer';
class View {
  constructor(connection, callback) {
    this.connection = connection;
    this.callback = callback;
  }

  viewAllDepartments() {
    this.connection.query(
      'SELECT department.id, department.name as department FROM department',
      (error, results) => {
        if (error) throw error;
        console.table(results);
        this.callback();
      }
    );
  }

  viewEmployeesByDept() {
    this.connection.query(
      'SELECT department.id, department.name AS department FROM department',
      async (error, results) => {
        if (error) throw error;
        const choice = await inquirer.prompt([
          {
            name: 'department_id',
            type: 'list',
            message: 'Please select one of the following departments:',
            choices: function () {
              return results.map((choice) => ({
                name: `${choice.department}`,
                value: choice.id,
              }));
            },
          },
        ]);
        this.connection.query(
          `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.id = ${choice.department_id}`,
          (error, results) => {
            if (error) throw error;
            console.table(results);
            this.callback();
          }
        );
      }
    );
  }
  viewAllRoles() {
    this.connection.query(
      'SELECT role.id, role.title, role.salary, department.name as department FROM role LEFT JOIN department ON role.department_id = department.id',
      (error, results) => {
        if (error) throw error;
        console.table(results);
        this.callback();
      }
    );
  }
  viewAllEmployees() {
    this.connection.query(
      'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id',
      (error, results) => {
        if (error) throw error;
        console.table(results);
        this.callback();
      }
    );
  }
  viewEmployeesByManager() {
    this.connection.query(
      'SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS manager, department.name AS department  FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id WHERE employee.manager_id IS NULL',
      async (error, results) => {
        if (error) throw error;
        const choice = await inquirer.prompt([
          {
            name: 'manager_id',
            type: 'list',
            message: 'Please select one of the following managers:',
            choices: function () {
              return results.map((choice) => ({
                name: `${choice.manager} (${choice.department})`,
                value: choice.id,
              }));
            },
          },
        ]);
        this.connection.query(
          `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id WHERE employee.manager_id = ${choice.manager_id}`,
          (error, results) => {
            if (error) throw error;
            console.table(results);
            this.callback();
          }
        );
      }
    );
  }
  viewTotalBudgetByDept() {
    this.connection.query(
      'SELECT department.id, department.name AS department FROM department',
      async (error, results) => {
        if (error) throw error;
        const choice = await inquirer.prompt([
          {
            name: 'department_budget',
            type: 'list',
            message:
              'Please select one of the following departments to view its total utilized budget:',
            choices: function () {
              // map will return an array of objects here which will provide us a list of choices for the inquirer prompt
              return results.map((choice) => ({
                name: `${choice.department}`,
                value: choice.id,
              }));
            },
          },
        ]);
        this.connection.query(
          `SELECT role.department_id, department.name, SUM(role.salary) AS total_util_budget FROM role LEFT JOIN department ON role.department_id = department.id WHERE role.department_id = ${choice.department_budget}`,
          (error, results) => {
            if (error) throw error;
            console.table(results);
            this.callback();
          }
        );
      }
    );
  }
}
export default View;

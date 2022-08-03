import inquirer from 'inquirer';
import consoleTable from 'console.table';

class View {
  constructor(connection, callback) {
    this.connection = connection;
    this.callback = callback;
  }

  viewAllDepartments() {
    this.connection.query('SELECT * FROM department', (error, results) => {
      if (error) throw error;
      console.table(results);
      this.callback();
    });
  }

  viewEmployeesByDept() {}
  viewAllRoles() {
    this.connection.query('SELECT * FROM role', (error, results) => {
      if (error) throw error;
      console.table(results);
      this.callback();
    });
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
      'SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS manager FROM employee WHERE employee.manager_id IS NULL',
      async (error, results) => {
        if (error) throw error;
        const choice = await inquirer.prompt([
          {
            name: 'manager_id',
            type: 'list',
            message: 'Please select one of the following managers:',
            choices: function () {
              return results.map((choice) => ({
                name: choice.manager,
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
  viewTotalBudgetByDept() {}
}
export default View;

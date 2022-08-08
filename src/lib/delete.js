import inquirer from 'inquirer';

class Delete {
  constructor(connection, callback) {
    this.connection = connection;
    this.callback = callback;
  }
  deleteDepartment() {
    this.connection.query('SELECT * FROM department'),
      async (error, results) => {
        if (error) throw error;
        const deleteDpt = await inquirer.prompt([
          {
            type: 'list',
            name: 'department',
            message:
              'Please select the department you would like to delete. Please note: This action is PERMANENT.',
            choices: function (choice) {
              return results.map((choice) => ({
                name: choice.title,
                value: { id: choice.id, name: choice.name },
              }));
            },
          },
        ]);
        this.connection.query(
          `DELETE FROM role WHERE id = ${deleteRole.role.id}`,
          (error, results) => {
            if (error) throw error;
            console.log(
              `"${deleteRole.role.title}" has been permanently deleted from the Employee Tracker Database.`
            );
            this.callback();
          }
        );
      };
  }
  deleteRole() {
    this.connection.query(
      'SELECT r.id, r.title FROM role as r',
      async (error, results) => {
        if (error) throw error;
        const deleteRole = await inquirer.prompt([
          {
            type: 'list',
            name: 'role',
            message:
              'Please select the role you would like to delete. Please note: This action is PERMANENT.',
            choices: function (choice) {
              return results.map((choice) => ({
                name: choice.title,
                value: { id: choice.id, title: choice.title },
              }));
            },
          },
        ]);

        this.connection.query(
          `DELETE FROM role WHERE id = ${deleteRole.role.id}`,
          (error, results) => {
            if (error) throw error;
            console.log(
              `"${deleteRole.role.title}" has been permanently deleted from the Employee Tracker Database.`
            );
            this.callback();
          }
        );
      }
    );
  }
  deleteEmployee() {
    this.connection.query(
      `SELECT e.id, e.first_name, e.last_name, department.name AS department FROM employee AS e LEFT JOIN role ON role.id = e.role_id LEFT JOIN department ON department.id = role.department_id;`,
      async (error, results) => {
        console.log(results);
        if (error) throw error;
        const deleteEmployee = await inquirer.prompt([
          {
            type: 'list',
            name: 'delete',
            message:
              'Which employee do you want to delete? Please note: this action is PERMANENT',
            choices: function (choice) {
              return results.map((choice) => ({
                name: `${choice.first_name} ${choice.last_name} (${choice.department})`,
                value: {
                  id: choice.id,
                  first_name: choice.first_name,
                  last_name: choice.last_name,
                },
              }));
            },
          },
        ]);

        this.connection.query(
          `DELETE FROM employee WHERE id = ${deleteEmployee.delete.id}`,
          (error, results) => {
            console.log(
              `"${deleteEmployee.delete.first_name} ${deleteEmployee.delete.last_name}" has been permanently deleted from the Employee Tracker Database.`
            );
            this.callback();
          }
        );
      }
    );
  }
}
export default Delete;

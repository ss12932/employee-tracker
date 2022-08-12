import inquirer from 'inquirer';

class Update {
  constructor(connection, callback) {
    this.connection = connection;
    this.callback = callback;
  }
  updateEmployeeRole() {
    this.connection.query(
      `SELECT e.id, e.first_name, e.last_name, r.id AS role_id, r.title, d.name as department FROM employee AS e LEFT JOIN role AS r ON r.id = e.role_id LEFT JOIN department AS d ON d.id = r.department_id;`,
      async (error, results) => {
        console.log(results);
        if (error) throw error;
        const updateRole = await inquirer.prompt([
          {
            type: 'list',
            name: 'oldRole',
            message: 'Which employee do you want to reassign role?',
            choices: function (choice) {
              return results.map((choice) => ({
                name: `${choice.first_name} ${choice.last_name} (${choice.department})`,
                value: {
                  employee_id: choice.id,
                  first_name: choice.first_name,
                  last_name: choice.last_name,
                  department: choice.department,
                  old_role: choice.title,
                },
              }));
            },
          },
          {
            type: 'list',
            name: 'newRole',
            message: 'Which role do you want to assign to this employee?',
            choices: function (choice) {
              return results.map((choice) => ({
                name: `${choice.title} (${choice.department})`,
                value: {
                  new_role_id: choice.role_id,
                  title: choice.title,
                  new_dpt: choice.department,
                },
              }));
            },
          },
        ]);

        this.connection.query(
          `UPDATE employee SET role_id = "${updateRole.newRole.new_role_id}" WHERE id = "${updateRole.oldRole.employee_id}";`,
          (error, results) => {
            console.log(results);
            console.log(
              `${updateRole.oldRole.first_name} ${updateRole.oldRole.last_name} has successfully been reassigned a new role from ${updateRole.oldRole.old_role} (${updateRole.oldRole.department}) to ${updateRole.newRole.title} (${updateRole.newRole.new_dpt}).`
            );
          }
        );
        this.callback();
      }
    );
  }
  updateEmployeeManagers() {
    this.connection.query(
      `SELECT e.id, e.first_name, e.last_name, CONCAT(e.first_name, " ", e.last_name) AS manager, e.manager_id, r.id AS role_id, r.title, d.name as department FROM employee AS e LEFT JOIN role AS r ON r.id = e.role_id LEFT JOIN department AS d ON d.id = r.department_id LEFT JOIN employee AS manager ON e.manager_id = manager.id;`,
      async (error, results) => {
        console.log(results);
        if (error) throw error;
        const updateManager = await inquirer.prompt([
          {
            type: 'list',
            name: 'oldManager',
            message: 'Which employee do you want to reassign a manager?',
            choices: function (choice) {
              return results.map((choice) => ({
                name: `${choice.first_name} ${choice.last_name} (${choice.department})`,
                value: {
                  employee_id: choice.id,
                  first_name: choice.first_name,
                  last_name: choice.last_name,
                  department: choice.department,
                  old_manager: choice.manager,
                },
              }));
            },
          },
          {
            type: 'list',
            name: 'newManager',
            message: (answer) =>
              `Which manager do you want to assign to ${answer.oldManager.first_name} ${answer.oldManager.last_name}?`,
            choices: function (choice) {
              return results.map((choice) => ({
                name: `${choice.manager} (${choice.department})`,
                value: {
                  manager_emp_id: choice.id,
                  new_manager: choice.manager,
                  new_dpt: choice.department,
                },
              }));
            },
          },
        ]);

        this.connection.query(
          `UPDATE employee SET manager_id = ${updateManager.newManager.manager_emp_id} WHERE id = ${updateManager.oldManager.employee_id};`,
          (error, results) => {
            console.log(results);
            console.table(results);
            console.log(
              `${updateManager.oldManager.first_name} ${updateManager.oldManager.last_name} has successfully been reassigned a new manager from ${updateManager.oldManager.old_manager} (manager of ${updateManager.oldManager.department}) to ${updateManager.newManager.new_manager} (manager of ${updateManager.newManager.new_dpt}).`
            );
          }
        );
        this.callback();
      }
    );
  }
}
export default Update;

const formatMoney = (money) => {
  return money.match(
    new RegExp(`(?!^)(?=(\\d{3})+${money.includes('.') ? '\\.' : '$'})`, 'g')
  );
};

formatMoney('100000000');

'/Jack(?=Sprat)/'.match();
'JackSprat'.match(/Jack(?=Sprat)/);
'100000'.match(/(?!^)(?=(\\d{3})+$)/g);

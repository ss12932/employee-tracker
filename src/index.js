import inquirer from 'inquirer';
import mysql2 from 'mysql2';
import consoleTable from 'console.table';
import Add from './lib/add.js';
import Delete from './lib/delete.js';
import Update from './lib/update.js';
import View from './lib/view.js';

const connection = mysql2.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'password123',
  database: 'ee_cms_db',
});

const errorCallback = (err) => {
  if (err) throw err;
  console.log('Welcome to the Employee Tracker CMS Application!');
  init();
};

connection.connect(errorCallback);

const init = async () => {
  const menuAwait = await inquirer.prompt({
    name: 'choice',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      { name: 'View all departments', value: 'viewAllDepartments' },
      { name: 'View all roles', value: 'viewAllRoles' },
      { name: 'View all employees', value: 'viewAllEmployees' },
      // prettier-ignore
      { name: 'View all employees by manager', value: 'viewEmployeesByManager'},
      // prettier-ignore
      { name: 'View all employees by department', value: 'viewEmployeesByDept'},
      // prettier-ignore
      { name: 'View total utilized budget of a department', value: 'viewTotalBudgetByDept'},
      { name: 'Add a department', value: 'addDepartment' },
      { name: 'Add a role', value: 'addRole' },
      { name: 'Add an employee', value: 'addEmployee' },
      { name: "Update employee's role", value: 'updateEmployeeRole' },
      { name: "Update employee's manager", value: 'updateEmployeeManagers' },
      { name: 'Delete department', value: 'deleteDepartment' },
      { name: 'Delete role', value: 'deleteRole' },
      { name: 'Delete employee', value: 'deleteEmployee' },
    ],
  });

  const { choice } = menuAwait;

  switch (choice) {
    case 'viewAllDepartments':
    case 'viewAllRoles':
    case 'viewAllEmployees':
    case 'viewEmployeesByManager':
    case 'viewEmployeesByDept':
    case 'viewTotalBudgetByDept':
      new View(connection, init)[choice]();
      break;
    case 'addRole':
    case 'addEmployee':
      new Add(connection, init)[choice]();
      break;
    case 'updateEmployeeRole':
    case 'updateEmployeeManagers':
      new Update(connection, init)[choice]();
      break;
    case 'deleteDepartment':
    case 'deleteRole':
    case 'deleteEmployee':
      new Delete(connection, init)[choice]();
      break;
  }
};

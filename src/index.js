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
  password: '',
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
      new View(connection, init).viewAllDepartments();
      break;
    case 'viewAllRoles':
      new View(connection, init).viewAllRoles();
      break;
    case 'viewAllEmployees':
      new View(connection, init).viewAllEmployees();
      break;
    case 'viewEmployeesByManager':
      new View(connection, init).viewEmployeesByManager();
      break;
    case 'viewEmployeesByDept':
      new View(connection, init).viewEmployeesByDept();
      break;
    case 'viewTotalBudgetByDept':
      new View(connection, init).viewTotalBudgetByDept();
      break;
    case 'addRole':
      new Add(connection, init).addRole();
      break;
    case 'addEmployee':
      new Add(connection, init).addEmployee();
      break;
    case 'updateEmployeeRole':
      new Update(connection, init).updateEmployeeRole();
      break;
    case 'updateEmployeeManagers':
      new Update(connection, init).updateEmployeeManagers();
      break;
    case 'deleteDepartment':
      new Delete(connection, init).deleteDepartment();
      break;
    case 'deleteRole':
      new Delete(connection, init).deleteRole();
      break;
    case 'deleteEmployee':
      new Delete(connection, init).deleteEmployee();
      break;
  }
};

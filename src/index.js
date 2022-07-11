import inquirer from 'inquirer';
import mysql2 from 'mysql2';
import consoleTable from 'console.table';
import { Add, Delete, Update, View } from './lib';

const connection = mysql.createConnection({
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
  const mainMenuAwait = await inquirer.prompt({
    name: 'choice',
    type: 'list',
    message: 'What would you like to do?',
    choices: [
      new inquirer.Separator(View),
      { name: 'View all departments', value: 'viewAllDepartments' },
      { name: 'View all roles', value: 'viewAllRoles' },
      { name: 'View all employees', value: 'viewAllEmployees' },
      // prettier-ignore
      { name: 'View all employees by manager', value: 'viewEmployeesByManager'},
      // prettier-ignore
      { name: 'View all employees by department', value: 'viewEmployeesByDept'},
      // prettier-ignore
      { name: 'View total utilized budget of a department', value: 'viewTotalBudgetByDept'},
      new inquirer.Separator(Add),
      { name: 'Add a department', value: 'addDepartment' },
      { name: 'Add a role', value: 'addRole' },
      { name: 'Add an employee', value: 'addEmployee' },
      new inquirer.Separator(Update),
      { name: "Update employee's role", value: 'updateEmployeeRole' },
      { name: "Update employee's manager", value: 'updateEmployeeManagers' },
      new inquirer.Separator(Delete),
      { name: 'Delete department', value: 'deleteDepartment' },
      { name: 'Delete role', value: 'deleteRole' },
      { name: 'Delete employee', value: 'deleteEmployee' },
    ],
  });

  const { choice } = mainMenuAwait;
  switch (choice) {
    case 'viewAllDepartments':
      break;
    case 'viewAllRoles':
      break;
    case 'viewAllEmployees':
      break;
    case 'viewEmployeesByManager':
      break;
    case 'viewEmployeesByDept':
      break;
    case 'viewTotalBudgetByDept':
      break;
    case 'addDepartment':
      break;
    case 'addRole':
      break;
    case 'addEmployee':
      break;
    case 'updateEmployeeRole':
      break;
    case 'updateEmployeeManagers':
      break;
    case 'deleteDepartment':
      break;
    case 'deleteRole':
      break;
    case 'deleteEmployee':
      break;
  }
};

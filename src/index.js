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
      'View all departments',
      'View all roles',
      'View all employees',
      'View all employees by manager',
      'View all employees by department',
      'View total utilized budget of a department',
      'Add a department',
      'Add a role',
      'Add an employee',
      "Update employee's role",
      "Update employee's manager",
      'Delete department',
      'Delete role',
      'Delete employee',
    ],
  });
};

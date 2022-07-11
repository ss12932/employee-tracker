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

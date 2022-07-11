import inquirer from 'inquirer';
import mysql2 from 'mysql2';
import consoleTable from 'console.table';
import { Add, Delete, Update, View } from './lib';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ee_cms_db',
});

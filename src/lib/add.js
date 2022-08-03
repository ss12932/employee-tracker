class Add {
  constructor(connection, callback) {
    this.connection = connection;
    this.callback = callback;
  }
  addDepartment() {}
  addRole() {}
  addEmployee() {
    this.connection.query(
      'SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id',
      (error, results) => {
        if (error) throw error;
        console.table(results);
        this.callback();
      }
    );
  }
}
export default Add;

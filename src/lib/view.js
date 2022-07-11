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
}
export default View;

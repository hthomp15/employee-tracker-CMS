viewEmployees = () => {
    // select from the db
    let query = "SELECT * FROM employee";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.log(res.length + ' employees found!');
      console.table(res);
      mainMenu();
    });
    // show the result to the user (console.table)
}

addEmployee = () => {
    inquirer
    .prompt([
      {
        type: "input",
        message: "What's the first name of the employee?",
        name: "firstName"
      },
      {
        type: "input",
        message: "What's the last name of the employee?",
        name: "lastName"
      },
      {
        type: "input",
        message: "What is the employee's role id number?",
        name: "roleID"
      },
      {
        type: "input",
        message: "What is the manager id number?",
        name: "managerID"
      }
    ])
    .then(function(answer) {

      
        connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
         VALUES (?, ?, ?, ?)`,
         [answer.firstName, answer.lastName, answer.roleID, answer.managerID],
         function(err, res) {
          if (err) throw err;
          console.table('employee added', answer);
          mainMenu();
        });
      });
  }

    updateRole = ()=> {
        inquirer
          .prompt([
            {
              type: "input",
              message: "Which employee would you like to update?",
              name: "employeeUpdate"
            },
      
            {
              type: "input",
              message: "What do you want to update to?",
              name: "updateRole"
            }
          ])
          .then(function(answer) {
            connection.query(
                'UPDATE employee SET role_id=? WHERE first_name= ?',
                [answer.updateRole, answer.employeeUpdate],
                function(err, res) {
              if (err) throw err;
              console.table(answer.employeeUpdate, "updated", answer);
              mainMenu();
            });
          });
      }
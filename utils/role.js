

viewRoles = () => {
    // select from the db
    let query = "SELECT * FROM role";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.log(res.length + ' roles found!');
      console.table(res);
      mainMenu();
    });
    // show the result to the user (console.table)
}

addRole = ()=> {
    inquirer.prompt([
        {
        type: "input",
        message: "What is the name of the role?",
        name: "roleName"
        },
        {
        type: "input",
        message: "What is the salary of the role?",
        name: "salary"
        },
        {
        type: "input",
        message: "What is the department ID number?",
        name: "departmentId"
        },

    ]).then(function(answer){

        connection.query(
        `INSERT INTO role (title, salary, department_id)
         VALUES (?,?,?)`,
         [answer.roleName, answer.salary, answer.departmentId] , 
         function(err, res) {
        if (err) throw err;
         console.table('role added', answer)
        mainMenu()
    });
    })
}

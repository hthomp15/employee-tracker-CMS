

viewDepartments = () => {
    // select from the db
    let query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.log(res.length + ' departments found!');
      console.table(res);
      mainMenu();
    });
    // show the result to the user (console.table)
}

addDepartment = ()=> {
    inquirer.prompt({
        type: "input",
        message: "What is the name of the department?",
        name: "departmentName"
        }).then(function(answer){

        connection.query(
        `INSERT INTO department (name)
         VALUES (?)`,
         [answer.departmentName] , 
         function(err, res) {
        if (err) throw err;
         console.table('The department has been added!')
        mainMenu()
    });
    })
}


const db = require('../config/connection');
const inquirer = require('inquirer');

// helper functions
const { getRole, getManager, getDepartment } = require('./helpers');

const mainMenu = {
    'View all departments': viewDepartments, 
    'View all roles': viewRoles, 
    'View all employees': viewEmployees,
    'View employees by manager': viewByManager,
    'View employees by department': viewByDepartment,
    'View department budget': viewDepartmentBudget, 
    'Add a department': addDepartment, 
    'Add a role': addRole,
    'Add an employee': addEmployee, 
    'Update an employee role': updateRole,
    'Update employee manager': updateManager,
    'Delete a department': deleteDepartment,
    'Delete a role': deleteRole,
    'Delete an employee': deleteEmployee,
    'EXIT': function() {
        console.log('Thank you for using the employee-tracker!')
        db.end();
    }
}
const catalog = ()=> {
    inquirer.prompt([
        {
            name: 'choice',
            type: 'list',
            message: 'What would you like to do?',
            choices: Object.keys(mainMenu),
        }
    ]).then (answer => {
        mainMenu[answer.choice]();
    })
}

// All Department Functions (View, ADD, Delete)
function viewDepartments() {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table('\nAll Departments:', res);
        catalog();
    });
};

function addDepartment() {
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'What is the department name?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the department name");
                    return false;
                }
            }
        }
    ]).then(answer => {
        db.query('INSERT INTO department SET ?', { name: answer.name }, (err) => {
            if (err) throw err;
            console.log('Department added!')
            setTimeout(function() {
                db.query('SELECT * FROM department', (err, res) => {
                if (err) throw err;
                console.table('\nAll Departments:', res)
                setTimeout(function() {
                    prompt();
                }, 1000);
            })
        }, 1000)
    })
});
};

function deleteDepartment() {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        const departments = res.map(({ name, id }) => ({ name: name, value: id }));
        inquirer.prompt([
            {
                name: 'dept',
                type: 'list',
                message: 'Which department would you like to delete?',
                choices: departments
            }
        ]).then(answer => {
            db.query('DELETE FROM department WHERE id = ?', answer.dept, (err) => {
                if (err) throw err;
                console.log('Department deleted!')
                setTimeout(function () {
                    db.query('SELECT * FROM department', (err, res) => {
                        if (err) throw err;
                        console.table('\nAll Departments:', res)
                        setTimeout(function () {
                            catalog();
                        }, 1000);
                    })
                }, 1000)
            })
        });
    })
};

// view employees by department 
function viewByDepartment() {
    const sql = `SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id ORDER BY employee.id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table('\nEmployees by Department:', res);
        setTimeout(function() {
            catalog();
        }, 1000);
    })
};

// view department budget 
function viewDepartmentBudget() {
    const sql = `SELECT department_id AS ID, department.name AS Department, SUM(salary) AS Budget FROM  role JOIN department ON role.department_id = department.id GROUP BY  department_id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table('\nDepartment Budgets:', res);
        setTimeout(function() {
            catalog();
        }, 1000)
    })
    
}

// All Employee functions. View, Add, Delete, view by manager

function viewEmployees() {
    db.query('SELECT * FROM employee', (err, res) => {
      if (err) throw err;
      console.table('\nAll Employees:', res);
      setTimeout(function () {
        catalog()
      }, 1000);
    })
  };
  
function addEmployee() {
inquirer.prompt([
    {
    name: 'first_name',
    type: 'input',
    message: "What is the employee's fist name? ",
    validate: first_nameInput => {
        if (first_nameInput) {
        return true;
        } else {
        console.log("Please enter employee's first name");
        return false;
        }
    }
    },
    {
    name: 'last_name',
    type: 'input',
    message: "What is the employee's last name? ",
    validate: last_nameInput => {
        if (last_nameInput) {
        return true;
        } else {
        console.log("Please enter employee's last name");
        return false;
        }
    }
    },
    {
    name: 'role_id',
    type: 'input',
    message: function () {
        console.log("\nWhat is employee's role ID number?\n")
        getRole();
    },
    default: NULL
    },
    {
    name: 'manager_id',
    type: 'input',
    message: function () {
        console.log("\nWhat is the employee's manager ID number? Leave blank or input NULL if manager.\n")
        getManager();
    },
    default: NULL
    },
])
    .then(answers => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
    const params = [answers.first_name, answers.last_name, answers.role_id, answers.manager_id];
    db.query(sql, params, (err) => {
        if (err) throw err;
        console.log('Your employee has been added!');
        console.table(answers);
        setTimeout(function () {
        catalog();
        }, 1000);
    })
    })
}

function deleteEmployee() {
db.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    const employees = res.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, value: id }));
    inquirer.prompt([
    {
        type: 'list',
        name: 'name',
        message: "Which employee would you like to delete?",
        choices: employees
    }
    ]).then(empChoice => {
    db.query('DELETE FROM employee WHERE id = ?', empChoice.name, (err) => {
        if (err) throw err;
        console.log("Successfully deleted!");
        setTimeout(function () {
        db.query('SELECT * FROM employee', (err, res) => {
            if (err) throw err;
            console.table('\nAll Employees:', res)
            setTimeout(function () {
            catalog();
            }, 1000);
        })
        }, 1000)
    })
    })
});
}

function viewByManager() {
getManager();
const sql = `SELECT employee.first_name, employee.last_name, employee.manager_id FROM employee ORDER BY employee.manager_id`;
db.query(sql, (err, res) => {
    if (err) throw err;
    console.table('\nEmployees by Manager:', res);
    setTimeout(function() {
        catalog();
    }, 1000);
})
};

// All role prompts (View =, Add, Delete)

function viewRoles() {
    db.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table('\nAll Roles:', res);
        setTimeout(function() {
            catalog();
        }, 1000);
    })
};

function addRole() {
    inquirer.prompt([
        {
            name: 'title',
            type: 'input',
            message: 'What is the role title?',
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log("Please enter the role title");
                    return false;
                }
            },
            default: NULL
        },
        {
            name: 'salary',
            type: 'input',
            message: "What is the role's salary?"
        },
        {
            name: 'department_id',
            type: 'input',
            message: function(){
                console.log("\nWhat is role's department ID number?\n")
                getDepartment();
            }
        }
    ]).then(answers => {
            db.query('INSERT INTO role SET?', { title: answers.title, salary: answers.salary, department_id: answers.department_id }, (err) => {
                if (err) throw err;
                console.log('Role added!')
                setTimeout(function() {
                    db.query('SELECT * FROM role', (err, res) => {
                    if (err) throw err;
                    console.table('\nAll Roles:', res)
                    setTimeout(function() {
                        catalog();
                    }, 1000);
                })
            }, 1000)
        })
    });
};

function deleteRole() {
    inquirer.prompt([
        {
            name: 'role_id',
            type: 'input',
            message: function(){
                console.log("\nWhat is the ID number of the role you would like to delete?\n")
                getRole();
            }
        }
    ]).then(answer => {
        db.query('DELETE FROM role WHERE id = ?', answer.role_id, (err) => {
            if (err) throw err;
            console.log("Role deleted!")
            setTimeout(function() {
                db.query('SELECT * FROM role', (err, res) => {
                if (err) throw err;
                console.table('\nAll Roles:', res)
                setTimeout(function() {
                    catalog();
                }, 1000);
            })
        }, 1000)
    })
})
}

// update and employee's role
function updateRole() {
    db.query('SELECT employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id', (err, res) => {
        if (err) throw err;
        console.table(res)
        inquirer.prompt([
            {
                name: 'first_name',
                type: 'list',
                message: "Select the employee's first name",
                choices: function() {
                    firstNames = [];
                    for (var e of res) {
                        firstNames.push(e.first_name)
                    }
                    return firstNames;
                }
            },
            {
                name: 'last_name',
                type: 'list',
                message: "Select the employee's last name",
                choices: function() {
                    lastNames = [];
                    for (var e of res) {
                        lastNames.push(e.last_name)
                    }
                    return lastNames;
                }
            },
            {
                name: 'role_id',
                type: 'input',
                message: function(){
                    console.log("\nWhat is the employee's new role ID number? Leave blank or input NULL if manager.")
                    getRole();
                },
                default: NULL
            }
        ]).then(answers => {
            const sql = `UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?`;
            const params = [answers.role_id, answers.first_name, answers.last_name]
            db.query(sql, params, (err) => {
                if (err) throw err;
                console.log("Employee role updated!");
                console.table(answers);
                setTimeout(function() {
                    catalog();
                }, 1000);
            })
        })
    });
}
// update and employee's manager 
function updateManager() {
    db.query('SELECT employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role ON employee.role_id = role.id', (err, res) => {
        if (err) throw err;
        console.table(res)
        inquirer.prompt([
            {
                name: 'first_name',
                type: 'list',
                message: "Select the employee's first name",
                choices: function() {
                    firstNames = [];
                    for (var e of res) {
                        firstNames.push(e.first_name)
                    }
                    return firstNames;
                }
            },
            {
                name: 'last_name',
                type: 'list',
                message: "Select the employee's last name",
                choices: function() {
                    lastNames = [];
                    for (var e of res) {
                        lastNames.push(e.last_name)
                    }
                    return lastNames;
                }
            },
            {
                name: 'manager_id',
                type: 'input',
                message: function() {
                    console.log("\nWhat is the employee's new manager ID number?\n")
                    getManager();
                },
                default: NULL
            }
        ]).then(answers => {
            const sql = `UPDATE employee SET manager_id = ? WHERE first_name = ? AND last_name = ?`;
            const params = [answers.manager_id, answers.first_name, answers.last_name]
            db.query(sql, params, (err) => {
                if (err) throw err;
                console.log("Employee manager updated!");
                console.table(answers);
                setTimeout(function() {
                    catalog();
                }, 1000);
            })
        })
    });
}
module.exports = catalog;
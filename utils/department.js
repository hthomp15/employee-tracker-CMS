const db = require('../config/connection');
const consoleTable = require('console.table');
const inquirer = require('inquirer');
const catalog = require('./prompts');

function viewDepartments() {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table('\nAll Departments:', res);
        setTimeout(function() {
           catalog();
        }, 2000);
    })
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
                        catalog();
                    }, 3000);
                })
            }, 2000)
        })
    });
};

// delete a department 
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
                        }, 3000);
                    })
                }, 2000)
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
        }, 2000);
    })
};

// view department budget 
function viewDepartmentBudget() {
    const sql = `SELECT department_id AS ID, department.name AS Department, SUM(salary) AS Budget FROM  role JOIN department ON role.department_id = department.id GROUP BY  department_id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table('\nDepartment Budgets:', res);
        setTimeout(function() {
            prompt();
        }, 2000)
    })
    
}

module.exports = { viewDepartments, addDepartment, deleteDepartment, viewByDepartment, viewDepartmentBudget};

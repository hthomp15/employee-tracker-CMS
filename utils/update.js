const db = require('../config/connection');
const consoleTable = require('console.table');
const inquirer = require('inquirer');
const catalog = require('./prompts');

const { getManager, getRole } = require('./helpers');

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
                }, 2000);
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
                }, 2000);
            })
        })
    });
}

module.exports = { updateManager, updateRole }
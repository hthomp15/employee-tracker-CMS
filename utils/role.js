const db = require('../config/connection');
const consoleTable = require('console.table');
const inquirer = require('inquirer');
const catalog = require('./prompts');

const getRole = require('./employee');


// view all roles 
function viewRoles() {
    db.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table('\nAll Roles:', res);
        setTimeout(function() {
            catalog();
        }, 2000);
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
                getDepartments();
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
                    }, 3000);
                })
            }, 2000)
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
                }, 3000);
            })
        }, 2000)
    })
})
}
module.exports = { viewRoles, addRole, deleteRole };
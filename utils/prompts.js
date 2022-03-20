const db = require('../config/connection');
const inquirer = require('inquirer');

// response handling 
const { viewDepartments, addDepartment, deleteDepartment, viewByDepartment, viewDepartmentBudget } = require('./department')
const { viewEmployees, addEmployee, deleteEmployee, viewByManager } = require('./employee');
const { updateRole, updateManager } = require('./update');
const { viewRoles, addRole, deleteRole } = require('./role');

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
function catalog() {
    inquirer.prompt([
        {
            name: 'choice',
            type: 'list',            message: 'What would you like to do?',
            choices: Object.keys(mainMenu),
        }
    ]).then (answer => {
        mainMenu[answer.choice]();
    })
}

module.exports = catalog;
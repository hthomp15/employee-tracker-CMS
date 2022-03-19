const inquirer = require('inquirer');

// Main menu and paths set up for emplpyee database. 

const catalog = ()=> {
    return inquirer.prompt({
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees', 
                'Add a Department', 
                'Add a Role', 
                'Add an Employee', 
                'Update an Employee Role',
                'Exit'
            ]
        }).then((input) => {
            switch (input.menu) {
                case 'View All Departments':
                    viewDepartments();
                    break;
                case 'View All Roles':
                    viewRoles();
                    break;
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'Add a Department':
                    addDepartment();
                    break;
                case 'Add a Role':
                    addRole();
                    break;
                case 'Add an Employee':
                    addEmployee();
                    break;
                case 'Update an Employee Role':
                    updateRole();
                    break;
                case 'Exit':
                    exitapp();
                    break;
            }
        })
}


function start() {
    console.log(`
    Welcome to the Employee Management System!
    `);
    return catalog();
}

start()
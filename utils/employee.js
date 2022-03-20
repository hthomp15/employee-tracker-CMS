const db = require('../config/connection');
const consoleTable = require('console.table');
const inquirer = require('inquirer');
const catalog = require('./prompts');

const { getManager, getRole } = require('./helpers');

function viewEmployees() {
  db.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    console.table('\nAll Employees:', res);
    setTimeout(function () {
      catalog()
    }, 2000);
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
        }, 2000);
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
            }, 3000);
          })
        }, 2000)
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
      }, 2000);
  })
};

module.exports = { viewEmployees, addEmployee, deleteEmployee, viewByManager };
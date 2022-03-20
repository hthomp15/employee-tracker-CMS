const db = require('../config/connection');
const consoleTable = require('console.table');


function getDepartment() {
    db.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        const departments = res.map(({ name, id }) => ({ name: name, id: id }))
        return console.table('\nDepartment IDs', departments)
    })
}

// get managers for adding employee
function getManager() {
    db.query('SELECT first_name, last_name, id FROM employee WHERE manager_id IS NULL', (err, res) => {
      if (err) throw err;
      const managers = res.map(({ id, first_name, last_name }) => ({ name: `${first_name} ${last_name}`, id: id }))
      return console.table('\nManager IDs', managers);
    });
  };
  
// get roles for adding employee
function getRole() {
db.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    const roles = res.map(({ id, title }) => ({ title: title, id: id }))
    return console.table('\nRole IDs:', roles);
});
};
  
module.exports = { getRole, getManager, getDepartment }

const db = require('./config/connection');
const catalog = require('./utils/prompts');

//connection
db.connect((err) => {
    if(err) throw err;
    console.log(`
    Welcome to the Employee Management System!
    `);
    return catalog();
});


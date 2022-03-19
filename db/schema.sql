DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;

CREATE TABLE employee (
    id: INTEGER AUTO_INCREMENT PRIMARY KEY,
	first_name: VARCHAR(30) NOT NULL,
	last_name: VARCHAR(30) NOT NULL,
	role_id: VARCHAR(30) INT NOT NULL,
	manager_id: INT
);

CREATE TABLE department (
    id: INTEGER PRIMARY KEY,
	name: VARCHAR(30) NOT NULL /* (department name) */
)

CREATE TABLE role (
    id: INTEGER AUTO_INCREMENT PRIMARY KEY,
	title: VARCHAR(30) NOT NULL,
	salary: DECIMAL,
	department_id: INTEGER, 
)
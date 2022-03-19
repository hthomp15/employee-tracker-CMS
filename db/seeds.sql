Insert INTO employees (id, first_name, last_name, role_id, manager_name)    
    VALUES 
        ('Haile', 'Thompson', 7, NULL),
        ('Lacey', 'Wisdom', 5, NULL),
        ('Austin', 'Jocobs', 1, 2),
        ('Whitney', 'Huston', 4, NULL),
        ('Koco', 'Withorn', 9, 1),
        ('Simba', 'Lawrence', 8, 1),
        ('Connnie' 'Kimm' 2, 2),
        ('Travon', 'Diggins', 6, 4)
        

INSERT INTO role(title, salary, department_id)
VALUES
('Salesperson', 80000, 1),
('Business Manager', 110000, 1),
('Marketing Manager', 80000, 2),
('Branding Executive', 140000, 2),
('Account Manager', 150000, 3),
('Accountant', 100000, 3),
('Senior Software Engineer', 200000, 4),
('Software Engineer', 120000, 4),
('Administrative Assistant', 60000, 5),
('Office Manager', 100000, 5);

   
INSERT INTO department(name)
VALUES
('Sales'),
('Marketing'),
('Accounting'),
('Engineering'),
('Administration');
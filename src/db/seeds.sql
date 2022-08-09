INSERT INTO department (name)
VALUES ("Finance"), ("Marketing"), ("Sales"), ("Operations"), ("Research & Development"),("Human Resources");

INSERT INTO role (title, salary, department_id) 
VALUES ("Accountant", "55000", 1), ("Accounting Manager", "75000", 1), ("Auditor", '45000', 1), ("Tax Specialist", "43000", 1), ("Marketing Analyst", "52000", 2), ("Marketing Director", "75000", 2), ("Marketing Consultant", '45000', 2), ("Social Media Promoter", "41000", 2), ("Sales Manager", "150000", 3), ("Sales Analyst", "56000", 3), ("Sales Consultant", '45000', 3), ("Sales Assistant", "47000", 3), ("Operations Officer", '41000', 4), ("Operations Manager", "140000", 4), ("R&D Manager", '145000', 5), ("R&D Researcher", "100000", 5), ("Head Recruiter", '65000', 6), ("HR Admin", "50000", 6);
-- Insert Managers first
INSERT employee (first_name, last_name, role_id)
VALUES ("Peter", "Doe", 2), ("Jerry", "Loughborough", 6), ("Heidi", "Patel", 9), ("Danielle", "Collingwood", 14), ("Jie", "Xixin", 15), ("Michelle", "Watson", 17);
-- Insert employees second
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 1), ("Sandra", "Williams", 3, 1), ("Tony", "Stark", 4, 1), ("Michael", "Berry", 5, 2), ("Emma", "Headley", 7, 2), ("Jack", "Frost", 8, 2), ("Jack", "Dean", 10, 3), ("Sarah", "Loomley", 11, 3), ("Jackie", "Nickels", 12, 3), ("Martin", "Wood", 13, 4), ("Danny", "Lee", 16, 5), ("Tom", "Reynolds", 18, 6);
const { Client } = require('pg');
const inquirer = require('inquirer');

const client = new Client({
  user: '',
  host: 'localhost',
  database: 'department_db',
  password: 'daisy',
  port: 3001,
});

client.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Connection error', err.stack));

  function tracker() {
    inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View All Employees',
          'Add Employee',
          'Update Employee Role',
          'View All Roles',
          'Add Role',
          'View All Departments',
          'Add Department',
          'Exit'
        ]
      }
    ]).then((answers) => {
      switch (answers.action) {
        case 'View all Employees':
        viewEmployees();
        break;
        case 'Add Employee':
        addEmployee();
        break;
        case 'Update Employee Role':
        updateEmployeeRole();
        break;
        case 'View All Roles':
        viewRoles();
        break;
        case 'Add Role':
        addRole();
        break;
        case 'View All Departments':
        viewDepartments();
        break;
        case 'Add Department':
        addDepartment();
        break;
        default:
          client.end();
          break;
      }
    });
  }

// TODO: VIEW EOMPLOYEES
function viewEmployees() {
    const query = `
      SELECT employees.*, roles.title AS job_title, roles.salary, departments.name AS department_name,
      CONCAT(managers.first_name, ' ', managers.last_name) AS manager_name
      FROM employees
      LEFT JOIN roles ON employees.role_id = roles.id
      LEFT JOIN departments ON roles.department_id = departments.id
      LEFT JOIN employees managers ON employees.manager_id = managers.id;
    `;
    client.query(query, (err, res) => {
      if (err) {
        console.error('Query error', err.stack);
      } else {
        console.table(res.rows);
        start();
      }
    });
  }
  

//TODO: ADD EMPLOYEE
  function addEmployee(){
  
}
  
//TODO: UPDATE EMPLOYEE ROLE
  function updateEmployeeRole(){
      
}

// TODO: VIEW ROLES
function viewRoles(){
    
}

// TODO: ADD ROLE
function addRole(){
    
}

// TODO: VIEW DEPARTMENTS
function viewDepartments(){
    
}

// TODO: ADD DEPARTMENT
function addDepartment(){
    
}

tracker();

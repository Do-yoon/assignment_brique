// Import required module
const mysql = require('mysql');

// Database connection configuration
const connection = mysql.createConnection({
    host: 'codingtest.brique.kr',
    user: 'codingtest',
    password: '12brique!@',
    database: 'employees'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err.stack);
        return;
    }
    console.log('Connected to database as id', connection.threadId);

    // SQL query to retrieve employee information
    const sqlQuery = `
        SELECT e.emp_no, e.first_name, e.last_name, e.gender, DATE_FORMAT(e.hire_date, '%Y-%m-%d') AS hire_date,
               d.dept_name, t.title, MAX(s.salary) AS max_salary
        FROM employees e
            JOIN dept_emp de ON e.emp_no = de.emp_no
            JOIN departments d ON de.dept_no = d.dept_no
            JOIN titles t ON e.emp_no = t.emp_no
            JOIN salaries s ON e.emp_no = s.emp_no
        WHERE e.hire_date >= '2000-01-01'
        GROUP BY e.emp_no, e.first_name, e.last_name, e.gender, e.hire_date, d.dept_name, t.title
    `;

    // Execute the query
    connection.query(sqlQuery, (error, results, fields) => {
        if (error) {
            console.error('Error executing query:', error);
            throw error;
        }

        // Print the results in a table format
        console.log('+--------+--------------+---------------+--------+------------+----------------------+--------------+-------------+');
        console.log('| emp_no | first_name   | last_name     | gender | hire_date  | dept_name            | title        | max_salary  |');
        console.log('+--------+--------------+---------------+--------+------------+----------------------+--------------+-------------+');

        results.forEach((row) => {
            console.log(`| ${row.emp_no} | ${row.first_name.padEnd(12)} | ${row.last_name.padEnd(12)} | ${row.gender}      | ${row.hire_date} | ${row.dept_name.padEnd(20)} | ${row.title.padEnd(12)} | ${row.max_salary.toString().padEnd(11)} |`);
        });

        console.log('+--------+--------------+---------------+--------+------------+----------------------+--------------+-------------+');

        // Close the connection
        connection.end((err) => {
            if (err) {
                console.error('Error closing connection:', err.stack);
                return;
            }
            console.log('Connection closed.');
        });
    });
});

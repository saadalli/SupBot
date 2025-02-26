const mysql = require('mysql2/promise')

// Create a connection pool for better performance
// const mySqlPool = mysql.createPool({
//     host: 'sql12.freesqldatabase.com', // Replace with your host
//     user: 'sql12760928',
//     password: 'b6xc2iKnWJ',
//     database: 'sql12760928',
//     waitForConnections: true,
//     connectionLimit: 10,  // Adjust based on need
//     queueLimit: 0
// });
const mySqlPool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'habibahmed5634',
    database:'chat-bot',
});
// Test the database connection



module.exports = mySqlPool 
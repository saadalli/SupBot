const db = require('../config/db'); // Import your database connection



const createTables = async () => {
    try {

         //Users Table
         await db.query(`
            CREATE TABLE IF NOT EXISTS Users (
                user_id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );`
        )

         //Task Table
         await db.query(`
            CREATE TABLE IF NOT EXISTS Tasks (
                task_id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                due_date DATETIME NOT NULL,
                status ENUM('pending', 'completed') DEFAULT 'pending',
                user_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
            );`
        )
         //Reminders Table
         await db.query(`
            CREATE TABLE IF NOT EXISTS Reminder (
                reminder_id INT AUTO_INCREMENT PRIMARY KEY,
                task_id INT NOT NULL,
                reminder_date DATETIME NOT NULL,
                status ENUM('pending', 'sent') DEFAULT 'pending',
                user_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (task_id) REFERENCES Tasks(task_id) ON DELETE CASCADE,
                FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
            );`
        )
         //Faqs Table
         await db.query(`
            CREATE TABLE IF NOT EXISTS Faqs (
                faq_id INT AUTO_INCREMENT PRIMARY KEY,
                question TEXT NOT NULL,
                answer TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );`
        )
       
        console.log("Table Has been created")

    } catch (error) {
        console.error('Error creating tables:', error);
    }
}

module.exports = { createTables }
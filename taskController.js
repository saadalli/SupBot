const db = require('../config/db'); // Import your database connection



// Create a new task
const createTask = async (req, res) => {
    try {
      const { title, description, due_date } = req.body;
      const user_id = req.user.id; // Get user ID from the authenticated token
  
      // Validate required fields
      if (!title || !description || !due_date) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }
  
      // Insert the task into the Tasks table
      const insertTaskQuery = `
        INSERT INTO tasks (title, description, due_date, user_id)
        VALUES (?, ?, ?, ?);
      `;
      const [result] = await db.query(insertTaskQuery, [title, description, due_date, user_id]);
  
      res.status(201).json({ success: true, message: "Task created successfully", taskId: result.insertId });
    } catch (error) {
      console.error("Error creating task:", error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  };

// Get all tasks for the logged-in user
const getTasks = async (req, res) => {
    try {
      const user_id = req.user.id; // Get user ID from the authenticated token
  
      const sql = 'SELECT * FROM tasks WHERE user_id = ?';
      const [results] = await db.query(sql, [user_id]);
  
      res.status(200).json({ success: true, tasks: results });
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  };

// Update a task
const updateTask = async (req, res) => {
    try {
      const { id, title, description, due_date, status } = req.body;
      const user_id = req.user.id; // Get user ID from the authenticated token
  
      // Validate required fields
      if (!id || !title || !description || !due_date || !status) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }
  
      const sql = 'UPDATE tasks SET title = ?, description = ?, due_date = ?, status = ? WHERE id = ? AND user_id = ?';
      const [result] = await db.query(sql, [title, description, due_date, status, id, user_id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Task not found or unauthorized" });
      }
  
      res.status(200).json({ success: true, message: "Task updated successfully" });
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  };

// Delete a task
const deleteTask = async (req, res) => {
    try {
      const { id } = req.body;
      const user_id = req.user.id; // Get user ID from the authenticated token
  
      // Validate required fields
      if (!id) {
        return res.status(400).json({ success: false, message: "Task ID is required" });
      }
  
      const sql = 'DELETE FROM tasks WHERE id = ? AND user_id = ?';
      const [result] = await db.query(sql, [id, user_id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Task not found or unauthorized" });
      }
  
      res.status(200).json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  };
module.exports ={
    createTask,
    getTasks,
    updateTask,
    deleteTask
}
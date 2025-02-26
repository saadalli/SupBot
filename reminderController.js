
const db = require('../config/db'); // Import your database connection
// Create a new reminder
exports.createReminder = async (req, res) => {
    try {
      const { task_id, reminder_date } = req.body;
      const user_id = req.user.id; // Get user ID from the authenticated token
  
      // Validate required fields
      if (!task_id || !reminder_date) {
        return res.status(400).json({ success: false, message: "Task ID and reminder date are required" });
      }
  
      const sql = 'INSERT INTO reminder (task_id, reminder_date, user_id) VALUES (?, ?, ?)';
      const [result] = await db.query(sql, [task_id, reminder_date, user_id]);
  
      res.status(201).json({ success: true, message: "Reminder created successfully", reminderId: result.insertId });
    } catch (error) {
      console.error("Error creating reminder:", error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  };

// Get all reminders for the logged-in user
exports.getReminders = async (req, res) => {
    try {
      const user_id = req.user.id; // Get user ID from the authenticated token
  
      const sql = 'SELECT * FROM reminder WHERE user_id = ?';
      const [results] = await db.query(sql, [user_id]);
  
      res.status(200).json({ success: true, reminders: results });
    } catch (error) {
      console.error("Error fetching reminders:", error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  };

// Update a reminder
exports.updateReminder = async (req, res) => {
    try {
      const { id, reminder_date, status } = req.body;
      const user_id = req.user.id; // Get user ID from the authenticated token
  
      // Validate required fields
      if (!id || !reminder_date || !status) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }
  
      const sql = 'UPDATE reminder SET reminder_date = ?, status = ? WHERE id = ? AND user_id = ?';
      const [result] = await db.query(sql, [reminder_date, status, id, user_id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Reminder not found or unauthorized" });
      }
  
      res.status(200).json({ success: true, message: "Reminder updated successfully" });
    } catch (error) {
      console.error("Error updating reminder:", error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  };

// Delete a reminder
exports.deleteReminder = async (req, res) => {
    try {
      const { id } = req.body;
      const user_id = req.user.id; // Get user ID from the authenticated token
  
      // Validate required fields
      if (!id) {
        return res.status(400).json({ success: false, message: "Reminder ID is required" });
      }
  
      const sql = 'DELETE FROM reminder WHERE id = ? AND user_id = ?';
      const [result] = await db.query(sql, [id, user_id]);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Reminder not found or unauthorized" });
      }
  
      res.status(200).json({ success: true, message: "Reminder deleted successfully" });
    } catch (error) {
      console.error("Error deleting reminder:", error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  };

const db = require('../config/db'); // Import your database connection
// Create a new FAQ
exports.createFAQ = async (req, res) => {
    try {
      const { question, answer } = req.body;
  
      // Validate required fields
      if (!question || !answer) {
        return res.status(400).json({ success: false, message: "Question and answer are required" });
      }
  
      const sql = 'INSERT INTO faqs (question, answer) VALUES (?, ?)';
      const [result] = await db.query(sql, [question, answer]);
  
      res.status(201).json({ success: true, message: "FAQ created successfully", faqId: result.insertId });
    } catch (error) {
      console.error("Error creating FAQ:", error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  };

// Get all FAQs
exports.getFAQs = async (req, res) => {
    try {
      const sql = 'SELECT * FROM faqs';
      const [results] = await db.query(sql);
  
      res.status(200).json({ success: true, faqs: results });
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      res.status(500).json({ success: false, message: "Server error", error });
    }
  };
const express = require('express');
const { signupUser, loginUser } = require('../controllers/authController');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const { createReminder, getReminders, updateReminder, deleteReminder } = require('../controllers/reminderController');
const { createFAQ, getFAQs } = require('../controllers/faqsController');
const isAuthenticated = require('../midlewares/authMiddleware');
const { getChatbotResponse } = require('../config/chatbot');
const router = express.Router();


// User routes
router.post('/signup', signupUser);
router.post('/login', loginUser);

// Task routes (protected by authentication)
router.post('/tasks', isAuthenticated, createTask);
router.get('/tasks', isAuthenticated, getTasks);
router.put('/tasks', isAuthenticated, updateTask);
router.delete('/tasks', isAuthenticated, deleteTask);

// Reminder routes (protected by authentication)
router.post('/reminders', isAuthenticated, createReminder);
router.get('/reminders', isAuthenticated, getReminders);
router.put('/reminders', isAuthenticated, updateReminder);
router.delete('/reminders', isAuthenticated, deleteReminder);

// FAQ routes (public)
router.post('/faqs', createFAQ);
router.get('/faqs', getFAQs);


router.post('/chatbot',async (req, res) => {
    const { prompt } = req.body;
  
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
  
    try {
      const chatbotResponse = await getChatbotResponse(prompt);
      res.status(200).json({ response: chatbotResponse });
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      res.status(500).json({ error: 'Failed to fetch chatbot response' });
    }
  });

module.exports = router;
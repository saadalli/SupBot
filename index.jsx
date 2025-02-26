'use client'
import { useState } from 'react';
import axios from 'axios';

export default function CreateReminderForm({ onReminderCreated }) {
  const [taskId, setTaskId] = useState('');
  const [reminderDate, setReminderDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:8080/api/v1/user/reminders',
        { task_id: taskId, reminder_date: reminderDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onReminderCreated();
      setTaskId('');
      setReminderDate('');
    } catch (error) {
      console.error('Error creating reminder:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Create Reminder</h2>
      <input
        type="number"
        placeholder="Task ID"
        value={taskId}
        onChange={(e) => setTaskId(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="datetime-local"
        value={reminderDate}
        onChange={(e) => setReminderDate(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Create Reminder
      </button>
    </form>
  );
}
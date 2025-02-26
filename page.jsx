'use client'
import MainLayout from '@/app/components/MainLayout';
import { useState } from 'react';

export default function Chatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to the chat
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setInput('');

    // Fetch chatbot response from Node.js backend
    const response = await fetch('http://localhost:8080/api/v1/user/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: input }),
    });

    if (response.ok) {
      const data = await response.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
    } else {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Failed to fetch response.' }]);
    }
  };

  return (
    <MainLayout >
      <div className="h-[80vh] overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-100 ml-auto' : 'bg-gray-100 mr-auto'}`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 p-2 border rounded-l-lg"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </MainLayout>
  );
}
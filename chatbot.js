const OpenAI = require('openai');

// Initialize OpenAI instance
const openai = new OpenAI({
  apiKey:"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", // Store your API key in environment variables
});

async function getChatbotResponse(prompt) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // Use the GPT-3.5 Turbo model
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 150, // Limit the response length
        temperature: 0.7, // Control creativity (0 = deterministic, 1 = creative)
      });
  
      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      return 'Sorry, I am unable to respond at the moment.';
    }
}

module.exports = { getChatbotResponse };
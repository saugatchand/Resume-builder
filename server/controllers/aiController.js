import axios from 'axios';

// Initialize context/setup for OpenAI API via Axios
export const generateSummary = async (req, res) => {
  try {
    const { position, experience, skills } = req.body;
    const prompt = `Write a professional resume summary for a ${position} with ${experience} years of experience and the following skills: ${skills.join(', ')}. Keep it under 4 sentences.`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const summary = response.data.choices[0].message.content.trim();
    res.json({ result: summary });
  } catch (error) {
    console.error('AI Error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to generate summary' });
  }
};

export const improveBulletPoints = async (req, res) => {
  try {
    const { text } = req.body;
    const prompt = `Rewrite the following resume work experience description to be more professional, action-oriented, and impactful:\n"${text}"`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const improvedText = response.data.choices[0].message.content.trim();
    res.json({ result: improvedText });
  } catch (error) {
    console.error('AI Error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to improve bullet point' });
  }
};

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Endpoint to list available Gemini models
app.get('/api/list-models', async (req, res) => {
  try {
    const response = await axios.get(`https://generativelanguage.googleapis.com/v1/models?key=${GEMINI_API_KEY}`);
    res.json(response.data);
  } catch (error) {
    console.error('Gemini ListModels error:', error?.response?.data || error.message);
    res.status(500).json({ error: error?.response?.data?.error?.message || error.message || 'Failed to list Gemini models.' });
  }
});

app.post('/api/check-symptoms', async (req, res) => {
  const { symptoms, gender, severity, duration } = req.body;
  if (!symptoms || !gender || !severity || !duration) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  const prompt = `Based on these symptoms: ${symptoms}, gender: ${gender}, severity: ${severity}, duration: ${duration}, suggest possible conditions and next steps with educational disclaimer.`;
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );
    const result = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';
    res.json({ result });
  } catch (error) {
    console.error('Gemini API error:', error?.response?.data || error.message);
    res.status(500).json({ error: error?.response?.data?.error?.message || error.message || 'Failed to get response from Gemini.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

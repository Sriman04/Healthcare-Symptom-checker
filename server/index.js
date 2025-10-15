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
  console.log('Received request:', req.body);
  
  const { symptoms, gender, severity, duration, age } = req.body;
  if (!symptoms || !gender || !severity || !duration) {
    console.log('Missing required fields');
    return res.status(400).json({ error: 'All required fields must be provided.' });
  }
  
  const ageInfo = age ? `, age: ${age}` : '';
  const prompt = `As a healthcare AI assistant, analyze these symptoms and provide educational information:

Symptoms: ${symptoms}
Gender: ${gender}
Severity: ${severity}
Duration: ${duration}${ageInfo}

Please provide:
1. **Symptom Summary**: Brief overview of the reported symptoms
2. **Possible Conditions**: List potential conditions that could cause these symptoms (for educational purposes only)
3. **Recommended Next Steps**: What the person should consider doing
4. **When to Seek Immediate Care**: Signs that require urgent medical attention

Important: Include a clear disclaimer that this is for educational purposes only and not a substitute for professional medical diagnosis or treatment.`;

  console.log('Making API call to Gemini...');
  
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048
        }
      }
    );
    console.log('Gemini API response received');
    const result = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';
    res.json({ result });
  } catch (error) {
    console.error('Gemini API error:', error?.response?.data || error.message);
    const errorMessage = error?.response?.data?.error?.message || error.message || 'Failed to get response from Gemini.';
    res.status(500).json({ error: errorMessage, message: 'Unable to process your request. Please try again later.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

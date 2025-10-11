# Healthcare Symptom Checker

A full-stack web application for educational healthcare symptom checking.

## Features
- Input symptoms, gender, severity, and duration
- Backend API queries LLM (OpenAI) for probable conditions and recommendations
- Attractive, modern React frontend
- Safety disclaimer included in all results
- API key stored securely in `.env` (never exposed to frontend)

## Setup Instructions

### 1. Clone the repository

```
git clone <your-repo-url>
cd Unthinkable
```

### 2. Backend Setup

```
cd server
npm install
```
- Create a `.env` file in `server` folder:
  ```
  OPENAI_API_KEY=your_openai_api_key_here
  ```
- Start backend:
  ```
  npm start
  ```

### 3. Frontend Setup

```
cd ../client
npm install
npm start
```
- The frontend runs on [http://localhost:3000](http://localhost:3000)
- The backend runs on [http://localhost:5000](http://localhost:5000)

## Usage
- Enter your symptoms, gender, severity, and duration
- Click Submit to get possible conditions and next steps
- **Disclaimer:** This tool is for educational purposes only and does not constitute medical advice. Always consult a healthcare professional.

## Demo Video
- (Add your demo video link here)

## License
MIT

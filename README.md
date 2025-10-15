# 🏥 Healthcare Symptom Checker

A modern, AI-powered healthcare symptom checker application built with React and Node.js, featuring an intuitive UI and professional medical-grade design.

## ✨ Features

- **🤖 AI-Powered Analysis**: Uses Google's Gemini AI for intelligent symptom analysis
- **🎨 Modern UI/UX**: Professional healthcare interface with glass morphism effects
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🔍 Progressive Form**: Step-by-step symptom collection with real-time validation
- **📊 Visual Feedback**: Progress indicators and interactive severity selectors
- **🔒 Privacy-Focused**: No personal data stored, educational purposes only
- **⚡ Real-time Validation**: Instant feedback and error handling

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern JavaScript library for building user interfaces
- **React Router** - Client-side routing
- **Axios** - HTTP client for API communication
- **CSS3** - Advanced styling with animations and responsive design

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Web application framework
- **Google Gemini AI** - Advanced language model for medical analysis
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Google Gemini AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sriman04/Healthcare-Symptom-checker.git
   cd Healthcare-Symptom-checker
   ```

2. **Set up the backend**
   ```bash
   cd server
   npm install
   
   # Create environment file
   cp .env.example .env
   
   # Edit .env and add your Gemini API key
   # GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **Set up the frontend**
   ```bash
   cd ../client
   npm install
   
   # Create environment file (optional)
   cp .env.example .env
   ```

4. **Get Gemini AI API Key**
   - Go to [Google AI Studio](https://ai.google.dev/)
   - Create a new project or use existing one
   - Generate an API key
   - Add it to `server/.env` file

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm start
   # Server will run on http://localhost:5000
   ```

2. **Start the frontend application**
   ```bash
   cd client
   npm start
   # Application will open at http://localhost:3000
   ```

3. **Access the application**
   - Open your browser and navigate to `http://localhost:3000`
   - Fill out the symptom form with your health concerns
   - Get AI-powered analysis and recommendations

## 📝 Usage

1. **Home Page**: Welcome screen with feature overview
2. **Symptom Form**: Enter detailed symptom information:
   - Describe symptoms in detail
   - Specify age and gender
   - Select severity level (Mild/Moderate/Severe)
   - Indicate duration of symptoms
3. **Analysis Results**: Receive comprehensive AI analysis including:
   - Symptom summary
   - Possible conditions
   - Recommended next steps
   - When to seek immediate care

## 🔧 Project Structure

```
Healthcare-Symptom-checker/
├── client/                 # React frontend application
│   ├── public/            # Static assets
│   ├── src/               # React components and styles
│   │   ├── App.js         # Main application component
│   │   ├── App.css        # Application styles
│   │   └── index.js       # Application entry point
│   ├── .env.example       # Environment variables template
│   └── package.json       # Frontend dependencies
├── server/                # Node.js backend application
│   ├── index.js           # Express server and API routes
│   ├── .env.example       # Server environment template
│   └── package.json       # Backend dependencies
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
```

## 🎨 UI/UX Features

- **Glass Morphism Design**: Modern translucent effects
- **Progressive Disclosure**: Information revealed step-by-step
- **Visual Hierarchy**: Clear organization of content
- **Interactive Elements**: Hover effects and smooth transitions
- **Accessibility**: Screen reader friendly, keyboard navigation
- **Error Handling**: User-friendly error messages and validation

## 🔒 Privacy & Disclaimer

**⚠️ IMPORTANT MEDICAL DISCLAIMER**

This application is for **educational purposes only** and does **NOT** constitute medical advice, diagnosis, or treatment. The AI-generated responses are based on general medical knowledge and should not replace professional medical consultation.

**Always consult with qualified healthcare professionals for:**
- Medical diagnosis
- Treatment decisions
- Emergency situations
- Serious or persistent symptoms

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
cd client
npm run build
# Deploy the build/ directory
```

### Backend (Heroku/Railway)
```bash
cd server
# Set GEMINI_API_KEY environment variable
# Deploy to your preferred platform
```

## 🛡️ Security

- Environment variables for sensitive data
- No storage of personal health information
- CORS configuration for secure API access
- Input validation and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powerful language processing
- React community for excellent documentation
- Medical professionals who inspire better healthcare technology

## 📞 Support

If you encounter any issues or have questions:
1. Check the existing [Issues](https://github.com/Sriman04/Healthcare-Symptom-checker/issues)
2. Create a new issue with detailed description
3. Include steps to reproduce any bugs

---

**Made with ❤️ for better healthcare accessibility**

## Demo Video
- (Add your demo video link here)

## License
MIT

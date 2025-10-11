
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Floating Particles Component
const FloatingParticles = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    animationDelay: Math.random() * 6,
    animationDuration: Math.random() * 10 + 10
  }));

  return (
    <div className="particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.animationDelay}s`,
            animationDuration: `${particle.animationDuration}s`
          }}
        />
      ))}
    </div>
  );
};

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Add staggered animation delays for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.2}s`;
    });
  }, []);

  const handleStartAnalysis = () => {
    navigate('/form');
  };

  return (
    <div className="landing-page">
      <FloatingParticles />
      <div className="landing-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
        
        <div className="landing-content">
          <div className="title-container">
            <h1 className="animated-title">
              <span className="title-line">Healthcare</span>
              <span className="title-line">Symptom</span>
              <span className="title-line">Checker</span>
            </h1>
            <div className="title-decoration">
              <div className="pulse-circle"></div>
              <div className="pulse-circle pulse-delay-1"></div>
              <div className="pulse-circle pulse-delay-2"></div>
            </div>
          </div>
          
          <p className="landing-subtitle">
            AI-powered health insights at your fingertips
          </p>
          
          <div className="cta-container">
            <button className="start-analysis-btn" onClick={handleStartAnalysis}>
              <span className="btn-icon">🔍</span>
              Start Analysis
              <span className="btn-arrow">→</span>
            </button>
          </div>
          
          <div className="features-preview">
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span>Instant Analysis</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🤖</span>
              <span>AI-Powered</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔒</span>
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
        
        <footer className="landing-footer">
          <div className="disclaimer-card">
            <div className="disclaimer-icon">⚠️</div>
            <div className="disclaimer-content">
              <h3>Important Medical Disclaimer</h3>
              <p>This tool is for educational purposes only and does not constitute medical advice. Always consult a healthcare professional for medical concerns.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function SymptomForm({ setResult }) {
  const [form, setForm] = useState({
    symptoms: '',
    gender: '',
    severity: '',
    duration: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${apiUrl}/api/check-symptoms`, form);
      setResult(res.data.result);
      navigate('/result');
    } catch (err) {
      setError('Failed to get response. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">
            <span className="brand-icon">🏥</span>
            <span className="brand-text">Healthcare Symptom Checker</span>
          </div>
          <div className="navbar-subtitle">Get AI-powered insights for your health concerns</div>
        </div>
      </nav>
      
      <div className="home-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>

        <main className="home-main">
          <div className="form-container">
            <div className="form-header">
              <h2>📋 Tell us about your symptoms</h2>
              <p>Please provide detailed information for accurate analysis</p>
            </div>
            
            <form className="modern-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <label className="input-label">
                  <span className="label-icon">📝</span>
                  Symptoms Description
                </label>
                <textarea 
                  name="symptoms" 
                  value={form.symptoms} 
                  onChange={handleChange} 
                  required 
                  placeholder="Describe your symptoms in detail... (e.g., persistent cough, fever, headache)"
                  className="modern-textarea"
                />
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label className="input-label">
                    <span className="label-icon">👤</span>
                    Gender
                  </label>
                  <select 
                    name="gender" 
                    value={form.gender} 
                    onChange={handleChange} 
                    required
                    className="modern-select"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="input-group">
                  <label className="input-label">
                    <span className="label-icon">⚡</span>
                    Severity Level
                  </label>
                  <select 
                    name="severity" 
                    value={form.severity} 
                    onChange={handleChange} 
                    required
                    className="modern-select"
                  >
                    <option value="">Select Severity</option>
                    <option value="mild">🟢 Mild</option>
                    <option value="moderate">🟡 Moderate</option>
                    <option value="severe">🔴 Severe</option>
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">
                  <span className="label-icon">⏰</span>
                  Duration
                </label>
                <input 
                  name="duration" 
                  value={form.duration} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g., 3 days, 1 week, 2 hours"
                  className="modern-input"
                />
              </div>

              <button type="submit" disabled={loading} className="submit-button">
                {loading ? (
                  <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <span className="loading-text">Analyzing Symptoms...</span>
                  </div>
                ) : (
                  <>
                    <span className="button-icon">🔍</span>
                    Analyze Symptoms
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}
          </div>
        </main>

        <footer className="home-footer">
          <div className="disclaimer-card">
            <div className="disclaimer-icon">⚠️</div>
            <div className="disclaimer-content">
              <h3>Important Medical Disclaimer</h3>
              <p>This tool is for educational purposes only and does not constitute medical advice. Always consult a healthcare professional for medical concerns.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function ResultPage({ result }) {
  // Parse and format the result for better display
  const formatResult = (text) => {
    if (!text) return '';
    
    // Split the text into sections
    const sections = text.split('###').filter(section => section.trim());
    
    return sections.map((section, index) => {
      const lines = section.trim().split('\n');
      const title = lines[0].replace(/\*\*/g, '').trim();
      const content = lines.slice(1).join('\n').trim();
      
      if (title.toLowerCase().includes('disclaimer')) {
        return (
          <div key={index} className="disclaimer-section">
            <h3>⚠️ {title}</h3>
            <p>{content.replace(/\*\*/g, '')}</p>
          </div>
        );
      }
      
      if (title.toLowerCase().includes('summary')) {
        return (
          <div key={index} className="summary-section">
            <h3>📋 {title}</h3>
            <div className="summary-content">
              {content.split('\n').map((line, i) => {
                if (line.trim().startsWith('*')) {
                  const cleanLine = line.replace(/\*/g, '').replace(/\*\*/g, '').trim();
                  return <div key={i} className="summary-item">• {cleanLine}</div>;
                }
                return line.trim() ? <p key={i}>{line.replace(/\*\*/g, '')}</p> : null;
              })}
            </div>
          </div>
        );
      }
      
      if (title.toLowerCase().includes('possible conditions')) {
        return (
          <div key={index} className="conditions-section">
            <h3>🏥 {title}</h3>
            <div className="conditions-content">
              {content.split('\n').map((line, i) => {
                if (line.trim().match(/^\d+\./)) {
                  const parts = line.split(':');
                  const conditionName = parts[0].replace(/\*\*/g, '').trim();
                  const description = parts.slice(1).join(':').replace(/\*\*/g, '').trim();
                  return (
                    <div key={i} className="condition-item">
                      <strong>{conditionName}</strong>
                      {description && <p>{description}</p>}
                    </div>
                  );
                }
                return line.trim() ? <p key={i}>{line.replace(/\*\*/g, '')}</p> : null;
              })}
            </div>
          </div>
        );
      }
      
      if (title.toLowerCase().includes('next steps') || title.toLowerCase().includes('recommended')) {
        return (
          <div key={index} className="steps-section">
            <h3>📝 {title}</h3>
            <div className="steps-content">
              {content.split('\n').map((line, i) => {
                if (line.trim().match(/^\d+\./)) {
                  return <div key={i} className="step-item">{line.replace(/\*\*/g, '')}</div>;
                }
                if (line.trim().startsWith('*')) {
                  return <div key={i} className="sub-step">• {line.replace(/\*/g, '').trim()}</div>;
                }
                return line.trim() ? <p key={i}>{line.replace(/\*\*/g, '')}</p> : null;
              })}
            </div>
          </div>
        );
      }
      
      return (
        <div key={index} className="general-section">
          <h3>{title}</h3>
          <p>{content.replace(/\*\*/g, '')}</p>
        </div>
      );
    });
  };

  return (
    <div className="result-page">
      <header className="result-header">
        <div className="header-content">
          <h1>🏥 Healthcare Symptom Checker</h1>
          <button className="back-btn" onClick={() => window.history.back()}>
            ← Back to Form
          </button>
        </div>
      </header>
      
      <main className="result-main">
        <div className="result-container">
          <h2 className="result-title">📊 Analysis Results</h2>
          <div className="result-sections">
            {formatResult(result)}
          </div>
        </div>
      </main>
      
      <footer className="result-footer">
        <div className="footer-warning">
          <p>⚠️ <strong>Important:</strong> This tool is for educational purposes only and does not constitute medical advice. Always consult a healthcare professional for medical concerns.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  const [result, setResult] = useState('');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<SymptomForm setResult={setResult} />} />
        <Route path="/result" element={<ResultPage result={result} />} />
      </Routes>
    </Router>
  );
}

export default App;


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
        
        <div className="disclaimer-top-right">
          <div className="disclaimer-card">
            <div className="disclaimer-icon">⚠️</div>
            <div className="disclaimer-content">
              <h3>Important Medical Disclaimer</h3>
              <p>This tool is for educational purposes only and does not constitute medical advice. Always consult a healthcare professional for medical concerns.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SymptomForm({ setResult }) {
  const [form, setForm] = useState({
    symptoms: '',
    gender: '',
    severity: '',
    duration: '',
    age: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors({ ...validationErrors, [name]: '' });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!form.symptoms.trim()) {
      errors.symptoms = 'Please describe your symptoms';
    } else if (form.symptoms.trim().length < 10) {
      errors.symptoms = 'Please provide more detailed description (at least 10 characters)';
    }
    
    if (!form.gender) {
      errors.gender = 'Please select your gender';
    }
    
    if (!form.severity) {
      errors.severity = 'Please select symptom severity';
    }
    
    if (!form.duration.trim()) {
      errors.duration = 'Please specify duration';
    }
    
    if (!form.age.trim()) {
      errors.age = 'Please enter your age';
    } else if (isNaN(form.age) || form.age < 1 || form.age > 120) {
      errors.age = 'Please enter a valid age between 1 and 120';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      console.log('Submitting to:', `${apiUrl}/api/check-symptoms`);
      console.log('Form data:', form);
      
      const res = await axios.post(`${apiUrl}/api/check-symptoms`, form, {
        timeout: 30000, // 30 second timeout
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response received:', res.data);
      setResult(res.data.result);
      navigate('/result');
    } catch (err) {
      console.error('API Error:', err);
      
      let errorMessage = 'Failed to get response. Please try again.';
      
      if (err.code === 'ECONNREFUSED' || err.code === 'ERR_NETWORK') {
        errorMessage = 'Unable to connect to the server. Please make sure the server is running on port 5000.';
      } else if (err.response) {
        // Server responded with error status
        errorMessage = err.response.data?.message || err.response.data?.error || `Server error: ${err.response.status}`;
      } else if (err.request) {
        // Request was made but no response received
        errorMessage = 'No response from server. Please check your internet connection and try again.';
      } else if (err.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. The server is taking too long to respond. Please try again.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getProgressPercentage = () => {
    const filledFields = Object.values(form).filter(value => value.trim() !== '').length;
    return Math.round((filledFields / 5) * 100);
  };

  return (
    <div className="symptom-form-page">
      <nav className="modern-navbar">
        <div className="navbar-container">
          <button 
            className="back-to-home-btn"
            onClick={() => navigate('/')}
            aria-label="Go back to home"
          >
            <span className="back-icon">←</span>
            <span>Back</span>
          </button>
          
          <div className="navbar-brand-center">
            <div className="brand-icon-container">
              <span className="brand-icon">🏥</span>
            </div>
            <div className="brand-content">
              <h1 className="brand-title">Symptom Assessment</h1>
              <p className="brand-subtitle">AI-powered health analysis</p>
            </div>
          </div>
          
          <div className="progress-indicator">
            <div className="progress-circle">
              <svg className="progress-ring" width="50" height="50">
                <circle
                  className="progress-ring-background"
                  stroke="#e2e8f0"
                  strokeWidth="4"
                  fill="transparent"
                  r="20"
                  cx="25"
                  cy="25"
                />
                <circle
                  className="progress-ring-fill"
                  stroke="#4c51bf"
                  strokeWidth="4"
                  fill="transparent"
                  r="20"
                  cx="25"
                  cy="25"
                  strokeDasharray={`${2 * Math.PI * 20}`}
                  strokeDashoffset={`${2 * Math.PI * 20 * (1 - getProgressPercentage() / 100)}`}
                />
              </svg>
              <span className="progress-text">{getProgressPercentage()}%</span>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="form-background">
        <div className="form-background-pattern"></div>
        
        <main className="form-main">
          <div className="form-card">
            <div className="form-header-modern">
              <div className="header-icon">📋</div>
              <h2 className="form-title">Health Assessment Form</h2>
              <p className="form-description">
                Please provide accurate information about your symptoms. 
                The more details you share, the better our AI can assist you.
              </p>
            </div>
            
            <form className="enhanced-form" onSubmit={handleSubmit} noValidate>
              {/* Symptoms Section */}
              <div className="form-section">
                <div className="section-header">
                  <h3 className="section-title">
                    <span className="section-icon">📝</span>
                    Describe Your Symptoms
                  </h3>
                  <p className="section-subtitle">Be as specific as possible about what you're experiencing</p>
                </div>
                
                <div className="input-group-enhanced">
                  <label className="enhanced-label" htmlFor="symptoms">
                    Symptoms Description *
                  </label>
                  <div className="input-wrapper">
                    <textarea 
                      id="symptoms"
                      name="symptoms" 
                      value={form.symptoms} 
                      onChange={handleChange} 
                      placeholder="Example: I've had a persistent dry cough for 3 days, along with a mild headache and feeling tired. The cough is worse at night and doesn't produce any phlegm."
                      className={`enhanced-textarea ${validationErrors.symptoms ? 'error' : ''}`}
                      rows="5"
                    />
                    <div className="character-count">
                      {form.symptoms.length}/500 characters
                    </div>
                  </div>
                  {validationErrors.symptoms && (
                    <div className="field-error">
                      <span className="error-icon">⚠️</span>
                      {validationErrors.symptoms}
                    </div>
                  )}
                </div>
              </div>

              {/* Personal Information Section */}
              <div className="form-section">
                <div className="section-header">
                  <h3 className="section-title">
                    <span className="section-icon">👤</span>
                    Personal Information
                  </h3>
                  <p className="section-subtitle">This helps provide more accurate recommendations</p>
                </div>
                
                <div className="form-grid">
                  <div className="input-group-enhanced">
                    <label className="enhanced-label" htmlFor="age">
                      Age *
                    </label>
                    <div className="input-wrapper">
                      <input 
                        id="age"
                        type="number"
                        name="age" 
                        value={form.age} 
                        onChange={handleChange} 
                        placeholder="Enter your age"
                        className={`enhanced-input ${validationErrors.age ? 'error' : ''}`}
                        min="1"
                        max="120"
                      />
                    </div>
                    {validationErrors.age && (
                      <div className="field-error">
                        <span className="error-icon">⚠️</span>
                        {validationErrors.age}
                      </div>
                    )}
                  </div>

                  <div className="input-group-enhanced">
                    <label className="enhanced-label" htmlFor="gender">
                      Gender *
                    </label>
                    <div className="input-wrapper">
                      <select 
                        id="gender"
                        name="gender" 
                        value={form.gender} 
                        onChange={handleChange} 
                        className={`enhanced-select ${validationErrors.gender ? 'error' : ''}`}
                      >
                        <option value="">Select gender</option>
                        <option value="male">👨 Male</option>
                        <option value="female">👩 Female</option>
                        <option value="other">🏳️‍⚧️ Other</option>
                      </select>
                    </div>
                    {validationErrors.gender && (
                      <div className="field-error">
                        <span className="error-icon">⚠️</span>
                        {validationErrors.gender}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Symptom Details Section */}
              <div className="form-section">
                <div className="section-header">
                  <h3 className="section-title">
                    <span className="section-icon">📊</span>
                    Symptom Details
                  </h3>
                  <p className="section-subtitle">Help us understand the severity and timeline</p>
                </div>
                
                <div className="form-grid">
                  <div className="input-group-enhanced">
                    <label className="enhanced-label" htmlFor="severity">
                      Severity Level *
                    </label>
                    <div className="severity-options">
                      {[
                        { value: 'mild', label: 'Mild', color: '#10b981', icon: '🟢', desc: 'Manageable discomfort' },
                        { value: 'moderate', label: 'Moderate', color: '#f59e0b', icon: '🟡', desc: 'Noticeable impact on daily activities' },
                        { value: 'severe', label: 'Severe', color: '#ef4444', icon: '🔴', desc: 'Significant distress or impairment' }
                      ].map((option) => (
                        <label key={option.value} className={`severity-option ${form.severity === option.value ? 'selected' : ''}`}>
                          <input
                            type="radio"
                            name="severity"
                            value={option.value}
                            checked={form.severity === option.value}
                            onChange={handleChange}
                          />
                          <div className="severity-content">
                            <div className="severity-header">
                              <span className="severity-icon">{option.icon}</span>
                              <span className="severity-label">{option.label}</span>
                            </div>
                            <p className="severity-desc">{option.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                    {validationErrors.severity && (
                      <div className="field-error">
                        <span className="error-icon">⚠️</span>
                        {validationErrors.severity}
                      </div>
                    )}
                  </div>

                  <div className="input-group-enhanced">
                    <label className="enhanced-label" htmlFor="duration">
                      Duration *
                    </label>
                    <div className="input-wrapper">
                      <input 
                        id="duration"
                        name="duration" 
                        value={form.duration} 
                        onChange={handleChange} 
                        placeholder="e.g., 3 days, 1 week, 2 hours"
                        className={`enhanced-input ${validationErrors.duration ? 'error' : ''}`}
                      />
                      <div className="input-hint">
                        Examples: "2 days", "1 week", "3 hours", "ongoing for months"
                      </div>
                    </div>
                    {validationErrors.duration && (
                      <div className="field-error">
                        <span className="error-icon">⚠️</span>
                        {validationErrors.duration}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  disabled={loading || getProgressPercentage() < 100} 
                  className="enhanced-submit-button"
                >
                  {loading ? (
                    <div className="loading-state">
                      <div className="enhanced-spinner"></div>
                      <span>Analyzing your symptoms...</span>
                    </div>
                  ) : (
                    <div className="submit-state">
                      <span className="submit-icon">🔍</span>
                      <span>Get AI Analysis</span>
                      <span className="submit-arrow">→</span>
                    </div>
                  )}
                </button>
                
                {getProgressPercentage() < 100 && (
                  <p className="form-completion-hint">
                    Complete all fields to enable analysis
                  </p>
                )}
              </div>
            </form>

            {error && (
              <div className="enhanced-error-message">
                <div className="error-content">
                  <span className="error-icon-large">⚠️</span>
                  <div className="error-text">
                    <h4>Something went wrong</h4>
                    <p>{error}</p>
                  </div>
                </div>
                <button 
                  className="dismiss-error"
                  onClick={() => setError('')}
                  aria-label="Dismiss error"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </main>

        <div className="medical-disclaimer-modern">
          <div className="disclaimer-container">
            <div className="disclaimer-icon-container">
              <span className="disclaimer-icon">⚠️</span>
            </div>
            <div className="disclaimer-text">
              <h4>Important Medical Disclaimer</h4>
              <p>This tool provides educational information only and does not replace professional medical advice. Always consult a qualified healthcare provider for medical concerns.</p>
            </div>
          </div>
        </div>
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
      
      <div className="disclaimer-top-right">
        <div className="footer-warning">
          <p>⚠️ <strong>Important:</strong> This tool is for educational purposes only and does not constitute medical advice. Always consult a healthcare professional for medical concerns.</p>
        </div>
      </div>
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

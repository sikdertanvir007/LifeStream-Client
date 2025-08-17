import React, { useState } from 'react';
import { 
  FaCheckCircle, 
  FaTimesCircle, 
  FaQuestionCircle, 
  FaWeight, 
  FaCalendarAlt, 
  FaHeartbeat,
  FaUserMd,
  FaGlobeAmericas,
  FaPills
} from 'react-icons/fa';

const Eligibility = () => {
  const [activeTab, setActiveTab] = useState('requirements');

  const basicRequirements = [
    {
      icon: <FaCalendarAlt />,
      title: "Age Requirements",
      requirement: "17-65 years old",
      details: "First-time donors must be 17-60 years old",
      status: "required"
    },
    {
      icon: <FaWeight />,
      title: "Weight Requirements",
      requirement: "At least 110 lbs (50 kg)",
      details: "Minimum weight ensures safe donation",
      status: "required"
    },
    {
      icon: <FaHeartbeat />,
      title: "General Health",
      requirement: "Good overall health",
      details: "No active infections or illnesses",
      status: "required"
    },
    {
      icon: <FaUserMd />,
      title: "Medical History",
      requirement: "Clear medical screening",
      details: "No disqualifying medical conditions",
      status: "required"
    }
  ];

  const temporaryDeferrals = [
    {
      condition: "Recent Tattoo/Piercing",
      duration: "3 months",
      icon: <FaTimesCircle />,
      details: "If done at unregulated facility"
    },
    {
      condition: "Recent Travel",
      duration: "Varies",
      icon: <FaGlobeAmericas />,
      details: "Depends on destination and risk factors"
    },
    {
      condition: "Recent Vaccination",
      duration: "1-4 weeks",
      icon: <FaPills />,
      details: "Varies by vaccine type"
    },
    {
      condition: "Minor Surgery",
      duration: "2-12 weeks",
      icon: <FaUserMd />,
      details: "Depends on procedure type"
    },
    {
      condition: "Cold/Flu Symptoms",
      duration: "Until recovered",
      icon: <FaHeartbeat />,
      details: "Must be symptom-free"
    },
    {
      condition: "Pregnancy/Nursing",
      duration: "6 weeks after delivery/weaning",
      icon: <FaTimesCircle />,
      details: "For mother's health and recovery"
    }
  ];

  const permanentDeferrals = [
    "HIV/AIDS diagnosis",
    "Hepatitis B or C (current infection)",
    "History of intravenous drug use",
    "Certain heart conditions",
    "History of cancer (some types)",
    "Mad Cow Disease exposure",
    "Chronic kidney disease",
    "Bleeding disorders"
  ];

  const quickCheck = [
    {
      question: "Are you between 17-65 years old?",
      id: "age"
    },
    {
      question: "Do you weigh at least 110 lbs?",
      id: "weight"
    },
    {
      question: "Are you feeling healthy today?",
      id: "health"
    },
    {
      question: "Have you donated blood in the last 56 days?",
      id: "recent",
      reverse: true
    },
    {
      question: "Have you had any tattoos or piercings in the last 3 months?",
      id: "tattoo",
      reverse: true
    }
  ];

  const [checkAnswers, setCheckAnswers] = useState({});

  const handleCheckAnswer = (id, answer) => {
    setCheckAnswers(prev => ({
      ...prev,
      [id]: answer
    }));
  };

  const getEligibilityResult = () => {
    const answers = Object.values(checkAnswers);
    if (answers.length !== quickCheck.length) return null;
    
    const eligible = quickCheck.every((q, index) => {
      const answer = checkAnswers[q.id];
      return q.reverse ? !answer : answer;
    });
    
    return eligible;
  };

  const eligibilityResult = getEligibilityResult();

  return (
    <section className="eligibility-section">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title">Who Can Donate Blood?</h2>
          <p className="section-subtitle">
            Check your eligibility and learn about donation requirements
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="eligibility-tabs">
          <button 
            className={`tab-button ${activeTab === 'requirements' ? 'active' : ''}`}
            onClick={() => setActiveTab('requirements')}
          >
            <FaCheckCircle />
            Basic Requirements
          </button>
          <button 
            className={`tab-button ${activeTab === 'temporary' ? 'active' : ''}`}
            onClick={() => setActiveTab('temporary')}
          >
            <FaTimesCircle />
            Temporary Deferrals
          </button>
          <button 
            className={`tab-button ${activeTab === 'permanent' ? 'active' : ''}`}
            onClick={() => setActiveTab('permanent')}
          >
            <FaQuestionCircle />
            Permanent Deferrals
          </button>
          <button 
            className={`tab-button ${activeTab === 'check' ? 'active' : ''}`}
            onClick={() => setActiveTab('check')}
          >
            <FaHeartbeat />
            Quick Check
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'requirements' && (
            <div className="requirements-grid">
              {basicRequirements.map((req, index) => (
                <div key={index} className="requirement-card">
                  <div className="requirement-icon">{req.icon}</div>
                  <h3 className="requirement-title">{req.title}</h3>
                  <div className="requirement-value">{req.requirement}</div>
                  <p className="requirement-details">{req.details}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'temporary' && (
            <div className="deferrals-list">
              <div className="deferrals-header">
                <h3>Temporary Deferrals</h3>
                <p>These conditions require a waiting period before you can donate:</p>
              </div>
              {temporaryDeferrals.map((deferral, index) => (
                <div key={index} className="deferral-item">
                  <div className="deferral-icon">{deferral.icon}</div>
                  <div className="deferral-content">
                    <div className="deferral-condition">{deferral.condition}</div>
                    <div className="deferral-duration">Wait: {deferral.duration}</div>
                    <div className="deferral-details">{deferral.details}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'permanent' && (
            <div className="permanent-deferrals">
              <div className="deferrals-header">
                <h3>Permanent Deferrals</h3>
                <p>These conditions permanently prevent blood donation for safety reasons:</p>
              </div>
              <div className="permanent-list">
                {permanentDeferrals.map((condition, index) => (
                  <div key={index} className="permanent-item">
                    <FaTimesCircle className="permanent-icon" />
                    <span>{condition}</span>
                  </div>
                ))}
              </div>
              <div className="disclaimer">
                <p><strong>Note:</strong> This is not a complete list. Our medical staff will conduct a thorough screening during your visit.</p>
              </div>
            </div>
          )}

          {activeTab === 'check' && (
            <div className="quick-check">
              <div className="quick-check-header">
                <h3>Quick Eligibility Check</h3>
                <p>Answer these questions to get an initial assessment of your eligibility:</p>
              </div>
              
              <div className="quick-check-questions">
                {quickCheck.map((q, index) => (
                  <div key={index} className="check-question">
                    <p className="question-text">{q.question}</p>
                    <div className="question-buttons">
                      <button
                        className={`check-btn ${checkAnswers[q.id] === true ? 'active yes' : ''}`}
                        onClick={() => handleCheckAnswer(q.id, true)}
                      >
                        Yes
                      </button>
                      <button
                        className={`check-btn ${checkAnswers[q.id] === false ? 'active no' : ''}`}
                        onClick={() => handleCheckAnswer(q.id, false)}
                      >
                        No
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {eligibilityResult !== null && (
                <div className={`eligibility-result ${eligibilityResult ? 'eligible' : 'not-eligible'}`}>
                  {eligibilityResult ? (
                    <>
                      <FaCheckCircle className="result-icon" />
                      <div className="result-content">
                        <h4>Great! You may be eligible to donate</h4>
                        <p>Based on your answers, you appear to meet basic eligibility requirements. Please visit us for a complete screening.</p>
                        <button className="btn-primary">Schedule Donation</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="result-icon" />
                      <div className="result-content">
                        <h4>You may not be eligible at this time</h4>
                        <p>Based on your answers, you may need to wait before donating. Contact us for more information about your specific situation.</p>
                        <button className="btn-secondary">Contact Us</button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="eligibility-footer">
          <div className="footer-note">
            <FaQuestionCircle />
            <p>
              <strong>Important:</strong> This information is for guidance only. 
              Final eligibility is determined by our medical staff during screening.
            </p>
          </div>
          <button className="btn-outline">Have Questions? Contact Our Team</button>
        </div>
      </div>
    </section>
  );
};

export default Eligibility;
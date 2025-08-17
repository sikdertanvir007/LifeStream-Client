import { FaUserCheck, FaFlask, FaTint,FaHandHoldingHeart } from 'react-icons/fa';
import { Link } from 'react-router';

const DonationProcess = () => {
  const steps = [
    {
      step: 1,
      icon: <FaUserCheck />,
      title: "Registration & Health Check",
      description: "Quick registration and basic health screening by our medical team",
      duration: "10 minutes"
    },
    {
      step: 2,
      icon: <FaFlask />,
      title: "Blood Testing",
      description: "We test a small sample to determine blood type and check for infections",
      duration: "5 minutes"
    },
    {
      step: 3,
      icon: <FaTint />,
      title: "Blood Donation",
      description: "Safe and comfortable blood collection with sterile equipment",
      duration: "8-10 minutes"
    },
    {
      step: 4,
      icon:<FaHandHoldingHeart/> ,
      title: "Rest & Refreshments",
      description: "Relax and enjoy refreshments while your body recovers",
      duration: "10-15 minutes"
    }
  ];

  return (
    <section className="donation-process-section">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title">Simple Donation Process</h2>
          <p className="section-subtitle">
            Donating blood is easier than you think. Here's what to expect:
          </p>
        </div>
        
        <div className="process-steps">
          {steps.map((step, index) => (
            <div key={index} className="process-step">
              <div className="step-connector">
                {index < steps.length - 1 && <div className="connector-line"></div>}
              </div>
              <div className="step-card">
                <div className="step-number">{step.step}</div>
                <div className="step-icon">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
                <div className="step-duration">⏱️ {step.duration}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="total-time">Total time: About 30-45 minutes</p>
         <Link to="/register"><button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary">Start Your Donation Journey</button></Link> 
        </div>
      </div>
    </section>
  );
};
export default DonationProcess;
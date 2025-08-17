import { FaInfoCircle } from 'react-icons/fa';

const BloodTypes = () => {
  const bloodTypes = [
    {
      type: "O-",
      name: "Universal Donor",
      compatibility: "Can donate to all blood types",
      urgency: "critical",
      percentage: "6.6%"
    },
    {
      type: "O+",
      name: "Most Common",
      compatibility: "Can donate to all positive types",
      urgency: "high",
      percentage: "37.4%"
    },
    {
      type: "A-",
      name: "Rare Type",
      compatibility: "Can donate to A and AB types",
      urgency: "high",
      percentage: "6.3%"
    },
    {
      type: "A+",
      name: "Common Type",
      compatibility: "Can donate to A+ and AB+",
      urgency: "medium",
      percentage: "35.7%"
    },
    {
      type: "B-",
      name: "Rare Type",
      compatibility: "Can donate to B and AB types",
      urgency: "high",
      percentage: "1.5%"
    },
    {
      type: "B+",
      name: "Less Common",
      compatibility: "Can donate to B+ and AB+",
      urgency: "medium",
      percentage: "8.5%"
    },
    {
      type: "AB-",
      name: "Universal Plasma",
      compatibility: "Universal plasma donor",
      urgency: "critical",
      percentage: "0.6%"
    },
    {
      type: "AB+",
      name: "Universal Recipient",
      compatibility: "Can receive from all types",
      urgency: "low",
      percentage: "3.4%"
    }
  ];

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'critical': return 'urgency-critical';
      case 'high': return 'urgency-high';
      case 'medium': return 'urgency-medium';
      default: return 'urgency-low';
    }
  };

  return (
    <section className="blood-types-section">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title">Know Your Blood Type</h2>
          <p className="section-subtitle">
            Understanding blood compatibility helps save more lives
          </p>
        </div>
        
        <div className="blood-types-grid">
          {bloodTypes.map((blood, index) => (
            <div key={index} className={`blood-type-card ${getUrgencyColor(blood.urgency)}`}>
              <div className="blood-type-header">
                <div className="blood-type-symbol">{blood.type}</div>
                <div className="blood-percentage">{blood.percentage}</div>
              </div>
              <h3 className="blood-type-name">{blood.name}</h3>
              <p className="blood-compatibility">{blood.compatibility}</p>
              <div className="urgency-indicator">
                <FaInfoCircle />
                <span className="urgency-text">
                  {blood.urgency.charAt(0).toUpperCase() + blood.urgency.slice(1)} Need
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default BloodTypes;
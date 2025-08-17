import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Who can donate blood?",
      answer: "Generally, you can donate blood if you are 17-65 years old, weigh at least 110 pounds, and are in good health. Specific eligibility may vary based on recent travel, medications, and health conditions."
    },
    {
      question: "How often can I donate blood?",
      answer: "You can donate whole blood every 56 days (8 weeks). Platelet donations can be made every 7 days, up to 24 times per year. Plasma donations can be made every 28 days."
    },
    {
      question: "Is blood donation safe?",
      answer: "Yes, blood donation is very safe. We use sterile, disposable equipment for each donor. The needle is used only once and then safely disposed of. Our trained staff follows strict safety protocols."
    },
    {
      question: "How long does the donation process take?",
      answer: "The entire process takes about 45-60 minutes. The actual blood collection takes only 8-10 minutes. The rest of the time is spent on registration, health screening, and recovery."
    },
    {
      question: "What should I do before donating?",
      answer: "Get a good night's sleep, eat a healthy meal within 3 hours of donation, drink plenty of fluids, and bring a valid ID. Avoid alcohol for 24 hours before donation."
    },
    {
      question: "What happens to my blood after donation?",
      answer: "Your blood is tested, processed, and separated into components (red cells, plasma, platelets). These components are then distributed to hospitals where patients need them most."
    },
    {
      question: "Will I feel weak after donating?",
      answer: "Most people feel fine after donating. We recommend resting for 10-15 minutes after donation and drinking plenty of fluids. Avoid heavy lifting for the rest of the day."
    },
    {
      question: "Can I donate if I have a tattoo?",
      answer: "Yes, you can donate if your tattoo was done at a state-regulated facility with sterile needles and ink. You may need to wait 3 months if the tattoo was done at an unregulated facility."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Get answers to common questions about blood donation
          </p>
        </div>
        
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
              <button 
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={activeIndex === index}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">
                  {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </button>
              
              {activeIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="faq-footer">
            Still have questions? 
            <a href="#contact" className="faq-link"> Contact our support team</a>
          </p>
        </div>
      </div>
    </section>
  );
};
export default FAQ;
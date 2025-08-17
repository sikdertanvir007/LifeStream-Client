import React from 'react';
import { FaUsers, FaHeartbeat, FaHospital, FaTint } from 'react-icons/fa';

const Statistics = () => {
  const stats = [
    {
      icon: <FaTint />,
      number: "15,000+",
      label: "Units Donated",
      description: "Blood units collected this year"
    },
    {
      icon: <FaUsers />,
      number: "8,500+",
      label: "Active Donors",
      description: "Registered volunteers ready to help"
    },
    {
      icon: <FaHeartbeat />,
      number: "12,000+",
      label: "Lives Saved",
      description: "Lives touched through donations"
    },
    {
      icon: <FaHospital />,
      number: "50+",
      label: "Partner Hospitals",
      description: "Medical facilities we serve"
    }
  ];

  return (
    <section className="statistics-section">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Impact in Numbers</h2>
          <p className="section-subtitle">
            Together, we're making a difference in countless lives across our community
          </p>
        </div>
        
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
              <p className="stat-description">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
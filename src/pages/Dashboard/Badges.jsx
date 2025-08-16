import React from "react";
import { FaMedal, FaAward, FaTrophy, FaLock } from "react-icons/fa";

const Badges = () => {
  const badges = [
    { id: 1, name: "First Donation", icon: <FaMedal />, unlocked: true },
    { id: 2, name: "5 Donations", icon: <FaAward />, unlocked: true },
    { id: 3, name: "10 Donations", icon: <FaTrophy />, unlocked: false },
    { id: 4, name: "LifeSaver 2025", icon: <FaAward />, unlocked: true },
    { id: 5, name: "25 Donations", icon: <FaTrophy />, unlocked: false },
    { id: 6, name: "50 Donations", icon: <FaTrophy />, unlocked: false },
  ];

  const unlockedCount = badges.filter(b => b.unlocked).length;

  return (
    <div className="max-w-5xl mx-auto p-6 text-center">
      <h1 className="achievement-title">🏆 My Achievements</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {badges.map((badge) => (
          <div 
            key={badge.id} 
            className={`badge-card ${badge.unlocked ? "badge-unlocked" : "badge-locked"}`}
          >
            <div className={`badge-icon ${badge.unlocked ? "icon-unlocked" : "icon-locked"}`}>
              {badge.unlocked ? badge.icon : <FaLock />}
            </div>
            <p className="badge-name">{badge.name}</p>
          </div>
        ))}
      </div>
      <p className="achievement-summary">
        You've unlocked <span className="achievement-count">{unlockedCount}</span> out of {badges.length} badges!
      </p>
    </div>
  );
};

export default Badges;
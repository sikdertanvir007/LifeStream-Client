import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router';

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: "Community Blood Drive",
      date: "2025-08-25",
      time: "9:00 AM - 4:00 PM",
      location: "Central Community Center",
      address: "123 Main Street, Downtown",
      expectedDonors: 150,
      slotsAvailable: 45,
      type: "community"
    },
    {
      id: 2,
      title: "Corporate Partnership Drive",
      date: "2025-08-28",
      time: "10:00 AM - 3:00 PM",
      location: "Tech Innovation Hub",
      address: "456 Business Plaza",
      expectedDonors: 100,
      slotsAvailable: 30,
      type: "corporate"
    },
    {
      id: 3,
      title: "University Blood Drive",
      date: "2025-09-02",
      time: "11:00 AM - 5:00 PM",
      location: "State University Campus",
      address: "789 University Ave",
      expectedDonors: 200,
      slotsAvailable: 75,
      type: "university"
    },
    {
      id: 4,
      title: "Emergency Blood Appeal",
      date: "2025-09-05",
      time: "8:00 AM - 6:00 PM",
      location: "City Hospital",
      address: "321 Healthcare Drive",
      expectedDonors: 80,
      slotsAvailable: 60,
      type: "emergency"
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getEventTypeClass = (type) => {
    switch(type) {
      case 'emergency': return 'event-emergency';
      case 'community': return 'event-community';
      case 'corporate': return 'event-corporate';
      default: return 'event-university';
    }
  };

  return (
    <section className="upcoming-events-section">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="section-title">Upcoming Blood Drives</h2>
          <p className="section-subtitle">
            Join us at these upcoming events and help save lives in your community
          </p>
        </div>
        
        <div className="events-grid">
          {events.map((event) => (
            <div key={event.id} className={`event-card ${getEventTypeClass(event.type)}`}>
              <div className="event-header">
                <div className="event-date">
                  <FaCalendarAlt />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="event-type">{event.type}</div>
              </div>
              
              <h3 className="event-title">{event.title}</h3>
              
              <div className="event-details">
                <div className="event-detail">
                  <FaClock />
                  <span>{event.time}</span>
                </div>
                <div className="event-detail">
                  <FaMapMarkerAlt />
                  <div>
                    <div className="location-name">{event.location}</div>
                    <div className="location-address">{event.address}</div>
                  </div>
                </div>
                <div className="event-detail">
                  <FaUsers />
                  <span>{event.slotsAvailable} slots available</span>
                </div>
              </div>
              
              <div className="event-footer">
                <div className="progress-bar">
                  <div className="progress-fill" 
                       style={{width: `${((event.expectedDonors - event.slotsAvailable) / event.expectedDonors) * 100}%`}}>
                  </div>
                </div>
              <Link to="/register">  <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary">Register Now</button></Link>
              </div>
            </div>
          ))}
        </div>
        
       
      </div>
    </section>
  );
};
export default UpcomingEvents;
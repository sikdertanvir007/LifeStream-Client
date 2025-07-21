import React from "react";
import man1 from "../../../assets/man1.jpg.jpg";
import woman1 from "../../../assets/woman1.png.png";
import doctor1 from "../../../assets/doctor1.jpg.jpg";
const testimonials = [
  {
    name: "Fatima Akter",
    role: "Blood Recipient",
    image: woman1,
    story:
      "I was in critical condition and needed AB+ blood urgently. LifeStream connected me to a donor within 30 minutes. I'm alive today because of it.",
  },
  {
    name: "Hasib Rahman",
    role: "Donor",
    image: man1,
    story:
      "Donating through LifeStream has been one of the most rewarding experiences of my life. I’ve donated 4 times and hope to do more.",
  },
  {
    name: "Dr. Nusrat Jahan",
    role: "Volunteer Doctor",
    image: doctor1,
    story:
      "This platform is saving lives every day. As a doctor, I’ve seen first-hand how quickly donors and patients are connected. Incredible work.",
  },
];

const InspiringStories = () => {
  return (
    <section className="bg-white py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-12">
          Stories That Inspire
        </h2>
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-red-100 shadow-xl p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-800">{t.name}</h3>
              <p className="text-sm text-red-600 mb-2">{t.role}</p>
              <p className="text-gray-700 text-sm italic">“{t.story}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InspiringStories;

import React from "react";
import Navbar from "../../shared/Navbar/Navbar";
import Footer from "../../shared/Footer/Footer";

const ContactUs = () => {
  return (
    <div>
      <div className="mb-20"><Navbar></Navbar></div>
    <section className="bg-red-50 shadow-2xl rounded-xl py-16 px-4 md:px-10" id="contact">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-red-600 mb-12">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form className="bg-white p-8 shadow-lg rounded-xl space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Get in Touch
            </h3>
            <p className="text-gray-700 mb-6">
              Have questions or need assistance? Reach out to our team and we’ll
              get back to you as soon as possible.
            </p>

            <div className="space-y-4 text-gray-700">
              <div>
                <strong>📞 Phone:</strong> +880 1234-567890
              </div>
              <div>
                <strong>✉️ Email:</strong> support@lifestream.org
              </div>
              <div>
                <strong>📍 Address:</strong> Dhaka, Bangladesh
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div><Footer></Footer></div>
    </div>
  );
};

export default ContactUs;

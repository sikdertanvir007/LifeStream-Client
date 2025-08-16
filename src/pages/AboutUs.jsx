import React from "react";
import { motion } from "framer-motion";
import Navbar from "./shared/Navbar/Navbar";
import Footer from "./shared/Footer/Footer";

const AboutUs = () => {
  return (
    <div>
        <div className="mb-16"><Navbar></Navbar></div>
    <div className="max-w-6xl mx-auto px-6 py-16">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1}}
        className="text-4xl font-bold text-center text-red-600 mb-6"
      >
        About LifeStream
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12"
      >
        LifeStream is a community-driven blood donation platform built to connect donors 
        with people in urgent need. Our mission is simple: 
        <span className="font-semibold text-red-500"> no life should be lost due to a lack of blood. </span>
      </motion.p>

      <div className="grid md:grid-cols-2 gap-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1}}
          className="bg-white shadow-lg p-6 rounded-2xl border-t-4 border-red-500"
        >
          <h2 className="text-2xl font-semibold text-red-600 mb-3">Our Mission</h2>
          <ul className="list-disc ml-5 text-gray-700 space-y-2">
            <li>Create a reliable network of voluntary donors.</li>
            <li>Ensure quick access to blood during emergencies.</li>
            <li>Promote awareness about regular blood donation.</li>
          </ul>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="bg-white shadow-lg p-6 rounded-2xl border-t-4 border-red-500"
        >
          <h2 className="text-2xl font-semibold text-red-600 mb-3">Why LifeStream?</h2>
          <ul className="list-disc ml-5 text-gray-700 space-y-2">
            <li>🩸 Fast & secure donor search by blood group & location.</li>
            <li>🤝 Trusted community with verified donors.</li>
            <li>📊 Personal dashboard to manage requests & donations.</li>
            <li>🌍 Saving lives together – every drop counts!</li>
          </ul>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1}}
        className="text-center mt-12"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          Donate Blood Today, Be a Hero Tomorrow.
        </h3>
        <button className="btn bg-red-500 text-white px-6 rounded-xl shadow-md hover:bg-red-600">
          Join as a Donor
        </button>
      </motion.div>
    </div>
    <div><Footer></Footer></div>
    </div>
  );
};

export default AboutUs;

import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";


const Footer = () => {
  return (
    <footer className="bg-red-600 text-white pt-12 pb-6 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-2">LifeStream</h2>
          <p className="text-sm">
            Connecting donors and recipients across Bangladesh with love,
            urgency, and care. Donate blood, save lives, inspire hope.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/funding" className="hover:underline">
                Funding
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-lg">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-200"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-sm border-t border-red-400 pt-4">
        © {new Date().getFullYear()} LifeStream. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

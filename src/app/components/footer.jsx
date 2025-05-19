"use client";

import React from "react";

const Footer = () => {
  const handleMailClick = () => {
    window.location.href = "mailto:yourmail@example.com";
  };

  return (
    <footer className="bg-gray-900 text-white p-4 text-center">
      <p className="mb-2">© 2025 Your Name. All rights reserved.</p>
      <button
        onClick={handleMailClick}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
      >
        Contact Me
      </button>
    </footer>
  );
};

export default Footer;

"use client";

import Link from "next/link";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    setDarkMode(isDark);
  };

  return (
    <nav className="navbar">
      <Link href="/" className="nav-item">home</Link>
      <Link href="/writing" className="nav-item">writing</Link>
      <Link href="/reading" className="nav-item">reading</Link>
      <Link href="/projects" className="nav-item">projects</Link>

      <div className="icon-set">
        {/* GitHub */}

        <a
          href="https://github.com/Strange-14M605"
          target="_blank"
          rel="noopener noreferrer"
          >
          <i className="bi bi-github icon"></i>
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/jova-varghese/"
          target="_blank"
          rel="noopener noreferrer"
          >
          <i className="bi bi-linkedin icon"></i>
        </a>


        {/* Theme Toggle */}

        <button onClick={toggleDarkMode} className="toggle-button">
          {darkMode ? 
          <i className="bi bi-sun-fill icon"></i> : 
          <i className="bi bi-moon-fill icon"></i>}
        </button>
      </div>
    </nav>
  );
}

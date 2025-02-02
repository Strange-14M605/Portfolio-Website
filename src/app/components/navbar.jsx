"use client";
 
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  // State to track the theme
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle theme on circle click
  const handleThemeToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Update the CSS variables based on the current theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.style.setProperty('--background', '#17153d');
      document.documentElement.style.setProperty('--foreground', '#ededed');
    } else {
      document.documentElement.style.setProperty('--background', '#491313');
      document.documentElement.style.setProperty('--foreground', '#ffffff');
    }
  }, [isDarkMode]);

  return (
    <nav>
      {/* Theme Toggle SVG Circle */}
      <svg
        width="42"
        height="42"
        onClick={handleThemeToggle}
        style={{ cursor: "pointer" }}
      >
        <circle cx="20" cy="20" r="20" fill={isDarkMode ? "#ffd700" : "#00bfff"} />
      </svg>

      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">Contact</Link>
      </div>

      <a href="" className="resume-link">
        Resume
        <img src="/icons/go-to.svg" alt="Go to Resume" />
      </a>
    </nav>
  );
}

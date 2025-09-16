"use client";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">🌱 Jova's Digital Portfolio</h1>

      <div className="social-icons">
        {/* GitHub */}
        <a href="https://github.com/Strange-14M605" className="social-icon">
          <img src="/icons/github.svg" alt="GitHub" />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/jova-varghese/"
          className="social-icon"
        >
          <img src="/icons/linkedin.svg" alt="LinkedIn" />
        </a>

        {/* Instagram (commented out for now) */}
        {/* <a href="#" className="social-icon">
      <img src="/icons/instagram.svg" alt="Instagram" />
    </a> */}
      </div>
    </nav>
  );
}

"use client";

export default function Navbar() {
  return (
<nav className="navbar">
<h1 className="navbar-title">
  <a href="/">Jova's Digital Garden</a>
</h1>


  {/* Dark mode toggle */}
  <div className="navbar-toggle">
    {/* Add your dark mode toggle component here */}
  </div>

  {/* RSS feed */}
  <div className="navbar-rss">
    {/* Add your RSS component here */}
  </div>

  <div className="social-icons">
    {/* GitHub */}
    <a href="https://github.com/Strange-14M605" className="social-icon">
      <img src="/icons/github.svg" alt="GitHub" width="24" height="24" />
    </a>

    {/* LinkedIn */}
    <a href="https://www.linkedin.com/in/jova-varghese/" className="social-icon">
      <img src="/icons/linkedin.svg" alt="LinkedIn" width="24" height="24" />
    </a>

    {/* Instagram (commented out for now) */}
    {/* <a href="#" className="social-icon">
      <img src="/icons/instagram.svg" alt="Instagram" width="24" height="24" />
    </a> */}
  </div>
</nav>

  );
}

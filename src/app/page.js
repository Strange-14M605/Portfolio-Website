"use client";

import Link from "next/link";

//components

export default function Home() {
  return (
    <>
      <h1>Welcome to my  Portfolio.</h1>

      {/* Middle element */}

      {/* Projects */}
      <Link href="/projects">
      <div className="container">
        <p>View my <span className="highlight">projects</span></p>
      </div>
      </Link>

      {/* Art Gallery */}
      <Link href="/art-gallery">
      <div className="container">
        <p className="highlight">Art Gallery</p>
      </div>
      </Link>

      {/* Explore Blog */}
      <Link href="/blog">
      <div className="container">
        <p className="highlight">Explore Blog</p>
      <img src="/icons/go-to.svg" alt="Icon" width="24" height="24" />
      </div>
      </Link>



      {/* Socials */}
      <a href="https://www.linkedin.com/in/jova-varghese/">
      <img src="/icons/linkedin.svg" alt="Icon" width="24" height="24" />
      </a>
      <a href="">
      <img src="/icons/instagram.svg" alt="Icon" width="24" height="24" />
      </a>
      <a href="https://github.com/Strange-14M605">
      <img src="/icons/github.svg" alt="Icon" width="24" height="24" />
      </a>

    </>
  );
}

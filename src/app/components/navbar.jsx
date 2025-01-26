import Link from "next/link";

export default function Navbar() {
  return (
    <>
      {/* Toggle */}
      <svg width="42" height="42">
        <circle cx="20" cy="20" r="20" />
      </svg>

      {/* Home */}
      <Link href="/">Home</Link>

      {/* Blog */}
      <Link href="/blog">
        <p>Blog</p>
      </Link>

      {/* Contact */}
      <Link href="/contact">
        <p>Contact</p>
      </Link>

      {/* Resume */}
      <a href="">Resume</a>
      <img src="/icons/go-to.svg" alt="Icon" width="24" height="24" />
    </>
  );
}

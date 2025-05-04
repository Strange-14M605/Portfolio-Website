"use client";

//components
import ListBlogs from "./components/listBlogs";


export default function Home() {
  return (
<>
  <section className="intro-section">
    <h5 className="intro-text">Welcome to my digital garden. I share the things I like and the way I grow.</h5>
  </section>

  <section className="blogs-section">
    <ListBlogs />
  </section>

  <section className="gallery-section">
    {/* Gallery - Future scope */}
    {/* You can add your gallery component or image grid here in the future */}
  </section>
</>

  );
}

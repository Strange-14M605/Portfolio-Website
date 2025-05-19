"use client";

//components
import ListBlogs from "./components/listBlogs";
import Head from 'next/head'; //favicon

export default function Home() {
  return (
<>
    <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

  <section className="intro-section">
    <h5 className="intro-text">Welcome to my <i>digital garden</i>. I share the things I like and the way I <i>grow</i>.</h5>
    <h5 className="intro-text">I gotta say, this is less of a portfolio website and more of a <i>home for my untamed thoughts</i> that grow and evolve.</h5>
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

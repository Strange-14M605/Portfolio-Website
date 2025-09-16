"use client";

//components
import Projects from "./components/Projects";
import Head from "next/head"; //favicon

export default function Home() {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="intro-section">
        <p className="intro-text">
          Welcome to my <i>online portfolio</i>. I am currently pursuing my
          Bachelor's in Technology- Computer Science Engineering at{" "}
          <i>PES University, Bengaluru, India</i>.
        </p>
        <p className="intro-text">
          This is where you will get to know a little more about me, my work,
          and my interests. Feel free to explore and connect with me through the
          social media links in the navbar above!
        </p>
      </section>

      <Projects />
    </>
  );
}

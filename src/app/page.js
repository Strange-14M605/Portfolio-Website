import ContactForm from "./components/ContactForm";
import LandingMetadata from "./components/LandingMetadata";
import { getIntroVideoUrl } from '@/supabase';

export default function Home() {
  return (
    <main className="landing-shell">
      <div className="horizontal-divider" />

      <section className="landing-hero">
        <section className="intro-video-section">
          <video
            className="intro-video"
            src={getIntroVideoUrl()}
            autoPlay
            loop
            muted
            playsInline
          />
        </section>
        <div className="landing-hero-copy">
          <p>
            Welcome to my <i>online portfolio</i>. I am currently pursuing my
            Bachelor&apos;s in Technology- Computer Science Engineering at{" "}
            <i>PES University, Bengaluru, India</i>.
          </p>
          <p>
            This is where you will get to know a little more about me, my work,
            and my interests. Feel free to explore and connect with me through the
            social media links in the navbar above!
          </p>

          <LandingMetadata />
        </div>
      </section>

      <div className="horizontal-divider" />

      <section className="landing-story">
        <div>My journey (๑ᵔ⤙ᵔ๑) </div>
        <p>
          I graduated with a Bachelor&apos;s in Technology- Computer Science Engineering
          from PES University, Bengaluru, India, in 2026. Since then I have joined
          NagraVision as a trainee software engineer in the AI/ML R&amp;D space and
          am working towards building AI systems to optimise workflows.
        </p>
      </section>

      <div className="horizontal-divider" />

      <section className="landing-story">
        <div>What it is like working with me . ݁₊ ⊹ </div>
        <p>
          I am a fun person with lots of ambition and who never backs down from
          talking in front of people and brainstorming. With previous experience in
          the software industry, I know how to work with various tools and can adapt
          quickly.
        </p>
      </section>

      <div className="horizontal-divider" />

      <section className="landing-story">
        <div >Drop a 'Hi' and let's connect:</div>
        <ContactForm />
      </section>

    </main>
  );
}

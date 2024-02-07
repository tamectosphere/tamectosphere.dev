import { AboutMe } from '#app/components/modules/home/AboutMe.tsx';
import { HeroBanner } from '#app/components/modules/home/HeroBanner';
import { Initiating } from '#app/components/modules/home/Initiating';
import { ClosingStatement } from '#app/components/modules/home/ClosingStatement';
import { MainStack } from '#app/components/modules/home/MainStack';
import { Button } from '#app/components/ui/button';
import { Link } from '@remix-run/react';
import { ProjectOdyssey } from '#app/components/modules/home/ProjectOdyssey';
import { Contact } from '#app/components/modules/home/Contact';

export default function Index() {
  return (
    <>
      <div
        id="hero-banner"
        className="container h-[90vh] flex flex-col items-center justify-start pt-32 md:h-[80vh] pt-20 lg:gap-0 xl:h-screen"
      >
        <HeroBanner />
      </div>
      <main className="flex flex-col gap-12 items-center justify-center pt-0 pb-20 px-12 lg:px-32 pt-20 xl:px-72">
        <section id="initiating" className="pb-28 flex flex-col md:flex-row">
          <Initiating />
        </section>
        <section
          id="about-me"
          className="pb-28 flex flex-col gap-4 items-center justify-center "
        >
          <AboutMe />
        </section>
        <section
          id="main-stack-title"
          className="flex flex-col gap-4 items-center justify-center "
        >
          <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-5xl">
            Tech Toolkit: My Skills & Stack
          </h1>
        </section>
        <section
          id="main-stack"
          className="pb-28 flex flex-col gap-4 items-center justify-center "
        >
          <MainStack />
          <Button size="lg" className="text-lg" asChild>
            <Link to="/tech-skills">Explore more stack</Link>
          </Button>
        </section>
        <section
          id="project-odyssey"
          className="flex flex-col gap-4 items-center justify-center "
        >
          <ProjectOdyssey />
        </section>
        <section
          id="contact"
          className="flex flex-col gap-4 items-center justify-center "
        >
          <Contact />
        </section>
        <section id="closing-statement">
          <ClosingStatement />
        </section>
      </main>
    </>
  );
}

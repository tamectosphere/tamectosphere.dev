import { AboutMe } from '#app/components/modules/home/AboutMe.tsx';
import { HeroBanner } from '#app/components/modules/home/HeroBanner';
import { Initiating } from '#app/components/modules/home/Initiating';
import { ClosingStatement } from '#app/components/modules/home/ClosingStatement';
import { TechStack } from '#app/components/modules/home/TechStack';

export default function Index() {
  return (
    <>
      <div
        id="hero-banner"
        className="container h-screen  flex flex-col gap-6 items-center justify-start pt-32 md:pt-20 "
      >
        <HeroBanner />
      </div>
      <main className="flex flex-col gap-12 items-center justify-center pt-0 pb-20 px-12 xl:px-72">
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
          id="my-stacks"
          className="flex flex-col gap-4 items-center justify-center "
        >
          <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-5xl">
            Tech Toolkit: My Skills & Stack
          </h1>
        </section>
        <section
          id="my-sub-stacks"
          className="pb-28 flex flex-col gap-4 items-center justify-center "
        >
          <TechStack />
        </section>
        <section id="closing-statement">
          <ClosingStatement />
        </section>
      </main>
    </>
  );
}

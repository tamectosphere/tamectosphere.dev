import { MetaFunction } from '@remix-run/node';
import {
  programmingLogos,
  frameworkLibsLogos,
  databasesLogos,
  othersLogos,
} from '#app/components/common/logos/logos';
import { SkillLogos } from '#app/components/modules/tech-skills/SkillLogos';

export const meta: MetaFunction = () => {
  return [
    {
      title:
        'My Developer Stack: Programming Skills & Technologies | Pattadon Sa-ngasri',
    },
    {
      name: 'author',
      content:
        'Explore my Tech Toolkit & Developer Stack: A comprehensive showcase of my programming languages, frameworks, and tools, including Elixir, Typescript, Docker, and more. Dive into the technologies that power my backend development projects.',
    },
  ];
};

export default function TechSkills() {
  return (
    <div
      id="my-stack"
      className="container flex flex-col items-center justify-start pt-12 pb-20 md:pt-20"
    >
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-5xl">
        Programming Languages
      </h1>
      <SkillLogos logos={programmingLogos} paddingBtm={24} />
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-5xl">
        Frameworks and Libraries
      </h1>
      <SkillLogos logos={frameworkLibsLogos} paddingBtm={24} />
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-5xl">
        Databases
      </h1>
      <SkillLogos logos={databasesLogos} paddingBtm={24} />
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-5xl">
        Others
      </h1>
      <SkillLogos logos={othersLogos} paddingBtm={2} />
    </div>
  );
}

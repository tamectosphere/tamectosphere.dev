interface SkillsProp {
  logos: { src: string; alt: string; href: string }[];
  paddingBtm?: number;
}

export function SkillLogos(props: SkillsProp) {
  const { logos } = props;
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-6 pt-6 pb-14 xl:pb-24">
      {logos.map((logo: { src: string; alt: string; href: string }) => (
        <a key={logo.alt} href={logo.href} target="_blank" rel="noreferrer">
          <img
            className="grid cursor-pointer size-24 place-items-center rounded-2xl bg-ecto-1 p-4 
            transition hover:-rotate-6 hover:bg-ecto-1-30 dark:bg-ecto-1 dark:hover:bg-ecto-1-30 
            sm:size-24 md:size-24"
            src={logo.src}
            alt={logo.alt}
          />
        </a>
      ))}
    </div>
  );
}

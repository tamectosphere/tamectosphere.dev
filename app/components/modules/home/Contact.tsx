import { SiDiscogs } from 'react-icons/si';
import { RiTwitterXFill } from 'react-icons/ri';
import { FaMedium, FaGithub, FaLinkedinIn, FaGoodreadsG } from 'react-icons/fa';

export function Contact() {
  // Centralize social icon data
  const socialLinks = [
    { Icon: SiDiscogs, href: 'https://www.discogs.com/user/ectopic.spin' },
    { Icon: RiTwitterXFill, href: 'https://twitter.com/TamEctosphere' },
    { Icon: FaMedium, href: 'https://medium.com/@TamEctosphere' },
    { Icon: FaGithub, href: 'https://github.com/tamectosphere' },
    { Icon: FaGoodreadsG, href: 'https://goodreads.com/tam_ectosphere' },
    {
      Icon: FaLinkedinIn,
      href: 'https://www.linkedin.com/in/pattadon-sa-ngasri-he-they-8166b0158',
    },
  ];

  return (
    <>
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-5xl">
        Get in Touch: Start the Conversation
      </h1>
      <div className="flex flex-row flex-wrap items-center justify-center gap-6 pt-6 pb-14 xl:pb-24 gap-10">
        {socialLinks.map(({ Icon, href }, index) => (
          <a
            key={index}
            className="grid cursor-pointer place-items-center"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon className="w-10 h-10 lg:w-16 lg:h-16" />
          </a>
        ))}
      </div>
    </>
  );
}

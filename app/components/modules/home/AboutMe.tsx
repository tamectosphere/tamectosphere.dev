import { Avatar, AvatarFallback, AvatarImage } from '#app/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#app/components/ui/dialog';

export function AboutMe() {
  const theFirstParagraph = () => {
    return (
      <div>
        <p>
          Hi Folk! I&apos;m Tam, an aspiring backend developer weaving the art
          of code into the fabric of the digital universe. My journey in tech is
          fueled by discipline and an unwavering motivation to create, solve,
          and innovate.
        </p>
      </div>
    );
  };

  const allContent = () => {
    return (
      <>
        {theFirstParagraph()}
        <p>
          In the world of coding, I find my zen. Coding for me isn&apos;t just
          about typing away on a keyboard; it&apos;s a practice of mindfulness
          and mastery. Each line of code is a step towards perfection, guided by
          the principles of inner strength and virtue.
        </p>
        <p>
          My approach to development is shaped by timeless wisdom. I believe in
          living a life that echoes the philosophies of the great thinkers.
          It&apos;s not just about building software; it&apos;s about
          constructing a mindset that embraces challenges, celebrates growth,
          and cultivates positivity.
        </p>
        <p>
          As I navigate through the complexities of backend development, I am
          constantly reminded of the beauty in simplicity. My aim? To craft
          seamless, efficient, and robust systems that stand the test of time
          and technology.
        </p>
      </>
    );
  };

  return (
    <>
      <Avatar className="h-32 w-32">
        <AvatarImage src="/images/me.png" alt="@me" />
        <AvatarFallback>TE</AvatarFallback>
      </Avatar>
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-5xl">
        Behind the Code: My Journey
      </h1>
      <div className="hidden md:block flex flex-col space-y-4 leading-7 text-2xl">
        {allContent()}
      </div>
      <div className="block flex flex-col text-sm space-y-4 leading-7 md:hidden">
        {theFirstParagraph()}
      </div>
      <Dialog>
        <DialogTrigger className="block md:hidden">Read more</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="pb-4">
              Behind the Code: My Journey
            </DialogTitle>
            <div className="overflow-auto h-half-v flex flex-col space-y-4">
              {allContent()}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

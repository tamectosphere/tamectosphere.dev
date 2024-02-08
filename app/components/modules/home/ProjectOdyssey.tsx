import { Button } from '#app/components/ui/button';
import { RocketSlider } from '#app/components/common/RocketSlider';
import { Link } from '@remix-run/react';
import { useState } from 'react';

export function ProjectOdyssey() {
  const [doneSlide, setDoneSlide] = useState(false);
  const githubUrl = 'https://github.com/tamectosphere';

  const goToGithub = (value: number[]) => {
    if (value[0] === 100) {
      setDoneSlide(true);
    }
  };

  return (
    <>
      <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight lg:text-5xl">
        Behind the Code: A Project Odyssey
      </h1>
      {doneSlide ? (
        <Button
          variant="ghost"
          size="lg"
          className="text-lg no-hover-effect"
          asChild
        >
          <Link to={githubUrl}>Go ride to a Project Odyssey 🚀</Link>
        </Button>
      ) : (
        <RocketSlider
          defaultValue={[0]}
          max={100}
          step={1}
          onValueCommit={(value) => goToGithub(value)}
        />
      )}
    </>
  );
}

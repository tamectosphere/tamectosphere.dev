import { useSpring, animated } from '@react-spring/web';
import { useState } from 'react';

export function HeroBanner() {
  const [renderWelcome, setRenderWelcome] = useState(false);

  // Define a spring for the initial animation
  const [props] = useSpring(
    () => ({
      from: { transform: 'translateY(-500%)' },
      to: [{ transform: 'translateY(100%)' }, { transform: 'translateY(0%)' }],
      config: { duration: 2000 },
      onResolve: () => {
        const timer = setTimeout(() => {
          setRenderWelcome(true);
        }, 1000);
        return () => clearTimeout(timer);
      },
    }),
    []
  );

  // Define a spring for the floating animation
  const [propsFloating] = useSpring(
    {
      from: { transform: 'translateY(0px)' },
      to: async (next) => {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          await next({ transform: 'translateY(-10px)' });
          await next({ transform: 'translateY(0px)' });
        }
      },
      config: { duration: 1000 },
      pause: !renderWelcome, // Pause the animation when renderWelcome is false
    },
    [renderWelcome]
  );

  // Define a spring for the text animation
  const [props3] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
      config: { duration: 10000 },
    }),
    []
  );

  return (
    <>
      <animated.div style={props}>
        <animated.img
          src="/images/digital-element.png"
          className="z-40 w-72 md:w-96 lg:w-[26rem] xl:w-[26rem]"
          alt="Tametosphere Logo"
          style={propsFloating} // Apply the floating animation to the image
        />
      </animated.div>
      {renderWelcome && (
        <>
          <animated.div style={props3} className="text-center pb-4">
            <h1 className="z-40 font-audiowide scroll-m-20 text-4xl font-extrabold tracking-tight md:text-6xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
              <span className="text-ecto-2">TAM</span>
              <span className="text-ecto-1">ECTOSPHERE</span>
            </h1>
            <br />
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight text-ecto-2 md:text-3xl lg:text-5xl">
              Code Alchemist: Turning Ideas into Digital Reality
            </h3>
          </animated.div>
          {/* <div className="straight-lines 2xl:hidden"></div> */}
          {/* <div className="felx flex-col justify-center items-center">
            <span>
              <ChevronDown className="h-4 w-4" />
            </span>
            <span>
              <ChevronDown className="h-4 w-4" />
            </span>
            <span>
              <ChevronDown className="h-4 w-4" />
            </span>
            <span>
              <ChevronDown className="h-4 w-4" />
            </span>
            <span>
              <ChevronDown className="h-4 w-4" />
            </span>
          </div> */}
        </>
      )}
    </>
  );
}

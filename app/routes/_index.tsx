import { useSpring, animated } from '@react-spring/web';
import { useState } from 'react';

export default function Index() {
  const [props] = useSpring(
    () => ({
      from: { transform: 'translateY(-500%)' },
      to: [{ transform: 'translateY(100%)' }, { transform: 'translateY(0%)' }],
      config: { duration: '2000' },
      onResolve: () => {
        const timer = setTimeout(() => {
          setRenderWelcome(true);
        }, 1000);
        return () => clearTimeout(timer);
      },
    }),
    []
  );

  const [renderWelcome, setRenderWelcome] = useState(false);
  const [props3] = useSpring(
    () => ({
      from: { opacity: '0' },
      to: { opacity: '1' },
      config: { duration: '10000' },
    }),
    []
  );

  return (
    <>
      <div className="container h-screen flex flex-col gap-6 items-center justify-center p-0 lg:p-20">
        <animated.div style={props}>
          <img
            src="/images/profile-banner.png"
            className="w-48 md:w-64 lg:w-80 xl:w-80 2xl:w-80"
            alt="Tametosphere Logo"
          />
        </animated.div>
        {renderWelcome && (
          <animated.div style={props3}>
            <h3 className="scroll-m-20 text-xl font-semibold tracking-tight md:text-3xl lg:text-5xl">
              Hi Folk... <br /> Welcome to TamEctosphere
            </h3>
          </animated.div>
        )}
      </div>
      <main className="flex flex-col gap-12 items-center justify-center p-20">
        <section>
          <h1 className="h-half-v blink-affect scroll-m-20 text-2xl font-semibold tracking-tight lg:text-5xl">
            In Progress ...
          </h1>
        </section>
      </main>
    </>
  );
}

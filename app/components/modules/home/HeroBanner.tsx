import { useSpring, animated } from '@react-spring/web';
import { useState } from 'react';

export function HeroBanner() {
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
            BAMMMM! <br /> Welcome to TamEctosphere
          </h3>
        </animated.div>
      )}
    </>
  );
}

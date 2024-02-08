import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '#app/lib/utils';
import { rocketLogo } from '../common/logos/logos';

const RocketSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none select-none items-center',
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-5 w-full grow overflow-hidden rounded-full bg-secondary lg:h-8">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="w-5 rounded-full border-transparent">
      <img
        src={rocketLogo.src}
        alt={rocketLogo.alt}
        className="text-ecto-2 rotate-45 w-10 h-10 lg:w-16 lg:h-16"
      />
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));
RocketSlider.displayName = SliderPrimitive.Root.displayName;

export { RocketSlider };

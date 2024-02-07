import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '#app/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { mainLogos } from '../../common/logos/logos';

export function MainStack() {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="w-screen"
      plugins={[
        Autoplay({
          delay: 1500,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent>
        {mainLogos.map((logo) => (
          <CarouselItem key={logo.alt} className="basis-1/2 xl:basis-1/3">
            <div className="flex flex-col items-center justify-center p-6 overflow-x-hidden">
              <a
                href={logo.href}
                target="_blank"
                rel="noreferrer"
                className="grid size-32 place-items-center rounded-2xl bg-ecto-1 p-4 transition hover:-rotate-6 hover:bg-ecto-1-30 dark:bg-ecto-1 dark:hover:bg-ecto-1-30 sm:size-24 md:size-56"
              >
                <img src={logo.src} alt={logo.alt} />
              </a>
              <span>{logo.alt}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

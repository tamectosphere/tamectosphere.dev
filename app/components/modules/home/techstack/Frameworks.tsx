import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '#app/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const data = [
  { key: 'phoenix', title: 'Pheonix' },
  { key: 'nestjs', title: 'Nest.js' },
];

export function Frameworks() {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="w-full"
      plugins={[
        Autoplay({
          delay: 1500,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {data.map((item) => (
          <CarouselItem
            key={item.key}
            className="overflow-x-hidden pl-2 md:pl-4"
          >
            <div className="flex flex-col items-center justify-center p-6">
              <a
                href={item.title}
                className="grid size-40 place-items-center rounded-2xl bg-violet-600/10 p-4 transition hover:-rotate-6 hover:bg-violet-600/15 dark:bg-violet-200 dark:hover:bg-violet-100 sm:size-24 md:size-56"
              >
                <img
                  src={`/images/${item.key}-framework.png`}
                  alt={`${item.key} logo`}
                />
              </a>
              <span>{item.title}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

// import { logos } from './logos/logos.ts';
// {
//   logos.map((logo, index) => (
//     <CarouselItem key={index} className="overflow-x-hidden pl-2 md:pl-4">
//       <div className="flex flex-col items-center justify-center p-6">
//         <img src={logo.src} alt="" />
//         <span>{logo.column}</span>
//       </div>
//     </CarouselItem>
//   ));
// }

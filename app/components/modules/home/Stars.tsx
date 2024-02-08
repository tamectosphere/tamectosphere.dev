import { useEffect, useState } from 'react';

export function Stars() {
  const [stars, setStars] = useState<any>([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setStars(generateStars(isMobile ? 50 : 100, isMobile));
  }, []);

  function generateStars(count: number, isMobile: boolean) {
    const stars = [];
    const types = isMobile
      ? ['star-small', 'star-medium']
      : ['star-small', 'star-medium', 'star-large'];

    for (let i = 0; i < count; i++) {
      const typeIndex = Math.floor(Math.random() * types.length);
      const type = types[typeIndex];
      const top = `${Math.random() * 100}%`;
      const left = `${Math.random() * 100}%`;

      stars.push({ id: i, type, top, left });
    }

    return stars;
  }

  return (
    <>
      {stars.map((star: any) => (
        <div
          key={star.id}
          className={star.type}
          style={{ position: 'absolute', top: star.top, left: star.left }}
        />
      ))}
    </>
  );
}

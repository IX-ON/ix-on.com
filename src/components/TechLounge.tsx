import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';

export const TechLounge: React.FC = () => {
  const { ref, isVisible } = useFadeIn();

  return (
    <section id="lounge" ref={ref} className={`fade ${isVisible ? 'show' : ''}`}>
      <div className="container-custom split">
        <div className="card order-2 md:order-1">
          <p className="text-xl font-medium tracking-wide">Global innovation community</p>
        </div>
        <div className="order-1 md:order-2">
          <h2>Tech Lounge</h2>
          <p className="text-lg opacity-90 leading-relaxed">
            Where innovators collaborate, experiment and build the next generation of technology solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

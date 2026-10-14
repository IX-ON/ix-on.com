import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';

export const TechHub: React.FC = () => {
  const { ref, isVisible } = useFadeIn();

  return (
    <section id="hub" ref={ref} className={`fade ${isVisible ? 'show' : ''}`}>
      <div className="container-custom split">
        <div>
          <h2>Tech Hub</h2>
          <p className="text-lg opacity-90 leading-relaxed">
            Strategic consulting to define, architect and accelerate digital transformation with precision and scalability.
          </p>
        </div>
        <div className="card">
          <p className="text-xl font-medium tracking-wide">Enterprise-grade architecture design</p>
        </div>
      </div>
    </section>
  );
};

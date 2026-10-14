import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';

export const TechSolution: React.FC = () => {
  const { ref, isVisible } = useFadeIn();

  return (
    <section id="solution" ref={ref} className={`fade ${isVisible ? 'show' : ''}`}>
      <div className="container-custom split">
        <div>
          <h2>Tech Solution</h2>
          <p className="text-lg opacity-90 leading-relaxed">
            Execution engine delivering high-performance systems across software, data, and security.
          </p>
        </div>
        <div className="card">
          <p className="text-xl font-medium tracking-wide">Scalable, secure, production-ready delivery</p>
        </div>
      </div>
    </section>
  );
};

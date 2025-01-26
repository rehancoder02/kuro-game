import React, { useState, useEffect, useRef } from 'react';
import Hero from './sections/Hero';
import Navbar from './components/Navbar';
import News from './sections/News';
import Portfolio from './sections/Protfolio';

const App = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sections = [
    { id: 'hero', component: <Hero /> },
    { id: 'news', component: <News /> },
    { id: 'portfolio', component: <Portfolio /> }
  ];

  const sectionRefs = useRef(sections.map(() => React.createRef()));

  const handleNavigation = (index) => {
    if (isTransitioning || index === activeIndex) return;
    setIsTransitioning(true);
    setActiveIndex(index);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (isTransitioning) return;

      setIsTransitioning(true);
      const direction = e.deltaY > 0 ? 1 : -1;
      const newIndex = Math.min(Math.max(activeIndex + direction, 0), sections.length - 1);
      
      setActiveIndex(newIndex);
      setTimeout(() => setIsTransitioning(false), 1000);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isTransitioning, activeIndex, sections.length]);

  return (
    <div className="app-container bg-black">
      <Navbar activeIndex={activeIndex} handleNavigation={handleNavigation} />
      <div className="sections-container">
        {sections.map((section, index) => (
          <div
            key={section.id}
            ref={sectionRefs.current[index]}
            className={`section ${index === activeIndex ? 'active' : ''}`}
          >
            {React.cloneElement(section.component, { isActive: index === activeIndex })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
import React, { useEffect } from 'react';
import Hero from './components/Hero';
import Project from './components/Project';
import SmoothScroll from './components/SmoothScroll';
import MarqueeScript from './components/MarqueeScript';
import './App.css';

function App() {
  useEffect(() => {
    // Load GSAP script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <SmoothScroll>
      <div className="App">
        <Hero />
        <Project />
        <MarqueeScript />
      </div>
    </SmoothScroll>
  );
}

export default App;
import React, { useState, useEffect } from 'react';

const CursorBlur = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [lerpedPosition, setLerpedPosition] = useState({ x: 0, y: 0 });
  const [isInside, setIsInside] = useState(false);
  const [isInactive, setIsInactive] = useState(false);

  useEffect(() => {
    const sections = [document.getElementById('hero-section'), document.getElementById('navbar-section')];

    const updateMousePosition = (e) => {
      if (isInside) {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setIsInactive(false);
      }
    };
    
    const handleMouseEnter = () => setIsInside(true);
    const handleMouseLeave = () => setIsInside(false);

    sections.forEach((section) => {
      if (section) {
        section.addEventListener('mouseenter', handleMouseEnter);
        section.addEventListener('mouseleave', handleMouseLeave);
      }
    });

    window.addEventListener('mousemove', updateMousePosition);

    // Detect inactivity
    let inactivityTimer;
    const resetInactivity = () => {
      clearTimeout(inactivityTimer);
      setIsInactive(false);
      inactivityTimer = setTimeout(() => setIsInactive(true), 3000);
    };

    window.addEventListener('mousemove', resetInactivity);
    inactivityTimer = setTimeout(() => setIsInactive(true), 3000);

    return () => {
      sections.forEach((section) => {
        if (section) {
          section.removeEventListener('mouseenter', handleMouseEnter);
          section.removeEventListener('mouseleave', handleMouseLeave);
        }
      });
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mousemove', resetInactivity);
      clearTimeout(inactivityTimer);
    };
  }, []);

  useEffect(() => {
    let animationFrame;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      if (isInactive) {
        setMousePosition((prev) => ({
          x: prev.x + (Math.random() - 0.5) * 20,
          y: prev.y + (Math.random() - 0.5) * 20,
        }));
      }
      setLerpedPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.08),
        y: lerp(prev.y, mousePosition.y, 0.08),
      }));
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePosition, isInactive]);

  // Only render the blur if the mouse is inside the hero or navbar section
  return isInside ? (
    <div
      className="pointer-events-none fixed inset-0 z-50 transition-all duration-700"
      style={{
        background: `radial-gradient(800px circle at ${lerpedPosition.x}px ${lerpedPosition.y}px, rgba(255, 214, 170, 0.15), transparent 70%)`,
      }}
    />
  ) : null;
};

export default CursorBlur;

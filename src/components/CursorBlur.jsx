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
    const inactivityTimer = setTimeout(() => setIsInactive(true), 3000);
    const resetInactivity = () => {
      clearTimeout(inactivityTimer);
      setIsInactive(false);
    };

    window.addEventListener('mousemove', resetInactivity);

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
  }, [isInside]);

  useEffect(() => {
    let animationFrame;

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const animate = () => {
      if (isInactive) {
        setMousePosition((prev) => ({
          x: prev.x + (Math.random() - 0.5) * 20, // Random drift
          y: prev.y + (Math.random() - 0.5) * 20,
        }));
      }
      setLerpedPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.05),
        y: lerp(prev.y, mousePosition.y, 0.05),
      }));
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [mousePosition, isInactive]);

  return isInside || isInactive ? (
    <div
      className="pointer-events-none fixed inset-0 z-50 transition-all duration-700"
      style={{
        background: `radial-gradient(600px circle at ${lerpedPosition.x}px ${lerpedPosition.y}px, rgba(29, 78, 216, 0.5), transparent 70%)`,
      }}
    />
  ) : null;
};

export default CursorBlur;

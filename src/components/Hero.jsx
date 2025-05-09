import React, { useEffect, useState, useRef } from "react";
import { gsap } from 'gsap';
import '../grained.js'; // Adjust the import path based on your file structure

const Hero = () => {
  const [time, setTime] = useState("");
  const grainedApplied = useRef(false); // Prevents multiple initializations
  const marqueeRef = useRef(null);
  const marqueeWrapperRef = useRef(null);

  useEffect(() => {
    // Time update function using setTimeout for better efficiency
    const updateTime = () => {
      const options = { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true };
      setTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
      setTimeout(updateTime, 1000);
    };

    updateTime(); // Initial time setup

    return () => clearTimeout(updateTime); // Cleanup function
  }, []);

  useEffect(() => {
    // Apply grained effect only once
    if (!grainedApplied.current) {
      window.grained("#hero-section", {
        animate: true,
        patternWidth: 80,   // Smaller size = denser grain
        patternHeight: 80,
        grainOpacity: 0.2,  // More visible grains
        grainDensity: 4,    // Higher value = more grains per area
        grainWidth: 2,      // Bigger grain particles
        grainHeight: 2,
        grainChaos: 0.8,    // More randomness
        grainSpeed: 35      // Faster animation
      });
      grainedApplied.current = true; // Prevents re-initialization
    }

    // Initialize GSAP marquee animation
    if (marqueeWrapperRef.current) {
      // Reset any previous animations
      gsap.killTweensOf(marqueeWrapperRef.current);
      
      // Clone the marquee items to ensure we have enough content
      const marqueeItems = document.querySelectorAll('.marquee-item');
      
      // Calculate the total width of all items
      let totalWidth = 0;
      marqueeItems.forEach(item => {
        totalWidth += item.offsetWidth;
      });
      
      // Create the animation
      gsap.to(marqueeWrapperRef.current, {
        x: -totalWidth / 2,
        duration: 20,
        ease: "linear",
        repeat: -1
      });
    }
  }, []);

  return (
    <div 
      id="hero-section" 
      className="relative min-h-screen w-full flex items-center justify-start bg-[#e0e0db] border-b-2 border-black px-6 sm:px-12 md:px-24 lg:px-48"
    >
      <div className="text-left w-full relative z-10">
        <p className="text-black text-lg sm:text-xl mb-4">
          Based in Bangalore → <span className="font-bold">{time}</span>
        </p>
        <hr className="border-black w-full my-4" />
        <h1 
          style={{ fontFamily: '"Degular", sans-serif' }} 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-black mt-10 sm:mt-16 md:mt-20 mb-20 sm:mb-32 md:mb-40"
        >
          Hi, this is Vedank
        </h1>

        <p className="text-black text-base sm:text-lg my-2">
          <span className="font-medium">Currently →</span> <span className="font-bold">Undergrad. @Dayananda Sagar Academy of Technology and Management</span>
        </p>
        <p className="text-black text-base sm:text-lg my-2">
          <span className="font-medium">Pursuing →</span> <span className="font-bold">Computer Science and Design</span>
        </p>
        <p className="text-black text-base sm:text-lg my-2">
          <span className="font-medium">Delivering →</span> <span className="font-bold">Experience ☻</span>
        </p>
        
        {/* Marquee Banner - Full Width */}
        <div className="w-full relative">
          <div ref={marqueeRef} className="marquee-container mt-8 overflow-hidden bg-black">
            <div ref={marqueeWrapperRef} className="marquee-wrapper flex">
              {[...Array(15)].map((_, index) => (
                <div 
                  key={index} 
                  className="marquee-item whitespace-nowrap px-4"
                  style={{ 
                    fontFamily: '"Degular", sans-serif', 
                    color: '#e0e0db', 
                    fontWeight: 'bold',
                    fontSize: '20px',
                    padding: '10px 20px'
                  }}
                >
                  SOMETHING BOLD  — IS BREWING —  ☻ —
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

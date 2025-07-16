import React, { useState, useRef, useEffect, useCallback } from 'react';

// Import images from assets
import image1 from '../assets/CreativeDev.jpg';
import image2 from '../assets/iPhone-12-Pro-Wooden-Hands-Compressify.io.jpg';
import image3 from '../assets/SeedheMautRed.jpg';
import image4 from '../assets/final-0000.jpg';
import image5 from '../assets/mockuuups-vJbtSnN5Tag9arPW8NhRtG.jpeg';
import image6 from '../assets/iphone13pro.jpg';
import image7 from '../assets/Screenshot-2025-05-06-224014.png';
import image8 from '../assets/DoesitMatter.jpg';
import image9 from '../assets/car.png'; // Add this line

// Initial image positions to exactly match the reference image layout
const initialImages = [
  {
    id: 1,
    src: image1,
    alt: "Creative Development",
    width: 350,
    height: 350,
    position: { left: "40%", top: "30%" },
    zIndex: 70,
    rotation: 0
  },
  {
    id: 2,
    src: image2,
    alt: "iPhone Pro",
    width: 200,
    height: 300,
    position: { left: "70%", top: "25%" },
    zIndex: 60,
    rotation: 0
  },
  {
    id: 3,
    src: image3,
    alt: "Seedhe Maut Red",
    width: 180,
    height: 180,
    position: { left: "60%", top: "35%" },
    zIndex: 65,
    rotation: 0
  },
  {
    id: 4,
    src: image4,
    alt: "Final Image",
    width: 300,
    height: 300,
    position: { left: "20%", top: "25%" },
    zIndex: 55,
    rotation: 0
  },
  {
    id: 5,
    src: image5,
    alt: "Mockup Design",
    width: 250,
    height: 350,
    position: { left: "35%", top: "55%" },
    zIndex: 50,
    rotation: 0
  },
  {
    id: 6,
    src: image6,
    alt: "iPhone 13 Pro",
    width: 250,
    height: 350,
    position: { left: "65%", top: "55%" },
    zIndex: 45,
    rotation: 0
  },
  {
    id: 7,
    src: image7,
    alt: "Screenshot 2025",
    width: 450,
    height: 450,
    position: { left: "10%", top: "50%" },
    zIndex: 40,
    rotation: 0
  },
  {
    id: 8,
    src: image8,
    alt: "Does it Matter",
    width: 350,
    height: 250,
    position: { left: "35%", top: "10%" },
    zIndex: 35,
    rotation: 0
  },
  {
    id: 9,
    src: image9,
    alt: "Screenshot 2024",
    width: 350,
    height: 250,
    position: { left: "25%", top: "15%" },
    zIndex: 30,
    rotation: 0
  }
];

const Project = () => {
  const [images, setImages] = useState(initialImages);
  const [draggingId, setDraggingId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragPos, setDragPos] = useState({}); // { [id]: { x, y } }
  const [currentDate, setCurrentDate] = useState(new Date());
  const containerRef = useRef(null);

  // Update date every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format date as DD.MM.YY
  const formattedDate = currentDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  }).replace(/\//g, '.');

  // Reset images to initial positions on component mount
  useEffect(() => {
    setImages(initialImages);
    setDragPos({});
  }, []);

  // Drag logic
  const handleDragStart = (e, id) => {
    e.preventDefault();
    const image = images.find(img => img.id === id);
    if (!image) return;
    // Move the dragged image to the top
    setImages(prev =>
      prev.map(img =>
        img.id === id
          ? { ...img, zIndex: Math.max(...prev.map(i => i.zIndex)) + 1 }
          : img
      )
    );
    const imgRect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setDragOffset({
      x: clientX - imgRect.left,
      y: clientY - imgRect.top
    });
    setDraggingId(id);
  };

  useEffect(() => {
    if (draggingId === null) return;
    const move = (e) => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const x = clientX - containerRect.left - dragOffset.x;
      const y = clientY - containerRect.top - dragOffset.y;
      setDragPos(pos => ({ ...pos, [draggingId]: { x, y } }));
    };
    const up = () => setDraggingId(null);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', up);
    window.addEventListener('touchcancel', up);
    document.body.style.cursor = 'grabbing';
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', move);
      window.removeEventListener('touchend', up);
      window.removeEventListener('touchcancel', up);
      document.body.style.cursor = '';
    };
  }, [draggingId, dragOffset]);

  return (
    <section className="relative w-full h-screen bg-[#e0e0db] overflow-hidden">
      {/* Draggable Projects */}
      <div ref={containerRef} className="relative w-full h-full">
        {images.map((image) => {
          // Default position in percent
          const left = image.position.left;
          const top = image.position.top;
          // If dragging, use pixel offset
          const drag = dragPos[image.id];
          return (
            <div
              key={image.id}
              className="absolute cursor-grab active:cursor-grabbing touch-none"
              style={{
                left: drag ? 0 : left,
                top: drag ? 0 : top,
                zIndex: image.zIndex,
                transform: drag
                  ? `translate3d(${drag.x}px, ${drag.y}px, 0) rotate(${image.rotation}deg)`
                  : `rotate(${image.rotation}deg)`,
                transition: draggingId === image.id ? 'none' : 'transform 0.2s ease-out',
                touchAction: 'none',
              }}
              onMouseDown={(e) => handleDragStart(e, image.id)}
              onTouchStart={(e) => handleDragStart(e, image.id)}
            >
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="rounded-lg pointer-events-none select-none shadow-lg"
                draggable="false"
              />
            </div>
          );
        })}
        
        {/* Date and Project Title at bottom left */}
        <div 
          className="absolute bottom-8 left-8 text-black z-[100]"
          style={{ fontFamily: '"Degular", sans-serif' }}
        >
          <div className="text-3xl font-bold">{formattedDate}</div>
          <div className="text-3xl font-bold mt-2">Comprehensive Work</div>
        </div>

        {/* Date and Project Title at top right - ADDED */}
        <div 
          className="absolute top-8 right-8 text-black z-[100] text-right"
          style={{ fontFamily: '"Degular", sans-serif' }}
        >
          <div className="text-3xl font-bold mt-2">FULL STACK DEVELOPER & UX ENGINEER</div>
        </div>
      </div>
    </section>
  );
};

export default Project;
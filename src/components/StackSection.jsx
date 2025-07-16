import React, { useRef, useEffect } from 'react';
import { FaBeer, FaApple, FaAndroid, FaGithub, FaDocker, FaAws, FaDatabase, FaTools, FaCode, FaReact, FaNodeJs, FaGitAlt, FaPython, FaJs, FaHtml5, FaCss3, FaLinux, FaWindows, FaCloud, FaCogs } from 'react-icons/fa';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './StackSection.css';

gsap.registerPlugin(ScrollTrigger);

const stack = [
  {
    category: 'FRONTEND',
    items: [
      { icon: <FaJs className="text-yellow-400" />, label: 'Javascript' },
      { icon: <FaReact className="text-cyan-400" />, label: 'React' },
      { icon: <FaHtml5 className="text-orange-500" />, label: 'HTML5' },
      { icon: <FaCss3 className="text-blue-500" />, label: 'CSS3' },
      { icon: <FaApple className="text-gray-300" />, label: 'Apple' },
    ],
  },
  {
    category: 'BACKEND',
    items: [
      { icon: <FaNodeJs className="text-green-600" />, label: 'Node.Js' },
      { icon: <FaPython className="text-blue-400" />, label: 'Python' },
      { icon: <FaCogs className="text-gray-400" />, label: 'Cogs' },
    ],
  },
  {
    category: 'DATABASE',
    items: [
      { icon: <FaDatabase className="text-blue-700" />, label: 'Database' },
      { icon: <FaCloud className="text-gray-300" />, label: 'Cloud' },
      { icon: <FaLinux className="text-yellow-600" />, label: 'Linux' },
    ],
  },
  {
    category: 'TOOLS',
    items: [
      { icon: <FaGitAlt className="text-orange-600" />, label: 'Git' },
      { icon: <FaDocker className="text-blue-400" />, label: 'Docker' },
      { icon: <FaAws className="text-yellow-600" />, label: 'AWS' },
      { icon: <FaWindows className="text-blue-600" />, label: 'Windows' },
      { icon: <FaTools className="text-gray-400" />, label: 'Tools' },
      { icon: <FaBeer className="text-yellow-400" />, label: 'Beer' },
      { icon: <FaAndroid className="text-green-500" />, label: 'Android' },
      { icon: <FaGithub className="text-black" />, label: 'GitHub' },
      { icon: <FaCode className="text-purple-500" />, label: 'Code' },
    ],
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' } }),
};

const StackSection = () => {
  const myStackRef = useRef(null);

  useEffect(() => {
    if (myStackRef.current) {
      gsap.fromTo(
        myStackRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: myStackRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }
    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  return (
    <section className="w-full min-h-screen flex items-center bg-[#232323]">
      <div className="w-full px-6 sm:px-12 md:px-24 lg:px-48 py-16 flex flex-col gap-12">
        <span
          ref={myStackRef}
          className="font-sans text-gray-200 flex items-center gap-2 mb-2 opacity-0"
          style={{ fontWeight: 400, fontStyle: 'normal', fontSize: '18px', lineHeight: '28px', fontFamily: 'Futura PT, sans-serif' }}
        >
          <span className="spin-slow" style={{ display: 'inline-block', fontSize: '18px', lineHeight: '28px' }}>✻</span> MY STACK
        </span>
        {stack.map((cat, idx) => (
          <div
            key={cat.category}
            className="w-full mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-[minmax(240px,320px)_1fr] items-center w-full gap-x-8 gap-y-2">
              <h2 className="degular-font text-4xl md:text-5xl font-extrabold text-gray-300 tracking-wider text-left whitespace-nowrap mb-0 flex items-center">{cat.category}</h2>
              {cat.category === 'TOOLS' ? (
                <div className="flex flex-wrap gap-x-10 gap-y-6 items-center">
                  {cat.items.map((item, i) => (
                    <motion.div
                      key={item.label}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={fadeIn}
                      className="flex items-center gap-2 text-gray-100 text-lg font-medium bg-[#232323] px-4 py-2 rounded-lg shadow transition-transform duration-300 hover:scale-105 hover:bg-[#1a1a1a]"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="font-sans">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-x-10 gap-y-6 items-center">
                  {cat.items.map((item, i) => (
                    <motion.div
                      key={item.label}
                      custom={i}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.2 }}
                      variants={fadeIn}
                      className="flex items-center gap-2 text-gray-100 text-lg font-medium bg-[#232323] px-4 py-2 rounded-lg shadow transition-transform duration-300 hover:scale-105 hover:bg-[#1a1a1a]"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="font-sans">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StackSection; 
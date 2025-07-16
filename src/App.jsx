import React from 'react'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import CursorBlur from './components/CursorBlur';
import SplineScene from './components/SplineScene';
import SkillsSection from './components/Skills';
import Project from './components/Project'
import StackSection from './components/StackSection';
// import SmoothScroll from './components/SmoothScroll';

const App = () => {
  return (
    <div className="relative bg-[#e0e0db] min-h-screen w-full">
      <CursorBlur/>
      <Navbar/>
      <main>
        <Hero/>
        {/* <StackSection/> */}
        {/* <SplineScene/> */}
        {/* <SkillsSection /> */}
        {/* <Experience/> */}
        <Project/>
      </main>
    </div>
  )
}

export default App;
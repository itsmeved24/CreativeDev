import React from 'react'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import CursorBlur from './components/CursorBlur';
import SplineScene from './components/SplineScene';
import SkillsSection from './components/Skills';
import Project from './components/Project'

const App = () => {
  return (
    <>
    <div className="relative bg-[#e0e0db]">
      <Navbar/>
      <Hero/>
      {/* <SplineScene/> */}
      {/* <SkillsSection /> */}
      {/* <Experience/> */}
      <Project/>
      <CursorBlur/>
      </div>
    </>
  )
}

export default App;
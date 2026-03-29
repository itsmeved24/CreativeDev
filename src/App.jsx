import React from 'react'
import Navbar from './components/Navbar';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import Hero from './components/Hero';
import Experience from './components/Experience';
import SideProjects from './components/SideProjects';
import SplineScene from './components/SplineScene';
import SkillsSection from './components/Skills';
import Project from './components/Project'
import StackSection from './components/StackSection';
import VariantSection from './components/variant/VariantSection';
// import SmoothScroll from './components/SmoothScroll';

const App = () => {
  return (
    <div className="relative bg-[#e0e0db] min-h-screen w-full">
      <Navbar />
      <main>
        <Hero />
        <VariantSection />
        <Experience />
        <SideProjects />
        {/* <StackSection/> */}
        {/* <SplineScene/> */}
        {/* <SkillsSection /> */}
        <Project />
        <Analytics />
        <SpeedInsights />
      </main>
    </div>
  )
}

export default App;
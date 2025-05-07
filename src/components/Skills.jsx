import React from "react";

const skills = {
  Methods: [
    "Problem Solving", "Analytical Thinking", "Wireframing", "Experience Prototyping",
     "User + Stakeholder Journey Mapping", "Usability Testing", 
     "Full Stack Development", "Test-Driven Development", "Performance Optimization"
  ],
  Tools: [
    "VSCode", "Github", "Git", "MongoDB", "Figma",  "Adobe Illustrator",
    "Adobe Photoshop", "Touch Designer", "Spline", "Jupyter Notebook",
    "Canva", "Microsoft Office", "Google Suite", "Slack", "Notion"
  ],
  Technical: [
    "HTML/CSS", "React", "Javascript", "C/C++", "Java", "Python", "MongoDB", "SQL", "MySQL"
  ]
};

const SkillsSection = () => {
  return (
    <div className="w-full mx-auto border border-black px-4 md:px-8 lg:px-16">
      <div className="flex justify-between items-center border-b border-black p-4">
        <h1 className="text-xl font-bold">skills</h1>
        <span className="text-sm italic">in order of relevance / proficiency</span>
      </div>
      <div className="p-8 space-y-16">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="w-full">
            <h2 className="text-xl font-bold mb-6 text-left">{category}</h2>
            <div className="flex flex-wrap justify-start gap-4">
              {items.map((item) => (
                <div key={item} className="border border-black px-4 py-2 text-sm font-medium">
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;

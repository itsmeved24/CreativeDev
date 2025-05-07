import React from 'react';

const experiences = [
  {
    company: 'Navrasa',
    description: 'Lead UI Designer and Developer',
    logo: '/path/to/pinterest-logo.png', // Replace with the actual path
  },
  {
    company: 'Antriksh AI',
    description: 'UI Designer',
    logo: '/path/to/blind-logo.png', // Replace with the actual path
  }
];

const Experience = () => {
  return (
    <div className="w-full bg-[#e0e0db] px-6 md:px-48 py-24">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl md:text-2xl font-bold">Experience</h2>
        <p className="text-sm md:text-base font-medium">
          Years of Experience →
          <span className="font-bold ml-1">1.5</span>
        </p>
      </div>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b pb-4"
          >
            {/* Logo and Details */}
            <div className="flex items-center gap-4">
              <img
                src={exp.logo}
                alt={`${exp.company} logo`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg md:text-xl font-semibold">
                  {exp.company}
                </h3>
                <p className="text-sm md:text-base italic">{exp.description}</p>
              </div>
            </div>
            {/* Arrow Icon */}
            <button className="text-lg md:text-xl border rounded-full p-2 hover:bg-black hover:text-white transition duration-300">
              →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;

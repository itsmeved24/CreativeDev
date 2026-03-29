import React from 'react';

const experiences = [
  {
    company: 'Pinterest',
    description: 'Designing the home of inspiration (Came really far!)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png',
  },
  {
    company: 'Blind',
    description: 'Designing for transparency in the workplace',
    logo: 'https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/v1470777613/hnlrwj8jxqxjidkndzsl.png',
  },
  {
    company: 'Intuit',
    description: 'Making taxes a more delightful experience',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Intuit_logo_2022.svg/2560px-Intuit_logo_2022.svg.png',
  },
  {
    company: 'Uber',
    description: 'Crafting a seamless driver onboarding experience',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png',
  }
];

const Experience = () => {
  return (
    <div className="w-full bg-[#e0e0db] border-b-2 border-black px-6 sm:px-12 md:px-24 lg:px-48 py-16 sm:py-20 md:py-24">
      {/* Header with divider */}
      <div className="flex justify-between items-center mb-8 sm:mb-10 pb-4 border-b-2 border-black">
        <h2
          className="text-xl sm:text-2xl font-bold text-black"
          style={{ fontFamily: '"Degular", sans-serif' }}
        >
          Work Experience
        </h2>
        <p
          className="text-sm sm:text-base text-black"
          style={{ fontFamily: '"Degular", sans-serif' }}
        >
          Years of Experience →
          <span className="font-bold ml-2">6</span>
        </p>
      </div>

      {/* Experience Items with Dividers */}
      <div>
        {experiences.map((exp, index) => (
          <div key={index}>
            <div className="flex justify-between items-center py-6 sm:py-8">
              {/* Logo and Details */}
              <div className="flex items-center gap-4 sm:gap-6 flex-1">
                <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-white rounded-lg flex-shrink-0">
                  <img
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-base sm:text-lg font-bold text-black mb-1"
                    style={{ fontFamily: '"Degular", sans-serif' }}
                  >
                    {exp.company}
                  </h3>
                  <p
                    className="text-sm sm:text-base text-black italic"
                    style={{ fontFamily: '"Degular", sans-serif' }}
                  >
                    {exp.description}
                  </p>
                </div>
              </div>

              {/* Arrow Button */}
              <button
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border-2 border-black rounded-full hover:bg-black hover:text-white transition-all duration-300 flex-shrink-0 ml-4"
                aria-label={`View ${exp.company} details`}
              >
                <span className="text-lg sm:text-xl">→</span>
              </button>
            </div>
            {/* Divider line between items (except last one) */}
            {index < experiences.length - 1 && (
              <div className="border-b-2 border-black"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;

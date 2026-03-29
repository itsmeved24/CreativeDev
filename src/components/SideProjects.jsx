import React from 'react';

const sideProjects = [
    {
        name: 'Windfrost',
        description: 'To unite. to co-reflect',
        icon: 'https://via.placeholder.com/64/87CEEB/000000?text=W',
    },
    {
        name: 'Cup of Tea',
        description: 'Brewing a more meaningful match',
        icon: 'https://via.placeholder.com/64/FFB6C1/000000?text=T',
    }
];

const SideProjects = () => {
    return (
        <div className="w-full bg-[#e0e0db] border-b-2 border-black px-6 sm:px-12 md:px-24 lg:px-48 py-16 sm:py-20 md:py-24">
            {/* Header with divider */}
            <div className="flex justify-between items-center mb-8 sm:mb-10 pb-4 border-b-2 border-black">
                <h2
                    className="text-xl sm:text-2xl font-bold text-black"
                    style={{ fontFamily: '"Degular", sans-serif' }}
                >
                    Side Projects
                </h2>
            </div>

            {/* Project Items with Dividers */}
            <div>
                {sideProjects.map((project, index) => (
                    <div key={index}>
                        <div className="flex justify-between items-center py-6 sm:py-8">
                            {/* Icon and Details */}
                            <div className="flex items-center gap-4 sm:gap-6 flex-1">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-white rounded-lg flex-shrink-0">
                                    <img
                                        src={project.icon}
                                        alt={`${project.name} icon`}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3
                                        className="text-base sm:text-lg font-bold text-black mb-1"
                                        style={{ fontFamily: '"Degular", sans-serif' }}
                                    >
                                        {project.name}
                                    </h3>
                                    <p
                                        className="text-sm sm:text-base text-black italic"
                                        style={{ fontFamily: '"Degular", sans-serif' }}
                                    >
                                        {project.description}
                                    </p>
                                </div>
                            </div>

                            {/* Arrow Button */}
                            <button
                                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border-2 border-black rounded-full hover:bg-black hover:text-white transition-all duration-300 flex-shrink-0 ml-4"
                                aria-label={`View ${project.name} details`}
                            >
                                <span className="text-lg sm:text-xl">→</span>
                            </button>
                        </div>
                        {/* Divider line between items (except last one) */}
                        {index < sideProjects.length - 1 && (
                            <div className="border-b-2 border-black"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SideProjects;

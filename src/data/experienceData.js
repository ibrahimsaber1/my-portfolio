// Default experience data to be used in AdminExperience
export const experienceData = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'AROMA DESIGNS & SOLUTIONS',
    location: 'Cairo, Egypt',
    duration: 'Dec 2024 - Present',
    current: true,
    description: [
      'Developed and optimized production pipeline using OpenPype, integrating DCCs, asset databases, and task management tools',
      'Utilized Vue.js and Flask for task management with Kitsu',
      'Built tools using Django, FastAPI, React, MongoDB, and PostgreSQL',
      'Collaborated with teams to meet production needs and deliver scalable solutions'
    ],
    technologies: ['Python', 'PyQt', 'PySide', 'Django', 'FastAPI', 'React', 'MongoDB', 'PostgreSQL']
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    company: 'Zedny',
    location: 'Cairo, Egypt',
    duration: 'Oct 2024 - Dec 2024',
    current: false,
    description: [
      'Developed full stack web applications using React and Django',
      'Gained experience in integrating RESTful APIs',
      'Utilized Git and CI/CD pipelines to improve code quality',
      'Participated in regular code reviews'
    ],
    technologies: ['React', 'Django', 'REST APIs', 'Git', 'CI/CD']
  },
  {
    id: 3,
    title: 'Medical Representative',
    company: 'Life care pharma',
    location: 'Giza, Egypt',
    duration: 'Apr 2023 - May 2024',
    current: false,
    description: [
      'Promoted pharmaceutical products to healthcare professionals',
      'Built and maintained client relationships',
      'Achieved sales targets consistently'
    ],
    technologies: []
  }
];

// Helper functions
export const getExperienceById = (id) => {
  const experiences = JSON.parse(localStorage.getItem('experiences') || '[]');
  return experiences.find(exp => exp.id === id);
};

export const getCurrentExperience = () => {
  const experiences = JSON.parse(localStorage.getItem('experiences') || '[]');
  return experiences.filter(exp => exp.current);
};
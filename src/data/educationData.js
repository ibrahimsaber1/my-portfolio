// Default education data to be used in AdminEducation
export const educationData = [
  {
    id: 1,
    degree: 'Full Stack Web Development (Python Track)',
    institution: 'Information Technology Institute (ITI)',
    location: 'New Capital Branch',
    duration: 'May 2024 - Oct 2024',
    description: 'Intensive training program focusing on full-stack development with Python'
  },
  {
    id: 2,
    degree: 'Graduate Studies in Biochemistry',
    institution: 'Sadat City University',
    location: '',
    duration: '2022 - 2023',
    description: ''
  },
  {
    id: 3,
    degree: 'B.Sc. in Microbiology & Chemistry',
    institution: 'El Azhar University',
    location: '',
    duration: '2017 - 2021',
    description: ''
  }
];

// Helper functions
export const getEducationById = (id) => {
  const education = JSON.parse(localStorage.getItem('education') || '[]');
  return education.find(edu => edu.id === id);
};

export const getEducationByInstitution = (institution) => {
  const education = JSON.parse(localStorage.getItem('education') || '[]');
  return education.filter(edu => edu.institution === institution);
};
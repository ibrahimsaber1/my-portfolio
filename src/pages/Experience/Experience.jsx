import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import Certificates from '../../components/Certificates/Certificates';
import './Experience.css';

const Experience = () => {
  const { t } = useTranslation();

  const experiences = [
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

  const education = [
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
      duration: '2022 - 2023'
    },
    {
      id: 3,
      degree: 'B.Sc. in Microbiology & Chemistry',
      institution: 'El Azhar University',
      duration: '2017 - 2021'
    }
  ];

  return (
    <motion.div 
      className="experience-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container">
        {/* Page Header */}
        <motion.div 
          className="page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>{t('experience.title')}</h1>
          <p>My professional journey and educational background</p>
        </motion.div>

        {/* Work Experience Section */}
        <section className="experience-section">
          <h2 className="section-title">
            <FiBriefcase />
            Work Experience
          </h2>
          <div className="timeline">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className={`timeline-item ${exp.current ? 'current' : ''}`}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3>{exp.title}</h3>
                    <span className="company">{exp.company}</span>
                  </div>
                  <div className="timeline-meta">
                    <span>
                      <FiCalendar />
                      {exp.duration}
                      {exp.current && <span className="current-badge">Current</span>}
                    </span>
                    <span>
                      <FiMapPin />
                      {exp.location}
                    </span>
                  </div>
                  <ul className="timeline-description">
                    {exp.description.map((desc, idx) => (
                      <li key={idx}>{desc}</li>
                    ))}
                  </ul>
                  {exp.technologies.length > 0 && (
                    <div className="technologies">
                      {exp.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section className="education-section">
          <h2 className="section-title">
            <FiCalendar />
            Education
          </h2>
          <div className="education-grid">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                className="education-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3>{edu.degree}</h3>
                <p className="institution">{edu.institution}</p>
                {edu.location && <p className="location">{edu.location}</p>}
                <p className="duration">{edu.duration}</p>
                {edu.description && <p className="description">{edu.description}</p>}
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Experience;
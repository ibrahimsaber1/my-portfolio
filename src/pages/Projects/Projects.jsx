import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useProjects } from '../../hooks/useProjects';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import './Projects.css';

const Projects = () => {
  const { t } = useTranslation();
  const { projects, loading, error, getProjectsByCategory } = useProjects();
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);

  const categories = [
    { id: 'all', label: t('projects.categories.all') },
    { id: 'fullstack', label: t('projects.categories.fullstack') },
    { id: 'dataScience', label: t('projects.categories.dataScience') },
    { id: 'vfx', label: t('projects.categories.vfx') },
    { id: 'python', label: t('projects.categories.python') },
    { id: 'javascript', label: t('projects.categories.javascript') }
  ];

  useEffect(() => {
    setFilteredProjects(getProjectsByCategory(activeCategory));
  }, [activeCategory, projects, getProjectsByCategory]);

  if (loading) return <LoadingScreen />;
  if (error) return <div className="error-message">Error loading projects</div>;

  return (
    <motion.div 
      className="projects-page"
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
          <h1>{t('projects.title')}</h1>
          <p>Explore my portfolio of software development and data science projects</p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="category-filter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="projects-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.p 
            className="no-projects"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No projects found in this category.
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default Projects;
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FiGithub, FiExternalLink, FiArrowLeft, 
  FiCalendar, FiUsers, FiTag 
} from 'react-icons/fi';
import { useProject } from '../../hooks/useProjects';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { project, relatedProjects, loading, error } = useProject(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) return <LoadingScreen />;
  if (error || !project) {
    return (
      <div className="error-container">
        <h2>Project not found</h2>
        <Link to="/projects" className="btn btn-primary">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      className="project-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container">
        {/* Header */}
        <motion.div 
          className="project-detail-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button 
            className="back-button"
            onClick={() => navigate('/projects')}
          >
            <FiArrowLeft />
            Back to Projects
          </button>

          <div className="project-meta">
            <span className="project-category">
              <FiTag />
              {project.category}
            </span>
            <span className="project-date">
              <FiCalendar />
              {project.date}
            </span>
            {project.team && (
              <span className="project-team">
                <FiUsers />
                Team of {project.teamSize}
              </span>
            )}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="project-detail-content">
          <motion.div 
            className="project-main"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1>{project.title}</h1>
            
            <div className="project-image">
              <img 
                src={project.image} 
                alt={project.title}
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/800x400?text=${project.title}`;
                }}
              />
            </div>

            <div className="project-description">
              <h2>About this project</h2>
              <p>{project.description}</p>
            </div>

            {project.features && (
              <div className="project-features">
                <h2>Key Features</h2>
                <ul>
                  {project.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          <motion.div 
            className="project-sidebar"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="project-actions">
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <FiExternalLink />
                  {t('projects.details.liveDemo')}
                </a>
              )}
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  <FiGithub />
                  {t('projects.details.sourceCode')}
                </a>
              )}
            </div>

            <div className="project-tech">
              <h3>{t('projects.details.technologies')}</h3>
              <div className="tech-list">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <motion.div 
            className="related-projects"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2>Related Projects</h2>
            <div className="related-projects-grid">
              {relatedProjects.map((relatedProject) => (
                <ProjectCard 
                  key={relatedProject.id} 
                  project={relatedProject} 
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
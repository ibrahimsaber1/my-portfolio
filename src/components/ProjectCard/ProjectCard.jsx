import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiUsers } from 'react-icons/fi';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  const {
    id,
    title,
    category,
    description,
    image,
    technologies,
    liveUrl,
    githubUrl,
    team,
    teamSize
  } = project;

  return (
    <motion.div
      className="project-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
    >
      <Link to={`/projects/${id}`} className="project-card-link">
        <div className="project-image">
          <img 
            src={image} 
            alt={title}
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/400x300?text=${title}`;
            }}
          />
          <div className="project-overlay">
            <span className="project-category">{category}</span>
          </div>
        </div>

        <div className="project-content">
          <h3 className="project-title">{title}</h3>
          <p className="project-description">{description}</p>

          <div className="project-tech">
            {technologies.slice(0, 4).map((tech, index) => (
              <span key={index} className="tech-tag">
                {tech}
              </span>
            ))}
            {technologies.length > 4 && (
              <span className="tech-tag more">+{technologies.length - 4}</span>
            )}
          </div>

          <div className="project-footer">
            <div className="project-meta">
              {team && (
                <span className="team-indicator">
                  <FiUsers />
                  Team of {teamSize}
                </span>
              )}
            </div>

            <div className="project-links">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="View on GitHub"
                >
                  <FiGithub />
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="View live demo"
                >
                  <FiExternalLink />
                </a>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
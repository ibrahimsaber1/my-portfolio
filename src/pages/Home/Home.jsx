import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  FiDownload, FiGithub, FiLinkedin, FiMail,
  FiCode, FiDatabase, FiLayers, FiTool
} from 'react-icons/fi';
import { useProjects } from '../../hooks/useProjects';
import { useSkills } from '../../hooks/useSkills';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import SkillCard from '../../components/SkillCard/SkillCard';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();
  const { projects } = useProjects();
  const { skills } = useSkills();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Featured projects (top 3)
  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <motion.div 
              className="hero-text"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1>
                <span className="greeting">{t('hero.greeting')}</span>
                <span className="name">{t('hero.name')}</span>
              </h1>
              <h2 className="title">{t('hero.title')}</h2>
              <p className="subtitle">{t('hero.subtitle')}</p>
              
              <div className="hero-cta">
                <Link to="/projects" className="btn btn-primary">
                  <FiCode />
                  {t('hero.cta.projects')}
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  <FiMail />
                  {t('hero.cta.contact')}
                </Link>
                <a 
                  href="/cv/Ibrahim_Saber_CV.pdf" 
                  download 
                  className="btn btn-outline"
                >
                  <FiDownload />
                  {t('hero.cta.cv')}
                </a>
              </div>

              <div className="social-links">
                <a 
                  href="https://github.com/ibrahimsaber1" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <FiGithub />
                </a>
                <a 
                  href="https://www.linkedin.com/in/ibrahim1saber/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin />
                </a>
                <a 
                  href="mailto:ibrahimsaber622@gmail.com"
                  aria-label="Email"
                >
                  <FiMail />
                </a>
              </div>
            </motion.div>

            <motion.div 
              className="hero-image"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="image-wrapper">
                <img 
                  src="/images/profile-photo.jpg" 
                  alt="Ibrahim Saber"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x400?text=IS";
                  }}
                />
                <div className="image-decoration"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section section">
        <div className="container">
          <motion.div 
            className="section-header"
            {...fadeInUp}
          >
            <h2>{t('about.title')}</h2>
            <p>{t('about.description')}</p>
          </motion.div>

          <motion.div 
            className="stats-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div className="stat-card" {...fadeInUp}>
              <h3>2+</h3>
              <p>{t('about.stats.yearsExperience')}</p>
            </motion.div>
            <motion.div className="stat-card" {...fadeInUp}>
              <h3>25+</h3>
              <p>{t('about.stats.projectsCompleted')}</p>
            </motion.div>
            <motion.div className="stat-card" {...fadeInUp}>
              <h3>15+</h3>
              <p>{t('about.stats.technologies')}</p>
            </motion.div>
            <motion.div className="stat-card" {...fadeInUp}>
              <h3>10+</h3>
              <p>{t('about.stats.certifications')}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section section">
        <div className="container">
          <motion.div 
            className="section-header"
            {...fadeInUp}
          >
            <h2>{t('skills.title')}</h2>
          </motion.div>

          <div className="skills-categories">
            {Object.entries(skills).map(([category, categorySkills]) => (
              <motion.div 
                key={category}
                className="skill-category"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h3>{t(`skills.categories.${category}`)}</h3>
                <div className="skills-grid">
                  {categorySkills.map((skill) => (
                    <SkillCard key={skill.name} skill={skill} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="projects-section section">
        <div className="container">
          <motion.div 
            className="section-header"
            {...fadeInUp}
          >
            <h2>{t('projects.title')}</h2>
            <Link to="/projects" className="view-all">
              {t('projects.viewAll')} →
            </Link>
          </motion.div>

          <motion.div 
            className="projects-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
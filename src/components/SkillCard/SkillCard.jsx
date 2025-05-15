import React from 'react';
import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import './SkillCard.css';

const SkillCard = ({ skill }) => {
  const { name, level, icon } = skill;

  // Get the icon component dynamically
  const getIcon = () => {
    const IconComponent = icon.startsWith('Fa') ? FaIcons[icon] : SiIcons[icon];
    return IconComponent ? <IconComponent /> : null;
  };

  return (
    <motion.div
      className="skill-card"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="skill-icon">
        {getIcon()}
      </div>
      <h4 className="skill-name">{name}</h4>
      <div className="skill-level">
        <div className="skill-level-bar">
          <motion.div 
            className="skill-level-fill"
            initial={{ width: 0 }}
            whileInView={{ width: `${level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
        <span className="skill-level-text">{level}%</span>
      </div>
    </motion.div>
  );
};

export default SkillCard;
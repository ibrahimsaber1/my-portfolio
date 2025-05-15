import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiCalendar, FiAward } from 'react-icons/fi';
import { certificatesData } from '../../data/certificatesData';
import './Certificates.css';

const Certificates = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique organizations
  const organizations = ['all', ...new Set(certificatesData.map(cert => cert.organization))];

  const filteredCertificates = selectedCategory === 'all' 
    ? certificatesData 
    : certificatesData.filter(cert => cert.organization === selectedCategory);

  return (
    <div className="certificates-section">
      <h2 className="section-title">
        <FiAward />
        Certificates & Achievements
      </h2>

      {/* Filter by Organization */}
      <div className="org-filter">
        {organizations.map((org) => (
          <button
            key={org}
            className={`filter-btn ${selectedCategory === org ? 'active' : ''}`}
            onClick={() => setSelectedCategory(org)}
          >
            {org === 'all' ? 'All Organizations' : org}
          </button>
        ))}
      </div>

      {/* Certificates Grid */}
      <div className="certificates-grid">
        {filteredCertificates.map((certificate, index) => (
          <motion.div
            key={certificate.id}
            className="certificate-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="certificate-header">
              <FiAward className="certificate-icon" />
              <span className="certificate-date">
                <FiCalendar />
                {certificate.issueDate}
              </span>
            </div>
            
            <h3>{certificate.title}</h3>
            <p className="certificate-org">{certificate.organization}</p>
            
            <div className="certificate-skills">
              {certificate.skills.map((skill, idx) => (
                <span key={idx} className="skill-tag">{skill}</span>
              ))}
            </div>
            
            <div className="certificate-actions">
              <a 
                href={certificate.image} 
                target="_blank" 
                rel="noopener noreferrer"
                className="view-certificate"
              >
                <FiExternalLink />
                View Certificate
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiExternalLink, FiCalendar, FiAward, FiFile } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { useCertificates } from '../../hooks/useCertificates';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import './Certificates.css';

const Certificates = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [imageErrors, setImageErrors] = useState({});
  const { t } = useTranslation();
  const { certificates, loading, error, getCertificatesByOrganization } = useCertificates();

  if (loading) return <LoadingScreen />;
  if (error) return <div className="error-message">Error loading certificates</div>;

  // Get unique organizations
  const organizations = ['all', ...new Set(certificates.map(cert => cert.organization))];

  const filteredCertificates = selectedCategory === 'all' 
    ? certificates 
    : getCertificatesByOrganization(selectedCategory);

  const handleImageError = (certificateId) => {
    setImageErrors(prev => ({
      ...prev,
      [certificateId]: true
    }));
  };

  return (
    <div className="certificates-section">
      <h2 className="section-title">
        <FiAward />
        {t('certificates.title')}
      </h2>

      {/* Filter by Organization */}
      <div className="org-filter">
        {organizations.map((org) => (
          <button
            key={org}
            className={`filter-btn ${selectedCategory === org ? 'active' : ''}`}
            onClick={() => setSelectedCategory(org)}
          >
            {org === 'all' ? t('certificates.allOrganizations') : org}
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
              {imageErrors[certificate.id] ? (
                <div className="certificate-placeholder">
                  <FiFile size={40} />
                  <p>{t('certificates.viewCertificate')}</p>
                </div>
              ) : (
                <Link 
                  to={`/certificates/${certificate.id}`}
                  className="view-certificate"
                >
                  <FiExternalLink />
                  {t('certificates.viewCertificate')}
                </Link>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
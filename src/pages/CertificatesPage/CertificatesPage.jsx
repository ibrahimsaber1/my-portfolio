import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Certificates from '../../components/Certificates/Certificates';
import './CertificatesPage.css';

const CertificatesPage = () => {
  const { t } = useTranslation();

  return (
    <motion.div 
      className="certificates-page"
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
          <h1>{t('certificates.title')}</h1>
          <p>Showcase of professional certifications and achievements</p>
        </motion.div>

        {/* Certificates Component */}
        <Certificates />
      </div>
    </motion.div>
  );
};

export default CertificatesPage;
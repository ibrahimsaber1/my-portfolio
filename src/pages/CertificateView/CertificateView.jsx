import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiDownload, FiArrowLeft, FiCalendar, FiAward, FiTag, FiAlertCircle } from 'react-icons/fi';
import { useCertificates } from '../../hooks/useCertificates';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import './CertificateView.css';

const CertificateView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { certificates, loading } = useCertificates();
  const [certificate, setCertificate] = useState(null);
  const [fileType, setFileType] = useState('');
  const [error, setError] = useState(null);
  const [fileError, setFileError] = useState(false);

  useEffect(() => {
    if (!loading) {
      const foundCertificate = certificates.find(cert => cert.id.toString() === id);
      if (foundCertificate) {
        setCertificate(foundCertificate);
        
        // Determine file type from extension
        const imageUrl = foundCertificate.image;
        if (imageUrl) {
          if (imageUrl.toLowerCase().endsWith('.pdf')) {
            setFileType('pdf');
          } else if (
            imageUrl.toLowerCase().endsWith('.jpg') || 
            imageUrl.toLowerCase().endsWith('.jpeg') || 
            imageUrl.toLowerCase().endsWith('.png') || 
            imageUrl.toLowerCase().endsWith('.gif')
          ) {
            setFileType('image');
          } else {
            setFileType('unknown');
          }
        }
      } else {
        setError('Certificate not found');
      }
    }
  }, [id, certificates, loading]);

  const handleFileError = () => {
    setFileError(true);
  };

  if (loading) return <LoadingScreen />;
  if (error || !certificate) {
    return (
      <div className="error-container">
        <h2>{error || 'Certificate not found'}</h2>
        <Link to="/certificates" className="btn btn-primary">
          {t('certificates.backTo')}
        </Link>
      </div>
    );
  }

  const certificateUrl = `/cv/certificates${certificate.image.substring(certificate.image.lastIndexOf('/'))}`;
  const downloadUrl = certificateUrl;
  const fileName = certificate.image.split('/').pop();

  return (
    <motion.div 
      className="certificate-view-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container">
        {/* Header */}
        <motion.div 
          className="certificate-view-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button 
            className="back-button"
            onClick={() => navigate('/certificates')}
          >
            <FiArrowLeft />
            {t('certificates.backTo')}
          </button>

          <div className="certificate-meta">
            <span className="certificate-organization">
              <FiAward />
              {certificate.organization}
            </span>
            <span className="certificate-date">
              <FiCalendar />
              {certificate.issueDate}
            </span>
            {certificate.credentialId && (
              <span className="certificate-id">
                <FiTag />
                ID: {certificate.credentialId}
              </span>
            )}
          </div>
        </motion.div>

        {/* Certificate Title */}
        <motion.h1 
          className="certificate-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {certificate.title}
        </motion.h1>

        {/* Certificate Display */}
        <motion.div 
          className="certificate-display"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {fileError ? (
            <div className="error-display">
              <FiAlertCircle size={48} />
              <p>{t('certificates.unsupportedFormat')}</p>
              <p>{t('certificates.checkAdmin')}</p>
              <p className="file-path">{certificateUrl}</p>
            </div>
          ) : fileType === 'pdf' ? (
            <div className="pdf-container">
              <iframe 
                src={certificateUrl} 
                title={certificate.title}
                className="pdf-viewer"
                onError={handleFileError}
              />
              <a 
                href={downloadUrl} 
                download={fileName}
                className="btn btn-primary download-btn"
              >
                <FiDownload />
                {t('certificates.download')}
              </a>
            </div>
          ) : fileType === 'image' ? (
            <div className="image-container">
              <img 
                src={certificateUrl} 
                alt={certificate.title}
                className="certificate-image"
                onError={handleFileError}
              />
              <a 
                href={downloadUrl} 
                download={fileName}
                className="btn btn-primary download-btn"
              >
                <FiDownload />
                {t('certificates.download')}
              </a>
            </div>
          ) : (
            <div className="error-display">
              <FiAlertCircle size={48} />
              <p>{t('certificates.unsupportedFormat')}</p>
              <p>{t('certificates.checkAdmin')}</p>
              <p className="file-path">{certificateUrl}</p>
            </div>
          )}
        </motion.div>

        {/* Skills Section */}
        {certificate.skills && certificate.skills.length > 0 && (
          <motion.div 
            className="certificate-skills-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3>{t('certificates.skills')}</h3>
            <div className="skills-list">
              {certificate.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CertificateView;
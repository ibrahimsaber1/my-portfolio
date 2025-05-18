import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash, FiSave, FiX, FiUpload, FiCalendar, FiAward } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { certificatesData as defaultCertificatesData } from '../../../data/certificatesData';
import './AdminCertificates.css';

const AdminCertificates = () => {
  const { t } = useTranslation();
  const [certificates, setCertificates] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    issueDate: '',
    credentialId: '',
    image: '',
    skills: []
  });
  const [imageFile, setImageFile] = useState(null);

  // Load certificates from localStorage or use default data
  useEffect(() => {
    const savedCertificates = localStorage.getItem('certificates');
    if (savedCertificates) {
      setCertificates(JSON.parse(savedCertificates));
    } else {
      // Initialize with default data if nothing in localStorage
      setCertificates(defaultCertificatesData);
      localStorage.setItem('certificates', JSON.stringify(defaultCertificatesData));
    }
  }, []);

  // Save certificates to localStorage
  const saveCertificates = (updatedCertificates) => {
    localStorage.setItem('certificates', JSON.stringify(updatedCertificates));
    setCertificates(updatedCertificates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Handle file upload here (in real app, upload to server)
    let imageUrl = formData.image;
    if (imageFile) {
      // Simulate file upload - in a real app, you'd upload to a server
      imageUrl = `/certificates/${imageFile.name}`;
    }

    const certificateData = {
      ...formData,
      image: imageUrl,
      id: editingId === 'new' ? Date.now() : parseInt(editingId)
    };

    if (editingId === 'new') {
      // Add new certificate
      saveCertificates([certificateData, ...certificates]);
    } else {
      // Update existing certificate
      const updatedCertificates = certificates.map(cert =>
        cert.id === parseInt(editingId) ? certificateData : cert
      );
      saveCertificates(updatedCertificates);
    }
    resetForm();
  };

  const handleEdit = (certificate) => {
    setFormData({
      title: certificate.title,
      organization: certificate.organization,
      issueDate: certificate.issueDate,
      credentialId: certificate.credentialId || '',
      image: certificate.image,
      skills: certificate.skills || []
    });
    setEditingId(certificate.id.toString());
  };

  const handleDelete = (id) => {
    if (window.confirm(t('common.confirmDelete'))) {
      const filteredCertificates = certificates.filter(cert => cert.id !== id);
      saveCertificates(filteredCertificates);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill);
    setFormData(prev => ({ ...prev, skills }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Preview the file or handle it as needed
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      organization: '',
      issueDate: '',
      credentialId: '',
      image: '',
      skills: []
    });
    setEditingId(null);
    setImageFile(null);
  };

  // Get unique organizations for filtering
  const organizations = [...new Set(certificates.map(cert => cert.organization))];

  return (
    <div className="admin-certificates">
      <div className="container">
        <div className="admin-header">
          <h1>{t('admin.dashboard.sections.certificates')}</h1>
          <button 
            className="btn btn-primary"
            onClick={() => setEditingId('new')}
          >
            <FiPlus />
            {t('common.add')} {t('certificates.certificate')}
          </button>
        </div>

        {/* Form */}
        {editingId && (
          <motion.div 
            className="certificate-form"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="form-header">
              <h2>{editingId === 'new' ? t('certificates.addNew') : t('certificates.edit')}</h2>
              <button 
                className="btn-icon"
                onClick={resetForm}
              >
                <FiX />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>{t('certificates.certificateTitle')}</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="e.g., Professional Certification in Data Science"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{t('certificates.organization')}</label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="e.g., Google"
                  />
                </div>

                <div className="form-group">
                  <label>{t('certificates.issueDate')}</label>
                  <input
                    type="text"
                    name="issueDate"
                    value={formData.issueDate}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="e.g., Oct 2024"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>{t('certificates.credentialId')} ({t('common.optional')})</label>
                <input
                  type="text"
                  name="credentialId"
                  value={formData.credentialId || ''}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., ABCD1234"
                />
              </div>

              <div className="form-group">
                <label>{t('certificates.skills')} ({t('common.commaSeparated')})</label>
                <input
                  type="text"
                  value={formData.skills.join(', ')}
                  onChange={handleSkillsChange}
                  className="form-input"
                  placeholder="e.g., Python, Machine Learning, Data Analysis"
                />
              </div>

              <div className="form-group">
                <label>{t('certificates.certificateImage')}</label>
                <div className="file-upload-area">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    className="file-input"
                    id="certificate-file"
                  />
                  <label htmlFor="certificate-file" className="file-label">
                    <FiUpload />
                    {imageFile ? imageFile.name : t('certificates.uploadCertificate')}
                  </label>
                </div>
                {formData.image && !imageFile && (
                  <p className="current-file">{t('common.current')}: {formData.image}</p>
                )}
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  <FiSave />
                  {editingId === 'new' ? t('certificates.addCertificate') : t('certificates.updateCertificate')}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  {t('common.cancel')}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Certificates List */}
        <div className="certificates-list">
          <div className="organizations-sidebar">
            <h3>{t('certificates.filterBy')}</h3>
            <div className="organization-list">
              {organizations.map(org => (
                <div key={org} className="organization-item">
                  <span className="org-name">{org}</span>
                  <span className="org-count">
                    {certificates.filter(cert => cert.organization === org).length}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="certificates-grid">
            {certificates.map((certificate) => (
              <motion.div 
                key={certificate.id}
                className="certificate-item"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="certificate-content">
                  <div className="certificate-header">
                    <div className="certificate-icon">
                      <FiAward />
                    </div>
                    <div className="certificate-date">
                      <FiCalendar />
                      {certificate.issueDate}
                    </div>
                  </div>
                  
                  <h3>{certificate.title}</h3>
                  <p className="organization">{certificate.organization}</p>
                  
                  {certificate.credentialId && (
                    <p className="credential-id">ID: {certificate.credentialId}</p>
                  )}
                  
                  <div className="certificate-skills">
                    {certificate.skills.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                  
                  <div className="certificate-path">
                    {certificate.image}
                  </div>
                </div>
                <div className="certificate-actions">
                  <button 
                    className="btn-icon"
                    onClick={() => handleEdit(certificate)}
                    title={t('common.edit')}
                  >
                    <FiEdit />
                  </button>
                  <button 
                    className="btn-icon delete"
                    onClick={() => handleDelete(certificate.id)}
                    title={t('common.delete')}
                  >
                    <FiTrash />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCertificates;
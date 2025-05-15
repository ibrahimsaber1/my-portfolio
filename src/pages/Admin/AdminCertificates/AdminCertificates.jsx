import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash, FiSave, FiUpload, FiX } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
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

  // Load certificates from localStorage
  useEffect(() => {
    const savedCertificates = localStorage.getItem('certificates');
    if (savedCertificates) {
      setCertificates(JSON.parse(savedCertificates));
    } else {
      // Load default certificatesData if none in localStorage
      const { certificatesData } = require('../../../data/certificatesData');
      setCertificates(certificatesData);
      localStorage.setItem('certificates', JSON.stringify(certificatesData));
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
      // Simulate file upload
      imageUrl = `/certificates/${imageFile.name}`;
    }

    const certificateData = {
      ...formData,
      image: imageUrl,
      id: editingId === 'new' ? Date.now() : editingId
    };

    if (editingId === 'new') {
      // Add new certificate
      saveCertificates([certificateData, ...certificates]);
    } else {
      // Update existing certificate
      const updatedCertificates = certificates.map(cert =>
        cert.id === editingId ? certificateData : cert
      );
      saveCertificates(updatedCertificates);
    }
    resetForm();
  };

  const handleEdit = (certificate) => {
    setFormData(certificate);
    setEditingId(certificate.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
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

  return (
    <div className="admin-certificates">
      <div className="container">
        <div className="admin-header">
          <h1>Manage Certificates</h1>
          <button 
            className="btn btn-primary"
            onClick={() => setEditingId('new')}
          >
            <FiPlus />
            Add New Certificate
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
              <h2>{editingId === 'new' ? 'Add New Certificate' : 'Edit Certificate'}</h2>
              <button 
                className="btn-icon"
                onClick={resetForm}
              >
                <FiX />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Certificate Title</label>
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
                  <label>Organization</label>
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
                  <label>Issue Date</label>
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
                <label>Credential ID (Optional)</label>
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
                <label>Skills (comma-separated)</label>
                <input
                  type="text"
                  value={formData.skills.join(', ')}
                  onChange={handleSkillsChange}
                  className="form-input"
                  placeholder="e.g., Python, Machine Learning, Data Analysis"
                />
              </div>

              <div className="form-group">
                <label>Certificate Image/PDF</label>
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
                    {imageFile ? imageFile.name : 'Upload Certificate'}
                  </label>
                </div>
                {formData.image && !imageFile && (
                  <p className="current-file">Current: {formData.image}</p>
                )}
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  <FiSave />
                  {editingId === 'new' ? 'Add Certificate' : 'Update Certificate'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Certificates List */}
        <div className="certificates-list">
          {certificates.map((certificate) => (
            <motion.div 
              key={certificate.id}
              className="certificate-item"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="certificate-content">
                <h3>{certificate.title}</h3>
                <p className="organization">{certificate.organization}</p>
                <div className="certificate-meta">
                  <span>{certificate.issueDate}</span>
                  {certificate.credentialId && (
                    <span>ID: {certificate.credentialId}</span>
                  )}
                </div>
                <div className="certificate-skills">
                  {certificate.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="certificate-actions">
                <button 
                  className="btn-icon"
                  onClick={() => handleEdit(certificate)}
                >
                  <FiEdit />
                </button>
                <button 
                  className="btn-icon delete"
                  onClick={() => handleDelete(certificate.id)}
                >
                  <FiTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCertificates;
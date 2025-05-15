import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash, FiSave } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import './AdminEducation.css';

const AdminEducation = () => {
  const { t } = useTranslation();
  const [educations, setEducations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    location: '',
    duration: '',
    description: ''
  });

  // Load education from localStorage or API
  useEffect(() => {
    const savedEducation = localStorage.getItem('education');
    if (savedEducation) {
      setEducations(JSON.parse(savedEducation));
    }
  }, []);

  // Save education to localStorage
  const saveEducation = (updatedEducation) => {
    localStorage.setItem('education', JSON.stringify(updatedEducation));
    setEducations(updatedEducation);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Update existing education
      const updatedEducation = educations.map(edu =>
        edu.id === editingId ? { ...formData, id: editingId } : edu
      );
      saveEducation(updatedEducation);
    } else {
      // Add new education
      const newEducation = {
        ...formData,
        id: Date.now()
      };
      saveEducation([newEducation, ...educations]);
    }
    resetForm();
  };

  const handleEdit = (education) => {
    setFormData(education);
    setEditingId(education.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this education?')) {
      const filteredEducation = educations.filter(edu => edu.id !== id);
      saveEducation(filteredEducation);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      degree: '',
      institution: '',
      location: '',
      duration: '',
      description: ''
    });
    setEditingId(null);
  };

  return (
    <div className="admin-education">
      <div className="container">
        <div className="admin-header">
          <h1>Manage Education</h1>
          <button 
            className="btn btn-primary"
            onClick={() => setEditingId('new')}
          >
            <FiPlus />
            Add New Education
          </button>
        </div>

        {/* Form */}
        {editingId && (
          <motion.div 
            className="education-form"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Degree</label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="e.g., Bachelor of Science in Computer Science"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Institution</label>
                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g., Cairo, Egypt"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="e.g., 2017 - 2021"
                />
              </div>

              <div className="form-group">
                <label>Description (Optional)</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-textarea"
                  rows="3"
                  placeholder="Add any relevant details about your education"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  <FiSave />
                  {editingId === 'new' ? 'Add Education' : 'Update Education'}
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

        {/* Education List */}
        <div className="education-list">
          {educations.map((education) => (
            <motion.div 
              key={education.id}
              className="education-item"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="education-content">
                <h3>{education.degree}</h3>
                <p className="institution">{education.institution}</p>
                <div className="education-meta">
                  {education.location && <span>{education.location}</span>}
                  <span>{education.duration}</span>
                </div>
                {education.description && (
                  <p className="description">{education.description}</p>
                )}
              </div>
              <div className="education-actions">
                <button 
                  className="btn-icon"
                  onClick={() => handleEdit(education)}
                >
                  <FiEdit />
                </button>
                <button 
                  className="btn-icon delete"
                  onClick={() => handleDelete(education.id)}
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

export default AdminEducation;
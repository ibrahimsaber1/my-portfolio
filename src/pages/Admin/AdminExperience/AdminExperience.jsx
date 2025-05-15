import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash, FiSave, FiX } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import './AdminExperience.css';

const AdminExperience = () => {
  const { t } = useTranslation();
  const [experiences, setExperiences] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    duration: '',
    current: false,
    description: [''],
    technologies: []
  });

  // Load experiences from localStorage or API
  useEffect(() => {
    const savedExperiences = localStorage.getItem('experiences');
    if (savedExperiences) {
      setExperiences(JSON.parse(savedExperiences));
    }
  }, []);

  // Save experiences to localStorage
  const saveExperiences = (updatedExperiences) => {
    localStorage.setItem('experiences', JSON.stringify(updatedExperiences));
    setExperiences(updatedExperiences);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Update existing experience
      const updatedExperiences = experiences.map(exp =>
        exp.id === editingId ? { ...formData, id: editingId } : exp
      );
      saveExperiences(updatedExperiences);
    } else {
      // Add new experience
      const newExperience = {
        ...formData,
        id: Date.now()
      };
      saveExperiences([newExperience, ...experiences]);
    }
    resetForm();
  };

  const handleEdit = (experience) => {
    setFormData(experience);
    setEditingId(experience.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      const filteredExperiences = experiences.filter(exp => exp.id !== id);
      saveExperiences(filteredExperiences);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDescriptionChange = (index, value) => {
    const newDescription = [...formData.description];
    newDescription[index] = value;
    setFormData(prev => ({ ...prev, description: newDescription }));
  };

  const addDescriptionField = () => {
    setFormData(prev => ({
      ...prev,
      description: [...prev.description, '']
    }));
  };

  const removeDescriptionField = (index) => {
    const newDescription = formData.description.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, description: newDescription }));
  };

  const handleTechnologiesChange = (e) => {
    const technologies = e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech);
    setFormData(prev => ({ ...prev, technologies }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      location: '',
      duration: '',
      current: false,
      description: [''],
      technologies: []
    });
    setEditingId(null);
  };

  return (
    <div className="admin-experience">
      <div className="container">
        <div className="admin-header">
          <h1>Manage Experience</h1>
          <button 
            className="btn btn-primary"
            onClick={() => setEditingId(formData.id || 'new')}
          >
            <FiPlus />
            Add New Experience
          </button>
        </div>

        {/* Form */}
        {(editingId || editingId === 'new') && (
          <motion.div 
            className="experience-form"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Job Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
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
                    placeholder="e.g., Jan 2024 - Present"
                  />
                </div>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="current"
                    checked={formData.current}
                    onChange={handleChange}
                  />
                  Current Position
                </label>
              </div>

              <div className="form-group">
                <label>Description</label>
                {formData.description.map((desc, index) => (
                  <div key={index} className="description-field">
                    <textarea
                      value={desc}
                      onChange={(e) => handleDescriptionChange(index, e.target.value)}
                      className="form-textarea"
                      rows="2"
                      placeholder="Add a responsibility or achievement"
                    />
                    {formData.description.length > 1 && (
                      <button
                        type="button"
                        className="btn-remove"
                        onClick={() => removeDescriptionField(index)}
                      >
                        <FiX />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={addDescriptionField}
                >
                  <FiPlus />
                  Add Description Point
                </button>
              </div>

              <div className="form-group">
                <label>Technologies (comma-separated)</label>
                <input
                  type="text"
                  value={formData.technologies.join(', ')}
                  onChange={handleTechnologiesChange}
                  className="form-input"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  <FiSave />
                  {editingId === 'new' ? 'Add Experience' : 'Update Experience'}
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

        {/* Experience List */}
        <div className="experience-list">
          {experiences.map((experience) => (
            <motion.div 
              key={experience.id}
              className="experience-item"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="experience-header">
                <div className="experience-info">
                  <h3>{experience.title}</h3>
                  <p>{experience.company} - {experience.location}</p>
                  <span className="duration">{experience.duration}</span>
                  {experience.current && <span className="current-badge">Current</span>}
                </div>
                <div className="experience-actions">
                  <button 
                    className="btn-icon"
                    onClick={() => handleEdit(experience)}
                  >
                    <FiEdit />
                  </button>
                  <button 
                    className="btn-icon delete"
                    onClick={() => handleDelete(experience.id)}
                  >
                    <FiTrash />
                  </button>
                </div>
              </div>
              <ul className="experience-description">
                {experience.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
              {experience.technologies.length > 0 && (
                <div className="technologies">
                  {experience.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminExperience;
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash, FiSave, FiX } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import './AdminProjects.css';

const AdminProjects = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'fullstack',
    description: '',
    image: '',
    technologies: [],
    features: [],
    liveUrl: '',
    githubUrl: '',
    date: '',
    team: false,
    teamSize: 1
  });

  const categories = [
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'dataScience', label: 'Data Science' },
    { id: 'vfx', label: 'VFX Pipeline' },
    { id: 'python', label: 'Python' },
    { id: 'javascript', label: 'JavaScript' }
  ];

  // Load projects from localStorage
  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      // Load default projectsData if none in localStorage
      const { projectsData } = require('../../../data/projectsData');
      setProjects(projectsData);
      localStorage.setItem('projects', JSON.stringify(projectsData));
    }
  }, []);

  // Save projects to localStorage
  const saveProjects = (updatedProjects) => {
    localStorage.setItem('projects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const projectData = {
      ...formData,
      id: editingId === 'new' ? `project-${Date.now()}` : editingId
    };

    if (editingId === 'new') {
      // Add new project
      saveProjects([projectData, ...projects]);
    } else {
      // Update existing project
      const updatedProjects = projects.map(project =>
        project.id === editingId ? projectData : project
      );
      saveProjects(updatedProjects);
    }
    resetForm();
  };

  const handleEdit = (project) => {
    setFormData(project);
    setEditingId(project.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const filteredProjects = projects.filter(project => project.id !== id);
      saveProjects(filteredProjects);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayChange = (fieldName, value) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, [fieldName]: items }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'fullstack',
      description: '',
      image: '',
      technologies: [],
      features: [],
      liveUrl: '',
      githubUrl: '',
      date: '',
      team: false,
      teamSize: 1
    });
    setEditingId(null);
  };

  return (
    <div className="admin-projects">
      <div className="container">
        <div className="admin-header">
          <h1>Manage Projects</h1>
          <button 
            className="btn btn-primary"
            onClick={() => setEditingId('new')}
          >
            <FiPlus />
            Add New Project
          </button>
        </div>

        {/* Form */}
        {editingId && (
          <motion.div 
            className="project-form"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="form-header">
              <h2>{editingId === 'new' ? 'Add New Project' : 'Edit Project'}</h2>
              <button 
                className="btn-icon"
                onClick={resetForm}
              >
                <FiX />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Project Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="text"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g., 2024"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="/images/projects/project-name.jpg"
                />
              </div>

              <div className="form-group">
                <label>Technologies (comma-separated)</label>
                <input
                  type="text"
                  value={formData.technologies.join(', ')}
                  onChange={(e) => handleArrayChange('technologies', e.target.value)}
                  className="form-input"
                  placeholder="React, Node.js, MongoDB"
                />
              </div>

              <div className="form-group">
                <label>Features (comma-separated)</label>
                <textarea
                  value={formData.features.join(', ')}
                  onChange={(e) => handleArrayChange('features', e.target.value)}
                  className="form-textarea"
                  rows="2"
                  placeholder="User authentication, Real-time chat"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Live URL</label>
                  <input
                    type="url"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="https://example.com"
                  />
                </div>

                <div className="form-group">
                  <label>GitHub URL</label>
                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="team"
                      checked={formData.team}
                      onChange={handleChange}
                    />
                    Team Project
                  </label>
                </div>

                {formData.team && (
                  <div className="form-group">
                    <label>Team Size</label>
                    <input
                      type="number"
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleChange}
                      className="form-input"
                      min="2"
                    />
                  </div>
                )}
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  <FiSave />
                  {editingId === 'new' ? 'Add Project' : 'Update Project'}
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

        {/* Projects List */}
        <div className="projects-list">
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              className="project-item"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="project-content">
                <h3>{project.title}</h3>
                <p className="project-category">{project.category}</p>
                <p className="project-description">{project.description}</p>
                <div className="project-technologies">
                  {project.technologies.slice(0, 4).map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="tech-tag more">+{project.technologies.length - 4}</span>
                  )}
                </div>
              </div>
              <div className="project-actions">
                <button 
                  className="btn-icon"
                  onClick={() => handleEdit(project)}
                >
                  <FiEdit />
                </button>
                <button 
                  className="btn-icon delete"
                  onClick={() => handleDelete(project.id)}
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

export default AdminProjects;
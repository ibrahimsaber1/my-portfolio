import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash, FiSave } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { skillsData as defaultSkillsData } from '../../../data/skillsData';
import './AdminSkills.css';

const AdminSkills = () => {
  const { t } = useTranslation();
  const [skills, setSkills] = useState(defaultSkillsData);
  const [editingSkill, setEditingSkill] = useState(null);
  const [activeCategory, setActiveCategory] = useState('languages');
  const [formData, setFormData] = useState({
    name: '',
    level: 50,
    icon: '',
    category: 'languages'
  });

  const categories = [
    { id: 'languages', label: 'Programming Languages' },
    { id: 'frontend', label: 'Frontend Development' },
    { id: 'backend', label: 'Backend Development' },
    { id: 'databases', label: 'Databases' },
    { id: 'dataScience', label: 'Data Science' },
    { id: 'dataAnalysis', label: 'Data Analysis' },
    { id: 'tools', label: 'Tools & DevOps' },
    { id: 'vfx', label: 'VFX & Pipeline' }
  ];

  // Load skills from localStorage or API
  useEffect(() => {
    const savedSkills = localStorage.getItem('skills');
    if (savedSkills) {
      setSkills(JSON.parse(savedSkills));
    } else {
      // If no data in localStorage, use default data and save it
      localStorage.setItem('skills', JSON.stringify(defaultSkillsData));
    }
  }, []);
  
  // Save skills to localStorage
  const saveSkills = (updatedSkills) => {
    localStorage.setItem('skills', JSON.stringify(updatedSkills));
    setSkills(updatedSkills);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedSkills = { ...skills };
    
    // Ensure the category exists in the skills object
    if (!updatedSkills[formData.category]) {
      updatedSkills[formData.category] = [];
    }
    
    if (editingSkill) {
      // Update existing skill
      const categorySkills = updatedSkills[formData.category];
      
      if (formData.category === editingSkill.category) {
        // Same category - just update the skill
        const index = categorySkills.findIndex(skill => skill.id === editingSkill.id);
        if (index !== -1) {
          categorySkills[index] = { ...formData, id: editingSkill.id };
        }
      } else {
        // Category changed - remove from old category and add to new one
        updatedSkills[editingSkill.category] = updatedSkills[editingSkill.category]
          .filter(skill => skill.id !== editingSkill.id);
        
        updatedSkills[formData.category].push({ 
          ...formData, 
          id: editingSkill.id 
        });
      }
    } else {
      // Add new skill
      const newSkill = {
        ...formData,
        id: Date.now()
      };
      updatedSkills[formData.category].push(newSkill);
    }
    
    saveSkills(updatedSkills);
    resetForm();
  };

  const handleEdit = (skill, category) => {
    setFormData({ ...skill, category });
    setEditingSkill({ ...skill, category });
  };

  const handleDelete = (skillId, category) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      const updatedSkills = { ...skills };
      updatedSkills[category] = updatedSkills[category].filter(skill => skill.id !== skillId);
      saveSkills(updatedSkills);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'level' ? parseInt(value) : value
    }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      level: 50,
      icon: '',
      category: activeCategory
    });
    setEditingSkill(null);
  };

  return (
    <div className="admin-skills">
      <div className="container">
        <div className="admin-header">
          <h1>Manage Skills</h1>
          <button 
            className="btn btn-primary"
            onClick={() => setEditingSkill({ id: 'new' })}
          >
            <FiPlus />
            Add New Skill
          </button>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(category.id);
                setFormData(prev => ({ ...prev, category: category.id }));
              }}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Form */}
        {editingSkill && (
          <motion.div 
            className="skill-form"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Skill Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="e.g., React.js"
                  />
                </div>

                <div className="form-group">
                  <label>Icon Name</label>
                  <input
                    type="text"
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="e.g., FaReact or SiReact"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Skill Level: {formData.level}%</label>
                  <input
                    type="range"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    className="form-range"
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  <FiSave />
                  {editingSkill.id === 'new' ? 'Add Skill' : 'Update Skill'}
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

        {/* Skills Grid */}
        <div className="skills-grid">
          {skills[activeCategory] && skills[activeCategory].map((skill) => (
            <motion.div 
              key={skill.id || `${skill.name}-${activeCategory}`}
              className="skill-item"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="skill-content">
                <div className="skill-icon">
                  <span>{skill.icon}</span>
                </div>
                <h4>{skill.name}</h4>
                <div className="skill-level">
                  <div className="level-bar">
                    <div 
                      className="level-fill" 
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <span className="level-text">{skill.level}%</span>
                </div>
              </div>
              <div className="skill-actions">
                <button 
                  className="btn-icon"
                  onClick={() => handleEdit(skill, activeCategory)}
                >
                  <FiEdit />
                </button>
                <button 
                  className="btn-icon delete"
                  onClick={() => handleDelete(skill.id, activeCategory)}
                >
                  <FiTrash />
                </button>
              </div>
            </motion.div>
          ))}
          {(!skills[activeCategory] || skills[activeCategory].length === 0) && (
            <div className="no-skills-message">
              No skills found in this category. Add your first skill using the button above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSkills;
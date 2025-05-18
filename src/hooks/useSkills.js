// src/hooks/useSkills.js
import { useState, useEffect } from 'react';
import { skillsData as defaultSkillsData } from '../data/skillsData';

export const useSkills = () => {
  const [skills, setSkills] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchSkills = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // First check if skills are in localStorage (admin updates)
        const savedSkills = localStorage.getItem('skills');
        if (savedSkills) {
          setSkills(JSON.parse(savedSkills));
        } else {
          // If not, use default data
          setSkills(defaultSkillsData);
          // Save default data to localStorage for consistency
          localStorage.setItem('skills', JSON.stringify(defaultSkillsData));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return {
    skills,
    loading,
    error,
    getSkillsByCategory: (category) => skillsData[category] || [],
    getAllSkills: () => Object.values(skills).flat(),
    getTopSkills: (limit = 6) => {
      const allSkills = Object.values(skills).flat();
      return allSkills.sort((a, b) => b.level - a.level).slice(0, limit);
    }
  };
};
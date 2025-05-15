import { useState, useEffect } from 'react';
import { skillsData, getSkillsByCategory, getAllSkills, getTopSkills } from '../data/skillsData';

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
        setSkills(skillsData);
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
    getSkillsByCategory,
    getAllSkills,
    getTopSkills
  };
};
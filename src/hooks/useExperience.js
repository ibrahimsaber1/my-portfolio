import { useState, useEffect } from 'react';
import { experienceData } from '../data/experienceData';

export const useExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Check localStorage for user-modified experiences
        const savedExperiences = localStorage.getItem('experiences');
        if (savedExperiences) {
          setExperiences(JSON.parse(savedExperiences));
        } else {
          // Initialize with default data if nothing in localStorage
          setExperiences(experienceData);
          localStorage.setItem('experiences', JSON.stringify(experienceData));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const getExperienceById = (id) => {
    return experiences.find(exp => exp.id === id);
  };

  const getCurrentExperience = () => {
    return experiences.filter(exp => exp.current);
  };

  return {
    experiences,
    loading,
    error,
    getExperienceById,
    getCurrentExperience
  };
};
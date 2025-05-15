import { useState, useEffect } from 'react';
import { educationData } from '../data/educationData';

export const useEducation = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchEducation = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Check localStorage for user-modified education
        const savedEducation = localStorage.getItem('education');
        if (savedEducation) {
          setEducation(JSON.parse(savedEducation));
        } else {
          // Initialize with default data if nothing in localStorage
          setEducation(educationData);
          localStorage.setItem('education', JSON.stringify(educationData));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  const getEducationById = (id) => {
    return education.find(edu => edu.id === id);
  };

  const getEducationByInstitution = (institution) => {
    return education.filter(edu => edu.institution === institution);
  };

  return {
    education,
    loading,
    error,
    getEducationById,
    getEducationByInstitution
  };
};
import { useState, useEffect } from 'react';
import { projectsData, getProjectsByCategory, getProjectById, getRelatedProjects } from '../data/projectsData';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchProjects = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setProjects(projectsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    getProjectsByCategory,
    getProjectById,
    getRelatedProjects
  };
};

export const useProject = (projectId) => {
  const [project, setProject] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const projectData = getProjectById(projectId);
        if (!projectData) {
          throw new Error('Project not found');
        }
        
        setProject(projectData);
        setRelatedProjects(getRelatedProjects(projectId));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  return {
    project,
    relatedProjects,
    loading,
    error
  };
};
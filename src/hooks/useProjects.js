import { useState, useEffect } from 'react';
import { projectsData as defaultProjectsData } from '../data/projectsData';

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
        
        // Check localStorage for user-modified projects
        const savedProjects = localStorage.getItem('projects');
        if (savedProjects) {
          setProjects(JSON.parse(savedProjects));
        } else {
          // Initialize with default data if nothing in localStorage
          setProjects(defaultProjectsData);
          localStorage.setItem('projects', JSON.stringify(defaultProjectsData));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getProjectsByCategory = (category) => {
    if (category === 'all') return projects;
    return projects.filter(project => project.category === category);
  };

  const getProjectById = (id) => {
    return projects.find(project => project.id === id);
  };

  const getRelatedProjects = (currentProjectId, limit = 3) => {
    const currentProject = getProjectById(currentProjectId);
    if (!currentProject) return [];
    
    return projects
      .filter(project => 
        project.id !== currentProjectId && 
        project.category === currentProject.category
      )
      .slice(0, limit);
  };

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
        
        // Get projects from localStorage
        const savedProjects = localStorage.getItem('projects');
        const projectsData = savedProjects ? JSON.parse(savedProjects) : defaultProjectsData;
        
        const foundProject = projectsData.find(p => p.id === projectId);
        if (!foundProject) {
          throw new Error('Project not found');
        }
        
        setProject(foundProject);
        
        // Get related projects
        const related = projectsData
          .filter(p => 
            p.id !== projectId && 
            p.category === foundProject.category
          )
          .slice(0, 3);
        
        setRelatedProjects(related);
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
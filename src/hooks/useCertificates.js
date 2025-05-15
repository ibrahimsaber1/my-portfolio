import { useState, useEffect } from 'react';
import { certificatesData as defaultCertificatesData } from '../data/certificatesData';

export const useCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Check localStorage for user-added certificates
        const savedCertificates = localStorage.getItem('certificates');
        if (savedCertificates) {
          setCertificates(JSON.parse(savedCertificates));
        } else {
          // Initialize with default data if nothing in localStorage
          setCertificates(defaultCertificatesData);
          localStorage.setItem('certificates', JSON.stringify(defaultCertificatesData));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const getCertificateById = (id) => {
    return certificates.find(cert => cert.id.toString() === id.toString());
  };

  const getCertificatesByOrganization = (organization) => {
    return certificates.filter(cert => cert.organization === organization);
  };

  const getCertificatesBySkill = (skill) => {
    return certificates.filter(cert => 
      cert.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
    );
  };

  const getRecentCertificates = (limit = 5) => {
    return [...certificates]
      .sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate))
      .slice(0, limit);
  };

  return {
    certificates,
    loading,
    error,
    getCertificateById,
    getCertificatesByOrganization,
    getCertificatesBySkill,
    getRecentCertificates
  };
};
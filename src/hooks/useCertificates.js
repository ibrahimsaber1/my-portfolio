import { useState, useEffect } from 'react';
import { certificatesData, getCertificatesByOrganization, getCertificatesBySkill, getRecentCertificates } from '../data/certificatesData';

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
          setCertificates(certificatesData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  return {
    certificates,
    loading,
    error,
    getCertificatesByOrganization,
    getCertificatesBySkill,
    getRecentCertificates
  };
};
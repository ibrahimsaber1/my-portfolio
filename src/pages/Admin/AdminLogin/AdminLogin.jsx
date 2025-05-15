import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import { useAuth } from '../../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import './AdminLogin.css';

const AdminLogin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login, isAuthenticated, loading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // If already authenticated, redirect to admin dashboard
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate('/admin');
      } else {
        setError(result.error || t('admin.login.error'));
      }
    } catch (err) {
      setError(t('admin.login.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="container">
        <motion.div 
          className="login-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="login-title">{t('admin.login.title')}</h1>
          
          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <motion.div 
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <FiAlertCircle />
                {error}
              </motion.div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <FiMail />
                {t('admin.login.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="ibrahimsaber622@gmail.com"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <FiLock />
                {t('admin.login.password')}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary login-button"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : t('admin.login.button')}
            </button>
          </form>

          <div className="login-footer">
            <p>Admin credentials:</p>
            <code>
              Email: ibrahimsaber622@gmail.com<br />
              Password: admin123
            </code>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
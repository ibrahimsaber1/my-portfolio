import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiFolder, FiBriefcase, FiBook, FiTool, 
  FiMessageSquare, FiLogOut, FiUsers,
  FiGlobe, FiBarChart 
} from 'react-icons/fi';
import { useAuth } from '../../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const dashboardItems = [
    {
      title: t('admin.dashboard.sections.projects'),
      description: 'Manage your project portfolio',
      icon: FiFolder,
      path: '/admin/projects',
      color: 'primary'
    },
    {
      title: t('admin.dashboard.sections.experience'),
      description: 'Update work experience',
      icon: FiBriefcase,
      path: '/admin/experience',
      color: 'secondary'
    },
    {
      title: t('admin.dashboard.sections.education'),
      description: 'Manage education details',
      icon: FiBook,
      path: '/admin/education',
      color: 'accent'
    },
    {
      title: t('admin.dashboard.sections.skills'),
      description: 'Update skills and technologies',
      icon: FiTool,
      path: '/admin/skills',
      color: 'success'
    },
    {
      title: t('admin.dashboard.sections.contact'),
      description: 'View contact messages',
      icon: FiMessageSquare,
      path: '/admin/contact',
      color: 'warning'
    }
  ];

  const stats = [
    { label: 'Total Projects', value: '25+', icon: FiFolder },
    { label: 'Messages', value: '12', icon: FiMessageSquare },
    { label: 'Visitors', value: '1.2k', icon: FiUsers },
    { label: 'Page Views', value: '5.6k', icon: FiBarChart }
  ];

  return (
    <div className="admin-dashboard">
      <div className="container">
        <div className="dashboard-header">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>{t('admin.dashboard.title')}</h1>
            <p>{t('admin.dashboard.welcome')}, {user?.name || 'Admin'}!</p>
          </motion.div>

          <motion.button
            className="btn btn-secondary"
            onClick={logout}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FiLogOut />
            Logout
          </motion.button>
        </div>

        <motion.div 
          className="stats-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <stat.icon className="stat-icon" />
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="dashboard-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {dashboardItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Link to={item.path} className={`dashboard-card ${item.color}`}>
                <div className="card-icon">
                  <item.icon />
                </div>
                <div className="card-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div className="card-arrow">→</div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="dashboard-footer">
          <div className="quick-actions">
            <Link to="/" className="btn btn-outline">
              <FiGlobe />
              View Site
            </Link>
            <button className="btn btn-outline">
              <FiBarChart />
              Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './styles/global.css';

// Context Providers
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';

// Components
import Header from './components/Layout/Header/Header';
import Footer from './components/Layout/Footer/Footer';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
// import FloatingTranslateButton from './components/FloatingTranslateButton/FloatingTranslateButton';

// Public Pages
import Home from './pages/Home/Home';
import Projects from './pages/Projects/Projects';
import Experience from './pages/Experience/Experience';
import Contact from './pages/Contact/Contact';
import ProjectDetail from './pages/ProjectDetail/ProjectDetail';
import CertificatesPage from './pages/CertificatesPage/CertificatesPage';
import CertificateView from './pages/CertificateView/CertificateView';

// Admin Pages
import AdminLogin from './pages/Admin/AdminLogin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard/AdminDashboard';
import AdminProjects from './pages/Admin/AdminProjects/AdminProjects';
import AdminExperience from './pages/Admin/AdminExperience/AdminExperience';
import AdminEducation from './pages/Admin/AdminEducation/AdminEducation';
import AdminSkills from './pages/Admin/AdminSkills/AdminSkills';
import AdminContact from './pages/Admin/AdminContact/AdminContact';
import AdminCertificates from './pages/Admin/AdminCertificates/AdminCertificates';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <Router>
            <div className="App">
              <Header />
              <ScrollToTop />
              <AnimatePresence mode="wait">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:id" element={<ProjectDetail />} />
                  <Route path="/experience" element={<Experience />} />
                  <Route path="/certificates" element={<CertificatesPage />} />
                  <Route path="/certificates/:id" element={<CertificateView />} />
                  <Route path="/contact" element={<Contact />} />
                  
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/projects"
                    element={
                      <ProtectedRoute>
                        <AdminProjects />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/experience"
                    element={
                      <ProtectedRoute>
                        <AdminExperience />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/education"
                    element={
                      <ProtectedRoute>
                        <AdminEducation />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/skills"
                    element={
                      <ProtectedRoute>
                        <AdminSkills />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/contact"
                    element={
                      <ProtectedRoute>
                        <AdminContact />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin/certificates"
                    element={
                      <ProtectedRoute>
                        <AdminCertificates />
                      </ProtectedRoute>
                    }
                  />
                  
                  {/* Redirect any unknown route to home */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </AnimatePresence>
              <Footer />
              
              {/* Add the Floating Translate Button */}
              {/* <FloatingTranslateButton /> */}
            </div>
          </Router>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
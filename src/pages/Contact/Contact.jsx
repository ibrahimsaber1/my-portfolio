import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  FiMail, FiPhone, FiMapPin, FiGithub, 
  FiLinkedin, FiSend, FiCheckCircle, FiAlertCircle 
} from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const { t } = useTranslation();
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // EmailJS configuration
      const serviceId = 'service_2u8o56d';
      const templateId = 'template_1h6pctt';
      const publicKey = 'D8iYVC7zQeTi1dUN7';
      
      // Send the email using EmailJS
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        form.current,
        publicKey
      );
      
      console.log('Email sent successfully:', result.text);
      
      setStatus({
        type: 'success',
        message: t('contact.form.success')
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus({
        type: 'error',
        message: t('contact.form.error')
      });
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: FiMail,
      label: t('contact.info.email'),
      value: 'ibrahimsaber622@gmail.com',
      link: 'mailto:ibrahimsaber622@gmail.com'
    },
    {
      icon: FiPhone,
      label: t('contact.info.phone'),
      value: '+201027624649',
      link: 'tel:+201027624649'
    },
    {
      icon: FiMapPin,
      label: t('contact.info.location'),
      value: 'El Haram, Giza, Egypt',
      link: null
    }
  ];

  const socialLinks = [
    {
      icon: FiGithub,
      label: 'GitHub',
      link: 'https://github.com/ibrahimsaber1'
    },
    {
      icon: FiLinkedin,
      label: 'LinkedIn',
      link: 'https://www.linkedin.com/in/ibrahim1saber/'
    }
  ];

  return (
    <motion.div 
      className="contact-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container">
        {/* Page Header */}
        <motion.div 
          className="page-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>{t('contact.title')}</h1>
          <p>{t('contact.subtitle')}</p>
        </motion.div>

        <div className="contact-content">
          {/* Contact Form */}
          <motion.div 
            className="contact-form-section"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form ref={form} onSubmit={handleSubmit} className="contact-form">
              {status.message && (
                <motion.div 
                  className={`status-message ${status.type}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {status.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
                  {status.message}
                </motion.div>
              )}

              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject" className="form-label">
                  {t('contact.form.subject')}
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-input"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-textarea"
                  rows="6"
                  required
                  disabled={isLoading}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>{t('contact.form.sending')}</span>
                ) : (
                  <>
                    <FiSend />
                    {t('contact.form.send')}
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="contact-info-section"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2>{t('contact.info.title')}</h2>
            
            <div className="contact-info-list">
              {contactInfo.map((info, index) => (
                <motion.div 
                  key={index}
                  className="contact-info-item"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="info-icon">
                    <info.icon />
                  </div>
                  <div className="info-content">
                    <h3>{info.label}</h3>
                    {info.link ? (
                      <a href={info.link}>{info.value}</a>
                    ) : (
                      <p>{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="social-section">
              <h3>Connect with me</h3>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={social.label}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
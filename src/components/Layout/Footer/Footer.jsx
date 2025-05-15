import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FiGithub, FiLinkedin, FiMail, FiPhone,
  FiMapPin, FiExternalLink
} from 'react-icons/fi';
import { SiLeetcode, SiHackerrank, SiWakatime } from 'react-icons/si';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/ibrahimsaber1', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/ibrahim1saber/', label: 'LinkedIn' },
    { icon: SiLeetcode, href: 'https://leetcode.com/u/ibrahimsaber622/', label: 'LeetCode' },
    { icon: SiHackerrank, href: 'https://www.hackerrank.com/profile/ibrahimsaber622', label: 'HackerRank' },
    { icon: SiWakatime, href: 'https://wakatime.com/@ibrahimsaber1', label: 'WakaTime' }
  ];

  const quickLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/projects', label: t('nav.projects') },
    { path: '/experience', label: t('nav.experience') },
    { path: '/contact', label: t('nav.contact') }
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Ibrahim Saber</h3>
            <p className="footer-description">
              Software Engineer & Data Science Enthusiast
            </p>
            <div className="footer-social">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={link.label}
                >
                  <link.icon />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <FiMail />
                <a href="mailto:ibrahimsaber622@gmail.com">
                  ibrahimsaber622@gmail.com
                </a>
              </div>
              <div className="contact-item">
                <FiPhone />
                <a href="tel:+201027624649">+201027624649</a>
              </div>
              <div className="contact-item">
                <FiMapPin />
                <span>El Haram, Giza, Egypt</span>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Resources</h4>
            <ul className="footer-links">
              <li>
                <a href="/cv/Ibrahim_Saber_CV.pdf" download>
                  Download CV
                  <FiExternalLink />
                </a>
              </li>
              <li>
                <Link to="/admin/login">Admin Panel</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} {t('footer.rights')}</p>
          <p>{t('footer.madeWith')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
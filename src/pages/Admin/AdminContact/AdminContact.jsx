import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiTrash, FiEye, FiCalendar, FiUser, FiMessageSquare } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import './AdminContact.css';

const AdminContact = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState('all'); // all, unread, read

  // Load messages from localStorage or API
  useEffect(() => {
    const savedMessages = localStorage.getItem('contactMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to localStorage
  const saveMessages = (updatedMessages) => {
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    setMessages(updatedMessages);
  };

  const handleView = (message) => {
    // Mark as read
    const updatedMessages = messages.map(msg =>
      msg.id === message.id ? { ...msg, read: true } : msg
    );
    saveMessages(updatedMessages);
    setSelectedMessage(message);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      const filteredMessages = messages.filter(msg => msg.id !== id);
      saveMessages(filteredMessages);
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
    }
  };

  const handleMarkAsUnread = (id) => {
    const updatedMessages = messages.map(msg =>
      msg.id === id ? { ...msg, read: false } : msg
    );
    saveMessages(updatedMessages);
  };

  const handleMarkAsRead = (id) => {
    const updatedMessages = messages.map(msg =>
      msg.id === id ? { ...msg, read: true } : msg
    );
    saveMessages(updatedMessages);
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === 'unread') return !msg.read;
    if (filter === 'read') return msg.read;
    return true;
  });

  const unreadCount = messages.filter(msg => !msg.read).length;

  return (
    <div className="admin-contact">
      <div className="container">
        <div className="admin-header">
          <h1>Contact Messages</h1>
          <div className="stats">
            <span className="stat-item">
              Total: {messages.length}
            </span>
            <span className="stat-item unread">
              Unread: {unreadCount}
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button
            className={`tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Messages
          </button>
          <button
            className={`tab ${filter === 'unread' ? 'active' : ''}`}
            onClick={() => setFilter('unread')}
          >
            Unread ({unreadCount})
          </button>
          <button
            className={`tab ${filter === 'read' ? 'active' : ''}`}
            onClick={() => setFilter('read')}
          >
            Read
          </button>
        </div>

        <div className="contact-layout">
          {/* Messages List */}
          <div className="messages-list">
            {filteredMessages.map((message) => (
              <motion.div
                key={message.id}
                className={`message-item ${!message.read ? 'unread' : ''} ${selectedMessage?.id === message.id ? 'selected' : ''}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => handleView(message)}
              >
                <div className="message-header">
                  <div className="sender-info">
                    <FiUser />
                    <span className="sender-name">{message.name}</span>
                    {!message.read && <span className="unread-badge">NEW</span>}
                  </div>
                  <span className="message-date">
                    {new Date(message.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="message-subject">{message.subject}</p>
                <p className="message-preview">
                  {message.message.substring(0, 100)}...
                </p>
              </motion.div>
            ))}
          </div>

          {/* Message Detail */}
          {selectedMessage ? (
            <motion.div 
              className="message-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="detail-header">
                <h2>{selectedMessage.subject}</h2>
                <div className="detail-actions">
                  {selectedMessage.read ? (
                    <button 
                      className="btn btn-secondary"
                      onClick={() => handleMarkAsUnread(selectedMessage.id)}
                    >
                      Mark as Unread
                    </button>
                  ) : (
                    <button 
                      className="btn btn-secondary"
                      onClick={() => handleMarkAsRead(selectedMessage.id)}
                    >
                      Mark as Read
                    </button>
                  )}
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDelete(selectedMessage.id)}
                  >
                    <FiTrash />
                    Delete
                  </button>
                </div>
              </div>

              <div className="detail-info">
                <div className="info-item">
                  <FiUser />
                  <span>{selectedMessage.name}</span>
                </div>
                <div className="info-item">
                  <FiMail />
                  <a href={`mailto:${selectedMessage.email}`}>{selectedMessage.email}</a>
                </div>
                <div className="info-item">
                  <FiCalendar />
                  <span>{new Date(selectedMessage.date).toLocaleString()}</span>
                </div>
              </div>

              <div className="message-content">
                <FiMessageSquare />
                <p>{selectedMessage.message}</p>
              </div>
            </motion.div>
          ) : (
            <div className="no-selection">
              <p>Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminContact;
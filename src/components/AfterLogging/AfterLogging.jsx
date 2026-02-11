import React, { useState, } from 'react';
import './AfterLoggingStyle.css';
import handleLogout from '../../utils/handleLogout';

const AfterLogging = ( { setLoggedIn }) => {
  const [email, setEmail] = useState('dummy@gmail.com');
  const [template, setTemplate] = useState('Default');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSendEmail = () => {
    console.log('Sending email to:', email);
    alert('Email sent successfully!');
  };

  // const handleMenuClick = (item) => {
  //   console.log('Menu item clicked:', item);
  //   setMenuOpen(false);
  //   if (item === 'Log Out') {
  //     if (confirm('Are you sure you want to log out?')) {
  //       console.log('Logging out...');
  //       alert('Logged out successfully!');
  //     }
  //   } else {
  //     alert(`Navigating to ${item}`);
  //   }
  // };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <i className="fas fa-truck logo-icon"></i>
          <h1 className="logo-text">Load</h1>
        </div>
        <div className="menu-wrapper">
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
            <i className="fas fa-bars"></i>
          </button>
          
          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="menu-dropdown">
              <button className="menu-item" onClick={() => handleMenuClick('Dashboard')}>
                <i className="fas fa-home"></i>
                Dashboard
              </button>
              <button className="menu-item" onClick={() => handleMenuClick('Pricing')}>
                <i className="fas fa-tags"></i>
                Pricing
              </button>
              <button className="menu-item" onClick={() => handleMenuClick('Templates')}>
                <i className="fas fa-file-alt"></i>
                Templates
              </button>
              <div className="menu-divider"></div>
              <button className="menu-item logout" onClick={handleLogout}>  
                {/* {() => handleMenuClick('Log Out')} */}
                <i className="fas fa-sign-out-alt"></i>
                Log Out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* User Info Bar */}
      <div className="user-info-bar">
        <span className="user-email">{email}</span>
        <span className="emails-badge">75 emails left</span>
      </div>

      {/* Navigation Tabs */}
      <div className="nav-tabs">
        <button className="nav-tab active">Templates</button>
        <button className="nav-tab">Emails</button>
        <button className="nav-tab">Features</button>
        <button className="nav-tab">Copy Load Info</button>
        <button className="nav-tab">Help</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Template Selector */}
        <div className="template-section">
          <label className="section-label">Select Template</label>
          <select 
            className="template-select"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          >
            <option value="Default">Default</option>
            <option value="Professional">Professional</option>
            <option value="Casual">Casual</option>
            <option value="Formal">Formal</option>
          </select>
        </div>

        {/* Email Template Card */}
        <div className="template-card">
          <div className="template-header">
            <div className="template-title">
              Load from <span className="template-variable">{'{origin}'}</span> to <span className="template-variable">{'{dest}'}</span>
            </div>
            <button className="edit-button">Edit</button>
          </div>

          <div className="template-body">
            <p className="template-greeting">Hello, team!</p>
            <p className="template-text">
              Can we get more info pls about the load from{' '}
              <span className="template-variable">{'{origin}'}</span> to{' '}
              <span className="template-variable">{'{dest}'}</span> which is available at{' '}
              <span className="template-variable">{'{avail}'}</span> and what is the best rate?
            </p>
          </div>
        </div>

        {/* Send Email Section */}
        <div className="send-section">
          <input
            type="email"
            className="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
          />
          <button className="send-button" onClick={handleSendEmail}>
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
};

export default AfterLogging;

import React, { useState } from 'react';
import './DashboardStyle.css';

const Dashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Dashboard');

  return (
    <div className="full-dashboard">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <i className="fas fa-truck"></i>
            {!sidebarCollapsed && <span>LoadConnect</span>}
          </div>
          <button 
            className="collapse-btn" 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <i className={`fas fa-chevron-${sidebarCollapsed ? 'right' : 'left'}`}></i>
          </button>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeMenu === 'Dashboard' ? 'active' : ''}`}
            onClick={() => setActiveMenu('Dashboard')}
          >
            <i className="fas fa-th-large"></i>
            {!sidebarCollapsed && <span>Dashboard</span>}
          </button>
          <button 
            className={`nav-item ${activeMenu === 'Analytics' ? 'active' : ''}`}
            onClick={() => setActiveMenu('Analytics')}
          >
            <i className="fas fa-chart-line"></i>
            {!sidebarCollapsed && <span>Analytics</span>}
          </button>
          <button 
            className={`nav-item ${activeMenu === 'My templates' ? 'active' : ''}`}
            onClick={() => setActiveMenu('My templates')}
          >
            <i className="fas fa-file-alt"></i>
            {!sidebarCollapsed && <span>My templates</span>}
          </button>
          <button 
            className={`nav-item ${activeMenu === 'My loads' ? 'active' : ''}`}
            onClick={() => setActiveMenu('My loads')}
          >
            <i className="fas fa-bookmark"></i>
            {!sidebarCollapsed && <span>My loads</span>}
          </button>
          <button 
            className={`nav-item ${activeMenu === 'My team' ? 'active' : ''}`}
            onClick={() => setActiveMenu('My team')}
          >
            <i className="fas fa-users"></i>
            {!sidebarCollapsed && <span>My team</span>}
            {!sidebarCollapsed && <span className="notification-dot"></span>}
          </button>
          
          {!sidebarCollapsed && (
            <button className="invite-btn">
              <i className="fas fa-plus"></i>
              <span>Invite Team Members</span>
            </button>
          )}

          <button 
            className={`nav-item ${activeMenu === 'Billing' ? 'active' : ''}`}
            onClick={() => setActiveMenu('Billing')}
          >
            <i className="fas fa-dollar-sign"></i>
            {!sidebarCollapsed && <span>Billing</span>}
          </button>
        </nav>

        {!sidebarCollapsed && (
          <div className="sidebar-footer">
            <div className="emails-left">
              <div className="emails-text">75 emails left</div>
              <div className="emails-progress">
                <div className="emails-progress-bar" style={{width: '75%'}}></div>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Header */}
        <header className="top-header">
          <h1 className="page-title">Welcome to Load</h1>
          <div className="user-section">
            <div className="user-avatar">
              <img src="https://ui-avatars.com/api/?name=RT&background=4A90E2&color=fff" alt="User" />
            </div>
            <span className="user-email">{userEmail}</span>
            <i className="fas fa-chevron-down"></i>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Loadboard Section */}
          <section className="loadboard-section">
            <h2 className="section-title">Open your loadboard</h2>
            <div className="loadboard-grid">
              <div className="loadboard-card">
                <div className="loadboard-logo">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='60' viewBox='0 0 80 60'%3E%3Ctext x='10' y='35' font-size='20' font-weight='bold' fill='%232962ff'%3EDAT%3C/text%3E%3Ctext x='10' y='55' font-size='24' font-weight='bold' fill='%230d47a1'%3EOne%3C/text%3E%3C/svg%3E" alt="DAT One" />
                </div>
                <div className="loadboard-name">DAT One</div>
                <button className="open-btn">
                  <i className="fas fa-external-link-alt"></i>
                </button>
              </div>

              <div className="loadboard-card">
                <div className="loadboard-logo">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='40' viewBox='0 0 120 40'%3E%3Ctext x='10' y='28' font-size='18' font-weight='bold' fill='%234a148c' letter-spacing='2'%3ELoadlink%3C/text%3E%3C/svg%3E" alt="LoadLink" />
                </div>
                <div className="loadboard-name">LoadLink Web4 (New)</div>
                <button className="open-btn">
                  <i className="fas fa-external-link-alt"></i>
                </button>
              </div>

              <div className="loadboard-card add-card">
                <i className="fas fa-plus-circle"></i>
                <div className="add-text">Add more</div>
              </div>
            </div>
          </section>

          {/* Tutorials Section */}
          <section className="tutorials-section">
            <h2 className="section-title">Tutorials & Guides</h2>
            <div className="tutorials-grid">
              <div className="tutorial-card video-card">
                <div className="video-thumbnail">
                  <i className="fab fa-youtube"></i>
                  <div className="play-button">
                    <i className="fas fa-play"></i>
                  </div>
                  <div className="video-title">Calculate RPM automatically with a deadhead</div>
                </div>
              </div>

              <div className="tutorial-card">
                <div className="tutorial-icon">😐</div>
                <h3 className="tutorial-title">Extension is not showing on load boards</h3>
                <p className="tutorial-desc">Get to know how to resolve this issue</p>
                <button className="more-btn">
                  <i className="fas fa-ellipsis-h"></i>
                </button>
              </div>

              <div className="tutorial-card">
                <div className="tutorial-icon">📝</div>
                <h3 className="tutorial-title">How to add and switch templates</h3>
                <p className="tutorial-desc">Create templates for various purposes</p>
                <button className="more-btn">
                  <i className="fas fa-ellipsis-h"></i>
                </button>
              </div>

              <div className="tutorial-card">
                <div className="tutorial-icon">😂</div>
                <button className="more-btn">
                  <i className="fas fa-ellipsis-h"></i>
                </button>
              </div>

              <div className="tutorial-card">
                <div className="tutorial-icon">🗻</div>
                <button className="more-btn">
                  <i className="fas fa-ellipsis-h"></i>
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="dashboard-footer">
            <div className="copyright">
              Copyright © 2026 <a href="#">Load Inc.</a> All rights reserved.
            </div>
            <div className="footer-links">
              <a href="#">Terms & Conditions</a>
              <span className="separator">|</span>
              <a href="#">Privacy & Policy</a>
            </div>
          </footer>
        </div>
      </main>

      {/* Chat Widget */}
      <div className="chat-widget">
        <button className="chat-button">
          <i className="fas fa-comment"></i>
          <span className="chat-badge">4</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;

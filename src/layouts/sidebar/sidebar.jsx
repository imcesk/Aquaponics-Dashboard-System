import { useState } from 'react';
import { 
  MdDashboard, MdLightbulbOutline, MdWaterDrop, MdOutlineWater, 
  MdBolt, MdMemory, MdNotifications, MdBarChart, MdSettings, MdMenu 
} from 'react-icons/md';
import './sidebar.css';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Brand Header */}
      <div className="brand">
        <div className="brand-icon">
          <img src="/logo.png" alt="CUIA Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
        </div>
        {!isCollapsed && (
          <div className="brand-text">
            <h1>Aquaponics</h1>
            <p>CUIA Monitoring<br/>System</p>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
        <MdMenu size={24} />
      </button>

      {/* Navigation Menu */}
      <nav className="nav-menu">
        
        {/* TOP SECTION */}
        <div 
          className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
          title={isCollapsed ? 'Dashboard' : ''}
          onClick={() => setCurrentPage('dashboard')}
        >
          <span className="nav-icon"><MdDashboard /></span>
          {!isCollapsed && <span className="nav-text">Dashboard</span>}
        </div>

        <div 
          className={`nav-item ${currentPage === 'lighting-control' ? 'active' : ''}`}
          title={isCollapsed ? 'Lighting Control' : ''}
          onClick={() => setCurrentPage('lighting-control')}
        >
          <span className="nav-icon"><MdLightbulbOutline /></span>
          {!isCollapsed && <span className="nav-text">Lighting Control</span>}
        </div>

        <div 
          className={`nav-item ${currentPage === 'water-quality' ? 'active' : ''}`}
          title={isCollapsed ? 'Water Quality' : ''}
          onClick={() => setCurrentPage('water-quality')}
        >
          <span className="nav-icon"><MdWaterDrop /></span>
          {!isCollapsed && <span className="nav-text">Water Quality</span>}
        </div>

        <div 
          className={`nav-item ${currentPage === 'water-management' ? 'active' : ''}`}
          title={isCollapsed ? 'Water Management' : ''}
          onClick={() => setCurrentPage('water-management')}
        >
          <span className="nav-icon"><MdOutlineWater /></span>
          {!isCollapsed && <span className="nav-text">Water Management</span>}
        </div>

        <div 
          className={`nav-item ${currentPage === 'energy-management' ? 'active' : ''}`}
          title={isCollapsed ? 'Energy Management' : ''}
          onClick={() => setCurrentPage('energy-management')}
        >
          <span className="nav-icon"><MdBolt /></span>
          {!isCollapsed && <span className="nav-text">Energy Management</span>}
        </div>

        <div 
          className={`nav-item ${currentPage === 'ai-automation' ? 'active' : ''}`}
          title={isCollapsed ? 'AI & Automation' : ''}
          onClick={() => setCurrentPage('ai-automation')}
        >
          <span className="nav-icon"><MdMemory /></span>
          {!isCollapsed && <span className="nav-text">AI & Automation</span>}
        </div>

        {/* SYSTEM MANAGEMENT HEADER */}
        {!isCollapsed && <div className="nav-section-label">SYSTEM MANAGEMENT</div>}

        <div 
          className={`nav-item ${currentPage === 'notifications' ? 'active' : ''}`}
          title={isCollapsed ? 'Notifications' : ''}
          onClick={() => setCurrentPage('notifications')}
        >
          <span className="nav-icon"><MdNotifications /></span>
          {!isCollapsed && <span className="nav-text">Notifications</span>}
        </div>

        <div 
          className={`nav-item ${currentPage === 'reports' ? 'active' : ''}`}
          title={isCollapsed ? 'Reports & Analytics' : ''}
          onClick={() => setCurrentPage('reports')}
        >
          <span className="nav-icon"><MdBarChart /></span>
          {!isCollapsed && <span className="nav-text">Reports & Analytics</span>}
        </div>

        <div 
          className={`nav-item ${currentPage === 'settings' ? 'active' : ''}`}
          title={isCollapsed ? 'Settings' : ''}
          onClick={() => setCurrentPage('settings')}
        >
          <span className="nav-icon"><MdSettings /></span>
          {!isCollapsed && <span className="nav-text">Settings</span>}
        </div>

      </nav>

      {/* Bottom Decorative Section */}
      {!isCollapsed && (
        <div className="sidebar-bottom">
          <div className="sidebar-bg-image"></div>
          <p className="footer-text">
            Sustainable<br/>Farming<br/>Healthier People<br/>Brighter<br/>Tomorrows
          </p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
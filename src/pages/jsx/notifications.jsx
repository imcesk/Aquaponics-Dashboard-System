import { useState } from 'react';
import TopNavbar from '../../components/topnavbar/TopNavbar';
import { 
  MdNotifications, MdEco, MdWaterDrop, MdWarningAmber, 
  MdCheckCircle, MdBatteryChargingFull, MdEventAvailable, MdDescription,
  MdArrowForward, MdBarChart, MdInfo, MdSettings, MdMail, MdPhoneIphone,
  MdTune
} from 'react-icons/md';
import '../css/notifications.css';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [settings, setSettings] = useState({
    enable: true,
    email: true,
    push: true
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = ['All', 'Alerts', 'System Updates', 'Recommendations', 'Activity Logs'];

  // Mock Data for Notifications
  const notifications = [
    {
      id: 1, type: 'Alerts', icon: <MdNotifications color="#ef4444" size={24} />, bg: 'rgba(239, 68, 68, 0.15)',
      title: 'High Water Temperature', desc: 'Water temperature is at 28.5°C, which is above the ideal range (22–26°C).',
      time: '2m ago', dot: '#ef4444'
    },
    {
      id: 2, type: 'Activity Logs', icon: <MdEco color="#22c55e" size={24} />, bg: 'rgba(34, 197, 94, 0.15)',
      title: 'Automation Action Completed', desc: 'Lighting schedule has been adjusted based on plant growth.',
      time: '15m ago', dot: '#22c55e'
    },
    {
      id: 3, type: 'System Updates', icon: <MdWaterDrop color="#0ea5e9" size={24} />, bg: 'rgba(14, 165, 233, 0.15)',
      title: 'Water Level Stable', desc: 'Water level is back to normal range (60–90%).',
      time: '1h ago', dot: '#22c55e'
    },
    {
      id: 4, type: 'Alerts', icon: <MdWarningAmber color="#f59e0b" size={24} />, bg: 'rgba(245, 158, 11, 0.15)',
      title: 'Solar Power Drop', desc: 'Solar panel output is lower than expected (120W).',
      time: '2h ago', dot: '#f59e0b'
    },
    {
      id: 5, type: 'Activity Logs', icon: <MdEco color="#22c55e" size={24} />, bg: 'rgba(34, 197, 94, 0.15)',
      title: 'New Plant Growth Detected', desc: 'AI has detected healthy growth in your plants!',
      time: '3h ago', dot: '#22c55e'
    },
    {
      id: 6, type: 'System Updates', icon: <MdBatteryChargingFull color="#0ea5e9" size={24} />, bg: 'rgba(14, 165, 233, 0.15)',
      title: 'Battery Fully Charged', desc: 'Your battery is now at 100%.',
      time: '3h ago', dot: '#22c55e'
    },
    {
      id: 7, type: 'Activity Logs', icon: <MdEventAvailable color="#22c55e" size={24} />, bg: 'rgba(34, 197, 94, 0.15)',
      title: 'Scheduled Watering Completed', desc: 'Watering cycle finished at 8:00 AM.',
      time: '6h ago', dot: '#22c55e'
    },
    {
      id: 8, type: 'System Updates', icon: <MdDescription color="#22c55e" size={24} />, bg: 'rgba(34, 197, 94, 0.15)',
      title: 'Weekly Report Ready', desc: 'Your weekly system report is now available.',
      time: '1d ago', dot: '#22c55e'
    }
  ];

  const filteredNotifications = activeTab === 'All' 
    ? notifications 
    : notifications.filter(n => n.type === activeTab);

  return (
    <div className="notifications-container">
      
      <TopNavbar 
        title="Notifications" 
        subtitle="Stay updated on system alerts, AI actions, and reports." 
      />

      <div className="notif-layout-grid">
        
        {/* LEFT COLUMN: Notification Feed */}
        <div className="notif-left-col">
          
          {/* Tabs */}
          <div className="notif-tabs-row">
            {tabs.map(tab => (
              <button 
                key={tab} 
                className={`notif-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
            <button className="notif-mark-read">Mark All as Read</button>
          </div>

          {/* Notification List */}
          <div className="notif-list">
            {filteredNotifications.map(item => (
              <div className="notif-card" key={item.id}>
                <div className="notif-icon-wrapper" style={{ backgroundColor: item.bg }}>
                  {item.icon}
                </div>
                <div className="notif-content">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
                <div className="notif-meta">
                  <div className="notif-time">
                    <span className="dot" style={{ backgroundColor: item.dot }}></span> {item.time}
                  </div>
                  <MdArrowForward size={18} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Summary & Settings */}
        <div className="notif-right-col">
          
          {/* Notification Summary */}
          <div className="panel notif-summary-panel">
            <div className="panel-header">
              <MdBarChart color="var(--primary-color)" size={20} /> <h3>Notification Summary</h3>
            </div>
            <div className="notif-summary-grid">
              <div className="notif-summary-card">
                <div className="ns-icon bg-red"><MdNotifications size={20} color="#ef4444" /></div>
                <div><h4>1</h4><p>Active Alert</p></div>
              </div>
              <div className="notif-summary-card">
                <div className="ns-icon bg-green"><MdCheckCircle size={20} color="#22c55e" /></div>
                <div><h4>6</h4><p>Read</p></div>
              </div>
              <div className="notif-summary-card">
                <div className="ns-icon bg-blue"><MdInfo size={20} color="#3b82f6" /></div>
                <div><h4>1</h4><p>Info</p></div>
              </div>
              <div className="notif-summary-card">
                <div className="ns-icon bg-yellow"><MdWarningAmber size={20} color="#f59e0b" /></div>
                <div><h4>1</h4><p>Recommendation</p></div>
              </div>
            </div>
            <div className="notif-summary-bg-leaf"></div>
          </div>

          {/* Notification Settings */}
          <div className="panel notif-settings-panel">
            <div className="panel-header">
              <MdSettings color="var(--primary-color)" size={20} /> <h3>Notification Settings</h3>
            </div>
            
            <div className="notif-settings-list">
              <div className="notif-setting-item">
                <div className="ns-label"><MdNotifications /> Enable Notifications</div>
                <button className={`ns-toggle ${settings.enable ? 'active' : ''}`} onClick={() => toggleSetting('enable')}><div className="knob"></div></button>
              </div>
              <div className="notif-setting-item">
                <div className="ns-label"><MdMail /> Email Alerts</div>
                <button className={`ns-toggle ${settings.email ? 'active' : ''}`} onClick={() => toggleSetting('email')}><div className="knob"></div></button>
              </div>
              <div className="notif-setting-item">
                <div className="ns-label"><MdPhoneIphone /> Push Notifications</div>
                <button className={`ns-toggle ${settings.push ? 'active' : ''}`} onClick={() => toggleSetting('push')}><div className="knob"></div></button>
              </div>
              <div className="notif-setting-item border-top">
                <div className="ns-label-col">
                  <div className="ns-label"><MdTune /> Alert Thresholds</div>
                  <p>Set custom thresholds for temperature, pH, and more.</p>
                </div>
                <MdArrowForward size={18} className="cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Status Banner */}
          <div className="notif-status-banner">
            <div className="nsb-icon"><MdEco color="var(--primary-color)" size={32} /></div>
            <div>
              <h4>Your system is in good condition!</h4>
              <p>No critical issues at the moment.</p>
            </div>
            <div className="nsb-bg-leaf"></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Notifications;
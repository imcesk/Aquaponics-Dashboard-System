import { useState } from 'react';
import TopNavbar from '../../components/topnavbar/TopNavbar';
import { 
  MdMemory, MdTrendingUp, MdCheckCircle, MdAccessTime,
  MdSettings, MdArrowDropDown, MdWbSunny, MdWaterDrop, MdEco, 
  MdNotificationsActive, MdSmartToy, MdAssignment, MdArrowForward, MdLightbulbOutline
} from 'react-icons/md';
import '../css/ai-automation.css';

const AIAutomation = () => {
  // Toggle States
  const [controls, setControls] = useState({
    smartLighting: true,
    autoWatering: true,
    energySaving: true,
    smartAlerts: true
  });

  const toggleControl = (key) => {
    setControls(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="ai-automation-container">
      
      <TopNavbar 
        title="AI & Automation" 
        subtitle="Monitor and control your smart aquaponics automation system." 
      />

      {/* SECTION 1: Top Stat Cards */}
      <div className="aia-cards-grid">
        <div className="aia-card">
          <div className="aia-icon-wrapper"><MdMemory color="var(--primary-color)" size={28} /></div>
          <div className="aia-card-content">
            <p className="aia-card-title">AI Status</p>
            <div className="aia-status-row"><h3 className="aia-card-value">Active</h3><span className="aia-dot-active"></span></div>
            <p className="aia-card-subtext">Monitoring your system...</p>
          </div>
        </div>
        <div className="aia-card">
          <div className="aia-icon-wrapper"><MdTrendingUp color="var(--primary-color)" size={28} /></div>
          <div className="aia-card-content">
            <p className="aia-card-title">Automation Uptime</p>
            <div className="aia-status-row"><h3 className="aia-card-value">99.2%</h3><span className="aia-trend-up">↑ 0.1%</span></div>
            <p className="aia-card-subtext">Last 7 days</p>
          </div>
        </div>
        <div className="aia-card">
          <div className="aia-icon-wrapper"><MdCheckCircle color="var(--primary-color)" size={28} /></div>
          <div className="aia-card-content">
            <p className="aia-card-title">Auto Actions Today</p>
            <div className="aia-status-row"><h3 className="aia-card-value">6</h3></div>
            <p className="aia-card-subtext">Lights • Pump • Alerts</p>
          </div>
        </div>
        <div className="aia-card">
          <div className="aia-icon-wrapper"><MdAccessTime color="var(--primary-color)" size={28} /></div>
          <div className="aia-card-content">
            <p className="aia-card-title">Avg Response Time</p>
            <div className="aia-status-row"><h3 className="aia-card-value">≤ 2s</h3></div>
            <p className="aia-card-subtext">Real-time</p>
          </div>
        </div>
      </div>

      {/* SECTION 2: Overview & Controls */}
      <div className="aia-middle-grid">
        <div className="panel aia-overview-panel">
          <div className="panel-header-row">
            <div className="panel-title"><MdSmartToy color="var(--primary-color)" size={20} /> <h3>AI Control Overview</h3></div>
            <div className="aia-mode-selector">Smart Mode <MdArrowDropDown size={18} /></div>
          </div>

          <div className="aia-overview-content">
            <div className="aia-robot-illustration">
              <div className="aia-bg-leaves"></div>
              <div className="sparkle s1">✦</div><div className="sparkle s2">✦</div><div className="sparkle s3">✦</div>
              <div className="robot-body">
                <div className="robot-head">
                  <div className="robot-leaf"><MdEco size={16} color="#22c55e" /></div>
                  <div className="robot-face"><div className="eye left"></div><div className="eye right"></div><div className="smile"></div></div>
                </div>
                <div className="robot-torso"><div className="robot-heart"><MdEco size={16} color="var(--primary-color)" /></div></div>
                <div className="robot-arm left-arm"></div><div className="robot-arm right-arm"></div>
                <div className="robot-tablet"><div className="tablet-screen"><MdEco size={20} color="var(--primary-color)" /></div></div>
              </div>
            </div>

            <div className="aia-overview-text">
              <p className="aia-desc">Your AI assistant is actively monitoring conditions and optimizing system performance.</p>
              <ul className="aia-checklist">
                <li><MdCheckCircle color="var(--primary-color)" size={18} /> Monitoring water quality</li>
                <li><MdCheckCircle color="var(--primary-color)" size={18} /> Adjusting lighting & pumps</li>
                <li><MdCheckCircle color="var(--primary-color)" size={18} /> Predicting potential issues</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="panel aia-controls-panel">
          <div className="panel-header"><MdSettings color="var(--primary-color)" size={20} /> <h3>Automation Controls</h3></div>
          <div className="aia-toggles-list">
            <div className="aia-toggle-item">
              <div className="aia-toggle-icon"><MdWbSunny color="#f59e0b" size={20} /></div>
              <div className="aia-toggle-info"><strong>Smart Lighting</strong><p>Adjust lighting based on plant growth and sunlight.</p></div>
              <button className={`aia-toggle-switch ${controls.smartLighting ? 'active' : ''}`} onClick={() => toggleControl('smartLighting')}><div className="knob"></div></button>
            </div>
            <div className="aia-toggle-item">
              <div className="aia-toggle-icon"><MdWaterDrop color="#0ea5e9" size={20} /></div>
              <div className="aia-toggle-info"><strong>Auto Watering</strong><p>Manage water flow automatically.</p></div>
              <button className={`aia-toggle-switch ${controls.autoWatering ? 'active' : ''}`} onClick={() => toggleControl('autoWatering')}><div className="knob"></div></button>
            </div>
            <div className="aia-toggle-item">
              <div className="aia-toggle-icon"><MdEco color="#22c55e" size={20} /></div>
              <div className="aia-toggle-info"><strong>Energy Saving Mode</strong><p>Reduce energy usage during low activity.</p></div>
              <button className={`aia-toggle-switch ${controls.energySaving ? 'active' : ''}`} onClick={() => toggleControl('energySaving')}><div className="knob"></div></button>
            </div>
            <div className="aia-toggle-item">
              <div className="aia-toggle-icon"><MdNotificationsActive color="var(--primary-color)" size={20} /></div>
              <div className="aia-toggle-info"><strong>Smart Alerts</strong><p>Get notified of unusual changes.</p></div>
              <button className={`aia-toggle-switch ${controls.smartAlerts ? 'active' : ''}`} onClick={() => toggleControl('smartAlerts')}><div className="knob"></div></button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Activity Log & Insights */}
      <div className="aia-bottom-grid">
        
        {/* Left: AI Activity Log */}
        <div className="panel aia-log-panel">
          <div className="panel-header-row">
            <div className="panel-title">
              <MdAssignment color="var(--primary-color)" size={20} /> <h3>AI Activity Log</h3>
            </div>
            <button className="btn-view-all">View All <MdArrowForward size={14}/></button>
          </div>

          <div className="aia-log-list">
            <div className="aia-log-item">
              <span className="dot green"></span>
              <span className="time">10:22 AM</span>
              <span className="msg">Adjusted pump flow to 70% (optimal level).</span>
            </div>
            <div className="aia-log-item">
              <span className="dot green"></span>
              <span className="time">09:50 AM</span>
              <span className="msg">Increased lighting intensity (plants in growth stage).</span>
            </div>
            <div className="aia-log-item">
              <span className="dot green"></span>
              <span className="time">08:30 AM</span>
              <span className="msg">Water pH stable (6.8).</span>
            </div>
            <div className="aia-log-item">
              <span className="dot orange"></span>
              <span className="time">07:15 AM</span>
              <span className="msg">Sent alert: Temperature slightly high (24.8°C).</span>
            </div>
          </div>
        </div>

        {/* Right: AI Insights */}
        <div className="panel aia-insights-panel">
          <div className="panel-header">
            <MdLightbulbOutline color="var(--primary-color)" size={20} /> <h3>AI Insights</h3>
          </div>

          <div className="aia-insight-content">
            <div className="aia-insight-graphic">
              <div className="aia-chart-bg">
                <div className="bar b1"></div>
                <div className="bar b2"></div>
                <div className="bar b3"></div>
                <div className="bar b4"></div>
                <MdTrendingUp className="trend-arrow" size={40} />
              </div>
            </div>

            <div className="aia-insight-text">
              <span className="aia-good-news">Good News!</span>
              <h3>Your plants are growing well!</h3>
              <p>System conditions are optimal for healthy growth.</p>
            </div>
            
            <div className="aia-insight-bg-leaf"></div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AIAutomation;
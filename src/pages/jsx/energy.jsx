import { useState } from 'react';
import TopNavbar from '../../components/topnavbar/TopNavbar';
import { 
  MdSolarPower, MdBatteryChargingFull, MdFlashOn, 
  MdEco, MdShowChart, MdArrowForward, MdWbSunny,
  MdWaterDrop, MdAccessTime, MdSettings, MdBarChart, MdTune,
  MdCheckCircle, MdSync
} from 'react-icons/md';
import '../css/energy.css';

const EnergyManagement = () => {
  const [timeRange, setTimeRange] = useState('24h');
  
  // Quick Actions State
  const [actionStatus, setActionStatus] = useState({ id: null, status: 'idle' }); 

  const handleAction = (actionId) => {
    setActionStatus({ id: actionId, status: 'loading' });
    
    setTimeout(() => {
      setActionStatus({ id: actionId, status: 'success' });
      setTimeout(() => {
        setActionStatus({ id: null, status: 'idle' });
      }, 3000);
    }, 1500);
  };

  const renderActionContent = (id, defaultIcon, text) => {
    const isCurrent = actionStatus.id === id;
    
    if (isCurrent && actionStatus.status === 'loading') {
      return (
        <div className="em-action-left">
          <div className="em-action-icon loading"><MdSync size={18} className="icon-spin" /></div>
          <span>Processing...</span>
        </div>
      );
    }
    
    if (isCurrent && actionStatus.status === 'success') {
      return (
        <div className="em-action-left">
          <div className="em-action-icon success"><MdCheckCircle size={18} /></div>
          <span>Completed!</span>
        </div>
      );
    }

    return (
      <>
        <div className="em-action-left">
          <div className="em-action-icon">{defaultIcon}</div>
          <span>{text}</span>
        </div>
        <MdArrowForward color="var(--text-muted)" />
      </>
    );
  };

  return (
    <div className="energy-management-container">
      
      <TopNavbar 
        title="Solar Energy Management" 
        subtitle="Monitor and manage your solar power system." 
      />

      {/* SECTION 1: Top Metric Cards */}
      <div className="em-cards-grid">
        <div className="em-card">
          <div className="em-icon-wrapper"><MdSolarPower color="var(--primary-color)" size={28} /></div>
          <div className="em-card-content">
            <p className="em-card-title">Solar Output</p>
            <h3 className="em-card-value">620 <span>W</span></h3>
            <p className="em-card-trend"><span className="trend-up">↑ 12%</span> vs. last week</p>
          </div>
        </div>
        <div className="em-card">
          <div className="em-icon-wrapper"><MdBatteryChargingFull color="var(--primary-color)" size={28} /></div>
          <div className="em-card-content">
            <p className="em-card-title">Battery Level</p>
            <h3 className="em-card-value">78<span>%</span></h3>
            <p className="em-card-trend"><span className="trend-up">↑ 5%</span> vs. last week</p>
          </div>
        </div>
        <div className="em-card">
          <div className="em-icon-wrapper"><MdFlashOn color="var(--primary-color)" size={28} /></div>
          <div className="em-card-content">
            <p className="em-card-title">Energy Generated</p>
            <h3 className="em-card-value">12.5 <span>kWh</span></h3>
            <p className="em-card-trend"><span className="trend-up">↑ 18%</span> vs. last week</p>
          </div>
        </div>
        <div className="em-card">
          <div className="em-icon-wrapper"><MdEco color="var(--primary-color)" size={28} /></div>
          <div className="em-card-content">
            <p className="em-card-title">Carbon Saved</p>
            <h3 className="em-card-value">6.3 <span>kg CO₂</span></h3>
            <p className="em-card-trend"><span className="trend-up">↑ 18%</span> vs. last week</p>
          </div>
        </div>
      </div>

      {/* SECTION 2: Chart & Overview */}
      <div className="em-middle-grid">
        <div className="panel em-chart-panel">
          <div className="panel-header-row">
            <div className="panel-title"><MdShowChart color="var(--primary-color)" size={20} /> <h3>Solar Energy Trend</h3></div>
            <div className="em-tabs">
              <button className={timeRange === '24h' ? 'active' : ''} onClick={() => setTimeRange('24h')}>Last 24 Hours</button>
              <button className={timeRange === '7d' ? 'active' : ''} onClick={() => setTimeRange('7d')}>7 Days</button>
              <button className={timeRange === '30d' ? 'active' : ''} onClick={() => setTimeRange('30d')}>30 Days</button>
            </div>
          </div>
          <div className="em-chart-container">
            <div className="em-y-axis"><span>1,000W</span><span>750W</span><span>500W</span><span>250W</span><span>0W</span></div>
            <div className="em-chart-area">
              <div className="em-grid-lines"><div></div><div></div><div></div><div></div><div></div></div>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="em-svg">
                <defs>
                  <linearGradient id="solarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M 0 95 L 10 95 L 20 92 L 30 75 L 40 45 L 50 25 L 60 30 L 70 50 L 80 75 L 90 95 L 100 95 L 100 100 L 0 100 Z" fill="url(#solarGradient)" />
                <path d="M 0 95 L 10 95 L 20 92 L 30 75 L 40 45 L 50 25 L 60 30 L 70 50 L 80 75 L 90 95 L 100 95" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinejoin="round" />
                <path d="M 0 25 Q 25 20, 50 22 T 100 25" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round" />
              </svg>
              <div className="em-x-axis"><span>12AM</span><span>4AM</span><span>8AM</span><span>12PM</span><span>4PM</span><span>8PM</span><span>12AM</span></div>
            </div>
          </div>
          <div className="em-legend">
            <span><span className="dot" style={{background:'var(--primary-color)'}}></span> Solar Output</span>
            <span><span className="dot" style={{background:'#f59e0b'}}></span> Battery Level (%)</span>
          </div>
        </div>

        <div className="panel em-overview-panel">
          <div className="panel-header"><MdSolarPower color="var(--primary-color)" size={20} /> <h3>Solar Power Overview</h3></div>
          <div className="em-overview-content">
            <div className="em-overview-visual">
              <MdWbSunny size={48} color="#f59e0b" className="em-sun-icon" />
              <div className="em-panels-graphic">
                <div className="em-panel-grid"><div></div><div></div><div></div><div></div><div></div><div></div></div>
                <div className="em-panel-stand"></div>
              </div>
            </div>
            <div className="em-flow-list">
              <div className="em-flow-card">
                <div className="em-flow-icon"><MdSolarPower color="var(--primary-color)" size={20} /></div>
                <div><h4>Solar Panels</h4><p className="em-flow-val">620 W</p><p className="em-flow-sub">(Current Output)</p></div>
              </div>
              <MdArrowForward size={20} color="var(--text-muted)" className="em-flow-arrow" />
              <div className="em-flow-card">
                <div className="em-flow-icon"><MdBatteryChargingFull color="var(--primary-color)" size={20} /></div>
                <div><h4>Battery</h4><p className="em-flow-val">78%</p><p className="em-flow-sub">(≈ 3.9 kWh)</p></div>
              </div>
              <MdArrowForward size={20} color="var(--text-muted)" className="em-flow-arrow" />
              <div className="em-flow-card">
                <div className="em-flow-icon"><MdFlashOn color="var(--primary-color)" size={20} /></div>
                <div><h4>System Usage</h4><p className="em-flow-val">480 W</p><p className="em-flow-sub">(Real-time)</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Energy Sources, Battery Status, Quick Actions */}
      <div className="em-bottom-grid">
        
        {/* Left: Energy Sources */}
        <div className="panel em-sources-panel">
          <div className="panel-header">
            <MdWaterDrop color="var(--primary-color)" size={20} /> <h3>Energy Sources</h3>
          </div>
          <div className="em-sources-content">
            <div className="em-donut-wrapper">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border-color)" strokeWidth="12" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--primary-color)" strokeWidth="12" strokeDasharray="196 251.2" strokeDashoffset="0" strokeLinecap="round" />
              </svg>
              <div className="em-donut-text">
                <h2>78%</h2>
                <span>Solar</span>
              </div>
            </div>
            <div className="em-sources-legend">
              <div className="em-source-item">
                <span className="dot" style={{ background: 'var(--primary-color)' }}></span>
                <span className="label">Solar</span>
                <span className="val">78%</span>
              </div>
              <div className="em-source-item">
                <span className="dot" style={{ background: 'var(--text-muted)' }}></span>
                <span className="label">Grid</span>
                <span className="val">22%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle: Battery Status */}
        <div className="panel em-battery-panel">
          <div className="panel-header">
            <MdBatteryChargingFull color="var(--primary-color)" size={20} /> <h3>Battery Status</h3>
          </div>
          <div className="em-battery-content">
            <div className="em-battery-bar-row">
              <div className="em-battery-bar-bg">
                <div className="em-battery-bar-fill" style={{ width: '78%' }}></div>
              </div>
              <span className="em-battery-pct">78%</span>
            </div>
            
            <div className="em-battery-info">
              <MdAccessTime size={24} color="var(--text-muted)" />
              <div>
                <p className="em-bat-label">Estimated Backup Time</p>
                <h4 className="em-bat-time">≈ 7.5 hours</h4>
              </div>
            </div>
          </div>
          <div className="em-battery-bg-leaf"></div>
        </div>

        {/* Right: Quick Actions */}
        <div className="panel em-actions-panel">
          <div className="panel-header">
            <MdFlashOn color="var(--primary-color)" size={20} /> <h3>Quick Actions</h3>
          </div>
          <div className="em-action-list">
            <button className="em-action-btn" onClick={() => handleAction('optimize')} disabled={actionStatus.id === 'optimize'}>
              {renderActionContent('optimize', <MdSettings size={18} color="var(--primary-color)" />, 'Optimize Solar Usage')}
            </button>
            <button className="em-action-btn" onClick={() => handleAction('report')} disabled={actionStatus.id === 'report'}>
              {renderActionContent('report', <MdBarChart size={18} color="var(--primary-color)" />, 'View Energy Report')}
            </button>
            <button className="em-action-btn" onClick={() => handleAction('settings')} disabled={actionStatus.id === 'settings'}>
              {renderActionContent('settings', <MdTune size={18} color="var(--primary-color)" />, 'Adjust Power Settings')}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EnergyManagement;
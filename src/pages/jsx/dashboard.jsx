import { useState, useEffect } from 'react';
import { 
  MdWaterDrop, MdThermostat, MdWater, MdEco, 
  MdWbSunny, MdBatteryChargingFull,
  MdMonitor, MdMemory, MdWifi, MdMemory as MdChip, MdBarChart,
  MdInfoOutline, MdNotifications, MdAutoAwesome, MdCheckCircle,
  MdSettings, MdLightbulbOutline, MdSync, MdArrowForward,
  MdBolt, MdHome
} from 'react-icons/md';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase';
import TopNavbar from '../../components/topnavbar/TopNavbar';
import '../css/dashboard.css';

const Dashboard = () => {
  // --- FIREBASE STATE ---
  const [esp32Status, setEsp32Status] = useState('connecting');
  const [sensors, setSensors] = useState({
    ph: 0,
    temp: 0,
    waterLevel: 0,
    ec: 0,
    battery: 0
  });

  useEffect(() => {
    const sensorsRef = ref(database, 'sensors/');
    
    const unsubscribe = onValue(sensorsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensors(data);
        setEsp32Status('connected');
      } else {
        setEsp32Status('offline');
      }
    }, (error) => {
      console.error("Firebase read failed: ", error);
      setEsp32Status('offline');
    });

    return () => unsubscribe();
  }, []);

  const isOnline = esp32Status === 'connected';

  // --- QUICK CONTROLS STATE ---
  const [lightsOn, setLightsOn] = useState(true);
  const [pumpRunning, setPumpRunning] = useState(false);
  const [waterReplacing, setWaterReplacing] = useState(false);

  // Handlers
  const handleToggleLights = () => { if (isOnline) setLightsOn(!lightsOn); };
  
  const handleRunPump = () => {
    if (!isOnline) return;
    setPumpRunning(true);
    setTimeout(() => setPumpRunning(false), 3000);
  };

  const handleReplaceWater = () => {
    if (!isOnline) return;
    setWaterReplacing(true);
    setTimeout(() => setWaterReplacing(false), 4000);
  };

  return (
    <div className="dashboard-container">
      
      <TopNavbar 
        title="Dashboard Overview" 
        subtitle="Welcome to your hydroponic system overview." 
      />

      {/* SECTION 1: Status Cards */}
      <div className="status-grid">
        <StatusCard icon={<MdWaterDrop color="#3b82f6" />} title="Water pH" value={isOnline ? sensors.ph : "--"} status={isOnline ? "Optimal (5.5 - 6.5)" : "No Data"} statusColor={isOnline ? "primary" : "grey"} />
        <StatusCard icon={<MdThermostat color="#ef4444" />} title="Water Temperature" value={isOnline ? `${sensors.temp} °C` : "--"} status={isOnline ? "Optimal (20 - 28 °C)" : "No Data"} statusColor={isOnline ? "primary" : "grey"} />
        <StatusCard icon={<MdWater color="#06b6d4" />} title="Water Level" value={isOnline ? `${sensors.waterLevel} %` : "--"} status={isOnline ? "Normal" : "No Data"} statusColor={isOnline ? "primary" : "grey"} />
        <StatusCard icon={<MdEco color="var(--primary-color)" />} title="Nutrient Level (EC)" value={isOnline ? `${sensors.ec} mS/cm` : "--"} status={isOnline ? "Optimal (1.2 - 2.0)" : "No Data"} statusColor={isOnline ? "primary" : "grey"} />
        <StatusCard icon={<MdWbSunny color="#f59e0b" />} title="Solar Power" value={isOnline ? "42 W" : "--"} status={isOnline ? "Generating" : "No Data"} statusColor={isOnline ? "orange" : "grey"} />
        <StatusCard icon={<MdBatteryChargingFull color="var(--primary-color)" />} title="Battery Level" value={isOnline ? `${sensors.battery} %` : "--"} status={isOnline ? "Charging" : "No Data"} statusColor={isOnline ? "primary" : "grey"} />
        <StatusCard icon={<MdWaterDrop color="#3b82f6" />} title="Rainwater Tank" value={isOnline ? "65 %" : "--"} isProgress={true} progressValue={isOnline ? 65 : 0} />
        <StatusCard icon={<MdWaterDrop color="var(--primary-color)" />} title="Greywater Tank" value={isOnline ? "45 %" : "--"} isProgress={true} progressValue={isOnline ? 45 : 0} />
      </div>

      <div className="system-status-grid">
        <SystemStatusCard icon={<MdMemory color={isOnline ? "var(--primary-color)" : "#94a3b8"} />} title="AI Status" value={isOnline ? "ACTIVE" : "WAITING"} subtext={isOnline ? "Autonomous" : "Offline"} colorClass={isOnline ? "primary" : "grey"} />
        <SystemStatusCard icon={<MdBarChart color={isOnline ? "var(--primary-color)" : "#94a3b8"} />} title="AI Confidence" value={isOnline ? "96 %" : "--"} subtext={isOnline ? "High" : ""} colorClass={isOnline ? "primary" : "grey"} />
        <SystemStatusCard 
          icon={<MdChip color={esp32Status === 'connected' ? "var(--primary-color)" : esp32Status === 'connecting' ? "#f59e0b" : "#ef4444"} />} 
          title="ESP32 Status" 
          value={esp32Status === 'connected' ? "CONNECTED" : esp32Status === 'connecting' ? "CONNECTING..." : "OFFLINE"} 
          subtext="" 
          colorClass={esp32Status === 'connected' ? "primary" : esp32Status === 'connecting' ? "orange" : "red"} 
        />
        <SystemStatusCard icon={<MdWifi color={isOnline ? "var(--primary-color)" : "#ef4444"} />} title="WiFi Status" value={isOnline ? "ONLINE" : "DISCONNECTED"} subtext="" colorClass={isOnline ? "primary" : "red"} />
      </div>

      {/* SECTION 2: Live View | Circadian Lighting | Stacked Alerts & AI */}
      <div className="main-dashboard-grid">
        
        {/* Column 1: Live System View */}
        <div className={`panel live-view-panel ${!isOnline ? 'panel-disabled' : ''}`}>
          <div className="panel-header">
            <MdMonitor size={18} /> <h3>Live System View</h3>
            <span className="panel-subtext">Real-time digital twin</span>
            <div className="live-view-actions">
              <button className="btn-outline-sm">3D View</button>
              <MdInfoOutline className="info-icon-sm" />
            </div>
          </div>
          <div className="live-view-content">
            <img src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80" alt="Hydroponics" className="live-bg-img" />
            <div className="overlay-tag top-left"><span className="tag-title">Rainwater Tank</span><span className="tag-value">{isOnline ? '65%' : '--'}</span></div>
            <div className="overlay-tag top-right"><span className="tag-title">LED Grow Lights</span><span className="tag-value primary" style={{ color: 'var(--primary-color)' }}>{isOnline ? '80%' : '--'}</span></div>
            <div className="overlay-tag center"><span className="tag-title">NFT Hydroponic System</span><span className="tag-value primary" style={{ color: 'var(--primary-color)' }}>Lettuce</span></div>
            <div className="overlay-tag top-center"><span className="tag-title">ESP32 Controller</span><span className={`tag-value ${isOnline ? 'blue' : 'red'}`}>{isOnline ? 'Connected' : 'Offline'}</span></div>
            <div className="overlay-tag bottom-left"><span className="tag-title">Nutrient Reservoir</span><span className="tag-value">{isOnline ? 'EC 1.4 mS/cm' : '--'}</span></div>
            <div className="overlay-tag bottom-center-1"><span className="tag-title">Water Pump</span><span className={`tag-value ${isOnline ? 'blue' : 'red'}`}>{isOnline ? 'ON 2.5 L/min' : 'OFF'}</span></div>
            <div className="overlay-tag bottom-center-2"><span className="tag-title">Filtration System</span><span className="tag-value blue">{isOnline ? '92 %' : '--'}</span></div>
            <div className="overlay-tag bottom-right"><span className="tag-title">Greywater Tank</span><span className="tag-value">{isOnline ? '45 %' : '--'}</span></div>
          </div>
        </div>

        {/* Column 2: Circadian Lighting */}
        <div className={`panel lighting-panel ${!isOnline ? 'panel-disabled' : ''}`}>
          <div className="panel-header-row" style={{ marginBottom: '16px' }}>
            <div className="panel-title"><MdWbSunny color="#f59e0b" size={20} /> <h3>Circadian Lighting</h3></div>
            <div className="badge-auto"><MdCheckCircle size={12} /> Auto</div>
          </div>
          
          <div className="lighting-phase-info">
            <MdWbSunny size={40} color="#f59e0b" className="sun-icon-large" />
            <div>
              <h4 className="phase-title">Daylight Phase</h4>
              <p className="phase-time">6:00 AM – 6:00 PM</p>
            </div>
          </div>

          <div className="intensity-row">
            <div className="intensity-label">
              <span>Intensity</span>
              <h3>{isOnline ? '75%' : '--'}</h3>
            </div>
            <div className="intensity-bar-bg">
              <div className="intensity-bar-fill" style={{ width: isOnline ? '75%' : '0%' }}></div>
            </div>
          </div>

          <div className="lighting-chart-container" style={{ marginBottom: 0, borderBottom: 'none', paddingBottom: 0 }}>
            <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="chart-svg">
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="var(--bg-panel)" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <path d="M 0 50 C 20 50, 30 10, 50 10 C 70 10, 80 50, 100 50 Z" fill="url(#areaGradient)" />
              <path d="M 0 50 C 20 50, 30 10, 50 10 C 70 10, 80 50, 100 50" fill="none" stroke="var(--primary-color)" strokeWidth="1.5" />
              <circle cx="50" cy="10" r="2.5" fill="var(--primary-color)" />
            </svg>
            <div className="chart-x-axis"><span>12AM</span><span>6AM</span><span>12PM</span><span>6PM</span><span>12AM</span></div>
          </div>
        </div>

        {/* Column 3: Stacked Alerts & AI Assistant */}
        <div className="side-panels-container">
          
          <div className="panel alert-panel">
            <div className="panel-header-row" style={{ marginBottom: '12px' }}>
              <div className="panel-title"><MdNotifications color="var(--primary-color)" size={18} /> <h3>Recent Alerts</h3></div>
              <button className="btn-text-link">View All →</button>
            </div>
            <div className="alert-content" style={{ background: isOnline ? 'var(--primary-light)' : '#fef2f2', borderColor: isOnline ? 'var(--primary-color)' : '#fecaca' }}>
              <MdCheckCircle size={20} color={isOnline ? "var(--primary-color)" : "#ef4444"} />
              <div>
                <h4>{isOnline ? 'No critical alerts' : 'Connection Lost'}</h4>
                <p>{isOnline ? 'All systems are stable.' : 'Waiting for ESP32 hardware...'}</p>
              </div>
            </div>
          </div>

          <div className="panel ai-assistant-panel">
            <div className="panel-header-row" style={{ marginBottom: '12px', position: 'relative', zIndex: 2 }}>
              <div className="panel-title" style={{ color: 'white' }}><MdAutoAwesome size={18} color="white" /> <h3 style={{ color: 'white' }}>AI Assistant</h3></div>
              <div className={`badge-active ${!isOnline ? 'offline' : ''}`}>
                <span className="dot"></span> {isOnline ? 'Active' : 'Offline'}
              </div>
            </div>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <p className="ai-msg-title">{isOnline ? 'Everything looks good!' : 'Awaiting Data'}</p>
              <p className="ai-msg-sub">{isOnline ? 'Your battery is charging and water quality is within range.' : 'Cannot analyze system health while hardware is disconnected.'}</p>
              <button className="btn-view-details" disabled={!isOnline}>View Details →</button>
            </div>
            <MdEco className="ai-bg-icon" size={120} color="rgba(255,255,255,0.05)" />
          </div>

        </div>
      </div>

      {/* SECTION 3: Water Quality | Energy Flow | Quick Controls */}
      <div className="bottom-dashboard-grid">
        
        {/* Panel 1: Water Quality Overview */}
        <div className={`panel info-panel ${!isOnline ? 'panel-disabled' : ''}`}>
          <div className="panel-header-row">
            <div className="panel-title"><MdWaterDrop color="#3b82f6" size={20} /> <h3>Water Quality Overview</h3></div>
            <button className="btn-text-link" disabled={!isOnline}>View Details →</button>
          </div>
          <div className="water-quality-gauges">
            <GaugeCard value={isOnline ? sensors.ph : "--"} unit="pH" label="pH" color="#3b82f6" percent={isOnline ? 70 : 0} />
            <GaugeCard value={isOnline ? `${sensors.temp}°C` : "--"} unit="Temp" label="Temp" color="#f97316" percent={isOnline ? 60 : 0} />
            <GaugeCard value={isOnline ? "1.2" : "--"} unit="NTU" label="Turbidity" color="#a855f7" percent={isOnline ? 40 : 0} />
            <GaugeCard value={isOnline ? "7.8" : "--"} unit="mg/L" label="Dissolved Oxygen" color="var(--primary-color)" percent={isOnline ? 80 : 0} />
            <GaugeCard value={isOnline ? `${sensors.waterLevel}%` : "--"} unit="Level" label="Level" color="#0ea5e9" percent={isOnline ? sensors.waterLevel : 0} />
          </div>
        </div>

        {/* Panel 2: Energy Flow */}
        <div className={`panel info-panel ${!isOnline ? 'panel-disabled' : ''}`}>
          <div className="panel-header-row">
            <div className="panel-title"><MdBolt color="#f59e0b" size={20} /> <h3>Energy Flow</h3></div>
            <button className="btn-text-link" disabled={!isOnline}>View Details →</button>
          </div>
          <div className="energy-flow-row">
            <div className="energy-item">
              <div className="energy-icon" style={{ color: '#3b82f6' }}><MdWbSunny size={32} /></div>
              <div className="energy-text"><span>Solar</span><strong>{isOnline ? '120 W' : '--'}</strong></div>
            </div>
            <MdArrowForward className="energy-arrow" />
            <div className="energy-item">
              <div className="energy-icon" style={{ color: 'var(--primary-color)' }}><MdBatteryChargingFull size={32} /></div>
              <div className="energy-text"><span>Battery</span><strong>{isOnline ? `${sensors.battery}%` : '--'}</strong></div>
            </div>
            <MdArrowForward className="energy-arrow" />
            <div className="energy-item">
              <div className="energy-icon" style={{ color: '#f59e0b' }}><MdHome size={32} /></div>
              <div className="energy-text"><span>Usage</span><strong>{isOnline ? '68 W' : '--'}</strong></div>
            </div>
          </div>
        </div>

        {/* Panel 3: Quick Controls */}
        <div className="panel info-panel">
          <div className="panel-header-row">
            <div className="panel-title"><MdSettings color="var(--text-muted)" size={20} /> <h3>Quick Controls</h3></div>
            {!isOnline && <span style={{fontSize:'10px', color:'#ef4444', fontWeight:'bold'}}>DISABLED</span>}
          </div>
          <div className="quick-controls-row">
            <button 
              className={`quick-btn ${lightsOn && isOnline ? 'primary-active' : 'grey-inactive'}`}
              onClick={handleToggleLights}
              disabled={!isOnline}
            >
              <MdLightbulbOutline size={24} className={lightsOn && isOnline ? 'icon-glow' : ''} />
              <span>Lights: {lightsOn ? 'ON' : 'OFF'}</span>
            </button>

            <button 
              className={`quick-btn ${pumpRunning && isOnline ? 'blue-active' : 'grey-inactive'}`}
              onClick={handleRunPump}
              disabled={!isOnline || pumpRunning}
            >
              <MdWaterDrop size={24} className={pumpRunning && isOnline ? 'icon-pulse' : ''} />
              <span>{pumpRunning ? 'Running...' : 'Run Pump'}</span>
            </button>

            <button 
              className={`quick-btn ${waterReplacing && isOnline ? 'orange-active' : 'grey-inactive'}`}
              onClick={handleReplaceWater}
              disabled={!isOnline || waterReplacing}
            >
              <MdSync size={24} className={waterReplacing && isOnline ? 'icon-spin' : ''} />
              <span>{waterReplacing ? 'Replacing...' : 'Replace Water'}</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

/* --- COMPONENTS --- */

const StatusCard = ({ icon, title, value, status, statusColor, isProgress, progressValue }) => {
  return (
    <div className="status-card">
      <div className="card-header"><span className="card-icon">{icon}</span><span className="card-title">{title}</span></div>
      <div className="card-value">{value}</div>
      <div className="card-footer">
        {isProgress ? (
          <div className="mini-progress-container"><div className="mini-progress-bar" style={{ width: `${progressValue}%` }}></div></div>
        ) : (
          <span className={`card-status-text ${statusColor}`}>{status}</span>
        )}
      </div>
    </div>
  );
};

const SystemStatusCard = ({ icon, title, value, subtext, colorClass }) => {
  return (
    <div className="system-status-card">
      <div className="card-icon-wrapper">{icon}</div>
      <div className="card-content">
        <p className="card-title">{title}</p>
        <p className={`card-value-text ${colorClass}`}>{value}</p>
        {subtext && <p className="card-subtext">{subtext}</p>}
      </div>
    </div>
  );
};

const GaugeCard = ({ value, unit, label, color, percent }) => {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="gauge-card">
      <div className="gauge-circle">
        <svg viewBox="0 0 60 60" className="gauge-svg-element">
          <circle cx="30" cy="30" r={radius} fill="none" stroke="var(--border-color)" strokeWidth="6" />
          <circle 
            cx="30" cy="30" r={radius} 
            fill="none" 
            stroke={color} 
            strokeWidth="6" 
            strokeDasharray={circumference} 
            strokeDashoffset={strokeDashoffset} 
            strokeLinecap="round"
            transform="rotate(-90 30 30)"
          />
        </svg>
        <div className="gauge-center-text">
          <strong>{value}</strong>
          <span>{unit}</span>
        </div>
      </div>
      <p className="gauge-label">{label}</p>
    </div>
  );
};

export default Dashboard;
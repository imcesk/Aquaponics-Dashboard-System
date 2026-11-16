import { useState, useEffect } from 'react';
import TopNavbar from '../../components/topnavbar/TopNavbar';
import { 
  MdWaterDrop, MdThermostat, MdScience, MdOpacity, 
  MdCheckCircle, MdWaves, MdPowerSettingsNew,
  MdAccessTime, MdArrowDropDown, MdEdit, MdSync,
  MdNotifications, MdClose, MdSave
} from 'react-icons/md';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase';
import '../css/water.css';

const WaterManagement = () => {
  const [timeRange, setTimeRange] = useState('24h');

  // Firebase Sensor Data
  const [sensors, setSensors] = useState({
    waterLevel: '72', temp: '24.6', ph: '6.8', do: '6.8'
  });

  // Interactive Controls State
  const [isPumpOn, setIsPumpOn] = useState(true);
  const [flowRate, setFlowRate] = useState('Medium');
  const [isAutoWatering, setIsAutoWatering] = useState(true);
  
  // Schedule State
  const [repeatSchedule, setRepeatSchedule] = useState('Every 6 Hours');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSchedule, setTempSchedule] = useState('Every 6 Hours');

  // Fetch live data from Firebase
  useEffect(() => {
    const sensorsRef = ref(database, 'sensors/');
    const unsubscribe = onValue(sensorsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensors(prev => ({
          waterLevel: data.waterLevel || prev.waterLevel,
          temp: data.temp || prev.temp,
          ph: data.ph || prev.ph,
          do: data.do || prev.do,
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  // Handlers
  const handlePumpToggle = () => setIsPumpOn(!isPumpOn);
  const handleAutoToggle = () => setIsAutoWatering(!isAutoWatering);
  
  const handleSaveSchedule = () => {
    setRepeatSchedule(tempSchedule);
    setIsModalOpen(false);
  };

  return (
    <div className="water-management-container">
      
      <TopNavbar 
        title="Water Management" 
        subtitle="Manage and monitor your aquaponics water system." 
      />

      {/* SECTION 1: Top Status Cards */}
      <div className="wm-cards-grid">
        <div className="wm-card">
          <div className="wm-icon-wrapper"><MdWaterDrop color="var(--primary-color)" size={28} /></div>
          <div className="wm-card-content">
            <p className="wm-card-title">Water Level</p>
            <h3 className="wm-card-value">{sensors.waterLevel}%</h3>
            <div className="wm-badge-wrapper"><span className="wm-badge"><MdCheckCircle size={14} /> Normal</span></div>
          </div>
        </div>
        <div className="wm-card">
          <div className="wm-icon-wrapper"><MdThermostat color="var(--primary-color)" size={28} /></div>
          <div className="wm-card-content">
            <p className="wm-card-title">Water Temperature</p>
            <h3 className="wm-card-value">{sensors.temp}°C</h3>
            <div className="wm-badge-wrapper"><span className="wm-badge"><MdCheckCircle size={14} /> Normal</span></div>
          </div>
        </div>
        <div className="wm-card">
          <div className="wm-icon-wrapper"><MdScience color="var(--primary-color)" size={28} /></div>
          <div className="wm-card-content">
            <p className="wm-card-title">pH Level</p>
            <h3 className="wm-card-value">{sensors.ph}</h3>
            <div className="wm-badge-wrapper"><span className="wm-badge"><MdCheckCircle size={14} /> Normal</span></div>
          </div>
        </div>
        <div className="wm-card">
          <div className="wm-icon-wrapper"><MdOpacity color="var(--primary-color)" size={28} /></div>
          <div className="wm-card-content">
            <p className="wm-card-title">Dissolved Oxygen</p>
            <h3 className="wm-card-value">{sensors.do} <span>mg/L</span></h3>
            <div className="wm-badge-wrapper"><span className="wm-badge"><MdCheckCircle size={14} /> Normal</span></div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Chart & Controls */}
      <div className="wm-middle-grid">
        <div className="panel wm-chart-panel">
          <div className="panel-header-row">
            <div className="panel-title"><MdWaves color="var(--primary-color)" size={20} /> <h3>Water Level Trend</h3></div>
            <div className="wm-tabs">
              <button className={timeRange === '24h' ? 'active' : ''} onClick={() => setTimeRange('24h')}>Last 24 Hours</button>
              <button className={timeRange === '7d' ? 'active' : ''} onClick={() => setTimeRange('7d')}>7 Days</button>
              <button className={timeRange === '30d' ? 'active' : ''} onClick={() => setTimeRange('30d')}>30 Days</button>
            </div>
          </div>
          <div className="wm-chart-container">
            <div className="wm-y-axis"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span></div>
            <div className="wm-chart-area">
              <div className="wm-grid-lines"><div></div><div></div><div></div><div></div><div></div></div>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="wm-svg">
                <defs>
                  <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="var(--primary-color)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M 0 45 Q 12 40, 25 35 T 50 25 T 75 30 T 100 25 L 100 100 L 0 100 Z" fill="url(#waterGradient)" />
                <path d="M 0 45 Q 12 40, 25 35 T 50 25 T 75 30 T 100 25" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinejoin="round" />
              </svg>
              <div className="wm-dot" style={{ left: '0%', top: '45%' }}></div>
              <div className="wm-dot" style={{ left: '25%', top: '35%' }}></div>
              <div className="wm-dot" style={{ left: '50%', top: '25%' }}></div>
              <div className="wm-dot" style={{ left: '75%', top: '30%' }}></div>
              <div className="wm-dot" style={{ left: '100%', top: '25%' }}></div>
              <div className="wm-x-axis"><span>12AM</span><span>4AM</span><span>8AM</span><span>12PM</span><span>4PM</span><span>8PM</span><span>12AM</span></div>
            </div>
          </div>
        </div>

        <div className="panel wm-control-panel">
          <div className="panel-header"><MdWaterDrop color="var(--primary-color)" size={20} /> <h3>Water Control</h3></div>
          <div className="wm-control-list">
            <div className="wm-control-item border-bottom">
              <div className="wm-control-icon"><MdPowerSettingsNew size={20} color="var(--primary-color)" /></div>
              <div className="wm-control-info"><strong>Water Pump</strong><p>Turn the water pump on or off.</p></div>
              <button className={`wm-toggle ${isPumpOn ? 'active' : ''}`} onClick={handlePumpToggle}><div className="knob"></div></button>
            </div>
            <div className="wm-control-item border-bottom">
              <div className="wm-control-icon"><MdWaves size={20} color="var(--primary-color)" /></div>
              <div className="wm-control-info"><strong>Water Flow Rate</strong><p>Adjust the flow rate.</p></div>
              <div className="wm-select-wrapper">
                <select className="wm-select" value={flowRate} onChange={(e) => setFlowRate(e.target.value)}>
                  <option>Low</option><option>Medium</option><option>High</option>
                </select>
                <MdArrowDropDown className="wm-select-icon" size={20} />
              </div>
            </div>
            <div className="wm-control-item">
              <div className="wm-control-icon"><MdAccessTime size={20} color="var(--primary-color)" /></div>
              <div className="wm-control-info"><strong>Auto Watering</strong><p>Enable scheduled watering.</p></div>
              <button className={`wm-toggle ${isAutoWatering ? 'active' : ''}`} onClick={handleAutoToggle}><div className="knob"></div></button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Watering Schedule & Alerts */}
      <div className="wm-bottom-grid">
        
        {/* Left: Watering Schedule */}
        <div className="panel wm-schedule-panel">
          <div className="panel-header-row" style={{ marginBottom: '16px' }}>
            <div className="panel-title">
              <MdAccessTime color="var(--primary-color)" size={20} /> <h3>Watering Schedule</h3>
            </div>
            <button className="btn-edit-schedule" onClick={() => { setTempSchedule(repeatSchedule); setIsModalOpen(true); }}>
              <MdEdit size={14} /> Edit Schedule
            </button>
          </div>

          <div className="wm-schedule-content">
            <div className="wm-schedule-left">
              <div className="wm-clock-icon"><MdAccessTime size={28} color="var(--primary-color)" /></div>
              <div>
                <p className="wm-schedule-label">Next Watering</p>
                <h3 className="wm-schedule-time">in 2h 15m</h3>
                <p className="wm-schedule-date">Apr 28, 2025 • 12:40 PM</p>
              </div>
            </div>

            <div className="wm-schedule-divider"></div>

            <div className="wm-schedule-right">
              <div className="wm-repeat-icon"><MdSync size={20} color="var(--primary-color)" /></div>
              <div>
                <p className="wm-schedule-label">Repeat</p>
                <div className="wm-select-wrapper" style={{ marginTop: '4px' }}>
                  <select className="wm-select" value={repeatSchedule} onChange={(e) => setRepeatSchedule(e.target.value)}>
                    <option>Every 2 Hours</option>
                    <option>Every 4 Hours</option>
                    <option>Every 6 Hours</option>
                    <option>Every 12 Hours</option>
                    <option>Once a Day</option>
                  </select>
                  <MdArrowDropDown className="wm-select-icon" size={20} />
                </div>
              </div>
            </div>
            <div className="wm-schedule-bg-leaf"></div>
          </div>
        </div>

        {/* Right: Alerts */}
        <div className="panel wm-alerts-panel">
          <div className="panel-header">
            <MdNotifications color="var(--primary-color)" size={20} /> <h3>Alerts</h3>
          </div>
          <div className="wm-alert-content">
            <div className="wm-alert-icon">
              <MdCheckCircle size={32} color="white" />
            </div>
            <div>
              <h4>All systems are normal!</h4>
              <p>No water-related alerts at the moment.</p>
            </div>
            <div className="wm-alert-bg-leaf"></div>
          </div>
        </div>

      </div>

      {/* EDIT SCHEDULE MODAL */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Edit Watering Schedule</h3>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}><MdClose size={24} /></button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Repeat Frequency</label>
                <select className="modal-input" value={tempSchedule} onChange={(e) => setTempSchedule(e.target.value)}>
                  <option>Every 2 Hours</option>
                  <option>Every 4 Hours</option>
                  <option>Every 6 Hours</option>
                  <option>Every 12 Hours</option>
                  <option>Once a Day</option>
                </select>
              </div>
              <div className="form-group">
                <label>Start Time</label>
                <input type="time" defaultValue="08:00" className="modal-input" />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="btn-save" onClick={handleSaveSchedule}><MdSave size={16} /> Save Changes</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default WaterManagement;
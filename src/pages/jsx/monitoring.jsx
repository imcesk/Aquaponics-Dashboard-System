import { useState, useEffect } from 'react';
import TopNavbar from '../../components/topnavbar/TopNavbar';
import { 
  MdSettings, MdEco, MdWbSunny, MdAutoAwesome, 
  MdCalendarToday, MdTouchApp, MdInfoOutline, MdAccessTime, MdWifi,
  MdDateRange, MdCheckCircle, MdPanTool, MdPlayArrow, MdStop
} from 'react-icons/md';
import { ref, set, onValue } from 'firebase/database';
import { database } from '../../firebase'; // Adjust path if needed
import '../css/monitoring.css';

const Monitoring = () => {
  const [mode, setMode] = useState('ai'); 
  
  // Firebase Realtime State
  const [manualIntensity, setManualIntensity] = useState(70);
  const [manualDuration, setManualDuration] = useState('1 hour');
  const [isLightOn, setIsLightOn] = useState(false);
  const [isTurningOn, setIsTurningOn] = useState(false);
  
  const [activePreset, setActivePreset] = useState('vegetative');

  // 1. Listen to Firebase for live control updates (Optional but good practice)
  useEffect(() => {
    const controlRef = ref(database, 'lighting_controls/');
    const unsubscribe = onValue(controlRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (data.manualIntensity !== undefined) setManualIntensity(data.manualIntensity);
        if (data.isLightOn !== undefined) setIsLightOn(data.isLightOn);
        if (data.preset !== undefined) setActivePreset(data.preset);
      }
    });
    return () => unsubscribe();
  }, []);

  // 2. Handlers that write to Firebase
  const handleIntensityChange = (e) => {
    const val = parseInt(e.target.value);
    setManualIntensity(val);
    set(ref(database, 'lighting_controls/manualIntensity'), val);
  };

  const handleDurationChange = (e) => {
    setManualDuration(e.target.value);
    set(ref(database, 'lighting_controls/manualDuration'), e.target.value);
  };

  const handleTurnOn = () => {
    if (isLightOn) {
      // Turn OFF immediately
      setIsLightOn(false);
      set(ref(database, 'lighting_controls/isLightOn'), false);
    } else {
      // Turn ON with simulated delay
      setIsTurningOn(true);
      setTimeout(() => {
        setIsTurningOn(false);
        setIsLightOn(true);
        set(ref(database, 'lighting_controls/isLightOn'), true);
      }, 1500);
    }
  };

  const handlePresetSelect = (preset) => {
    setActivePreset(preset);
    set(ref(database, 'lighting_controls/preset'), preset);
    
    // Auto-set intensity based on preset
    let newIntensity = 70;
    if (preset === 'seedling') newIntensity = 50;
    if (preset === 'flowering') newIntensity = 90;
    setManualIntensity(newIntensity);
    set(ref(database, 'lighting_controls/manualIntensity'), newIntensity);
  };

  return (
    <div className="monitoring-container">
      
      <TopNavbar 
        title="Aquaponics Monitoring" 
        subtitle="Detailed monitoring of connected hardware and system status." 
      />

      {/* =========================================
          SECTION 1 (Full Width at Top)
          ========================================= */}
      <div className="monitoring-top-grid">
        <div className="panel info-panel">
          <div className="panel-header">
            <MdSettings color="#15803d" size={20} /> <h3>Operating Mode</h3>
          </div>
          <div className="operating-modes-row">
            <button className={`mode-btn ${mode === 'ai' ? 'active' : ''}`} onClick={() => setMode('ai')}>
              <div className="mode-icon"><MdAutoAwesome size={20} /></div>
              <div className="mode-text"><strong>AI Automatic</strong><span>Adjusts based on growth</span></div>
            </button>
            <button className={`mode-btn ${mode === 'schedule' ? 'active' : ''}`} onClick={() => setMode('schedule')}>
              <div className="mode-icon"><MdCalendarToday size={20} /></div>
              <div className="mode-text"><strong>Custom Schedule</strong><span>Set specific times</span></div>
            </button>
            <button className={`mode-btn ${mode === 'manual' ? 'active' : ''}`} onClick={() => setMode('manual')}>
              <div className="mode-icon"><MdTouchApp size={20} /></div>
              <div className="mode-text"><strong>Manual Control</strong><span>Override system</span></div>
            </button>
          </div>
        </div>

        <div className="panel info-panel plant-stage-panel">
          <div className="panel-header">
            <MdEco color="#15803d" size={20} /> <h3>Plant Growth Stage</h3>
          </div>
          <div className="plant-stage-content">
            <div className="plant-stage-img">
              <img src="https://cdn-icons-png.flaticon.com/512/2329/2329903.png" alt="Cabbage" />
            </div>
            <div className="plant-stage-info">
              <div className="stage-title-row">
                <h4>Vegetative</h4>
                <MdInfoOutline color="#22c55e" size={16} />
              </div>
              <p>(Detected by AI)</p>
            </div>
          </div>
        </div>

        <div className="panel info-panel lighting-status-panel">
          <div className="panel-header">
            <MdWbSunny color="#f59e0b" size={20} /> <h3>Current Lighting Status</h3>
          </div>
          <div className="lighting-status-content">
            <div className="light-status-left">
              <div className="status-pill"><span className="dot"></span> Lights ON</div>
              <div className="intensity-display"><h2>68%</h2><span>Intensity</span></div>
            </div>
            <div className="light-status-divider"></div>
            <div className="light-status-right">
              <p className="next-change-label">Next Change</p>
              <div className="next-change-time"><MdAccessTime size={18} /><h4>12:00 PM</h4></div>
              <p className="next-change-target">→ 100%</p>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================
          BOTTOM LAYOUT: Left (Sections 2 & 3) | Right (Devices)
          ========================================= */}
      <div className="monitoring-bottom-layout">
        
        <div className="monitoring-left-col">
          
          {/* SECTION 2: Lighting Schedule | Preview */}
          <div className="monitoring-middle-grid">
            <div className="panel chart-panel">
              <div className="panel-header-row">
                <div className="panel-title">
                  <MdDateRange color="#15803d" size={20} /> <h3>24-Hour Lighting Schedule</h3>
                </div>
                <div className="badge-auto"><MdCheckCircle size={14} /> Custom</div>
              </div>
              <div className="schedule-chart-container">
                <div className="y-axis-labels">
                  <span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0%</span>
                </div>
                <div className="chart-area-wrapper">
                  <div className="grid-lines">
                    <div className="grid-line"></div><div className="grid-line"></div>
                    <div className="grid-line"></div><div className="grid-line"></div><div className="grid-line"></div>
                  </div>
                  <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="schedule-svg">
                    <defs>
                      <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#bbf7d0" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M 0 35 C 15 35, 15 15, 30 15 C 45 15, 45 -5, 50 -5 C 55 -5, 55 15, 70 15 C 85 15, 85 35, 100 35 L 100 50 L 0 50 Z" fill="url(#chartFill)" />
                    <path d="M 0 35 C 15 35, 15 15, 30 15 C 45 15, 45 -5, 50 -5 C 55 -5, 55 15, 70 15 C 85 15, 85 35, 100 35" fill="none" stroke="#22c55e" strokeWidth="1.5" />
                  </svg>
                  <div className="x-axis-labels">
                    <span>12AM</span><span>6AM</span><span>12PM</span><span>6PM</span><span>12AM</span>
                  </div>
                  <div className="data-point" style={{ left: '15%', top: '55%' }}><div className="point-badge"><strong>30%</strong><span>(6AM)</span></div><div className="point-dot"></div></div>
                  <div className="data-point" style={{ left: '30%', top: '40%' }}><div className="point-badge"><strong>60%</strong><span>(8AM)</span></div><div className="point-dot"></div></div>
                  <div className="data-point" style={{ left: '45%', top: '20%' }}><div className="point-badge"><strong>85%</strong><span>(10AM)</span></div><div className="point-dot"></div></div>
                  <div className="data-point" style={{ left: '50%', top: '0%' }}><div className="point-badge"><strong>100%</strong><span>(12PM)</span></div><div className="point-dot"></div></div>
                  <div className="data-point" style={{ left: '70%', top: '25%' }}><div className="point-badge"><strong>75%</strong><span>(3PM)</span></div><div className="point-dot"></div></div>
                  <div className="data-point" style={{ left: '85%', top: '45%' }}><div className="point-badge"><strong>40%</strong><span>(6PM)</span></div><div className="point-dot"></div></div>
                  <div className="data-point" style={{ left: '100%', top: '70%' }}><div className="point-badge"><strong>0%</strong><span>(12AM)</span></div><div className="point-dot"></div></div>
                </div>
              </div>
            </div>

            <div className="panel lighting-preview-panel">
              <div className="panel-header">
                <MdWbSunny color="#15803d" size={18} /> <h3>Lighting Preview</h3>
              </div>
              <div className="preview-img-container">
                <img src="https://images.unsplash.com/photo-1558442074-3c19857bc1dc?auto=format&fit=crop&w=600&q=80" alt="LED Grow Lights" />
              </div>
            </div>
          </div>

          {/* SECTION 3: Manual Adjustment | Presets | AI Insights */}
          <div className="monitoring-bottom-grid">
            
            {/* Manual Adjustment */}
            <div className="panel manual-adjust-panel">
              <div className="panel-header">
                <MdPanTool color="#15803d" size={20} /> <h3>Manual Adjustment</h3>
                <p className="panel-subtext">Override the current schedule if needed.</p>
              </div>
              
              <div className="manual-controls">
                <div className="manual-slider-col">
                  <div className="slider-row">
                    <MdWbSunny color="#f59e0b" size={16} />
                    <div className="slider-text">
                      <span>Intensity Level</span>
                      <strong>{manualIntensity}%</strong>
                    </div>
                  </div>
                  {/* INTERACTIVE SLIDER */}
                  <input 
                    type="range" min="0" max="100" 
                    value={manualIntensity} 
                    onChange={handleIntensityChange}
                    className="custom-range" 
                  />
                  
                  <div className="duration-row">
                    <MdAccessTime color="#15803d" size={16} />
                    <span>Duration</span>
                    {/* INTERACTIVE DROPDOWN */}
                    <select className="duration-select" value={manualDuration} onChange={handleDurationChange}>
                      <option>1 hour</option>
                      <option>2 hours</option>
                      <option>4 hours</option>
                    </select>
                  </div>
                </div>
                
                <div className="manual-divider"></div>
                
                <div className="manual-action-col">
                  {/* INTERACTIVE BUTTON */}
                  <button 
                    className={`btn-turn-on ${isLightOn ? 'active-off' : ''}`} 
                    onClick={handleTurnOn}
                    disabled={isTurningOn}
                  >
                    {isTurningOn ? (
                      <><MdAccessTime size={24} className="icon-spin" /><span>Wait...</span></>
                    ) : isLightOn ? (
                      <><MdStop size={24} /><span>Turn Off</span></>
                    ) : (
                      <><MdPlayArrow size={24} /><span>Turn On</span></>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="panel presets-panel">
              <div className="panel-header">
                <MdWbSunny color="#f59e0b" size={20} /> <h3>Quick Presets</h3>
                <p className="panel-subtext">Apply recommended lighting profiles.</p>
              </div>
              <div className="presets-row">
                <button 
                  className={`preset-btn ${activePreset === 'seedling' ? 'active' : ''}`}
                  onClick={() => handlePresetSelect('seedling')}
                >
                  <MdEco size={20} color="#15803d" />
                  {activePreset === 'seedling' && <MdCheckCircle size={16} className="check-icon" color="#15803d" />}
                  <strong>Seedling</strong>
                  <span>(40–60%)</span>
                </button>
                
                <button 
                  className={`preset-btn ${activePreset === 'vegetative' ? 'active' : ''}`}
                  onClick={() => handlePresetSelect('vegetative')}
                >
                  <MdEco size={20} color="#15803d" />
                  {activePreset === 'vegetative' && <MdCheckCircle size={16} className="check-icon" color="#15803d" />}
                  <strong>Vegetative</strong>
                  <span>(60–80%)</span>
                </button>
                
                <button 
                  className={`preset-btn ${activePreset === 'flowering' ? 'active' : ''}`}
                  onClick={() => handlePresetSelect('flowering')}
                >
                  <MdWbSunny size={20} color="#ef4444" />
                  {activePreset === 'flowering' && <MdCheckCircle size={16} className="check-icon" color="#15803d" />}
                  <strong>Flowering</strong>
                  <span>(80–100%)</span>
                </button>
              </div>
            </div>

            {/* AI Insights */}
            <div className="panel ai-insights-panel">
              <div className="panel-header-row">
                <div className="panel-title">
                  <MdSettings color="#15803d" size={20} /> <h3>AI Insights</h3>
                </div>
                <button className="btn-text-link">View Details →</button>
              </div>
              
              <div className="insights-content-box">
                <MdEco size={40} color="#22c55e" className="insight-bg-icon" />
                <h4>Optimal Settings Active</h4>
                <p>Your plants are in the vegetative stage. Lighting is adjusted to <strong>{manualIntensity}% intensity</strong> for healthy growth.</p>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Connected Devices */}
        <div className="monitoring-right-col">
          <div className="panel monitor-panel full-width" style={{ height: '100%' }}>
            <div className="panel-header">
              <MdWifi color="#3b82f6" size={18} /> <h3>Connected Devices</h3>
            </div>
            <ul className="device-list">
              <DeviceItem name="ESP32 Controller" status="Online" />
              <DeviceItem name="pH Sensor" status="Online" />
              <DeviceItem name="Temperature Sensor" status="Online" />
              <DeviceItem name="Dissolved Oxygen Sensor" status="Online" />
              <DeviceItem name="Water Level Sensor" status="Online" />
              <DeviceItem name="Ultrasonic Sensor" status="Online" />
              <DeviceItem name="INA219 Power Sensor" status="Online" />
              <DeviceItem name="Automatic Fish Feeder" status="Online" />
              <DeviceItem name="Water Pump" status="Connected" />
              <DeviceItem name="LED Grow Lights" status="Connected" />
              <DeviceItem name="Biofilter System" status="Connected" />
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
};

// --- Reusable Component ---
const DeviceItem = ({ name, status }) => {
  return (
    <li className="device-item">
      <div className="dev-name"><div className="status-dot"></div> {name}</div>
      <span className="dev-status">{status}</span>
    </li>
  );
};

export default Monitoring;
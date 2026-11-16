import { useState, useEffect } from 'react';
import TopNavbar from '../../components/topnavbar/TopNavbar';
import { 
  MdSettings, MdEco, MdWbSunny, MdAutoAwesome, 
  MdCalendarToday, MdTouchApp, MdInfoOutline, MdAccessTime, 
  MdDateRange, MdCheckCircle, MdPanTool, MdPlayArrow, MdStop,
  MdInfo, MdAdd, MdEdit, MdDelete, MdPalette, MdFlashOn,
  MdArrowDropDown, MdSync, MdClose, MdSave, MdTune
} from 'react-icons/md';
import { ref, set, onValue } from 'firebase/database';
import { database } from '../../firebase'; 
import '../css/lighting-control.css';

const LightingControl = () => {
  const [mode, setMode] = useState('manual'); 
  
  // Firebase Realtime State
  const [manualIntensity, setManualIntensity] = useState(70);
  const [manualDuration, setManualDuration] = useState('12 hours');
  const [startTime, setStartTime] = useState('08:00 AM');
  const [endTime, setEndTime] = useState('08:00 PM');
  const [isLightOn, setIsLightOn] = useState(false);
  const [isTurningOn, setIsTurningOn] = useState(false);
  const [activePreset, setActivePreset] = useState('vegetative');
  
  // Color Spectrum State
  const [activeSpectrum, setActiveSpectrum] = useState({ hex: '#8b5cf6', name: 'Balanced' });

  // Schedule State
  const [scheduleSlots, setScheduleSlots] = useState([
    { id: 1, time: '06:00 AM', intensity: '30%', phase: 'Sunrise', color: '#eab308' },
    { id: 2, time: '08:00 AM', intensity: '60%', phase: 'Morning', color: '#22c55e' },
    { id: 3, time: '10:00 AM', intensity: '85%', phase: 'Late Morning', color: '#3b82f6' },
    { id: 4, time: '12:00 PM', intensity: '100%', phase: 'Midday', color: '#d946ef' },
    { id: 5, time: '03:00 PM', intensity: '75%', phase: 'Afternoon', color: '#f97316' },
    { id: 6, time: '06:00 PM', intensity: '40%', phase: 'Sunset', color: '#1e3a8a' },
  ]);

  // Quick Action States
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [formData, setFormData] = useState({ time: '', intensity: '', phase: '', color: '#3b82f6' });

  // Load Firebase Data
  useEffect(() => {
    const controlRef = ref(database, 'lighting_controls/');
    const unsubscribe = onValue(controlRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        if (data.manualIntensity !== undefined) setManualIntensity(data.manualIntensity);
        if (data.isLightOn !== undefined) setIsLightOn(data.isLightOn);
      }
    });
    return () => unsubscribe();
  }, []);

  // --- MANUAL MODE HANDLERS ---
  const handleIntensityChange = (e) => {
    const val = parseInt(e.target.value);
    setManualIntensity(val);
    set(ref(database, 'lighting_controls/manualIntensity'), val);
  };

  const toggleLightStatus = () => {
    setIsLightOn(!isLightOn);
    set(ref(database, 'lighting_controls/isLightOn'), !isLightOn);
  };

  const handlePresetSelect = (preset) => {
    setActivePreset(preset);
    let newIntensity = 70;
    if (preset === 'seedling') newIntensity = 50;
    if (preset === 'flowering') newIntensity = 90;
    setManualIntensity(newIntensity);
    set(ref(database, 'lighting_controls/manualIntensity'), newIntensity);
  };

  // --- SCHEDULE MODAL HANDLERS ---
  const openAddModal = () => {
    setEditingSlot(null);
    setFormData({ time: '12:00 PM', intensity: '50%', phase: 'Midday', color: '#3b82f6' });
    setIsModalOpen(true);
  };

  const openEditModal = (slot) => {
    setEditingSlot(slot.id);
    setFormData(slot);
    setIsModalOpen(true);
  };

  const handleDeleteSlot = (id) => {
    setScheduleSlots(scheduleSlots.filter(slot => slot.id !== id));
  };

  const handleSaveModal = () => {
    if (editingSlot) {
      setScheduleSlots(scheduleSlots.map(s => s.id === editingSlot ? { ...s, ...formData } : s));
    } else {
      const newId = scheduleSlots.length > 0 ? Math.max(...scheduleSlots.map(s => s.id)) + 1 : 1;
      setScheduleSlots([...scheduleSlots, { id: newId, ...formData }]);
    }
    setIsModalOpen(false);
  };

  // --- QUICK ACTIONS HANDLERS ---
  const handleSaveSchedule = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }, 1500);
  };

  const handleResetDefault = () => {
    const defaultSlots = [
      { id: 1, time: '06:00 AM', intensity: '30%', phase: 'Sunrise', color: '#eab308' },
      { id: 2, time: '08:00 AM', intensity: '60%', phase: 'Morning', color: '#22c55e' },
      { id: 3, time: '10:00 AM', intensity: '85%', phase: 'Late Morning', color: '#3b82f6' },
      { id: 4, time: '12:00 PM', intensity: '100%', phase: 'Midday', color: '#d946ef' },
      { id: 5, time: '03:00 PM', intensity: '75%', phase: 'Afternoon', color: '#f97316' },
      { id: 6, time: '06:00 PM', intensity: '40%', phase: 'Sunset', color: '#1e3a8a' },
    ];
    setScheduleSlots(defaultSlots);
  };

  const handleApplyNow = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setIsApplied(true);
      setTimeout(() => setIsApplied(false), 3000);
    }, 1500);
  };

  const spectrumOptions = [
    { hex: '#3b82f6', name: 'Cool Blue' },
    { hex: '#8b5cf6', name: 'Balanced' },
    { hex: '#d946ef', name: 'Magenta' },
    { hex: '#f43f5e', name: 'Red' },
    { hex: '#f97316', name: 'Warm Orange' },
    { hex: '#eab308', name: 'Full Spectrum' },
  ];

  return (
    <div className="monitoring-container">
      
      <TopNavbar 
        title="Lighting Control" 
        subtitle="Optimize your circadian lighting for healthy plant growth."  
      />

      {/* SECTION 1: TOP INFO PANELS */}
      <div className="monitoring-top-grid">
        <div className="panel info-panel">
          <div className="panel-header">
            <MdSettings color="var(--primary-color)" size={20} /> <h3>Operating Mode</h3>
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
            <MdEco color="var(--primary-color)" size={20} /> <h3>Plant Growth Stage</h3>
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

        {mode === 'schedule' ? (
          <div className="panel info-panel schedule-notice-panel">
            <div className="notice-content">
              <MdInfo size={24} color="var(--primary-color)" className="notice-icon" />
              <p>Your custom schedule will be followed each day unless changed.</p>
            </div>
            <div className="notice-bg-leaf"></div>
          </div>
        ) : mode === 'manual' ? (
          <div className="panel info-panel schedule-notice-panel">
            <div className="notice-content">
              <MdInfo size={24} color="var(--primary-color)" className="notice-icon" />
              <p>Manual mode overrides automatic settings until you turn it off.</p>
            </div>
            <div className="notice-bg-leaf"></div>
          </div>
        ) : (
          <div className="panel info-panel lighting-status-panel">
            <div className="panel-header">
              <MdWbSunny color="#f59e0b" size={20} /> <h3>Current Lighting Status</h3>
            </div>
            <div className="lighting-status-content">
              <div className="light-status-left">
                <div className="status-pill"><span className="dot"></span> Lights ON</div>
                <div className="intensity-display"><h2>{manualIntensity}%</h2><span>Intensity</span></div>
              </div>
              <div className="light-status-divider"></div>
              <div className="light-status-right">
                <p className="next-change-label">Next Change</p>
                <div className="next-change-time"><MdAccessTime size={18} /><h4>12:00 PM</h4></div>
                <p className="next-change-target">→ 100%</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2 & 3 LAYOUT */}
      <div className="monitoring-bottom-layout">
        <div className="monitoring-left-col" style={{ width: '100%' }}>
          
          {mode === 'manual' ? (
            // MANUAL MODE
            <div className="manual-layout-grid">
              <div className="panel manual-controls-large-panel">
                <div className="panel-header-row" style={{ marginBottom: '24px' }}>
                  <div className="panel-title">
                    <MdTouchApp color="var(--primary-color)" size={20} /> <h3 style={{ fontSize: '18px' }}>Manual Controls</h3>
                  </div>
                </div>

                <div className="mc-row border-bottom">
                  <div className="mc-label"><span className="dot green"></span> Light Status</div>
                  <div className="toggle-switch-wrapper">
                    <span className="toggle-text">{isLightOn ? 'ON' : 'OFF'}</span>
                    <button className={`toggle-switch ${isLightOn ? 'active' : ''}`} onClick={toggleLightStatus}>
                      <div className="knob"></div>
                    </button>
                  </div>
                </div>

                <div className="mc-row">
                  <div className="mc-label"><MdWbSunny color="#f59e0b" size={18} /> Intensity Level</div>
                  <div className="slider-wrapper">
                    <h2>{manualIntensity}%</h2>
                    <div className="slider-container">
                      <input type="range" min="0" max="100" value={manualIntensity} onChange={handleIntensityChange} className="custom-range-large" />
                      <div className="slider-labels"><span>0%</span><span>50%</span><span>100%</span></div>
                    </div>
                    <div className="slider-value-box">{manualIntensity}%</div>
                  </div>
                </div>

                <div className="mc-grid-2">
                  <div className="mc-input-group">
                    <div className="mc-label"><MdAccessTime color="var(--primary-color)" size={18} /> Duration</div>
                    <select className="mc-select" value={manualDuration} onChange={(e) => setManualDuration(e.target.value)}>
                      <option>1 hour</option><option>4 hours</option><option>12 hours</option>
                    </select>
                  </div>
                  <div className="mc-input-group">
                    <div className="mc-label"><MdCalendarToday color="var(--primary-color)" size={18} /> Time Range</div>
                    <div className="time-range-inputs">
                      <select className="mc-select" value={startTime} onChange={(e) => setStartTime(e.target.value)}>
                        <option>08:00 AM</option><option>09:00 AM</option>
                      </select>
                      <span>—</span>
                      <select className="mc-select" value={endTime} onChange={(e) => setEndTime(e.target.value)}>
                        <option>08:00 PM</option><option>09:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mc-row">
                  <div className="mc-label"><MdPalette color="var(--primary-color)" size={18} /> Color Spectrum (Optional)</div>
                  <div className="mc-spectrum-row">
                    <div className="spectrum-circles">
                      {spectrumOptions.map((color, i) => (
                        <button key={i} className={`color-circle ${activeSpectrum.hex === color.hex ? 'active' : ''}`} style={{ backgroundColor: color.hex }} onClick={() => setActiveSpectrum(color)} />
                      ))}
                    </div>
                    <button className="btn-custom-spectrum"><MdTune size={16} /> Custom</button>
                  </div>
                </div>

                <div className="mc-presets-box">
                  <div className="mc-label mb-4"><MdEco color="var(--primary-color)" size={18} /> Quick Presets <span>(Optional)</span></div>
                  <div className="presets-row">
                    <button className={`mc-preset-btn ${activePreset === 'seedling' ? 'active' : ''}`} onClick={() => handlePresetSelect('seedling')}>Seedling</button>
                    <button className={`mc-preset-btn ${activePreset === 'vegetative' ? 'active' : ''}`} onClick={() => handlePresetSelect('vegetative')}>Vegetative</button>
                    <button className={`mc-preset-btn ${activePreset === 'flowering' ? 'active' : ''}`} onClick={() => handlePresetSelect('flowering')}>Flowering</button>
                    <div className="preset-divider"></div>
                    <button className="mc-preset-btn outline">Custom</button>
                  </div>
                </div>
              </div>

              <div className="manual-right-col">
                <div className="panel manual-preview-panel">
                  <div className="panel-header">
                    <MdWbSunny color="var(--primary-color)" size={20} /> <h3>Lighting Preview</h3>
                  </div>
                  <div className="manual-preview-img-container">
                    <img src="https://images.unsplash.com/photo-1558442074-3c19857bc1dc?auto=format&fit=crop&w=800&q=80" alt="LED Grow Lights" />
                    <div className="live-badge"><span className="dot"></span> Live</div>
                  </div>
                </div>

                <div className="panel manual-summary-panel">
                  <div className="panel-header">
                    <MdDateRange color="var(--primary-color)" size={20} /> <h3>Current Settings Summary</h3>
                  </div>
                  <div className="summary-grid">
                    <div className="summary-item">
                      <div className="sum-icon bg-orange"><MdWbSunny color="#f59e0b" size={24} /></div>
                      <span>Intensity</span><strong>{manualIntensity}%</strong>
                    </div>
                    <div className="summary-divider"></div>
                    <div className="summary-item">
                      <div className="sum-icon bg-green"><MdAccessTime color="var(--primary-color)" size={24} /></div>
                      <span>Active Until</span><strong>{endTime}</strong>
                    </div>
                    <div className="summary-divider"></div>
                    <div className="summary-item">
                      <div className="sum-icon bg-blue"><MdEco color="#0ea5e9" size={24} /></div>
                      <span>Lighting Phase</span><strong>Afternoon</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : mode === 'schedule' ? (
            // CUSTOM SCHEDULE
            <>
              <div className="monitoring-middle-grid">
                 <div className="panel chart-panel">
                    <div className="panel-header-row">
                      <div className="panel-title">
                        <MdDateRange color="var(--primary-color)" size={20} /> <h3>24-Hour Lighting Schedule</h3>
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
                              <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="var(--bg-panel)" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path d="M 0 35 C 15 35, 15 15, 30 15 C 45 15, 45 -5, 50 -5 C 55 -5, 55 15, 70 15 C 85 15, 85 35, 100 35 L 100 50 L 0 50 Z" fill="url(#chartFill)" />
                          <path d="M 0 35 C 15 35, 15 15, 30 15 C 45 15, 45 -5, 50 -5 C 55 -5, 55 15, 70 15 C 85 15, 85 35, 100 35" fill="none" stroke="var(--primary-color)" strokeWidth="1.5" />
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

                  <div className={`right-preview-stack ${mode === 'schedule' ? 'is-schedule' : ''}`}>
                    <div className="panel plant-stage-panel-small">
                      <div className="panel-header">
                        <MdEco color="var(--primary-color)" size={18} /> <h3>Plant Growth Stage</h3>
                      </div>
                      <div className="plant-stage-content-small">
                        <div className="plant-stage-img-small">
                          <img src="https://cdn-icons-png.flaticon.com/512/2329/2329903.png" alt="Cabbage" />
                        </div>
                        <div className="plant-stage-info-small">
                          <h4>Vegetative</h4>
                          <p>(Detected by AI)</p>
                          <button className="btn-change-stage">Change Stage</button>
                        </div>
                      </div>
                    </div>
                    <div className="panel lighting-preview-panel">
                      <div className="panel-header">
                        <MdWbSunny color="var(--primary-color)" size={18} /> <h3>Lighting Preview</h3>
                      </div>
                      <div className="preview-img-container">
                        <img src="https://images.unsplash.com/photo-1558442074-3c19857bc1dc?auto=format&fit=crop&w=600&q=80" alt="LED Grow Lights" />
                      </div>
                    </div>
                  </div>
              </div>

              <div className="schedule-settings-layout">
                <div className="panel schedule-table-panel">
                  <div className="panel-header-row">
                    <div className="panel-title">
                      <MdDateRange color="var(--primary-color)" size={20} /> <h3>Schedule Time Slots</h3>
                    </div>
                    <button className="btn-add-slot" onClick={openAddModal}><MdAdd size={16} /> Add Time Slot</button>
                  </div>
                  <table className="schedule-table">
                    <thead>
                      <tr><th>Time</th><th>Intensity</th><th>Phase</th><th style={{ textAlign: 'right' }}>Action</th></tr>
                    </thead>
                    <tbody>
                      {scheduleSlots.map((slot) => (
                        <tr key={slot.id}>
                          <td><span className="time-dot" style={{ backgroundColor: slot.color }}></span> {slot.time}</td>
                          <td>{slot.intensity}</td>
                          <td>{slot.phase}</td>
                          <td className="action-cell">
                            <button className="icon-btn" onClick={() => openEditModal(slot)}><MdEdit size={16} /></button>
                            <button className="icon-btn danger" onClick={() => handleDeleteSlot(slot.id)}><MdDelete size={16} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="panel color-spectrum-panel">
                  <div className="panel-header"><MdPalette color="var(--primary-color)" size={20} /> <h3>Color Spectrum</h3></div>
                  <div className="spectrum-circles">
                    {spectrumOptions.map((c, i) => (
                      <button key={i} className={`color-circle ${activeSpectrum.hex === c.hex ? 'active' : ''}`} style={{ backgroundColor: c.hex }} onClick={() => setActiveSpectrum(c)} />
                    ))}
                  </div>
                  <div className="spectrum-slider-bar"></div>
                  <div className="current-spectrum-dropdown">
                    <div><span>Current Spectrum:</span><strong>{activeSpectrum.name}</strong></div>
                    <MdArrowDropDown size={20} />
                  </div>
                </div>
                <div className="panel quick-actions-panel">
                  <div className="panel-header"><MdFlashOn color="#f59e0b" size={20} /> <h3>Quick Actions</h3></div>
                  <div className="quick-actions-buttons">
                    <button className={`btn-action-primary ${isSaved ? 'success' : ''}`} onClick={handleSaveSchedule} disabled={isSaving}>
                      {isSaving ? <><MdSync size={18} className="icon-spin" /> Saving...</> : isSaved ? <><MdCheckCircle size={18} /> Saved!</> : <><MdCheckCircle size={18} /> Save Schedule</>}
                    </button>
                    <button className="btn-action-outline" onClick={handleResetDefault}><MdSync size={18} /> Reset to Default</button>
                    <button className={`btn-action-outline ${isApplied ? 'success-outline' : ''}`} onClick={handleApplyNow} disabled={isApplying}>
                      {isApplying ? <><MdSync size={18} className="icon-spin" /> Applying...</> : isApplied ? <><MdCheckCircle size={18} /> Applied!</> : <><MdPlayArrow size={18} /> Apply Now</>}
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // AI AUTOMATIC
            <>
              <div className="monitoring-middle-grid">
                 <div className="panel chart-panel">
                    <div className="panel-header-row">
                      <div className="panel-title">
                        <MdDateRange color="var(--primary-color)" size={20} /> <h3>24-Hour Lighting Schedule</h3>
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
                              <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="var(--bg-panel)" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path d="M 0 35 C 15 35, 15 15, 30 15 C 45 15, 45 -5, 50 -5 C 55 -5, 55 15, 70 15 C 85 15, 85 35, 100 35 L 100 50 L 0 50 Z" fill="url(#chartFill)" />
                          <path d="M 0 35 C 15 35, 15 15, 30 15 C 45 15, 45 -5, 50 -5 C 55 -5, 55 15, 70 15 C 85 15, 85 35, 100 35" fill="none" stroke="var(--primary-color)" strokeWidth="1.5" />
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

                  <div className="right-preview-stack">
                    <div className="panel lighting-preview-panel">
                      <div className="panel-header">
                        <MdWbSunny color="var(--primary-color)" size={18} /> <h3>Lighting Preview</h3>
                      </div>
                      <div className="preview-img-container">
                        <img src="https://images.unsplash.com/photo-1558442074-3c19857bc1dc?auto=format&fit=crop&w=600&q=80" alt="LED Grow Lights" />
                      </div>
                    </div>
                  </div>
              </div>

              <div className="monitoring-bottom-grid">
                {/* Manual Adjustment */}
                <div className="panel manual-adjust-panel">
                  <div className="panel-header">
                    <MdPanTool color="var(--primary-color)" size={20} /> <h3>Manual Adjustment</h3>
                    <p className="panel-subtext">Override the current schedule if needed.</p>
                  </div>
                  <div className="manual-controls">
                    <div className="manual-slider-col">
                      <div className="slider-row">
                        <MdWbSunny color="#f59e0b" size={16} />
                        <div className="slider-text"><span>Intensity Level</span><strong>{manualIntensity}%</strong></div>
                      </div>
                      <input type="range" min="0" max="100" value={manualIntensity} onChange={handleIntensityChange} className="custom-range" />
                      <div className="duration-row">
                        <MdAccessTime color="var(--primary-color)" size={16} /><span>Duration</span>
                        <select className="duration-select" value={manualDuration} onChange={(e) => setManualDuration(e.target.value)}>
                          <option>1 hour</option><option>2 hours</option><option>4 hours</option>
                        </select>
                      </div>
                    </div>
                    <div className="manual-divider"></div>
                    <div className="manual-action-col">
                      <button className={`btn-turn-on ${isLightOn ? 'active-off' : ''}`} onClick={toggleLightStatus} disabled={isTurningOn}>
                        {isTurningOn ? <><MdAccessTime size={24} className="icon-spin" /><span>Wait...</span></> : isLightOn ? <><MdStop size={24} /><span>Turn Off</span></> : <><MdPlayArrow size={24} /><span>Turn On</span></>}
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
                    <button className={`preset-btn ${activePreset === 'seedling' ? 'active' : ''}`} onClick={() => handlePresetSelect('seedling')}>
                      <MdEco size={20} color="var(--primary-color)" />{activePreset === 'seedling' && <MdCheckCircle size={16} className="check-icon" color="var(--primary-color)" />}<strong>Seedling</strong><span>(40–60%)</span>
                    </button>
                    <button className={`preset-btn ${activePreset === 'vegetative' ? 'active' : ''}`} onClick={() => handlePresetSelect('vegetative')}>
                      <MdEco size={20} color="var(--primary-color)" />{activePreset === 'vegetative' && <MdCheckCircle size={16} className="check-icon" color="var(--primary-color)" />}<strong>Vegetative</strong><span>(60–80%)</span>
                    </button>
                    <button className={`preset-btn ${activePreset === 'flowering' ? 'active' : ''}`} onClick={() => handlePresetSelect('flowering')}>
                      <MdWbSunny size={20} color="#ef4444" />{activePreset === 'flowering' && <MdCheckCircle size={16} className="check-icon" color="var(--primary-color)" />}<strong>Flowering</strong><span>(80–100%)</span>
                    </button>
                  </div>
                </div>

                {/* AI Insights */}
                <div className="panel ai-insights-panel">
                  <div className="panel-header-row">
                    <div className="panel-title"><MdSettings color="var(--primary-color)" size={20} /> <h3>AI Insights</h3></div>
                    <button className="btn-text-link">View Details →</button>
                  </div>
                  <div className="insights-content-box">
                    <MdEco size={40} color="#22c55e" className="insight-bg-icon" />
                    <h4>Optimal Settings Active</h4>
                    <p>Your plants are in the vegetative stage. Lighting is adjusted to <strong>{manualIntensity}% intensity</strong> for healthy growth.</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Bottom Action Buttons (Only for Manual Mode) */}
          {mode === 'manual' && (
            <div className="manual-bottom-actions">
              <button className="btn-reset-default">
                <MdSync size={18} /> Reset to Default
              </button>
              <div className="right-actions">
                <button className="btn-save-settings">
                  <MdSave size={18} /> Save Settings
                </button>
                <button className="btn-apply-now">
                  <MdCheckCircle size={18} /> Apply Now
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* POPUP MODAL (For Schedule Mode) */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingSlot ? 'Edit Time Slot' : 'Add New Time Slot'}</h3>
              <button className="modal-close" onClick={() => setIsModalOpen(false)}><MdClose size={24} /></button>
            </div>
            
            <div className="modal-body">
              <div className="form-group">
                <label>Time</label>
                <input 
                  type="text" 
                  value={formData.time} 
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  placeholder="e.g. 08:00 AM"
                />
              </div>

              <div className="form-group">
                <label>Intensity (%)</label>
                <input 
                  type="text" 
                  value={formData.intensity} 
                  onChange={(e) => setFormData({ ...formData, intensity: e.target.value })}
                  placeholder="e.g. 60%"
                />
              </div>

              <div className="form-group">
                <label>Phase Name</label>
                <input 
                  type="text" 
                  value={formData.phase} 
                  onChange={(e) => setFormData({ ...formData, phase: e.target.value })}
                  placeholder="e.g. Morning"
                />
              </div>

              <div className="form-group">
                <label>Indicator Color</label>
                <div className="modal-colors">
                  {spectrumOptions.map((c, i) => (
                    <button 
                      key={i} 
                      className={`color-circle small ${formData.color === c.hex ? 'active' : ''}`}
                      style={{ backgroundColor: c.hex }}
                      onClick={() => setFormData({ ...formData, color: c.hex })}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="btn-save" onClick={handleSaveModal}>Save Slot</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default LightingControl;
import { useState } from 'react';
import TopNavbar from '../../components/topnavbar/TopNavbar';
import { 
  MdSettings, MdEco, MdSync, MdPublic, MdLanguage, 
  MdArrowDropDown, MdColorLens, MdTextFields, MdCheckCircle,
  MdPalette, MdNotifications, MdPhoneIphone, MdEmail, MdWarningAmber,
  MdArrowForward, MdTune, MdStorage, MdRestore, MdSystemUpdate,
  MdClose, MdInfoOutline
} from 'react-icons/md';
import '../css/settings.css';

const Settings = ({ 
  theme, setTheme, 
  accentColor, setAccentColor, 
  fontSize, setFontSize, 
  timeZone, setTimeZone, 
  language, setLanguage 
}) => {
  // Local State for non-global settings
  const [controlMode, setControlMode] = useState('Auto');
  const [updateInterval, setUpdateInterval] = useState('5 minutes');
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);

  // Action States
  const [backupStatus, setBackupStatus] = useState('idle');
  const [updateStatus, setUpdateStatus] = useState('idle');
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isThresholdModalOpen, setIsThresholdModalOpen] = useState(false);
  
  // Save State
  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle', 'saving', 'saved'

  const accentColors = ['#15803d', '#0ea5e9', '#8b5cf6', '#f43f5e', '#f97316', '#eab308'];

  // Handlers
  const handleBackup = () => {
    setBackupStatus('loading');
    setTimeout(() => {
      setBackupStatus('success');
      setTimeout(() => setBackupStatus('idle'), 3000);
    }, 2000);
  };

  const handleUpdate = () => {
    setUpdateStatus('loading');
    setTimeout(() => {
      setUpdateStatus('success');
      setTimeout(() => setUpdateStatus('idle'), 3000);
    }, 2000);
  };

  const handleSaveChanges = () => {
    setSaveStatus('saving');
    // Simulate API call to save settings
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <div className="settings-container">
      
      <TopNavbar 
        title="Settings" 
        subtitle="Manage your system preferences and account configuration." 
        timeZone={timeZone}
      />

      {/* MAIN GRID */}
      <div className="settings-grid">
        
        {/* 1. System Settings */}
        <div className="panel settings-panel">
          <div className="panel-header">
            <div className="settings-header-icon"><MdSettings color="var(--primary-color)" size={24} /></div>
            <h3>System Settings</h3>
          </div>
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-icon"><MdEco color="var(--primary-color)" size={20} /></div>
              <div className="setting-info"><strong>Control Mode</strong><p>Choose how your system operates.</p></div>
              <div className="setting-toggle-group">
                <button className={`stg-btn ${controlMode === 'Auto' ? 'active' : ''}`} onClick={() => setControlMode('Auto')}>Auto</button>
                <button className={`stg-btn ${controlMode === 'Manual' ? 'active' : ''}`} onClick={() => setControlMode('Manual')}>Manual</button>
              </div>
            </div>
            
            <div className="setting-item">
              <div className="setting-icon"><MdSync color="var(--primary-color)" size={20} /></div>
              <div className="setting-info"><strong>Sensor Update Interval</strong><p>Set how often sensors send data.</p></div>
              <div className="setting-select-wrapper">
                <select value={updateInterval} onChange={(e) => setUpdateInterval(e.target.value)}>
                  <option>1 minute</option><option>5 minutes</option><option>15 minutes</option><option>30 minutes</option>
                </select>
                <MdArrowDropDown className="dropdown-icon" size={20} />
              </div>
            </div>

            {/* TIME ZONE - Global State */}
            <div className="setting-item">
              <div className="setting-icon"><MdPublic color="var(--primary-color)" size={20} /></div>
              <div className="setting-info"><strong>Time Zone</strong><p>Set your local time zone.</p></div>
              <div className="setting-select-wrapper">
                <select value={timeZone} onChange={(e) => setTimeZone(e.target.value)}>
                  <option value="Asia/Manila">Asia/Manila</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="Europe/London">Europe/London</option>
                </select>
                <MdArrowDropDown className="dropdown-icon" size={20} />
              </div>
            </div>

            {/* LANGUAGE - Global State */}
            <div className="setting-item border-none">
              <div className="setting-icon"><MdLanguage color="var(--primary-color)" size={20} /></div>
              <div className="setting-info"><strong>Language</strong><p>Choose your preferred language.</p></div>
              <div className="setting-select-wrapper">
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option value="English">English</option>
                  <option value="Filipino">Filipino</option>
                  <option value="Spanish">Spanish</option>
                </select>
                <MdArrowDropDown className="dropdown-icon" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* 2. Appearance */}
        <div className="panel settings-panel">
          <div className="panel-header">
            <div className="settings-header-icon"><MdPalette color="var(--primary-color)" size={24} /></div>
            <h3>Appearance</h3>
          </div>
          <div className="settings-list">
            
            {/* THEME - Global State */}
            <div className="setting-item">
              <div className="setting-icon"><MdEco color="var(--primary-color)" size={20} /></div>
              <div className="setting-info"><strong>Theme</strong><p>Choose your preferred theme.</p></div>
              <div className="theme-selector">
                <div className={`theme-box ${theme === 'Light' ? 'active' : ''}`} onClick={() => setTheme('Light')}>
                  <div className="theme-preview light-preview"><div className="tp-header"></div><div className="tp-body"><div className="tp-sidebar"></div><div className="tp-content"><div className="tp-card"></div><div className="tp-card"></div></div></div></div>
                  {theme === 'Light' && <MdCheckCircle className="theme-check" color="var(--primary-color)" size={20} />}
                  <span>Light</span>
                </div>
                <div className={`theme-box ${theme === 'Dark' ? 'active' : ''}`} onClick={() => setTheme('Dark')}>
                  <div className="theme-preview dark-preview"><div className="tp-header"></div><div className="tp-body"><div className="tp-sidebar"></div><div className="tp-content"><div className="tp-card"></div><div className="tp-card"></div></div></div></div>
                  {theme === 'Dark' && <MdCheckCircle className="theme-check" color="var(--primary-color)" size={20} />}
                  <span>Dark</span>
                </div>
              </div>
            </div>

            {/* ACCENT COLOR - Global State */}
            <div className="setting-item">
              <div className="setting-icon"><MdColorLens color="var(--primary-color)" size={20} /></div>
              <div className="setting-info"><strong>Accent Color</strong><p>Select your accent color.</p></div>
              <div className="color-picker-row">
                {accentColors.map(color => (
                  <button key={color} className={`accent-circle ${accentColor === color ? 'active' : ''}`} style={{ backgroundColor: color }} onClick={() => setAccentColor(color)}>
                    {accentColor === color && <MdCheckCircle color="white" size={16} />}
                  </button>
                ))}
              </div>
            </div>

            {/* FONT SIZE - Global State */}
            <div className="setting-item border-none">
              <div className="setting-icon"><MdTextFields color="var(--primary-color)" size={20} /></div>
              <div className="setting-info"><strong>Font Size</strong><p>Adjust text size for better readability.</p></div>
              <div className="setting-select-wrapper">
                <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </select>
                <MdArrowDropDown className="dropdown-icon" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Notifications */}
        <div className="panel settings-panel">
          <div className="panel-header">
            <div className="settings-header-icon"><MdNotifications color="var(--primary-color)" size={24} /></div>
            <h3>Notifications</h3>
          </div>
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-icon"><MdPhoneIphone color="var(--primary-color)" size={20} /></div>
              <div className="setting-info"><strong>Push Notifications</strong><p>Receive instant updates.</p></div>
              <button className={`set-toggle ${pushEnabled ? 'active' : ''}`} onClick={() => setPushEnabled(!pushEnabled)}><div className="knob"></div></button>
            </div>
            <div className="setting-item">
              <div className="setting-icon"><MdEmail color="var(--primary-color)" size={20} /></div>
              <div className="setting-info"><strong>Email Alerts</strong><p>Get alerts via email.</p></div>
              <button className={`set-toggle ${emailEnabled ? 'active' : ''}`} onClick={() => setEmailEnabled(!emailEnabled)}><div className="knob"></div></button>
            </div>
            <div className="setting-item border-none">
              <div className="setting-icon"><MdWarningAmber color="var(--primary-color)" size={20} /></div>
              <div className="setting-info"><strong>Alert Thresholds</strong><p>Set thresholds for sensor alerts.</p></div>
              <button className="set-btn-outline" onClick={() => setIsThresholdModalOpen(true)}>
                Configure <MdArrowForward size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* 4. Advanced Settings */}
        <div className="panel settings-panel">
          <div className="panel-header">
            <div className="settings-header-icon"><MdTune color="var(--primary-color)" size={24} /></div>
            <h3>Advanced Settings</h3>
          </div>
          <div className="settings-list">
            <div className="setting-item">
              <div className="setting-icon"><MdStorage color="var(--primary-color)" size={20} /></div>
              <div className="setting-info"><strong>Data Backup</strong><p>Back up your system data.</p></div>
              <button className="set-btn-outline" onClick={handleBackup} disabled={backupStatus !== 'idle'}>
                {backupStatus === 'loading' ? 'Backing up...' : backupStatus === 'success' ? 'Backed up!' : 'Backup Now'} 
                <MdSync size={16} className={backupStatus === 'loading' ? 'icon-spin' : ''} />
              </button>
            </div>
            <div className="setting-item">
              <div className="setting-icon"><MdRestore color="#ef4444" size={20} /></div>
              <div className="setting-info"><strong>Factory Reset</strong><p>Restore default settings.</p></div>
              <button className="set-btn-danger" onClick={() => setIsResetModalOpen(true)}>
                Reset <MdSync size={16} />
              </button>
            </div>
            <div className="setting-item border-none">
              <div className="setting-icon"><MdSystemUpdate color="var(--primary-color)" size={20} /></div>
              <div className="setting-info"><strong>Firmware Update</strong><p>Check for the latest updates.</p></div>
              <button className="set-btn-outline" onClick={handleUpdate} disabled={updateStatus !== 'idle'}>
                {updateStatus === 'loading' ? 'Checking...' : updateStatus === 'success' ? 'Up to Date!' : 'Check Update'}
                <MdSync size={16} className={updateStatus === 'loading' ? 'icon-spin' : ''} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* SECTION 3: BOTTOM INFO & SAVE BAR */}
      <div className="settings-bottom-bar">
        <div className="settings-info-text">
          <MdInfoOutline size={20} color="var(--primary-color)" />
          <span>Changes will be saved automatically.</span>
        </div>
        
        <button 
          className={`settings-save-btn ${saveStatus === 'saved' ? 'saved' : ''}`} 
          onClick={handleSaveChanges}
          disabled={saveStatus !== 'idle'}
        >
          {saveStatus === 'saving' ? (
            <><MdSync size={18} className="icon-spin" /> Saving...</>
          ) : saveStatus === 'saved' ? (
            <><MdCheckCircle size={18} /> Saved!</>
          ) : (
            <><MdCheckCircle size={18} /> Save Changes</>
          )}
        </button>
      </div>

      {/* MODALS */}
      {isResetModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 style={{ color: '#ef4444' }}>Factory Reset</h3>
              <button className="modal-close" onClick={() => setIsResetModalOpen(false)}><MdClose size={24} /></button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '13px', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                Are you sure you want to restore all settings to default? This action cannot be undone and will erase all custom configurations.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setIsResetModalOpen(false)}>Cancel</button>
              <button className="btn-save" style={{ background: '#ef4444' }} onClick={() => setIsResetModalOpen(false)}>Yes, Reset</button>
            </div>
          </div>
        </div>
      )}

      {isThresholdModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Configure Alert Thresholds</h3>
              <button className="modal-close" onClick={() => setIsThresholdModalOpen(false)}><MdClose size={24} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Max Temperature (°C)</label>
                <input type="number" defaultValue={28} className="modal-input" />
              </div>
              <div className="form-group">
                <label>Min pH Level</label>
                <input type="number" defaultValue={6.5} className="modal-input" />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setIsThresholdModalOpen(false)}>Cancel</button>
              <button className="btn-save" onClick={() => setIsThresholdModalOpen(false)}>Save</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Settings;
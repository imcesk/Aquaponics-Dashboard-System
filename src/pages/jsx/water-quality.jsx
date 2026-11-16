import { useState, useEffect } from 'react';
import TopNavbar from '../../components/topnavbar/TopNavbar';
import { 
  MdWaterDrop, MdThermostat, MdOpacity, MdScience, MdWaves, 
  MdCheckCircle, MdShowChart, MdOutlineScience, MdSensors,
  MdAccessTime, MdEco, MdFlashOn, MdArrowForward, MdOutlineWaterDrop,
  MdAutorenew, MdBarChart, MdSync
} from 'react-icons/md';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase';
import '../css/water-quality.css';

const WaterQuality = () => {
  const [timeRange, setTimeRange] = useState('24h');

  // Firebase Data State
  const [sensors, setSensors] = useState({
    ph: '6.8', temp: '24.6', do: '6.8', turbidity: '4.2', waterLevel: '72'
  });

  // Quick Action States
  const [actionStatus, setActionStatus] = useState({ id: null, status: 'idle' });
  const [isTestingWater, setIsTestingWater] = useState(false);

  // Dummy data for recent readings table
  const recentReadings = [
    { time: '10:00 AM', ph: '6.8', temp: '24.6', do: '6.8', turbidity: '4.2', waterLevel: '72' },
    { time: '8:00 AM', ph: '6.7', temp: '24.3', do: '6.6', turbidity: '4.5', waterLevel: '71' },
    { time: '6:00 AM', ph: '6.6', temp: '24.1', do: '6.4', turbidity: '4.8', waterLevel: '70' },
    { time: '4:00 AM', ph: '6.7', temp: '23.8', do: '6.5', turbidity: '5.1', waterLevel: '69' },
    { time: '2:00 AM', ph: '6.8', temp: '23.5', do: '6.7', turbidity: '4.6', waterLevel: '71' },
  ];

  useEffect(() => {
    const sensorsRef = ref(database, 'sensors/');
    const unsubscribe = onValue(sensorsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensors(prev => ({
          ph: data.ph || prev.ph,
          temp: data.temp || prev.temp,
          do: data.do || prev.do,
          turbidity: data.turbidity || prev.turbidity,
          waterLevel: data.waterLevel || prev.waterLevel,
        }));
      }
    });
    return () => unsubscribe();
  }, []);

  // --- QUICK ACTIONS HANDLER ---
  const handleAction = (actionId) => {
    setActionStatus({ id: actionId, status: 'loading' });

    if (actionId === 'test') setIsTestingWater(true);

    setTimeout(() => {
      setActionStatus({ id: actionId, status: 'success' });
      
      if (actionId === 'test') setIsTestingWater(false);

      setTimeout(() => {
        setActionStatus({ id: null, status: 'idle' });
      }, 3000);
    }, 1500);
  };

  const renderActionContent = (id, defaultIcon, defaultText) => {
    const isCurrent = actionStatus.id === id;
    
    if (isCurrent && actionStatus.status === 'loading') {
      return (
        <div className="wq-action-left">
          <div className="wq-action-icon loading"><MdSync size={18} className="icon-spin" /></div>
          <span>Processing...</span>
        </div>
      );
    }
    
    if (isCurrent && actionStatus.status === 'success') {
      return (
        <div className="wq-action-left">
          <div className="wq-action-icon success"><MdCheckCircle size={18} /></div>
          <span>Completed!</span>
        </div>
      );
    }

    return (
      <>
        <div className="wq-action-left">
          <div className="wq-action-icon">{defaultIcon}</div>
          <span>{defaultText}</span>
        </div>
        <MdArrowForward color="var(--text-muted)" />
      </>
    );
  };

  return (
    <div className="water-quality-container">
      
      <TopNavbar 
        title="Water Quality" 
        subtitle="Real-time monitoring of your aquaponics water parameters." 
      />

      {/* SECTION 1: Top Status Cards */}
      <div className="wq-cards-grid">
        <div className="wq-card">
          <div className="wq-icon-wrapper"><MdScience color="var(--primary-color)" size={24} /></div>
          <div className="wq-card-content">
            <p className="wq-card-title">pH Level</p>
            <h3 className="wq-card-value">{sensors.ph}</h3>
            <p className="wq-card-ideal">(Ideal: 6.5 – 7.5)</p>
            <div className="wq-badge-wrapper"><span className="wq-badge"><MdCheckCircle size={14} /> Normal</span></div>
          </div>
        </div>
        <div className="wq-card">
          <div className="wq-icon-wrapper"><MdThermostat color="var(--primary-color)" size={24} /></div>
          <div className="wq-card-content">
            <p className="wq-card-title">Water Temperature</p>
            <h3 className="wq-card-value">{sensors.temp}°C</h3>
            <p className="wq-card-ideal">(Ideal: 22 – 28°C)</p>
            <div className="wq-badge-wrapper"><span className="wq-badge"><MdCheckCircle size={14} /> Normal</span></div>
          </div>
        </div>
        <div className="wq-card">
          <div className="wq-icon-wrapper"><MdOpacity color="var(--primary-color)" size={24} /></div>
          <div className="wq-card-content">
            <p className="wq-card-title">Dissolved Oxygen</p>
            <h3 className="wq-card-value">{sensors.do} <span>mg/L</span></h3>
            <p className="wq-card-ideal">(Ideal: 5 – 8 mg/L)</p>
            <div className="wq-badge-wrapper"><span className="wq-badge"><MdCheckCircle size={14} /> Normal</span></div>
          </div>
        </div>
        <div className="wq-card">
          <div className="wq-icon-wrapper"><MdWaterDrop color="var(--primary-color)" size={24} /></div>
          <div className="wq-card-content">
            <p className="wq-card-title">Turbidity</p>
            <h3 className="wq-card-value">{sensors.turbidity} <span>NTU</span></h3>
            <p className="wq-card-ideal">(Ideal: 0 – 10 NTU)</p>
            <div className="wq-badge-wrapper"><span className="wq-badge"><MdCheckCircle size={14} /> Normal</span></div>
          </div>
        </div>
        <div className="wq-card">
          <div className="wq-icon-wrapper"><MdWaves color="var(--primary-color)" size={24} /></div>
          <div className="wq-card-content">
            <p className="wq-card-title">Water Level</p>
            <h3 className="wq-card-value">{sensors.waterLevel}<span>%</span></h3>
            <p className="wq-card-ideal">(Normal Range: 60 – 90%)</p>
            <div className="wq-badge-wrapper"><span className="wq-badge"><MdCheckCircle size={14} /> Normal</span></div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Trends, Parameters, Sensor Status */}
      <div className="wq-middle-grid">
        <div className="panel wq-chart-panel">
          <div className="panel-header-row">
            <div className="panel-title">
              <MdShowChart color="var(--primary-color)" size={20} /> <h3>Water Quality Trends</h3>
            </div>
            <div className="wq-tabs">
              <button className={timeRange === '24h' ? 'active' : ''} onClick={() => setTimeRange('24h')}>Last 24 Hours</button>
              <button className={timeRange === '7d' ? 'active' : ''} onClick={() => setTimeRange('7d')}>7 Days</button>
              <button className={timeRange === '30d' ? 'active' : ''} onClick={() => setTimeRange('30d')}>30 Days</button>
            </div>
          </div>
          <div className="wq-chart-container">
            <div className="wq-y-axis"><span>100</span><span>80</span><span>60</span><span>40</span><span>20</span><span>0</span></div>
            <div className="wq-chart-area">
              <div className="wq-grid-lines"><div></div><div></div><div></div><div></div><div></div><div></div></div>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="wq-svg">
                <path d="M 0 45 L 10 48 L 20 46 L 30 42 L 40 40 L 50 42 L 60 45 L 70 48 L 80 46 L 90 45 L 100 48" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinejoin="round" />
                <path d="M 0 30 L 10 32 L 20 28 L 30 25 L 40 24 L 50 26 L 60 30 L 70 32 L 80 28 L 90 30 L 100 28" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinejoin="round" />
                <path d="M 0 60 L 10 58 L 20 62 L 30 60 L 40 58 L 50 55 L 60 58 L 70 60 L 80 58 L 90 62 L 100 60" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinejoin="round" />
                <path d="M 0 85 L 10 82 L 20 85 L 30 88 L 40 85 L 50 82 L 60 85 L 70 88 L 80 85 L 90 82 L 100 85" fill="none" stroke="#f97316" strokeWidth="2" strokeLinejoin="round" />
                <path d="M 0 25 L 10 25 L 20 26 L 30 25 L 40 24 L 50 25 L 60 25 L 70 26 L 80 25 L 90 25 L 100 25" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinejoin="round" />
              </svg>
              <div className="wq-x-axis"><span>12AM</span><span>4AM</span><span>8AM</span><span>12PM</span><span>4PM</span><span>8PM</span><span>12AM</span></div>
            </div>
          </div>
          <div className="wq-legend">
            <span><span className="dot" style={{background:'var(--primary-color)'}}></span> pH</span>
            <span><span className="dot" style={{background:'#0ea5e9'}}></span> Temperature (°C)</span>
            <span><span className="dot" style={{background:'#8b5cf6'}}></span> DO (mg/L)</span>
            <span><span className="dot" style={{background:'#f97316'}}></span> Turbidity (NTU)</span>
            <span><span className="dot" style={{background:'#06b6d4'}}></span> Water Level (%)</span>
          </div>
        </div>

        <div className="panel wq-params-panel">
          <div className="panel-header"><MdOutlineScience color="var(--primary-color)" size={20} /> <h3>Water Quality Parameters</h3></div>
          <div className="wq-params-list">
            <div className="wq-param-item"><div className="wq-param-icon"><MdScience color="var(--primary-color)" /></div><span className="wq-param-label">pH</span><strong className="wq-param-value">{sensors.ph}</strong><span className="wq-badge"><MdCheckCircle size={12} /> Normal</span></div>
            <div className="wq-param-item"><div className="wq-param-icon"><MdThermostat color="var(--primary-color)" /></div><span className="wq-param-label">Temperature</span><strong className="wq-param-value">{sensors.temp}°C</strong><span className="wq-badge"><MdCheckCircle size={12} /> Normal</span></div>
            <div className="wq-param-item"><div className="wq-param-icon"><MdOpacity color="var(--primary-color)" /></div><span className="wq-param-label">Dissolved Oxygen</span><strong className="wq-param-value">{sensors.do} mg/L</strong><span className="wq-badge"><MdCheckCircle size={12} /> Normal</span></div>
            <div className="wq-param-item"><div className="wq-param-icon"><MdWaterDrop color="var(--primary-color)" /></div><span className="wq-param-label">Turbidity</span><strong className="wq-param-value">{sensors.turbidity} NTU</strong><span className="wq-badge"><MdCheckCircle size={12} /> Normal</span></div>
            <div className="wq-param-item"><div className="wq-param-icon"><MdWaves color="var(--primary-color)" /></div><span className="wq-param-label">Water Level</span><strong className="wq-param-value">{sensors.waterLevel}%</strong><span className="wq-badge"><MdCheckCircle size={12} /> Normal</span></div>
          </div>
        </div>

        <div className="panel wq-sensors-panel">
          <div className="panel-header"><MdSensors color="var(--primary-color)" size={20} /> <h3>Sensor Status</h3></div>
          <div className="wq-sensor-list">
            <div className="wq-sensor-item"><div className="wq-sensor-name"><span className="dot green"></span> pH Sensor</div><span className="wq-sensor-status">Online</span></div>
            <div className="wq-sensor-item"><div className="wq-sensor-name"><span className="dot green"></span> Temperature Sensor</div><span className="wq-sensor-status">Online</span></div>
            <div className="wq-sensor-item"><div className="wq-sensor-name"><span className="dot green"></span> DO Sensor</div><span className="wq-sensor-status">Online</span></div>
            <div className="wq-sensor-item"><div className="wq-sensor-name"><span className="dot green"></span> Turbidity Sensor</div><span className="wq-sensor-status">Online</span></div>
            <div className="wq-sensor-item"><div className="wq-sensor-name"><span className="dot green"></span> Water Level Sensor</div><span className="wq-sensor-status">Online</span></div>
          </div>
          <div className="wq-sensor-footer"><MdCheckCircle size={24} color="var(--primary-color)" /><p>All sensors are functioning properly.</p></div>
        </div>
      </div>

      {/* SECTION 3: Recent Readings, Status, Quick Actions */}
      <div className="wq-bottom-grid">
        
        <div className="panel wq-readings-panel">
          <div className="panel-header"><MdAccessTime color="var(--primary-color)" size={20} /> <h3>Recent Readings</h3></div>
          <table className="wq-table">
            <thead>
              <tr><th>Time</th><th>pH</th><th>Temp (°C)</th><th>DO (mg/L)</th><th>Turbidity (NTU)</th><th>Water Level (%)</th></tr>
            </thead>
            <tbody>
              {recentReadings.map((row, i) => (
                <tr key={i}>
                  <td>{row.time}</td><td>{row.ph}</td><td>{row.temp}</td><td>{row.do}</td><td>{row.turbidity}</td><td>{row.waterLevel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="panel wq-status-panel">
          <div className="panel-header"><MdEco color="var(--primary-color)" size={20} /> <h3>Water Quality Status</h3></div>
          <div className="wq-status-content">
            <div className="wq-donut-wrapper">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border-color)" strokeWidth="10" />
                <circle cx="50" cy="50" r="40" fill="none" stroke={isTestingWater ? "#f59e0b" : "var(--primary-color)"} strokeWidth="10" strokeDasharray="251.2" strokeDashoffset="0" strokeLinecap="round" className={isTestingWater ? 'spin-slow' : ''} />
              </svg>
              <div className="wq-donut-text">
                <h2>{isTestingWater ? '...' : '100%'}</h2>
                <span>{isTestingWater ? 'Testing' : 'Optimal'}</span>
              </div>
            </div>
            <div className="wq-status-info">
              {isTestingWater ? (
                <p>Running manual water test... Please wait.</p>
              ) : (
                <>
                  <p>All water parameters are within the ideal range.</p>
                  <p>Your aquaponic system is in good condition.</p>
                </>
              )}
            </div>
          </div>
          <div className="wq-status-bg-leaf"></div>
        </div>

        <div className="panel wq-actions-panel">
          <div className="panel-header"><MdFlashOn color="var(--primary-color)" size={20} /> <h3>Quick Actions</h3></div>
          <div className="wq-action-list">
            
            <button className="wq-action-btn" onClick={() => handleAction('test')} disabled={actionStatus.id === 'test'}>
              {renderActionContent('test', <MdOutlineWaterDrop size={18} color="var(--primary-color)" />, 'Test Water Manually')}
            </button>
            
            <button className="wq-action-btn" onClick={() => handleAction('adjust')} disabled={actionStatus.id === 'adjust'}>
              {renderActionContent('adjust', <MdWaves size={18} color="var(--primary-color)" />, 'Adjust Water Flow')}
            </button>
            
            <button className="wq-action-btn" onClick={() => handleAction('fill')} disabled={actionStatus.id === 'fill'}>
              {renderActionContent('fill', <MdAutorenew size={18} color="var(--primary-color)" />, 'Fill Water Tank')}
            </button>
            
            <button className="wq-action-btn" onClick={() => handleAction('report')} disabled={actionStatus.id === 'report'}>
              {renderActionContent('report', <MdBarChart size={18} color="var(--primary-color)" />, 'View Detailed Report')}
            </button>

          </div>
        </div>

      </div>

    </div>
  );
};

export default WaterQuality;
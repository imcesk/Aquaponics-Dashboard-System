import { useState } from 'react';
import TopNavbar from '../../components/topnavbar/TopNavbar';
import { 
  MdEco, MdWaterDrop, MdFlashOn, MdCloud, MdCalendarToday, 
  MdExpandMore, MdShowChart, MdArrowForward,
  MdTrendingUp, MdLightbulbOutline, MdAssignment, MdDownload,
  MdPictureAsPdf, MdTableChart, MdTextSnippet, MdSync, MdCheckCircle
} from 'react-icons/md';
import '../css/reports.css';

const ReportsAnalytics = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [moduleFilter, setModuleFilter] = useState('All Modules');

  // Interaction State for Downloads/Exports
  const [downloadStatus, setDownloadStatus] = useState({ id: null, status: 'idle' });

  const handleDownload = (id) => {
    setDownloadStatus({ id, status: 'loading' });
    setTimeout(() => {
      setDownloadStatus({ id, status: 'success' });
      setTimeout(() => setDownloadStatus({ id: null, status: 'idle' }), 3000);
    }, 1500);
  };

  const recentReports = [
    { id: 1, title: 'Weekly System Report', date: 'Apr 21 – Apr 27, 2025' },
    { id: 2, title: 'Water Quality Report', date: 'Apr 14 – Apr 20, 2025' },
    { id: 3, title: 'Energy Usage Report', date: 'Apr 14 – Apr 20, 2025' },
  ];

  const exportFormats = [
    { id: 'pdf', title: 'PDF Report', icon: <MdPictureAsPdf size={18} color="#ef4444" /> },
    { id: 'excel', title: 'Excel Report', icon: <MdTableChart size={18} color="var(--primary-color)" /> },
    { id: 'csv', title: 'CSV Data', icon: <MdTextSnippet size={18} color="#0ea5e9" /> },
  ];

  return (
    <div className="reports-container">
      
      <TopNavbar 
        title="Reports & Analytics" 
        subtitle="Analyze system performance and generate detailed reports." 
      />

      {/* SECTION 1: Top Filters and Metric Cards */}
      <div className="rep-filters-row">
        <div className="rep-time-tabs">
          <button className={timeRange === '24h' ? 'active' : ''} onClick={() => setTimeRange('24h')}>Last 24 Hours</button>
          <button className={timeRange === '7d' ? 'active' : ''} onClick={() => setTimeRange('7d')}>7 Days</button>
          <button className={timeRange === '30d' ? 'active' : ''} onClick={() => setTimeRange('30d')}>30 Days</button>
          <button className={`rep-custom-range ${timeRange === 'custom' ? 'active' : ''}`} onClick={() => setTimeRange('custom')}>
            <MdCalendarToday size={16} /> Custom Range
          </button>
        </div>
        <div className="rep-module-dropdown">
          <select value={moduleFilter} onChange={(e) => setModuleFilter(e.target.value)}>
            <option>All Modules</option><option>Water System</option><option>Lighting System</option><option>Energy System</option>
          </select>
          <MdExpandMore className="dropdown-icon" size={20} />
        </div>
      </div>

      <div className="rep-cards-grid">
        <div className="rep-card">
          <div className="rep-icon-wrapper"><MdEco color="var(--primary-color)" size={28} /></div>
          <div className="rep-card-content">
            <p className="rep-card-title">Plant Growth Rate</p>
            <h3 className="rep-card-value">+12%</h3>
            <p className="rep-card-trend"><span className="trend-up">▲</span> vs. last period</p>
          </div>
        </div>
        <div className="rep-card">
          <div className="rep-icon-wrapper"><MdWaterDrop color="var(--primary-color)" size={28} /></div>
          <div className="rep-card-content">
            <p className="rep-card-title">Water Usage</p>
            <h3 className="rep-card-value">48 <span>L</span></h3>
            <p className="rep-card-trend"><span className="trend-down">▼ 8%</span></p>
          </div>
        </div>
        <div className="rep-card">
          <div className="rep-icon-wrapper"><MdFlashOn color="var(--primary-color)" size={28} /></div>
          <div className="rep-card-content">
            <p className="rep-card-title">Energy Generated</p>
            <h3 className="rep-card-value">12.5 <span>kWh</span></h3>
            <p className="rep-card-trend"><span className="trend-up">▲ 18%</span></p>
          </div>
        </div>
        <div className="rep-card">
          <div className="rep-icon-wrapper"><MdCloud color="var(--primary-color)" size={28} /></div>
          <div className="rep-card-content">
            <p className="rep-card-title">Carbon Saved</p>
            <h3 className="rep-card-value">6.3 <span>kg CO₂</span></h3>
            <p className="rep-card-trend"><span className="trend-up">▲ 18%</span></p>
          </div>
        </div>
      </div>

      {/* SECTION 2: Performance Chart & Insights */}
      <div className="rep-middle-grid">
        <div className="panel rep-chart-panel">
          <div className="panel-header-row">
            <div className="panel-title"><MdShowChart color="var(--primary-color)" size={20} /> <h3>System Performance Overview</h3></div>
            <div className="rep-chart-legend">
              <span><span className="dot" style={{background:'var(--primary-color)'}}></span> Plant Health</span>
              <span><span className="dot" style={{background:'#0ea5e9'}}></span> Water Level</span>
              <span><span className="dot" style={{background:'#f59e0b'}}></span> Energy Output</span>
            </div>
          </div>
          <div className="rep-chart-container">
            <div className="rep-y-axis"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div>
            <div className="rep-chart-area">
              <div className="rep-grid-lines"><div></div><div></div><div></div><div></div><div></div></div>
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="rep-svg">
                <path d="M 0 40 L 10 40 L 20 35 L 30 25 L 40 18 L 50 15 L 60 18 L 70 22 L 80 20 L 90 18 L 100 20" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinejoin="round" />
                <path d="M 0 50 L 10 50 L 20 48 L 30 40 L 40 38 L 50 36 L 60 40 L 70 42 L 80 40 L 90 38 L 100 40" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeLinejoin="round" />
                <path d="M 0 60 L 10 58 L 20 55 L 30 50 L 40 48 L 50 50 L 60 55 L 70 55 L 80 52 L 90 50 L 100 55" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round" />
              </svg>
              <div className="rep-x-axis"><span>12AM</span><span>4AM</span><span>8AM</span><span>12PM</span><span>4PM</span><span>8PM</span><span>12AM</span></div>
            </div>
          </div>
        </div>

        <div className="panel rep-insights-panel">
          <div className="panel-header-row">
            <div className="panel-title"><MdEco color="var(--primary-color)" size={20} /> <h3>Plant Growth Insights</h3></div>
            <button className="btn-view-details">View Details <MdArrowForward size={14} /></button>
          </div>
          <div className="rep-insights-content">
            <div className="rep-insight-img"><img src="https://images.unsplash.com/photo-1599827552599-eadf6e7c884f?auto=format&fit=crop&w=600&q=80" alt="Plants" /></div>
            <div className="rep-insight-cards">
              <div className="rep-insight-card">
                <div className="rep-ic-icon green"><MdTrendingUp size={20} color="var(--primary-color)" /></div>
                <div><h4>Plant Growth is on Track!</h4><p>Growth rate is 12% higher than last period.</p></div>
              </div>
              <div className="rep-insight-card">
                <div className="rep-ic-icon yellow"><MdLightbulbOutline size={20} color="#f59e0b" /></div>
                <div><h4>Recommendation</h4><p>Keep current lighting schedule for optimal growth.</p></div>
              </div>
            </div>
          </div>
          <div className="rep-insight-bg-leaf"></div>
        </div>
      </div>

      {/* SECTION 3: Data Breakdown, Recent Reports, Export */}
      <div className="rep-bottom-grid">
        
        {/* Left: Data Breakdown */}
        <div className="panel rep-breakdown-panel">
          <div className="panel-header"><MdEco color="var(--primary-color)" size={20} /> <h3>Data Breakdown</h3></div>
          <div className="rep-breakdown-content">
            <div className="rep-donut-wrapper">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border-color)" strokeWidth="12" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--primary-color)" strokeWidth="12" strokeDasharray="180 251.2" strokeDashoffset="0" strokeLinecap="round" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#86efac" strokeWidth="12" strokeDasharray="50 251.2" strokeDashoffset="-185" strokeLinecap="round" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="12" strokeDasharray="20 251.2" strokeDashoffset="-240" strokeLinecap="round" />
              </svg>
              <div className="rep-donut-text"><h2>72%</h2><span>Healthy</span></div>
            </div>
            <div className="rep-breakdown-legend">
              <div className="rep-legend-item"><span className="dot green-dark"></span><span className="label">Healthy Plants</span><span className="val">72%</span></div>
              <div className="rep-legend-item"><span className="dot green-light"></span><span className="label">Moderate Growth</span><span className="val">20%</span></div>
              <div className="rep-legend-item"><span className="dot orange"></span><span className="label">Needs Attention</span><span className="val">8%</span></div>
            </div>
          </div>
        </div>

        {/* Middle: Recent Reports */}
        <div className="panel rep-reports-panel">
          <div className="panel-header-row">
            <div className="panel-title"><MdAssignment color="var(--primary-color)" size={20} /> <h3>Recent Reports</h3></div>
            <button className="btn-view-all">View All <MdArrowForward size={14}/></button>
          </div>
          <div className="rep-reports-list">
            {recentReports.map(report => (
              <div className="rep-report-item" key={report.id}>
                <div className="rep-report-icon"><MdAssignment color="var(--primary-color)" size={20} /></div>
                <div className="rep-report-info"><strong>{report.title}</strong><span>{report.date}</span></div>
                <button className="btn-icon-download" onClick={() => handleDownload(report.id)}>
                  {downloadStatus.id === report.id && downloadStatus.status === 'loading' ? (
                    <MdSync size={18} className="icon-spin text-green" />
                  ) : downloadStatus.id === report.id && downloadStatus.status === 'success' ? (
                    <MdCheckCircle size={18} className="text-green" />
                  ) : (
                    <MdDownload size={18} />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Export Report */}
        <div className="panel rep-export-panel">
          <div className="panel-header"><MdDownload color="var(--primary-color)" size={20} /> <h3>Export Report</h3></div>
          <p className="rep-export-subtext">Download detailed reports for your records.</p>
          
          <div className="rep-export-list">
            {exportFormats.map(format => (
              <button className="rep-export-btn" key={format.id} onClick={() => handleDownload(format.id)}>
                <div className="rep-export-left">
                  <div className="rep-export-icon">{format.icon}</div>
                  <span>{format.title}</span>
                </div>
                {downloadStatus.id === format.id && downloadStatus.status === 'loading' ? (
                  <MdSync size={16} className="icon-spin" color="var(--primary-color)" />
                ) : (
                  <MdArrowForward size={16} color="var(--text-muted)" />
                )}
              </button>
            ))}
          </div>
          <div className="rep-export-bg-leaf"></div>
        </div>

      </div>

    </div>
  );
};

export default ReportsAnalytics;
import { useState, useEffect } from 'react';
import { 
  MdWbSunny, MdCloud, MdCalendarToday, MdNotifications 
} from 'react-icons/md';
import './TopNavbar.css';

const TopNavbar = ({ title, subtitle, timeZone = 'Asia/Manila' }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState({ temp: '--°C', condition: 'Loading...' });

  // 1. Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Simulate fetching weather data
  useEffect(() => {
    const fetchWeather = () => {
      setTimeout(() => {
        setWeather({ temp: '28°C', condition: 'Partly Cloudy' });
      }, 500);
    };
    fetchWeather();
  }, []);

  // Formatting Date and Time using the passed timeZone
  const formattedDate = currentTime.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: timeZone
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: timeZone
  });

  // Extract the city name from the timezone string (e.g., "Asia/Manila" -> "Manila")
  const cityName = timeZone.split('/')[1]?.replace('_', ' ') || timeZone;

  return (
    <header className="top-nav-wrapper">
      
      <div className="top-nav-row">
        
        {/* LEFT SIDE */}
        <div className="header-left">
          <div className="weather-info">
            <div className="weather-icon-wrapper">
              <MdWbSunny className="weather-sun" />
              <MdCloud className="weather-cloud" />
            </div>
            <div>
              <p className="info-main">{weather.temp}</p>
              <p className="info-sub">{weather.condition}</p>
            </div>
          </div>

          <div className="date-info">
            <MdCalendarToday className="info-icon" />
            <div>
              <p className="info-main">{formattedDate}</p>
              <p className="info-sub">{formattedTime} ({cityName})</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="header-right">
          <div className="notification-icon">
            <MdNotifications size={22} />
            <span className="badge">3</span>
          </div>

          <div className="system-status">
            <div className="status-dot"></div>
            <div>
              <p className="info-main text-green">System Healthy</p>
              <p className="info-sub">All systems operational</p>
            </div>
          </div>

          <div className="user-profile">
            <div className="avatar">
              <img 
                src="/logo.png" 
                alt="CUIA Logo" 
                style={{ 
                  width: '26px', 
                  height: '26px', 
                  objectFit: 'contain' 
                }} 
              />
            </div>
            <div>
              <p className="info-main">EcoGrow Research Team</p>
              <p className="info-sub">Capstone Project</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Page Title */}
      <div className="page-title-row">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>

    </header>
  );
};

export default TopNavbar;
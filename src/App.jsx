import { useState, useEffect } from 'react';
import Sidebar from './layouts/sidebar/sidebar';
import Dashboard from './pages/jsx/dashboard'; 
// FIX 1: Changed import path to match your new file name
import LightingControl from './pages/jsx/lighting-control'; 
import WaterManagement from './pages/jsx/water'; 
import WaterQuality from './pages/jsx/water-quality';
import EnergyManagement from './pages/jsx/energy';
import AIAutomation from './pages/jsx/ai-automation';
import Notifications from './pages/jsx/notifications';
import ReportsAnalytics from './pages/jsx/reports';
import Settings from './pages/jsx/settings';

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem('currentPage') || 'dashboard';
  });

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'Light');
  const [accentColor, setAccentColor] = useState(() => localStorage.getItem('accentColor') || '#15803d');
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('fontSize') || 'Medium');
  const [timeZone, setTimeZone] = useState(() => localStorage.getItem('timeZone') || 'Asia/Manila');
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'English');

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage);
    localStorage.setItem('theme', theme);
    localStorage.setItem('accentColor', accentColor);
    localStorage.setItem('fontSize', fontSize);
    localStorage.setItem('timeZone', timeZone);
    localStorage.setItem('language', language);

    const root = document.documentElement;
    
    if (theme === 'Dark') {
      root.style.setProperty('--bg-app', '#0f172a');
      root.style.setProperty('--bg-panel', '#1e293b');
      root.style.setProperty('--bg-hover', '#334155'); 
      root.style.setProperty('--text-main', '#f8fafc');
      root.style.setProperty('--text-muted', '#94a3b8');
      root.style.setProperty('--border-color', '#334155');
      root.style.setProperty('--primary-light', 'rgba(34, 197, 94, 0.15)'); 
    } else {
      root.style.setProperty('--bg-app', '#f8fafc');
      root.style.setProperty('--bg-panel', '#ffffff');
      root.style.setProperty('--bg-hover', '#f1f5f9'); 
      root.style.setProperty('--text-main', '#111827');
      root.style.setProperty('--text-muted', '#64748b');
      root.style.setProperty('--border-color', '#e5e7eb');
      root.style.setProperty('--primary-light', '#dcfce7'); 
    }

    root.style.setProperty('--primary-color', accentColor);

    let baseSize = '16px';
    if (fontSize === 'Small') baseSize = '14px';
    if (fontSize === 'Large') baseSize = '18px';
    root.style.setProperty('--font-base', baseSize);

  }, [currentPage, theme, accentColor, fontSize, timeZone, language]);

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: 'var(--bg-app)', overflow: 'hidden', fontSize: 'var(--font-base)' }}>
      
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main style={{ flex: 1, padding: '24px 32px', overflowY: 'auto', minWidth: 0 }}>
        
        {currentPage === 'dashboard' && <Dashboard />}
        
        {/* FIX 2: Pass theme and accentColor as props */}
        {currentPage === 'lighting-control' && (
          <LightingControl theme={theme} accentColor={accentColor} />
        )}
        
        {currentPage === 'water-quality' && <WaterQuality />}
        {currentPage === 'water-management' && <WaterManagement />}
        {currentPage === 'energy-management' && <EnergyManagement />}
        {currentPage === 'ai-automation' && <AIAutomation />}
        {currentPage === 'notifications' && <Notifications />}
        {currentPage === 'reports' && <ReportsAnalytics />}
        
        {currentPage === 'settings' && (
          <Settings 
            theme={theme} setTheme={setTheme}
            accentColor={accentColor} setAccentColor={setAccentColor}
            fontSize={fontSize} setFontSize={setFontSize}
            timeZone={timeZone} setTimeZone={setTimeZone}
            language={language} setLanguage={setLanguage}
          />
        )}

      </main>

    </div>
  );
}

export default App;
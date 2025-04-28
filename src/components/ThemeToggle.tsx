import React from 'react';
import { Moon, Sun, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  
  const handleToggle = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('neon');
    } else {
      setTheme('light');
    }
  };

  return (
    <div className="theme-toggle">
      <button 
        onClick={handleToggle}
        className="theme-toggle-button"
        aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'neon' : 'light'} mode`}
      >
        {theme === 'light' && <Sun size={24} />}
        {theme === 'dark' && <Moon size={24} />}
        {theme === 'neon' && <Sparkles size={24} />}
        <span className="theme-label">
          {theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : '80s Neon'}
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle;
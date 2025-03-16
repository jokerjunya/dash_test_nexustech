import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <div className="text-primary font-bold text-2xl mr-2">NexusTech</div>
        <div className="text-gray-500 text-sm">エグゼクティブダッシュボード</div>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="text-gray-600 text-sm">
          {currentTime.toLocaleDateString('ja-JP', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
          })}
          <span className="ml-2">
            {currentTime.toLocaleTimeString('ja-JP')}
          </span>
        </div>
        
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          {darkMode ? (
            <SunIcon className="h-5 w-5 text-yellow-500" />
          ) : (
            <MoonIcon className="h-5 w-5 text-gray-600" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header; 
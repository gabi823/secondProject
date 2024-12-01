import React, { useState, useEffect } from 'react';
import './DarkModeToggle.css';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      setIsDarkMode(savedTheme === 'dark');
    } else if (prefersDarkMode.matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
      setIsDarkMode(true);
    }

    const handleThemeChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      setIsDarkMode(e.matches);
      localStorage.setItem('theme', newTheme);
    };

    prefersDarkMode.addEventListener('change', handleThemeChange);

    return () => {
      prefersDarkMode.removeEventListener('change', handleThemeChange);
    };
  }, []);

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button onClick={toggleDarkMode} className="dark-mode-toggle">
      {isDarkMode ? '⏾' : '☀'}
    </button>
  );
};

export default DarkModeToggle;

import React, { useState, useEffect } from 'react';
import './DarkModeToggle.css';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for user preference on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      setIsDarkMode(savedTheme === 'dark');
    } else {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        setIsDarkMode(true);
      }
    }
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const handleThemeChange = (e) => {
    const newTheme = e.matches ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    setIsDarkMode(e.matches);
    localStorage.setItem('theme', newTheme);
  };

  // Initial check
  handleThemeChange(mediaQuery);

  // Listen for changes
  mediaQuery.addEventListener('change', handleThemeChange);

  // Cleanup listener
  return () => {
    mediaQuery.removeEventListener('change', handleThemeChange);
  };
  }, []);

  // Toggle the theme and save preference
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

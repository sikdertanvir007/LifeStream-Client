import React, { createContext, useContext, useEffect, useState } from 'react';

// Create context with default value to avoid TypeScript/ESLint warnings
const ThemeContext = createContext(undefined);

// Custom hook - make sure it follows React hooks rules
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Add safety check for SSR/browser environment
    if (typeof window === 'undefined') {
      return 'light';
    }
    
    // Check localStorage first
    const savedTheme = localStorage.getItem('lifestream-theme');
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  // Listen for system theme changes
  useEffect(() => {
    // Safety check for browser environment
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only auto-change if user hasn't manually set a preference
      if (!localStorage.getItem('lifestream-theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme to document
  useEffect(() => {
    // Safety check for browser environment
    if (typeof window === 'undefined' || !document) {
      return;
    }

    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Safety check for localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('lifestream-theme', newTheme);
    }
  };

  const resetTheme = () => {
    // Safety check for browser environment
    if (typeof window === 'undefined') {
      return;
    }

    localStorage.removeItem('lifestream-theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(systemTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
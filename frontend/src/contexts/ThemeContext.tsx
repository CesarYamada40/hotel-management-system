import React, { createContext, useContext, useState } from 'react';

interface ThemeContextData {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: {
    primary: string;
    background: string;
    card: string;
    text: string;
    border: string;
  };
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export const ThemeProvider: React.FC = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const colors = {
    primary: '#DAA520',
    background: isDarkMode ? '#000' : '#FFF',
    card: isDarkMode ? '#1C1C1C' : '#F5F5F5',
    text: isDarkMode ? '#FFF' : '#000',
    border: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
  };

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

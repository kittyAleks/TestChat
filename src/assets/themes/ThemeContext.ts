import {createContext, useContext} from 'react';

export const themes = {
  light: {
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
    buttonColor: '#2222B299',
  },
  dark: {
    backgroundColor: 'rgba(34,34,178,0.6)',
    textColor: '#FFFFFF',
    buttonColor: '#FFFFFF',
  },
};

type ThemeType = typeof themes.light;

interface ThemeContextProps {
  theme: ThemeType;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: themes.light,
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// ThemeProvider.tsx
import React, {FC, ReactNode, useEffect, useState} from 'react';
import {ThemeContext, themes} from './ThemeContext';

export const ThemeProvider: FC<{
  initialTheme: 'light' | 'dark';
  children: ReactNode;
}> = ({children, initialTheme}) => {
  const [theme, setTheme] = useState(
    initialTheme === 'light' ? themes.light : themes.dark,
  );

  useEffect(() => {
    setTheme(initialTheme === 'light' ? themes.light : themes.dark);
  }, [initialTheme]);

  return (
    <ThemeContext.Provider value={{theme}}>{children}</ThemeContext.Provider>
  );
};

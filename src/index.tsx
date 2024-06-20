import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import {useColorScheme} from 'react-native';

import {store} from './init';

import {Navigation} from './View/navigation';
import {createTables} from './db/sqlite.ts';
import {
  getCurrentPosition,
  requestLocationPermission,
} from './helpers/geolocation/geolocation.ts';
import {getSunTimes} from './helpers/sunTimes.ts';
import {ThemeProvider} from './assets/themes/ThemeProvider.tsx';

export const Root = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [sunrise, setSunrise] = useState<number | null>(null);
  const [sunset, setSunset] = useState<number | null>(null);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fetchGeolocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        return;
      }

      try {
        const {latitude, longitude} = await getCurrentPosition();
        const {sunrise, sunset} = await getSunTimes(latitude, longitude);
        setSunrise(sunrise);
        setSunset(sunset);
      } catch (error) {
        console.error('Error getting location or sun times:', error);
      }
    };

    fetchGeolocation();
  }, []);

  useEffect(() => {
    if (sunrise && sunset) {
      const currentTime = Date.now() / 1000;
      if (currentTime >= sunrise && currentTime < sunset) {
        setTheme('light');
      } else {
        setTheme('dark');
      }
    }
  }, [sunrise, sunset, colorScheme]);

  useEffect(() => {
    createTables();
  }, []);

  return (
    <ThemeProvider initialTheme={theme}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </ThemeProvider>
  );
};

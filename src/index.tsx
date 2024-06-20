import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import {useColorScheme} from 'react-native';

import {store} from './init';

import {Navigation} from './View/navigation';
import {addMissingColumns, createTables} from './db/sqlite.ts';

export const Root = () => {
  const colorScheme = useColorScheme();
  console.log('colorScheme', colorScheme);

  useEffect(() => {
    createTables();
    // addMissingColumns();
    // syncOfflineComments();
    // setThemeBasedOnTime();
  }, []);

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

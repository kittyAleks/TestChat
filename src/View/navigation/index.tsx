import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {CommentsScreen} from '../screens/CommentsScreen/CommentsScreen.tsx';
import {AddCommentForm} from '../screens/AddComment';

const Stack = createStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AddComment">
        <Stack.Screen name="AddComment" component={AddCommentForm} />
        <Stack.Screen name="Comments" component={CommentsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

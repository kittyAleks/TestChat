// style.ts
import {StyleSheet} from 'react-native';
export const getStyles = (theme: any) => {
  console.log('EEEEtheme', theme);
  return StyleSheet.create({
    form: {
      padding: 20,
      borderWidth: 1,
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    textColor: {
      color: theme.textColor,
    },
    input: {
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
      color: theme.textColor,
    },
    error: {
      color: 'red',
      marginBottom: 10,
    },
    preview: {
      padding: 20,
      borderColor: '#000',
      borderWidth: 1,
      borderRadius: 10,
      position: 'absolute',
      bottom: 50,
    },
  });
};

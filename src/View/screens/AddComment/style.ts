// style.ts
import {StyleSheet} from 'react-native';
export const getStyles = (theme: any) => {
  return StyleSheet.create({
    form: {
      padding: 20,
      borderWidth: 1,
      flex: 1,
    },
    input: {
      borderColor: '#ccc',
      borderWidth: 1,
      marginBottom: 10,
      padding: 10,
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

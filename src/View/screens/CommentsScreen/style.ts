// style.ts
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  comment: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 25,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  username: {
    fontWeight: 'bold',
  },
  email: {
    color: '#555',
  },
  text: {
    marginVertical: 5,
  },
  list: {
    paddingBottom: 20,
  },
  nestedComment: {
    paddingLeft: 20,
    borderLeftWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
  },
});

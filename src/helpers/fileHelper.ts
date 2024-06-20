import {launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {Alert, PermissionsAndroid, Platform} from 'react-native';

const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'This app needs access to your storage to load photos.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const handleChooseFile = async (setFile: (file: any) => void) => {
  const hasPermission =
    Platform.OS === 'ios' ? true : await requestStoragePermission();

  if (!hasPermission) {
    Alert.alert(
      'Permission Denied',
      'You need to grant storage permission to select files.',
    );
    return;
  }

  await launchImageLibrary({mediaType: 'mixed'}, async response => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorCode) {
      Alert.alert('Error', response.errorMessage);
    } else {
      const asset = response.assets[0];
      if (asset.type.startsWith('image')) {
        if (asset.fileSize > 320 * 240) {
          const resizedImage = await ImageResizer.createResizedImage(
            asset.uri,
            320,
            240,
            'JPEG',
            100,
          );
          setFile({
            uri: resizedImage.uri,
            type: asset.type,
            name: asset.fileName,
            size: resizedImage.size,
          });
        } else {
          setFile({
            uri: asset.uri,
            type: asset.type,
            name: asset.fileName,
            size: asset.fileSize,
          });
        }
      } else if (asset.type === 'text/plain' && asset.fileSize <= 100 * 1024) {
        setFile({
          uri: asset.uri,
          type: asset.type,
          name: asset.fileName,
          size: asset.fileSize,
        });
      } else {
        Alert.alert('Error', 'Unsupported file type or size too large');
      }
    }
  });
};

import {launchImageLibrary} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {Alert} from 'react-native';

export const handleChooseFile = async (setFile: (file: any) => void) => {
  launchImageLibrary({mediaType: 'mixed'}, async response => {
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

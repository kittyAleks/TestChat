import React, {FC} from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type Form = {
  avatar: string;
  username: string;
  email: string;
  homepage: string;
  captcha: string;
  text: string;
  file?: {
    uri: string;
  };
};

type CommentPreviewModalProps = {
  visible: boolean;
  onClose: () => void;
  previewData: Form | null;
};

export const CommentPreviewModal: FC<CommentPreviewModalProps> = ({
  visible,
  onClose,
  previewData,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <Text style={modalStyles.modalText}>Preview:</Text>
          {previewData && (
            <>
              <Text>Avatar: {previewData.avatar}</Text>
              <Text>User Name: {previewData.username}</Text>
              <Text>Email: {previewData.email}</Text>
              <Text>Home Page: {previewData.homepage}</Text>
              <Text>CAPTCHA: {previewData.captcha}</Text>
              <Text>Text: {previewData.text}</Text>
              <Image
                source={{uri: previewData.file?.uri}}
                style={{width: 320, height: 240}}
              />
            </>
          )}
          <TouchableOpacity style={modalStyles.button} onPress={onClose}>
            <Text style={modalStyles.textStyle}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

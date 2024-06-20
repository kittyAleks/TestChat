// AddCommentForm.tsx
import React, {useState} from 'react';
import {useDispatch} from '../../../init';
import {View, TextInput, Button, Image, Text, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Formik, FormikHelpers} from 'formik';

import {createComment} from '../../../store/comment/commentsThunks.ts';
import {handleChooseFile} from '../../../helpers/fileHelper.ts';
import {commentValidationSchema} from '../../../helpers/validation/validationSchema.ts';
import {CommentPreviewModal} from '../../components/ModalPreview.tsx';
import {themes, useTheme} from '../../../assets/themes/ThemeContext.ts';
import {getStyles} from './style.ts';

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

const initialFormState: Form = {
  avatar: '',
  username: '',
  email: '',
  homepage: '',
  captcha: '',
  text: '',
  file: {uri: ''},
};

export const AddCommentForm = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [preview, setPreview] = useState<Form | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const {theme} = useTheme();
  const styles = getStyles(theme);

  const onSubmit = (values: Form, {resetForm}: FormikHelpers<Form>) => {
    const newComment = {
      ...values,
      createdAt: new Date().toISOString(),
    };
    dispatch(createComment(newComment));
    //@ts-ignore
    navigation.navigate('Comments');
    resetForm();
  };
  const handlePreview = (values: Form) => {
    setPreview(values);
    setModalVisible(true);
  };

  return (
    <Formik
      initialValues={initialFormState}
      validationSchema={commentValidationSchema}
      onSubmit={onSubmit}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <ScrollView style={[styles.form]}>
          <TextInput
            placeholderTextColor={theme.textColor}
            placeholder="Avatar URL"
            onChangeText={handleChange('avatar')}
            onBlur={handleBlur('avatar')}
            value={values.avatar}
            style={styles.input}
          />
          {errors.avatar && touched.avatar && (
            <Text style={styles.error}>{errors.avatar}</Text>
          )}
          <TextInput
            placeholderTextColor={theme.textColor}
            placeholder="User Name"
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
            style={styles.input}
          />
          {errors.username && touched.username && (
            <Text style={styles.error}>{errors.username}</Text>
          )}
          <TextInput
            placeholderTextColor={theme.textColor}
            placeholder="E-mail"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            style={styles.input}
          />
          {errors.email && touched.email && (
            <Text style={styles.error}>{errors.email}</Text>
          )}
          <TextInput
            placeholderTextColor={theme.textColor}
            placeholder="Home page"
            onChangeText={handleChange('homepage')}
            onBlur={handleBlur('homepage')}
            value={values.homepage}
            style={styles.input}
          />
          {errors.homepage && touched.homepage && (
            <Text style={styles.error}>{errors.homepage}</Text>
          )}
          <TextInput
            placeholderTextColor={theme.textColor}
            placeholder="CAPTCHA"
            onChangeText={handleChange('captcha')}
            onBlur={handleBlur('captcha')}
            value={values.captcha}
            style={styles.input}
          />
          {errors.captcha && touched.captcha && (
            <Text style={styles.error}>{errors.captcha}</Text>
          )}
          <TextInput
            placeholderTextColor={theme.textColor}
            placeholder="Text"
            onChangeText={handleChange('text')}
            onBlur={handleBlur('text')}
            value={values.text}
            style={styles.input}
            multiline
          />
          {errors.text && touched.text && (
            <Text style={styles.error}>{errors.text}</Text>
          )}
          <View style={{marginBottom: 50}}>
            <Image
              source={{
                uri:
                  values.file?.uri ||
                  'https://m.media-amazon.com/images/S/pv-target-images/16627900db04b76fae3b64266ca161511422059cd24062fb5d900971003a0b70.jpg',
              }}
              style={{width: 320, height: 240}}
            />
            <Button
              color={theme.buttonColor}
              title="Choose File"
              onPress={() =>
                handleChooseFile(uri => setFieldValue('file', uri))
              }
            />
            <Button
              color={theme.buttonColor}
              title="Add Comment"
              onPress={handleSubmit as any}
            />
            <Button
              color={theme.buttonColor}
              title="Preview"
              onPress={() => handlePreview(values)}
            />
          </View>
          <CommentPreviewModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            previewData={preview}
          />
        </ScrollView>
      )}
    </Formik>
  );
};

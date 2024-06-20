// AddCommentForm.tsx
import React, {useState} from 'react';
import {useDispatch} from '../../../init';
import {View, TextInput, Button, Image, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from './style';
import {createComment} from '../../../store/comment/commentsThunks.ts';
import {handleChooseFile} from '../../../helpers/fileHelper.ts';
import {Formik, FormikHelpers} from 'formik';
import {commentValidationSchema} from '../../../helpers/validation/validationSchema.ts';

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
        <View style={styles.form}>
          <TextInput
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
          <Image
            source={{uri: values.file?.uri}}
            style={{width: 320, height: 240}}
          />
          <Button
            title="Choose File"
            onPress={() => handleChooseFile(uri => setFieldValue('file', uri))}
          />
          <Button title="Add Comment" onPress={handleSubmit as any} />

          {/*{preview && (*/}
          {/*  <View style={styles.preview}>*/}
          {/*    <Text>Preview:</Text>*/}
          {/*    <Text>Avatar: {preview.avatar}</Text>*/}
          {/*    <Text>User Name: {preview.username}</Text>*/}
          {/*    <Text>Email: {preview.email}</Text>*/}
          {/*    <Text>Home Page: {preview.homepage}</Text>*/}
          {/*    <Text>CAPTCHA: {preview.captcha}</Text>*/}
          {/*    <Text>Text: {preview.text}</Text>*/}
          {/*    <Image*/}
          {/*      source={{uri: preview.file?.uri}}*/}
          {/*      style={{width: 320, height: 240}}*/}
          {/*    />*/}
          {/*  </View>*/}
          {/*)}*/}
        </View>
      )}
    </Formik>
  );
};

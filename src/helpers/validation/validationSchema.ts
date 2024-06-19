import * as Yup from 'yup';

export const commentValidationSchema = Yup.object().shape({
  avatar: Yup.string().url('Avatar URL must be a valid URL').notRequired(),
  username: Yup.string().required('User Name is required'),
  email: Yup.string()
    .email('Email must be a valid email')
    .required('Email is required')
    .notRequired(),
  homepage: Yup.string().url('Home page must be a valid URL').notRequired(),
  captcha: Yup.string().required('CAPTCHA is required'),
  text: Yup.string().required('Text is required'),
  // file: Yup.object()
  //   .shape({
  //     uri: Yup.string().url('File URI must be a valid URL').notRequired(),
  //   })
  //   .notRequired(),
});

import * as Yup from 'yup';
import {parseDocument} from 'htmlparser2';

const validateXHTML = (value: any) => {
  try {
    const doc = parseDocument(value);
    return true;
  } catch (error) {
    return false;
  }
};

const allowedTags =
  /<\/?(a|code|i|strong)(\s+href="[^"]*")?(\s+title="[^"]*")?\s*>/g;

export const commentValidationSchema = Yup.object().shape({
  avatar: Yup.string().url('Avatar URL must be a valid URL').notRequired(),
  username: Yup.string().required('User Name is required'),
  email: Yup.string()
    .email('Email must be a valid email')
    .required('Email is required')
    .notRequired(),
  homepage: Yup.string().url('Home page must be a valid URL').notRequired(),
  captcha: Yup.string().required('CAPTCHA is required'),
  text: Yup.string()
    .required('Text is required')
    .test('is-valid-xhtml', 'Text contains invalid XHTML', value =>
      validateXHTML(value),
    )
    .matches(
      new RegExp(`^(${allowedTags.source}|[^<>]+)*$`),
      'Text contains invalid HTML tags',
    ),
  // file: Yup.object()
  //   .shape({
  //     uri: Yup.string().url('File URI must be a valid URL').notRequired(),
  //   })
  //   .notRequired(),
});

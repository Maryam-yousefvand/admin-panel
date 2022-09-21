import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('آدرس ایمیل معتبر نیست')
    .required('ایمیل الزامی می باشد'),

  password: Yup.string().trim().required('رمز عبور الزامی می باشد'),
})

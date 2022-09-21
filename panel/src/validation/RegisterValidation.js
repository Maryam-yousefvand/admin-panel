import * as Yup from 'yup'

export const registerSchema = Yup.object().shape({
  name: Yup.string().trim().required('نام الزامی می باشد'),
  fullname: Yup.string().trim().required('نام خانوادگی الزامی می باشد'),
  email: Yup.string().trim().email('آدرس ایمیل معتبر نیست').required('ایمیل الزامی می باشد'),

  password: Yup.string().trim().required('رمز عبور الزامی می باشد'),
  confirmPassword: Yup.string().trim().required('تکرار رمز عبور الزامی می باشد')
  .oneOf([Yup.ref('password'), null], 'رمز عبور یکسان نیست')
})

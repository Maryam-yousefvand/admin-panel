import { IconContext } from 'react-icons'
import { HiUserCircle } from 'react-icons/hi'

import { loginSchema } from '../../validation/LoginValidation'
import { login, userList } from '../../features/auth/authSlice'

import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Helmet } from 'react-helmet'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [notUser, setNotUser] = useState()

  let users = useSelector((state) => state.auth.users)

  useEffect(() => {
    dispatch(userList())
  }, [dispatch])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      const user = users.filter((u) => u.email === values.email)
      console.log(user)
      if (user.length === 0) {
        setNotUser('ایمیل شما در سیستم موجود نمی باشد')
      } else if (user.length === 1 && user[0].password !== values.password) {
        setNotUser('رمز عبور اشتباه می باشد')
      } else {
        dispatch(login({ values, navigate }))
        toast.success('با موفقیت وارد شدید', {
          style: {
            fontFamily: 'bYekan',
          },
        })
      }
    },
  })

  return (
    <div className="min-h-80 flex items-center">
      <Helmet>
        <title>پنل ادمین | ورود</title>
        <meta name="description" content="پنل ادمین | ورود" />
      </Helmet>
      <div className="w-full  flex justify-center items-center">
        <div className="shadow-md  w-96	 flex flex-col justify-center items-center">
          <div className="mb-8">
            <IconContext.Provider
              value={{
                size: '5em',
                className: ' -mt-9',
              }}
            >
              <HiUserCircle />
            </IconContext.Provider>
          </div>
          <form
            action=""
            className="w-full flex flex-col text-x-sm px-5 pb-8"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex flex-col w-full">
              <input
                className=" my-3 p-2 border-2 border-gray-100"
                placeholder="ایمیل"
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="flex justify-start text-red-500">
                  {formik.errors.email}
                </div>
              ) : null}
              <input
                className=" my-3 p-2 border-2 border-gray-100"
                placeholder="رمز عبور"
                type="text"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="flex justify-start text-red-500">
                  {formik.errors.password}
                </div>
              ) : null}

              <button
                type="submit"
                value="عضویت"
                className="btn my-4 py-2 bg-blue-600 opacity-60
                 text-white w-full text-md font-medium shadow-md rounded"
              >
                ورود
              </button>
              <div className="text-red-500 text-sm">{notUser}</div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

import React, { useEffect, useState } from 'react'
import { registerSchema } from '../../validation/RegisterValidation'
import { register, userList } from '../../features/auth/authSlice'

import { IconContext } from 'react-icons'
import { HiUserCircle } from 'react-icons/hi'

import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userExists, setUserExists] = useState()
  let users = useSelector((state) => state.auth.users)

  useEffect(() => {
    dispatch(userList())
  }, [dispatch])

  const now = new Date()
  const day = now.getDate()
  const full_year = now.getFullYear()
  const month = now.getMonth()

  const createdAt = ` ${full_year}/${day}/${month + 1} `

  const formik = useFormik({
    initialValues: {
      name: '',
      fullname: '',
      email: '',
      password: '',
      confirmPassword: '',
      createdAt: createdAt,
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      const user = users.filter((u) => u.email === values.email)
      if (user.length > 0) {
        setUserExists('ایمیل شما قبلا در سیستم ثبت شده است')
      } else {
        dispatch(register({ values, navigate }))
      }
    },
  })

  return (
    <div className="min-h-80 flex items-center">
      <Helmet>
        <title>پنل ادمین | عضویت</title>
        <meta name="description" content="پنل ادمین | عضویت" />
      </Helmet>

      <div className="w-full  flex justify-center items-center ">
        <div className="shadow-md sm:w-30m md:w-30m lg:w-30m flex flex-col justify-center items-center">
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
            <div className="flex flex-row justify-between w-full ">
              <input
                className="w-47 my-3 p-2 border-2 border-gray-100 bg-white"
                placeholder="نام"
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <input
                className="w-47  my-3 p-2 border-2 border-gray-100"
                placeholder="نام خانوادگی"
                type="text"
                name="fullname"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="flex flex-row justify-between w-full">
              {formik.touched.name && formik.errors.name ? (
                <div className="flex justify-start w-47 text-red-500">
                  {formik.errors.name}
                </div>
              ) : (
                <div className="flex justify-start w-47"></div>
              )}
              {formik.touched.fullname && formik.errors.fullname ? (
                <div className="flex flex-start w-47 text-red-500">
                  {formik.errors.fullname}
                </div>
              ) : (
                <div className="flex justify-start w-47"></div>
              )}
            </div>
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
              <input
                className=" my-3 p-2 border-2 border-gray-100"
                placeholder="تکرار رمز عبور"
                type="text"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="flex justify-start text-red-500">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
              <button
                type="submit"
                value="عضویت"
                className="btn my-4 py-2 bg-blue-600 opacity-60
                 text-white w-full text-md font-medium shadow-md rounded"
              >
                عضویت
              </button>
            </div>
            <div className="text-red-500 text-sm">{userExists}</div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register

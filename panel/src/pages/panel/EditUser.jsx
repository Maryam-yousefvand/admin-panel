import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { userList, editUser } from '../../features/auth/authSlice'

import { Helmet } from 'react-helmet'

const EditUser = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  let users = useSelector((state) => state.auth.users)

  useEffect(() => {
    dispatch(userList())
  }, [dispatch])

  if (users.length === 0 && params.id && window.location.reload) {
    window.location.replace('http://localhost:3000/dashboard/user-management')
  }

  let existingUser = users.filter((user) => user._id === params.id)
  let { name, fullname, email, _id } = existingUser[0]

  const [values, setValues] = useState({
    _id,
    name,
    fullname,
    email,
  })
  const handleEditUser = async () => {
    setValues({ _id: '', name: '', fullname: '', email: '' })
    try {
      dispatch(
        editUser({
          _id: params.id,
          name: values.name,
          fullname: values.fullname,
          email: values.email,
        }),
      )
      navigate('/dashboard/user-management')
      dispatch(userList())
    } catch (error) {}
  }

  return (
    <div className="min-h-80 bg-white m1:pl-5 pb-20">
      <Helmet>
        <title>پنل ادمین | ویرایش کاربر</title>
        <meta name="description" content="پنل ادمین | ویرایش کاربر" />
      </Helmet>
      {/* {users.length !== 0 ? (
        <> */}
      <div className="">
        <div className="flex flex-col items-start justify-center m1:pr-5 lg:pr-10 m1:pt-10 lg:pt-20">
          <div className="">
            <h1 className="text-lblue m1:text-base md:text-lg font-bold">
              مدیریت کاربران / ویرایش
            </h1>
          </div>

          <div className="m1:mt-10 lg:mt-20 m1:w-full lg:w-1/2 lg:max-w-2xl  h-full">
            <form
              className="bg-lgray m1:p-5 lg:p-10 h-full flex flex-col m1:text-xs md:text-sm"
              action=""
              onSubmit={handleEditUser}
            >
              <input
                className="shadow-sm m1:my-3 md:my-4 m1:py-3 md:py-4 pr-3"
                type="text"
                value={values.name}
                onChange={(e) => setValues({ ...values, name: e.target.value })}
              />
              <input
                className="shadow-sm m1:my-3 md:my-4 my-4 m1:py-3 md:py-4 pr-3"
                type="text"
                value={values.fullname}
                onChange={(e) =>
                  setValues({ ...values, fullname: e.target.value })
                }
              />
              <input
                className="shadow-sm m1:my-3 md:my-4 my-4 m1:py-3 md:py-4 pr-3"
                type="text"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
              <button
                className="btn flex justify-center items-center bg-lblue 
                m1:w-28 md:w-36 m1:my-6 md:my-8 m1:h-9 md:h-10
                 m1:text-base md:text-md text-white shadow-md "
                type="submit"
              >
                ویرایش
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* </>
      ) : (
       
      )} */}
    </div>
  )
}

export default EditUser

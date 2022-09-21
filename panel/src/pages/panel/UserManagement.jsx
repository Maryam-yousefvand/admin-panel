import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IconContext } from 'react-icons'
import { IoMdSettings } from 'react-icons/io'
import { Helmet } from 'react-helmet'
import { getAllUsers, userList } from '../../features/auth/authSlice'

import UserManage from '../../components/UserManage'

const UserManagement = () => {
  const dispatch = useDispatch()
  const users = useSelector(getAllUsers)

  useEffect(() => {
    dispatch(userList())
  }, [dispatch])

  return (
    <div className=" w-full bg-white h-full pb-20 m1:pl-5">
      <Helmet>
        <title>پنل ادمین | مدیریت کاربران</title>
        <meta name="description" content="پنل ادمین | مدیریت کاربران" />
      </Helmet>
      <div className="flex flex-col items-start justify-center m1:pr-5 lg:pr-10 m1:pt-10 md:pt-20">
        <div className="">
          <h1 className="text-lblue text-lg font-bold">مدیریت کاربران</h1>
        </div>

        <div className="m1:mt-10 md:mt-20 bg-lgray m1:w-full md:w-full lg:w-11/12 rounded-md ">
          {users ? (
            <>
              <ul
                className="flex flex-row items-center border-b-2 border-darkgray
               text-lblue h-16 m1:text-xs m2:text-sm  md:text-sm justify-between"
              >
                <li className="m1:w-7m md:w-7m flex justify-center">#</li>
                <li className="m1:w-24m md:w-18m flex justify-start">نام</li>
                <li className="m1:w-24m md:w-18m flex justify-start">
                  نام خانوادگی
                </li>
                <li className="md:w-28m lg:w-18m justify-start m1:hidden md:flex">
                  ایمیل
                </li>
                <li className="w-10m  justify-start m1:hidden lg:flex">
                  تاریخ عضویت
                </li>

                <li className="m1:w-24m md:w-14m flex justify-around">
                  <IconContext.Provider
                    value={{ size: '1.7em', className: '' }}
                  >
                    <IoMdSettings />
                  </IconContext.Provider>
                </li>
              </ul>

              <UserManage />
            </>
          ) : (
            <>
              <ul className="flex flex-row items-center border-b-2  text-lblue h-16 text-md justify-between">
                <li className="w-7m flex justify-center">#</li>
                <li className="w-18m flex justify-start">نام</li>
                <li className="w-18m flex justify-start">نام خانوادگی</li>
                <li className="w-24m flex justify-start">ایمیل</li>
                <li className="w-10m flex justify-start">تاریخ عضویت</li>
                <li className="w-13m flex justify-around">
                  <span>ویرایش</span>
                  <span>حذف</span>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserManagement

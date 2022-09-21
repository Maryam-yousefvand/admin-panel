import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin2Line } from 'react-icons/ri'
import { IconContext } from 'react-icons'

import {
  getAllUsers,
  userList,
  deleteUser,
} from '../../features/auth/authSlice'
import { Link } from 'react-router-dom'

const UsersList = () => {
  const dispatch = useDispatch()
  const users = useSelector(getAllUsers)

  console.log(users)

  const handleDeleteUser = async (_id) => {
    try {
      dispatch(deleteUser(_id))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    dispatch(userList())
  }, [dispatch])

  return (
    <div className="  bg-lgray h-full">
      <div className="flex flex-col items-start justify-center pr-5 pt-20">
        <div className="">
          <h1 className="text-lblue text-lg font-bold">مدیریت کاربران</h1>
        </div>

        <div className="mt-20 bg-white w-11/12 rounded-md ">
          {users ? (
            <>
              <ul className="flex flex-row items-center border-b-2  text-lblue h-16 text-md justify-between">
                <li className="w-7 flex justify-center">#</li>
                <li className="w-10 flex justify-start">نام</li>
                <li className="w-10 flex justify-start">نام خانوادگی</li>
                <li className="w-1/5 flex justify-start">ایمیل</li>
                <li className="w-1/5 flex justify-start">تاریخ عضویت</li>
                <li className="w-1/5 flex justify-start">آخرین زمان ورود</li>
                <li className="w-13 flex justify-around">
                  <span>ویرایش</span>
                  <span>حذف</span>
                </li>
              </ul>

              {users.map((user, index) => (
                <li
                  key={index}
                  className="flex flex-row items-center border-b-2 justify-start text-gray-500  h-16 text-sm"
                >
                  <div className="w-7 flex justify-center ">{index + 1}</div>
                  <div className="w-10 flex justify-start">{user.name}</div>
                  <div className="w-10 flex justify-start">{user.fullname}</div>
                  <div className="w-1/5 flex justify-start ">
                    {`...${user.email.substring(0, 20)}`}
                  </div>
                  <div className="w-1/5 flex justify-start"></div>
                  <div className="w-1/5 flex justify-start"></div>
                  <div className="w-13 flex justify-around ">
                    <Link to="/dashboard/user-management/edit-user">
                      <IconContext.Provider
                        value={{ className: 'text-lblue', size: '1.5em' }}
                      >
                        <FaRegEdit />
                      </IconContext.Provider>
                    </Link>

                    <button onClick={() => handleDeleteUser(user._id)}>
                      <IconContext.Provider
                        value={{ className: 'text-red-500', size: '1.5em' }}
                      >
                        <RiDeleteBin2Line />
                      </IconContext.Provider>
                    </button>
                  </div>
                </li>
              ))}
            </>
          ) : (
            <>
              <ul className="flex flex-row items-center border-b-2  text-lblue h-16 text-md justify-between">
                <li className="w-7 flex justify-center">#</li>
                <li className="w-10 flex justify-start">نام</li>
                <li className="w-10 flex justify-start">نام خانوادگی</li>
                <li className="w-1/5 flex justify-start">ایمیل</li>
                <li className="w-1/5 flex justify-start">تاریخ عضویت</li>
                <li className="w-1/5 flex justify-start">آخرین زمان ورود</li>
                <li className="w-13 flex justify-around">
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

export default UsersList

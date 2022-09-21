import React, { useEffect } from 'react'
import { IconContext } from 'react-icons'
import { NavLink } from 'react-router-dom'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin2Line } from 'react-icons/ri'

import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import { useDispatch, useSelector } from 'react-redux'

import { getAllUsers, userList, deleteUser } from '../features/auth/authSlice'

const UserManage = () => {
  const dispatch = useDispatch()

  const users = useSelector(getAllUsers)

  useEffect(() => {
    dispatch(userList())
  }, [dispatch])

  const handleDeleteUser = async (_id) => {
    try {
      confirmAlert({
        title: 'حذف کاربر',
        message: 'آیا از حذف کاربر اطمینان دارید',
        buttons: [
          {
            label: 'بله',
            onClick: () => dispatch(deleteUser(_id)),
          },
          {
            label: 'خیر',
            // onClick: () => alert(''),
          },
        ],
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      {users.map((data, index) => (
        <li
          key={index}
          className="flex flex-row items-center border-b-2 border-white 
                  justify-between text-gray-500  h-16 m1:text-xs m2:text-sm md:text-sm"
        >
          <div className="m1:w-7m md:w-7m flex justify-center ">
            {index + 1}
          </div>
          <div className="m1:w-24m md:w-18m flex justify-start">
            {data.name}
          </div>
          <div className="m1:w-28m md:w-18m flex justify-start">
            {data.fullname}
          </div>
          <div className="md:w-28m lg:w-18m m1:hidden md:flex justify-start ">
            <span className="lg:flex xl:hidden">{`...${data.email.substring(
              0,
              12,
            )}`}</span>
            <span className="m1:hidden xl:flex">{`...${data.email.substring(
              0,
              24,
            )}`}</span>
          </div>

          <div className="w-10m m1:hidden lg:flex justify-start ">
            {data.createdAt}
          </div>

          <div className="m1:w-24m md:w-14m flex justify-around ">
            <NavLink to={`/dashboard/user-management/edit-user/${data._id}`}>
              <IconContext.Provider
                value={{
                  className: 'text-lblue m1:text-xs',
                  size: '1.5em',
                }}
              >
                <FaRegEdit />
              </IconContext.Provider>
            </NavLink>

            <button
              style={{ fontFamily: 'bYekan' }}
              onClick={() => handleDeleteUser(data._id)}
            >
              <IconContext.Provider
                value={{
                  className: 'text-red-500  m1:text-xs',
                  size: '1.5em',
                }}
              >
                <RiDeleteBin2Line />
              </IconContext.Provider>
            </button>
          </div>
        </li>
      ))}
    </div>
  )
}

export default UserManage

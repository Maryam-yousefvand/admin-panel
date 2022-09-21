import React, { useEffect, useState } from 'react'
import { IconContext } from 'react-icons'
import { HiUserCircle } from 'react-icons/hi'
import { BiLogOut } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import { userList } from '../features/auth/authSlice'

import { logoutUser } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userList())
  }, [dispatch])

  let users = useSelector((state) => state.auth.users)
  let profile = JSON.parse(localStorage.getItem('profile'))

  let user
  let isLogin = users.isLogin

  if (profile) {
    user = users.filter((u) => u.email === profile.email)
  }
  if (isLogin) {
    user = users.filter((u) => u.email === profile.email)
  }

  if (window.location.reload && profile) {
    profile = JSON.parse(localStorage.getItem('profile'))
    user = user.filter((u) => u.email === profile.email)
  }

  const logout = () => {
    navigate('/')
    dispatch(logoutUser(null))

    toast.info('با موفقیت خارج شدید', {
      style: {
        fontFamily: 'bYekan',
      },
    })
  }

  return (
    <div className="flex">
      <nav className=" w-full h-14 bg-darkgray z-10 ">
        <ul
          className="flex h-full items-center justify-center  text-white
          m1:px-3  sm:px-7 md:px-10 lg:px-20 "
        >
          {profile && window.location.reload && user[0] ? (
            <div className="flex justify-between w-full ">
              <li className="flex items-center ">
                <div className=" m1:ml-1 ">
                  <IconContext.Provider
                    value={{
                      size: '2em',
                      className: ' ',
                    }}
                  >
                    <HiUserCircle />
                  </IconContext.Provider>
                </div>
                <Link to="/dashboard/admin">
                  <span className="px-1 m1:text-sm md:text-sm lg:text-base">
                    {user[0].name}
                  </span>
                  <span className="px-1 m1:text-xs md:text-sm lg:text-base">
                    {user[0].fullname}
                  </span>
                </Link>
              </li>
              <li className="flex justify-end m1:text-xs md:text-sm lg:text-base ">
                <button className="flex  items-center" onClick={() => logout()}>
                  <span className="pl-2">خــروج</span>
                  <IconContext.Provider
                    value={{ size: '2em', className: 'text-red-400' }}
                  >
                    <BiLogOut />
                  </IconContext.Provider>
                </button>
              </li>
            </div>
          ) : (
            <div className="flex justify-center w-full ">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? 'text-lblue text-md font-bold mx-10'
                      : 'text-white opacity-50  mx-10'
                  }
                  to="/login"
                >
                  ورود
                </NavLink>
              </li>

              <li className="">
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? 'text-lblue text-md font-bold mx-10'
                      : 'text-white opacity-50  mx-10'
                  }
                  to="/register"
                >
                  عضویت
                </NavLink>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default NavBar

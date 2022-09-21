import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { AiFillHome } from 'react-icons/ai'
import { HiUserCircle } from 'react-icons/hi'
import { Helmet } from 'react-helmet'

const Dashboard = () => {
  return (
    <div className="flex flex-row w-full min-h-80 ">
      <Helmet>
        <title>پنل ادمین | داشبورد</title>
        <meta name="description" content="پنل ادمین | داشبورد" />
      </Helmet>
      <div className="m1:w-10 md:w-32 lg:w-44 flex flex-col bg-lgray  ">
        <ul>
          <li className="m1:h-24 md:h-28 text-white flex flex-col items-center justify-center ">
            <NavLink
              to="/dashboard/admin"
              className={({ isActive }) =>
                isActive
                  ? 'flex flex-col justify-center items-center h-full w-full bg-darkgray  text-white  '
                  : 'flex flex-col justify-center items-center h-full w-full  text-darkgray'
              }
            >
              <IconContext.Provider value={{ size: '1.5em' }}>
                <AiFillHome />
              </IconContext.Provider>
              <span className="m1:hidden md:flex md:text-sm">داشبورد</span>
            </NavLink>
          </li>
          <li className="m1:h-16 md:h-20 text-white flex flex-col items-center justify-center ">
            <NavLink
              to="/dashboard/user-management"
              className={({ isActive }) =>
                isActive
                  ? 'flex flex-col justify-center items-center h-full w-full bg-darkgray  text-white  '
                  : 'flex flex-col justify-center items-center h-full w-full  text-darkgray '
              }
            >
              <IconContext.Provider value={{ size: '1.7em' }}>
                <HiUserCircle />
              </IconContext.Provider>
              <span className="m1:hidden md:flex md:text-sm">
                مدیریت کاربران
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="m1:w-full md:w-full ">
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { editUser } from '../../features/auth/authSlice'

import { getAllUsers, userList } from '../../features/auth/authSlice'

const EditUser = () => {
  const edit = useSelector((state) => state.auth.EditUser)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const users = useSelector(getAllUsers)

  const [name, setName] = useState()

  useEffect(() => {
    dispatch(userList())
  }, [dispatch])

  //   const baseUrl = window.location.href
  //   const id = baseUrl.substring(baseUrl.lastIndexOf('=') + 1)
  //   const user = users.filter((u) => u._id === id)
  //   const u = user[0]
  //   if (id && u) {
  //     console.log(u.email)
  //   }
  //   const handleSubmit = async (e) => {
  //     e.preventDefault()
  //     dispatch(editUser())
  //     navigate('/dashboard/user-management')
  //   }

  return (
    <div className="bg-lgray h-full">
      <div className="flex flex-col items-start justify-center pr-5 pt-20">
        <div className="">
          <h1 className="text-lblue text-lg font-bold">
            مدیریت کاربران / ویرایش
          </h1>
        </div>

        <div className="mt-20">
          <form action="">
            <input
              //   placeholder={u.name}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input type="submit" value="ویرایش" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditUser

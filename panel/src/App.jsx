import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Dashboard from './pages/panel/Dashboard'
import UserManagement from './pages/panel/UserManagement'
import NavBar from './components/NavBar'
import PageNotFound from './pages/PageNotFound'
import Admin from './pages/panel/Admin'
import EditUser from './pages/panel/EditUser'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { userList } from './features/auth/authSlice'

function App() {
  const dispatch = useDispatch()

  const auth = useSelector((state) => state.auth)

  // const users = useSelector((state) => state.auth.users)

  let profile = JSON.parse(localStorage.getItem('profile'))

  useEffect(() => {
    dispatch(userList())
  }, [dispatch])

  return (
    <div className="App w-full ">
      <BrowserRouter>
        <NavBar />
        <ToastContainer />
        <Routes>
          <>
            {profile && window.location.reload ? (
              <>
                <Route path="/" element={<Dashboard />}>
                  <Route path="/dashboard/admin" element={<Admin />}></Route>
                  <Route
                    path="/dashboard/user-management"
                    element={<UserManagement />}
                  ></Route>
                  <Route
                    path="/dashboard/user-management/edit-user/:id"
                    element={<EditUser />}
                  ></Route>
                </Route>
              </>
            ) : (
              <>
                <Route path="/" element={<Login />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
              </>
            )}
          </>

          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

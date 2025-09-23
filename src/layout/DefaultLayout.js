import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import useAuth from '../hooks/useAuth'
import { Navigate, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { AlertBar } from '../components/common/AlertBar';
const DefaultLayout = () => {

  const { isLogged, adminAsUser } = useAuth()
  console.log({ isLogged })

  const navigate = useNavigate()


  if (!isLogged) {
    console.log('here')
    return <Navigate to="/login" replace />
  }

  return (
    <div>

      <Toaster />
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        {
          adminAsUser && <AlertBar />
        }

        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout

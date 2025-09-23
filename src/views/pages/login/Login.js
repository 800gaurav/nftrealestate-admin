import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CImage,
  CAlert,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import useAuth from '../../../hooks/useAuth'
import banner from '../../../assets/images/testimonial-background.jpg'
import logo from '../../../assets/images/logo-high.webp'
import { FaEyeSlash, FaRegEye } from 'react-icons/fa'
import useAxios from '../../../hooks/useAxios'
import ToastNotification from '../../../components/common/Toaster'
import LoadingSpinner from '../../../components/common/LoadinSpinner'
import { ToastLiveExample } from '../../../components/CoreUiToast'
import useToastHandler from '../../../hooks/useToastHandler'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const { showToast, toastMessage, toastType, toastTrigger } = useToastHandler()

  const { isLogged, login, userRole } = useAuth()

  const { fetchData, loading } = useAxios()


  useEffect(() => {
    if (isLogged) {
      if (userRole === 'user') {

        navigate('/user/dashboard', { replace: true })

      } else {
        navigate('/dashboard', { replace: true })

      }

    }
  }, [isLogged, navigate])

  const validateForm = () => {
    if (!email || !password) {
      setError('Email and password are required')
      showToast('Email and password are required', 'error')
      return false
    }
    setError('')
    return true
  }

  const submit = async () => {
    // localStorage.setItem('secureKeytoken', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGU4MTMwNTRmMjc0NWEwYmYwODk3OCIsImlhdCI6MTc0NjQ0NDQ4NSwiZXhwIjoxNzQ3MDQ5Mjg1fQ.FhtEkWRtjA-48lI0xiYCLyOqmzWb7VBdWSjGisZAytk");
    // localStorage.setItem('SecureKeyLogged', true);
    // localStorage.setItem('secureKeyuser', JSON.stringify(user));
    // const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZGU4MTMwNTRmMjc0NWEwYmYwODk3OCIsImlhdCI6MTc0NjQ0NDQ4NSwiZXhwIjoxNzQ3MDQ5Mjg1fQ.FhtEkWRtjA-48lI0xiYCLyOqmzWb7VBdWSjGisZAytk"
    // const user = {
    // "email": "admin@gmail.com",
    // "password": "12345678"
    // }
    // login(token, user);
    if (!validateForm()) return
    try {
      const data = await fetchData({
        url: '/api/v1/admin/auth/login',
        method: 'POST',
        data: { email, password, loginType: 'admin' },
      })
      console.log(data)
      if (data?.data?.role === 'user') {
        console.log('You are not authorized to access this page.')
        showToast('You are not authorized to access this page.', 'error')

        return
      }
      if (data.success) {
        const user = {
          name: data?.data?.name,
          email: data?.data?.email,
          id: data?.data?.id,
          role:'admin'
        }
        // console.log(login)
        console.log(data.data.token)
        console.log(data.user)
        login(data.data.token, user)
      }

      setError('')
    } catch (error) {
      setError(error.error)

      console.log(error)
    }
    console.log({ email, password })
  }



  const gotoPage = () => {
    navigate('/user/auth')

  }
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)' }}
    >
      {loading && <LoadingSpinner />} {/* Show overlay spinner when loading */}
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <CCardGroup className="shadow-lg">
              <CCard
                className="p-4 text-light"
                style={{
                  backdropFilter: 'blur(15px)',
                  background: 'rgba(255, 255, 255, 0.15)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                }}
              >
                <CCardBody>
                  {/* <div className="text-center mb-3">
                    <CImage src={logo} height={50} alt="Logo" />
                  </div> */}
                  <CForm>
                    <h1 className="fw-bold text-center">Welcome Back</h1>
                    <p className="text-light text-center mb-4">
                      Log in to unlock a world of possibilities
                    </p>
                    {/* {error && <CAlert color="danger">{error}</CAlert>} */}
                    <CInputGroup className="mb-3">
                      <CInputGroupText className="bg-transparent border-light">
                        <CIcon icon={cilUser} className="text-light" />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Enter your Email"
                        autoComplete="email"
                        className="bg-transparent text-light border-light"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText className="bg-transparent border-light">
                        <CIcon icon={cilLockLocked} className="text-light" />
                      </CInputGroupText>
                      <CFormInput
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        className="bg-transparent text-light border-light"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <CInputGroupText
                        className="bg-transparent border-light"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash color="white" /> : <FaRegEye color="white" />}
                      </CInputGroupText>
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          style={{
                            backgroundColor: '#ffc107',
                            borderColor: '#ffc107',
                            color: '#1a202c',
                            transition: 'all 0.3s ease-in-out',
                          }}
                          className="w-100 fw-bold"
                          onMouseOver={(e) =>
                            (e.target.style.boxShadow = '0 0 15px rgba(255, 193, 7, 0.8)')
                          }
                          onMouseOut={(e) => (e.target.style.boxShadow = 'none')}
                          onClick={submit}
                        >
                          Sign In
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-end">
                        <CButton onClick={gotoPage} color="link" className="text-warning">
                          User Register
                        </CButton>
                      </CCol> */}
                    </CRow>
                    {/* <CRow>
                      <CCol xs={12} className="text-end">
                        <CButton color="link" className="text-warning">
                          Forgot Password?
                        </CButton>
                      </CCol>
                    </CRow> */}
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      {/* Toast Notification Component */}
      <ToastNotification message={toastMessage} type={toastType} toastId={toastTrigger} />
    </div>
  )
}

export default Login

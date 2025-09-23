import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CLink,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'

import useAxios from '../../../hooks/useAxios'
import { imageFullUrl } from '../../helper'
import ImagePreviewModal from '../../../components/common/ImageViewModal'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../../components/common/LoadinSpinner'
import useToastHandler from '../../../hooks/useToastHandler'
import useAuth from '../../../hooks/useAuth'

const SettingsTable = () => {
  const { fetchData, loading } = useAxios()
  const [settings, setSettings] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { showToast, toastMessage, toastType, toastTrigger } = useToastHandler()
  const navigate = useNavigate()
  const {login ,loginAsAdmin}=useAuth()
  
  const getuserLists = async () => {
    // setSettings(data)
    try {
      const data = await fetchData({
        url: '/api/v1/admin/user?page=1&limit=10000',
        method: 'GET',

      })
      const userdata = data?.data?.users
      console.log(data?.data?.users)
      setSettings(userdata)
    } catch (error) {


      console.log(error)
    }
  }

  useEffect(() => {
    getuserLists()
  }, [])



  const deletCustomPage = async (id) => {
    try {
      const res = await fetchData({ url: `/admin/page/${id}`, method: 'DELETE' })
      if (res.success) {
        toast.success(' Deleted Successfully')
        getuserLists()
      }
    } catch (error) {
      console.log(error)
      toast.error(error.error || 'Error Deleting Setting')
    }
  }
  const loginAsUser = async (id) => {
    try {
      const data = await fetchData({
        url: `/api/v1/admin/user/login-as-user/${id}`,
        method: "POST",
        data: {}
      })
      console.log(data)
      if (data.success) {
        console.log(data)
      
        loginAsAdmin(data.data.token, data.data)
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <CCard className="mb-4">
      {loading && <LoadingSpinner />}
      <CCardBody>
        <CRow className="mb-3">
          <CCol sm={6}>
            <h4 className="card-title mb-0">Member Lists</h4>
          </CCol>

        </CRow>
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead className="text-nowrap">
            <CTableRow>
              <CTableHeaderCell className="bg-body-tertiary text-center">S.No.</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">Name</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">Email</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">Phone</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">Referral Code</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">Level</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">Wallet Balance</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">Total Earnings</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">Total Withdrawn</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">Status</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">Login</CTableHeaderCell>

            </CTableRow>
          </CTableHead>
          <CTableBody>
            {settings.length > 0 ? (
              settings.map((item, key) => (
                <CTableRow key={item._id}>
                  <CTableDataCell className="text-center">{key + 1}</CTableDataCell>
                  <CTableDataCell className="text-center">{item?.name}</CTableDataCell>
                  <CTableDataCell className="text-center">{item?.email}</CTableDataCell>
                  <CTableDataCell className="text-center">{item?.phone}</CTableDataCell>
                  <CTableDataCell className="text-center">{item?.referralCode}</CTableDataCell>
                  <CTableDataCell className="text-center">{item?.binaryLevel}</CTableDataCell>
                  <CTableDataCell className="text-center">{item?.walletBalance}</CTableDataCell>
                  <CTableDataCell className="text-center">{item?.totalEarnings}</CTableDataCell>
                  <CTableDataCell className="text-center">{item?.totalWithdrawn}</CTableDataCell>
                  <CTableDataCell className="text-center">{item?.isActive}</CTableDataCell>

                  <CTableDataCell className="text-center">
                    <CButton
                    disabled={item?.role === 'admin'}
                      color="primary"
                      className="text-white"
                      size="sm"
                      onClick={() => loginAsUser(item._id)}
                    >
                      Login
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))
            ) : (
              <CTableRow>
                <CTableDataCell colSpan="7" className="text-center">
                  No Custom Page Found
                </CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>
      </CCardBody>

      {/* Image Preview Modal */}
      <ImagePreviewModal
        imageUrl={selectedImage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </CCard>
  )
}

export default SettingsTable

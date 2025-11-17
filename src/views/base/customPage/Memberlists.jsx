import React, { useEffect, useState } from 'react'
import {
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
  CFormSelect,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'

import useAxios, { loginAsUserUrl } from '../../../hooks/useAxios'
import ImagePreviewModal from '../../../components/common/ImageViewModal'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../../components/common/LoadinSpinner'


const SettingsTable = () => {
  const { fetchData, loading } = useAxios()
  const [settings, setSettings] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [filterText, setFilterText] = useState('')
  const itemsPerPage = 10

  // const { loginAsAdmin } = useAuth()
  const navigate = useNavigate()

  const getUserLists = async () => {
    try {
      const data = await fetchData({
        url: '/api/v1/admin/user/activeusers',
        method: 'GET',
      })
      const users = data?.users || []
      setSettings(users)
    } catch (error) {
      toast.error('Failed to fetch users')
    }
  }

  useEffect(() => {
    getUserLists()
  }, [])

  const loginAsUser = async (id, userId) => {
    try {
      const data = await fetchData({
        url: `/api/v1/admin/user/login-as-user/${id}`,
        method: 'get',
      })
      if (data.success) {
        console.log(data.data)
        console.log(userId)
        const token = data?.data;
          const redirectUrl = `${loginAsUserUrl}/login?userId=${userId}&token=${token}`;
        window.open(redirectUrl, "_blank");
        console.log(redirectUrl)

        // window.location.href = redirectUrl;

      }
    } catch (error) {
      toast.error('Login as user failed')
      console.log(error)
    }
  }

  const Suspendeduser = async (userId) => {
    try {
      const res = await fetchData({
        url: `/api/v1/admin/user/unblockuser/${userId}`,
        method: 'PATCH',
        data: { status: true },
      });

      if (res?.message) {
        toast.success('User suspended successfully');
        getUserLists();
      }
    } catch (error) {
      toast.error('Failed to sespended user');
      console.log(error)
    }
  };

  const handleupdatestatus = async (e, userId) => {
    const newstatus = e.target.value
    const res = await fetchData({
      url: `/api/v1/admin/user/update-Roistatus/${userId}`,
      method: 'PUT',
      data: { roistatus: newstatus },
    });

    if (res?.success) {
      toast.success(`ROI ${newstatus === 'true' ? 'stopped' : 'started'} successfully`)
      getUserLists()
    }

  }


  const filteredSettings = settings.filter(
    (user) =>
      user.name?.toLowerCase().includes(filterText.toLowerCase()) ||
      user.email?.toLowerCase().includes(filterText.toLowerCase()) ||
      user.phone?.toString().includes(filterText) ||
      user.userId?.toString().includes(filterText)
  )

  const totalPages = Math.ceil(filteredSettings.length / itemsPerPage)
  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentItems = filteredSettings.slice(indexOfFirst, indexOfLast)

  const PaginationControls = () => {
    const visiblePages = 5
    const pages = []

    if (totalPages <= visiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }

    return (
      <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
        <div>
          Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredSettings.length)} of{' '}
          {settings.length} users
        </div>
        <div className="d-flex gap-1 flex-wrap">
          {pages.map((p, index) =>
            p === '...' ? (
              <CButton key={`ellipsis-${index}`} disabled color="light" size="sm">
                ...
              </CButton>
            ) : (
              <CButton
                key={p}
                size="sm"
                color={p === currentPage ? 'dark' : 'light'}
                onClick={() => setCurrentPage(p)}
              >
                {p}
              </CButton>
            )
          )}
        </div>
      </div>
    )
  }
  return (
    <CCard className="mb-4">
      {loading && <LoadingSpinner />}
      <CCardBody>
        <CRow className="mb-3">
          <CCol sm={6}>
            <h4 className="card-title mb-0">All Active Users</h4>
          </CCol>
          <CCol sm={6} className="text-end">
            <input
              type="text"
              placeholder="Search by Name, Email or Phone"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="form-control w-50 d-inline-block"
            />
          </CCol>
        </CRow>

        {/* Top Pagination */}
        {/* <PaginationControls /> */}

        <div className="table-responsive">
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                <CTableHeaderCell className="text-center">S.No.</CTableHeaderCell>
                <CTableHeaderCell className="text-center">UserId (Name)</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Email</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Phone</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Main-Wallet</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Earning</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Sponsor</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Date</CTableHeaderCell>
                <CTableHeaderCell className="text-center">ROI-Status</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Login</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentItems.length > 0 ? (
                currentItems.map((user, key) => {

                  const date = new Date(user.createdAt)
                  return (
                    <CTableRow key={user._id}>
                      <CTableDataCell className="text-center">{indexOfFirst + key + 1}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        {user?.userId} ({user?.name})
                      </CTableDataCell>
                      <CTableDataCell className="text-center">{user?.email}</CTableDataCell>
                      <CTableDataCell className="text-center">{user?.phone}</CTableDataCell>
                      <CTableDataCell className="text-center">${Number(user?.walletBalance).toFixed(2) || 0}</CTableDataCell>
                      <CTableDataCell className="text-center">{Number(user?.totalProfitEarned).toFixed(2) || 0}</CTableDataCell>
                      <CTableDataCell className="text-center">{user?.sponsor}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        {date.toLocaleDateString()} <br />
                        <small className="text-muted">{date.toLocaleTimeString()}</small>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CFormSelect

                          value={user.stopROIIncome?.toString()}
                          onChange={(e) => handleupdatestatus(e, user.userId)}
                          className={user.stopROIIncome?.toString() === 'true' ? 'bg-danger text-white' : 'bg-success text-white'}
                          options={[
                            { label: 'Start', value: 'false' },
                            { label: 'Stop', value: 'true' },
                          ]}
                        />
                      </CTableDataCell>
                      <CTableDataCell className="text-center d-flex justify-content-center gap-2 flex-wrap">
                        <CButton
                          color="info"
                          size="sm"
                          title="Edit"
                          disabled={user?.role === 'admin'}
                           onClick={() => navigate(`/user/update/${user.userId}`, { state: { user, isActivated: true } })}
                        >
                          ✎
                        </CButton>
                        <CButton
                          color="danger"
                          size="sm"
                          title="Suspend"
                          disabled={user?.role === 'admin'}
                          onClick={() => Suspendeduser(user.userId)}

                        >
                          Suspend
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CButton
                          disabled={user?.role === 'admin'}
                          color="primary"
                          size="sm"
                          onClick={() => loginAsUser(user._id, user.userId)}
                        >
                          Login
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })
              ) : (
                <CTableRow>
                  <CTableDataCell colSpan="10" className="text-center">
                    No users found
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        </div>

        {/* Bottom Pagination */}
        <PaginationControls />
      </CCardBody>

      {/* Image Modal if needed later */}
      <ImagePreviewModal
        imageUrl={selectedImage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </CCard>
  )
}

export default SettingsTable

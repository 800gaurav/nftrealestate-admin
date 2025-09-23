import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormInput,
  CPagination,
  CPaginationItem,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CSpinner
} from '@coreui/react'
import useAxios from '../hooks/useAxios'

const AllUsers = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [userdata, setUserdata] = useState([])
  const { fetchData, loading } = useAxios()
  const itemsPerPage = 10

  const getUserLists = async () => {
    try {
      const data = await fetchData({
        url: '/api/v1/admin/user?page=1&limit=100000',
        method: 'GET'
      })
      const users = data?.data?.users || []
      setUserdata(users)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getUserLists()
  }, [])

  const filteredUsers = userdata.filter((user) => {
    const name = user?.name || ''
    const userId = user?.userId || ''
    const email = user?.email || ''
    const phone = user?.phone ? user.phone.toString() : ''
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phone.includes(searchTerm)
    )
  })

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const renderPagination = () => {
    const pages = []
    const visiblePages = 5

    if (totalPages <= visiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }

    return pages.map((page, index) => (
      <CPaginationItem
        key={index}
        active={page === currentPage}
        disabled={page === '...'}
        onClick={() => typeof page === 'number' && setCurrentPage(page)}
        style={{ cursor: page === '...' ? 'default' : 'pointer' }}
      >
        {page}
      </CPaginationItem>
    ))
  }

  return (
    <CCard className="mb-4">
      <CCardBody>
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormInput
              type="text"
              placeholder="Search by username, email or mobile"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
            />
          </CCol>
        </CRow>

        {loading ? (
          <div className="text-center py-5">
            <CSpinner color="primary" />
          </div>
        ) : (
          <>
            <CTable striped bordered hover responsive>
              <CTableHead color="primary">
                <CTableRow>
                  <CTableHeaderCell>Sr. No</CTableHeaderCell>
                  <CTableHeaderCell>UserId</CTableHeaderCell>
                  <CTableHeaderCell>Username</CTableHeaderCell>
                  <CTableHeaderCell>Email</CTableHeaderCell>
                  <CTableHeaderCell>Mobile No</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {paginatedUsers.map((user, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell>
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </CTableDataCell>
                    <CTableDataCell>{user.userId}</CTableDataCell>
                    <CTableDataCell>{user.name}</CTableDataCell>
                    <CTableDataCell>{user.email}</CTableDataCell>
                    <CTableDataCell>{user.phone}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            <CPagination align="center" className="mt-3 flex-wrap">
              {renderPagination()}
            </CPagination>
          </>
        )}
      </CCardBody>
    </CCard>
  )
}

export default AllUsers

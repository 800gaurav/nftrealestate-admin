import React, { useEffect, useState } from 'react'
import {
  CRow, CCol, CFormInput, CFormSelect, CButton,
  CTable, CTableHead, CTableBody, CTableRow,
  CTableHeaderCell, CTableDataCell, CBadge,
} from '@coreui/react'
import toast from 'react-hot-toast'
import useAxios from '../hooks/useAxios'
import LoadingSpinner from '../components/common/LoadinSpinner'

const statusColor = (s) => {
  if (s === 'success') return 'success'
  if (s === 'pending') return 'warning'
  if (s === 'paying')  return 'info'
  return 'danger'
}

const InvestHistory = () => {
  const { fetchData, loading } = useAxios()
  const [investments, setInvestments] = useState([])
  const [filtered, setFiltered]       = useState([])
  const [filters, setFilters]         = useState({ username: '', status: '', from: '', to: '' })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const fetchInvestments = async () => {
    try {
      const res = await fetchData({ url: '/api/v1/admin/user/invest-history' })
      if (res?.data) {
        setInvestments(res.data)
        setFiltered(res.data)
      } else {
        toast.error('No investment history found')
      }
    } catch {
      toast.error('Failed to fetch investment history')
    }
  }

  useEffect(() => { fetchInvestments() }, [])

  const handleSearch = () => {
    let list = [...investments]
    if (filters.username)
      list = list.filter(i => i.userName?.toLowerCase().includes(filters.username.toLowerCase()) || i.userId?.toLowerCase().includes(filters.username.toLowerCase()))
    if (filters.status)
      list = list.filter(i => i.status === filters.status)
    if (filters.from)
      list = list.filter(i => new Date(i.purchasedAt) >= new Date(filters.from))
    if (filters.to)
      list = list.filter(i => new Date(i.purchasedAt) <= new Date(filters.to))
    setFiltered(list)
    setCurrentPage(1)
  }

  const handleReset = () => {
    setFilters({ username: '', status: '', from: '', to: '' })
    setFiltered(investments)
    setCurrentPage(1)
  }

  const indexOfLast  = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentItems = filtered.slice(indexOfFirst, indexOfLast)
  const totalPages   = Math.ceil(filtered.length / itemsPerPage)

  return (
    <>
      {loading && <LoadingSpinner />}

      <h5 className="mb-3 fw-bold">Investment / Package Payment History</h5>

      <CRow className="mb-3 g-2">
        <CCol md={3}>
          <CFormInput
            label="Name / User ID"
            placeholder="Search..."
            value={filters.username}
            onChange={e => setFilters({ ...filters, username: e.target.value })}
          />
        </CCol>
        <CCol md={2}>
          <CFormSelect
            label="Status"
            value={filters.status}
            onChange={e => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="paying">Paying</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
          </CFormSelect>
        </CCol>
        <CCol md={2}>
          <CFormInput type="date" label="From" value={filters.from} onChange={e => setFilters({ ...filters, from: e.target.value })} />
        </CCol>
        <CCol md={2}>
          <CFormInput type="date" label="To" value={filters.to} onChange={e => setFilters({ ...filters, to: e.target.value })} />
        </CCol>
        <CCol md={3} className="d-flex align-items-end gap-2">
          <CButton color="primary" onClick={handleSearch}>Search</CButton>
          <CButton color="secondary" onClick={handleReset}>Reset</CButton>
          <CButton color="success" variant="outline" onClick={fetchInvestments}>↻</CButton>
        </CCol>
      </CRow>

      <div className="table-responsive">
        <CTable hover bordered responsive className="text-nowrap align-middle">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>User</CTableHeaderCell>
              <CTableHeaderCell>Package</CTableHeaderCell>
              <CTableHeaderCell>Amount</CTableHeaderCell>
              <CTableHeaderCell>Staking (40%)</CTableHeaderCell>
              <CTableHeaderCell>Order ID</CTableHeaderCell>
              <CTableHeaderCell>Network</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Date</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentItems.length === 0 ? (
              <CTableRow>
                <CTableDataCell colSpan={9} className="text-center text-medium-emphasis py-4">
                  No records found
                </CTableDataCell>
              </CTableRow>
            ) : currentItems.map((inv, idx) => (
              <CTableRow key={idx}>
                <CTableDataCell>{indexOfFirst + idx + 1}</CTableDataCell>
                <CTableDataCell>
                  <div className="fw-semibold">{inv.userName}</div>
                  <small className="text-medium-emphasis">{inv.userId}</small>
                </CTableDataCell>
                <CTableDataCell>
                  <div>{inv.packageTitle}</div>
                  <small className="text-medium-emphasis">{inv.packageCode}</small>
                </CTableDataCell>
                <CTableDataCell className="fw-bold">${inv.amount}</CTableDataCell>
                <CTableDataCell>${inv.stakingAmount}</CTableDataCell>
                <CTableDataCell><small>{inv.orderId}</small></CTableDataCell>
                <CTableDataCell>{inv.network || '—'}</CTableDataCell>
                <CTableDataCell>
                  <CBadge color={statusColor(inv.status)}>{inv.status}</CBadge>
                </CTableDataCell>
                <CTableDataCell>
                  {new Date(inv.purchasedAt).toLocaleDateString()}{' '}
                  <small className="text-medium-emphasis">{new Date(inv.purchasedAt).toLocaleTimeString()}</small>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <small className="text-medium-emphasis">
          Showing {filtered.length === 0 ? 0 : indexOfFirst + 1}–{Math.min(indexOfLast, filtered.length)} of {filtered.length}
        </small>
        <div>
          {Array.from({ length: totalPages }, (_, i) => (
            <CButton key={i} size="sm" color={i + 1 === currentPage ? 'primary' : 'light'} className="me-1" onClick={() => setCurrentPage(i + 1)}>
              {i + 1}
            </CButton>
          ))}
        </div>
      </div>
    </>
  )
}

export default InvestHistory

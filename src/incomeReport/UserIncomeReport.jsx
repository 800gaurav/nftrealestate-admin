import React, { useEffect, useState } from 'react'
import {
  CRow, CCol, CFormInput, CButton,
  CTable, CTableHead, CTableBody, CTableRow,
  CTableHeaderCell, CTableDataCell, CSpinner, CBadge
} from '@coreui/react'
import toast from 'react-hot-toast'
import useAxios from '../hooks/useAxios'

const fmt = (n) => `$${Number(n || 0).toFixed(2)}`

export default function UserIncomeReport() {
  const { fetchData, loading } = useAxios()
  const [report, setReport] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')

  const fetch = async (pg = 1, q = '') => {
    try {
      const res = await fetchData({
        url: `/api/v1/admin/incomehistory/user-income-report?page=${pg}&limit=20&search=${q}`
      })
      if (res?.data) {
        setReport(res.data.report || [])
        setTotal(res.data.total || 0)
        setPages(res.data.pages || 1)
        setPage(pg)
      }
    } catch {
      toast.error('Failed to fetch income report')
    }
  }

  useEffect(() => { fetch(1, '') }, [])

  const handleSearch = () => { setSearch(searchInput); fetch(1, searchInput) }
  const handleReset = () => { setSearchInput(''); setSearch(''); fetch(1, '') }

  return (
    <div>
      <h5 className="mb-3 fw-bold">User Income Report</h5>

      <CRow className="mb-3 align-items-end">
        <CCol md={4}>
          <CFormInput
            placeholder="Search by User ID or Name"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
        </CCol>
        <CCol md={3} className="d-flex gap-2">
          <CButton color="primary" onClick={handleSearch}>Search</CButton>
          <CButton color="secondary" onClick={handleReset}>Reset</CButton>
        </CCol>
        <CCol md={5} className="text-end text-muted small">
          Total Users: <strong>{total}</strong>
        </CCol>
      </CRow>

      {loading ? (
        <div className="text-center py-5"><CSpinner color="primary" /></div>
      ) : (
        <>
          <div className="table-responsive">
            <CTable hover bordered small className="text-nowrap align-middle">
              <CTableHead color="dark">
                <CTableRow>
                  <CTableHeaderCell>#</CTableHeaderCell>
                  <CTableHeaderCell>User ID</CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Invested</CTableHeaderCell>
                  <CTableHeaderCell>Staking</CTableHeaderCell>
                  <CTableHeaderCell>Sponsor</CTableHeaderCell>
                  <CTableHeaderCell>Matching</CTableHeaderCell>
                  <CTableHeaderCell>Total Income</CTableHeaderCell>
                  <CTableHeaderCell>Wallet Bal</CTableHeaderCell>
                  <CTableHeaderCell>Today Income</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {report.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan={11} className="text-center text-muted py-4">
                      No records found
                    </CTableDataCell>
                  </CTableRow>
                ) : report.map((u, i) => (
                  <CTableRow key={u.userId}>
                    <CTableDataCell>{(page - 1) * 20 + i + 1}</CTableDataCell>
                    <CTableDataCell className="fw-semibold">{u.userId}</CTableDataCell>
                    <CTableDataCell>{u.name}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={u.isActivated ? 'success' : 'warning'}>
                        {u.isActivated ? 'Active' : 'Inactive'}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>{fmt(u.totalInvested)}</CTableDataCell>
                    <CTableDataCell className="text-success">{fmt(u.stakingIncome)}</CTableDataCell>
                    <CTableDataCell className="text-primary">{fmt(u.sponsorIncome)}</CTableDataCell>
                    <CTableDataCell className="text-warning">{fmt(u.matchingIncome)}</CTableDataCell>
                    <CTableDataCell className="fw-bold">{fmt(u.totalIncome)}</CTableDataCell>
                    <CTableDataCell>{fmt(u.walletBalance)}</CTableDataCell>
                    <CTableDataCell className="text-warning">{fmt(u.todayIncome)}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="text-muted small">Page {page} of {pages}</span>
            <div className="d-flex gap-1">
              <CButton size="sm" color="light" disabled={page <= 1} onClick={() => fetch(page - 1, search)}>Prev</CButton>
              {Array.from({ length: Math.min(pages, 7) }, (_, i) => {
                const p = page <= 4 ? i + 1 : page - 3 + i
                if (p < 1 || p > pages) return null
                return (
                  <CButton key={p} size="sm" color={p === page ? 'dark' : 'light'} onClick={() => fetch(p, search)}>{p}</CButton>
                )
              })}
              <CButton size="sm" color="light" disabled={page >= pages} onClick={() => fetch(page + 1, search)}>Next</CButton>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CButton,
  CCol,
  CFormInput,
  CFormSelect,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import toast from 'react-hot-toast'
import useAxios from '../hooks/useAxios'

const fmt = (n) => `$${Number(n || 0).toFixed(2)}`
const fmtDate = (d) => d ? new Date(d).toLocaleString('en-IN') : '-'

const typeMeta = {
  staking: { label: 'Staking Income', color: 'success' },
  sponsor: { label: 'Sponsor Income', color: 'primary' },
  matching: { label: 'Binary Income', color: 'warning' },
  teamBusiness: { label: 'Team Business Income', color: 'info' },
}

export default function IncomeHistoryReport() {
  const { fetchData, loading } = useAxios()
  const [report, setReport] = useState([])
  const [totals, setTotals] = useState({})
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [total, setTotal] = useState(0)
  const [filters, setFilters] = useState({ search: '', type: '', from: '', to: '' })

  const fetchReport = async (pg = 1, nextFilters = filters) => {
    try {
      const params = new URLSearchParams({
        page: String(pg),
        limit: '50',
        search: nextFilters.search || '',
        type: nextFilters.type || '',
        from: nextFilters.from || '',
        to: nextFilters.to || '',
      })
      const res = await fetchData({ url: `/api/v1/admin/incomehistory/income-history-report?${params.toString()}` })
      if (res?.data) {
        setReport(res.data.report || [])
        setTotals(res.data.totals || {})
        setTotal(res.data.total || 0)
        setPages(res.data.pages || 1)
        setPage(pg)
      }
    } catch {
      toast.error('Failed to fetch income history')
    }
  }

  useEffect(() => {
    fetchReport(1)
  }, [])

  const updateFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }))
  const applyFilters = () => fetchReport(1, filters)
  const resetFilters = () => {
    const empty = { search: '', type: '', from: '', to: '' }
    setFilters(empty)
    fetchReport(1, empty)
  }

  return (
    <div>
      <h5 className="mb-3 fw-bold">Date-wise Income History</h5>

      <CRow className="g-2 mb-3 align-items-end">
        <CCol md={3}>
          <CFormInput
            label="User ID / Name"
            placeholder="Search user"
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
          />
        </CCol>
        <CCol md={2}>
          <CFormSelect label="Income Type" value={filters.type} onChange={(e) => updateFilter('type', e.target.value)}>
            <option value="">All</option>
            <option value="staking">Staking</option>
            <option value="sponsor">Sponsor</option>
            <option value="matching">Binary</option>
            <option value="teamBusiness">Team Business</option>
          </CFormSelect>
        </CCol>
        <CCol md={2}>
          <CFormInput type="date" label="From" value={filters.from} onChange={(e) => updateFilter('from', e.target.value)} />
        </CCol>
        <CCol md={2}>
          <CFormInput type="date" label="To" value={filters.to} onChange={(e) => updateFilter('to', e.target.value)} />
        </CCol>
        <CCol md={3} className="d-flex gap-2">
          <CButton color="primary" onClick={applyFilters}>Search</CButton>
          <CButton color="secondary" onClick={resetFilters}>Reset</CButton>
        </CCol>
      </CRow>

      <CRow className="g-2 mb-3">
        {[
          ['All', totals.all],
          ['Staking', totals.staking],
          ['Sponsor', totals.sponsor],
          ['Binary', totals.matching],
          ['Team Business', totals.teamBusiness],
        ].map(([label, value]) => (
          <CCol md={2} key={label}>
            <div className="border rounded p-2 bg-light">
              <div className="text-muted small">{label}</div>
              <div className="fw-bold">{fmt(value)}</div>
            </div>
          </CCol>
        ))}
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
                  <CTableHeaderCell>Date</CTableHeaderCell>
                  <CTableHeaderCell>User ID</CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>Type</CTableHeaderCell>
                  <CTableHeaderCell>From</CTableHeaderCell>
                  <CTableHeaderCell>Business</CTableHeaderCell>
                  <CTableHeaderCell>Amount</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {report.length === 0 ? (
                  <CTableRow>
                    <CTableDataCell colSpan={8} className="text-center text-muted py-4">No records found</CTableDataCell>
                  </CTableRow>
                ) : report.map((row, index) => {
                  const meta = typeMeta[row.type] || { label: row.label || row.type, color: 'secondary' }
                  return (
                    <CTableRow key={`${row.userId}-${row.type}-${row.date}-${index}`}>
                      <CTableDataCell>{(page - 1) * 50 + index + 1}</CTableDataCell>
                      <CTableDataCell>{fmtDate(row.date)}</CTableDataCell>
                      <CTableDataCell className="fw-semibold">{row.userId}</CTableDataCell>
                      <CTableDataCell>{row.name}</CTableDataCell>
                      <CTableDataCell><CBadge color={meta.color}>{meta.label}</CBadge></CTableDataCell>
                      <CTableDataCell>
                        {row.referredBy ? `${row.fromUser || '-'} via ${row.referredBy}` : (row.fromUser || '-')}
                      </CTableDataCell>
                      <CTableDataCell>{row.baseAmount ? fmt(row.baseAmount) : '-'}</CTableDataCell>
                      <CTableDataCell className="fw-bold">{fmt(row.amount)}</CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="text-muted small">Showing {report.length} of {total} records. Page {page} of {pages}</span>
            <div className="d-flex gap-1">
              <CButton size="sm" color="light" disabled={page <= 1} onClick={() => fetchReport(page - 1)}>Prev</CButton>
              <CButton size="sm" color="light" disabled={page >= pages} onClick={() => fetchReport(page + 1)}>Next</CButton>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

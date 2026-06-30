import React, { useEffect, useState } from 'react'
import {
  CBadge, CButton, CCard, CCardBody, CCol, CFormInput,
  CRow, CSpinner, CTable, CTableBody, CTableDataCell,
  CTableHead, CTableHeaderCell, CTableRow
} from '@coreui/react'
import toast from 'react-hot-toast'
import useAxios from '../hooks/useAxios'

const fmt = (n) => `$${Number(n || 0).toLocaleString('en-US')}`

export default function RankRewardReport() {
  const { fetchData, loading } = useAxios()
  const [ranks, setRanks] = useState([])
  const [rankPlan, setRankPlan] = useState([])
  const [search, setSearch] = useState('')
  const [selectedRank, setSelectedRank] = useState('ALL')

  const fetchRanks = async () => {
    try {
      const res = await fetchData({ url: '/api/v1/admin/incomehistory/user-ranks' })
      setRanks(res?.data?.ranks || [])
      setRankPlan(res?.data?.rankPlan || [])
    } catch {
      toast.error('Failed to fetch rank rewards')
    }
  }

  useEffect(() => { fetchRanks() }, [])

  const filtered = ranks.filter((item) => {
    const q = search.trim().toLowerCase()
    const matchSearch = !q || [item.userId, item.name, item.rank].some((value) => String(value || '').toLowerCase().includes(q))
    const matchRank = selectedRank === 'ALL' || item.rank === selectedRank
    return matchSearch && matchRank
  })

  return (
    <div>
      <h5 className="mb-3 fw-bold">Rank Rewards</h5>

      <CCard className="mb-3">
        <CCardBody>
          <CTable bordered small responsive className="mb-0 align-middle">
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell>Rank</CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Team Business</CTableHeaderCell>
                <CTableHeaderCell>Reward</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {rankPlan.map((rank) => (
                <CTableRow key={rank.rank}>
                  <CTableDataCell>{rank.level}</CTableDataCell>
                  <CTableDataCell className="fw-semibold">{rank.rank}</CTableDataCell>
                  <CTableDataCell>{fmt(rank.business)}</CTableDataCell>
                  <CTableDataCell>{rank.reward}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      <CRow className="mb-3 align-items-end g-2">
        <CCol md={3}>
          <label className="form-label small fw-semibold mb-1">Filter by Rank</label>
          <select
            className="form-select form-select-sm"
            value={selectedRank}
            onChange={(e) => setSelectedRank(e.target.value)}
          >
            <option value="ALL">All Ranks</option>
            {rankPlan.map((r) => (
              <option key={r.rank} value={r.rank}>{r.rank}</option>
            ))}
          </select>
        </CCol>
        <CCol md={4}>
          <label className="form-label small fw-semibold mb-1">Search</label>
          <CFormInput
            placeholder="Search user ID, name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </CCol>
        <CCol md={2}>
          <label className="form-label small fw-semibold mb-1 d-block">&nbsp;</label>
          <CButton color="primary" size="sm" onClick={fetchRanks}>Refresh</CButton>
        </CCol>
        <CCol md={3} className="text-end text-muted small">
          <label className="form-label small fw-semibold mb-1 d-block">&nbsp;</label>
          Users: <strong>{filtered.length}</strong>
          {selectedRank !== 'ALL' && <span className="ms-2 badge bg-success">{selectedRank}</span>}
        </CCol>
      </CRow>

      {loading ? (
        <div className="text-center py-5"><CSpinner color="primary" /></div>
      ) : (
        <div className="table-responsive">
          <CTable hover bordered small className="text-nowrap align-middle">
            <CTableHead color="dark">
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>User ID</CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Team Business</CTableHeaderCell>
                <CTableHeaderCell>Rank</CTableHeaderCell>
                <CTableHeaderCell>Reward</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filtered.length === 0 ? (
                <CTableRow>
                  <CTableDataCell colSpan={6} className="text-center text-muted py-4">
                    No rank users found
                  </CTableDataCell>
                </CTableRow>
              ) : filtered.map((user, index) => (
                <CTableRow key={user.userId}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell className="fw-semibold">{user.userId}</CTableDataCell>
                  <CTableDataCell>{user.name}</CTableDataCell>
                  <CTableDataCell>{fmt(user.teamBusiness)}</CTableDataCell>
                  <CTableDataCell>
                    <CBadge color={user.rank === '-' ? 'secondary' : 'success'}>{user.rank}</CBadge>
                  </CTableDataCell>
                  <CTableDataCell>{user.reward}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </div>
      )}
    </div>
  )
}

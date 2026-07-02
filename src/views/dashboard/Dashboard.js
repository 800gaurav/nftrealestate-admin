import React, { useEffect, useState } from 'react'
import { CRow, CCol, CCard, CCardBody, CSpinner } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import useAxios from '../../hooks/useAxios'
import toast from 'react-hot-toast'

const fmt = (n) =>
  `$${Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [jobRunning, setJobRunning] = useState(false)
  const { fetchData } = useAxios()
  const navigate = useNavigate()

  const load = async () => {
    try {
      const res = await fetchData({ url: '/api/v1/admin/user/admin-dashboard', method: 'GET' })
      setData(res?.data)
    } catch (e) {
      console.error(e)
    }
  }

  const runIncomeJob = async () => {
    if (jobRunning) return
    if (!window.confirm('Are you sure? This will calculate staking + binary income for ALL users right now (same as nightly cron job).')) return
    setJobRunning(true)
    try {
      const res = await fetchData({ url: '/api/v1/admin/user/run-income-job', method: 'POST' })
      toast.success(res?.message || 'Income job completed successfully!')
      await load()
    } catch (e) {
      toast.error(e?.message || 'Income job failed')
    } finally {
      setJobRunning(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const d = data || {}
  const totalIncome =
    (d.totalStakingIncome || 0) +
    (d.totalSponsorIncome || 0) +
    (d.totalMatchingIncome || 0) +
    (d.totalRankRewardIncome || 0)

  const userCards = [
    { label: 'Total Users',    value: d.totalUsers || 0,         color: 'var(--cui-primary)',  icon: '👥' },
    { label: 'Active Users',   value: d.totalActiveUsers || 0,   color: 'var(--cui-success)',  icon: '✅' },
    { label: 'Inactive Users', value: d.totalInactiveUsers || 0, color: 'var(--cui-warning)',  icon: '⏳' },
    { label: 'Blocked Users',  value: d.totalBlockedUsers || 0,  color: 'var(--cui-danger)',   icon: '🚫' },
    { label: 'Today Joined',   value: d.todayJoinedUsers || 0,   color: 'var(--cui-info)',     icon: '🆕' },
  ]

  const walletCards = [
    { label: 'Total Wallet Balance', value: fmt(d.totalWalletBalance), color: 'var(--cui-success)', icon: '💰', sub: "Users' withdrawable balance" },
    { label: 'Total Invested',       value: fmt(d.totalInvested),       color: 'var(--cui-primary)', icon: '📦', sub: 'All package investments'    },
    { label: 'Pending Withdrawals',  value: d.pendingWithdrawals || 0,  color: 'var(--cui-warning)', icon: '⏰', sub: 'Awaiting admin approval'    },
    { label: 'Total Withdrawn',      value: fmt(d.totalWithdrawn),      color: 'var(--cui-danger)',  icon: '💸', sub: 'Approved payouts (net)'     },
  ]

  const incomeItems = [
    { label: 'Staking Income',  value: d.totalStakingIncome || 0,    color: 'var(--cui-info)'    },
    { label: 'Sponsor Income',  value: d.totalSponsorIncome || 0,    color: 'var(--cui-warning)' },
    { label: 'Matching Income', value: d.totalMatchingIncome || 0,   color: 'var(--cui-primary)' },
    // { label: 'Rank Reward',     value: d.totalRankRewardIncome || 0, color: 'var(--cui-success)' },
  ]

  const cardRoutes = {
    'Total Users': '/users-allusers',
    'Active Users': '/active-users',
    'Inactive Users': '/pending/users',
    'Blocked Users': '/suspended/users',
    'Today Joined': '/users-allusers',
    'Total Wallet Balance': '/user-income-report',
    'Total Invested': '/invest-history',
    'Pending Withdrawals': '/main-pending-withdrawals',
    'Total Withdrawn': '/success-withdrawals',
    'Staking Income': '/income-history-report',
    'Sponsor Income': '/income-history-report',
    'Matching Income': '/income-history-report',
  }

  const openCard = (label) => {
    const route = cardRoutes[label]
    if (route) navigate(route)
  }

  return (
    <div className="p-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h4 className="fw-bold mb-0">Admin Dashboard</h4>
          <small className="text-medium-emphasis">Platform Overview</small>
        </div>
        <button onClick={load} className="btn btn-outline-secondary btn-sm">↻ Refresh</button>
        <button
          onClick={runIncomeJob}
          disabled={jobRunning}
          className="btn btn-warning btn-sm d-flex align-items-center gap-2"
          title="Manually trigger staking + binary pair income calculation (same as nightly cron)"
        >
          {jobRunning ? <CSpinner size="sm" /> : '⚡'}
          {jobRunning ? 'Running...' : 'Run Income Job'}
        </button>
      </div>

      {/* User Stats */}
      <p className="text-uppercase fw-bold small text-medium-emphasis mb-2" style={{ letterSpacing: '1px' }}>
        User Statistics
      </p>
    <CRow xs={{ cols: 2 }} sm={{ cols: 2 }} md={{ cols: 3 }} lg={{ cols: 5 }} className="g-3 mb-4">
  {userCards.map((c, i) => (
    <CCol key={i}>
      <CCard className="h-100 border-0 shadow-sm" role="button" onClick={() => openCard(c.label)} style={{ cursor: 'pointer' }}>
        <CCardBody className="p-3">
          <div className="fs-4 mb-2">{c.icon}</div>
          <div className="fw-bold fs-4" style={{ color: c.color }}>
            {c.value}
          </div>
          <div className="text-medium-emphasis small mt-1">
            {c.label}
          </div>
          <div
            className="mt-2"
            style={{
              height: 3,
              background: c.color,
              borderRadius: 4,
              opacity: 0.4,
            }}
          />
        </CCardBody>
      </CCard>
    </CCol>
  ))}
</CRow>

      {/* Finance Overview */}
      <p className="text-uppercase fw-bold small text-medium-emphasis mb-2" style={{ letterSpacing: '1px' }}>
        Finance Overview
      </p>
      <CRow className="mb-4 g-3">
        {walletCards.map((c, i) => (
          <CCol xs={12} sm={6} lg={3} key={i}>
            <CCard className="h-100 border-0 shadow-sm" role="button" onClick={() => openCard(c.label)} style={{ cursor: 'pointer' }}>
              <CCardBody className="p-3">
                <div style={{ height: 3, background: c.color, borderRadius: 4, marginBottom: 12 }} />
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="fs-5">{c.icon}</span>
                  <span className="text-medium-emphasis small">{c.label}</span>
                </div>
                <div className="fw-bold fs-4" style={{ color: c.color }}>{c.value}</div>
                <div className="text-medium-emphasis small mt-1">{c.sub}</div>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>

      {/* Total Income Banner */}
      <CCard className="border-0 shadow-sm mb-4" style={{ background: 'var(--cui-primary)', color: 'white' }}>
        <CCardBody className="p-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div>
              <p className="mb-1 small" style={{ opacity: 0.8 }}>Total Platform Income Distributed</p>
              <p className="fw-bold mb-1" style={{ fontSize: 32 }}>{fmt(totalIncome)}</p>
              <small style={{ opacity: 0.6 }}>Staking + Sponsor + Matching + Rank combined</small>
            </div>
            <div className="d-flex gap-4 flex-wrap">
              {incomeItems.map(item => (
                <div key={item.label} className="text-center">
                  <p className="mb-0 small" style={{ opacity: 0.7 }}>{item.label}</p>
                  <p className="fw-bold mb-0 fs-6">
                    {totalIncome > 0 ? ((item.value / totalIncome) * 100).toFixed(1) : 0}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CCardBody>
      </CCard>

      {/* Income Breakdown */}
      <p className="text-uppercase fw-bold small text-medium-emphasis mb-2" style={{ letterSpacing: '1px' }}>
        Income Breakdown
      </p>
      <CRow className="g-3">
        {incomeItems.map((item, i) => {
          const pct = totalIncome > 0 ? +((item.value / totalIncome) * 100).toFixed(1) : 0
          return (
            <CCol xs={6} sm={3} key={i}>
              <CCard className="h-100 border-0 shadow-sm" role="button" onClick={() => openCard(item.label)} style={{ cursor: 'pointer' }}>
                <CCardBody className="p-3">
                  <div style={{ height: 3, background: item.color, borderRadius: 4, marginBottom: 12 }} />
                  <p className="text-medium-emphasis small mb-1">{item.label}</p>
                  <p className="fw-bold fs-5 mb-1" style={{ color: item.color }}>{fmt(item.value)}</p>
                  <div style={{ background: 'var(--cui-border-color)', borderRadius: 4, height: 4, overflow: 'hidden', marginBottom: 4 }}>
                    <div style={{ width: `${Math.min(pct, 100)}%`, height: '100%', background: item.color, transition: 'width 0.5s' }} />
                  </div>
                  <small className="text-medium-emphasis">{pct}% of total</small>
                </CCardBody>
              </CCard>
            </CCol>
          )
        })}
      </CRow>

    </div>
  )
}

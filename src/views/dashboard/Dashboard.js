import React, { useEffect, useState } from 'react'
import { CRow, CCol } from '@coreui/react'
import useAxios from '../../hooks/useAxios'

const fmt = (n) => `$${Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const S = {
  page:    { padding: '24px', background: '#0b1120', minHeight: '100vh', color: '#fff', fontFamily: 'inherit' },
  label:   { fontSize: '10px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#475569', marginBottom: '10px', marginTop: '8px' },
  card:    (accent) => ({ background: '#131c2e', borderRadius: '14px', padding: '18px 20px', borderLeft: `4px solid ${accent}`, height: '100%' }),
  cardTop: (accent) => ({ background: '#131c2e', borderRadius: '14px', padding: '20px', borderTop: `3px solid ${accent}` }),
  num:     (color) => ({ fontSize: '28px', fontWeight: 800, color: color || '#fff', margin: 0 }),
  sub:     { fontSize: '12px', color: '#64748b', marginTop: '4px' },
  badge:   (c) => ({ display: 'inline-block', background: c + '22', color: c, borderRadius: '6px', padding: '2px 8px', fontSize: '11px', fontWeight: 700 }),
  bar:     (w, c) => ({ width: `${Math.min(w, 100)}%`, height: '4px', background: c, borderRadius: '4px', transition: 'width 0.5s ease' }),
  barWrap: { marginTop: '8px', background: '#0f172a', borderRadius: '4px', height: '4px', overflow: 'hidden' },
  banner:  { background: 'linear-gradient(135deg, #0f3460 0%, #1a1a4e 100%)', borderRadius: '16px', padding: '24px 28px', marginBottom: '4px', border: '1px solid #1e3a8a' },
  btn:     { background: '#1e293b', border: '1px solid #334155', color: '#94a3b8', padding: '8px 18px', borderRadius: '10px', cursor: 'pointer', fontSize: '13px' },
  head:    { margin: 0, fontSize: '22px', fontWeight: 800, color: '#fff' },
  headSub: { margin: '3px 0 0', color: '#64748b', fontSize: '12px' },
}

export default function Dashboard() {
  const [data, setData] = useState(null)
  const { fetchData } = useAxios()

  const load = async () => {
    try {
      const res = await fetchData({ url: '/api/v1/admin/user/admin-dashboard', method: 'GET' })
      setData(res?.data)
    } catch (e) { console.error(e) }
  }

  useEffect(() => { load() }, [])

  const d = data || {}
  const totalIncome = (d.totalStakingIncome || 0) + (d.totalSponsorIncome || 0) + (d.totalMatchingIncome || 0) + (d.totalRankRewardIncome || 0)

  const userCards = [
    { label: 'Total Users',    value: d.totalUsers || 0,        color: '#6c5ce7', icon: '👥' },
    { label: 'Active Users',   value: d.totalActiveUsers || 0,  color: '#00b894', icon: '✅' },
    { label: 'Inactive Users', value: d.totalInactiveUsers || 0,color: '#e17055', icon: '⏳' },
    { label: 'Blocked Users',  value: d.totalBlockedUsers || 0, color: '#d63031', icon: '🚫' },
    { label: 'Today Joined',   value: d.todayJoinedUsers || 0,  color: '#0984e3', icon: '🆕' },
  ]

  const walletCards = [
    { label: 'Total Wallet Balance',  value: fmt(d.totalWalletBalance),  color: '#00b894', icon: '💰', sub: 'Users\' withdrawable balance' },
    { label: 'Total Invested',        value: fmt(d.totalInvested),        color: '#6c5ce7', icon: '📦', sub: 'All package investments' },
    { label: 'Pending Withdrawals',   value: d.pendingWithdrawals || 0,   color: '#fdcb6e', icon: '⏰', sub: 'Awaiting admin approval' },
    { label: 'Total Withdrawn',       value: fmt(d.totalWithdrawn),       color: '#e17055', icon: '💸', sub: 'Approved payouts (net)' },
  ]

  const incomeItems = [
    { label: 'Staking Income',  value: d.totalStakingIncome || 0,   color: '#00cec9' },
    { label: 'Sponsor Income',  value: d.totalSponsorIncome || 0,   color: '#f39c12' },
    { label: 'Matching Income', value: d.totalMatchingIncome || 0,  color: '#6c5ce7' },
    { label: 'Rank Reward',     value: d.totalRankRewardIncome || 0,color: '#fdcb6e' },
  ]

  return (
    <div style={S.page}>

      {/* Header */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={S.head}>Admin Dashboard</h2>
          <p style={S.headSub}>NFT RealEstate U.S. — Platform Overview</p>
        </div>
        <button onClick={load} style={S.btn}>↻ Refresh</button>
      </div>

      {/* User Stats */}
      <p style={S.label}>User Statistics</p>
      <CRow className="mb-4">
        {userCards.map((c, i) => (
          <CCol xs={6} sm={4} lg={2} key={i} className="mb-3">
            <div style={S.card(c.color)}>
              <div style={{ fontSize: '22px', marginBottom: '8px' }}>{c.icon}</div>
              <div style={S.num(c.color)}>{c.value}</div>
              <div style={S.sub}>{c.label}</div>
            </div>
          </CCol>
        ))}
      </CRow>

      {/* Wallet / Finance */}
      <p style={S.label}>Finance Overview</p>
      <CRow className="mb-4">
        {walletCards.map((c, i) => (
          <CCol xs={12} sm={6} lg={3} key={i} className="mb-3">
            <div style={S.cardTop(c.color)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '22px' }}>{c.icon}</span>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>{c.label}</span>
              </div>
              <div style={{ fontSize: '26px', fontWeight: 800, color: c.color }}>{c.value}</div>
              <div style={S.sub}>{c.sub}</div>
            </div>
          </CCol>
        ))}
      </CRow>

      {/* Total Income Banner */}
      <div style={{ ...S.banner, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <div>
          <p style={{ margin: 0, color: '#93c5fd', fontSize: '13px' }}>Total Platform Income Distributed</p>
          <p style={{ margin: '4px 0 0', fontSize: '34px', fontWeight: 900, color: '#fff' }}>{fmt(totalIncome)}</p>
          <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#64748b' }}>Staking + Sponsor + Matching + Rank combined</p>
        </div>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {incomeItems.map(item => (
            <div key={item.label} style={{ textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: '10px', color: '#94a3b8' }}>{item.label}</p>
              <p style={{ margin: '3px 0 0', fontSize: '14px', fontWeight: 700, color: item.color }}>
                {totalIncome > 0 ? ((item.value / totalIncome) * 100).toFixed(1) : 0}%
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Income Breakdown */}
      <p style={S.label}>Income Breakdown</p>
      <CRow className="mb-2">
        {incomeItems.map((item, i) => {
          const pct = totalIncome > 0 ? +((item.value / totalIncome) * 100).toFixed(1) : 0
          return (
            <CCol xs={6} sm={3} key={i} className="mb-3">
              <div style={S.cardTop(item.color)}>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '12px' }}>{item.label}</p>
                <p style={{ margin: '6px 0 0', fontSize: '22px', fontWeight: 800, color: item.color }}>{fmt(item.value)}</p>
                <div style={S.barWrap}><div style={S.bar(pct, item.color)} /></div>
                <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#475569' }}>{pct}% of total</p>
              </div>
            </CCol>
          )
        })}
      </CRow>

    </div>
  )
}

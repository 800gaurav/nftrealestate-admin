import React, { useEffect, useState } from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import useAxios from '../hooks/useAxios'

const emptyIncomePlan = {
  staking: { name: 'Staking Income', note: 'Daily staking income comes from each package Staking Income %.' },
  joining: { name: 'Joining Staking Income', percentOfJoiningAmount: 40 },
  sponsor: { name: 'Sponsor / Referral Income', percent: 10 },
  teamGrowth: { name: 'Team Growth Bonus', percent: 1, requiredDirects: 10 },
  matching: { name: 'Matching Income', percent: 10, firstRatio: '2:1', nextRatio: '1:1', dailyCap: 50, hundredDollarIdDailyCap: 100 },
  withdrawal: { minAmount: 5, adminCharge: 10, onePendingAtATime: true },
}

const toNumber = (value) => {
  const next = Number(value)
  return Number.isNaN(next) ? 0 : next
}

const PlansManager = () => {
  const { fetchData } = useAxios()
  const [plans, setPlans] = useState([])
  const [incomePlan, setIncomePlan] = useState(emptyIncomePlan)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  const loadPlans = async () => {
    try {
      setLoading(true)
      setMessage(null)
      const res = await fetchData({ url: '/api/v1/admin/user/get-plans', method: 'GET' })
      setPlans(res?.data?.plans || [])
      setIncomePlan({ ...emptyIncomePlan, ...(res?.data?.incomePlan || {}) })
    } catch (error) {
      setMessage({ type: 'danger', text: error?.message || 'Failed to load plans' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPlans()
  }, [])

  const updatePlan = (index, field, value) => {
    setPlans((prev) =>
      prev.map((plan, planIndex) =>
        planIndex === index
          ? {
              ...plan,
              [field]: field === 'price' || field === 'dailyPercent' ? toNumber(value) : value,
            }
          : plan,
      ),
    )
  }

  const updateFeatures = (index, value) => {
    const features = value
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean)
    updatePlan(index, 'features', features)
  }

  const updateIncome = (section, field, value, numeric = true) => {
    setIncomePlan((prev) => ({
      ...prev,
      [section]: {
        ...(prev?.[section] || {}),
        [field]: numeric ? toNumber(value) : value,
      },
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setSaving(true)
      setMessage(null)
      const normalizedPlans = plans.map((plan) => ({
        ...plan,
        price: toNumber(plan.price),
        dailyPercent: toNumber(plan.dailyPercent),
        referral: plan.referral || `${incomePlan?.sponsor?.percent || 0}%`,
        features: Array.isArray(plan.features) ? plan.features : [],
      }))

      await fetchData({
        url: '/api/v1/admin/user/update-plans',
        method: 'PUT',
        data: { plans: normalizedPlans, incomePlan },
      })
      setPlans(normalizedPlans)
      setMessage({ type: 'success', text: 'Plans updated successfully' })
    } catch (error) {
      setMessage({ type: 'danger', text: error?.message || 'Failed to update plans' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <CSpinner />
      </div>
    )
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Plans Manager</strong>
      </CCardHeader>
      <CCardBody>
        {message && (
          <CAlert color={message.type} dismissible onClose={() => setMessage(null)}>
            {message.text}
          </CAlert>
        )}

        <form onSubmit={handleSubmit}>
          <CTable align="middle" className="mb-4 border" hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Code</CTableHeaderCell>
                <CTableHeaderCell>Rank</CTableHeaderCell>
                <CTableHeaderCell>Title</CTableHeaderCell>
                <CTableHeaderCell>Price ($)</CTableHeaderCell>
                <CTableHeaderCell>Staking Income % (daily)</CTableHeaderCell>
                <CTableHeaderCell>Badge</CTableHeaderCell>
                <CTableHeaderCell style={{ minWidth: 260 }}>Features</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {plans.map((plan, index) => (
                <CTableRow key={plan.code || index}>
                  <CTableDataCell>
                    <CFormInput value={plan.code || ''} onChange={(e) => updatePlan(index, 'code', e.target.value)} />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput value={plan.rank || ''} onChange={(e) => updatePlan(index, 'rank', e.target.value)} />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput value={plan.title || ''} onChange={(e) => updatePlan(index, 'title', e.target.value)} />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput type="number" value={plan.price || 0} onChange={(e) => updatePlan(index, 'price', e.target.value)} />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="number"
                      step="0.01"
                      min="0"
                      max="100"
                      value={plan.dailyPercent || 0}
                      onChange={(e) => updatePlan(index, 'dailyPercent', e.target.value)}
                      placeholder="e.g. 0.5 or 1"
                    />
                    <small className="text-muted">e.g. 0.5 = 0.5% daily</small>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput value={plan.badge || ''} onChange={(e) => updatePlan(index, 'badge', e.target.value || null)} />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormTextarea
                      rows={4}
                      value={(plan.features || []).join('\n')}
                      onChange={(e) => updateFeatures(index, e.target.value)}
                    />
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>

          <CCard className="mb-4">
            <CCardHeader>
              <strong>Income Settings</strong>
            </CCardHeader>
            <CCardBody>
              <CRow className="g-3">
                <CCol md={3}>
                  <CFormLabel>Sponsor Direct %</CFormLabel>
                  <CFormInput
                    type="number"
                    step="0.01"
                    value={incomePlan?.sponsor?.percent || 0}
                    onChange={(e) => updateIncome('sponsor', 'percent', e.target.value)}
                  />
                </CCol>
                <CCol md={3}>
                  <CFormLabel>Joining Staking %</CFormLabel>
                  <CFormInput
                    type="number"
                    step="0.01"
                    value={incomePlan?.joining?.percentOfJoiningAmount || 0}
                    onChange={(e) => updateIncome('joining', 'percentOfJoiningAmount', e.target.value)}
                  />
                </CCol>
                <CCol md={3}>
                  <CFormLabel>Matching %</CFormLabel>
                  <CFormInput
                    type="number"
                    step="0.01"
                    value={incomePlan?.matching?.percent || 0}
                    onChange={(e) => updateIncome('matching', 'percent', e.target.value)}
                  />
                </CCol>
                <CCol md={3}>
                  <CFormLabel>Matching Daily Cap</CFormLabel>
                  <CFormInput
                    type="number"
                    step="0.01"
                    value={incomePlan?.matching?.dailyCap || 0}
                    onChange={(e) => updateIncome('matching', 'dailyCap', e.target.value)}
                  />
                </CCol>
                <CCol md={3}>
                  <CFormLabel>$100 ID Daily Cap</CFormLabel>
                  <CFormInput
                    type="number"
                    step="0.01"
                    value={incomePlan?.matching?.hundredDollarIdDailyCap || 0}
                    onChange={(e) => updateIncome('matching', 'hundredDollarIdDailyCap', e.target.value)}
                  />
                </CCol>
                <CCol md={3}>
                  <CFormLabel>Withdrawal Charge %</CFormLabel>
                  <CFormInput
                    type="number"
                    step="0.01"
                    value={incomePlan?.withdrawal?.adminCharge || 0}
                    onChange={(e) => updateIncome('withdrawal', 'adminCharge', e.target.value)}
                  />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>

          <div className="d-flex gap-2">
            <CButton color="primary" type="submit" disabled={saving}>
              {saving ? <CSpinner size="sm" /> : 'Update Plans'}
            </CButton>
            <CButton color="secondary" variant="outline" type="button" onClick={loadPlans} disabled={saving}>
              Reload
            </CButton>
          </div>
        </form>
      </CCardBody>
    </CCard>
  )
}

export default PlansManager

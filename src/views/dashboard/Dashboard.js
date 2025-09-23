import React, { useEffect, useState } from 'react'
import { CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilUser,
  cilCheck,
  cilBolt,
  cilMoney,
  cilWallet,
  cilBank,
} from "@coreui/icons";
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const { logout, user } = useAuth()
  const { fetchData } = useAxios()




  // Fetch dashboard data
  const getDashboardDetails = async () => {
    try {
      const res = await fetchData({
        url: '/api/v1/admin/user/admin-dashboard',
        method: 'GET',
      })
      setDashboardData(res?.data)
    } catch (error) {
      console.error('Dashboard fetch error:', error)
    }
  }

  useEffect(() => {
    getDashboardDetails()
  }, [])

  // Cards with dynamic data and gradient colors
  const statusCards = [
    { label: "Total Users", value: dashboardData?.totalUsers || 0, icon: cilUser, color: 'linear-gradient(135deg, #58188b 0%, #302c85 50%, #20388e 100%)' },
    { label: "Total Active Users", value: dashboardData?.totalActiveUsers || 0, icon: cilUser, color: 'linear-gradient(135deg, #00b894 0%, #00a085 100%)' },
    { label: "Total Pending Users", value: dashboardData?.totalInactiveUsers || 0, icon: cilCheck, color: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)' },
    { label: "Total Suspended Users", value: dashboardData?.totalBlockedUsers || 0, icon: cilBolt, color: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)' },
    { label: "Today Joining", value: dashboardData?.todayJoinedUsers || 0, icon: cilUser, color: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)' },
    { label: "Total Fund Wallet", value: Number(dashboardData?.totalFundWalletBalance).toFixed(2) || 0, icon: cilWallet, color: 'linear-gradient(135deg, #fab1a0 0%, #e17055 100%)' },
    { label: "Total Main Balance", value: Number(dashboardData?.totalWalletBalance).toFixed(2) || 0, icon: cilWallet, color: 'linear-gradient(135deg, #55efc4 0%, #00b894 100%)' },
    { label: "Total ROI Income", value: Number(dashboardData?.totalRoiIncome).toFixed(2) || 0, icon: cilMoney, color: 'linear-gradient(135deg, #81ecec 0%, #00cec9 100%)' },
    { label: "Total Direct Income", value: Number(dashboardData?.totalProBonusIncome).toFixed(2) || 0, icon: cilBank, color: 'linear-gradient(135deg, #fdcb6e 0%, #f39c12 100%)' },
    { label: "Total Level Income", value: Number(dashboardData?.totalDomesticIncome).toFixed(2) || 0, icon: cilMoney, color: 'linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%)' },
    { label: "Total Reward Income", value: Number(dashboardData?.totalRoyaltyIncome).toFixed(2) || 0, icon: cilMoney, color: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)' },
    { label: "Pending Withdrawals", value: Number(dashboardData?.totalpendingwithdrawals) || 0, icon: cilMoney, color: 'linear-gradient(135deg, #dfe6e9 0%, #b2bec3 100%)' },
    { label: "Added By Admin/History", value: dashboardData?.totaladdedByAdmin || 0, icon: cilMoney, color: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)' },
  ];

  return (
    <div className="dashboard-container">
      {/* <div className="dashboard-header mb-4">
        <h1>Investment Dashboard</h1>
        <p>Overview of your team performance and earnings</p>
      </div> */}

      <CRow>
        {statusCards.map((card, index) => (
          <CCol xs={12} sm={6} md={4} lg={3} key={index} className="mb-4">
            <div 
              className="stats-card text-white d-flex flex-column justify-content-between p-3"
              style={{ background: card.color, borderRadius: '8px', minHeight: '130px' }}
            >
              <div className="card-icon mb-2">
                <CIcon icon={card.icon} height={24} />
              </div>
              <div className="card-content">
                <div className="card-value h5 mb-1">{card.value}</div>
                <div className="card-label">{card.label}</div>
              </div>
              <div className="card-footer mt-2">
                <span style={{ fontSize: '0.85rem' }}>View Details</span>
              </div>
            </div>
          </CCol>
        ))}
      </CRow>
    </div>
  )
}

export default Dashboard

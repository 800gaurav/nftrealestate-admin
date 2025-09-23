
import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilUser,
  cilCheck,
  cilBolt,
  cilMoney,
  cilWallet,
  cilBank,
} from "@coreui/icons";
import { CCol, CRow, CWidgetStatsC } from '@coreui/react'
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';


const Dashboard = () => {
const [dashboardData, setDashboardData] = useState(null);
console.log(dashboardData)
const { logout , user} = useAuth()
console.log(user)


  const { fetchData, loading } = useAxios();
useEffect(()=>{
  if(user.email !== "admin.nftstoke@gmail.com"){
    logout()
  }
  },[])
  const getDashboardDetails = async () => {
    try {
      const res = await fetchData({
        url: '/api/v1/admin/user/admin-dashboard',
        method: 'GET',
      });
      setDashboardData(res?.data);
    } catch (error) {
      console.error('Dashboard fetch error:', error);
    }
  };

  useEffect(() => {
    getDashboardDetails();
  }, []);




 const statusCards = [
    { label: "Total Users", value: dashboardData?.totalUsers || 0, icon: cilUser },
    { label: "Total Active Users", value: dashboardData?.totalActiveUsers || 0, icon: cilUser },
    { label: "Total Pending Users", value: dashboardData?.totalInactiveUsers || 0, icon: cilCheck },
    { label: "Total Suspended Users", value: dashboardData?.totalBlockedUsers || 0, icon: cilBolt },
    { label: "Today Joining", value: dashboardData?.todayJoinedUsers || 0, icon: cilUser },
    { label: "Total Fund Wallet", value: Number(dashboardData?.totalFundWalletBalance).toFixed(2) || 0, icon: cilWallet },
    { label: "Total Main Balance", value: Number(dashboardData?.totalWalletBalance).toFixed(2) || 0, icon: cilWallet },
    { label: "Total ROI Income", value: Number(dashboardData?.totalRoiIncome).toFixed(2) || 0, icon: cilMoney },
    { label: "Total Direct Income", value: Number(dashboardData?.totalProBonusIncome).toFixed(2) || 0, icon: cilBank },
    { label: "Total Level Income", value: Number(dashboardData?.totalDomesticIncome).toFixed(2) || 0, icon: cilMoney },
    { label: "Total Reward Income", value: Number(dashboardData?.totalRoyaltyIncome).toFixed(2) || 0, icon: cilMoney },
    { label: "Pending Withdrawals", value: Number(dashboardData?.totalpendingwithdrawals) || 0, icon: cilMoney }, // Static or update if API provides
    { label: "Added By Admin/History", value: dashboardData?.totaladdedByAdmin || 0, icon: cilMoney },
  ];


  return (
 

    <CRow>
      {statusCards.map((card, index) => (
        <CCol xs={6} sm={6} md={4} lg={3} key={index} className="mb-4">
          <div className="h-100 d-flex flex-column" style={{ backgroundColor: '#8674a6', borderRadius: '8px' }}>
            <CWidgetStatsC
              className="flex-grow-1 text-white"
              icon={<CIcon icon={card.icon} height={20} />}
              color="transparent"
              inverse
              title={card.label}
              value={card.value}
            />
          </div>
        </CCol>
      ))}
    </CRow>


    
  );
};

export default Dashboard;






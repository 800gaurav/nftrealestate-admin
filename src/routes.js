import React from 'react'
import MemberDownline from './views/pages/member/MemberDownline'
import RaiseTicket from './components/user/Support/RaiseTicket'
import TicketStatus from './components/user/Support/TicketStatus'
import UpdateTicket from './views/pages/admin/Support/UpdateTicket'
import TicketAllStatus from './views/pages/admin/Support/TicketAllStatus'
import UpdateTicketStatus from './views/pages/admin/Support/UpdateTicketStatus'
import PlanActivation from './components/user/Activation/PlanActivation'
import allusers from './users/allusers'
import uploadnft from './uploadnft'
import directIncomeReport from './incomeReport/directIncomeReport'
import roiReport from './incomeReport/roiReport'
import rewardReport from './incomeReport/rewardReport'
import levelReport from './incomeReport/levelReport'
import InvestHistory from './Invest/InvestHistory'
import SuspendedUsers from './views/pages/member/SuspendedUsers'
import InvalidWithdrawals from './Withdrawals/InvalidWithdrawals'
import SuccessWithdrawals from './Withdrawals/SuccessWithdrawals'
import PendingWithdrawals from './Withdrawals/PendingWithdrawals'
import DesopitReport from './Withdrawals/DesopitReport'
import Addedbyadmin from './admin/Addedbyadmin'
import TransferHistory from './admin/TransferHistory'
import Updateuser from './admin/Updateuser'
import Shownftbyprice from './admin/Shownftbyprice'
import levelUsers from './incomeReport/levelusers'
import UserAlertMessage from './admin/UserAlertMessage'
import PendingUsersWithFilter from './components/common/Table/DynamicTable'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const CustomPage = React.lazy(() => import('./views/base/customPage/Memberlists'))
const CreateCustomPage = React.lazy(() => import('./views/base/customPage/CreateCustomPage'))
const EditCustomPage = React.lazy(() => import('./views/base/customPage/EditCustomPage'))
const SitePage = React.lazy(() => import('./components/SitePage'))
const Images = React.lazy(() => import('./components/Images'))
const TreeView = React.lazy(() => import('./components/treeView/index'))

// ---------------------------------------user--------------------------------------------------
const UserDashboard = React.lazy(() => import('./components/user/Dashboard'))
const UserProfile = React.lazy(() => import('./components/user/Profile'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users-allusers', name: 'All Users', element:  allusers},
  { path: '/add/nft', name: 'Upload', element:  uploadnft},
  { path: '/direct-income-report', name: 'Direct Income Report', element:  directIncomeReport},
  { path: '/roi-income-report', name: 'Roi Income Report', element:  roiReport},
  { path: '/level-income-report', name: 'level Income Report', element:  levelReport},
  { path: '/reward-income-report', name: 'Reward Income Report', element:  rewardReport},
  { path: '/deposit-report', name: 'Deposit Report', element:  DesopitReport},
  { path: '/admin-referals', name: 'Added By Admin/History', element:  Addedbyadmin},
  { path: '/user-alert', name: 'Added By Admin/History', element:  UserAlertMessage},
  { path: '/transfer-report', name: 'Transfer Report', element:  TransferHistory},

  // Invest
 { path: '/invest-history', name: 'Invest History', element:  InvestHistory},
// withdrawals
 { path: '/main-pending-withdrawals', name: 'pending-withdrawals', element: PendingWithdrawals },
 { path: '/invalis-withdrawals', name: 'Invalid-withdrawals', element:  InvalidWithdrawals},
 { path: '/success-withdrawals', name: 'Success-withdrawals', element:  SuccessWithdrawals},
  { path: '/images', name: 'Images', element: Images },
  { path: '/active-users', exact: true, name: 'All Active users', element: CustomPage },
  { path: '/pending/users', name: 'Pending Users', element: PendingUsersWithFilter },
  { path: '/suspended/users', name: 'Suspended Users', element: SuspendedUsers},
  { path: '/custom-page/create', name: 'CreateProfile', element: CreateCustomPage },
  { path: '/custom-page/update', name: 'Update', element: EditCustomPage },
  { path: '/site-tabs/:name/:id', name: 'Site Tabs', element: SitePage },
  { path: '/site-tabs/:name/:id/:subId', name: 'Site Tabs', element: SitePage },
  
  { path: '/tree', name: 'Tree View', element: TreeView },
  // { path: '/admin/update-raise-ticket', name: 'Profile', element: UpdateTicket },
  { path: '/admin/all-ticket-status', name: 'Profile', element: TicketAllStatus },
  { path: '/admin/all-ticket-status/:userticketID', name: 'Profile', element: UpdateTicketStatus },


  // ---------------------------user Routes------------------------------------
  { path: '/user/dashBoard', name: 'Dashboard', element: UserDashboard },
  { path: '/user/profile', name: 'Profile', element: UserProfile },
  { path: '/user/raise-ticket', name: 'Profile', element: RaiseTicket },
  { path: '/user/ticket-status', name: 'Profile', element: TicketStatus },
  { path: '/user/activation', name: 'Profile', element: PlanActivation },
  { path: '/user/update/:userId', name: 'Profile', element: Updateuser },
  { path: '/user/price-wise-nft/:price', name: 'Nft', element: Shownftbyprice },
  { path: '/level-users/:level', name: 'Nft', element: levelUsers },

]

export default routes

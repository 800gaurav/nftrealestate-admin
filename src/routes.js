import React from 'react'
import RaiseTicket from './components/user/Support/RaiseTicket'
import TicketStatus from './components/user/Support/TicketStatus'
import TicketAllStatus from './views/pages/admin/Support/TicketAllStatus'
import UpdateTicketStatus from './views/pages/admin/Support/UpdateTicketStatus'
import PlanActivation from './components/user/Activation/PlanActivation'
import allusers from './users/allusers'
import uploadnft from './uploadnft'
import directIncomeReport from './incomeReport/directIncomeReport'
import InvestHistory from './Invest/InvestHistory'
import SuspendedUsers from './views/pages/member/SuspendedUsers'
import InvalidWithdrawals from './Withdrawals/InvalidWithdrawals'
import SuccessWithdrawals from './Withdrawals/SuccessWithdrawals'
import PendingWithdrawals from './Withdrawals/PendingWithdrawals'
import Addedbyadmin from './admin/Addedbyadmin'
import Updateuser from './admin/Updateuser'
import Shownftbyprice from './admin/Shownftbyprice'
import levelUsers from './incomeReport/levelusers'
import UserAlertMessage from './admin/UserAlertMessage'
import PendingUsersWithFilter from './components/common/Table/DynamicTable'
import UserIncomeReport from './incomeReport/UserIncomeReport'
import PlansManager from './admin/PlansManager'
import RankRewardReport from './incomeReport/RankRewardReport'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const CustomPage = React.lazy(() => import('./views/base/customPage/Memberlists'))
const CreateCustomPage = React.lazy(() => import('./views/base/customPage/CreateCustomPage'))
const EditCustomPage = React.lazy(() => import('./views/base/customPage/EditCustomPage'))
const SitePage = React.lazy(() => import('./components/SitePage'))
const Images = React.lazy(() => import('./components/Images'))
const TreeView = React.lazy(() => import('./components/treeView/index'))
const UserDashboard = React.lazy(() => import('./components/user/Dashboard'))
const UserProfile = React.lazy(() => import('./components/user/Profile'))

const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/users-allusers', name: 'All Users', element: allusers },
  { path: '/add/nft', name: 'Upload', element: uploadnft },
  { path: '/direct-income-report', name: 'Sponsor Income Report', element: directIncomeReport },
  { path: '/admin-referals', name: 'Added By Admin/History', element: Addedbyadmin },
  { path: '/user-alert', name: 'User Alert', element: UserAlertMessage },
  { path: '/invest-history', name: 'Invest History', element: InvestHistory },
  { path: '/main-pending-withdrawals', name: 'Pending Withdrawals', element: PendingWithdrawals },
  { path: '/invalis-withdrawals', name: 'Invalid Withdrawals', element: InvalidWithdrawals },
  { path: '/success-withdrawals', name: 'Success Withdrawals', element: SuccessWithdrawals },
  { path: '/images', name: 'Images', element: Images },
  { path: '/active-users', name: 'All Active users', element: CustomPage },
  { path: '/pending/users', name: 'Pending Users', element: PendingUsersWithFilter },
  { path: '/suspended/users', name: 'Suspended Users', element: SuspendedUsers },
  { path: '/custom-page/create', name: 'CreateProfile', element: CreateCustomPage },
  { path: '/custom-page/update', name: 'Update', element: EditCustomPage },
  { path: '/site-tabs/:name/:id', name: 'Site Tabs', element: SitePage },
  { path: '/site-tabs/:name/:id/:subId', name: 'Site Tabs', element: SitePage },
  { path: '/tree', name: 'Tree View', element: TreeView },
  { path: '/admin/all-ticket-status', name: 'Ticket Status', element: TicketAllStatus },
  { path: '/admin/all-ticket-status/:userticketID', name: 'Update Ticket', element: UpdateTicketStatus },
  { path: '/plans-manager', name: 'Plans Manager', element: PlansManager },
  { path: '/user/dashBoard', name: 'Dashboard', element: UserDashboard },
  { path: '/user/profile', name: 'Profile', element: UserProfile },
  { path: '/user/raise-ticket', name: 'Raise Ticket', element: RaiseTicket },
  { path: '/user/ticket-status', name: 'Ticket Status', element: TicketStatus },
  { path: '/user/activation', name: 'Activation', element: PlanActivation },
  { path: '/user/update/:userId', name: 'Update User', element: Updateuser },
  { path: '/user/price-wise-nft/:price', name: 'Nft', element: Shownftbyprice },
  { path: '/level-users/:level', name: 'Level Users', element: levelUsers },
  { path: '/user-income-report', name: 'User Income Report', element: UserIncomeReport },
  { path: '/rank-reward-report', name: 'Rank Rewards', element: RankRewardReport },
]

export default routes

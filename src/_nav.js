import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilPeople,
  cilCash,
  cilChartPie,
  cilNotes,
  cilFindInPage,
  cilDescription,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Users',
  },
  {
    component: CNavItem,
    name: 'All Users',
    to: '/users-allusers',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Active Users',
    to: '/active-users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Pending Users',
    to: '/pending/users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Suspended Users',
    to: '/suspended/users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Income Reports',
  },
  {
    component: CNavItem,
    name: 'Sponsor Income',
    to: '/direct-income-report',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'User Income Report',
    to: '/user-income-report',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Withdrawals',
  },
  {
    component: CNavItem,
    name: 'Pending Withdrawals',
    to: '/main-pending-withdrawals',
    icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Approved Withdrawals',
    to: '/success-withdrawals',
    icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Invalid Withdrawals',
    to: '/invalis-withdrawals',
    icon: <CIcon icon={cilCash} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Deposits & NFT',
  },
  {
    component: CNavItem,
    name: 'Deposit Report',
    to: '/deposit-report',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Invest History',
    to: '/invest-history',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Upload NFT',
    to: '/add/nft',
    icon: <CIcon icon={cilFindInPage} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Admin Tools',
  },
  {
    component: CNavItem,
    name: 'Admin Referrals',
    to: '/admin-referals',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'User Alert',
    to: '/user-alert',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Tree View',
    to: '/tree',
    icon: <CIcon icon={cilFindInPage} customClassName="nav-icon" />,
  },
]

export default _nav

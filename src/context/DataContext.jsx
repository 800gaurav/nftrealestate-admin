import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import {
  cilCursor,
  cilFindInPage,
  cilImage,
  cilSpeedometer,
  cilStar,
  cilGroup,
  cilList,
  cilPeople,
  cilUser,
  cilBank,
  cilSettings,
  cilSwapHorizontal,
cilCaretRight,
  cilMoney,
  cilChevronCircleUpAlt,
  cilChevronDoubleUp,
  cilArrowThickToTop,
  cilArrowThickFromTop,
  cilCreditCard,
  cilLan,
  cibGreensock,
  cibKeycdn
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import useAxios from '../hooks/useAxios'
import useAuth from '../hooks/useAuth'
import { BsTicket } from 'react-icons/bs'

export const DataContext = createContext()

const lists =[
    {
      component: CNavItem,
      name: 'DashBoard',
      to: '/dashboard',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Add NFT',
      to: '/add/nft',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    },
    {
      component: CNavGroup,
      name: 'Users',
      to: '/member',
      icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Active Users',
          to: '/active-users',
          icon: <CIcon icon={cilList} customClassName="nav-icon" />,
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
          icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'All Users',
          to: '/users-allusers',
          icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
        },
      ],
    },
      {
      component: CNavItem,
      name: 'Deposit History',
      to: '/deposit-report',
      icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
    },
    {
      component: CNavGroup,
      name: 'Income History',
      to: '/income-report',
      icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Direct Income Report',
          to: '/direct-income-report',
          icon: <CIcon icon={cilBank} />,
        },
        {
          component: CNavItem,
          name: 'Roi Income Report',
          to: '/roi-income-report',
          icon: <CIcon icon={cilBank} />,
        },
        {
          component: CNavItem,
          name: 'Level Income Report',
          to: '/level-income-report',
          icon: <CIcon icon={cilBank} />,
        },
        {
          component: CNavItem,
          name: 'Reward Income Report',
          to: '/reward-income-report',
          icon: <CIcon icon={cilBank} />,
        },
        // {
        //   component: CNavItem,
        //   name: 'Portfolio Records',
        //   to: '/income-report/portfolio-records',
        //   icon: <CIcon icon={cilBank} />,
        // },
      ],
    },

    {
      component: CNavGroup,
      name: 'Invest Details',
      to: '/income-report',
      icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Invest History',
          to: '/invest-history',
          icon: <CIcon icon={cilBank} />,
        },
      ],
    },

    {
      component: CNavGroup,
      name: 'Transfer History',
      to: '/transfer-report',
      icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Transfer History',
          to: '/transfer-report',
          icon: <CIcon icon={cilBank} />,
        },
      ],
    },

    {
      component: CNavGroup,
      name: 'Withdrawals',
      to: '/income-report',
      icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Main Pending withDrawals',
          to: '/main-pending-withdrawals',
          icon: <CIcon icon={cilBank} />,
        },
        {
          component: CNavItem,
          name: 'Success Withdrawals',
          to: '/success-withdrawals',
          icon: <CIcon icon={cilBank} />,
        },
        {
          component: CNavItem,
          name: 'Invalid Withdrawals',
          to: '/invalis-withdrawals',
          icon: <CIcon icon={cilBank} />,
        },
      ],
    },
    {
      component: CNavGroup,
      name: 'Others',
      to: '/income-report',
      icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Added By Admin/History',
          to: '/admin-referals',
          icon: <CIcon icon={cilBank} />,
        },
        {
          component: CNavItem,
          name: 'User Alert Message',
          to: '/user-alert',
         
        },
      
      ],
    },

    {
      component: CNavGroup,
      name: 'Support',
      to: '/support',
      icon: <CIcon icon={cibGreensock} customClassName="nav-icon" />,
      items: [
         {
          component: CNavItem,
          name: 'All Ticket Status',
          to: '/admin/all-ticket-status',
          icon: <CIcon icon={cilCaretRight} />,
         
        },
        // {
        //   component: CNavItem,
        //   name: 'Raise Ticket',
        //   to: '/admin/update-raise-ticket',
        //   icon: <CIcon icon={cilCaretRight} />,
        // }
       
       
      ],
    },
  ]

export const DataProvider = ({ children }) => {
  const { fetchData } = useAxios()
  const loadedRef = useRef(false) // ✅ Prevent multiple API calls
  const { userRole, setUserRole } = useAuth()
  
  const [siteTabs, setSiteTabs] = useState();

  const getAllLists = () => { }
  const deleteSiteTab = () => { }

  useEffect(() => {
    if (userRole === 'user') {
      setSiteTabs([
        {
          component: CNavItem,
          name: 'DashBoard',
          to: '/user/dashboard',
          icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Profile',
          to: '/user/profile',
          icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Activation',
          to: '/user/activation',
          icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
        },
        {
          component: CNavItem,
          name: 'Tree View',
          to: '/tree',
          icon: <CIcon icon={cilLan} customClassName="nav-icon" />,
        },
    {
      component: CNavGroup,
      name: 'Support',
      to: '/support',
      icon: <CIcon icon={cibGreensock} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Raise Ticket',
          to: '/user/raise-ticket',
          icon: <CIcon icon={cilCaretRight} />,
        },
        {
          component: CNavItem,
          name: 'Ticket Status',
          to: '/user/ticket-status',
          icon: <CIcon icon={cilCaretRight} />,
         
        },
       
      ],
    },
      
      ])
    } 
    if(userRole!== 'user'){
      setSiteTabs(lists)
    }
    console.log(userRole)
  }, [userRole])

  useEffect(() => {
    // getAllLists() // ✅ Trigger once when component mounts
  }, [])

  const value = {
    siteTabs,
    setSiteTabs,
    getAllLists,
    deleteSiteTab,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export const useData = () => useContext(DataContext)

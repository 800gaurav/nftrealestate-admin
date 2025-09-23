import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDrop,
  cilPeople,
  cilSpeedometer,
  cilCash,
  cilCart,
  cilPuzzle,
  cilExternalLink,
  cilCursor,
  cilNotes,
  cilChartPie,
  cilStar,
  cilBell,
  cilCalculator,
  cilDescription,
  cilFindInPage
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },

  {
    component: CNavItem,
    name: 'Custom Page',
    to: '/custom-page',
    icon: <CIcon icon={cilFindInPage} customClassName="nav-icon" />,
  },

  {
    name: 'Site Tabs',
    component: CNavTitle,
  },
  {
    component: CNavGroup,
    name: 'Buttons',
    to: '',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavGroup,
        name: 'Buttons',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Buttons groups',
        to: '/buttons/button-groups',
      },
      {
        component: CNavItem,
        name: 'Dropdowns',
        to: '/buttons/dropdowns',
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Loading Button'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/components/loading-button/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
    ],
  },
]

export default _nav

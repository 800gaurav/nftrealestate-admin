import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
  cilAccountLogout,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

// import avatar8 from './../../assets/images/avatars/profile.jpg'
import profile from './../../assets/images/avatars/profile.png'
import useAuth from '../../hooks/useAuth'

const AppHeaderDropdown = () => {
  const {logout}=useAuth()
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        {/* <CAvatar src='assets/images/avatars/9.png' size="md" /> */}
        <CAvatar src={profile} size="md" />

      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>
        <CDropdownItem onClick={logout} style={{ cursor :'pointer' }}>
          Logout {""}
          <CIcon icon={cilAccountLogout} className="ml-2" />
          {/* <CBadge color="info" className="ms-2">
            42
          </CBadge> */}
        </CDropdownItem>
       
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'

import { AppSidebarNav } from './AppSidebarNav'

// import logo from '../assets/images/logo-high.png'

// sidebar nav config
import navigation from '../_nav'
import useNavigation from '../hooks/useNavigation'
import { useData } from '../hooks/useData'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const { siteTabs,
    setSiteTabs, getAllLists } = useData()

  useEffect(() => {
    getAllLists()
  }, [])
  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="d-flex w-100 overflow-hidden justify-content-between align-items-center px-3" style={{ minHeight: 'calc(4rem + 1px)' }}>
        <CSidebarBrand className="d-flex align-items-center gap-2 text-decoration-none">
          {/* <img
            src='/logo.png'
            alt="Logo"
            style={{ height: 40, width: 'auto', objectFit: 'contain', display: 'block' }}
          /> */}
          <span className="fs-4 fw-bold text-white"> Admin</span>
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={siteTabs} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)

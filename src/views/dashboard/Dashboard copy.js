import React, { useEffect, useState } from 'react'
// import {
//   CAvatar,
//   CButton,
//   CCard,
//   CCardBody,
//   CCardFooter,
//   CCol,
//   CRow,
//   CTable,
//   CTableBody,
//   CTableDataCell,
//   CTableHead,
//   CTableHeaderCell,
//   CTableRow,
//   CBadge
// } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import { cilPeople } from '@coreui/icons'
// import useAxios from '../../hooks/useAxios'
// import { imageFullUrl } from '../helper'
// import { useNavigate } from 'react-router-dom'
// import toast from 'react-hot-toast'
// import ImagePreviewModal from '../../components/common/ImageViewModal'

const Dashboard = () => {
  // const { fetchData, loading } = useAxios()
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedImage, setSelectedImage] = useState(null);
  // const [data, setData] = useState([])
  // const navigate = useNavigate()

  // const getOrders = async () => {
  //   try {
  //     const res = await fetchData({ url: '/admin/order' })
  //     if (res.success) {
  //       setData(res.data)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   getOrders()
  // }, [])

  // const paymenstHeaders = [
  //   'Quantity',
  //   'Price',
  //   'Status',
  //   "UTR Number",
  //   'Screenshot',
  //   "Action"
  // ]

  // const updateStatus = async (id, status) => {
  //   try {
  //     const res = await fetchData({
  //       url: `/admin/order/${id}`,
  //       method: 'PUT',
  //       data: { status }
  //     })
  //     toast.success(res.message)
  //     getOrders()
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // // Function to get badge color based on status
  // const getStatusBadge = (status) => {
  //   switch (status) {
  //     case 'APPROVED':
  //       return <CBadge color="success">Approved</CBadge>  // 🟢 Green
  //     case 'CREATED':
  //       return <CBadge color="warning">Created</CBadge>  // 🟡 Yellow
  //     case 'REJECTED':
  //       return <CBadge color="danger">Rejected</CBadge>  // 🔴 Red
  //     default:
  //       return <CBadge color="secondary">Unknown</CBadge>  // ⚫ Gray (Fallback)
  //   }
  // }

  return (
    <h1>
      IN DEVELOPMENT...
    </h1>
    // <>
    //   <CCard className="mb-4">
    //     <CCardBody>
    //       <CRow>
    //         <CCol sm={5}>
    //           <h4 id="traffic" className="card-title mb-0">
    //             Orders
    //           </h4>
    //         </CCol>
    //         <CTable align="middle" className="mb-0 border" hover responsive>
    //           <CTableHead className="text-nowrap">
    //             <CTableRow>
    //               <CTableHeaderCell className="bg-body-tertiary text-center">
    //                 <CIcon icon={cilPeople} />
    //               </CTableHeaderCell>
    //               {paymenstHeaders.map((header, index) => (
    //                 <CTableHeaderCell key={index} className="bg-body-tertiary text-center">
    //                   {header}
    //                 </CTableHeaderCell>
    //               ))}
    //             </CTableRow>
    //           </CTableHead>
    //           <CTableBody>
    //             {data.length > 0 ? (
    //               data.slice(0, 5).map((item, index) => (
    //                 <CTableRow key={item._id}>
    //                   <CTableDataCell className="text-center">
    //                     <div>{item?.user?.name}</div>
    //                   </CTableDataCell>
    //                   <CTableDataCell className="text-center">
    //                     <div>{item?.quantity}</div>
    //                   </CTableDataCell>
    //                   <CTableDataCell className="text-center">
    //                     <div>{item?.price || 'N/A'}</div>
    //                   </CTableDataCell>
    //                   <CTableDataCell className="text-center">
    //                     {getStatusBadge(item?.status)}
    //                   </CTableDataCell>
    //                   <CTableDataCell className="text-center">
    //                     <div>{item?.utr || 'No UTR'}</div>
    //                   </CTableDataCell>
    //                   <CTableDataCell className="text-center">
    //                    <img
    //                                              size="md"
    //                                              src={imageFullUrl(item.paymentss)}
    //                                              height={80}
    //                                            width={80}
    //                                            alt="Screenshot"
    //                                            style={{
    //                                                objectFit: 'contain',
    //                                                cursor:"pointer"
    //                                                // borderRadius:"50%"
    //                                            }}
    //                                              onClick={() => {
    //                                                setSelectedImage(imageFullUrl(item.paymentss));
    //                                                setIsModalOpen(true);
    //                                              }}
    //                                            />
    //                   </CTableDataCell>
    //                   <CTableDataCell className="text-center">
    //                     <CButton color="success" className="rounded-0 mr-2" onClick={() => updateStatus(item._id, 'APPROVED')}>
    //                       Approve
    //                     </CButton>
    //                     <CButton color="danger" className="rounded-0" onClick={() => updateStatus(item._id, 'REJECTED')}>
    //                       Reject
    //                     </CButton>
    //                   </CTableDataCell>
    //                 </CTableRow>
    //               ))
    //             ) : (
    //               <CTableRow>
    //                 <CTableDataCell colSpan="7" className="text-center">No Orders</CTableDataCell>
    //               </CTableRow>
    //             )}
    //           </CTableBody>
    //         </CTable>
    //       </CRow>
    //     </CCardBody>
    //     <CCardFooter className="text-center">
    //       <CButton color="primary" onClick={() => navigate('/orders')}>
    //         View All
    //       </CButton>
    //     </CCardFooter>
    //   </CCard>
    //   <ImagePreviewModal
    //     imageUrl={selectedImage}
    //     isOpen={isModalOpen}
    //     onClose={() => setIsModalOpen(false)}
    //   />
    // </>
  )
}

export default Dashboard

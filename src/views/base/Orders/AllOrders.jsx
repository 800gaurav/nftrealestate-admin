import React, { useEffect, useState } from "react";
import {
  CAvatar,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CRow,
} from "@coreui/react";
import useAxios from "../../../hooks/useAxios";
import { imageFullUrl } from "../../helper";
import LoadingSpinner from "../../../components/common/LoadinSpinner";
import toast from "react-hot-toast";
import ImagePreviewModal from "../../../components/common/ImageViewModal";

const AllOrders = () => {
  const { fetchData, loading } = useAxios();
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getOrders = async () => {
    try {
      const res = await fetchData({ url: "/admin/order" });
      if (res.success) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetchData({
        url: `/admin/order/${id}`,
        method: "PUT",
        data: { status },
      });
      toast.success(res.message);
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CCard className="mb-4">
        {loading && <LoadingSpinner />}
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 className="card-title mb-0">Orders</h4>
            </CCol>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead className="text-nowrap">
                <CTableRow>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    User
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    Quantity
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    Price
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    Status
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    UTR Number
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    Screenshot
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    Action
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell className="text-center">
                        <div>{item?.user?.name}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item?.quantity}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item?.price || "pp"}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CBadge
                          color={
                            item?.status === "APPROVED"
                              ? "success"
                              : item?.status === "CREATED"
                              ? "warning"
                              : "danger"
                          }
                        >
                          {item?.status}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item?.utr || "No UTR"}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <img
                          size="md"
                          src={imageFullUrl(item.paymentss)}
                          height={80}
                        width={80}
                        alt="Screenshot"
                        style={{
                            objectFit: 'contain',
                            cursor:"pointer"
                            // borderRadius:"50%"
                        }}
                          onClick={() => {
                            setSelectedImage(imageFullUrl(item.paymentss));
                            setIsModalOpen(true);
                          }}
                        />
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CButton
                          color="success"
                          className="rounded-0 mr-2"
                          onClick={() => updateStatus(item._id, "APPROVED")}
                        >
                          Approve
                        </CButton>
                        <CButton
                          color="danger"
                          className="rounded-0"
                          onClick={() => updateStatus(item._id, "REJECTED")}
                        >
                          Reject
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan="7" className="text-center">
                      No Orders
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>
          </CRow>
        </CCardBody>
        <CCardFooter style={{ margin: "0 auto" }}></CCardFooter>
      </CCard>

      {/* Image Preview Modal */}
      <ImagePreviewModal
        imageUrl={selectedImage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default AllOrders;

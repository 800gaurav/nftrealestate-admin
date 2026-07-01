import React, { useEffect, useState } from 'react';
import {
  CRow,
  CCol,
  CFormInput,
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CFormSelect,
} from '@coreui/react';
import toast from 'react-hot-toast';
import useAxios from '../hooks/useAxios';
import LoadingSpinner from '../components/common/LoadinSpinner';

function PendingWithdrawals() {
  const { fetchData, loading } = useAxios();

  const [withdrawals, setWithdrawals] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({ userId: '', from: '', to: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);

  const fetchWithdrawals = async () => {
    try {
      const res = await fetchData({ url: `/api/v1/user/payment/withdraw-history?type=pending` });
      if (res?.data) {
        setWithdrawals(res.data);
        setFiltered(res.data);
      } else {
        toast.error('No withdraw history found');
      }
    } catch (err) {
      toast.error('Failed to fetch withdraw history');
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  const handleSearch = () => {
    let filteredList = [...withdrawals];
    if (filters.userId) {
      filteredList = filteredList.filter((item) =>
        item.userId.toLowerCase().includes(filters.userId.toLowerCase())
      );
    }
    if (filters.from) {
      filteredList = filteredList.filter(
        (item) => new Date(item.createdAt) >= new Date(filters.from)
      );
    }
    if (filters.to) {
      filteredList = filteredList.filter(
        (item) => new Date(item.createdAt) <= new Date(filters.to)
      );
    }
    setFiltered(filteredList);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({ userId: '', from: '', to: '' });
    setFiltered(withdrawals);
    setCurrentPage(1);
  };

const handleupdatestatus = async (e, withdrawalId) => {
  const newstatus = e.target.value;

  try {
    setStatusUpdateLoading(true);

    const url =
      newstatus === "reject"
        ? `/api/v1/user/payment/withdraw-reject/${withdrawalId}`
        : `/api/v1/user/payment/withdraw-approve/${withdrawalId}`;

    const res = await fetchData({
      url,
      method: 'POST',
    });

    if (res?.success) {
      toast.success(res.message);
      fetchWithdrawals(); // Refresh data
    } 
  } catch (err) {
    toast.error(`Error trying to ${newstatus} withdrawal`);
  } finally {
    fetchWithdrawals()
    setStatusUpdateLoading(false);
  }
};


  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <>
      {loading && <LoadingSpinner />}

      <CRow className="mb-3">
        <CCol md={3}>
          <CFormInput
            label="UserId"
            // placeholder="e.g. USDT.TRC20"
            value={filters.userId}
            onChange={(e) => setFilters({ ...filters, userId: e.target.value })}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="date"
            label="From Date"
            value={filters.from}
            onChange={(e) => setFilters({ ...filters, from: e.target.value })}
          />
        </CCol>
        <CCol md={3}>
          <CFormInput
            type="date"
            label="To Date"
            value={filters.to}
            onChange={(e) => setFilters({ ...filters, to: e.target.value })}
          />
        </CCol>
        <CCol md={3} className="d-flex align-items-end gap-2">
          <CButton color="primary" onClick={handleSearch}>Search</CButton>
          <CButton color="info" onClick={handleReset}>Reset</CButton>
        </CCol>
      </CRow>

      <div className="table-responsive">
        <CTable hover bordered responsive className="text-nowrap">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>S.No</CTableHeaderCell>
              <CTableHeaderCell>User ID</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>TRC20 Address</CTableHeaderCell>
              <CTableHeaderCell>BEP20 Address</CTableHeaderCell>
              <CTableHeaderCell>Withdraw Address</CTableHeaderCell>
              <CTableHeaderCell>Coin</CTableHeaderCell>
              <CTableHeaderCell>Amount</CTableHeaderCell>
              <CTableHeaderCell>Service Charge</CTableHeaderCell>
              <CTableHeaderCell>Payable</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Date</CTableHeaderCell>
              {/* <CTableHeaderCell>Action</CTableHeaderCell> */}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentItems.map((item, index) => {
              const date = new Date(item.createdAt);
              return (
                <CTableRow key={item._id}>
                  <CTableDataCell>{indexOfFirst + index + 1}</CTableDataCell>
                  <CTableDataCell>{item.userId?.userId || item.userUniqueId}</CTableDataCell>
                  <CTableDataCell>{item.userName || '-'}</CTableDataCell>
                  <CTableDataCell><small>{item.withdrawTRC_ADDRESS || '-'}</small></CTableDataCell>
                  <CTableDataCell><small>{item.withdrawBEP_ADDRESS || '-'}</small></CTableDataCell>
                  <CTableDataCell><small>{item.toAddress || '-'}</small></CTableDataCell>
                  <CTableDataCell>{item.coin}</CTableDataCell>
                  <CTableDataCell>${item.amount}</CTableDataCell>
                  <CTableDataCell>${item.serviceCharge}</CTableDataCell>
                  <CTableDataCell>${item.payableAmount}</CTableDataCell>
                 <CTableDataCell>
                                      <CFormSelect
                                        
                                        value={item.status}
                                        onChange={(e)=>  handleupdatestatus(e, item._id)}
                                        options={[
                                          { label: 'Pending', value: 'pending', disabled: true },
                                          { label: 'Approve', value: 'approve' },
                                          { label: 'Reject', value: 'reject' },
                                        ]}
                                      />
                                    </CTableDataCell>
              
                  <CTableDataCell>
                    {date.toLocaleDateString()} <br />
                    <small className="text-muted">{date.toLocaleTimeString()}</small>
                  </CTableDataCell>
              
                </CTableRow>
              );
            })}
          </CTableBody>
        </CTable>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filtered.length)} of {filtered.length} entries
        </div>
        <div>
          {Array.from({ length: totalPages }, (_, i) => (
            <CButton
              key={i}
              size="sm"
              color={i + 1 === currentPage ? 'dark' : 'light'}
              className="me-1"
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </CButton>
          ))}
        </div>
      </div>
    </>
  );
}

export default PendingWithdrawals;

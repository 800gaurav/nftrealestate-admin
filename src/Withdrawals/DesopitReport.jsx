import React, { useEffect, useState } from 'react';
import {
  CRow,
  CCol,
  CFormInput,
  CFormSelect,
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react';
import toast from 'react-hot-toast';
import useAxios from '../hooks/useAxios';
import LoadingSpinner from '../components/common/LoadinSpinner';

function DesopitReport() {
  const { fetchData, loading } = useAxios();
  const [history, setHistory] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    userId: '',
    from: '',
    to: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchDataFromServer = async () => {
    try {
      const res = await fetchData({ url: '/api/v1/user/payment/history/all' });
      if (res?.data) {
        setHistory(res.data);
        setFiltered(res.data);
      } else {
        toast.error('No deposit history found');
      }
    } catch (err) {
      toast.error('Failed to fetch deposit history');
    }
  };

  useEffect(() => {
    fetchDataFromServer();
  }, []);

  const handleSearch = () => {
    let result = [...history];

    if (filters.status) {
      result = result.filter((item) => item.status.toLowerCase() === filters.status);
    }
    if (filters.userId) {
      result = result.filter(
        (item) => item.userId?.toLowerCase() === filters.userId.toLowerCase()
      );
    }

    if (filters.from) {
      result = result.filter((item) => new Date(item.date) >= new Date(filters.from));
    }

    if (filters.to) {
      result = result.filter((item) => new Date(item.date) <= new Date(filters.to));
    }

    setFiltered(result);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({ status: '', from: '', to: '', userId: '', });
    setFiltered(history);
    setCurrentPage(1);
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const renderPagination = () => {
    const pageButtons = [];

    const pageRange = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i <= 2 ||
        i > totalPages - 2 ||
        (i >= currentPage - pageRange && i <= currentPage + pageRange)
      ) {
        pageButtons.push(
          <CButton
            key={i}
            size="sm"
            color={i === currentPage ? 'dark' : 'light'}
            className="me-1"
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </CButton>
        );
      } else if (
        pageButtons[pageButtons.length - 1] !== '...'
      ) {
        pageButtons.push(<span key={`dots-${i}`} className="me-1">...</span>);
      }
    }

    return pageButtons;
  };

  return (
    <>
      {loading && <LoadingSpinner />}

      <CRow className="mb-3">
        <CCol md={3}>
          <CFormSelect
            label="Status"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </CFormSelect>
        </CCol>

        <CCol md={3}>
          <CFormInput
            label="UserId"
            value={filters.userId}
            onChange={(e) => setFilters({ ...filters, userId: e.target.value })}
          />
        </CCol>

        <CCol md={2}>
          <CFormInput
            type="date"
            label="From Date"
            value={filters.from}
            onChange={(e) => setFilters({ ...filters, from: e.target.value })}
          />
        </CCol>

        <CCol md={2}>
          <CFormInput
            type="date"
            label="To Date"
            value={filters.to}
            onChange={(e) => setFilters({ ...filters, to: e.target.value })}
          />
        </CCol>

        <CCol md={2} className="d-flex align-items-end gap-2">
          <CButton color="primary" onClick={handleSearch}>Search</CButton>
          <CButton color="info" onClick={handleReset}>Reset</CButton>
        </CCol>
      </CRow>

      <div className="table-responsive">
        <CTable hover bordered className="text-nowrap">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>userId</CTableHeaderCell>
              <CTableHeaderCell>Amount ($)</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Date</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentItems.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{indexOfFirst + index + 1}</CTableDataCell>
                <CTableDataCell>{item.userId}</CTableDataCell>
                <CTableDataCell>${item.amount}</CTableDataCell>
                <CTableDataCell>{item.status}</CTableDataCell>
                <CTableDataCell>{new Date(item.date).toLocaleDateString()}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filtered.length)} of {filtered.length} entries
        </div>
        <div>{renderPagination()}</div>
      </div>
    </>
  );
}

export default DesopitReport;


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
} from '@coreui/react';
import useAxios, { loginAsUserUrl } from '../../../hooks/useAxios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../../components/common/LoadinSpinner';

const PendingUsersWithFilter = () => {
  const { fetchData, loading } = useAxios();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    userId: '',
    from: '',
    to: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchPendingUsers = async () => {
    try {
      const res = await fetchData({ url: '/api/v1/admin/user/pendinguser' });
      if (res?.pendingUsers) {
        setUsers(res.pendingUsers);
        setFiltered(res.pendingUsers);
      } else {
        toast.error('No users found');
      }
    } catch (err) {
      toast.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const loginAsUser = async (id, userId) => {
    try {
      const data = await fetchData({
        url: `/api/v1/admin/user/login-as-user/${id}`,
        method: 'get',
      });
      if (data.success) {
        const { token } = data?.data;
        const redirectUrl = `${loginAsUserUrl}/login?userId=${userId}&token=${token}`;
        window.open(redirectUrl, "_blank");
      }
    } catch (error) {
      toast.error('Login as user failed');
      console.log(error);
    }
  };

  const handleSearch = () => {
    let filteredList = [...users];

    if (filters.userId) {
      filteredList = filteredList.filter((user) =>
        user.userId.toLowerCase().includes(filters.userId.toLowerCase())
      );
    }

    if (filters.from) {
      filteredList = filteredList.filter(
        (user) => new Date(user.createdAt) >= new Date(filters.from)
      );
    }

    if (filters.to) {
      filteredList = filteredList.filter(
        (user) => new Date(user.createdAt) <= new Date(filters.to)
      );
    }

    setFiltered(filteredList);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilters({ userId: '', from: '', to: '' });
    setFiltered(users);
    setCurrentPage(1);
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const renderPagination = () => {
    const pages = [];
    const maxPageToShow = 5;

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
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
      }
    } else {
      pages.push(
        <CButton
          key={1}
          size="sm"
          color={currentPage === 1 ? 'dark' : 'light'}
          className="me-1"
          onClick={() => setCurrentPage(1)}
        >
          1
        </CButton>
      );

      if (currentPage > 3) {
        pages.push(<span key="dots1" className="mx-1">...</span>);
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
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
      }

      if (currentPage < totalPages - 2) {
        pages.push(<span key="dots2" className="mx-1">...</span>);
      }

      pages.push(
        <CButton
          key={totalPages}
          size="sm"
          color={currentPage === totalPages ? 'dark' : 'light'}
          className="me-1"
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </CButton>
      );
    }

    return pages;
  };

  return (
    <>
      {loading && <LoadingSpinner />}

      <CRow className="mb-3">
        <CCol md={3}>
          <CFormInput
            label="UserId"
            placeholder="Enter userId"
            value={filters.userId}
            onChange={(e) =>
              setFilters({ ...filters, userId: e.target.value })
            }
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
          <CButton color="primary" onClick={handleSearch}>
            Search
          </CButton>
          <CButton color="info" onClick={handleReset}>
            Reset
          </CButton>
        </CCol>
      </CRow>

      <div className="table-responsive">
        <CTable hover bordered responsive className="text-nowrap">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>S.No</CTableHeaderCell>
              <CTableHeaderCell>UserId (Name)</CTableHeaderCell>
              <CTableHeaderCell>Mobile</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Main Wallet</CTableHeaderCell>
              <CTableHeaderCell>Fund Wallet</CTableHeaderCell>
              <CTableHeaderCell>Earning</CTableHeaderCell>
              <CTableHeaderCell>Sponsor</CTableHeaderCell>
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
              <CTableHeaderCell>Login</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentItems.map((user, index) => {
              const date = new Date(user.createdAt);
              return (
                <CTableRow key={user._id}>
                  <CTableDataCell>{indexOfFirst + index + 1}</CTableDataCell>
                  <CTableDataCell>
                    {user.userId} ({user.name})
                  </CTableDataCell>
                  <CTableDataCell>{user.phone}</CTableDataCell>
                  <CTableDataCell>{user.email}</CTableDataCell>
                  <CTableDataCell>${Number(user.walletBalance).toFixed(2) || 0}</CTableDataCell>
                  <CTableDataCell>${Number(user.fundBalance).toFixed(2) || 0}</CTableDataCell>
                  <CTableDataCell>{Number(user.totalProfitEarned).toFixed(2) || 0}</CTableDataCell>
                  <CTableDataCell>{user.sponsor}</CTableDataCell>
                  <CTableDataCell>
                    {date.toLocaleDateString()} <br />
                    <small className="text-muted">{date.toLocaleTimeString()}</small>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CButton
                      color="info"
                      size="sm"
                      onClick={() =>
                        navigate(`/user/update/${user.userId}`, { state: { user, isActivated: false } })
                      }
                    >
                      ✎
                    </CButton>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <CButton
                      disabled={user?.role === 'admin'}
                      color="primary"
                      size="sm"
                      onClick={() => loginAsUser(user._id, user.userId)}
                    >
                      Login
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              );
            })}
          </CTableBody>
        </CTable>
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filtered.length)} of{' '}
          {filtered.length} entries
        </div>
        <div>{renderPagination()}</div>
      </div>
    </>
  );
};

export default PendingUsersWithFilter;

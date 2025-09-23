import React, { useEffect, useState } from 'react';
import {
  CRow,
  CCol,
  CButton,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/common/LoadinSpinner';
import useAxios from '../hooks/useAxios';

function LevelReport() {
  const { fetchData, loading } = useAxios();
  const [history, setHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const fetchRoyaltyHistory = async () => {
    try {
      const res = await fetchData({ url: '/api/v1/admin/incomehistory/domestic-history' });
      if (res?.data) {
        setHistory(res.data);
      } else {
        toast.error('No income history found');
      }
    } catch (err) {
      toast.error('Failed to fetch income history');
    }
  };

  useEffect(() => {
    fetchRoyaltyHistory();
  }, []);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = history.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(history.length / itemsPerPage);

  return (
    <>
      {loading && <LoadingSpinner />}

      <div className="table-responsive">
        <CTable hover bordered align="middle" className="text-center text-nowrap">
          <CTableHead color="dark">
            <CTableRow>
              <CTableHeaderCell>Level</CTableHeaderCell>
              <CTableHeaderCell>Total Income ($)</CTableHeaderCell>
              <CTableHeaderCell>View</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {currentItems.map((item, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{item.level}</CTableDataCell>
                <CTableDataCell>{Number(item.totalIncome).toFixed(2)}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    size="sm"
                    color="primary"
                    onClick={() => navigate(`/level-users/${item.level}`, { state: { users: item.users } })}
                  >
                    View
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          Showing {indexOfFirst + 1} to {Math.min(indexOfLast, history.length)} of {history.length} entries
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

export default LevelReport;

import React, { useEffect, useState } from 'react';
import {
  CRow,
  CCol,
  CFormInput,
  CButton,
  CCard,
  CCardBody,
  CFormSwitch,
} from '@coreui/react';
import { useLocation, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAxios from '../hooks/useAxios';
import LoadingSpinner from '../components/common/LoadinSpinner';

const Updateuser = () => {
  const { userId } = useParams();
  const location = useLocation();
  const { user, isActivated } = location.state || {}
  console.log(user, "users")

  const { fetchData, loading } = useAxios();

  const [form, setForm] = useState({
    sponsor: '',
    userId: '',
    name: '',
    phone: '',
    email: '',
    walletBalance: 0,
    totalInvested: 0,
    roiPercent: 0.5,
    fundBalance: 0,
    password: '',
    txnpass: '',
    isActivated: false,
  });

  useEffect(() => {
    if (user) {
      setForm({
        sponsor: user.sponsor || '',
        userId: user.userId || '',
        name: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
        walletBalance: user.walletBalance || 0,
        totalInvested: user.totalInvested || 0,
        roiPercent: user.roiPercent || 0.5,
        fundBalance: user.fundBalance || 0,
        password: '',
        txnpass: '',
       isActivated: isActivated ?? user.isActivated,
      });
    }
  }, [user]);

  const handleChange = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      walletBalance: Number(form.walletBalance),
      totalInvested: Number(form.totalInvested),
      roiPercent: Number(form.roiPercent),
      fundBalance: Number(form.fundBalance),
    };

    console.log('Submitting payload:', payload);

    try {
      const res = await fetchData({
        url: `/api/v1/admin/user/admin-update-user/${userId}`,
        method: 'put',
        data: payload, // ✅ Correct key here
      });

      if (res.success) {
        toast.success('User updated successfully');
      } else {
        toast.error(res.message || 'Update failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error while updating user');
    }
  };

  const handleReset = () => {
    if (user) {
      setForm({
        sponsor: user.sponsor || '',
        userId: user.userId || '',
        name: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
        walletBalance: 0,
        fundBalance: 0,
        roiPercent: user.roiPercent || 0.5,
        password: '',
        txnpass: '',
        totalInvested: 0,
        isActivated: isActivated ?? user.isActivated,
      });
    }
  };

  return (
    <CCard className="p-3">
      {loading && <LoadingSpinner />}
      <CCardBody>
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormInput label="Sponsor ID" value={form.sponsor} disabled />
          </CCol>
          <CCol md={6}>
            <CFormInput label="User ID" value={form.userId} disabled />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CCol md={6}>
            <CFormInput
              label="Name"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              label="Mobile"
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CCol md={12}>
            <CFormInput
              label="Email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CCol md={6}>
            <CFormInput
              label={`Main Wallet (Current = ${user.walletBalance})`}
              type="number"
              value={form.walletBalance}
              onChange={(e) => handleChange('walletBalance', e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              label={`Fund Wallet (Current = ${user.fundBalance})`}
              type="number"
              value={form.fundBalance}
              onChange={(e) => handleChange('fundBalance', e.target.value)}
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CCol md={6}>
            <CFormInput
              label="Password"
              type="password"
              placeholder="Enter new password"
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              label={`Total Invest (Current = ${user.totalInvested})`}
              type="number"
              value={form.totalInvested}
              onChange={(e) => handleChange('totalInvested', e.target.value)}
            />
          </CCol>
          </CRow>
          <CRow className="mb-3">
      <CCol md={6} className="d-flex flex-column justify-content-center">
            <label className="fw-bold mb-2">Activation Status:</label>
            <CFormSwitch
              label={form.isActivated ? 'Activated' : 'Deactivated'}
              checked={form.isActivated}
              onChange={(e) => handleChange('isActivated', e.target.checked)}
            />
          </CCol>
        </CRow>
    

        <CRow className="mt-4">
          <CCol className="d-flex gap-2">
            <CButton color="primary" onClick={handleSubmit}>Update</CButton>
            <CButton color="secondary" onClick={handleReset}>Reset</CButton>
          </CCol>

        </CRow>

      </CCardBody>
    </CCard>
  );
};

export default Updateuser;

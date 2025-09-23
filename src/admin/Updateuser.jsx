import React, { useEffect, useState } from 'react';
import {
  CRow,
  CCol,
  CFormInput,
  CButton,
  CCard,
  CCardBody,
} from '@coreui/react';
import { useLocation, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAxios from '../hooks/useAxios';
import LoadingSpinner from '../components/common/LoadinSpinner';

const Updateuser = () => {
  const { userId } = useParams();
  const location = useLocation();
  const user = location.state?.user;
  console.log(user)

  const { fetchData, loading } = useAxios();

  const [form, setForm] = useState({
    sponsor: '',
    userId: '',
    name: '',
    phone: '',
    email: '',
    walletBalance: 0,
    fundBalance: 0,
    password: '',
    txnpass: '',
    nftPurchaseDate: '',
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
        fundBalance: user.fundBalance || 0,
        password: '',
        txnpass: '',
        nftPurchaseDate:user.nfts[0]?.purchasedAt ? new Date(user.nfts[0].purchasedAt).toISOString().split("T")[0] : '',
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
        password: '',
        txnpass: '',
        nftPurchaseDate: '',
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
              label="Transaction Password"
              type="password"
              placeholder="Enter transaction password"
              value={form.txnpass}
              onChange={(e) => handleChange('txnpass', e.target.value)}
            />
          </CCol>
        </CRow>
         <CRow className="mb-3">
          <CCol md={12}>
    <CFormInput
      label="NFT Purchase Date"
      type="date"
      value={form.nftPurchaseDate?.split('T')[0] || ''}
      onChange={(e) => handleChange('nftPurchaseDate', e.target.value)}
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

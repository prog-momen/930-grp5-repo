import React, { useState, useEffect } from 'react';
import PaymentService from '../services/PaymentService';
import AuthService from '../services/AuthService';
import PaymentsTable from './PaymentsTable';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await PaymentService.getAllPayments();
      setPayments(response.data || []);
      setError('');
    } catch (error) {
      setError(error.message || 'Failed to fetch payments');
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePayment = async (paymentId) => {
    if (!window.confirm('Are you sure you want to delete this payment?')) {
      return;
    }

    try {
      await PaymentService.deletePayment(paymentId);
      setSuccess('Payment deleted successfully');
      fetchPayments(); // Refresh the list
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.message || 'Failed to delete payment');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleEditPayment = (paymentId) => {
    window.location.href = `/payments/${paymentId}/edit`;
  };

  const handleViewPayment = (paymentId) => {
    window.location.href = `/payments/${paymentId}`;
  };

  const handleProcessPayment = (paymentId) => {
    window.location.href = `/payments/${paymentId}/process`;
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Payments</h2>
        {user && user.role.toLowerCase() === 'admin' && (
          <a href="/payments/create" className="btn btn-success">
            Add Payment
          </a>
        )}
      </div>

      {/* Success Alert */}
      {success && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {success}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setSuccess('')}
            aria-label="Close"
          ></button>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setError('')}
            aria-label="Close"
          ></button>
        </div>
      )}

      <PaymentsTable 
        payments={payments} 
        user={user} 
        onDelete={handleDeletePayment} 
        onEdit={handleEditPayment} 
        onView={handleViewPayment} 
        onProcessPayment={handleProcessPayment} 
      />

      {/* Back to Dashboard */}
      <div className="mt-4">
        <a href="/dashboard" className="btn btn-secondary">
          Back to Dashboard
        </a>
      </div>
    </div>
  );
};

export default Payments;

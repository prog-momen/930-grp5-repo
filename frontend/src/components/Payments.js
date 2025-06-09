import React, { useState, useEffect } from 'react';
import PaymentService from '../services/PaymentService';
import AuthService from '../services/AuthService';

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

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'bg-warning text-dark',
      completed: 'bg-success',
      failed: 'bg-danger'
    };
    return `badge ${statusClasses[status] || 'bg-secondary'}`;
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
        {user && user.role === 'Admin' && (
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

      {/* Payments Table */}
      {payments.length === 0 ? (
        <div className="alert alert-info">
          No payments found.
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-dark">
                  <tr>
                    {user && user.role === 'Admin' && <th>User</th>}
                    <th>Course</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Payment Method</th>
                    <th>Paid At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      {user && user.role === 'Admin' && (
                        <td>{payment.user?.name || 'N/A'}</td>
                      )}
                      <td>{payment.course?.title || payment.course_id}</td>
                      <td>${payment.amount}</td>
                      <td>
                        <span className={getStatusBadge(payment.status)}>
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </span>
                      </td>
                      <td>{payment.payment_method || 'N/A'}</td>
                      <td>{formatDate(payment.paid_at)}</td>
                      <td>
                        <div className="btn-group btn-group-sm" role="group">
                          <button 
                            className="btn btn-outline-info"
                            onClick={() => window.location.href = `/payments/${payment.id}`}
                          >
                            View
                          </button>
                          
                          {user && user.role === 'Admin' && (
                            <>
                              <button 
                                className="btn btn-outline-primary"
                                onClick={() => window.location.href = `/payments/${payment.id}/edit`}
                              >
                                Edit
                              </button>
                              <button 
                                className="btn btn-outline-danger"
                                onClick={() => handleDeletePayment(payment.id)}
                              >
                                Delete
                              </button>
                            </>
                          )}
                          
                          {payment.status === 'pending' && payment.user_id === user?.id && (
                            <button 
                              className="btn btn-outline-success"
                              onClick={() => window.location.href = `/payments/${payment.id}/process`}
                            >
                              Pay Now
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

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

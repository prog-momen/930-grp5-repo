import React from 'react';

const PaymentsTable = ({ payments, user, onDelete, onEdit, onView, onProcessPayment }) => {
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
    return 'badge ' + (statusClasses[status] || 'bg-secondary');
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                {user && user.role === 'admin' && <th>User</th>}
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
                  {user && user.role === 'admin' && (
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
                        onClick={() => onView(payment.id)}
                      >
                        View
                      </button>
                      {user && user.role === 'admin' && (
                        <>
                          <button 
                            className="btn btn-outline-primary"
                            onClick={() => onEdit(payment.id)}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn btn-outline-danger"
                            onClick={() => onDelete(payment.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                      {payment.status === 'pending' && payment.user_id === user?.id && (
                        <button 
                          className="btn btn-outline-success"
                          onClick={() => onProcessPayment(payment.id)}
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
  );
};

export default PaymentsTable;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseService } from '../services/api';
import './PaymentModal.css';

const PaymentModal = ({ isOpen, onClose, course, onPaymentSuccess }) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInputFocus = (e) => {
    const { name } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Create payment record
      await courseService.createPayment(course.id, course.price);
      
      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false);
        onPaymentSuccess();
        onClose();
        // Redirect to paid courses page
        navigate('/paid-courses');
      }, 2000);

    } catch (error) {
      console.error('Payment failed:', error);
      setIsProcessing(false);
      alert('Payment failed. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <div className="payment-modal-header">
          <h3>Complete Your Purchase</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        
        <div className="payment-modal-body">
          <div className="course-summary">
            <h4>{course?.title}</h4>
            <p className="course-price">${course?.price}</p>
          </div>

          <form onSubmit={handlePayment} className="payment-form">
            <div className="form-group">
              <label>Cardholder Name</label>
              <input
                type="text"
                name="cardholderName"
                value={paymentData.cardholderName}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
                placeholder="1234 5678 9012 3456"
                maxLength="19"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                type="text"
                name="expiryDate"
                value={paymentData.expiryDate}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
                placeholder="MM/YY"
                maxLength="5"
              />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input
                type="text"
                name="cvv"
                value={paymentData.cvv}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                required
                placeholder="123"
                maxLength="3"
              />
              </div>
            </div>

            <button 
              type="submit" 
              className="pay-btn"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : `Pay $${course?.price}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;

import api from './api';

class PaymentService {
    // Get all payments (admin/instructor sees all, students see their own)
    getAllPayments() {
        return api.get('payments')
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching payments:', error);
                throw error;
            });
    }

    // Get user's payment history
    getUserPayments() {
        return api.get('payments/user')
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching user payments:', error);
                throw error;
            });
    }

    // Get specific payment details
    getPayment(paymentId) {
        return api.get(`payments/${paymentId}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching payment:', error);
                throw error;
            });
    }

    // Create a new payment
    createPayment(paymentData) {
        return api.post('payments', paymentData)
            .then(response => response.data)
            .catch(error => {
                console.error('Error creating payment:', error);
                throw error;
            });
    }

    // Process a payment
    processPayment(paymentId, paymentDetails) {
        return api.post(`payments/${paymentId}/process`, paymentDetails)
            .then(response => response.data)
            .catch(error => {
                console.error('Error processing payment:', error);
                throw error;
            });
    }

    // Update payment (admin only)
    updatePayment(paymentId, updateData) {
        return api.put(`payments/${paymentId}`, updateData)
            .then(response => response.data)
            .catch(error => {
                console.error('Error updating payment:', error);
                throw error;
            });
    }

    // Delete payment (admin only)
    deletePayment(paymentId) {
        return api.delete(`payments/${paymentId}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error deleting payment:', error);
                throw error;
            });
    }
}

export default new PaymentService();

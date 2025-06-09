import api from './api';

class CartService {
  // Get cart items
  getCart() {
    return api.get('/cart');
  }

  // Add course to cart
  addToCart(courseId, quantity = 1) {
    return api.post('/cart', { 
      course_id: courseId, 
      quantity: quantity 
    });
  }

  // Update cart item quantity
  updateCartItem(courseId, quantity) {
    return api.put(`/cart/${courseId}`, { quantity: quantity });
  }

  // Remove course from cart
  removeFromCart(courseId) {
    return api.delete(`/cart/${courseId}`);
  }

  // Clear entire cart
  clearCart() {
    return api.delete('/cart');
  }

  // Check if course is in cart
  checkInCart(courseId) {
    return api.get(`/cart/check/${courseId}`);
  }

  // Get cart count
  getCartCount() {
    return api.get('/cart/count');
  }

  // Toggle cart status for a course
  async toggleCart(courseId) {
    try {
      const response = await this.checkInCart(courseId);
      const inCart = response.data.data.inCart;
      
      if (inCart) {
        return await this.removeFromCart(courseId);
      } else {
        return await this.addToCart(courseId);
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new CartService();

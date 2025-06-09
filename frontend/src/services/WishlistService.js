import api from './api';

class WishlistService {
  // Get user's wishlist items
  getWishlist() {
    return api.get('/wishlist');
  }

  // Add course to wishlist
  addToWishlist(courseId) {
    return api.post('/wishlist', { course_id: courseId });
  }

  // Remove course from wishlist
  removeFromWishlist(courseId) {
    return api.delete(`/wishlist/${courseId}`);
  }

  // Check if course is in wishlist
  checkInWishlist(courseId) {
    return api.get(`/wishlist/check/${courseId}`);
  }

  // Get wishlist count
  getWishlistCount() {
    return api.get('/wishlist/count');
  }

  // Move all wishlist items to cart
  moveAllToCart() {
    return api.post('/wishlist/move-to-cart');
  }

  // Toggle wishlist status for a course
  async toggleWishlist(courseId) {
    try {
      const response = await this.checkInWishlist(courseId);
      const inWishlist = response.data.data.inWishlist;
      
      if (inWishlist) {
        return await this.removeFromWishlist(courseId);
      } else {
        return await this.addToWishlist(courseId);
      }
    } catch (error) {
      throw error;
    }
  }
}

export default new WishlistService();

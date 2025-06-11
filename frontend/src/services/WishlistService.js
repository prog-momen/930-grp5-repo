import api from './api';

class WishlistService {
  // ✅ Get user's wishlist items
  async getWishlist() {
    const response = await api.get('/wishlist');
    return response.data.data || [];
  }

  // ✅ Add course to wishlist (بدون إرسال user_id)
  async addToWishlist(courseId) {
    return api.post('/wishlist', { course_id: courseId });
  }

  // ✅ Remove course from wishlist by ID
  removeFromWishlist(wishlistId) {
    return api.delete(`/wishlist/${wishlistId}`); // ✅ إصلاح هنا
  }

  // ✅ Check if course is in wishlist
  checkInWishlist(courseId) {
    return api.get(`/wishlist/check/${courseId}`); // ✅ إصلاح هنا
  }

  // ✅ Get wishlist count
  getWishlistCount() {
    return api.get('/wishlist/count');
  }

  // ✅ Move all wishlist items to cart
  moveAllToCart() {
    return api.post('/wishlist/move-to-cart');
  }

  // ✅ Toggle wishlist status (add/remove)
  async toggleWishlist(courseId) {
    try {
      const response = await this.checkInWishlist(courseId);
      const inWishlist = response.data?.data?.inWishlist;

      if (inWishlist) {
        return await this.removeFromWishlist(courseId);
      } else {
        return await this.addToWishlist(courseId);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      throw error;
    }
  }
}

export default new WishlistService();

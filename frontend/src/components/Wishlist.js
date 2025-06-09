import React from 'react';
import { Link } from 'react-router-dom';

function Wishlist() {
  return (
    <div className="container mt-4">
      <h1>My Wishlist</h1>
      
      <div className="alert alert-info">
        Your wishlist is empty.
      </div>

      <Link to="/dashboard" className="btn btn-secondary">
        Back to Dashboard
      </Link>
    </div>
  );
}

export default Wishlist;

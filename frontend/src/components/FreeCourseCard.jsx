import React from 'react';
import "./FreeCourseCard.css";
import { FaStar } from "react-icons/fa";

export default function FreeCourseCard() {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <p className="text-muted small mb-1">Development / Web Development</p>
          <span className="badge bg-success">FREE</span>
        </div>
        <h4 className="card-title mb-2">Complete React.js Course for Beginners</h4>
        <p className="text-muted mb-2">Ahmed Hassan</p>
        <div className="d-flex align-items-center mb-3">
          <FaStar className="text-warning me-1" />
          <span className="fw-bold me-1">4.6</span>
          <span className="text-muted small">(2,543 ratings)</span>
        </div>
        <div className="mt-4">
          <h5 className="mb-3">Chapter 1: Getting Started</h5>
          <div className="list-group">
            <div className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <span className="badge bg-success rounded-circle me-2"></span>
                <span>Introduction to React</span>
              </div>
              <span className="text-success small fw-bold">FREE ACCESS</span>
            </div>
            <div className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <span className="badge bg-success rounded-circle me-2"></span>
                <span>Setting up Development Environment</span>
              </div>
              <span className="text-success small fw-bold">FREE ACCESS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

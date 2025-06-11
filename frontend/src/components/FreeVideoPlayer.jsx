import React from 'react';
import { FaPlay, FaGift } from 'react-icons/fa';
import "./FreeVideoPlayer.css";

export default function FreeVideoPlayer() {
  return (
    <div className="card shadow-sm">
      <div className="position-relative">
        <img src="/Screenshot_2.png" alt="Free Course Preview" className="card-img-top" />
        <button className="btn btn-success position-absolute top-50 start-50 translate-middle rounded-circle p-3">
          <FaPlay className="fs-5" />
        </button>
        <div className="position-absolute top-0 end-0 m-2">
          <span className="badge bg-success d-flex align-items-center">
            <FaGift className="me-1" />
            FREE
          </span>
        </div>
      </div>
      <div className="card-body">
        <h5 className="card-title text-success">Free Course Introduction</h5>
        <p className="card-text text-muted">Start learning React.js completely free - no payment required!</p>
        <div className="d-grid">
          <button className="btn btn-success">
            <FaPlay className="me-2" />
            Start Learning Now
          </button>
        </div>
      </div>
    </div>
  );
}

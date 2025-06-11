import React from 'react';
import { FaPlay } from 'react-icons/fa';

export default function VideoPlayer() {
  return (
    <div className="card shadow-sm">
      <div className="position-relative">
        <img src="/Screenshot_2.png" alt="Course Preview" className="card-img-top" />
        <button className="btn btn-primary position-absolute top-50 start-50 translate-middle rounded-circle p-3">
          <FaPlay className="fs-5" />
        </button>
      </div>
      <div className="card-body">
        <h5 className="card-title">Course Introduction</h5>
        <p className="card-text text-muted">Preview this course and learn the basics</p>
      </div>
    </div>
  );
}
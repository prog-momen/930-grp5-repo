import React from 'react';
import { FaChevronDown, FaPlay, FaLock } from 'react-icons/fa';

export default function CourseContent() {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button className="nav-link active">Description</button>
          </li>
          <li className="nav-item">
            <button className="nav-link">Courses</button>
          </li>
          <li className="nav-item">
            <button className="nav-link">Review</button>
          </li>
        </ul>
        
        <div className="accordion" id="chaptersAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#chapter1">
                <div className="d-flex justify-content-between w-100">
                  <span>Chapter 1: Course Overview</span>
                  <small className="text-muted">5:45 mins</small>
                </div>
              </button>
            </h2>
            <div id="chapter1" className="accordion-collapse collapse show">
              <div className="accordion-body p-0">
                <div className="list-group list-group-flush">
                  <div className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <FaPlay className="text-primary me-2" />
                      <span>Vue Templating</span>
                    </div>
                    <small className="text-muted">3:45</small>
                  </div>
                  <div className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <FaLock className="text-secondary me-2" />
                      <span className="text-muted">Vue Components</span>
                    </div>
                    <small className="text-muted">4:20</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
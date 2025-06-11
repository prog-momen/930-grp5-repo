import React from 'react';
import { FaChevronDown, FaPlay, FaCheck } from 'react-icons/fa';
import "./FreeCourseContent.css";

export default function FreeCourseContent() {
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
        
        <div className="mb-4">
          <div className="alert alert-success d-flex align-items-center">
            <FaCheck className="me-2" />
            <span>This is a completely FREE course - Access all content without any payment!</span>
          </div>
        </div>
        
        <div className="accordion" id="freeChaptersAccordion">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#freeChapter1">
                <div className="d-flex justify-content-between w-100">
                  <span>Chapter 1: React Fundamentals</span>
                  <small className="text-muted">12:30 mins</small>
                </div>
              </button>
            </h2>
            <div id="freeChapter1" className="accordion-collapse collapse show">
              <div className="accordion-body p-0">
                <div className="list-group list-group-flush">
                  <div className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <FaPlay className="text-success me-2" />
                      <span>Introduction to React</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <small className="text-muted me-2">5:45</small>
                      <span className="badge bg-success">FREE</span>
                    </div>
                  </div>
                  <div className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <FaPlay className="text-success me-2" />
                      <span>Setting up React Environment</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <small className="text-muted me-2">6:45</small>
                      <span className="badge bg-success">FREE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#freeChapter2">
                <div className="d-flex justify-content-between w-100">
                  <span>Chapter 2: Components & Props</span>
                  <small className="text-muted">18:15 mins</small>
                </div>
              </button>
            </h2>
            <div id="freeChapter2" className="accordion-collapse collapse">
              <div className="accordion-body p-0">
                <div className="list-group list-group-flush">
                  <div className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <FaPlay className="text-success me-2" />
                      <span>Creating Your First Component</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <small className="text-muted me-2">8:30</small>
                      <span className="badge bg-success">FREE</span>
                    </div>
                  </div>
                  <div className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <FaPlay className="text-success me-2" />
                      <span>Understanding Props</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <small className="text-muted me-2">9:45</small>
                      <span className="badge bg-success">FREE</span>
                    </div>
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

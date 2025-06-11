import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import "./PaidCoursesPage.css";
import { FaStar, FaPlay, FaCrown, FaLock, FaCheckCircle } from 'react-icons/fa';

export default function PaidCoursesPage() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container py-5 flex-grow-1">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="row">
              <div className="col-md-8">
                {/* Course Info */}
                <div className="mb-4">
                  <p className="text-muted small mb-1">Development / Web Development</p>
                  <h1 className="mb-2">Complete React.js Course for Beginners</h1>
                  <p className="text-muted mb-2">Ahmed Hassan</p>
                  <div className="d-flex align-items-center mb-4">
                    <FaStar className="text-warning me-1" />
                    <span className="fw-bold me-1">4.6</span>
                    <span className="text-muted small">(2,543 ratings)</span>
                    <span className="badge bg-success ms-3">
                      <FaCrown className="me-1" />
                      PREMIUM ACCESS
                    </span>
                  </div>
                </div>

                {/* All Chapters */}
                <div className="card shadow-sm mb-4">
                  <div className="card-body">
                    <h5 className="mb-3 text-success">
                      <FaCheckCircle className="me-2" />
                      Full Course Access Unlocked!
                    </h5>
                    
                    <div className="accordion" id="paidChaptersAccordion">
                      {/* Chapter 1 */}
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#chapter1">
                            <div className="d-flex justify-content-between w-100">
                              <span>Chapter 1: React Fundamentals</span>
                              <small className="text-muted">45:30 mins</small>
                            </div>
                          </button>
                        </h2>
                        <div id="chapter1" className="accordion-collapse collapse show">
                          <div className="accordion-body p-0">
                            <div className="list-group list-group-flush">
                              <div className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                  <FaPlay className="text-success me-2" />
                                  <span>Introduction to React</span>
                                </div>
                                <div className="d-flex align-items-center">
                                  <small className="text-muted me-2">5:45</small>
                                  <span className="badge bg-success">UNLOCKED</span>
                                </div>
                              </div>
                              <div className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                  <FaPlay className="text-success me-2" />
                                  <span>Setting up React Environment</span>
                                </div>
                                <div className="d-flex align-items-center">
                                  <small className="text-muted me-2">8:15</small>
                                  <span className="badge bg-success">UNLOCKED</span>
                                </div>
                              </div>
                              <div className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                  <FaPlay className="text-success me-2" />
                                  <span>JSX and Components</span>
                                </div>
                                <div className="d-flex align-items-center">
                                  <small className="text-muted me-2">12:30</small>
                                  <span className="badge bg-success">UNLOCKED</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Chapter 2 */}
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#chapter2">
                            <div className="d-flex justify-content-between w-100">
                              <span>Chapter 2: State and Props</span>
                              <small className="text-muted">38:45 mins</small>
                            </div>
                          </button>
                        </h2>
                        <div id="chapter2" className="accordion-collapse collapse">
                          <div className="accordion-body p-0">
                            <div className="list-group list-group-flush">
                              <div className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                  <FaPlay className="text-success me-2" />
                                  <span>Understanding State</span>
                                </div>
                                <div className="d-flex align-items-center">
                                  <small className="text-muted me-2">15:20</small>
                                  <span className="badge bg-success">UNLOCKED</span>
                                </div>
                              </div>
                              <div className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                  <FaPlay className="text-success me-2" />
                                  <span>Props and Data Flow</span>
                                </div>
                                <div className="d-flex align-items-center">
                                  <small className="text-muted me-2">23:25</small>
                                  <span className="badge bg-success">UNLOCKED</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Chapter 3 */}
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#chapter3">
                            <div className="d-flex justify-content-between w-100">
                              <span>Chapter 3: Advanced React</span>
                              <small className="text-muted">52:15 mins</small>
                            </div>
                          </button>
                        </h2>
                        <div id="chapter3" className="accordion-collapse collapse">
                          <div className="accordion-body p-0">
                            <div className="list-group list-group-flush">
                              <div className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                  <FaPlay className="text-success me-2" />
                                  <span>Hooks and Context</span>
                                </div>
                                <div className="d-flex align-items-center">
                                  <small className="text-muted me-2">28:30</small>
                                  <span className="badge bg-success">UNLOCKED</span>
                                </div>
                              </div>
                              <div className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                  <FaPlay className="text-success me-2" />
                                  <span>Building Real Projects</span>
                                </div>
                                <div className="d-flex align-items-center">
                                  <small className="text-muted me-2">23:45</small>
                                  <span className="badge bg-success">UNLOCKED</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="sticky-top pt-3">
                  {/* Premium Video Player */}
                  <div className="card shadow-sm">
                    <div className="position-relative">
                      <img src="/Screenshot_2.png" alt="Premium Course" className="card-img-top" />
                      <button className="btn btn-success position-absolute top-50 start-50 translate-middle rounded-circle p-3">
                        <FaPlay className="fs-5" />
                      </button>
                      <div className="position-absolute top-0 end-0 m-2">
                        <span className="badge bg-success d-flex align-items-center">
                          <FaCrown className="me-1" />
                          PREMIUM
                        </span>
                      </div>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title text-success">Premium Course Access</h5>
                      <p className="card-text text-muted">You now have full access to all course content, including advanced topics and projects!</p>
                      <div className="d-grid">
                        <button className="btn btn-success">
                          <FaPlay className="me-2" />
                          Continue Learning
                        </button>
                      </div>
                      
                      <div className="mt-3 p-3 bg-light rounded">
                        <h6 className="text-success mb-2">
                          <FaCheckCircle className="me-1" />
                          What's Included:
                        </h6>
                        <ul className="list-unstyled small mb-0">
                          <li className="mb-1">✓ All video lessons</li>
                          <li className="mb-1">✓ Downloadable resources</li>
                          <li className="mb-1">✓ Certificate of completion</li>
                          <li className="mb-1">✓ Lifetime access</li>
                          <li className="mb-1">✓ Community support</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

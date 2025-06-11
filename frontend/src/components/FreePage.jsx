import React, { useState } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import PaymentModal from "./PaymentModal";
import "./FreePage.css";
import { FaStar, FaPlay, FaGift, FaShoppingCart } from 'react-icons/fa';

export default function FreePage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  // Sample course data - this would come from props or API in real app
  const courseData = {
    id: 'react-course-001',
    title: 'Complete React.js Course for Beginners',
    price: 99.99,
    instructor: 'Ahmed Hassan'
  };

  const handleBuyNow = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    alert('Payment successful! You now have access to the full course.');
  };
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
                    <span className="badge bg-primary ms-3">
                      <FaGift className="me-1" />
                      FREE COURSE
                    </span>
                  </div>
                </div>

                {/* Chapter Preview */}
                <div className="card shadow-sm mb-4">
                  <div className="card-body">
                    <h5 className="mb-3">Chapter 1: Getting Started</h5>
                    <div className="list-group">
                      <div className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <span className="badge bg-primary rounded-circle me-2"></span>
                          <span>Introduction to React</span>
                        </div>
                        <span className="text-primary small fw-bold">FREE ACCESS</span>
                      </div>
                      <div className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <span className="badge bg-primary rounded-circle me-2"></span>
                          <span>Setting up Development Environment</span>
                        </div>
                        <span className="text-primary small fw-bold">FREE ACCESS</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Content Tabs */}
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
                                  <FaPlay className="text-primary me-2" />
                                  <span>Introduction to React</span>
                                </div>
                                <div className="d-flex align-items-center">
                                  <small className="text-muted me-2">5:45</small>
                                  <span className="badge bg-primary">FREE</span>
                                </div>
                              </div>
                              <div className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                  <FaPlay className="text-primary me-2" />
                                  <span>Setting up React Environment</span>
                                </div>
                                <div className="d-flex align-items-center">
                                  <small className="text-muted me-2">6:45</small>
                                  <span className="badge bg-primary">FREE</span>
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
                  {/* Free Video Player */}
                  <div className="card shadow-sm">
                    <div className="position-relative">
                      <img src="/Screenshot_2.png" alt="Free Course Preview" className="card-img-top" />
                      <button className="btn btn-primary position-absolute top-50 start-50 translate-middle rounded-circle p-3">
                        <FaPlay className="fs-5" />
                      </button>
                      <div className="position-absolute top-0 end-0 m-2">
                        <span className="badge bg-primary d-flex align-items-center">
                          <FaGift className="me-1" />
                          FREE
                        </span>
                      </div>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title text-primary">Free Course Introduction</h5>
                      <p className="card-text text-muted">Start learning React.js completely free - no payment required!</p>
                      <div className="d-grid gap-2">
                        <button className="btn btn-primary">
                          <FaPlay className="me-2" />
                          Start Learning Now
                        </button>
                        <button 
                          className="btn btn-success"
                          onClick={handleBuyNow}
                        >
                          <FaShoppingCart className="me-2" />
                          Buy Full Course - ${courseData.price}
                        </button>
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
      
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        course={courseData}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}

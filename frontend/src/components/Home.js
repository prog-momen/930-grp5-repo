import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5">
        <div className="container">
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Learn Without Limits
              </h1>
              <p className="lead mb-4">
                Start, switch, or advance your career with more than 5,000 courses, 
                Professional Certificates, and degrees from world-class universities and companies.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/courses" className="btn btn-light btn-lg">
                  <i className="fas fa-play me-2"></i>
                  Start Learning
                </Link>
                <Link to="/register" className="btn btn-outline-light btn-lg">
                  Join for Free
                </Link>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div className="bg-light rounded p-5 d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
                <i className="fas fa-graduation-cap text-primary" style={{ fontSize: '8rem' }}></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-12">
              <h2 className="fw-bold mb-3">Why Choose Learnify?</h2>
              <p className="text-muted">Discover the benefits of learning with us</p>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="text-center p-4">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                     style={{ width: '80px', height: '80px' }}>
                  <i className="fas fa-graduation-cap fs-2"></i>
                </div>
                <h5 className="fw-bold mb-3">Expert Instructors</h5>
                <p className="text-muted">
                  Learn from industry experts and experienced professionals who are passionate about teaching.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="text-center p-4">
                <div className="bg-success text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                     style={{ width: '80px', height: '80px' }}>
                  <i className="fas fa-clock fs-2"></i>
                </div>
                <h5 className="fw-bold mb-3">Flexible Learning</h5>
                <p className="text-muted">
                  Study at your own pace, anytime and anywhere. Access courses on any device.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="text-center p-4">
                <div className="bg-warning text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                     style={{ width: '80px', height: '80px' }}>
                  <i className="fas fa-certificate fs-2"></i>
                </div>
                <h5 className="fw-bold mb-3">Certificates</h5>
                <p className="text-muted">
                  Earn certificates upon completion to showcase your new skills to employers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-12">
              <h2 className="fw-bold mb-3">Popular Courses</h2>
              <p className="text-muted">Explore our most popular courses</p>
            </div>
          </div>
          <div className="row g-4">
            {[1, 2, 3, 4].map((course) => (
              <div key={course} className="col-lg-3 col-md-6">
                <div className="card h-100 shadow-sm">
                  <div className="card-img-top bg-light d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                    <i className="fas fa-laptop-code text-primary" style={{ fontSize: '4rem' }}></i>
                  </div>
                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="badge bg-primary">Programming</span>
                      <div className="text-warning">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <small className="text-muted ms-1">(4.8)</small>
                      </div>
                    </div>
                    <h6 className="card-title">Complete Web Development Course {course}</h6>
                    <p className="card-text text-muted small flex-grow-1">
                      Learn modern web development with HTML, CSS, JavaScript, and React.
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="fw-bold text-primary">$49.99</span>
                        <small className="text-muted text-decoration-line-through ms-2">$99.99</small>
                      </div>
                      <button className="btn btn-outline-primary btn-sm">
                        <i className="fas fa-heart me-1"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link to="/courses" className="btn btn-primary btn-lg">
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-primary text-white">
        <div className="container">
          <div className="row text-center">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="p-3">
                <h2 className="display-4 fw-bold mb-2">10K+</h2>
                <p className="mb-0">Students Enrolled</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="p-3">
                <h2 className="display-4 fw-bold mb-2">500+</h2>
                <p className="mb-0">Courses Available</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="p-3">
                <h2 className="display-4 fw-bold mb-2">100+</h2>
                <p className="mb-0">Expert Instructors</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="p-3">
                <h2 className="display-4 fw-bold mb-2">95%</h2>
                <p className="mb-0">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h2 className="fw-bold mb-3">Ready to Start Learning?</h2>
              <p className="lead text-muted mb-4">
                Join thousands of students who are already learning and growing their skills with Learnify.
              </p>
              <Link to="/register" className="btn btn-primary btn-lg me-3">
                Get Started Today
              </Link>
              <Link to="/courses" className="btn btn-outline-primary btn-lg">
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

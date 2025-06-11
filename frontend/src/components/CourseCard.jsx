import "./CourseCard.css";
import { FaStar } from "react-icons/fa";

export default function CourseCard() {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <p className="text-muted small mb-1">Development / Mobile Engineer</p>
        <h4 className="card-title mb-2">Make Uber Clone App</h4>
        <p className="text-muted mb-2">Steven Arnatouvic</p>
        <div className="d-flex align-items-center mb-3">
          <FaStar className="text-warning me-1" />
          <span className="fw-bold me-1">4.8</span>
          <span className="text-muted small">(1,812 ratings)</span>
        </div>
        <div className="mt-4">
          <h5 className="mb-3">Chapter 1: Preparations</h5>
          <div className="list-group">
            <div className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <span className="badge bg-success rounded-circle me-2"></span>
                <span>Introduction</span>
              </div>
              <button className="btn btn-sm btn-outline-primary">Preview</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

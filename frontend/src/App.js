import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Services
import AuthService from './services/AuthService';

// Components
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Payments from './components/Payments';
// import Courses from './components/Courses';
import Wishlist from './components/Wishlist';
import Profile from './components/Profile';
import Cart from './components/Cart';
import Search from './components/Search';
// import CourseDetail from './components/CourseDetail';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import CourseList from './components/CourseList';
import Footer from './components/Footer';
import Home from './components/Home';

// Styles
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            {AuthService.isAuthenticated() ? null : (
              <Route path="/register" element={<Register />} />
            )}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payments"
              element={
                <ProtectedRoute>
                  <Payments />
                </ProtectedRoute>
              }
            />
            {/* <Route path="/courses" element={<Courses />} /> */}
            <Route
              path="/my-courses"
              element={
                <ProtectedRoute>
                  {/* <Courses enrolled={true} /> */}
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route path="/search" element={<Search />} />
            {/* <Route path="/courses/:id" element={<CourseDetail />} /> */}
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <div>
                    <h1>Users</h1>
                    <p>This is a placeholder for the users page.</p>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/become-instructor"
              element={
                <div>
                  <h1>Become Instructor</h1>
                  <p>This is a placeholder for the Become Instructor page.</p>
                </div>
              }
            />
            <Route path="/course-list" element={<CourseList />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

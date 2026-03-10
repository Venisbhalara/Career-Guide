import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { useLenis } from "./hooks/useLenis";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import ExploreCareers from "./pages/ExploreCareers";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AssessmentTest from "./pages/AssessmentTest";
import Dashboard from "./pages/Dashboard";
import CareerDetail from "./pages/CareerDetail";
import Courses from "./pages/Courses";
import Counselling from "./pages/Counselling";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminCareers from "./pages/AdminCareers";
import AdminAssessments from "./pages/AdminAssessments";
import AdminCounselling from "./pages/AdminCounselling";
import AdminSubscriptions from "./pages/AdminSubscriptions";
import AdminMessages from "./pages/AdminMessages";

import Blog from "./pages/Blog";
import HelpCenter from "./pages/HelpCenter";
import Payment from "./pages/Payment";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";

function App() {
  useLenis();

  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Admin Panel — full-screen, own layout (no shared Navbar/Footer) */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <AdminUsers />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/careers"
              element={
                <AdminRoute>
                  <AdminCareers />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/assessments"
              element={
                <AdminRoute>
                  <AdminAssessments />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/counselling"
              element={
                <AdminRoute>
                  <AdminCounselling />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/subscriptions"
              element={
                <AdminRoute>
                  <AdminSubscriptions />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/messages"
              element={
                <AdminRoute>
                  <AdminMessages />
                </AdminRoute>
              }
            />

            {/* All other routes — shared Navbar + Footer shell */}
            <Route
              path="*"
              element={
                <div className="app">
                  <Navbar />
                  <main>
                    <Routes>
                      {/* Public Routes */}
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/explore" element={<ExploreCareers />} />
                      <Route path="/careers/:id" element={<CareerDetail />} />
                      <Route path="/courses" element={<Courses />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/help-center" element={<HelpCenter />} />
                      <Route
                        path="/privacy-policy"
                        element={<PrivacyPolicy />}
                      />

                      <Route
                        path="/assessment"
                        element={
                          <ProtectedRoute>
                            <AssessmentTest />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/dashboard"
                        element={
                          <ProtectedRoute>
                            <Dashboard />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/counselling"
                        element={
                          <ProtectedRoute>
                            <Counselling />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/payment"
                        element={
                          <ProtectedRoute>
                            <Payment />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/settings"
                        element={
                          <ProtectedRoute>
                            <Settings />
                          </ProtectedRoute>
                        }
                      />
                      {/* 404 Catch-all Route */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

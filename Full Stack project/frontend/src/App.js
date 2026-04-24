import { useState, useCallback, useEffect } from "react";
import JobList from "./components/JobList";
import AddJob from "./components/AddJob";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Toast from "./components/Toast";

import "./App.css";

function App() {
  const [activeView, setActiveView] = useState("jobs");
  const [toast, setToast] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [user, setUser] = useState(null);

  // Restore session on mount
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    if (userId) {
      setUser({ id: userId, name: userName || "User" });
    }
  }, []);

  const isLoggedIn = !!user;

  const showToast = useCallback((message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const handleJobAdded = useCallback(() => {
    showToast("Job published successfully!");
    setRefreshKey(k => k + 1);
  }, [showToast]);

  const handleLogin = useCallback((userData) => {
    setUser(userData);
    setActiveView("jobs");
    showToast(`Welcome back, ${userData.name}! `);
  }, [showToast]);

  const handleRegister = useCallback(() => {
    setActiveView("login");
    showToast("Account created! Please sign in ");
  }, [showToast]);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setUser(null);
    setActiveView("jobs");
    showToast("Signed out successfully");
  }, [showToast]);

  // Get user initials for avatar
  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <>
      {/* ── Navigation ── */}
      <nav className="navbar">
        <div className="navbar-brand" onClick={() => setActiveView("jobs")}>
          0xSharik
        </div>

        <div className="navbar-center">
          <button
            className={`nav-link ${activeView === "jobs" ? "active" : ""}`}
            onClick={() => setActiveView("jobs")}
          >
            Jobs
          </button>
          <button
            className="nav-link nav-link--cta"
            onClick={() => setActiveView("post")}
          >
            Post Job
          </button>
          {isLoggedIn && (
            <button
              className={`nav-link ${activeView === "dashboard" ? "active" : ""}`}
              onClick={() => setActiveView("dashboard")}
            >
              My Applications
            </button>
          )}
        </div>

        <div className="navbar-right">
          {isLoggedIn ? (
            <>
              <div className="user-avatar">{getInitials(user.name)}</div>
              <span className="user-greeting">Hi, {user.name.split(" ")[0]}</span>
              <button className="btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="btn-auth-outline"
                onClick={() => setActiveView("login")}
              >
                Login
              </button>
              <button
                className="btn-auth-solid"
                onClick={() => setActiveView("register")}
              >
                Register
              </button>
            </>
          )}
        </div>
      </nav>

      {/* ── Main App ── */}
      <div className="app-container">
        {/* Hero — only on jobs view */}
        {activeView === "jobs" && (
          <header className="header">
            <h1>Discover Opportunities</h1>
            <p>
              Your gateway to the most exciting tech roles worldwide.
              Curated for the exceptional.
            </p>
            <div className="stats-row">
              <div className="stat-item">
                <div className="stat-number">2,450+</div>
                <div className="stat-label">Jobs Posted</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">890+</div>
                <div className="stat-label">Companies</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">15K+</div>
                <div className="stat-label">Applicants</div>
              </div>
            </div>
          </header>
        )}

        {/* ── Content Routing ── */}
        {activeView === "jobs" && (
          <main className="main-content">
            <aside className="sidebar">
              <AddJob onJobAdded={handleJobAdded} showToast={showToast} />
            </aside>
            <section className="jobs-section">
              <JobList
                key={refreshKey}
                showToast={showToast}
                onRequireLogin={() => setActiveView("login")}
              />
            </section>
          </main>
        )}

        {activeView === "post" && (
          <main className="centered-content">
            <AddJob onJobAdded={handleJobAdded} showToast={showToast} />
          </main>
        )}

        {activeView === "dashboard" && (
          <main className="centered-content wide">
            <Dashboard showToast={showToast} />
          </main>
        )}

        {activeView === "login" && (
          <main className="auth-page">
            <Login
              showToast={showToast}
              onLoginSuccess={handleLogin}
              onSwitchToRegister={() => setActiveView("register")}
            />
          </main>
        )}

        {activeView === "register" && (
          <main className="auth-page">
            <Register
              showToast={showToast}
              onRegisterSuccess={handleRegister}
              onSwitchToLogin={() => setActiveView("login")}
            />
          </main>
        )}


      </div>

      {/* ── Toast Notification ── */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
}

export default App;
import { useState } from "react";
import axios from "axios";

function Login({ showToast, onLoginSuccess, onSwitchToRegister }) {
    const [user, setUser] = useState({ email: "", password: "" });
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);

        axios.post("http://localhost:8080/job_portal/user", null, {
            params: { ...user, action: "login" }
        })
            .then(res => {
                const name = user.email.split("@")[0]; // Use email prefix as display name
                localStorage.setItem("userId", 1); // temporary
                localStorage.setItem("userName", name);
                setSubmitting(false);
                if (onLoginSuccess) {
                    onLoginSuccess({ id: "1", name });
                }
            })
            .catch(err => {
                console.error(err);
                setSubmitting(false);
                if (showToast) showToast("Login failed. Check your credentials.", "error");
            });
    };

    return (
        <div className="auth-card">
            <div className="auth-card-header">
                <h2 className="auth-title">
                    Welcome <span>Back</span>
                </h2>
                <p className="auth-subtitle">Sign in to access your dashboard and apply for jobs</p>
            </div>
            <form onSubmit={handleSubmit} className="form-group">
                <div className="input-wrapper">
                    <label className="input-label">Email</label>
                    <div className="input-icon-wrapper">
                        <span className="input-icon">✉</span>
                        <input
                            name="email"
                            type="email"
                            className="input-field input-with-icon"
                            placeholder="you@company.com"
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="input-wrapper">
                    <label className="input-label">Password</label>
                    <div className="input-icon-wrapper">
                        <span className="input-icon">🔒</span>
                        <input
                            name="password"
                            type={showPassword ? "text" : "password"}
                            className="input-field input-with-icon"
                            placeholder="••••••••"
                            value={user.password}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                </div>
                <button
                    type="submit"
                    className="submit-btn"
                    disabled={submitting}
                >
                    {submitting ? "Signing in..." : "Sign In →"}
                </button>
            </form>
            <div className="auth-footer">
                Don't have an account?{" "}
                <button onClick={onSwitchToRegister}>Create one</button>
            </div>
        </div>
    );
}

export default Login;
import { useState } from "react";
import axios from "axios";

function Register({ showToast, onRegisterSuccess, onSwitchToLogin }) {
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);

        axios.post("http://localhost:8080/job_portal/user", null, {
            params: { ...user, action: "register" }
        })
            .then(() => {
                setUser({ name: "", email: "", password: "" });
                setSubmitting(false);
                if (onRegisterSuccess) onRegisterSuccess();
            })
            .catch(err => {
                console.error(err);
                setSubmitting(false);
                if (showToast) showToast("Registration failed. Try again.", "error");
            });
    };

    return (
        <div className="auth-card">
            <div className="auth-card-header">
                <h2 className="auth-title">
                    Create <span>Account</span>
                </h2>
                <p className="auth-subtitle">Join our network of top professionals</p>
            </div>
            <form onSubmit={handleSubmit} className="form-group">
                <div className="input-wrapper">
                    <label className="input-label">Full Name</label>
                    <div className="input-icon-wrapper">
                        <span className="input-icon">👤</span>
                        <input
                            name="name"
                            className="input-field input-with-icon"
                            placeholder="John Doe"
                            value={user.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
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
                            placeholder="Minimum 8 characters"
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
                    {submitting ? "Creating account..." : "Create Account →"}
                </button>
            </form>
            <div className="auth-footer">
                Already have an account?{" "}
                <button onClick={onSwitchToLogin}>Sign in</button>
            </div>
        </div>
    );
}

export default Register;

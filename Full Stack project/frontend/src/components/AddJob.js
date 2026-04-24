import { useState } from "react";
import axios from "axios";

function AddJob({ onJobAdded, showToast }) {
    const [job, setJob] = useState({
        title: "",
        description: "",
        location: "",
        companyName: ""
    });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setJob({ ...job, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);

        axios.post("http://localhost:8080/job_portal/jobs", job)
            .then(() => {
                setJob({
                    title: "",
                    description: "",
                    location: "",
                    companyName: ""
                });
                setSubmitting(false);
                if (onJobAdded) onJobAdded();
            })
            .catch(err => {
                console.error(err);
                setSubmitting(false);
                if (showToast) showToast("Failed to post job. Please try again.", "error");
            });
    };

    return (
        <div className="glass-card">
            <h2 className="form-title">Post a New Role</h2>
            <form onSubmit={handleSubmit} className="form-group">
                <div className="input-wrapper">
                    <label className="input-label">Job Title</label>
                    <input
                        name="title"
                        className="input-field"
                        placeholder="e.g. Senior React Developer"
                        value={job.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-wrapper">
                    <label className="input-label">Company</label>
                    <input
                        name="companyName"
                        className="input-field"
                        placeholder="e.g. TechCorp"
                        value={job.companyName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-wrapper">
                    <label className="input-label">Location</label>
                    <input
                        name="location"
                        className="input-field"
                        placeholder="e.g. Remote, New York, London"
                        value={job.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-wrapper">
                    <label className="input-label">Description</label>
                    <textarea
                        name="description"
                        className="input-field"
                        placeholder="Describe the role, requirements, and what makes it exciting..."
                        value={job.description}
                        onChange={handleChange}
                        rows="5"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="submit-btn"
                    disabled={submitting}
                >
                    {submitting ? "Publishing..." : "Publish Job →"}
                </button>
            </form>
        </div>
    );
}

export default AddJob;
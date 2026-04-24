import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard({ showToast }) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = localStorage.getItem("userId");

    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:8080/job_portal/apply", {
            params: { userId }
        })
            .then(res => {
                setJobs(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [userId]);

    return (
        <div className="jobs-section">
            <div className="jobs-header-row">
                <h2 className="jobs-header">My Applications</h2>
                {jobs.length > 0 && (
                    <span className="jobs-count">
                        {jobs.length} applied
                    </span>
                )}
            </div>

            <div className="jobs-container">
                {loading ? (
                    <>
                        <div className="skeleton skeleton-card" />
                        <div className="skeleton skeleton-card" />
                    </>
                ) : jobs.length === 0 ? (
                    <div className="no-jobs glass-card">
                        <span className="no-jobs-icon">📋</span>
                        <p>No applications yet. Browse jobs and apply!</p>
                    </div>
                ) : (
                    jobs.map((job, index) => (
                        <div className="job-card" key={index}>
                            <div className="job-card-top">
                                <div>
                                    <h3 className="job-title">
                                        {typeof job === "string" ? job : job.title || `Application #${index + 1}`}
                                    </h3>
                                    {job.companyName && (
                                        <div className="job-meta-container">
                                            <span className="job-detail">
                                                <span className="detail-icon">🏢</span>
                                                {job.companyName}
                                            </span>
                                            {job.location && (
                                                <span className="job-detail">
                                                    <span className="detail-icon">📍</span>
                                                    {job.location}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <span className="applied-badge">Applied ✓</span>
                            </div>
                            {job.description && (
                                <div className="description">{job.description}</div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Dashboard;

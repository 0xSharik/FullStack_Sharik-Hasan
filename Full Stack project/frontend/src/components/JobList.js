import { useEffect, useState } from "react";
import axios from "axios";

function JobList({ showToast, onRequireLogin }) {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axios.get("http://localhost:8080/job_portal/jobs")
            .then(res => {
                setJobs(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching jobs:", err);
                setLoading(false);
            });
    }, []);

    const applyJob = (jobId) => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            if (showToast) showToast("Please login to apply for jobs", "error");
            if (onRequireLogin) onRequireLogin();
            return;
        }

        axios.post("http://localhost:8080/job_portal/apply", null, {
            params: { userId, jobId }
        })
            .then(() => {
                if (showToast) showToast("Applied successfully! 🎉");
            })
            .catch(err => {
                console.error(err);
                if (showToast) showToast("Application failed. Please try again.", "error");
            });
    };

    return (
        <>
            <div className="jobs-header-row">
                <h2 className="jobs-header">Latest Opportunities</h2>
                {jobs.length > 0 && (
                    <span className="jobs-count">{jobs.length} role{jobs.length !== 1 ? 's' : ''}</span>
                )}
            </div>

            <div className="jobs-container">
                {loading ? (
                    <>
                        <div className="skeleton skeleton-card" />
                        <div className="skeleton skeleton-card" />
                        <div className="skeleton skeleton-card" />
                    </>
                ) : jobs.length === 0 ? (
                    <div className="no-jobs glass-card">
                        <span className="no-jobs-icon">🔍</span>
                        <p>No jobs found yet. Be the first to post!</p>
                    </div>
                ) : (
                    jobs.map((job) => (
                        <div className="job-card" key={job.id || Math.random()}>
                            <div className="job-card-top">
                                <div>
                                    <h3 className="job-title">{job.title}</h3>
                                    <div className="job-meta-container">
                                        {job.companyName && (
                                            <span className="job-detail">
                                                <span className="detail-icon">🏢</span>
                                                {job.companyName}
                                            </span>
                                        )}
                                        {job.location && (
                                            <span className="job-detail">
                                                <span className="detail-icon">📍</span>
                                                {job.location}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {job.description && (
                                <div className="description">
                                    {job.description}
                                </div>
                            )}

                            <button
                                className="apply-btn"
                                onClick={() => applyJob(job.id)}
                            >
                                Apply Now →
                            </button>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default JobList;
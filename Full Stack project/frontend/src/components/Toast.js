function Toast({ message, type = "success" }) {
    return (
        <div className={`toast toast-${type}`}>
            <span style={{ fontSize: '1.1rem' }}>
                {type === "success" ? "✓" : "✕"}
            </span>
            {message}
        </div>
    );
}

export default Toast;

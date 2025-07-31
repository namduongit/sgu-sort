import "./Subject.css";

const Subject = ({ subject }) => {
    return (
        <div
            className="subject-card shadow-sm"
            style={{
                borderLeft: `6px solid #4d4d4dff`,
                borderRadius: "8px",
            }}
        >
            <div className="subject-content">
                <div className="subject-header d-flex justify-content-between align-items-center mb-2 justify-content-between">
                    <h5 className="mb-0 fw-bold text-primary">{subject.name}</h5>
                    <span className="badge bg-secondary ms-3">{subject.group}</span>
                </div>
                <div className="subject-body text-muted d-flex justify-content-between">
                    <span><i className="fa-regular fa-clock me-1" />{subject.time}</span>
                    <span><i className="fa-solid fa-location-dot me-1" />{subject.place}</span>
                </div>
            </div>
        </div>
    );
};

export default Subject;

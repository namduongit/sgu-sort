import "./Subject.css";

const Subject = ({ subject }) => {
    return (
        <div
            className="subject-card shadow-sm">
            <div className="subject-content">
                <div className="subject-header d-flex justify-content-between align-items-center justify-content-between">
                    <h5 className="mb-0 fw-bold text-primary">{subject.ten}</h5>
                    <span className="badge bg-secondary ms-3">Mã: {subject.ma}</span>
                </div>
            </div>
        </div>
    );
};

export default Subject;
